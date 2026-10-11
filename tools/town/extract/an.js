// Analyze a game's scripts: top-level decls, deps, and where builder keys are registered.
const acorn=require('acorn'),es=require('eslint-scope'),fs=require('fs');
function analyze(files,regName){
  const tops=new Map(); // name -> {file,idx,kind,node,src,deps:Set}
  const stmts=[]; // non-decl top-level statements
  const regs={}; // key -> [{file, node, top: containing top-level name or stmt idx}]
  files.forEach((f,fi)=>{
    const code=fs.readFileSync(f,'utf8');
    const ast=acorn.parse(code,{ecmaVersion:'latest',sourceType:'script',ranges:true});
    const sm=es.analyze(ast,{ecmaVersion:2022,sourceType:'script'});
    const gs=sm.globalScope;
    // collect references with their positions
    const refs=[];
    for(const sc of sm.scopes) for(const r of sc.references){ if(!r.resolved||r.resolved.scope===gs) refs.push([r.identifier.range[0],r.identifier.name]); }
    refs.sort((a,b)=>a[0]-b[0]);
    const depsIn=(a,b)=>{const s=new Set();for(const [p,n] of refs){if(p>=a&&p<b)s.add(n);}return s;};
    ast.body.forEach((st,si)=>{
      const add=(name,node,kind,range)=>{tops.set(name,{file:fi,kind,node,code,range:range||node.range,deps:depsIn(...(range||node.range)),order:[fi,node.range[0]]});};
      if(st.type==='VariableDeclaration') st.declarations.forEach(d=>{ if(d.id.type==='Identifier') add(d.id.name,d,st.kind); else { /* destructuring */ const names=[];(function w(p){if(!p)return;if(p.type==='Identifier')names.push(p.name);else if(p.type==='ArrayPattern')p.elements.forEach(w);else if(p.type==='ObjectPattern')p.properties.forEach(q=>w(q.value||q.argument));else if(p.type==='AssignmentPattern')w(p.left);else if(p.type==='RestElement')w(p.argument);})(d.id); names.forEach(n=>add(n,d,st.kind)); } });
      else if(st.type==='FunctionDeclaration'||st.type==='ClassDeclaration') add(st.id.name,st,st.type);
      else stmts.push({file:fi,si,node:st,code,deps:depsIn(...st.range)});
    });
    // registration sites: MemberExpression regName.KEY on LHS of assignment
    (function walk(n,anc){ if(!n||typeof n.type!=='string')return;
      if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&n.left.object.type==='Identifier'&&n.left.object.name===regName&&!n.left.computed){
        const k=n.left.property.name; (regs[k]=regs[k]||[]).push({file:fi,node:n,anc:anc.slice()});
      }
      for(const key in n){ if(key==='parent')continue; const v=n[key]; if(Array.isArray(v)) v.forEach(c=>c&&typeof c.type==='string'&&walk(c,anc.concat(n))); else if(v&&typeof v.type==='string') walk(v,anc.concat(n)); }
    })(ast,[]);
  });
  return {tops,stmts,regs};
}
module.exports={analyze};
if(require.main===module){
  const [reg,...files]=process.argv.slice(2);
  const {tops,stmts,regs}=analyze(files,reg);
  console.log('tops',tops.size,'stmts',stmts.length);
  for(const k in regs) for(const r of regs[k]){ const chain=r.anc.filter(a=>/Function/.test(a.type)).map(a=>a.id?a.id.name:('anon@'+a.range[0])); const top=r.anc[1]; console.log(k, 'file',r.file,'chain',chain.join('>'),'top',top&&top.type, top&&top.type==='FunctionDeclaration'?top.id.name:''); }
}
