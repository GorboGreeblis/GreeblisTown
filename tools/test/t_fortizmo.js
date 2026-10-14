// FORTIZMO's walk behind the bar: four times her roam callback is pushed past its wait (headless game time is slow),
// then she is sampled every 5 s for 40 s.
// Env: none.
// Output: one line of samples `<home z>/<x>,<z>[*] ry <heading>` (* while moving), then `err <n>`.
//   NOSHOT=1 node test/shot.js <url> x.png test/t_fortizmo.js
const { start, logErrors } = require('./lib.js');

module.exports = async (p) => {
  await start(p);
  const st = () => p.evaluate(() => { const f = It.byId.frog; return f.home.z.toFixed(1) + '/' + f.group.position.x.toFixed(2) + ',' + f.group.position.z.toFixed(1) + (f.moving ? '*' : '') + ' ry ' + f.group.rotation.y.toFixed(2); });
  const out = [];
  for (let r = 0; r < 4; r++) {
    // the roam callback, pushed past its wait twice: once to start the wait, once to pick a spot
    await p.evaluate(() => { const fn = L.find((g) => /barSpot\(0\)/.test(String(g))); fn(Re.t + 1000); fn(Re.t + 2000); });
    for (let k = 0; k < 8; k++) { await p.waitForTimeout(5000); out.push(await st()); }
  }
  console.log(out.join('  '));
  await logErrors(p);
};
