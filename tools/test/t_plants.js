// The five plant kinds at the Garden Event: an Event run from the Summoning Stone to its end; how many plants of each
// kind came up, how many show their full model and how many the light one (full within 7 m of the eye), that the
// church's ANCIENT never plants or dances (the owner's rule: lib.js watchAncient), and how fast game time ran against
// real time (a slow-down means the plants cost too much). Slow.
// Env: none.
// Output: a progress line every 30 s, `Event done; game time ran at <x> x real time | the Ancient: … ok` (or FAIL),
//   the plants by kind, `from the garden edge, full / light: <n> / <n>`, then `err <n>`; <out>_garden_near.png and
//   <out>_garden_far.png (800×600 px).
//   NOSHOT=1 node test/shot.js <url> x.png test/t_plants.js
const { log, start, render, outName, startEvent, logErrors, watchAncient, ancientReport } = require('./lib.js');

module.exports = async (p, out) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  await watchAncient(p);
  await startEvent(p);
  const t0 = Date.now(), g0 = await p.evaluate(() => Re.t);
  for (let k = 0; k < 4000; k++) {
    await W(1000);
    const r = await p.evaluate(() => [me.active, JGP.slug.mode(), +Re.t.toFixed(1), JGP.garden.plants.length, gcHorn.phase]);
    // (progress every half minute, so a slow run still shows how far it got)
    k % 30 || log('  at', Math.round((Date.now() - t0) / 1000), 's: game time', r[2], '| plants', r[3], '| horn', r[4], '| the Ancient', r[1]);
    if (!r[0] && k > 20) break;
  }
  const rate = ((await p.evaluate(() => Re.t)) - g0) / ((Date.now() - t0) / 1000);
  log('Event done; game time ran at', rate.toFixed(2), 'x real time | the Ancient:', await ancientReport(p));
  log('Event plants by kind:', await p.evaluate(() => JSON.stringify(JGP.garden.plants.reduce((a, q) => ((a[q.kind + 1] = (a[q.kind + 1] || 0) + 1), a), {}))));
  // the garden's south edge: the near plants full, the far ones light
  await p.evaluate(() => At.position.set(0, 0, 15)); await W(1500);
  log('from the garden edge, full / light:', await p.evaluate(() => { const L = JGP.garden.lods; return L.filter(([, h]) => h.visible).length + ' / ' + L.filter(([, , l]) => l.visible).length; }));
  await render(p, outName(out, 'garden_near'), [0, 1.7, 15], [0, 0.4, 4], { fov: 50, near: 0.1 });
  await render(p, outName(out, 'garden_far'), [0, 9, 26], [0, 0, 2], { fov: 50, near: 0.1 });
  await logErrors(p);
};
