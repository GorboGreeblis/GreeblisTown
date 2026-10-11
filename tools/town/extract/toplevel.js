// Lists a script's top-level names (variables, functions, classes) with the line each is declared on: writes them
// to <out.json> as {name: line} and prints how many.
// Give it a page (its last <script> block, the game script, is read) or a .js file:
//   node toplevel.js <index.html | script.js> <a folder whose node_modules has espree> <out.json>
const espree=require(require('path').resolve(process.argv[3],'node_modules/espree'));
const fs=require('fs');
// a page's game script is its last <script> block; names are reported at their line in the file
const txt=fs.readFileSync(process.argv[2],'utf8'), i=txt.lastIndexOf('<script>'), j=txt.lastIndexOf('</script>');
const html=/\.html?$/.test(process.argv[2]), start=html?txt.slice(0,i+8).split('\n').length-1:0;
const src=html?txt.slice(i+8,j):txt;
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
