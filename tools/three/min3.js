const {minify}=require('terser');const fs=require('fs');
(async()=>{const src=fs.readFileSync(process.argv[2],'utf8');
const r=await minify(src,{ecma:2020,toplevel:false,compress:{passes:3,pure_getters:false},mangle:true,format:{ascii_only:false}});
if(r.code.indexOf('var THREE=')!==0) throw new Error('THREE global changed: '+r.code.slice(0,40));
fs.writeFileSync(process.argv[3],r.code);console.log(src.length,'->',r.code.length);})().catch(e=>{console.error(e);process.exit(1)});
