// Prints the value of a JavaScript expression evaluated in the running game: the quick way to ask the game a question
// (where something is, what a collider list holds, whether a global still exists). The expression runs after the
// start click and a wait.
// Env: EXPR (the expression, default Re.errors); AFTER_MS (ms between the start click and the expression, default
//   1500; WAIT_MS is read too).
// Output: the value, as is for a string, else as JSON.
//   EXPR='F.list.map((f) => [f.x, f.z, f.r])' NOSHOT=1 node test/shot.js <url> x.png test/t_eval.js
const { start } = require('./lib.js');

module.exports = async (p) => {
  await start(p, +(process.env.AFTER_MS || process.env.WAIT_MS || 1500));
  const v = await p.evaluate(process.env.EXPR || 'Re.errors');
  console.log(typeof v === 'string' ? v : JSON.stringify(v));
};
