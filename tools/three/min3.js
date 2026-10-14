// Re-minifies a trimmed three.js build with terser (three compress passes, top level off so `var THREE` stays global)
// and fails if the output no longer starts with `var THREE=`.
// Env: none.
// Output: `<bytes before> -> <bytes after>`; the result to <out.js>.
//   node three/min3.js three_p3.js three_p4.js
const fs = require('fs');
const { minify } = require('terser');

(async () => {
  const [inp, out] = process.argv.slice(2), src = fs.readFileSync(inp, 'utf8');
  const r = await minify(src, { ecma: 2020, toplevel: false, compress: { passes: 3, pure_getters: false }, mangle: true, format: { ascii_only: false } });
  if (r.code.indexOf('var THREE=') !== 0) throw new Error('THREE global changed: ' + r.code.slice(0, 40));
  fs.writeFileSync(out, r.code);
  console.log(src.length, '->', r.code.length);
})().catch((e) => { console.error(e); process.exit(1); });
