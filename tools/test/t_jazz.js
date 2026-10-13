// KING DINO's jazz: heard on every corner of the dance floor and in every Dance battle, silent elsewhere, never with
// FORTIZMO's horn; it keeps going while he is talked to or given a Blossom; and the pickups' respawn and Blossom option.
//   VW=320 VH=240 NOSHOT=1 node shot.js <url> x.png ./t_jazz.js   (PART=floor,talked runs only those)

// KING DINO's jazz: heard on the dance floor and in every Dance battle, silent elsewhere, and never at the
// same time as FORTIZMO's horn tune. Measures the level of the jazz and of the horn tune at the speakers,
// and marks FAIL any spot where it should be sounding and is not (every corner of the floor is tried: in
// the desktop test mode the camera stands behind the avatar, and the jazz once followed the camera).
const floor = async (p, out) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(Math.min(640, (+process.env.VW || 1280) / 2), 60); await W(1500);
  await p.evaluate(() => {
    const j = JGP.jazz, u = j.update.bind(j);
    window.__fired = {}; j.update = function (...a) { const r = u(...a); r && r.forEach((e) => (__fired[e[1]] = (__fired[e[1]] || 0) + 1)); return r; };
    const c = G.ctx().c, an = c.createAnalyser(); an.fftSize = 2048; G.ctx().out.connect(an);
    const buf = new Float32Array(2048); window.__peak = 0;
    setInterval(() => { an.getFloatTimeDomainData(buf); for (const v of buf) __peak = Math.max(__peak, Math.abs(v)); }, 40);
  });
  const run = async (label, setup, secs, arg) => {
    await p.evaluate(setup, arg);
    await p.evaluate(() => { window.__fired = {}; window.__peak = 0; window.__t0 = Re.t; });
    for (let k = 0; k < 400 && (await p.evaluate((s) => Re.t - __t0 < s, secs)); k++) await W(150);
    const st = await p.evaluate(() => ({ ctx: G.ctx().c.state, ...JGP.jazz.state, gain: +JGP.jazz.state.gain.toFixed(3), hits: Object.values(__fired).reduce((a, b) => a + b, 0), kinds: Object.keys(__fired).join(','), peak: +__peak.toFixed(3), horn: ee.playing, top: jt.top }));
    // (on the floor, by the kit or in a battle the jazz must be sounding, unless the horn plays or rings on, or the sound is off)
    const want = /floor|kit|battle|victory|woken/.test(label) && !/off the floor|horn tune playing|last notes ringing|suspended/.test(label);
    log((want && (st.clock !== 'a' || st.gain < 1) ? 'FAIL ' : '') + label, JSON.stringify(st));
  };
  await run('on the floor:', () => At.position.set(-27, 0, 12), 4);
  // every corner of the floor (it runs x -33.1 to -21.1, z -9.6 to 28.8; the kit is at x -34.8, z 19.2)
  for (const [x, z] of [[-32.5, -9], [-21.7, -9], [-21.7, 28.2], [-32.5, 28.2], [-27, 4]]) await run(`floor at ${x},${z}:`, (q) => At.position.set(q[0], 0, q[1]), 3, [x, z]);
  await run('by the kit:', () => At.position.set(-31.5, 0, 19.2), 3);
  await run('talking to KING DINO:', () => { At.position.set(-31.5, 0, 19.2); te(It.byId.m_kingdino); }, 3);
  await p.evaluate(() => { for (let i = 0; i < 20 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} });
  await run('off the floor, near:', () => At.position.set(-18, 0, 25), 3);
  await run('far away:', () => At.position.set(20, 0, -20), 3);
  await run('in a Dance battle, far from the floor:', () => { At.position.set(20, 0, -20); Dbt.start(It.byId.p_glyph); }, 4);
  await p.evaluate(() => _t.close());
  await run('victory dance after it:', () => { It.byId.p_glyph.battleDance = !0; }, 2);
  await p.evaluate(() => { It.byId.p_glyph.battleDance = !1; });
  await run('on the floor, before the horn:', () => At.position.set(-27, 0, 12), 3);
  await run('on the floor, horn tune playing:', () => ee.start(), 4);
  await run('on the floor, horn stopped (last notes ringing):', () => ee.stop(), 0.5);
  for (let k = 0; k < 100 && (await p.evaluate(() => ee.pendingNotes() > 0)); k++) await W(200);
  await run('on the floor, horn gone:', () => {}, 3);
  // the headset taken off or left idle can suspend the sound: waking it brings the jazz straight back
  await run('sound suspended (headset off):', () => G.ctx().c.suspend(), 2);
  await run('sound woken (headset back on):', () => G.wake(), 3);
  log('err', await p.evaluate(() => Re.errors));
};

// King Dino's jazz keeps going on the floor while King Dino is talked to, given a Blossom and during a Dance battle,
// and is not heard off the floor (jazz hits heard in 4 s of game time each); flint and Blossom pickups respawn
// elsewhere; the Blossom menu option needs a Blossom.
const talked = async (p, out) => {
  const W = (ms) => p.waitForTimeout(ms);
  await p.mouse.click(Math.min(640, (+process.env.VW || 1280) / 2), 60); await W(1500);
  const hits = async (setup, label) => {
    await p.evaluate(setup);
    // (counts the jazz's hits while it is heard: the kit's hits come from KING DINO's jazz track)
    await p.evaluate(() => { window.__h = 0; if (!window.__gw) { window.__gw = 1; const j = JGP.jazz, u = j.update.bind(j); j.update = function (...a) { const r = u(...a); r && 'a' === j.state.clock && j.state.gain > 0.05 && (__h += r.length); return r; }; } window.__t0 = Re.t; });
    for (let k = 0; k < 200 && (await p.evaluate(() => Re.t - __t0 < 4)); k++) await W(150);
    console.log(label, 'jazz hits heard in 4 s:', await p.evaluate(() => __h), 'top', await p.evaluate(() => jt.top));
  };
  await hits(() => { At.position.set(-27, 0, 12); }, 'on the floor:');
  await hits(() => { At.position.set(-33, 0, 19); te(It.byId.m_kingdino); }, 'talking to KING DINO:');
  await p.evaluate(() => { for (let i = 0; i < 20 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} });
  await hits(() => { At.position.set(-27, 0, 12); Kt.blossoms = 3; te(It.byId.m_kingdino, !0); }, 'giving KING DINO a Blossom:');
  await p.evaluate(() => { for (let i = 0; i < 20 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} });
  await hits(() => { At.position.set(-27, 0, 12); Dbt.start(It.byId.p_glyph); }, 'in a Dance battle:');
  await p.evaluate(() => _t.close());
  await hits(() => { At.position.set(0, 0, -20); }, 'off the floor:');
  // pickups
  console.log(await p.evaluate(() => {
    const out = [];
    for (const [nm, M] of [['flint', ce], ['blossom', le]]) {
      const o = M.list.find((q) => !q.userData.taken), x0 = o.position.x, z0 = o.position.z, n0 = nm === 'flint' ? Kt.acorns : Kt.blossoms;
      M.take(o, Re.t); M.update(Re.t + 13);
      out.push(nm + ': got ' + ((nm === 'flint' ? Kt.acorns : Kt.blossoms) - n0) + ', back ' + !o.userData.taken + ' moved ' + Math.hypot(o.position.x - x0, o.position.z - z0).toFixed(1) + ' m');
    }
    return out.join('; ');
  }));
  // the Blossom option
  console.log(await p.evaluate(() => { const e = It.byId.p_gemtoe; Kt.blossoms = 0; const a = xe.actionsFor(e).map((q) => q.label).join('/'); Kt.blossoms = 1; const b = xe.actionsFor(e).map((q) => q.label).join('/'); return 'menu with 0: ' + a + ' | with 1: ' + b; }));
  console.log('err', await p.evaluate(() => Re.errors));
};

module.exports = require('./parts.js')({ floor, talked });
