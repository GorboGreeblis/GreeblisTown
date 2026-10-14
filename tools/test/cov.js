// Precise JS coverage (call counts) of index.html over one play session made of scene scripts run in turn, each with
// a time limit, the dialogues and panels closed between them.
// Env: MOBILE=1 (a Pixel 7 in Chrome instead of a 1280×720 desktop); MODT (ms each scene may take, default 600000).
// Output: per scene `done <scene> <s>s errors <n>` (or `MODULE <scene> threw …`), then the first 20 console errors;
//   the coverage of the page's scripts to <out.json> (uncov.js and three/prune3.js read it). Each scene's own output
//   file is x_<scene>.png in the current folder.
//   node test/cov.js <url> cov_d.json test/cov_extra.js test/talk.js …
const path = require('path'), fs = require('fs');
const { launch, isMobile, contextOptions } = require('./browser.js');

(async () => {
  const [url, out, ...mods] = process.argv.slice(2);
  const b = await launch(['--autoplay-policy=no-user-gesture-required']);
  const ctx = await b.newContext(contextOptions(isMobile()));
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
  await cdp.send('Profiler.stopPreciseCoverage'); await cdp.detach();
  fs.writeFileSync(out, JSON.stringify(result.filter((r) => /index\.html/.test(r.url))));
  console.log('console errors:', logs.slice(0, 20).join('\n'));
  await b.close();
})();
