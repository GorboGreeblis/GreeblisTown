// The items on the HUD: in the Desktop test mode, gives the player nothing, then some items (Blossoms, Flint, two
// Artifacts, the shyness book), then every item there is, and screenshots the HUD's corner each time to
// <out>_none.png, <out>_some.png and <out>_all.png; then glues the Artifacts, trades the Gem and gives ZOLLOD the book
// (<out>_after.png: the Artifacts, the Gem and the book are gone, the Summoning Stone stays). Prints the error count.
// Look at the pictures: no tile for an item not held, the counts on Blossoms, Flint and the Artifacts.
// Run: NOSHOT=1 node shot.js <url> <out> ./t_inventory.js
module.exports = async (p, out) => {
  await p.mouse.click(100, 60); await p.waitForTimeout(2500);
  const shot = async (k) => (await p.waitForTimeout(800), p.screenshot({ path: `${out}_${k}.png`, clip: { x: 0, y: 0, width: 420, height: 420 } }));
  await shot('none');
  await p.evaluate(() => { Kt.blossoms = 3; Kt.acorns = 12; Kt.artifacts = 2; Kt.shyBook = !0; });
  await shot('some');
  await p.evaluate(() => { Kt.blossoms = 14; Kt.acorns = 27; Kt.artifacts = 3; Kt.gem = !0; Kt.rewards.stone = !0; Kt.rewards.seeds = !0; Kt.owned.add('seeds'); Kt.rewards.snacks = !0; ['flowerhat', 'sundress', 'frogshoes'].forEach((k) => Kt.owned.add(k)); });
  await shot('all');
  await p.evaluate(() => { Kt.rewards.artifacts = !0; Kt.gem = !1; Kt.shyFree = !0; });
  await shot('after');
  console.log('inventory err', await p.evaluate(() => Re.errors));
};
