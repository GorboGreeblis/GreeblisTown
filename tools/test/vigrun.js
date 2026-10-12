// Plays many creature vignettes by driving their per-frame callback in game time (60,000 steps of 0.05 s, about 50
// minutes) and prints the first exception or the error count. Also a scene for cov.js.
// Run: NOSHOT=1 node shot2.js <url> x.png ./vigrun.js
module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => {
    const fn = L.find((g) => /pick\(tt\)/.test(String(g)));
    if (!fn) return 'no vignette callback';
    let tt = Re.t + 10, n = 0, seen = 0, was = !1; const r0 = Math.random;
    for (let k = 0; k < 60000; k++) { tt += 0.05; try { fn(tt, 0.05); } catch (e) { return 'err ' + e.message; } }
    return 'ran, errors ' + Re.errors;
  }));
};
