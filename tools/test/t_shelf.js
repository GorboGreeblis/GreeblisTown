// The Library's shelf items (the four hardbacks, OVERCOMING SHYNESS, the Wish and Electric Blossoms and the
// acorn), each rendered from 1.1 m in front at a standing eye's height: for checking the covers' titles read (the
// owner's rule: in-world text is big enough for VR) and nothing clips the shelf above. One PNG per item,
// <out>_<item>.png, from JGP.libLayout.shown.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_shelf.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms);
  await p.mouse.click(160, 120); await W(2500);
  const list = await p.evaluate(() => JGP.libLayout.shown.map((s) => s.what));
  for (let k = 0; k < list.length; k++) {
    const d = await p.evaluate((k) => {
      const s = JGP.libLayout.shown[k], v = new THREE.Vector3(...s.at); s.obj.updateMatrixWorld(!0); s.obj.localToWorld(v);
      const wf = s.face + s.obj.rotation.y, c = new THREE.PerspectiveCamera(45, 4 / 3, 0.05, 400);
      c.position.set(v.x + 1.1 * Math.sin(wf), v.y + 0.45, v.z + 1.1 * Math.cos(wf)); c.lookAt(v.x, v.y, v.z);
      const fog = C.fog; C.fog = null; O.setSize(400, 300, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); C.fog = fog; return d;
    }, k);
    fs.writeFileSync(out.replace('.png', '_' + list[k] + '.png'), Buffer.from(d.split(',')[1], 'base64'));
  }
  console.log('shelf items', list.join(', '), '| err', await p.evaluate(() => Re.errors));
};
