// Renders the town from fixed viewpoints: VIEWS is a JSON list of [name, camPos, lookAt], each rendered at 960×540 to
// <out>_<name>.png; prints the error count. envsheet.sh runs it and tiles the results into one sheet.
// Run (from this folder): VIEWS='[["sq",[0,30,40],[0,0,0]]]' NOSHOT=1 node ../../test/shot2.js <url> town.png ./env.js
module.exports = async (p, out) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  const views = JSON.parse(process.env.VIEWS || '[]');
  const res = await p.evaluate((views) => {
    const cam = new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 900), out = [];
    O.setSize(960, 540, false);
    for (const [name, pos, at] of views) { cam.position.set(...pos); cam.lookAt(...at); O.render(C, cam); out.push([name, O.domElement.toDataURL('image/png')]); }
    O.setSize(innerWidth, innerHeight); return out;
  }, views);
  const fs = require('fs');
  res.forEach(([n, d]) => fs.writeFileSync(out.replace('.png', '_' + n + '.png'), Buffer.from(d.split(',')[1], 'base64')));
  console.log(await p.evaluate(() => JSON.stringify({ err: Re.errors })));
};
