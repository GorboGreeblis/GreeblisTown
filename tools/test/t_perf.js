// Performance profile of the game, for an optimisation pass:
//  1. what each view costs the GPU: draw calls and triangles from a player's eyes (1.6 m up, a 100° VR-like
//     lens) at fixed spots round the park, the biggest draws in each, and the totals of programs, textures,
//     geometries and meshes;
//  2. where the CPU time per frame goes: a DevTools CPU profile over PROF_S seconds (default 8) of play,
//     self time by function and line of index.html, the top TOP (default 25);
//  3. what allocates every frame: a sampled allocation profile over the same stretch, by line.
// EVENT=1 profiles during a Garden Event instead of quiet play. Run on its own (one browser at a time):
//   NODE_PATH=/opt/node22/lib/node_modules NOSHOT=1 node shot2.js http://localhost:8765/index.html x.png ./t_perf.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  const PROF_S = +(process.env.PROF_S || 8), TOP = +(process.env.TOP || 25);
  await p.mouse.click(640, 360); await W(2500);
  // ---- 1. views
  const views = await p.evaluate(() => {
    const SPOTS = { spawn: [0, 20, Math.PI], garden_edge: [0, 17, Math.PI], dance_floor: [-28, 10, Math.PI / 2], library: [-18, -18, -3 * Math.PI / 4], post_office: [18, -18, 3 * Math.PI / 4], plant_row: [30, 0, -Math.PI / 2], south_gate: [0, 45, 0], juice_bar: [-30, -2, Math.PI / 2] };
    const cam = new THREE.PerspectiveCamera(100, 1, 0.15, B.far), out = {}, info = O.info;
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
      // the biggest visible draws looking along the spot's own heading
      cam.rotation.set(-0.08, yaw, 0, 'YXZ'); cam.updateMatrixWorld(!0);
      const fr = new THREE.Frustum().setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse));
      C.traverse((o) => {
        if (!o.isMesh || !o.visible || !o.geometry) return;
        for (let a = o.parent; a; a = a.parent) if (!a.visible) return;
        o.geometry.boundingSphere || o.geometry.computeBoundingSphere();
        const s = o.geometry.boundingSphere.clone().applyMatrix4(o.matrixWorld);
        if (o.frustumCulled !== !1 && !fr.intersectsSphere(s)) return;
        const n = (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3 * (o.isInstancedMesh ? o.count : 1);
        let own = o.name || ''; for (let a = o; a && !own; a = a.parent) a.name && (own = a.name);
        if (!own) for (let a = o; a; a = a.parent) { const e = It.all.find((q) => q.group === a); if (e) { own = 'creature ' + e.def.name; break; } }
        per.push([Math.round(n), own || '?']);
      });
      per.sort((a, b) => b[0] - a[0]);
      out[name] = { calls, tris, meshesInView: per.length, top: per.slice(0, 5).map(([n, w]) => `${w} ${n}`).join(' | ') };
    }
    info.autoReset = !0; O.setSize(innerWidth, innerHeight);
    let meshes = 0, mats = new Set(); C.traverse((o) => { if (o.isMesh) { meshes++; (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => mats.add(m)); } });
    return { views: out, programs: info.programs.length, textures: info.memory.textures, geometries: info.memory.geometries, meshes, materials: mats.size };
  });
  log('== views (max over 4 headings; draw calls / triangles / meshes in the forward view)');
  for (const [k, v] of Object.entries(views.views)) log(`  ${k.padEnd(12)} ${String(v.calls).padStart(4)} draws ${String(v.tris).padStart(8)} tris ${String(v.meshesInView).padStart(4)} meshes   biggest: ${v.top}`);
  log(`== totals: programs ${views.programs}, textures ${views.textures}, geometries ${views.geometries}, meshes ${views.meshes}, materials ${views.materials}`);
  // ---- 2 and 3: CPU and allocations while playing
  if (process.env.EVENT) await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  else await p.evaluate(() => At.position.set(-6, 0, 12));
  await W(3000);
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 200 });
  await cdp.send('HeapProfiler.enable'); await cdp.send('HeapProfiler.startSampling', { samplingInterval: 4096 });
  const f0 = await p.evaluate(() => ({ t: performance.now(), g: Re.t }));
  await cdp.send('Profiler.start'); await W(PROF_S * 1000);
  const { profile } = await cdp.send('Profiler.stop');
  const { profile: heap } = await cdp.send('HeapProfiler.stopSampling');
  const f1 = await p.evaluate(() => ({ t: performance.now(), g: Re.t }));
  // self time per (function, line) in the page's scripts
  const dt = profile.timeDeltas || [], self = new Map(), byId = new Map(profile.nodes.map((n) => [n.id, n]));
  let total = 0;
  profile.samples.forEach((id, k) => { const n = byId.get(id), d = dt[k] || 0; total += d; const cf = n.callFrame, key = cf.url && cf.url.includes('index.html') ? `${cf.functionName || '(anon)'} @${cf.lineNumber + 1}` : cf.functionName ? `[${cf.functionName}]` : '[native/idle]'; self.set(key, (self.get(key) || 0) + d); });
  log(`== CPU over ${PROF_S} s (${((f1.g - f0.g) / ((f1.t - f0.t) / 1e3)).toFixed(2)} game s per wall s): self time, top ${TOP}`);
  [...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, TOP).forEach(([k, v]) => log(`  ${(100 * v / total).toFixed(1).padStart(5)}%  ${(v / 1e3).toFixed(0).padStart(6)} ms  ${k}`));
  // allocations by line (sampled)
  const alloc = new Map();
  const walk = (n) => { const cf = n.callFrame, sz = (n.selfSize || 0); if (sz && cf.url && cf.url.includes('index.html')) { const k = `${cf.functionName || '(anon)'} @${cf.lineNumber + 1}`; alloc.set(k, (alloc.get(k) || 0) + sz); } (n.children || []).forEach(walk); };
  walk(heap.head);
  const at = [...alloc.values()].reduce((a, b) => a + b, 0);
  log(`== allocations in the page's code over ${PROF_S} s (sampled): ${(at / 1e6).toFixed(1)} MB, top 15`);
  [...alloc.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([k, v]) => log(`  ${(v / 1e3).toFixed(0).padStart(7)} KB  ${k}`));
  log('err', await p.evaluate(() => Re.errors));
};
