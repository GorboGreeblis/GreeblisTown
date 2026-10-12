# Greeblis Town USA: tools

Everything used to build, check, trim and pack the game. The game itself is only `index.html` at the repo root;
nothing in `tools/` ships inside it. The rules are in [`docs/greeblis-rules.md`](docs/greeblis-rules.md).

| Folder | What is in it |
| --- | --- |
| [`docs/`](docs) | The rules, how the game is built, creature profiles, PR history, and the learnings from the earlier games |
| [`test/`](test) | Playwright checks (`battery.sh` runs the main ones), coverage, pixel-compare and render tools |
| [`three/`](three) | Trimming the bundled three.js |
| [`pack/`](pack) | Minify settings and the Woods compressor |
| [`town/`](town) | Older tools: creature extraction from earlier games, safe decoding of uploads, lint, review renders, audits, editing helpers (see [`town/README.md`](town/README.md)) |

## Setup

```sh
cd tools && npm install          # acorn, terser 5.31.0 (pinned), playwright
python3 -m http.server 8765      # from the repo root, in another terminal: the tests load http://localhost:8765/index.html
```

- `package.json` pins the tools' own packages and has two scripts: `npm test` runs the battery, `npm run lint`
  runs the lint (below).
- `.gitignore` keeps `node_modules`, renders, logs, the lint's cut-out script and the battery's `test/x*` images
  out of git.
- Where Playwright and its Chromium are already installed globally (as in a cloud session), point Node at them
  with `NODE_PATH=$(npm root -g)` instead, and don't run `playwright install`.
- The browser tests render with SwiftShader WebGL (`--use-angle=swiftshader`).

## Checking the game

`test/battery.sh > test/battery.log 2>&1` runs, one browser at a time: boot on desktop and on mobile (with the GIVE
button); both ordinal sandboxes; talking to every creature; battles, Artifacts and the Library finale; the Gem
trade; pizza; vignettes; pickup reachability; the jazz on the floor, pickup respawn and the Blossom option;
Fortizmo's patrol; the shaders; a walking soak; King Dino's jazz; Somlet asleep; the roamers; the avatar's walk;
the VR head guard; Sparkakus browsing; the church's secret room and its slug; a Dance battle's Blossom; the phone lock; and the z-fighting
scan. Every line should end with
`err 0` / `errors 0`.

| Runner | What it does |
| --- | --- |
| `test/battery.sh` | The battery above (`URL` overrides the page) |
| `test/shot2.js <url> <out.png> <scene.js>` | Loads the page on desktop (1280×720; `VW`, `VH` change it), waits `WAIT` ms (default 6000), runs the scene script, then screenshots unless `NOSHOT=1` |
| `test/mob.js <url> <out.png> <scene.js>` | The same as an iPhone 13 (`EXTRA` adds browser flags) |
| `test/ordtest.js <index.html> <out.png>` | The game as an ordinal: served from memory inside `<iframe sandbox="allow-scripts">` with ord's CSP, every other request blocked and listed (`MOBILE=1` for an Android phone). A pass shows every creature, 0 errors and `blocked: []` |

A scene script exports `async (page, outPath) => {}` and drives the game through its globals (below). Unless a
row says otherwise, run it with `shot2.js`.

| Scene script | What it checks |
| --- | --- |
| `boot.js`, `talk.js` | Boot (creatures by kind, names, errors); talking to every creature |
| `t_give.js` | The mobile GIVE button hides without a Blossom (run with `mob.js`) |
| `t_blog2.js` | Dance battle text, an Artifact from first wins only, a bow on repeat wins, the Library finale |
| `t_gem.js`, `t_pizza.js`, `vigrun.js` | The Ancient Gem trade, the pizza courier, many creature vignettes |
| `t_reach2.js` | Floods the walkable area with the player's own collision and checks 4,000 pickup spawn spots |
| `t_misc.js` | King Dino's jazz on the floor (also while he is talked to, given a Blossom, in a battle), pickup respawn, the Blossom menu option |
| `t_fz.js` | Fortizmo's walk behind the bar (it pushes her timer, as headless game time is slow) |
| `t_shader.js` | Compiles every material (Backpacka included) and reports three.js shader errors |
| `soak.js` | Walks the town for a few minutes: NaN positions, getting inside buildings, leaks |
| `t_jazz.js` | King Dino's jazz: heard on every corner of the dance floor and in every Dance battle, silent elsewhere, never with Fortizmo's horn tune; measures both at the speakers and prints FAIL where the jazz should sound and does not |
| `t_somlet.js` | Somlet asleep on her side: her lowest point stays above the ground resting and getting up (`SHOTS=<prefix>` for renders) |
| `t_roam.js` | The roamers: spots visited, nobody stuck or somewhere they should not be, trap scenarios, a Gorbo meeting with hearts. `VW=320 VH=240`, `ROAM_S`/`TRAP_S` game seconds |
| `t_plants.js` | The new flowers at a whole Garden Event: one plant per planter, by kind; how many show the full or the light model from the garden's edge; what the slug did; game time against real time (a slow-down means the plants cost too much); renders of the grown garden. Slow |
| `plantshots.js` | Renders each plant kind from four views (`JGP.plantShow`) for checking against the owner's photos. `ONLY=1,3` |
| `t_church.js` | The church's secret room: in through the wall under the right-hand Garden window (the little X) and nowhere else, the head guard, no creature inside, and the slug: one Talk (no Blossom), its idle and Talk moves, never leaving its spot |
| `churchshots.js` | Renders the way in from outside and the secret room (down the nave, the slug, the ceiling) |
| `t_battlecost.js` | A Dance battle costs a Blossom: no Blossom option (and no battle from a gift) with none in hand; with one, giving it empties the hand and opens the battle |
| `t_phone.js` | The phone is locked (its connection to the Portal is blocked) until Mushroom has a Blossom, then calls Nextessa for the rest of the session |
| `t_script.js` | The owner's script, the parts that move: Sparkakus's Artifacts talk and the glue bottle putting the Gem together, his Blossom lap on all fours (clear of every bookcase), and renders of the Library's face-out books and Wish Blossom and the Sheriff's posters. `VW=320 VH=240` |
| `dance-plant.js` | Planting and dancing are animations, not menu options: every menu holds only Talk (and Give a blossom), each creature's moves move it, and at the Event they plant, then dance while Fortizmo plays. Slow |
| `portraits.js` | Isolated portraits of creatures (`IDS`) on open lawn (`SPAWN=x,z`), two angles each |
| `topview.js` | The whole town from straight above |
| `t_avatar.js` | The avatar's walk and idle in the test modes: side renders mid-stride and standing, feet above the ground, hands clear of the skirt |
| `t_headguard.js` | The VR head guard: distance to the nearest solid at known spots and how dark the view goes (through its test probe, as VR can't run headless). `VW=320 VH=240` |
| `t_library.js` | Sparkakus browsing his Library: the spots he visits, never within 0.6 m of a bookcase or the posts, still when talked to, out to the Garden Event and back. `VW=320 VH=240` |
| `t_zfight.js` | Z-fighting scan: every depth-written triangle grouped by plane (normals folded by their largest component); overlapping near-coplanar pairs (`TOL` 6 mm, `MINA` 2 cm²) are kept only if a point in the overlap can be seen from where the player's eyes can be (a ray test through a 2 m grid, as the trimmed three.js has no raycaster; `VISALL=1` skips it, `CREATURES=0` leaves creatures out). Each clash is named by its triangles' own vertex colours, plus a 4 m area for unnamed scenery, with points inside it |
| `t_zcheck.js` | Which scan clashes really flicker: `POINTS` (JSON `[name, x, y, z]`) rendered three times from a player eye with the near plane nudged a fraction of a millimetre. Nothing moves, so changed pixels are surfaces fighting; under ~10 is edge noise. `SHOTS=1` writes the pairs for `tile.py diff` |
| `t_event3.js` | The whole Garden Event, logged every 5 s of game time. `VW=200 VH=150`, or it takes ages |
| `t_rounds.js` | Three Garden Events in a row: only the first grows flowers (one per planter); the second and third replay the same spots and leave the garden unchanged. `VW=200 VH=150`, slow |
| `t_stress.js` | Collides systems on purpose (Event during a battle, a pizza at the start, talk, gifts, shop, Library, stone, Event without Seeds, battle spam) and checks everyone ends up home. `VW=200 VH=150` |
| `t_fixes.js` | The October bug-pass fixes: no battle from a thanks closed far away, talk target after the phone, Mushroom on his desk, Fortizmo holding still, no vignette off the spot. `VW=320 VH=240` |
| `t_anomalee.js` | Anomalee keeps gazing at the window with the player close and through Talk; turns to the player for her Blossom line and for Talk at the Event |
| `t_ground.js` | Every creature's lowest point against the real surface under it (`JGP.groundAt`) through idling, Talk, Blossoms, battles and a whole Garden Event, with where each worst dip happened; flags any creature inside a building. `VW=200 VH=150`, `LIMIT` (default −5 mm), `ONLY=event` |
| `t_goo.js` | The goo splats on the screen: flickering pixels with the old shared draw order against the fixed one |
| `t_perf.js` | Performance profile: draw calls, triangles and the biggest draws from a player's eyes at 8 spots; totals of programs, textures, geometries, meshes, materials; a DevTools CPU profile (self time by function and line of `index.html`) and a sampled allocation profile over `FRAMES` frames (`EVENT=1` during a Garden Event) |
| `t_views.js` | Renders chosen town views (`VIEWS`: a building collider name, `parcel` or `[x, z]`, with offsets; `AWAY=1` moves the player off) |
| `t_shots.js` | Renders chosen creatures from chosen offsets (`VIEWS`; `AWAY=1` moves the player off) |
| `t_eval.js` | Prints any expression (`EXPR`), e.g. `EXPR='JGP.unfightParts.ms'` |

| Other tool | What it does |
| --- | --- |
| `test/px.js <url> <prefix>` | Seven fixed views with seeded randomness, for comparing two builds pixel by pixel |
| `test/cov.js <url> <out.json> <scenes…>` | Records precise JS coverage over a whole session of scene scripts (`MOBILE=1`, `MODT` per-scene timeout) |
| `test/cov_extra.js` | A scene for `cov.js`: pokes everything the others don't (every station, every Blossom gift, every shop item, the keys, resizing, hiding the page) |
| `test/uncov.js <script.js> <cov.json…>` | Lists the code that never ran, largest first (cut the script out of the page first, as `three/swap3.py` shows) |
| `test/tile.py` | Contact sheets of renders (`sheet`) and amplified before/after differences (`diff`). Needs Pillow |
| `pack/size.js [index.html] [outdir]` | What the page weighs at each release step: readable, minified (the release terser settings) and packed into the ordinal (round trip checked), with the intermediate pages written out for boot tests |
| `town/lint/deadprops.js [index.html]` | Properties the game defines but never reads (object keys, methods, `x.name =` assignments), apart from those only the tests read: a lead for the dead-code pass |

**Tips:**
- Headless game time runs about 10× slower than real time at 1280×720. Use a tiny viewport for long scenes,
  fast-forward with the game's own hooks (e.g. `JGP.backpacka.start(Re.t - k)`), or push timers directly, and wait
  on game time (`Re.t`), not wall time.
- A creature turns to face a player standing near it, so move the player away (`AWAY=1`) before checking which
  way it faces.
- Two headless browsers at once time out. Never `pkill -f` a pattern that matches your own command.

### The game's globals (minified names the scripts rely on)

Check a name still exists before trusting a result: a rename in the game breaks the scripts silently.

| Name | What it is |
| --- | --- |
| `It` | Entities (`It.all`, `It.byId`, `take`/`release`) |
| `Re` | The loop (`Re.t` game time, `Re.errors`) |
| `At` | The player |
| `C`, `O`, `B` | Scene, renderer, camera |
| `we` | The view: `we.headPos` is the player's head (in the desktop and mobile test modes, the avatar's head, not the orbiting camera) |
| `F` | Colliders (`F.buildings`, `F.resolve`, `F.inHull`) |
| `E` | Keep-clear zones (pickups avoid them) |
| `L` | Per-frame callbacks (`L` is a different local variable inside the mobile overlay) |
| `G` | Sounds (`G.near(x, z, r, name)`) |
| `qt` | Dialogue |
| `_t` | The panel (shop, battle, Summoning Stone) |
| `xe` | Menus (`actionsFor`, `actions`, `lastTarget`) |
| `te(ent, gift)` | Talk to a creature, or give it a Blossom |
| `Kt` | State (`rewards`, `artifacts`, `blossoms`, `acorns` = flint, `owned`, `equip`, `danceWins`, `gem`, `phone`: the phone unlocked by Mushroom's Blossom) |
| `me`, `bt` | The Garden Event and its state (`bt.tg`: each creature's planting or dancing state) |
| `ue` | The pizza courier |
| `le`, `ce` | Blossoms, flint |
| `Dbt` | Dance battles |
| `ARTS`, `LIB` | Ancient Artifacts, Sparkakus's talk |
| `gcHorn`, `ee` | Fortizmo's horn, her tune |
| `st` | The Library's worker, Sparkakus (`away()`, `pos()`) |
| `JGP` | The game layer's exports: `garden` (`plants`, `lods`: each plant's full and light mesh), `plantShow`, `backpacka`, `barSpot`, `barVia`, `noPlant`, `onDance`, `groundAt`, `headGuard`, `jazz`, `meetAt`, `unfightParts`, `roamFree`, `roamWalk`, `slug` and `eventMove` (the church's slug and the Event move it follows), `churchGuard`, `ufoNow` (a UFO pass now), … |
| `z.list` | Stations: `campfire` = the Summoning Stone, `gshop`, `stump` = the Library, `pool`, `phone`, `slug` |

## Finding dead code (how the size pass was done)

1. `test/cov.js` over a broad session (desktop, then `MOBILE=1` with `vigrun.js`), and `test/uncov.js` to list what
   never ran.
2. Treat coverage as a lead, not proof. VR, mobile, error handlers and random events (vignettes, the UFO every
   10 minutes, battle moves) are live even when uncovered. Remove only what no live data can reach: entries keyed
   to creatures that are gone, options no builder passes, unused fields.
3. `town/lint/deadprops.js` lists properties nothing reads (ESLint only sees unused local variables).
4. `npm run lint`: ESLint 8 over the game script, through `town/lint/`. There, `extract.py` cuts the game script
   out of `index.html` into `block6.js` (keeping line numbers aligned), `lint.sh` runs ESLint with
   `.eslintrc.json` and prints each finding at its `index.html` line, and `package.json` lists ESLint 8 for that
   folder. The `'p' is not modified in this loop` warning is known.
5. Re-run the battery, and measure with `pack/size.js`.

## Trimming three.js

Already applied in `index.html`; redo it whenever the game starts using more of three.js.

```sh
node three/prune3.js three.js game_all.js three_p1.js cov_d.json cov_m.json   # never-ran methods nothing names
node three/glsl_if.js three_p1.js three_p2.js       # impossible shader #if blocks (keeps USE_EMISSIVEMAP: Anomalee and Montgummery use it)
node three/noconsole.js three_p2.js three_p3.js     # developer warnings
node three/min3.js three_p3.js three_p4.js          # re-minify (toplevel off, so `var THREE` stays global)
```

`three.js` is the page's second `<script>`, `game_all.js` every other script plus the HTML, and the coverage must
be recorded on that same three.js build. Put a build into a page with
`python3 three/swap3.py <page.html> <three.js> <out.html>` (it replaces the page's second `<script>`). Before
swapping the result in:
- `test/t_shader.js` on a page with the `three_p2` build (warnings still on) must show no shader errors;
- `test/px.js` on the old and new pages: only animated creatures may differ.

## The final pass: release, minify, pack

1. Nothing to switch off: the game starts with no quest or item progress (the testing head start, `TEST_QUESTS`,
   was removed; the tests give themselves what they need, e.g. `Kt.rewards.stone = Kt.rewards.seeds = !0`).
2. Cut the game script (the last `<script>` in `index.html`) out to `game.js`.
3. Minify it: `node pack/woods-build/min.js game.js game.min.js` (terser 5, `toplevel` mangling, 2 passes). The
   test scripts rely on the global names, so test the unminified page and ship the minified one.
4. Put `game.min.js` back in place of the game script and boot-test that page (`test/ordtest.js`, both modes).
5. Pack it: `node pack/park/woods-pack.js page.html index.html "Greeblis Town USA"`. Check the round trip with
   `node pack/park/woods-unpack.js index.html check.html`: it must report `decoder matches woods-model.js: true`,
   and `check.html` must be identical to `page.html`.
6. Run `test/ordtest.js` on the packed `index.html`, desktop and `MOBILE=1`, and keep it under ~400 KB. The full
   push checklist is in [`docs/learnings.md`](docs/learnings.md#checks-before-every-push).

Measured on 11 Oct 2026 with `pack/size.js`: the readable 1,135,495-byte page minified to 782,141 bytes and packed to
209,133 bytes, round-tripped exactly (minifying first only makes the packed page smaller).

| Pack tool | What it does |
| --- | --- |
| `pack/woods-build/min.js <in.js> <out.js>` | Minifies the game script with the Woods terser settings |
| `pack/park/woods-model.js` | The Woods decoder model, copied verbatim from the shipped Woods page |
| `pack/park/woods-pack.js <page.html> <out.html> "<title>"` | Packs a page: the decoder model turned into an encoder (the arithmetic decoder's two lines swapped for the encoder's), so the page's own decoder unpacks it bit for bit |
| `pack/park/woods-unpack.js <packed.html> <out.html>` | Unpacks with the page's own decoder and says whether it matches `woods-model.js` |
| `pack/woods/cmz.js` | The full Woods codec source, one generator shared by encoder and decoder |
| `pack/woods/build_loader.js` | Builds `codec.min.js` (full codec), `decoder.min.js` (the decode-only codec that ships) and `loader.min.js` (from the template `loader_src.js`: unpacks the 7-bit text, runs the decoder with a `LOADING nn%` readout, writes the page) |
| `pack/woods/enc.js <page.html> <out.bin>` | Compresses with the full codec and checks a byte-exact round trip with the decode-only codec (needs `build_loader.js` first) |
| `pack/woods/pack_cm.py <page.html> "<title>" <index.html>` | Compresses through `enc.js` and writes the 7-bit ordinal page |
| `pack/woods/tuning/cmzx.c`, `tunex.py` | A native research encoder for trying settings fast: `gcc -O2 -ffp-contract=off -DNATIVE -o cmzx cmzx.c -lm`, then `python3 tunex.py ./cmzx page.html "" "NC=11" "TB=23 LRK=0.5"` prints the size per setting (NC, TB, LIMS, LIMF, LRK, FB, WI, RUN, CHK, FSEL, L1M, L2M, LFM). Its defaults are not the shipped model: port a winning setting into `cmz.js` and re-check the round trip |

How the codec and the page encoding work, and why this route was chosen, is in
[`docs/learnings.md`](docs/learnings.md#4-ordinal-packing).
