const {load,extract,emit}=require('./ex.js');const {match}=require('./alpha.js');const fs=require('fs');
const F=['../up_Woods/main.js'];const P=load(F);
const {map}=match(F[0],'../ours/main.js');
const extra=(process.argv[3]||'').split(',').filter(Boolean);
const stop=new Set([...map.keys(),...extra]);
const r=extract(P,{regName:'Ie',keys:process.argv[2].split(','),stop});
console.log('units',r.units.size,'renamed',r.rename.size,'roots',Object.keys(r.roots).join(' '));
console.log('undeclared',[...r.undeclared].join(' '));
console.log('warn',[...r.warn].join('\n'));
const tl=[...r.units.values()].filter(u=>u.node.id&&r.tops.has(u.node.id.name)&&r.tops.get(u.node.id.name).node===u.node).map(u=>u.node.id.name+':'+(u.node.range[1]-u.node.range[0]));
console.log('top units',tl.join(' '));
// which stopped names are actually referenced
const used=new Set();for(const u of r.units.values()){const [a,b]=u.node.range;for(const ref of u.p.refs){const p=ref.identifier.range[0];if(p>=a&&p<b&&(!ref.resolved||ref.resolved.scope===u.p.gs)&&stop.has(ref.identifier.name))used.add(ref.identifier.name);}}
console.log('stopped used',[...used].map(n=>n+'->'+(map.get(n)||'?')).join(' '));
const o=emit(P,r,{});console.log('bytes',o.join('\n').length);fs.writeFileSync('woods_raw.js',o.join('\n'));
fs.writeFileSync('woods_map.json',JSON.stringify([...used].map(n=>[n,map.get(n)||null])));
const nm=u=>u.node.id&&u.node.id.name||u.kind;
for(const u of r.units.values()){ if(u.via&&!(u.via.kind||'').startsWith('root:')) continue; }
const direct={};for(const u of r.units.values()){ if(u.via&&(u.via.kind||'').startsWith('root:')) (direct[nm(u)]=direct[nm(u)]||[]).push(u.via.kind.slice(5)); }
console.log('DIRECT from roots:');for(const k in direct)console.log(' ',k,direct[k].slice(0,6).join(','));
const second={};for(const u of r.units.values()){ if(u.via&&!(u.via.kind||'').startsWith('root:')) (second[nm(u)]=second[nm(u)]||[]).push(nm(u.via)); }
console.log('INDIRECT:');for(const k in second)console.log(' ',k,'<-',second[k].join(','));
