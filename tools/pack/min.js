// Minifies the game script with the release terser settings: ECMAScript 2020, top-level mangling, two compress
// passes, no parentheses wrapped round function arguments. size.js uses the same settings (OPTIONS).
// Env: none.
// Output: `<bytes before> -> <bytes after>`; the minified script to <out.js>.
//   node pack/min.js game.js game.min.js
const fs = require('fs');
const { minify } = require('terser');

const OPTIONS = { ecma: 2020, toplevel: true, compress: { passes: 2 }, mangle: { toplevel: true }, format: { ascii_only: false, wrap_func_args: false } };
module.exports = { OPTIONS };

if (require.main === module) {
  (async () => {
    const [inp, out] = process.argv.slice(2), src = fs.readFileSync(inp, 'utf8');
    const r = await minify(src, OPTIONS);
    fs.writeFileSync(out, r.code);
    console.log(src.length, '->', r.code.length);
  })().catch((e) => { console.error(e); process.exit(1); });
}
