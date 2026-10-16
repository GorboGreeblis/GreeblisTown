# Greeblis Town: Tools

This folder holds everything used to build, check, measure and release **Greeblis Town**. The game itself is the
single file `index.html` at the repo root; nothing in `tools/` ships inside it. The binding rules are in
[rules.md](docs/rules.md); the world's lore, design and style are in the [bible](docs/bible.md).

Contents: [Layout](#layout) · [Setup](#setup) · [Workflow](#workflow) · [Tool index](#tool-index)

## Layout

This section maps each path in `tools/` to its contents.

| Path | Contents |
| --- | --- |
| `index.html` | The readable copy of the game, never compressed: byte-identical to the root `index.html` until the final pass packs the root, and the only readable page after it. Every change is copied here before a push (`test/copycheck.sh` checks). |
| [`docs/`](docs) | The guides: [rules](docs/rules.md), [bible](docs/bible.md), [construction](docs/construction.md), [creatures](docs/creatures.md), [testing](docs/testing.md), [release](docs/release.md), [open tasks](docs/tasks.md), [benchmarks](docs/benchmarks.md). |
| [`test/`](test) | The runners and their shared modules, the probes, and the render, coverage and pixel-compare tools. |
| [`audit/`](audit) | Scene audits: stale bounds, the scene's mesh and triangle budget, dead builders, collisions, creatures off home, interface text, state dumps. |
| [`lint/`](lint) | ESLint over the game script, and the unread-property finder. |
| [`pack/`](pack) | The release pipeline: cut the test modes, minify, pack into the ordinal, unpack, measure. |
| [`three/`](three) | Trimming the bundled three.js. |
| [`sandbox/`](sandbox) | Decoding and running packed or uploaded pages in a sandboxed browser with the network blocked. |
| `package.json` | Dependencies and the `lint`, `test`, `battery`, `size` and `deadprops` scripts. |
| `.gitignore` | Excludes `node_modules/`, renders and pixel comparisons (`*.png`, `*.ppm`), logs (`*.log`), `lint/game.js`, coverage and state dumps (`cov_*.json`, `snap_*.json`, `uncov*.txt`), the final pass's and the three.js trim's intermediates in `tools/` (`cut.html`, `game.js`, `game.min.js`, `page.html`, `check.html`, `old.html`, `three.js`, `three_p*.js`, `game_all.js`) and `__pycache__/`. |

## Setup

This section specifies the environment the tools need.

```sh
cd tools && npm install          # acorn 8.12.1, terser 5.31.0, playwright 1.56.1 (exact versions)
python3 -m http.server 8765      # from the repo root, in a second terminal (serves http://localhost:8765/index.html)
```

| Command (in `tools/`) | Runs |
| --- | --- |
| `npm test` | `test/quick.sh`, the quick check. |
| `npm run battery` | `test/battery.sh`, the full battery. |
| `npm run lint` | `lint/lint.sh`; the first run installs ESLint 8.57.0 into `lint/` (`npm install --no-save`). |
| `npm run size` | `pack/size.js`, the page's weight readable, minified and packed. |
| `npm run deadprops` | `lint/deadprops.js`, the properties the game defines but never reads. |

- Every command in these docs runs from `tools/`. Instead of serving the page, `quick.sh` and `battery.sh` take
  `URL=file:///…/index.html`; the Node runners take the same URL as their first argument.
- Where Playwright and its Chromium are installed globally (as in a cloud session), point Node at them with
  `NODE_PATH=$(npm root -g)` and do not run `playwright install`.
- The browser tests render with SwiftShader WebGL. Only one headless browser may run at a time.
- `test/tile.py` requires Pillow.

## Workflow

This section points to the procedures that govern day-to-day work.

- Which checks each change requires (lint after every edit, the quick check before every push, the full battery
  once in a while): [testing.md](docs/testing.md#when-to-run-what).
- The final pass, packing, trimming three.js and dead-code removal: [release.md](docs/release.md).
- Measuring size at any time: `npm run size` (the page readable, minified and packed).

## Tool index

This section lists every tool with its purpose; usage and settings are in the linked reference. Every new tool must
get an entry here ([rules.md](docs/rules.md#working-on-it)).

**Runners** (`test/`, see [testing.md](docs/testing.md#runners))

| Tool | Purpose |
| --- | --- |
| `quick.sh` | The quick check: copy check, lint, boots, ordinal sandboxes, shaders, church, then named probes; a closing summary. |
| `battery.sh` | The full battery of regression probes; a closing summary. |
| `shot.js` | The runner: headless Chromium, desktop or phone (`MOBILE=1`), scene script, screenshot, console log. |
| `mob.js` | An alias of `MOBILE=1 node test/shot.js`. |
| `ordtest.js` | The game as an ordinal, in a sandboxed iframe under ord's CSP. |
| `copycheck.sh` | Checks that `tools/index.html` is the readable copy. |
| `clock.js` | Checks the actual frame clock with deterministic time: active, exited, blurred and resumed sessions; `node test/clock.js [index.html]` from `tools/` (defaults to the readable copy). |
| `parts.js` | Runs a multi-part probe's parts, each on a fresh page. |
| `lib.js`, `lib.sh`, `browser.js` | Shared modules: the probes' helpers, the runners' common steps and summary, the browser setup. |

**Probes** (`test/`, see [testing.md](docs/testing.md#probes))

| Group | Probes |
| --- | --- |
| Boot and platforms | `boot.js`, `t_give.js`, `t_inventory.js`, `t_shader.js`, `t_errcopy.js`, `t_taps.js`, `t_menupos.js`, `t_headguard.js` |
| Creatures and quests | `talk.js`, `t_flavor.js`, `t_battles.js`, `t_battlecost.js`, `t_gem.js`, `t_pizza.js`, `t_stone.js`, `t_sparkakus.js`, `t_zollod.js`, `t_script.js`, `t_church.js`, `t_library.js`, `t_avatar.js` |
| Movement and life | `t_roam.js`, `t_fortizmo.js`, `t_nearstop.js`, `t_reach.js`, `t_visits.js`, `t_visitlive.js`, `t_stuck.js`, `t_vigall.js`, `t_ground.js`, `t_baked.js`, `soak.js` |
| The Garden Event and music | `t_event.js`, `t_dance.js`, `t_plants.js`, `t_jazz.js`, `t_stress.js` |
| Rendering | `t_zfight.js`, `t_zcheck.js`, `t_shimmer.js`, `t_perf.js`, `t_townview.js` |

**Render and measuring tools** (`test/`, see [testing.md](docs/testing.md#render-and-measuring-tools))

| Tool | Purpose |
| --- | --- |
| `t_views.js` | Town views by building, parcel or position, and creature close-ups. |
| `t_detail.js` | Close shots from given camera positions. |
| `portraits.js` | Isolated creature portraits on open lawn. |
| `t_eval.js` | Prints an expression evaluated in the running game. |
| `pxcmp.js` | Pixel comparison of two builds over ten fixed views. |
| `bench.js` | Build benchmark read from outside the game (draw calls, triangles, CPU per frame, size, load, heap), for any build; results in [benchmarks.md](docs/benchmarks.md). |
| `cov.js`, `cov_extra.js` | Precise JS coverage over a session of scene scripts, and the scene that reaches the rest. |
| `uncov.js` | The code that never ran, largest first. |
| `tile.py` | Contact sheets and amplified render differences. |
| `pairs.py` | Checks the vignette pair tables and the ANCIENT's exchanges. |

**Audits** (`audit/`, see [testing.md](docs/testing.md#audits))

| Tool | Purpose |
| --- | --- |
| `audit_stale.js` | Meshes whose geometry exceeds their bounding sphere. |
| `tribreak.js` | The scene's budget: meshes, triangles and materials per creature; visible triangles per top-level scene part. |
| `sosz.js` | Builder sizes and dead builders. |
| `solid.js` | Building collision in the church and at four buildings. |
| `rowcheck.js` | Creatures off their home ground, or facing wrong at their own place. |
| `uiaudit.js` | Canvas text condensed or overrunning on every screen. |
| `snap.js`, `snapdiff.py` | State dump before and after a change, and its diff by path. |
| `study.js` | Large study renders of builders built alone. |

**Lint** (`lint/`, see [testing.md](docs/testing.md#lint))

| Tool | Purpose |
| --- | --- |
| `lint.sh`, `extract.py`, `.eslintrc.json`, `package.json` | ESLint 8 over the game script, reported at `index.html` lines. |
| `deadprops.js` | Properties the game defines but never reads. |

**Release** (`pack/`, `three/`, see [release.md](docs/release.md))

| Tool | Purpose |
| --- | --- |
| `pack/cutmodes.js` | Cuts the test modes and applies the final-build blocks. |
| `pack/min.js` | Minifies the game script with the release settings. |
| `pack/pack.js`, `pack/unpack.js` | Packs a page into the ordinal; unpacks one of this repo's packs and checks its decoder. |
| `pack/model.js`, `pack/cmz.js` | The shipped decoder (embedded text, not a runnable script), and the codec as readable source. |
| `pack/size.js` | The page's weight at each step of the final pass. |
| `three/prune3.js`, `three/glsl_if.js`, `three/noconsole.js`, `three/min3.js`, `three/swap3.py` | Trimming three.js: unused methods, impossible shader blocks, console calls, re-minifying, swapping a build into a page. |

**Sandbox** (`sandbox/`, see [release.md](docs/release.md#opening-packed-and-uploaded-pages))

| Tool | Purpose |
| --- | --- |
| `decode.js` | Decodes a packed page without rendering it, network blocked. |
| `run.js` | Runs a decoded page with the network blocked. |

Uploaded files are untrusted: they must be opened only through `sandbox/`.
