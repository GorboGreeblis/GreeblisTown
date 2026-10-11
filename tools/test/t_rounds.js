// Three Garden Events in a row: the first two each grow a batch of plants (the second in fresh soil),
// the third sends everyone back to their first-Event spots to plant, with the garden left unchanged.
// Run with a tiny viewport (VW=200 VH=150); it takes a while.
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(100, 60); await W(1500);
  const spotsByRound = [];
  for (let ev = 1; ev <= 3; ev++) {
    // wait for everyone to be home (or 60 game s) before the next Event
    for (let k = 0; k < 400; k++) {
      const ok = await p.evaluate(() => !me.active && It.all.every((e) => !e.busy));
      if (ok) break;
      await W(1000);
    }
    const before = await p.evaluate(() => {
      Kt.rewards.seeds = !0; At.position.set(0, 0, 3);
      window.__snap = JGP.garden.plants.map((q) => [q.g.position.x, q.g.position.z, q.g.scale.x, q.grow]);
      z.list.find((s) => s.id === 'campfire').run(); oe.yes();
      return window.__snap.length;
    });
    let spots = null, maxPlanting = 0;
    for (let k = 0; k < 4000; k++) {
      await W(1000);
      const r = await p.evaluate(() => {
        const fin = It.all.filter((e) => 'finale' === e.busy && !JGP.noPlant(e));
        return { act: me.active, live: bt.live, t: Re.t, planting: fin.filter((e) => e.planting).length,
          spots: bt.live && !window.__spotsTaken ? ((window.__spotsTaken = 1), fin.map((e) => e.id + '@' + e.finaleSlot.x.toFixed(2) + ',' + e.finaleSlot.z.toFixed(2))) : null };
      });
      if (r.spots) spots = r.spots;
      maxPlanting = Math.max(maxPlanting, r.planting);
      if (!r.act && r.t > 20 && spots) break;
    }
    await p.evaluate(() => { window.__spotsTaken = 0; });
    spotsByRound.push(spots);
    const res = await p.evaluate((n0) => {
      const pl = JGP.garden.plants, nw = pl.slice(n0), old = pl.slice(0, n0);
      // the older plants are untouched (same place, same size, fully grown)
      const changed = old.filter((q, i) => { const s = __snap[i]; return Math.abs(q.g.position.x - s[0]) > 1e-6 || Math.abs(q.g.position.z - s[1]) > 1e-6 || Math.abs(q.g.scale.x - s[2]) > 1e-6; }).length;
      const slotsUsed = JGP.garden.slots.filter((s) => s.plant).length;
      const radii = {}; nw.forEach((q) => { const r = Math.round(Math.hypot(q.g.position.x, q.g.position.z)); radii[r] = (radii[r] || 0) + 1; });
      return { round: JGP.garden.round, before: n0, after: pl.length, newPlants: nw.length, newGrown: nw.filter((q) => q.grow >= 1).length, oldChanged: changed, slotsUsed, newRadii: radii, inScene: pl.filter((q) => q.g.parent).length, err: Re.errors };
    }, before);
    log('EVENT ' + ev, JSON.stringify(res), 'max planting at once', maxPlanting);
  }
  const same = spotsByRound[2] && spotsByRound[0] && spotsByRound[2].join('|') === spotsByRound[0].join('|');
  const diff = spotsByRound[1] && spotsByRound[0] && spotsByRound[1].filter((s, i) => s === spotsByRound[0][i]).length;
  log('event 3 spots = event 1 spots:', same, '| event 2 spots shared with event 1:', diff);
  log('spots 1:', (spotsByRound[0] || []).join(' '));
  log('spots 2:', (spotsByRound[1] || []).join(' '));
  log('err', await p.evaluate(() => Re.errors));
};
