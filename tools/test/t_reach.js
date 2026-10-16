// Every place a Flint or Blossom can appear is reachable on foot: a 0.25 m grid flooded from the player's start with
// the game's own player collision (buildings, solids, creatures, fence), then 4,000 sampled spawn spots and every live
// pickup checked against it (a pickup is reachable when a reached cell lies within its 1.1 m pick-up radius).
// Roaming creatures can temporarily cover a pickup. Recheck the same points without their bodies to distinguish
// that case from permanently inaccessible terrain. Explicitly include the Gallery points found during the v0.2 audit.
// Env: none.
// Output: one JSON line with dynamic and permanent unreachable counts; asserts no permanent obstruction or game errors.
//   NOSHOT=1 node test/shot.js <url> x.png test/t_reach.js
const { start } = require('./lib.js');

module.exports = async (p) => {
  await start(p);
  const report = await p.evaluate(() => {
    const R = t.player.bodyR, S = 0.25, H = t.parkHalf, X0 = -H, Z0 = -H, NX = Math.ceil((2 * H) / S), NZ = Math.ceil((H + t.parkSouth) / S);
    const lim = t.parkHalf - 0.15 - R, limS = t.parkSouth - 0.15 - R;
    const flood = () => {
      const free = new Uint8Array(NX * NZ), v = new THREE.Vector3();
      for (let i = 0; i < NX; i++) for (let k = 0; k < NZ; k++) {
        const x = X0 + (i + 0.5) * S, z = Z0 + (k + 0.5) * S;
        if (Math.abs(x) > lim || z < -lim || z > limS) continue;
        v.set(x, 0, z); F.resolve(v, R); uo.resolve(v, R, At);
        free[i * NZ + k] = Math.hypot(v.x - x, v.z - z) < 0.02 ? 1 : 0;
      }
      const seen = new Uint8Array(NX * NZ), q = [], idx = (x, z) => Math.floor((x - X0) / S) * NZ + Math.floor((z - Z0) / S);
      const s0 = idx(At.position.x, At.position.z); // (where the player starts)
      let st = s0; if (!free[st]) { for (let d = 1; d < 40 && !free[st]; d++) st = s0 + d; }
      seen[st] = 1; q.push(st);
      while (q.length) { const c = q.pop(), i = Math.floor(c / NZ), k = c % NZ;
        for (const [di, dk] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const a = i + di, b = k + dk; if (a < 0 || b < 0 || a >= NX || b >= NZ) continue; const n = a * NZ + b; if (free[n] && !seen[n]) { seen[n] = 1; q.push(n); } } }
      // a pickup is reachable when a reachable cell lies within its pick-up radius (1.1 m)
      const ok = (x, z) => { for (let dx = -1.0; dx <= 1.0; dx += S) for (let dz = -1.0; dz <= 1.0; dz += S) { if (Math.hypot(dx, dz) > 1.05) continue; const a = Math.floor((x + dx - X0) / S), b = Math.floor((z + dz - Z0) / S); if (a >= 0 && b >= 0 && a < NX && b < NZ && seen[a * NZ + b]) return true; } return false; };
      return {seen, ok};
    };
    const dynamic = flood(), points = [[24.4,14.6],[24.5,15.1]];
    let n = 0; for (let k = 0; k < 4000; k++) { const s = go(null, []); if (!s) continue; n++; points.push([s.x,s.z]); }
    const bad = points.filter(([x,z]) => !dynamic.ok(x,z));
    const livePoints = [...le.list, ...ce.list].map(o => [o.position.x,o.position.z]);
    const live = livePoints.filter(([x,z]) => !dynamic.ok(x,z));
    const roamers = new Set(['gratelet','p_mamagorbo','gorbo','p_etcher','p_glyph','w_mont']);
    const solid = uo.solid;
    let terrain;
    try {
      uo.solid = e => !roamers.has(e.id) && solid.call(uo,e);
      terrain = flood();
    } finally { uo.solid = solid; }
    const permanent = points.filter(([x,z]) => !terrain.ok(x,z));
    const livePermanent = livePoints.filter(([x,z]) => !terrain.ok(x,z));
    let reach = 0; for (let c = 0; c < dynamic.seen.length; c++) reach += dynamic.seen[c];
    return { samples:n, fixedRegressionPoints:2, unreachableWithRoamers:bad.length, badSpots:bad.slice(0,30),
      permanentUnreachable:permanent, liveUnreachableWithRoamers:live, livePermanentUnreachable:livePermanent,
      flint:ce.list.length, blossoms:le.list.length, reachableCells:reach, err:Re.errors };
  });
  console.log(JSON.stringify(report));
  const assert = require('node:assert/strict');
  assert.deepEqual(report.permanentUnreachable,[],'spawn points must be reachable after roamers move');
  assert.deepEqual(report.livePermanentUnreachable,[],'live pickups must be reachable');
  assert.equal(report.err,0);

};
