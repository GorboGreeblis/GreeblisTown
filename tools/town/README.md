# Greeblis Town USA: tools

Every tool used to build and check Greeblis Town USA (the JurassicGreeblisPark repo's `index.html`), divided by
job. The game ships unpacked, so there is no build or pack step yet; see
[`games/greeblis-town-usa/`](../../games/greeblis-town-usa/README.md) for its size notes.

Most scripts read the game's minified globals (`It`, `Re`, `so`, `bt`, `C`, `O`, `B`, `At`, `F`, `JGP`, …). Check
the names still match before relying on a result. Paths are relative: run Python tools from the folder holding
`index.html`, and browser scene scripts through `test/run.js` (see [`test/README.md`](test/README.md)). Playwright
is expected at `/opt/node22/lib/node_modules/playwright` or under `npm root -g`.

**Uploaded game files are untrusted:** only decode or run them inside the sandboxed browser (`decode/`), never in
Node or a normal page.

## `test/`: checks

Runners for desktop, mobile and the ordinal sandbox, plus scene scripts for creatures, quests, the Garden Event,
the church and performance. See [`test/README.md`](test/README.md).

## `extract/`: pulling creatures out of earlier games

How the Greeblis City, Park and Woods creatures were brought in with only the helpers they reach (see "Pulled
models" in the [construction guide](../../guides/greeblis-town-usa/construction.md)). Needs `acorn` and
`eslint-scope` (`npm install acorn eslint-scope`).

The scripts expect a work folder (`JGP_WORK`, default `.`) laid out like this:

```
ex/          these scripts
ours/main.js our game's script, cut out of index.html
up_City/main.js, up_Woods/main.js, up_Park/s0.js … s18.js   the decoded originals' scripts (from decode/)
```

| Script | What it does |
| --- | --- |
| `ex.js` | The dependency-aware extractor: from a list of builder keys it collects every top-level function, constant and helper they reach, and emits them as one isolated module |
| `an.js` | Lists a game's top-level declarations, what each depends on, and where builders are registered |
| `cmp.js` | Compares two scripts' top-level declarations by structure |
| `alpha.js` | Matches another game's top-level names to ours by structure (alpha-renamed), so shared engine code is reused instead of copied |
| `build.js` | Builds `pulled.js`: one module per game (`JGP_CITY`, `JGP_WOODS`, …) holding its original builders and their helpers. The keys come from `CITY`, `WOODS`, … |
| `run_same.js`, `run_woods.js`, `try_city.js` | Single-game runs of the extractor, for trying one builder at a time |
| `integrate.py` | Puts `pulled.js` into `index.html` between the `PULLED-MODELS-BEGIN` and `-END` markers |
| `specs.py` | Builds portrait specs for each pulled builder and its original, so the two can be rendered side by side and compared |
| `toplevel.js`, `extract.js` | Cut the game script out of a page and list its top-level names (`espree`) |
| `analyze.js`, `harness.js`, `equiv.js`, `wrapped_check.js` | Build a pulled creature in Node, with three.js and a fake canvas, and check it matches the original (same meshes, positions and bounds) |
| `mont_patch.md` | Worked example: how Mont was pulled from Greeblis Woods and became Montgummery |
| `oldworld.md` | Analysis of the Greeblis City world-build chain that the town replaced |

`analyze.js` and `harness.js` load a `three_env.js` that exposes the game's three.js bundle as a global; make it
from the first script in the page.

## `decode/`: reading uploaded games safely

| Script | What it does |
| --- | --- |
| `decode2.js` | Decodes a packed game in the sandboxed browser by catching its `document.write`, without ever rendering it. `node decode2.js packed.html decoded.html` |
| `sandrun.js` | Runs a decoded game in the browser with all network blocked, evaluates an expression in it and prints the result |
| `ref.js` | Renders reference portraits of an uploaded game's creatures, network blocked |

## `review/`: looking at models and the town

| Script | What it does |
| --- | --- |
| `study.js` | Large renders of builders built directly (no spawn batching), from two angles, from a `SPECS` JSON file |
| `swatch.js` | A sheet of every `KIT.surf` texture kind on spheres |
| `env.js` and `envsheet.sh` | Renders the town from fixed viewpoints and tiles them into one sheet |
| `canvas_shot.js` | Screenshots a standalone canvas page (used for stained-glass window paintings) |
| `sheet.py`, `grid.py`, `rowsheet.py`, `partsheet.py` | Contact sheets from portrait renders (two angles per creature, four per row, or part-by-part breakdowns). Need Pillow |

## `audit/`: finding problems

| Script | What it does |
| --- | --- |
| `audit_depth.js` | Stale bounding spheres, near-coplanar flat surfaces close to the ground (z-fighting) and offsets |
| `audit_stale.js` | Meshes whose bounds no longer contain their geometry (they vanish at some angles) |
| `uiaudit.js` | Walks the UI screens and reports canvas text that had to be squeezed or runs past its canvas |
| `meshcount.js`, `tribreak.js` | Meshes, materials and triangles per creature and per scene part |
| `sosz.js` | Each builder's code size and whether it is ever called (to find dead builders) |
| `solid.js` | Pushes the player and creatures at a building from many spots and counts any that get inside |
| `rowcheck_all.js` | After a long run, checks every row creature is still at its spot and facing the right way |
| `snap.js` and `snapdiff.py` | Dump every creature's final definition before and after a change (such as removing dead code) and diff the two |

## `size/`

`stubdead.js` replaces builders that no creature uses with a tiny stub (the `DEAD` list is the one used in the
size pass; edit it). Check with `audit/sosz.js` first, and with `snap.js` and `snapdiff.py` after.

## `edit/`: editing the one-file game

`lib.py` has small helpers for editing `index.html` safely: `load`, `save`, `sub1` (replace text that must appear
exactly once) and `span` (find a whole function by its header). `replace.py` swaps whole builders for new
versions from a file of `//@@ <header>` blocks.

## `vignettes/`

`pairs.py` is how the creature-pair vignette lines were written: a table of pairs (two codes, a gesture style, two
lines). Running it lists any pair of the cast that is missing or duplicated and prints the longest line, to check
against the speech bubble. The table is from the vignette batch, so some codes belong to creatures that have
since been replaced; the game's `VIG` table is the current one.
