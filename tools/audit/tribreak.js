// The scene's budget: per creature the meshes, triangles and distinct materials its build holds; then per top-level
// scene part (named by creature where it is one) its visible triangles (instances counted), mesh count and centre,
// the 30 largest; then the totals.
// Env: none.
// Output: `== creatures (meshes / triangles / materials)` and one `<name> | <m> | <t> | <n>` line per creature;
//   `== scene parts (visible triangles | meshes | part | centre), the 30 largest` and one line per part; then
//   `TOTAL <triangles> visible triangles, <meshes> meshes in the scene`.
//   NOSHOT=1 node test/shot.js <url> x.png audit/tribreak.js
const { start } = require('../test/lib.js');

module.exports = async (p) => {
  await start(p, 2500);
  console.log(await p.evaluate(() => {
    const tri = (m) => { const g = m.geometry; if (!g) return 0; const n = g.index ? g.index.count : g.attributes.position ? g.attributes.position.count : 0; return (n / 3) * (m.isInstancedMesh ? m.count : 1); };
    // (a creature's build: every mesh under its group, shown or not)
    const build = (g) => { let m = 0, t = 0; const mats = new Set(); g.traverse((o) => { if (o.isMesh) { m++; mats.add(o.material.uuid); t += tri(o); } }); return [m, Math.round(t), mats.size]; };
    const creatures = It.all.map((e) => [e.def.name, ...build(e.group)].join(' | '));
    const ents = new Map(); It.all.forEach((e) => ents.set(e.group, e.def.name));
    const rows = [];
    C.children.forEach((ch) => {
      let t = 0, n = 0; ch.traverseVisible((o) => { if (o.isMesh) { t += tri(o); n++; } });
      const c = new THREE.Box3().setFromObject(ch).getCenter(new THREE.Vector3());
      rows.push([Math.round(t), n, ents.get(ch) || ch.type + (ch.name ? ':' + ch.name : ''), c.toArray().map((v) => Math.round(v)).join(',')]);
    });
    rows.sort((a, b) => b[0] - a[0]);
    let meshes = 0; C.traverse((o) => o.isMesh && meshes++);
    return ['== creatures (meshes / triangles / materials)', ...creatures, '== scene parts (visible triangles | meshes | part | centre), the 30 largest', ...rows.slice(0, 30).map((r) => r.join(' | ')), 'TOTAL ' + rows.reduce((a, r) => a + r[0], 0) + ' visible triangles, ' + meshes + ' meshes in the scene'].join('\n');
  }));
};
