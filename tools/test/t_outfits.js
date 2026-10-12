// The avatar's outfits: the default, then each Garden Supplies piece worn alone and all three together, each
// rendered from the front, the side and the back (<out>_<set>_<view>.png) with the walk animation held at a
// stride, and the Sheriff's Wanted poster of the avatar (<out>_poster.png). Checks per set: nothing of a worn piece
// sits inside the body (hat over the hair, frogs over the shoes, hem at the skirt's bottom edge).
//   VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_outfits.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  await p.evaluate(() => { At.position.set(8, 0, 24); At.rotation.y = 0; });
  const shot = (name, cam, look, fov = 32) => p.evaluate(([cam, look, fov]) => {
    const q = At.position, c = new THREE.PerspectiveCamera(fov, 3 / 4, 0.05, 300);
    c.position.set(q.x + cam[0], cam[1], q.z + cam[2]); c.lookAt(q.x + look[0], look[1], q.z + look[2]); c.updateMatrixWorld(); c.updateProjectionMatrix();
    O.setSize(600, 800, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }, [cam, look, fov]).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  const SETS = [['default', []], ['hat', ['flowerhat']], ['dress', ['sundress']], ['shoes', ['frogshoes']], ['all', ['flowerhat', 'sundress', 'frogshoes']]];
  for (const [name, ids] of SETS) {
    const r = await p.evaluate((ids) => {
      Kt.equip.hat = Kt.equip.shoes = Kt.equip.dress = null;
      ids.forEach((id) => { const it = { flowerhat: { id: 'flowerhat', slot: 'hat', name: 'Flower Hat' }, sundress: { id: 'sundress', slot: 'dress', name: 'Sun Dress' }, frogshoes: { id: 'frogshoes', slot: 'shoes', name: 'Frog Shoes' } }[id]; it && (Kt.equip[it.slot] = it); });
      Eo.apply(); At.updateMatrixWorld(!0);
      const U = At.userData, v = new THREE.Vector3(), r = {};
      // the hat's lowest point against the head's top; the frogs' lowest point against the shoe's; the hem's height
      if (U.flowerHat && U.flowerHat.visible) { const b = new THREE.Box3().setFromObject(U.flowerHat); U.head.getWorldPosition(v); r.hatBottomAboveHeadCentre = +(b.min.y - v.y).toFixed(3); }
      if (U.frogs && U.frogs[0].visible) { const b = new THREE.Box3().setFromObject(U.frogs[0]); r.frogLow = +b.min.y.toFixed(3); }
      if (U.sunHem && U.sunHem.visible) { U.sunHem.getWorldPosition(v); r.hemY = +v.y.toFixed(3); }
      return r;
    }, ids).catch((e) => ({ error: String(e).slice(0, 120) }));
    log(name, JSON.stringify(r));
    await shot(name + '_front', [0, 1.5, 4.6], [0, 1.15, 0], 36);
    await shot(name + '_side', [4.6, 1.5, 0], [0, 1.15, 0], 36);
    await shot(name + '_back', [0, 1.5, -4.6], [0, 1.15, 0], 36);
    await shot(name + '_head', [1.2, 2.3, 1.6], [0, 2.0, 0], 30);
  }
  await p.evaluate(() => { Kt.equip.hat = Kt.equip.shoes = Kt.equip.dress = null; Eo.apply(); });
  // the poster: the Sheriff's wall, the visitor poster
  const P = await p.evaluate(() => { const q = (JGP.libLayout.posters || []).find((o) => o.kind === 'visitor'); if (!q) return null; q.obj.updateMatrixWorld(!0); const v = new THREE.Vector3(...q.at); q.obj.localToWorld(v); const f = q.obj.rotation.y; return [v.x, v.y, v.z, f]; });
  if (P) await p.evaluate(([x, y, z, f]) => { const c = new THREE.PerspectiveCamera(30, 3 / 4, 0.05, 300); c.position.set(x + 1.6 * Math.sin(f), y, z + 1.6 * Math.cos(f)); c.lookAt(x, y, z); O.setSize(600, 800, !1); O.render(C, c); window.__d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); }, P).then(() => p.evaluate(() => window.__d)).then((d) => fs.writeFileSync(out.replace('.png', '_poster.png'), Buffer.from(d.split(',')[1], 'base64')));
  log('poster', P ? 'rendered' : 'not found');
  log('err', await p.evaluate(() => Re.errors));
};
