// Screenshots a standalone canvas page (used for the stained-glass window paintings): opens it from file:// with every
// other request blocked, at VW×VH (default 384×1024), waits 0.5 s, takes a full-page screenshot and prints any errors
// or `ok`. The page path must be absolute.
//   node canvas_shot.js </abs/path/page.html> <out.png>
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +(process.env.VW||384), height: +(process.env.VH||1024) } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type()==='error' && errs.push(m.text()));
  await p.route('**/*', r => r.request().url().startsWith('file://') ? r.continue() : r.abort());
  await p.goto('file://' + process.argv[2]); await p.waitForTimeout(500);
  await p.screenshot({ path: process.argv[3], fullPage: true }); console.log(errs.join('\n') || 'ok'); await b.close();
})();
