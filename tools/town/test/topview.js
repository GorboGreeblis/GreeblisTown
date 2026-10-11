module.exports = async (p, out) => {
  await p.mouse.click(100, 100); await p.waitForTimeout(2500);
  await p.evaluate(() => {
    const cam = B.clone(); cam.position.set(0, 120, 6.1); cam.up.set(0, 0, -1); cam.lookAt(0, 0, 6.1); cam.fov = 55; cam.aspect = 1; cam.updateProjectionMatrix();
    window.__cam = cam; const r = O.render.bind(O); O.render = (s, c) => r(s, window.__cam);
  });
  await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => JSON.stringify({ stations: z.list.map(s => [s.id, +s.x.toFixed(1), +s.z.toFixed(1)]), keeper: st.group && st.group.position.toArray().map(v => +v.toFixed(1)), frog: It.byId.frog.def.at })));
};
