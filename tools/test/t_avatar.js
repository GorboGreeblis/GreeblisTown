// The avatar in the test modes: her walk and idle (feet above the ground, hands clear of the skirt), and her outfits
// from the Garden Supplies shop, alone and together, with the fit numbers and the Sheriff's poster of her.
// Env: PART=walk,outfits (only those parts).
// Output: `== part: <name>` and each part's lines (below); the renders named there.
//   VW=320 VH=240 NOSHOT=1 node test/shot.js <url> x.png test/t_avatar.js
const { log, start, render, outName, logErrors } = require('./lib.js');

// The avatar's walk (W held) and idle in the desktop and mobile test modes: rendered from the side mid-stride
// (<out>_walk1..4.png) and standing (<out>_idle.png); the feet must never go below the ground and the hands must keep
// clear of the skirt. Prints `avatar: {frames, lowestFoot, handInSkirtFrames, walkPhase}` and `err <n>`.
const walk = async (p, out) => {
  const W = (ms) => p.waitForTimeout(ms);
  await start(p);
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
  const side = async (name) => {
    const [x, z, r] = await p.evaluate(() => [At.position.x, At.position.z, At.rotation.y]);
    await render(p, outName(out, name), [x + 4.5 * Math.cos(r), 1.3, z - 4.5 * Math.sin(r)], [x, 1.1, z], { fov: 40, near: 0.1 });
  };
  await p.keyboard.down('KeyW');
  await W(1200);
  for (let k = 1; k <= 4; k++) { await side('walk' + k); await W(110); }
  await p.keyboard.up('KeyW');
  await W(2500);
  await side('idle');
  log('avatar:', await p.evaluate(() => JSON.stringify({ frames: __A.frames, lowestFoot: +__A.lowFoot.toFixed(3), handInSkirtFrames: __A.handIn, walkPhase: +(At.userData.legL.rotation.x).toFixed(3) })));
  await logErrors(p);
};

// The avatar's outfits: the default, then each Garden Supplies piece worn alone and all three together, each rendered
// from the front, the side, the back and at the head (<out>_<set>_<view>.png, 600×800 px), and the Sheriff's Wanted
// poster of the avatar (<out>_poster.png). Per set it prints the fit: the hat's lowest point above the head's centre,
// the frogs' lowest point and the hem's height (nothing of a worn piece may sit inside the body); then
// `poster rendered` and `err <n>`.
const outfits = async (p, out) => {
  await start(p);
  await p.evaluate(() => { At.position.set(8, 0, 24); At.rotation.y = 0; });
  const shot = async (name, cam, look, fov) => {
    const [x, z] = await p.evaluate(() => [At.position.x, At.position.z]);
    await render(p, outName(out, name), [x + cam[0], cam[1], z + cam[2]], [x + look[0], look[1], z + look[2]], { fov, w: 600, h: 800 });
  };
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
  if (P) { const [x, y, z, f] = P; await render(p, outName(out, 'poster'), [x + 1.6 * Math.sin(f), y, z + 1.6 * Math.cos(f)], [x, y, z], { fov: 30, w: 600, h: 800 }); }
  log('poster', P ? 'rendered' : 'not found');
  await logErrors(p);
};

module.exports = require('./parts.js')({ walk, outfits });
