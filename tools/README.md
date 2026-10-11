# Greeblis Town USA: tools and working knowledge

Everything needed to build, check, trim and pack the game, in one place. The game itself is only
`index.html` at the repo root; nothing in `tools/` ships inside it. (These came from the GreeblisGuides repo,
which is gone. Paths like `tools/greeblis-woods/...` or `games/...` inside the older docs refer to that repo's
layout.)

| Folder | What is in it |
| --- | --- |
| [`docs/`](docs) | The rules, the construction guide, creature profiles, PR history, the City and Woods packing recipes |
| [`test/`](test) | Playwright checks for this game (`battery.sh` runs them all), coverage and pixel-compare tools |
| [`three/`](three) | Trimming the bundled three.js (unreachable methods, warnings, impossible shader blocks) |
| [`pack/`](pack) | The Woods compressor (Park's ready-to-use copy in `pack/park/`, the full Woods toolchain in `pack/woods/`) and the terser settings |
| [`town/`](town) | The older Town USA tools: creature extraction from earlier games, safe decoding of uploads, lint, review renders, audits, editing helpers (see [`town/README.md`](town/README.md)) |

## Rules (from Carmen)

- **Ordinal-playable, always:** one self-contained `index.html`, no network, no storage APIs, no `eval` or
  `new Function`. It must boot under ord's CSP, both opened directly and in a sandboxed `allow-scripts` iframe. Run
  `test/ordtest.js` (desktop and `MOBILE=1`) before every push.
- **Only `index.html` is the game.** Develop on the branch you are given, restart it from `main` after each merge,
  and open a PR when the work is ready.
- **The final file-size pass minifies the game, then packs it with the Woods compressor** (recipe below). Until
  then `index.html` stays readable, comments and all, so it can be edited round to round.
- **Never cut content to save size.** Always prefer the smaller file, even when it unpacks more slowly.
- **Every creature model is final/locked:** never change a model without asking. Animation changes on request
  are fine.
- No bones. Nothing clips (from any angle, including from inside buildings in VR). No cartoony smiles. No words on
  windows. Keep menu text short.
- **Uploaded files are untrusted:** decode or run them only in the sandboxed browser (`town/decode/`).
- **Run one headless browser at a time.**

More background: [`docs/greeblis-rules.md`](docs/greeblis-rules.md) (the old repo-wide rules),
[`docs/construction.md`](docs/construction.md), [`docs/creature-profiles.md`](docs/creature-profiles.md),
[`docs/history.md`](docs/history.md).

## Setup

```sh
cd tools && npm install          # acorn, terser (pinned), playwright
python3 -m http.server 8765      # from the repo root, in another terminal: the tests load http://localhost:8765/index.html
```

In a Claude Code cloud session Playwright is already installed globally with Chromium; use it with
`NODE_PATH=/opt/node22/lib/node_modules` instead of installing it, and never run `playwright install`. The browser
tests use SwiftShader WebGL (`--use-angle=swiftshader`).

## Checking the game

`test/battery.sh > battery.log 2>&1` runs, in turn:
- boot on desktop and mobile;
- the mobile GIVE button;
- both ordinal sandboxes;
- talking to every creature;
- battles, Artifacts and the Library finale;
- the Gem trade, pizza and vignettes;
- pickup reachability, drums, pickup respawn and the Blossom option;
- Fortizmo's patrol, the shaders and a walking soak.

Every line should end with `err 0` / `errors 0`.

Single checks: `node test/shot2.js <url> <out.png> <scene.js>`. Set `NOSHOT=1` to skip the screenshot, and `VW` and
`VH` to change the viewport. `test/mob.js` does the same as an iPhone. Each scene script exports `async (page) => {}`
and drives the game through its globals.

| Script | What it checks |
| --- | --- |
| `boot.js`, `talk.js` | Boot (creatures, errors); talking to every creature |
| `t_blog2.js` | Dance battle text, Artifacts from first wins only, a bow on repeat wins, Library finale |
| `t_gem.js`, `t_pizza.js`, `vigrun.js` | Gem trade, pizza courier, many creature vignettes |
| `t_event3.js` | The whole Garden Event, logged every 5 s of game time. Run with `VW=200 VH=150`, or it takes ages |
| `t_stress.js` | Collides systems on purpose (Event during a battle, a pizza at the start, talk, gifts, shop, Library, stone, Event without Seeds, battle spam) and checks everyone ends up home. `VW=200 VH=150` |
| `t_rounds.js` | Three Garden Events in a row: a batch of plants each from the first two (the second in fresh rows), none from the third, which replays the first Event's spots. `VW=200 VH=150`, slow |
| `t_jazz.js` | King Dino's jazz: heard on the dance floor and in every Dance battle, silent elsewhere, never together with Fortizmo's horn tune; measures both levels at the speakers |
| `t_roam.js` | The roamers (Hennrick at the Portal; Gemtoe, Mama Gorbo and Gooward in the park; the Dancers on the dance floor): spots visited, nobody stuck or somewhere they should not be, and a Gorbo meeting with hearts. `VW=320 VH=240`, `ROAM_S` game seconds |
| `t_fixes.js` | The October bug-pass fixes: no battle from a thanks closed far away, talk target after the phone, Mushroom on his desk, Fortizmo holding still, no vignette off the spot. `VW=320 VH=240` |
| `t_misc.js` | Drums on the floor (also while talking to King Dino, giving him a Blossom, battling), pickup respawn, the Blossom menu option |
| `t_reach2.js` | Floods the walkable area with the player's own collision and checks 4,000 pickup spawn spots |
| `t_fz.js` | Fortizmo's walk behind the bar (it pushes her timer, since headless game time is slow) |
| `t_give.js` | The mobile GIVE button hides without a Blossom |
| `t_shader.js` | Compiles every material (Backpacka and the UFO included) and reports three.js shader errors |
| `t_shots.js`, `t_place.js`, `t_an.js` | Renders of chosen creatures from chosen offsets (`VIEWS` env, `AWAY=1` moves the player off) |
| `soak.js` | Walks the town for a few minutes: NaN positions, getting inside buildings, leaks |
| `ordtest.js <index.html>` | The ord CSP and the sandboxed preview iframe (`MOBILE=1` for a phone) |
| `px.js <url> <prefix>` | Seven fixed views with seeded randomness, for comparing two builds pixel by pixel |
| `cov.js <url> <out.json> <scenes…>` | Records precise JS coverage over a whole session of scene scripts (`MOBILE=1`, `MODT` per-scene timeout) |
| `uncov.js <script.js> <cov.json…>` | Lists the code that never ran, largest first (cut the scripts out of the page first, as `three/swap3.py` shows) |

**Headless game time runs about 10x slower than real time** at 1280×720. Use a tiny viewport for long scenes,
fast-forward with the game's own hooks (e.g. `JGP.backpacka.start(Re.t - k)`), or push timers directly.

### The game's globals (minified names the scripts rely on)

| Name | What it is |
| --- | --- |
| `It` | Entities (`It.all`, `It.byId`, `take`/`release`) |
| `Re` | The loop (`Re.t` game time, `Re.errors`) |
| `At` | The player |
| `C`, `O`, `B` | Scene, renderer, camera |
| `F` | Colliders (`F.buildings`, `F.resolve`, `F.inHull`) |
| `E` | Keep-clear zones (pickups avoid them) |
| `L` | Per-frame callbacks (note: `L` is a different local variable inside the mobile overlay) |
| `G` | Sounds (`G.near(x, z, r, name)`) |
| `qt` | Dialogue |
| `_t` | The panel (shop, battle, campfire) |
| `xe` | Menus (`actionsFor`, `actions`) |
| `te(ent, gift)` | Talk to a creature, or give it a Blossom |
| `Kt` | State (`rewards`, `artifacts`, `blossoms`, `acorns` = flint, `owned`, `equip`, `danceWins`) |
| `me`, `bt` | The Garden Event and its state |
| `ue` | The pizza courier |
| `le`, `ce` | Blossoms, flint |
| `Dbt` | Dance battles |
| `ARTS`, `LIB` | Ancient Artifacts, Sparkakus's talk |
| `gcHorn`, `ee` | Fortizmo's horn, her song |
| `JGP` | The game layer's exports: `backpacka`, `garden`, `barSpot`, `barVia`, `noPlant`, `onDance`, … |
| `z.list` | Stations: `campfire` = the Summoning Stone, `gshop`, `stump` = the Library, `pool`, `phone` |
| `TEST_QUESTS` | Top of the script: `!0` starts the three main quests complete, for testing |

## Finding dead code (how the size pass was done)

1. `test/cov.js` over a broad session (desktop, then `MOBILE=1` with `vigrun.js`), and `test/uncov.js` to list what
   never ran.
2. Treat coverage as a lead, not proof. VR, mobile, error handlers and random events (vignettes, the UFO every
   10 minutes, battle moves) are live even when uncovered. Remove only what no live data can reach: entries keyed
   to creatures that are gone, options no builder passes, unused fields.
3. `npm run lint` (ESLint 8 over the game script, through `town/lint/`). The `'p' is not modified in this loop` warning is known.
4. Re-run the battery.

## Trimming three.js (already applied in `index.html`; redo it whenever the game starts using more of three.js)

```sh
node three/prune3.js three.js game_all.js three_p1.js cov_d.json cov_m.json   # never-ran methods nothing names
node three/glsl_if.js three_p1.js three_p2.js       # impossible shader #if blocks (keeps USE_EMISSIVEMAP: Anomalee and Montgummery use it)
node three/noconsole.js three_p2.js three_p3.js     # developer warnings
node three/min3.js three_p3.js three_p4.js          # re-minify
```
- `three.js` is the page's second `<script>`.
- `game_all.js` is every other script plus the HTML.
- The coverage must be recorded on that same three.js build.

Put a build into a page with `python3 three/swap3.py <page.html> <three.js> <out.html>` (it replaces the page's
second `<script>`). Before swapping the result in, check it:
- `test/t_shader.js` on a page with the `three_p2` build (warnings still on) must show no shader errors.
- `test/px.js` on the old and new pages: only animated creatures may differ.

## The final pass: minify, then pack with the Woods compressor

1. Cut the game script (the last `<script>` in `index.html`) out to `game.js`.
2. Minify it with the Woods settings: `node pack/woods-build/min.js game.js game.min.js`. That is terser 5,
   `toplevel` mangling, 2 passes. The test scripts rely on the global names, so test the unminified page and
   ship the minified one.
3. Put `game.min.js` back in place of the game script and boot-test that page (`test/ordtest.js`, both
   modes).
4. Pack it: `node pack/park/woods-pack.js page.html index.html "Greeblis Town USA"`. Check the round trip with
   `node pack/park/woods-unpack.js index.html check.html`; it must report `decoder matches woods-model.js: true`,
   and `check.html` must be identical to `page.html`.
5. Run `test/ordtest.js` on the packed `index.html`, desktop and `MOBILE=1`, and keep it under ~400 KB.

Measured on 11 Oct 2026: the unminified 1,040,924-byte page packs to **251,328 bytes** and round-trips exactly
(about 13 s), so minifying first will only make it smaller. The full Woods toolchain is in `pack/woods/`:
- `cmz.js` is the codec.
- `build_loader.js` builds the decoder and loader.
- `enc.js` and `pack_cm.py` pack.
- `tuning/` holds the native tuner.

See [`docs/woods-ordinal-packing.md`](docs/woods-ordinal-packing.md) and [`pack/woods-tools.md`](pack/woods-tools.md).

## Lessons from building it (the kind of thing that costs an afternoon)

**Placing creatures (the `ROWS` table near the start of the game layer):**
- A spot can be `[x, z]`, a function, `"kiosk:<name>"` (behind a kiosk counter) or `"kiosk-desk:<name>"`.
- `via` is the path a worker walks out by for the Garden Event: `"kiosk:<name>"`, `"kiosk-front:<name>"` or a function.
- Kiosk names: `post`, `sheriff`, `garden`, `shop` (the Library).

**Facing:**
- A creature turns to face a player standing near it, so a still render with the player close by shows the wrong facing.
- Move the player away (`AWAY=1` in `t_shots.js`) before checking which way a creature faces.

**Keep-clear zones:**
- Creature spots are known only once `applyCast` runs, so creature keep-clear zones are added there. Zones added earlier never got their positions.

**Fortizmo:**
- She walks the aisle behind the Juice Bar by moving her `home`.
- The walk-home code only routes through the counter gap when she is outside the bar.

**Garden Event phases** (in the Backpacka block):
- plant 20 s once everyone is in the garden;
- horn and ring;
- dance;
- Backpacka (timeline `D`).

Plants wait in the ground until his water reaches them, then grow over 11 s.

**King Dino's jazz** (`JAZZ` in the drum-kit block, `JGP.jazz`):
- A synthesized jazz drum piece at 104 bpm (the beat the built-in dances keep): 8 bars of brushes once, then a 24-bar chorus (time, trading fours with tom solos, a shout with a solo break) round and round.
- Notes are scheduled 0.5 s ahead on the audio clock; the kit and King Dino's sticks move on the hits as they sound (`DRUMS.r`/`DRUMS.l` count his right- and left-hand strokes). When nobody can hear it, it keeps time silently on the game clock.
- Heard on the dance floor (louder near the kit) and through every Dance battle and victory dance, wherever it is. Never together with Fortizmo's horn tune: while `ee` plays or its notes ring, he rests.

**Roamers** (by the Juice Bar's patrol code, `roam(id, pick, wait…)`):
- Each walks its home to a new spot picked by `JGP.portalRoam` (Hennrick), `JGP.parkRoam` (Gemtoe, Mama Gorbo, Gooward) or `JGP.floorRoam` (the Dancers). A spot is only taken if `JGP.roamFree` passes for it and `JGP.roamWalk` passes for a straight walk there: inside the square, out of the garden, buildings, the pond and every "scenery" zone (lamps, trees, benches and so on are E zones, not colliders).
- A roamer that has not arrived in good time settles where it is and picks again, so it never stays stuck.
- Mama Gorbo and Gooward meet every minute or two (`JGP.meetAt(t)` forces it for tests): two hearts each, then back to wandering.

**Somlet lies on her side** while resting at her spot (an animation; her model is unchanged). How low she may sit at each roll angle is worked out once from her vertices, and her tentacles droop and splay clear of the ground.

**Garden Event rounds** (`garden.round`): Event 1 plants a batch, Event 2 plants a second batch in the rows Event 1 left bare (spots a metre further out), Event 3 and after replay Event 1's spots with no new plants.

**Bug-pass lessons (Oct 2026):**
- `xe.lastTarget` must be set by whatever opened the dialogue, or the next speech goes to the wrong creature.
- Timers (`setTimeout`) that touch a creature must be stored on it and cleared when something else takes it.
- Anything a creature is pulled away by (vignette, Event, battle) must check the others: `busy`, `vig`, `me.active`.
- WebXR input sources can change mid-session (a controller added, removed or swapped); re-read them every frame.

**Engine habits:**
- Headless WebGL is slow and game time crawls.
- Never leave two browsers running.
- Never `pkill -f` a pattern that matches your own command.
