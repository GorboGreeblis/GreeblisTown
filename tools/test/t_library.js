// SPARKAKUS browsing his Library: the spots he visits, that he never comes within 0.6 m of a bookcase or the
// banner's posts (in the Library's own frame) nor leaves it, that he stands still while talked to, and that he
// still walks out for the Garden Event and back.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_library.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(100, 60); await W(1500);
  const waitGame = async (sec) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 4000 && (await p.evaluate(() => Re.t)) - t0 < sec; k++) await W(250); };
  await p.evaluate(() => {
    At.position.set(0, 0, 30);
    const lib = F.buildings.find((b) => b.name === 'shop'), q = new THREE.Vector3();
    window.__S = { spots: new Set(), worst: 9, out: 0, moved: 0, last: null, talkMoved: 0 };
    L.push(() => {
      if (!st.group || st.away()) return;
      st.group.getWorldPosition(q); [q.x, q.z] = F.local(lib, q.x, q.z);
      const S = __S; S.spots.add(q.x.toFixed(1) + ',' + q.z.toFixed(1));
      for (const [a, b, c, d] of JGP.libParts) { const dx = Math.max(a - q.x, 0, q.x - c), dz = Math.max(b - q.z, 0, q.z - d); S.worst = Math.min(S.worst, Math.hypot(dx, dz)); }
      (q.x < -5.35 || q.x > 5.35 || q.z < -6.15 || q.z > 1.6) && S.out++;
      if (S.last) { const mv = Math.hypot(q.x - S.last[0], q.z - S.last[1]); S.moved += mv; window.__talking && (S.talkMoved += mv); }
      S.last = [q.x, q.z];
    });
  });
  await waitGame(90);
  log('browsing:', await p.evaluate(() => JSON.stringify({ spots: __S.spots.size, walked: +__S.moved.toFixed(1), nearestToFurniture: +__S.worst.toFixed(2), outside: __S.out })));
  // talked to: he stands still
  await p.evaluate(() => { const ph = z.list.find((s) => s.id === 'stump'); At.position.set(ph.x, 0, ph.z + 3.5); z.list.find((s) => s.id === 'stump').run(); window.__talking = 1; });
  await waitGame(6);
  log('while talked to: moved', await p.evaluate(() => +__S.talkMoved.toFixed(2)), 'm, dialogue open', await p.evaluate(() => qt.isOpen));
  await p.evaluate(() => { window.__talking = 0; for (let i = 0; i < 40 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} });
  await waitGame(20);
  // the Garden Event: out and back
  await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 3); (Kt.rewards.stone = !0), z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  let away = !1;
  for (let k = 0; k < 4000; k++) { await W(1000); const r = await p.evaluate(() => [me.active, st.away()]); r[1] && (away = !0); if (!r[0] && k > 20) break; }
  await waitGame(30);
  log('Event: went out', away, '| back home', await p.evaluate(() => !st.away()), '| err', await p.evaluate(() => Re.errors));
};
