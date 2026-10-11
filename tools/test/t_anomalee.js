// ANOMALEE keeps gazing up at the church window with the player close by and through her Talk lines;
// she turns to the player (head level) for her Blossom line, and for a Talk line during the Event.
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(100, 60); await W(1500);
  const look = () => p.evaluate(() => {
    const e = It.byId.blinker, g = e.group, q = g.position;
    const toP = Math.atan2(At.position.x - q.x, At.position.z - q.z), win = e.pattern[1].face;
    const d = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
    let head = null; g.traverse((n) => !head && n.isGroup && Math.abs(n.position.y - 2.15) < 0.01 && Math.abs(n.position.z - 0.35) < 0.01 && (head = n));
    return `off the window ${d(g.rotation.y, win).toFixed(2)} rad, off the player ${d(g.rotation.y, toP).toFixed(2)} rad, head tip ${head ? (-head.rotation.x).toFixed(2) : '?'} (${jt.top}${e.gifting ? ', Blossom line' : ''})`;
  });
  const place = () => p.evaluate(() => { const e = It.byId.blinker, q = e.group.position, f = e.pattern[1].face; At.position.set(q.x + 2.6 * Math.sin(f + 1.6), 0, q.z + 2.6 * Math.cos(f + 1.6)); });
  const clear = () => p.evaluate(() => { for (let i = 0; i < 20 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} });
  await place(); await W(3000); log('player close:', await look());
  await p.evaluate(() => te(It.byId.blinker)); await W(3000); log('Talk line:', await look());
  await clear(); await W(500);
  await p.evaluate(() => { Kt.blossoms = 2; te(It.byId.blinker, !0); }); await W(3000); log('Blossom line:', await look());
  await clear(); await W(4000); log('after it:', await look());
  await p.evaluate(() => { Kt.rewards.seeds = !0; (Kt.rewards.stone = !0), z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  for (let k = 0; k < 40 && !(await p.evaluate(() => It.byId.blinker.busy === 'finale' && !It.byId.blinker.moving && bt.live)); k++) await W(1000);
  await p.evaluate(() => { const e = It.byId.blinker, q = e.group.position; At.position.set(q.x + 2.4, 0, q.z + 0.5); te(e); }); await W(3000); log('Talk line at the Event:', await look());
  log('err', await p.evaluate(() => Re.errors));
};
