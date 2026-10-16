// Checks the game's frame clock with deterministic time: active frames advance, inactive and blurred sessions
// pause simulation while blurred XR keeps rendering tracked views, and resuming after a long gap does not jump game time. Extracts the actual Re initializer
// from the readable page and runs it with rendering and world services stubbed; no browser or headset is needed.
// Env: none.
// Output: one success line; assertion failures exit non-zero.
//   node test/clock.js [index.html]   (from tools/; defaults to the readable copy)
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const acorn = require('acorn');

const html = fs.readFileSync(process.argv[2] || path.join(__dirname, '../Uncompressed/index.html'), 'utf8');
const script = html.slice(html.lastIndexOf('<script>') + '<script>'.length, html.lastIndexOf('</script>'));
const ast = acorn.parse(script, { ecmaVersion: 2022 });
const decl = ast.body.filter((n) => n.type === 'VariableDeclaration').flatMap((n) => n.declarations).find((n) => n.id.name === 'Re');
assert.ok(decl, 'readable page must declare Re');
let now = 1000, frame, work = 0, renders = 0;
const tick = () => work++;
const service = () => ({ update: tick });
const context = {
  performance: { now: () => now },
  we: { presenting: true, blurred: false, update: tick, post: tick },
  bo: service(), Te: tick, jt: { has: () => false, top: 'playing' }, It: { all: [] },
  me: service(), fe: service(), ue: service(), le: service(), ce: service(), Nt: service(), Ut: service(),
  L: [tick], xe: { scan: tick }, Ho: { contextLost: false }, C: {}, B: {}, window: {},
  O: { setAnimationLoop: (fn) => { frame = fn; }, render: () => renders++, xr: { isPresenting: true } },
  vo: (err) => { throw err; },
};
vm.createContext(context);
vm.runInContext('const ' + script.slice(decl.start, decl.end) + '; globalThis.clock = Re;', context);
const clock = context.clock;
const step = (ms) => { now += ms; frame(); };
clock.start();
frame();
const active = clock.t;
step(10);
assert.ok(Math.abs(clock.t - active - 0.01) < 1e-9, 'active time must advance normally');
assert.ok(work > 0, 'active frames must update the world');

for (const state of [{ presenting: false, blurred: false }, { presenting: true, blurred: true }]) {
  Object.assign(context.we, state);
  const pausedAt = clock.t, workAt = work, rendersAt = renders;
  for (let i = 0; i < 100; i++) step(10);
  assert.equal(clock.t, pausedAt, 'paused frames must not advance game time');
  assert.equal(work, workAt, 'paused frames must not update simulation or input');
  assert.equal(renders - rendersAt, state.presenting ? 100 : 0, 'blurred XR must keep rendering tracked views');
  Object.assign(context.we, { presenting: true, blurred: false });
  step(180000);
  assert.ok(clock.t > pausedAt && clock.t - pausedAt < 0.017, 'resume must discard the paused interval');
  const resumedAt = clock.t;
  step(10);
  assert.ok(Math.abs(clock.t - resumedAt - 0.01) < 1e-9, 'normal timing must resume');
}
context.we.blurred = true;
context.Ho.contextLost = true;
const lostAt = renders;
step(100);
assert.equal(renders, lostAt, 'lost WebGL context must not render');
context.Ho.contextLost = false;
context.O.xr.isPresenting = false;
step(100);
assert.equal(renders, lostAt, 'blurred non-XR sessions need no render');
assert.equal(clock.errors, 0);
console.log('game clock: active, exited, blurred XR rendering, context loss and resumed frames ok');
