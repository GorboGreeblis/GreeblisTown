const acorn=require('acorn'),fs=require('fs');
const strip=(n)=>JSON.stringify(n,(k,v)=>(k==='start'||k==='end'||k==='range'||k==='raw'||k==='loc'||k==='__p')?undefined:v);
function tops(f){const code=fs.readFileSync(f,'utf8');const ast=acorn.parse(code,{ecmaVersion:'latest',sourceType:'script',ranges:true});const m=new Map();
 ast.body.forEach(st=>{if(st.type==='VariableDeclaration')st.declarations.forEach(d=>{if(d.id.type==='Identifier')m.set(d.id.name,{src:code.slice(...d.range),key:strip(d),kind:st.kind});});else if(st.type==='FunctionDeclaration'||st.type==='ClassDeclaration')m.set(st.id.name,{src:code.slice(...st.range),key:strip(st)});});return m;}
module.exports={tops};
if(require.main===module){const a=tops(process.argv[2]),b=tops(process.argv[3]);let same=[],diff=[],missing=[];for(const [k,v] of a){if(!b.has(k))missing.push(k);else if(b.get(k).key===v.key)same.push(k);else diff.push(k+':'+v.src.length);}
console.log('same',same.length,same.join(' '));console.log('diff',diff.length,diff.join(' '));console.log('missing',missing.length,missing.join(' '));}
