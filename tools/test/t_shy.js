// ZOLLOD's shyness sub-quest, played through: before the book ZOLLOD has one Talk ("…/…/I'm shy…"), no Blossom, no
// shop, and he neither visits nor is visited; OVERCOMING SHYNESS is taken from its Library shelf by clicking it on
// screen (as a player points at it: a click, or a tap on a phone, goes the same way), leaves the shelf and says so;
// the first Talk with it frees him ("…/That book…/Let me see../Wow I'm free from shyness!"), after which talking to
// him opens the shop and he visits. Also MAMA GORBO's and GEMTOE's fourth Talk lines. Prints each step.
//   NOSHOT=1 node shot2.js <url> x.png ./t_shy.js
module.exports = async (p, out) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  // (every page of what opens, as typed out)
  const pages = async () => {
    const r = [];
    for (let i = 0; i < 12 && (await p.evaluate(() => qt.isOpen)); i++) {
      let a = null;
      for (let k = 0; k < 40; k++) { const b = await p.evaluate(() => document.getElementById('dlgText').textContent); if (b === a) break; a = b; await W(200); }
      r.push(a), await p.evaluate(() => { try { qt.advance(); } catch (e) {} }), await W(300);
    }
    return r;
  };
  const zol = () => p.evaluate(() => { const e = It.all.find((q) => q.def.__type === 'cutebex'); At.position.set(e.group.position.x, 0, e.group.position.z + 2.4); xe.scan(); return { target: xe.current === e, actions: xe.actions.map((a) => a.label) }; });
  await p.evaluate(() => (Kt.blossoms = 2));
  log('Zollod before (a Blossom in hand):', JSON.stringify(await zol()));
  await p.evaluate(() => xe.run('interact')); await W(300);
  // (the counter's own Shop prompt must not be offered past him while he is shy)
  log('  says:', JSON.stringify(await pages()), '| shop open:', await p.evaluate(() => jt.has('panel')), '| counter prompt:', await p.evaluate(() => z.list.find((q) => q.id === 'gshop').label()));
  // (a visit asked of him, either way round, never starts)
  await p.evaluate(() => JGP.visitAt(Re.t, 'cutebex', 'm_kingdino'));
  { const t0 = await p.evaluate(() => Re.t); for (let k = 0; k < 200 && (await p.evaluate(() => Re.t)) - t0 < 6; k++) await W(250); }
  log('  visits with him (asked for one):', JSON.stringify(await p.evaluate(() => JGP.visits().all.filter((q) => q.v === 'cutebex' || q.h === 'cutebex'))));
  // ---- the book: the player before its shelf, the camera turned to it, and a click where its cover shows on
  // screen (the pointer pick is the same path a phone tap takes)
  const at = await p.evaluate(() => {
    const s = z.list.find((q) => q.id === 'shybook'), bk = s.pickObj[0], v = new THREE.Vector3();
    bk.getWorldPosition(v);
    const n = new THREE.Vector3(0, 0, 1).applyQuaternion(bk.getWorldQuaternion(new THREE.Quaternion())); n.y = 0, n.normalize();
    At.position.set(v.x + 1.7 * n.x, 0, v.z + 1.7 * n.z);
    return { label: s.label(), book: [v.x + 0.05 * n.x, v.y, v.z + 0.05 * n.z], n: [n.x, n.z] };
  });
  // (the camera zoomed in and dragged round, as a player would, until the cover shows on screen)
  await p.mouse.move(640, 300), await p.mouse.wheel(0, -1200), await W(400);
  let scr = null;
  for (let k = 0; k < 10 && !scr; k++) {
    scr = await p.evaluate(([x, y, bz]) => {
      const s = new THREE.Vector3(x, y, bz).applyMatrix4(B.matrixWorldInverse).applyMatrix4(B.projectionMatrix);
      return Math.abs(s.x) < 0.85 && Math.abs(s.y) < 0.85 && s.z < 1 ? [((s.x + 1) / 2) * innerWidth, ((1 - s.y) / 2) * innerHeight] : null;
    }, at.book);
    if (!scr) {
      await p.mouse.move(640, 300), await p.mouse.down(), await p.mouse.move(520, 300, { steps: 6 }), await p.mouse.up();
      await W(400);
    }
  }
  log('book:', at.label, '| on screen at', scr && scr.map((q) => Math.round(q)));
  await p.mouse.click(scr[0], scr[1]); await W(600);
  // (the click opens the action menu on the book; F runs its first option, as TALK does on a phone)
  (await p.evaluate(() => Kt.shyBook)) || (await p.keyboard.press('KeyF'), await W(600));
  log('  clicked and took it:', await p.evaluate(() => Kt.shyBook));
  log('  then:', JSON.stringify(await pages()), '| in inventory', await p.evaluate(() => Kt.shyBook), '| on the shelf', await p.evaluate(() => z.list.find((q) => q.id === 'shybook').pickObj[0].visible), '| still offered', await p.evaluate(() => z.list.find((q) => q.id === 'shybook').label()));
  // ---- ZOLLOD with the book
  log('Zollod with the book:', JSON.stringify(await zol()));
  await p.evaluate(() => xe.run('interact')); await W(300);
  log('  says:', JSON.stringify(await pages()), '| freed', await p.evaluate(() => Kt.shyFree));
  log('Zollod after:', JSON.stringify(await zol()));
  await p.evaluate(() => xe.run('interact')); await W(500);
  log('  shop open:', await p.evaluate(() => jt.has('panel')), '| counter prompt:', await p.evaluate(() => z.list.find((q) => q.id === 'gshop').label()));
  await p.evaluate(() => { try { _t.close(); } catch (e) {} });
  // ---- the fourth lines
  for (const id of ['p_mamagorbo', 'p_gemtoe']) {
    await p.evaluate((id) => { Kt.talkState[id] = 3; te(It.byId[id]); }, id); await W(300);
    log(id, 'fourth Talk:', JSON.stringify(await pages()));
  }
  log('err', await p.evaluate(() => Re.errors));
};
