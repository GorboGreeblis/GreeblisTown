// Render isolated portraits: clone each entity's def/builder at an empty spot of open lawn (SPAWN=x,z;
// keep it clear of buildings, whose raised floors would hide a model's lower part), 2 angles, then remove it.
module.exports = async (p, out) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1200);
  const ids = (process.env.IDS || '').split(',').filter(Boolean);
  const res = await p.evaluate(([ids, ANGS, ELEV, DIST, SP]) => {
    const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 500), out = []; O.setSize(360, 360, false); At.visible = false; At.position.set(0, 0, 0);
    const box = new THREE.Box3(), c = new THREE.Vector3(), sz = new THREE.Vector3();
    for (const id of ids) {
      let e = It.byId[id], def, builder, opts;
      if (id === 'keeper') { def = { name: 'PTERO' }; builder = 'jgpKeeper'; opts = {}; }
      else if (id === 'courier') { def = { name: s.name, color: s.color, modelScale: s.modelScale }; builder = s.builder; opts = {}; }
      else if (!e && n[id]) { def = Object.assign({}, n[id]); builder = def.builder; opts = def.builderOpts || {}; }
      else { if (!e) { out.push(null); continue; } def = Object.assign({}, e.def); builder = def.builder || e.def.builder; opts = def.builderOpts || {}; }
      let cl;
      try { cl = It.spawn({ id: null, kind: 'npc', def, builder, opts, x: SP[0], z: SP[1] }); } catch (err) { out.push('ERR ' + err.message); continue; }
      cl.group.rotation.y = 0; try { cl.anim(5.6, 0.016, cl); } catch (err) {} cl.group.updateMatrixWorld(true);
      box.setFromObject(cl.group); box.getCenter(c); box.getSize(sz);
      const r = Math.max(sz.x, sz.y, sz.z) * 0.62 + 0.2, imgs = [];
      for (const a of JSON.parse(ANGS)) { cam.position.set(c.x + Math.sin(a) * r * DIST, c.y + r * ELEV, c.z + Math.cos(a) * r * DIST); cam.lookAt(c); O.render(C, cam); imgs.push(O.domElement.toDataURL('image/png')); }
      It.remove(cl); out.push(imgs);
    }
    O.setSize(innerWidth, innerHeight); return out;
  }, [ids, process.env.ANGS || '[0.55,-2.2]', +(process.env.ELEV || 0.8), +(process.env.DIST || 2.1), (process.env.SPAWN || '-18,24').split(',').map(Number)]);
  const fs = require('fs');
  res.forEach((r, i) => { if (!Array.isArray(r)) { console.log(ids[i], r); return; } r.forEach((d, j) => fs.writeFileSync(out.replace('.png', '_' + ids[i] + '_' + j + '.png'), Buffer.from(d.split(',')[1], 'base64'))); });
  console.log(await p.evaluate(() => JSON.stringify({ err: Re.errors })));
};
