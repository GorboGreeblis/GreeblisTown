// Properties the game defines but never reads: object keys, class/object methods and `x.name = …` assignments
// in the game script whose name is read nowhere: not by the game (member reads, destructuring, `in`, any string
// literal, as these can be dynamic keys), not by the page's other scripts (three.js calls back into some, e.g.
// onBeforeRender). Names the test scripts use are listed apart: they are test hooks, kept on purpose.
// ESLint's no-unused-vars only sees local variables; this sees the rest. A lead, not proof: check each by hand.
//   node town/lint/deadprops.js [index.html] [min name length, default 3]
// Needs acorn (town/lint/node_modules after `npm run lint`).
const fs = require('fs'), path = require('path');
const acorn = require(path.join(__dirname, 'node_modules/acorn'));
const html = fs.readFileSync(process.argv[2] || path.join(__dirname, '../../../index.html'), 'utf8');
const MIN = +(process.argv[3] || 3);
// the game script is the last <script> block; the others are three.js, the throttle and the polyfills
const blocks = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
const game = blocks[blocks.length - 1], gameSrc = game[1], others = blocks.slice(0, -1).map((m) => m[1]).join('\n');
const lineOf = (pos) => html.slice(0, game.index + game[0].indexOf(gameSrc) + pos).split('\n').length;
const ast = acorn.parse(gameSrc, { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true });
const defs = new Map(), reads = new Set();
const def = (name, node) => name && name.length >= MIN && (defs.get(name) || defs.set(name, []).get(name)).push(lineOf(node.start));
const keyName = (k, computed) => (computed ? (k.type === 'Literal' && typeof k.value === 'string' ? k.value : null) : k.type === 'Identifier' ? k.name : k.type === 'Literal' ? String(k.value) : null);
(function walk(n, parent) {
  if (!n || typeof n.type !== 'string') return;
  switch (n.type) {
    case 'Property':
      if (parent && parent.type === 'ObjectPattern') reads.add(keyName(n.key, n.computed)); // const { a } = o reads a
      else def(keyName(n.key, n.computed), n.key);
      break;
    case 'MethodDefinition': case 'PropertyDefinition': def(keyName(n.key, n.computed), n.key); break;
    case 'AssignmentExpression':
      if (n.left.type === 'MemberExpression' && n.operator === '=') { def(keyName(n.left.property, n.left.computed), n.left.property); walk(n.left.object, n.left); walk(n.right, n); if (n.left.computed) walk(n.left.property, n.left); return; }
      break;
    case 'MemberExpression': { const k = keyName(n.property, n.computed); k && reads.add(k); break; }
    case 'Literal': typeof n.value === 'string' && reads.add(n.value); break;
    case 'TemplateElement': n.value.cooked && n.value.cooked.split(/\W+/).forEach((w) => reads.add(w)); break;
  }
  for (const k in n) { if (k === 'type' || k === 'start' || k === 'end') continue; const v = n[k]; Array.isArray(v) ? v.forEach((c) => walk(c, n)) : v && typeof v.type === 'string' && walk(v, n); }
})(ast, null);
// names the other scripts mention (callbacks three.js makes, globals the throttle reads)
const otherWords = new Set(others.match(/[A-Za-z_$][\w$]*/g) || []);
// names the test scripts mention
const testDir = path.join(__dirname, '../../test'), testWords = new Set();
for (const f of fs.readdirSync(testDir)) if (f.endsWith('.js')) (fs.readFileSync(path.join(testDir, f), 'utf8').match(/[A-Za-z_$][\w$]*/g) || []).forEach((w) => testWords.add(w));
// properties the browser reads when the game sets them (canvas, DOM, audio, WebXR, listener options)
const BROWSER = new Set('fillStyle strokeStyle font globalAlpha lineCap lineJoin lineWidth textAlign textBaseline className cssText innerHTML textContent marginTop scrollTop onended onclick passive latencyHint optionalFeatures willReadFrequently fixedFoveation'.split(' '));
const dead = [], testOnly = [];
for (const [name, lines] of defs) {
  if (reads.has(name) || otherWords.has(name) || BROWSER.has(name)) continue;
  (testWords.has(name) ? testOnly : dead).push(`${name} (line ${[...new Set(lines)].join(', ')})`);
}
console.log(`== defined, never read (${dead.length}):\n  ` + dead.sort().join('\n  '));
console.log(`== read only by the tests (${testOnly.length}):\n  ` + testOnly.sort().join('\n  '));
