# Greeblis games: the most important learnings

Drawn from Greeblis City, Greeblis Park and Greeblis Woods (their guides, readable sources and tools in the
GreeblisGuides repo, and the final builds the owner uploaded on 11 Oct 2026), checked against Greeblis Town USA
(the 4th game). Paths are relative to the GreeblisGuides repo unless they start with `greeblistown/` (this repo).
Line numbers point into the readable sources there: `games/greeblis-city/app.js`, `games/greeblis-woods/game.js`
and `games/greeblis-park/src/*.js`. See "The final builds" at the end for how the uploads compare with them.
Items marked **[Worth bringing to Town]** are things City, Park or Woods do that Town USA does not do yet.

---

## Top 15 rules of thumb

1. **Creatures come first.** Every guide opens with this rule. Each creature has its own builder, its own
   silhouette, colour, voice, emotes and sound, and one signature part you can read from 10-15 m away
   (`guides/greeblis-city/construction.md` §Rules; `guides/greeblis-woods/construction.md` checklist).
2. **Port a creature byte for byte, and prove it.** Hennrick has moved through all four games unchanged. Check a port
   with a side-by-side render (`tools/greeblis-woods/visual/hencmp.js`) or a mesh, position and bounds equivalence check
   (Town's `extract/equiv.js`). Copy the helpers the model reaches, and cut code that can never run in the new game.
   Park #14 found City dance code in Hennrick that "would have crashed if it ran".
3. **Place parts from the surface, never by eye.** Use the analytic ellipsoid normal or a ray-march (City), `hit()` on
   the blob SDF (Town), or move buried pupils and noses out until their centre is on the skin (Park). Most model bugs
   in Park were parts in the wrong place relative to the body.
4. **Keep only moving parts separate. Merge the rest, then prove nothing animated got frozen.** City and Woods run
   the `Pt` dry run and `Gt` merge, Town runs `KIT.animated` and `KIT.compact`, and Woods checks the result with
   `test/frozen.js`.
5. **Stub every side effect in the dry run, and start every timer inside its window.** City sprayed 84 goo blobs at
   load. Woods sprayed goo at load again (#11), and Gratelet never blinked because his first blink fell after the
   dry run's t = −36..0 window.
6. **Never mutate a cached or shared material.** Clone it, or pass `unique: true`. All three games hit this (City
   pitfall table; Park "recolouring one part recolours every part"; Woods `unique: true` rule).
7. **No two faces in one plane.** Offset by at least 1 cm, and check from inside buildings, because materials default
   to DoubleSide (`games/greeblis-woods/page/05-patch.js`; Park `src/02-double-sided.js`). Park fixes this
   automatically at load (`48-scenery-polish.js`), and Town now does too (`unfightParts`).
8. **Draw calls are the Quest bottleneck, and VR doubles them.** Batch creature parts (`gcEB`, 32 per draw), merge
   static scenery by material and area, instance anything repeated, and cull instances by view cone.
9. **Animate transforms, not geometry. Never allocate per frame.** Sparky's 54k triangles came from tubes rebuilt every
   frame. Woods #12 and Park #15 both removed per-frame allocations from the loop.
10. **Seed everything and pixel-compare every optimisation.** Woods' trimmed engine dropped an unexported
    `THREE.X`, so no trees were drawn at all. Only the pixel compare caught it; triangle counts did not.
11. **Smallest file wins, and no content is cut.** Park #11 cut Hennrick and lore lines for size, and #12 had to bring
    them back. The Woods CM compressor beat Roadroller (Park #8, #10).
12. **The ordinal is the real target.** Use 7-bit text in `<script type=b>`, no `fetch` of your own page (Park #8 was
    reverted by #9), no storage, and no network. Test the direct `/content/` page and the sandboxed `/preview/`
    iframe, each in desktop and Quest mode.
13. **Detect a frame that blocks VR, and link out.** Explorer iframes don't grant `xr-spatial-tracking`, so say so and
    rewrite `/preview/` to `/content/` (Woods `gcXrAllowed`/`gcXrLink`, game.js 2820-2843).
14. **Every pair of creatures gets one unique scene and one rare two-line exchange.** The talk rate settled at
    10-15%. Validate the whole table by script (Woods `vignette/validate.js`, City `talkcheck.js`).
15. **Test modes are temporary.** City, Park, Woods and Town each added a third-person desktop/mobile mode, and the
    first three removed it before shipping. Keep test hooks behind `/*<dbg>*/` markers that the build strips and
    asserts are gone (Woods).

---

## 1. Creature construction

### 1.1 Toolkits (same lineage, four generations)

| Need | City / Woods (shared engine) | Park | Town USA |
| --- | --- | --- | --- |
| Place a mesh | `H(geo, mat, parent, pos, rot, scale)` | engine `R(...)` | builder frames |
| Cached primitives | `z.sphere/box/cyl/cone/torus/ico/dodeca` (shared, never edit in place) | `T.*` | unit geos scaled |
| Materials | `v.clay` (Phong, shininess 14), `v.wet` (shininess 70, pupils), `v.glow`, `v.basic`, `v.world` | Lambert `Be()`, `x.clay` | `KIT.surf(kind,…)`, `gradMat` |
| Limbs, tails, antennae | `Rt(points, r0, r1)` tapered CatmullRom tube (woods 2429), `kt` even tube | `Fe` tube | `ridgedTube`, `KIT.arm/leg` |
| Organic bodies | sculpted spheres: vertex pear/bell flares + hash jitter about 0.035; `mt(geo, amp)` sine wobble (woods 2176) | sphere × (1 + 0.09·sin·sin·sin) | `blobBody` SDF of ellipsoids, `k` 0.2 firm to 0.3 goo, `fold` crease shading |
| Many small coloured parts | `S([{geo, matrix, color}])` vertex-colour merge (rivets, scales, collars) | `v([...])` | `goods()`, `cards` |
| Soft strands | `vt({...})` Verlet strands (Howard's hose, Gorbo's goo) | – | flowing goo streams |
| Textures | `R(w, h, draw)` canvas; Woods `gcTx` seeded library (feather, chevron, frogSkin, cap, gills, bark…) | canvas 64-512 px, one atlas | `KIT.surf` 18 kinds |
| Faces | Woods `gt` eyes (sclera, wet pupil, 2 glints), `Mt` half-torus mouth, `Et` blush, `bt` blink | auto catchlights `47-creature-polish.js` | `KIT.eye` with lids → `born()` blinks |

Lessons that carry across all of them:
- **Fur, feathers and skin are canvas tricks, not geometry.** Use 1,400-2,800 strokes in 2-3 tones as both `map` and
  `bumpMap` (bumpScale 0.035-0.05) on low-shine Phong (6-18). Paint colour maps near-white so the material colour
  tints them, and paint bump maps on mid-grey (`guides/greeblis-woods/construction.md` §Canvas textures).
- **Seed every texture and random placement** so a creature looks the same on every load and screenshots repeat.
- **Use vertex colour for depth without textures:** darker undersides, sine-noise mottling and speckles (Howard,
  Sparky, Gratelet's cream-to-ochre).
- **Glow without lights:** unlit Basic materials, pulsing emissive maps, additive cones and torus "signal arcs". Keep
  real point lights for one or two landmarks.
- **Screen faces pre-render their states** (idle, blink, talk, glitch, dance) and swap `material.map`, with
  `NearestFilter` for pixel art (Patchoolee, Anomalee, Mont, Hennrick).
- **Origin at the feet, front facing +z.** A model built facing +x gets a turn (`faceOff = −π/2`), not a rebuild
  (Park §Conventions).
- **Build hat brims and visors as thin solids.** A single-sided plane vanishes from below (Town: Somlet's visor).

### 1.2 What made the best-loved creatures read well

- **One bold body shape plus one or two signature parts.** Examples: Sparky's clerical collar and WiFi antennae,
  Fortizmo's trunk that morphs into a horn (two lathes blended vertex by vertex over 1.4 s), Maltoe's sheriff hat and
  six orb arms, Cherubi's spiral goggles, the Gummerys' CRT heads, King Dino's drum kit, Orson's lute (7 frets,
  4 strings).
- **A saturated colour of its own,** recorded in the definition with name, lines, gift line, home, `bodyR`, pattern,
  emotes and sound (Park checklist; Woods definition table).
- **A signature motion that tells its personality:** Sparky's antennae "sending" in turn and a howl every 40-80 s,
  Anomalee's glitch bursts every 5-13 s, Gorbo's goo every 2.5-5 s, Frog's throat sac, King Dino striking on every
  beat at 104 BPM.
- **A voice to match:** Howard only says "Blooooomp!", Mont speaks in ALL CAPS, Anomalee in a broken system log,
  Mushroom only "...". Lines are short and in character, and pair lines are written in both creatures' voices.
- **The detail is real but cheap:** Kollod's recursive panel packer, Slugworth's roughly 200 crystal scales merged into
  one mesh, Cutebex's 240 leaves.

### 1.3 Faces: expressive, not cartoony

- **Big eyes with dark glossy pupils and a white glint.** Many creatures have no mouth at all and emote through eyes,
  screens and bubbles (Howard, Mushroom, Fortizmo, Cherubi, Slugwerth).
- **Blinks:** squash the eye's y to about 0.12-0.15 for 0.12 s every 3-5 s, offset per creature. Expressive characters
  close in 0.07 s and open in 0.09 s, and sometimes blink twice (Woods `Dt`). Eyes that aren't eyeballs can still
  blink: Mama Gorbo's port lenses squash to 6% (Town).
- **Park auto-adds catchlights:** each dark sphere eye with brightness under 0.16 gets a white glint toward the front
  and a little up, at most 8 per creature (`games/greeblis-park/src/47-creature-polish.js`, `catchlight()`).
- **The owner's "no cartoony smiles" rule came from Town** (Montgummery's screen mouth is a flat line). Some earlier
  creatures have grins (Woods Frog, Cutebex, Park Gigglyph). Check with the owner before porting a smiling face into
  a new game.

### 1.4 Ports and merges

- **Ports keep the model exact.** This is an owner decision in Park, Woods and Town. Tools that make it safe:
  - Woods `port/port_fn.js` prefixes locals (Hennrick's `hk_*`) and remaps outside names;
  - `match.js` and `canon.js` diff functions by shape;
  - Town `extract/ex.js` pulls a builder with every helper it reaches into an isolated module, with engine services
    captured as `$x` aliases, because minified code shadows one-letter names.
- **A port can drag along code the new game never runs.** Hennrick's City dance code and beat helper had to be
  removed from Park (#14). Woods re-enabled his finale dance deliberately (#11).
- **Merges are a Town-era rule.** A merge is a new cohesive creature, never parts glued together (CLAUDE.md). City,
  Park and Woods have no merge guidance; Town's `blobBody` is the tool that makes cohesive blends possible.

### 1.5 No clipping: ground, body, parts

| Problem | Fix that worked | Source |
| --- | --- | --- |
| Feet sink while walking or bobbing | Rotate limbs until their world-space points clear the ground; Slugwerth has a ground-clamp loop | City construction §Techniques; City profiles |
| Tentacles pass through the body | Push them out of the body every frame (Hennrick's beard) | City profiles §Hennrick |
| Features modelled inside the body never show | Paint the buried part's outline onto the body as a texture (bellies must be texture, not bumps); move small dark parts out to the surface | Park §Model problems |
| A fix in one place breaks a neighbour | Grumpy tree's arms went through its eyes after another fix: re-check neighbours after any part moves | Park §Model problems |
| Flat badges on a curved body float at their edges | Project onto the analytic surface (City); sink by the sagitta r²/(2R) (Town) | City §Techniques; Town pitfalls |
| Orbiting items pass through the body | Orbit radius > body radius + item size + jiggle | Town pitfalls |
| An arm swings through a shield | Clear the arm's whole swing, not just its rest pose | Town pitfalls |

### 1.6 Personality through animation

- **The contract is the same in every game:** `anim(t, dt, e)` runs from absolute time, so a skipped frame never
  desyncs it. `onTalk` gives a short hop, nod or squash, `singing(level)` plays along with music, and `height` places
  bubbles and name tags. Woods adds `carry`, an attach point (Nextessa's pizza).
- **Who owns which transform (Woods):** the builder owns the rig and its parts, the engine owns the root's position,
  heading and idle tilt, and the idle system `Dt` owns the root's breathing scale. Town reuses this split with a
  wrapper group (`wt(group)`) for planting and dancing, so a pulled model's own animation keeps running inside it.
- **Layered life:**
  - always-on breathing (2%, rate 1.2-1.9);
  - idle acts every 4-10 s, with an emote 70% of the time;
  - Park's named idle moments every 7-16 s, only when the player is more than 5 m away (`Me()`): Mont glitches or
    reboots, Gorbo spin-sprays, Sparkakus does zoomies;
  - the 36-gesture library `gcGest` (woods 2882) that vignettes call by name.
- **A shared beat clock makes group dances cohere:** City's `gcBt` at 88 BPM with a smoothed dance weight `gcDW`
  (city 11632), and Town's `DANCES` near 104 BPM.
- **Clear `moving` whenever a pattern stops,** or the walk cycle plays in place (Woods #11). The gait phase only
  advances while moving, and the walk weight eases in and out.

### 1.7 Model budgets

- **City:** aim for 15k-25k triangles and 15-40 meshes per creature. All 16 creatures came to 74 batches.
- **Park:** most creatures use 1k-3k triangles. Hennrick's 26k is the outlier.
- **Rule from both:** a part stays separate only if `anim` moves it.
- **Breaks batching:** transparency, unique maps (normal, AO, emissive, env), more than about 4,000 vertices in one
  part, and InstancedMeshes. Each costs its own draw (City budgets; Park §Performance).

---

## 2. Behaviour systems

- **Movement patterns say who a creature is:**
  - City: wander (with occasional treks), `stay`, `post`, `stations` (a nav graph of work stations with 7-13 s waits),
    `gcRoam`, `follow`;
  - Park adds spirit patterns: shy, teleport, figure8, courier, orbitGorbo, survey and more;
  - Woods adds `visit` (Slugworth: every 16 s, stay 5 s), `shrinkTeleport` and `shy` (flee 6 m when the player is
    within 4.2 m).
- **Respect the player:** within 3.2 m, face the player and freeze for up to 12 s so they can talk
  (`proximityFreezeS: 12`, `greetR: 3.2` in City's config `t`). Wanderers keep 7 m of personal space and stay out of
  the 13 m campfire zone (Woods).
- **Turn smoothly toward the heading** (rate 5-8), never snap. Twirls are full turns that ease back to 0 (Park:
  Gigglyph, Sparkakus).
- **Pathing and getting unstuck (City):**
  - `gcNavPath` (app.js 8152) runs Dijkstra over a sampled visibility graph around colliders.
  - `gcStuck` (8249) counts a creature as blocked when its progress is under 30% of what it wanted for 1.2 s, and
    re-plans.
  - After 4 blocks in a row, if the player can't see it (`gcSeen`), it is teleported to its target.
  - Town's roamers instead settle where they are and pick again.
- **Talk and gifts:** `lines` cycle one per talk, pages split with `|`. Each creature has its own blossom thank-you.
  Park friends have three tiers of lines that deepen with repeat visits.
- **Pair vignettes (director):**
  - Every 10-18 s the director picks a pair. City prefers pairs near the player; Park picks the closest,
    least-played pair; Woods picks actors within 18 m of the player but outside the 3.2 m greet radius (#11 fixed it
    picking pairs right next to the player).
  - Choreography depends on mobility. City: mobile-mobile pairs get dance, toss, race, swap or chorus; mobile-fixed
    pairs get gift, orbit, peek or show; fixed-fixed pairs get mail, volley, echo or beam. Park has 11
    choreographies.
  - Woods scripts are a tiny DSL of formations (`face`, `orbit`, `relay`, `side`, `at:<landmark>`,
    `stroll:<landmark>`) plus steps like `B.lean? gift:A>B:egg:#a6e633 B.nod✦ A.puff`.
  - Text rate: City 12%; Woods 10% with at most one per 240 s (`talkGap`); Park went from 10% to 15% (#13); Town
    uses 15%.
  - Generate the tables from data and validate them by script: Park `vignettes/make2.js`, `check.js` and `check2.js`;
    Woods `vignette/validate.js`; City `vigtest.js` and `talkcheck.js`.
- **Set pieces:** City's concert finale, Bun Date and Robot Burger lap; Woods' finale gathering (night over 4 s, seat
  ring, food in hands), the pizza courier, King Dino's 4-bars-on, 4-off loop; Park's BBQ (seated guests face the
  grill unless talking).
- **During a finale or event, hide far scenery and lock quality low;** mark anything that must stay visible
  `keepInFinale`. City started this and Town kept it.
- **Timers that touch a creature must be stored on it and cleared** when something else takes it. Town re-learned
  this in its bug pass; Woods #11 fixed the same kind of bug (the bun date restarting).

---

## 3. Environment and rendering

- **Layout:** a flat walkable disc (radius 48 in City and Woods; 56 m in Park), ringed by scenery that hides the edge.
  Woods' ground rises 7 m from r 49 to 116 by smoothstep, so props inside the play area sit at y = 0.
- **Keep-clear registry** (`E.add(x, z, r, tag)`): every landmark and home reserves its space, and scatter goes last.
  Park's `CITY.place(min, max, obj)` reserves each placed footprint too.
- **Fog, far plane and sky dome:**

  | Game | Fog | Far | Dome |
  | --- | --- | --- | --- |
  | City | 54-150 m, made radial by a build patch | 400 | r 150, BackSide, `fog: false`, `depthWrite: false`, drawn last (app.js 498-512) |
  | Woods | 54-150 | 195 | r 150 |
  | Park | 64-175 | – | – |
  | Town | 70-300 (230 on mobile) | 310 (260 on mobile) | was 375, bigger than the far plane: a pale disc turned with the view. Now `0.85 · far` |

  Share one horizon colour between the sky, fog and background (Woods checklist).
- **Instancing and culling (Woods):**
  - About 1,700 trees, bushes and ferns are 7 InstancedMeshes, each type merged into one vertex-coloured geometry
    first.
  - In VR, `gcVeg` (game.js 13185) packs only the instances inside a view cone (about 72° each side) into the buffer.
    That cut triangles per eye by 41% with no extra draw calls.
  - Instances are sorted nearest-first, so they draw front to back.
- **Merging:**
  - City's skyline is 8 angular sectors × at most 7 meshes, about 56 draws, each sector culled on its own.
  - Park merges static scenery by look and by 24 m area, and merges the fixed parts of moving things (clouds,
    sunflowers, VR hands) per material. Draw calls fell from about 290 to 145 per view, objects from 1,765 to 968 and
    textures from 84 to 36 (#15).
- **Freezing:** `k(group)` freezes static matrices. Anything you animate afterwards needs `matrixAutoUpdate = true`,
  or it silently stops: City's Bunsen flame stopped flickering and its lab liquid lost its glow pulse.
- **Z-fighting and sorting:**
  - Offset coplanar faces by 0.01-0.03 m. Flat ground layers get small height steps plus polygonOffset −1 to −2,
    and render order.
  - Park's load-time pass (`48-scenery-polish.js`) removed 165 undersides lying flush on the lawn and separated 39
    coincident face pairs. It nudges the smaller part 1 cm into the bigger one, then shrinks anything still touching
    by 1%.
  - Woods hid its transparent sky layers (#12).
- **Lighting:** a hemisphere light plus a sun and a fill. Shadow maps are forced off, even through
  `Object.defineProperty` (city 485-488). Soft blob or contact shadows (one instanced draw) stand in for them. One
  night dial `I.setNight(k)` blends the sky, fog and lights, and `userData.gcNight` makes windows and lamps glow.
- **Quest numbers:**
  - City after its performance pass: 77-266 draws per view (average 185), 160k-465k triangles, about 2.5 ms render
    CPU and about 0.7 ms logic.
  - Park: about 145 draws and 140k-240k triangles.
  - Woods logic: about 0.5 ms per frame.
  - On Quest the bottleneck is CPU time per draw call, and every draw is submitted once per eye.
- **VR comfort and resilience (found in the code; no guide documents them):**
  - The config sets `xr.targetHz: 72`, applied with `updateTargetFrameRate`, and `fixedFoveation = 1`.
  - An adaptive framebuffer-scale ladder `quality: [0.72 … 0.55]` steps by frame-time EMA (`overFrac 1.15`,
    `underFrac 0.8`) and rebuilds the XR layer at most 30 times (app.js 17853-17890).
  - Snap turn is 30° (`snapAngle 0.5236`). Each snap or recentre briefly darkens a comfort vignette (`flash 0.85`,
    decaying at 3/s), which also fades in while moving (`vigMoving 0.55`, strength by setting) (app.js 18235-18263).
  - Canvas textures are snapshotted, and restored if a 2D canvas comes back blank after the page or XR session was
    hidden or the GL context was lost (`He`, app.js 18739-18850). Woods #11 fixed a "black headset after a context
    restore".
- **No flashing:** there is no written comfort rule against strobing in the City, Park or Woods guides. Blink lights
  are slow on/off antenna lights (`blinkM`). Town's rule (from the owner): no z-fighting anywhere, because the
  flicker is a comfort problem in VR; and transparent overlays (the goo on the screen) each get their own render
  order so they never swap.
- **Heads go where bodies can't (Town):** a VR head can lean into a wall the body is blocked by. Town's head guard
  darkens the view from 20 cm off any solid structure to black at 8 cm (`JGP.headGuard`). City, Park and Woods
  have no equivalent.

---

## 4. Ordinal packing

- **Pipeline (City recipe and Woods recipe):**
  1. Strip debug code. Woods wraps it in `/*<dbg>*/…/*</dbg>*/` and the build asserts none remain.
  2. Run terser on the game only, never on three.js.
     - City: 5 passes, top-level mangle, `gc*` property mangling that excludes any name also used in a string or
       GLSL (mangling broke the `gcR` uniform and `"gcRoam"`).
     - Woods: 2 passes; stricter settings saved under 150 bytes.
     - Pin the terser version: 5.31.0 vs 5.51.2 differ by 186 bytes and give a different file.
  3. Trim three.js r128 (Woods recipe; 54.3 to 49.7 KB compressed):
     - drop methods that never ran in a coverage session and whose name appears nowhere else (119 methods);
     - replace `console.*` with `void 0`;
     - remove impossible GLSL `#if` blocks, evaluating each unknown macro independently (treating them all alike broke
       every textured shader);
     - re-minify with `toplevel: false`.
     - Use only exported classes (`35048` for `DynamicDrawUsage`). An unexported `THREE.X` fails silently.
  4. Compress the whole page:
     - **Woods CM** (Woods and Park): 12 hashed contexts, a match model, three mixers, an APM/SSE stage, a 2^23-bucket
       table (64 MB) and a 5 KB decoder.
     - **Roadroller 2.1.0** (City), patched for 8-bit output, with 150 MB model memory and level-2 tuning (about
       25 min) and a hand-written decoder about 5× faster than stock.
     - Park chose Woods' coder as the stronger (227.0 to 190.2 KB, #10) after Roadroller came out bigger at its fast
       setting and slow to unpack (#8).
  5. Encode the page: 7 bits per character in `<script type=b>`, with groups 0, 13 and 60 (NUL, CR, `<`) escaped as one
     character in 128-511. Show a minimal "Unpacking…" or `LOADING nn%` line, decode, then
     `document.open/write/close`.
- **Sizes:**

  | Game | Packed | Unpacked | Packer |
  | --- | --- | --- | --- |
  | City | 196,685 B | 730,166 B | Roadroller, unpacks in about 5 s |
  | Park | 158,491 B | 586,728 B | Woods CM |
  | Woods | 155,649 B | 589,715 B | Woods CM |

  Park's 158.5 KB breaks down as three.js about 54 KB, engine 26, models 15, vignettes 12 and text 11. Models are
  cheap; the engine dominates.
- **CSP and ordinal pitfalls:**
  - ord serves `default-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob:`. The owner bans `eval` anyway.
  - The preview iframe is `sandbox="allow-scripts"` with origin `null`, so storage throws.
  - Reading your own page back with `fetch` is not reliable in ordinals (Park #8, undone by #9).
  - `document.scripts[0]` breaks if a viewer injects a script.
  - Pages may be served `text/html` with no charset, so stay 7-bit (City: `CT=text/html node ordtest.js`).
  - Decoding needs `Math.log`/`Math.exp` to match between Node and the browser (City; Roadroller's author says this is
    safe).
- **Push checklist (union of City and Woods):**
  - the fast decoder round-trips exactly;
  - FCP of the unpack line within about 50 ms;
  - `ordtest.js` passes 4 cases (direct and iframe, desktop and Quest), plus the no-charset case;
  - every shader program compiles (`progcheck.js`, `progs.js`);
  - the playthrough sim reports `ERRORS (0)`;
  - all pairs play (Woods `sim.js`, normal and with talk forced);
  - 15 min of director, plus a 1 h stress run with 10 VR enter/exit cycles;
  - a seeded 7-view pixel compare;
  - grep the outer page for `http(s)://`, `fetch(`, `XMLHttpRequest`, `localStorage`, `eval(` and `Function(`;
  - under 400 KB, and only `index.html` changed.

---

## 5. Audio

All sound is synthesized with WebAudio. Audio is the least documented area: the guides only say "Sounds are
synthesized … and get quieter with distance" (Park §How creatures come alive). Everything below comes from the
code.

- **Sound effects** (`G`, city app.js 376-479; Woods 785+; Park `20-engine.js` 296+):
  - one oscillator plus a gain with an exponential ramp per note;
  - named voices: blorp, howl, bump, heart, pickup, crackle, splash, textTick, a drum kit of kick, snare and hat;
  - `G.near(x, z, r, name)` scales volume by `0.25 + 0.75·(1 − d/r)²` from the VR head position, with hearing radii
    in `t.hearR` (goo 22, ambient 18, howl 30, music 11).
- **Resume after headset off or idle (the same in all three engines):**
  - create the context lazily on the first `pointerdown`, `keydown` or `touchend`;
  - every sound call resumes a context that isn't `running` and skips that one note;
  - resume on `suspended` or `interrupted` (Safari);
  - retry on `visibilitychange` (now and again 300 ms later), `pageshow` and `focus` (city 408-426);
  - on XR session `visibilitychange`, snapshot or restore canvas textures and reset the game clock
    (`Re.resetClock()`), so `dt` doesn't jump after the headset was off (city 18120-18128).
- **Music:**
  - City `gcJazz` (app.js 12830-13295) is a 132 BPM swing blues in F for a synthetic horn section:
    - notes are scheduled on the audio clock with 0.8 s look-ahead from a time-sorted queue;
    - after a stall it skips missed bars, and it drops late notes instead of bursting them;
    - reverb is a convolver on a decaying-noise impulse response (1.8 s).
  - Woods' campfire song (game.js 9507-9573) is simpler: an 88 BPM arpeggio on the game clock, fading in over 3 s and
    out over 2 s.
  - Cutebex sings in pitch: 330 Hz × 2^(n/12).
- **Town improved on this, so feed it back:**
  - `latencyHint: "balanced"` on headsets and phones, because the smallest buffer crackles;
  - a master `DynamicsCompressor` limiter so stacked sound effects never clip;
  - feedback-delay reverb instead of a convolver, which is "hard on standalone headsets" (greeblistown/index.html
    450-470, 3385-3400).
  - City's convolver jazz should get the same treatment if City is touched again.

---

## 6. Process

### Tools that paid off

- **Ordinal emulation:**
  - `ordtest.js` serves ord's CSP at `/content/` and a sandboxed `/preview/` iframe, desktop and Quest;
  - Park's `ordsim.js` serves an ord-like site with `/inscription/<id>`;
  - Park's `ordtest_block.js` is the blocked-frame variant (the README calls it "the blocked-frame ord test").
- **Pixel compare with seeded `Math.random`:** City `cmp.js` + `pd.py`, Woods `pixdiff.js` (7 views), Park `SEED=n`.
  This caught the no-trees bug and proved Park's merge pass "pixel-identical".
- **Dry-run integrity:** Woods `frozen.js` (no animated part merged), City `labcheck.js` (the flame flickers after
  freezing).
- **Contact sheets and portraits:** City `portraits.js`, `faces.js` and `sheet.js`; Woods `portrait.js` and
  `sheet.py`; Park `d_roster.js`.
- **Z-fight scan:** City `zscan.js` → `zrender.js` → `zview.js`/`zray.js` finds coplanar faces, confirms them by
  rendering, then names them. Park `d_zf.js` checks the auto-fix.
- **Soak and stress:**
  - Woods `stress.js`: 10 VR enter/exit cycles, then 1 h, checking heap, timers, listeners, NaN and stuck states;
  - Park `d_reenter.js`, `d_fuzz.js`, and the emulated Quest 3 through IWER.
- **Coverage-driven dead code:** City `simcov.js`, Park `covrun/covan.js`, Woods `cover_run.js` + `unc.py`, plus
  scope-aware unused-name finders (`deadscope.js`, `deadprops.js`).
- **Performance analysis:** Woods `analysis/` covers draws by owner, triangles by object, allocations per frame
  (`loopalloc.js`), matrix-update cost (`umw.js`) and leaks over VR cycles (`vrleak.js`).
- **UI text overflow audits:** City `uicheck2.js`, Woods `visual/audit_run.js`. Every game had overflow bugs (Woods #4,
  Park #3, Town #15).

### Owner decisions that recur in every history file

- VR only in the final build; test modes are temporary. Town is the exception: it also targets Android and mobile.
- Only `index.html` is pushed. Every game is fully playable as an ordinal.
- Smallest file over load time, with no content cut.
- Keep a ported creature exactly the same (Hennrick in all four games).
- One unique scene and one rare text exchange per pair.
- Creatures are the most important part; write down how they were built.
- Owners asked for decorative scenery removals: Woods #5 removed the flowers, Park #5 the 4,800 grass tufts, Town the
  cars and far farmland. These were requests about the look, not size cuts.

### Mistakes repeated across games

| Mistake | Where it happened | Prevention |
| --- | --- | --- |
| Dry run fires real effects at load | City (84 goo blobs), Woods #11 (goo spray) | Stub every effect in `Pt`; add a boot-time effect count to tests |
| Animated part frozen or merged | City lab flame and liquid; Woods Gratelet blink | Start timers inside the dry-run window; `frozen.js` |
| Shared material mutated | City decals; Park recolours; Woods `unique: true` | Clone or `unique: true` |
| Coplanar faces | City eyes and signs; Park 165 + 39 pairs; Town church, stools, dance floor | Offset ≥1 cm; auto pass; scan |
| Entity without an `id` | City "met" key; Town Zollod's menu | Key by id, fall back to the builder key |
| Content cut for size | Park #11 (Hennrick, lore lines, polish) | Rule 3: never cut; pack harder |
| Packing that breaks the ordinal | Park #8 (`fetch`) | Ordinal test on every push |
| Test mode added and later removed | City, Park #2/#6, Woods #2/#6, Town #7 | Keep it in `tools/<game>/dev/`, hooked by `dbg` markers |
| Text overflowing its box | Woods #4, Park #3, Town #15 | Overflow audit in the push checklist |
| Things placed inside moved buildings | Town (tree in the church, portrait spot in the church) | Re-check spots after moving any building |

---

## 7. Worth bringing to Town (consolidated)

Checked against `greeblistown/index.html` (1,080,383 bytes on 11 Oct 2026) and `greeblistown/tools/`.

1. **[Worth bringing to Town] Pack it.** The page ships unpacked at about 1.04-1.08 MB, well over the ~400 KB rule
   (`games/greeblis-town-usa/README.md`). Packed unminified it comes to 251,328 bytes (`greeblistown/tools/README.md`).
   Follow Park's `build.js` (joint minify, then Woods CM, with a round trip checked on every build).
2. **[Worth bringing to Town] `/*<dbg>*/` markers, stripped and asserted** (Woods). `const TEST_QUESTS = !0` (line 40)
   starts all three quests complete "for testing", and the Summoning Stone is owned by default. These must not ship
   on.
3. **[Worth bringing to Town] Detect a VR-blocked frame up front and link out.** Town only shows text after
   `requestSession` fails (index.html 5592). Woods checks `permissionsPolicy.allowsFeature("xr-spatial-tracking")` and
   rewrites `/preview/` to `/content/` as a link (game.js 2820-2843); Park does the same on `isSessionSupported`
   (`20-engine.js` 4439-4455).
4. **[Worth bringing to Town] Fuller ordinal test.** Town's `test/ordtest.js` covers only the sandboxed preview
   iframe, always with `charset=utf-8`. Add the direct `/content/` case, the no-charset `text/html` case (City),
   Quest user-agent gate text, and the unpack-line paint timing once packed.
5. **[Worth bringing to Town] VR session tests.** No Town test enters a VR session. Bring Woods `stress_init.js` +
   `stress.js` (10 enter/exit cycles: listeners, timers, heap) or Park's IWER-emulated Quest 3 with `d_reenter.js`.
6. **[Worth bringing to Town] Frozen-part check** (Woods `frozen.js`) for `KIT.animated`/`KIT.compact`, and the rule
   to start every animation timer inside the sampling window.
7. **[Worth bringing to Town] Per-frame allocation check** (Woods `analysis/loopalloc.js`). Town's guide says "never
   allocate in loops" but has no tool to measure it.
8. **Done: automatic z-fight fixer at load** (Park `48-scenery-polish.js`), brought to Town as `unfightParts()` on
   the town's bins and every `goods()` merge, with one change: faces looking the same way (a sign on a wall) stand
   8 mm proud instead of being pushed in and hidden. `t_zfight.js` + `t_zcheck.js` confirm nothing visible flickers.
9. **[Worth bringing to Town] Auto catchlights and buried-part painting** (Park `47-creature-polish.js`), as a load
   pass or an audit for pulled models whose eyes are plain dark spheres. Never apply it to locked models without
   asking.
10. **[Worth bringing to Town, if the lawn tufts or envelopes are instanced] View-cone instance culling** (`gcVeg`):
    41% fewer triangles per eye in Woods at no draw-call cost.
11. **Already in Town, keep it:** the adaptive quality ladder, foveation, canvas restore (`willReadFrequently`,
    `putImageData`), `keepInFinale`, seeded pixel compare (`px.js`), three.js trimming and pinned terser.

---

## The final builds (uploaded 11 Oct 2026)

FINALS_PLACEHOLDER

## Documentation gaps noticed

- No City `history.md`; City PRs are cited only in the packing doc (#20, #22).
- Audio (sound effects, music, resume) and VR comfort (snap turn, comfort vignette, quality ladder, canvas restore)
  are in code only, in all three games.
- Merges and "no cartoony smiles" are documented only for Town.
