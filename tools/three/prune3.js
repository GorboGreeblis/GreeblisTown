// Removes three.js class methods that never ran in any recorded session and that nothing (three.js
// itself or the game) can name.
// node prune3.js <three.js> <game.js (all other scripts)> <out.js> cov1.json [cov2.json ...]
const acorn = require('acorn'), fs = require('fs');
const [srcPath, gamePath, outPath, ...covs] = process.argv.slice(2);
const src = fs.readFileSync(srcPath, 'utf8'), game = fs.readFileSync(gamePath, 'utf8'), N = src.length;
// ran[i]: byte i ran in some session (block-level ranges, nested ranges override outer ones)
const ran = new Uint8Array(N);
for (const cf of covs) {
  const sc = JSON.parse(fs.readFileSync(cf, 'utf8')).find((r) => r.functions.some((f) => f.ranges[0].endOffset === N));
  if (!sc) throw new Error('no coverage for this three.js build in ' + cf);
  const cov = new Uint8Array(N).fill(1), rs = [];
  sc.functions.forEach((f) => f.ranges.forEach((r) => rs.push(r)));
  rs.sort((a, b) => b.endOffset - b.startOffset - (a.endOffset - a.startOffset));
  for (const r of rs) cov.fill(r.count > 0 ? 1 : 0, r.startOffset, r.endOffset);
  for (let i = 0; i < N; i++) ran[i] |= cov[i];
}
const neverRan = (s, e) => { for (let i = s; i < e; i++) if (ran[i]) return !1; return !0; };
const ast = acorn.parse(src, { ecmaVersion: 2022 });
const defs = [], keyCount = new Map();
(function w(n) { if (!n || typeof n.type !== 'string') return;
  if (n.type === 'MethodDefinition' && !n.computed && n.key.type === 'Identifier') { defs.push(n); keyCount.set(n.key.name, (keyCount.get(n.key.name) || 0) + 1); }
  for (const k in n) { const v = n[k]; if (Array.isArray(v)) v.forEach(w); else if (v && typeof v.type === 'string') w(v); } })(ast);
const KEEP = new Set(['constructor', 'toJSON', 'toString', 'valueOf', 'dispose', 'handleEvent', 'then', 'raycast', 'onBeforeCompile', 'onBeforeRender', 'onAfterRender', 'customProgramCacheKey', 'clone', 'copy']);
const words = (s, name) => (s.match(new RegExp('(?<![A-Za-z0-9_$])' + name.replace(/\$/g, '\\$') + '(?![A-Za-z0-9_$])', 'g')) || []).length;
// rounds: a method removed in one round may have been the only one naming another
const gone = new Set();
let rest = src;
for (let round = 0; round < 20; round++) {
  // the text that is left: the source with the methods removed so far blanked out
  const live = defs.filter((d) => !gone.has(d)), cnt = new Map();
  live.forEach((d) => cnt.set(d.key.name, (cnt.get(d.key.name) || 0) + 1));
  const cand = live.filter((d) => d.kind === 'method' && !KEEP.has(d.key.name) && neverRan(d.value.start, d.value.end) && words(rest, d.key.name) === cnt.get(d.key.name) && !words(game, d.key.name));
  const names = new Set(cand.map((d) => d.key.name)), bad = new Set();
  for (const d of live) if (names.has(d.key.name) && !cand.includes(d)) bad.add(d.key.name);
  const add = cand.filter((d) => !bad.has(d.key.name));
  if (!add.length) break;
  add.forEach((d) => gone.add(d));
  // blank them (same length, so offsets keep matching the coverage)
  const arr = rest.split('');
  for (const d of add) for (let i = d.start; i < d.end; i++) arr[i] = ' ';
  rest = arr.join('');
  console.log('round', round, 'removed', add.length);
}
const fin = [...gone].sort((a, b) => b.start - a.start);
let out = src; for (const d of fin) out = out.slice(0, d.start) + out.slice(d.end);
fs.writeFileSync(outPath, out);
console.log('removed methods', fin.length, 'bytes', N - out.length);
console.log(fin.map((d) => d.key.name + ':' + (d.end - d.start)).sort().join(' '));
