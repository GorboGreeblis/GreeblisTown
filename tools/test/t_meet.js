// MAMA GORBO and GOOWARD's goo-ball meetings with everything else running (the visits every 22 to 32 s, the
// vignettes, the roaming): how often they meet over MEET_S seconds of game time (default 300), with the first one
// due at once, and what holds them up when they don't. Every 10 s prints how far apart they are and what each is
// doing; at the end the meetings seen (hearts: four each way as the balls land).
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_meet.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const secs = +(process.env.MEET_S || 300);
  await p.evaluate(() => {
    window.__gbNoThrottle = 1;
    At.position.set(-2, 0, 30);
    window.__M = { hearts: 0, meetings: 0, was: false, t0: Re.t, starts: [] };
    const u = Ut.above;
    Ut.above = function (e, s, c) { s === '♥' && (e.id === 'gorbo' || e.id === 'p_mamagorbo') && __M.hearts++; return u.apply(this, arguments); };
    L.push((t) => { const m = !!It.byId.gorbo.meeting; m && !__M.was && (__M.meetings++, __M.starts.push(+(t - __M.t0).toFixed(0))); __M.was = m; });
    JGP.meetAt(Re.t);
  });
  const flags = (e) => ['busy', 'vig', 'visiting', 'hosting', 'goHome', 'gcNavHome', 'nearPlayer', 'meeting'].filter((k) => e[k]).join('+') || 'free';
  let last = -10;
  for (let k = 0; k < 6000; k++) {
    await W(400);
    const r = await p.evaluate((flagsSrc) => {
      const f = eval('(' + flagsSrc + ')'), A = It.byId.p_mamagorbo, B = It.byId.gorbo, a = A.group.position, b = B.group.position;
      return { t: Re.t - __M.t0, d: Math.hypot(a.x - b.x, a.z - b.z), A: f(A), B: f(B), seek: !!(A.seek || B.seek), h: __M.hearts, m: __M.meetings };
    }, flags.toString());
    if (r.t - last >= 10) { last = r.t; log(`${r.t.toFixed(0).padStart(3)} s: ${r.d.toFixed(1).padStart(5)} m apart | MAMA GORBO ${r.A} | GOOWARD ${r.B} | seeking ${r.seek} | hearts ${r.h} | meetings ${r.m}`); }
    if (r.t > secs) break;
  }
  log('meetings started at (s):', await p.evaluate(() => __M.starts.join(' ') || 'none'), '| err', await p.evaluate(() => Re.errors));
};
