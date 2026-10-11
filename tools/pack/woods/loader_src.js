(async () => {
  "loading" === document.readyState && (await new Promise((r) => addEventListener("DOMContentLoaded", r)));
  const E = [0, 13, 60], s = document.querySelector('script[type="b"]').textContent, b = new Uint8Array(__CLEN__), L = document.getElementById("ld");
  let acc = 0, nb = 0, o = 0;
  const put = (v) => { acc |= v << nb; nb += 7; if (nb >= 8) { o < __CLEN__ && (b[o++] = acc & 255); acc >>= 8; nb -= 8; } };
  for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); c < 128 ? put(c) : (put(E[(c - 128) >> 7]), put((c - 128) & 127)); }
  const g = __CMZ__(b, __LEN__, 0);
  let r;
  while (!(r = g.next()).done) { L.textContent = "LOADING " + ((100 * r.value / __LEN__) | 0) + "%"; await new Promise((f) => setTimeout(f)); }
  const h = new TextDecoder().decode(r.value);
  document.open(); document.write(h); document.close();
})();
