// The avatar in the test modes: her walk and idle (feet above the ground, hands clear of the skirt), and her
// outfits from the Garden Supplies shop, alone and together, with the fit numbers and the Sheriff's poster of her.
//   VW=320 VH=240 node shot.js <url> x.png ./t_avatar.js   (PART=walk,outfits runs only those)

// The player's avatar animation in the desktop / mobile test modes: walks (W held) and stands, rendering
// her from the side mid-stride (<out>_walk1..4.png) and standing (<out>_idle.png), and checks the feet
// never go below the ground and the hands keep clear of the skirt.
const walk = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  await p.evaluate(() => {
    At.position.set(-2, 0, 30);
    window.__A = { lowFoot: 9, handIn: 0, frames: 0 };
    const v = new THREE.Vector3(), U = At.userData;
    L.push(() => {
      const A = __A; A.frames++;
      At.updateMatrixWorld(!0);
      ['L', 'R'].forEach((s) => {
        U['shoe' + s].getWorldPosition(v); A.lowFoot = Math.min(A.lowFoot, v.y - 0.062);
        // the hand (the sphere at the arm's end) against the skirt's cone, in the body's frame
        U['arm' + s].localToWorld(v.set(0, -0.5, 0)); At.worldToLocal(v);
        const y = v.y; if (y > 0.64 && y < 1.2) { const rr = 0.46 - (0.26 * (y - 0.64)) / 0.56, d = Math.hypot(v.x, v.z); d - 0.068 < rr - 0.01 && A.handIn++; }
      });
    });
  });
  const side = (name) => p.evaluate(() => {
    const q = At.position, c = new THREE.PerspectiveCamera(40, 4 / 3, 0.1, 300), r = At.rotation.y;
    c.position.set(q.x + 4.5 * Math.cos(r), 1.3, q.z - 4.5 * Math.sin(r)); c.lookAt(q.x, 1.1, q.z);
    O.setSize(800, 600, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
  }).then((d) => fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  await p.keyboard.down('KeyW');
  await W(1200);
  for (let k = 1; k <= 4; k++) { await side('walk' + k); await W(110); }
  await p.keyboard.up('KeyW');
  await W(2500);
  await side('idle');
  log('avatar:', await p.evaluate(() => JSON.stringify({ frames: __A.frames, lowestFoot: +__A.lowFoot.toFixed(3), handInSkirtFrames: __A.handIn, walkPhase: +(At.userData.legL.rotation.x).toFixed(3) })));
  log('err', await p.evaluate(() => Re.errors));
};

// The avatar's outfits: the default, then each Garden Supplies piece worn alone and all three together, each
// rendered from the front, the side and the back (<out>_<set>_<view>.png) with the walk animation held at a
// stride, and the Sheriff's Wanted poster of the avatar (<out>_poster.png). Checks per set: nothing of a worn piece
// sits inside the body (hat over the hair, frogs over the shoes, hem at the skirt's bottom edge).
const outfits = async (p, out) => {
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

module.exports = require('./parts.js')({ walk, outfits });
