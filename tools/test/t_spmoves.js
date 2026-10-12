// SPARKAKUS's planting and dance at the Garden Event, measured like any guest's: how far his move wrapper (and, for
// comparison, GLYPH's and MUSHROOM's) swings while everyone plants, and while everyone dances to FORTIZMO's horn —
// the largest offset and turn seen in each phase. Zero means no animation.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_spmoves.js
module.exports = async (p) => {
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
