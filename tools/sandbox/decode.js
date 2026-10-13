// Decodes a packed page (an upload, or a packed build of the game) inside the browser sandbox: every network
// request is blocked, nothing is rendered, and the page its loader would document.write() is saved (30 s timeout).
// Uploaded files are untrusted: open them only this way, or with run.js.
//   node sandbox/decode.js <packed.html> <decoded.html>   (from tools/)
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const html = fs.readFileSync(process.argv[2], 'utf8');
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.route('**/*', (r) => r.request().url().startsWith('http://decode.local/') ? r.fulfill({ status: 200, contentType: 'text/html', body: html }) : r.abort());
  await p.addInitScript(() => { const orig = document.write.bind(document); document.write = (t) => { window.__decoded = t; }; document.open = () => {}; document.close = () => {}; });
  await p.goto('http://decode.local/');
  await p.waitForFunction(() => typeof window.__decoded === 'string', null, { timeout: 30000 });
  fs.writeFileSync(process.argv[3], await p.evaluate(() => window.__decoded));
  await b.close();
})();
