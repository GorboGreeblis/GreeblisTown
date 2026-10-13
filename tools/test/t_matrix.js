// The scene graph's matrix work per frame, for the optimisation pass: how many objects compose their local matrix
// (position, rotation and scale changed), how many world matrices are multiplied (those and their children, plus
// the renderer's model-view matrices), how many nodes the world-matrix pass visits, and which code forces a
// world-matrix update of its own every frame (by the line in index.html, with the size of the subtree it walks).
// Counted over WATCH_MS milliseconds (default 2000) of quiet play.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_matrix.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await p.mouse.click(160, 120); await W(2500);
  const r = await p.evaluate(async (ms) => {
    const O3 = THREE.Object3D.prototype, M4 = THREE.Matrix4.prototype;
    const cnt = { umw: 0, visited: 0, compose: 0, mult: 0, forced: {} };
    const umw = O3.updateMatrixWorld, comp = M4.compose, mult = M4.multiplyMatrices;
    let depth = 0;
    O3.updateMatrixWorld = function (t) {
      cnt.visited++;
      if (depth === 0) {
        cnt.umw++;
        if (t && this !== C) {
          const st = (new Error().stack || '').split('\n'), ln = (st[2] || '').replace(/.*index\.html:/, '').replace(/\).*/, '');
          let n = 0; this.traverse(() => n++);
          const k = 'line ' + ln + ' (' + n + ' nodes)'; cnt.forced[k] = (cnt.forced[k] || 0) + 1;
        }
      }
      depth++; try { return umw.call(this, t); } finally { depth--; }
    };
    M4.compose = function () { cnt.compose++; return comp.apply(this, arguments); };
    M4.multiplyMatrices = function () { cnt.mult++; return mult.apply(this, arguments); };
    const f0 = O.info.render.frame;
    await new Promise((res) => setTimeout(res, ms));
    const frames = O.info.render.frame - f0;
    O3.updateMatrixWorld = umw; M4.compose = comp; M4.multiplyMatrices = mult;
    let objs = 0; C.traverse(() => objs++);
    const per = (v) => +(v / frames).toFixed(1);
    return { frames, objects: objs, perFrame: { composes: per(cnt.compose), multiplies: per(cnt.mult), nodesVisited: per(cnt.visited), worldPasses: per(cnt.umw) }, forcedPerFrame: Object.entries(cnt.forced).map(([k, v]) => k + ' x' + per(v)).sort().join(' | ') || 'none' };
  }, +(process.env.WATCH_MS || 2000));
  console.log(JSON.stringify(r));
  console.log('err', await p.evaluate(() => Re.errors));
};
