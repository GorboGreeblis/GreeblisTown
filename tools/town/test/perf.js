module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(3000);
  const r = await p.evaluate(async () => {
    const out = {};
    let tri = 0, calls = 0, geos = 0;
    O.info.autoReset = false; O.info.reset(); O.render(C, B);
    tri = O.info.render.triangles; calls = O.info.render.calls; geos = O.info.memory.geometries;
    O.info.autoReset = true;
    // overview: camera high above the clearing so every row is in view
    const cam = B.clone(); cam.position.set(0, 60, 45); cam.lookAt(0, 0, 0); cam.far = 400; cam.updateProjectionMatrix();
    O.info.autoReset = false; O.info.reset(); O.render(C, cam);
    out.all = { tri: O.info.render.triangles, calls: O.info.render.calls };
    O.info.autoReset = true;
    let meshes = 0; C.traverse((o) => o.isMesh && meshes++);
    const t0 = performance.now(), f0 = Re.frames || 0;
    await new Promise((res) => setTimeout(res, 3000));
    return Object.assign(out, { view: { tri, calls }, geos, meshes, textures: O.info.memory.textures, programs: O.info.programs.length, errors: Re.errors });
  });
  console.log(JSON.stringify(r));
};
