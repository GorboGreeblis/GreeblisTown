// The Ancient Gem: SPARKAKUS gives it after the Artifacts; GEMTOE trades it for the Summoning Stone.
module.exports = async (p) => { await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  const W = (ms) => p.waitForTimeout(ms), log = [];
  const adv = async (n) => { for (let i = 0; i < n; i++) { const t = await p.evaluate(() => { if (!qt.isOpen) return null; const x = (document.getElementById('dlgText') || {}).textContent || ''; qt.advance(); return x.slice(0, 120); }); if (t) log.push('   > ' + t); await W(700); } };
  log.push('start ' + (await p.evaluate(() => JSON.stringify({ stone: Kt.rewards.stone, gem: Kt.gem }))));
  log.push('gemtoe before: ' + (await p.evaluate(() => { te(It.byId.p_gemtoe); return Kt.rewards.stone; })));
  await adv(3);
  await p.evaluate(() => { Kt.artifacts = 3; LIB.talk(); });
  await adv(14);
  log.push('after sparkakus ' + (await p.evaluate(() => JSON.stringify({ arts: Kt.rewards.artifacts, gem: Kt.gem, stone: Kt.rewards.stone }))));
  await p.evaluate(() => te(It.byId.p_gemtoe));
  await adv(4);
  log.push('after gemtoe ' + (await p.evaluate(() => JSON.stringify({ gem: Kt.gem, stone: Kt.rewards.stone }))));
  await p.evaluate(() => te(It.byId.p_gemtoe)); await adv(2);
  log.push('gemtoe again (normal talk), stone ' + (await p.evaluate(() => Kt.rewards.stone)) + ' errors ' + (await p.evaluate(() => Re.errors)));
  console.log(log.join('\n'));
};
