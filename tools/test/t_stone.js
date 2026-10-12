// The GARDEN EVENT menu at the Summoning Stone (Summoning Stone, Seeds and Snacks with their boxes, "Start gardening
// event?", Yes / No) and its rule: without the Summoning Stone quest, Yes only says the runes stay dark and nothing
// starts; with it, Yes starts the Event.
//   NOSHOT=1 node shot2.js <url> x.png ./t_stone.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(640, 60); await W(1500);
  const look = (has) => p.evaluate((has) => {
    Kt.rewards.stone = has; At.position.set(0, 0, 2.6); xe.scan();
    const s = z.list.find((q) => q.id === 'campfire'), label = xe.current === s ? xe.actions.map((a) => a.label).join('/') : 'not the target';
    s.run();
    const text = (document.getElementById('pSub') || {}).textContent + ' ' + (document.getElementById('pLog') || {}).textContent;
    const title = (document.getElementById('pTitle') || {}).textContent;
    oe.yes();
    const said = qt.isOpen ? document.getElementById('dlgText').textContent : null;
    for (let i = 0; i < 10 && qt.isOpen; i++) try { qt.skipAll(); } catch (e) {}
    return { label, title, text: text.replace(/\s+/g, ' ').trim().slice(0, 160), said, started: me.active, awake: !!JGP.garden.stoneAwake };
  }, has);
  const a = await look(false);
  log('without the Stone:', JSON.stringify(a), !a.started && a.title === 'GARDEN EVENT' && /Summoning Stone ☐.*Seeds.*Snacks.*Start gardening event\?/.test(a.text) && !a.awake ? 'ok' : 'FAIL');
  await W(500);
  const b = await look(true);
  log('with the Stone:', JSON.stringify(b), b.started && /Summoning Stone ☑/.test(b.text) ? 'ok' : 'FAIL');
  log('err', await p.evaluate(() => Re.errors));
};
