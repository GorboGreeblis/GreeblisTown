// The browser setup the Node runners share: headless Chromium with SwiftShader WebGL, a desktop or a phone context,
// and the page's console captured with the browser's own noise filtered out.
// Env: none (the callers read MOBILE, VW, VH and EXTRA and pass them in).
// Output: none (a module).
//   const { launch, contextOptions, capture, clean, isMobile } = require('./browser.js');
const { chromium, devices } = require('playwright');

const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
// (console lines that are never the game's: the autoplay notice, three.js's NPOT texture notes and the page's
// console-throttle summaries)
const NOISE = /AudioContext|NPOT|suppressed/;

const launch = (extra = []) => chromium.launch({ args: [...ARGS, ...extra] });
// MOBILE=1 (any value but 0) selects the phone context
const isMobile = () => !!process.env.MOBILE && process.env.MOBILE !== '0';
// a Pixel 7 in Chrome (Playwright's device profile: the only phone class the game supports), or a desktop viewport
const contextOptions = (mobile, width = 1280, height = 720) => (mobile ? { ...devices['Pixel 7'] } : { viewport: { width, height } });
// every console line (cut to `max` characters) and every page error, in order
const capture = (page, max = 400) => {
  const logs = [];
  page.on('console', (m) => logs.push(m.type() + ': ' + m.text().slice(0, max)));
  page.on('pageerror', (e) => logs.push('PAGEERROR: ' + e.message));
  return logs;
};
const clean = (logs) => logs.filter((l) => !NOISE.test(l));

module.exports = { ARGS, NOISE, launch, isMobile, contextOptions, capture, clean };
