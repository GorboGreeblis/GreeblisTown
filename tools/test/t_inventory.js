// The items on the HUD in the desktop test mode: the player given nothing, then some items (Blossoms, Flint, two
// Artifacts, the shyness book), then every item there is, then the Artifacts glued, the Gem traded and the book given
// to ZOLLOD (the Artifacts, the Gem and the book gone, the Summoning Stone kept). The HUD's corner is screenshot each
// time, for inspection: no tile for an item not held; counts on Blossoms, Flint and the Artifacts; and no tile for
// the clothes, though all three are owned in `all` (clothes never show in the Game UI).
// Env: none.
// Output: `inventory err <n>`; <out>_none.png, <out>_some.png, <out>_all.png and <out>_after.png (420×420 px).
//   NOSHOT=1 node test/shot.js <url> x_inv.png test/t_inventory.js
const { start, outName } = require('./lib.js');

module.exports = async (p, out) => {
  await p.setViewportSize({ width: 1280, height: 720 });
  await start(p, 2500);
  const shot = async (k) => (await p.waitForTimeout(800), p.screenshot({ path: outName(out, k), clip: { x: p.viewportSize().width - 420, y: 0, width: 420, height: 420 } }));
  await shot('none');
  await p.evaluate(() => { Kt.blossoms = 3; Kt.acorns = 12; Kt.artifacts = 2; Kt.shyBook = !0; });
  await shot('some');
  await p.evaluate(() => { Kt.blossoms = 14; Kt.acorns = 27; Kt.artifacts = 3; Kt.gem = !0; Kt.rewards.stone = !0; Kt.rewards.seeds = !0; Kt.owned.add('seeds'); Kt.rewards.snacks = !0; ['flowerhat', 'sundress', 'frogshoes'].forEach((k) => Kt.owned.add(k)); });
  await shot('all');
  await p.evaluate(() => { Kt.rewards.artifacts = !0; Kt.gem = !1; Kt.shyFree = !0; });
  await shot('after');
  console.log('inventory err', await p.evaluate(() => Re.errors));
};
