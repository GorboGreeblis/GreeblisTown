// The visits as they run on their own (no visit forced): over VISIT_S seconds of game time (default 600), who went
// visiting and who was called on, how often the church's ANCIENT was visited, and whether anyone ended up off its
// own ground. ZOLLOD takes part only once OVERCOMING SHYNESS has freed him (SHY=1 runs him still shy: he must then
// neither visit nor be visited). Prints the counts per creature and per pair, then the ones left off home ground.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_visitlong.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const secs = +(process.env.VISIT_S || 600), shy = process.env.SHY === '1';
  await p.evaluate((shy) => { window.__gbNoThrottle = 1; Kt.shyFree = !shy; At.position.set(0, 0, 2); window.__t0 = Re.t; }, shy);
  let last = 0;
  for (let k = 0; k < 20000; k++) {
    await W(1000);
    const t = await p.evaluate(() => Re.t - __t0);
    if (t - last > 120) { last = t; log(t.toFixed(0) + ' s: ' + (await p.evaluate(() => JSON.stringify(JGP.visits().made)))); }
    if (t > secs) break;
  }
  log(await p.evaluate(() => {
    const m = JGP.visits().made, by = {}, slug = [];
    for (const k in m) { const [v, h] = k.split('|'); by[v] = by[v] || { out: 0, in: 0 }; by[h] = by[h] || { out: 0, in: 0 }; by[v].out += m[k]; by[h].in += m[k]; if (h === 'slug') slug.push(k + ' x' + m[k]); }
    return 'per creature (went out / was called on): ' + Object.entries(by).map(([id, c]) => id + ' ' + c.out + '/' + c.in).join(', ') + '\nthe ANCIENT visited: ' + (slug.join(', ') || 'never');
  }));
  const off = await p.evaluate(() => {
    const hg = JGP.homeGround || (() => !0);
    return It.all.filter((h) => h.def && h.def.at && !h.visiting && !h.hosting && !h.vig && !h.moving && !hg(h)).map((h) => (h.id || h.def.__type) + ' at ' + h.group.position.x.toFixed(1) + ',' + h.group.position.z.toFixed(1));
  });
  log('off home ground at the end (standing still, not visiting):', off.join(' | ') || 'none', '| err', await p.evaluate(() => Re.errors));
};
