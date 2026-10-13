// The owner's extra flavor Talk lines: every creature's Talk outside the Event goes through all its lines in turn,
// the new last one included (printed in full); SPARKAKUS keeps his quest Talk only (owner's call); at the
// Garden Event each creature's Talk gives only its Event line, never a flavor line, SPARKAKUS's included (beside
// him at his garden spot).
//   VW=320 VH=240 NOSHOT=1 node shot.js <url> x.png ./t_flavor.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  // (the whole line, every page, as handed to the dialogue)
  await p.evaluate(() => { const o = qt.open; window.__said = null; qt.open = function (a, b, t, ...r) { window.__said = t; return o.call(this, a, b, t, ...r); }; });
  const said = () => p.evaluate(() => { const t = __said; __said = null; try { qt.close(); } catch (e) {} return t; });
  const ids = ['blinker', 'drifter', 'gratelet', 'frog', 'm_kingdino', 'm_somlet', 'gorbo', 'p_gemtoe', 'p_mamagorbo', 'w_mont', 'p_etcher', 'p_glyph'];
  for (const id of ids) {
    const r = [];
    const n = await p.evaluate((id) => { const e = It.all.find((q) => q.id === id || q.def.__type === id); Kt.talkState[e.id] = 0; return e.def.lines.length; }, id);
    for (let k = 0; k < n; k++) { await p.evaluate((id) => { const e = It.all.find((q) => q.id === id || q.def.__type === id); Kt.gem = !1; te(e); }, id); r.push(await said()); }
    log(id, n, 'lines | last:', JSON.stringify(r[n - 1]), '| all distinct:', new Set(r).size === n);
  }
  // (SPARKAKUS has no flavor line: his Talk is his quest, as before)
  const sp = [];
  await p.evaluate(() => { Kt.artifacts = 1; });
  for (let k = 0; k < 2; k++) { await p.evaluate(() => LIB.talk()); sp.push(await said()); }
  log('SPARKAKUS, 1 Artifact, two Talks:', JSON.stringify(sp));
  // ---- the Event: the station's Talk run on each, twice
  await p.evaluate(() => { Bulb.hold = !1; Kt.rewards.seeds = Kt.rewards.stone = !0; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
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
  log('err', await p.evaluate(() => Re.errors));
};
