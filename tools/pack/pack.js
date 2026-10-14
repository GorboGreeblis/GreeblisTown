// Packs a page into one self-contained HTML file: the ordinal's compressor.
//
// The packed page carries a context-mixing decoder (12 context models and a match model, three mixers, two SSE
// stages, a 32-bit binary arithmetic coder): model.js, embedded verbatim. The encoder here is made FROM that
// decoder: the model code is run with the known input bits, and the arithmetic decoder's lines are swapped for the
// matching encoder's. Same model, same probabilities, bit for bit, so the page's decoder unpacks it exactly; the
// round trip is checked on every pack. cmz.js is the same codec as readable source.
// Env: none.
// Output: `packed <bytes> bytes; <out.html> is <bytes> bytes`; the packed page to <out.html>. Also a module:
//   { encode, decode, page }.
//   node pack/pack.js page.html ../index.html "Greeblis Town"
"use strict";
const fs = require("fs");
const path = require("path");

const MODEL = fs.readFileSync(path.join(__dirname, "model.js"), "utf8");
const swap = (src, from, to) => {
  if (!src.includes(from)) throw new Error("model.js no longer matches the expected decoder: " + from.slice(0, 50));
  return src.split(from).join(to);
};

// the decoder model, turned into an encoder
let enc = MODEL;
enc = swap(enc, "function*(t,e){", "function(t,e,OUT){");
enc = swap(enc, "for(let e=0;e<4;e++)S=(S<<8|(T<t.length?t[T++]:255))>>>0;", "");
enc = swap(enc, "16383&c||(yield c);", "");
enc = swap(enc, "let f=1;for(let c=0;c<8;c++){", "let f=1;const BYTE=t[c];for(let c=0;c<8;c++){");
enc = swap(
  enc,
  "at=S<=lt?1:0;for(at?P=lt:O=lt+1>>>0;!(4278190080&(O^P));)S=(S<<8|(T<t.length?t[T++]:255))>>>0,O=O<<8>>>0,P=(P<<8|255)>>>0;",
  "at=BYTE>>7-c&1;for(at?P=lt:O=lt+1>>>0;!(4278190080&(O^P));)OUT.push(P>>>24),O=O<<8>>>0,P=(P<<8|255)>>>0;",
);
enc = swap(enc, "return F}", "return OUT.push(O>>>24,255,255,255),OUT}"); // the coder flushes
const encodeFn = new Function("return " + enc)();
// the decoder exactly as the page runs it (for the round-trip check)
const decodeFn = new Function("return " + MODEL)();

function encode(raw) {
  return Uint8Array.from(encodeFn(raw, raw.length, []));
}
function decode(packed, length) {
  const it = decodeFn(packed, length);
  let s;
  while (!(s = it.next()).done);
  return s.value;
}

// 7-bit text: NUL, CR and "<" are folded
// together with the next value into one character 128 + (k << 7) + next
function sevenBit(bytes) {
  const vals = [];
  let acc = 0,
    bits = 0;
  for (const byte of bytes) {
    acc |= byte << bits;
    bits += 8;
    while (bits >= 7) vals.push(acc & 127), (acc >>= 7), (bits -= 7);
  }
  bits && vals.push(acc & 127);
  const unsafe = [0, 13, 60];
  let text = "";
  for (let k = 0; k < vals.length; k++) {
    const u = unsafe.indexOf(vals[k]);
    text += u < 0 ? String.fromCharCode(vals[k]) : String.fromCharCode(128 + (u << 7) + (k + 1 < vals.length ? vals[++k] : 0));
  }
  return text;
}

// the whole page: the wrapper, its loader text and its decoder
function page(raw, title) {
  const packed = encode(raw);
  const back = decode(packed, raw.length);
  if (back.length !== raw.length || !back.every((v, k) => v === raw[k])) throw new Error("pack: round trip failed");
  const n = packed.length,
    L = raw.length;
  const head =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"><title>' +
    title +
    '</title><style>html,body{margin:0;padding:0;height:100%;overflow:hidden;background:#0d0d1a}#ld{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;color:#a8e830;font:bold 22px "Courier New",monospace;letter-spacing:2px}</style></head><body><div id="ld">LOADING</div><script type="b">';
  const tail =
    '</script><script>(async()=>{"loading"===document.readyState&&await new Promise((t=>addEventListener("DOMContentLoaded",t)));const t=[0,13,60],e=document.querySelector(\'script[type="b"]\').textContent,n=new Uint8Array(' +
    n +
    '),o=document.getElementById("ld");let r=0,l=0,a=0;const c=t=>{r|=t<<l,l+=7,l>=8&&(a<' +
    n +
    "&&(n[a++]=255&r),r>>=8,l-=8)};for(let n=0;n<e.length;n++){const o=e.charCodeAt(n);o<128?c(o):(c(t[o-128>>7]),c(o-128&127))}const f=" +
    MODEL +
    "(n," +
    L +
    ');let s;for(;!(s=f.next()).done;)o.textContent="LOADING "+(100*s.value/' +
    L +
    '|0)+"%",await new Promise((t=>setTimeout(t)));const i=(new TextDecoder).decode(s.value);document.open(),document.write(i),document.close()})();</script></body></html>';
  return { html: head + sevenBit(packed) + tail, packed: n };
}

module.exports = { encode, decode, page };

if (require.main === module) {
  const [, , inp, out, title] = process.argv;
  const r = page(fs.readFileSync(inp), title);
  fs.writeFileSync(out, r.html);
  console.log("packed " + r.packed + " bytes; " + out + " is " + Buffer.byteLength(r.html) + " bytes");
}
