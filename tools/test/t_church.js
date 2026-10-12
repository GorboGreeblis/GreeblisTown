// The church's secret room: the player walks in through the right-hand Garden window (and only there), no
// creature ever stays inside, the VR head guard leaves the inside clear but darkens inside a wall, and the
// the ANCIENT offers Talk and, with Blossoms in hand, a Blossom (taking one, answered with "..."), lifts its head while talking (not turning to the player),
// keeps breathing and waving its stalks, and never leaves its spot; and no Blossom or Flint ever spawns in the room
// (2,000 spawn spots sampled for each, plus every one in the town now).
// Walking uses the game's own player collision (F.solid on the player's position), step by step, as every
// mode does (desktop, mobile and VR all move the same body). Run: NOSHOT=1 node shot2.js <url> x.png ./t_church.js
module.exports = async (p) => {
  const log = (...a) => console.log(...a);
  await p.mouse.click(640, 60); await p.waitForTimeout(2500);
  const r = await p.evaluate(() => {
    const B = F.buildings.find((b) => b.name === 'church'), D = 18, P = At.position, out = {};
    // walk straight from local (8, z) towards local x = 2, 5 cm a step, colliding as the game does
    const walk = (z) => {
      const [x0, z0] = F.world(B, 8, z);
      P.set(x0, 0, z0);
      for (let k = 0; k < 140; k++) {
        const [lx, lz] = F.local(B, P.x, P.z), [nx, nz] = F.world(B, lx - 0.05, lz);
        P.set(nx, 0, nz), F.solid(P, 0.6);
      }
      return +F.local(B, P.x, P.z)[0].toFixed(2);
    };
    out.throughWindow = walk(-D / 2);
    out.throughWallFront = walk(-4);
    out.throughWallBack = walk(-14);
    // the head guard: inside the nave, in the window gap, and inside a wall
    const sd = (lx, y, lz) => { const [x, z] = F.world(B, lx, lz); return +JGP.headGuard.sdist(x, y, z).toFixed(2); };
    out.headInNave = sd(0, 1.6, -6);
    out.headInGap = sd(5.9, 1.6, -D / 2);
    out.headInWall = sd(5.9, 1.6, -4);
    // a creature dropped inside is put straight back out
    const g = It.byId.p_gemtoe, [cx, cz] = F.world(B, 0, -6);
    g.group.position.set(cx, 0, cz);
    out.creature = { before: F.inHull(B, cx, cz) };
    return out;
  });
  await p.waitForTimeout(800);
  r.creature.after = await p.evaluate(() => { const B = F.buildings.find((b) => b.name === 'church'), q = It.byId.p_gemtoe.group.position; return F.inHull(B, q.x, q.z) + ' moved ' + JGP.churchGuard.moved; });
  log('walked in through the right Garden window to local x', r.throughWindow, r.throughWindow < 4 ? 'IN' : 'FAIL: blocked');
  log('walking at the wall elsewhere stops at x', r.throughWallFront, '/', r.throughWallBack, r.throughWallFront > 6 && r.throughWallBack > 6 ? 'blocked' : 'FAIL: got through');
  log('head guard distance: in the nave', r.headInNave, '| in the window gap', r.headInGap, '| in a wall', r.headInWall, r.headInNave > 0.2 && r.headInGap > 0.2 && r.headInWall < 0 ? 'ok' : 'FAIL');
  log('a creature dropped inside: inside before', r.creature.before, '| inside after', r.creature.after);
  // the ANCIENT: stand beside it inside, Blossoms in hand
  const sl = await p.evaluate(() => {
    const B = F.buildings.find((b) => b.name === 'church'), [x, z2] = F.world(B, 1.8, -10.5);
    Kt.blossoms = 3, At.position.set(x, 0, z2), xe.scan();
    const zn = z.list.find((q) => q.id === 'slug');
    return { target: xe.current && xe.current.id, actions: xe.actions.map((a) => a.label), at: [zn.x.toFixed(2), zn.z.toFixed(2)] };
  });
  const pose = () => p.evaluate(() => JSON.stringify({ head: +JGP.slug.head.rotation.y.toFixed(2), breath: +JGP.slug.mantle.scale.y.toFixed(3), stalk: +JGP.slug.stalks[0].rotation.x.toFixed(2) }));
  const idle = [await pose()];
  await p.waitForTimeout(1500), idle.push(await pose());
  await p.evaluate(() => xe.run('interact'));
  // (wait 2 s of game time, not wall time: headless game time runs about ten times slower)
  { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 600 && (await p.evaluate(() => Re.t)) - t0 < 2; k++) await p.waitForTimeout(100); }
  const talk = await p.evaluate(() => ({ mode: JGP.slug.mode(), open: qt.isOpen, name: document.getElementById('dlgName').textContent, hy: +JGP.slug.head.rotation.y.toFixed(2), hx: +JGP.slug.head.rotation.x.toFixed(2), pos: JGP.slug.body.position.toArray().map((v) => +v.toFixed(3)) }));
  log('the Ancient: target', sl.target, '| options', JSON.stringify(sl.actions), sl.target === 'slug' && sl.actions.length === 2 && sl.actions[0] === 'Talk' && /blossom/i.test(sl.actions[1]) ? 'ok' : 'FAIL');
  // its Blossom: one taken from the hand, and its answer
  const gift = await p.evaluate(() => { for (let i = 0; i < 20 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} const b0 = Kt.blossoms; xe.scan(); xe.run('give'); return { took: b0 - Kt.blossoms, open: qt.isOpen }; });
  // (its words once typed out)
  await p.waitForTimeout(1500), (gift.says = await p.evaluate(() => (qt.isOpen ? document.getElementById('dlgText').textContent : null)));
  await p.evaluate(() => { for (let i = 0; i < 20 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} });
  log('the Ancient Blossom: took', gift.took, '| says', JSON.stringify(gift.says), gift.took === 1 && gift.says === '...' ? 'ok' : 'FAIL');
  log('the Ancient idle pose', idle.join(' -> '), idle[0] !== idle[1] ? 'animates' : 'FAIL: still');
  log('the Ancient talking: mode', talk.mode, '| open', talk.open, talk.name, '| head yaw (stays at -0.45)', talk.hy, 'lift', talk.hx, '| body at', JSON.stringify(talk.pos), talk.mode === 'talk' && talk.open && talk.hx < -0.1 && Math.abs(talk.hy + 0.45) < 0.05 && talk.pos.every((v) => v === 0) ? 'ok' : 'FAIL');
  // no Blossom or Flint spawns in the secret room: sample the spawner and check every pickup now in town
  const pk = await p.evaluate(() => {
    const B = F.buildings.find((b) => b.name === 'church'), inside = (q) => q && F.inHull(B, q.x, q.z);
    let bad = 0, n = 0;
    for (const L0 of [le.list, ce.list]) for (let k = 0; k < 2000; k++) { const q = go(null, L0); q && (n++, inside(q) && bad++); }
    const now = [...le.list, ...ce.list].filter((o) => inside(o.position)).length;
    return { sampled: n, inRoom: bad, pickupsInRoomNow: now };
  });
  log('Blossom and Flint spawn spots in the church:', JSON.stringify(pk), !pk.inRoom && !pk.pickupsInRoomNow ? 'ok' : 'FAIL');
  log('err', await p.evaluate(() => Re.errors));
};
