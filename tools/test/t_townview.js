// The town outside the park, for the background pass: a top-down map of everything out to the prairie
// (<out>_map.png) and the views out of the square a player has, from 1.6 m up at each side of the park
// (<out>_n/_s/_e/_w.png), and the town's static triangle count (the merged scenery meshes).
//   VW=320 VH=240 NOSHOT=1 node shot.js <url> x.png ./t_townview.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(2500);
  const shot = (name, cam, look, ortho) => p.evaluate(([cam, look, ortho]) => {
    let c;
    if (ortho) { c = new THREE.PerspectiveCamera(2 * Math.atan(ortho / cam[1]) * 180 / Math.PI, 1, 10, 2000); c.up.set(0, 0, -1); }
    else c = new THREE.PerspectiveCamera(70, 16 / 9, 0.1, 900);
    c.position.set(...cam); c.lookAt(...look); c.updateMatrixWorld(); c.updateProjectionMatrix();
    const fog = C.fog, hid = [];
    if (ortho) { C.fog = null; C.traverse((o) => { if (o.visible && o.isMesh && o.getWorldPosition(new THREE.Vector3()).y > 40) (o.visible = !1), hid.push(o); }); }
    ortho ? O.setSize(1000, 1000, !1) : O.setSize(1280, 720, !1); O.render(C, c); C.fog = fog; hid.forEach((o) => (o.visible = !0)); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }, [cam, look, ortho]).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
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
  log('err', await p.evaluate(() => Re.errors));
};
