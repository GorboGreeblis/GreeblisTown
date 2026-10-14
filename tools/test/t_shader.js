// Compiles every material the game can show (BACKPACKA, the UFO, the battle and Event pieces included) and reports
// the shader errors three.js logs.
// Env: none.
// Output: `compiled; programs <n> err <n>`, then `three messages:` with each shader message, or `none`.
//   NOSHOT=1 node test/shot.js <url> x.png test/t_shader.js
const { start } = require('./lib.js');

module.exports = async (p) => {
  const errs = [];
  p.on('console', (m) => /shader|WebGLProgram|THREE\./i.test(m.text()) && errs.push(m.type() + ' ' + m.text().slice(0, 300)));
  await start(p);
  console.log(await p.evaluate(() => {
    try { JGP.backpacka.preview(40); JGP.ufoNow && JGP.ufoNow(); } catch (e) { return 'prep err ' + e.message; }
    C.traverse((o) => { o.visible = !0; });
    O.compile(C, B); O.render(C, B);
    return 'compiled; programs ' + O.info.programs.length + ' err ' + Re.errors;
  }));
  await p.waitForTimeout(2000);
  console.log('three messages:', errs.length ? '\n' + errs.join('\n') : 'none');
};
