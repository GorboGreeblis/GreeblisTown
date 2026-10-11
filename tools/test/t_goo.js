// Goo flicker check: GOOWARD's goo is given to the player, splats pile up round them, and the camera drifts
// a centimetre at a time (as a head never keeps still). Counts the pixels that flip colour sharply between
// consecutive frames, first with every splat sharing one place in the drawing order (as before the fix:
// overlapping splats swap order as the view moves), then with the fixed order each splat now has.
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms), log = (...a) => console.log(...a);
  await p.mouse.click(100, 60); await W(1500);
  // a pile of overlapping splats in front of a fixed camera
  await p.evaluate(() => {
    for (let k = 0; k < 40; k++) Nt.splat(2 + 0.9 * Math.cos(k * 2.4), 6 + 0.9 * Math.sin(k * 1.7), ['#36d0e8', '#e8409e', '#9a52e0', '#a8e830', '#ff9f5c'][k % 5], 0.6 + 0.3 * Math.random());
  });
  await W(1500);
  const flicker = (oldOrder) => p.evaluate((oldOrder) => {
    const cam = new THREE.PerspectiveCamera(70, 4 / 3, 0.15, 300), w = 320, h = 240;
    const splats = []; C.traverse((o) => o.isMesh && o.material && o.material.transparent && !o.material.depthWrite && o.material.polygonOffset && o.visible && splats.push(o));
    const keep = splats.map((o) => o.renderOrder); oldOrder && splats.forEach((o) => (o.renderOrder = 2));
    O.setSize(w, h, !1);
    const gl = O.getContext(), px = new Uint8Array(w * h * 4); let prev = null, flips = 0;
    for (let k = 0; k < 24; k++) {
      cam.position.set(2 + 0.01 * k, 1.7 + 0.004 * Math.sin(k), 3.2); cam.lookAt(2, 0, 6); cam.updateMatrixWorld();
      O.render(C, cam); gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
      if (prev) for (let i = 0; i < px.length; i += 4) if (Math.abs(px[i] - prev[i]) + Math.abs(px[i + 1] - prev[i + 1]) + Math.abs(px[i + 2] - prev[i + 2]) > 150) flips++;
      prev = px.slice();
    }
    splats.forEach((o, i) => (o.renderOrder = keep[i]));
    O.setSize(innerWidth, innerHeight);
    return { splats: splats.length, flippedPixels: flips };
  }, oldOrder);
  log('old shared drawing order:', JSON.stringify(await flicker(!0)));
  log('fixed drawing order:     ', JSON.stringify(await flicker(!1)));
  log('err', await p.evaluate(() => Re.errors));
};
