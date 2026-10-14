// The code that never ran in any recorded session: the game script (the page's last <script> block, cut out exactly
// as the browser saw it) against one or more cov.js files, the count-0 ranges merged over them, outermost spans only,
// largest first. Pass the page the coverage was recorded on.
// Env: TOP (spans printed, default 400).
// Output: `uncovered bytes <n> of <n> spans <n>`, then one line per span: its size in bytes, its index.html lines
//   and its first 140 characters. A coverage file with no script of the game script's length is reported and skipped.
//   node test/uncov.js [index.html] cov_d.json [cov_m.json …] > uncov.txt   (default page: the repo root's)
const fs = require('fs'), path = require('path');

const args = process.argv.slice(2);
const page = /\.html?$/.test(args[0] || '') ? args.shift() : path.join(__dirname, '../../index.html');
const html = fs.readFileSync(page, 'utf8');
const blocks = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)], game = blocks[blocks.length - 1];
const src = game[1], base = game.index + game[0].indexOf(src), N = src.length;
// ran[i] = 1 if byte i ran in any session
const ran = new Uint8Array(N);
for (const cf of args) {
  const sc = JSON.parse(fs.readFileSync(cf, 'utf8')).find((r) => r.functions.some((f) => f.ranges[0].endOffset === N));
  if (!sc) { console.error('no script of length', N, 'in', cf); continue; }
  const cov = new Uint8Array(N).fill(1);
  // ranges are nested: applied from the largest down, so an inner range overrides its outer one
  const rs = []; sc.functions.forEach((f) => f.ranges.forEach((r) => rs.push(r)));
  rs.sort((a, b) => (b.endOffset - b.startOffset) - (a.endOffset - a.startOffset));
  for (const r of rs) cov.fill(r.count > 0 ? 1 : 0, r.startOffset, r.endOffset);
  for (let i = 0; i < N; i++) ran[i] |= cov[i];
}
// the index.html line of a game-script offset (a binary search over the script's line breaks)
const nl = []; for (let i = 0; i < N; i++) src.charCodeAt(i) === 10 && nl.push(i);
const line0 = html.slice(0, base).split('\n').length;
const lineOf = (o) => { let lo = 0, hi = nl.length; while (lo < hi) { const m = (lo + hi) >> 1; nl[m] < o ? (lo = m + 1) : (hi = m); } return line0 + lo; };
const spans = []; let i = 0;
while (i < N) { if (ran[i]) { i++; continue; } let j = i; while (j < N && !ran[j]) j++; if (src.slice(i, j).trim().length > 2) spans.push([j - i, i, j]); i = j; }
console.log('uncovered bytes', spans.reduce((a, s) => a + s[0], 0), 'of', N, 'spans', spans.length);
spans.sort((a, b) => b[0] - a[0]);
for (const [n, a, b] of spans.slice(0, +process.env.TOP || 400)) console.log(n + '\tL' + lineOf(a) + '-' + lineOf(b) + '\t' + src.slice(a, Math.min(b, a + 140)).replace(/\s+/g, ' '));
