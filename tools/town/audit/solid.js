// Building collision: puts the player at 200 random spots in the church and pushes it out with F.resolve, counting any
// left inside; then walks GLYPH across the church, post, shop and juice buildings and prints how far it got and how
// deep it ever went inside any building's hull. Slow: each walk waits up to 7 minutes to arrive.
// Run (from this folder): NOSHOT=1 node ../../test/shot2.js <url> x.png ./solid.js
module.exports = async (p, out) => {
  await p.mouse.click(100, 100); await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const o = {};
    o.buildings = F.buildings.map(b => b.name);
    const ch = F.buildings.find(b => b.name === 'church');
    // player pushed into the nave from many spots
    let bad = 0;
    for (let k = 0; k < 200; k++) {
      const [x, z] = F.world(ch, -7 + 14 * Math.random(), -19 + 24 * Math.random());
      At.position.set(x, 0, z); for (let j = 0; j < 3; j++) F.resolve(At.position, t.player.bodyR);
      const [lx, lz] = F.local(ch, At.position.x, At.position.z);
      const inside = ch.parts.some(R => lx > R[0] && lx < R[2] && lz > R[1] && lz < R[3]);
      inside && bad++;
    }
    o.playerInside = bad;
    return o;
  });
  console.log(JSON.stringify(r));
  // creature nav tests
  const tests = [['church', [0, -24], [0, 12]], ['church', [-9, -8], [9, -8]], ['post', [0, -5], [0, 6]], ['shop', [0, -5], [1, 6]], ['juice', [-5, 0], [3, 0]]];
  for (const [bn, a, b] of tests) {
    const res = await p.evaluate(([bn, a, b]) => {
      const B = F.buildings.find(q => q.name === bn), e = It.byId.p_glyph;
      const [ax, az] = F.world(B, a[0], a[1]), [bx, bz] = F.world(B, b[0], b[1]);
      e.group.position.set(ax, 0, az); e.busy = null;
      Be(e, bx, bz, performance.now() / 1e3); window.__tgt = [bx, bz]; window.__e = e; window.__maxIn = 0;
      if (!window.__probe) { window.__probe = 1; L.push(() => { const e = window.__e; if (!e) return; F.buildings.forEach(B => { const [lx, lz] = F.local(B, e.group.position.x, e.group.position.z), h = B.hull, d = Math.min(lx - h[0], h[2] - lx, lz - h[1], h[3] - lz); d > window.__maxIn && (window.__maxIn = d); }); }); }
      return [ax, az, bx, bz].map(v => +v.toFixed(1));
    }, [bn, a, b]);
    let d = 99, tt = 0;
    for (; tt < 420 && d > 1.2; tt += 6) { await p.waitForTimeout(6000); d = await p.evaluate(() => Math.hypot(__e.group.position.x - __tgt[0], __e.group.position.z - __tgt[1])); }
    const mi = await p.evaluate(() => [+window.__maxIn.toFixed(2), __e.group.position.toArray().map(v => +v.toFixed(1))]);
    console.log(bn, JSON.stringify(a), '->', JSON.stringify(b), 'from/to', JSON.stringify(res), 'dist', d.toFixed(2), 'after', tt, 's maxPenetration', JSON.stringify(mi));
  }
};
