// The town outside the park: a top-down map of everything out to the prairie, the views out of the square a player
// has from 1.6 m up at each side of the park, close-ups of every building and lore piece outside it, the park fence's
// pickets from inside (their open tops must never show), the Library's rug from above, and the town's triangle and
// mesh counts (the merged scenery meshes, named town_*).
// Env: none.
// Output: `town meshes (name: triangles): {…} | total <n> in <n> meshes`, `err <n>`; <out>_map.png (1000×1000 px),
//   <out>_n/_s/_sw/_e/_w.png, <out>_c<k>.png, <out>_fence1/2.png and <out>_rug.png (1280×720 px).
//   VW=320 VH=240 NOSHOT=1 node test/shot.js <url> x.png test/t_townview.js
const { log, start, render, outName, logErrors } = require('./lib.js');

module.exports = async (p, out) => {
  await start(p, 2500);
  // (a map is a narrow lens from high above, its sky hidden; a view is a 70° lens at 16:9)
  const shot = (name, cam, look, ortho) => render(p, outName(out, name), cam, look, ortho
    ? { fov: (2 * Math.atan(ortho / cam[1]) * 180) / Math.PI, w: 1000, h: 1000, near: 10, far: 2000, up: [0, 0, -1], fog: false, hideAbove: 40 }
    : { fov: 70, w: 1280, h: 720, near: 0.1, far: 900 });
  await shot('map', [0, 900, 8], [0, 0, 8], 118);
  await shot('n', [0, 1.6, -18], [0, 8, -90]);
  await shot('s', [12, 1.6, 22], [20, 8, 110]);
  await shot('sw', [-12, 1.6, 22], [-40, 8, 110]);
  await shot('e', [12, 1.6, 5], [100, 9, 5]);
  await shot('w', [-12, 1.6, 12], [-100, 8, 18]);
  // close-ups (<out>_c*.png): Main Street east and west store by store, the north side, the south street's homes,
  // the lore pieces out past them, and the park fence's pickets from inside (their open tops must never show)
  const close = [
    [52.6, 6, -11, 15], [52.6, 5, -1, 13], [52.6, 6, 9, 15], [52.6, 6, 20, 15], [52.6, 6, 30.5, 15], [52.6, 6, 41.5, 15],
    [-52.6, 6, 40.2, 15], [-52.6, 6, 26.6, 15], [-52.6, 5, 14.7, 13], [-52.6, 6, 2.8, 15], [-52.6, 4, -9.1, 13], [-52.6, 6, -20.4, 15], [-52.6, 5, -31.8, 13],
    [0, 9, -62, 34], [29, 4, -58, 18], [-70, 7, -55, 20], [72, 4, -62, 16], [56, 7, -60, 18], [-34, 2, -86, 16, -34, -104], [-26, 8, -72, 16],
    [-64, 5, 70, 16], [-32, 5, 70, 16], [-16, 4, 70, 16], [0, 4, 70, 16], [16, 4, 70, 16], [32, 5, 70, 16], [66, 5, 70, 16], [84, 5, 70, 16],
    [-55, 9, -55, 26], [84, 24, -4, 30], [88, 14, -38, 14], [40, 12, 96, 30], [-33, 3, 96, 10],
  ];
  for (let k = 0; k < close.length; k++) {
    const [x, y, z, d, fx, fz] = close[k], a = Math.atan2(-x, -z + 8);
    await shot('c' + k, fx === undefined ? [x + d * Math.sin(a), Math.max(1.6, y - 2), z + d * Math.cos(a)] : [fx, Math.max(1.6, y + 2), fz], [x, y, z]);
  }
  // the fence from inside the park: at a stroll's distance and right up at it, looking down at the pickets
  await shot('fence1', [0, 1.6, -30], [0, 1.0, -37.6]);
  await shot('fence2', [0.3, 1.6, -36.2], [0.3, 0.9, -37.6]);
  // the Library's rug from above, SPARKAKUS hidden (<out>_rug.png)
  const rq = await p.evaluate(() => { const B0 = F.buildings.find((b) => b.name === 'shop'); return [B0.x, B0.z, B0.ry || 0]; });
  await p.evaluate(() => (st.group.visible = !1));
  await shot('rug', [rq[0] + 0.01, 9, rq[1] - 2.9 + 0.01], [rq[0], 0, rq[1] - 3]);
  await p.evaluate(() => (st.group.visible = !0));
  log('town meshes (name: triangles):', await p.evaluate(() => {
    const r = {}; let n = 0;
    C.traverse((o) => { if (o.isMesh && /^town_/.test(o.name || '')) { const g = o.geometry, t = Math.round((g.index ? g.index.count : g.attributes.position.count) / 3); r[o.name] = t; n += t; } });
    return JSON.stringify(r) + ' | total ' + n + ' in ' + Object.keys(r).length + ' meshes';
  }));
  await logErrors(p);
};
