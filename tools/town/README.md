# Greeblis Town: older tools

The tools used to build Greeblis Town before the main checks in [`../test/`](../test), divided by job. Setup,
the battery, the game's globals and the release steps are in the [tools README](../README.md); the lint in
`lint/` is described there too.

Most scripts read the game's minified globals (`It`, `Re`, `so`, `bt`, `C`, `O`, `B`, `At`, `F`, `JGP`, …): check
the names still match before relying on a result. Run Python tools from the folder holding `index.html`, and
browser scene scripts through `../test/shot2.js` with `NOSHOT=1` (see the [tools README](../README.md)), for
example `NOSHOT=1 node test/shot2.js <url> x.png town/audit/meshcount.js`. Uploads are untrusted: `decode/` is the
only place to open them. (The older test scripts that were still useful moved to [`../test/`](../test); the rest
were superseded there and removed.)

## `extract/`: pulling creatures out of earlier games

How creatures from Greeblis City, Park and Woods were brought in with only the helpers they reach (see "Pulled models" in
[construction.md](../docs/construction.md)). Needs `acorn` and `eslint-scope` (both come with ESLint 8 in
`../lint/node_modules` once `npm install` has run there). The scripts expect a work folder (`JGP_WORK`, default `.`)
holding `ex/` (these scripts), `ours/main.js` (our game's script, cut out of `index.html`) and `up_City/main.js`,
`up_Woods/main.js`, `up_Park/s0.js … s18.js` (the originals' scripts, decoded with `decode/`). The pulling is done:
the block now in `index.html` was hand-finished after these runs (no `JGP_PARK`, its own `JGP_WOODS` preamble and
the Mont patch), so a fresh `build.js` run differs from it. Diff before `integrate.py`.

| Script | What it does |
| --- | --- |
| `ex.js` | The dependency-aware extractor, used by the scripts below: `load` reads the scripts, `extract` collects every top-level function, constant and helper the given builder keys reach (stopping at given names), `emit` writes them out as one isolated module |
| `an.js <regName> <script.js…>` | Lists a game's top-level declarations, what each depends on, and every place a builder key is registered (`<regName>.KEY = …`) |
| `cmp.js <a.js> <b.js>` | Compares two scripts' top-level declarations by structure: the first's names that are the same in the second, differ (with size) or are missing |
| `alpha.js <game.js> <ours.js>` | Matches another game's top-level names to ours by structure (alpha-renamed), so shared engine code is reused instead of copied; `build.js` and `run_woods.js` use its `match()` |
| `build.js` | Builds `pulled.js`: one module per game (`JGP_CITY`, `JGP_PARK`, `JGP_WOODS`) holding its original builders and their helpers; the keys come from `CITY`, `PARK` and `WOODS` (comma-separated), the report goes to stderr. Run from `ex/` |
| `run_same.js <file.js,…> <regName> <key,…> <extra stop,…> <out.js>`, `run_woods.js <key,…> [extra stop,…]`, `try_city.js <script.js> <key,…> [stop,…] [out.js]` | Single-game runs of the extractor, for trying one builder at a time (`run_woods.js` writes `woods_raw.js` and `woods_map.json`). Run from `ex/` |
| `integrate.py` | Writes `$JGP_WORK/ex/pulled.js` into `index.html` between the `PULLED-MODELS-BEGIN` and `-END` markers (and adds the geometry polyfill script if it is missing). Run from the repo root |
| `specs.py <City\|Park\|Woods> <ours\|orig>` | Turns dumped creature definitions (`$JGP_WORK/ex/defs_<game>.json`) into `specs_<game>_<mode>.json` for `review/study.js`, with the pulled builder keys or the originals' |
| `toplevel.js <index.html \| script.js> <dir with node_modules> <out.json>` | Writes a script's top-level names (variables, functions, classes) and their lines to `out.json`; given the page, it reads the last `<script>` and reports page line numbers. `espree` comes from the folder given (e.g. `town/lint`) |
| `extract.js <dir with node_modules> <name…>` | Cuts the named top-level declarations out of `app.js` (current folder) into `engine_part.js` for `harness.js` |
| `analyze.js`, `harness.js` | Historical: Node harnesses that built pulled creatures with three.js and a fake canvas (`analyze.js` the Park leech before and after Park's polish pass, `harness.js` the Woods Gorbo and the leech from `engine_part.js` and `gorbo_mama.js`, printing height, meshes and calls). Their inputs (`three_env.js`, made from the page's three.js script, and the originals' files) were made at the time and are not in the repo, and the leech is no longer in the game |
| `mont_patch.md` | Notes (done): how Mont was pulled from Greeblis Woods and became Montgummery, with the inserted text. Its line numbers are from the page as it was then |
| `oldworld.md` | Notes (done): the Greeblis City world-build chain the town replaced, block by block, and the edits that removed it |

## `decode/`: reading uploaded games safely

| Script | What it does |
| --- | --- |
| `decode2.js <packed.html> <decoded.html>` | Decodes a packed game in the sandboxed browser by catching its `document.write`, with all network blocked and nothing rendered, and saves the page (30 s timeout) |
| `sandrun.js <decoded.html> <expr.js> [shot.png]` | Runs a decoded game with all network blocked, waits `WAIT` ms (default 8000), evaluates the expression in `expr.js` and prints the result, with an optional screenshot. `CLICK=1` clicks in and walks first, `MOD=<scene.js>` runs a scene script instead, `HARNESS=1` sets `window.__gbHarness` |
| `ref.js <decoded.html> <outdir>` | Renders an uploaded game's creatures and companions from three angles to `<outdir>/ref_<name>_<n>.png`, network blocked. It reads that game's own globals (`Ye`, `ce`, `W`, `K`), so it only works on games that use those names |

## `review/`: looking at models and the town

| Script | What it does |
| --- | --- |
| `study.js` | Large renders of builders built directly (no spawn batching, the rest of the scene hidden), animated 60 steps and shot from two angles, from a `SPECS` JSON file of `[label, builder key, def, opts]` |
| `env.js`, `envsheet.sh` | Renders the town at 960×540 from fixed viewpoints (`VIEWS`: `[name, camPos, lookAt]`) and tiles them into one sheet: `envsheet.sh <prefix> '<VIEWS JSON>'` (`test/t_views.js` is the more flexible one) |
| `canvas_shot.js </abs/path/page.html> <out.png>` | Screenshots a standalone canvas page (used for the stained-glass window paintings), opened from `file://` with every other request blocked, at `VW`×`VH` (default 384×1024) |
| `sheet.py <prefix> <id,…> <out.png>`, `grid.py <prefix> <id,…> <out.png>`, `rowsheet.py <prefix> <out.png> <name…>`, `partsheet.py <list.txt> <out.png>` | Contact sheets from portrait renders: four creatures to a row at their two angles, one 300 px column per id, one row of four views per name, or part-by-part renders ten to a row. Need Pillow (`test/tile.py sheet` gives the same layouts from file order) |

## `audit/`: finding problems

| Script | What it does |
| --- | --- |
| `audit_depth.js` | Stale bounding spheres, frustum-culled instanced meshes, materials with polygon offset, and pairs of flat surfaces below 3 m that overlap within 3 cm (the forerunner of `test/t_zfight.js`) |
| `audit_stale.js` | Meshes whose bounds no longer contain their geometry (they vanish at some angles), counted by scene part, parent, name and material |
| `uiaudit.js` | Opens every station, talks to the four creatures with the longest names and shows a long stress line; records each canvas text that had to be squeezed to fit its width (the ratio and the canvas width) and screenshots each screen to `<out>_<name>.png` |
| `meshcount.js`, `tribreak.js` | Meshes, materials and triangles per creature, and visible triangles, meshes and centre per top-level scene part (the 30 largest and the total) |
| `sosz.js` | Each builder's code size and whether it is called once the page has loaded (to find dead builders; one used only while loading shows as not called) |
| `solid.js` | Pushes the player out of the church from 200 random spots inside and counts any left in, then walks Glyph at the church, post office, shop and juice bar and prints how far he got in. Slow (up to 7 minutes a walk) |
| `rowcheck_all.js` | After a long run (`RUN` ms, default 40000), lists creatures more than 0.5 m off their `def.at` spot, moving, or facing wrong |
| `snap.js`, `snapdiff.py <before.json> <after.json>` | Dump every live creature's final definition and per-id tables, the shop, the courier and the settings as JSON (`NOSHOT=1`, or the screenshot overwrites the dump) before and after a change, and diff the two by path. The shop and courier are read through their minified globals: check those names first |

## `edit/`, `vignettes/`

| Script | What it does |
| --- | --- |
| `edit/lib.py` | Helpers for editing `index.html` in the current folder: `load`, `save`, `sub1` (replace text that must appear exactly once), `span` (find a whole function by its header) and `builder` (substitute inside one builder). Written for the older two-space-indented page: `span` and `builder` don't match today's tab-indented one; `load`, `save` and `sub1` still work |
| `edit/replace.py <blocks.js>` | Swaps whole builders for new versions from a file of `//@@ <header>` blocks. Written for the older page, as `lib.py`: it stops on its assertion today |
| `vignettes/pairs.py [index.html]` | Checks the creature-pair vignette lines: reads the game's `NAMES` and `PAIRS` tables out of `index.html` (default the repo's) and prints the pair count, any pair of the cast missing or duplicated, the longest line and how often each gesture style is used |
