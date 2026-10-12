// Cuts named top-level functions and variables out of app.js (in the current folder; its first line and `</script>`
// lines are dropped) and writes them to engine_part.js, which harness.js reads. espree comes from the folder given.
//   node extract.js <dir with node_modules> <name…>
const espree=require(process.argv[2]+'/node_modules/espree');
const fs=require('fs');
const src=fs.readFileSync('app.js','utf8').split('\n').slice(1).filter(x=>x!=='<\/script>').join('\n'); // drop <script>
const lines=src; const ast=espree.parse(src,{ecmaVersion:2022,range:true});
const want=new Set(process.argv.slice(3));let out='';
for(const s of ast.body){
  if(s.type==='FunctionDeclaration'&&want.has(s.id.name)) out+=src.slice(...s.range)+'\n';
  if(s.type==='VariableDeclaration') for(const d of s.declarations) if(d.id.type==='Identifier'&&want.has(d.id.name)) out+=s.kind+' '+src.slice(...d.range)+';\n';
}
fs.writeFileSync('engine_part.js',out);
