// The church from outside, for the exterior rework after the owner's photos: from the south walk (the player's
// view walking up to it), from the garden, its front close, its right side with the Garden window and the X, its
// back from the fence corner, and the tower top (<out>_*.png). Views in the church's own frame via F.world.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_churchout.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(2500);
  const shot = (name, e, t, fov = 55) => p.evaluate(([name, e, t, fov]) => {
    const Bd = F.buildings.find((b) => b.name === 'church'), c = new THREE.PerspectiveCamera(fov, 4 / 3, 0.05, 400);
    const [ex, ez] = F.world(Bd, e[0], e[2]), [tx, tz] = F.world(Bd, t[0], t[2]);
    c.position.set(ex, e[1], ez); c.lookAt(tx, t[1], tz); c.updateMatrixWorld(); c.updateProjectionMatrix();
    O.setSize(960, 720, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }, [name, e, t, fov]).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  // (local frame: +z is the front, toward the square; -z toward its back at the fence)
  await shot('walk', [0, 1.6, 26], [0, 9, 0], 60);
  await shot('garden', [8, 1.6, 44], [0, 9, 0], 55);
  await shot('front', [5, 2.0, 14], [0, 7, 0], 60);
  await shot('door', [1.5, 1.6, 8], [0, 4, 2], 60);
  await shot('side', [16, 1.7, -8], [0, 5, -9], 60);
  await shot('back', [-12, 1.6, -30], [0, 7, -12], 60);
  await shot('tower', [14, 14, 14], [0, 15, 0], 50);
  await shot('high', [22, 20, 24], [0, 6, -6], 50);
  log('err', await p.evaluate(() => Re.errors));
};
