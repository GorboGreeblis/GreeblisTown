// Re-minifies a trimmed three.js build with terser (3 compress passes, toplevel off so `var THREE` stays global) and
// fails if the output no longer starts with `var THREE=`. Prints the size before and after.
//   node three/min3.js three_p3.js three_p4.js   (from tools/)
const {minify}=require('terser');const fs=require('fs');
(async()=>{const src=fs.readFileSync(process.argv[2],'utf8');
const r=await minify(src,{ecma:2020,toplevel:false,compress:{passes:3,pure_getters:false},mangle:true,format:{ascii_only:false}});
if(r.code.indexOf('var THREE=')!==0) throw new Error('THREE global changed: '+r.code.slice(0,40));
fs.writeFileSync(process.argv[3],r.code);console.log(src.length,'->',r.code.length);})().catch(e=>{console.error(e);process.exit(1)});
