// The runner for the probes, renders and audits: loads the page in headless Chromium (SwiftShader WebGL), waits, runs
// the scene script with (page, <out.png>), screenshots to <out.png>, then prints the console log and page errors.
// Env: VW, VH (viewport, px, default 1280×720; ignored with MOBILE=1); MOBILE=1 (a Pixel 7 in Chrome, Playwright's
//   device profile, the only phone class the game supports); WAIT (ms before the scene, default 6000); NOSHOT=1 (no
//   screenshot); HARNESS=1 (sets window.__gbHarness: the game treats the browser as a Quest); EXTRA (extra Chromium
//   flags, space-separated).
// Output: the scene script's lines, then the console log (AudioContext, NPOT and console-throttle lines left out)
//   and PAGEERROR lines; <out.png> unless NOSHOT=1. A scene that throws ends the run with a non-zero exit.
//   NOSHOT=1 node test/shot.js <url> x.png test/boot.js
//   MOBILE=1 node test/shot.js <url> x_mob.png test/t_give.js
const path = require('path');
const { launch, isMobile, contextOptions, capture, clean } = require('./browser.js');

(async () => {
  const [url, out, script] = process.argv.slice(2), env = process.env;
  const b = await launch((env.EXTRA || '').split(' ').filter(Boolean));
  const ctx = await b.newContext(contextOptions(isMobile(), +(env.VW || 1280), +(env.VH || 720)));
  const p = await ctx.newPage(), logs = capture(p);
  if (env.HARNESS) await p.addInitScript(() => { window.__gbHarness = 1; });
  await p.goto(url);
  await p.waitForTimeout(+env.WAIT || 6000);
  if (script) await require(path.resolve(script))(p, out);
  if (!env.NOSHOT) await p.screenshot({ path: out });
  console.log(clean(logs).join('\n'));
  await b.close();
})();
