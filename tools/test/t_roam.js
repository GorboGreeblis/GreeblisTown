// The roamers: HENNRICK round the Portal, GEMTOE at her gazebo and MAMA GORBO round the park, GOOWARD round his Gallery, the three
// Dancers on the dance floor. Watched for a while: where they go, that they never stand anywhere they must not
// (outside the square, in a building, the garden, the pond, scenery) and never stay stuck; then MAMA GORBO and GOOWARD
// meet; then traps: the player steps in front of a walking roamer every few seconds, and some are dropped in tight
// spots (against the church, the Juice Bar's back corner, the Portal's frame, off the dance floor by the drum kit).
// Env: ROAM_S (game s of watching, default 150); TRAP_S (game s of traps, default 90).
// Output: per roamer its spots, longest stuck, bad spots (and `IN THE GALLERY` when found); `MAMA GORBO and GOOWARD:
//   met after …` (or `no meeting in 90 s`); per roamer `trap: …, now somewhere fine` (or `SOMEWHERE BAD`); `err <n>`.
//   VW=320 VH=240 NOSHOT=1 node test/shot.js <url> x.png test/t_roam.js
const { log, start, logErrors, waitGame } = require('./lib.js');

module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
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
      // (a roamer away on a visit, in a vignette or otherwise busy is allowed off its ground: it is walking to someone)
      ok || e.visiting || e.vig || e.busy || r.bad.length > 5 || r.bad.push(q.x.toFixed(1) + ',' + q.z.toFixed(1));
      id === 'gratelet' && (r.far = Math.max(r.far, Math.hypot(q.x - ot.x, q.z - ot.z)));
      id === 'gorbo' && (r.far = Math.max(r.far, Math.hypot(q.x - 31, q.z - 14.5)));
      // (no one ever stands in GOOWARD's Gallery)
      { const G = F.buildings.find((B) => B.name === 'gallery'); G && F.inHull(G, q.x, q.z, 0) && (r.inGal = (r.inGal || 0) + 1); }
    }
    return Re.t - __t0;
  });
  for (let k = 0; k < 4000; k++) { await W(400); if ((await sample()) > secs) break; }
  log(await p.evaluate(() => Object.entries(__R).map(([id, r]) => `${It.byId[id].def.name}: ${Object.keys(r.spots).length} spots, longest stuck ${r.maxStill.toFixed(1)} s, bad ${r.bad.length ? r.bad.join(' ') : 'none'}${id === 'gratelet' ? ', furthest from the Portal ' + r.far.toFixed(1) + ' m' : ''}${id === 'gorbo' ? ', furthest from his Gallery ' + r.far.toFixed(1) + ' m' : ''}${r.inGal ? ', IN THE GALLERY ' + r.inGal : ''}`).join('\n')));
  // the Gorbos meet
  await p.evaluate(() => { window.__hearts = 0; const u = Ut.above; Ut.above = function (e, s) { s === '♥' && (e.id === 'gorbo' || e.id === 'p_mamagorbo') && __hearts++; return u.apply(this, arguments); }; JGP.meetAt(Re.t); window.__t0 = Re.t; });
  let met = '';
  for (let k = 0; k < 2000; k++) {
    await W(400);
    const r = await p.evaluate(() => ({ t: Re.t - __t0, h: __hearts, m: !!It.byId.gorbo.meeting, d: Math.hypot(It.byId.gorbo.group.position.x - It.byId.p_mamagorbo.group.position.x, It.byId.gorbo.group.position.z - It.byId.p_mamagorbo.group.position.z) }));
    if (r.h >= 4 && !r.m) { met = `met after ${r.t.toFixed(1)} s, ${r.h} hearts, ${r.d.toFixed(2)} m apart`; break; }
    if (r.t > 90) { met = 'no meeting in 90 s: ' + JSON.stringify(r); break; }
  }
  log('MAMA GORBO and GOOWARD:', met);
  // the traps: every roamer must keep going, never still for long away from its spot, and must end up somewhere it
  // may stand
  const trapS = +(process.env.TRAP_S || 90);
  await p.evaluate(() => {
    const ids = ['gratelet', 'p_gemtoe', 'p_mamagorbo', 'gorbo', 'p_etcher', 'p_glyph', 'w_mont'];
    window.__S = {}; ids.forEach((id) => (__S[id] = { still: 0, max: 0, last: null, homes: new Set(), blocked: 0 }));
    const drop = (id, x, z) => { const e = It.byId[id]; e.group.position.set(x, e.group.position.y, z); };
    const ch = F.buildings.find((B) => B.name === 'church'), f = JGP.floor;
    { let rr = 1; const a = 0.7; while (F.inHull(ch, ch.x + rr * Math.cos(a), ch.z + rr * Math.sin(a), 0.4)) rr += 0.2; drop('p_gemtoe', ch.x + rr * Math.cos(a), ch.z + rr * Math.sin(a)); } drop('gratelet', ot.x + 2.05 * ot.nz, ot.z - 2.05 * ot.nx + 0.3); drop('p_glyph', f[0] - 1.2, 19.2); drop('p_mamagorbo', -t.parkHalf + 1.6, -6);
    let next = Re.t + 3;
    window.__trapFn = () => {
      if (Re.t > next) {
        next = Re.t + 4;
        const walkers = ids.map((id) => It.byId[id]).filter((e) => e.moving);
        const e = walkers[Math.floor(Math.random() * walkers.length)];
        if (e) { const q = e.group.position, d = Math.hypot(e.home.x - q.x, e.home.z - q.z) || 1; At.position.set(q.x + ((e.home.x - q.x) / d) * 1.6, 0, q.z + ((e.home.z - q.z) / d) * 1.6); __S[e.id].blocked++; }
      }
      for (const id of ids) {
        const e = It.byId[id], q = e.group.position, r = __S[id];
        r.homes.add(e.home.x.toFixed(1) + ',' + e.home.z.toFixed(1));
        const away = Math.hypot(q.x - e.home.x, q.z - e.home.z);
        if (r.last && away > 0.3 && Math.hypot(q.x - r.last[0], q.z - r.last[1]) < 0.01 && !e.busy && !e.meeting) r.still += Re.t - r.last[2]; else r.still = 0;
        r.max = Math.max(r.max, r.still), (r.last = [q.x, q.z, Re.t]);
      }
    };
    L.push(() => __trapFn());
    window.__t0 = Re.t;
  });
  for (let k = 0; k < 4000; k++) { await W(400); if ((await p.evaluate(() => Re.t - __t0)) > trapS) break; }
  await p.evaluate(() => { window.__trapFn = () => {}; At.position.set(-2, 0, 30); JGP.visitAt(9e15); JGP.meetAt(9e15); });
  const recovered = await waitGame(p, 180, () => ['gratelet','p_gemtoe','p_mamagorbo','gorbo','p_etcher','p_glyph','w_mont'].every(id => {
    const e=It.byId[id]; return !e.visiting && !e.hosting && !e.busy && !e.goHome && !e.gcNavHome && JGP.homeGround(e);
  }));
  require('node:assert/strict').equal(recovered,true,'trap recovery must finish on home ground');
  log(await p.evaluate(() => Object.entries(__S).map(([id, r]) => { const e = It.byId[id], q = e.group.position, floor = /^(p_etcher|p_glyph|w_mont)$/.test(id), ok = id === 'p_gemtoe' ? JGP.homeGround(e) : floor ? JGP.onDance(q.x, q.z, 0.05) : JGP.roamFree(q.x, q.z, 0.25) && (id !== 'gorbo' || JGP.homeGround(e));
    return `trap: ${e.def.name}: blocked ${r.blocked} times, ${r.homes.size} spots, longest still on the way ${r.max.toFixed(1)} s, now ${ok ? 'somewhere fine' : 'SOMEWHERE BAD ' + q.x.toFixed(1) + ',' + q.z.toFixed(1)}`; }).join('\n')));
  await logErrors(p);
};
