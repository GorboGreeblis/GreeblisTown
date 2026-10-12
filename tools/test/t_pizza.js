// The pizza courier: shortens the call delay, calls a pizza (ue.call) and skips the dialogue, then prints the courier's
// name, spawn spot and state, and 20 s later where it is (or 'gone') and the error count.
// Run: NOSHOT=1 node shot2.js <url> x.png ./t_pizza.js
module.exports = async (p, out) => {
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await p.waitForTimeout(1500);
  await p.evaluate(() => { t.pizza.callDelayMs = 300; At.position.set(-7, 0, 21); ue.call(); });
  for (let k = 0; k < 8; k++) { await p.waitForTimeout(400); await p.evaluate(() => { try { qt.skipAll(); qt.advance(); } catch (e) {} }); }
  await p.waitForTimeout(3000);
  const r = await p.evaluate(() => { const c = ue.courier; if (!c) return 'none'; At.position.set(c.group.position.x + 3, 0, c.group.position.z + 3); return 'spawned ' + c.def.name + '@' + c.group.position.x.toFixed(1) + ',' + c.group.position.z.toFixed(1) + ' state ' + ue.state; });
  await p.waitForTimeout(20000);
  const r2 = await p.evaluate(() => { const c = ue.courier; return (c ? c.group.position.x.toFixed(1) + ',' + c.group.position.z.toFixed(1) + ' ' + ue.state : 'gone') + ' err ' + Re.errors; });
  console.log(r, '|', r2);
};
