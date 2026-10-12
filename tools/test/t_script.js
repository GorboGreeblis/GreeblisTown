// The owner's script, the parts that move: SPARKAKUS's Artifacts talk (none, some, all three: the glue bottle puts
// the pieces back together into the Ancient Gem, then his speech and the Gem collected), his Blossom (a lap of the
// Library floor on all fours, clear of every bookcase, then back to his place and his apology), and renders of the
// Library's face-out books, Wish Blossom, Electric Blossom and Acorn and the Sheriff's GLOOPERNAUGHT poster (<out>_*.png).
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_script.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(100, 60); await W(1500);
  const waitGame = async (sec) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 4000 && (await p.evaluate(() => Re.t)) - t0 < sec; k++) await W(200); };
  // (a page's words once they have all been typed out: the text stops changing)
  const said = async () => { let a = null; for (let k = 0; k < 60; k++) { const b = await p.evaluate(() => (qt.isOpen ? document.getElementById('dlgText').textContent : null)); if (b === null || b === a) return b; a = b; await W(250); } return a; };
  const next = () => p.evaluate(() => { try { qt.advance(); } catch (e) {} });
  const shot = (name, cam, look) => p.evaluate(([cam, look]) => {
    const c = new THREE.PerspectiveCamera(50, 4 / 3, 0.05, 300); c.position.set(...cam); c.lookAt(...look);
    O.setSize(800, 600, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }, [cam, look]).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
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
  await p.evaluate(() => { Kt.talkState.keeper = 0; LIB.talk(); }); await W(400); log('0 Artifacts:', JSON.stringify(await said())); await next();
  await p.evaluate(() => { Kt.artifacts = 2; Kt.talkState.keeper = 0; LIB.talk(); }); await W(400); log('2 Artifacts:', JSON.stringify(await said())); await next();
  await p.evaluate(() => { Kt.artifacts = 3; LIB.talk(); }); await W(400);
  const fin = [];
  for (let i = 0; i < 6 && (await p.evaluate(() => qt.isOpen)); i++) fin.push(await said()), await next(), await W(300);
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
    await waitGame(0.25);
  }
  log('assembly: pieces\' spread over time (* = the speech has opened):', seen.join(' '), '| bulb on', (await asm() || {}).bulb);
  const speech = [];
  for (let i = 0; i < 12 && (await p.evaluate(() => qt.isOpen)); i++) speech.push(await said()), await next(), await W(300);
  log('speech:', JSON.stringify(speech));
  await waitGame(2);
  log('after:', await p.evaluate(() => JSON.stringify({ gem: Kt.gem, artifacts: Kt.rewards.artifacts, gemLeftInScene: !!C.children.find((c) => c.children.some((q) => q.userData && q.userData.gemPiece !== undefined)) })));
  await waitGame(15);
  await p.evaluate(() => { Kt.talkState.keeper = 0; LIB.talk(); }); await W(400); log('talk after the Gem:', JSON.stringify(await said())); await next();
  // ---- SPARKAKUS given a Blossom
  await waitGame(8);
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
  await waitGame(2.5);
  const mid = await p.evaluate(() => [st.pos().x, st.pos().y, st.pos().z]);
  await shot('romp', [mid[0] + 4, 2.4, mid[2] + 4], [mid[0], 1.2, mid[2]]);
  for (let i = 0; i < 100 && (await p.evaluate(() => st.romping())); i++) await waitGame(0.25);
  await W(400);
  log('Blossom: hand', b0, '| lap', await p.evaluate(() => JSON.stringify({ steps: __R.n, ran: +__R.path.toFixed(1), nearestToFurniture: +__R.worst.toFixed(2), lean: +__R.lean.toFixed(2) })), '| then says', JSON.stringify(await said()), '| upright', await p.evaluate(() => st.group.rotation.x === 0 && st.group.parent !== C));
  await next();
  log('err', await p.evaluate(() => Re.errors));
};
