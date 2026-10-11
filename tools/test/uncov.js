// Lists the code that never ran (count-0 ranges, outermost only), largest first, merged over several coverage files.
// node uncov.js blk6.js cov_d.json [cov_m.json ...] > out.txt
const fs = require('fs');
const [blk, ...covs] = process.argv.slice(2), src = fs.readFileSync(blk, 'utf8'), N = src.length;
// ran[i] = 1 if byte i ran in any session
const ran = new Uint8Array(N);
for (const cf of covs) {
  const res = JSON.parse(fs.readFileSync(cf, 'utf8'));
  const sc = res.find((r) => r.functions.some((f) => f.ranges[0].endOffset === N));
  if (!sc) { console.error('no script of length', N, 'in', cf); continue; }
  const cov = new Uint8Array(N).fill(1);
  // ranges are nested: apply in order of size (outer first) so inner ranges override
  const rs = []; sc.functions.forEach((f) => f.ranges.forEach((r) => rs.push(r)));
  rs.sort((a, b) => (b.endOffset - b.startOffset) - (a.endOffset - a.startOffset));
  for (const r of rs) cov.fill(r.count > 0 ? 1 : 0, r.startOffset, r.endOffset);
  for (let i = 0; i < N; i++) ran[i] |= cov[i];
}
const lineOf = (o) => src.slice(0, o).split('\n').length;
const spans = []; let i = 0;
while (i < N) { if (ran[i]) { i++; continue; } let j = i; while (j < N && !ran[j]) j++; const txt = src.slice(i, j); if (txt.trim().length > 2) spans.push([j - i, i, j]); i = j; }
const total = spans.reduce((a, s) => a + s[0], 0);
console.log('uncovered bytes', total, 'of', N, 'spans', spans.length);
spans.sort((a, b) => b[0] - a[0]);
for (const [n, a, b] of spans.slice(0, +process.env.TOP || 400)) console.log(n + '\tL' + lineOf(a) + '-' + lineOf(b) + '\t' + src.slice(a, Math.min(b, a + 140)).replace(/\s+/g, ' '));
