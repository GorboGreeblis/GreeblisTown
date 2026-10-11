module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(2000);
  console.log(await p.evaluate(() => {
    const cnt = (g) => { let m = 0, tri = 0, mats = new Set(); g.traverse(o => { if (o.isMesh) { m++; mats.add(o.material.uuid); const gg = o.geometry; tri += (gg.index ? gg.index.count : gg.attributes.position.count) / 3; } }); return [m, Math.round(tri), mats.size]; };
    const out = It.all.map(e => [e.def.name].concat(cnt(e.group)));
    let tot = 0, totT = 0; C.traverse(o => { if (o.isMesh || o.isInstancedMesh) { tot++; } });
    out.push(['SCENE meshes', tot]);
    const top = C.children.map(c => [c.name || c.type, ...cnt(c)]).sort((a, b) => b[1] - a[1]).slice(0, 12);
    return JSON.stringify({ out, top });
  }));
};
