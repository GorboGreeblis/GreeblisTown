// The game's first frame as the player sees it: the title screen clicked away, three seconds of play, and the
// page screenshot shot2.js takes at the end (so no NOSHOT here) is the spawn view in the desktop test mode (the
// owner wants KING DINO's billboard to be the first thing seen, and the park a surprise behind the player).
//   VW=800 VH=600 node shot2.js <url> first.png ./t_firstview.js
module.exports = async (p) => {
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2);
  await p.waitForTimeout(3000);
  console.log('spawn', await p.evaluate(() => [+At.position.x.toFixed(1), +At.position.z.toFixed(1), +At.rotation.y.toFixed(2)]), '| err', await p.evaluate(() => Re.errors));
};
