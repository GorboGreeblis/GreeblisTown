// Play the game the way ordinals.com shows an HTML inscription: the inscription page embeds
// <iframe sandbox="allow-scripts" src="/preview/<id>">, and content is served with ord's CSP.
// Every other request is blocked and logged.
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const html = fs.readFileSync(process.argv[2], 'utf8'), out = process.argv[3], mobile = process.env.MOBILE;
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await b.newContext(mobile ? { viewport: { width: 412, height: 915 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36' } : { viewport: { width: 1280, height: 720 } });
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
  const info = await fr.evaluate(() => JSON.stringify({ origin: location.origin, ents: It.all.length, errors: Re.errors, frames: Re.frames, gl: !!O.getContext(), top: jt.top }));
  await p.screenshot({ path: out });
  console.log(info), console.log('blocked:', JSON.stringify(blocked)), console.log('page errors:', JSON.stringify(errs.slice(0, 8)));
  await b.close();
})();
