module.exports = async (p) => { await p.mouse.click(640, 360); await p.waitForTimeout(1000);
  console.log(await p.evaluate(() => JSON.stringify(E.list.filter((q) => Math.hypot(q.x - 33.5, q.z - 2) < 8).map((q) => [q.tag, +q.x.toFixed(1), +q.z.toFixed(1), q.r]))));
  console.log(await p.evaluate(() => JSON.stringify(It.all.filter((e) => e.def.stationary).map((e) => [e.def.name, e.def.at && e.def.at.map((v) => +v.toFixed(1))]))));
};
