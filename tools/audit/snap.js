// A JSON dump of every live creature's definition, kind, position, height and body radius, SPARKAKUS's script record,
// NEXTESSA's (the courier's) and the settings (functions as their source length), to diff with snapdiff.py before and
// after a change such as a dead-code removal. NOSHOT=1 is mandatory: the screenshot would overwrite the JSON.
// Env: none.
// Output: `ids <n> errors <n>`; the dump to <out>.
//   NOSHOT=1 node test/shot.js <url> snap_before.json audit/snap.js
const fs = require('fs');
const { start } = require('../test/lib.js');

module.exports = async (p, out) => {
  await start(p);
  const r = await p.evaluate(() => {
    const ser = (v) => JSON.parse(JSON.stringify(v === undefined ? null : v, (k, x) => (typeof x === 'function' ? 'fn:' + x.toString().length : x && x.isVector3 ? [x.x, x.y, x.z] : x)));
    const ids = It.all.map((e) => e.id || (e.def && e.def.__type) || e.def.name);
    const res = { ids, ents: {} };
    for (const e of It.all) {
      const id = e.id || e.def.name;
      res.ents[id] = { kind: e.kind, def: ser(e.def), pos: e.group.position.toArray().map((v) => +v.toFixed(2)), h: e.height, bodyR: e.bodyR };
    }
    res.library = ser(i); res.courier = ser(s); res.t = ser(t);
    res.errors = Re.errors;
    return res;
  });
  fs.writeFileSync(out, JSON.stringify(r, null, 1));
  console.log('ids', r.ids.length, 'errors', r.errors);
};
