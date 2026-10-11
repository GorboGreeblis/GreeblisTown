// KING DINO's jazz: heard on the dance floor and in every Dance battle, silent elsewhere, and never at the
// same time as FORTIZMO's horn tune. Measures the level of the jazz and of the horn tune at the speakers.
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(Math.min(640, (+process.env.VW || 1280) / 2), 60); await W(1500);
  await p.evaluate(() => {
    const j = JGP.jazz, u = j.update.bind(j);
    window.__fired = {}; j.update = function (...a) { const r = u(...a); r && r.forEach((e) => (__fired[e[1]] = (__fired[e[1]] || 0) + 1)); return r; };
    const c = G.ctx().c, an = c.createAnalyser(); an.fftSize = 2048; G.ctx().out.connect(an);
    const buf = new Float32Array(2048); window.__peak = 0;
    setInterval(() => { an.getFloatTimeDomainData(buf); for (const v of buf) __peak = Math.max(__peak, Math.abs(v)); }, 40);
  });
  const run = async (label, setup, secs) => {
    await p.evaluate(setup);
    await p.evaluate(() => { window.__fired = {}; window.__peak = 0; window.__t0 = Re.t; });
    for (let k = 0; k < 400 && (await p.evaluate((s) => Re.t - __t0 < s, secs)); k++) await W(150);
    log(label, await p.evaluate(() => JSON.stringify({ ctx: G.ctx().c.state, ...JGP.jazz.state, gain: +JGP.jazz.state.gain.toFixed(3), hits: Object.values(__fired).reduce((a, b) => a + b, 0), kinds: Object.keys(__fired).join(','), peak: +__peak.toFixed(3), horn: ee.playing, top: jt.top })));
  };
  await run('on the floor:', () => At.position.set(-27, 0, 12), 4);
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
