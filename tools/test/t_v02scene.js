// v0.2 scene changes: gazebo entrance/home, anchored Blue Jay, unique books, walkover pickup,
// ZOLLOD's ordinary Talk and slow Gem assembly. Close renders cover the changed designs.
// Run through shot.js at a small viewport; output PNGs use the supplied stem.
const assert = require('node:assert/strict');
const { start, log, logErrors, render, outName } = require('./lib.js');
module.exports = async (p, out) => {
  await start(p);
  if (process.env.PART !== "renders") {
  const world = await p.evaluate(() => {
    const e = It.byId.p_gemtoe, jay = JGP.blueJay, v = new THREE.Vector3();
    const via = JGP.gazeboVia(), errors = [];
    const entrance = via[via.length - 1], dx = entrance[0] - e.home.x, dz = entrance[1] - e.home.z;
    for (let j = 0; j <= 30; j++) {
      v.set(e.home.x + dx * j / 30, 0, e.home.z + dz * j / 30);
      const a = v.clone(); F.resolve(v, .35);
      if (v.distanceTo(a) > .01) errors.push(j);
    }
    return { home: [e.home.x, e.home.z], atHome: JGP.homeGround(e), entranceClashes: errors,
      bird: jay.bird.getWorldPosition(v).toArray(), head: jay.head.rotation.y,
      books: JGP.libLayout.shown.map(q => q.what) };
  });
  assert.deepEqual(world.home, [5, -31]); assert.equal(world.atHome, true);
  assert.deepEqual(world.entranceClashes, []);
  for (const key of ['cooking', 'truth']) assert.equal(world.books.filter(v => v === key).length, 1);
  log('gazebo home and walkable entrance; exactly one of each new book: passed');
  await p.waitForTimeout(1800);
  const jay = await p.evaluate(() => ({ anchor: JGP.blueJay.bird.getWorldPosition(new THREE.Vector3()).toArray(), head: JGP.blueJay.head.rotation.y }));
  assert.deepEqual(jay.anchor, world.bird); assert.notEqual(jay.head, world.head);
  log('Blue Jay animates and stays anchored: passed');
  }
  const scenes = await p.evaluate(() => {
    const at = (key,x,y,z) => { const b = F.buildings.find(b => b.name === key); return [b.x+b.c*x+b.s*z,y,b.z-b.s*x+b.c*z]; };
    const s = JGP.slug.body, b = JGP.blueJay.bird.getWorldPosition(new THREE.Vector3());
    const zg = It.all.find(e => e.def.__type === 'cutebex').group, z = zg.position;
    const zcam = zg.localToWorld(new THREE.Vector3(0,1.8,4)).toArray();
    const room = s.parent, acam = room.localToWorld(new THREE.Vector3(1,1.3,-9.5)).toArray();
    const alook = room.localToWorld(new THREE.Vector3(.1,.3,-11.6)).toArray();
    const et = It.byId.p_etcher.group.position;
    return [
      ['gallery',at('gallery',0,3.5,8),at('gallery',0,1.4,-.4)],
      ['gallery_floor',at('gallery',-1,2.5,2.1),at('gallery',0,.05,-.4)],
      ['landscapes',at('gallery',0,2.3,6.2),at('gallery',0,1.3,3.45)],
      ['paint_can',at('gallery',2.5,.65,-.1),at('gallery',2.9,.28,-1.05)],
      ['gazebo',[8,5,-21],[5,2,-31]],
      ['blue_jay',[b.x+.65,b.y+.24,b.z+.62],[b.x,b.y+.18,b.z]],
      ['ancient',acam,alook],
      ['zollod',zcam,[z.x,1.35,z.z]],
      ['etcher',[et.x+2.2,1.9,et.z+2.2],[et.x,1.35,et.z]],
    ];
  });
  for (const [name, cam, look] of scenes) { await render(p,outName(out,name),cam,look,{w:800,h:600,fov:50}); log('render',name); }
  const books = await p.evaluate(() => JGP.libLayout.shown.filter(q => ['cooking','truth','shyness'].includes(q.what)).map(q => {
    const at = q.obj.localToWorld(new THREE.Vector3(...q.at)), a = q.face + q.obj.rotation.y;
    return {name:q.what,at:at.toArray(),cam:[at.x+.85*Math.sin(a),at.y+.12,at.z+.85*Math.cos(a)]};
  }));
  for (const b of books) await render(p,outName(out,b.name),b.cam,b.at,{w:600,h:600,fov:45});
  if (process.env.PART === "renders") {
    await p.waitForFunction(() => { let ready=false; C.traverse(m => { const im=m.material && m.material.map && m.material.map.image; if(im && im.width===3072 && im.height===1158)ready=true; }); return ready; }, {}, {timeout:240000});
    const g = scenes.find(s => s[0] === "gallery"); await render(p,outName(out,"gallery"),g[1],g[2],{w:1000,h:750,fov:50});
    log("great painting at3072x1158 and revised close views: passed"); await logErrors(p); return;
  }
  const pickup = await p.evaluate(() => {
    const s = z.list.find(q => q.id === 'shybook'), bk = s.pickObj[0], v = bk.getWorldPosition(new THREE.Vector3());
    const n = new THREE.Vector3(0,0,1).transformDirection(bk.matrixWorld); n.y=0; n.normalize();
    At.position.set(v.x-n.x,0,v.z-n.z); return {x:v.x,z:v.z,n:n.toArray()};
  });
  await p.waitForTimeout(400); assert.equal(await p.evaluate(() => Kt.shyBook),false,'back of shelf must not pick up');
  await p.evaluate(q => At.position.set(q.x+q.n[0],0,q.z+q.n[2]),pickup);
  await p.waitForTimeout(500); assert.equal(await p.evaluate(() => Kt.shyBook),true,'walk into front pickup area');
  await p.evaluate(() => { qt.skipAll(); Kt.shyFree=true; });
  const talk = await p.evaluate(() => {
    const e = It.all.find(e => e.def.__type === 'cutebex');
    const a = xe.actionsFor(e).find(a => a.verb === 'talk'); a && a.run();
    return {offered:!!a,open:qt.isOpen};
  });
  assert.deepEqual(talk,{offered:true,open:true}); await p.evaluate(() => qt.skipAll());
  log('shelf pickup and ZOLLOD ordinary Talk: passed');
  const glue = await p.evaluate(() => {
    const was = we.blurred; we.blurred=true;
    let done=0;
    const a = ARTS.assemble(new THREE.Vector3(0,4,0),()=>done++);
    for(let i=0;i<200;i++)a.step(.05);
    const early=done;
    for(let i=0;i<130;i++)a.step(.05);
    const final=done;
    for(let i=0;i<20;i++)a.step(.05);
    const repeat=done; a.collect(); for(let i=0;i<20;i++)a.step(.05);
    we.blurred=was; return {early,final,repeat};
  });
  assert.deepEqual(glue,{early:0,final:1,repeat:1});
  assert.equal(await p.evaluate(() => Re.errors),0); log('slow glue completion once after15s: passed'); await logErrors(p);
};
