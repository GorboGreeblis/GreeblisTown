module.exports = async (p, out) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  const cb = JSON.parse(await p.evaluate(() => JSON.stringify(F.buildings.find((q) => q.name === 'church'))));
  const L2W = (lx, ly, lz) => [cb.x + lx * Math.cos(cb.ry) + lz * Math.sin(cb.ry), ly, cb.z - lx * Math.sin(cb.ry) + lz * Math.cos(cb.ry)];
  const V = [['right', [10.5, 5.15, -9], [6, 5.15, -9]], ['left', [-10.5, 5.15, -9], [-6, 5.15, -9]]];
  for (const [name, pos, look] of V) {
    await p.evaluate(([a, b2]) => {
      const cam = window.__cam || (window.__cam = B.clone());
      cam.position.set(...a); cam.lookAt(...b2); cam.fov = 75; cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix();
      if (!window.__r) { window.__r = O.render.bind(O); O.render = (s, c) => window.__r(s, window.__cam); }
      At.position.set(0, 0, 10);
    }, [L2W(...pos), L2W(...look)]);
    await p.waitForTimeout(1000);
    await p.screenshot({ path: out.replace('.png', '_' + name + '.png') });
  }
  console.log(await p.evaluate(() => 'err ' + Re.errors));
};
