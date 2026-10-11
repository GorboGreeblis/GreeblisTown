// The plant test row and the plant kinds: the five plants stand along the east side (where the old
// line-up stood), each Talk option opens a line saying which plant it is, and nothing is planted in the
// row's footprint. Renders the row (<out>_row.png) and each plant close up (<out>_plant1..5.png), and,
// with EVENT=1, runs a Garden Event and reports how many plants of each kind came up.
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(640, 360); await W(1500);
  // talk to each one
  for (let k = 1; k <= 5; k++) {
    const at = await p.evaluate((k) => {
      const s = z.list.find((q) => q.id === 'plant' + k);
      if (!s) return 'missing';
      At.position.set(s.x - 1.8, 0, s.z); s.run();
      return `at (${s.x.toFixed(1)}, ${s.z.toFixed(1)}) label "${s.label()}"`;
    }, k);
    await W(1500);
    const said = await p.evaluate(() => {
      const txt = document.getElementById('dlgName').textContent + ': ' + document.getElementById('dlgText').textContent, open = qt.isOpen;
      for (let i = 0; i < 10 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {}
      return `dialogue open ${open} says ${txt || '?'}`;
    });
    log('plant', k, at, said);
  }
  const shot = (name, cam, look) => p.evaluate(([cam, look]) => {
    const c = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 300); c.position.set(...cam); c.lookAt(...look);
    O.setSize(800, 600, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }, [cam, look]).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  await p.evaluate(() => At.position.set(0, 0, 40)); await W(500);
  await shot('row', [29.5, 1.8, -17], [34, 0.8, 0]);
  for (let k = 1; k <= 5; k++) {
    const s = await p.evaluate((k) => { const q = z.list.find((q) => q.id === 'plant' + k); return [q.x, q.z]; }, k);
    await shot('plant' + k, [s[0] - 3.4, 1.4, s[1] + 1.0], [s[0], 1.1, s[1]]);
  }
  if (process.env.EVENT) {
    await p.evaluate(() => { Kt.rewards.seeds = !0; At.position.set(0, 0, 3); z.list.find((s) => s.id === 'campfire').run(); oe.yes(); });
    for (let k = 0; k < 4000; k++) { await W(1000); const r = await p.evaluate(() => me.active); if (!r && k > 20) break; }
    log('Event plants by kind:', await p.evaluate(() => JSON.stringify(JGP.garden.plants.reduce((a, q) => ((a[q.kind + 1] = (a[q.kind + 1] || 0) + 1), a), {}))));
    await shot('garden', [0, 9, 17], [0, 0, 4]);
  }
  log('err', await p.evaluate(() => Re.errors));
};
