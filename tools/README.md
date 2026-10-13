# Greeblis Town: Tools

Everything used to build, check, measure and release **Greeblis Town**. The game itself is the single file
`index.html` at the repo root; nothing in `tools/` ships inside it.

Start with the [rules](docs/rules.md). The [bible](docs/bible.md) holds the world's lore, design and style.

## Layout

| Path | What it holds |
| --- | --- |
| `index.html` | The readable copy of the game, never compressed: the same bytes as the root `index.html` until the final pass packs the root, and the only readable page after it. Copy every change here before pushing; `test/copycheck.sh` checks. |
| [`docs/`](docs) | The guides: [rules](docs/rules.md), [bible](docs/bible.md), [construction](docs/construction.md), [creatures](docs/creatures.md), [testing](docs/testing.md), [release](docs/release.md). |
| [`test/`](test) | The quick check and the full battery, the Playwright probes, and the render, coverage and pixel-compare tools. |
| [`audit/`](audit) | Scene audits: stale bounds, meshes and triangles, dead builders, collisions, the interface's text, state dumps. |
| [`lint/`](lint) | ESLint over the game script, and the unread-property finder. |
| [`pack/`](pack) | The release pipeline: minify, pack into the ordinal, unpack and measure. |
| [`three/`](three) | Trimming the bundled three.js. |
| [`sandbox/`](sandbox) | Opening uploaded or packed pages safely, in a sandboxed browser with the network blocked. |

## Setup

```sh
cd tools && npm install          # acorn, terser 5.31.0 (pinned), playwright
python3 -m http.server 8765      # from the repo root, in another terminal: the tests load http://localhost:8765/index.html
```

- `npm test` runs the quick check, `npm run battery` the full battery, and `npm run lint` the lint (it installs
  ESLint 8 into `lint/` the first time).
- Instead of serving the page, any runner takes `URL=file:///…/index.html`.
- Where Playwright and its Chromium are installed globally (as in a cloud session), point Node at them with
  `NODE_PATH=$(npm root -g)` and don't run `playwright install`.
- The browser tests render with SwiftShader WebGL. Run one headless browser at a time.
- `.gitignore` keeps `node_modules`, renders, logs and the lint's cut-out script out of git.

## Everyday work

| When | Do |
| --- | --- |
| After every edit | `npm run lint` (one known warning: `'p' is not modified in this loop`). |
| Before every push | `cp index.html tools/index.html`, then `test/quick.sh` (about four minutes), naming the probes for what changed: `test/quick.sh t_zollod.js`. |
| After a change to what is drawn | `Z=1 test/quick.sh` and close renders (`test/t_views.js`, `test/t_detail.js`, `test/portraits.js`). |
| After a change that should change nothing on screen | `node test/pxcmp.js <old url> <new url>`: 0 differing pixels in every view. |
| Once in a while | `test/battery.sh > test/battery.log 2>&1` (two hours and more): before a release, after a change to a whole system, every few PRs, or when the owner asks. |
| Measuring size | `node pack/size.js`: the page readable, minified and packed. |

Every runner, probe and audit is described in [testing.md](docs/testing.md); the final pass, the codec, trimming
three.js and finding dead code in [release.md](docs/release.md).

## Tools at a glance

**Checks** (`test/`): `quick.sh` · `battery.sh` · `shot.js` (desktop runner) · `mob.js` (phone runner) · `ordtest.js`
(the ordinal sandbox) · `copycheck.sh` · `parts.js` (multi-part probes) · the `t_*.js` probes, `boot.js`, `talk.js`
and `soak.js` (see [testing.md](docs/testing.md#probes)).

**Renders and measuring** (`test/`): `t_views.js` · `t_detail.js` · `t_shots.js` · `portraits.js` · `t_townview.js` ·
`t_perf.js` · `t_eval.js` · `pxcmp.js` · `cov.js`, `cov_extra.js`, `uncov.js` · `tile.py` · `pairs.py`.

**Audits** (`audit/`): `audit_stale.js` · `meshcount.js` · `tribreak.js` · `sosz.js` · `solid.js` · `rowcheck.js` ·
`uiaudit.js` · `snap.js`, `snapdiff.py` · `study.js`.

**Lint** (`lint/`): `lint.sh` (with `extract.py` and `.eslintrc.json`) · `deadprops.js`.

**Release** (`pack/`, `three/`): `min.js` · `pack.js` · `unpack.js` · `model.js` · `cmz.js` · `size.js` · `prune3.js`
· `glsl_if.js` · `noconsole.js` · `min3.js` · `swap3.py`.

**Sandbox** (`sandbox/`): `decode.js` (decode a packed page without rendering it) · `run.js` (run a decoded page with
the network blocked). Uploaded files are untrusted: open them only this way.
