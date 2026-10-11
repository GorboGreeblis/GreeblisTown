// Plays many creature vignettes by driving their per-frame callback in game time.
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
