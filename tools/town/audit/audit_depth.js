// Depth audit of every visible mesh: stale bounding spheres (geometry outside them), frustum-culled instanced meshes,
// materials with polygon offset, and up to 400 pairs of flat, near-horizontal surfaces below 3 m that overlap in plan
// within 3 cm of each other. Prints one JSON object.
// Run (from this folder): NOSHOT=1 node ../../test/shot2.js <url> x.png ./audit_depth.js
module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(3000);
  console.log(await p.evaluate(() => {
    const out = { staleBounds: [], offset: [], flatPairs: [], total: 0 };
    const flats = [], b = new THREE.Box3(), v = new THREE.Vector3();
    const nm = (m) => { const a = []; for (let q = m; q && a.length < 4; q = q.parent) a.push(q.name || q.type); return a.join('<'); };
    C.updateMatrixWorld(true);
    C.traverse((m) => {
      if (!m.isMesh || !m.geometry || !m.geometry.attributes.position) return;
      let vis = true; for (let q = m; q; q = q.parent) if (!q.visible) vis = false; if (!vis) return;
      out.total++;
      const g = m.geometry;
      // stale bounds: an existing bounding sphere that does not contain the geometry
      if (g.boundingSphere && m.frustumCulled) {
        const bs = g.boundingSphere, pa = g.attributes.position; let far = 0;
        for (let k = 0; k < pa.count; k++) { v.fromBufferAttribute(pa, k); far = Math.max(far, v.distanceTo(bs.center)); }
        if (far > bs.radius * 1.001 + 1e-3) out.staleBounds.push([nm(m), +bs.radius.toFixed(2), +far.toFixed(2)]);
      }
      if (m.isInstancedMesh && m.frustumCulled) out.staleBounds.push(['INSTANCED ' + nm(m), m.count, !!m.boundingSphere]);
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      mats.forEach((mt) => mt.polygonOffset && out.offset.push([nm(m), mt.polygonOffsetFactor, mt.polygonOffsetUnits]));
      // flat, near-horizontal surfaces close to the ground
      const wb = new THREE.Box3().setFromObject(m);
      if (wb.isEmpty()) return;
      const sz = wb.getSize(new THREE.Vector3());
      if (sz.y < 0.012 && Math.max(sz.x, sz.z) > 0.05 && wb.min.y < 3) flats.push({ m, wb, y: (wb.min.y + wb.max.y) / 2, n: nm(m), area: sz.x * sz.z, off: mats.some((mt) => mt.polygonOffset && (mt.polygonOffsetFactor < 0 || mt.polygonOffsetUnits < 0)), tr: mats.some((mt) => mt.transparent) });
    });
    // pairs of flats that overlap in plan and sit within 3 cm of each other
    for (let i = 0; i < flats.length; i++) for (let j = i + 1; j < flats.length; j++) {
      const A = flats[i], B = flats[j], dy = Math.abs(A.y - B.y);
      if (dy > 0.03) continue;
      if (A.wb.min.x > B.wb.max.x || B.wb.min.x > A.wb.max.x || A.wb.min.z > B.wb.max.z || B.wb.min.z > A.wb.max.z) continue;
      const big = A.area > B.area ? A : B, small = big === A ? B : A;
      out.flatPairs.push([small.n, +small.y.toFixed(3), 'over/under', big.n, +big.y.toFixed(3), 'dy=' + dy.toFixed(3), big.off ? 'BIG-HAS-NEG-OFFSET' : '', small.off ? 'small-neg-offset' : '', +((small.wb.min.x + small.wb.max.x) / 2).toFixed(1), +((small.wb.min.z + small.wb.max.z) / 2).toFixed(1)]);
    }
    out.flatCount = flats.length;
    out.flatPairs = out.flatPairs.slice(0, 400);
    return JSON.stringify(out);
  }));
};
