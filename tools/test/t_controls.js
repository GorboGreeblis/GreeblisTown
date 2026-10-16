// Browser controls regression for v0.2; run via shot.js on desktop and MOBILE=1.
// Checks removed shortcuts/zoom, drag rotation, HUD position, mobile dialogue buttons and disabled creature taps.
const assert = require('node:assert/strict');
const { start, log, logErrors } = require('./lib.js');
module.exports = async p => {
  await start(p);
  const mobile = await p.evaluate(() => !!window.__jgpMobile);
  await p.evaluate(() => { const e = It.byId.p_gemtoe; At.position.set(e.group.position.x, 0, e.group.position.z + 2); Kt.blossoms = 2; });
  await p.waitForTimeout(1000);
  const before = await p.evaluate(() => ({ yaw: __jgpDk.yaw, dist: __jgpDk.dist, blossoms: Kt.blossoms }));
  for (const key of ['f','g','1','9','q','e']) { await p.keyboard.down(key); await p.waitForTimeout(100); await p.keyboard.up(key); }
  await p.mouse.wheel(0, 500);
  const after = await p.evaluate(() => ({ yaw: __jgpDk.yaw, dist: __jgpDk.dist, blossoms: Kt.blossoms, dialogue: qt.isOpen }));
  assert.equal(after.yaw, before.yaw); assert.equal(after.dist, before.dist); assert.equal(after.blossoms, before.blossoms); assert.equal(after.dialogue, false);
  await p.mouse.move(200, 180); await p.mouse.down(); await p.mouse.move(245, 190, { steps: 3 }); await p.mouse.up();
  assert.notEqual(await p.evaluate(() => __jgpDk.yaw), before.yaw);
  const hudX = await p.evaluate(() => __jgpDk.grip.position.x);
  assert.ok(mobile ? hudX < 0 : hudX > 0, 'HUD must occupy requested corner');
  const diagnostics = await p.evaluate(() => (document.getElementById('jgpDiag') || document.getElementById('jgpDeskErr')).textContent);
  assert.ok(!/\bfps\b/i.test(diagnostics));
  if (mobile) {
    const pos = await p.evaluate(() => {
      const e = It.byId.p_gemtoe, v = e.group.position.clone(); v.y += e.height * .6;
      v.applyMatrix4(B.matrixWorldInverse).applyMatrix4(B.projectionMatrix);
      return [(v.x + 1) * innerWidth / 2, (1 - v.y) * innerHeight / 2];
    });
    await p.touchscreen.tap(...pos); await p.waitForTimeout(300);
    assert.equal(await p.evaluate(() => qt.isOpen || __jgpMenu.open()), false, 'creature tapping must not interact');
    await p.locator('#jgpTouch [data-k="talk"]').click(); await p.waitForTimeout(400);
    assert.equal(await p.evaluate(() => qt.isOpen), true, 'Talk button must work');
    assert.equal(await p.locator('#jgpTouch [data-k="give"]').isVisible(), false);
    assert.equal(await p.locator('#jgpTouch [data-k="talk"]').isVisible(), false);
    await p.evaluate(() => qt.skipAll()); await p.waitForTimeout(400);
    assert.equal(await p.locator('#jgpTouch [data-k="talk"]').isVisible(), true);
    assert.equal(await p.locator('#jgpTouch [data-k="give"]').isVisible(), true);
    await p.evaluate(() => {
      qt.skipAll(); Kt.shyFree = true;
      const e = It.all.find(e => Xt(e) === 'cutebex');
      e.busy = null; e.moving = false;
      const g = e.group.position;
      At.position.set(g.x, 0, g.z + 2.5);
      const dk = __jgpDk; dk.yaw = dk.cy = Math.PI; dk.pitch = dk.cp = .2;
      xe.scan();
    });
    await p.waitForTimeout(700);
    await p.locator('#jgpTouch [data-k="talk"]').click();
    await p.waitForTimeout(400);
    assert.equal(await p.evaluate(() => __jgpMenu.open()), true, 'Talk exposes freed shopkeeper choices');
    const menuTap = async id => {
      const pos = await p.evaluate(id => {
        const m = __jgpMenu, row = Number(id.slice(1));
        const v = new THREE.Vector3(0, .5 - (51 + 76 * row)/m.h(), 0);
        m.mesh().localToWorld(v); v.applyMatrix4(B.matrixWorldInverse).applyMatrix4(B.projectionMatrix);
        return [(v.x+1)*innerWidth/2, (1-v.y)*innerHeight/2];
      },id);
      await p.touchscreen.tap(...pos); await p.waitForTimeout(400);
    };
    await menuTap('m1');
    assert.equal(await p.evaluate(() => qt.isOpen), true, 'biology Talk is reachable through menu');
    assert.match(await p.evaluate(() => document.getElementById('dlgText').textContent), /curling trunk/);
    await p.evaluate(() => qt.skipAll()); await p.waitForTimeout(400);
    await p.locator('#jgpTouch [data-k="talk"]').click(); await p.waitForTimeout(400);
    await menuTap('m0');
    assert.equal(await p.evaluate(() => _t.kind), 'shop', 'shop is still reachable');

  } else {
    await p.evaluate(() => { Kt.shyFree = true; ne.open(); });
    await p.keyboard.press('b'); await p.waitForTimeout(300);
    assert.equal(await p.evaluate(() => jt.has('panel')), false, 'B must close panel');
  }
  assert.equal(await p.evaluate(() => Re.errors), 0);
  log(mobile ? 'mobile controls passed' : 'desktop controls passed'); await logErrors(p);
};
