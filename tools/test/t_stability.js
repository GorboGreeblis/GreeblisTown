// Context-loss and repeated quest-action regression. Run via shot.js at320x240.
const assert = require('node:assert/strict');
const { start, log, logErrors } = require('./lib.js');
module.exports = async p => {
  await start(p);
  assert.equal(await p.evaluate(() => { const e=It.byId.p_gemtoe; return E.clear(e.home.x,e.home.z); }),false,"pickups must not spawn under Gemtoe’s fixed home");
  const progress = await p.evaluate(() => {
    const e = It.byId.p_gemtoe;
    Kt.gem=true; te(e); qt.skipAll(); te(e); qt.skipAll();
    const stone = Kt.rewards.stone, gem = Kt.gem;
    Kt.acorns=100;
    const seeds=r.find(q => q.reward === 'seeds');
    ne.open(); ne.buy(seeds); const afterFirst=Kt.acorns; ne.buy(seeds); const afterAgain=Kt.acorns; _t.close();
    return {stone,gem,seeds:Kt.rewards.seeds,afterFirst,afterAgain};
  });
  assert.equal(progress.stone,true); assert.equal(progress.gem,false);
  assert.equal(progress.seeds,true); assert.equal(progress.afterAgain,progress.afterFirst);
  log('Gem trade and Seeds purchase preserve one-time rewards/costs: passed');
  await p.evaluate(() => O.forceContextLoss());
  await p.waitForFunction(() => Ho.contextLost,{},{timeout:10000});
  const t = await p.evaluate(() => Re.t);
  await p.waitForTimeout(1000);
  assert.equal(await p.evaluate(() => Re.t),t,'context loss pauses game time');
  await p.evaluate(() => O.forceContextRestore());
  await p.waitForFunction(() => !Ho.contextLost,{},{timeout:30000});
  await p.waitForTimeout(1000);
  assert.ok(await p.evaluate(t => Re.t > t,t),'world resumes after context restoration');
  assert.equal(await p.evaluate(() => Re.errors),0);
  log('actual WebGL loss pauses game and restores rendering/progression: passed'); await logErrors(p);
};
