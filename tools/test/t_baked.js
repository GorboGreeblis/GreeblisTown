// Animations acting on merged-away parts: a fresh copy of every creature is built while every part the build's
// merges remove is recorded; each copy is then driven through idle (12 s), walking, a Talk dialogue, a Blossom
// dialogue, busy with dance, a vignette and lying, and any removed part its animation still moves, hides,
// shows or rescales is reported by creature (such a part is no longer drawn: the change never shows, as with
// GOOWARD's squint and SOMLET's lids before userData.keep). The copies are removed after.
//   VW=320 VH=240 NOSHOT=1 node shot.js <url> x.png ./t_baked.js
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms);
  await p.mouse.click(160, 120); await W(2000);
  await p.evaluate(() => {
    const removed = new Set(), orig = THREE.Object3D.prototype.remove;
    THREE.Object3D.prototype.remove = function (...objs) { if (window.__bkRec) for (const o of objs) o && o !== this && removed.add(o); return orig.apply(this, objs); };
    window.__bk = { copies: [] };
    const src = It.all.filter((e) => e.def && e.def.builder);
    src.forEach((e, k) => {
      removed.clear(), (window.__bkRec = !0);
      let c;
      try { c = It.spawn({ kind: e.kind, def: e.def, builder: e.def.builder, x: 150 + 6 * (k % 6), z: 150 + 6 * Math.floor(k / 6) }); } finally { window.__bkRec = !1; }
      // (every removed object still detached from the copy, and every object under it)
      const gone = [];
      for (const o of removed) { let a = o; while (a.parent) a = a.parent; a !== c.group && a !== C && o.traverse((q) => gone.push(q)); }
      __bk.copies.push({ name: e.def.name, c, gone, snap: null, hits: new Set() });
    });
    __bk.snapAll = () => __bk.copies.forEach((q) => (q.snap = q.gone.map((o) => [o.position.x, o.position.y, o.position.z, o.quaternion.x, o.quaternion.y, o.quaternion.z, o.quaternion.w, o.scale.x, o.scale.y, o.scale.z, +o.visible].join())));
    __bk.diffAll = (phase) => __bk.copies.forEach((q) => q.gone.forEach((o, i) => { const s = [o.position.x, o.position.y, o.position.z, o.quaternion.x, o.quaternion.y, o.quaternion.z, o.quaternion.w, o.scale.x, o.scale.y, o.scale.z, +o.visible].join(); s !== q.snap[i] && q.hits.add(phase + ':' + (o.name || (o.isMesh ? 'mesh' : o.isGroup ? 'group' : 'object')) + (o.isMesh && o.material && o.material.color ? '#' + o.material.color.getHexString() : '') + '@' + [o.position.x, o.position.y, o.position.z].map((v) => v.toFixed(2)).join(',') + ' children ' + o.children.length); }));
    __bk.snapAll();
  });
  const phase = async (name, on, off, ms) => {
    await p.evaluate(([name, on]) => { __bk.snapAll(); __bk.copies.forEach((q) => new Function('c', on)(q.c)); }, [name, on]);
    await W(ms);
    await p.evaluate(([name, off]) => { __bk.diffAll(name); __bk.copies.forEach((q) => new Function('c', off)(q.c)); }, [name, off]);
  };
  await phase('idle', '', '', 12000);
  await phase('walk', 'c.moving = true', 'c.moving = false', 2000);
  await phase('busy-dance', 'c.busy = "finale"; c.dance = 1; c.concertDance = 1', 'c.busy = null; c.dance = 0; c.concertDance = 0', 2500);
  await phase('vig', 'c.vig = true', 'c.vig = false', 2000);
  await phase('lie', 'c.lieK = 1', 'c.lieK = 0', 2000);
  // (a Talk and a Blossom dialogue, one copy at a time, through the game's own te())
  const n = await p.evaluate(() => __bk.copies.length);
  for (let i = 0; i < n; i++) {
    for (const gift of [false, true]) {
      await p.evaluate(([i, gift]) => { __bk.snapAll(); const c = __bk.copies[i].c; Kt.blossoms = Math.max(Kt.blossoms, 2); try { (c.def.lines || gift) && te(c, gift); } catch (x) {} }, [i, gift]);
      await W(1800);
      await p.evaluate(([i, gift]) => { __bk.diffAll(gift ? 'gift' : 'talk'); try { for (let k = 0; k < 20 && qt.isOpen; k++) qt.skipAll(); } catch (x) {} }, [i, gift]);
      await W(300);
    }
  }
  console.log(await p.evaluate(() => {
    const out = __bk.copies.map((q) => `${q.name}: ${q.gone.length} merged-away objects, ${q.hits.size ? 'MOVED: ' + [...q.hits].slice(0, 8).join(', ') : 'none moved'}`);
    __bk.copies.forEach((q) => { try { It.remove(q.c); } catch (x) {} });
    return out.join('\n') + '\nerr ' + Re.errors;
  }));
};
