// What the scene is made of, for the optimisation pass: every object counted (meshes, groups, how many still
// update their matrix every frame), the batches of the creature batcher per owner (creatures, and the scenery it
// batches too) with their part counts, and which batched parts ever move: the game runs WATCH_S seconds (default
// 20; EVENT=1 starts a Garden Event first) and every part whose world matrix or visibility changed in that time is
// listed by owner, so a still batch (one that never changes) can be told from a live one.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_static.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(160, 120); await W(2500);
  const secs = +(process.env.WATCH_S || 20);
  process.env.EVENT === '1' && (await p.evaluate(() => { Kt.rewards.stone = !0; me.tryStart && me.tryStart(); }));
  const head = await p.evaluate(() => {
    let objs = 0, meshes = 0, groups = 0, autoOn = 0, hidden = 0;
    C.traverse((o) => { objs++; o.isMesh && meshes++; o.isGroup && groups++; o.matrixAutoUpdate && autoOn++; o.isMesh && 31 === o.layers.mask && hidden++; });
    const owner = (o) => {
      for (let a = o; a; a = a.parent) { const e = It.all.find((q) => q.group === a); if (e) return 'creature ' + e.def.name; }
      if (st.group) for (let a = o; a; a = a.parent) if (a === st.group) return 'creature SPARKAKUS';
      if (o === At || (o.parent && o.parent === At)) return 'avatar';
      for (let a = o; a && a !== C; a = a.parent) if (a.name) return a.name;
      let top = o; for (; top.parent && top.parent !== C; top = top.parent);
      const q = top.position; return 'at ' + q.x.toFixed(0) + ',' + q.z.toFixed(0);
    };
    window.__own = owner;
    const by = {};
    for (const b of gcEB.list) { const k = owner(b.P[0].o); (by[k] = by[k] || { batches: 0, parts: 0 }); by[k].batches++; by[k].parts += b.P.length; }
    // (a snapshot of every part's matrix and on-state, to compare after the watch)
    window.__snap = gcEB.list.map((b) => b.P.map((q) => q.o.matrixWorld.elements.join(',') + '|' + q.st));
    return { objs, meshes, groups, autoOn, hiddenParts: hidden, batches: gcEB.list.length, N: gcEB.N, by };
  });
  log('scene:', JSON.stringify({ objs: head.objs, meshes: head.meshes, groups: head.groups, matrixAutoUpdate: head.autoOn, batchedParts: head.hiddenParts, batches: head.batches, N: head.N }));
  log('batches by owner (batches/parts):', Object.entries(head.by).map(([k, v]) => k + ' ' + v.batches + '/' + v.parts).join(', '));
  const t0 = await p.evaluate(() => Re.t);
  for (let k = 0; k < 2000 && (await p.evaluate(() => Re.t)) - t0 < secs; k++) {
    // (what changed so far is folded in every second, so a thing that moves only for a moment is still caught)
    await p.evaluate(() => { const ch = (window.__chg = window.__chg || new Set()); gcEB.list.forEach((b, i) => b.P.forEach((q, j) => { const s = q.o.matrixWorld.elements.join(',') + '|' + q.st; window.__snap[i] && s !== window.__snap[i][j] && ch.add(i + ':' + j); })); });
    await W(1000);
  }
  const live = await p.evaluate(() => {
    const by = {}; let n = 0;
    for (const key of window.__chg || []) { const [i, j] = key.split(':').map(Number), b = gcEB.list[i]; if (!b) continue; const k = window.__own(b.P[j].o); by[k] = (by[k] || 0) + 1; n++; }
    const still = gcEB.list.filter((b, i) => !b.P.some((q, j) => (window.__chg || new Set()).has(i + ':' + j)));
    return { n, by, stillBatches: still.length, stillParts: still.reduce((a, b) => a + b.P.length, 0) };
  });
  log('parts that moved, came, went or changed in ' + secs + ' s: ' + live.n + ' | by owner: ' + Object.entries(live.by).map(([k, v]) => k + ' ' + v).join(', '));
  log('still batches (nothing in them changed): ' + live.stillBatches + ' with ' + live.stillParts + ' parts');
  log('err', await p.evaluate(() => Re.errors));
};
