// Replaces every console.* call in three.js with `void 0` (the same value); terser then drops them. Lists the calls
// with nested calls in their arguments, whose side effects go with them.
// Env: none.
// Output: `console calls <n> bytes <n>`, then `calls with nested calls in args: <n>` and each such call; the result to
//   <out.js>.
//   node three/noconsole.js three_p2.js three_p3.js
const acorn = require('acorn'); const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8'); const ast = acorn.parse(src, { ecmaVersion: 2022 });
const reps = []; const sideEffect = [];
(function w(n) { if (!n || typeof n.type !== 'string') return;
  if (n.type === 'CallExpression' && n.callee.type === 'MemberExpression' && n.callee.object.type === 'Identifier' && n.callee.object.name === 'console') {
    const txt = src.slice(n.start, n.end); if (/\(/.test(src.slice(n.arguments.length ? n.arguments[0].start : n.end, n.end).replace(/"(?:[^"\\]|\\.)*"/g, '').replace(/'(?:[^'\\]|\\.)*'/g, ''))) sideEffect.push(txt.slice(0, 120));
    reps.push([n.start, n.end]); return; }
  for (const k in n) { const v = n[k]; if (Array.isArray(v)) v.forEach(w); else if (v && typeof v.type === 'string') w(v); } })(ast);
let out = src; reps.sort((a, b) => b[0] - a[0]).forEach(([s, e]) => { out = out.slice(0, s) + 'void 0' + out.slice(e); });
fs.writeFileSync(process.argv[3], out); console.log('console calls', reps.length, 'bytes', src.length - out.length); console.log('calls with nested calls in args:', sideEffect.length + (sideEffect.length ? '\n' + sideEffect.join('\n') : ''));
