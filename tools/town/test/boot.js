module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(4000);
  const r = await p.evaluate(() => JSON.stringify({ errors: Re.errors, ents: It.all.length, byKind: It.all.reduce((a, e) => ((a[e.kind] = (a[e.kind] || 0) + 1), a), {}), names: It.all.map((e) => e.def && e.def.name).join(','), err: (document.getElementById('errBox') || {}).style.display + '|' + ((document.getElementById('errBox') || {}).innerText || '').slice(0, 600) }));
  console.log(r);
  console.log("CONSOLE_ERRORS_FOLLOW");
};
