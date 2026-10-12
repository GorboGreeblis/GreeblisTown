// The Ancient Gem: SPARKAKUS gives it after the Artifacts; GEMTOE trades it for the Summoning Stone, then talks
// normally. Prints the state at each step and the dialogue lines.
// Run: NOSHOT=1 node shot2.js <url> x.png ./t_gem.js
module.exports = async (p) => { await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await p.waitForTimeout(1500);
  const W = (ms) => p.waitForTimeout(ms), log = [];
  const adv = async (n) => { for (let i = 0; i < n; i++) { const t = await p.evaluate(() => { if (!qt.isOpen) return null; const x = (document.getElementById('dlgText') || {}).textContent || ''; qt.advance(); return x.slice(0, 120); }); if (t) log.push('   > ' + t); await W(700); } };
  log.push('start ' + (await p.evaluate(() => JSON.stringify({ stone: Kt.rewards.stone, gem: Kt.gem }))));
  log.push('gemtoe before: ' + (await p.evaluate(() => { te(It.byId.p_gemtoe); return Kt.rewards.stone; })));
  await adv(3);
  await p.evaluate(() => { Kt.artifacts = 3; LIB.talk(); });
  // (his lines, the glue bottle putting the Gem together, his speech and the Gem collected)
  for (let i = 0; i < 90 && !(await p.evaluate(() => Kt.gem && !qt.isOpen)); i++) await adv(1);
  log.push('after sparkakus ' + (await p.evaluate(() => JSON.stringify({ arts: Kt.rewards.artifacts, gem: Kt.gem, stone: Kt.rewards.stone }))));
  // (her happy spin once the trade is done: the model's wrapper turns a full turn with a hop, 1.4 s)
  // (sampled on animation frames, not through L: its callbacks wait while her words are open, the spin doesn't)
  await p.evaluate(() => { window.__sp = { ry: 0, hop: 0, n: 0 }; const tick = () => { const h = It.byId.p_gemtoe, w = h.group.userData.tkW; h.spinAt && w && performance.now() - h.spinAt < 1500 && (__sp.n++, (__sp.ry = Math.max(__sp.ry, w.rotation.y)), (__sp.hop = Math.max(__sp.hop, w.position.y))); requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  await p.evaluate(() => te(It.byId.p_gemtoe));
  await adv(4);
  log.push('after gemtoe ' + (await p.evaluate(() => JSON.stringify({ gem: Kt.gem, stone: Kt.rewards.stone }))));
  await W(1500);
  log.push('happy spin: ' + (await p.evaluate(() => 'frames ' + __sp.n + ' (few: the headless page draws a frame or two a second), turned up to ' + __sp.ry.toFixed(2) + ' rad, hopped ' + __sp.hop.toFixed(2) + ' m, back upright after ' + (It.byId.p_gemtoe.group.userData.tkW.rotation.y === 0))));
  await p.evaluate(() => te(It.byId.p_gemtoe)); await adv(2);
  log.push('gemtoe again (normal talk), stone ' + (await p.evaluate(() => Kt.rewards.stone)) + ' errors ' + (await p.evaluate(() => Re.errors)));
  console.log(log.join('\n'));
};
