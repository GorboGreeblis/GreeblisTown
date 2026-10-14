// Whether a z-fighting candidate from t_zfight.js flickers on screen: for each point the camera stands where the
// player's eyes can be (inside the park, 1.6 m up, at least 3 m away across the ground so it never looks straight up),
// looks at the point through a narrow lens (about 1 m across at the point) and renders it three times with the near
// plane nudged by a fraction of a millimetre. Nothing moves between the renders but the depth values change in their
// last bits, so wherever two surfaces fight the winner changes: those pixels are the flicker a moving head would see.
// A count under about 10 is edge noise.
// Env: POINTS (JSON [[name, x, y, z], …]); SHOTS=1 (writes two of the renders, for tile.py diff).
// Output: per point `<name>: <n> flickering of <n> pixels (seen from <d> m)`, then `err <n>`; with SHOTS=1
//   <out>_<name>_a.png and <out>_<name>_b.png.
//   POINTS='[["bench",3.2,0.45,-7.9]]' VW=320 VH=240 NOSHOT=1 node test/shot.js <url> x.png test/t_zcheck.js
const { start, savePng, outName, logErrors } = require('./lib.js');

module.exports = async (p, out) => {
  await start(p, 2500);
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
    if (process.env.SHOTS) ['a', 'b'].forEach((k) => savePng(outName(out, name + '_' + k), r[k]));
  }
  await logErrors(p);
};
