// SPARKAKUS: his script (the Artifacts talk, the glue bottle, his Blossom lap, the Library's shelf renders), his menu,
// a Blossom and a Talk wherever he is (home, visiting, walking home, with a visitor), and his Artifacts speech away
// from the Library.
// Env: PART=script,menu,anywhere,away (only those parts).
// Output: `== part: <name>` and each part's lines (below), each part ending in `err <n>`; the renders named there.
//   VW=320 VH=240 NOSHOT=1 node test/shot.js <url> x.png test/t_sparkakus.js
const { log, start, waitGame, said, render, outName, startEvent, logErrors } = require('./lib.js');

// The owner's script, the parts that move: SPARKAKUS's Artifacts talk (none, some, all three: the glue bottle puts
// the pieces back together into the Ancient Gem, then his speech and the Gem collected), his Blossom (a lap of the
// Library floor on all fours, clear of every bookcase, then back to his place and his apology), and renders of the
// Library's face-out books, Wish Blossom, Electric Blossom and Acorn and the Sheriff's GLOOPERNAUGHT poster
// (<out>_<thing><k>.png, <out>_glue.png, <out>_romp.png).
const script = async (p, out) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  const next = () => p.evaluate(() => { try { qt.advance(); } catch (e) {} });
  const shot = (name, cam, look) => render(p, outName(out, name), cam, look, { fov: 50 });
  // ---- the shelf things and the poster: found by their meshes, each shot from 0.9 m in front
  const things = await p.evaluate(() => {
    const L0 = JGP.libLayout, r = [], v = new THREE.Vector3();
    (L0.shown || []).forEach((q) => { q.obj.updateMatrixWorld(!0), v.set(...q.at), q.obj.localToWorld(v); const f = q.face + q.obj.rotation.y; r.push({ kind: /^(wish|electric|acorn)$/.test(q.what) ? q.what : 'book', name: q.what, at: [v.x, v.y, v.z], n: [Math.sin(f), 0, Math.cos(f)] }); });
    (L0.posters || []).forEach((q) => { q.obj.updateMatrixWorld(!0), v.set(...q.at), q.obj.localToWorld(v); const f = q.obj.rotation.y; r.push({ kind: 'poster', name: q.kind, at: [v.x, v.y, v.z], n: [Math.sin(f), 0, Math.cos(f)] }); });
    return r;
  });
  log('found', ['book', 'wish', 'electric', 'acorn', 'poster'].map((k) => k + ' ' + things.filter((t) => t.kind === k).length).join(', '));
  let k = 0;
  for (const t of things) {
    const d = t.kind === 'poster' ? 2.2 : t.kind === 'book' ? 0.9 : 1.1, y = t.at[1];
    await shot((t.name || t.kind) + (k++), [t.at[0] + d * t.n[0], y + 0.1, t.at[2] + d * t.n[2]], [t.at[0], y, t.at[2]]);
  }
  // ---- SPARKAKUS: the Artifacts talk
  const stump = () => p.evaluate(() => { const s = z.list.find((q) => q.id === 'stump'); At.position.set(s.x, 0, s.z + 3.2); xe.scan(); return xe.current === s ? xe.actions.map((a) => a.label).join(' / ') : 'not the target'; });
  await p.evaluate(() => { Kt.artifacts = 0; Kt.blossoms = 0; });
  log('options, no Blossom:', await stump());
  await p.evaluate(() => { LIB.talk(); }); await W(400); log('0 Artifacts:', JSON.stringify(await said(p))); await next();
  await p.evaluate(() => { Kt.artifacts = 2; LIB.talk(); }); await W(400); log('2 Artifacts:', JSON.stringify(await said(p))); await next();
  await p.evaluate(() => { Kt.artifacts = 3; LIB.talk(); }); await W(400);
  const fin = [];
  for (let i = 0; i < 6 && (await p.evaluate(() => qt.isOpen)); i++) fin.push(await said(p)), await next(), await W(300);
  log('3 Artifacts:', JSON.stringify(fin));
  // the glue bottle: its pieces' spread from their places in the diamond, through the animation
  const asm = () => p.evaluate(() => {
    const g = C.children.find((c) => c.children.some((q) => q.userData && q.userData.gemPiece !== undefined));
    if (!g) return null;
    const ps = g.children.filter((q) => q.userData.gemPiece !== undefined), off = ps.map((q) => q.position.distanceTo(q.userData.gemOffset));
    return { at: [g.position.x, g.position.y, g.position.z].map((v) => +v.toFixed(2)), spread: +Math.max(...off).toFixed(3), dialogue: qt.isOpen, bulb: +Bulb.level.toFixed(2) };
  });
  const seen = [];
  let a0 = null;
  for (let i = 0; i < 40; i++) {
    const r = await asm(); r && (a0 = a0 || r.at); seen.push(r ? r.spread + (r.dialogue ? '*' : '') : '-');
    if (i === 6 && a0) { const st0 = await p.evaluate(() => [st.pos().x, At.position.x]); await shot('glue', [a0[0] + 2.6 * Math.sign(st0[1] - st0[0] || 1), a0[1] + 0.4, a0[2] + 2.6], a0); }
    if (r && r.dialogue) break;
    await waitGame(p, 0.25);
  }
  log('assembly: pieces\' spread over time (* = the speech has opened):', seen.join(' '), '| bulb on', (await asm() || {}).bulb);
  const speech = [];
  for (let i = 0; i < 12 && (await p.evaluate(() => qt.isOpen)); i++) speech.push(await said(p)), await next(), await W(300);
  log('speech:', JSON.stringify(speech));
  await waitGame(p, 2);
  log('after:', await p.evaluate(() => JSON.stringify({ gem: Kt.gem, artifacts: Kt.rewards.artifacts, gemLeftInScene: !!C.children.find((c) => c.children.some((q) => q.userData && q.userData.gemPiece !== undefined)) })));
  await waitGame(p, 15);
  await p.evaluate(() => { LIB.talk(); }); await W(400); log('talk after the Gem:', JSON.stringify(await said(p))); await next();
  // ---- SPARKAKUS given a Blossom
  await waitGame(p, 8);
  await p.evaluate(() => (Kt.blossoms = 1));
  log('options, one Blossom:', await stump());
  await p.evaluate(() => {
    const lib = F.buildings.find((b) => b.name === 'shop'), q = new THREE.Vector3();
    window.__R = { worst: 9, lean: 0, n: 0, path: 0, last: null };
    L.push(() => {
      if (!st.romping()) return;
      st.group.getWorldPosition(q); const [x, z2] = F.local(lib, q.x, q.z), R = __R;
      for (const [a, b, c, d] of JGP.libParts) { const dx = Math.max(a - x, 0, x - c), dz = Math.max(b - z2, 0, z2 - d); R.worst = Math.min(R.worst, Math.hypot(dx, dz)); }
      R.lean = Math.max(R.lean, st.group.rotation.x), R.n++, R.last && (R.path += Math.hypot(x - R.last[0], z2 - R.last[1])), (R.last = [x, z2]);
    });
    xe.run('give');
  });
  const b0 = await p.evaluate(() => Kt.blossoms);
  await waitGame(p, 2.5);
  const mid = await p.evaluate(() => [st.pos().x, st.pos().y, st.pos().z]);
  await shot('romp', [mid[0] + 4, 2.4, mid[2] + 4], [mid[0], 1.2, mid[2]]);
  for (let i = 0; i < 100 && (await p.evaluate(() => st.romping())); i++) await waitGame(p, 0.25);
  await W(400);
  log('Blossom: hand', b0, '| lap', await p.evaluate(() => JSON.stringify({ steps: __R.n, ran: +__R.path.toFixed(1), nearestToFurniture: +__R.worst.toFixed(2), lean: +__R.lean.toFixed(2) })), '| then says', JSON.stringify(await said(p)), '| upright', await p.evaluate(() => st.group.rotation.x === 0 && st.group.parent !== C));
  await next();
  await logErrors(p);
};

// SPARKAKUS's menu, as everyone's: Talk and "Give a blossom" offered from the first moment a Blossom is held (no
// Talk and no quest needed first); the Blossom given before any Talk (his lap and his sorry line); Talk then opens
// his quest dialogue; and at the Garden Event no one, SPARKAKUS included, offers a Blossom option.
const menu = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  const next = () => p.evaluate(() => { try { qt.advance(); } catch (e) {} });
  const stump = () => p.evaluate(() => { const s = z.list.find((q) => q.id === 'stump'); At.position.set(s.x, 0, s.z + 3.2); xe.scan(); return xe.current === s ? xe.actions.map((a) => a.verb + ':' + a.label).join(' / ') : 'not the target'; });
  // a fresh save: no Talk yet, nothing of the quest done, one Blossom in hand
  await p.evaluate(() => { Kt.artifacts = 0; Kt.gem = !1; Kt.rewards.artifacts = !1; Kt.blossoms = 0; xe.lastTarget = null; });
  log('fresh, no Blossom:', await stump());
  await p.evaluate(() => (Kt.blossoms = 1));
  log('fresh, one Blossom:', await stump());
  await p.evaluate(() => xe.run('give'));
  const b1 = await p.evaluate(() => Kt.blossoms);
  for (let i = 0; i < 100 && (await p.evaluate(() => st.romping())); i++) await waitGame(p, 0.25);
  await W(400);
  log('given before any Talk: Blossoms left', b1, '| he says', JSON.stringify(await said(p)));
  await next(); await W(300);
  log('then Talk:', await stump());
  await p.evaluate(() => xe.run('interact')); await W(400);
  log('  opens', JSON.stringify(await said(p)));
  await next(); await W(300);
  // the Event: Blossom in hand, every creature's menu and SPARKAKUS's, wherever he is
  await p.evaluate(() => { window.__gbNoThrottle = 1; });
  await startEvent(p);
  await waitGame(p, 6);
  const ev = await p.evaluate(() => {
    Kt.blossoms = 3;
    const r = [];
    for (const c of It.all) { if (!c.group.visible) continue; const a = xe.actionsFor(c); r.push((c.def && c.def.name) + ' [' + a.map((q) => q.verb).join(',') + ']'); }
    const s = z.list.find((q) => q.id === 'stump');
    r.push('stump [' + xe.actionsFor(s).map((q) => q.verb + ':' + q.label).join(',') + ']');
    r.push('xo [' + xe.actionsFor(xo).map((q) => q.verb + ':' + q.label).join(',') + ']');
    return { active: me.active, list: r, gives: r.filter((q) => /give/.test(q)).length };
  });
  log('Event active', ev.active, '| menus with a give option:', ev.gives);
  log('  ' + ev.list.join('\n  '));
  await logErrors(p);
};

// SPARKAKUS wherever he is: at his place in the Library, out on a visit (at his host), walking home from one, and with a
// visitor of his own. In each: his menu (Talk and "Give a blossom"); a Blossom (at home his lap and his sorry line; anywhere
// else his `giftAway` line and no lap); a Talk (his line, his talking, and that he holds still while it is open); and his
// Artifacts speech with its effects (the light bulb by him, the Gem glued together by him, the Gem given). Then that he
// gets back to his place.
const anywhere = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  const closeAll = async () => { for (let i = 0; i < 20 && (await p.evaluate(() => qt.isOpen)); i++) await p.evaluate(() => { try { qt.advance(); } catch (e) {} }), await W(200); };
  // stand by him (away from whoever is with him) and read his menu, as the game's scan does
  const menu = () => p.evaluate(() => {
    const q = st.pos(), o = It.byId.p_gemtoe.group.position, dx = q.x - o.x, dz = q.z - o.z, d = Math.hypot(dx, dz) || 1;
    At.position.set(q.x + (1.8 * dx) / d, 0, q.z + (1.8 * dz) / d); xe.scan();
    return xe.actions.map((a) => a.verb + ':' + a.label).join(' / ');
  });
  const run = (verb) => p.evaluate((v) => { const a = xe.actions.find((q) => q.verb === v); return a ? (a.run(), !0) : !1; }, verb);
  const state = () => p.evaluate(() => { const q = JGP.visits().all.find((q) => q.v === 'keeper' || q.h === 'keeper'); return (q ? (q.v === 'keeper' ? 'visitor ' : 'host ') + q.stage : 'no visit') + (st.away() ? ', away' : ', at the Library'); });
  const check = async (label, finale) => {
    log('== ' + label + ' (' + (await state()) + ')');
    // a Blossom (two in hand, so the menu offers one)
    const b0 = await p.evaluate(() => ((Kt.blossoms = 2), Kt.blossoms));
    log('  menu:', await menu());
    await run('give'); await W(600);
    const g = await p.evaluate(() => ({ romping: st.romping() }));
    for (let i = 0; i < 120 && (await p.evaluate(() => st.romping())); i++) await waitGame(p, 0.25);
    await W(300);
    log('  Blossom: taken', b0 - (await p.evaluate(() => Kt.blossoms)), '| lap', g.romping, '| says', JSON.stringify(await said(p)));
    await closeAll();
    // a Talk: his line, and he holds still while it is open
    await menu(); await run('interact'); await W(400);
    const a0 = await p.evaluate(() => { const q = st.pos(); return [q.x, q.z, st.talking]; });
    await waitGame(p, 2.5);
    const a1 = await p.evaluate(() => { const q = st.pos(); return [q.x, q.z, st.talking]; });
    log('  Talk:', JSON.stringify(await said(p)), '| talking', a0[2] && a1[2], '| moved while open', +Math.hypot(a1[0] - a0[0], a1[1] - a0[1]).toFixed(2), 'm');
    await closeAll();
    if (!finale) return;
    // his Artifacts speech here: the bulb and the Gem by him
    await p.evaluate(() => { Kt.artifacts = 3; Kt.gem = !1; Kt.rewards.artifacts = !1; });
    await menu(); await run('interact'); await W(600);
    const seen = [];
    for (let i = 0; i < 60; i++) {
      const r = await p.evaluate(() => {
        const g = C.children.find((c) => c.children.some((q) => q.userData && q.userData.gemPiece !== undefined)), q = st.pos();
        return { bulb: +Bulb.level.toFixed(2), gem: g ? +Math.hypot(g.position.x - q.x, g.position.z - q.z).toFixed(2) : null, open: qt.isOpen, gotGem: Kt.gem };
      });
      seen.push(r);
      if (r.gotGem && !r.open) break;
      r.open && (await p.evaluate(() => { try { qt.advance(); } catch (e) {} }));
      await waitGame(p, 0.6);
    }
    const gd = seen.filter((r) => r.gem !== null).map((r) => r.gem);
    await waitGame(p, 3);
    log('  Artifacts speech: bulb up to', Math.max(...seen.map((r) => r.bulb)), '| Gem glued', gd.length ? gd[0] + ' m from him' : 'never', '| Gem given', await p.evaluate(() => Kt.gem), '| bulb off after', await p.evaluate(() => Bulb.level < 0.05));
  };
  await p.evaluate(() => { window.__gbNoThrottle = 1; JGP.visitAt(9e15); Kt.artifacts = 0; Kt.rewards.artifacts = !1; });
  await check('at home', !1);
  // out on a visit, at his host
  await p.evaluate(() => JGP.visitAt(9e15, 'keeper', 'p_gemtoe'));
  await waitGame(p, 120, () => { const q = JGP.visits().all.find((q) => q.v === 'keeper'); return !!q && q.stage === 'meet'; });
  await check('visiting', !1);
  // walking home from it
  await waitGame(p, 120, () => { const q = JGP.visits().all.find((q) => q.v === 'keeper'); return !!q && q.stage === 'back' && st.away(); });
  await check('walking home', !0);
  await waitGame(p, 240, () => !st.away() && !JGP.visits().all.some((q) => q.v === 'keeper'));
  log('home again:', await p.evaluate(() => !st.away()));
  // a visitor of his own
  await p.evaluate(() => JGP.visitAt(9e15, 'p_gemtoe', 'keeper'));
  await waitGame(p, 120, () => { const q = JGP.visits().all.find((q) => q.h === 'keeper'); return !!q && q.stage === 'meet'; });
  await check('with a visitor', !0);
  await waitGame(p, 240, () => !JGP.visits().all.some((q) => q.v === 'keeper' || q.h === 'keeper'));
  await waitGame(p, 5);
  log('after:', await state(), '| at his place', await p.evaluate(() => st.atHome()), '| err', await p.evaluate(() => Re.errors));
};

// SPARKAKUS's Artifacts speech (the long Talk with the light bulb and the dimming, the glue bottle putting the Gem
// together) away from the Library: he is sent out on a visit (to GEMTOE), the player talks to him where he stands
// through the station menu, and the bulb, the Gem's assembly and the speech must all happen there, by him, not back
// at the Library. Prints where he is, his menu, the first page, the bulb's level and the Gem's distance from him,
// the speech's pages, then whether the bulb is off again and `err <n>`.
const away = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  const shown = () => p.evaluate(() => (qt.isOpen ? document.getElementById('dlgText').textContent : null));
  const next = () => p.evaluate(() => { try { qt.advance(); } catch (e) {} });
  await p.evaluate(() => { window.__gbNoThrottle = 1; Kt.artifacts = 3; Kt.blossoms = 0; JGP.visitAt(Re.t, 'keeper', 'p_gemtoe'); });
  const away = await waitGame(p, 60, () => st.away() && !st.ent.goHome && st.ent.visiting && Math.hypot(st.pos().x - It.byId.p_gemtoe.group.position.x, st.pos().z - It.byId.p_gemtoe.group.position.z) < 4);
  const where = await p.evaluate(() => { const q = st.pos(), lib = F.buildings.find((b) => b.name === 'shop'); return { away: st.away(), at: [+q.x.toFixed(1), +q.z.toFixed(1)], fromLibrary: +Math.hypot(q.x - lib.x, q.z - lib.z).toFixed(1) }; });
  log('out on a visit:', away, JSON.stringify(where));
  // talk to him where he stands, the game's way: stand by him, scan, take the Talk option
  const opts = await p.evaluate(() => { const q = st.pos(), g = It.byId.p_gemtoe.group.position, dx = q.x - g.x, dz = q.z - g.z, d = Math.hypot(dx, dz) || 1; At.position.set(q.x + (1.6 * dx) / d, 0, q.z + (1.6 * dz) / d); xe.scan(); const a = xe.actions.map((a) => a.label); const t = xe.actions.find((a) => a.verb === 'interact' && /SPARKAKUS/.test(a.label)); t && t.run(); return a.join(' / '); });
  log('menu by him:', opts);
  await W(800);
  const first = await shown();
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
    await waitGame(p, 0.6);
  }
  const bulbMax = Math.max(...seen.map((r) => r.bulb)), gemD = seen.filter((r) => r.gem !== null).map((r) => r.gem);
  log('first page:', JSON.stringify(first), '| bulb on up to', bulbMax, '| Gem assembled', gemD.length ? gemD[0] + ' m from him' : 'never', '| speech reached:', JSON.stringify(seen[seen.length - 1].txt));
  const speech = [];
  for (let i = 0; i < 12 && (await p.evaluate(() => qt.isOpen)); i++) speech.push(await shown()), await next(), await W(300);
  log('speech pages', speech.length, '| after:', await p.evaluate(() => JSON.stringify({ gem: Kt.gem, artifacts: Kt.rewards.artifacts, stillAway: st.away(), bulb: +Bulb.level.toFixed(2) })));
  await waitGame(p, 3);
  log('bulb off again:', await p.evaluate(() => Bulb.level < 0.05), '| err', await p.evaluate(() => Re.errors));
};

module.exports = require('./parts.js')({ script, menu, anywhere, away });
