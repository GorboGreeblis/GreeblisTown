// Ground-clipping audit: every creature's lowest point below the surface under it (JGP.groundAt: lawn,
// walks, dance floor, garden, decks, rug) (every visible mesh, sampled every few frames) through
// idling and wandering, Talk, Blossoms, Dance battles and victory dances, and a whole Garden Event (planting,
// dancing, watching, going home). Also flags a creature inside a building it does not work in.
// Run with a tiny viewport (VW=200 VH=150); the Event takes a while. LIMIT (default -0.005 m) is how far
// below the ground counts as clipping.
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  const LIMIT = +(process.env.LIMIT || -0.005);
  await p.mouse.click(100, 60); await W(1500);
  await p.evaluate((LIMIT) => {
    window.__phase = 'idle'; window.__G = {}; const v = new THREE.Vector3(); let fr = 0;
    const colOf = (o) => (o.material && o.material.color ? '#' + o.material.color.getHexString() : '?');
    L.push(() => {
      if (++fr % 4) return;
      for (const e of It.all) {
        if (!e.group || !e.group.visible || !e.def) continue;
        const g = e.group; g.updateMatrixWorld(!0);
        let lo = 1e9, who = '';
        const posted = g.position.y > 0.3;
        g.traverse((o) => { if (!o.isMesh || !o.visible) return; for (let a = o; a && a !== g; a = a.parent) if (!a.visible) return;
          // (how far below the surface under it, wherever on the creature it is: JGP.groundAt)
          const P = o.geometry.attributes.position; for (let k = 0; k < P.count; k += 3) { v.fromBufferAttribute(P, k).applyMatrix4(o.matrixWorld); const dd = v.y - (posted ? 0 : JGP.groundAt(v.x, v.z)); if (dd < lo) (lo = dd), (who = colOf(o)); } });
        const nm = e.def.name, r = (__G[nm] = __G[nm] || { min: 1e9, at: '', bad: {}, inB: {} });
        lo < r.min && ((r.min = lo), (r.at = __phase + (e.busy ? ':' + e.busy : '') + (e.moving ? ':walking' : '') + ' ' + who));
        if (lo < LIMIT) r.bad[__phase] = Math.min(r.bad[__phase] || 0, +lo.toFixed(3));
        const q = g.position;
        for (const B of F.buildings) if (F.inHull(B, q.x, q.z, -0.3) && !F.inHull(B, e.home.x, e.home.z)) r.inB[__phase + ' ' + (B.name || '?')] = 1;
      }
    });
  }, LIMIT);
  const clear = () => p.evaluate(() => { for (let i = 0; i < 40 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} });
  const phase = (n) => p.evaluate((n) => (window.__phase = n), n);
  const waitGame = async (s) => { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 4000 && (await p.evaluate(() => Re.t)) - t0 < s; k++) await W(250); };
  // 1. idle with the player away: the roamers roam, Somlet lies down, Gemtoe floats
  await p.evaluate(() => At.position.set(-2, 0, 30)); await waitGame(40);
  // 2. Talk and Blossom lines with everyone
  await phase('talk');
  for (const id of await p.evaluate(() => It.all.filter((e) => e.def && e.kind !== 'creature').map((e) => e.id))) {
    await p.evaluate((id) => { const e = It.byId[id], q = e.group.position; At.position.set(q.x + 2.4, 0, q.z + 0.6); te(e); }, id); await waitGame(2); await clear();
  }
  await phase('blossom');
  for (const id of await p.evaluate(() => It.all.filter((e) => e.def && e.kind !== 'creature').map((e) => e.id))) {
    await p.evaluate((id) => { Kt.blossoms = 5; const e = It.byId[id], q = e.group.position; At.position.set(q.x + 2.4, 0, q.z + 0.6); te(e, !0); }, id); await waitGame(2); await clear();
    await p.evaluate(() => { try { _t.close(); } catch (e) {} });
  }
  // 3. a Dance battle with each Dancer, every move, then the victory dance
  await phase('battle');
  for (const id of ['w_mont', 'p_etcher', 'p_glyph']) {
    await p.evaluate((id) => { const e = It.byId[id], q = e.group.position; At.position.set(q.x + 2.6, 0, q.z); Dbt.start(e); }, id);
    for (let k = 0; k < 8; k++) { await waitGame(1.2); await p.evaluate(() => { const s = _t.state; s && s.items && s.items.length && s.items[Math.floor(Math.random() * 3)].onClick(); }); }
    await p.evaluate(() => { try { _t.close(); } catch (e) {} }); await phase('victory'); await waitGame(3); await phase('battle');
  }
  // 4. the whole Garden Event
  await phase('event');
  await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
  for (let k = 0; k < 4000; k++) { await W(1000); const r = await p.evaluate(() => [me.active, Re.t]); if (!r[0] && k > 20) break; }
  await phase('after-event'); await waitGame(25);
  log(await p.evaluate(() => Object.entries(__G).map(([nm, r]) => `${nm}: lowest ${r.min.toFixed(3)} m (${r.at})${Object.keys(r.bad).length ? ' CLIPS ' + JSON.stringify(r.bad) : ''}${Object.keys(r.inB).length ? ' INSIDE ' + Object.keys(r.inB).join(', ') : ''}`).join('\n')));
  log('err', await p.evaluate(() => Re.errors));
};
