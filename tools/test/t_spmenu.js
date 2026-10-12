// SPARKAKUS's menu, as everyone's: Talk and "Give a blossom" offered from the first moment a Blossom is held (no
// Talk and no quest needed first); the Blossom given before any Talk (his lap and his sorry line); Talk then opens
// his quest dialogue; and at the Garden Event no one, SPARKAKUS included, offers a Blossom option.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_spmenu.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const waitGame = async (sec) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 4000 && (await p.evaluate(() => Re.t)) - t0 < sec; k++) await W(200); };
  const said = async () => { let a = null; for (let k = 0; k < 60; k++) { const b = await p.evaluate(() => (qt.isOpen ? document.getElementById('dlgText').textContent : null)); if (b === null || b === a) return b; a = b; await W(250); } return a; };
  const next = () => p.evaluate(() => { try { qt.advance(); } catch (e) {} });
  const stump = () => p.evaluate(() => { const s = z.list.find((q) => q.id === 'stump'); At.position.set(s.x, 0, s.z + 3.2); xe.scan(); return xe.current === s ? xe.actions.map((a) => a.verb + ':' + a.label).join(' / ') : 'not the target'; });
  // a fresh save: no Talk yet, nothing of the quest done, one Blossom in hand
  await p.evaluate(() => { Kt.artifacts = 0; Kt.gem = !1; Kt.rewards.artifacts = !1; Kt.blossoms = 0; xe.lastTarget = null; });
  log('fresh, no Blossom:', await stump());
  await p.evaluate(() => (Kt.blossoms = 1));
  log('fresh, one Blossom:', await stump());
  await p.evaluate(() => xe.run('give'));
  const b1 = await p.evaluate(() => Kt.blossoms);
  for (let i = 0; i < 100 && (await p.evaluate(() => st.romping())); i++) await waitGame(0.25);
  await W(400);
  log('given before any Talk: Blossoms left', b1, '| he says', JSON.stringify(await said()));
  await next(); await W(300);
  log('then Talk:', await stump());
  await p.evaluate(() => xe.run('interact')); await W(400);
  log('  opens', JSON.stringify(await said()));
  await next(); await W(300);
  // the Event: Blossom in hand, every creature's menu and SPARKAKUS's, wherever he is
  await p.evaluate(() => { window.__gbNoThrottle = 1; Kt.rewards.seeds = Kt.rewards.stone = !0; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  await waitGame(6);
  const ev = await p.evaluate(() => {
    Kt.blossoms = 3;
    const r = [], give = (a) => a.filter((q) => q.verb === 'give').length;
    for (const c of It.all) { if (!c.group.visible) continue; const a = xe.actionsFor(c); r.push((c.def && c.def.name) + ' [' + a.map((q) => q.verb).join(',') + ']'); }
    const s = z.list.find((q) => q.id === 'stump');
    r.push('stump [' + xe.actionsFor(s).map((q) => q.verb + ':' + q.label).join(',') + ']');
    r.push('xo [' + xe.actionsFor(xo).map((q) => q.verb + ':' + q.label).join(',') + ']');
    return { active: me.active, list: r, gives: r.filter((q) => /give/.test(q)).length };
  });
  log('Event active', ev.active, '| menus with a give option:', ev.gives);
  log('  ' + ev.list.join('\n  '));
  log('err', await p.evaluate(() => Re.errors));
};
