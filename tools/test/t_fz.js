// Fortizmo's walk behind the bar: four times pushes her roam callback past its wait (headless game time is slow), then
// samples her every 5 s for 40 s as home z / position x,z (* while moving) and heading. Prints the samples and errors.
// Run: NOSHOT=1 node shot2.js <url> x.png ./t_fz.js
module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  const st = () => p.evaluate(() => { const f = It.byId.frog; return f.home.z.toFixed(1) + '/' + f.group.position.x.toFixed(2) + ',' + f.group.position.z.toFixed(1) + (f.moving ? '*' : '') + ' ry ' + f.group.rotation.y.toFixed(2); });
  const out = [];
  for (let r = 0; r < 4; r++) {
    // the roam callback, pushed past its wait twice: once to start the wait, once to pick a spot
    await p.evaluate(() => { const fn = L.find((g) => /barSpot\(0\)/.test(String(g))); fn(Re.t + 1000); fn(Re.t + 2000); });
    for (let k = 0; k < 8; k++) { await p.waitForTimeout(5000); out.push(await st()); }
  }
  console.log(out.join('  '));
  console.log('err', await p.evaluate(() => Re.errors));
};
