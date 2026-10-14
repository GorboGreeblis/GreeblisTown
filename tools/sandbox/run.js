// Runs a decoded page inside the sandbox (served from memory, every network request blocked, SwiftShader WebGL at
// 1280×720): waits, then evaluates the expression in <expr.js> and prints the result, or runs a scene script instead.
// Env: WAIT (ms, default 8000); CLICK=1 (starts the game and walks first); MOD=<scene.js> (runs that scene with
//   (page, <shot.png>) instead; <expr.js> is then not read); HARNESS=1 (sets window.__gbHarness: the game treats the
//   browser as a Quest).
// Output: the expression's value (a string as is, else JSON), then the first 10 PAGEERROR lines; a screenshot to
//   <shot.png> when given.
//   node sandbox/run.js <decoded.html> <expr.js> [shot.png]
const fs = require('fs'), path = require('path');
const { launch, contextOptions } = require('../test/browser.js');

(async () => {
  const html = fs.readFileSync(process.argv[2], 'utf8'), env = process.env;
  const b = await launch();
  const p = await (await b.newContext(contextOptions(false))).newPage();
  const logs = [];
  p.on('pageerror', (e) => logs.push('PAGEERROR ' + e.message));
  await p.route('**/*', (r) => (r.request().url().startsWith('http://sandbox.local/') ? r.fulfill({ status: 200, contentType: 'text/html', body: html }) : r.abort()));
  if (env.HARNESS) await p.addInitScript(() => { window.__gbHarness = 1; });
  await p.goto('http://sandbox.local/');
  await p.waitForTimeout(+env.WAIT || 8000);
  if (env.CLICK) { const v = p.viewportSize(); await p.mouse.click(v.width / 2, v.height / 2); await p.keyboard.press('KeyW'); await p.waitForTimeout(4000); }
  if (env.MOD) {
    await require(path.resolve(env.MOD))(p, process.argv[4]);
  } else {
    const res = await p.evaluate(fs.readFileSync(process.argv[3], 'utf8'));
    console.log(typeof res === 'string' ? res : JSON.stringify(res, null, 1));
    if (process.argv[4]) await p.screenshot({ path: process.argv[4] });
  }
  console.log(logs.slice(0, 10).join('\n'));
  await b.close();
})();
