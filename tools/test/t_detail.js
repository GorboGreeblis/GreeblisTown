// Close shots of named spots in the town, for checking small details: DETAILS is a JSON list of
// [name, [camX, camY, camZ], [lookX, lookY, lookZ]]; each is rendered at 800x600 to <out>_<name>.png.
//   DETAILS='[["cart",[42,1.5,-19],[39.4,0.6,-21.5]]]' VW=320 VH=240 NOSHOT=1 node shot2.js <url> x.png ./t_detail.js
module.exports = async (p, out) => {
  const fs = require('fs'), W = (ms) => p.waitForTimeout(ms);
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await W(1500);
  const list = JSON.parse(process.env.DETAILS || '[]');
  for (const [name, cam, look] of list) {
    const d = await p.evaluate(([cam, look]) => {
      const c = new THREE.PerspectiveCamera(45, 4 / 3, 0.05, 400); c.position.set(...cam); c.lookAt(...look);
      const fog = C.fog; C.fog = null; O.setSize(800, 600, !1); O.render(C, c); const d = O.domElement.toDataURL('image/png'); O.setSize(innerWidth, innerHeight); C.fog = fog; return d;
    }, [cam, look]);
    fs.writeFileSync(out.replace('.png', '_' + name + '.png'), Buffer.from(d.split(',')[1], 'base64'));
  }
  console.log('shots', list.length, '| err', await p.evaluate(() => Re.errors));
};
