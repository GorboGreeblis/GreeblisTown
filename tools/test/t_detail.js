// Close shots of chosen spots in the town, for checking small details: each rendered at 800×600 px with the fog off,
// from an absolute camera position towards an absolute point.
// Env: DETAILS (JSON [[name, [camera x, y, z], [look x, y, z]], …]); HIDE=1 (hides the avatar first, for a shot from
//   where the player stands).
// Output: `shots <n> | err <n>`; <out>_<name>.png per shot.
//   DETAILS='[["cart",[42,1.5,-19],[39.4,0.6,-21.5]]]' VW=320 VH=240 NOSHOT=1 node test/shot.js <url> x.png test/t_detail.js
const { start, render, outName } = require('./lib.js');

module.exports = async (p, out) => {
  await start(p);
  process.env.HIDE === '1' && (await p.evaluate(() => { At.visible = !1; }));
  const list = JSON.parse(process.env.DETAILS || '[]');
  for (const [name, cam, look] of list) await render(p, outName(out, name), cam, look, { fov: 45, near: 0.05, far: 400, fog: false });
  console.log('shots', list.length, '| err', await p.evaluate(() => Re.errors));
};
