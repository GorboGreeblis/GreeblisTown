const fs=require('fs');
// original path (analyze.js builds original into w)
const src=fs.readFileSync('analyze.js','utf8').replace("console.log(log);console.log(before);console.log(after);","").replace("const box=","module.exports={w,log};const box=").replace("console.log('height',box.max.y);","");

const A=require('./analyze_q.js');
const B=require('./harness.js');
const ms=o=>{const a=[];o.traverse(m=>m.isMesh&&a.push(m));return a};
const a=ms(A.w),b=ms(B.g2);
console.log('mesh counts',a.length,b.length);
A.an(2.0);B.r2.anim(2.0);A.w.updateMatrixWorld(true);B.g2.updateMatrixWorld(true);
let bad=0;
const props=['type','side','vertexColors','shininess','transparent','opacity','depthWrite','alphaTest','fog','emissiveIntensity'];
a.forEach((m,i)=>{const n=b[i];
  const pa=m.geometry.attributes.position.array,pb=n.geometry.attributes.position.array;
  const ca=m.geometry.attributes.color&&m.geometry.attributes.color.array,cb=n.geometry.attributes.color&&n.geometry.attributes.color.array;
  const eq=(x,y)=>x===y||(x&&y&&x.length===y.length&&x.every((v,k)=>Math.abs(v-y[k])<1e-6));
  const ia=m.geometry.index&&m.geometry.index.array, ib=n.geometry.index&&n.geometry.index.array;
  const diffs=[];
  if(!eq(pa,pb))diffs.push('pos');if(!eq(ca,cb))diffs.push('color');if(!eq(ia,ib))diffs.push('index');
  for(const p of props) if(m.material[p]!==n.material[p]) diffs.push(p+':'+m.material[p]+'/'+n.material[p]);
  if(m.material.color.getHex()!==n.material.color.getHex())diffs.push('mcolor');
  if(m.material.specular&&m.material.specular.getHex()!==n.material.specular.getHex())diffs.push('spec');
  if(m.material.emissive&&m.material.emissive.getHex()!==n.material.emissive.getHex())diffs.push('emis');
  if(!m.matrix.equals(n.matrix))diffs.push('matrix');
  if(diffs.length){bad++;console.log(i,diffs)}
});
// material sharing pattern
const share=x=>x.map(m=>x.findIndex(q=>q.material===m.material)).join(',');
console.log('share',share(a)===share(b));
console.log('bad',bad);
