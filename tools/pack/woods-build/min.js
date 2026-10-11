const {minify}=require('terser');const fs=require('fs');
(async()=>{const src=fs.readFileSync(process.argv[2],'utf8');
const r=await minify(src,{ecma:2020,toplevel:true,compress:{passes:2},mangle:{toplevel:true},format:{ascii_only:false}});
fs.writeFileSync(process.argv[3],r.code);console.log(src.length,'->',r.code.length);})().catch(e=>{console.error(e);process.exit(1)});
