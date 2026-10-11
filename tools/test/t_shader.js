// Compiles every material the game can show (Backpacka, the UFO and the battle and event pieces included)
// and reports any shader errors three.js logs.
module.exports = async (p) => {
  const errs = []; p.on('console', (m) => /shader|WebGLProgram|THREE\./i.test(m.text()) && errs.push(m.type() + ' ' + m.text().slice(0, 300)));
  await p.mouse.click(100, 60); await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => {
    try { JGP.backpacka.preview(40); JGP.ufoNow && JGP.ufoNow(); } catch (e) { return 'prep err ' + e.message; }
    C.traverse((o) => { o.visible = !0; });
    O.compile(C, B); O.render(C, B);
    return 'compiled; programs ' + O.info.programs.length + ' err ' + Re.errors;
  }));
  await p.waitForTimeout(2000);
  console.log('three messages:', errs.length ? '\n' + errs.join('\n') : 'none');
};
