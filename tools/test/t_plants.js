// The five plant kinds at the Garden Event: runs an Event from the Summoning Stone to the end and reports how
// many plants of each kind came up, how many show their full model and how many the light one (full within
// 7 m of the eye), what the church's slug did meanwhile (it plants and dances along, lying where it is), and
// how fast game time ran against real time (a slow-down means the plants cost too much). Renders the grown
// garden from its edge and from across the square (<out>_garden_near.png, <out>_garden_far.png).
//   NOSHOT=1 node shot2.js <url> plants.png ./t_plants.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(640, 360); await W(1500);
  const shot = (name, cam, look) => p.evaluate(([cam, look]) => {
    const c = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 300); c.position.set(...cam); c.lookAt(...look);
    O.setSize(800, 600, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }, [cam, look]).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 3); (Kt.rewards.stone = !0), z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  const t0 = Date.now(), g0 = await p.evaluate(() => Re.t), slug = new Set();
  for (let k = 0; k < 4000; k++) {
    await W(1000);
    const r = await p.evaluate(() => [me.active, JGP.slug.mode(), +Re.t.toFixed(1), JGP.garden.plants.length, gcHorn.phase]);
    slug.add(r[1]);
    // (progress every half minute, so a slow run still shows how far it got)
    k % 30 || log('  at', Math.round((Date.now() - t0) / 1000), 's: game time', r[2], '| plants', r[3], '| horn', r[4], '| slug', r[1]);
    if (!r[0] && k > 20) break;
  }
  const rate = (await p.evaluate(() => Re.t) - g0) / ((Date.now() - t0) / 1000);
  log('Event done; game time ran at', rate.toFixed(2), 'x real time | the slug was:', [...slug].join(', '), slug.has('plant') && slug.has('dance') ? 'ok' : 'FAIL: did not plant and dance');
  log('Event plants by kind:', await p.evaluate(() => JSON.stringify(JGP.garden.plants.reduce((a, q) => ((a[q.kind + 1] = (a[q.kind + 1] || 0) + 1), a), {}))));
  // stand at the garden's south edge: the near plants full, the far ones light
  await p.evaluate(() => At.position.set(0, 0, 15)); await W(1500);
  log('from the garden edge, full / light:', await p.evaluate(() => { const L = JGP.garden.lods; return L.filter(([, h]) => h.visible).length + ' / ' + L.filter(([, , l]) => l.visible).length; }));
  await shot('garden_near', [0, 1.7, 15], [0, 0.4, 4]);
  await shot('garden_far', [0, 9, 26], [0, 0, 2]);
  log('err', await p.evaluate(() => Re.errors));
};
