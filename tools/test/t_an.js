module.exports = async (p) => { await p.mouse.click(640, 360); await p.waitForTimeout(2500);
  console.log(await p.evaluate(() => { const a = It.all.find((q) => q.def.name === 'ANOMALEE'); return JSON.stringify({ pos: a.group.position.toArray(), ry: a.group.rotation.y, player: At.position.toArray(), tower: JGP.CHURCH_AT ? 1 : 0 }); }));
};
