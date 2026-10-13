// Boot check: clicks into the game, waits 4 s, then prints the error count, the number of entities by kind, every
// creature's name and the error box's state and text; shot.js prints the console log after it.
// Run: NOSHOT=1 node shot.js <url> x.png ./boot.js
module.exports = async (p) => {
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await p.waitForTimeout(4000);
  const r = await p.evaluate(() => JSON.stringify({ errors: Re.errors, ents: It.all.length, byKind: It.all.reduce((a, e) => ((a[e.kind] = (a[e.kind] || 0) + 1), a), {}), names: It.all.map((e) => e.def && e.def.name).join(','), err: (document.getElementById('errBox') || {}).style.display + '|' + ((document.getElementById('errBox') || {}).innerText || '').slice(0, 600) }));
  console.log(r);
  console.log("CONSOLE_ERRORS_FOLLOW");
};
