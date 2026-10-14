// Creatures never stuck away from home: a creature is sent on a visit and interrupted on the way (or side by side,
// or walking home) by the player: a Talk, a Blossom, or, for a Dancer, a Blossom that opens the Dance battle menu and
// a bow out. Afterwards it must finish or drop the visit and get back to its home ground: its post (def.at) or, for a
// roamer, its roaming ground (the dance floor for the Dancers, the park for Gemtoe and the Gorbos, round the Portal
// for Hennrick). CASES (env, comma list) picks cases, e.g. "p_etcher:battle:out"; the default runs a set over all
// three stages. Prints, per case, where it ended up after up to 150 s of game time and whether that is home ground.
//   VW=320 VH=240 NOSHOT=1 node shot.js <url> x.png ./t_stuck.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const waitGame = async (sec, until) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 6000 && (await p.evaluate(() => Re.t)) - t0 < sec; k++) { if (until && (await p.evaluate(until))) return !0; await W(250); } return !1; };
  const CASES = (process.env.CASES || 'p_etcher:battle:out,p_etcher:battle:meet,p_glyph:battle:back,w_mont:battle:out,p_gemtoe:blossom:meet,drifter:talk:out,gratelet:talk:back,cutebex:talk:out').split(',');
  // (home ground, as the game defines it; the probe's own copy, so it also measures a build from before it had one)
  await p.evaluate(() => {
    window.__hg = (h) => {
      const p = h.group.position, id = h.id, a = h.def.at, FL = ['p_etcher', 'p_glyph', 'w_mont'];
      if (FL.includes(id)) return JGP.onDance(p.x, p.z, 0.05);
      if (id === 'gratelet') return Math.hypot(p.x - ot.x, p.z - ot.z) < 9;
      if (id === 'p_gemtoe' || id === 'p_mamagorbo') return JGP.roamFree(p.x, p.z, 0.25);
      if (id === 'gorbo') return Math.hypot(p.x - 31, p.z - 14.5) < 12 && JGP.roamFree(p.x, p.z, 0.25);
      if (id === 'frog') return Math.abs(p.x - JGP.barSpot(0)[0]) < 0.8 && Math.abs(p.z) < 8.5;
      return Math.hypot(p.x - a[0], p.z - a[1]) < 1.2;
    };
  });
  await p.evaluate(() => { window.__gbNoThrottle = 1; Kt.shyFree = !0; JGP.visitAt(9e15); JGP.meetAt && JGP.meetAt(9e15); });
  for (const c of CASES) {
    const [vid, how, stage] = c.split(':');
    const hid = vid === 'p_gemtoe' ? 'p_glyph' : vid === 'gratelet' ? 'p_gemtoe' : 'p_mamagorbo';
    await p.evaluate(([v, h]) => { JGP.visitAt(9e15, v, h); }, [vid, hid]);
    const got = await waitGame(90, new Function('const q = JGP.visits().all.find((q) => q.v === "' + vid + '"); return !!q && q.stage === "' + stage + '" && (' + (stage === 'out' ? '(() => { const e = It.byId["' + vid + '"] || It.all.find((o) => o.def && o.def.__type === "' + vid + '"); return Math.hypot(e.group.position.x - e.def.at[0], e.group.position.z - e.def.at[1]) > 8 && q.gap > 4; })()' : 'true') + ');'));
    // (stand by it and interrupt, the game's way)
    const r0 = await p.evaluate(([vid, how]) => {
      const e = It.byId[vid] || It.all.find((q) => q.def && q.def.__type === vid), g = e.group.position;
      At.position.set(g.x + 1.5, 0, g.z + 1.5);
      Kt.blossoms = 2;
      // (ZOLLOD's one menu option is the shop: open it and close it again)
      if (e.def.__type === 'cutebex') { xe.scan(); const o = xe.actions[0]; o && o.run(); try { _t.close(); } catch (er) {} } else if (how === 'talk') te(e); else te(e, !0);
      return { at: [+g.x.toFixed(1), +g.z.toFixed(1)], home: [+e.home.x.toFixed(1), +e.home.z.toFixed(1)], defAt: e.def.at };
    }, [vid, how]);
    // (through the words; a battle opens after the Blossom line for a Dancer: bow out till it lets you go, then LEAVE)
    for (let k = 0; k < 30; k++) {
      const s = await p.evaluate(() => { if (qt.isOpen) { try { qt.advance(); } catch (e) {} return 'dlg'; } const b = Dbt.state; if (b) { if (!b.over) { document.querySelectorAll('#panel button, .panel button').forEach(() => {}); return 'battle'; } return 'over'; } return 'none'; });
      if (s === 'battle') await p.evaluate(() => { const items = _t && _t.cur ? null : null; /* pick the bow: the last item */ const btns = [...document.querySelectorAll('button')].filter((b) => /bow/i.test(b.textContent)); btns.length && btns[0].click(); });
      if (s === 'over') { await p.evaluate(() => { try { _t.close(); } catch (e) {} }); }
      if (s === 'none') break;
      await W(400);
    }
    await p.evaluate(() => { At.position.set(0, 0, 2); });
    // (then let it go about its business, and see where it ends up)
    const home = await waitGame(150, new Function('const e = It.byId["' + vid + '"] || It.all.find((q) => q.def && q.def.__type === "' + vid + '"); return !e.visiting && !e.hosting && !e.busy && !e.goHome && !e.gcNavHome && !e.moving && __hg(e);'));
    const r1 = await p.evaluate((vid) => {
      const e = It.byId[vid] || It.all.find((q) => q.def && q.def.__type === vid), g = e.group.position;
      return { at: [+g.x.toFixed(1), +g.z.toFixed(1)], home: [+e.home.x.toFixed(1), +e.home.z.toFixed(1)], onHomeGround: __hg(e), visiting: !!e.visiting, busy: e.busy, battle: !!e.battleDance };
    }, vid);
    log(c, '| reached the stage', got, '| interrupted at', JSON.stringify(r0.at), '| after:', JSON.stringify(r1), '| home in time', home);
  }
  log('err', await p.evaluate(() => Re.errors));
};
