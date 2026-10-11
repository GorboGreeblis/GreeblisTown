module.exports = async (p, out) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  const d = await p.evaluate((kinds) => {
    const hidden = []; C.children.forEach((ch) => { if (ch.visible && !ch.isLight) { hidden.push(ch); ch.visible = false; } });
    const g = new THREE.Group(); C.add(g);
    kinds.forEach((k, i) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.42, 40, 28), JGP.KIT.surf(k, '#7ac8d8', { rep: 2 }));
      m.position.set((i % 6) - 2.5, 100 - Math.floor(i / 6) * 1.05, 0); g.add(m);
    });
    const cam = new THREE.PerspectiveCamera(30, 6 / 3.4, 0.1, 50); cam.position.set(0, 100 - 1.05, 9.6); cam.lookAt(0, 100 - 1.05, 0);
    O.setSize(1500, 850, false); O.render(C, cam); const img = O.domElement.toDataURL('image/png');
    C.remove(g); hidden.forEach((h) => (h.visible = true)); return img;
  }, JSON.parse(process.env.KINDS));
  require('fs').writeFileSync(out, Buffer.from(d.split(',')[1], 'base64'));
};
