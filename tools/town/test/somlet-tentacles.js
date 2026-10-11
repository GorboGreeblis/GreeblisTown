module.exports = async (p) => {
  await p.mouse.click(640, 360); await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => {
    const e = It.byId.m_somlet, g = e.group, v = new THREE.Vector3();
    let minY = 9, worst = null, who = '';
    for (let t = 0; t < 12; t += 0.13) {
      e.anim(t, 0.016, e); g.updateMatrixWorld(true);
      g.traverse((m) => {
        if (!m.isMesh || !m.material || !m.material.color || m.material.color.getHexString() !== 'b04870') return;
        const P = m.geometry.attributes.position;
        for (let k = 0; k < P.count; k++) { v.fromBufferAttribute(P, k).applyMatrix4(m.matrixWorld); if (v.y < minY) (minY = v.y), (worst = +t.toFixed(2)), (who = m.parent.type + ':' + P.count + ':' + (m.parent.userData.pts ? 'tent' : 'other')); }
      });
    }
    return JSON.stringify({ minTentY: +minY.toFixed(3), worstT: worst, who, err: Re.errors });
  }));
};
