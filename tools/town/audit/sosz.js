module.exports = async (p) => {
  await p.evaluate(() => { window.__called = {}; for (const k in so) { const f = so[k]; if (typeof f !== 'function') continue; so[k] = function () { __called[k] = 1; return f.apply(this, arguments); }; so[k].__len = f.toString().length; } });
  await p.mouse.click(640, 360); await p.waitForTimeout(3000);
  console.log(await p.evaluate(() => JSON.stringify(Object.keys(so).map(k => [k, so[k].__len | 0, !!__called[k]]).sort((a, b) => b[1] - a[1]))));
};
