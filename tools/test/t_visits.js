// Creatures visiting each other. First, for every visitor and every host (the twelve who go visiting, all but
// KING DINO, SOMLET and the church's slug, who stay put, and the fourteen they visit, those three included; never NEXTESSA
// or BACKPACKA): that there is a spot beside the host to stand on, and a way there of clear straight walks round
// everything (but for the last steps into the church, in through the wall where the X is). Then visits played
// out in game time, each printed as it ends: by default MUSHROOM down off his desk to SOMLET, GEMTOE calling on
// MUSHROOM, ETCHER to GLYPH, ZOLLOD to KING DINO, SPARKAKUS out of his Library and GLYPH to the slug;
// VISITS=v>h,v>h picks others, VISITS=none only checks the plans. Each gets there, the two exchange their lines,
// and it walks slowly home and is back at its place (MUSHROOM back up on his desk).
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_visits.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(100, 60); await W(1500);
  const plan = await p.evaluate(() => {
    const WHO = ['gratelet', 'drifter', 'blinker', 'm_kingdino', 'gorbo', 'cutebex', 'm_somlet', 'frog', 'p_etcher', 'p_gemtoe', 'p_glyph', 'w_mont', 'p_mamagorbo', 'keeper', 'slug'];
    const bad = [], longest = [0, ''];
    let n = 0;
    for (const v of WHO) if (v !== 'm_kingdino' && v !== 'slug' && v !== 'm_somlet') for (const h of WHO) if (v !== h) {
      n++;
      const q = JGP.visitPlan(v, h);
      if (!q) { bad.push(v + '>' + h + ': no spot'); continue; }
      // every leg a clear straight walk (the first from where it comes out)
      let a = { x: q.from[0], z: q.from[1] }, len = 0, ok = !0;
      q.way.forEach((w, k) => { ok = ok && (k >= q.way.length - q.inside || JGP.roamWalk(a, w[0], w[1], q.r)); len += Math.hypot(w[0] - a.x, w[1] - a.z); a = { x: w[0], z: w[1] }; });
      ok || bad.push(v + '>' + h + ': a leg not clear');
      len > longest[0] && (longest[0] = len, longest[1] = v + '>' + h);
    }
    return { n, bad, longest: Math.round(longest[0]) + ' m ' + longest[1] };
  });
  log('visit plans:', plan.n, 'pairs | problems:', plan.bad.length ? plan.bad.join('; ') : 'none', '| longest way', plan.longest);
  const waitGame = async (sec, until) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 20000 && (await p.evaluate(() => Re.t)) - t0 < sec; k++) { if (until && (await p.evaluate(until))) return !0; await W(250); } return !1; };
  await p.evaluate(() => At.position.set(0, 0, 3));
  const LIST = process.env.VISITS === 'none' ? [] : process.env.VISITS ? process.env.VISITS.split(',').map((q) => q.split('>')) : [['drifter', 'm_somlet'], ['p_gemtoe', 'drifter'], ['p_etcher', 'p_glyph'], ['cutebex', 'm_kingdino'], ['keeper', 'w_mont'], ['p_glyph', 'slug']];
  for (const [v, h] of LIST) {
    const t0 = await p.evaluate(() => Re.t);
    const home0 = await p.evaluate((v) => { const e = v === 'keeper' ? null : It.byId[v]; return e ? [e.home.x, e.home.z, e.pattern ? e.pattern[1].y || 0 : 0] : null; }, v);
    await p.evaluate(([v, h]) => JGP.visitAt(Re.t, v, h), [v, h]);
    const stages = [];
    let text = null;
    for (let k = 0; k < 2400; k++) {
      await W(250);
      k % 120 || log('   ', v, '>', h, 'at', Math.round(k / 4), 's:', JSON.stringify(await p.evaluate(() => JGP.visits().now)));
      const r = await p.evaluate(() => { const q = JGP.visits().now; return { s: q ? q.stage : null, bubbles: [...C.children].filter((c) => c.isSprite && c.renderOrder === 20).length }; });
      r.s && stages[stages.length - 1] !== r.s && stages.push(r.s);
      r.bubbles && (text = text || r.bubbles);
      if (!r.s && stages.length) break;
    }
    const end = await p.evaluate(([v, home0]) => {
      if (v === 'keeper') return { away: st.away(), visiting: !!st.ent.visiting };
      const e = It.byId[v], q = e.group.position;
      return { at: +Math.hypot(q.x - home0[0], q.z - home0[1]).toFixed(2), y: +q.y.toFixed(2), homeKept: Math.hypot(e.home.x - home0[0], e.home.z - home0[1]) < 0.01, visiting: !!e.visiting, walkK: e.walkK || 0, py: e.pattern ? e.pattern[1].y || 0 : 0 };
    }, [v, home0]);
    const dt = (await p.evaluate(() => Re.t)) - t0;
    log(v, '>', h, '| stages', stages.join(' > '), '| lines shown', !!text, '| took', dt.toFixed(0), 'game s | after:', JSON.stringify(end), stages.join() === 'out,meet,back' && text ? 'ok' : 'FAIL');
  }
  log('err', await p.evaluate(() => Re.errors));
};
