// Every NPC has a vignette with every other: drives the vignettes' per-frame callback in game time (0.05 s steps,
// about four game hours) with everyone where they stand, and reports how many of the pairs played, which did not
// (Nextessa's need her on her way back from a delivery, Backpacka's the Event and the slug's are switched off),
// that every wrapper is back at rest afterwards, and the error count.
//   NOSHOT=1 node shot2.js <url> x.png ./t_vigall.js
module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => {
    const fn = L.find((g) => /pick\(tt\)/.test(String(g))), V = JGP.vigs;
    if (!fn || !V) return 'no vignette callback';
    const inTown = Object.keys(V.lineUp());
    let tt = Re.t + 10;
    for (let k = 0; k < 300000; k++) { tt += 0.05; try { fn(tt, 0.05); } catch (e) { return 'err ' + e.message; } }
    const all = V.all, played = all.filter((pk) => V.plays[pk[0] + pk[1]]), missed = all.filter((pk) => !V.plays[pk[0] + pk[1]]);
    const why = (pk) => pk.slice(0, 2).filter((c) => !inTown.includes(c)).join('+') || 'both in town';
    const notAtRest = It.all.concat(st.ent ? [st.ent] : []).filter((e) => { const w = e.group.userData.vgW; return w && (w.position.lengthSq() > 1e-9 || Math.abs(w.rotation.x) + Math.abs(w.rotation.y) + Math.abs(w.rotation.z) > 1e-9); }).map((e) => e.def.name);
    const counts = {}; missed.forEach((pk) => { const k = why(pk); counts[k] = (counts[k] || 0) + 1; });
    return [
      'pairs ' + all.length + ' (' + V.all.filter((pk) => pk[0] !== 'SL').length + ' + the slug\'s ' + V.all.filter((pk) => pk[0] === 'SL').length + ') | in town now: ' + inTown.join(' '),
      'played ' + played.length + ' | not played: ' + JSON.stringify(counts),
      'town pairs not played: ' + (missed.filter((pk) => why(pk) === 'both in town').map((pk) => pk[0] + pk[1]).join(' ') || 'none'),
      'wrappers not at rest: ' + (notAtRest.join(' ') || 'none') + ' | errors ' + Re.errors,
    ].join('\n');
  }));
};
