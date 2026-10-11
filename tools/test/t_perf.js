// Performance profile of the game, for an optimisation pass:
//  1. what each view costs the GPU: draw calls and triangles from a player's eyes (1.6 m up, a 100° VR-like
//     lens) at fixed spots round the park, the biggest draws in each, and the totals of programs, textures,
//     geometries and meshes;
//  2. where the CPU time per frame goes: the game's frame run FRAMES times (default 300) back to back under a
//     DevTools CPU profile, self time by function and line of index.html (line 2 is three.js), the top TOP
//     (default 25), and the time per frame with and without rendering;
//  3. what allocates every frame: a sampled allocation profile over the same frames, by line.
// EVENT=1 profiles during a Garden Event instead of quiet play. Run on its own (one browser at a time):
//   NODE_PATH=/opt/node22/lib/node_modules NOSHOT=1 node shot2.js http://localhost:8765/index.html x.png ./t_perf.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  const TOP = +(process.env.TOP || 25);
  // (catch the animation loop's frame function as three.js asks for each frame)
  // (several loops ask for frames; every distinct callback is kept, and the game's is the one that moves Re.t)
  await p.addInitScript(() => { const raf = window.requestAnimationFrame.bind(window), seen = (window.__rafs = new Set()); window.requestAnimationFrame = (cb) => (seen.add(cb), raf(cb)); });
  await p.reload(); await W(+(process.env.WAIT || 6000));
  { const vs = p.viewportSize(); await p.mouse.click(vs.width / 2, vs.height / 2); } await W(2500);
  // ---- 1. views
  const views = await p.evaluate(() => {
    const SPOTS = { spawn: [0, 2, Math.PI], garden_edge: [0, 17, Math.PI], dance_floor: [-28, 10, Math.PI / 2], library: [-18, -18, -3 * Math.PI / 4], post_office: [18, -18, 3 * Math.PI / 4], plant_row: [30, 0, -Math.PI / 2], south_gate: [0, 45, 0], juice_bar: [-30, -2, Math.PI / 2] };
    const cam = new THREE.PerspectiveCamera(100, 1, 0.15, B.far), out = {}, info = O.info;
    // who a mesh belongs to: a creature, a named part (the town's bins), the building or station it stands in,
    // the garden, or else where it is
    const ownerOf = (o, c) => {
      for (let a = o; a; a = a.parent) { const e = It.all.find((q) => q.group === a); if (e) return 'creature ' + e.def.name; }
      if (st.group) for (let a = o; a; a = a.parent) if (a === st.group) return 'creature SPARKAKUS';
      for (let a = o; a; a = a.parent) if (a.name) return a.name;
      if (o.geometry.boundingSphere.radius > 100) return 'ground';
      for (const Bd of F.buildings) if (F.inHull(Bd, c.x, c.z, 1.5)) return 'building ' + Bd.name;
      if (Math.hypot(c.x, c.z) < JGP.GARDEN_R + 1.5) return 'garden';
      const zs = z.list.find((q) => Math.hypot(q.x - c.x, q.z - c.z) < 4); if (zs) return 'station ' + zs.id;
      return o.geometry.boundingSphere.radius > 100 ? 'ground' : `at ${c.x.toFixed(0)},${c.z.toFixed(0)}`;
    };
    // (render to a small target: the counts don't depend on resolution)
    O.setSize(256, 256, !1);
    for (const [name, [x, z, yaw]] of Object.entries(SPOTS)) {
      let calls = 0, tris = 0;
      const per = [];
      for (const dy of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
        cam.position.set(x, 1.6, z); cam.rotation.set(-0.08, yaw + dy, 0, 'YXZ'); cam.updateMatrixWorld(!0);
        info.autoReset = !1; info.reset(); O.render(C, cam);
        calls = Math.max(calls, info.render.calls); tris = Math.max(tris, info.render.triangles);
      }
      // what is drawn looking along the spot's own heading: three.js's own render list (each item is one draw)
      cam.rotation.set(-0.08, yaw, 0, 'YXZ'); cam.updateMatrixWorld(!0);
      info.reset(); O.render(C, cam);
      const rl = O.renderLists.get(C, 0);
      for (const it of [...rl.opaque, ...(rl.transmissive || []), ...rl.transparent]) {
        const o = it.object, g = it.geometry;
        g.boundingSphere || g.computeBoundingSphere();
        const c = g.boundingSphere.center.clone().applyMatrix4(o.matrixWorld);
        const n = (it.group ? it.group.count : g.index ? g.index.count : g.attributes.position.count) / 3 * (o.isInstancedMesh ? o.count : 1);
        per.push([Math.round(n), ownerOf(o, c)]);
      }
      per.sort((a, b) => b[0] - a[0]);
      const by = new Map(); per.forEach(([n, w]) => { const g = w.startsWith('at ') ? 'elsewhere' : w.replace(/_[sq]\d+$/, ''); const r = by.get(g) || [0, 0]; r[0]++, (r[1] += n); by.set(g, r); });
      const where = new Map(); per.forEach(([n, w]) => w.startsWith('at ') && where.set(w, (where.get(w) || 0) + 1));
      out[name] = { calls, tris, meshesInView: per.length, top: per.slice(0, 5).map(([n, w]) => `${w} ${n}`).join(' | '), by: [...by.entries()].sort((a, b) => b[1][0] - a[1][0]).slice(0, 14).map(([g, [m, t]]) => `${g} ${m}d/${(t / 1e3).toFixed(1)}k`).join(', '), where: [...where.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w, k]) => `${w.slice(3)}:${k}`).join(' ') };
    }
    // the whole scene by owner: drawable meshes (each one draw when in view) and triangles
    const all = new Map();
    C.traverse((o) => {
      if (!o.isMesh || !o.visible || !o.geometry || !o.geometry.attributes.position) return;
      for (let a = o.parent; a; a = a.parent) if (!a.visible) return;
      o.geometry.boundingSphere || o.geometry.computeBoundingSphere();
      const c = o.geometry.boundingSphere.center.clone().applyMatrix4(o.matrixWorld), w = ownerOf(o, c), g = w.startsWith('at ') ? 'elsewhere' : w.replace(/_[sq]\d+$/, ''), r = all.get(g) || [0, 0];
      r[0] += Array.isArray(o.material) ? o.material.length : 1; r[1] += (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3 * (o.isInstancedMesh ? o.count : 1);
      all.set(g, r);
    });
    out.__scene = [...all.entries()].sort((a, b) => b[1][1] - a[1][1]).slice(0, 30).map(([g, [m, t]]) => `${g} ${m}m/${(t / 1e3).toFixed(1)}k`).join(', ');
    info.autoReset = !0; O.setSize(innerWidth, innerHeight);
    let meshes = 0, mats = new Set(); C.traverse((o) => { if (o.isMesh) { meshes++; (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => mats.add(m)); } });
    return { views: out, programs: info.programs.length, textures: info.memory.textures, geometries: info.memory.geometries, meshes, materials: mats.size };
  });
  log('== views (max over 4 headings; draw calls / triangles; the draws of the forward view itemised)');
  log('== the whole scene by owner (meshes/triangles), top 30: ' + views.views.__scene); delete views.views.__scene;
  for (const [k, v] of Object.entries(views.views)) log(`  ${k.padEnd(12)} ${String(v.calls).padStart(4)} draws ${String(v.tris).padStart(8)} tris ${String(v.meshesInView).padStart(4)} meshes   biggest: ${v.top}\n      draws by owner (draws/triangles): ${v.by}\n      'elsewhere' draws at: ${v.where}`);
  log(`== totals: programs ${views.programs}, textures ${views.textures}, geometries ${views.geometries}, meshes ${views.meshes}, materials ${views.materials}`);
  // ---- 2 and 3: CPU and allocations per frame. Headless rendering runs in another process, so left to itself the
  // page sits idle between a handful of frames; instead the game's own frame (captured from requestAnimationFrame
  // as the page starts, see the init script) is called FRAMES times back to back while the profilers run.
  if (process.env.EVENT) await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  else await p.evaluate(() => At.position.set(-6, 0, 12));
  await W(3000);
  const FRAMES = +(process.env.FRAMES || 300);
  log('frame function found:', await p.evaluate(() => { for (const cb of __rafs) { const t0 = Re.t; try { cb(performance.now() + 16); } catch (e) {} if (Re.t !== t0) return !!(window.__frame = cb); } return !1; }));
  const run = (stub) => p.evaluate(([n, stub]) => {
    const f = window.__frame, r0 = O.render;
    if (!f) return null;
    stub && (O.render = () => {});
    const t0 = performance.now();
    for (let k = 0; k < n; k++) f(performance.now());
    const ms = (performance.now() - t0) / n;
    O.render = r0;
    return ms;
  }, [FRAMES, stub]);
  await run(!1); // (warm up)
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 100 });
  await cdp.send('HeapProfiler.enable'); await cdp.send('HeapProfiler.startSampling', { samplingInterval: 2048 });
  await cdp.send('Profiler.start');
  const msAll = await run(!1);
  const { profile } = await cdp.send('Profiler.stop');
  const { profile: heap } = await cdp.send('HeapProfiler.stopSampling');
  const msLogic = await run(!0);
  log(`== per frame (desktop mode, ${FRAMES} frames back to back): ${msAll.toFixed(2)} ms in all, ${msLogic.toFixed(2)} ms without rendering (logic), ${(msAll - msLogic).toFixed(2)} ms rendering (three.js on the CPU)`);
  // self time per (function, line) in the page's scripts (line 2 is three.js)
  const dt = profile.timeDeltas || [], self = new Map(), byId = new Map(profile.nodes.map((n) => [n.id, n]));
  let total = 0;
  profile.samples.forEach((id, k) => { const n = byId.get(id), d = dt[k] || 0; total += d; const cf = n.callFrame, key = cf.url && cf.url.includes('index.html') ? `${cf.functionName || '(anon)'} @${cf.lineNumber + 1}` : cf.functionName ? `[${cf.functionName}]` : '[native/idle]'; self.set(key, (self.get(key) || 0) + d); });
  log(`== CPU self time over those frames (line 2 = three.js), top ${TOP}`);
  [...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, TOP).forEach(([k, v]) => log(`  ${(100 * v / total).toFixed(1).padStart(5)}%  ${(v / 1e3 / FRAMES).toFixed(3).padStart(7)} ms/frame  ${k}`));
  // allocations by line (sampled)
  const alloc = new Map();
  const walk = (n) => { const cf = n.callFrame, sz = (n.selfSize || 0); if (sz && cf.url && cf.url.includes('index.html')) { const k = `${cf.functionName || '(anon)'} @${cf.lineNumber + 1}`; alloc.set(k, (alloc.get(k) || 0) + sz); } (n.children || []).forEach(walk); };
  walk(heap.head);
  const at = [...alloc.values()].reduce((a, b) => a + b, 0);
  log(`== allocations by the page's code: ${(at / FRAMES / 1e3).toFixed(1)} KB per frame (sampled), top 15`);
  [...alloc.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([k, v]) => log(`  ${(v / FRAMES / 1e3).toFixed(2).padStart(7)} KB/frame  ${k}`));
  log('err', await p.evaluate(() => Re.errors));
};
