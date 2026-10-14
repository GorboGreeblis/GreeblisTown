// The game as an ordinal: the page file is served from memory as ordinals.com shows an HTML inscription, inside
// <iframe sandbox="allow-scripts" src="/preview/<id>"> with ord's Content-Security-Policy; every other request is
// blocked and listed. Accepts the readable or the packed page. A pass shows every creature, 0 errors, a WebGL
// context, the `playing` screen and `blocked: []`.
// Env: MOBILE=1 (a Pixel 7 in Chrome instead of a 1280×720 desktop).
// Output: a JSON line `{origin, ents, errors, t, gl, top}` (t: game time, s), `blocked: [...]`, `page errors: [...]`
//   (page errors and console errors, the first 8); a screenshot to <out.png>.
//   node test/ordtest.js <index.html> <out.png>
const fs = require('fs');
const { launch, isMobile, contextOptions } = require('./browser.js');

(async () => {
  const html = fs.readFileSync(process.argv[2], 'utf8'), out = process.argv[3];
  const b = await launch();
  const ctx = await b.newContext(contextOptions(isMobile()));
  const p = await ctx.newPage(), blocked = [], errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => /error/i.test(m.type()) && errs.push(m.text().slice(0, 200)));
  const CSP = "default-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob:";
  await p.route('**/*', (r) => {
    const u = r.request().url();
    if (u === 'https://ordinals.test/inscription/abc') return r.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><html><body style="margin:0;background:#000"><iframe id="f" sandbox="allow-scripts" scrolling="no" src="/preview/abc" style="border:0;width:100vw;height:100vh"></iframe></body></html>' });
    if (u === 'https://ordinals.test/preview/abc') return r.fulfill({ status: 200, contentType: 'text/html;charset=utf-8', headers: { 'content-security-policy': CSP }, body: html });
    blocked.push(u), r.abort();
  });
  await p.goto('https://ordinals.test/inscription/abc');
  await p.waitForTimeout(12000);
  const vp = p.viewportSize();
  await p.mouse.click(vp.width / 2, vp.height / 2), await p.waitForTimeout(5000);
  const fr = p.frames().find((f) => f.url().endsWith('/preview/abc'));
  const info = await fr.evaluate(() => JSON.stringify({ origin: location.origin, ents: It.all.length, errors: Re.errors, t: +Re.t.toFixed(1), gl: !!O.getContext(), top: jt.top }));
  await p.screenshot({ path: out });
  console.log(info), console.log('blocked:', JSON.stringify(blocked)), console.log('page errors:', JSON.stringify(errs.slice(0, 8)));
  await b.close();
})();
