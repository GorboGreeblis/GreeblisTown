// Isolated portraits: each creature's builder spawned alone on open lawn, rendered at 360×360 px from two angles, then
// removed. Besides entity ids, IDS takes `keeper` (SPARKAKUS), `courier` (NEXTESSA) and the ids of the extra
// definitions. SPAWN must be open lawn: a building's raised floor would hide a model's lower part.
// Env: IDS (comma list); SPAWN (x,z, default -18,24); ANGS (JSON list of camera angles, rad, default [0.55,-2.2]);
//   ELEV (camera height, in model sizes, default 0.8); DIST (camera distance, in model sizes, default 2.1).
// Output: `<id> null` or `<id> ERR …` for an id that cannot be built, then `{"err":<n>}`; <out>_<id>_<n>.png.
//   IDS=p_gemtoe,keeper VW=320 VH=240 NOSHOT=1 node test/shot.js <url> x.png test/portraits.js
const { start, savePng, outName } = require('./lib.js');

module.exports = async (p, out) => {
  await start(p, 1200);
  const ids = (process.env.IDS || '').split(',').filter(Boolean);
  const res = await p.evaluate(([ids, ANGS, ELEV, DIST, SP]) => {
    const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 500), out = []; O.setSize(360, 360, false); At.visible = false; At.position.set(0, 0, 0);
    const box = new THREE.Box3(), c = new THREE.Vector3(), sz = new THREE.Vector3();
    for (const id of ids) {
      let e = It.byId[id], def, builder, opts;
      if (id === 'keeper') { def = { name: 'SPARKAKUS' }; builder = 'born_sparkakus'; opts = {}; }
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
  res.forEach((r, i) => { if (!Array.isArray(r)) { console.log(ids[i], r); return; } r.forEach((d, j) => savePng(outName(out, ids[i] + '_' + j), d)); });
  console.log(await p.evaluate(() => JSON.stringify({ err: Re.errors })));
};
