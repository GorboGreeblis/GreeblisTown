// ZOLLOD: his shyness sub-quest played through, and, once freed, his shop opened wherever he is (out visiting,
// walking home, being visited). Run at a small viewport; the shyness part walks to the book.
// Env: PART=shyness,away (only those parts).
// Output: `== part: <name>` and each part's lines (below), each part ending in `err <n>`.
//   NOSHOT=1 node test/shot.js <url> x.png test/t_zollod.js
const { log, start, waitGame, logErrors } = require('./lib.js');

// ZOLLOD's shyness sub-quest, played through: before the book ZOLLOD has one Talk ("…/…/I'm shy…"), no Blossom, no
// shop, and he neither visits nor is visited; OVERCOMING SHYNESS is taken by walking in front of its Library shelf, leaves the shelf and says so;
// the first Talk with it frees him ("…/That book…/Let me see../Wow I'm free from shyness!"), after which talking to
// him opens the shop and he visits. Also MAMA GORBO's and GEMTOE's fourth Talk lines. Prints each step.
const shyness = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
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
  await waitGame(p, 6, null, { max: 200 });
  log('  visits with him (asked for one):', JSON.stringify(await p.evaluate(() => JGP.visits().all.filter((q) => q.v === 'cutebex' || q.h === 'cutebex'))));
  // Walk to the front of the shelf: ordinary pickups use proximity on every platform.
  const at = await p.evaluate(() => {
    const s = z.list.find(q => q.id === 'shybook'), bk = s.pickObj[0], v = bk.getWorldPosition(new THREE.Vector3());
    const n = new THREE.Vector3(0,0,1).transformDirection(bk.matrixWorld); n.y=0; n.normalize();
    At.position.set(v.x+n.x,0,v.z+n.z); return s.label();
  });
  await W(700);
  require('node:assert/strict').equal(await p.evaluate(() => Kt.shyBook), true);
  log('book:', at, '| taken by walking:', await p.evaluate(() => Kt.shyBook));
  log('  then:', JSON.stringify(await pages()), '| on shelf:', await p.evaluate(() => z.list.find(q => q.id === 'shybook').pickObj[0].visible));
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
  await logErrors(p);
};

// ZOLLOD out of his kiosk: before OVERCOMING SHYNESS frees him he never visits and is never visited; once freed, a
// Talk with him wherever he is (out visiting, being visited, walking home) opens the Shop, and the Shop's outfits
// (the mirror's "Change out") work from there. Prints the visits asked of him while shy, then per place where he is,
// his menu and whether the shop opened.
const away = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  // still shy: a visit asked for by name must not start
  await p.evaluate(() => { window.__gbNoThrottle = 1; Kt.shyFree = !1; JGP.visitAt(9e15); JGP.visitAt(9e15, 'cutebex', 'p_mamagorbo'); });
  await waitGame(p, 4);
  log('shy, asked to visit:', await p.evaluate(() => JSON.stringify(JGP.visits().all)));
  await p.evaluate(() => { JGP.visitAt(9e15, 'p_mamagorbo', 'cutebex'); });
  await waitGame(p, 4);
  log('shy, asked to be visited:', await p.evaluate(() => JSON.stringify(JGP.visits().all)));
  // freed: out on a visit, talk to him where he is
  const talkAt = async (label) => {
    const r = await p.evaluate(() => {
      const e = It.all.find((q) => q.def && q.def.__type === 'cutebex'), g = e.group.position;
      At.position.set(g.x + 1.4, 0, g.z + 1.4); xe.scan();
      const opts = xe.actions.map((a) => a.label), t = xe.actions.find((a) => a.verb === 'interact' && a.label === shopText.label);
      t && t.run();
      return { at: [+g.x.toFixed(1), +g.z.toFixed(1)], opts };
    });
    await W(500);
    const shop = await p.evaluate(() => jt.has('panel') && 'shop' === _t.kind);
    log(label + ':', JSON.stringify(r), '| shop open', shop);
    await p.evaluate(() => { try { _t.close(); } catch (e) {} At.position.set(0, 0, 2); });
  };
  await p.evaluate(() => { Kt.shyFree = !0; Kt.acorns = 50; JGP.visitAt(9e15, 'cutebex', 'p_mamagorbo'); });
  await waitGame(p, 60, () => { const q = JGP.visits().all.find((q) => q.v === 'cutebex'); return !!q && q.stage === 'out' && q.gap < 12; });
  await talkAt('freed, out visiting');
  await waitGame(p, 90, () => { const q = JGP.visits().all.find((q) => q.v === 'cutebex'); return !!q && q.stage === 'back'; });
  await talkAt('freed, walking home');
  await waitGame(p, 150, () => !JGP.visits().all.some((q) => q.v === 'cutebex' || q.h === 'cutebex'));
  await p.evaluate(() => { JGP.visitAt(9e15, 'p_mamagorbo', 'cutebex'); });
  await waitGame(p, 90, () => { const q = JGP.visits().all.find((q) => q.h === 'cutebex'); return !!q && q.stage === 'meet'; });
  await talkAt('freed, being visited');
  await logErrors(p);
};

module.exports = require('./parts.js')({ shyness, away });
