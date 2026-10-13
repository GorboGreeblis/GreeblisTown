// The Blossom option always costs a Blossom: given to each creature in turn, every gift takes one from the hand.
// And a Dance battle costs a Blossom: with none in hand a Dancer's menu holds only Talk and a gift does nothing (no
// battle); with one, "Give a blossom" takes it from the inventory and the battle opens once the thanks is said.
//   NOSHOT=1 node shot.js <url> x.png ./t_battlecost.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(640, 60); await W(1500);
  const near = () => p.evaluate(() => { const e = It.byId.w_mont, q = e.group.position; At.position.set(q.x + 1.6, 0, q.z + 1.6); xe.scan(); return xe.current === e ? xe.actions.map((a) => a.label).join(' / ') : 'not the target'; });
  await p.evaluate(() => (Kt.blossoms = 0));
  const none = await near();
  await p.evaluate(() => te(It.byId.w_mont, !0)); await W(500);
  const r0 = await p.evaluate(() => ({ blossoms: Kt.blossoms, talking: qt.isOpen, battle: !!(Dbt.state && !Dbt.state.over) }));
  log('no Blossom: options', JSON.stringify(none), '| a gift anyway:', JSON.stringify(r0), !/blossom/i.test(none) && !r0.battle && !r0.talking ? 'ok' : 'FAIL');
  await p.evaluate(() => (Kt.blossoms = 1));
  const one = await near();
  await p.evaluate(() => xe.run('give')); await W(800);
  const mid = await p.evaluate(() => Kt.blossoms);
  // say the thanks through; the battle should open
  await p.evaluate(() => { for (let i = 0; i < 20 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} }); await W(1500);
  const r1 = await p.evaluate(() => ({ blossoms: Kt.blossoms, battle: !!(Dbt.state && !Dbt.state.over), top: jt.top }));
  log('one Blossom: options', JSON.stringify(one), '| after giving it', mid, 'left | battle', JSON.stringify(r1), /blossom/i.test(one) && mid === 0 && r1.battle ? 'ok' : 'FAIL');
  await p.evaluate(() => { try { _t.close(); } catch (e) {} });
  log('afterwards, options', JSON.stringify(await near()));
  // every creature: one Blossom in hand, give it, and the hand is empty
  const each = await p.evaluate(() => It.all.filter((e) => e.def && e.kind !== 'courier').map((e) => {
    for (let i = 0; i < 20 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (x) {}
    try { _t.close(); } catch (x) {}
    Kt.blossoms = 1; te(e, !0); return e.def.name + ':' + Kt.blossoms;
  }));
  log('a Blossom to each creature leaves', each.join(' '), each.every((q) => q.endsWith(':0')) ? 'ok' : 'FAIL');
  log('err', await p.evaluate(() => Re.errors));
};
