// Planting and dancing at the Garden Event: every menu holds only Talk (and Give a blossom), each creature's moves
// move it, SPARKAKUS's moves measured beside the others', and frames of his funky dance against the ground.
//   VW=320 VH=240 node shot.js <url> x.png ./t_dance.js   (PART=moves,sparkakus,funk runs only those)

// Planting and dancing are creature animations, not menu options. Checks:
// 1. every creature's menu holds only Talk (and "Give a blossom" while the player has one), and ZOLLOD's opens the shop;
// 2. each creature's own planting move and dance (JGP.plantMove / JGP.danceMove, keyed by Xt(ent)) moves it;
// 3. at the Garden Event (with Seeds) creatures plant, then dance while FORTIZMO plays.
// Run with run.js. Headless game time is slow: the Event part waits on Re.t and can take several minutes.
const moves = async (p, out) => {
  const W = (ms) => p.waitForTimeout(ms);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  console.log(await p.evaluate(() => {
    Kt.blossoms = 1;
    const bad = [], moves = [];
    for (const e of It.all) {
      const key = Xt(e), labels = xe.actionsFor(e).map((a) => a.label);
      const ok = key === 'cutebex' ? labels.length === 1 && /Shop/.test(labels[0]) : labels.every((l) => /^Talk to |^Give a blossom$/.test(l));
      ok || bad.push(e.def.name + ': ' + labels.join(' / '));
      let pm = 0, dm = 0;
      for (let t = 0; t < 6; t += 0.05) {
        const a = JGP.plantMove(key, t), b = JGP.danceMove(key, t);
        pm = Math.max(pm, ...['x', 'y', 'z', 'rx', 'ry', 'rz'].map((k) => Math.abs(a[k] || 0)), Math.abs((a.sy || 1) - 1));
        dm = Math.max(dm, ...['x', 'y', 'z', 'rx', 'ry', 'rz'].map((k) => Math.abs(b[k] || 0)), Math.abs((b.sy || 1) - 1));
      }
      moves.push(e.def.name + ' plant ' + pm.toFixed(2) + ' dance ' + dm.toFixed(2));
    }
    Kt.blossoms = 0;
    return 'menus ' + (bad.length ? 'BAD: ' + bad.join(' | ') : 'ok') + '\n' + moves.join('\n');
  }));
  // the Garden Event: count creatures well into each move
  await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 2.8); (Kt.rewards.stone = !0), z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  const seen = { plant: 0, dance: 0 };
  for (let k = 0; k < 300 && !(seen.plant && seen.dance); k++) {
    await W(1000);
    const c = await p.evaluate(() => { const c = { plant: 0, dance: 0 }; for (const [, s] of bt.tg) if (s.k > 0.3 && s.mode) c[s.mode]++; return c; });
    seen.plant = Math.max(seen.plant, c.plant), seen.dance = Math.max(seen.dance, c.dance);
    if (k === 30 && !seen.dance) await p.evaluate(() => JGP.backpacka.start(Re.t - 1));
  }
  console.log('event: most planting at once ' + seen.plant + ', most dancing at once ' + seen.dance + ', errors ' + (await p.evaluate(() => Re.errors)));
};

// SPARKAKUS's planting and dance at the Garden Event, measured like any guest's: how far his move wrapper (and, for
// comparison, GLYPH's and MUSHROOM's) swings while everyone plants, and while everyone dances to FORTIZMO's horn —
// the largest offset and turn seen in each phase. Zero means no animation.
const sparkakus = async (p, out) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  await p.evaluate(() => {
    window.__gbNoThrottle = 1; JGP.visitAt(9e15);
    window.__MV = {};
    const who = () => [['SPARKAKUS', st.group], ['GLYPH', It.byId.p_glyph && It.byId.p_glyph.group], ['MUSHROOM', (It.all.find((q) => q.def.__type === 'drifter') || {}).group]];
    L.push(() => {
      if (!me.active || !bt.live) return;
      const ph = JGP.eventMove || 'none';
      for (const [name, g] of who()) {
        const c = g && g.userData.gcW;
        if (!c) continue;
        const k = name + ' ' + ph, m = (__MV[k] = __MV[k] || { off: 0, rot: 0 });
        m.off = Math.max(m.off, c.position.length());
        m.rot = Math.max(m.rot, Math.abs(c.rotation.x) + Math.abs(c.rotation.y) + Math.abs(c.rotation.z));
      }
    });
    Kt.rewards.seeds = Kt.rewards.stone = !0;
    At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes();
  });
  const t0 = await p.evaluate(() => Re.t);
  for (let k = 0; k < 3000; k++) {
    await W(500);
    const r = await p.evaluate(() => [Re.t, me.active, JGP.eventMove]);
    if (r[0] - t0 > 95 || !r[1]) break;
  }
  log('largest move offset (m) / turn (rad), by creature and phase:');
  log(await p.evaluate(() => Object.entries(__MV).map(([k, m]) => '  ' + k + ': ' + m.off.toFixed(3) + ' / ' + m.rot.toFixed(3)).join('\n')));
  log('SPARKAKUS inside the garden:', await p.evaluate(() => { const q = st.pos(); return Math.hypot(q.x, q.z) < JGP.GARDEN_R; }), '| err', await p.evaluate(() => Re.errors));
};

// SPARKAKUS's funky dance at the Garden Event: the Event started with Seeds in, then once FORTIZMO plays and his dance
// weight is up, eight frames over one eight-beat loop from his front-left (<out>_f*.png) and two from his side
// (<out>_s*.png); the lowest point of his model against the ground each frame (a foot or tail through the soil would
// show as a negative), and his paws' nearest approach to his head (clipping would be under ~0.3).
const funk = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const shot = (name, cam, look) => p.evaluate(([cam, look]) => {
    const c = new THREE.PerspectiveCamera(45, 4 / 3, 0.05, 300);
    c.position.set(...cam); c.lookAt(...look); c.updateMatrixWorld(); c.updateProjectionMatrix();
    O.setSize(800, 600, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }, [cam, look]).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  await p.evaluate(() => { window.__gbNoThrottle = 1; JGP.visitAt(9e15); Kt.rewards.seeds = Kt.rewards.stone = !0; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  const t0 = await p.evaluate(() => Re.t);
  let ok = !1;
  for (let k = 0; k < 2000; k++) {
    await W(400);
    const r = await p.evaluate(() => [Re.t, me.active, JGP.eventMove, st.dancing]);
    if (r[0] - t0 > 120 || !r[1]) break;
    if (r[2] === 'dance' && r[3] > 0.95) { ok = !0; break; }
  }
  log('dancing:', ok);
  if (!ok) return log('err', await p.evaluate(() => Re.errors));
  const info = () => p.evaluate(() => {
    const g = st.group, v = new THREE.Vector3(), h = new THREE.Vector3(), hd = [];
    g.updateMatrixWorld(!0);
    let lo = 1e9;
    g.traverse((o) => { if (!o.isMesh || !o.geometry.attributes.position) return; const P = o.geometry.attributes.position; for (let k = 0; k < P.count; k += 3) lo = Math.min(lo, v.fromBufferAttribute(P, k).applyMatrix4(o.matrixWorld).y); });
    const q = st.pos(), ground = JGP.groundAt ? JGP.groundAt(q.x, q.z) : 0;
    // the paws (the mitt spheres, found by their orange material under an arm's hand group) against the head's centre
    const heads = []; g.traverse((o) => { if (o.isMesh && o.material && o.material.color && o.material.color.getHexString() === 'f2c21a') { o.getWorldPosition(h); heads.push(h.clone()); } });
    const eye = heads.length ? heads.reduce((a, b) => a.add(b), new THREE.Vector3()).multiplyScalar(1 / heads.length) : null;
    return { lo: +(lo - ground).toFixed(3), eyes: heads.length, ry: +(g.rotation.y).toFixed(2), at: [q.x, q.y, q.z], face: g.rotation.y };
  });
  const a0 = await info();
  log('eyes found', a0.eyes, '| he is at', a0.at.map((v) => +v.toFixed(2)).join(','), '| facing', a0.face.toFixed(2));
  const los = [];
  for (let k = 0; k < 8; k++) {
    // (from in front and above, over the heads of the others round the garden)
    const q = await info(), f = q.face, cx = q.at[0] + 3.6 * Math.sin(f + 0.5), cz = q.at[2] + 3.6 * Math.cos(f + 0.5);
    await shot('f' + k, [cx, 4.0, cz], [q.at[0], 1.4, q.at[2]]);
    if (k % 4 === 1) await shot('s' + k, [q.at[0] + 4.6 * Math.sin(f + Math.PI / 2), 2.0, q.at[2] + 4.6 * Math.cos(f + Math.PI / 2)], [q.at[0], 1.5, q.at[2]]);
    los.push(q.lo);
    await W(190);
  }
  log('lowest point above the ground per frame (m):', los.join(' '));
  log('err', await p.evaluate(() => Re.errors));
};

module.exports = require('./parts.js')({ moves, sparkakus, funk });
