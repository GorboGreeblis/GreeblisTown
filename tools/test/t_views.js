// Renders chosen views of the town for checking by eye. VIEWS (JSON) is a list of [name, target, offset, look
// height, fov]: target is a building collider name from F.buildings ("shop" = the Library, "post",
// "sheriff", "garden", "church", "juice"), "parcel" (the one readable parcel in the mail pile), or [x, z];
// offset is [right, up, front] in the target's own frame (front = the way it faces) for a building, or
// world [dx, dy, dz] otherwise. Writes <out>_<name>.png. AWAY=1 first moves the player out of the way.
module.exports = async (p, out) => {
  const fs = require('fs');
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  if (process.env.AWAY) { await p.evaluate(() => At.position.set(0, 0, 44)); await p.waitForTimeout(4000); }
  for (const [name, target, off, ly, fov] of JSON.parse(process.env.VIEWS || '[]')) {
    const img = await p.evaluate(([target, off, ly, fov]) => {
      let cx, cz, c = 1, s = 0, at;
      if (target === 'parcel') {
        // (the trimmed three.js keeps no geometry parameters: the label is the 256 x 128 canvas texture nearest
        // the mail pile's open end, local (2.55, -4.9) behind the Post Office)
        const Bp = F.buildings.find((q) => q.name === 'post'), [px, pz] = F.world(Bp, 2.55, -4.9), v = new THREE.Vector3();
        let m = null, best = 1e9;
        C.traverse((o) => { const im = o.isMesh && o.material && o.material.map && o.material.map.image; if (!im || im.width !== 256 || im.height !== 128) return; o.getWorldPosition(v); const d = Math.hypot(v.x - px, v.z - pz); d < best && ((best = d), (m = o)); });
        m.getWorldPosition(v); cx = v.x; cz = v.z; at = v.clone();
      } else if (Array.isArray(target)) (cx = target[0]), (cz = target[1]);
      else { const B = F.buildings.find((q) => q.name === target); (cx = B.x), (cz = B.z), (c = B.c), (s = B.s); }
      // the target's frame: local x (right) and z (front) in the world
      const rx = c, rz = -s, fx = s, fz = c;
      const cam = new THREE.PerspectiveCamera(fov || 55, 4 / 3, 0.15, 400);
      if (Array.isArray(target) || target === 'parcel') cam.position.set(cx + off[0], (at ? at.y : 0) + off[1], cz + off[2]);
      else cam.position.set(cx + rx * off[0] + fx * off[2], off[1], cz + rz * off[0] + fz * off[2]);
      cam.lookAt(cx, at ? at.y + (ly || 0) : ly || 1, cz);
      O.setSize(800, 600, !1); O.render(C, cam); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
    }, [target, off, ly, fov]);
    fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(img.split(',')[1], 'base64'));
  }
  console.log('err', await p.evaluate(() => Re.errors));
};
