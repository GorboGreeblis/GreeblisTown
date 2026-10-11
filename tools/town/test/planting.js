module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await p.mouse.click(640, 360); await W(1500);
  await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 2.8); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  let last = '';
  for (let k = 0; k < 400; k++) {
    await W(3000);
    last = await p.evaluate(() => JSON.stringify({ t: +Re.t.toFixed(1), live: bt.live, plants: JGP.garden.plants.length, moving: It.all.filter((e) => e.busy === 'finale' && e.moving).length, gathered: It.all.filter((e) => e.busy === 'finale').length, err: Re.errors }));
    if (k % 10 === 0) console.log(last);
    if (JSON.parse(last).plants > 24) break;
  }
  console.log('final', last);
};
