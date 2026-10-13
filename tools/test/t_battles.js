// Dance battles and the Library finale, played through the panel: against w_mont a tie, a loss and a full set of wins, one per step (an
// Artifact for the first win only), a second full win, wins against p_etcher and p_glyph, then bowing out; then
// LIB.talk() with all three Artifacts and the rewards after its dialogue. Prints each battle's text and the Artifacts.
// Run: NOSHOT=1 node shot.js <url> x.png ./t_battles.js
module.exports = async (p) => { await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => { const out = [], T = battleText, pick = (lbl) => _t.state.items.find((i) => i.label === lbl).onClick();
    const lbl = (id) => T.moves.find((m) => m.id === id).label, win = (mv) => Object.keys(T.beats).find((k) => T.beats[k] === mv);
    out.push('artifacts start ' + Kt.artifacts + ' pickups in scene ' + C.children.filter(c => c.userData && c.userData.gemPiece !== undefined).length);
    const e = It.byId.w_mont;
    Dbt.start(e); out.push('OPEN: ' + JSON.stringify(_t.state.log) + ' sub ' + JSON.stringify(_t.state.sub) + ' bar ' + JSON.stringify(_t.state.bar && _t.state.bar.label));
    pick(lbl(Dbt.state.mv)); out.push('TIE: ' + JSON.stringify(_t.state.log));
    pick(lbl(T.beats[Dbt.state.mv])); out.push('LOSE: ' + JSON.stringify(_t.state.log));
    for (let k = 0; k < Dbt.state.def.stamina; k++) { pick(lbl(win(Dbt.state.mv))); out.push('WIN ' + k + ': ' + JSON.stringify(_t.state.log) + ' items ' + _t.state.items.length); }
    out.push('artifacts ' + Kt.artifacts); _t.close();
    Dbt.start(e); for (let k = 0; k < Dbt.state.def.stamina; k++) pick(lbl(win(Dbt.state.mv))); out.push('AGAIN: ' + JSON.stringify(_t.state.log) + ' artifacts ' + Kt.artifacts); _t.close();
    for (const id of ['p_etcher', 'p_glyph']) { Dbt.start(It.byId[id]); for (let k = 0; k < Dbt.state.def.stamina; k++) pick(lbl(win(Dbt.state.mv))); out.push(id + ': ' + JSON.stringify(_t.state.log) + ' artifacts ' + Kt.artifacts); _t.close(); }
    Dbt.start(e); let n = 0; while (Dbt.state && !Dbt.state.over && n++ < 20) { pick(T.bow); out.push('BOW: ' + JSON.stringify(_t.state.log)); } _t.close();
    out.push('err ' + Re.errors); return out.join('\n'); }));
  await p.waitForTimeout(1000);
  // with all three, SPARKAKUS's finale runs
  // (from in front of his counter, as the player talks to him)
  console.log(await p.evaluate(() => { const s = z.list.find((q) => q.id === 'stump'); s && (At.position.set(s.x, 0, s.z + 3.2), xe.scan()); try { LIB.talk(); } catch (x) { return 'LIB err ' + x.message; } return 'LIB top ' + jt.top + ' text ' + JSON.stringify((document.getElementById('dlgText').textContent || '').slice(0, 60)); }));
  // (the finale's pages, then the three pieces glued together in the air, 5.6 s of game time, then the Gem speech:
  // its pages are skipped as they open until the rewards are given. Counted in game time, not real time: a headless
  // browser at full size can run the game at a fifth of real speed)
  let res = '';
  const t0 = await p.evaluate(() => Re.t);
  for (let k = 0; k < 360; k++) {
    await p.waitForTimeout(500);
    const r = await p.evaluate(() => { for (let i = 0; i < 40 && jt.top === 'dialogue'; i++) { try { qt.skipAll(); qt.advance(); } catch (x) {} } return { t: Re.t, done: Kt.rewards.artifacts ? 'after rewards.artifacts true gem ' + Kt.gem + ' err ' + Re.errors : '' }; });
    if ((res = r.done) || r.t - t0 > 20) break;
  }
  console.log(res || 'after 20 game s: rewards.artifacts still false FAIL');
};
