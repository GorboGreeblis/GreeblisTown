const fs=require('fs'),acorn=require('acorn'),walk=require('acorn-walk');
const P='index.html';
let html=fs.readFileSync(P,'utf8');
const DEAD=new Set(['fortizmo','howard','cherubi','kollod','hennrick','appterix','maltoeSynth','sunny','slugwerth2','patchoolee','zollox','larryBiped']);
const PROPS=new Set(['sparky','anomalee','nextessa','mushroom']);
const STUB='() => ({ height: 2, anim() {} })';
const re=/<script>([\s\S]*?)<\/script>/g;let m,reps=[];
while((m=re.exec(html))){const src=m[1],base=m.index+8;if(src.length<500000)continue;
 const ast=acorn.parse(src,{ecmaVersion:'latest'});
 walk.full(ast,n=>{
  if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&n.left.object.name==='so'&&!n.left.computed&&DEAD.has(n.left.property.name)&&n.right.type==='ArrowFunctionExpression')
    reps.push([base+n.right.start,base+n.right.end,STUB]);
  if(n.type==='VariableDeclarator'&&n.id.name==='so'&&n.init.type==='ObjectExpression')
    for(const p of n.init.properties) if(PROPS.has(p.key.name)) reps.push([base+p.start,base+p.end,p.key.name+': '+STUB]);
  if(n.type==='VariableDeclarator'&&n.id.name==='he'&&n.init&&n.init.type==='ArrowFunctionExpression'&&n.init.end-n.init.start>10000)
    reps.push([base+n.init.start,base+n.init.end,'() => '+STUB]);
 });}
reps.sort((a,b)=>b[0]-a[0]);
let saved=0;for(const [s,e,r] of reps){saved+=e-s-r.length;html=html.slice(0,s)+r+html.slice(e);}
fs.writeFileSync(P,html);console.log(reps.length,'stubs, saved',saved);
