// Z-fighting scan over everything visible: every depth-tested triangle of every mesh (instanced ones too) in
// world space is grouped by its plane; two triangles closer than TOL (default 6 mm, about what a 24-bit depth
// buffer resolves at 100 m with VR's 0.15 m near plane) in nearly the same plane that genuinely overlap (by
// more than MINA m², default 2 cm², not just meeting at an edge) and can be seen from the same side are a
// clash. Clashes are grouped by the two parts (material colour, mesh name, owning creature or building) with
// a world position for each, so every one can be found and fixed. Transparent surfaces that don't write
// depth (and polygon-offset ones) are left out: they cannot z-fight (sorting is checked by t_goo.js).
// Run after boot: NOSHOT=1 node shot2.js <url> x.png ./t_zfight.js   (CREATURES=0 to leave creatures out)
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(100, 60); await W(2500);
  const res = await p.evaluate(({ TOL, MINA, CRE, VISALL }) => {
    const V = THREE.Vector3, tris = [], parts = [], m4 = new THREE.Matrix4(), mi = new THREE.Matrix4();
    const owner = (o) => { for (let a = o; a; a = a.parent) { const e = It.all.find((q) => q.group === a); if (e) return 'creature ' + (e.def && e.def.name); } return null; };
    C.updateMatrixWorld(!0);
    C.traverse((o) => {
      if (!o.isMesh || !o.geometry || !o.geometry.attributes.position) return;
      for (let a = o; a; a = a.parent) if (!a.visible) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      const mt = mats[0]; if (!mt || mt.depthTest === !1 || (mt.transparent && !mt.depthWrite) || mt.polygonOffset || mt.colorWrite === !1) return;
      const own = owner(o); if (own && !CRE) return;
      const pid = parts.length;
      parts.push({ name: o.name || '', col: mt.color ? '#' + mt.color.getHexString() : '?', own: own || (o.userData && o.userData.bld) || '', ds: mt.side === THREE.DoubleSide, ro: o.renderOrder, tr: !!mt.transparent });
      const P = o.geometry.attributes.position, I = o.geometry.index, VC = o.geometry.attributes.color;
      // (a merge's parts differ only by vertex colour: each triangle is named by its own, tinted by the material's)
      const hex = (i) => '#' + [0, 1, 2].map((j) => Math.round(255 * Math.min(1, VC.array[i * VC.itemSize + j] * (mt.color ? mt.color.toArray()[j] : 1))).toString(16).padStart(2, '0')).join('');
      const n = I ? I.count : P.count, inst = o.isInstancedMesh ? o.count : 1;
      for (let k = 0; k < inst; k++) {
        if (o.isInstancedMesh) { o.getMatrixAt(k, mi); m4.multiplyMatrices(o.matrixWorld, mi); } else m4.copy(o.matrixWorld);
        for (let t = 0; t + 2 < n; t += 3) {
          const ia = I ? I.getX(t) : t, ib = I ? I.getX(t + 1) : t + 1, ic = I ? I.getX(t + 2) : t + 2;
          const A = new V().fromBufferAttribute(P, ia).applyMatrix4(m4), B = new V().fromBufferAttribute(P, ib).applyMatrix4(m4), Cc = new V().fromBufferAttribute(P, ic).applyMatrix4(m4);
          const nn = new V().subVectors(B, A).cross(new V().subVectors(Cc, A)); const ar = nn.length() / 2; if (ar < 2e-5) continue;
          nn.normalize();
          tris.push({ A, B, C: Cc, n: nn, d: nn.dot(A), pid, col: VC ? hex(ia) : parts[pid].col });
        }
      }
    });
    // group by plane: normals folded to one hemisphere (keeping which way each faces), offset in TOL steps
    const key = (n, s) => [Math.round(n.x * s * 20), Math.round(n.y * s * 20), Math.round(n.z * s * 20)].join(',');
    const buckets = new Map();
    for (const t of tris) {
      // (folded by the normal's largest component: a flat face's x and z are float noise either side of 0)
      const ax = Math.abs(t.n.x), ay = Math.abs(t.n.y), az = Math.abs(t.n.z), s = (ax >= ay && ax >= az ? t.n.x : ay >= az ? t.n.y : t.n.z) < 0 ? -1 : 1;
      t.s = s; t.k = key(t.n, s); t.dq = Math.floor((s * t.d) / TOL);
      const kk = t.k + '|' + t.dq; (buckets.get(kk) || buckets.set(kk, []).get(kk)).push(t);
    }
    // overlap area of two triangles in their shared plane (clip one by the other)
    const area2 = (pts) => { let a = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; };
    const clip = (subj, cl) => {
      let out = subj; const ccw = area2(cl) > 0 ? 1 : -1;
      for (let i = 0; i < cl.length && out.length; i++) {
        const a = cl[i], b = cl[(i + 1) % cl.length], inp = out; out = [];
        const side = (p) => ccw * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));
        for (let j = 0; j < inp.length; j++) {
          const P = inp[j], Q = inp[(j + 1) % inp.length], sp = side(P), sq = side(Q);
          sp >= 0 && out.push(P);
          if ((sp >= 0) !== (sq >= 0)) { const tt = sp / (sp - sq); out.push([P[0] + tt * (Q[0] - P[0]), P[1] + tt * (Q[1] - P[1])]); }
        }
      }
      return out.length > 2 ? { a: Math.abs(area2(out)), poly: out } : { a: 0 };
    };
    const clashes = new Map(); let pairs = 0;
    for (const [kk, list] of buckets) {
      const [k, dq] = kk.split('|'); const other = buckets.get(k + '|' + (+dq + 1)) || [];
      const all = list.concat(other);
      if (all.length < 2) continue;
      // a 2 m grid in the plane so only nearby triangles are compared
      const n = list[0].n.clone().multiplyScalar(list[0].s), u = new V(), v = new V();
      u.copy(Math.abs(n.y) < 0.9 ? new V(0, 1, 0) : new V(1, 0, 0)).cross(n).normalize(); v.crossVectors(n, u);
      const cell = new Map(), uv = (P) => [P.dot(u), P.dot(v)];
      all.forEach((t, i) => {
        t.uv = [uv(t.A), uv(t.B), uv(t.C)];
        const xs = t.uv.map((q) => q[0]), ys = t.uv.map((q) => q[1]);
        for (let cx = Math.floor(Math.min(...xs) / 2); cx <= Math.floor(Math.max(...xs) / 2); cx++)
          for (let cy = Math.floor(Math.min(...ys) / 2); cy <= Math.floor(Math.max(...ys) / 2); cy++) {
            const ck = cx + ',' + cy; (cell.get(ck) || cell.set(ck, []).get(ck)).push(i);
          }
      });
      const seen = new Set();
      for (const ids of cell.values()) {
        if (ids.length > 400) continue;
        for (let a = 0; a < ids.length; a++)
          for (let b = a + 1; b < ids.length; b++) {
            const i = ids[a], j = ids[b], T1 = all[i], T2 = all[j];
            if (i >= list.length && j >= list.length) continue;
            const sk = i < j ? i + '_' + j : j + '_' + i; if (seen.has(sk)) continue; seen.add(sk);
            if (Math.abs(T1.s * T1.d - T2.s * T2.d) > TOL || T1.n.dot(T2.n) * T1.s * T2.s < 0.9998) continue;
            // facing opposite ways: only a clash if either is drawn from both sides
            if (T1.s !== T2.s && !parts[T1.pid].ds && !parts[T2.pid].ds) continue;
            pairs++;
            const cr = clip(T1.uv, T2.uv), ov = cr.a;
            if (ov < MINA) continue;
            const pa = parts[T1.pid], pb = parts[T2.pid];
            // (unnamed scenery is told apart by where it is, to the nearest 4 m)
            const at4 = pa.name || pa.own ? '' : ` near ${Math.round(T1.A.x / 4) * 4},${Math.round(T1.A.z / 4) * 4}`;
            const name = [T1.col + ' ' + pa.name + (pa.own ? ' (' + pa.own + ')' : ''), T2.col + ' ' + pb.name + (pb.own ? ' (' + pb.own + ')' : '')].sort().join('  x  ') + at4;
            const c = clashes.get(name) || { n: 0, area: 0, at: null, gap: 1 };
            c.n++, (c.area += ov), (c.gap = Math.min(c.gap, Math.abs(T1.s * T1.d - T2.s * T2.d)));
            c.at || (c.at = T1.A.toArray().map((x) => +x.toFixed(2)));
            // a point inside the overlap (its centroid, back in the world), kept for the visibility test
            if ((c.pts = c.pts || []).length < 6) {
              const cu = cr.poly.reduce((a, q) => a + q[0], 0) / cr.poly.length, cv = cr.poly.reduce((a, q) => a + q[1], 0) / cr.poly.length;
              c.pts.push(new V().addScaledVector(u, cu).addScaledVector(v, cv).addScaledVector(n, n.dot(T1.A)));
            }
            clashes.set(name, c);
          }
      }
    }
    // CAN IT BE SEEN? From eye heights (1.6 m, and 3 m for the desktop camera) on a grid over everywhere
    // the player can go, a clash is visible when a sample point inside it has a clear line to one of the
    // 12 nearest eyes (opaque surfaces block; glass and other transparent ones do not). VISALL=1 skips this.
    const eyes = [];
    for (let x = -34; x <= 34.1; x += 8.5) for (let z = -34; z <= 46.1; z += 10) eyes.push(new V(x, 1.6, z), new V(x, 3, z));
    // (the game's trimmed three.js has no raycasting: every depth-writing opaque triangle goes into a 2 m grid
    // and each sight line steps through it, testing the triangles of the cells it passes)
    const CELL = 2, grid = new Map(), ck = (a, b, c) => a + ',' + b + ',' + c;
    tris.forEach((t, i) => {
      if (parts[t.pid].tr) return;
      const lo = [0, 1, 2].map((j) => Math.floor(Math.min(t.A['xyz'[j]], t.B['xyz'[j]], t.C['xyz'[j]]) / CELL)),
        hi = [0, 1, 2].map((j) => Math.floor(Math.max(t.A['xyz'[j]], t.B['xyz'[j]], t.C['xyz'[j]]) / CELL));
      if ((hi[0] - lo[0] + 1) * (hi[1] - lo[1] + 1) * (hi[2] - lo[2] + 1) > 4000) return;
      for (let a = lo[0]; a <= hi[0]; a++) for (let b = lo[1]; b <= hi[1]; b++) for (let c = lo[2]; c <= hi[2]; c++) { const k = ck(a, b, c); (grid.get(k) || grid.set(k, []).get(k)).push(i); }
    });
    const e1 = new V(), e2 = new V(), pv = new V(), tv = new V(), qv = new V();
    let stamp = 0; const mark = new Uint32Array(tris.length);
    const blocked = (o, dir, far) => {
      stamp++;
      for (let s = 0; s <= far; s += 0.5) {
        const k = ck(Math.floor((o.x + dir.x * s) / CELL), Math.floor((o.y + dir.y * s) / CELL), Math.floor((o.z + dir.z * s) / CELL)), L = grid.get(k);
        if (!L) continue;
        for (const i of L) {
          if (mark[i] === stamp) continue; mark[i] = stamp;
          const t = tris[i];
          e1.subVectors(t.B, t.A), e2.subVectors(t.C, t.A), pv.crossVectors(dir, e2);
          const det = e1.dot(pv); if (Math.abs(det) < 1e-9) continue;
          const inv = 1 / det; tv.subVectors(o, t.A); const uu = tv.dot(pv) * inv; if (uu < 0 || uu > 1) continue;
          qv.crossVectors(tv, e1); const vv = dir.dot(qv) * inv; if (vv < 0 || uu + vv > 1) continue;
          const tt = e2.dot(qv) * inv; if (tt > 0.01 && tt < far) return !0;
        }
      }
      return !1;
    };
    const seen = (pt) => {
      const near = eyes.slice().sort((a, b) => a.distanceTo(pt) - b.distanceTo(pt)).slice(0, 12);
      return near.some((eye) => { const d = pt.distanceTo(eye); return !blocked(eye, new V().subVectors(pt, eye).normalize(), d - 0.03); });
    };
    const ALL = !!VISALL, out = [];
    for (const [k, c] of clashes) { c.vis = ALL || c.pts.some(seen); c.vis && out.push([k, c]); }
    return { tris: tris.length, parts: parts.length, compared: pairs, hidden: clashes.size - out.length, clashes: out.sort((a, b) => b[1].area - a[1].area).map(([k, c]) => `${k}: ${c.n} overlaps, ${(1e4 * c.area).toFixed(0)} cm², gap ${(1e3 * c.gap).toFixed(1)} mm, at ${c.at}, seen at ${c.pts.filter((q) => ALL || seen(q)).slice(0, 2).map((q) => q.toArray().map((x) => +x.toFixed(2)).join(',')).join(' / ')}`) };
  }, { TOL: +(process.env.TOL || 0.006), MINA: +(process.env.MINA || 2e-4), CRE: process.env.CREATURES !== '0', VISALL: process.env.VISALL || '' });
  log(`triangles ${res.tris}, parts ${res.parts}, near-coplanar pairs compared ${res.compared}, visible clashes ${res.clashes.length} (${res.hidden} more that no eye can see)`);
  res.clashes.slice(0, +(process.env.TOP || 80)).forEach((c) => log('  ' + c));
  log('err', await p.evaluate(() => Re.errors));
};
