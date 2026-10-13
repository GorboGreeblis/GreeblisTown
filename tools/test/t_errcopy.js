// The test modes' error tools: throws one error into a frame callback, then checks the desktop counter (bottom left)
// shows it and its "copy errors" button copies (or, where the page may not write to the clipboard, opens a box with
// the text selected), and prints the copied text. With MOB=1 the page is opened with ?mobile=1 by the caller and the
// mobile panel's button is used instead.
//   NOSHOT=1 node shot.js <url> x.png ./t_errcopy.js        (desktop)
//   node mob.js "<url>?mobile=1" x.png ./t_errcopy.js        (mobile)
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), mob = await p.evaluate(() => !!window.__jgpMobile);
  mob ? await p.touchscreen.tap(200, 400) : await p.mouse.click(100, 60);
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
