// Planting and dancing are creature animations, not menu options. Checks:
// 1. every creature's menu holds only Talk (and "Give a blossom" while the player has one), and ZOLLOD's opens the shop;
// 2. each creature's own planting move and dance (JGP.plantMove / JGP.danceMove, keyed by Xt(ent)) moves it;
// 3. at the Garden Event (with Seeds) creatures plant, then dance while FORTIZMO plays.
// Run with run.js. Headless game time is slow: the Event part waits on Re.t and can take several minutes.
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  console.log(await p.evaluate(() => {
    Kt.blossoms = 1;
    const bad = [], moves = [];
    for (const e of It.all) {
      const key = Xt(e), labels = xe.actionsFor(e).map((a) => a.label);
      const ok = key === 'cutebex' ? labels.length === 1 && /Shop/.test(labels[0]) : labels.every((l) => /^Talk to |^Give a blossom$/.test(l));
      ok || bad.push(e.def.name + ': ' + labels.join(' / '));
      let pm = 0, dm = 0;
      for (let t = 0; t < 6; t += 0.05) {
        const a = JGP.plantMove(key, t), b = JGP.danceMove(key, t);
        pm = Math.max(pm, ...['x', 'y', 'z', 'rx', 'ry', 'rz'].map((k) => Math.abs(a[k] || 0)), Math.abs((a.sy || 1) - 1));
        dm = Math.max(dm, ...['x', 'y', 'z', 'rx', 'ry', 'rz'].map((k) => Math.abs(b[k] || 0)), Math.abs((b.sy || 1) - 1));
      }
      moves.push(e.def.name + ' plant ' + pm.toFixed(2) + ' dance ' + dm.toFixed(2));
    }
    Kt.blossoms = 0;
    return 'menus ' + (bad.length ? 'BAD: ' + bad.join(' | ') : 'ok') + '\n' + moves.join('\n');
  }));
  // the Garden Event: count creatures well into each move
  await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 2.8); (Kt.rewards.stone = !0), z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  const seen = { plant: 0, dance: 0 };
  for (let k = 0; k < 300 && !(seen.plant && seen.dance); k++) {
    await W(1000);
    const c = await p.evaluate(() => { const c = { plant: 0, dance: 0 }; for (const [, s] of bt.tg) if (s.k > 0.3 && s.mode) c[s.mode]++; return c; });
    seen.plant = Math.max(seen.plant, c.plant), seen.dance = Math.max(seen.dance, c.dance);
    if (k === 30 && !seen.dance) await p.evaluate(() => JGP.backpacka.start(Re.t - 1));
  }
  console.log('event: most planting at once ' + seen.plant + ', most dancing at once ' + seen.dance + ', errors ' + (await p.evaluate(() => Re.errors)));
};
