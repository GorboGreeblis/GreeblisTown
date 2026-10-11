# Greeblis Woods: ordinal packing recipe

Greeblis Woods ships as one self-contained `index.html` of **155,649 bytes**, as of PR #12 on 2026-10-10. Greeblis City
uses Roadroller (see [../greeblis-city/ordinal-packing.md](../greeblis-city/ordinal-packing.md)); Woods instead uses a custom context-mixing (CM)
compressor with a 5 KB decoder. Both games pack the compressed bytes into the page with the same 7-bit text encoding.

## Size history

| Step | `index.html` bytes |
| --- | --- |
| Before packing work (PR #8) | about 195,000 |
| CM compressor (PR #9) | about 160,000 |
| Bug-fix and dead-code pass (PR #11) | 159,952 |
| Engine trimming plus culling code (PR #12) | 155,649 |

## Pipeline

1. **Readable source → production source.**
   - Debug-only code is wrapped in `/*<dbg>*/ ... /*</dbg>*/` markers. Examples: the pair table, the vignette list, the forced-pair hook and the VR test exports.
   - The build strips every marked span with a regex and asserts that no `<dbg>` remains.
   - The debug page keeps those spans, so test scripts can drive the game.
2. **Minify the game** with terser 5:
   - `ecma: 2020`, `toplevel: true`, `compress: {passes: 2}`, `mangle: {toplevel: true}`.
   - Stricter settings (more passes, `unsafe_*`) were measured and saved under 150 bytes compressed, so they were not used.
3. **Trim the three.js r128 bundle.** Run once, whenever the engine or the game's use of it changes. Every step must keep renders pixel-identical:
   1. **Unreachable methods:** remove class methods that never ran in a full coverage play session AND whose name appears nowhere else in the engine or the game. The engine has no dynamic `obj[name]()` dispatch, so a name check is a proof. This removed 119 methods.
   2. **Developer warnings:** replace every `console.*` call in the engine with `void 0`. Fallback code stays, and shader compile diagnostics are still recorded.
   3. **Impossible shader blocks:** remove GLSL `#if` blocks whose condition is false for every possible setting of the unknown macros.
      - The never-defined set: shadow maps, environment, normal, specular, alpha, emissive, light and AO maps, UV2, skinning, morphing, logarithmic depth, dithering, premultiplied alpha, tone mapping, exponential fog, physically-correct lights, and spot, area-light and clipping counts.
      - **Evaluate each unknown macro independently.** Substituting the same value for all of them wrongly dropped `defined(USE_UV) && !defined(UVS_VERTEX_ONLY)` and broke every textured shader.
      - Skip any string whose `#if` blocks span several JS strings (the shader prefix pieces).
   4. **Re-minify** the engine with terser, `toplevel: false`, so `var THREE` stays global.
   - Result: the engine went from 54.3 KB to 49.7 KB compressed.
   - Exports were already limited to the classes the game uses. **Use only exported names**; e.g. use the literal `35048` for `DynamicDrawUsage`. An unexported `THREE.X` is `undefined` and fails silently. That bug drew no trees at all and was only caught by pixel comparison.
4. **Assemble the unpacked page:** head HTML, a small error-guard script, the trimmed three.js, polyfills, the canvas patch and the minified game, in that order.
5. **Compress with the CM codec** (`cmz(data, len, enc)`, one generator function shared by encoder and decoder):
   - **12 hashed contexts:**
     - orders 0 to 4;
     - two longer orders (5–6 and up to 8 bytes);
     - the current-word hash plus the previous word;
     - two sparse byte pairs (bytes 2–3, bytes 1+3);
     - an order-4+5 mix;
     - word + previous byte.
   - **Table:** each context has two adaptive probabilities plus a run model, in a 2^23-bucket table (64 MB of `Uint16`).
   - **Match model:** 4-byte minimum match, predicting the next bit from the longest previous match.
   - **Mixing:** three neural mixers selected by partial byte, by previous byte × bit position and by match state. A final mixer combines them, followed by two interpolated APM/SSE stages.
   - **Coder:** 32-bit binary arithmetic coding.
   - **Speed:** about 5–7 s to encode on a desktop. The page decodes it in a few seconds (about 15 s in headless SwiftShader tests). The owner chose the smallest file over speed.
   - **Round trip:** the build verifies a byte-exact round trip with the exact decoder that ships in the page.
6. **Encode the page** (same scheme as City):
   - Compressed bits are packed 7 per character into `<script type="b">`.
   - The groups 0, 13 and 60 (NUL, CR, `<`) are escaped as a single character in 128–511 that also carries the next group, so escapes cost nothing.
   - The outer page is minimal: charset, viewport, title, a dark background and a `LOADING` line.
   - The loader unpacks the text, runs the decoder generator with a `LOADING nn%` update every 16 KB, then calls `document.open/write/close` with the decoded page.

## Ordinal requirements this build meets

- No network requests and no external files. Every texture is painted on a canvas and every model is built in code.
- Boots under ord's CSP (`default-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob:`).
- Boots inside the explorer's sandboxed `allow-scripts` preview iframe. VR can't start there, so the page detects it and shows a link to the full-page `/content/<id>` URL; on a Quest it says "Press A to enter VR" instead.
- The `/preview/` → `/content/` link rewrite is case-insensitive.

## Push checklist

1. Rebuild the debug and production pages; check the round-trip message and the size.
2. **Pixel-compare** the debug build against the previous build: 7 fixed camera views with seeded randomness. Expect 0 differing pixels unless visuals changed on purpose.
3. **Shader check:** every program in `renderer.info.programs` has `diagnostics.runnable` true.
4. **Simulations:**
   - all 171 creature pairs (normal and with talk forced on);
   - 15 minutes of the vignette director;
   - a 1-hour stress run with 10 VR enter/exit cycles (heap flat, no NaN, nothing stuck);
   - a coverage run.
5. **Ordinal emulation:** a local server with the ord CSP header, serving `/content/` and a `/preview/` sandboxed iframe, on desktop and with a Quest user agent. Expect no CSP or page errors and the correct gate text.
6. Push only `index.html` to the game repo.

## Rebuilding Greeblis Woods

The readable source is in `games/greeblis-woods/` and the scripts are in `tools/greeblis-woods/`. Run from the root
of a GreeblisGuides clone; outputs go to the git-ignored `games/greeblis-woods/build/`.

```sh
npm install --no-save terser@5.31.6 acorn@8.12.1
sh tools/greeblis-woods/build/build.sh       # -> build/index.html (the ordinal), game.html, game_debug.html, test_page.html
cmp games/greeblis-woods/build/index.html <GreeblisWoods clone>/index.html   # identical for the PR #12 source
# only when three.js or the game's use of it changes:
sh tools/greeblis-woods/three/build_three.sh  # page/03-three-trim.js -> page/03-three.js
```

| Path | What |
| --- | --- |
| `games/greeblis-woods/game.js` | Readable game source; `/*<dbg>*/ ... /*</dbg>*/` spans are test hooks stripped from production |
| `games/greeblis-woods/page/` | Page parts in build order; `03-three-trim.js` is the trimming input, `03-three.js` the shipped engine |
| `games/greeblis-woods/three-coverage.json` | Function coverage of `03-three-trim.js` from a full play session (checked by sha256) |
| `tools/greeblis-woods/build/` | `build.sh`, the terser settings (`min.js`) and `mk_debug_page.py` |
| `tools/greeblis-woods/three/` | Engine trimming: `prune3.js`, `noconsole.js`, `glsl_if.js`, `min3.js` |
| `tools/greeblis-woods/pack/` | CM codec (`cmz.js`), loader builder, round-trip encoder, 7-bit page writer (`pack_cm.py`) |
| `tools/greeblis-woods/test/` | Playwright tests (Playwright at `/opt/node22/lib/node_modules/playwright`) |

Tests take the built pages as arguments, for example:

- `node tools/greeblis-woods/test/ordtest.js $PWD/games/greeblis-woods/build/index.html`: ord CSP and preview iframe, desktop and Quest. Run with a `shots/` folder in the working directory.
- `node tools/greeblis-woods/test/sim.js $PWD/games/greeblis-woods/build/game_debug.html [talk]`: all 171 creature pairs.
- `director.js`, `stress.js`, `fixcheck.js`, `cullcheck.js`, `vrcullpx.js`, `frozen.js`, `perf.js` and `progs.js`: run these on `test_page.html` or `game_debug.html`.
- `pixdiff.js A.html B.html`: 7 seeded camera views, pixel-exact comparison.
- `cover_run.js test_page.html out.json`: records coverage. To re-record `three-coverage.json`, keep the function list from `three` and its sha256.
