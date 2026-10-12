// Vignettes where the cast stand (visits switched off): drives the vignettes' per-frame callback in game time (0.05 s
// steps, about four game hours) with everyone at their spots, and checks the owner's rules: a vignette plays only
// with the two side by side (every other pair meets by a visit, see t_visits.js and t_visitlive.js), a pair's
// animation and its lines play separately, and no pair plays again before every pair standing together has had
// its turn. Reports the pairs side by side, what played, every wrapper back at rest, and the error count.
//   NOSHOT=1 node shot2.js <url> x.png ./t_vigall.js
module.exports = async (p) => {
  await p.mouse.click(p.viewportSize().width / 2, p.viewportSize().height / 2); await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => {
    const fn = L.find((g) => /pick\(tt\)/.test(String(g))), V = JGP.vigs;
    if (!fn || !V) return 'no vignette callback';
    const m = V.lineUp(), beside = V.all.filter((pk) => m[pk[0]] && m[pk[1]] && V.beside(m[pk[0]], m[pk[1]])).map((pk) => pk[0] + pk[1]);
    // (where each pair stood when it started)
    const apart = [], seen = {};
    let tt = Re.t + 10;
    for (let k = 0; k < 300000; k++) {
      tt += 0.05;
      try { fn(tt, 0.05); } catch (e) { return 'err ' + e.message; }
      for (const key in V.plays) if ((seen[key] || 0) < V.plays[key]) {
        seen[key] = V.plays[key];
        const a = m[key.slice(0, 2)], b = m[key.slice(2, 4)];
        a && b && !V.beside(a, b) && apart.push(key);
      }
    }
    const keys = Object.keys(V.plays), anim = keys.filter((k) => k.length === 4), text = keys.filter((k) => k.length === 5);
    const counts = beside.map((k) => k + ' ' + (V.plays[k] || 0) + '/' + (V.plays[k + 't'] || 0));
    const notAtRest = It.all.concat(st.ent ? [st.ent] : []).filter((e) => { const w = e.group.userData.vgW; return w && (w.position.lengthSq() > 1e-9 || Math.abs(w.rotation.x) + Math.abs(w.rotation.y) + Math.abs(w.rotation.z) > 1e-9); }).map((e) => e.def.name);
    return [
      'pairs ' + V.all.length + ' | side by side now: ' + (beside.join(' ') || 'none'),
      'played in place: animations ' + anim.length + ', lines ' + text.length + ' | per pair side by side (animation/lines): ' + counts.join(', '),
      'played apart: ' + (apart.join(' ') || 'none') + (apart.length ? ' FAIL' : ' ok'),
      'wrappers not at rest: ' + (notAtRest.join(' ') || 'none') + ' | errors ' + Re.errors,
    ].join('\n');
  }));
};
