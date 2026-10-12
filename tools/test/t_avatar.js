// The player's avatar animation in the desktop / mobile test modes: walks (W held) and stands, rendering
// her from the side mid-stride (<out>_walk1..4.png) and standing (<out>_idle.png), and checks the feet
// never go below the ground and the hands keep clear of the skirt.
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  await p.evaluate(() => {
    At.position.set(-2, 0, 30);
    window.__A = { lowFoot: 9, handIn: 0, frames: 0 };
    const v = new THREE.Vector3(), U = At.userData;
    L.push(() => {
      const A = __A; A.frames++;
      At.updateMatrixWorld(!0);
      ['L', 'R'].forEach((s) => {
        U['shoe' + s].getWorldPosition(v); A.lowFoot = Math.min(A.lowFoot, v.y - 0.062);
        // the hand (the sphere at the arm's end) against the skirt's cone, in the body's frame
        U['arm' + s].localToWorld(v.set(0, -0.5, 0)); At.worldToLocal(v);
        const y = v.y; if (y > 0.64 && y < 1.2) { const rr = 0.46 - (0.26 * (y - 0.64)) / 0.56, d = Math.hypot(v.x, v.z); d - 0.068 < rr - 0.01 && A.handIn++; }
      });
    });
  });
  const side = (name) => p.evaluate(() => {
    const q = At.position, c = new THREE.PerspectiveCamera(40, 4 / 3, 0.1, 300), r = At.rotation.y;
    c.position.set(q.x + 4.5 * Math.cos(r), 1.3, q.z - 4.5 * Math.sin(r)); c.lookAt(q.x, 1.1, q.z);
    O.setSize(800, 600, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  await p.keyboard.down('KeyW');
  await W(1200);
  for (let k = 1; k <= 4; k++) { await side('walk' + k); await W(110); }
  await p.keyboard.up('KeyW');
  await W(2500);
  await side('idle');
  log('avatar:', await p.evaluate(() => JSON.stringify({ frames: __A.frames, lowestFoot: +__A.lowFoot.toFixed(3), handInSkirtFrames: __A.handIn, walkPhase: +(At.userData.legL.rotation.x).toFixed(3) })));
  log('err', await p.evaluate(() => Re.errors));
};
