// Triangles per scene part: for each top-level child of the scene (named by creature where it is one) its visible
// triangles (instances counted), mesh count and centre; prints the 30 largest and the total.
// Run (from this folder): NOSHOT=1 node ../../test/shot2.js <url> x.png ./tribreak.js
module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(2500);
  console.log(await p.evaluate(() => {
    const tri = (m) => { const g = m.geometry; if (!g) return 0; const n = g.index ? g.index.count : g.attributes.position ? g.attributes.position.count : 0; return (n / 3) * (m.isInstancedMesh ? m.count : 1); };
    const ents = new Map(); It.all.forEach((e) => ents.set(e.group, e.def.name));
    const rows = [];
    C.children.forEach((ch, i) => {
      let t = 0, n = 0; ch.traverseVisible((o) => { if (o.isMesh) { t += tri(o); n++; } });
      const c = new THREE.Box3().setFromObject(ch).getCenter(new THREE.Vector3());
      rows.push([Math.round(t), n, ents.get(ch) || ch.type + (ch.name ? ':' + ch.name : ''), c.toArray().map((v) => Math.round(v)).join(',')]);
    });
    rows.sort((a, b) => b[0] - a[0]);
    return rows.slice(0, 30).map((r) => r.join(' | ')).join('\n') + '\nTOTAL ' + rows.reduce((a, r) => a + r[0], 0);
  }));
};
