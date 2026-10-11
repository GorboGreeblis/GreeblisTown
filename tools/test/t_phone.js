// The phone booth (and so NEXTESSA's pizza) is locked until MUSHROOM has been given a Blossom: before, it rings
// and no one answers and no courier is called; after, it calls her, and it stays unlocked for the session.
// Run: NOSHOT=1 node shot2.js <url> x.png ./t_phone.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(640, 60); await W(1500);
  const usePhone = () => p.evaluate(() => {
    for (let i = 0; i < 10 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {}
    const ph = z.list.find((s) => s.id === 'phone');
    At.position.set(ph.x, 0, ph.z + 1), xe.scan();
    const label = xe.current === ph && xe.actions.map((a) => a.label).join('/');
    xe.run('interact');
    return { label, unlocked: Kt.phone };
  });
  const said = () => p.evaluate(() => { const t = document.getElementById('dlgText').textContent; for (let i = 0; i < 10 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} return t; });
  const before = await usePhone(); await W(2500);
  const b1 = await said();
  await W(1500);
  const c1 = await p.evaluate(() => ue.state + (ue.courier ? ' courier' : ''));
  log('before MUSHROOM has a Blossom:', JSON.stringify(before), '| says', JSON.stringify(b1), '| pizza', c1, !before.unlocked && /no one answers/.test(b1) ? 'locked ok' : 'FAIL');
  // give MUSHROOM a Blossom, as the player does
  await p.evaluate(() => { const m = It.byId.drifter; Kt.blossoms = 1; At.position.set(m.group.position.x + 1.5, 0, m.group.position.z + 1.5); xe.scan(); const give = xe.actions.find((a) => a.verb === 'give'); give ? xe.run('give') : te(m, !0); });
  await W(2500); await said();
  await p.evaluate(() => { t.pizza.callDelayMs = 300; });
  const after = await usePhone(); await W(2500);
  const a1 = await said();
  log('after:', JSON.stringify(after), '| says', JSON.stringify(a1), after.unlocked && !/no one answers/.test(a1) ? 'unlocked ok' : 'FAIL');
  // and it stays unlocked (nothing in the session locks it again)
  await W(3000);
  log('still unlocked later:', await p.evaluate(() => Kt.phone));
  log('err', await p.evaluate(() => Re.errors));
};
