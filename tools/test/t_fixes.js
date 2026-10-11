// Checks for the bug-pass fixes (Oct 2026). Run with a small viewport (VW=320 VH=240).
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  const clear = () => p.evaluate(() => { for (let i = 0; i < 40 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} });
  await p.mouse.click(100, 60); await W(1500);
  // 1. a Dancer's thanks closed far away does not start a battle; close by it does
  log('gift then walk away:', await p.evaluate(() => { Kt.blossoms = 3; const g = It.byId.p_glyph; At.position.set(g.group.position.x - 2, 0, g.group.position.z); te(g, !0); At.position.set(0, 0, -30); for (let i = 0; i < 40 && qt.isOpen; i++) { qt.skipAll(); qt.advance(); } const r = (_t.state && _t.state.kind) || 'none'; try { _t.close(); } catch (e) {} return r; }));
  log('gift close by:', await p.evaluate(() => { const g = It.byId.p_glyph; At.position.set(g.group.position.x - 2, 0, g.group.position.z); te(g, !0); for (let i = 0; i < 40 && qt.isOpen; i++) { qt.skipAll(); qt.advance(); } const r = (_t.state && _t.state.kind) || 'none'; try { _t.close(); } catch (e) {} return r; }));
  // 2. the talk target follows the last thing used: the phone's speech is not taken by GLYPH
  log('talk target after phone:', await p.evaluate(() => { const ph = z.list.find((s) => s.id === 'phone'); At.position.set(ph.x, 0, ph.z + 1); xe.scan(); xe.run('interact'); const t = xe.lastTarget; return t && t.def ? 'creature ' + t.def.name : t ? 'station ' + t.id : 'none'; }));
  await clear(); await p.evaluate(() => { try { _t.close(); } catch (e) {} });
  // 3. MUSHROOM stays up on his desk during an Event without Seeds
  await p.evaluate(() => { Kt.rewards.seeds = !1; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  await W(4000);
  log('Mushroom y during a no-Seeds Event:', await p.evaluate(() => It.byId.drifter.group.position.y.toFixed(3) + ' busy ' + It.byId.drifter.busy + ' event ' + me.active));
  await p.evaluate(() => { try { me.wrap(); } catch (e) {} });
  // 4. FORTIZMO holds still with the player at the bar
  log('Fortizmo with the player close:', await p.evaluate(() => { const f = It.byId.frog, fn = L.find((g) => /barSpot\(0\)/.test(String(g))); At.position.set(f.group.position.x + 2.2, 0, f.group.position.z); f.nearPlayer = !0; const z0 = f.home.z; fn(Re.t + 1000); fn(Re.t + 2000); return 'home moved ' + (f.home.z !== z0); }));
  // 5. no vignette with a creature away from its spot
  log('vignette with Etcher away:', await p.evaluate(() => { const e = It.byId.p_etcher, x0 = e.group.position.x; e.group.position.x += 5; const fn = L.find((g) => /pick\(tt\)/.test(String(g))); let seen = 0, tt = Re.t + 10; const r0 = Math.random; Math.random = () => 0.01; for (let k = 0; k < 400; k++) { tt += 0.5; fn(tt, 0.05); if (e.vig) seen++; } Math.random = r0; e.group.position.x = x0; return 'frames in a vignette: ' + seen; }));
  log('err', await p.evaluate(() => Re.errors));
};
