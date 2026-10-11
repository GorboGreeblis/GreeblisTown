# Greeblis Town USA: older tools

The tools used to build Greeblis Town USA before the main checks in [`../test/`](../test), divided by job. Setup,
the battery, the game's globals and the release steps are in the [tools README](../README.md); the lint in
`lint/` is described there too.

Most scripts read the game's minified globals (`It`, `Re`, `so`, `bt`, `C`, `O`, `B`, `At`, `F`, `JGP`, …): check
the names still match before relying on a result. Run Python tools from the folder holding `index.html`, and
browser scene scripts through `test/run.js` (see [`test/README.md`](test/README.md)). Uploads are untrusted:
`decode/` is the only place to open them.

## `test/`: older checks

Runners and scene scripts for creatures, quests, the Garden Event, the church and performance. See
[`test/README.md`](test/README.md).

## `extract/`: pulling creatures out of earlier games

How creatures from Greeblis City, Park and Woods were brought in with only the helpers they reach (see "Pulled models" in
[construction.md](../docs/construction.md)). Needs `acorn` and `eslint-scope`. The scripts expect a work folder
(`JGP_WORK`, default `.`) holding `ex/` (these scripts), `ours/main.js` (our game's script, cut out of
`index.html`) and `up_City/main.js`, `up_Woods/main.js`, `up_Park/s0.js … s18.js` (the originals' scripts, decoded
with `decode/`).

| Script | What it does |
| --- | --- |
| `ex.js` | The dependency-aware extractor: from a list of builder keys it collects every top-level function, constant and helper they reach and emits them as one isolated module |
| `an.js` | Lists a game's top-level declarations, what each depends on, and where builders are registered |
| `cmp.js` | Compares two scripts' top-level declarations by structure |
| `alpha.js` | Matches another game's top-level names to ours by structure (alpha-renamed), so shared engine code is reused instead of copied |
| `build.js` | Builds `pulled.js`: one module per game (`JGP_CITY`, `JGP_WOODS`, …) holding its original builders and their helpers; the keys come from `CITY`, `WOODS`, … |
| `run_same.js`, `run_woods.js`, `try_city.js` | Single-game runs of the extractor, for trying one builder at a time |
| `integrate.py` | Puts `pulled.js` into `index.html` between the `PULLED-MODELS-BEGIN` and `-END` markers |
| `specs.py` | Portrait specs for each pulled builder and its original, to render them side by side |
| `toplevel.js`, `extract.js` | Cut a game script out of a page and list its top-level names (`espree`) |
| `analyze.js`, `harness.js`, `equiv.js`, `wrapped_check.js` | Build a pulled creature in Node, with three.js and a fake canvas, and check it matches the original (same meshes, positions and bounds). `analyze.js` and `harness.js` load a `three_env.js` that exposes the game's three.js bundle as a global; make it from the page's three.js script |
| `mont_patch.md` | Worked example: how Mont was pulled from Greeblis Woods and became Montgummery |
| `oldworld.md` | Analysis of the Greeblis City world-build chain the town replaced |

## `decode/`: reading uploaded games safely

| Script | What it does |
| --- | --- |
| `decode2.js` | Decodes a packed game in the sandboxed browser by catching its `document.write`, without rendering it: `node decode2.js packed.html decoded.html` |
| `sandrun.js` | Runs a decoded game with all network blocked, evaluates an expression in it and prints the result |
| `ref.js` | Renders reference portraits of an uploaded game's creatures, network blocked |

## `review/`: looking at models and the town

| Script | What it does |
| --- | --- |
| `study.js` | Large renders of builders built directly (no spawn batching), from two angles, from a `SPECS` JSON file |
| `swatch.js` | A sheet of every `KIT.surf` texture kind on spheres |
| `env.js`, `envsheet.sh` | Renders the town from fixed viewpoints (`VIEWS`) and tiles them into one sheet: `envsheet.sh <prefix> '<VIEWS JSON>'` |
| `canvas_shot.js` | Screenshots a standalone canvas page (used for the stained-glass window paintings) |
| `sheet.py`, `grid.py`, `rowsheet.py`, `partsheet.py` | Contact sheets from portrait renders (two angles per creature, four per row, or part by part). Need Pillow |

## `audit/`: finding problems

| Script | What it does |
| --- | --- |
| `audit_depth.js` | Stale bounding spheres, near-coplanar flat surfaces close to the ground, and offsets |
| `audit_stale.js` | Meshes whose bounds no longer contain their geometry (they vanish at some angles) |
| `uiaudit.js` | Walks the UI screens and reports canvas text that had to be squeezed or runs past its canvas |
| `meshcount.js`, `tribreak.js` | Meshes, materials and triangles per creature and per scene part |
| `sosz.js` | Each builder's code size and whether it is ever called (to find dead builders) |
| `solid.js` | Pushes the player and creatures at a building from many spots and counts any that get inside |
| `rowcheck_all.js` | After a long run (`RUN` ms), lists creatures more than 0.5 m off their `def.at` spot, moving, or facing wrong |
| `snap.js`, `snapdiff.py` | Dump every creature's final definition before and after a change (such as removing dead code) and diff the two |

## `size/`, `edit/`, `vignettes/`

| Script | What it does |
| --- | --- |
| `size/stubdead.js` | Replaces builders no creature uses with a tiny stub (edit its `DEAD` list, which is from the first size pass). Check with `audit/sosz.js` first and `snap.js` / `snapdiff.py` after. Needs `acorn-walk` |
| `edit/lib.py` | Helpers for editing `index.html` safely: `load`, `save`, `sub1` (replace text that must appear exactly once) and `span` (find a whole function by its header) |
| `edit/replace.py` | Swaps whole builders for new versions from a file of `//@@ <header>` blocks |
| `vignettes/pairs.py` | How the creature-pair vignette lines were written: a table of pairs (two codes, a gesture style, two lines). Running it lists any missing or duplicated pair and prints the longest line. Some codes belong to creatures since replaced; the game's `PAIRS` table is the current one |
