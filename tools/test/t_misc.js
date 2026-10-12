// King Dino's jazz keeps going on the floor while King Dino is talked to, given a Blossom and during a Dance battle,
// and is not heard off the floor (jazz hits heard in 4 s of game time each); flint and Blossom pickups respawn
// elsewhere; the Blossom menu option needs a Blossom.
// Run: VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_misc.js
module.exports = async (p) => {
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
