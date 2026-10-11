const espree=require(process.argv[3]+'/node_modules/espree');
const fs=require('fs');
const lines=fs.readFileSync(process.argv[2],'utf8').split('\n');
const start=37, end=15034; // 1-based: lines 38..15034 are app script
const src=lines.slice(start,end).join('\n');
const ast=espree.parse(src,{ecmaVersion:2022,loc:true,sourceType:'script'});
const out={};
function add(n,l){ if(!(n in out)) out[n]=l+start; }
function pat(p,l){ if(!p) return; if(p.type==='Identifier') add(p.name,l); else if(p.type==='ObjectPattern') p.properties.forEach(q=>pat(q.value||q.argument,l)); else if(p.type==='ArrayPattern') p.elements.forEach(e=>pat(e,l)); else if(p.type==='AssignmentPattern') pat(p.left,l); else if(p.type==='RestElement') pat(p.argument,l);}
for(const s of ast.body){
  if(s.type==='VariableDeclaration') s.declarations.forEach(d=>pat(d.id,d.loc.start.line));
  else if(s.type==='FunctionDeclaration'||s.type==='ClassDeclaration') add(s.id.name,s.loc.start.line);
}
fs.writeFileSync(process.argv[4],JSON.stringify(out));
console.log(Object.keys(out).length);
