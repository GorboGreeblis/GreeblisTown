// The roamers: HENNRICK round the Portal, GEMTOE, MAMA GORBO and GOOWARD round the park, the three Dancers on
// the dance floor. Watches them for a while: where they go, that they never stand anywhere they should not
// (outside the square, in a building, the garden, the pond, scenery) and never stay stuck; then has MAMA
// GORBO and GOOWARD meet. Run with a small viewport (VW=320 VH=240).
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(100, 60); await W(1500);
  const secs = +(process.env.ROAM_S || 150);
  await p.evaluate(() => { At.position.set(-2, 0, 30); window.__R = {}; window.__t0 = Re.t; JGP.meetAt(1e9); });
  const sample = () => p.evaluate(() => {
    const ids = ['gratelet', 'p_gemtoe', 'p_mamagorbo', 'gorbo', 'p_etcher', 'p_glyph', 'w_mont'];
    for (const id of ids) {
      const e = It.byId[id], q = e.group.position, r = (__R[id] = __R[id] || { spots: {}, bad: [], still: 0, maxStill: 0, last: null, far: 0 });
      r.spots[e.home.x.toFixed(1) + ',' + e.home.z.toFixed(1)] = 1;
      const away = Math.hypot(q.x - e.home.x, q.z - e.home.z);
      // on the way somewhere but not moving: count how long
      if (r.last && away > 0.3 && Math.hypot(q.x - r.last[0], q.z - r.last[1]) < 0.02 && !e.nearPlayer && !e.busy) r.still += Re.t - r.last[2]; else r.still = 0;
      r.maxStill = Math.max(r.maxStill, r.still), (r.last = [q.x, q.z, Re.t]);
      const floor = /^(p_etcher|p_glyph|w_mont)$/.test(id);
      const ok = floor ? JGP.onDance(q.x, q.z, 0.05) : JGP.roamFree(q.x, q.z, 0.25);
      ok || r.bad.length > 5 || r.bad.push(q.x.toFixed(1) + ',' + q.z.toFixed(1));
      id === 'gratelet' && (r.far = Math.max(r.far, Math.hypot(q.x - ot.x, q.z - ot.z)));
    }
    return Re.t - __t0;
  });
  for (let k = 0; k < 4000; k++) { await W(400); if ((await sample()) > secs) break; }
  log(await p.evaluate(() => Object.entries(__R).map(([id, r]) => `${It.byId[id].def.name}: ${Object.keys(r.spots).length} spots, longest stuck ${r.maxStill.toFixed(1)} s, bad ${r.bad.length ? r.bad.join(' ') : 'none'}${id === 'gratelet' ? ', furthest from the Portal ' + r.far.toFixed(1) + ' m' : ''}`).join('\n')));
  // the Gorbos meet
  await p.evaluate(() => { window.__hearts = 0; const u = Ut.above; Ut.above = function (e, s, c) { s === '♥' && (e.id === 'gorbo' || e.id === 'p_mamagorbo') && __hearts++; return u.apply(this, arguments); }; JGP.meetAt(Re.t); window.__t0 = Re.t; });
  let met = '';
  for (let k = 0; k < 2000; k++) {
    await W(400);
    const r = await p.evaluate(() => ({ t: Re.t - __t0, h: __hearts, m: !!It.byId.gorbo.meeting, d: Math.hypot(It.byId.gorbo.group.position.x - It.byId.p_mamagorbo.group.position.x, It.byId.gorbo.group.position.z - It.byId.p_mamagorbo.group.position.z) }));
    if (r.h >= 4 && !r.m) { met = `met after ${r.t.toFixed(1)} s, ${r.h} hearts, ${r.d.toFixed(2)} m apart`; break; }
    if (r.t > 90) { met = 'no meeting in 90 s: ' + JSON.stringify(r); break; }
  }
  log('MAMA GORBO and GOOWARD:', met);
  log('err', await p.evaluate(() => Re.errors));
};
