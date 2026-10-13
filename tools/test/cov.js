// Records precise JS coverage (call counts) over a whole play session made of test modules run in turn.
// node cov.js <url> <out.json> mod1.js mod2.js ...   (MOBILE=1 for a Pixel 7 Chrome context)
const { chromium, devices } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const [url, out, ...mods] = process.argv.slice(2);
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext(process.env.MOBILE ? { ...devices['Pixel 7'] } : { viewport: { width: 1280, height: 720 } });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Profiler.enable'); await cdp.send('Profiler.startPreciseCoverage', { callCount: true, detailed: true });
  const logs = [];
  p.on('console', (m) => /error/.test(m.type()) && logs.push(m.text().slice(0, 200)));
  p.on('pageerror', (e) => logs.push('PAGEERROR ' + e.message));
  await p.goto(url); await p.waitForTimeout(6000);
  for (const m of mods) {
    const t0 = Date.now();
    try { await Promise.race([require(path.resolve(m))(p, path.resolve('x_' + path.basename(m, '.js') + '.png')), new Promise((_, r) => setTimeout(() => r(new Error('timeout')), +(process.env.MODT || 600000)))]); }
    catch (e) { console.log('MODULE ' + m + ' threw ' + e.message.slice(0, 200)); }
    try { await p.evaluate(() => { try { _t.close(); } catch (e) {} for (let i = 0; i < 30 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} }); } catch (e) {}
    console.log('done', m, ((Date.now() - t0) / 1000).toFixed(0) + 's', 'errors', await p.evaluate(() => Re.errors).catch(() => '?'));
  }
  const { result } = await cdp.send('Profiler.takePreciseCoverage');
  fs.writeFileSync(out, JSON.stringify(result.filter((r) => /index\.html/.test(r.url))));
  console.log('console errors:', logs.slice(0, 20).join('\n'));
  await b.close();
})();
