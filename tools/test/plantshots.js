// Renders each of the five plant kinds for checking against the owner's photos: one at a time put on show on
// open lawn (JGP.plantShow), full-grown with its full model, from three sides at eye height (front, left and
// right, 2.6 m away) and close up on its flowers. Writes <out>_p<k>_<view>.png; tile them with tile.py (e.g. a
// sheet per plant, 4 to a row). ONLY=1,3 renders just those kinds.
//   NOSHOT=1 node shot2.js <url> plants.png ./plantshots.js
module.exports = async (p, out) => {
  const fs = require('fs');
  await p.mouse.click(640, 60); await p.waitForTimeout(2500);
  const only = (process.env.ONLY || '1,2,3,4,5').split(',').map(Number);
  for (const k of only) {
    const shots = await p.evaluate((k) => {
      // (on the lawn east of the square, facing west; the full model shown whatever the distance)
      const X = 34, Z = -6, g = JGP.plantShow(k - 1, X, Z, -Math.PI / 2 + 0.5), cam = new THREE.PerspectiveCamera(40, 4 / 3, 0.05, 200), out = {};
      const [, hi, lo] = JGP.garden.lods.find(([q]) => q === g);
      (hi.visible = !0), (lo.visible = !1), JGP.garden.lods.splice(JGP.garden.lods.findIndex(([q]) => q === g), 1);
      O.setSize(800, 600, !1);
      const view = (name, a, d, h, lookH) => {
        cam.position.set(X + d * Math.cos(a), h, Z + d * Math.sin(a)); cam.lookAt(X, lookH, Z); cam.updateMatrixWorld(!0);
        O.render(C, cam); out[name] = O.domElement.toDataURL('image/png');
      };
      view('front', Math.PI, 2.6, 1.4, 0.9), view('left', Math.PI - 1.1, 2.6, 1.3, 0.9), view('right', Math.PI + 1.1, 2.6, 1.6, 0.9), view('close', Math.PI - 0.4, 1.0, 1.9, 1.35);
      O.setSize(innerWidth, innerHeight), C.remove(g);
      return out;
    }, k);
    for (const [v, d] of Object.entries(shots)) fs.writeFileSync(out.replace('.png', `_p${k}_${v}.png`), Buffer.from(d.split(',')[1], 'base64'));
  }
  console.log('err', await p.evaluate(() => Re.errors));
};
