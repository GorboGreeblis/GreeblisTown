// Dumps every live creature's definition, kind and position, SPARKAKUS's script record, the courier and the settings
// (functions as their source length) to <out> as JSON, to diff before and after a change such as a dead-code removal
// with snapdiff.py. NOSHOT=1 is needed, or the screenshot overwrites the JSON.
// Run (from this folder): NOSHOT=1 node ../test/shot.js <url> before.json ./snap.js
module.exports = async (p, out) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const ser = (v) => JSON.parse(JSON.stringify(v === undefined ? null : v, (k, x) => typeof x === 'function' ? 'fn:' + x.toString().length : (x && x.isVector3 ? [x.x, x.y, x.z] : x)));
    const ids = It.all.map(e => e.id || (e.def && e.def.__type) || e.def.name);
    const res = { ids, ents: {} };
    for (const e of It.all) {
      const id = e.id || e.def.name;
      res.ents[id] = { kind: e.kind, def: ser(e.def), pos: e.group.position.toArray().map(v => +v.toFixed(2)), h: e.height, bodyR: e.bodyR };
    }
    res.library = ser(i); res.courier = ser(s); res.t = ser(t);
    res.errors = Re.errors;
    return res;
  });
  require('fs').writeFileSync(out, JSON.stringify(r, null, 1));
  console.log('ids', r.ids.length, 'errors', r.errors);
};
