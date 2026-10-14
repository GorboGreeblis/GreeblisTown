// Views of the town and close-ups of creatures, rendered for checking by eye at 800×600 px. Each view names a target
// and a camera offset from it:
// - a building collider name from F.buildings ("shop" is the Library; "post", "sheriff", "garden", "church", "juice",
//   "gallery"): offset [right, up, front] in the building's own frame (front is the way it faces), up from the ground;
// - "parcel" (the one readable parcel in the mail pile) or [x, z]: world offset [dx, dy, dz];
// - a creature, by entity id or by name: world offset [dx, dy, dz], dy from the ground (near plane 0.05 m).
// The camera looks at the target, at the look height (m) above the ground (default 1) or the parcel (default 0).
// Env: VIEWS (JSON [[name, target, offset, look height, fov°], …]; fov default 55, 50 for a creature); AWAY=1 (moves
//   the player away first and waits 4 game s: a creature turns to face a player near it).
// Output: `err <n>`; <out>_<name>.png per view.
//   VIEWS='[["post","post",[0,4,14],2,50],["leg","blinker",[1.2,0.9,-1.2],0.5,35]]' NOSHOT=1 node test/shot.js <url> x.png test/t_views.js
const { start, waitGame, render, outName, logErrors } = require('./lib.js');

module.exports = async (p, out) => {
  await start(p);
  if (process.env.AWAY) { await p.evaluate(() => At.position.set(0, 0, 44)); await waitGame(p, 4); }
  for (const [name, target, off, ly, fov] of JSON.parse(process.env.VIEWS || '[]')) {
    const v = await p.evaluate(([target, off, ly]) => {
      const look = (x, y, z, dy = 1) => [x, y + (ly === undefined || ly === null ? dy : ly), z];
      if (target === 'parcel') {
        // (the trimmed three.js keeps no geometry parameters: the label is the 256 x 128 canvas texture nearest the
        // mail pile's open end, local (2.55, -4.9) behind the Post Office)
        const Bp = F.buildings.find((q) => q.name === 'post'), [px, pz] = F.world(Bp, 2.55, -4.9), w = new THREE.Vector3();
        let m = null, best = 1e9;
        C.traverse((o) => { const im = o.isMesh && o.material && o.material.map && o.material.map.image; if (!im || im.width !== 256 || im.height !== 128) return; o.getWorldPosition(w); const d = Math.hypot(w.x - px, w.z - pz); d < best && ((best = d), (m = o)); });
        m.getWorldPosition(w);
        return { cam: [w.x + off[0], w.y + off[1], w.z + off[2]], look: look(w.x, w.y, w.z, 0) };
      }
      if (Array.isArray(target)) return { cam: [target[0] + off[0], off[1], target[1] + off[2]], look: look(target[0], 0, target[1]) };
      const B = F.buildings.find((q) => q.name === target);
      // (the building's frame: local x (right) and z (front) in the world)
      if (B) return { cam: [B.x + B.c * off[0] + B.s * off[2], off[1], B.z - B.s * off[0] + B.c * off[2]], look: look(B.x, 0, B.z) };
      const e = It.byId[target] || It.all.find((q) => q.def && q.def.name === target);
      if (!e) return null;
      const q = e.group.position;
      return { cam: [q.x + off[0], off[1], q.z + off[2]], look: look(q.x, 0, q.z), creature: !0 };
    }, [target, off, ly]);
    if (!v) { console.log(name + ': no target ' + JSON.stringify(target)); continue; }
    await render(p, outName(out, name), v.cam, v.look, v.creature ? { fov: fov || 50, near: 0.05 } : { fov: fov || 55, near: 0.15, far: 400 });
  }
  await logErrors(p);
};
