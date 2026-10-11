module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  const S = () => p.evaluate(() => JSON.stringify({ t: +Re.t.toFixed(1), active: me.active, live: bt.live, seeds: bt.seeds, gathered: It.all.filter((e) => e.busy === 'finale').length, keeperAway: st.away(), plants: JGP.garden.plants.length, special: JGP.garden.plants.filter((q) => q.special).length, horn: gcHorn.phase, bp: JGP.backpacka.busy(), err: Re.errors }));
  const start = () => p.evaluate(() => { At.position.set(0, 0, 2.8); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  const finish = async () => {
    await p.evaluate(() => JGP.backpacka.start(Re.t - (JGP.backpacka.D.gone - 2)));
    for (let k = 0; k < 120 && (await p.evaluate(() => me.active)); k++) await W(1000);
    for (let k = 0; k < 200 && (await p.evaluate(() => It.all.some((e) => e.busy) || st.away())); k++) await W(1000);
  };
  await p.mouse.click(640, 360); await W(1500);
  // 1: no Seeds
  await start(); await W(4000); console.log('noseeds start', await S());
  await p.evaluate(() => JGP.backpacka.start(Re.t - (JGP.backpacka.D.inA - 1))); await W(5000); console.log('noseeds horn', await S());
  await finish(); console.log('noseeds end', await S());
  // 2: with Seeds
  await p.evaluate(() => { Kt.rewards.seeds = !0; });
  await start();
  for (let k = 0; k < 60 && !(await p.evaluate(() => bt.live)); k++) await W(1000);
  await W(25000); console.log('seeds mid', await S());
  await finish(); console.log('seeds end', await S());
  const n1 = await p.evaluate(() => JGP.garden.plants.length);
  // 3: again
  await start();
  for (let k = 0; k < 60 && !(await p.evaluate(() => bt.live)); k++) await W(1000);
  await W(20000); console.log('repeat mid', await S());
  await finish(); console.log('repeat end', await S(), 'plants before', n1);
};
