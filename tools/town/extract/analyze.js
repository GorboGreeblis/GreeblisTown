require('./three_env.js');
const fs=require('fs');
const fakeCtx=new Proxy({},{get:(t,k)=>k in t?t[k]:(()=>{}),set:(t,k,v)=>(t[k]=v,true)});
globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>fakeCtx})};
let log=[];
const PARK_x={basic:(c)=>new THREE.MeshBasicMaterial({color:c})};
const PARK_b=(...a)=>{log.push('PARK_b called');return new THREE.Texture();};
let pol=fs.readFileSync('polish_orig.js','utf8')
  .replace('for(let e=0;e<3&&m(s);e++);','for(let e=0;e<3;e++){const q=m(s);log.push("m="+q);if(!q)break}')
  .replace('p.length<=8&&p.forEach','(log.push("glint "+p.length),p.length<=8)&&p.forEach')
  .replace('const o=t.parameters;let a=t;','const o=t.parameters;let a=t;')
;
pol=pol.replace(/^let /,'globalThis.');
eval(pol);
const n=THREE.Mesh,o=THREE.SphereGeometry,e=THREE.MeshLambertMaterial,i=THREE.CylinderGeometry,a=THREE.Vector3,c=THREE.Group,r=THREE.MeshBasicMaterial,d=THREE.TorusGeometry,l=THREE.PlaneGeometry;
function tt(t,n){return new e(Object.assign({color:t},n||{}))}
function ot(t,o,e){const s=new THREE.CatmullRomCurve3(t);return new n(new THREE.TubeGeometry(s,16,o,6,!0),tt(e,{side:THREE.DoubleSide}))}
const build=eval(fs.readFileSync('leech_orig.js','utf8'));
const g=new c; const an=build(g);
const before=[];g.traverse(m=>m.isMesh&&before.push([m.geometry.type,JSON.stringify(m.geometry.parameters&&{...m.geometry.parameters,path:undefined}),m.material.type,m.material.color.getHexString()]));
const w=new c; const oo=new c; oo.add(g); w.add(oo);
PARK_PARK_POLISH(w,{wet:false});
const after=[];w.traverse(m=>m.isMesh&&after.push([m.geometry.type,m.geometry.parameters&&(m.geometry.parameters.widthSegments||m.geometry.parameters.radialSegments||m.geometry.parameters.tubularSegments),m.material.type,!!m.geometry.attributes.color]));
console.log(log);console.log(before);console.log(after);
const box=new THREE.Box3().setFromObject(w);console.log('height',box.max.y);
an(1.0,null);
