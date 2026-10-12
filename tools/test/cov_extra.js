// Pokes everything a player can reach that the other modules don't: every station, every Blossom gift,
// every shop item, the keys, resizing, hiding the page.
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  const clear = () => p.evaluate(() => { for (let i = 0; i < 30 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} try { _t.close(); } catch (e) {} });
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1000);
  const ids = await p.evaluate(() => z.list.map((s) => s.id));
  console.log('stations', ids.join(','));
  for (const id of ids) {
    await p.evaluate((id) => { const s = z.list.find((q) => q.id === id); At.position.set(s.x || 0, 0, (s.z || 0) + 0.6); try { s.label && s.label(); } catch (e) {} try { s.run(); } catch (e) { console.error('station ' + id + ' ' + e.message); } }, id);
    await W(1500);
    // press through any panel options
    await p.evaluate(() => { try { const it = (_t.state && _t.state.items) || []; it.slice(0, 3).forEach((i) => { try { i.onClick && i.onClick(); } catch (e) {} }); } catch (e) {} });
    await W(800); await clear(); await W(300);
  }
  // every creature: talk, then a Blossom
  const ents = await p.evaluate(() => It.all.length);
  for (let id = 0; id < ents; id++) {
    await p.evaluate((id) => { Kt.blossoms = 5; const e = It.all[id]; if (!e) return; At.position.set(e.group.position.x + 1.5, 0, e.group.position.z + 1.5); xe.actionsFor(e).forEach((a) => a.label); te(e, !0); }, id);
    await W(1200); await clear(); await W(800);
  }
  // the shop: buy everything, twice
  await p.evaluate(() => { Kt.acorns = 99; const s = z.list.find((q) => q.id === 'gshop'); s && s.run(); });
  await W(500);
  await p.evaluate(() => { try { for (let k = 0; k < 2; k++) r.forEach((t) => { try { ne.buy(t); } catch (e) {} }); } catch (e) {} });
  await W(500); await clear();
  // keys
  for (const k of ['KeyE', 'KeyF', 'KeyG', 'KeyQ', 'Space', 'Enter', 'Escape', 'Tab', 'KeyA', 'KeyD', 'KeyS', 'KeyW']) { await p.keyboard.down(k); await W(250); await p.keyboard.up(k); await W(250); await clear(); }
  // drag to look
  await p.mouse.move(640, 360); await p.mouse.down(); await p.mouse.move(800, 300, { steps: 8 }); await p.mouse.up();
  await p.mouse.click(1200, 60); await W(300); await p.mouse.click(60, 60); await W(300); await clear();
  // resize and hide/show
  await p.setViewportSize({ width: 700, height: 900 }); await W(800); await p.setViewportSize({ width: 1280, height: 720 }); await W(800);
  await p.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
  await W(1000);
  await p.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange')); });
  await W(1500);
  // a long idle so timers (UFO, ambient sounds, day/night) run
  await p.evaluate(() => JGP.ufoNow && JGP.ufoNow()); await W(20000);
};
