const {load,extract,emit}=require('./ex.js');const {tops}=require('./cmp.js');const fs=require('fs');
const [files,reg,keys,extraStop,out]=process.argv.slice(2);
const F=files.split(',');const P=load(F);
const ours=tops('../ours/main.js');const same=new Set();
for(const f of F){const a=tops(f);for(const [k,v] of a) if(ours.has(k)&&ours.get(k).key===v.key) same.add(k);}
const stop=new Set([...same,...extraStop.split(',').filter(Boolean)]);
const r=extract(P,{regName:reg,keys:keys.split(','),stop,propRoots:(process.env.PROPROOTS||'').split(',').filter(Boolean)});
console.log('units',r.units.size,'renamed',r.rename.size,'roots',Object.keys(r.roots).length);
console.log('undeclared',[...r.undeclared].join(' '));
console.log('warn',[...r.warn].join('\n'));
const tl=[...r.units.values()].filter(u=>u.node.id&&r.tops.has(u.node.id.name)&&r.tops.get(u.node.id.name).node===u.node).map(u=>u.node.id.name+':'+(u.node.range[1]-u.node.range[0]));
console.log('top units',tl.join(' '));
const o=emit(P,r,{});console.log('bytes',o.join('\n').length);fs.writeFileSync(out,o.join('\n'));
