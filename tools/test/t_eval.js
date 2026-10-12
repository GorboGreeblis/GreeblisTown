// Boots the game and prints the value of a JavaScript expression evaluated in the page (EXPR env), as JSON:
// the quick way to ask the running game a question (where something is, what a collider list holds, how long a
// load step took). The expression runs after the start click; WAIT_MS (default 1500) waits before it.
//   EXPR='JSON.stringify(F.list.map((f) => [f.x, f.z, f.r]))' NOSHOT=1 node shot2.js <url> x.png ./t_eval.js
module.exports = async (p) => {
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await p.waitForTimeout(+(process.env.WAIT_MS || 1500));
  const v = await p.evaluate(process.env.EXPR || 'Re.errors');
  console.log(typeof v === 'string' ? v : JSON.stringify(v));
};
