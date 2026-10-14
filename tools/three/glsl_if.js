// Drops the GLSL #if blocks in three.js whose condition can never hold for the game's materials and renderer settings:
// a block goes only when its condition is false for every setting of the macros the game never defines (NEVER,
// NEVER_NUM), each unknown macro tried both ways. An #if that spans several JS strings is skipped and listed.
// Env: none.
// Output: `glsl literals <n> saved bytes <n>`, then `skipped <n>` with each skipped literal; the result to <out.js>.
//   node three/glsl_if.js three_p1.js three_p2.js
const acorn = require('acorn'); const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8'); const ast = acorn.parse(src, { ecmaVersion: 2022 });
const NEVER = new Set(['USE_ENVMAP', 'ENVMAP_TYPE_CUBE', 'ENVMAP_TYPE_CUBE_UV', 'ENVMAP_MODE_REFRACTION', 'ENVMAP_BLENDING_MULTIPLY', 'ENVMAP_BLENDING_MIX', 'ENVMAP_BLENDING_ADD',
  'USE_SHADOWMAP', 'SHADOWMAP_TYPE_PCF', 'SHADOWMAP_TYPE_PCF_SOFT', 'SHADOWMAP_TYPE_VSM',
  'USE_NORMALMAP', 'OBJECTSPACE_NORMALMAP', 'TANGENTSPACE_NORMALMAP', 'USE_TANGENT', 'USE_CLEARCOATMAP', 'USE_CLEARCOAT_NORMALMAP', 'USE_CLEARCOAT_ROUGHNESSMAP',
  'USE_SPECULARMAP', 'USE_ALPHAMAP', 'USE_LIGHTMAP', 'USE_AOMAP', 'USE_DISPLACEMENTMAP', 'USE_UV2',
  'USE_MORPHTARGETS', 'USE_MORPHNORMALS', 'USE_SKINNING', 'BONE_TEXTURE', 'USE_LOGDEPTHBUF', 'USE_LOGDEPTHBUF_EXT',
  'DITHERING', 'PREMULTIPLIED_ALPHA', 'TONE_MAPPING', 'FOG_EXP2', 'PHYSICALLY_CORRECT_LIGHTS']);
const NEVER_NUM = ['NUM_SPOT_LIGHTS', 'NUM_RECT_AREA_LIGHTS', 'NUM_CLIPPING_PLANES', 'UNION_CLIPPING_PLANES', 'NUM_DIR_LIGHT_SHADOWS', 'NUM_SPOT_LIGHT_SHADOWS', 'NUM_POINT_LIGHT_SHADOWS'];
function evalCond(kind, expr) { // returns 1, 0 or null (unknown)
  expr = expr.trim();
  if (kind === 'ifdef') return NEVER.has(expr) ? 0 : null;
  if (kind === 'ifndef') return NEVER.has(expr) ? 1 : null;
  const U = []; let e = expr.replace(/defined\s*\(\s*(\w+)\s*\)/g, (m, x) => (NEVER.has(x) ? '0' : 'U' + (U.push(x) - 1)));
  for (const n of NEVER_NUM) e = e.replace(new RegExp(n + '\\s*>\\s*0', 'g'), '0').replace(new RegExp('0\\s*<\\s*' + n, 'g'), '0');
  if (/[A-Za-z_]/.test(e.replace(/\bU\d+\b/g, ''))) return null;
  if (U.length > 8) return null;
  // the value is known only if it is the same for every assignment of the unknown macros
  let res = null;
  for (let mask = 0; mask < 1 << U.length; mask++) {
    let v; try { v = !!Function('return (' + e.replace(/\bU(\d+)\b/g, (m, i) => (mask >> i) & 1) + ')')(); } catch (x) { return null; }
    if (res === null) res = v; else if (res !== v) return null;
  }
  return res ? 1 : 0;
}
function prune(text) {
  const L = text.split('\n'); const out = [];
  // stack frames: {mode:'keep'|'drop'|'unk', taking:bool, hadElse}
  const st = []; const live = () => st.every((f) => f.taking);
  for (const line of L) {
    const m = /^\s*#\s*(ifdef|ifndef|if|elif|else|endif)\b(.*)$/.exec(line);
    if (!m) { live() && out.push(line); continue; }
    const [, d, rest] = m;
    if (d === 'ifdef' || d === 'ifndef' || d === 'if') {
      const v = live() ? evalCond(d, rest) : null;
      if (v === null) { st.push({ mode: 'unk', taking: true }); live() && out.push(line); }
      else st.push({ mode: 'known', taking: !!v, val: v });
    } else if (d === 'elif') {
      const f = st[st.length - 1];
      if (!f) throw new Error('unbalanced');
      if (f.mode !== 'unk') throw new Error('elif in known block');
      live() && out.push(line);
    } else if (d === 'else') {
      const f = st[st.length - 1];
      if (!f) throw new Error('unbalanced');
      if (f.mode === 'unk') { live() && out.push(line); }
      else f.taking = !f.val;
    } else { // endif
      const f = st.pop(); if (!f) throw new Error('unbalanced'); if (f.mode === 'unk' && (st.every((g) => g.taking))) out.push(line);
    }
  }
  if (st.length) throw new Error('unbalanced');
  return out.join('\n');
}
const lits = []; (function w(n) { if (!n || typeof n.type !== 'string') return; if (n.type === 'Literal' && typeof n.value === 'string' && /#\s*(if|ifdef|ifndef)\b/.test(n.value)) lits.push(n); for (const k in n) { const v = n[k]; if (Array.isArray(v)) v.forEach(w); else if (v && typeof v.type === 'string') w(v); } })(ast);
let s = src; let saved = 0; const skipped = [];
for (const n of lits.sort((a, b) => b.start - a.start)) { let t; try { t = prune(n.value); } catch (x) { skipped.push(x.message + ': ' + n.value.slice(0, 60).replace(/\n/g, ' ')); continue; } if (t !== n.value) { const lit = JSON.stringify(t); saved += n.end - n.start - lit.length; s = s.slice(0, n.start) + lit + s.slice(n.end); } }
fs.writeFileSync(process.argv[3], s); console.log('glsl literals', lits.length, 'saved bytes', saved); console.log('skipped', skipped.length + (skipped.length ? ':\n' + skipped.join('\n') : ''));
