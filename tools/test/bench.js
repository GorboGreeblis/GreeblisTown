// Build benchmark: the same measurements for any build of the game, old or new, read from outside the game (WebGL and
// requestAnimationFrame are wrapped before the page loads), so builds with different internals compare fairly:
// - draw calls and triangles per frame (every drawElements / drawArrays call, instanced ones times their instances);
// - the CPU time per frame spent in the page's frame callbacks (game logic and three.js together), mean, median and
//   95th percentile;
// - the page's size (raw and gzip -9), the time to the load event, and the JS heap in use at the end;
// - the page errors over the run.
// The player stands where the build puts them at the start and the page is clicked once to start, then left to run.
// Headless Chromium draws with SwiftShader (WebGL on the CPU), so GPU time and frame rate are not the device's: the
// draw calls, triangles and CPU time per frame are what compare between builds (see docs/benchmarks.md).
// Env: SECONDS (how long to measure, default 20); SETTLE (ms after the start click before measuring, default 8000).
// Output: one `bench {…}` JSON line.
//   NOSHOT=1 node test/shot.js http://localhost:8765/index.html x.png test/bench.js
//   MOBILE=1 NOSHOT=1 node test/shot.js http://localhost:8765/tools/old.html x.png test/bench.js
const zlib = require('zlib');

module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  await p.addInitScript(() => {
    const B = (window.__bench = { on: !1, frames: [], cur: null, draws: 0, tris: 0 });
    const prim = (mode, n) => (mode === 4 ? n / 3 : mode === 5 || mode === 6 ? Math.max(0, n - 2) : 0);
    for (const C of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
      if (!C) continue;
      const P = C.prototype, wrap = (name, tri) => {
        const f = P[name];
        if (f) P[name] = function (...a) { if (B.on) (B.draws++, (B.tris += tri(a))); return f.apply(this, a); };
      };
      wrap('drawElements', (a) => prim(a[0], a[1]));
      wrap('drawArrays', (a) => prim(a[0], a[2]));
      wrap('drawElementsInstanced', (a) => prim(a[0], a[1]) * a[4]);
      wrap('drawArraysInstanced', (a) => prim(a[0], a[2]) * a[3]);
    }
    // (every callback that runs for one frame time stamp is one frame: its CPU time and the draws made in it)
    const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => raf((ts) => {
      if (!B.on) return cb(ts);
      if (!B.cur || B.cur.ts !== ts) (B.cur && B.frames.push(B.cur), (B.cur = { ts, ms: 0, d0: B.draws, t0: B.tris }));
      const t0 = performance.now();
      try { return cb(ts); } finally { (B.cur.ms += performance.now() - t0), (B.cur.d = B.draws - B.cur.d0), (B.cur.t = B.tris - B.cur.t0); }
    });
  });
  const t0 = Date.now();
  await p.reload({ timeout: 300000 });
  const wall = Date.now() - t0;
  const nav = await p.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; return n ? Math.round(n.loadEventEnd) : null; });
  const html = await p.evaluate(() => fetch(location.href).then((r) => r.text()));
  const bytes = Buffer.byteLength(html), gz = zlib.gzipSync(html, { level: 9 }).length;
  await W(4000);
  const v = p.viewportSize();
  await p.mouse.click(v.width / 2, v.height / 2);
  await W(+(process.env.SETTLE || 8000));
  await p.evaluate(() => { (window.__bench.on = !0), (window.__bench.frames = []), (window.__bench.cur = null); });
  await W(1000 * +(process.env.SECONDS || 20));
  const r = await p.evaluate(() => {
    const B = window.__bench;
    B.on = !1;
    const f = B.frames.filter((q) => q.d > 0), ms = f.map((q) => q.ms).sort((a, b) => a - b), n = f.length;
    const mean = (a) => a.reduce((s, x) => s + x, 0) / Math.max(1, a.length), m = performance.memory || {};
    return {
      frames: n,
      cpuMs: { mean: +mean(ms).toFixed(2), median: +(ms[n >> 1] || 0).toFixed(2), p95: +(ms[Math.floor(n * 0.95)] || 0).toFixed(2) },
      draws: { mean: Math.round(mean(f.map((q) => q.d))), max: Math.max(0, ...f.map((q) => q.d)) },
      trisK: { mean: Math.round(mean(f.map((q) => q.t)) / 1000), max: Math.round(Math.max(0, ...f.map((q) => q.t)) / 1000) },
      heapMB: Math.round((m.usedJSHeapSize || 0) / 1048576),
    };
  });
  console.log('bench ' + JSON.stringify({ mobile: !!process.env.MOBILE && process.env.MOBILE !== '0', bytes, gzip: gz, loadMs: nav, reloadWallMs: wall, ...r, pageErrors: errors.length }));
};
