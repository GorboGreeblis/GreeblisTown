// Render reference portraits of the uploaded game's creatures (sandboxed browser, network blocked).
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const html = fs.readFileSync(process.argv[2], 'utf8'), outDir = process.argv[3];
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 640, height: 640 } });
  const logs = []; p.on('pageerror', (e) => logs.push('ERR ' + e.message));
  await p.route('**/*', (r) => (r.request().url() === 'http://ref.local/' ? r.fulfill({ status: 200, contentType: 'text/html', body: html }) : r.abort()));
  await p.goto('http://ref.local/');
  await p.waitForTimeout(9000);
  const shots = await p.evaluate(() => {
    const list = [];
    try { for (const k in ce) ce[k] && ce[k].group && list.push(['comp_' + k, ce[k].group]); } catch (e) {}
    for (const k in Ye) list.push([k, Ye[k].group]);
    const out = {}, cam = new THREE.PerspectiveCamera(35, 1, 0.05, 500), box = new THREE.Box3(), c = new THREE.Vector3(), sz = new THREE.Vector3();
    const kids = W.children.slice(), vis = kids.map((o) => o.visible), bg = W.background, fog = W.fog;
    W.background = new THREE.Color('#9fc7e8'); W.fog = null;
    K.setSize(640, 640, false);
    for (const [name, g] of list) {
      kids.forEach((o) => { o.visible = o.isLight || o === g; });
      g.updateMatrixWorld(true); box.setFromObject(g); box.getCenter(c); box.getSize(sz);
      const r = Math.max(sz.x, sz.y, sz.z) * 1.25 + 0.3, yaw = g.rotation.y;
      out[name] = { size: [sz.x, sz.y, sz.z].map((v) => +v.toFixed(2)), imgs: [] };
      for (const a of [0.6, -0.9, 2.6]) {
        cam.position.set(c.x + Math.sin(yaw + a) * r * 1.6, c.y + r * 0.35, c.z + Math.cos(yaw + a) * r * 1.6); cam.lookAt(c);
        K.render(W, cam); out[name].imgs.push(K.domElement.toDataURL('image/png'));
      }
    }
    kids.forEach((o, i) => (o.visible = vis[i])); W.background = bg; W.fog = fog;
    return out;
  });
  for (const k in shots) { shots[k].imgs.forEach((d, i) => fs.writeFileSync(outDir + '/ref_' + k + '_' + i + '.png', Buffer.from(d.split(',')[1], 'base64'))); console.log(k, JSON.stringify(shots[k].size)); }
  console.log(logs.slice(0, 5).join('\n'));
  await b.close();
})();
