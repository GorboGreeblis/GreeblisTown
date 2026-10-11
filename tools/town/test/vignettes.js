module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => {
    const fn = L.find((g) => /pick\(tt\)/.test(String(g)));
    const before = C.children.length, errs = [], lens = [];
    let tt = 1000;
    for (const pk of JGP.vignette.PAIRS) {
      JGP.vignette.play(pk[0], pk[1], true);
      let n = 0;
      try {
        while (JGP.vignette.current && n < 600) { tt += 0.05; fn(tt, 0.05); n++; }
      } catch (e) { errs.push(pk[0] + pk[1] + ': ' + e.message); }
      lens.push(+(n * 0.05).toFixed(1));
    }
    const kinds = {}; C.children.slice(before).forEach((o) => { const k = o.type + (o.material && o.material.map ? "+map" : "") + (o.children.length ? "/" + o.children.length : ""); kinds[k] = (kinds[k] || 0) + 1; });
    return JSON.stringify({ kinds, errs, leak: C.children.length - before, minLen: Math.min(...lens), maxLen: Math.max(...lens), avg: +(lens.reduce((a, b) => a + b, 0) / lens.length).toFixed(1), err: Re.errors });
  }));
};
