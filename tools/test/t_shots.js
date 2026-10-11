// renders views of the moved creatures: [name, entity id, camera offset from the creature (world), look height]
module.exports = async (p, out) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1000); if (process.env.AWAY) { await p.evaluate(() => At.position.set(30, 0, -30)); await p.waitForTimeout(15000); }
  const V = JSON.parse(process.env.VIEWS || '[]');
  const fs = require('fs');
  for (const [name, id, off, ly, fov] of V) {
    const img = await p.evaluate(([id, off, ly, fov]) => {
      const e = It.byId[id] || It.all.find((q) => q.def.name === id), q = e.group.position;
      const cam = new THREE.PerspectiveCamera(fov || 50, 4 / 3, 0.05, 300);
      cam.position.set(q.x + off[0], off[1], q.z + off[2]); cam.lookAt(q.x, ly, q.z);
      O.setSize(800, 600, false); O.render(C, cam); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); return d;
    }, [id, off, ly, fov]);
    fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(img.split(',')[1], 'base64'));
  }
  console.log('err', await p.evaluate(() => Re.errors));
};
