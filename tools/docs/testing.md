# Testing Greeblis Town

How the game is checked: the two runners, every probe and render tool, and the game globals they use. Setup is in
the [tools README](../README.md#setup).

Contents: [When to run what](#when-to-run-what) · [Runners](#runners) · [Probes](#probes) ·
[Render and measuring tools](#render-and-measuring-tools) · [Audits](#audits) · [The game's globals](#the-games-globals) ·
[Writing a probe](#writing-a-probe) · [Tips](#tips)

## When to run what

| When | Run |
| --- | --- |
| Every edit | `npm run lint` (in `tools/`). One warning is known and expected: `'p' is not modified in this loop`. |
| Between builds | `test/quick.sh`, naming the probes for what the change touched, e.g. `test/quick.sh t_zollod.js`. About four minutes, plus the named probes. |
| A change to what is drawn | `Z=1 test/quick.sh` (adds the z-fighting scan) and close renders (`t_views.js`, `t_detail.js`, `portraits.js`). |
| A change that should change nothing on screen | `test/pxcmp.js` against the previous build: 0 differing pixels in every view. |
| Once in a while | `test/battery.sh` (two hours and more): before a release build, after a change to a whole system (the Event, the visits, the roaming, the battles), every few PRs, or when the owner asks. |
| Before every push | The ordinal sandbox, desktop and mobile (both runners include it), and `test/copycheck.sh`. |

A clean run has no `FAIL`, no `PAGEERROR` and every error count at 0.

## Runners

All paths are relative to `tools/`. Serve the repo root first (`python3 -m http.server 8765` from the repo root), or
point a runner at the file with `URL=file:///…/index.html`.

| Runner | What it does |
| --- | --- |
| `test/quick.sh [probe.js …]` | The quick check: the readable copy, lint, boots on desktop and mobile (with the GIVE button), both ordinal sandboxes, the shaders and the church. Then each named probe, on its own page at 320×240. `Z=1` adds the z-fighting scan. |
| `test/battery.sh` | The full battery: every regression probe in turn, each section stamped with the seconds elapsed. `test/battery.sh > test/battery.log 2>&1`. |
| `test/shot.js <url> <out.png> [scene.js]` | Loads the page in headless Chromium on desktop (1280×720; `VW`, `VH` change it), waits `WAIT` ms (default 6000), runs the scene script, then screenshots unless `NOSHOT=1`, and prints the console log. `HARNESS=1` makes the game treat the browser as a Quest. |
| `test/mob.js <url> <out.png> [scene.js]` | The same as a Pixel 7 in Chrome, the one kind of phone the game runs on (`EXTRA` adds browser flags). |
| `test/ordtest.js <index.html> <out.png>` | The game as an ordinal: served from memory inside `<iframe sandbox="allow-scripts">` with ord's CSP, every other request blocked and listed (`MOBILE=1` for an Android phone). A pass shows every creature, 0 errors and `blocked: []`. Runs on the readable or the packed page. |
| `test/copycheck.sh` | The readable copy: `tools/index.html` must match the root `index.html` byte for byte until the final pass packs the root (exit 1 when it is missing or stale). |
| `test/parts.js` | For probes made of several parts: runs each part on a freshly reloaded page; `PART=a,b` runs only those. |

## Probes

Scene scripts export `async (page, out) => {}` and drive the game through its globals. Run each with
`node test/shot.js <url> x.png test/<probe>` unless noted; most run best at a small viewport
(`VW=320 VH=240 NOSHOT=1`), where the headless game runs near full speed. Multi-part probes list their parts.

**Boot and platforms**

| Probe | What it checks |
| --- | --- |
| `boot.js` | Boot: creatures by kind, their names, the error count and the error box. |
| `t_give.js` | The mobile GIVE button shows only while a Blossom can be given (run with `mob.js`). |
| `t_shader.js` | Compiles every material (Backpacka's included) and reports shader errors. |
| `t_errcopy.js` | The test modes' error tools: the desktop fps and error counter (bottom left) and its copy button, or the mobile panel's (`mob.js` and `?mobile=1`), and the copied text. |
| `t_taps.js` | The mobile test mode's taps: a tap moves a dialogue on and closes it after the last page; a tap off a menu or panel closes it (`mob.js` and `?mobile=1`). |
| `t_menupos.js` | The action menu's place in the desktop test mode: just over the creature's head, at once, after an orbit and after a step (`VW=800 VH=600`). |
| `t_headguard.js` | The VR head guard: distance to the nearest solid at known spots, and how dark the view goes. |

**Creatures and quests**

| Probe | What it checks |
| --- | --- |
| `talk.js` | Talking to every creature. |
| `t_flavor.js` | Every creature's Talk lines in turn (the flavour line last), SPARKAKUS's quest Talk, and only Event lines at the Event. |
| `t_battles.js` | Dance battles: the moves' text, an Artifact from first wins only, a bow on repeat wins, the Library finale. |
| `t_battlecost.js` | A Dance battle costs a Blossom: no option and no battle without one; with one, giving it opens the battle. |
| `t_gem.js` | GEMTOE's trade of the Summoning Stone for the Ancient Gem, and her happy spin. |
| `t_pizza.js` | `lock`: the phone is blocked until MUSHROOM has a Blossom, then calls NEXTESSA for the session. `courier`: her delivery. |
| `t_stone.js` | The GARDEN EVENT menu and its rule: without the Summoning Stone nothing starts; with it, it starts. |
| `t_sparkakus.js` | `script`: his Artifacts talk, the glue bottle, his Blossom lap, the shelf renders. `menu`: Talk and Give a blossom from the first moment. `anywhere`: a Blossom (the lap at home, his away line elsewhere), a Talk and his Artifacts speech at home, on a visit, walking home and with a visitor. `away`: the Artifacts speech away from the Library. |
| `t_zollod.js` | `shyness`: the sub-quest played through. `away`: once freed, his shop opened wherever he is (visiting, walking home, being visited). |
| `t_script.js` | `lines`: the owner's script in motion (ANOMALEE's sad line, MONTGUMMERY's screen, SOMLET's eyes and sleep, the Event's pizza, ZOLLOD's Event line). `anomalee`: her gaze at the window, and turning to the player only for her Blossom line. |
| `t_church.js` | The secret room: the way in under the right-hand Garden window and nowhere else, the head guard, no creature inside, and the Ancient's Talk, Blossom, idle and Talk moves. |
| `t_library.js` | SPARKAKUS browsing: the spots he visits, never near a bookcase, still when talked to, out to the Event and back. |
| `t_avatar.js` | `walk`: the avatar's walk and idle (feet above the ground, hands clear of the skirt). `outfits`: each outfit alone and together, the fit numbers, and the Sheriff's poster. |

**Movement and life**

| Probe | What it checks |
| --- | --- |
| `t_roam.js` | The roamers: spots visited, nobody stuck or out of bounds, trap scenarios, a Gorbo meeting with hearts (`ROAM_S`, `TRAP_S` game seconds). |
| `t_fortizmo.js` | FORTIZMO's walk behind the bar. |
| `t_nearstop.js` | Every creature walking home stops a while for the player coming near, then walks on. |
| `t_visits.js` | A spot and a clear way for every visitor and host, then eight visits played out: there, side by side, slowly home, through nothing (30 to 60 minutes). |
| `t_visitlive.js` | `live`: visits and vignettes as they happen on their own, with the gaps and the rate per hour. `counts`: over `VISIT_S` seconds, how often each creature went out or was called on (`SHY=1` keeps ZOLLOD shy). |
| `t_stuck.js` | Visits interrupted at every stage (a Talk, a Blossom, a battle, the shop): everyone must be home within 150 s (`CASES` picks cases). |
| `t_vigall.js` | Vignettes: only two side by side play, the animation and the lines separately, none again before its turn, wrappers back at rest. |
| `t_ground.js` | Every creature's lowest point against the surface under it through idling, Talk, Blossoms, battles and a whole Garden Event (`LIMIT`, `ONLY=event`). |
| `t_baked.js` | Animations acting on parts the build merged away (mark such a part `userData.keep`). |
| `soak.js` | A walk round the town for a few minutes: NaN positions, getting inside buildings, leaks. |

**The Garden Event and music**

| Probe | What it checks |
| --- | --- |
| `t_event.js` | `planters`: every planter grows one flower at its spot. `rounds`: three Events in a row; only the first grows flowers (`VW=200 VH=150`, slow). |
| `t_dance.js` | `moves`: menus hold only Talk and Give a blossom, and each creature's moves move it. `sparkakus`: his planting and dance measured beside the others'. `funk`: frames of his funky dance against the ground. |
| `t_plants.js` | The five Event flowers at a whole Event: one per planter, the full and light models from the garden's edge, game time against real time, renders (slow). |
| `t_jazz.js` | `floor`: KING DINO's jazz on every corner of the floor and in every battle, silent elsewhere, never with the horn (prints `FAIL` where it should sound). `talked`: it keeps going while he is talked to or given a Blossom; the pickups' respawn; the Blossom option. |
| `t_stress.js` | Systems colliding on purpose (the Event during a battle, a pizza at the start, gifts, the shop, the stone): everyone ends up home (`VW=200 VH=150`). |

**Rendering**

| Probe | What it checks |
| --- | --- |
| `t_zfight.js` | Z-fighting scan: overlapping near-coplanar faces (`TOL` 6 mm, `MINA` 2 cm²) a player's eye can see, each named by its colours, with a 4 m area for unnamed scenery. `VISALL=1` skips the visibility test; `CREATURES=0` leaves creatures out. |
| `t_zcheck.js` | Which scan clashes really flicker: `POINTS` rendered three times with the near plane nudged; changed pixels are fighting surfaces (under about 10 is edge noise). `SHOTS=1` writes the pairs for `tile.py diff`. |
| `t_shimmer.js` | A headset's shimmer, simulated: the view re-rendered with the head nudged a millimetre and a hundredth of a degree; pixels that change are flicker, named by what they land on (`SPOTS`, `THRESH`, `PX`, `RAYS`). |
| `t_perf.js` | Performance: draw calls, triangles and the biggest draws from 8 spots; totals of programs, textures and geometries; a CPU profile and an allocation profile over `FRAMES` frames (`EVENT=1` during an Event). |
| `t_townview.js` | The town outside the park: a top-down map, the views out of the square, every building close up, and the town's triangle and mesh counts. |

## Render and measuring tools

| Tool | What it does |
| --- | --- |
| `test/t_views.js` | Renders town views: `VIEWS` is a building collider's name, `parcel` or `[x, z]`, with offsets; `AWAY=1` moves the player off. |
| `test/t_detail.js` | Close shots: `DETAILS` is a JSON list of `[name, [camera x,y,z], [look x,y,z]]`, each at 800×600, fog off; `HIDE=1` hides the avatar. |
| `test/t_shots.js` | Creatures from chosen offsets (`VIEWS`; `AWAY=1` moves the player off). |
| `test/portraits.js` | Isolated portraits of creatures (`IDS`) on open lawn (`SPAWN=x,z`), two angles each. |
| `test/t_eval.js` | Prints any expression: `EXPR='JGP.unfightParts.ms'`. |
| `test/pxcmp.js <urlA> <urlB>` | Two builds compared pixel by pixel: ten fixed views, seeded alike, everything that moves with time hidden. A lossless change shows 0 differing pixels in every view; `OUT=x` writes the worst view as A, B and the difference. |
| `test/cov.js <url> <out.json> <scenes…>` | Precise JS coverage over a session of scene scripts (`MOBILE=1`; `MODT` is the per-scene timeout). |
| `test/cov_extra.js` | A scene for `cov.js` that pokes everything the others don't: every station, every gift, every shop item, the keys, resizing, hiding the page. |
| `test/uncov.js <script.js> <cov.json…>` | The code that never ran, largest first (cut the game script out of the page first). |
| `test/tile.py` | Contact sheets of renders (`sheet`) and amplified before/after differences (`diff`). Needs Pillow. |
| `test/pairs.py [index.html]` | The vignette tables: the pair count, any pair missing or doubled, the longest line and how often each gesture is used. |

## Audits

Run from `tools/audit/` with `NOSHOT=1 node ../test/shot.js <url> x.png ./<audit>`.

| Audit | What it finds |
| --- | --- |
| `audit_stale.js` | Meshes whose bounds no longer contain their geometry (they vanish at some angles). |
| `meshcount.js` | Meshes, materials and triangles per creature. |
| `tribreak.js` | Visible triangles, meshes and centre per top-level scene part (the 30 largest, and the total). |
| `sosz.js` | Each builder's code size and whether it is called after load (dead builders). |
| `solid.js` | The church's walls: the player pushed out from 200 spots inside, and GLYPH walked at four buildings (slow). |
| `rowcheck.js` | After `RUN` ms, creatures more than 0.5 m off their spot, moving, or facing wrong. |
| `uiaudit.js` | Every station and long names: canvas text squeezed to fit, with a screenshot of each screen. |
| `snap.js`, `snapdiff.py` | A JSON dump of every creature's definition and the game's settings before and after a change, and a diff of the two by path. |
| `study.js` | Large study renders of builders built alone, animated and shot from two angles (`SPECS`: a JSON list of `[label, builder key, def, opts]`). |

`lint/deadprops.js [index.html]` lists properties the game defines but never reads (apart from those the tests
read): a lead for a dead-code pass, not proof.

## The game's globals

The probes read the game through its globals. Most are one or two letters long; a rename in the game breaks a probe
silently, so check a name still exists before trusting a result.

| Name | What it is |
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
| `Kt` | State: `rewards`, `artifacts`, `gem`, `blossoms`, `acorns` (flint), `owned`, `equip`, `danceWins`, `phone`, `shyFree`, `shyBook`. |
| `t` | The config: `t.player` (spawn, body radius), the park's bounds, the pizza and Event settings. |
| `F` | Colliders: `F.buildings`, `F.resolve`, `F.inHull`. |
| `E` | Keep-clear zones (pickups and roamers avoid them). |
| `uo` | Creature bodies and their pushes; `uo.fixed` holds fixed bodies. |
| `L` | Per-frame callbacks. |
| `G` | Sounds: `G.heart()`, `G.near(x, z, r, name)`. |
| `M` | The UI palette. |
| `me`, `bt`, `oe` | The Garden Event, its state (`bt.tg`: each creature's planting or dancing state, `bt.seeds`) and its menu (`oe.yes()`). |
| `Dbt` | Dance battles: `Dbt.start(ent)`, `Dbt.state`. |
| `ne`, `r`, `Eo` | The shop, its items, and the outfits it puts on the player. |
| `ue`, `s` | The pizza courier and NEXTESSA's script. |
| `le`, `ce`, `go` | Blossoms, flint, and the spot picker for their spawns. |
| `ot` | The Portal's state. |
| `st`, `LIB`, `xo` | SPARKAKUS: his worker (`st.away()`, `st.atHome()`, `st.pos()`, `st.romping()`, `st.ent`), his talk (`LIB.talk()`, `LIB.say()`), and his Event speaker. |
| `Bulb` | The light bulb over a long speech (`Bulb.level`, `Bulb.hold`). |
| `gcHorn`, `ee` | FORTIZMO's horn and her tune. |
| `gcEB` | The creature batcher. |
| `Nt`, `Ut` | Particles (`Nt.gooArc`) and floating emotes (`Ut.at`). |
| `bo` | The player's movement input. |
| `shopText`, `battleText` | The shop's and the battles' text. |
| `z.list` | Stations by `id`: `campfire` (the Summoning Stone), `gshop`, `stump` (the Library), `pool`, `phone`, `slug` (the Ancient), `shybook`. |
| `JGP` | The game layer's exports for tests: `garden` (`plants`, `lods`), `plantShow`, `backpacka`, `barSpot`, `groundAt`, `headGuard`, `jazz`, `meetAt`, `unfightParts`, `roamFree`, `roamWalk`, `route`, `homeGround`, `sendHome`, `visitAt`, `visits`, `visitPlan`, `vigs`, `libParts`, `libLayout`, `GARDEN_R`, `floor`, `plantMove`, `danceMove`, `slug` (the Ancient), `churchGuard`, `ufoNow`. |
| Page hooks | `window.__gbNoThrottle` (stops the console throttle), `__gbHarness` (pretend to be a Quest), `__jgpDk` (the desktop test mode), `__jgpMenu`, `__jgpErrLog`, `__jgpShaderErrors`. |

## Writing a probe

- Export `async (page, out) => {}`; click into the page first (`page.mouse.click` at the middle of the view), then
  drive the game through its globals with `page.evaluate`.
- **Wait on game time, not wall time.** Headless game time runs several times slower than real time, so loop on
  `Re.t` (see any probe's `waitGame`).
- Print one line per check, ending in an error count; print `FAIL` for anything that must not happen.
- Give a probe one subject. Several related checks go in one file as parts (`test/parts.js`), each on a fresh page.
- Add it to the README's tables (the [rules](rules.md#working-on-it)) and, if it guards something likely to break,
  to the battery.

## Tips

- Use a small viewport for long scenes (`VW=320 VH=240`; `VW=200 VH=150` for the slowest). Fast-forward with the
  game's own hooks (`JGP.visitAt`, `JGP.meetAt`, `JGP.backpacka.start(Re.t - k)`) or push its timers directly.
- Headless frame times vary by a third from run to run: count work (`t_perf.js`) and measure frame rates on a real
  headset.
- A creature turns to face a player standing near it: move the player away (`AWAY=1`) before checking which way it
  faces.
- Two headless browsers at once time out. Never `pkill -f` a pattern that matches your own command.
- The headless renderer has two artefacts: at a pitch of exactly 0° a frame differs from the next for no reason, and
  road triangles straddling the near plane lose their depth next to the camera. Neither is the game.
