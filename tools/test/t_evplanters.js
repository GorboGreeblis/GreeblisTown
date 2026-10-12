// The Garden Event's planters, one by one (owner's rules): every planting creature, SPARKAKUS too, plants at a spot
// inside the garden and grows a flower there in the first Event; SPARKAKUS has a Talk line through it; the church's
// ANCIENT never dances or plants; and ZOLLOD (freed, and out on a visit to KING DINO when it starts) goes to the
// garden straight, never back into his kiosk.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_evplanters.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  // ZOLLOD freed and sent to KING DINO, the Event started once he is out of his kiosk
  await p.evaluate(() => { window.__gbNoThrottle = 1; Kt.shyFree = !0; JGP.visitAt(Re.t, 'cutebex', 'm_kingdino'); });
  for (let k = 0; k < 400; k++) {
    await W(250);
    const out = await p.evaluate(() => { const z0 = It.all.find((q) => q.def.__type === 'cutebex'), KB = F.buildings.find((B) => B.name === 'garden'), q = z0.group.position; return !F.inHull(KB, q.x, q.z) && Math.hypot(q.x - z0.home.x, q.z - z0.home.z) > 3; });
    if (out) break;
  }
  await p.evaluate(() => {
    window.__EV = { zIn: 0, slug: new Set(), spTalk: null, pl: {} };
    L.push(() => {
      if (!me.active) return;
      const z0 = It.all.find((q) => q.def.__type === 'cutebex'), KB = F.buildings.find((B) => B.name === 'garden'), q = z0.group.position;
      F.inHull(KB, q.x, q.z) && __EV.zIn++;
      __EV.slug.add(JGP.slug.mode());
      // (each planter's spot, kept: the slots are cleared when the Event ends)
      for (const e of It.all) e.finaleSlot && e.id !== 'frog' && Math.hypot(e.finaleSlot.x, e.finaleSlot.z) < JGP.GARDEN_R && (__EV.pl[e.id] = { name: e.def.name, x: e.finaleSlot.x, z: e.finaleSlot.z });
    });
    Kt.rewards.seeds = Kt.rewards.stone = !0; Kt.rewards.snacks = !1;
    At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes();
  });
  // through the planting and the growing (game time)
  const t0 = await p.evaluate(() => Re.t);
  let tk = 0;
  for (let k = 0; k < 2400; k++) {
    await W(500);
    const r = await p.evaluate(() => [Re.t, JGP.garden.plants.length, me.active, bt.live]);
    if (!tk && r[3] && (await p.evaluate(() => st.away() && st.there && st.there()))) {
      tk = 1;
      log('SPARKAKUS at his spot, Talk offered:', await p.evaluate(() => { const s = z.list.find((q) => q.id === 'stump'); return s.label(); }), '| distance from the garden centre', await p.evaluate(() => { const q = st.pos(); return +Math.hypot(q.x, q.z).toFixed(1); }), '(garden radius', await p.evaluate(() => JGP.GARDEN_R) + ')');
    }
    if (r[0] - t0 > 70 || !r[2]) break;
  }
  log(await p.evaluate(() => {
    const g = JGP.garden, planters = Object.entries(__EV.pl);
    const has = (x, z) => g.plants.some((pl) => Math.hypot(pl.g.position.x - x, pl.g.position.z - z) < 1.7);
    const missing = planters.filter(([id, q]) => !(id === 'blinker' && Kt.rewards.snacks) && !has(q.x, q.z)).map(([id, q]) => q.name);
    const sp = st.pos(), spFlower = has(sp.x, sp.z);
    return 'planters ' + planters.length + ' + SPARKAKUS | plants ' + g.plants.length + ' | missing a flower: ' + (missing.join(', ') || 'none') + ' | SPARKAKUS flower: ' + spFlower + ' | the ANCIENT was: ' + [...__EV.slug].join(', ') + ' | ZOLLOD frames inside his kiosk during the Event: ' + __EV.zIn + ' | err ' + Re.errors;
  }));
};
