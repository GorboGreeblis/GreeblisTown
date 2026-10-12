// Renders the church's secret inside for checking against the owner's photo of the Ancient, and the way in from outside:
// outside at the right-hand Garden window (only the small red X under it marks the way in), inside from just past it, down the nave
// both ways, the Ancient close up, and the ceiling. Views are in the church's own frame (F.local / F.world).
// Writes <out>_<view>.png. Run: NOSHOT=1 node shot2.js <url> church.png ./churchshots.js
module.exports = async (p, out) => {
  const fs = require('fs');
  await p.mouse.click(640, 60); await p.waitForTimeout(2500);
  const shots = await p.evaluate(() => {
    const Bd = F.buildings.find((b) => b.name === 'church'), D = 18, cam = new THREE.PerspectiveCamera(70, 4 / 3, 0.05, 300), out = {};
    O.setSize(800, 600, !1);
    // eye and target given in the church's frame (local +x = its right as you face it, -z = towards its back)
    const view = (name, e, t, fov = 70) => {
      const [ex, ez] = F.world(Bd, e[0], e[2]), [tx, tz] = F.world(Bd, t[0], t[2]);
      cam.fov = fov, cam.updateProjectionMatrix();
      cam.position.set(ex, e[1], ez); cam.lookAt(tx, t[1], tz); cam.updateMatrixWorld(!0);
      O.render(C, cam); out[name] = O.domElement.toDataURL('image/png');
    };
    view('outside_window', [9.5, 1.6, -D / 2 + 1.5], [6, 1.8, -D / 2]);
    view('inside_from_window', [4.6, 1.6, -D / 2], [-3, 1.0, -D / 2]);
    view('down_nave', [0, 1.6, -2.4], [0, 1.0, -D + 1]);
    view('up_nave', [0, 1.6, -D + 1.2], [0, 1.6, -1.5]);
    view('slug', [1.8, 1.2, -9.4], [0, 0.1, -11.6]);
    view('slug_head', [1.4, 0.6, -9.2], [0.55, 0.2, -9.95], 50);
    view('ceiling', [0, 1.6, -9], [0, 9.2, -12]);
    O.setSize(innerWidth, innerHeight);
    return out;
  });
  for (const [v, d] of Object.entries(shots)) fs.writeFileSync(out.replace('.png', `_${v}.png`), Buffer.from(d.split(',')[1], 'base64'));
  console.log('err', await p.evaluate(() => Re.errors));
};
