// The whole town from straight above: renders through a camera 120 m up looking down (square aspect, so use a square
// viewport) instead of the player's view, and prints the stations' positions, the Library worker's position and
// Fortizmo's home spot. The image is shot2.js's screenshot, so leave NOSHOT unset.
//   VW=720 VH=720 node shot2.js <url> top.png ./topview.js
module.exports = async (p, out) => {
  await p.mouse.click(100, 100); await p.waitForTimeout(2500);
  await p.evaluate(() => {
    const cam = B.clone(); cam.position.set(0, 120, 6.1); cam.up.set(0, 0, -1); cam.lookAt(0, 0, 6.1); cam.fov = 55; cam.aspect = 1; cam.updateProjectionMatrix();
    window.__cam = cam; const r = O.render.bind(O); O.render = (s, c) => r(s, window.__cam);
  });
  await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => JSON.stringify({ stations: z.list.map(s => [s.id, +s.x.toFixed(1), +s.z.toFixed(1)]), keeper: st.group && st.group.position.toArray().map(v => +v.toFixed(1)), frog: It.byId.frog.def.at })));
};
