// Remove class methods of three.js that never ran and that nothing (three or game) can name.
const acorn = require('acorn'); const fs = require('fs');
const [srcPath, covPath, gamePath, outPath] = process.argv.slice(2);
const src = fs.readFileSync(srcPath, 'utf8'); const game = fs.readFileSync(gamePath, 'utf8');
const cov = JSON.parse(fs.readFileSync(covPath, 'utf8')).three;
if (cov.sha256 !== require('crypto').createHash('sha256').update(src).digest('hex')) throw new Error('coverage was recorded on a different three.js build; re-record it (see the packing guide)');
const unc = cov.functions.filter((f) => f.ranges[0].count === 0).map((f) => [f.ranges[0].startOffset, f.ranges[0].endOffset]);
const isUnc = (s, e) => unc.some(([a, b]) => a <= s && e <= b);
const ast = acorn.parse(src, { ecmaVersion: 2022 });
const defs = []; const keyCount = new Map();
(function w(n) { if (!n || typeof n.type !== 'string') return;
  if (n.type === 'MethodDefinition' && !n.computed && n.key.type === 'Identifier') { defs.push(n); keyCount.set(n.key.name, (keyCount.get(n.key.name) || 0) + 1); }
  for (const k in n) { const v = n[k]; if (Array.isArray(v)) v.forEach(w); else if (v && typeof v.type === 'string') w(v); } })(ast);
const KEEP = new Set(['constructor', 'toJSON', 'toString', 'valueOf', 'dispose', 'handleEvent', 'then', 'raycast', 'onBeforeCompile', 'onBeforeRender', 'onAfterRender', 'customProgramCacheKey', 'clone', 'copy']);
const words = (s, name) => (s.match(new RegExp('(?<![A-Za-z0-9_$])' + name.replace(/\$/g, '\\$') + '(?![A-Za-z0-9_$])', 'g')) || []).length;
const rm = []; const report = [];
for (const d of defs) {
  const name = d.key.name; if (KEEP.has(name) || d.kind !== 'method' || d.static && 0) continue;
  if (!isUnc(d.value.start, d.value.end)) continue;
  if (words(src, name) !== keyCount.get(name)) continue; // used somewhere besides definitions
  if (words(game, name) > 0) continue;
  rm.push(d); report.push([d.end - d.start, name]);
}
// all definitions of a removable name must be uncovered too
const names = new Set(rm.map((d) => d.key.name)); const bad = new Set();
for (const d of defs) if (names.has(d.key.name) && !isUnc(d.value.start, d.value.end)) bad.add(d.key.name);
const final = rm.filter((d) => !bad.has(d.key.name)).sort((a, b) => b.start - a.start);
let out = src; for (const d of final) out = out.slice(0, d.start) + out.slice(d.end);
fs.writeFileSync(outPath, out);
const tot = final.reduce((a, d) => a + d.end - d.start, 0);
console.log('removed methods', final.length, 'bytes', tot);
console.log(report.filter(([, n]) => !bad.has(n)).sort((a, b) => b[0] - a[0]).map(([s, n]) => n + ':' + s).join(' '));
