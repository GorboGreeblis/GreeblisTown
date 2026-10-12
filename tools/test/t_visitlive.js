// Visits and vignettes as they happen on their own (nothing forced): GAME seconds of game time (default 300), the
// player parked out of the way. Prints each visit as it starts and how it ends, and each vignette as it starts with
// the gap between the two creatures (every one must be side by side), then the totals, the pairs played and the
// rate per hour, and the error count.
//   GAME=300 VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_visitlive.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a), SEC = +(process.env.GAME || 300);
  await p.mouse.click(100, 60); await W(1500);
  await p.evaluate(() => { At.position.set(0, 0, 44); window.__VL = { seen: {}, vis: {} }; });
  const t0 = await p.evaluate(() => Re.t);
  let far = 0, nVig = 0, nVis = 0, done = 0;
  for (let k = 0; k < 40000; k++) {
    await W(400);
    const r = await p.evaluate(() => {
      const V = JGP.vigs, out = [], m = V.lineUp(); JGP.slug && (m.SL = JGP.slug.ent);
      for (const key in V.plays) if ((__VL.seen[key] || 0) < V.plays[key]) {
        __VL.seen[key] = V.plays[key];
        const a = m[key.slice(0, 2)], b = m[key.slice(2, 4)], d = a && b ? Math.hypot(a.group.position.x - b.group.position.x, a.group.position.z - b.group.position.z) : -1;
        out.push({ vig: key, gap: +d.toFixed(1), beside: a && b ? V.beside(a, b) : null });
      }
      const all = JGP.visits().all || [];
      for (const q of all) { const id = q.v + '>' + q.h; __VL.vis[id] || ((__VL.vis[id] = q.stage), out.push({ visit: id, start: !0 })); __VL.vis[id] !== q.stage && ((__VL.vis[id] = q.stage), q.stage === 'back' && out.push({ visit: id, back: !0, played: q.played })); }
      for (const id in __VL.vis) if (__VL.vis[id] && !all.some((q) => q.v + '>' + q.h === id)) out.push({ visit: id, home: !0 }), (__VL.vis[id] = 0);
      return { t: Re.t, out, err: Re.errors };
    });
    for (const e of r.out) {
      e.vig && (nVig++, e.beside || far++); e.start && nVis++; e.home && done++;
      log((r.t - t0).toFixed(0).padStart(4) + 's', JSON.stringify(e));
    }
    if (r.t - t0 > SEC) break;
  }
  const s = await p.evaluate(() => ({ t: Re.t, pairs: Object.keys(JGP.vigs.plays).length, all: JGP.vigs.all.length, err: Re.errors }));
  const mins = (s.t - t0) / 60;
  log('game minutes', mins.toFixed(1), '| visits started', nVis, 'home again', done, '| vignettes', nVig, 'not side by side', far, '| distinct pairs', s.pairs, 'of', s.all, '| rate', Math.round((nVig / mins) * 60), 'an hour | err', s.err);
};
