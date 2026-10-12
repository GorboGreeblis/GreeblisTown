// SPARKAKUS's Artifacts speech (the long Talk with the light bulb and the dimming, the glue bottle putting the Gem
// together) away from the Library: he is sent out on a visit (to GEMTOE), the player talks to him where he stands
// through the station menu, and the bulb, the Gem's assembly and the speech must all happen there, by him, not back
// at the Library. Then the same at the Garden Event, where his menu holds his Event line instead (the script).
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_spaway.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const waitGame = async (sec, until) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 4000 && (await p.evaluate(() => Re.t)) - t0 < sec; k++) { if (until && (await p.evaluate(until))) return !0; await W(250); } return !1; };
  const said = () => p.evaluate(() => (qt.isOpen ? document.getElementById('dlgText').textContent : null));
  const next = () => p.evaluate(() => { try { qt.advance(); } catch (e) {} });
  await p.evaluate(() => { window.__gbNoThrottle = 1; Kt.artifacts = 3; Kt.blossoms = 0; JGP.visitAt(Re.t, 'keeper', 'p_gemtoe'); });
  const away = await waitGame(60, () => st.away() && !st.ent.goHome && st.ent.visiting && Math.hypot(st.pos().x - It.byId.p_gemtoe.group.position.x, st.pos().z - It.byId.p_gemtoe.group.position.z) < 4);
  const where = await p.evaluate(() => { const q = st.pos(), lib = F.buildings.find((b) => b.name === 'shop'); return { away: st.away(), at: [+q.x.toFixed(1), +q.z.toFixed(1)], fromLibrary: +Math.hypot(q.x - lib.x, q.z - lib.z).toFixed(1) }; });
  log('out on a visit:', away, JSON.stringify(where));
  // talk to him where he stands, the game's way: stand by him, scan, take the Talk option
  const opts = await p.evaluate(() => { const q = st.pos(), g = It.byId.p_gemtoe.group.position, dx = q.x - g.x, dz = q.z - g.z, d = Math.hypot(dx, dz) || 1; At.position.set(q.x + (1.6 * dx) / d, 0, q.z + (1.6 * dz) / d); xe.scan(); const a = xe.actions.map((a) => a.label); const t = xe.actions.find((a) => a.verb === 'interact' && /SPARKAKUS/.test(a.label)); t && t.run(); return a.join(' / '); });
  log('menu by him:', opts);
  await W(800);
  const first = await said();
  // through the finale pages to the assembly, watching where the bulb and the Gem are
  const seen = [];
  for (let i = 0; i < 40; i++) {
    const r = await p.evaluate(() => {
      const g = C.children.find((c) => c.children.some((q) => q.userData && q.userData.gemPiece !== undefined)), q = st.pos();
      return { bulb: +Bulb.level.toFixed(2), gem: g ? +Math.hypot(g.position.x - q.x, g.position.z - q.z).toFixed(2) : null, open: qt.isOpen, txt: qt.isOpen ? document.getElementById('dlgText').textContent.slice(0, 40) : '' };
    });
    seen.push(r);
    if (r.open && /Eye of the Great Sphinx|missing/.test(r.txt)) break;
    r.open ? await next() : null;
    await waitGame(0.6);
  }
  const bulbMax = Math.max(...seen.map((r) => r.bulb)), gemD = seen.filter((r) => r.gem !== null).map((r) => r.gem);
  log('first page:', JSON.stringify(first), '| bulb on up to', bulbMax, '| Gem assembled', gemD.length ? gemD[0] + ' m from him' : 'never', '| speech reached:', JSON.stringify(seen[seen.length - 1].txt));
  const speech = [];
  for (let i = 0; i < 12 && (await p.evaluate(() => qt.isOpen)); i++) speech.push(await said()), await next(), await W(300);
  log('speech pages', speech.length, '| after:', await p.evaluate(() => JSON.stringify({ gem: Kt.gem, artifacts: Kt.rewards.artifacts, stillAway: st.away(), bulb: +Bulb.level.toFixed(2) })));
  await waitGame(3);
  log('bulb off again:', await p.evaluate(() => Bulb.level < 0.05), '| err', await p.evaluate(() => Re.errors));
};
