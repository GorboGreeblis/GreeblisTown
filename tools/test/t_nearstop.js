// Every creature walking home stops a while for the player coming near (the owner's rule), and ZOLLOD stays put while
// his shop, opened from him out in the world, is open. For each case the player is set 2 m from the walker on its way
// home, and how far it moves over the next 4 game seconds is measured (a stop moves well under 0.3 m).
//   VW=320 VH=240 NOSHOT=1 node shot.js <url> x.png ./t_nearstop.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const waitGame = async (sec, until) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 6000 && (await p.evaluate(() => Re.t)) - t0 < sec; k++) { if (until && (await p.evaluate(until))) return !0; await W(250); } return !1; };
  await p.evaluate(() => { window.__gbNoThrottle = 1; Kt.shyFree = !0; JGP.visitAt(9e15); JGP.meetAt && JGP.meetAt(9e15); At.position.set(0, 0, 2); });
  const pos = (vid) => p.evaluate((vid) => { if (vid === 'keeper') { const q = st.pos(); return [q.x, q.z]; } const e = It.byId[vid] || It.all.find((q) => q.def && q.def.__type === vid); return [e.group.position.x, e.group.position.z]; }, vid);
  // (stand 2 m off it, on its line home where that is known, and wait)
  const nearBy = async (vid) => {
    await p.evaluate((vid) => {
      const q = vid === 'keeper' ? st.pos() : (It.byId[vid] || It.all.find((o) => o.def && o.def.__type === vid)).group.position;
      At.position.set(q.x + 1.4, 0, q.z + 1.4);
    }, vid);
    await waitGame(0.3);
    const a = await pos(vid);
    await waitGame(4);
    const b = await pos(vid);
    return Math.hypot(b[0] - a[0], b[1] - a[1]);
  };
  const back = (vid) => new Function('const q = JGP.visits().all.find((q) => q.v === "' + vid + '"); return !!q && q.stage === "back";');
  for (const [vid, hid] of [['drifter', 'p_mamagorbo'], ['p_gemtoe', 'cutebex'], ['cutebex', 'p_mamagorbo'], ['keeper', 'p_mamagorbo']]) {
    await p.evaluate(() => At.position.set(0, 0, 2));
    await p.evaluate(([v, h]) => JGP.visitAt(9e15, v, h), [vid, hid]);
    const got = await waitGame(200, back(vid));
    await waitGame(2);
    const moved = got ? await nearBy(vid) : -1;
    log(vid + ' walking home from ' + hid + ': reached', got, '| moved with the player near', moved.toFixed(2), moved >= 0 && moved < 0.3 ? 'STOPPED' : 'KEPT WALKING');
    await p.evaluate(() => At.position.set(0, 0, 2));
    await waitGame(150, () => !JGP.visits().all.length);
  }
  // (a route-planned walk home: ETCHER sent home from off the floor)
  await p.evaluate(() => { const e = It.byId.p_etcher; e.group.position.set(-10, 0, 10); JGP.sendHome(e, Re.t); });
  await waitGame(2);
  const mE = await nearBy('p_etcher');
  log('p_etcher planned way home: moved with the player near', mE.toFixed(2), mE < 0.3 ? 'STOPPED' : 'KEPT WALKING');
  // (ZOLLOD's shop open, from him walking home: he stays put till it closes, however long)
  await p.evaluate(() => At.position.set(0, 0, 2));
  await p.evaluate(() => JGP.visitAt(9e15, 'cutebex', 'p_mamagorbo'));
  await waitGame(200, back('cutebex'));
  await waitGame(2);
  const z0 = await p.evaluate(() => { const e = It.all.find((q) => q.def && q.def.__type === 'cutebex'), g = e.group.position; At.position.set(g.x + 1.4, 0, g.z + 1.4); xe.scan(); const o = xe.actions[0]; xe.lastTarget = e; o.run(); return [g.x, g.z, jt.has('panel') && 'shop' === _t.kind]; });
  await waitGame(20);
  const z1 = await pos('cutebex');
  log('cutebex shop open', z0[2], '| moved over 20 s with it open', Math.hypot(z1[0] - z0[0], z1[1] - z0[1]).toFixed(2));
  await p.evaluate(() => { _t.close(); At.position.set(0, 0, 2); });
  const home = await waitGame(200, () => !JGP.visits().all.some((q) => q.v === 'cutebex'));
  log('cutebex home after the shop closed', home);
  log('err', await p.evaluate(() => Re.errors));
};
