// node px.js <url> <outprefix>: renders fixed views with seeded randomness (for comparing two builds)
const { chromium } = require('playwright');
(async () => {
  const [url, pre] = process.argv.slice(2);
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 640, height: 480 } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 200)));
  await p.addInitScript(() => { let s = 12345; Math.random = () => ((s = (16807 * s) % 2147483647) / 2147483647); });
  await p.goto(url); await p.waitForTimeout(6000); await p.mouse.click(320, 40); await p.waitForTimeout(1500);
  const V = [[[0, 12, 30], [0, 0, 0]], [[-20, 4, 10], [-34, 1, 5]], [[20, 3, -12], [26, 1, -24]], [[0, 3, 30], [0, 3, 48]], [[30, 3, 0], [34, 1.5, 10]], [[-10, 30, -10], [0, 0, 0]], [[0, 1.6, -20], [-24, 2, -24]]];
  const imgs = await p.evaluate((V) => {
    const out = [], cam = new THREE.PerspectiveCamera(60, 4 / 3, 0.1, 300);
    O.setSize(640, 480, false);
    for (const [a, l] of V) { cam.position.set(...a); cam.lookAt(...l); O.render(C, cam); out.push(O.domElement.toDataURL('image/png')); }
    return out;
  }, V);
  imgs.forEach((d, i) => require('fs').writeFileSync(pre + i + '.png', Buffer.from(d.split(',')[1], 'base64')));
  console.log('errors', errs.length, errs.slice(0, 5).join(' | '), 'game', await p.evaluate(() => Re.errors));
  await b.close();
})();
