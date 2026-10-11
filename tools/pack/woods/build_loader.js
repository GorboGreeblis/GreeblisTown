// Build codec variants from cmz.js: full (encoder) and decode-only (shipped in the page).
const {minify}=require('terser');const fs=require('fs');
(async()=>{
  const src=fs.readFileSync(__dirname+'/cmz.js','utf8').replace(/if \(typeof module[^\n]*\n?/,'');
  const full=await minify(src,{ecma:2020,compress:{passes:2},mangle:true,format:{ascii_only:true}});
  fs.writeFileSync(__dirname+'/codec.min.js','module.exports=('+full.code.replace(/^function\*\s*cmz/,'function*')+');');
  const decSrc=src.replace('function* cmz(data, len, enc) {','function* cmz(data, len) {\n  const enc = 0;');
  const dec=await minify(decSrc,{ecma:2020,compress:{passes:3},mangle:true,format:{ascii_only:true}});
  const fn=dec.code.replace(/^function\*\s*cmz/,'function*');
  fs.writeFileSync(__dirname+'/decoder.min.js','module.exports=('+fn+');');
  const ld=fs.readFileSync(__dirname+'/loader_src.js','utf8').replace('__CMZ__(b, __LEN__, 0)','('+fn+')(b, __LEN__)');
  const lm=await minify(ld,{ecma:2020,compress:{passes:2},mangle:true,format:{ascii_only:true}});
  fs.writeFileSync(__dirname+'/loader.min.js',lm.code);console.log('full codec',full.code.length,'decoder',fn.length,'loader',lm.code.length);
})();
