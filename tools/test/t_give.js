// The mobile GIVE button shows only next to a creature while a Blossom is held: stands 2 m from GEMTOE with 0, then 2
// Blossoms, and reads the button's display each time.
// Env: none (a phone context: MOBILE=1).
// Output: one line, the button's display with 0 and with 2 Blossoms and `err <n>`.
//   MOBILE=1 node test/shot.js <url> x_mob.png test/t_give.js
module.exports = async (p) => {
  await p.touchscreen.tap(190, 300); await p.waitForTimeout(2000);
  const st = () => p.evaluate(() => { const b = document.querySelector('#jgpTouch [data-k="give"]'); return b ? getComputedStyle(b).display : 'no button'; });
  await p.evaluate(() => { const e = It.byId.p_gemtoe; At.position.set(e.group.position.x - 2, 0, e.group.position.z); Kt.blossoms = 0; });
  await p.waitForTimeout(3000); const a = await st();
  await p.evaluate(() => { Kt.blossoms = 2; }); await p.waitForTimeout(3000); const b = await st();
  console.log('GIVE with 0 blossoms:', a, '| with 2:', b, '| err', await p.evaluate(() => Re.errors));
};
