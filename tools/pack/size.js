// What the game weighs at each step of the release pass: the readable page, the page with its scripts
// minified (the game script with the Woods terser settings, as pack/woods-build/min.js), and that page packed into the ordinal
// (pack/park/woods-pack.js, round trip checked). Writes the intermediate files to <outdir> so they can be
// boot-tested (test/ordtest.js). Nothing in the repo is changed.
//   node pack/size.js [index.html] [outdir]        (needs terser: `npm install` in tools/)
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { minify } = require('terser');
(async () => {
  const src = process.argv[2] || path.join(__dirname, '../../index.html');
  const out = process.argv[3] || fs.mkdtempSync(path.join(require('os').tmpdir(), 'gsize-'));
  fs.mkdirSync(out, { recursive: true });
  const html = fs.readFileSync(src, 'utf8');
  // every inline script is minified: the game script (the last one) with top-level mangling, the small helper
  // scripts before it without (they set up globals); three.js is already minified and is left as it is
  const blocks = [...html.matchAll(/(<script[^>]*>)([\s\S]*?)<\/script>/g)], last = blocks.length - 1;
  const t0 = Date.now();
  let page = '', at = 0, game = '', r = null;
  for (const [k, m] of blocks.entries()) {
    const code = m[2], start = m.index + m[1].length;
    let min = code;
    if (k === last) (game = code), (r = await minify(code, { ecma: 2020, toplevel: true, compress: { passes: 2 }, mangle: { toplevel: true }, format: { ascii_only: false, wrap_func_args: false } })), (min = r.code);
    else if (!/^\s*var THREE=/.test(code) && code.trim()) min = (await minify(code, { ecma: 2020, compress: { passes: 2 }, format: { ascii_only: false, wrap_func_args: false } })).code;
    (page += html.slice(at, start) + min), (at = start + code.length);
  }
  page += html.slice(at);
  const pagePath = path.join(out, 'page.html'), packed = path.join(out, 'index.html');
  fs.writeFileSync(pagePath, page);
  console.log(`readable page   ${Buffer.byteLength(html).toLocaleString()} B (game script ${Buffer.byteLength(game).toLocaleString()} B)`);
  console.log(`minified page   ${Buffer.byteLength(page).toLocaleString()} B (game script ${Buffer.byteLength(r.code).toLocaleString()} B, ${((Date.now() - t0) / 1e3).toFixed(1)} s)`);
  const t1 = Date.now();
  execFileSync('node', [path.join(__dirname, 'park/woods-pack.js'), pagePath, packed, 'Greeblis Town'], { stdio: 'pipe' });
  console.log(`packed ordinal  ${fs.statSync(packed).size.toLocaleString()} B (${((Date.now() - t1) / 1e3).toFixed(1)} s)  -> ${packed}`);
})().catch((e) => { console.error(e); process.exit(1); });
