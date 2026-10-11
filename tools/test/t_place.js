module.exports = async (p, out) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  const pos = () => p.evaluate(() => It.all.map((e) => e.def.name + '@' + e.group.position.x.toFixed(1) + ',' + e.group.position.z.toFixed(1) + (e.moving ? '*' : '')).join(' '));
  console.log('ents', await p.evaluate(() => It.all.length), await pos());
  console.log(await p.evaluate(() => JSON.stringify({ seeds: r.find((q) => q.id === 'seeds'), welcome: shopText.welcome, err: Re.errors })));
  const fz = [];
  for (let k = 0; k < 40; k++) { await p.waitForTimeout(1000); fz.push(await p.evaluate(() => { const f = It.byId.frog, q = f.group.position; return q.x.toFixed(2) + ',' + q.z.toFixed(1) + (f.moving ? '*' : ''); })); }
  console.log('fortizmo', fz.join(' '));
  console.log('err', await p.evaluate(() => Re.errors));
};
