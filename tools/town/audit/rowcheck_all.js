module.exports = async (p) => {
  await p.mouse.click(640, 360);
  await p.waitForTimeout(+process.env.RUN || 40000);
  console.log(await p.evaluate(() => {
    const bad = [], all = [];
    for (const e of It.all) {
      const d = e.def; if (!d || !d.at ) continue;
      const pos = e.group.position, off = Math.hypot(pos.x - d.at[0], pos.z - d.at[1]);
      const want = d.pattern && d.pattern[1] && d.pattern[1].face, ry = e.group.rotation.y;
      const dang = want == null ? 0 : Math.abs(Math.atan2(Math.sin(ry - want), Math.cos(ry - want)));
      const r = [d.name, +off.toFixed(2), !!e.moving, +dang.toFixed(2)]; all.push(r);
      (off > 0.5 || e.moving || dang > 0.3) && bad.push(r);
    }
    return JSON.stringify({ n: all.length, frames: Re.frames, bad, err: Re.errors });
  }));
};
