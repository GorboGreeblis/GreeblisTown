// SOMLET asleep on her side at her spot: her lowest point (body and tentacles) against the ground, and
// standing back up when she has to go (the Garden Event). Renders her from a few sides (VIEWS-like).
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(100, 60); await W(1500);
  const low = () => p.evaluate(() => {
    const e = It.byId.m_somlet, g = e.group; g.updateMatrixWorld(!0);
    let lo = 1e9, hi = -1e9; const v = new THREE.Vector3();
    g.traverse((o) => { if (!o.isMesh || !o.visible) return; const P = o.geometry.attributes.position; for (let k = 0; k < P.count; k += 3) { v.fromBufferAttribute(P, k).applyMatrix4(o.matrixWorld); lo = Math.min(lo, v.y); hi = Math.max(hi, v.y); } });
    return { model: !!(e.def && e.def.builder), lowest: +lo.toFixed(3), top: +hi.toFixed(2), roll: +g.children[0].children[0] ? 0 : 0, at: [+g.position.x.toFixed(1), +g.position.z.toFixed(1)], err: Re.errors };
  });
  await p.evaluate(() => { const e = It.byId.m_somlet; At.position.set(e.group.position.x + 9, 0, e.group.position.z + 9); });
  for (let k = 0; k < 6; k++) { await W(1500); log('resting', JSON.stringify(await low())); }
  const shots = process.env.SHOTS;
  if (shots) for (const [i, [dx, dz, h]] of [[4, 0, 1.4], [0, 4, 1.4], [-4, 0, 1.4], [0, -4, 1.4], [3, 3, 0.4]].entries()) {
    await p.evaluate(([dx, dz, h]) => { const e = It.byId.m_somlet, q = e.group.position; window.__cam = [q.x + dx, h, q.z + dz, q.x, 0.7, q.z]; }, [dx, dz, h]);
    await p.evaluate(() => { const c = __cam; B.position.set(c[0], c[1], c[2]); B.lookAt(c[3], c[4], c[5]); });
    await p.evaluate(() => { const c = __cam; window.__lock = setInterval(() => { B.position.set(c[0], c[1], c[2]); B.lookAt(c[3], c[4], c[5]); }, 5); });
    await W(600); await p.screenshot({ path: shots + '_' + i + '.png' }); await p.evaluate(() => clearInterval(__lock));
  }
  // the Event: she gets up and floats to the garden
  await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  for (let k = 0; k < 6; k++) { await W(1500); log('Event', JSON.stringify(await low())); }
  log('err', await p.evaluate(() => Re.errors));
};
