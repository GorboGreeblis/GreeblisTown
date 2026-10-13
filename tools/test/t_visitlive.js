// Visits as they happen on their own: each visit and vignette with the gaps between them, the pairs played and
// the rate per hour; and, over VISIT_S game seconds, how often each creature went out or was called on.
//   VW=320 VH=240 NOSHOT=1 node shot.js <url> x.png ./t_visitlive.js   (PART=live,counts runs only those)

// Visits and vignettes as they happen on their own (nothing forced): GAME seconds of game time (default 300), the
// player parked out of the way. Prints each visit as it starts and how it ends, and each vignette as it starts with
// the gap between the two creatures (every one must be side by side), then the totals, the pairs played and the
// rate per hour, and the error count.
const live = async (p, out) => {
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

// The visits as they run on their own (no visit forced): over VISIT_S seconds of game time (default 600), who went
// visiting and who was called on, how often the church's ANCIENT was visited, and whether anyone ended up off its
// own ground. ZOLLOD takes part only once OVERCOMING SHYNESS has freed him (SHY=1 runs him still shy: he must then
// neither visit nor be visited). Prints the counts per creature and per pair, then the ones left off home ground.
const counts = async (p, out) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const secs = +(process.env.VISIT_S || 600), shy = process.env.SHY === '1';
  await p.evaluate((shy) => { window.__gbNoThrottle = 1; Kt.shyFree = !shy; At.position.set(0, 0, 2); window.__t0 = Re.t; }, shy);
  let last = 0;
  for (let k = 0; k < 20000; k++) {
    await W(1000);
    const t = await p.evaluate(() => Re.t - __t0);
    if (t - last > 120) { last = t; log(t.toFixed(0) + ' s: ' + (await p.evaluate(() => JSON.stringify(JGP.visits().made)))); }
    if (t > secs) break;
  }
  log(await p.evaluate(() => {
    const m = JGP.visits().made, by = {}, slug = [];
    for (const k in m) { const [v, h] = k.split('|'); by[v] = by[v] || { out: 0, in: 0 }; by[h] = by[h] || { out: 0, in: 0 }; by[v].out += m[k]; by[h].in += m[k]; if (h === 'slug') slug.push(k + ' x' + m[k]); }
    return 'per creature (went out / was called on): ' + Object.entries(by).map(([id, c]) => id + ' ' + c.out + '/' + c.in).join(', ') + '\nthe ANCIENT visited: ' + (slug.join(', ') || 'never');
  }));
  const off = await p.evaluate(() => {
    const hg = JGP.homeGround || (() => !0);
    return It.all.filter((h) => h.def && h.def.at && !h.visiting && !h.hosting && !h.vig && !h.moving && !hg(h)).map((h) => (h.id || h.def.__type) + ' at ' + h.group.position.x.toFixed(1) + ',' + h.group.position.z.toFixed(1));
  });
  log('off home ground at the end (standing still, not visiting):', off.join(' | ') || 'none', '| err', await p.evaluate(() => Re.errors));
};

module.exports = require('./parts.js')({ live, counts });
