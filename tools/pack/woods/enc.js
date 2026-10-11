// Encode with the full codec, then verify with the exact decode-only codec that ships in the page.
const cmz=require('./codec.min.js'),dec=require('./decoder.min.js'),fs=require('fs');const d=fs.readFileSync(process.argv[2]);
const drive=g=>{let r;while(!(r=g.next()).done);return r.value;};
const e=drive(cmz(d,d.length,1));const o=drive(dec(e,d.length));
if(Buffer.compare(Buffer.from(o),d)!==0){console.error('ROUNDTRIP MISMATCH');process.exit(1);}
fs.writeFileSync(process.argv[3],e);console.log('cm',d.length,'->',e.length,'roundtrip ok (shipped decoder)');
