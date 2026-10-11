module.exports = async (p, out) => {
  const W = (ms) => p.waitForTimeout(ms);
  const close = async (n = 10) => { for (let k = 0; k < n; k++) { const open = await p.evaluate(() => qt.isOpen); if (!open) return; await p.evaluate(() => { try { qt.skipAll(); qt.advance(); } catch (e) {} }); await W(250); } };
  const st0 = (tag) => p.evaluate((tag) => JSON.stringify({ tag, arts: Kt.artifacts, rw: Kt.rewards, bulb: +Bulb.level.toFixed(2), night: +(I.nightK || 0).toFixed(2), away: st.away(), dlg: qt.isOpen, name: (document.getElementById('dlgName') || {}).textContent, err: Re.errors }), tag);
  await p.mouse.click(640, 360); await W(1500);
  const S = (id) => `z.list.find((s) => s.id === "${id}")`;
  // talk to SPARKAKUS before finding anything
  console.log(await p.evaluate((S) => { At.position.set(-21.5, 0, -21.5); const s = eval(S); return s.label() + ' / ' + (s.run(), 'ran'); }, S('stump')));
  await W(400); console.log(await st0('ask')); await close();
  // pick up the three artifacts
  for (let k = 0; k < 3; k++) {
    await p.evaluate((k) => { const [x0, z0] = ARTS.SPOTS[k]; At.position.set(x0 + 3, 0, z0); }, k); await W(300);
    await p.evaluate((k) => { const [x0, z0] = ARTS.SPOTS[k]; At.position.set(x0, 0, z0); }, k);
    for (let j = 0; j < 20 && !(await p.evaluate(() => qt.isOpen)); j++) await W(300);
    console.log(await st0('pick' + k)); await close();
  }
  console.log(await p.evaluate((S) => { At.position.set(-21.5, 0, -21.5); return eval(S).label(); }, S('stump')));
  await p.evaluate((S) => eval(S).run(), S('stump'));
  await W(1600); console.log(await st0('speech 1.6s'));
  await W(3500); console.log(await st0('speech 5s'), await p.evaluate(() => JSON.stringify(st.pos())));
  if (out) await p.screenshot({ path: out });
  await close(12); await W(400); console.log(await st0('after speech'));
  await close(); await W(3000); console.log(await st0('3s after'));
  await W(6000); console.log(await st0('9s after'), await p.evaluate(() => JSON.stringify(st.pos())));
  await p.evaluate((S) => eval(S).run(), S('stump')); await W(300); console.log(await st0('done line')); await close();
  // the shop at Garden Supplies
  console.log(await p.evaluate((S) => { Kt.acorns = 20; const s = eval(S); At.position.set(s.x, 0, s.z + 0.5); s.run(); return JSON.stringify({ label: s.label(), kind: _t.kind, title: document.getElementById('pTitle').textContent, log: document.getElementById('pLog').textContent, items: [...document.querySelectorAll('#pList .pbtn')].map((b) => b.textContent) }); }, S('gshop')));
  console.log(await p.evaluate(() => { const it = ne.items(); const seeds = r.find((t) => t.id === 'seeds'); ne.buy(seeds); const a = document.getElementById('pLog').textContent; ne.buy(r.find((t) => t.id === 'floppyhat')); const b2 = document.getElementById('pLog').textContent; ne.buy(seeds); return JSON.stringify({ a, b2, c: document.getElementById('pLog').textContent, flint: Kt.acorns, rw: Kt.rewards, equip: Object.keys(Kt.equip).map((k) => Kt.equip[k] && Kt.equip[k].id) }); }));
  await p.evaluate(() => _t.close());
  // the Summoning Stone starts the Event
  console.log(await p.evaluate((S) => { const s = eval(S); At.position.set(0, 0, 3); const far = (At.position.set(0, 0, 9), xe.lastTarget && xe.lastTarget.id); At.position.set(0, 0, 2.6); s.run(); return JSON.stringify({ label: s.label(), kind: _t.kind, title: document.getElementById('pTitle').textContent, log: document.getElementById('pLog').textContent }); }, S('campfire')));
  await p.evaluate(() => oe.yes()); await W(12000);
  console.log(await p.evaluate(() => JSON.stringify({ active: me.active, live: bt.live, special: !!JGP.garden.special, plants: JGP.garden.plants.length, sp: JGP.garden.plants.filter((q) => q.special).length, err: Re.errors })));
};
