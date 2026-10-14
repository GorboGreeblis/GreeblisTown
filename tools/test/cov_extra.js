// A scene for cov.js that reaches what a player can reach and the other scenes do not: every station, every
// creature's Talk and Blossom, every shop item twice, the keys, a drag to look, clicks, resizing, hiding the page,
// and a long idle so the timers run (the UFO, ambient sounds, day and night).
// Env: none.
// Output: `stations <ids>`; cov.js records the coverage.
//   node test/cov.js <url> cov_d.json test/cov_extra.js
const { start } = require('./lib.js');

module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  const clear = () => p.evaluate(() => { for (let i = 0; i < 30 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} try { _t.close(); } catch (e) {} });
  await start(p, 1000);
  const vp = p.viewportSize(), cx = vp.width / 2, cy = vp.height / 2;
  const ids = await p.evaluate(() => z.list.map((s) => s.id));
  console.log('stations', ids.join(','));
  for (const id of ids) {
    await p.evaluate((id) => { const s = z.list.find((q) => q.id === id); At.position.set(s.x || 0, 0, (s.z || 0) + 0.6); try { s.label && s.label(); } catch (e) {} try { s.run(); } catch (e) { console.error('station ' + id + ' ' + e.message); } }, id);
    await W(1500);
    // (the first three options of any panel the station opened)
    await p.evaluate(() => { try { const it = (_t.state && _t.state.items) || []; it.slice(0, 3).forEach((i) => { try { i.onClick && i.onClick(); } catch (e) {} }); } catch (e) {} });
    await W(800); await clear(); await W(300);
  }
  // every creature: its menu, then a Blossom
  const ents = await p.evaluate(() => It.all.length);
  for (let id = 0; id < ents; id++) {
    await p.evaluate((id) => { Kt.blossoms = 5; const e = It.all[id]; if (!e) return; At.position.set(e.group.position.x + 1.5, 0, e.group.position.z + 1.5); xe.actionsFor(e).forEach((a) => a.label); te(e, !0); }, id);
    await W(1200); await clear(); await W(800);
  }
  // the shop: everything bought, twice
  await p.evaluate(() => { Kt.acorns = 99; const s = z.list.find((q) => q.id === 'gshop'); s && s.run(); });
  await W(500);
  await p.evaluate(() => { try { for (let k = 0; k < 2; k++) r.forEach((t) => { try { ne.buy(t); } catch (e) {} }); } catch (e) {} });
  await W(500); await clear();
  for (const k of ['KeyE', 'KeyF', 'KeyG', 'KeyQ', 'Space', 'Enter', 'Escape', 'Tab', 'KeyA', 'KeyD', 'KeyS', 'KeyW']) { await p.keyboard.down(k); await W(250); await p.keyboard.up(k); await W(250); await clear(); }
  // a drag to look, then clicks near two corners
  await p.mouse.move(cx, cy); await p.mouse.down(); await p.mouse.move(cx + 160, cy - 60, { steps: 8 }); await p.mouse.up();
  await p.mouse.click(vp.width - 80, 60); await W(300); await p.mouse.click(60, 60); await W(300); await clear();
  // resized, then hidden and shown
  await p.setViewportSize({ width: 700, height: 900 }); await W(800); await p.setViewportSize(vp); await W(800);
  await p.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
  await W(1000);
  await p.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange')); });
  await W(1500);
  await p.evaluate(() => JGP.ufoNow && JGP.ufoNow()); await W(20000);
};
