// The ordinal codec as readable source: the context-mixing model that model.js (the decoder every packed page
// carries) is the minified decode half of, and that pack.js encodes with. Its encoder output is byte-identical to
// pack.js's; to change the model, change it here and rebuild model.js and pack.js's encoder from it together.
// cmz(data, len, enc) is a generator: it yields progress (bytes done) every 16 KB and returns the result.
// Env: none.
// Output: none (a module exporting cmz).
//   const cmz = require('./cmz.js');
function* cmz(data, len, enc) {
  const NC = 12, TB = 23, MINL = 4, NX = 3 * NC + 3, I = Math.imul;
  const LR1 = 6.4e-9, LR2 = 4e-9, LRF = 1.75e-9;
  const sq = new Int32Array(4096), st = new Int32Array(4096),
    T = [1,2,3,6,10,16,27,45,73,120,194,310,488,747,1101,1546,2047,2549,2994,3348,3607,3785,3901,3975,4022,4050,4068,4079,4085,4089,4092,4093,4094];
  for (let d = -2048; d < 2048; d++) { const w = d & 127, i = (d >> 7) + 16; sq[d + 2048] = (T[i] * (128 - w) + T[i + 1] * w + 64) >> 7; }
  let pi = 0;
  for (let x = -2047; x <= 2047; x++) { const v = sq[x + 2048]; for (let j = pi; j <= v; j++) st[j] = x; pi = v + 1; }
  for (let j = pi; j < 4096; j++) st[j] = 2047;
  const Q = new Uint16Array(4 << TB), H = new Int32Array(NC), IX = new Int32Array(NC), BK = new Int32Array(NC), X = new Float64Array(NX),
    RF = new Int32Array(256), RS = new Int32Array(256), RM = new Uint16Array(NC * 128).fill(32768);
  for (let c = 0; c < 256; c++) { RF[c] = (65536 / (c < 2 ? c + 2 : 4)) | 0; RS[c] = (65536 / (c + 2)) | 0; }
  const W1 = new Float64Array(256 * NX).fill(0.15), W2 = new Float64Array(2048 * NX).fill(0.15), W3 = new Float64Array(96 * NX).fill(0.15),
    WF = new Float64Array(1024);
  for (let i = 0; i < 1024; i++) WF[i] = i % 4 ? 0.3 : 0.4;
  const hist = new Uint8Array(len + 8), MT = new Int32Array(1 << 20), mst = new Uint16Array(32), A1 = new Uint16Array(65536 * 33), A2 = new Uint16Array(65536 * 33);
  for (let i = 0; i < 32; i++) { const pr = (65535 * (1 - 1 / ((i >> 1) + 2))) | 0; mst[i] = i & 1 ? pr : 65535 - pr; }
  for (let i = 0; i < 65536 * 33; i++) { const d = ((i % 33) - 16) * 128; A1[i] = A2[i] = (d > 2047 ? 4095 : sq[d + 2048]) * 16; }
  const out = enc ? [] : new Uint8Array(len);
  let pos = 0, wordh = 0, pword = 0, mptr = 0, mlen = 0, x1 = 0, x2 = 4294967295, x = 0, ip = 0, b1 = 0, b2 = 0, b3 = 0;
  if (!enc) for (let k = 0; k < 4; k++) x = ((x << 8) | (ip < data.length ? data[ip++] : 255)) >>> 0;
  for (let n = 0; n < len; n++) {
    if (!(n & 16383)) yield n;
    const cb = enc ? data[n] : 0, lk = 1 + 4 / (1 + pos / 4096);
    let c0 = 1;
    for (let bp = 0; bp < 8; bp++) {
      let k = 0;
      if (bp == 0 || bp == 4)
        for (let j = 0; j < NC; j++) {
          let h = I((H[j] + I(c0, 0x2545f491)) | 0, 0x9e3779b1);
          h ^= h >>> 15; h = I(h, 0x85ebca77); h ^= h >>> 13;
          const bk = (h >>> (36 - TB)) << 6, ck = (h & 65535) | 1;
          BK[j] = bk;
          if (Q[bk] != ck) { Q[bk] = ck; Q.fill(0, bk + 4, bk + 64); }
        }
      const q = (bp < 4 ? c0 : (c0 & ((1 << (bp - 4)) - 1)) | (1 << (bp - 4))) << 2;
      for (let j = 0; j < NC; j++) {
        const i = BK[j] + q;
        IX[j] = i;
        if (Q[i + 2]) { X[k++] = st[Q[i + 1] >> 4]; X[k++] = st[Q[i] >> 4]; X[k++] = st[RM[j * 128 + (Q[i + 3] & 127)] >> 4]; }
        else { X[k++] = 0; X[k++] = 0; X[k++] = 0; }
      }
      let mexp = -1, msi = -1;
      if (mlen > 0 && (hist[mptr] | 256) >> (8 - bp) == c0) {
        mexp = (hist[mptr] >> (7 - bp)) & 1; msi = (mlen > 15 ? 15 : mlen) * 2 + mexp;
        X[k++] = st[mst[msi] >> 4]; X[k++] = mexp ? 256 : -256;
      } else { X[k++] = 0; X[k++] = 0; }
      X[k] = 256;
      const mb = mexp < 0 ? 0 : mlen < 16 ? 1 : mlen < 32 ? 2 : 3, m1 = c0 * NX, m2 = (b1 * 8 + bp) * NX, m3 = ((mb * 3 + mexp + 1) * 8 + bp) * NX;
      let d1 = 0, d2 = 0, d3 = 0;
      for (let i = 0; i < NX; i++) { const v = X[i]; d1 += W1[m1 + i] * v; d2 += W2[m2 + i] * v; d3 += W3[m3 + i] * v; }
      let s1 = Math.floor(d1 + 0.5), s2 = Math.floor(d2 + 0.5), s3 = Math.floor(d3 + 0.5);
      s1 = s1 > 2047 ? 2047 : s1 < -2047 ? -2047 : s1; s2 = s2 > 2047 ? 2047 : s2 < -2047 ? -2047 : s2; s3 = s3 > 2047 ? 2047 : s3 < -2047 ? -2047 : s3;
      const p1 = sq[s1 + 2048], p2 = sq[s2 + 2048], p3 = sq[s3 + 2048], f = c0 * 4;
      let sf = Math.floor(WF[f] * s1 + WF[f + 1] * s2 + WF[f + 2] * s3 + 0.5);
      sf = sf > 2047 ? 2047 : sf < -2047 ? -2047 : sf;
      const pf = sq[sf + 2048], s = sf + 2048, lo = s >> 7, aw = s & 127,
        a1 = (c0 | (b1 << 8)) * 33 + lo, a2 = (((I(b1 | (b2 << 8) | (b3 << 16), 0x9e3779b1) >>> 16) ^ I(c0, 0x9e37)) & 65535) * 33 + lo;
      let p = ((pf + ((A1[a1] * (128 - aw) + A1[a1 + 1] * aw) >> 11) + ((A2[a2] * (128 - aw) + A2[a2 + 1] * aw) >> 11) + 1) / 3) | 0;
      p = p < 1 ? 1 : p > 4095 ? 4095 : p;
      const xm = (x1 + Math.floor(((x2 - x1) * p) / 4096)) >>> 0;
      const y = enc ? (cb >> (7 - bp)) & 1 : x <= xm ? 1 : 0;
      if (y) x2 = xm; else x1 = (xm + 1) >>> 0;
      while (((x1 ^ x2) & 0xff000000) == 0) {
        if (enc) out.push(x2 >>> 24); else x = ((x << 8) | (ip < data.length ? data[ip++] : 255)) >>> 0;
        x1 = (x1 << 8) >>> 0; x2 = ((x2 << 8) | 255) >>> 0;
      }
      const g = y ? 65535 : 0, e1 = LR1 * lk * ((y << 12) - p1), e2 = LR2 * lk * ((y << 12) - p2), e3 = LR2 * lk * ((y << 12) - p3), ef = LRF * ((y << 12) - pf);
      const ey = (y << 12) - pf; if (ey > 48 || ey < -48) for (let i = 0; i < NX; i++) { const v = X[i]; W1[m1 + i] += e1 * v; W2[m2 + i] += e2 * v; W3[m3 + i] += e3 * v; }
      WF[f] += ef * s1; WF[f + 1] += ef * s2; WF[f + 2] += ef * s3;
      for (let j = 0; j < NC; j++) {
        const i = IX[j], c = Q[i + 2], r = Q[i + 3] & 127;
        if (c) { Q[i] += ((g - Q[i]) * RF[c]) >> 16; Q[i + 1] += ((g - Q[i + 1]) * RS[c]) >> 16; } else Q[i] = Q[i + 1] = y ? 49151 : 16384;
        if (c < 255) Q[i + 2] = c + 1;
        if (c) { const m = j * 128 + r; RM[m] += (g - RM[m]) >> 6; }
        let rl = r >> 1;
        if (c && (r & 1) == y) { if (rl < 63) rl++; } else rl = 1;
        Q[i + 3] = (rl << 1) | y;
      }
      if (msi >= 0) mst[msi] += (g - mst[msi]) >> 6;
      A1[a1] += ((g - A1[a1]) * (128 - aw)) >> 12; A1[a1 + 1] += ((g - A1[a1 + 1]) * aw) >> 12;
      A2[a2] += ((g - A2[a2]) * (128 - aw)) >> 12; A2[a2 + 1] += ((g - A2[a2 + 1]) * aw) >> 12;
      c0 = c0 * 2 + y;
    }
    const c = c0 & 255;
    if (!enc) out[n] = c;
    hist[pos++] = c;
    if ((c > 96 && c < 123) || (c > 64 && c < 91) || (c > 47 && c < 58) || c == 95 || c == 36 || c > 127) wordh = I(wordh + c + 1, 0x2f0f3f1);
    else if (wordh) { pword = I(wordh + c, 0x3c6ef372); wordh = 0; } else pword = I(pword + c, 0x9e3779b1);
    if (mlen > 0 && hist[mptr] == c) { mlen++; mptr++; } else mlen = 0;
    if (pos >= MINL) {
      let hh = 0;
      for (let k = 1; k <= MINL; k++) hh = I(hh + hist[pos - k] + 1, 0x2f0f3f1);
      hh >>>= 12;
      if (!mlen) { const cd = MT[hh]; if (cd > 0) { let L = 0; while (L < 65535 && cd - L - 1 >= 0 && hist[cd - L - 1] == hist[pos - L - 1]) L++; if (L >= MINL) { mlen = L; mptr = cd; } } }
      MT[hh] = pos;
    }
    b3 = b2; b2 = b1; b1 = c;
    const B4 = pos > 3 ? hist[pos - 4] : 0, B5 = pos > 4 ? hist[pos - 5] : 0, B6 = pos > 5 ? hist[pos - 6] : 0, B7 = pos > 6 ? hist[pos - 7] : 0, B8 = pos > 7 ? hist[pos - 8] : 0,
      h2 = b1 | (b2 << 8), h3 = h2 | (b3 << 16), h4 = h3 | (B4 << 24);
    H[0] = 0; H[1] = I(b1 + 1, 0x9e3779b1); H[2] = I(h2 + 65536, 0x85ebca77); H[3] = I(h3 + 16777216, 0xc2b2ae3d); H[4] = I(h4, 0x27d4eb2f) ^ 0x165667b1;
    H[5] = I(I(h4, 0x165667b1) ^ (B5 | (B6 << 8)), 0x9e3779b1); H[6] = I(I(h4, 0x27d4eb2f) ^ (B5 | (B6 << 8) | (B7 << 16)), 0x85ebca77) ^ I(B8, 0x1234567);
    H[7] = I(wordh + I(pword, 0x3c6ef372), 0xc2b2ae3d); H[8] = I(b2 | (b3 << 8), 0x27d4eb2f); H[9] = I(I(h4, 0x9e3779b1) ^ I(B5, 0x85ebca77), 0x27d4eb2f);
    H[10] = I(wordh, 0x85ebca77) ^ I(b1, 0x2f0f3f1); H[11] = I(b1 | (b3 << 8), 0xc2b2ae3d) + 85;
    for (let k = 1; k < NC; k++) H[k] = H[k] + I(k, 0x7f4a7c15);
  }
  if (enc) { out.push(x1 >>> 24, 255, 255, 255); return Uint8Array.from(out); }
  return out;
}
if (typeof module != "undefined") module.exports = cmz;
