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
  // (one visitor at a time, timed, so a slow plan shows where)
  const WHO = ['gratelet', 'drifter', 'blinker', 'm_kingdino', 'gorbo', 'cutebex', 'm_somlet', 'frog', 'p_etcher', 'p_gemtoe', 'p_glyph', 'w_mont', 'p_mamagorbo', 'keeper', 'slug'];
  const plan = { n: 0, bad: [], longest: [0, ''] };
  for (const v of WHO) {
    if (v === 'm_kingdino' || v === 'slug' || v === 'm_somlet') continue;
    const r = await p.evaluate(([v, WHO]) => {
      const t0 = performance.now(), bad = [];
      // (the step from a door to open ground, under 5 m: past its first metre, through no building and round every collider)
      const step = (a, w, r) => { const d = Math.hypot(w[0] - a.x, w[1] - a.z); for (let s = 1; s <= d && d < 5; s += 0.25) { const x = a.x + ((w[0] - a.x) * s) / d, z = a.z + ((w[1] - a.z) * s) / d; if (F.buildings.some((B) => F.inHull(B, x, z, 0.3 * r)) || F.list.some((c) => Math.hypot(x - c.x, z - c.z) < c.r + 0.5 * r)) return !1; } return d < 5; };
      let n = 0, longest = [0, ''];
      for (const h of WHO) if (v !== h) {
        n++;
        const q = JGP.visitPlan(v, h);
        if (!q) { bad.push(v + '>' + h + ': no spot'); continue; }
        // every leg a clear straight walk (the first from where it comes out, or a short step to open ground from a door;
        // the last, or a short last step beside the host; not the last steps into the church)
        let a = { x: q.from[0], z: q.from[1] }, len = 0, ok = '';
        // (the steps onto the Library's open floor: clear of every bookcase and the banner's posts)
        const LB = F.buildings.find((b) => b.name === 'shop'), libClear = (a, w) => { for (let s = 0; s <= 1; s += 0.05) { const [lx, lz] = F.local(LB, a.x + (w[0] - a.x) * s, a.z + (w[1] - a.z) * s); if (JGP.libParts.some(([a0, b0, c0, d0]) => Math.hypot(Math.max(a0 - lx, 0, lx - c0), Math.max(b0 - lz, 0, lz - d0)) < 0.5 * q.r)) return !1; } return !0; };
        q.way.forEach((w, k) => { ok || (k >= q.way.length - q.inside && (h !== 'keeper' || libClear(a, w))) || JGP.roamWalk(a, w[0], w[1], q.r) || (!k && !JGP.roamFree(a.x, a.z, q.r) && step(a, w, q.r)) || (k === q.way.length - 1 - q.inside && Math.hypot(w[0] - a.x, w[1] - a.z) < 1.8) || (ok = 'leg ' + k + '/' + q.way.length + ' from ' + [a.x, a.z].map((u) => u.toFixed(1)) + (JGP.roamFree(a.x, a.z, q.r) ? '' : ' (start not open)') + ' to ' + w.map((u) => u.toFixed(1))); len += Math.hypot(w[0] - a.x, w[1] - a.z); a = { x: w[0], z: w[1] }; });
        ok && bad.push(v + '>' + h + ': ' + ok);
        len > longest[0] && (longest = [len, v + '>' + h]);
      }
      return { n, bad, longest, ms: Math.round(performance.now() - t0) };
    }, [v, WHO]);
    log('  plans for', v, r.n, 'hosts in', r.ms, 'ms', r.bad.length ? '| ' + r.bad.join('; ') : '');
    plan.n += r.n, plan.bad.push(...r.bad), r.longest[0] > plan.longest[0] && (plan.longest = r.longest);
  }
  plan.longest = Math.round(plan.longest[0]) + ' m ' + plan.longest[1];
  log('visit plans:', plan.n, 'pairs | problems:', plan.bad.length ? plan.bad.join('; ') : 'none', '| longest way', plan.longest);
  const waitGame = async (sec, until) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 20000 && (await p.evaluate(() => Re.t)) - t0 < sec; k++) { if (until && (await p.evaluate(until))) return !0; await W(250); } return !1; };
  await p.evaluate(() => At.position.set(0, 0, 3));
  const LIST = process.env.VISITS === 'none' ? [] : process.env.VISITS ? process.env.VISITS.split(',').map((q) => q.split('>')) : [['drifter', 'm_somlet'], ['p_gemtoe', 'drifter'], ['p_glyph', 'cutebex'], ['gratelet', 'keeper'], ['frog', 'w_mont'], ['cutebex', 'm_kingdino'], ['keeper', 'p_etcher'], ['p_glyph', 'slug']];
  for (const [v, h] of LIST) {
    const t0 = await p.evaluate(() => Re.t);
    const home0 = await p.evaluate((v) => { const e = v === 'keeper' ? null : It.byId[v] || It.all.find((q) => q.def.__type === v); return e ? [e.home.x, e.home.z, e.pattern ? e.pattern[1].y || 0 : 0] : null; }, v);
    // (every frame: how near the visitor and the host come to every collider and every solid part of a building or the
    // Library, less half their body: below zero is a body through something; not while up on a desk or in a jump)
    await p.evaluate(([v, h]) => {
      const E2 = (id) => (id === 'keeper' ? st.ent : id === 'slug' ? null : It.byId[id] || It.all.find((q) => q.def.__type === id));
      window.__CL = { worst: 9, what: '' };
      window.__CLfn && L.splice(L.indexOf(window.__CLfn), 1);
      window.__CLfn = () => {
        for (const e of [E2(v), E2(h)]) {
          if (!e || e === st.ent) continue;
          const pp = e.group.position, r = 0.5 * (e.bodyR || 1);
          if (pp.y > 0.3) continue;
          for (const c of F.list) { const d = Math.hypot(pp.x - c.x, pp.z - c.z) - c.r - r; d < __CL.worst && ((__CL.worst = d), (__CL.what = e.def.name + ' by a collider at ' + c.x.toFixed(1) + ',' + c.z.toFixed(1))); }
          for (const B of F.buildings) { const [lx, lz] = F.local(B, pp.x, pp.z); for (const R of B.parts) { const d = Math.hypot(Math.max(R[0] - lx, 0, lx - R[2]), Math.max(R[1] - lz, 0, lz - R[3])) - r; d < __CL.worst && ((__CL.worst = d), (__CL.what = e.def.name + ' by ' + B.name + ' part ' + R.map((u) => u.toFixed(1)))); } }
        }
      };
      L.push(window.__CLfn);
      JGP.visitAt(Re.t, v, h);
    }, [v, h]);
    const stages = [];
    let text = null, meetGap = 99, played = !1;
    for (let k = 0; k < 2400; k++) {
      await W(250);
      k % 120 || log('   ', v, '>', h, 'at', Math.round(k / 4), 's:', JSON.stringify(await p.evaluate(() => JGP.visits().now)));
      const r = await p.evaluate(() => { const q = JGP.visits().now; return { s: q ? q.stage : null, gap: q && q.gap, played: q && q.played, bubbles: [...C.children].filter((c) => c.isSprite && c.renderOrder === 20).length }; });
      r.s === 'meet' && (meetGap = Math.min(meetGap, r.gap));
      r.s && stages[stages.length - 1] !== r.s && stages.push(r.s);
      r.bubbles && (text = text || r.bubbles), r.played && (played = !0);
      if (!r.s && stages.length) break;
    }
    const end = await p.evaluate(([v, home0]) => {
      if (v === 'keeper') return { away: st.away(), visiting: !!st.ent.visiting };
      const e = It.byId[v] || It.all.find((q) => q.def.__type === v), q = e.group.position;
      return { at: +Math.hypot(q.x - home0[0], q.z - home0[1]).toFixed(2), y: +q.y.toFixed(2), homeKept: Math.hypot(e.home.x - home0[0], e.home.z - home0[1]) < 0.01, visiting: !!e.visiting, walkK: e.walkK || 0, py: e.pattern ? e.pattern[1].y || 0 : 0 };
    }, [v, home0]);
    const dt = (await p.evaluate(() => Re.t)) - t0, cl = await p.evaluate(() => [+__CL.worst.toFixed(2), __CL.what]);
    log(v, '>', h, '| stages', stages.join(' > '), '| played', played, '(lines shown', !!text + ') | gap at the meeting', meetGap, '| took', dt.toFixed(0), 'game s | nearest anything', cl[0], cl[1], '| after:', JSON.stringify(end), /^out,meet(,out,meet)*,back$/.test(stages.join()) && played && meetGap < 6 && cl[0] > -0.05 ? 'ok' : 'FAIL');
  }
  log('err', await p.evaluate(() => Re.errors));
};
