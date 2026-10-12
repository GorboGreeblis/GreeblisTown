// SPARKAKUS's funky dance at the Garden Event: the Event started with Seeds in, then once FORTIZMO plays and his dance
// weight is up, eight frames over one eight-beat loop from his front-left (<out>_f*.png) and two from his side
// (<out>_s*.png); the lowest point of his model against the ground each frame (a foot or tail through the soil would
// show as a negative), and his paws' nearest approach to his head (clipping would be under ~0.3).
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_spdance.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const shot = (name, cam, look) => p.evaluate(([cam, look]) => {
    const c = new THREE.PerspectiveCamera(45, 4 / 3, 0.05, 300);
    c.position.set(...cam); c.lookAt(...look); c.updateMatrixWorld(); c.updateProjectionMatrix();
    O.setSize(800, 600, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }, [cam, look]).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  await p.evaluate(() => { window.__gbNoThrottle = 1; JGP.visitAt(9e15); Kt.rewards.seeds = Kt.rewards.stone = !0; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  const t0 = await p.evaluate(() => Re.t);
  let ok = !1;
  for (let k = 0; k < 2000; k++) {
    await W(400);
    const r = await p.evaluate(() => [Re.t, me.active, JGP.eventMove, st.dancing]);
    if (r[0] - t0 > 120 || !r[1]) break;
    if (r[2] === 'dance' && r[3] > 0.95) { ok = !0; break; }
  }
  log('dancing:', ok);
  if (!ok) return log('err', await p.evaluate(() => Re.errors));
  const info = () => p.evaluate(() => {
    const g = st.group, v = new THREE.Vector3(), h = new THREE.Vector3(), hd = [];
    g.updateMatrixWorld(!0);
    let lo = 1e9;
    g.traverse((o) => { if (!o.isMesh || !o.geometry.attributes.position) return; const P = o.geometry.attributes.position; for (let k = 0; k < P.count; k += 3) lo = Math.min(lo, v.fromBufferAttribute(P, k).applyMatrix4(o.matrixWorld).y); });
    const q = st.pos(), ground = JGP.groundAt ? JGP.groundAt(q.x, q.z) : 0;
    // the paws (the mitt spheres, found by their orange material under an arm's hand group) against the head's centre
    const heads = []; g.traverse((o) => { if (o.isMesh && o.material && o.material.color && o.material.color.getHexString() === 'f2c21a') { o.getWorldPosition(h); heads.push(h.clone()); } });
    const eye = heads.length ? heads.reduce((a, b) => a.add(b), new THREE.Vector3()).multiplyScalar(1 / heads.length) : null;
    return { lo: +(lo - ground).toFixed(3), eyes: heads.length, ry: +(g.rotation.y).toFixed(2), at: [q.x, q.y, q.z], face: g.rotation.y };
  });
  const a0 = await info();
  log('eyes found', a0.eyes, '| he is at', a0.at.map((v) => +v.toFixed(2)).join(','), '| facing', a0.face.toFixed(2));
  const los = [];
  for (let k = 0; k < 8; k++) {
    // (from in front and above, over the heads of the others round the garden)
    const q = await info(), f = q.face, cx = q.at[0] + 3.6 * Math.sin(f + 0.5), cz = q.at[2] + 3.6 * Math.cos(f + 0.5);
    await shot('f' + k, [cx, 4.0, cz], [q.at[0], 1.4, q.at[2]]);
    if (k % 4 === 1) await shot('s' + k, [q.at[0] + 4.6 * Math.sin(f + Math.PI / 2), 2.0, q.at[2] + 4.6 * Math.cos(f + Math.PI / 2)], [q.at[0], 1.5, q.at[2]]);
    los.push(q.lo);
    await W(190);
  }
  log('lowest point above the ground per frame (m):', los.join(' '));
  log('err', await p.evaluate(() => Re.errors));
};
