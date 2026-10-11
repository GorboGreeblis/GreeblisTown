// Renders every plant on the test row (east side of the square) for checking against the owner's photos:
// three views round each at eye height (front, left and right, 2.6 m away) and a close-up of its flowers.
// Writes <out>_p<k>_<view>.png; tile them with tile.py (e.g. a sheet per plant, 4 to a row).
// ONLY=1,3 renders just those plants. Run: NOSHOT=1 node shot2.js <url> plants.png ./plantshots.js
module.exports = async (p, out) => {
  const fs = require('fs');
  await p.mouse.click(640, 60); await p.waitForTimeout(2500);
  const only = (process.env.ONLY || '1,2,3,4,5').split(',').map(Number);
  for (const k of only) {
    const shots = await p.evaluate((k) => {
      // the row's plants: one every 5.77 m from z = -12 at x = 34, each on a mound 5 cm up (see plantRow)
      const X = 34, Z = -12 + 5.77 * (k - 1), cam = new THREE.PerspectiveCamera(40, 4 / 3, 0.05, 200), out = {};
      O.setSize(800, 600, !1);
      const view = (name, a, d, h, lookH) => {
        cam.position.set(X + d * Math.cos(a), h, Z + d * Math.sin(a)); cam.lookAt(X, lookH, Z); cam.updateMatrixWorld(!0);
        O.render(C, cam); out[name] = O.domElement.toDataURL('image/png');
      };
      // (the row faces the square, west: the front view looks from there)
      view('front', Math.PI, 2.6, 1.4, 0.9), view('left', Math.PI - 1.1, 2.6, 1.3, 0.9), view('right', Math.PI + 1.1, 2.6, 1.6, 0.9), view('close', Math.PI - 0.4, 1.0, 1.9, 1.35);
      O.setSize(innerWidth, innerHeight);
      return out;
    }, k);
    for (const [v, d] of Object.entries(shots)) fs.writeFileSync(out.replace('.png', `_p${k}_${v}.png`), Buffer.from(d.split(',')[1], 'base64'));
  }
  console.log('err', await p.evaluate(() => Re.errors));
};
