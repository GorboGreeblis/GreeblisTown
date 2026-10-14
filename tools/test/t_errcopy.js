// The test modes' error tools: one error thrown into a frame callback, then the desktop counter (bottom left) showing
// it and its "copy errors" button copying the text (or, where the page may not write to the clipboard, opening a box
// with the text selected). In the mobile test mode (the page opened with ?mobile=1, in a phone context) the mobile
// panel's button is used instead.
// Env: none (the mode follows the page: window.__jgpMobile).
// Output: `desktop counter: <text>` or `mobile panel: <text>`, then `copied:` and the copied text.
//   NOSHOT=1 node test/shot.js <url> x.png test/t_errcopy.js
//   MOBILE=1 NOSHOT=1 node test/shot.js "<url>?mobile=1" x.png test/t_errcopy.js
const { start } = require('./lib.js');

module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), mob = await p.evaluate(() => !!window.__jgpMobile);
  mob ? await p.touchscreen.tap(200, 400) : await start(p, 0);
  await W(2000);
  // (the clipboard in a headless page: kept in the page for the check)
  await p.evaluate(() => { window.__clip = null; try { navigator.clipboard.writeText = (t) => ((window.__clip = t), Promise.resolve()); } catch (e) {} });
  await p.evaluate(() => { let n = 0; L.push(() => { n++ < 3 && JGP.no.such.thing; }); });
  await W(1500);
  if (mob) {
    // (the panel opens with a tap, and has the button)
    await p.evaluate(() => document.getElementById('jgpDiag').click()); await W(1300);
    console.log('mobile panel:', await p.evaluate(() => document.getElementById('jgpDiag').textContent.replace(/\s+/g, ' ')));
    await p.evaluate(() => document.querySelector('#jgpDiag [data-act="copy"]').click());
  } else {
    console.log('desktop counter:', await p.evaluate(() => (document.getElementById('jgpDeskErr') || {}).textContent));
    await p.evaluate(() => document.querySelector('#jgpDeskErr button').click());
  }
  await W(500);
  console.log('copied:\n' + (await p.evaluate(() => window.__clip || (document.getElementById('jgpErrCopy') || {}).value || '(nothing)')));
};
