// Builds pulled creatures in Node with three.js (three_env.js), a fake canvas and stubbed game globals, from
// engine_part.js (extract.js) and gorbo_mama.js (JGP_WOODS, JGP_PARK): runs the Woods Gorbo for 1,200 frames with a
// Talk at frame 300 and prints its height, meshes, scene drips and sound and goo calls, then builds the Park leech.
// Run in the folder holding those files:  node harness.js
require('./three_env.js');
const fs=require('fs');
const fakeCtx=new Proxy({},{get:(t,k)=>k in t?t[k]:(()=>{}),set:(t,k,v)=>(t[k]=v,true)});
globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>fakeCtx})};
const calls=[];
const src=`
const t={debug:false,aniso:8,hearR:{goo:22,ambient:18}};
const O={capabilities:{getMaxAnisotropy:()=>8}};
const C=new THREE.Scene();
const G={near:(...a)=>calls.push(['near',...a])};
const Nt={goo:(...a)=>calls.push(['goo']),splat:(...a)=>calls.push(['splat',a[2],a[3]])};
let At=null;
${fs.readFileSync('engine_part.js','utf8')}
${fs.readFileSync('gorbo_mama.js','utf8')}
const PULLED={woods:JGP_WOODS,park:JGP_PARK};
const so={};
for(const g in PULLED)for(const k in PULLED[g]){const id=g+"_"+k.replace(/^park_/,""),fn=PULLED[g][k];so[id]=(grp,d,opts)=>fn.call(PULLED[g],grp,d||{},opts||{})}
return {so,setAt:v=>{At=v},C};
`;
const env=new Function('calls',src)(calls);
console.log(Object.keys(env.so));
// woods gorbo
const grp=new THREE.Group(); const ent={group:grp,moving:false};
env.setAt({position:new THREE.Vector3(1,0,1)});
const r=env.so.woods_gorbo(grp,{goo:'#8ae8e0'},{});
console.log('gorbo height',r.height,Object.keys(r));
let tt=0;for(let f=0;f<1200;f++){tt+=1/60;r.anim(tt,1/60,ent);if(f===300)r.onTalk();}
let nm=0;grp.traverse(o=>o.isMesh&&nm++);
console.log('gorbo meshes',nm,'scene drips',env.C.children.length,'calls',calls.map(c=>c[0]).reduce((a,k)=>(a[k]=(a[k]||0)+1,a),{}));
// also anim without ent
r.anim(30,1/60,undefined);
// park leech
const g2=new THREE.Group(); const r2=env.so.park_leech(g2,{},{});
console.log('leech',r2.height,Object.keys(r2)); for(let f=0;f<10;f++)r2.anim(f*.1,.1,{group:g2});
module.exports={g2,r2};
