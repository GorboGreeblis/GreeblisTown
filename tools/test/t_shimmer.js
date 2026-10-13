// A VR headset's shimmer, simulated: from standing spots round the park the scene is rendered as one eye sees it
// (square, a 96° lens, 1600 px across: about 17 px a degree, near a Quest's 20), then rendered again four times
// with the head nudged by less than a pixel (a millimetre sideways and up, a hundredth of a degree of yaw and
// pitch). Nothing moves in the world between those renders, so a pixel that changes a lot is one the head's own
// smallest motion makes flicker: a thin picket, a far edge, a texture with no mipmaps, two faces fighting.
// For each spot: how many pixels flicker, and which things they land on (up to RAYS rays, default 700, cast
// through the flickering pixels and named by owner as t_perf names them, with the mean distance), plus a heat
// map PNG, <out>_<spot>.png (the view dimmed, flickering pixels red). SPOTS (JSON {name: [x, z, yawDeg, pitchDeg]})
// replaces the built-in spots; PX sets the size; THRESH the change (0 to 255 on a channel) that counts, default 40.
//   VW=320 VH=240 NOSHOT=1 node shot.js <url> x.png ./t_shimmer.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(160, 120); await W(2500);
  const PX = +(process.env.PX || 1600), TH = +(process.env.THRESH || 40), RAYS = +(process.env.RAYS || 700);
  const SPOTS = process.env.SPOTS ? JSON.parse(process.env.SPOTS) : {
    spawn_billboard: [-36.3, -20, -118, 8], spawn_park: [-36.3, -20, 62, 0], garden_to_church: [0, 8, 180, 2],
    floor_north: [-28, 10, 0, 0], post_office_sw: [18, -18, 45, 0], gate_north: [0, 36, 0, 2], secret_room: null,
  };
  for (const [name, spot] of Object.entries(SPOTS)) {
    const r = await p.evaluate(async ([name, spot, PX, TH, RAYS]) => {
      const gl = O.getContext();
      let E, yaw, pitch;
      // (never exactly level: at a pitch of exactly 0 the renderer's own precision makes a frame differ from the next in
      // ways no headset ever shows; a real head is never at 0.000°, so a level spot is pitched 0.3° down)
      if (spot) { E = new THREE.Vector3(spot[0], 1.6, spot[1]); yaw = (spot[2] * Math.PI) / 180; pitch = ((spot[3] || -0.3) * Math.PI) / 180; }
      else {
        // (the secret room: 2.4 m from the ANCIENT, looking at it and a little down at the floor)
        const sl = JGP.slug && JGP.slug.ent; if (!sl) return null; const g = sl.group.position;
        const a = Math.atan2(-g.x, -g.z); E = new THREE.Vector3(g.x + 2.4 * Math.sin(a + Math.PI), 1.6, g.z + 2.4 * Math.cos(a + Math.PI));
        E.set(g.x - 2.4 * Math.sin(a), 1.6, g.z - 2.4 * Math.cos(a)); yaw = Math.atan2(g.x - E.x, g.z - E.z); pitch = -0.35;
      }
      const cam = new THREE.PerspectiveCamera(96, 1, 0.15, B.far), hidden = At.visible; At.visible = !1;
      const look = (dx, dy, dyaw, dpitch) => {
        cam.position.set(E.x + dx, E.y + dy, E.z); cam.rotation.set(0, 0, 0, 'YXZ'); cam.rotation.y = yaw + dyaw; cam.rotation.x = pitch + dpitch; cam.updateMatrixWorld(!0);
      };
      const shot = () => { O.setSize(PX, PX, !1); O.render(C, cam); const b = new Uint8Array(PX * PX * 4); gl.readPixels(0, 0, PX, PX, gl.RGBA, gl.UNSIGNED_BYTE, b); return b; };
      look(0, 0, 0, 0); const base = shot();
      const J = 0.0001745; // (a hundredth of a degree)
      const nudges = [[0.001, 0, 0, 0], [0, 0.001, 0, 0], [0, 0, J, 0], [0, 0, 0, J]];
      const hot = new Uint8Array(PX * PX); let n = 0; const byNudge = [];
      for (const [dx, dy, dyw, dp] of nudges) {
        look(dx, dy, dyw, dp); const f = shot(); let nn = 0;
        for (let k = 0, q = 0; k < f.length; k += 4, q++) {
          const d = Math.max(Math.abs(f[k] - base[k]), Math.abs(f[k + 1] - base[k + 1]), Math.abs(f[k + 2] - base[k + 2]));
          d > TH && (nn++, hot[q] || ((hot[q] = 1), n++));
        }
        byNudge.push(nn);
      }
      // (what the flickering pixels land on: rays through a sample of them)
      look(0, 0, 0, 0);
      // (the owner's name, then how its material samples: a texture with mipmaps, one without, or one magnified
      // nearest; and for a nameless mesh its material's colour, so a patch of flicker can be traced to its surface)
      const tex = (o) => {
        const m = Array.isArray(o.material) ? o.material[0] : o.material, t = m && m.map;
        return ' [' + (t ? (t.generateMipmaps ? 'mip' : 'NO MIP') + (t.magFilter === THREE.NearestFilter ? ' nearest' : '') + (t.image ? ' ' + t.image.width + 'x' + t.image.height : '') : m && m.vertexColors ? 'vcol' : m && m.color ? '#' + m.color.getHexString() : 'flat') + (m && m.transparent ? ' transp' : '') + ']';
      };
      const own = (o, c) => {
        for (let a = o; a; a = a.parent) { const e = It.all.find((q) => q.group === a); if (e) return 'creature ' + e.def.name; }
        if (st.group) for (let a = o; a; a = a.parent) if (a === st.group) return 'creature SPARKAKUS';
        for (let a = o; a; a = a.parent) if (a.name) return a.name + tex(o);
        if (o.geometry.boundingSphere && o.geometry.boundingSphere.radius > 100) return 'ground' + tex(o);
        for (const Bd of F.buildings) if (F.inHull(Bd, c.x, c.z, 1.5)) return 'building ' + Bd.name + tex(o);
        if (Math.hypot(c.x, c.z) < JGP.GARDEN_R + 1.5) return 'garden' + tex(o);
        const zs = z.list.find((q) => Math.hypot(q.x - c.x, q.z - c.z) < 4); if (zs) return 'station ' + zs.id + tex(o);
        return `at ${c.x.toFixed(0)},${c.z.toFixed(0)}` + tex(o);
      };
      const meshes = []; C.traverse((o) => { if (!o.isMesh || o.parent === gcEB.root) return; let v = o; for (; v && v !== C; v = v.parent) if (!v.visible) return; meshes.push(o); });
      const rc = new THREE.Raycaster(); rc.layers.mask = 0xffffffff; rc.far = 400;
      const idx = []; for (let q = 0; q < PX * PX; q++) hot[q] && idx.push(q);
      const step = Math.max(1, Math.floor(idx.length / RAYS)), by = {}, v2 = new THREE.Vector2();
      let cast = 0, missed = 0;
      for (let i = 0; i < idx.length; i += step) {
        const q = idx[i], px = q % PX, py = PX - 1 - Math.floor(q / PX);
        v2.set((px / PX) * 2 - 1, -((py / PX) * 2 - 1)); rc.setFromCamera(v2, cam);
        let best = null;
        for (const m of meshes) { const h = rc.intersectObject(m, !1); if (h.length && (!best || h[0].distance < best.distance)) best = h[0]; }
        cast++;
        if (!best) { missed++; continue; }
        const k = own(best.object, best.point); const e = (by[k] = by[k] || { n: 0, d: 0 }); e.n++; e.d += best.distance;
      }
      const rows = Object.entries(by).sort((a, b) => b[1].n - a[1].n).slice(0, 12).map(([k, v]) => `${k}: ${((100 * v.n) / Math.max(1, cast - missed)).toFixed(0)}% at ${(v.d / v.n).toFixed(0)} m`);
      // (the heat map, at a quarter size)
      const S = 400, cv = document.createElement('canvas'); cv.width = cv.height = S; const cx = cv.getContext('2d'), im = cx.createImageData(S, S);
      for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
        const sx = Math.floor((i * PX) / S), sy = Math.floor((j * PX) / S), q = (PX - 1 - sy) * PX + sx, k = 4 * q, o = 4 * (j * S + i);
        let h = 0; for (let a = 0; a < 4 && !h; a++) for (let b2 = 0; b2 < 4 && !h; b2++) h = hot[(PX - 1 - Math.min(PX - 1, sy + a)) * PX + Math.min(PX - 1, sx + b2)];
        im.data[o] = h ? 255 : base[k] >> 1; im.data[o + 1] = h ? 40 : base[k + 1] >> 1; im.data[o + 2] = h ? 40 : base[k + 2] >> 1; im.data[o + 3] = 255;
      }
      cx.putImageData(im, 0, 0);
      O.setSize(innerWidth, innerHeight); At.visible = hidden;
      return { n, pct: +((100 * n) / (PX * PX)).toFixed(2), byNudge, cast, missed, rows, png: cv.toDataURL('image/png') };
    }, [name, spot, PX, TH, RAYS]);
    if (!r) { log(name, ': no such spot'); continue; }
    fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(r.png.split(',')[1], 'base64'));
    log(name + ': ' + r.n + ' flickering pixels (' + r.pct + '% of the eye; by nudge 1 mm x / 1 mm y / 0.01° yaw / 0.01° pitch: ' + r.byNudge.join(' / ') + ') | on: ' + r.rows.join(' | ') + (r.missed ? ' | ' + r.missed + ' of ' + r.cast + ' rays hit nothing' : ''));
  }
  log('err', await p.evaluate(() => Re.errors));
};
