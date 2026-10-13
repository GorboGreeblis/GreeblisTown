// A bird in a park tree (the cardinal in the north-east maple by default; AT=x,z picks another tree's bird, the
// robin's oak being AT=-17,-34): close-ups from its side, front, back and from below (<out>_c*.png),
// the view a player has of it from the walk (<out>_walk.png), a few frames of its hop and look-about, and a
// check that nothing of it or its bough is inside the tree's crowns (the bird's highest point against the crown's
// lowest over it).
//   VW=320 VH=240 NOSHOT=1 [AT=-17,-34] node shot2.js <url> x.png ./t_cardinal.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(2000);
  const shot = (name, cam, look, fov = 35) => p.evaluate(([cam, look, fov]) => {
    const c = new THREE.PerspectiveCamera(fov, 4 / 3, 0.02, 300);
    c.position.set(...cam); c.lookAt(...look); c.updateMatrixWorld(); c.updateProjectionMatrix();
    O.setSize(800, 600, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }, [cam, look, fov]).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  // the bird's group: the kept group at the maple's foot; its one group child is the bird
  const AT = (process.env.AT || '31,-33.5').split(',').map(Number);
  const B = await p.evaluate((AT) => {
    const o = C.children.find((g) => g.userData.jgpKeep && Math.abs(g.position.x - AT[0]) < 0.01 && Math.abs(g.position.z - AT[1]) < 0.01);
    if (!o) return null;
    o.updateMatrixWorld(!0);
    const P = o.children.find((c) => c.isGroup), v = new THREE.Vector3(), bx = new THREE.Box3().setFromObject(P);
    P.getWorldPosition(v);
    const f = o.rotation.y + P.rotation.y;
    return { at: [v.x, v.y, v.z], face: f, top: bx.max.y, bottom: bx.min.y, size: [bx.max.x - bx.min.x, bx.max.y - bx.min.y, bx.max.z - bx.min.z] };
  }, AT);
  if (!B) return log('no bird found at', AT.join(','));
  log('bird at', B.at.map((v) => +v.toFixed(2)).join(','), '| size (m)', B.size.map((v) => +v.toFixed(2)).join(' x '), '| top', B.top.toFixed(2));
  const [x, y, z] = B.at, f = B.face, d = 1.1;
  await shot('c_side', [x + d * Math.sin(f + Math.PI / 2), y + 0.35, z + d * Math.cos(f + Math.PI / 2)], [x, y + 0.2, z]);
  await shot('c_front', [x + d * Math.sin(f), y + 0.3, z + d * Math.cos(f)], [x, y + 0.2, z]);
  await shot('c_back', [x + d * Math.sin(f + Math.PI), y + 0.4, z + d * Math.cos(f + Math.PI)], [x, y + 0.2, z]);
  await shot('c_3q', [x + d * Math.sin(f + 0.7), y + 0.5, z + d * Math.cos(f + 0.7)], [x, y + 0.2, z]);
  await shot('c_below', [x + 0.6 * Math.sin(f + Math.PI / 2), y - 1.4, z + 0.6 * Math.cos(f + Math.PI / 2)], [x, y + 0.1, z], 40);
  // from the walk: a player 5 m off toward the square, eye height, looking up at it; and from 12 m
  const toSq = Math.atan2(0 - x, 6 - z);
  await shot('walk', [x + 5 * Math.sin(toSq), 1.6, z + 5 * Math.cos(toSq)], [x, y, z], 50);
  await shot('walk12', [x + 12 * Math.sin(toSq), 1.6, z + 12 * Math.cos(toSq)], [x, y - 0.5, z], 50);
  // its life: frames 0.5 s apart from its side (<out>_m*.png), the head's turn and the hop read in them
  for (let k = 0; k < 6; k++) { await shot('m' + k, [x + 1.3 * Math.sin(f + Math.PI / 2), y + 0.35, z + 1.3 * Math.cos(f + Math.PI / 2)], [x, y + 0.2, z]); await W(500); }
  // clearance: the lowest crown vertex within 0.6 m (in x, z) of the bird's top, over it
  const cl = await p.evaluate(([bx, bz, top]) => {
    let lo = 1e9; const v = new THREE.Vector3();
    C.traverse((o) => { if (!o.isMesh || !/^town_plain/.test(o.name || '')) return; const P = o.geometry.attributes.position; for (let k = 0; k < P.count; k++) { v.fromBufferAttribute(P, k).applyMatrix4(o.matrixWorld); if (Math.abs(v.x - bx) < 0.6 && Math.abs(v.z - bz) < 0.6 && v.y > top - 0.5) lo = Math.min(lo, v.y); } });
    return lo;
  }, [x, z, B.top]);
  log('crown clearance over the bird (m):', cl < 1e8 ? +(cl - B.top).toFixed(2) : 'none within 0.6 m');
  log('err', await p.evaluate(() => Re.errors));
};
