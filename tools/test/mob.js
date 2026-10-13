// Loads the page as a Pixel 7 in Chrome (Playwright's device profile; the owner's rule: Android phones in Chrome are the
// only phones the game runs on; SwiftShader WebGL), waits WAIT ms (default 6000), runs
// the scene script with (page, <out.png>), always screenshots to <out.png> (there is no NOSHOT here), then prints up
// to 25 console lines and page errors. EXTRA adds browser flags, space-separated.
//   node mob.js <url> <out.png> [scene.js]
const { chromium, devices } = require('playwright');
(async () => {
  const url = process.argv[2], out = process.argv[3], script = process.argv[4];
  const extra = (process.env.EXTRA || '').split(' ').filter(Boolean);
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', ...extra] });
  const ctx = await b.newContext({ ...devices['Pixel 7'] });
  const p = await ctx.newPage();
  const logs = [];
  p.on('console', (m) => logs.push(m.type() + ': ' + m.text().slice(0, 300)));
  p.on('pageerror', (e) => logs.push('PAGEERROR: ' + e.message));
  await p.goto(url);
  await p.waitForTimeout(+process.env.WAIT || 6000);
  if (script) await require(require('path').resolve(script))(p, out);
  await p.screenshot({ path: out });
  console.log(logs.filter((l) => !/AudioContext|NPOT|suppressed/.test(l)).slice(0, 25).join('\n'));
  await b.close();
})();
