module.exports = async (p, out) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  const cb = JSON.parse(await p.evaluate(() => JSON.stringify(F.buildings.find((q) => q.name === 'church'))));
  console.log(JSON.stringify({ x: cb.x, z: cb.z, ry: cb.ry }));
  const L2W = (lx, ly, lz) => [cb.x + lx * Math.cos(cb.ry) + lz * Math.sin(cb.ry), ly, cb.z - lx * Math.sin(cb.ry) + lz * Math.cos(cb.ry)];
  const V = [
    ['nave_r', [0, 1.7, -9], [6, 1.9, -9]], ['nave_l', [0, 1.7, -9], [-6, 1.9, -9]], ['nave_front', [0, 1.7, -6], [0, 2.5, 0]], ['nave_back', [0, 1.7, -12], [0, 2, -18]],
    ['nave_up', [0, 1.7, -9], [0.5, 9.5, -8]], ['wall_close', [5.4, 1.8, -7.5], [6, 2.6, -7.5]], ['tower_in', [0, 1.7, 1.6], [0, 1.8, -3]], ['tower_door', [0, 1.7, 0.5], [0, 2.2, 3.4]],
    ['corner', [5.5, 1.7, -0.6], [3, 1.6, 0]], ['base', [3, 0.9, -17.6], [4, 0.6, -18.5]],
  ];
  for (const [name, pos, look] of V) {
    await p.evaluate(([a, b2]) => {
      const cam = window.__cam || (window.__cam = B.clone());
      cam.position.set(...a); cam.lookAt(...b2); cam.fov = 80; cam.near = 0.05; cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix();
      if (!window.__r) { window.__r = O.render.bind(O); O.render = (s, c) => window.__r(s, window.__cam); }
      At.position.set(0, 0, 10);
    }, [L2W(...pos), L2W(...look)]);
    await p.waitForTimeout(900);
    await p.screenshot({ path: out.replace('.png', '_' + name + '.png') });
  }
};
