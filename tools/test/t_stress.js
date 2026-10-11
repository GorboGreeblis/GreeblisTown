// Collides the game's systems on purpose and checks everything ends up back where it belongs.
// Run with a tiny viewport (VW=200 VH=150) so game time runs fast.
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  const clear = () => p.evaluate(() => { for (let i = 0; i < 40 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} });
  const waitT = async (sec, cond) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 4000; k++) { await W(250); const r = await p.evaluate((c) => [Re.t, c ? eval(c) : 0], cond || null); if (cond && r[1]) return r[0] - t0; if (r[0] - t0 > sec) return -1; } };
  const state = () => p.evaluate(() => JSON.stringify({ t: +Re.t.toFixed(0), ev: me.active, phaseLive: bt.live, busy: It.all.filter((e) => e.busy).map((e) => e.def.name + ':' + e.busy), top: jt.top, horn: gcHorn.phase, music: !!ee.playing, bp: JGP.backpacka.busy(), courier: ue.state, err: Re.errors }));
  const homeCheck = () => p.evaluate(() => It.all.map((e) => { const d = Math.hypot(e.group.position.x - e.home.x, e.group.position.z - e.home.z); return d > 0.6 || e.busy ? e.def.name + ' off ' + d.toFixed(1) + (e.busy ? ' busy=' + e.busy : '') : null; }).filter(Boolean).join(', ') || 'all home');
  await p.mouse.click(100, 60); await W(1500);
  // 1. a battle, then the Event starts while it is open
  await p.evaluate(() => { Kt.blossoms = 5; At.position.set(0, 0, 3); Dbt.start(It.byId.p_glyph); });
  await W(500); log('battle open', await state());
  await p.evaluate(() => { try { z.list.find((s) => s.id === 'campfire').run(); } catch (e) { console.error('campfire run during battle: ' + e.message); } });
  await W(300); log('after stone tap during battle', await state(), 'panel', await p.evaluate(() => _t.state && _t.state.kind));
  await p.evaluate(() => { try { oe.yes && oe.yes(); } catch (e) {} try { _t.close(); } catch (e) {} });
  // 2. a pizza call right as the Event starts
  await p.evaluate(() => { t.pizza.callDelayMs = 300; try { ue.call(); } catch (e) { console.error('pizza call: ' + e.message); } });
  await W(1500); await clear();
  if (!(await p.evaluate(() => me.active))) await p.evaluate(() => { Kt.rewards.seeds = !0; z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  log('event started', await state());
  // 3. during the event: talk to everyone, Blossoms, the shop, SPARKAKUS, a battle, the stone again
  await W(3000);
  log(await p.evaluate(() => { const out = []; for (const e of It.all) { try { const a = xe.actionsFor(e).map((q) => q.label); out.push(e.def.name + '[' + a.join('/') + ']'); } catch (x) { out.push(e.def.name + ' ERR ' + x.message); } } return out.join(' '); }));
  await p.evaluate(() => { try { te(It.byId.frog); } catch (e) { console.error('talk fortizmo ' + e.message); } }); await W(800); await clear();
  await p.evaluate(() => { try { te(It.byId.p_etcher, !0); } catch (e) { console.error('gift during event ' + e.message); } }); await W(800); await clear();
  log('after gift during event', await state(), 'panel', await p.evaluate(() => _t.state && _t.state.kind));
  await p.evaluate(() => { try { _t.close(); } catch (e) {} try { z.list.find((s) => s.id === 'gshop').run(); } catch (e) { console.error('shop during event ' + e.message); } }); await W(500);
  log('shop during event panel:', await p.evaluate(() => _t.state && _t.state.kind)); await p.evaluate(() => { try { _t.close(); } catch (e) {} });
  await p.evaluate(() => { try { z.list.find((s) => s.id === 'stump').run(); } catch (e) { console.error('library during event ' + e.message); } }); await W(800); await clear();
  await p.evaluate(() => { try { z.list.find((s) => s.id === 'campfire').run(); } catch (e) { console.error('stone again ' + e.message); } }); await W(500);
  log('stone during event panel:', await p.evaluate(() => _t.state && _t.state.kind), await state()); await p.evaluate(() => { try { _t.close(); } catch (e) {} });
  // the player stands right on the garden walk where the ring forms
  await p.evaluate(() => At.position.set(17.3, 0, 0));
  // 4. let the event finish
  const dur = await waitT(400, '!me.active'); log('event took (game s)', dur.toFixed ? dur.toFixed(0) : dur, await state());
  await waitT(40, 'It.all.every((e) => !e.busy)'); await W(2000); log('after event:', await homeCheck(), await state());
  // 5. no Seeds event
  await p.evaluate(() => { Kt.rewards.seeds = !1; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  const d2 = await waitT(300, '!me.active'); log('no-seeds event took', d2.toFixed ? d2.toFixed(0) : d2, await state());
  await W(2000); log('after no-seeds:', await homeCheck());
  // 6. battle with each dancer after the event, bow out spam
  log(await p.evaluate(() => { const r = []; for (const id of ['p_glyph', 'p_etcher', 'w_mont']) { try { Dbt.start(It.byId[id]); for (let k = 0; k < 30 && Dbt.state && !Dbt.state.over; k++) _t.state.items[3].onClick(); _t.close(); r.push(id + ' ok busy=' + It.byId[id].busy); } catch (e) { r.push(id + ' ERR ' + e.message); } } return r.join('; '); }));
  log('final', await state(), 'scene kids', await p.evaluate(() => C.children.length));
};
