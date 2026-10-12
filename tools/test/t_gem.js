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
  await p.evaluate(() => te(It.byId.p_gemtoe));
  await adv(4);
  log.push('after gemtoe ' + (await p.evaluate(() => JSON.stringify({ gem: Kt.gem, stone: Kt.rewards.stone }))));
  await p.evaluate(() => te(It.byId.p_gemtoe)); await adv(2);
  log.push('gemtoe again (normal talk), stone ' + (await p.evaluate(() => Kt.rewards.stone)) + ' errors ' + (await p.evaluate(() => Re.errors)));
  console.log(log.join('\n'));
};
