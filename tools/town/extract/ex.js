// Dependency-aware extractor: pulls builder functions and everything they reference out of a game's scripts. A module,
// not run on its own: load(files), extract(P, {regName, keys, stop, propRoots}) and emit(P, result, {gmap}), used by
// build.js, run_same.js, run_woods.js and try_city.js. Needs acorn and eslint-scope.
const acorn=require('acorn'),es=require('eslint-scope'),fs=require('fs');
function load(files){
  return files.map((f,fi)=>{
    const code=fs.readFileSync(f,'utf8');
    const ast=acorn.parse(code,{ecmaVersion:'latest',sourceType:'script',ranges:true});
    const sm=es.analyze(ast,{ecmaVersion:2022,sourceType:'script'});
    // parent links
    (function w(n,p){n.__p=p;for(const k in n){if(k==='__p')continue;const v=n[k];if(Array.isArray(v))v.forEach(c=>c&&typeof c.type==='string'&&w(c,n));else if(v&&typeof v.type==='string')w(v,n);}})(ast,null);
    const refs=[];for(const sc of sm.scopes)for(const r of sc.references)refs.push(r);
    refs.sort((a,b)=>a.identifier.range[0]-b.identifier.range[0]);
    return {fi,f,code,ast,sm,gs:sm.globalScope,refs};
  });
}
function extract(P,opts){
  const {regName,keys,stop}=opts; const propRoots=opts.propRoots||[];
  // top-level index: name -> {P,node(decl unit),kind}
  const tops=new Map();
  for(const p of P) p.ast.body.forEach(st=>{
    if(st.type==='VariableDeclaration') st.declarations.forEach(d=>{const ns=[];(function w(q){if(!q)return;if(q.type==='Identifier')ns.push(q.name);else if(q.type==='ArrayPattern')q.elements.forEach(w);else if(q.type==='ObjectPattern')q.properties.forEach(r=>w(r.value||r.argument));else if(q.type==='AssignmentPattern')w(q.left);else if(q.type==='RestElement')w(q.argument);})(d.id);ns.forEach(n=>tops.set(n,{p,node:d,kind:st.kind}));});
    else if(st.type==='FunctionDeclaration'||st.type==='ClassDeclaration') tops.set(st.id.name,{p,node:st,kind:null});
  });
  const units=new Map(); // node -> {p,node,kind,renameSelf}
  const warn=new Set(), undeclared=new Set(), rename=new Map(); // variable -> newName
  let uid=0;
  const queue=[];
  let cur=null; function addUnit(p,node,kind){ if(units.has(node))return; units.set(node,{p,node,kind,via:cur}); queue.push(units.get(node)); }
  function needGlobal(name){
    if(stop.has(name)) return;
    const t=tops.get(name);
    if(!t){ undeclared.add(name); return; }
    addUnit(t.p,t.node,t.kind);
  }
  // roots: builder functions
  const roots={};
  for(const p of P){
    (function w(n){ if(!n||typeof n.type!=='string')return;
      if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&n.left.object.type==='Identifier'&&n.left.object.name===regName&&!n.left.computed&&keys.includes(n.left.property.name)){ roots[n.left.property.name]={p,node:n.right}; addUnit(p,n.right,'root:'+n.left.property.name); }
      if(n.type==='Property'&&!n.computed&&n.key&&propRoots.includes(n.key.name)&&/Function/.test(n.value.type)){ roots['@'+n.key.name]={p,node:n.value}; addUnit(p,n.value,'root:@'+n.key.name); }
      if(n.type==='VariableDeclarator'&&n.id.name===regName&&n.init&&n.init.type==='ObjectExpression') n.init.properties.forEach(pr=>{ const k=pr.key&&(pr.key.name||pr.key.value); if(keys.includes(k)){ roots[k]={p,node:pr.value}; addUnit(p,pr.value,'root:'+k); } });
      for(const k in n){if(k==='__p')continue;const v=n[k];if(Array.isArray(v))v.forEach(c=>c&&typeof c.type==='string'&&w(c));else if(v&&typeof v.type==='string')w(v);}
    })(p.ast);
  }
  // process
  const addKey=(k)=>{ if(keys.includes(k)) return; keys.push(k); for(const p of P){ (function w(n){ if(!n||typeof n.type!=='string')return;
      if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&n.left.object.type==='Identifier'&&n.left.object.name===regName&&!n.left.computed&&n.left.property.name===k&&!roots[k]){ roots[k]={p,node:n.right}; addUnit(p,n.right,'root:'+k); }
      if(n.type==='VariableDeclarator'&&n.id.name===regName&&n.init&&n.init.type==='ObjectExpression') n.init.properties.forEach(pr=>{ const kk=pr.key&&(pr.key.name||pr.key.value); if(kk===k&&!roots[k]){ roots[k]={p,node:pr.value}; addUnit(p,pr.value,'root:'+k); } });
      for(const q in n){if(q==='__p')continue;const v=n[q];if(Array.isArray(v))v.forEach(c=>c&&typeof c.type==='string'&&w(c));else if(v&&typeof v.type==='string')w(v);}
    })(p.ast); } };
  while(queue.length){
    const u=queue.shift(); cur=u; const [a,b]=u.node.range;
    for(const r of u.p.refs){ const pos=r.identifier.range[0]; if(pos<a||pos>=b)continue;
      const v=r.resolved;
      if(!v||v.scope===u.p.gs){ if(r.identifier.name===regName){ const par=r.identifier.__p; if(par&&par.type==='MemberExpression'&&par.object===r.identifier&&!par.computed) addKey(par.property.name); continue; } needGlobal(r.identifier.name); continue; }
      // resolved inside the unit?
      const d=v.defs[0]; if(!d){ if(v.name!=="arguments"||true){ const fnScope=v.scope.block; if(!(fnScope.range[0]>=a&&fnScope.range[1]<=b)) warn.add("implicit "+v.name+" @"+u.p.fi+":"+pos);} continue; } const dn=d.name.range[0];
      if(dn>=a&&dn<b) continue;
      // captured local from an enclosing (non-global) scope
      if(!rename.has(v)) rename.set(v,'__'+v.name+'_'+(uid++));
      if(d.type==='Variable'){ addUnit(u.p,d.node,d.parent.kind); }
      else if(d.type==='FunctionName'){ addUnit(u.p,d.node,null); }
      else if(d.type==='ClassName'){ addUnit(u.p,d.node,null); }
      else warn.add('captured '+d.type+' '+v.name+' @'+u.p.fi+':'+dn);
    }
  }
  // writes to included variables from outside included units
  const inUnits=(p,pos)=>{for(const u of units.values())if(u.p===p&&pos>=u.node.range[0]&&pos<u.node.range[1])return true;return false;};
  for(const p of P) for(const r of p.refs){ if(!r.isWrite()||r.init) continue; const v=r.resolved; const name=r.identifier.name;
    const tracked = (v&&rename.has(v)) || ((!v||v.scope===p.gs)&&tops.has(name)&&units.has(tops.get(name).node));
    if(tracked && !inUnits(p,r.identifier.range[0])) warn.add('external write to '+name+' @'+p.fi+':'+r.identifier.range[0]);
  }
  return {units,rename,warn,undeclared,roots,tops};
}
function emit(P,res,opts){
  const {units,rename}=res;
  // map identifier position -> new name
  const renPos=new Map();
  for(const [v,nn] of rename){ v.identifiers.forEach(id=>renPos.set(id.__p?id:id, nn)); v.references.forEach(r=>renPos.set(r.identifier,nn)); }
  const byPos=new Map(); for(const [id,nn] of renPos) byPos.set(id.range[0]+':'+id.range[1]+':'+P.indexOf(P.find(()=>1)),nn);
  const list=[...units.values()].sort((x,y)=>x.p.fi-y.p.fi||x.node.range[0]-y.node.range[0]);
  // drop units nested inside other units
  const outer=list.filter(u=>!list.some(o=>o!==u&&o.p===u.p&&o.node.range[0]<=u.node.range[0]&&o.node.range[1]>=u.node.range[1]));
  // global renames: references resolving to the global scope (or unresolved) and top-level declaration ids
  if(opts.gmap) for(const p of P){
    for(const r of p.refs){ const v=r.resolved; if(v&&v.scope!==p.gs) continue; const nn=opts.gmap(r.identifier.name); if(nn) renPos.set(r.identifier,nn); }
    for(const v of p.gs.variables){ const nn=opts.gmap(v.name); if(nn) v.identifiers.forEach(id=>renPos.set(id,nn)); }
  }
  const ids=[...renPos.entries()];
  const out=[];
  for(const u of outer){
    const [a,b]=u.node.range; const code=u.p.code; const n=u.node;
    const edits=[];
    for(const [id,nn] of ids){ if(id.range[0]>=a&&id.range[1]<=b&&code.slice(id.range[0],id.range[1])===id.name){
        // ensure id belongs to this program
        let q=id; while(q.__p) q=q.__p; if(q!==u.p.ast) continue;
        const par=id.__p; let txt=nn;
        if(par&&par.type==='Property'&&par.shorthand&&par.value===id) txt=id.name+':'+nn;
        if(par&&par.type==='Property'&&par.shorthand&&par.value&&par.value.type==='AssignmentPattern'&&par.value.left===id) txt=id.name+':'+nn;
        edits.push([id.range[0],id.range[1],txt]); } }
    edits.sort((x,y)=>y[0]-x[0]);
    let s=code.slice(a,b); for(const [x,y,t] of edits) s=s.slice(0,x-a)+t+s.slice(y-a);

    if(typeof u.kind==='string'&&u.kind.startsWith('root:')){ const par=n.__p; const pre=(par&&par.type==='Property'&&(par.method||par.kind!=='init'))?(n.async?'async ':'')+'function'+(n.generator?'*':''):''; out.push(`__R[${JSON.stringify(u.kind.slice(5))}]=${pre}${s};`); }
    else if(n.type==='VariableDeclarator') out.push(`${u.kind==='var'?'var':'let'} ${s};`);
    else out.push(s+';');
  }
  return out;
}
module.exports={load,extract,emit};
