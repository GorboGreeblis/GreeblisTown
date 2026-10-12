// The Garden Event from start to finish, logged every few seconds of game time (and what the church's Ancient is doing).
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await p.mouse.click(Math.min(640, (+process.env.VW || 1280) / 2), 60); await W(1500);
  await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 3); (Kt.rewards.stone = !0), z.list.find((s) => s.id === 'campfire').run(); oe.yes(); window.__p0 = JGP.garden.plants.length; });
  const S = () => p.evaluate(() => {
    const fin = It.all.filter((e) => 'finale' === e.busy), fz = It.byId.frog;
    const pl = JGP.garden.plants.slice(__p0);
    return JSON.stringify({ t: +Re.t.toFixed(1), act: me.active, live: bt.live, n: fin.length, mv: fin.filter((e) => e.moving).length,
      plant: fin.filter((e) => e.planting).length, dance: fin.filter((e) => e.concertDance).length, watch: fin.filter((e) => e.watching).length,
      fz: fz.group.position.x.toFixed(1) + ',' + fz.group.position.z.toFixed(1) + (fz.moving ? '*' : ''), horn: gcHorn.phase, music: !!ee.playing, bp: JGP.backpacka.busy(), slug: JGP.slug.mode(),
      plants: pl.length, wet: pl.filter((q) => q.wet).length, grown: pl.filter((q) => q.grow >= 1).length, home: It.all.filter((e) => !e.busy && e.home && Math.hypot(e.group.position.x - e.home.x, e.group.position.z - e.home.z) < 0.5).length, err: Re.errors });
  });
  let last = -99;
  for (let k = 0; k < 2000; k++) {
    await W(1000);
    const r = JSON.parse(await S());
    if (r.t - last >= 5) { console.log(JSON.stringify(r)); last = r.t; }
    if (!r.act && r.t > 20) { await W(3000); console.log('END', await S()); for (let j = 0; j < 60; j++) { await W(1000); } console.log('LATER', await S()); break; }
  }
};
