// After a stretch of play, the creatures not where they belong: off their home ground (JGP.homeGround, the game's own
// rule: the dance floor, the park, round the Gallery or the Portal for a roamer, within 1.2 m of its place for the
// rest), or, standing still at their own place, facing more than 0.3 rad away from their pattern's facing. A creature
// on a visit, in a vignette, busy or beside the player is skipped (it is allowed elsewhere, or turned to the player).
// Env: RUN_MS (ms of play before the check, default 40000; RUN is read too).
// Output: one JSON line `{n, bad: [[name, onHomeGround, moving, facing error (rad)], …], skipped: [names], err}`.
//   NOSHOT=1 node test/shot.js <url> x.png audit/rowcheck.js
const { start } = require('../test/lib.js');

module.exports = async (p) => {
  await start(p, +(process.env.RUN_MS || process.env.RUN || 40000));
  console.log(await p.evaluate(() => {
    const bad = [], skipped = [];
    let n = 0;
    for (const e of It.all) {
      const d = e.def;
      if (!d || !d.at) continue;
      if (e.visiting || e.hosting || e.vig || e.busy || e.nearPlayer) { skipped.push(d.name); continue; }
      n++;
      const home = JGP.homeGround(e);
      // (the facing applies at its own place only: a roamer's home moves with it, and it faces the way it came)
      const atPlace = !e.moving && Math.hypot(e.home.x - d.at[0], e.home.z - d.at[1]) < 0.5;
      const want = d.pattern && d.pattern[1] && d.pattern[1].face, ry = e.group.rotation.y;
      const dang = !atPlace || want == null ? 0 : Math.abs(Math.atan2(Math.sin(ry - want), Math.cos(ry - want)));
      (!home || dang > 0.3) && bad.push([d.name, home, !!e.moving, +dang.toFixed(2)]);
    }
    return JSON.stringify({ n, bad, skipped, err: Re.errors });
  }));
};
