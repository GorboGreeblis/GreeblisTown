// Distant fence coverage under subpixel head motion, isolated from unrelated animated scenery and ground textures.
// Count the central 20% of eye columns, present in both builds: merged card triangles have coarser extraction edges.
// Extracts triangles on the east boundary from either build, retaining its materials, UVs and vertex colours.
// Checks foreground/background transparency at a real near picket.
// Checks town window day/night lighting and reports closed-box mesh counts.
// Also saves full-scene near/transition/far/back/oblique views for appearance checks and reports per-eye draw counts.
// Env: PX (eye width/height, default 1200); EYE (height, default 3.12); THRESH (channel change, default 40).
// NOSHOT=1 VW=320 VH=240 node test/shot.js <url> x.png test/t_vrcomfort.js
const { start, savePng, outName, log, logErrors } = require('./lib.js');
module.exports = async (p, out) => {
  await start(p, 2500);
  const rows = await p.evaluate(([px, eye, threshold]) => {
    O.setAnimationLoop(null); O.setPixelRatio(1); O.setSize(px, px, false); C.updateMatrixWorld(true);
    At.visible = false;
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#a8c0cb'); scene.fog = C.fog;
    C.traverse((o) => { if (o.isLight) scene.add(o.clone()); });
    let triangles = 0;
    C.traverse((o) => {
      if (!o.isMesh || !o.name.startsWith('town_')) return;
      const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry, pos = g.attributes.position, keep = [];
      const v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i += 3) {
        let inside = true;
        for (let j = 0; j < 3; j++) {
          v.set(pos.getX(i + j), pos.getY(i + j), pos.getZ(i + j)).applyMatrix4(o.matrixWorld);
          if (Math.abs(v.x - 37.6) > 0.045 || v.y < -0.01 || v.y > 1.05 || Math.abs(v.z) > 30) inside = false;
        }
        if (inside) keep.push(i, i + 1, i + 2);
      }
      if (!keep.length) return;
      const subset = new THREE.BufferGeometry();
      for (const [name, attr] of Object.entries(g.attributes)) {
        const values = new Float32Array(keep.length * attr.itemSize);
        keep.forEach((i, j) => { for (let k = 0; k < attr.itemSize; k++) values[j * attr.itemSize + k] = attr.array[i * attr.itemSize + k]; });
        subset.setAttribute(name, new THREE.BufferAttribute(values, attr.itemSize));
      }
      const mesh = new THREE.Mesh(subset, o.material); mesh.matrixAutoUpdate = false; mesh.matrix.copy(o.matrixWorld); mesh.renderOrder = o.renderOrder;
      scene.add(mesh); triangles += keep.length / 3;
    });
    if (triangles < 100) throw new Error('Fence extraction empty: ' + triangles);
    const gl = O.getContext(), cam = new THREE.PerspectiveCamera(96, 1, 0.15, 310);
    const png = () => O.domElement.toDataURL('image/png');
    const render = (s) => { O.render(s, cam); const b = new Uint8Array(px * px * 4); gl.readPixels(0, 0, px, px, gl.RGBA, gl.UNSIGNED_BYTE, b); return b; };
    const out = [];
    for (const [name, x, z] of [['near',31.6,0], ['transition',14.6,0], ['far',-20,0], ['back',80,0], ['oblique',0,-28]]) {
      const look = () => { cam.lookAt(37.6, 0.52, 0); cam.updateMatrixWorld(true); };
      cam.position.set(x, eye, z); look();
      render(C); const full = png(), calls = O.info.render.calls, tris = O.info.render.triangles;
      const base = render(scene), isolated = png(), hot = new Uint8Array(px * px), counts = [];
      let absolute = 0;
      for (const n of [[.001,0,0,0], [0,.001,0,0], [0,0,.0001745,0], [0,0,0,.0001745]]) {
        cam.position.set(x, eye, z); look();
        cam.position.x += n[0]; cam.position.y += n[1]; cam.rotation.y += n[2]; cam.rotation.x += n[3]; cam.updateMatrixWorld(true);
        const b = render(scene); let count = 0;
        for (let k = 0; k < b.length; k += 4) {
          const x = (k / 4) % px;
          if (x < px * 0.4 || x >= px * 0.6) continue;
          const d = Math.max(Math.abs(b[k]-base[k]),Math.abs(b[k+1]-base[k+1]),Math.abs(b[k+2]-base[k+2]));
          absolute += d; if (d > threshold) { count++; hot[k/4] = 1; }
        }
        counts.push(count);
      }
      out.push({ name, hot: hot.reduce((a,b)=>a+b,0), counts, absolute, calls, tris, triangles, full, isolated });
    }
    // A translucent foreground object must blend over the iron; a background object must stay behind solid bars.
    cam.position.set(31.6, 0.52, 0.03); cam.lookAt(37.6, 0.52, 0.03); cam.updateMatrixWorld(true);
    const before = render(scene), mid = px >> 1;
    let sample = 0, darkest = 256;
    for (let x = mid - 5; x <= mid + 5; x++) {
      const k = (mid * px + x) * 4;
      if (before[k + 1] < darkest) { darkest = before[k + 1]; sample = k; }
    }
    if (darkest > 150) throw new Error('No near bar at blend sample');
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide }));
    panel.rotation.y = -Math.PI / 2; panel.position.set(36.6, 0.52, 0.03); scene.add(panel);
    const front = render(scene)[sample + 1], expected = (darkest + 255) / 2;
    if (Math.abs(front - expected) > 8) throw new Error('Fence overdraws translucent foreground: ' + front + ' expected ' + expected);
    panel.position.x = 38.6;
    const back = render(scene)[sample + 1];
    if (Math.abs(back - darkest) > 8) throw new Error('Translucent background leaks through solid bar: ' + back + ' expected ' + darkest);
    return { rows: out, blend: { foreground: front, expected, background: back, bar: darkest } };
  }, [+(process.env.PX || 1200), +(process.env.EYE || 3.12), +(process.env.THRESH || 40)]);
  for (const {name, full, isolated, ...r} of rows.rows) {
    savePng(outName(out, name), full); savePng(outName(out, name + '_isolated'), isolated); log(name + ' ' + JSON.stringify(r));
  }
  log('transparency ' + JSON.stringify(rows.blend));
  const materials = await p.evaluate(() => {
    const lit = []; let solids = 0;
    C.traverse((o) => {
      if (!o.isMesh) return;
      if (/^town_lit/.test(o.name)) lit.push(o.material);
      if (/^town_.*Solid/.test(o.name)) {
        if (o.material.side !== THREE.FrontSide) throw new Error('Closed box still draws rear faces');
        solids++;
      }
    });
    if (!lit.length) throw new Error('No town window materials');
    const tick = () => { for (const f of L) f(performance.now(), 1 / 72); };
    I.setNight(1); tick();
    if (lit.some((m) => Math.abs(m.emissive.r - 0.95) > 0.001)) throw new Error('Town windows failed to light at night');
    I.setNight(0); tick();
    if (lit.some((m) => m.emissive.r !== 0)) throw new Error('Town windows failed to reset in daytime');
    return { solids, litMeshes: lit.length, nightDay: 'passed' };
  });
  log('materials ' + JSON.stringify(materials));
  await logErrors(p);
};
