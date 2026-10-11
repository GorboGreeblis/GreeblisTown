// Run an uploaded (decoded) game inside the sandbox: all network aborted, page served from memory.
// argv: decodedHtml, evalScriptFile(js expression returning JSON-able), [screenshot]
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const html = fs.readFileSync(process.argv[2], 'utf8');
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const logs = [];
  p.on('pageerror', (e) => logs.push('PAGEERROR ' + e.message));
  await p.route('**/*', (r) => (r.request().url().startsWith('http://sandbox.local/') ? r.fulfill({ status: 200, contentType: 'text/html', body: html }) : r.abort()));
  if (process.env.HARNESS) await p.addInitScript(() => { window.__gbHarness = 1; });
  await p.goto('http://sandbox.local/');
  await p.waitForTimeout(+process.env.WAIT || 8000);
  if (process.env.CLICK) { await p.mouse.click(640, 360); await p.keyboard.press('KeyW'); await p.waitForTimeout(4000); }
  if (process.env.MOD) { await require(require('path').resolve(process.env.MOD))(p, process.argv[4]); console.log(logs.slice(0, 10).join('\n')); await b.close(); return; }
  const expr = fs.readFileSync(process.argv[3], 'utf8');
  const res = await p.evaluate(expr);
  console.log(typeof res === 'string' ? res : JSON.stringify(res, null, 1));
  if (process.argv[4]) await p.screenshot({ path: process.argv[4] });
  console.log(logs.slice(0, 10).join('\n'));
  await b.close();
})();
