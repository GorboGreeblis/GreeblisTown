// Structural (alpha-renamed) match of a game's top-level decls against ours -> name map.
const acorn=require('acorn'),fs=require('fs'),es=require('eslint-scope');let GREF=new Set();
const GLOB=new Set(['THREE','Math','window','document','Array','Object','Map','Set','JSON','Float32Array','Uint8Array','Uint16Array','Uint32Array','Int32Array','Float64Array','console','performance','navigator','setTimeout','clearTimeout','setInterval','clearInterval','requestAnimationFrame','String','Number','Boolean','Date','Promise','Symbol','Error','isFinite','parseInt','parseFloat','location','localStorage','innerWidth','innerHeight','addEventListener','getComputedStyle','XRWebGLLayer','Image','AudioContext','URL','Infinity','NaN','undefined']);
function ser(n,topNames,map){ // map: game name -> canonical
  const out=[];(function w(n,parent,key){ if(n===null||n===undefined){out.push('_');return;} if(Array.isArray(n)){out.push('[');n.forEach(c=>w(c,parent,key));out.push(']');return;} if(typeof n!=='object'){out.push(JSON.stringify(n));return;}
    if(n.type==='Identifier'){ const isProp=(parent&&((parent.type==='MemberExpression'&&key==='property'&&!parent.computed)||(parent.type==='Property'&&key==='key'&&!parent.computed)||(parent.type==='MethodDefinition'&&key==='key'&&!parent.computed)||(parent.type==='PropertyDefinition'&&key==='key'))); 
      if(isProp||GLOB.has(n.name)) out.push('I:'+n.name); else if(topNames.has(n.name)&&GREF.has(n)) out.push('T:'+(map?(map.get(n.name)||'?'):'')); else out.push('L'); return; }
    out.push('{'+n.type); for(const k of Object.keys(n)){ if(['start','end','range','raw','loc','__p','type'].includes(k))continue; out.push(k); w(n[k],n,k);} out.push('}'); })(n,null,null);
  return out.join(' ');
}
function tops(f){const code=fs.readFileSync(f,'utf8');const ast=acorn.parse(code,{ecmaVersion:'latest',sourceType:'script',ranges:true});const m=new Map();
 const sm=es.analyze(ast,{ecmaVersion:2022,sourceType:'script'});for(const sc of sm.scopes)for(const r of sc.references)if(!r.resolved||r.resolved.scope===sm.globalScope)GREF.add(r.identifier);
 ast.body.forEach(st=>{if(st.type==='VariableDeclaration')st.declarations.forEach(d=>{if(d.id.type==='Identifier')m.set(d.id.name,{node:d.init,src:code.slice(...d.range)});});else if(st.type==='FunctionDeclaration'||st.type==='ClassDeclaration')m.set(st.id.name,{node:st,src:code.slice(...st.range),fn:1});});return m;}
function match(gameFile,oursFile){
  const g=tops(gameFile),o=tops(oursFile); const gN=new Set(g.keys()),oN=new Set(o.keys());
  const idm=new Map([...oN].map(k=>[k,k]));
  let map=new Map();
  for(let it=0;it<6;it++){
    const oKeys=new Map(); for(const [k,v] of o){ const s=ser(v.fn?Object.assign({},v.node,{id:null}):v.node,oN,idm); (oKeys.get(s)||oKeys.set(s,[]).get(s)).push(k); }
    const nm=new Map(); for(const [k,v] of g){ const s=ser(v.fn?Object.assign({},v.node,{id:null}):v.node,gN,it===0?null:map); if(it===0){ /* loose */ } const hit=it===0?null:oKeys.get(s); if(hit&&hit.length===1) nm.set(k,hit[0]); }
    if(it===0){ // loose pass: erase top names
      const oL=new Map(); for(const [k,v] of o){const s=ser(v.fn?Object.assign({},v.node,{id:null}):v.node,oN,null);(oL.get(s)||oL.set(s,[]).get(s)).push(k);} 
      for(const [k,v] of g){const s=ser(v.fn?Object.assign({},v.node,{id:null}):v.node,gN,null);const h=oL.get(s);if(h&&h.length===1)nm.set(k,h[0]);}
      map=nm; continue; }
    // strict pass: keep loose matches only if strict-consistent, add new strict ones
    const merged=new Map(); for(const [k,v] of map){ if(nm.get(k)===v) merged.set(k,v);} for(const [k,v] of nm) merged.set(k,v);
    if([...merged].join()===[...map].join()){map=merged;break;} map=merged;
  }
  return {map,g,o};
}
module.exports={match};
if(require.main===module){const {map,g}=match(process.argv[2],process.argv[3]);console.log('matched',map.size,'of',g.size);console.log([...map].map(([a,b])=>a+'->'+b).join(' '));console.log('unmatched',[...g.keys()].filter(k=>!map.has(k)).map(k=>k+':'+g.get(k).src.length).join(' '));}
