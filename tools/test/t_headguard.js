// The VR head guard (JGP.headGuard): the signed distance to solid structures at known spots, and how dark
// the view goes with a (pretend) headset there. VR can't run headless, so the guard's test probe
// (JGP.headGuard.at) stands in for the headset for a few frames at each spot. Run with VW=320 VH=240.
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(100, 60); await W(1500);
  const spots = await p.evaluate(() => {
    const K = (name, lx, lz) => { const Bd = F.buildings.find((q) => q.name === name); return F.world(Bd, lx, lz); };
    return [
      ['open lawn', 0, 1.6, 20],
      ['inside a Library bookcase', ...((q) => [q[0], 1.6, q[1]])(K('shop', -2.0, -3.2))],
      ['30 cm from a bookcase', ...((q) => [q[0], 1.6, q[1]])(K('shop', -2.0, -3.2 + 0.3 + 0.3))],
      ['10 cm from a bookcase', ...((q) => [q[0], 1.6, q[1]])(K('shop', -2.0, -3.2 + 0.3 + 0.1))],
      ['leaning over the Post Office counter', ...((q) => [q[0], 1.6, q[1]])(K('post', 0, 0.84))],
      ['in the Post Office back wall', ...((q) => [q[0], 1.6, q[1]])(K('post', 0, -2.45))],
      ['in the church nave', ...((q) => [q[0], 1.6, q[1]])(K('church', 0, -3))],
      ['over the Juice Bar counter', ...((q) => [q[0], 1.6, q[1]])(K('juice', 0.2, -4))],
      ['in the Summoning Stone', 0.2, 1.6, 0.2],
    ];
  });
  for (const [name, x, y, z] of spots) {
    const r = await p.evaluate(([x, y, z]) => { JGP.headGuard.at = new THREE.Vector3(x, y, z); return +JGP.headGuard.sdist(x, y, z).toFixed(3); }, [x, y, z]);
    await W(1500);
    const lv = await p.evaluate(() => { const v = JGP.headGuard.level(); JGP.headGuard.at = null; return +v.toFixed(2); });
    await W(1500);
    log(`${name}: distance ${r} m, dark ${lv}`);
  }
  log('after: dark', await p.evaluate(() => JGP.headGuard.level()), '| err', await p.evaluate(() => Re.errors));
};
