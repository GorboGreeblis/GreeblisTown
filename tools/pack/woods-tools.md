# Greeblis Woods: tools

Every tool used to build, measure and check Greeblis Woods, in `tools/greeblis-woods/`. Run them from the root of a
GreeblisGuides clone after installing the dependencies:

```sh
npm install --no-save terser@5.31.6 acorn@8.12.1 eslint-scope@8
```

Browser tools use Playwright at `/opt/node22/lib/node_modules/playwright` (the Claude Code cloud default) with
SwiftShader WebGL; edit the `require` path elsewhere.

Unless noted, `<page>` is a built page from `games/greeblis-woods/build/`, made by `build/build.sh`:
- `game_debug.html` keeps the test hooks.
- `test_page.html` also exposes VR-layer internals (`window.__F`, `__tt`, `__o`).

Many browser tools enter a fake VR session through `test/stress_init.js`.

## Build and ship

| Tool | What it does |
| --- | --- |
| `build/build.sh` | Builds the production, debug and test pages and the packed `index.html` (see [ordinal-packing.md](ordinal-packing.md)) |
| `build/min.js` | terser settings for the game code |
| `build/mk_debug_page.py <debug.html> <out.html>` | Makes the test page with VR internals exposed |
| `three/build_three.sh` | Trims the bundled three.js: unreachable methods, warnings, impossible shader blocks, re-minify |
| `pack/cmz.js` | The context-mixing codec (encoder and decoder in one generator) |
| `pack/build_loader.js` | Builds the full codec, the decode-only codec and the page loader from `cmz.js` |
| `pack/enc.js <in> <out.bin>` | Compresses and verifies a byte-exact round trip with the shipped decoder |
| `pack/pack_cm.py <page> "<Title>" <index.html>` | Compresses a page and writes the 7-bit ordinal page |
| `pack/tuning/cmzx.c`, `tunex.py` | Native research encoder for trying compressor settings fast. Build with `gcc -O2 -ffp-contract=off -DNATIVE -o cmzx cmzx.c -lm`. Its defaults are not the shipped model: port winning settings into `cmz.js`. |

## Tests (run before shipping)

| Tool | What it checks |
| --- | --- |
| `test/ordtest.js <index.html>` | Ord CSP and sandboxed preview iframe, desktop and Quest user agent (needs a `shots/` folder) |
| `test/browser.js <index.html>` | The packed page loads, shows progress and starts the game |
| `test/sim.js <game_debug.html> [talk]` | Plays all 171 creature-pair vignettes; `talk` forces the rare text exchanges |
| `test/director.js <game_debug.html>` | 15 simulated minutes of the vignette director |
| `test/stress.js <test_page.html>` | 10 VR enter/exit cycles plus 1 hour of play: heap, timers, listeners, NaN, stuck states |
| `test/fixcheck.js <test_page.html>` | Targeted checks for fixed bugs (goo at boot, walking in place, instancing, bun date, Hennrick's dance, VR double entry, controller re-sync, context restore) |
| `test/frozen.js <test_page.html>` | No animated creature part is merged into a static mesh |
| `test/cullcheck.js <test_page.html>` | View-cone culling never drops an in-view plant or pickup (400 random head poses, 120°×104° frustum) |
| `test/vrcullpx.js <test_page.html>` | Renders with culling on and off are pixel-identical in VR mode |
| `test/pixdiff.js <A.html> <B.html>` | Pixel-exact comparison of 7 seeded camera views (writes `shots/pd_*.png`) |
| `test/progs.js <page>` | Every shader program compiles |
| `test/cover_run.js <test_page.html> <out.json>` | Plays a broad session and records game and engine coverage |
| `test/perf.js <test_page.html> [label]` | Draw calls, triangles per view, JS update time, CPU and allocation hot spots |
| `test/errs.js <test_page.html>` | Console errors during live frames |

## Performance analysis (`analysis/`, each takes `<test_page.html>`)

| Tool | What it reports |
| --- | --- |
| `tris.js` | Triangles per view, grouped by scene object |
| `calls.js` | Draw calls per view by owner, and the worst views |
| `inst.js` | Every instanced mesh: count, triangles each, material |
| `dense.js`, `geo.js`, `geo2.js`, `kif.js` | Heaviest meshes and groups by triangles and size |
| `breakdown.js`, `worldauto.js` | Which objects update their matrices every frame and never change, and per-creature animation cost |
| `umw.js` | Cost of scene matrix updates, with and without skipping hidden objects |
| `loopalloc.js` | Allocations per frame in the live loop |
| `geogrow.js`, `vrleak.js` | Geometry/texture growth and leaks over long play and VR cycles |
| `vegdbg.js` | State of the vegetation instance buffers |
| `attract.js`, `attract2.js` | Fixed overview camera renders |

## Size analysis (`size/`)

| Tool | What it does |
| --- | --- |
| `var.js <game.prod.js>` | Compares terser setting variants (then compress each with `pack/enc.js`) |
| `strs.js <file.js>` | How much of a file is string literals |
| `chunks.js <three.js>` | Sizes of the shader chunks in a three.js build |
| `unc.py`, `uncb.py <cov.json> [n]` | Largest engine functions and blocks that never ran (from `test/cover_run.js`) |
| `glsldiff.js <a.js> <b.js>` | Shader chunks that differ between two three.js builds |
| `mkpage.py <three.js> <out.html>` | Swaps a different three.js into a debug page, for pixel comparison |

## Dead-code analysis (`lint/`, each takes `[game.js]`)

| Tool | What it finds |
| --- | --- |
| `deadscope.js` | Declared but unused variables and functions (scope analysis; handles top-level functions) |
| `deadprops.js` | Object properties that are written but never read anywhere in the game, engine or page scripts |
| `deadcfg.js`, `deadcfg2.js` | Config (`t`) and creature-definition keys that are never read |
| `dropped.js` | What terser drops as unused |
| `eslint.config.js` | ESLint config for the game source |

## Porting code between games (`port/`)

Used to bring Greeblis City's UI systems, Hennrick and the portal into Woods. Most compare two minified or readable
game sources by structure rather than names.

| Tool | What it does |
| --- | --- |
| `units.js`, `toplevel.js` | Lists the top-level units of a source |
| `match.js <a.js> <b.js>`, `pair.js`, `words.js` | Matches functions between two games by shape, word use and literals |
| `cover.js <a> <b> <out>` | Marks which parts of one game have a counterpart in the other |
| `extract.js`, `extract_fn.js` | Pulls one function or property (e.g. a builder) out of a game source |
| `canon.js`, `locals.js` | Renames locals to a canonical form so two copies can be diffed |
| `port_fn.js <in> <out> <prefix> 'a=b,…'` | Ports a function into another game, prefixing its locals and remapping outside names (as Hennrick's `hk_*` names) |
| `threekeys.js <threeA> <threeB>` | Compares which three.js classes two bundles export |
| `chunks.js <three.js>` | Lists shader chunks in a bundle |
| `minexp.js`, `propexp.js`, `recompress.js` | Experiments with minifier and property-mangling settings and their compressed size |

## Vignettes (`vignette/`)

| Tool | What it does |
| --- | --- |
| `validate.js <pair data>` | Checks the pair-vignette table: valid and unique pair keys, valid formations and landmarks, known gestures, emotes and effect tokens, and both creatures used |
| `shots.js`, `places.js`, `mote.js`, `mote2.js` | Screenshots of vignettes, landmark meeting spots and thrown motes |
| `textfit.js` | Text bubbles fit their boxes |
| `minsim.js`, `hen.js` | Quick smoke runs, including Hennrick's pairs |

## Visual and UI checks (`visual/`)

| Tool | What it does |
| --- | --- |
| `scene.js`, `env.js`, `env2.js`, `portrait.js`, `place.js`, `portal_shot.js` | Renders of the scene, environment props, creature portraits and the portal |
| `hencmp.js` | Renders Hennrick in two games side by side to confirm the port is identical |
| `sheet.py`, `sheet2.py`, `envsheet.py` | Contact sheets from those renders |
| `audit_run.js`, `dom_audit.js`, `ui_shots.js`, `summarize.py` | UI text overflow audit of every panel and dialogue (desktop and mobile), screenshots, and a summary of violations |

## Desktop and mobile test mode (`testmode/`)

`testmode.js` is the temporary third-person mode used while developing:
- WASD/arrow-key or touch movement and an orbit camera;
- for testing on desktop and mobile without a headset.

To use it:
- **Add:** insert it before the main loop and add its two `gcT` hooks.
- **Remove:** take it out before shipping. The final games are VR only.
