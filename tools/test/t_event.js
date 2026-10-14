// The Garden Event's planting: every planter grows one flower at its spot, and three Events in a row (only the first
// grows flowers; the second and third replay the same spots and leave the garden as it was). Slow.
// Env: PART=planters,rounds (only those parts).
// Output: `== part: <name>` and each part's lines (below).
//   VW=200 VH=150 NOSHOT=1 node test/shot.js <url> x.png test/t_event.js
const { log, start, startEvent, logErrors, watchAncient, ancientReport } = require('./lib.js');

// The Garden Event's planters, one by one (the owner's rules): every planting creature, SPARKAKUS too, plants at a spot
// inside the garden and grows a flower there in the first Event; SPARKAKUS has a Talk line through it; the church's
// ANCIENT never plants or dances (lib.js watchAncient); and ZOLLOD (freed, and out on a visit to KING DINO when it
// starts) goes to the garden straight, never back into his kiosk. Prints SPARKAKUS's Talk at his spot, one line with
// the planters, the plants, the missing flowers and ZOLLOD's frames in his kiosk, then the Ancient's line (ok or FAIL).
const planters = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  // ZOLLOD freed and sent to KING DINO, the Event started once he is out of his kiosk
  await p.evaluate(() => { window.__gbNoThrottle = 1; Kt.shyFree = !0; JGP.visitAt(Re.t, 'cutebex', 'm_kingdino'); });
  for (let k = 0; k < 400; k++) {
    await W(250);
    const out = await p.evaluate(() => { const z0 = It.all.find((q) => q.def.__type === 'cutebex'), KB = F.buildings.find((B) => B.name === 'garden'), q = z0.group.position; return !F.inHull(KB, q.x, q.z) && Math.hypot(q.x - z0.home.x, q.z - z0.home.z) > 3; });
    if (out) break;
  }
  await p.evaluate(() => {
    window.__EV = { zIn: 0, pl: {} };
    L.push(() => {
      if (!me.active) return;
      const z0 = It.all.find((q) => q.def.__type === 'cutebex'), KB = F.buildings.find((B) => B.name === 'garden'), q = z0.group.position;
      F.inHull(KB, q.x, q.z) && __EV.zIn++;
      // (each planter's spot, kept: the slots are cleared when the Event ends)
      for (const e of It.all) e.finaleSlot && e.id !== 'frog' && Math.hypot(e.finaleSlot.x, e.finaleSlot.z) < JGP.GARDEN_R && (__EV.pl[e.id] = { name: e.def.name, x: e.finaleSlot.x, z: e.finaleSlot.z });
    });
  });
  await watchAncient(p);
  await startEvent(p, { snacks: false });
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
    const missing = planters.filter(([id, q]) => !(id === 'blinker' && Kt.rewards.snacks) && !has(q.x, q.z)).map(([, q]) => q.name);
    const sp = st.pos(), spFlower = has(sp.x, sp.z);
    return 'planters ' + planters.length + ' + SPARKAKUS | plants ' + g.plants.length + ' | missing a flower: ' + (missing.join(', ') || 'none') + ' | SPARKAKUS flower: ' + spFlower + ' | ZOLLOD frames inside his kiosk during the Event: ' + __EV.zIn + ' | err ' + Re.errors;
  }));
  log('the ANCIENT:', await ancientReport(p));
};

// Three Garden Events in a row: only the first grows flowers (one per planter); the second and third send
// everyone back to the same spots to plant, and the garden is left exactly as the first Event left it. Prints one
// line per Event ending in `ok` or `FAIL`, whether events 2 and 3 used event 1's spots, the spots, then `err <n>`.
const rounds = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  const spotsByRound = [];
  for (let ev = 1; ev <= 3; ev++) {
    // wait for everyone to be home (or 60 game s) before the next Event
    for (let k = 0; k < 400; k++) {
      const ok = await p.evaluate(() => !me.active && It.all.every((e) => !e.busy));
      if (ok) break;
      await W(1000);
    }
    const before = await p.evaluate(() => (window.__snap = JGP.garden.plants.map((q) => [q.g.position.x, q.g.position.z, q.g.scale.x, q.grow])).length);
    await startEvent(p);
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
      const radii = {}; nw.forEach((q) => { const r = Math.round(Math.hypot(q.g.position.x, q.g.position.z)); radii[r] = (radii[r] || 0) + 1; });
      return { round: JGP.garden.round, before: n0, after: pl.length, newPlants: nw.length, newGrown: nw.filter((q) => q.grow >= 1).length, oldChanged: changed, newRadii: radii, inScene: pl.filter((q) => q.g.parent).length, err: Re.errors };
    }, before);
    log('EVENT ' + ev, JSON.stringify(res), 'max planting at once', maxPlanting, (ev === 1 ? res.newPlants > 0 : res.newPlants === 0) && !res.oldChanged ? 'ok' : 'FAIL');
  }
  const same = (k) => spotsByRound[k] && spotsByRound[0] && spotsByRound[k].join('|') === spotsByRound[0].join('|');
  log('events 2 and 3 use event 1 spots:', same(1), same(2));
  log('spots 1:', (spotsByRound[0] || []).join(' '));
  log('spots 2:', (spotsByRound[1] || []).join(' '));
  await logErrors(p);
};

module.exports = require('./parts.js')({ planters, rounds });
