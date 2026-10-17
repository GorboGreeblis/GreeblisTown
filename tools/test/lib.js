// The helpers the probes share: the start click, waits on game time, closing dialogues, renders to PNG, starting the
// Garden Event, the closing error count, and the check that the church's ANCIENT never plants or dances.
// Env: LOG (a file: log() also appends each line to it the moment it is printed, so a long run that is cut off still
//   leaves every step it reached).
// Output: none of its own; render() and savePng() write the file they are given, logErrors() prints `err <n>`.
//   const { log, start, waitGame, closeDialogs, render, startEvent, logErrors } = require('./lib.js');
const fs = require('fs');

const log = (...a) => (console.log(...a), process.env.LOG && fs.appendFileSync(process.env.LOG, a.join(' ') + '\n'));

// The click that starts the game, at the centre of the view, then a wait (ms). A click near the top edge can land on
// the menu bar, and the world's frame callbacks stand still while a menu is open.
const start = async (p, ms = 1500) => {
  const v = p.viewportSize();
  await p.mouse.click(v.width / 2, v.height / 2);
  await p.waitForTimeout(ms);
};

// Waits `sec` seconds of game time (Re.t; headless game time runs several times slower than real time), or until
// `until` (a page function or expression) is true. Returns whether `until` was met. `step` is the poll interval (ms)
// and `max` the most polls, a guard for a game clock that stands still.
const waitGame = async (p, sec, until = null, { step = 250, max = 6000 } = {}) => {
  const t0 = await p.evaluate(() => Re.t);
  for (let k = 0; k < max && (await p.evaluate(() => Re.t)) - t0 < sec; k++) {
    if (until && (await p.evaluate(until))) return true;
    await p.waitForTimeout(step);
  }
  return false;
};

// Closes every open dialogue, page by page.
const closeDialogs = (p) => p.evaluate(() => { for (let i = 0; i < 40 && qt.isOpen; i++) try { qt.skipAll(); qt.advance(); } catch (e) {} });

// The text of the open dialogue page once it has been typed out (it stops changing), or null with none open.
const said = async (p) => {
  let a = null;
  for (let k = 0; k < 60; k++) {
    const b = await p.evaluate(() => (qt.isOpen ? document.getElementById('dlgText').textContent : null));
    if (b === null || b === a) return b;
    (a = b), await p.waitForTimeout(250);
  }
  return a;
};

// A PNG from a data: URL.
const savePng = (file, dataUrl) => fs.writeFileSync(file, Buffer.from(dataUrl.split(',')[1], 'base64'));
// <out>_<name>.png beside <out>.png
const outName = (out, name) => out.replace('.png', '_' + name + '.png');

// Renders the scene from `cam` looking at `look` (world [x, y, z]) to a PNG. Options: fov (°, default 45), w and h (px,
// default 800×600), near and far (m, default 0.05 and 300), fog (false renders without the fog), up (the camera's up
// vector), hideAbove (meshes higher than this, m, are hidden for the render: the sky for a map from above).
const render = async (p, file, cam, look, opt = {}) => {
  const o = { fov: 45, w: 800, h: 600, near: 0.05, far: 300, fog: true, up: null, hideAbove: null, ...opt };
  const d = await p.evaluate(([cam, look, o]) => {
    const c = new THREE.PerspectiveCamera(o.fov, o.w / o.h, o.near, o.far);
    o.up && c.up.set(...o.up);
    c.position.set(...cam); c.lookAt(...look); c.updateMatrixWorld(); c.updateProjectionMatrix();
    const fog = C.fog, hid = [];
    o.fog || (C.fog = null);
    if (o.hideAbove !== null) C.traverse((m) => { if (m.visible && m.isMesh && m.getWorldPosition(new THREE.Vector3()).y > o.hideAbove) (m.visible = !1), hid.push(m); });
    O.setSize(o.w, o.h, !1); O.render(C, c);
    C.fog = fog; hid.forEach((m) => (m.visible = !0));
    const d = O.domElement.toDataURL('image/png');
    O.setSize(innerWidth, innerHeight);
    return d;
  }, [cam, look, o]);
  savePng(file, d);
};

// Starts the Garden Event from the Summoning Pillar, as the player does: the Summoning Stone quest done, the Seeds
// (default) or not, the Snacks set when given, the player at `at` ([x, z], default [0, 3]; null leaves it).
const startEvent = (p, { seeds = true, snacks = null, at = [0, 3] } = {}) => p.evaluate(([seeds, snacks, at]) => {
  Kt.rewards.seeds = seeds; Kt.rewards.stone = !0;
  snacks === null || (Kt.rewards.snacks = snacks);
  at && At.position.set(at[0], 0, at[1]);
  z.list.find((s) => s.id === 'campfire').run(); oe.yes();
}, [seeds, snacks, at]);

// The closing line of a probe: `err <n>`, the game's error count.
const logErrors = async (p) => log('err', await p.evaluate(() => Re.errors));

// The church's ANCIENT never plants or dances (the owner's rule). watchAncient() installs a frame callback that records,
// while an Event runs, every pose it takes (JGP.slug.mode()), the frames the Event's planting and dancing list (bt.tg)
// holds it or its stand-in, the frames its stand-in has an Event spot or state, and how far its body ever moves.
// ancientReport() returns that as one line ending in `ok` or `FAIL`.
const watchAncient = (p) => p.evaluate(() => {
  const S = JGP.slug, mk = S.ent.group, b0 = S.body.position.clone(), m0 = mk.position.clone();
  window.__AN = { poses: new Set(), listed: 0, given: 0, moved: 0 };
  L.push(() => {
    if (!me.active) return;
    const A = __AN, e = S.ent;
    A.poses.add(S.mode());
    for (const g of bt.tg.keys()) { let a = S.body; while (a && a !== g) a = a.parent; (a || g === mk) && A.listed++; }
    (e.busy || e.finaleSlot || e.planting || e.concertDance) && A.given++;
    A.moved = Math.max(A.moved, S.body.position.distanceTo(b0), mk.position.distanceTo(m0));
  });
});
const ancientReport = (p) => p.evaluate(() => {
  const A = __AN, poses = [...A.poses], bad = poses.some((m) => m !== 'idle' && m !== 'talk') || A.listed || A.given || A.moved > 1e-6;
  return `poses ${poses.join(', ') || 'none seen'} | frames in the Event's planting/dancing list ${A.listed} | frames with an Event spot or state ${A.given} | moved ${A.moved.toFixed(3)} m ${bad ? 'FAIL' : 'ok'}`;
});

module.exports = { log, start, waitGame, closeDialogs, said, savePng, outName, render, startEvent, logErrors, watchAncient, ancientReport };
