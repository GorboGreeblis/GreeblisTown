// The mobile test mode's taps (it has no NEXT or CLOSE buttons, the owner's request): a tap on the screen moves a
// dialogue on page by page and closes it after the last; a tap off the action menu or a panel (the shop) closes it.
// The taps are real touches on the page, away from the joystick and the TALK and GIVE buttons.
// Env: none (a phone context with the page opened with ?mobile=1).
// Output: `buttons: …`, `dialogue pages seen: […] | closed: <bool>`, the action menu and the shop panel before and
//   after a tap off them, then `err <n>`.
//   MOBILE=1 NOSHOT=1 node test/shot.js '<url>?mobile=1' x.png test/t_taps.js
const { log, logErrors } = require('./lib.js');

module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  const vp = p.viewportSize(), tap = async (x, y) => (await p.touchscreen.tap(x, y), W(500));
  // (a spot in the open sky, upper middle, clear of every control)
  const sky = [vp.width * 0.5, vp.height * 0.3];
  await tap(vp.width / 2, vp.height / 2); await W(1500);
  log('buttons:', await p.evaluate(() => [...document.querySelectorAll('#jgpTouch button[data-k]')].map((b) => b.dataset.k).join(' ')));
  // ---- a three-page dialogue, tapped through
  await p.evaluate(() => qt.open('ZOLLOD', M.orange, 'one|two|three'));
  const pages = [];
  for (let k = 0; k < 6 && (await p.evaluate(() => qt.isOpen)); k++) {
    await W(1400); // (each page typed out first: a tap mid-typing only finishes the line)
    pages.push(await p.evaluate(() => document.getElementById('dlgText').textContent));
    await tap(...sky);
  }
  log('dialogue pages seen:', JSON.stringify(pages), '| closed:', !(await p.evaluate(() => qt.isOpen)));
  // ---- the action menu: a Blossom in hand gives a creature two options (Talk, Give), so a tap on it opens the
  // menu; then a tap off it
  const scr = await p.evaluate(() => {
    Kt.blossoms = Math.max(1, Kt.blossoms);
    const e = It.all.find((q) => q.def && q.def.__type === 'drifter') || It.all[0], q = e.group.position;
    At.position.set(q.x, 0, q.z + 3.2), (At.rotation.y = Math.PI);
    return [q.x, q.y + 0.6 * (e.height || 2), q.z];
  });
  await W(1500);
  const at = await p.evaluate(([x, y, z]) => { const s = new THREE.Vector3(x, y, z).applyMatrix4(B.matrixWorldInverse).applyMatrix4(B.projectionMatrix); return Math.abs(s.x) < 0.9 && Math.abs(s.y) < 0.9 && s.z < 1 ? [((s.x + 1) / 2) * innerWidth, ((1 - s.y) / 2) * innerHeight] : null; }, scr);
  if (at) await tap(...at), await W(400);
  const menu = await p.evaluate(() => __jgpMenu.open());
  await tap(...sky);
  log('action menu opened by a tap on the creature:', menu, at ? '' : '(creature off screen)', '-> after a tap off it:', await p.evaluate(() => __jgpMenu.open()));
  // ---- the shop panel, then a tap off it
  await p.evaluate(() => { Kt.shyFree = !0; ne.open(); });
  await W(800);
  const opened = await p.evaluate(() => jt.has('panel'));
  await tap(vp.width * 0.5, vp.height * 0.6); // (open view below the panel, clear of every control)
  log('shop panel open:', opened, '-> after a tap off it:', await p.evaluate(() => jt.has('panel')));
  await logErrors(p);
};
