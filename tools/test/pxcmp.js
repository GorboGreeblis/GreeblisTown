// Two builds compared pixel by pixel: ten fixed views (seven round the park and three along the kiosks) rendered from
// both pages in one browser, seeded alike, with everything that moves with time hidden (the frame loop stopped,
// the creatures, the avatar, the pickups and the UFO hidden), so a lossless change shows 0 differing pixels per
// view (a pixel differs when a channel differs by more than 8). The worst view is written as A, B and the
// difference (red), <OUT>_a/_b/_d.ppm. Serve the old page beside the new one (e.g. git show HEAD:index.html >
// old.html at the repo root, removed afterwards).
//   OUT=x node pxcmp.js http://localhost:8765/old.html http://localhost:8765/index.html
const { chromium } = require('playwright');
(async () => {
  const [A, B] = process.argv.slice(2);
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const V = [[[0, 12, 30], [0, 0, 0]], [[-20, 4, 10], [-34, 1, 5]], [[20, 3, -12], [26, 1, -24]], [[0, 3, 30], [0, 3, 48]], [[30, 3, 0], [34, 1.5, 10]], [[-10, 30, -10], [0, 0, 0]], [[0, 1.6, -20], [-40, 1, -40]], [[26, 1.6, -14], [30, 1.2, -24]], [[-30, 1.6, -20], [-26, 1.4, -27]], [[-20, 1.6, 14], [-34, 1.2, 5]]];
  const grab = async (url) => {
    const p = await b.newPage({ viewport: { width: 640, height: 480 } });
    await p.addInitScript(() => { let s = 12345; Math.random = () => ((s = (16807 * s) % 2147483647) / 2147483647); });
    await p.goto(url); await p.waitForTimeout(6000); await p.mouse.click(320, 40); await p.waitForTimeout(1500);
    const out = await p.evaluate((V) => {
      const gl = O.getContext(), cam = new THREE.PerspectiveCamera(60, 4 / 3, 0.1, 300), out = [];
      // (nothing that moves with time: the loop stopped, the creatures, the avatar, the pickups and the UFO hidden)
      O.setAnimationLoop(null); At.visible = false; It.all.forEach((q) => (q.group.visible = false)); st.group && (st.group.visible = false); JGP.slug && JGP.slug.ent && (JGP.slug.ent.group.visible = false);
      C.traverse((o) => { if (o.isInstancedMesh || (o.userData && o.userData.keepInFinale && o.parent === C && !o.name)) o.visible = false; });
      O.setSize(640, 480, false);
      for (const [a, l] of V) { cam.position.set(...a); cam.lookAt(...l); cam.updateMatrixWorld(true); O.render(C, cam); const u = new Uint8Array(640 * 480 * 4); gl.readPixels(0, 0, 640, 480, gl.RGBA, gl.UNSIGNED_BYTE, u); out.push(Array.from(u)); }
      return { out, err: Re.errors };
    }, V);
    await p.close(); return out;
  };
  const a = await grab(A), c = await grab(B);
  console.log('errors', a.err, c.err);
  const fs = require('fs'); let worst = -1, wn = 0;
  a.out.forEach((u, i) => { const w = c.out[i]; let n = 0; for (let k = 0; k < u.length; k += 4) (Math.abs(u[k] - w[k]) > 8 || Math.abs(u[k + 1] - w[k + 1]) > 8 || Math.abs(u[k + 2] - w[k + 2]) > 8) && n++; n > wn && ((wn = n), (worst = i)); console.log('view', i, 'differing pixels', n, '(' + (100 * n / (640 * 480)).toFixed(2) + '%)'); });
  // (the worst view: A, B and the difference, as one PPM each, for a look)
  if (worst >= 0) { const W = 640, H = 480, mk = (f, name) => { const buf = Buffer.alloc(W * H * 3); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const k = 4 * ((H - 1 - y) * W + x), o = 3 * (y * W + x); const [r, g, bl] = f(k); buf[o] = r; buf[o + 1] = g; buf[o + 2] = bl; } fs.writeFileSync(name, Buffer.concat([Buffer.from(`P6 ${W} ${H} 255\n`), buf])); };
    const u = a.out[worst], w = c.out[worst]; mk((k) => [u[k], u[k + 1], u[k + 2]], process.env.OUT + '_a.ppm'); mk((k) => [w[k], w[k + 1], w[k + 2]], process.env.OUT + '_b.ppm'); mk((k) => { const d = Math.max(Math.abs(u[k] - w[k]), Math.abs(u[k + 1] - w[k + 1]), Math.abs(u[k + 2] - w[k + 2])); return d > 8 ? [255, 0, 0] : [u[k] >> 2, u[k + 1] >> 2, u[k + 2] >> 2]; }, process.env.OUT + '_d.ppm'); console.log('worst view', worst, 'written'); }
  await b.close();
})();
