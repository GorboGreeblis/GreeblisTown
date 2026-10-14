// The interface's screens in the desktop test mode (every station, a dialogue with each of the four longest-named
// creatures, a long stress line): every canvas text condensed to fit, or still running past its canvas.
// Env: none.
// Output: `stations […]`, `condensed [{t, ratio, cw}, …]` (the text, the squeeze ratio, the canvas width), `{"err":<n>}`;
//   a screenshot per screen, <out>_st_<station>.png, <out>_dlg_<id>.png and <out>_dlg_stress.png.
//   NOSHOT=1 node test/shot.js <url> ui.png audit/uiaudit.js
module.exports = async (p, out) => {
  await p.evaluate(() => {
    window.__ui = [];
    const P = CanvasRenderingContext2D.prototype, f = P.fillText;
    P.fillText = function (t, x, y, mw) {
      try {
        const w = this.measureText(String(t)).width;
        if (mw !== undefined && w > mw + 0.5) window.__ui.push({ t: String(t).slice(0, 60), ratio: +(mw / w).toFixed(2), cw: this.canvas.width });
      } catch (e) {}
      return mw === undefined ? f.call(this, t, x, y) : f.call(this, t, x, y, mw);
    };
  });
  await p.keyboard.press('KeyW'); await p.waitForTimeout(800);
  const shot = async (n) => { await p.waitForTimeout(700); await p.screenshot({ path: out.replace('.png', '_' + n + '.png') }); };
  const close = async () => { await p.evaluate(() => { try { jt.has('panel') && _t.close(); } catch (e) {} try { qt.isOpen && qt.skipAll(); } catch (e) {} }); await p.waitForTimeout(300); };
  const near = async (x, z) => p.evaluate(([x, z]) => { At.position.set(x, 0, z); }, [x, z]);
  // stations
  const st = await p.evaluate(() => z.list.filter((s) => s.label && s.label()).map((s) => ({ id: s.id, x: s.x, z: s.z, label: s.label() })));
  console.log('stations', JSON.stringify(st.map((s) => s.id + ':' + s.label)));
  for (const s of st) {
    await near(s.x + 2, s.z + 2); await p.waitForTimeout(300);
    await p.evaluate((id) => { const t = z.list.find((q) => q.id === id); t && t.run(); }, s.id);
    await shot('st_' + s.id); await close();
  }
  // dialogue with the longest names, a long blossom line, and a stress line
  const ids = await p.evaluate(() => It.all.filter((e) => e.def && e.def.name).sort((a, b) => b.def.name.length - a.def.name.length).slice(0, 4).map((e) => e.id));
  for (const id of ids) {
    await p.evaluate((id) => { Kt.blossoms = 2; const e = It.byId[id]; At.position.set(e.group.position.x + 2, 0, e.group.position.z); te(e); }, id);
    await shot('dlg_' + id); await close();
  }
  await p.evaluate(() => qt.open('A REALLY QUITE EXTRAORDINARILY LONG CREATURE NAME', '#8a3ae8', 'This is a deliberately long line of dialogue to make sure the box never spills over: it keeps going and going with more and more words, including an absurdlyunbrokenwordthatisfartoolongtofitonanysinglelineinthebox, then even more words after it so that the text has to shrink, wrap and finally be cut neatly at the bottom of the box.'));
  await p.waitForTimeout(9000); await shot('dlg_stress'); await close();
  console.log('condensed', JSON.stringify(await p.evaluate(() => window.__ui)));
  console.log(await p.evaluate(() => JSON.stringify({ err: Re.errors })));
};
