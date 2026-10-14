// Talks to every creature that has Talk lines (te), in turn: the open screen, the largest movement of its talk
// animation over 2 s (the tkW node's offset or stretch) and its talk weight (tkK). ZOLLOD has no Talk lines (his menu
// opens the shop) and is left out.
// Env: none.
// Output: one line per creature `<name> <screen> <movement> <weight>`, then `errors <n> top <screen>`.
//   NOSHOT=1 node test/shot.js <url> x.png test/talk.js
const { start } = require('./lib.js');

module.exports = async (p) => {
  await start(p);
  const ids = await p.evaluate(() => It.all.filter((e) => e.def && e.def.lines && e.def.lines.length).map((e) => e.id || e.def.__type));
  const out = [];
  for (const id of ids) {
    await p.evaluate((id) => { const e = It.byId[id] || It.all.find((q) => q.def && q.def.__type === id); window.__te = e; window.__mx = 0; te(e, !1); }, id);
    for (let k = 0; k < 8; k++) { await p.waitForTimeout(250); await p.evaluate(() => { const w = __te.group.userData.tkW; w && (window.__mx = Math.max(__mx, Math.abs(w.position.y), Math.abs(w.scale.y - 1))); }); }
    out.push(await p.evaluate(() => { const r = [__te.def.name, jt.top, +__mx.toFixed(3), +(__te.tkK || 0).toFixed(2)]; try { for (let i = 0; i < 20 && jt.top === 'dialogue'; i++) qt.skipAll(); } catch (x) {} return r.join(' '); }));
    await p.waitForTimeout(600);
  }
  console.log(out.join('\n'));
  console.log(await p.evaluate(() => 'errors ' + Re.errors + ' top ' + jt.top));
};
