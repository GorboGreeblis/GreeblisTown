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
  const res = await p.evaluate(({ TOL, MINA, CRE }) => {
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
      parts.push({ name: o.name || '', col: mt.color ? '#' + mt.color.getHexString() : '?', own: own || (o.userData && o.userData.bld) || '', ds: mt.side === THREE.DoubleSide, ro: o.renderOrder });
      const P = o.geometry.attributes.position, I = o.geometry.index;
      const n = I ? I.count : P.count, inst = o.isInstancedMesh ? o.count : 1;
      for (let k = 0; k < inst; k++) {
        if (o.isInstancedMesh) { o.getMatrixAt(k, mi); m4.multiplyMatrices(o.matrixWorld, mi); } else m4.copy(o.matrixWorld);
        for (let t = 0; t + 2 < n; t += 3) {
          const ia = I ? I.getX(t) : t, ib = I ? I.getX(t + 1) : t + 1, ic = I ? I.getX(t + 2) : t + 2;
          const A = new V().fromBufferAttribute(P, ia).applyMatrix4(m4), B = new V().fromBufferAttribute(P, ib).applyMatrix4(m4), Cc = new V().fromBufferAttribute(P, ic).applyMatrix4(m4);
          const nn = new V().subVectors(B, A).cross(new V().subVectors(Cc, A)); const ar = nn.length() / 2; if (ar < 2e-5) continue;
          nn.normalize();
          tris.push({ A, B, C: Cc, n: nn, d: nn.dot(A), pid });
        }
      }
    });
    // group by plane: normals folded to one hemisphere (keeping which way each faces), offset in TOL steps
    const key = (n, s) => [Math.round(n.x * s * 20), Math.round(n.y * s * 20), Math.round(n.z * s * 20)].join(',');
    const buckets = new Map();
    for (const t of tris) {
      const s = t.n.x < -1e-6 || (Math.abs(t.n.x) <= 1e-6 && (t.n.y < -1e-6 || (Math.abs(t.n.y) <= 1e-6 && t.n.z < 0))) ? -1 : 1;
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
      return out.length > 2 ? Math.abs(area2(out)) : 0;
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
            const ov = clip(T1.uv, T2.uv);
            if (ov < MINA) continue;
            const pa = parts[T1.pid], pb = parts[T2.pid];
            const name = [pa.col + ' ' + pa.name + (pa.own ? ' (' + pa.own + ')' : ''), pb.col + ' ' + pb.name + (pb.own ? ' (' + pb.own + ')' : '')].sort().join('  x  ');
            const c = clashes.get(name) || { n: 0, area: 0, at: null, gap: 1 };
            c.n++, (c.area += ov), (c.gap = Math.min(c.gap, Math.abs(T1.s * T1.d - T2.s * T2.d)));
            c.at || (c.at = T1.A.toArray().map((x) => +x.toFixed(2)));
            clashes.set(name, c);
          }
      }
    }
    return { tris: tris.length, parts: parts.length, compared: pairs, clashes: [...clashes.entries()].sort((a, b) => b[1].area - a[1].area).map(([k, c]) => `${k}: ${c.n} overlaps, ${(1e4 * c.area).toFixed(0)} cm², gap ${(1e3 * c.gap).toFixed(1)} mm, at ${c.at}`) };
  }, { TOL: +(process.env.TOL || 0.006), MINA: +(process.env.MINA || 2e-4), CRE: process.env.CREATURES !== '0' });
  log(`triangles ${res.tris}, parts ${res.parts}, near-coplanar pairs compared ${res.compared}, clashes ${res.clashes.length}`);
  res.clashes.slice(0, +(process.env.TOP || 80)).forEach((c) => log('  ' + c));
  log('err', await p.evaluate(() => Re.errors));
};
