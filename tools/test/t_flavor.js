// The flavour Talk lines (the owner's): every creature's Talk outside the Event goes through all its lines in turn, the
// last (the flavour line) included; SPARKAKUS retains quest Talk plus ordinary biology pages; at the Garden Event each
// creature's Talk gives only its Event line, never a flavour line, SPARKAKUS's included (beside him at his garden
// spot).
// Env: none.
// Output: per creature `<id> <n> lines | last: "…" | all distinct: <bool>`, SPARKAKUS's two Talks, then at the Event
//   one line per creature ending in `ok` or `FLAVOR LEAKED` and SPARKAKUS's ending in `ok` or `MISSING`; `err <n>`.
//   VW=320 VH=240 NOSHOT=1 node test/shot.js <url> x.png test/t_flavor.js
const { log, start, startEvent, logErrors } = require('./lib.js');

module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  // (the whole line, every page, as handed to the dialogue)
  await p.evaluate(() => { const o = qt.open; window.__said = null; qt.open = function (a, b, t, ...r) { window.__said = t; return o.call(this, a, b, t, ...r); }; });
  const said = () => p.evaluate(() => { const t = __said; __said = null; qt.skipAll(); return t; });
  const ids = ['blinker', 'drifter', 'gratelet', 'frog', 'm_kingdino', 'm_somlet', 'gorbo', 'p_gemtoe', 'p_mamagorbo', 'w_mont', 'p_etcher', 'p_glyph'];
  for (const id of ids) {
    const r = [];
    const n = await p.evaluate((id) => { const e = It.all.find((q) => q.id === id || q.def.__type === id); Kt.talkState[e.id] = 0; return e.def.lines.length; }, id);
    for (let k = 0; k < n; k++) { await p.evaluate((id) => { const e = It.all.find((q) => q.id === id || q.def.__type === id); Kt.gem = !1; te(e); }, id); r.push(await said()); }
    log(id, n, 'lines | last:', JSON.stringify(r[n - 1]), '| all distinct:', new Set(r).size === n);
  }
  // SPARKAKUS keeps the quest guidance and its extra ordinary biology pages.
  const sp = [];
  await p.evaluate(() => { Kt.artifacts = 1; });
  for (let k = 0; k < 2; k++) { await p.evaluate(() => LIB.talk()); sp.push(await said()); }
  log('SPARKAKUS, 1 Artifact, two Talks:', JSON.stringify(sp));
  // Without Seeds the Event keeps ordinary dialogue and never offers Give.
  await startEvent(p, { seeds: false });
  const noSeeds = await p.evaluate(() => {
    const failures = []; Kt.blossoms = 3;
    for (const e of It.all) {
      if (!e.def.lines || !e.def.lines.length) continue;
      const actions = xe.actionsFor(e), talk = actions.find(a => a.verb === 'interact');
      if (actions.some(a => a.verb === 'give')) failures.push(e.def.name + ': Give');
      if (Xt(e) === 'cutebex') continue;
      talk && talk.run();
      if (!talk || !e.def.lines.includes(__said)) failures.push(e.def.name + ': ordinary Talk missing');
      qt.skipAll();
    }
    const s = z.list.find(s => s.id === 'stump'); s.run();
    if (!String(__said).includes('My ears catch')) failures.push('SPARKAKUS ordinary Talk missing');
    qt.skipAll(); me.wrap();
    return failures;
  });
  require('node:assert/strict').deepEqual(noSeeds, []);
  log('Event without Seeds keeps ordinary Talk and hides Give: passed');
  // ---- the Event: the station's Talk run on each, twice
  await p.evaluate(() => { Bulb.hold = !1; });
  await startEvent(p);
  for (let k = 0; k < 40 && !(await p.evaluate(() => me.active)); k++) await W(250);
  await W(1500);
  const ev = [];
  for (const id of ids) {
    const out = [];
    for (let k = 0; k < 2; k++) {
      out.push(await p.evaluate((id) => {
        const e = It.all.find((q) => q.id === id || q.def.__type === id), g = e.group.position;
        At.position.set(g.x, 0, g.z + 0.6 * (e.talkR || 3)); xe.scan();
        if (xe.current !== e) return 'not the target';
        const a = xe.actions.find((q) => q.verb === 'interact');
        return a ? (a.run(), __said) : 'no Talk';
      }, id));
      await said();
    }
    const lines = await p.evaluate((id) => (It.all.find((q) => q.id === id || q.def.__type === id).def.lines), id);
    ev.push(id + ': ' + JSON.stringify(out) + (out.includes(lines[lines.length - 1]) ? ' FLAVOR LEAKED' : ' ok'));
  }
  // SPARKAKUS: once he is at his garden spot, the player beside him, Talk run as the TALK button runs it (twice)
  for (let k = 0; k < 400 && !(await p.evaluate(() => st.away() && st.there())); k++) await W(250);
  const spe = [];
  for (let k = 0; k < 2; k++) {
    spe.push(await p.evaluate(() => {
      const q = st.pos(); At.position.set(q.x + 1.4, 0, q.z + 1.4); xe.scan();
      const a = xe.actions.find((x) => x.verb === 'interact');
      return a ? (a.run(), a.label + ' -> ' + __said + ' (top ' + jt.top + ')') : 'no Talk (target ' + (xe.current ? xe.current.id || 'xo' : 'none') + ')';
    }));
    await said(), await W(300);
  }
  ev.push('SPARKAKUS in the garden: ' + JSON.stringify(spe) + (spe.every((t) => t.includes('Digging in the dirt')) ? ' ok' : ' MISSING'));
  log('Event active', await p.evaluate(() => me.active), '\n ' + ev.join('\n '));
  await logErrors(p);
};
