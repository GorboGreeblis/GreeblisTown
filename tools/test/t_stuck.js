// Creatures never stuck away from home: a creature is sent on a visit and interrupted by the player on the way out,
// side by side or walking home: a Talk, a Blossom, or, for a Dancer, a Blossom that opens the Dance battle and a bow
// out. Afterwards it must finish or drop the visit and get back to its home ground (JGP.homeGround: its own place, or
// for a roamer its roaming ground: the dance floor, the park, round the Gallery or the Portal) within 150 game s.
// Env: CASES (comma list of <id>:<talk|blossom|battle>:<out|meet|back>, e.g. p_etcher:battle:out; the default runs
//   eight cases over all three stages).
// Output: per case whether it reached the stage, where it was interrupted, where it ended up (`onHomeGround`) and
//   `home in time <bool>`; then `err <n>`.
//   VW=320 VH=240 NOSHOT=1 node test/shot.js <url> x.png test/t_stuck.js
const { log, start, waitGame, logErrors } = require('./lib.js');

module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  const CASES = (process.env.CASES || 'p_etcher:battle:out,p_etcher:battle:meet,p_glyph:battle:back,w_mont:battle:out,p_gemtoe:blossom:meet,drifter:talk:out,gratelet:talk:back,cutebex:talk:out').split(',');
  await p.evaluate(() => { window.__gbNoThrottle = 1; Kt.shyFree = !0; JGP.visitAt(9e15); JGP.meetAt && JGP.meetAt(9e15); });
  for (const c of CASES) {
    const [vid, how, stage] = c.split(':');
    const hid = vid === 'p_gemtoe' ? 'p_glyph' : vid === 'gratelet' ? 'p_gemtoe' : 'p_mamagorbo';
    await p.evaluate(([v, h]) => { JGP.visitAt(9e15, v, h); }, [vid, hid]);
    const got = await waitGame(p, 90, new Function('const q = JGP.visits().all.find((q) => q.v === "' + vid + '"); return !!q && q.stage === "' + stage + '" && (' + (stage === 'out' ? '(() => { const e = It.byId["' + vid + '"] || It.all.find((o) => o.def && o.def.__type === "' + vid + '"); return Math.hypot(e.group.position.x - e.def.at[0], e.group.position.z - e.def.at[1]) > 8 && q.gap > 4; })()' : 'true') + ');'));
    // (stand by it and interrupt, the game's way)
    const r0 = await p.evaluate(([vid, how]) => {
      const e = It.byId[vid] || It.all.find((q) => q.def && q.def.__type === vid), g = e.group.position;
      At.position.set(g.x + 1.5, 0, g.z + 1.5);
      Kt.blossoms = 2;
      // (ZOLLOD's one menu option is the shop: open it and close it again)
      if (e.def.__type === 'cutebex') { xe.scan(); const o = xe.actions[0]; o && o.run(); try { _t.close(); } catch (er) {} } else if (how === 'talk') te(e); else te(e, !0);
      return { at: [+g.x.toFixed(1), +g.z.toFixed(1)], home: [+e.home.x.toFixed(1), +e.home.z.toFixed(1)], defAt: e.def.at };
    }, [vid, how]);
    // (through the words; for a Dancer a battle opens after the Blossom line: bow out until it ends, then close it)
    for (let k = 0; k < 30; k++) {
      const s = await p.evaluate(() => { if (qt.isOpen) { try { qt.advance(); } catch (e) {} return 'dlg'; } const b = Dbt.state; return b ? (b.over ? 'over' : 'battle') : 'none'; });
      if (s === 'battle') await p.evaluate(() => { const bow = [...document.querySelectorAll('button')].find((b) => /bow/i.test(b.textContent)); bow && bow.click(); });
      if (s === 'over') { await p.evaluate(() => { try { _t.close(); } catch (e) {} }); }
      if (s === 'none') break;
      await W(400);
    }
    await p.evaluate(() => { At.position.set(0, 0, 2); });
    // (then let it go about its business, and see where it ends up)
    const home = await waitGame(p, 150, new Function('const e = It.byId["' + vid + '"] || It.all.find((q) => q.def && q.def.__type === "' + vid + '"); return !e.visiting && !e.hosting && !e.busy && !e.goHome && !e.gcNavHome && !e.moving && JGP.homeGround(e);'));
    const r1 = await p.evaluate((vid) => {
      const e = It.byId[vid] || It.all.find((q) => q.def && q.def.__type === vid), g = e.group.position;
      return { at: [+g.x.toFixed(1), +g.z.toFixed(1)], home: [+e.home.x.toFixed(1), +e.home.z.toFixed(1)], onHomeGround: JGP.homeGround(e), visiting: !!e.visiting, busy: e.busy, battle: !!e.battleDance };
    }, vid);
    log(c, '| reached the stage', got, '| interrupted at', JSON.stringify(r0.at), '| after:', JSON.stringify(r1), '| home in time', home);
  }
  await logErrors(p);
};
