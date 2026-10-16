# Testing Greeblis Town

This file specifies how the game is checked: the runners, the probes, the render and measuring tools, the audits,
the lint, and the game globals the probes read. Setup is in the [tools README](../README.md#setup); the cadence
rules are in [rules.md](rules.md#working-on-it).

Contents: [When to run what](#when-to-run-what) · [Runners](#runners) · [Probes](#probes) ·
[Render and measuring tools](#render-and-measuring-tools) · [Audits](#audits) · [Lint](#lint) ·
[The game's globals](#the-games-globals) · [Writing a probe](#writing-a-probe) ·
[Headless caveats](#headless-caveats)

## When to run what

This section maps each kind of change to the checks it requires.

| Trigger | Run |
| --- | --- |
| Every edit | `npm run lint` (in `tools/`). Exactly one warning is expected: `'p' is not modified in this loop` (`no-unmodified-loop-condition`). |
| Every push | `cp index.html tools/Uncompressed/index.html`, then `test/quick.sh` with the probes for what the change touched, e.g. `test/quick.sh t_zollod.js`. The quick check includes `test/copycheck.sh` and the ordinal sandbox on desktop and mobile. About 4 minutes, plus the named probes. |
| A change to what is drawn | `Z=1 test/quick.sh` (adds the z-fighting scan) and close renders (`t_views.js`, `t_detail.js`, `portraits.js`). |
| A change that must not alter the screen | `test/pxcmp.js` against the previous build: 0 differing pixels in every view. |
| Before a release build, after a change to a whole system (the Event, the visits, the roaming, the battles), every few PRs, or on the owner's request | `test/battery.sh > test/battery.log 2>&1` (2 h and more). |

- A clean run has no `FAIL`, no `PAGEERROR` and every error count at 0. `quick.sh` and `battery.sh` end with a
  `SUMMARY` line listing every `FAIL`, `PAGEERROR`, `TIMEOUT`, `EXIT`, `STALE` or `MISSING` line, every error count
  above 0 and any lint finding beyond the known warning, and exit 1 when there is any. Words a probe prints for a
  failure of its own (`KEPT WALKING`, `SOMEWHERE BAD`, `CLIPS`, `INSIDE`, `FLAVOR LEAKED`, `MISSING`, `BAD:`) are not
  counted: read the probe's lines.
- Only one headless browser may run at a time; two at once time out.

## Runners

This section specifies the scripts that load the game and run checks on it, and the modules they share. All paths
are relative to `tools/`. Serve the repo root first (`python3 -m http.server 8765` from the repo root), or point a
runner at the file with `URL=file:///…/index.html`. Every script's header states what it does, its `Env:` settings,
its `Output:` and its command line.

| Runner | Behaviour | Settings |
| --- | --- | --- |
| `test/quick.sh [probe.js …]` | The quick check: `copycheck.sh`, the lint, `clock.js`, `boot.js` on desktop, `t_give.js` on mobile, `ordtest.js` on the root `index.html` (desktop and `MOBILE=1`), `t_shader.js` and `t_church.js`; then each named probe on its own page at 320×240 px (timeout 1800 s each); then the summary (exit 1 on any failure). Renders go to `test/x*.png`. | `VW`, `VH` (named probes' viewport); `PART` (narrows a multi-part probe); `Z=1` (adds `t_zfight.js`); `URL`. |
| `test/battery.sh` | The full battery: the quick check's core steps, then every probe marked *battery* in [Probes](#probes), one browser at a time; each probe's lines are cut at 400 characters; then the summary (exit 1 on any failure). Each section header carries the seconds elapsed. Usage: `test/battery.sh > test/battery.log 2>&1`. | `URL`. |
| `test/shot.js <url> <out.png> [scene.js]` | Loads the page in headless Chromium (SwiftShader WebGL) at 1280×720 px, or as a Pixel 7 in Chrome (Playwright's device profile, the only phone class the game supports), waits, runs the scene script with `(page, out)`, screenshots to `<out.png>`, then prints the console log and page errors (`AudioContext`, `NPOT` and console-throttle lines removed). A scene that throws ends the run with a non-zero exit. | `VW`, `VH` (ignored with `MOBILE=1`); `MOBILE=1` (the phone); `WAIT` (ms, default 6000); `NOSHOT=1` (no screenshot); `HARNESS=1` (sets `window.__gbHarness`: the game treats the browser as a Quest); `EXTRA` (Chromium flags, space-separated). |
| `test/mob.js <url> <out.png> [scene.js]` | An alias of `MOBILE=1 node test/shot.js`. | As `shot.js`. |
| `test/ordtest.js <index.html> <out.png>` | The game as an ordinal: the page file is served from memory inside `<iframe sandbox="allow-scripts">` with ord's CSP; every other request is blocked and listed. Prints the frame's origin, entity count, error count, game time, WebGL state and screen, then `blocked:` and the page errors. A pass shows every creature, 0 errors and `blocked: []`. Accepts the readable or the packed page. | `MOBILE=1` (a Pixel 7 in Chrome). |
| `test/copycheck.sh` | Checks the readable copy: `tools/Uncompressed/index.html` must match the root `index.html` byte for byte, or the root must be packed (it carries `<script type="b">`). Exit 1 when the copy is missing or stale. | None. |
| `test/clock.js [index.html]` | Extracts the actual `Re` initializer from the readable page with acorn and runs it with deterministic time and stubbed world/render services. Asserts normal active timing, no simulation/input or clock advancement while exited or blurred, continued tracked-view rendering during blurred XR, context-loss protection, and no time jump on resuming. Included in the quick check and battery; can run alone with `node test/clock.js`. | Page path defaults to `tools/Uncompressed/index.html`; requires a readable page. No browser. |
| `test/parts.js` | Helper for multi-part probes: `module.exports = require('./parts.js')({ name: async (page, out) => {…}, … })` runs each part on a freshly reloaded page under a `== part: <name>` line. | `PART=a,b` (only those parts); `WAIT` (ms after each reload). |
| `test/lib.js` | The probes' shared helpers: `start` (the start click at the centre of the view), `waitGame` (waits on game time, optionally until a condition), `closeDialogs`, `said` (a dialogue page once typed out), `render` and `savePng` (renders to PNG), `startEvent` (the Garden Event from the Summoning Stone), `logErrors` (the closing `err <n>`), `watchAncient` and `ancientReport` (the ANCIENT never plants or dances). | None. |
| `test/lib.sh` | Sourced by `quick.sh` and `battery.sh`: the section header, the runner with its `TIMEOUT` and `EXIT` lines, the core checks and the summary. | `URL`. |
| `test/browser.js` | The runners' browser setup: the SwiftShader launch flags, the desktop or Pixel 7 context, the console capture and its noise filter. | None. |

## Probes

This section lists every scene-script probe. A probe exports `async (page, out) => {}` and drives the game through
its [globals](#the-games-globals). Unless a row says otherwise, run it with
`NOSHOT=1 node test/shot.js <url> x.png test/<probe>`. Long probes run near full speed headless only at a small
viewport; the *Settings* column gives the viewport each one needs. Multi-part probes name their parts in backticks
and accept `PART`. The *Runner* column marks the probes `quick.sh` and `battery.sh` run. The desktop probes start
the game with a click at the centre of the view (`start` in `test/lib.js`); every probe ends with its error count.

**Boot and platforms**

| Probe | Checks | Settings | Runner |
| --- | --- | --- | --- |
| `boot.js` | Boot: entities by kind, every creature's name, the error count and the error box. | None. | quick, battery |
| `t_give.js` | The mobile GIVE button shows only near a creature while a Blossom is held (0, then 2 Blossoms, 2 m from GEMTOE). | `MOBILE=1`. | quick, battery |
| `t_inventory.js` | The HUD items with none, some and every item held, and after the Artifacts are glued, the Gem traded and the book given: no tile for an item not held, counts on Blossoms, Flint and Artifacts. Writes `<out>_none/_some/_all/_after.png` for inspection. | The battery passes `x_inv.png`. | battery |
| `t_shader.js` | Compiles every material the game can show (BACKPACKA, the UFO, the battle and Event pieces included) and reports shader errors. | None. | quick, battery |
| `t_errcopy.js` | The test modes' error tools: one error thrown into a frame callback, the desktop counter (bottom left) and its `copy errors` button, or the mobile panel's; prints the copied text. | Mobile: `MOBILE=1 NOSHOT=1 node test/shot.js "<url>?mobile=1" x.png test/t_errcopy.js`. | |
| `t_taps.js` | The mobile test mode's taps: a tap advances a dialogue page by page and closes it after the last; a tap off the action menu or a panel closes it. | `MOBILE=1 NOSHOT=1 node test/shot.js '<url>?mobile=1' x.png test/t_taps.js`. | |
| `t_menupos.js` | The desktop test mode's action menu sits just over the creature's head, with no sideways offset, at once, after a camera orbit and after a step. | `VW=800 VH=600`; `IDS` (creatures). | |
| `t_headguard.js` | The VR head guard (`JGP.headGuard`): signed distance to solid structures at known spots and how dark the view goes, via `JGP.headGuard.at` in place of a headset. | `VW=320 VH=240`. | battery |

**Creatures and quests**

| Probe | Checks | Settings | Runner |
| --- | --- | --- | --- |
| `talk.js` | Talks to every creature (`te`): the open screen, the largest movement of its talk animation over 2 s, its talk weight. | None. | battery |
| `t_flavor.js` | Every creature's Talk lines in turn outside the Event (the flavour line last); SPARKAKUS keeps only his quest Talk; at the Event every Talk gives only the Event line. | `VW=320 VH=240`. | battery |
| `t_battles.js` | Dance battles through the panel: a tie, a loss and a full set of wins against MONTGUMMERY (an Artifact for the first win only), a second full win, wins against ETCHER and GLYPH, bowing out; then the Library finale with all three Artifacts. | None. | battery |
| `t_battlecost.js` | Every Blossom gift takes one Blossom; a Dance battle costs a Blossom: with none held a Dancer's menu holds only Talk and no battle starts; with one, "Give a blossom" opens the battle after the thanks. | None. | battery |
| `t_gem.js` | SPARKAKUS gives the Ancient Gem after the Artifacts; GEMTOE trades the Summoning Stone for it, does her happy spin, then talks normally. | None. | battery |
| `t_pizza.js` | `lock`: the phone is blocked until MUSHROOM has a Blossom, then calls NEXTESSA for the rest of the session. `courier`: her delivery. | None. | battery |
| `t_stone.js` | The GARDEN EVENT menu at the Summoning Stone: without the Summoning Stone quest, Yes reports that the runes stay dark and nothing starts; with it, the Event starts. | None. | battery |
| `t_sparkakus.js` | `script`: his Artifacts talk, the glue bottle, his Blossom lap, the Library shelf renders. `menu`: Talk and Give a blossom from the first moment. `anywhere`: a Blossom and a Talk at home, visiting, walking home and with a visitor. `away`: the Artifacts speech away from the Library. | `VW=320 VH=240`. | battery |
| `t_zollod.js` | `shyness`: the sub-quest played through (the book is clicked on screen), and MAMA GORBO's and GEMTOE's fourth Talk lines. `away`: once freed, his shop opens wherever he is (visiting, walking home, being visited) and he holds still while it is open. | Default viewport (the click needs it). | battery |
| `t_script.js` | `lines`: ANOMALEE's sad line, MONTGUMMERY's screen, SOMLET's eyes and sleep, the Event's pizza, ZOLLOD's Event line, no Blossom option at the Event. `anomalee`: her gaze at the window, turning to the player only for her Blossom line. | `VW=320 VH=240`. | battery |
| `t_church.js` | The secret room: the way in under the right-hand Garden window and nowhere else (the game's own player collision), no creature inside, the head guard, the Ancient's Talk, Blossom, idle and talk moves, and no Blossom or Flint spawn inside. | None. | quick, battery |
| `t_library.js` | SPARKAKUS browsing: the spots he visits, never within 0.6 m of a bookcase or the banner's posts, still while talked to, out to the Event and back. | `VW=320 VH=240`. | |
| `t_avatar.js` | `walk`: the avatar's walk and idle (feet above the ground, hands clear of the skirt). `outfits`: each outfit alone and together, the fit numbers, the Sheriff's poster. | `VW=320 VH=240`. | battery |

**Movement and life**

| Probe | Checks | Settings | Runner |
| --- | --- | --- | --- |
| `t_roam.js` | The roamers (HENNRICK, GEMTOE, MAMA GORBO, GOOWARD, the three Dancers): spots visited, nobody stuck or out of bounds, trap scenarios, a MAMA GORBO and GOOWARD meeting with hearts. | `VW=320 VH=240`; `ROAM_S` (game s, default 150), `TRAP_S` (game s, default 90); the battery uses 40 and 40. | battery |
| `t_fortizmo.js` | FORTIZMO's walk behind the bar, sampled every 5 s for 40 s. | None. | battery |
| `t_nearstop.js` | Every creature walking home stops for the player 2 m away (under 0.3 m moved in 4 game s); ZOLLOD stays put while his shop is open. | `VW=320 VH=240`. | battery |
| `t_reach.js` | Every place a Flint or Blossom can appear is reachable on foot: a 0.25 m grid flooded from the player's start with the game's own player collision, checked against 4,000 sampled spawn spots and every live pickup (1.1 m pick-up radius). | None. | battery |
| `t_visits.js` | A spot and a clear route for every visitor and host, then eight visits played out: arrival, the exchange of lines, the slow walk home. Takes 30 to 60 min headless. | `VW=320 VH=240`; `VISITS=v>h,v>h` (other pairs), `VISITS=none` (plans only). | battery |
| `t_visitlive.js` | `live`: visits and vignettes as they happen unforced, with the gaps, the pairs played and the rate per hour. `counts`: how often each creature went out or was called on, and who ended off its home ground (`JGP.homeGround`). | `VW=320 VH=240`; `LIVE_S` (game s for `live`, default 300; `GAME` is read too); `VISIT_S` (game s for `counts`, default 600); `SHY=1` (ZOLLOD stays shy). | |
| `t_stuck.js` | Visits interrupted at every stage (a Talk, a Blossom, a Dance battle and bow-out, ZOLLOD's shop): every creature is back on its home ground (`JGP.homeGround`) within 150 game s. | `VW=320 VH=240`; `CASES` (e.g. `p_etcher:battle:out`). | battery |
| `t_vigall.js` | Vignettes over about 4 game hours: only side-by-side pairs play, animation and lines play separately, no pair repeats before every standing pair has had its turn, wrappers return to rest. | None. | battery |
| `t_ground.js` | Every creature's lowest point against the surface under it (`JGP.groundAt`) through idling, Talk, Blossoms, battles and a whole Garden Event; also a creature inside a building it does not work in. | `VW=200 VH=150`; `LIMIT` (m, default -0.005); `ONLY=event` (the Event only). | |
| `t_baked.js` | Animations that act on parts the build merged away (mark such a part `userData.keep`). | `VW=320 VH=240`. | |
| `soak.js` | A walk to ten spots across the town, three rounds: NaN positions, the player inside a building, errors, and renderer memory, draw calls and scene size at start and end. | None. | battery |

**The Garden Event and music**

| Probe | Checks | Settings | Runner |
| --- | --- | --- | --- |
| `t_event.js` | `planters`: every planter grows one flower at its spot, SPARKAKUS has a Talk line through it, ZOLLOD never goes back into his kiosk, and the ANCIENT never plants or dances (`FAIL` if it ever takes a pose but idle or talk, enters the Event's planting and dancing list `bt.tg`, gets an Event spot or state, or moves). `rounds`: three Events in a row; only the first grows flowers. Slow. | `VW=200 VH=150`. | battery (`planters`) |
| `t_dance.js` | `moves`: menus hold only Talk and Give a blossom, and each creature's planting and dance moves move it. `sparkakus`: his moves measured beside the others'. `funk`: frames of his funky dance and his lowest point against the ground. | `VW=320 VH=240`. | |
| `t_plants.js` | The five Event plant kinds at a whole Event: one per planter, full models within 7 m of the eye and light ones beyond, the ANCIENT never planting or dancing (the same check as `t_event.js`), game time against real time; writes `<out>_garden_near.png` and `<out>_garden_far.png`. Slow. | None. | |
| `t_jazz.js` | `floor`: KING DINO's jazz on every corner of the floor and in every battle, silent elsewhere, never with FORTIZMO's horn (prints `FAIL` where it must sound and does not). `talked`: it continues while he is talked to or given a Blossom; the pickups' respawn; the Blossom option. | `VW=320 VH=240`. | battery |
| `t_stress.js` | Systems colliding on purpose (the Event during a battle, a pizza at the start, gifts, the shop, the stone): everyone ends up home. | `VW=200 VH=150`. | |

**Rendering**

| Probe | Checks | Settings | Runner |
| --- | --- | --- | --- |
| `t_zfight.js` | Z-fighting scan: overlapping near-coplanar faces visible from the player's possible eye positions, each clash named by its two parts (colour, mesh, creature or building); unnamed scenery is located to the nearest 4 m. | `VW=320 VH=240`; `TOL` (m, default 0.006); `MINA` (m², default 0.0002); `TOP` (clashes printed, default 80); `VISALL=1` (skip the visibility test); `CREATURES=0`. | `Z=1` quick, battery |
| `t_zcheck.js` | Which scan clashes flicker on screen: each point rendered three times with the near plane nudged; changed pixels are fighting surfaces (a count under about 10 is edge noise). | `POINTS` (JSON `[[name, x, y, z], …]`); `SHOTS=1` (writes `<out>_<name>_a/b.png` for `tile.py diff`). | |
| `t_shimmer.js` | A headset's shimmer, simulated: each spot re-rendered with the head nudged 1 mm and 0.01°; changed pixels are flicker, named by what they land on; writes a heat map per spot. | `VW=320 VH=240`; `SPOTS` (JSON `{name: [x, z, yaw°, pitch°]}`); `PX` (the eye's size, px, default 1600); `THRESH` (0–255, default 40); `RAYS` (default 700). | |
| `t_vrcomfort.js` | Extracts the east fence triangles, preserving materials and UVs; measures coverage changes in the central 20% of eye columns under 1 mm translations and 0.01° rotations against a uniform background. Saves full-scene and isolated near/transition/far/back/oblique renders and per-eye draw/triangle counts. Checks translucent objects in front of and behind a near picket, and window day/night emissions; reports closed-box mesh count. Compare the same probe/settings on both builds; a diagnostic, not a headset comfort test. | `VW=320 VH=240 NOSHOT=1`; `PX` (default 1200); `EYE` (default 3.12 m); `THRESH` (default 40). | |
| `t_perf.js` | Performance at 8 spots from a VR player's eyes (far versions switched as they would be there): draw calls, triangles, the biggest draws; totals of programs, textures and geometries; a CPU profile and an allocation profile over the frames, with the GPU drained before each run. | `EYE` (m, default 3.12); `FRAMES` (default 300); `TOP` (default 25); `EVENT=1` (during an Event). | |
| `t_townview.js` | The town outside the park: a top-down map, the views out of the square, every building close up, the town's triangle and mesh counts. | `VW=320 VH=240`. | |

## Render and measuring tools

This section lists the tools that render views for inspection or measure the game. Scene scripts run under
`shot.js` like the probes.

| Tool | Behaviour | Settings |
| --- | --- | --- |
| `test/t_views.js` | Town views and creature close-ups at 800×600 px, to `<out>_<name>.png`. A target is a building collider name from `F.buildings` (offset `[right, up, front]` in the building's own frame), `parcel` or `[x, z]` (world offset), or a creature by entity id or name (world offset, near plane 0.05 m). | `VIEWS` (JSON `[[name, target, offset, look height, fov], …]`; fov default 55°, 50° for a creature); `AWAY=1` (moves the player away and waits 4 game s first: a creature turns to face a player near it). |
| `test/t_detail.js` | Close shots at 800×600 px with fog off, to `<out>_<name>.png`. | `DETAILS` (JSON `[[name, [camera x, y, z], [look x, y, z]], …]`); `HIDE=1` (hides the avatar). |
| `test/portraits.js` | Isolated portraits: each creature's builder spawned alone on open lawn, rendered at 360×360 px from two angles to `<out>_<id>_<n>.png`, then removed. | `IDS` (comma list); `SPAWN` (x,z, default `-18,24`); `ANGS` (JSON rad, default `[0.55,-2.2]`); `ELEV` (default 0.8); `DIST` (default 2.1). |
| `test/t_eval.js` | Prints the value of an expression evaluated in the running game (a string as is, else JSON), e.g. `EXPR='JGP.unfightParts.ms'`. | `EXPR` (default `Re.errors`); `AFTER_MS` (ms after the start click, default 1500; `WAIT_MS` is read too). |
| `test/pxcmp.js <urlA> <urlB>` | Two builds compared pixel by pixel in one browser: ten fixed views (seven round the park, three along the kiosks) at 640×480 px, seeded alike, with the frame loop stopped and creatures, avatar, pickups and UFO hidden. A pixel differs when a channel differs by more than 8. A lossless change shows 0 differing pixels in every view. To compare with the last commit, write it beside the readable copy (`git show HEAD:index.html > tools/old.html`, ignored by git) and load `http://localhost:8765/tools/old.html` against `http://localhost:8765/index.html`. | `OUT` (prefix of the worst view's `_a/_b/_d.ppm` files, default `pxcmp`). |
| `test/bench.js` | The build benchmark: WebGL and `requestAnimationFrame` are wrapped before the page loads, so it reads any build, old or new, the same way: draw calls and triangles per frame, CPU time per frame in the page's frame callbacks (mean, median, 95th percentile), the page's size raw and gzipped, the time to the load event, the JS heap and the page errors, with the player where the build starts them, after one start click. An old build is written beside the readable copy (`git show <commit>:index.html > tools/old.html`, ignored by git). Results go in [benchmarks.md](benchmarks.md). | `SECONDS` (measured, default 20); `SETTLE` (ms after the start click, default 8000); `MOBILE=1` (the phone context). |
| `test/cov.js <url> <out.json> <scenes…>` | Precise JS coverage (call counts) of `index.html` over a session of scene scripts run in turn, dialogues and panels closed between them; each scene's own output file is `x_<scene>.png` in the current folder. | `MOBILE=1` (Pixel 7 context); `MODT` (per-scene timeout, ms, default 600000). |
| `test/cov_extra.js` | A scene for `cov.js` that reaches what the other scenes do not: every station, every Blossom gift, every shop item, the keys, a drag, resizing, hiding the page, a long idle. | None. |
| `test/uncov.js [index.html] <cov.json…>` | The code that never ran in any session, outermost spans only, largest first, at `index.html` lines. It cuts the game script (the page's last `<script>` block) out of the page itself, exactly as the browser saw it; pass the page the coverage was recorded on (default: the repo root's `index.html`). | `TOP` (spans printed, default 400). |
| `test/tile.py sheet <out.png> <cols> <w> <h> <img…>` | Contact sheet: each image scaled to `w`×`h` px. Requires Pillow. | None. |
| `test/tile.py diff <out.png> <a.png> <b.png> [gain]` | A, B and \|A−B\|×gain (default 6) side by side; bright specks are z-fighting, scattered single pixels on fine edges are rasterisation noise. | None. |
| `test/pairs.py [index.html]` | The vignette tables (`NAMES`, `PAIRS`, `SLUG_PAIRS`): the pair count, any pair missing or duplicated, the longest line, the use of each gesture style; then the ANCIENT's exchanges, the codes missing from them and their longest line. Default page: the repo root's `index.html`. | None. |

## Audits

This section lists the scene audits. Run each with `NOSHOT=1 node test/shot.js <url> x.png audit/<audit>`; each
prints its findings (most as JSON).

| Audit | Finds | Settings |
| --- | --- | --- |
| `audit_stale.js` | Meshes whose geometry no longer fits their bounding sphere (they vanish at some angles), by scene part, parent, name and material. | None. |
| `tribreak.js` | The scene's budget: per creature the meshes, triangles and distinct materials its build holds; per top-level scene part its visible triangles (instances counted), mesh count and centre, the 30 largest; the total visible triangles and the scene's mesh count. | None. |
| `sosz.js` | Each builder's source size and whether it is called after load (dead builders). A builder used only during load shows as not called. | None. |
| `solid.js` | The church's walls: the player pushed out (`F.resolve`) from 200 random spots inside; GLYPH walked across the church, post, shop and juice buildings, with the deepest incursion. Slow (up to 7 min per walk). | None. |
| `rowcheck.js` | After a stretch of play, the creatures off their home ground (`JGP.homeGround`), or standing still at their own place and facing more than 0.3 rad off their pattern's facing; creatures on a visit, in a vignette, busy or beside the player are skipped. | `RUN_MS` (ms of play, default 40000; `RUN` is read too). |
| `uiaudit.js` | Every station, the four longest-named creatures' dialogues and a long stress line: canvas text condensed to fit or overrunning; a screenshot per screen. | None. |
| `snap.js` | A JSON dump of every live creature's definition, kind and position, SPARKAKUS's script record, the courier and the settings, written to `<out>` (e.g. `snap_before.json`, ignored by git). `NOSHOT=1` is mandatory: the screenshot would overwrite the JSON. | None. |
| `snapdiff.py <before.json> <after.json>` | Every changed, added or removed value between two `snap.js` dumps, by path: `python3 audit/snapdiff.py snap_before.json snap_after.json`. | None. |
| `study.js` | Large study renders of builders built alone, animated 60 steps, at 480×480 px from two angles, to `<out>_<label>_0/1.png`. | `SPECS` (path to a JSON file of `[[label, builder key, def, opts], …]`). |

## Lint

This section specifies the static checks in `tools/lint/`.

| File | Role |
| --- | --- |
| `lint.sh` | Cuts the game script out with `extract.py`, runs ESLint with `.eslintrc.json` and prints each finding at its `index.html` line. Run through `npm run lint`, or `sh lint/lint.sh` once ESLint is installed. |
| `extract.py` | Writes the game script (after the last bare `<script>` line) to `lint/game.js` and prints its line offset. Reads the repo root's `index.html`, or `PAGE=<path>` (`GAME` is read too); once the root is packed, point `PAGE` at `tools/Uncompressed/index.html`. |
| `.eslintrc.json` | The rule set: browser, ES2022, `THREE` read-only; correctness rules as errors, `no-unused-vars` and `no-unmodified-loop-condition` as warnings; `no-use-before-define` off (the game declares its helpers after their first use). |
| `package.json` | Pins ESLint 8.57.0 for `lint/`; `npm run lint` installs it on its first run (`--no-save`). |
| `deadprops.js` | `node lint/deadprops.js [index.html] [min name length, default 3]` (or `npm run deadprops`): properties the game defines but never reads (ESLint sees only unused local variables). Names the probes and audits (`test/`, `audit/`) use are listed separately as test hooks. A lead for a [dead-code pass](release.md#finding-dead-code), not proof. |

## The game's globals

This section lists the globals the probes read. Most are one or two letters long. A rename in the game breaks a
probe silently: confirm a name still exists (`test/t_eval.js`) before trusting a result.

| Name | Meaning |
| --- | --- |
| `It` | Entities: `It.all`, `It.byId`, `It.spawn`, `It.remove`. |
| `Re` | The frame loop: `Re.t` (game time), `Re.errors`. |
| `At` | The player. |
| `C`, `O`, `B` | The scene, the renderer, the camera. |
| `we` | The view: `we.headPos` is the player's head (in the test modes, the avatar's head, not the orbiting camera). |
| `jt` | The screen stack: `jt.top` is `playing`, `dialogue` or `panel`; `jt.has(name)`. |
| `qt` | Dialogue: `qt.open`, `qt.advance`, `qt.isOpen`. |
| `_t` | The panel (shop, battle, Summoning Stone): `_t.kind`, `_t.close()`. |
| `xe` | Menus: `xe.scan()`, `xe.actions`, `xe.actionsFor(target)`, `xe.run(verb)`, `xe.lastTarget`. |
| `te(ent, gift)` | Talk to a creature, or give it a Blossom. |
| `Xt(ent)` | A creature's builder key (some entities have no `id`). |
| `Kt` | State: `rewards`, `artifacts`, `gem`, `blossoms`, `acorns` (Flint), `owned`, `equip`, `danceWins`, `phone`, `shyFree`, `shyBook`. |
| `t` | The config: `t.player` (spawn, body radius), the park's bounds, the pizza and Event settings. |
| `F` | Colliders: `F.buildings`, `F.resolve`, `F.inHull`. |
| `E` | Keep-clear zones (pickups and roamers avoid them). |
| `uo` | Creature bodies and their pushes; `uo.fixed` holds fixed bodies. |
| `L` | Per-frame callbacks. |
| `G` | Sounds: `G.heart()`, `G.near(x, z, r, name)`. |
| `M` | The UI palette. |
| `me`, `bt`, `oe` | The Garden Event, its state (`bt.tg`: each creature's planting or dancing state; `bt.seeds`) and its menu (`oe.yes()`). |
| `Dbt` | Dance battles: `Dbt.start(ent)`, `Dbt.state`. |
| `ne`, `r`, `Eo` | The shop, its items, and the outfits it puts on the player. |
| `ue`, `s` | The pizza courier and NEXTESSA's script. |
| `le`, `ce`, `go` | Blossoms, Flint, and the spot picker for their spawns. |
| `ot` | The Portal's state. |
| `st`, `LIB`, `xo` | SPARKAKUS: his worker (`st.away()`, `st.atHome()`, `st.pos()`, `st.romping()`, `st.ent`), his talk (`LIB.talk()`, `LIB.say()`), his Event speaker. |
| `Bulb` | The light bulb over a long speech (`Bulb.level`, `Bulb.hold`). |
| `gcHorn`, `ee` | FORTIZMO's horn and her tune. |
| `gcEB` | The creature batcher. |
| `Nt`, `Ut` | Particles (`Nt.gooArc`) and floating emotes (`Ut.at`). |
| `bo` | The player's movement input. |
| `shopText`, `battleText` | The shop's and the battles' text. |
| `z.list` | Stations by `id`: `campfire` (the Summoning Stone), `gshop`, `stump` (the Library), `pool`, `phone`, `slug` (the Ancient), `shybook`. |
| `JGP` | The game layer's test exports: `garden` (`plants`, `lods`), `plantShow`, `backpacka`, `barSpot`, `groundAt`, `headGuard`, `jazz`, `meetAt`, `unfightParts`, `roamFree`, `roamWalk`, `route`, `homeGround`, `sendHome`, `visitAt`, `visits`, `visitPlan`, `vigs`, `libParts`, `libLayout`, `GARDEN_R`, `floor`, `plantMove`, `danceMove`, `slug` (the Ancient), `churchGuard`, `ufoNow`. |
| Page hooks | `window.__gbNoThrottle` (disables the console throttle), `__gbHarness` (emulates a Quest), `__jgpDk` (the desktop test mode), `__jgpMenu`, `__jgpErrLog`, `__jgpShaderErrors`. |

## Writing a probe

This section states the rules for new probes.

- Export `async (page, out) => {}`. Start the game with `start(page)` from `test/lib.js` (the click at the centre of
  the view: a click near the top edge can land on the menu bar, and the world's frame callbacks stand still while a
  menu is open), then drive the game through its globals with `page.evaluate`. Use the other `test/lib.js` helpers
  (`waitGame`, `closeDialogs`, `render`, `startEvent`, `logErrors`) rather than copies of them.
- Always wait on game time, never on wall time: headless game time runs several times slower than real time. Use
  `waitGame(page, seconds, until)`, which loops on `Re.t`.
- Fast-forward with the game's own hooks (`JGP.visitAt`, `JGP.meetAt`, `JGP.backpacka.start(Re.t - k)`) or by
  advancing its timers directly.
- Print one line per check, ending in an error count (`logErrors`); print `FAIL` for anything that must not happen,
  so the runners' summary counts it. Print with `log` from `test/lib.js`: run with `LOG=<file>`, each line is also
  written to that file the moment it is printed, so a long run cut off by a time limit still leaves every step it
  reached ([rules.md](rules.md#working-on-it), rule 9). Keep the log in the scratch folder, never in the repo, and
  delete it once the task it served is finished. Run long probes in the background with their output sent to a
  file, never through a pipe such as `| tail` that prints only at the end.
- Open the file with the standard header: what it checks in one or two sentences, `Env:` (its settings), `Output:`
  (what it prints and writes), then its command line written from `tools/`.
- Give a probe one subject. Related checks go in one file as parts (`test/parts.js`), each on a fresh page.
- Add the probe to this file and to the [tools README](../README.md#tool-index) (see
  [rules.md](rules.md#working-on-it)) and, if it guards something likely to break, to `battery.sh`.

## Headless caveats

This section lists the known differences between headless runs and the real game.

- Frame times vary by about a third between runs: count work (`t_perf.js`) and measure frame rates on a headset.
- A creature turns to face a player standing near it: move the player away (`AWAY=1`) before checking its facing.
- Never `pkill -f` a pattern that matches the calling command.
- The headless renderer has two artefacts that are not the game's: at a pitch of exactly 0° a frame differs from
  the next, and road triangles straddling the near plane lose their depth next to the camera.
