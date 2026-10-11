module.exports = async (p) => {
  await p.mouse.click(100, 100); await p.waitForTimeout(2000);
  const snap = () => p.evaluate(() => {
    const bad = It.all.filter(e => !isFinite(e.group.position.x + e.group.position.y + e.group.position.z)).map(e => e.def.name);
    const pl = At.position;
    return { t: +Re.t.toFixed(1), err: Re.errors, mem: Object.assign({}, O.info.memory), calls: O.info.render.calls, tris: O.info.render.triangles, sceneKids: C.children.length, Lcbs: L.length, bad, player: [pl.x, pl.z].map(v => +v.toFixed(1)), inBuilding: F.buildings.filter(B => { const [lx, lz] = F.local(B, pl.x, pl.z); return B.parts.some(R => lx > R[0] && lx < R[2] && lz > R[1] && lz < R[3]); }).map(B => B.name) };
  });
  console.log('start', JSON.stringify(await snap()), await p.evaluate(() => jt.top));
  const targets = [[-20, 30], [-28, 0], [-24, -24], [24, -24], [27, 34], [0, 40], [30, 0], [-10, -30], [20, 20], [-30, 40]];
  for (let r = 0; r < 3; r++) for (const [tx, tz] of targets) {
    for (let k = 0; k < 14; k++) {
      await p.evaluate(([tx, tz]) => { const a = At.position, dx = tx - a.x, dz = tz - a.z; we.headYaw = Math.atan2(-dx, -dz); }, [tx, tz]);
      await p.keyboard.down('KeyW'); await p.waitForTimeout(400); await p.keyboard.up('KeyW');
    }
    const s = await snap();
    if (s.err || s.bad.length || s.inBuilding.length) console.log('ISSUE', JSON.stringify(s));
  }
  await p.evaluate(() => { bo.move.x = 0; bo.move.y = 0; });
  console.log('end', JSON.stringify(await snap()));
};
