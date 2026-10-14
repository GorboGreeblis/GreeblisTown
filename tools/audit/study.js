// Large study renders of builders built directly (no spawn batching), every layer shown: each is built alone with the
// rest of the scene hidden, animated 60 steps and rendered at 480×480 px from two angles (tile them with
// test/tile.py sheet).
// Env: SPECS (path to a JSON file of [[label, builder key, def, opts], …]).
// Output: nothing printed; <out>_<label>_0.png and <out>_<label>_1.png per spec.
//   SPECS=specs.json NOSHOT=1 node test/shot.js <url> study.png audit/study.js
const fs = require('fs');
const { savePng, outName } = require('../test/lib.js');

module.exports = async (p, out) => {
  const specs = JSON.parse(fs.readFileSync(process.env.SPECS, 'utf8'));
  const res = await p.evaluate((specs) => {
    const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 500), out = []; cam.layers.enableAll(); O.setSize(480, 480, false);
    try { At.visible = false; gcEB.ready = false; } catch (e) {}
    const hidden = []; C.children.forEach((ch) => { if (ch.visible && !ch.isLight) { hidden.push(ch); ch.visible = false; } });
    for (const [label, b, def, opts] of specs) {
      const g = new THREE.Group(); C.add(g); const r = so[b](g, Object.assign({}, def), opts || {}) || {};
      const fe = { group: g, def, home: new THREE.Vector3(), moving: false, pt: 0, seed: 1 };
      for (let k = 0; k < 60; k++) try { r.anim && r.anim(0.1 * k, 0.1, fe); } catch (e) {}
      g.updateMatrixWorld(true);
      const box = new THREE.Box3(), mb = new THREE.Box3(), mc = new THREE.Vector3(), c = new THREE.Vector3(), sz = new THREE.Vector3();
      g.traverse((m) => { if (!m.isMesh) return; mb.setFromObject(m); if (mb.isEmpty()) return; mb.getCenter(mc); if (Math.hypot(mc.x, mc.z) < 3.5 && mc.y < 7) box.union(mb); });
      box.getCenter(c); box.getSize(sz); const rr = Math.max(sz.x, sz.y, sz.z) * 0.5 + 0.15, imgs = [];
      for (const a of [0.4, 1.9]) { cam.position.set(c.x + Math.sin(a) * rr * 3.6, c.y + rr * 0.7, c.z + Math.cos(a) * rr * 3.6); cam.lookAt(c); O.render(C, cam); imgs.push(O.domElement.toDataURL('image/png')); }
      C.remove(g); out.push([label, imgs]);
    }
    hidden.forEach((ch) => (ch.visible = true)); return out;
  }, specs);
  res.forEach(([lb, imgs]) => imgs.forEach((d, j) => savePng(outName(out, lb + '_' + j), d)));
};
