// Each builder's source size and whether it is called: every function in `so` is wrapped once the page has loaded
// (after shot.js's WAIT), then the game is started and run 3 s. Only calls after the wrap count, so a builder used only
// while the page loads shows as not called (a lead for dead builders, not proof).
// Env: none.
// Output: one JSON list of [key, source length, called], largest first.
//   NOSHOT=1 node test/shot.js <url> x.png audit/sosz.js
const { start } = require('../test/lib.js');

module.exports = async (p) => {
  await p.evaluate(() => { window.__called = {}; for (const k in so) { const f = so[k]; if (typeof f !== 'function') continue; so[k] = function () { __called[k] = 1; return f.apply(this, arguments); }; so[k].__len = f.toString().length; } });
  await start(p, 3000);
  console.log(await p.evaluate(() => JSON.stringify(Object.keys(so).map((k) => [k, so[k].__len | 0, !!__called[k]]).sort((a, b) => b[1] - a[1]))));
};
