// The action menu's place on screen in the desktop test mode: for each creature the avatar is put a few metres from
// it, the menu opened by a click on its body, and the menu's bottom edge and the creature's top projected through the
// game camera. The menu must sit just over the head (a small positive gap, no sideways offset), also after the camera
// orbits and after the avatar walks a step: the test modes' camera swings and eases behind the avatar. (The trimmed
// three.js has no Vector3.project: the view and projection matrices are applied by hand.)
// Env: IDS (comma list, default p_mamagorbo,p_gemtoe,m_kingdino,keeper: near, far, off to the side, SPARKAKUS).
// Output: per creature `<id> at [x,z] | opened <bool> | gap/dx px: opened <g>/<dx> | after orbit … | after a step … |
//   still open <bool>`, then `err <n>`.
//   VW=800 VH=600 NOSHOT=1 node test/shot.js <url> x.png test/t_menupos.js
const { log, start, logErrors, waitGame } = require('./lib.js');

module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
  const ids = (process.env.IDS || 'p_mamagorbo,p_gemtoe,m_kingdino,keeper').split(',');
  const measure = () => p.evaluate(() => {
    const e = window.__mt, cam = B, v = new THREE.Vector3();
    const toScr = (x, y, z) => { v.set(x, y, z).applyMatrix4(cam.matrixWorldInverse).applyMatrix4(cam.projectionMatrix); return [((v.x + 1) / 2) * innerWidth, ((1 - v.y) / 2) * innerHeight]; };
    const gp = new THREE.Vector3().setFromMatrixPosition(e.group.matrixWorld), box = new THREE.Box3().setFromObject(e.group), top = toScr(gp.x, e.spark ? gp.y + st.height : box.max.y, gp.z);
    const M = window.__jgpMenu, m = M.mesh(), sy = m.scale.y, r = (sy * M.solidH()) / M.h(), bottomY = m.position.y + sy / 2 - r;
    // (the visible menu's bottom edge, at the mesh's x, z; its centre x for the sideways check)
    const mb = toScr(m.position.x, bottomY, m.position.z);
    return { open: !!window.__jgpMenu.open(), gapPx: +(top[1] - mb[1]).toFixed(0), dxPx: +(mb[0] - top[0]).toFixed(0), headPx: top.map((q) => +q.toFixed(0)) };
  });
  for (const id of ids) {
    // (a few metres off, at a slight angle so the creature is not dead ahead; the camera behind the avatar)
    const at = await p.evaluate((id) => {
      // (a Blossom in hand, so the menu has two choices and opens rather than running the one Talk straight away)
      Kt.blossoms = 3;
      // (SPARKAKUS, 'keeper', is no It creature: his model lives in the Library's frame, so world positions throughout)
      const e = id === 'keeper' ? { group: st.group, spark: true } : It.byId[id] || It.all.find((q) => q.def && q.def.__type === id); window.__mt = e;
      e.group.updateMatrixWorld(!0);
      const g = new THREE.Vector3().setFromMatrixPosition(e.group.matrixWorld), a = Math.atan2(-g.x, -g.z) + 0.35, d = 4.5;
      At.position.set(g.x + d * Math.sin(a), 0, g.z + d * Math.cos(a)); At.rotation.y = Math.atan2(g.x - At.position.x, g.z - At.position.z);
      const dk = window.__jgpDk; dk.yaw = dk.cy = At.rotation.y + Math.PI; dk.pitch = dk.cp = 0.2;
      return [+g.x.toFixed(1), +g.z.toFixed(1)];
    }, id);
    await waitGame(p, .3);
    const menuVersion = await p.evaluate(() => __jgpMenu.mesh().material.map.version);
    // (click on the creature, as the player does)
    const head = await p.evaluate(() => { const e = window.__mt, v = new THREE.Vector3(), gp = new THREE.Vector3().setFromMatrixPosition(e.group.matrixWorld), box = new THREE.Box3().setFromObject(e.group); v.set(gp.x, (e.spark ? gp.y + st.height - .3 : gp.y + .6 * (e.height || box.max.y-gp.y)), gp.z).applyMatrix4(B.matrixWorldInverse).applyMatrix4(B.projectionMatrix); return [((v.x + 1) / 2) * innerWidth, ((1 - v.y) / 2) * innerHeight]; });
    log('menu click',id,JSON.stringify(head));
    await p.mouse.click(head[0], head[1]);
    await p.waitForFunction(v => __jgpMenu.open() && __jgpMenu.mesh().material.map.version > v, menuVersion);
    const m0 = await measure(), st0 = await p.evaluate(() => ({ top: jt.top, dlg: qt.isOpen, tgt: xe.lastTarget && (xe.lastTarget.id || (xe.lastTarget.def && xe.lastTarget.def.name)), near: It.all.filter((q) => Math.hypot(q.group.position.x - At.position.x, q.group.position.z - At.position.z) < 3).map((q) => q.id) }));
    m0.open || log('  (no menu after the click:', JSON.stringify(st0) + ')');
    // (orbit a quarter turn by drag, then walk a step forward)
    await p.mouse.move(400, 300); await p.mouse.down(); await p.mouse.move(520, 300, { steps: 8 }); await p.mouse.up(); await waitGame(p,.3);
    const m1 = await measure();
    await p.keyboard.down('w'); await W(350); await p.keyboard.up('w'); await waitGame(p,.3);
    const m2 = await measure();
    log(id, 'at', JSON.stringify(at), '| opened', m0.open, '| gap/dx px: opened', m0.gapPx + '/' + m0.dxPx, '| after orbit', m1.gapPx + '/' + m1.dxPx, '| after a step', m2.gapPx + '/' + m2.dxPx, '| still open', m2.open);
    require('node:assert/strict').ok([m0,m1,m2].every(m => m.open && m.gapPx>=0 && m.gapPx<80 && Math.abs(m.dxPx)<5), 'menu must remain just above the creature');
    await p.keyboard.press('b'); await W(300);
  }
  await logErrors(p);
};
