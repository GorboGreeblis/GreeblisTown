// Execute the actual XR calibration and turn/button statements with synthetic poses and controller edges.
// No headset required. Run from tools/: node test/xrcontrols.js [readable.html].
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const acorn = require('acorn');
const html = fs.readFileSync(process.argv[2] || path.join(__dirname, '../Uncompressed/index.html'), 'utf8');
const src = html.slice(html.lastIndexOf('<script>') + 8, html.lastIndexOf('</script>'));
const tree = acorn.parse(src, { ecmaVersion: 2022 });
const walk = (n, visit) => {
  if (!n || typeof n !== 'object') return;
  if (n.type) visit(n);
  for (const [k, v] of Object.entries(n)) if (k !== 'start' && k !== 'end') {
    if (Array.isArray(v)) v.forEach(x => walk(x, visit)); else walk(v, visit);
  }
};
let update;
walk(tree, n => {
  if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' && n.left.object.name === 'o' && n.left.property.name === 'update' && n.right.type === 'FunctionExpression') update = n.right;
});
assert.ok(update);
const statements = update.body.body;
const calibration = statements.find(n => n.type === 'IfStatement' && src.slice(n.start, n.end).includes('o.calibrateHeight'));
const controls = statements.find(n => n.type === 'ExpressionStatement' && src.slice(n.start, n.end).includes('Qe('));
assert.ok(calibration); assert.ok(controls);
const state = { o: { calibrateHeight: true }, e: { eyeHeight: 1.62, stickDead: .15, turnSpeed: 1.35 }, O: { xr: { getReferenceSpace: () => ({}) } }, frame: { getViewerPose: () => null } };
const ctx = vm.createContext(state);
const calibrate = () => vm.runInContext(src.slice(calibration.start, calibration.end), ctx);
calibrate(); assert.equal(state.o.calibrateHeight, true, 'lost tracking must wait');
for (const height of [.95, 1.7, 0]) {
  state.o.calibrateHeight = true;
  state.frame.getViewerPose = () => ({ transform: { position: { y: height } } });
  calibrate(); assert.ok(Math.abs(height + state.o.floorOffset - 1.62) < 1e-10);
  const offset = state.o.floorOffset;
  state.frame.getViewerPose = () => ({ transform: { position: { y: height + .2 } } });
  calibrate(); assert.equal(state.o.floorOffset, offset, 'leaning must remain tracked');
}
let rotation = 0, selections = [];
Object.assign(state, { Qe: a => rotation += a, J: r => selections.push(r.hand), N: (r, b) => b === 4 && r.pressed, ve() {}, r: { hand: 'left', pressed: false }, i: { hand: 'right', pressed: false }, l: {}, m: 0, t: 1 / 72 });
const input = () => vm.runInContext(src.slice(controls.start, controls.end), ctx);
input(); assert.equal(rotation, 0);
for (const hz of [72, 90]) {
  rotation = 0; state.m = 1; state.t = 1 / hz;
  for (let f = 0; f < hz; f++) input();
  assert.ok(Math.abs(rotation + 1.35) < 1e-10, 'turn speed must be frame-rate independent');
}
rotation = 0; state.m = .1; input(); assert.equal(rotation, 0);
state.r.pressed = state.i.pressed = true; input();
assert.deepEqual(selections, ['right', 'left'], 'A and X must use the same selection path');
console.log('XR controls: tracked seated/standing calibration, retained leaning, smooth turn speed/dead zone and A/X selection passed');
