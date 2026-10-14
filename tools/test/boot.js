// Boot check: starts the game, waits 4 s, then prints the error count, the entities by kind, every creature's name,
// and the error box's display and text.
// Env: none.
// Output: one JSON line `{errors, ents, byKind, names, err}`; shot.js prints the console log after it.
//   NOSHOT=1 node test/shot.js <url> x.png test/boot.js
const { start } = require('./lib.js');

module.exports = async (p) => {
  await start(p, 4000);
  console.log(await p.evaluate(() => {
    const box = document.getElementById('errBox') || {};
    return JSON.stringify({ errors: Re.errors, ents: It.all.length, byKind: It.all.reduce((a, e) => ((a[e.kind] = (a[e.kind] || 0) + 1), a), {}), names: It.all.map((e) => e.def && e.def.name).join(','), err: (box.style || {}).display + '|' + (box.innerText || '').slice(0, 600) });
  }));
};
