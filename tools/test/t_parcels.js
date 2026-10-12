// The five readable parcels round the mail heap behind the Post Office: each label's facing checked (the dot of
// the label's normal with the direction out of the heap, and its tip toward the eye; 1 is straight out), each
// rendered from 1.7 m in front at eye height (<out>_<name>.png), and the heap from the walk round it on four sides.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_parcels.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(2000);
  const shot = (name, cam, look, fov = 50) => p.evaluate(([cam, look, fov]) => {
    const c = new THREE.PerspectiveCamera(fov, 16 / 9, 0.05, 300);
    c.position.set(...cam); c.lookAt(...look); c.updateMatrixWorld(); c.updateProjectionMatrix();
    O.setSize(1280, 720, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }, [cam, look, fov]).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  // the labels: every mesh in the Post Office's group mapped with a 256 x 128 painted label
  const L = await p.evaluate(() => {
    const k = F.buildings.find((b) => b.name === 'post'), g = C.children.find((o) => Math.abs(o.position.x - k.x) < 0.01 && Math.abs(o.position.z - k.z) < 0.01 && o.children.length);
    if (!g) return null;
    g.updateMatrixWorld(!0);
    const r = [], v = new THREE.Vector3(), n = new THREE.Vector3(), cen = new THREE.Vector3(0, 0, -4.67).applyMatrix4(g.matrixWorld);
    g.traverse((o) => {
      const im = o.isMesh && o.material && o.material.map && o.material.map.image;
      if (!im || im.width !== 256 || im.height !== 128) return;
      o.getWorldPosition(v); n.set(0, 0, 1).transformDirection(o.matrixWorld);
      const outDir = v.clone().sub(cen); outDir.y = 0; outDir.normalize();
      const flat = n.clone(); flat.y = 0; const dot = flat.normalize().dot(outDir);
      r.push({ at: [v.x, v.y, v.z], n: [n.x, n.y, n.z], out: +dot.toFixed(3), up: +n.y.toFixed(3) });
    });
    return r;
  });
  if (!L) return log('no Post Office group found');
  log('labels found:', L.length, '| facing out (1 = straight out):', L.map((q) => q.out).join(' '), '| tipped up:', L.map((q) => q.up).join(' '));
  let k = 0;
  for (const q of L) await shot('label' + k++, [q.at[0] + 1.7 * q.n[0], q.at[1] + 1.1, q.at[2] + 1.7 * q.n[2]], q.at, 40);
  const K = await p.evaluate(() => { const k = F.buildings.find((b) => b.name === 'post'); return [k.x, k.z, k.ry || 0]; });
  const at = (lx, lz) => { const c = Math.cos(K[2]), sn = Math.sin(K[2]); return [K[0] + lx * c + lz * sn, K[1] - lx * sn + lz * c]; };
  const t0 = at(0, -4.7);
  for (const [name, lx, lz] of [['side_e', 7.5, -4.7], ['side_back', 0, -11], ['side_w', -7.5, -4.7], ['side_front', 6.5, -1.5]]) { const c = at(lx, lz); await shot(name, [c[0], 1.6, c[1]], [t0[0], 0.8, t0[1]], 60); }
  log('err', await p.evaluate(() => Re.errors));
};
