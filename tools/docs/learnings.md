# Greeblis games: what City, Park and Woods taught

What was learned from the three Greeblis games before Greeblis Town (**Greeblis City**, **Greeblis Park** and
**Greeblis Woods**): their guides, profiles, packing recipes, PR histories and readable sources, and the final
builds the owner uploaded on 11 Oct 2026, checked against Town (the 4th game, this repo). Their repos no longer
exist, so this is the only record. Names such as `gcEB`, `Pt` or `gcVeg` are from the old readable sources (the
shipped pages were minified); `#n` is a PR in that game; paths are in this repo. **[Worth bringing to Town]**
marks what Town does not do yet ([section 7](#7-worth-bringing-to-town)).

## Rules of thumb

1. **Creatures come first.** Each has its own builder, silhouette, colour, voice, emotes and sound, and one
   signature part you can read from 10-15 m away.
2. **Port a creature byte for byte, and prove it** with a side-by-side render or a mesh, position and bounds
   check (`tools/town/extract/equiv.js`). Copy only the helpers it reaches; cut code that can never run in the new
   game. Hennrick has moved through all four games unchanged.
3. **Place parts from the surface, never by eye** (analytic ellipsoid normal or ray-march in City, `hit()` on the
   blob SDF in Town, buried pupils and noses moved out to the skin in Park). Most of Park's model bugs were parts
   in the wrong place relative to the body.
4. **Keep only moving parts separate; merge the rest, then prove nothing animated got frozen.** City and Woods
   ran a dry-run probe (`Pt`) that plays each animation to see which parts move, then a merge (`Gt`); Town has
   `KIT.animated` and `KIT.compact`. Woods had a test that failed if any animated part was merged.
5. **Stub every side effect in the dry run, and start every timer inside its window.**
6. **Never mutate a cached or shared material.** Clone it, or pass `unique: true` (all three games hit this).
7. **No two faces in one plane.** Offset by at least 1 cm and check from inside buildings: every game patches
   Phong, Lambert and Basic materials to double-sided.
8. **Draw calls are the Quest bottleneck, and VR doubles them.** Batch creature parts, merge static scenery by
   material and area, instance anything repeated, cull instances by view cone.
9. **Animate transforms, not geometry, and never allocate per frame.** Sparky's 54k triangles came from tubes
   rebuilt every frame; Woods #12 and Park #15 both removed per-frame allocations.
10. **Seed everything and pixel-compare every optimisation.** Woods' trimmed engine dropped an unexported
    `THREE.X`, so no trees were drawn; only the pixel compare caught it, not triangle counts.
11. **Smallest file wins, and no content is cut.** Park #11 cut Hennrick and lore lines for size; #12 brought
    Hennrick back (the lines never came back). The Woods compressor beat Roadroller.
12. **The ordinal is the real target:** 7-bit text, no `fetch` of your own page, no storage, no network; test the
    direct `/content/` page and the sandboxed `/preview/` iframe, on desktop and Quest.
13. **Detect a frame that blocks VR, and link out.** Explorer iframes don't grant `xr-spatial-tracking`.
14. **Every pair of creatures gets one unique scene and one rare two-line exchange** (talk rate 10-15%),
    validated by script.
15. **Test modes are temporary.** City, Park, Woods and Town each added a third-person desktop/mobile mode; the
    first three removed it before shipping. Keep test hooks behind `/*<dbg>*/ … /*</dbg>*/` markers that the
    build strips and asserts gone (Woods).

## 1. Creature construction

### 1.1 Toolkits (one lineage, four generations)

| Need | City / Woods (shared engine) | Park | Town |
| --- | --- | --- | --- |
| Place a mesh | `H(geo, mat, parent, pos, rot, scale)` | engine `R(...)` | builder frames |
| Cached primitives | `z.sphere/box/cyl/cone/torus/ico/dodeca` (shared: never edit in place) | `T.*` | unit geos, scaled |
| Materials | `v.clay` (Phong, shininess 14), `v.wet` (shininess 70, pupils), `v.glow`, `v.basic`, `v.world` (Lambert) | Lambert `Be(colour)`, `x.clay` | `KIT.surf(kind,…)`, `gradMat` |
| Limbs, tails, antennae | `Rt(points, r0, r1)` tapered capped CatmullRom tube, `kt` even tube | `Fe` tube (16 × 6 segments) | `ridgedTube`, `KIT.arm/leg` |
| Organic bodies | sculpted spheres: pear/bell vertex flares + hash jitter ~0.035; `mt(geo, amp)` sine wobble | sphere × (1 + 0.09·sin·sin·sin), normals recomputed | `blobBody` SDF of ellipsoids |
| Many small coloured parts | `S([{geo, matrix, color}])` vertex-colour merge (rivets, scales, collars) | `v([...])` | `goods()`, `cardGeo` |
| Soft strands | `vt({...})` Verlet strands (Howard's hose, Gorbo's goo) | – | flowing goo streams |
| Textures | `R(w, h, draw)` canvas; Woods' seeded library `gcTx` (feather, chevron, frogSkin, cap, gills, bark…) | canvas 64-512 px, one shared atlas | `KIT.surf`, 18 kinds |
| Faces | Woods `gt` eyes (sclera, wet pupil, 2 glints), `Mt` half-torus mouth, `Et` blush, `bt` blink | automatic catchlights | `KIT.eye` with lids, `born()` blinks |

- **Fur, feathers and skin are canvas tricks, not geometry:** 1,400-2,800 strokes in 2-3 tones as both `map` and
  `bumpMap` (bumpScale 0.035-0.05) on low-shine Phong (6-18). Paint colour maps near-white so the material tints
  them, and bump maps on mid-grey. Hanging fur is mostly vertical strokes.
- **Seed every texture and random placement**, so a creature looks the same on every load and screenshots repeat.
- **Vertex colour gives depth without textures:** darker undersides, sine-noise mottling, speckles (Howard, Sparky,
  Gratelet's cream-to-ochre).
- **Glow without lights:** unlit Basic materials, pulsing emissive maps, additive cones, torus "signal arcs". Keep
  real point lights for one or two landmarks.
- **Screen faces pre-render their states** (idle, blink, talk, glitch, dance) and swap `material.map`, with
  `NearestFilter` for pixel art (Patchoolee, Anomalee, Mont, Hennrick).
- **Origin at the feet, front facing +z.** A model built facing +x gets a turn (`faceOff = −π/2`), not a rebuild
  (Park did this for Sparkakus, Appteryx, Immuto, Decibelle, Nextessa, Patchouli, Etchelon, the cow and the
  caterpillar).
- **Builders are long, hand-tuned functions, one per creature** (City's ran 200-700 lines). Only the Gummery twins
  shared one (two palettes and a flag): shared templates make creatures look alike.

### 1.2 What made the best-loved creatures read well

- **One bold body shape plus one or two signature parts:** Sparky's clerical collar and WiFi antennae, Fortizmo's
  trunk that morphs into a horn (two lathes blended vertex by vertex over 1.4 s), Maltoe's sheriff hat and six orb
  arms, Cherubi's spiral goggles, the Gummerys' CRT heads, King Dino's drum kit, Orson's lute (7 frets, 4 strings).
- **A saturated colour of its own**, recorded in the definition with name, lines, gift line, home, `bodyR`,
  movement pattern, emotes and sound.
- **A signature motion:** Sparky's antennae "sending" in turn and a howl every 40-80 s, Anomalee's glitch bursts
  every 5-13 s, Gorbo's goo every 2.5-5 s, Frog's throat sac, King Dino striking every beat at 104 BPM.
- **A voice to match:** Howard only says "Blooooomp!", Mont speaks in ALL CAPS, Anomalee in a broken system log,
  Mushroom only "...". Lines are short and in character; pair lines are written in both voices.
- **Real but cheap detail:** Kollod's recursive panel packer, Slugworth's ~200 crystal scales merged into one
  mesh, Cutebex's 240 leaves.

### 1.3 Faces

- Big eyes with dark glossy pupils and a white glint. Many creatures have no mouth at all and emote through eyes,
  screens and bubbles (Howard, Mushroom, Fortizmo, Cherubi, Slugwerth).
- **Blinks:** squash the eye's y to ~0.12-0.15 for 0.12 s every 3-5 s, offset per creature. Expressive characters
  close in 0.07 s, open in 0.09 s, and sometimes blink twice (Woods' idle system `Dt`).
- **Park added catchlights automatically** (`catchlight()` in its creature polish pass): each dark sphere eye
  (brightness under 0.16, radius 1.2-16 cm, opaque, untextured) got a white glint toward the front and a little up,
  at most 8 per creature.
- "No cartoony smiles" is a Town rule. Earlier creatures have grins (Woods' Frog, Cutebex and the Buns, Park's
  Gigglyph): ask the owner before porting a smiling face.

### 1.4 Ports and merges

- **Ports keep the model exact** (an owner decision in Park, Woods and Town). Woods' port tool prefixed every local
  of the ported builder (Hennrick's became `hk_*`) and remapped the names it borrowed from the engine; two helpers
  matched and diffed functions by shape, to find a builder again in another game's minified code. Town's extractor
  is `tools/town/extract/ex.js`.
- **A port can drag along code the new game never runs:** Hennrick's City dance code and beat helper had to be
  removed from Park (#14), where it "would have crashed if it ran"; Woods re-enabled his finale dance on purpose
  (#11).
- **Merges are a Town-era rule;** City, Park and Woods had no merge guidance. Town's `blobBody` makes cohesive
  blends possible.

### 1.5 No clipping

| Problem | Fix that worked | Where |
| --- | --- | --- |
| Feet sink while walking or bobbing | Rotate limbs until their world-space points clear the ground; Slugwerth has a ground-clamp loop | City |
| Tentacles pass through the body | Push them out every frame (Hennrick's beard: up to 10 small rotations per joint until two test points along it are outside the body ellipsoid) | City |
| Features modelled inside the body never show | Paint the buried part's outline onto the body as a texture (bellies are texture, never bumps); move small dark parts out to the surface | Park |
| A fix breaks a neighbour | The grumpy tree's arms went through its eyes after another fix: re-check neighbours after any part moves | Park |
| Flat badges on a curved body float at their edges | Project onto the analytic surface | City |
| Mirrored part pairs point the wrong way | A mirrored rotation sign made the cathedral neon a V in mid-air: render a close-up of every mirrored pair | City |

### 1.6 Personality through animation

- **The same contract in every game:** `anim(t, dt, e)` runs from absolute time, so a skipped frame never desyncs
  it; `onTalk` gives a short hop, nod or squash; `singing(level)` plays along with music; `height` places bubbles
  and name tags. Woods adds `carry`, an attach point (Nextessa's pizza).
- **Who owns which transform (Woods):** the builder owns the rig and its parts, the engine the root's position,
  heading and idle tilt, and the idle system `Dt` the root's breathing scale. Town keeps this split with a wrapper
  group for planting and dancing.
- **Layered life:** always-on breathing (2%, rate 1.2-1.9); idle acts every 4-10 s with an emote 70% of the time
  (not for stationary creatures); Park's named idle moments every 7-16 s, only with the player over 5 m away and
  no dialogue open (`Me()`: Mont glitches, spins or reboots, Gorbo hops, spin-sprays or jiggles, Sparkakus does
  zoomies); Woods' 36-gesture library `gcGest`, which vignettes call by name.
- **A shared beat clock makes group dances cohere:** City's `gcBt` at 88 BPM with a smoothed dance weight `gcDW`.
- **Clear `moving` whenever a pattern stops,** or the walk cycle plays in place (Woods #11). The gait phase only
  advances while moving, and the walk weight eases in and out.

### 1.7 Model budgets

- **City:** 15k-25k triangles and 15-40 meshes per creature; all 16 came to 74 batches; the scene had ~1,770
  nodes, 746 in creatures.
- **Park:** most creatures 1k-3k triangles; Hennrick's 26k is the outlier.
- A part stays separate only if `anim` moves it.
- **Batching breaks on** transparency, unique maps (normal, AO, emissive, env), over ~4,000 vertices in one part,
  and InstancedMeshes: each costs its own draw. City's batcher `gcEB` merges up to 32 parts per draw when they share
  material type, map, bump map, emissive, side, fog and flat shading; colour, specular and shininess go per part.

## 2. Behaviour systems

- **Movement patterns say who a creature is.** City: wander (with occasional treks), `stay`, `post`, `stations` (a
  nav graph of work stations, 7-13 s waits), `gcRoam` (a planned route with pauses), `follow`. Park's spirits:
  drift, circle, shy, teleport, sway, figure8, mend, pop, courier, orbitGorbo, kite, splash, survey, ellipse. Woods:
  `visit` (Slugworth: every 16 s, stay 5 s), `shrinkTeleport` (a 30 s cycle), `shy` (flee 6 m when the player is
  within 4.2 m).
- **Respect the player:** within 3.2 m, face them and freeze for up to 12 s so they can talk (`greetR: 3.2`,
  `proximityFreezeS: 12`). Woods' wanderers kept 7 m of personal space and out of the 13 m campfire zone.
- **Turn smoothly toward the heading** (rate 5-8), never snap. Twirls are full turns that ease back to 0.
- **Pathing (City):** `gcNavPath` runs Dijkstra over a sampled visibility graph round colliders; `gcStuck` counts
  a creature blocked when its progress is under 30% of what it wanted for 1.2 s, and re-plans; after 4 blocks in a
  row, if the player can't see it (`gcSeen`), it is teleported to its target. (Town's roamers settle and pick
  again instead.)
- **Talk and gifts:** `lines` cycle one per talk, pages split with `|`; each creature has its own Blossom
  thank-you; Park friends had three tiers of lines that deepen with repeat visits.
- **Pair vignettes:**
  - Every 10-18 s the director picks a pair. City prefers pairs near the player; Park the closest, least-played
    pair, so all 465 pairs come up over time; Woods picks actors within 18 m of the player but outside the 3.2 m
    greet radius (#11 fixed it picking pairs right beside the player).
  - Choreography by mobility. City: mobile-mobile pairs dance, toss, race, swap or chorus; mobile-fixed gift, orbit,
    peek or show; fixed-fixed mail, volley, echo or beam. Park: 11 (greet, call-and-response, circle, stroll,
    follow, show, startle, gift, race, duet, and signal for two that can't move), plus a closing pair of emotes.
    Woods: a tiny DSL of formations (`face`, `orbit`, `relay`, `side`, `at:<landmark>`, `stroll:<landmark>`) and
    steps such as `B.lean? gift:A>B:egg:#a6e633 B.nod✦ A.puff`.
  - Text rate: City 12%; Woods 10%, at most one per 240 s (`talkGap`); Park 10%, then 15% (#13).
  - Generate the tables from data and validate them by script. Park kept one compact row per pair
    (`"<choreo char><speaker>line<TAB><speaker>line"`, in sorted-key order), generated from per-batch JSON and
    checked against a roster; Woods played all 171 pairs (normally and with talk forced); City had a vignette test
    and a talk check.
  - Hand-picked story pairings override generated ones (City's `OVR`: Mont gives Missgummery a heart, Kollod
    follows Howard cleaning up his oil).
- **Set pieces:** City's concert finale, Bun Date and Robot Burger lap; Woods' finale gathering (night over 4 s, a
  seat ring, food in hands), the pizza courier, King Dino's 4-bars-on, 4-off loop; Park's BBQ (seated guests face
  the grill unless talking).
- **During a finale, hide far scenery and lock quality low;** mark what must stay `keepInFinale` (City; Town kept
  it).
- **Timers that touch a creature are stored on it and cleared** when something else takes it (Woods #11: the bun
  date restarting; Town re-learned it).

## 3. Environment and rendering

- **Layout:** a flat walkable disc (radius 48 m in City and Woods, 56 m in Park) ringed by scenery that hides the
  edge. Woods' ground rises 7 m from r 49 to 116 by smoothstep, so props in the play area sit at y = 0.
- **Keep-clear registry** (`E.add(x, z, r, tag)`): every landmark and home reserves its space; scatter goes last.
  Park's `CITY.place(min, max, obj)` reserves each placed footprint too.
- **Fog, far plane, sky dome:**

  | Game | Fog (linear, radial) | Far plane | Sky dome |
  | --- | --- | --- | --- |
  | City | 54-150 m | 400 | r 150 vertex-gradient sphere, BackSide, `fog: false`, `depthWrite: false`, drawn last |
  | Woods | 54-150 | 195 | r 150 |
  | Park | 64-175 | 400 | r 150 (the City engine's) |

  Share one horizon colour between sky, fog and background. Radial fog is a build patch to three.js:
  `fogDepth = length(mvPosition.xyz)` instead of `-mvPosition.z`, so fog doesn't swing as the head turns. (Town's
  dome once outgrew its far plane: a pale disc turned with the view.)
- **Instancing and culling (Woods):** ~1,700 trees, bushes and ferns are 7 InstancedMeshes, each type merged into
  one vertex-coloured geometry first. In VR, `gcVeg` packs only the instances inside a view cone (~72° each side,
  wider looking up or down) into the buffer (`DynamicDrawUsage`, the literal `35048`): 41% fewer triangles per
  eye, no extra draw calls; a test of 400 random head poses checked nothing in view was dropped. Instances are
  sorted nearest-first.
- **Merging:** City's skyline is 8 angular sectors × at most 7 meshes (~56 draws), each sector culled on its own.
  Park merges static scenery by look and 24 m area, and the fixed parts of moving things (clouds, sunflowers, the
  monolith, VR hands) per material: draws per view ~290 → 145, objects 1,765 → 968, textures 84 → 36 (#15); the
  rune rain became one mesh with one 8 × 6 atlas.
- **Freezing:** `k(group)` freezes static matrices; anything animated afterwards needs `matrixAutoUpdate = true`,
  or it silently stops (City's Bunsen flame stopped flickering, its lab liquid lost its glow pulse).
- **Z-fighting and sorting:** offset coplanar faces 0.01-0.03 m; flat ground layers get small height steps plus
  polygonOffset −1 to −2 and a render order. Park's load-time pass removed 165 undersides flush on the lawn and
  separated 39 coincident face pairs (the smaller part nudged 1 cm into the bigger, then anything still touching
  shrunk by 1%). Woods hid its transparent sky layers (#12).
- **Lighting:** a hemisphere light plus a sun and a fill; shadow maps forced off, even through
  `Object.defineProperty` on `renderer.shadowMap.enabled`; soft blob or contact shadows (one instanced draw) stand
  in. One night dial `I.setNight(k)` blends sky, fog and lights; `userData.gcNight = [base, gain]` makes windows
  and lamps glow.
- **Quest numbers:** City after its performance pass: 77-266 draws per view (average 185), 160k-465k triangles,
  ~2.5 ms render CPU, ~0.7 ms logic. Park: ~145 draws, 140k-240k triangles; #15 cut frame-loop CPU 19% and render
  CPU 25%. Woods logic: ~0.5 ms per frame. On Quest the cost is CPU time per draw call, and every draw is submitted
  once per eye.
- **VR comfort and resilience** (in all three engines' code; no guide documented them):
  - `xr.targetHz: 72` (applied with `updateTargetFrameRate`), `fixedFoveation = 1`.
  - An adaptive framebuffer-scale ladder `quality: [0.72, 0.68, 0.64, 0.6, 0.55]` stepped by a frame-time EMA
    (`emaAlpha 0.08`, `overFrac 1.15` for 20 frames, `underFrac 0.8` for 300 frames), backing off after a failed
    probe and rebuilding the XR layer at most 30 times.
  - Snap turn 30° (`snapAngle 0.5236`, threshold 0.7, re-arm 0.35); smooth turn 2.2 rad/s. Each snap or recentre
    briefly darkens a comfort vignette (`flash 0.85`, decaying at 3/s), which also fades in while moving
    (`vigMoving 0.55`, strength 0, 1 or 1.5 by setting).
  - A frame stall over 1 s in VR recentres the player.
  - Canvas textures are snapshotted (a registry of every `CanvasTexture`) and restored if a 2D canvas comes back
    blank after the page or XR session was hidden or the GL context lost (Woods #11 fixed a "black headset after a
    context restore").
- **No flashing:** no earlier guide had a rule against strobing; blinking lights were slow on/off antenna lights
  (`blinkM`). Town's owner rule: no z-fighting anywhere, as flicker is a VR comfort problem.

## 4. Ordinal packing

How Town runs it is in the [tools README](../README.md#the-final-pass-release-minify-pack); this is the recipe and
the reasons behind it, from the City and Woods packing guides and Park's build notes.

### Rules every packed page meets

- One self-contained `index.html`: no external URLs, network requests, `fetch`, `XMLHttpRequest`, storage,
  `eval` or `new Function`.
- It boots under ord's CSP (`default-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob:`; the owner bans
  `eval` anyway), opened directly (`/content/<id>`) and inside the explorer's sandboxed `allow-scripts` iframe
  (`/preview/<id>`, origin `null`, so storage throws).
- Under ~400 KB, so the inscription fits a standard Bitcoin transaction. No content cut; the smallest file wins,
  even when it unpacks more slowly.
- On a Quest the player enters VR from `/content/<id>` (the explorer's iframe blocks it).

### The unpacked page

- One HTML document: the head (charset, viewport, title, styles, the hidden DOM the VR UI mirrors), a small
  console-throttle and error guard, three.js (`var THREE = …`), small runtime patches (double-sided materials,
  crisp canvas, geometry shims), then the game script (Woods: head, guard, trimmed three.js, polyfills, canvas
  patch, minified game).
- Debug-only code sits between `/*<dbg>*/` and `/*</dbg>*/`; the production build removes every marked span with a
  regex and asserts no `<dbg>` is left. Woods marked the pair table, the vignette list, the forced-pair hook and the
  VR test exports this way.
- Starting from a packed page, recover the unpacked one by hooking `Document.prototype.write`, only in the
  sandboxed browser (`tools/town/decode/`).

### Minify the game script

Never minify three.js with top-level mangling.

| Game | terser | Settings |
| --- | --- | --- |
| Woods | 5.31.6 | `ecma: 2020`, `toplevel: true`, `compress: {passes: 2}`, `mangle: {toplevel: true}` (Town's `pack/woods-build/min.js`). Stricter settings saved under 150 bytes compressed |
| City | 5.31.0 | `--ecma 2020 --compress passes=5,ecma=2020,keep_fargs=false --mangle --toplevel --mangle-props regex=/^gc(?!(?:Part\|Roam\|R\|A\|B\|C\|D\|I\|0\|1\|2)$)[A-Za-z0-9]/`: every `gc*` name is a property to mangle unless it also appears in a string or GLSL (rebuild that exclusion list per game) |
| Park | 5.51.2 | All source files joined in file-name order, top-level mangling, 3 passes, `console.warn`/`log` dropped |
| Town | 5.31.0 (pinned) | The Woods settings |

- Pin the version: 5.31.0 and 5.51.2 differ by 186 bytes on City and give a different file.
- City's property mangling broke a shader uniform (`gcR`) and a pattern looked up by string (`"gcRoam"`):
  exclude string-referenced names and pixel-compare.

### Trim three.js r128

Rerun whenever the game uses more of it; every step must keep renders pixel-identical. Town's tools are in
`tools/three/`.

1. **Exports:** export only the classes the game uses, and use only exported names: an unexported `THREE.X` is
   `undefined` and fails silently.
2. **Unreachable methods:** remove methods that never ran in a full coverage session **and** whose name appears
   nowhere else in the engine or the game. three.js has no dynamic `obj[name]()` dispatch, so the name check is a
   proof. Woods removed 119 methods, Park ~180. Record the coverage on the same build.
3. **Developer warnings:** replace every `console.*` call with `void 0` (City used terser `pure_funcs`, ~2.5 KB
   compressed). Fallback code stays, and shader compile diagnostics are still recorded.
4. **Impossible shader blocks:** remove GLSL `#if` blocks false for every setting of the macros the game never
   defines (shadow, environment, normal, specular, alpha, emissive, light and AO maps, UV2, skinning, morphing,
   logarithmic depth, dithering, premultiplied alpha, tone mapping, exponential fog, physically correct lights,
   spot, area-light and clipping counts). **Evaluate each unknown macro independently:** one value for all of them
   wrongly dropped `defined(USE_UV) && !defined(UVS_VERTEX_ONLY)` and broke every textured shader. Skip any `#if`
   spanning several JS strings (the shader prefix pieces). Keep what the game uses (Town: `USE_EMISSIVEMAP`).
5. **Park's extras:** fold `isSkinnedMesh`-style flags for classes the build lacks and let terser drop the dead
   branches; strip shader chunks no material can reach.
6. **City's build patches:** radial fog, unused shader chunks blanked, and every `THREE.X` aliased to a local
   `T_X` (skip string literals: see [the City final](#8-the-final-builds)).
7. **Re-minify** with terser `toplevel: false`, so `var THREE` stays global.

Woods' engine went from 54.3 to 49.7 KB compressed; Park's three.js was 263 KB minified.

### Compress: the Woods context-mixing coder (recommended)

- **One generator `cmz(data, len, enc)`** shared by encoder and decoder, so they can't drift.
- **12 hashed contexts:** orders 0 to 4; two longer orders (5-6 bytes, and up to 8); the current-word hash plus
  the previous word; two sparse byte pairs (bytes 2-3, bytes 1+3); an order-4+5 mix; word + previous byte. Each
  context has two adaptive probabilities plus a run model, in a 2^23-bucket table (64 MB of `Uint16`).
- **Match model:** 4-byte minimum match, predicting the next bit from the longest previous match.
- **Mixing:** three neural mixers selected by partial byte, by previous byte × bit position and by match state; a
  final mixer combines them; then two interpolated APM/SSE stages.
- **Coder:** 32-bit binary arithmetic coding; the decoder is ~5 KB.
- **Speed:** ~5-7 s to encode on a desktop; decoding takes ~5 s in Node, ~15 s in headless SwiftShader.
- Park's copy (`tools/pack/park/`) turns the decoder model, copied verbatim from the Woods page, into an encoder by
  swapping the arithmetic decoder's two lines; it reproduced the published Woods page byte for byte.
- **Why:** Park #8 tried Roadroller and rejected it (bigger at its fast setting, slow to unpack); #10 moved to the
  Woods coder, 227.0 KB → 190.2 KB.

### Compress: Roadroller 2.1.0 (City's route)

None of City's tooling survives; this is what it took.
- **Patch it for 8-bit output.** Stock Roadroller emits 6-bit text, which wastes the gain (City: 240 KB against
  202 KB); City returned raw bytes and used the same 7-bit page as Woods.
- **Input** type `text`, action `return` (HTML is not JS; the loader does the `document.write`).
- **Model memory** 150 MB (64 MB cost ~4 KB, 32 MB ~8.5 KB; 300 MB gave nothing).
- **Tuning:** optimize level 2 takes ~25 minutes and is ~0.5% smaller than level 1; never level 0 (no tuning, ~2%
  bigger). Re-packing with known-good options skips the search. City's options (re-tune for another page):
  `sparseSelectors [1, 2, 3, 7, 11, 14, 21, 99, 178, 212, 313, 465]` (12 contexts), `maxMemoryMB 150`,
  `modelMaxCount 4`, `modelRecipBaseCount 23`, `recipLearningRate 1910`, `dynamicModels 1`. Six contexts decode
  ~30% faster but cost ~8 KB.
- **Decoder:** stock Roadroller decodes ~1 s per 30 KB, too slow for 750 KB. City hand-wrote a bit-identical
  decoder ~5× faster (~5 s for 750 KB on a desktop), allocating ~150 MB briefly, freed before the game boots.
- `Math.log`/`Math.exp` must match between Node (encoder) and the browser; Roadroller's author documents this as
  safe across engines.

### The 7-bit page

- The compressed bits are packed 7 per character into `<script type="b">` (a type the browser never runs).
- Groups 0, 13 and 60 (NUL, CR, `<`) break inline script text: each is escaped as one character in 128-511 that
  also carries the next group, so escapes cost nothing. Assert the payload never contains `</script`.
- The outer page is minimal: doctype, charset, viewport, the title, a dark background and one line ("Unpacking
  <name>…" or `LOADING`), which must paint before decoding starts (first contentful paint within ~50 ms;
  screenshots can't show it, so check the paint timing).
- The loader unpacks the 7-bit text, runs the decoder (Woods updates `LOADING nn%` every 16 KB), then
  `document.open()`, `document.write(page)`, `document.close()`. Pass the game's title to the page writer, or the
  wrong title shows while unpacking.
- Find the payload by id or type, never `document.scripts[0]` (it breaks if a viewer injects a script).
- Stay 7-bit: pages may be served as `text/html` with no charset.

### Checks before every push

- [ ] The round trip is exact with the decoder that ships in the page.
- [ ] In a real browser the string passed to `document.write` is byte-identical to the unpacked page, on desktop
      and in Quest mode.
- [ ] The unpack line paints within ~50 ms.
- [ ] The ordinal test passes direct and in the sandboxed iframe, on desktop and a Quest (or, for Town, a phone)
      user agent: start screen, canvas, no page errors, no CSP violations, iframe origin `null`, no blocked
      requests (Town: `tools/test/ordtest.js`, desktop and `MOBILE=1`).
- [ ] It boots when served as `text/html` with no charset.
- [ ] No `http://`, `https://`, `fetch(`, `XMLHttpRequest`, `localStorage`, `eval(` or `Function(` in the outer page.
- [ ] Under ~400 KB; only `index.html` changed, and `tools/index.html` holds the same page, readable
      (`tools/test/copycheck.sh`): the copy is made before the root is minified or packed and is never
      compressed itself (the owner's rule, for every game).
- [ ] If game code changed: every shader program compiles (`renderer.info.programs`, `diagnostics.runnable`;
      Town: `t_shader.js`); a full playthrough has no errors (Town: `battery.sh`); every pair scene plays, normally
      and with talk forced; 15 minutes of the director and a long soak with VR enter/exit cycles; a seeded 7-view
      pixel compare against the previous build (`px.js`) shows 0 differing pixels unless the visuals changed on
      purpose.

### Tried and not worth it

Terser `unsafe` options (~100 bytes, semantic risk); a larger compression model (no gain); squeezing whitespace in
shader strings (4 bytes); `document.scripts[0]` (~10 bytes, fragile); reading the page back with `fetch` for 8-bit
payloads (Park #8: unreliable in ordinals, undone by #9).

### Size history

| Build | `index.html` | Unpacked | Packing | Unpack time |
| --- | --- | --- | --- | --- |
| City, before #20 | 227,963 B | 746,606 B | LZMA | ~2.5 s |
| City, #20 | 202,215 B | 746,606 B | Roadroller + fast decoder | ~7 s |
| City, #22 | 196,685 B | 730,166 B | Roadroller + fast decoder, engine warnings stripped, deep tuning | ~5 s |
| Park, before #10 | 227,030 B | 723,713 B | LZMA | ~2.6 s |
| Park, #10 | ~190,200 B | – | Woods coder | – |
| Park, #15 | 158,491 B | 586,728 B | Woods coder | ~5 s (Node) |
| Woods, before #8 | ~195,000 B | – | – | – |
| Woods, #9-#10 | 160,734 B | 621,052 B | its CM coder | ~7.9 s |
| Woods, #11 | 159,952 B | – | its CM coder | – |
| Woods, #12 | 155,649 B | 589,715 B | its CM coder, trimmed engine | ~5 s (Node) |

Park's 158.5 KB broke down as three.js ~54 KB, engine 26, models 15, vignettes 12, text 11: models are cheap, the
engine dominates.

## 5. Audio

All sound is synthesized with WebAudio. No guide said more than "sounds are synthesized … and get quieter with
distance"; this is from the code.

- **Sound effects** (the engine's `G`, the same in all three): one oscillator plus a gain with an exponential ramp
  per note; named voices (blorp, howl, bump, heart, pickup, crackle, splash, textTick, a kick, snare and hat);
  `G.near(x, z, r, name)` scales volume by `0.25 + 0.75·(1 − d/r)²` from the VR head, with hearing radii in the
  config's `hearR` (goo 22, ambient 18, howl 30, music 11).
- **Resume after headset off or idle:** create the context lazily on the first `pointerdown`, `keydown` or
  `touchend`; every sound call resumes a context that isn't `running` and skips that note; resume on `suspended` or
  `interrupted` (Safari); retry on `visibilitychange` (now and 300 ms later), `pageshow` and `focus`; on the XR
  session's `visibilitychange`, snapshot or restore canvas textures and reset the game clock (`Re.resetClock()`)
  so `dt` doesn't jump.
- **Music:** City's `gcJazz`, a 132 BPM swing blues in F for a synthetic horn section, scheduled on the audio clock
  with 0.8 s look-ahead from a time-sorted queue; after a stall it skips missed bars and drops late notes instead
  of bursting them; reverb is a convolver on a 1.8 s decaying-noise impulse. Woods' campfire song is an 88 BPM
  arpeggio on the game clock, fading in over 3 s and out over 2 s. Cutebex sings in pitch: 330 Hz × 2^(n/12).
- **What Town improved** (feed it back if an old game is rebuilt): `latencyHint: "balanced"` on headsets and
  phones (the smallest buffer crackles), a master `DynamicsCompressor` limiter so stacked effects never clip, and
  feedback-delay reverb instead of a convolver, which is hard on standalone headsets.

## 6. Process

### Tools that paid off

The old tools went with their repos unless a Town path is given.

- **Ordinal emulation:** ord's CSP at `/content/` and a sandboxed `/preview/` iframe, desktop and Quest, failing on
  any page error, CSP violation or blocked request (Town: `tools/test/ordtest.js`). Park also had an ord-like site
  (`/inscription/<id>` round a sandboxed iframe), a blocked-frame variant, a request counter, and a server for a
  chosen content type (the no-charset case).
- **Pixel compare with seeded `Math.random`:** 7 fixed views, pixel-exact (Town: `px.js`). It caught the no-trees
  bug and proved Park's merge pass "pixel-identical".
- **Dry-run integrity:** Woods' frozen-part check, City's lab check (the flame still flickers after freezing).
- **Contact sheets and portraits** of every creature from fixed angles (Town: `tools/town/review/`, `tile.py`).
- **Z-fight scan:** City's chain found coplanar faces, confirmed them by rendering, then named them; Park checked
  its automatic fix (Town: `t_zfight.js`, `t_zcheck.js`).
- **Soak and stress:** Woods ran 10 VR enter/exit cycles in a faked session, then an hour of play, checking heap,
  timers, listeners, NaN and stuck states; Park had a VR re-entry driver, a randomized fuzz soak and an emulated
  Quest 3 through IWER.
- **Coverage-driven dead code:** coverage over a broad session, the never-ran list, then a scope-aware
  unused-name finder before cutting (Town: `cov.js`, `uncov.js`).
- **Performance analysis (Woods):** draws by owner, triangles by object, allocations per frame in the live loop,
  matrix-update cost, leaks over VR cycles (Town: `t_perf.js`).
- **UI text overflow audits:** every game had overflow bugs (Woods #4, Park #3, Town #15).

### Owner decisions that recurred

- VR only in the final build; test modes are temporary (Town also targets Android phones).
- **Show, don't tell outside the park** (every game we make): the background environment carries its lore in what
  is seen, never in text; words and signs kept to a minimum.
- **A finished environment is locked down** (every game we make): when the general environment is done, no more
  direct changes to it, as with finished creature models; the owner says when it is done.
- **Locked models and designs can still change, with the owner's approval first** (every game we make): a
  finished creature, a locked room or a locked environment is never changed on our own; ask, and wait for a yes.
- **Keep the checks between builds short** (Town, #99): a quick check of a few minutes (boots, the ordinal
  sandboxes, the shaders, plus the probes for what changed) runs between builds; the full battery, hours long, is
  kept for once in a while. Run game-logic probes at a small viewport: a full-size headless page runs the game at
  about a fifth of real speed.
- **Platforms, for every game we make** (Town, 13 Oct 2026; all Greeblis games past and future, and any game
  after them): Chrome is the only browser ever supported, on
  desktop and on a phone; a phone is only ever an Android phone (no iPhone or any other); Mac computers are
  never supported; in VR only the Meta Quest line in the Meta Quest Browser. Anything else gets a notice, not
  the game (Town's `__jgpBlocked`). Only ever optimise for those supported platforms, never for anything else.
- The final pre-compression build has every label and comment stripped: only what runs the game is packed.
- **For all games: an uncompressed copy is kept in the game's tools folder at all times, in that game's repo**
  (Town: `tools/index.html`, refreshed with every change).
- Only `index.html` is pushed; every game is fully playable as an ordinal.
- Smallest file over load time, with no content cut.
- Keep a ported creature exactly the same (Hennrick in all four games).
- One unique scene and one rare text exchange per pair.
- Creatures matter most; write down how they were built.
- Always work from the latest game files on GitHub, not files uploaded earlier (Park).
- Decorative scenery was removed on request, as a matter of look, not size: Woods #5 the flowers, Park #5 the
  4,800 grass tufts, Town the cars and the far farmland.

### Mistakes repeated across games

| Mistake | Where | Prevention |
| --- | --- | --- |
| Dry run fires real effects at load | City (84 goo blobs), Woods #11 (goo spray) | Stub every effect in the dry run; count effects at boot in a test |
| Animated part frozen or merged | City's lab flame and liquid; Woods' Gratelet never blinked (his first blink fell after the dry run's t = −36..0 window) | Start timers inside the window; a frozen-part check |
| Shared material mutated | City decals; Park ("recolouring one part recolours every part"); Woods | Clone, or `unique: true` |
| Coplanar faces | City eyes and signs; Park 165 + 39 pairs; Town church, stools, dance floor | Offset ≥ 1 cm; an automatic pass; a scan |
| Entity without an `id` | City's "met" key; Town's Zollod menu | Key by id, fall back to the builder key |
| Content cut for size | Park #11 (Hennrick, lore lines, vignette lines, polish passes) | Never cut; pack harder |
| Packing that breaks the ordinal | Park #8 (`fetch`) | The ordinal test on every push |
| Test mode added, later removed | City, Park #2/#6, Woods #2/#6, Town #7 | Keep test modes in tools, hooked in by `dbg` markers |
| Test hooks shipped | Woods (fixed in #11); the City and Woods finals still carry theirs | `dbg` markers stripped and asserted |
| Text overflowing its box | Woods #4, Park #3, Town #15 | An overflow audit in the push checklist |
| Things placed inside moved buildings | Town (a tree and a portrait spot in the church) | Re-check spots after moving any building |
| Shipped page out of step with its source | All three finals are older than their documented sources | Record which source each shipped page was built from |

## 7. Worth bringing to Town

Checked against `index.html` (about 1.1 MB, readable) and `tools/` on 11 Oct 2026.

1. **[Worth bringing to Town] Pack it:** minify, then the Woods coder, with the round trip checked every build.
2. **[Worth bringing to Town] `/*<dbg>*/` markers, stripped and asserted** (Woods), for test hooks (such as
   the testing head start, `TEST_QUESTS`, since removed).
3. **[Worth bringing to Town] Detect a VR-blocked frame up front and link out.** Town only shows text after
   `requestSession` fails. Woods (`gcXrAllowed`, `gcXrLink`) asks `document.permissionsPolicy.allowsFeature("xr-spatial-tracking")` before the
   player tries, says so on the start screen and rewrites `/preview/` to `/content/` as a link (case-insensitively);
   Park does the same when `isSessionSupported("immersive-vr")` is false.
4. **[Worth bringing to Town] A fuller ordinal test.** `ordtest.js` covers only the sandboxed iframe, always with
   `charset=utf-8`: add the direct `/content/` case, the no-charset case, the Quest user-agent gate text, and the
   unpack line's paint timing once packed.
5. **[Worth bringing to Town] VR session tests.** No Town test enters a VR session (the head-guard test uses a
   probe): bring Woods' faked-session stress run or Park's IWER-emulated Quest 3 with a re-entry driver.
6. **[Worth bringing to Town] A frozen-part check** for `KIT.animated`/`KIT.compact`, and every animation timer
   started inside the sampling window.
7. **[Partly there] A per-frame allocation check.** `t_perf.js` samples allocations over seconds of play; Woods
   counted them per frame in the live loop, which is what "never allocate in loops" needs.
8. **[Worth bringing to Town] Auto catchlights and buried-part painting** (Park), as a load pass or an audit for
   pulled models whose eyes are plain dark spheres; never on locked models without asking.
9. **[Worth bringing to Town, if the lawn tufts or envelopes are instanced] View-cone instance culling**
   (`gcVeg`).
10. **[Worth bringing to Town] Keep the readable source next to the packed page,** and note which one each push
    came from: the City, Park and Woods finals drifted from their sources, and Park's cut lines survive only in an
    uploaded build.
11. **Done:** the automatic z-fight fixer (Park's), as `unfightParts()`, with one change: faces looking the same way
    stand 8 mm proud instead of being pushed in and hidden.
12. **Already in Town, keep it:** the quality ladder, foveation, canvas restore (`willReadFrequently`,
    `putImageData`), `keepInFinale`, seeded pixel compare, three.js trimming and pinned terser, the sky dome sized
    from the far plane, the VR head guard (none of the earlier games had one), and the audio fixes.

## 8. The final builds

The owner uploaded a final build of each game. They were decoded to text and compared with the readable sources
**by reading only** (sizes, strings, distinctive identifiers, config values, code shapes); nothing was run, and
differences hidden inside renamed code may have been missed. Each final is an earlier build than the documented
source, matching to the byte an unpacked size the packing guides recorded:

| Game | Decoded final | Matches | Documented source (what this document describes) |
| --- | --- | --- | --- |
| City | 746,606 B | The #20 page (packed 202,215 B) | #22: 730,166 B unpacked, 196,685 B packed |
| Park | 723,713 B | The page before #10 (LZMA, 227,030 B), after #9 | #15: 586,728 B unpacked, 158,491 B packed |
| Woods | 621,052 B | The 160,734 B build from #9/#10, before #11 | #12: 589,715 B unpacked, 155,649 B packed |

So the finals lack City #22, Park #10-#15 and Woods #11-#12, and keep some content those PRs cut.

- **City final:**
  - The 323 KB three.js still has its developer warnings (93 `console.warn`, 41 `console.error`); #22 stripped them.
  - The filter that hides three.js's "Context Lost/Restored" messages matches `"THREE.WebGLRenderer: Context "`, but
    the build step aliasing every `THREE.X` to `T_X` also rewrote that string to `"T_WebGLRenderer: Context "`, so
    it never matches. Alias rewriting must skip string literals.
  - The creature batcher sends 4 vectors per part; the source sends 5 (the fifth carries specular colour and
    shininess).
  - Sparky builds a rainbow tail tuft (4 helical tubes in cyan, pink, purple and blue, 5 curls, 14 floating beads)
    and a pink six-petal flower, both hidden; the source dropped them (Woods' Sparky shows them).
  - In VR the body follows the player's real steps only while playing or in a dialogue or panel, otherwise building
    an offset clamped to 6 m (`xr.driftMax`); the source always moves the body.
  - Config only in the final: `propsBlock: false`, `pizza.spawnR: 75`, `xr.driftMax: 6`, a top-level
    `stallMs: 2500`. Cherubi's after-hand-in line ("You've collected all needed computer chips.") lives only
    inside the hand-in. Test hooks: an `fps` getter and the director logging each scene's result. Neither final
    nor source has a blocked-frame link.
- **Park final:**
  - Each of the 18 lore spirits has **5** lines, against **3** in the source (Hennrick 5 in both): the 36 lines #11
    cut survive only here.
  - All 465 pairs (Hennrick in 30) with the same choreographies, but 4 lines for 332 pairs and 3 for 133 (1,727
    lines), against 2 per pair (930) in the source.
  - Pair scenes speak 10% of the time (15% after #13); BBQ neighbour chats are already 15%, using the first two
    lines.
  - The scenery polish pass (dropped in #11) is present: it classifies scenery by colour and shape into detail
    textures (grass, water, sand, asphalt, bark, wood, needle, leaf, stone, shingle, siding), raises segment counts
    on spheres, cylinders and tori (up to 24-48) and bakes vertex shading.
  - Hennrick still has the City dance code #14 removed (a dance weight raising his arms and swaying him, his face
    screen flipping between dancer frames on the beat). No merge pass (#15); the catchlights, painted buried parts
    and z-fight fix are there. The untrimmed three.js (~323 KB, 99 `console.warn`; the source's is 263 KB with none).
  - Both have the blocked-frame link (a case-sensitive rewrite when `isSessionSupported` is false) and no `fetch`.
- **Woods final:**
  - Its three.js is byte-identical to the untrimmed bundle #12 started from (294,152 B, 85 `console.warn`); the
    source ships the trimmed 261,946 B build.
  - No view-cone culling or nearest-first sorting of vegetation (#12).
  - Gratelet never blinks: his first blink is scheduled 3-6 s after start, outside the dry run (the source: about
    −30 s).
  - The blocked-frame check tests the URL case-insensitively but rewrites `/preview/` with a case-sensitive replace.
  - Test hooks shipped: the vignette table getter, the `VIGNETTES` export, the VR `enter` export, the forced-pair
    hook, an `fps` getter, a loop `restart` and the director's result log.
  - Dead code #11 removed is still there: bunny face options (bead eyes, a small smile), Orson leg parts tagged with
    a junk colour (`"#c9a martial"`) and filtered out before merging, placeholder dialogue ("place holder text 1" to
    "3") on Mont and the Professor (probably never shown), and the config keys `xr.smoothTurnRate` and `stallMs`.
- **Could not be told by reading:** whether the other Woods #11 fixes (goo at boot, walking in place, the courier,
  the bun date, the lamp at dusk, VR double entry, controller re-sync, context restore, the quality controller,
  Hennrick's finale dance) or the per-frame allocation fixes (Woods #12, Park #15) are missing; what City #22
  changed beyond the engine warnings (City kept no PR history; only #20 and #22 are known).
- **What it means:** the lessons here come from the newer documented sources. The finals hold content the sources
  lost (Park's 36 lore lines and ~800 vignette lines, its polish pass, City's hidden tail tuft): reuse Park content
  from the Park final.

## 9. Where the Town cast came from

The originals of Town's pulled, merged and named creatures, as their games described them. Town still uses the
old ids for several (`gratelet` is Hennrick, `frog` Fortizmo, `drifter` Mushroom). Town's versions are in
[creature-profiles.md](creature-profiles.md).

### Pulled unchanged (or wrapped)

- **Hennrick** (City id `gratelet`, 3.0 m, 58 meshes / 26.1k triangles): a broad furry robot-beast of jittered
  ellipsoids; fur shoulder pads, arms with chrome bracelets, cyan-lit cuffs and orange claws, stubby legs with
  chrome knee spikes. A 2,600-stroke fur canvas as map and bump on very matte Phong (shininess 6): purple `#c85ac8`
  with an orange belly, chrome `#9ca3ae`, glossy orange claws and tusks, cyan and green glows. Face: a chrome
  screen box of scrolling green pixels, nine cyan bulb eyes in chrome rings that blink together, orange tusk
  mandibles, a beard of four segmented tentacles pushed out of the body every frame. Signature: a chest "grate" of
  orange plates with glowing green seams. In City he patrolled the lab's stations (the scientist working on the
  portal, "first through the portal"), hopped on talk, spun a full turn singing, and danced arms up with his screen
  flipping between pixel dancer frames at 88 BPM. In Park (scale 0.88) he walked a 4-point survey round the portal
  taking readings, with 5 lore lines; in Woods he roamed within 6 m of his portal, pausing 3-8 s, "a delighted
  geoengineer", and danced only at the finale.
- **Montgummery** (Woods' Mont, the census robot, 2.97 m, `modelScale` 0.9): a dark superellipsoid capsule body with
  a blue belly circle painted on its UV map inside a slightly larger transparent shell scrolling Courier "code
  rain"; code-textured legs, arms and tail; blue boots with orange toe and heel and yellow laces; jointed blue robot
  hands. A CRT monitor head (scale 1.32), tapered back, with a teal bezel, a top handle and a purple gradient screen
  showing orange "gfxinfo" text, code, a white pixel face (two tall eyes and a block smile, which Town flattened)
  and glare. He wandered, ran the census quest, and nodded on talk (decaying over 0.9 s): "HUMAN. I AM HERE ON
  OFFICIAL BIZZNESS", "CAMPFIRE SUSCESSFUL" (sic), "THANK YOU HUMAN". City's Mistergummery (id `mont`) was the cyan
  CRT-headed robot who ran the burger shop; Park's Montgummery a boxy circuit-textured robot with a screen head and
  waving arms (idle moments: glitch, spin, reboot).
- **Nextessa** (the courier of City and Woods, one builder): three merged orange base spheres, three stacked segment
  spheres with cone nubs, a box snout and yellow eyes; a pizza box on her head (the `carry` point); 3.22 m in Woods
  (`modelScale` 0.92). Called by phone, she arrived (in Woods from 58 m out) at 3.2 m/s, hopping with squash and
  stretch, her segments waving in turn: "This is Nextessa's Inter-temporal Pizza Place!|If it's not there
  yesterday, it's free!", "Make pizza -> Deliver pizza -> Return -> Make more pizza. I love my job." Not Park's
  NEXTESSA, a list keeper (an orange coiled stack of rings holding a list board) who walked a figure-eight.
- **Fortizmo** (City, 2.9 m): a furry orange (`#e8742a`) pear-shaped elephant on two spring-and-wheel legs (helix
  spring tube, tyre torus, spokes), short arms with finger spheres, a hanging-fur canvas as map and bump, a cream
  belly patch with black cones studding its seams, two glossy black eyes and freckles, no mouth. Her trunk morphs
  into a horn as gold valves scale in; the wheels roll by distance; playing, a stretchy IK holds the horn and the
  valves pump at 88 BPM; on talk she lifts the trunk and toots an arpeggio. The galaxy-famous concert singer who
  only says "♪".
- **Anomalee** (City, 3.1 m, 1.2k triangles): voxel retro hardware built only from boxes: a tilted body on three
  jointed legs (the fourth hidden), a CRT head, a modem backpack with dangling cables, a crocodile jaw with tooth
  cubes and a keyboard lip, a handheld device; pixel-art textures with `NearestFilter` on flat-shaded Phong (olive,
  cyan, magenta stripes, "adb" labels). The screen is her face: idle magenta with WiFi arcs, a static glitch,
  equaliser frames dancing. A three-legged trot, random jaw chomps, glitch bursts every 5-13 s; a prisoner arrested
  for eating transistors ("HAPPY cozy nice KENNEL"). Woods' Anomalee was a box-built VHS deck that shrank out and
  reappeared elsewhere on a 30 s cycle, speaking in a broken system log ("EMERGENT properties enabled. MISSING data
  table.").

### Merged

- **Mushroom** = City's + Woods' Mushroom. City: a lathe stem with four root toes, a lathe cap with a curled lip, a
  gill ring and 10 raised cream spots; seeded textures (fibrous cream stem, `#e8862a` cap gradient with speckles,
  radial gills); eyes, sly inward brows and pink blush on the stem, no mouth; blinks every 3.1 s, the cap wobbles,
  it spins and bobs dancing; a jailed prisoner who says only "..." and "All going to plan." (a gift triggers its
  escape). Woods: a flared, streaked lathe stem, a half-sphere cap (y-scale 0.72) with a darker rim torus, radial
  gills and 13 cream spots, eyes and blush on the stem, blinks every 4.2 s; Maltoe's servant ("...", "I serve
  Maltoe!").
- **Gooward** = City's Howard + Woods' Gorbo + Mama Gorbo.
  - Howard (City id `gorbo`, 2.65 m): a lumpy cloud of 6 ellipsoid blobs merged into one mesh (normals from the
    blob gradients, so seams stay smooth) over 28 random-walk root tendrils with 2 side branches each; vertex colours
    from cyan `#30b4e4` to purple `#7a3ae0`, darker beneath, with projected magenta, purple, lime and yellow discs
    and two wavy teal seams; two white plus-sign eyes with black outlines that blink, no mouth; yellow leaf tufts,
    two square flank ports, a glossy pink Verlet hose, a dashed yellow halo. Spurts black oil every 2.5-5 s with a
    "blorp"; squashes, hops and splats on talk; says only "Blooooomp!"; Kollod follows him and cleans up the oil.
  - Woods' Gorbo (2.65 m): a sphere scaled (0.72, 0.9, 0.62) with an upper-right bulge and two-octave sine
    displacement, flat `#33b6ea` on glossy clay; two asymmetric badge eyes (pink octagon disc and ring round a
    purple half-dome); a lime U-tube with a magenta outline, yellow tetrahedron crystals, a red disc with a WiFi
    decal, a floating purple WiFi icon, and a Verlet goo arm of 5 strands carrying red "AP" and "IP" badges. Bursts
    6-9 goo blobs every 2.5-5 s; on talk a crouch, a big hop and a 12-blob splash. "Goooooooooom!"
  - Park's GORBO (3.7 m): a teal-blue lumpy jelly dome on a yellow-green goo ring that sprays goo on talk (idle: a
    big hop, a spin-spray, a jiggle).
- **Mama Gorbo** (rebuilt from artwork as a merge with Gorbo). Park's MAMA GORBO (id `leech`, 2.7 m): a peach
  `#f2a06a` body (a sphere stretched 1.18 tall) with two lumps; two octagonal ports with magenta rims and purple
  centres that pulse; a lime and a yellow goo arc across her front; two pale cream wisps; three red tags ("AP", "IP",
  "~") orbiting at 1.4 m. She bobbed gently and circled near home always facing Gorbo, a warm mother: "you spend so
  long teaching them everything you know. and then one day they do something you never taught them — better than
  you ever could."
- **Sparkakus** = Park's Sparkakus + Shopstar (a Town-era creature). Park's SPARKAKUS (id `sparky`, 2.75 m, built
  facing +x): a blue-and-white wolf-dog with one big eye and blue legs, trailing mist (90 particles rising and
  drifting from the tail tip, 2 s each). Idle moments every 8-18 s: zoomies (two laps of a 4.2 m circle in 3.4 s), a
  3 s howl, a 2.2 s sniff; he bowed when the player was within 5 m after hearing three of his lines, wandered, and
  faced where he ran. Town kept the mist. The `sparky` id goes back to City's Reverend Spark (a teal dog sitting
  upright with a clerical collar and two WiFi antennae) and Woods' Sparky (a blue confetti-specked hound with a
  cream mane, a rainbow tail tuft and two antennae taking turns "sending").
- **Somlet** = Woods' Gratelet + Park's Somnux.
  - Gratelet (2.75 m, colour `#ecd8b6`): a sphere with a custom profile (flat top and bottom, slight belly, sine
    lumps) in cream `#e4cba0` to ochre `#d2a146`; a 2.3-turn spiral tube on the front, 5 shell plates of concentric
    half-tori (grater ridges), 12 ochre spots, 2 top tufts, stubby arms; sleepy eye mounds with brow lumps, dark
    slit eyes blinking every 4.5-7.5 s, pink blush, a nose bump, a small mouth; 8 red jointed tendrils swinging as
    two-segment pendulums. Hops on talk with a 12-blob healing goo burst; throws three goo arcs at the player for a
    blossom. "I am a healer. My blood when given can heal many illnesses."
  - Somnux (Park id `stanbi`, 4.5 m): a cream boxy body with a canvas sleepy face (closed eyes, rosy cheeks, a
    little snoring mouth) and a navy starry sleeping cap with a fur brim and a floppy pompom (Park #6 added them); a
    dream spirit drifting in slow loops, then settling; emotes "Zz".
- **Zollod** = City's Zollox + Kollod.
  - Zollox (City id `cutebex`, 1.75 m): a floating axolotl-centipede: a head, a curling trunk ending in a flower of
    8 yellow cones, 12 instanced body segments each with a spine, two rowing paddles and cilia, a magenta and purple
    tail fan; teal sides, darker belly and navy top in vertex colour, a dimpled bump map; five stalk eyes with
    magenta faceted eyeballs. A travelling sine wave runs down the body, the flower mouth opens on the beat, and it
    barrel-rolls every 8 beats. The patient on the repair bed.
  - Kollod (City id `orson`, 1.6 m): a flat crawling slab tiled by a recursive packer into green panels with slots
    and LEDs, a fan frill; a neck of 10 and a tail of 22 instanced finned boxes; salmon hinged jaws with teeth; five
    black glossy stalk eyes; a screen of tumbling cubes, a lantern, a battery with a blinking LED, a swinging bulb;
    gold solar-cell textures and a lime hex-text screen. Sends "01"/"10" chirps; an earnest janitor AI who follows
    Howard and cleans his oil.
  - Woods reused both ids: Cutebex, a singing leaf bush, and Orson, a bard bird with a lute.

### Named after, or borrowing from, earlier creatures

- **Glyph** carries Park's Gigglyph's two purple tiles. GIGGLYPH (Park id `ripplz`, 3.1 m) was a round blue water
  creature with a big grin in a pink-ringed splash pool, leaping out every 9 s with a full twirl (emotes ♪ !, a
  splash sound).
- **King Dino** plays Woods' kit, a third bigger. Woods' King Dino (2.79 m, `modelScale` 0.82): a big speckled
  yellow `#f2d417` body with a snout, teal back plates and a curling teal tail, black glossy box "lens" eyes, a
  purple crown with three gem-topped stems and two drumsticks; his red lacquer kit (white heads, chrome, brass
  cymbals, toms, snare, floor tom, hi-hat, crash, a "KING DINO" logo) played 104 BPM, 4 bars on and 4 off, and on
  every beat he bounced, alternated feet and struck with alternating sticks ("Music is my kingdom." "King Dino counts
  you in: one, two, three, four!"). Park's KING DINO (id `dribblz`, 3.45 m): a tiny ancient king, a round yellow
  body with cyan spots and a teal crown, patrolling a 2.4 m circle with little hops ("greatness is not the size of
  your kingdom, small friend. it is refusing to shrink to fit it."). City's `kingdino` slot was Sunny, a yellow
  T-rex who sprang on a coiled orange tail and hosted the dance-off.
- **Gemtoe, Etcher and Backpacka** were built new from artwork. Park had a magenta gem-hoarding bird, Gemwing, and a
  rune carver, Etchelon; nothing links them to Gemtoe or Etcher.

## Flicker in VR: design for a 16-bit depth buffer (Town #95)

The owner's three flicker reports (distance flicker in VR above all; the secret room's floor details, 1 to 3.5 mm
over the floor; the street lines, 3 to 5 cm over the roads, on a phone) all fit one cause: a depth buffer far
coarser than the 24 bits a desktop gives. A 16-bit one with the near plane at 0.15 m tells 1 mm at 3 m, 1.5 cm at
10 m and 9 cm at 30 m, so every "lies on" surface a few centimetres over another fights in the distance. The fix
that holds whatever the buffer: constant `polygonOffset` steps (the ground back 4, the lawn back 2, road markings
and window panes forward 2; never a slope factor), 2 cm gaps for wide overlaps, a near plane as far as the game
allows (0.2 m flat, 0.15 m in VR), and a depth-bits readout in the error report to confirm on the device. The
headless renderer is no judge of this: it fights 2 cm gaps next to the camera for reasons of its own (a road
triangle straddling the near plane) and differs frame to frame at a pitch of exactly 0°.

## Next: the Meta Quest optimisation pass (started, not yet built)

The owner's top priority and a rule for every game: optimised for the Meta Quest Browser, performance always
improved but never at the expense of quality. The baseline, from `tools/test/t_perf.js` (desktop mode, 1.6 m
eye, 100° lens):

| Measure | Worst view |
| --- | --- |
| Draw calls | 400 (south gate); 349 dance floor, 353 Juice Bar |
| Triangles | 527k (south gate) |
| CPU per frame | 3.06 ms (2.82 ms three.js) |

Where to start: the Garden Supplies kiosk is 52.8k triangles in one mesh, seen from almost everywhere; the Post
Office with its mail heap 46k; Gooward 37 draws; Anomalee 10 draws for 0.5k triangles; the phone booth 8 draws for
0.5k; about 120 small unnamed objects at the south gate cost 2 draws each. On the CPU, `updateMatrixWorld` takes
1.5 ms (static subtrees still update every frame), the creature batcher `Qe` 1.3 ms, and state changes
(`depthMask`, program switches) about 1.8 ms together. Areas to check: merging static parts, static matrices,
lossless triangle removal (hidden faces), the XR path (foveation, multiview, frame rate, per-frame allocation).
Every change must be pixel-lossless or under a pixel or two on the headset, measured before and after.

**Part one (#89), the scene graph, lossless to the pixel.** `tools/test/t_matrix.js` counts the matrix work:
the scene is 2,122 objects (1,463 meshes, 638 groups), ~1,640 of them with `matrixAutoUpdate` on and almost all
of those still, yet every frame composed its local matrix and multiplied its world matrix again: 1,946 composes
and 2,465 multiplies a frame. Now `Object3D.updateMatrix` (patched in the bundled three.js) composes only when
position, rotation or scale changed since the last compose, and `add` marks a re-parented object's world matrix:
328 composes and 1,357 multiplies a frame (the rest are the moving creatures' subtrees and the renderer's
model-view matrices). The creature batcher's per-frame update (`Qe`) leaves a part alone whose matrix, colour
and on-state are unchanged and recomputes a batch's bounds only when something in it changed: `t_static.js`
shows 37 of the 130 batches (358 parts, the scenery the batcher batches too) never change. The world-matrix
pass still visits every node (2,346 a frame) and the renderer's `projectObject` as well: the only way down from
there is fewer objects. Batching across creatures and props (by material signature within 24 m cells) was
built, measured and dropped: the signatures differ too much (14 draws fewer of 400 at the south gate) and the
wider batches cull less (3% more triangles per view).

**Part two (#90), the pickups.** The Flint stones were not instanced (their glints had a material each, for a
pulse of opacity stone by stone), so a view of the south gate drew 33 stones at two draws each. With the glints
sharing one material and each stone's pulse carried in a spare slot of its instance matrix (read by a patched
shader that also puts the position's `w` back to 1), the stones are two draws in all: south gate 400 → 323
draws, spawn 215 → 186, garden edge 216 → 182, dance floor 344 → 280, Library 284 → 222, Post Office 218 → 172,
plant row 279 → 231, Juice Bar 345 → 277; triangles per view unchanged. Gooward's 37 draws are his 22 bubbles
and drips, transparent and depth-written: merging them would change what blends behind what where they overlap,
so they stay.

**Part three (#96), hidden faces and uniform uploads, lossless to the pixel.** `dropInside` leaves out of each
kiosk merge the faces that lie wholly inside another solid part (a letter's underside sunk into the one below,
a stalk's end in its bulb): 8,900 faces, the Garden Supplies kiosk 52.8k → 47.6k triangles, the Library 20.9k →
18.7k, the Juice Bar 16.9k → 15.8k, the views 3 to 12k triangles lighter (spawn 366k → 356k, the Library 383k →
371k, the Post Office 412k → 402k); about 80 ms at load, the 4,000-letter mail heap skipped as not worth its
time. Each batch's `gcR` array holds only its own parts, so the per-draw upload shrank from 2 KB to a few
hundred bytes (`uniform4fv` 1.43 → 1.05 ms a frame here). `test/pxcmp.js` compares two builds pixel by pixel
with everything time-dependent hidden: 0 differing pixels on ten views. The profiler's `[getParameter]` time is
a misattribution (the page makes one such call a second), not a target.

**What is left, in order of likely worth:** (1) fewer objects: the batched creature parts (~850 hidden meshes)
and the scenery's small props are the bulk of the 2,122 nodes the two per-frame passes walk; (2) the GPU's
triangles per view (360k to 540k, drawn twice in VR): the 52.8k-triangle Garden Supplies kiosk and the 46k Post
Office in particular, where only lossless removal of faces that can never be seen is allowed; (3) draw calls
(205 to 386 per view): the church (23), the Library (35 at the south gate), Gooward (34), the garden's planters
(16 to 18), Anomalee (10 for 0.5k triangles); (4) the batcher's per-draw `gcR` upload (128 vec4 for every batch,
most holding 2 to 7 parts); (5) the XR path (multiview is not in this three.js). The headless profiler's
millisecond figures vary a third from run to run here; count work (`t_matrix.js`), draws and triangles
(`t_perf.js`) instead, and measure on the headset.
