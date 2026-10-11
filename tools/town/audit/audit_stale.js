// Meshes whose geometry no longer fits inside its bounding sphere (they vanish at some angles), counted by scene part,
// parent, name and material, with the sphere's centre and the geometry's real centre. Prints JSON.
// Run (from this folder): NOSHOT=1 node ../../test/shot2.js <url> x.png ./audit_stale.js
module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(3000);
  console.log(await p.evaluate(() => {
    const owner = new Map(); It.all.forEach((e) => e.group.traverse((o) => owner.set(o, e.def && e.def.name)));
    const v = new THREE.Vector3(), res = {};
    C.updateMatrixWorld(true);
    C.traverse((m) => {
      if (!m.isMesh || !m.geometry || !m.geometry.boundingSphere) return;
      const g = m.geometry, bs = g.boundingSphere, pa = g.attributes.position; let far = 0;
      for (let k = 0; k < pa.count; k++) { v.fromBufferAttribute(pa, k); far = Math.max(far, v.distanceTo(bs.center)); }
      if (far <= bs.radius * 1.001 + 1e-3) return;
      let top = m; while (top.parent && top.parent !== C) top = top.parent;
      const bb = new THREE.Box3().setFromBufferAttribute(pa), c = bb.getCenter(new THREE.Vector3()); const key = (top.name || top.type) + '/' + (m.parent.name || m.parent.type) + '/' + (m.name || '-') + ' mat=' + m.material.type + ' n=' + pa.count + ' bs=(' + bs.center.x.toFixed(1) + ',' + bs.center.z.toFixed(1) + ' r' + bs.radius.toFixed(1) + ') real=(' + c.x.toFixed(1) + ',' + c.y.toFixed(1) + ',' + c.z.toFixed(1) + ')' + ' top.children=' + top.children.length + ' ud=' + Object.keys(top.userData).join(',');
      res[key] = (res[key] || 0) + 1;
    });
    // which geometries are shared between meshes (cache) and translated
    return JSON.stringify(res, null, 1);
  }));
};
