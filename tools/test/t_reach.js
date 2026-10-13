// Can the player walk to every place a Flint or Blossom can appear? Floods a 0.25 m grid from where the
// player starts, using the game's own player collision (buildings, solids, creatures, fence), then
// checks thousands of spawn spots, plus every live pickup, against it.
module.exports = async (p) => {
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => {
    const R = t.player.bodyR, S = 0.25, H = t.parkHalf, X0 = -H, Z0 = -H, NX = Math.ceil((2 * H) / S), NZ = Math.ceil((H + t.parkSouth) / S);
    const lim = t.parkHalf - 0.15 - R, limS = t.parkSouth - 0.15 - R;
    const free = new Uint8Array(NX * NZ), v = new THREE.Vector3();
    for (let i = 0; i < NX; i++) for (let k = 0; k < NZ; k++) {
      const x = X0 + (i + 0.5) * S, z = Z0 + (k + 0.5) * S;
      if (Math.abs(x) > lim || z < -lim || z > limS) continue;
      v.set(x, 0, z); F.resolve(v, R); uo.resolve(v, R, At);
      free[i * NZ + k] = Math.hypot(v.x - x, v.z - z) < 0.02 ? 1 : 0;
    }
    const seen = new Uint8Array(NX * NZ), q = [], idx = (x, z) => Math.floor((x - X0) / S) * NZ + Math.floor((z - Z0) / S);
    const s0 = idx(At.position.x, At.position.z); // start where the player is
    let st = s0; if (!free[st]) { for (let d = 1; d < 40 && !free[st]; d++) st = s0 + d; }
    seen[st] = 1; q.push(st);
    while (q.length) { const c = q.pop(), i = Math.floor(c / NZ), k = c % NZ;
      for (const [di, dk] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const a = i + di, b = k + dk; if (a < 0 || b < 0 || a >= NX || b >= NZ) continue; const n = a * NZ + b; if (free[n] && !seen[n]) { seen[n] = 1; q.push(n); } } }
    // a pickup is reachable when a reachable cell lies within its pick-up radius (1.1 m)
    const ok = (x, z) => { for (let dx = -1.0; dx <= 1.0; dx += S) for (let dz = -1.0; dz <= 1.0; dz += S) { if (Math.hypot(dx, dz) > 1.05) continue; const a = Math.floor((x + dx - X0) / S), b = Math.floor((z + dz - Z0) / S); if (a >= 0 && b >= 0 && a < NX && b < NZ && seen[a * NZ + b]) return true; } return false; };
    let n = 0, bad = []; for (let k = 0; k < 4000; k++) { const s = go(null, []); if (!s) continue; n++; ok(s.x, s.z) || bad.push([+s.x.toFixed(1), +s.z.toFixed(1)]); }
    const live = [...le.list, ...ce.list].filter((o) => !ok(o.position.x, o.position.z)).map((o) => [+o.position.x.toFixed(1), +o.position.z.toFixed(1)]);
    let reach = 0; for (let c = 0; c < seen.length; c++) reach += seen[c];
    return JSON.stringify({ samples: n, unreachable: bad.length, badSpots: bad.slice(0, 30), liveUnreachable: live, flint: ce.list.length, blossoms: le.list.length, reachableCells: reach, err: Re.errors });
  }));
};
