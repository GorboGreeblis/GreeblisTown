// The owner's script, the rest of the parts that move: ANOMALEE's sad line plays its falling notes (her other lines
// don't); MONTGUMMERY's screen changes face for his Blossom line and comes back; SOMLET's eyes open while she says
// her thanks for a Blossom, and she sleeps on at the Post Office through the Garden Event; at the Event (Snacks done)
// the pizza-box stacks stand round the garden and ANOMALEE eats her own open box a slice at a time; ZOLLOD says his
// Event line when talked to then, and no one at the Event offers a Blossom option.
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_script2.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const waitGame = async (sec) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 4000 && (await p.evaluate(() => Re.t)) - t0 < sec; k++) await W(200); };
  const said = () => p.evaluate(() => (qt.isOpen ? document.getElementById('dlgText').textContent : null));
  const close = async () => { await p.evaluate(() => { for (let k = 0; k < 8 && qt.isOpen; k++) try { qt.advance(); } catch (e) {} }); await W(300); };
  // ---- ANOMALEE: only her sad line (the second) comes with the falling notes
  await p.evaluate(() => { window.__notes = 0; const n = G.note; G.note = function (f) { [392, 349, 311, 262, 131].includes(f) && __notes++; return n.apply(this, arguments); }; });
  const sad = async (k) => { await p.evaluate((k) => { Kt.talkState.blinker = k; __notes = 0; te(It.byId.blinker); }, k); await W(600); const s = await said(), n = await p.evaluate(() => __notes); await close(); return { line: s, notes: n }; };
  log('ANOMALEE line 0:', JSON.stringify(await sad(0)), '| line 1 (sad):', JSON.stringify(await sad(1)), '| line 2:', JSON.stringify(await sad(2)));
  // ---- MONTGUMMERY: his screen's texture is swapped for his Blossom line and swapped back after
  const maps = () => p.evaluate(() => { const r = []; It.byId.w_mont.group.traverse((o) => o.isMesh && o.material && o.material.map && r.push(o.material.map.uuid)); return r; });
  const m0 = await maps();
  await p.evaluate(() => { Kt.blossoms = 1; te(It.byId.w_mont, 1); }); await W(600);
  const m1 = await maps(), montSaid = await said();
  await close(); await waitGame(7);
  const m2 = await maps();
  log('MONTGUMMERY screen: textures', m0.length, '| swapped for his Blossom line', m0.filter((u, i) => u !== m1[i]).length, '| swapped again after', m1.filter((u, i) => u !== m2[i]).length, '| says', JSON.stringify(montSaid));
  // ---- SOMLET: her open eyes show (more visible parts, lids squashed flat) only while she says her thanks
  const som = () => p.evaluate(() => {
    const e = It.byId.m_somlet, g = e.group, a = e.def.at, ax = a.x !== undefined ? a.x : a[0], az = a.z !== undefined ? a.z : a[a.length === 3 ? 2 : 1];
    let vis = 0, flat = 0;
    g.traverse((o) => { if (!o.isMesh) return; let v = o.visible; for (let q = o.parent; q && q !== g; q = q.parent) v = v && q.visible; v && vis++; o.scale.y < 0.05 && flat++; });
    return { vis, flat, off: +Math.hypot(g.position.x - ax, g.position.z - az).toFixed(2), planting: !!e.planting };
  });
  const s0 = await som();
  await p.evaluate(() => { Kt.blossoms = 1; te(It.byId.m_somlet, 1); }); await W(700);
  const s1 = await som(), somSaid = await said();
  await close(); await waitGame(6);
  const s2 = await som();
  log('SOMLET eyes: asleep', JSON.stringify(s0), '| thanks', JSON.stringify(s1), '| after', JSON.stringify(s2), '| says', JSON.stringify(somSaid));
  // ---- THE EVENT with the Snacks quest done: pizza boxes, ANOMALEE eating, SOMLET home, ZOLLOD's line
  await p.evaluate(() => { window.__gbNoThrottle = 1; JGP.visitAt(9e15); Kt.rewards.seeds = Kt.rewards.stone = Kt.rewards.snacks = !0; Kt.blossoms = 2; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  for (let k = 0; k < 600 && (await p.evaluate(() => JGP.eventMove)) !== 'plant'; k++) await W(500);
  const piz = () => p.evaluate(() => {
    const st = C.children.find((g) => g.userData && g.userData[7] && g.userData[7].r === 0.35), a = It.byId.blinker.group.position;
    let pie = null;
    for (const g of C.children) { if (g === st || !g.children || g.children.length < 6) continue; Math.hypot(g.position.x - a.x, g.position.z - a.z) < 1.2 && (pie = g); }
    return { phase: JGP.eventMove, stacks: st ? st.children.length : 0, pie: !!pie, eaten: pie ? pie.children.filter((c) => !c.visible).length : -1, anomaleePlanting: !!It.byId.blinker.planting };
  });
  // (her box is served once she has walked from the church to her spot and settled: up to 80 s of game time)
  const p0 = await piz();
  let p1 = p0, tp = await p.evaluate(() => Re.t);
  for (let k = 0; k < 800 && !p1.pie; k++) { await W(400); p1 = await piz(); if ((await p.evaluate(() => Re.t)) - tp > 80) break; }
  const tServed = (await p.evaluate(() => Re.t)) - tp;
  await waitGame(12); const p2 = await piz();
  log('PIZZA at the Event: planting starts', JSON.stringify(p0), '| served after', tServed.toFixed(0), 's', JSON.stringify(p1), '| 12 s on', JSON.stringify(p2));
  const s3 = await som();
  log('SOMLET at the Event:', JSON.stringify(s3), '(off her spot < 0.5 and not planting = home)');
  // (ZOLLOD has no id of his own, only his kind)
  const zol = await p.evaluate(() => { const e = It.all.find((q) => q.def && q.def.__type === 'cutebex'), q = e.group.position; At.position.set(q.x + 1.2, 0, q.z + 1.2); xe.scan(); const at = xe.current && (xe.current.id || xe.current.name || xe.current.def && xe.current.def.name); const opts = xe.actions.map((a) => a.label).join(' / '), talk = xe.actions.find((a) => a.verb === 'interact'); talk && talk.run(); return { target: at, options: opts, blossoms: Kt.blossoms }; });
  await W(600);
  log('ZOLLOD at the Event:', JSON.stringify(zol), '| says', JSON.stringify(await said()));
  await close();
  // (no one at the Event offers a Blossom: every creature's menu while the player holds two)
  const menus = await p.evaluate(() => It.all.filter((e) => e.group && e.group.parent && !e.hidden).map((e) => { const q = e.group.position; At.position.set(q.x + 1.1, 0, q.z + 1.1); xe.scan(); return (e.id || e.def.__type) + ':' + xe.actions.map((a) => a.label).join('/'); }));
  log('menus at the Event:', menus.join('  '));
  log('err', await p.evaluate(() => Re.errors));
};
