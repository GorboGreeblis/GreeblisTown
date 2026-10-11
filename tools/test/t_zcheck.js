// Does a z-fight candidate (from t_zfight.js) actually flicker on screen? For each point in POINTS (JSON list of
// [name, x, y, z]) the camera stands where the player's eyes can be (inside the park, 1.6 m up, and at least
// 3 m away across the ground so it never looks straight up), looks at the point through a narrow lens (about
// 1 m across at the point), and renders it three times with the near plane nudged by a fraction of a
// millimetre. Nothing moves on screen between them, but the depth values change in their last bits, so
// wherever two surfaces fight the winner changes: those pixels are the flicker a moving head would see.
// Prints the count of changed pixels; SHOTS=1 writes <out>_<name>_a/b.png.
module.exports = async (p, out) => {
  const fs = require('fs');
  await p.mouse.click(100, 60); await p.waitForTimeout(2500);
  for (const [name, x, y, z] of JSON.parse(process.env.POINTS || '[]')) {
    const r = await p.evaluate(([x, y, z]) => {
      const S = 160, gl = O.getContext(), px = (cam) => { O.setSize(S, S, !1); O.render(C, cam); const b = new Uint8Array(S * S * 4); gl.readPixels(0, 0, S, S, gl.RGBA, gl.UNSIGNED_BYTE, b); return b; };
      const P = new THREE.Vector3(x, y, z), ex = Math.max(-36, Math.min(36, x)), ez = Math.max(-36, Math.min(48, z));
      // (an eye inside the park, nudged back towards the middle when the point is right at it)
      const E = new THREE.Vector3(ex, 1.6, ez), hz = Math.hypot(ex - x, ez - z);
      if (hz < 3) { const q = Math.hypot(ex, ez) || 1, k = 3 - hz; E.x -= (k * ex) / q; E.z -= (k * ez) / q; }
      const d = E.distanceTo(P), cam = new THREE.PerspectiveCamera((2 * Math.atan(0.5 / d) * 180) / Math.PI, 1, 0.15, 400);
      cam.position.copy(E); cam.lookAt(P); cam.updateMatrixWorld(!0);
      const shot = (n, f) => ((cam.near = n), (cam.far = f), cam.updateProjectionMatrix(), px(cam));
      const a = shot(0.15, 400), b = shot(0.15045, 400.7), c2 = shot(0.14962, 399.4);
      let flick = 0, flat = S * S;
      for (let k = 0; k < S * S * 4; k += 4) {
        const dd = (q) => Math.abs(a[k] - q[k]) + Math.abs(a[k + 1] - q[k + 1]) + Math.abs(a[k + 2] - q[k + 2]);
        (dd(b) > 30 || dd(c2) > 30) && flick++;
      }
      const toUrl = (buf) => { const cv = document.createElement('canvas'); cv.width = cv.height = S; const cx = cv.getContext('2d'), im = cx.createImageData(S, S); for (let j = 0; j < S; j++) im.data.set(buf.subarray((S - 1 - j) * S * 4, (S - j) * S * 4), j * S * 4); cx.putImageData(im, 0, 0); return cv.toDataURL('image/png'); };
      O.setSize(innerWidth, innerHeight);
      return { d: +d.toFixed(1), flat, flick, a: toUrl(a), b: toUrl(b) };
    }, [x, y, z]);
    console.log(`${name}: ${r.flick} flickering of ${r.flat} pixels (seen from ${r.d} m)`);
    if (process.env.SHOTS) ['a', 'b'].forEach((k) => fs.writeFileSync(out.replace('.png', `_${name}_${k}.png`), Buffer.from(r[k].split(',')[1], 'base64')));
  }
  console.log('err', await p.evaluate(() => Re.errors));
};
