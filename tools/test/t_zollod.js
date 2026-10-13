// ZOLLOD out of his kiosk: before OVERCOMING SHYNESS frees him he never visits and is never visited; once freed, a
// Talk with him wherever he is (out visiting, being visited, walking home) opens the Shop, and the Shop's outfits
// (the mirror's "Change out") work from there.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_zollod.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const waitGame = async (sec, until) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 6000 && (await p.evaluate(() => Re.t)) - t0 < sec; k++) { if (until && (await p.evaluate(until))) return !0; await W(250); } return !1; };
  // still shy: a visit asked for by name must not start
  await p.evaluate(() => { window.__gbNoThrottle = 1; Kt.shyFree = !1; JGP.visitAt(9e15); JGP.visitAt(9e15, 'cutebex', 'p_mamagorbo'); });
  await waitGame(4);
  log('shy, asked to visit:', await p.evaluate(() => JSON.stringify(JGP.visits().all)));
  await p.evaluate(() => { JGP.visitAt(9e15, 'p_mamagorbo', 'cutebex'); });
  await waitGame(4);
  log('shy, asked to be visited:', await p.evaluate(() => JSON.stringify(JGP.visits().all)));
  // freed: out on a visit, talk to him where he is
  const talkAt = async (label) => {
    const r = await p.evaluate(() => {
      const e = It.all.find((q) => q.def && q.def.__type === 'cutebex'), g = e.group.position;
      At.position.set(g.x + 1.4, 0, g.z + 1.4); xe.scan();
      const opts = xe.actions.map((a) => a.label), t = xe.actions.find((a) => a.verb === 'interact' && a.label === shopText.label);
      t && t.run();
      return { at: [+g.x.toFixed(1), +g.z.toFixed(1)], opts };
    });
    await W(500);
    const shop = await p.evaluate(() => jt.has('panel') && 'shop' === _t.kind);
    log(label + ':', JSON.stringify(r), '| shop open', shop);
    await p.evaluate(() => { try { _t.close(); } catch (e) {} At.position.set(0, 0, 2); });
  };
  await p.evaluate(() => { Kt.shyFree = !0; Kt.acorns = 50; JGP.visitAt(9e15, 'cutebex', 'p_mamagorbo'); });
  await waitGame(60, () => { const q = JGP.visits().all.find((q) => q.v === 'cutebex'); return !!q && q.stage === 'out' && q.gap < 12; });
  await talkAt('freed, out visiting');
  await waitGame(90, () => { const q = JGP.visits().all.find((q) => q.v === 'cutebex'); return !!q && q.stage === 'back'; });
  await talkAt('freed, walking home');
  await waitGame(150, () => !JGP.visits().all.some((q) => q.v === 'cutebex' || q.h === 'cutebex'));
  await p.evaluate(() => { JGP.visitAt(9e15, 'p_mamagorbo', 'cutebex'); });
  await waitGame(90, () => { const q = JGP.visits().all.find((q) => q.h === 'cutebex'); return !!q && q.stage === 'meet'; });
  await talkAt('freed, being visited');
  log('err', await p.evaluate(() => Re.errors));
};
