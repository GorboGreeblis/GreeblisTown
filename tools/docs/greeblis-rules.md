# Greeblis games: standing rules for Claude

This private repo holds the guides, tools and readable game sources for the Greeblis VR games
(GreeblisPark, GreeblisWoods, GreeblisCity, JurassicGreeblisPark, ...). Everything is divided by game: each game
has its own folder under `guides/`, `games/` and `tools/` (see below). Read the guides before building or
changing a game.

## Rules (from the owner, apply to every game)

1. **Every game must be fully playable as a Bitcoin ordinal.** A game is one self-contained `index.html`:
   no external URLs, network requests, storage APIs, `eval` or `new Function`. It must boot under ord's
   Content-Security-Policy, both opened directly (`/content/<id>`) and inside a sandboxed `allow-scripts`
   iframe. Keep it under ~400 KB. Run the ord test (for example
   `tools/greeblis-city/test/ordtest.js`) before every push.
2. **Only `index.html` is pushed to a game repo.** Tools, sources and notes live here, in GreeblisGuides.
3. **Never cut content to save size or time.** Size and speed come from minifying, packing and smarter code.
4. **Always default to the smallest file**, even when it unpacks more slowly (see `guides/greeblis-city/ordinal-packing.md`
   and `guides/greeblis-woods/ordinal-packing.md`).
5. **Creature models and their characteristics are protected.** Never simplify a creature's shape, palette,
   signature parts or personality without asking first (see each game's `construction.md`).
6. Commit and push to the branch you are given. Open a PR when asked. If the previous PR is merged, restart
   the branch from `main`.
7. **Write down how every game's creatures and environments were built**, as guides here (a folder per game
   under `guides/<game>/`, with its `construction.md` and per-creature profiles), so the next game starts from them. Creature models and their characteristics are the
   most important part of these games.
8. **Tools count as documentation.** Every tool created and needed to make a game (build, pack, extract,
   decode, test, review, audit, analysis, porting, lint and editing scripts, configs and dev test modes) goes into
   this repo under `tools/<game>/`, with a README saying what each one does and how to run it. Don't leave tools
   only in a scratch folder.

## Creature and art rules (from the owner)

- No bones anywhere: no skeletal rigs and no bone props.
- A merge is a new, cohesive creature that blends its parents' silhouettes, palettes and signature features, never
  parts glued together. A creature rebuilt from artwork takes the artwork's shape and features; keep its current
  colour and size when asked, and ask before guessing what an ambiguous shape is.
- No cartoony smiles. Faces are expressive but understated.
- Nothing clips (into the body, the ground or another part) from any angle, including from inside buildings in VR.
- Locked models (marked "final" in their builder) are never changed without asking.
- No words on windows.

## Where things are

Each game's files live in its own kebab-case folders: `guides/<game>/`, `games/<game>/` (readable source) and
`tools/<game>/` (build, pack and test scripts). Keep new work inside your game's folders so sessions working on
different games never edit the same file; in this file and `README.md`, only add or edit your own game's rows.

| Game | Path | What |
| --- | --- | --- |
| Greeblis City | `guides/greeblis-city/construction.md` | How creatures and environments are built, budgets and pitfalls |
| Greeblis City | `guides/greeblis-city/creature-profiles.md` | Per-creature modelling notes for every Greeblis City creature |
| Greeblis City | `guides/greeblis-city/ordinal-packing.md` | How the game is minified, compressed with Roadroller and packed into a playable ordinal, and the push checklist |
| Greeblis City | `games/greeblis-city/` | Readable source (`app.js`), page template and the tuned packer options |
| Greeblis City | `tools/greeblis-city/build/` | Build script (template + source -> unpacked game HTML) |
| Greeblis City | `tools/greeblis-city/pack/` | Roadroller 8-bit patch, packer, fast decoder, page encoder, browser unpacker, stock-decoder timer |
| Greeblis City | `tools/greeblis-city/README.md` | What every Greeblis City tool does and how to run it |
| Greeblis City | `tools/greeblis-city/test/` | Playwright tests: ordinals, playthrough sim and coverage, shaders, vignettes, boot and gate checks, roster stats, pixel compare, benchmarks |
| Greeblis City | `tools/greeblis-city/review/` | Renders for checking by eye: creature portraits, faces and contact sheets, scenes, vignettes, talk, the z-fighting scan, UI and HTML overflow |
| Greeblis City | `tools/greeblis-city/lint/` | ESLint config and the dead-method/dead-key finder |
| Greeblis City | `tools/greeblis-city/dev/` | Third-person desktop/mobile test mode (`testmode.js`) and how to hook it in |
| Greeblis Park | `guides/greeblis-park/construction.md` | How Greeblis Park's creatures and world are built: roster, behaviour layers, model fixes, merging, checklist |
| Greeblis Park | `guides/greeblis-park/history.md` | Every PR (#1-#15) and the owner decisions behind them |
| Greeblis Park | `games/greeblis-park/` | Readable source (`src/`), vignette data and generator, the v17 readable source the models came from |
| Greeblis Park | `tools/greeblis-park/` | `build.js` (byte-identical rebuild), the v18 port pipeline, size and lint tools, Woods compressor copy and unpacker, emulated-Quest tests, vignette authoring scripts, the old test mode, packing experiments |
| Greeblis Woods | `guides/greeblis-woods/construction.md` | Construction toolkit, creature pipeline, full creature catalog, behaviour systems, environment, performance lessons |
| Greeblis Woods | `guides/greeblis-woods/creature-profiles.md` | Per-creature modelling notes for every Greeblis Woods character, with builder line numbers |
| Greeblis Woods | `guides/greeblis-woods/ordinal-packing.md` | Context-mixing compressor, three.js trimming, 7-bit page encoding, push checklist |
| Greeblis Woods | `guides/greeblis-woods/history.md` | Every PR (#1-#12) and the owner decisions behind them |
| Greeblis Woods | `games/greeblis-woods/` | Readable source (`game.js`), page parts, trimmed three.js and its coverage file |
| Greeblis Woods | `tools/greeblis-woods/` | All Woods tools: build, three.js trimming, CM packer and tuner, tests, performance/size/dead-code analysis, porting, vignette and visual checks, test mode |
| Greeblis Woods | `guides/greeblis-woods/tools.md` | What every Woods tool does and how to run it |
| Greeblis Town USA | `guides/greeblis-town-usa/construction.md` | (JurassicGreeblisPark) Creature toolkit, behaviour, town, set pieces, pitfalls |
| Greeblis Town USA | `guides/greeblis-town-usa/creature-profiles.md` | Per-creature notes for the Greeblis Town USA cast, with each creature's planting move and dance |
| Greeblis Town USA | `guides/greeblis-town-usa/history.md` | Every PR (#1-#39) and the owner decisions behind them |
| Greeblis Town USA | `games/greeblis-town-usa/` | Copy of the shipped page (its readable source) and size notes |
| Greeblis Town USA | `tools/greeblis-town-usa/` | Creature extraction from earlier games, safe decoding of uploads, lint, review renders and contact sheets, audits, size and editing helpers, vignette table |
| Greeblis Town USA | `tools/greeblis-town-usa/test/` | Playwright runners (desktop, mobile, ordinal sandbox) and scene tests: creatures, quests, Garden Event, church, performance |
