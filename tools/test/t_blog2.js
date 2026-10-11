// Dance battles and the Library finale, played through the panel: against w_mont a tie, a loss and three wins (an
// Artifact for the first win only), a second full win, wins against p_etcher and p_glyph, then bowing out; then
// LIB.talk() with all three Artifacts and the rewards after its dialogue. Prints each battle's text and the Artifacts.
// Run: NOSHOT=1 node shot2.js <url> x.png ./t_blog2.js
module.exports = async (p) => { await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => { const out = [], T = battleText, pick = (lbl) => _t.state.items.find((i) => i.label === lbl).onClick();
    const lbl = (id) => T.moves.find((m) => m.id === id).label, win = (mv) => Object.keys(T.beats).find((k) => T.beats[k] === mv);
    out.push('artifacts start ' + Kt.artifacts + ' pickups in scene ' + C.children.filter(c => c.userData && c.userData.gemPiece !== undefined).length);
    const e = It.byId.w_mont;
    Dbt.start(e); out.push('OPEN: ' + JSON.stringify(_t.state.log) + ' sub ' + JSON.stringify(_t.state.sub) + ' bar ' + JSON.stringify(_t.state.bar && _t.state.bar.label));
    pick(lbl(Dbt.state.mv)); out.push('TIE: ' + JSON.stringify(_t.state.log));
    pick(lbl(T.beats[Dbt.state.mv])); out.push('LOSE: ' + JSON.stringify(_t.state.log));
    for (let k = 0; k < 3; k++) { pick(lbl(win(Dbt.state.mv))); out.push('WIN ' + k + ': ' + JSON.stringify(_t.state.log) + ' items ' + _t.state.items.length); }
    out.push('artifacts ' + Kt.artifacts); _t.close();
    Dbt.start(e); for (let k = 0; k < 3; k++) pick(lbl(win(Dbt.state.mv))); out.push('AGAIN: ' + JSON.stringify(_t.state.log) + ' artifacts ' + Kt.artifacts); _t.close();
    for (const id of ['p_etcher', 'p_glyph']) { Dbt.start(It.byId[id]); for (let k = 0; k < 3; k++) pick(lbl(win(Dbt.state.mv))); out.push(id + ': ' + JSON.stringify(_t.state.log) + ' artifacts ' + Kt.artifacts); _t.close(); }
    Dbt.start(e); let n = 0; while (Dbt.state && !Dbt.state.over && n++ < 20) { pick(T.bow); out.push('BOW: ' + JSON.stringify(_t.state.log)); } _t.close();
    out.push('err ' + Re.errors); return out.join('\n'); }));
  await p.waitForTimeout(1000);
  // with all three, SPARKAKUS's finale runs
  console.log(await p.evaluate(() => { try { LIB.talk(); } catch (x) { return 'LIB err ' + x.message; } return 'LIB top ' + jt.top + ' text ' + JSON.stringify((qt.text || '').slice(0, 60)); }));
  await p.waitForTimeout(500);
  console.log(await p.evaluate(() => { for (let i = 0; i < 40 && jt.top === 'dialogue'; i++) { try { qt.skipAll(); } catch (x) {} } return 'after rewards.artifacts ' + Kt.rewards.artifacts + ' gem ' + Kt.gem + ' err ' + Re.errors; }));
};
