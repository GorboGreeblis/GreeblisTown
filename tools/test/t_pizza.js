// The phone and the pizza courier: the phone is locked (its connection to the Portal blocked) until MUSHROOM
// has a Blossom, then calls NEXTESSA for the rest of the session; and the courier's delivery itself.
//   NOSHOT=1 node shot.js <url> x.png ./t_pizza.js   (PART=lock,courier runs only those)

// The phone booth (and so NEXTESSA's pizza) is locked until MUSHROOM has been given a Blossom: before, its
// connection to the Portal is blocked and no courier is called; after, it calls her, and it stays unlocked for the session.
const lock = async (p, out) => {
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
  // (the line types out letter by letter: it is read once it has stopped growing, not partway)
  const said = async () => { let a = null, b = ''; for (let k = 0; k < 20 && a !== b; k++) (a = b), await W(250), (b = await p.evaluate(() => document.getElementById('dlgText').textContent)); return closeDlg(); };
  const closeDlg = () => p.evaluate(() => { const t = document.getElementById('dlgText').textContent; for (let i = 0; i < 10 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} return t; });
  const before = await usePhone(); await W(2500);
  const b1 = await said();
  await W(1500);
  const c1 = await p.evaluate(() => ue.state + (ue.courier ? ' courier' : ''));
  log('before MUSHROOM has a Blossom:', JSON.stringify(before), '| says', JSON.stringify(b1), '| pizza', c1, !before.unlocked && /blocked/.test(b1) ? 'locked ok' : 'FAIL');
  // give MUSHROOM a Blossom, as the player does
  await p.evaluate(() => { const m = It.byId.drifter; Kt.blossoms = 1; At.position.set(m.group.position.x + 1.5, 0, m.group.position.z + 1.5); xe.scan(); const give = xe.actions.find((a) => a.verb === 'give'); give ? xe.run('give') : te(m, !0); });
  await W(2500); await said();
  await p.evaluate(() => { t.pizza.callDelayMs = 300; });
  const after = await usePhone(); await W(2500);
  const a1 = await said();
  log('after:', JSON.stringify(after), '| says', JSON.stringify(a1), after.unlocked && /pizza shop/.test(a1) ? 'unlocked ok' : 'FAIL');
  // and it stays unlocked (nothing in the session locks it again)
  await W(3000);
  log('still unlocked later:', await p.evaluate(() => Kt.phone));
  log('err', await p.evaluate(() => Re.errors));
};

// The pizza courier: shortens the call delay, calls a pizza (ue.call) and skips the dialogue, then prints the courier's
// name, spawn spot and state, and 20 s later where it is (or 'gone') and the error count.
const courier = async (p, out) => {
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await p.waitForTimeout(1500);
  await p.evaluate(() => { t.pizza.callDelayMs = 300; At.position.set(-7, 0, 21); ue.call(); });
  for (let k = 0; k < 8; k++) { await p.waitForTimeout(400); await p.evaluate(() => { try { qt.skipAll(); qt.advance(); } catch (e) {} }); }
  await p.waitForTimeout(3000);
  const r = await p.evaluate(() => { const c = ue.courier; if (!c) return 'none'; At.position.set(c.group.position.x + 3, 0, c.group.position.z + 3); return 'spawned ' + c.def.name + '@' + c.group.position.x.toFixed(1) + ',' + c.group.position.z.toFixed(1) + ' state ' + ue.state; });
  await p.waitForTimeout(20000);
  const r2 = await p.evaluate(() => { const c = ue.courier; return (c ? c.group.position.x.toFixed(1) + ',' + c.group.position.z.toFixed(1) + ' ' + ue.state : 'gone') + ' err ' + Re.errors; });
  console.log(r, '|', r2);
};

module.exports = require('./parts.js')({ lock, courier });
