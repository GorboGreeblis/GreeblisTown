// Builds pulled.js: one isolated IIFE per game (JGP_CITY, JGP_PARK, JGP_WOODS) holding its original builders and their
// helpers; names shared with ours are reused, found by identical structure (City, Park) or by alpha.js (Woods). The
// builder keys come from CITY, PARK and WOODS (comma-separated, with defaults); the report goes to stderr.
//   node build.js   (from ex/ in the work folder; e.g. WOODS=gorbo,mont node build.js)
const {load,extract,emit}=require('./ex.js');const {tops}=require('./cmp.js');const {match}=require('./alpha.js');const fs=require('fs');
const OURS='../ours/main.js'; const ours=tops(OURS);
function game(tag,files,regName,keys,opts){
  const P=load(files); let stop=new Set(opts.stop||[]); let gmapBase=new Map();
  if(opts.alpha){ const {map}=match(files[0],OURS); for(const [a,b] of map){stop.add(a);gmapBase.set(a,b);} }
  else { for(const f of files){const a=tops(f);for(const [k,v] of a) if(ours.has(k)&&ours.get(k).key===v.key) stop.add(k);} }
  for(const [a,b] of Object.entries(opts.alias||{})){stop.add(a);gmapBase.set(a,b);}
  const r=extract(P,{regName,keys,stop,propRoots:opts.propRoots||[]});
  const copied=new Set();for(const u of r.units.values()){const id=u.node.id; if(id&&r.tops.has(id.name)&&r.tops.get(id.name).node===u.node) copied.add(id.name); if(u.node.type==='VariableDeclarator'&&u.node.id.type!=='Identifier'){ /* pattern */ for(const [k,t] of r.tops) if(t.node===u.node) copied.add(k);} }
  // names mapped onto ours (when they differ) go through collision-proof aliases declared at the top of the IIFE
  const alias=new Map();
  const gmap=(n)=>{ if(n===regName) return '__R'; if(gmapBase.has(n)){ const o=gmapBase.get(n); if(o===n) return null; const a=(ours.get(o)&&ours.get(o).kind==='let')?'__ours.'+o:'__o_'+o; alias.set(o,a); return a; } if(copied.has(n)) return tag+'_'+n; return null; };
  const body=emit(P,r,{gmap});
  const lets=[...alias].filter(([o,a])=>a.startsWith('__ours.')).map(([o])=>o), consts=[...alias].filter(([o,a])=>!a.startsWith('__ours.')).map(([o])=>o);
  const pro=(consts.length?'const '+consts.map(o=>'__o_'+o+'='+o).join(',')+';':'')+(lets.length?'const __ours={'+lets.map(o=>'get '+o+'(){return '+o+'}').join(',')+'};':'');
  const missing=keys.filter(k=>!r.roots[k]);
  console.error(tag,'units',r.units.size,'copied',[...copied].join(' '),'missing',missing.join(' '),'\n warn',[...r.warn].join(' | '),'\n undeclared',[...r.undeclared].join(' '));
  return `const JGP_${tag}=(()=>{const __R={};${pro}\n${body.join('\n')}\n${opts.tail||''}\nreturn __R;})();`;
}
const out=[];
out.push(game('CITY',['../up_City/main.js'],'so',(process.env.CITY||'howard,sparky,mistergummery,hennrick,maltoeSynth,mushroom,fortizmo,cherubi,patchoolee,anomalee,slugwerth2,missgummery,appterix,sunny,zollox,kollod,nextessa,larryBiped').split(','),{stop:['It','Re','O','we','Kt','qt','xe','jt','_t','te','z','E','F','Zt','G','L','gcEB','B','C','Nt','At','Ut']}));
const PK=[5,6,7,8,9,10,11,12,13,14,15,16,17,18].map(i=>'../up_Park/s'+i+'.js');
out.push(game('PARK',PK,'so',(process.env.PARK||'hennrick').split(','),{propRoots:['registerBuilders'],stop:['It','Re','O','we','Kt','qt','xe','jt','_t','te','z','E','F','Zt','G','L','gcEB','B','C','Nt','At','Ut','Ft'],tail:'__R["@registerBuilders"]();delete __R["@registerBuilders"];'}));
out.push(game('WOODS',['../up_Woods/main.js'],'Ie',(process.env.WOODS||'gorbo,sparky,mont,gratelet,maltoe,mushroom,larry,owl,frog,professor,mrbun,missbun,anomalee,slugworth,hennrick,kingdino,cutebex,orson').split(','),{alpha:true,alias:{Ve:'Nt',_:'G',Ue:'Ut',xt:'we',$e:'Kt',st:'se',Pe:'At',Z:'O',$:'B',Ce:'It',X:'C',zt:'gcEB'}}));
fs.writeFileSync('pulled.js',out.join('\n'));
console.error('bytes',out.join('\n').length);
