// Unpacks a packed page: reads the 7-bit text in <script type="b">, runs the decoder embedded in the page itself,
// and writes the page the loader would document.write(). Also reports whether the page's decoder is model.js (what
// pack.js encodes with).
//   node pack/unpack.js <packed index.html> <out.html>   (from tools/)
"use strict";
const fs = require("fs");
const path = require("path");

function unpack(page) {
  const data = page.match(/<script type="b">([\s\S]*?)<\/script>/)[1];
  const loader = page.slice(page.indexOf("</script>", page.indexOf('<script type="b">')));
  const n = +loader.match(/new Uint8Array\((\d+)\)/)[1];
  const start = loader.indexOf("const f=function*") + "const f=".length;
  const end = loader.indexOf("}(n,", start) + 1;
  const model = loader.slice(start, end);
  const length = +loader.slice(end).match(/^\(n,(\d+)\)/)[1];
  // 7-bit text back to bytes, exactly as the loader does it
  const esc = [0, 13, 60],
    bytes = new Uint8Array(n);
  let acc = 0,
    bits = 0,
    k = 0;
  const put = (v) => {
    acc |= v << bits;
    bits += 7;
    if (bits >= 8) (k < n && (bytes[k++] = acc & 255), (acc >>= 8), (bits -= 8));
  };
  for (let i = 0; i < data.length; i++) {
    const c = data.charCodeAt(i);
    c < 128 ? put(c) : (put(esc[(c - 128) >> 7]), put((c - 128) & 127));
  }
  const it = new Function("return " + model)()(bytes, length);
  let s;
  while (!(s = it.next()).done);
  return { html: new TextDecoder().decode(s.value), model, packed: n, length };
}

module.exports = { unpack };

if (require.main === module) {
  const [, , inp, out] = process.argv;
  const r = unpack(fs.readFileSync(inp, "utf8"));
  fs.writeFileSync(out, r.html);
  const same = r.model === fs.readFileSync(path.join(__dirname, "model.js"), "utf8").trim();
  console.log("packed " + r.packed + " bytes -> " + r.length + " bytes; decoder matches model.js: " + same);
}
