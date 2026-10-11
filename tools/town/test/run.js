const { chromium } = require('playwright');
(async () => {
  const url = process.argv[2], out = process.argv[3], script = process.argv[4];
  const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: +(process.env.VW||1280), height: +(process.env.VH||720) } });
  const logs = [];
  p.on('console', m => logs.push(m.type() + ': ' + m.text().slice(0, 400)));
  p.on('pageerror', e => logs.push('PAGEERROR: ' + e.message));
  if (process.env.HARNESS) await p.addInitScript(() => { window.__gbHarness = 1; });
  await p.goto(url);
  await p.waitForTimeout(+process.env.WAIT || 6000);
  if (script) { const fn = require(require('path').resolve(script)); await fn(p, out); }
  if (!process.env.NOSHOT) await p.screenshot({ path: out });
  console.log(logs.filter(l=>!/AudioContext|NPOT/.test(l)).join('\n'));
  await b.close();
})();
