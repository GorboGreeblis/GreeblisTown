# Greeblis Town USA: Creature & Environment Construction

How the creatures and the town of **Greeblis Town USA** were built. The game lives in the JurassicGreeblisPark
repo, and its single readable `index.html` is the source. Use this alongside
[greeblis-city/construction.md](../greeblis-city/construction.md) (the Greeblis City reference) when building the
next game. Per-creature detail is in [creature-profiles.md](creature-profiles.md), and every PR is listed in
[history.md](history.md). A copy of the shipped page and size notes are in
[games/greeblis-town-usa](../../games/greeblis-town-usa/README.md), and every tool used to make and check the game
is in [`tools/greeblis-town-usa/`](../../tools/greeblis-town-usa/README.md).

## Rules

These are the owner's rules from this game's development, on top of the standing rules in [CLAUDE.md](../../CLAUDE.md):

- **Creature models, behaviour and interactions matter most.** Take the time to do them well.
- **No bones** anywhere: no skeletal rigs and no bone props.
- **A merge is a new, cohesive creature.** It blends its parents' silhouettes, palettes and signature features. It
  is never parts glued together.
- **Artwork reimaginings:**
  - A creature rebuilt from artwork takes the artwork's shape and features.
  - Keep its current colour and size when asked.
  - Ask before guessing what an ambiguous shape is. Mama Gorbo's pink-and-purple octagons are her eyes.
- **No cartoony smiles.** Faces are expressive but understated (Montgummery's screen mouth is a flat line).
- **Nothing clips:** not into the body, the ground or another part, from any angle, including views from inside
  buildings in VR.
- **Locked models are never changed:** Nextessa, Gooward, Mushroom, Backpacka, Fortizmo, Anomalee, Zollod,
  Etcher, Hennrick and Montgummery. Each carries a "This model is final" comment (for the pulled Hennrick and
  Montgummery, on the line above their builder in the pulled module and in `ROWS`).
- **Creature menus hold only Talk and Blossom.** Planting and dancing are creature animations, never menu
  options. The Garden Supplies keeper, Zollod, only opens the shop.
- **The pickups are called Blossoms** (not Fire Blossoms) everywhere.
- **NPCs stand still in rows.** Dialogue is placeholder text unless asked otherwise. Shop and quest menus are
  written in full.
- **No words on windows.** Signs may carry names.
- **Every creature has at least three animations:** talking, planting and dancing.
- **Stay a playable ordinal:** one self-contained file with no outside requests.
- **Test on Android, mobile and Quest VR** screen sizes and frame rates.
- **Write down how creatures and environments were built for every game** (this file and the profiles).

## At a glance

```
Definition (ROWS entry)  ->  Builder so[name](group, def)  ->  born(): blink + find moving parts + merge the rest
                                                                  |
Every frame:  step(t, dt, talk, walk)  ->  rows stand still  ->  vignettes (15%)  ->  Garden Event roles
```

Builders come from three places:

1. **Pulled:** models extracted from earlier games, registered as `city_*` and `woods_*`.
2. **Born:** new designs and merges written as readable builders, registered as `born_*`.
3. **Wrappers:** a few small wrappers around pulled models, such as `anomaleePeg` and `fortizmoPick`.

## Creature roster

| Creature | Builder | Row | Signature | Status |
| --- | --- | --- | --- | --- |
| Sparkakus | `born_sparkakus` | Library (librarian), stand-in in the lineup | Royal-blue alebrije wolf on two legs, star-tipped tail with glowing mist; gives the Ancient Artifacts quest | |
| Mama Gorbo | `born_mamagorbo` | Lineup (south end) | Round bright-peach goo drop with a goo foot, port eyes that blink, goo runs and drips, colourful goo streams, lime tail, orbiting tags; shoots goo at the player when given a Blossom | |
| Montgummery | `woods_mont` | Lineup | Robot with a CRT head (Greeblis Woods' Mont), flat screen mouth | Locked |
| Glyph | `born_glyph` | Lineup | Porcelain-blue dinosaur with filigree, gold R shield, purple tiles with trident coins | |
| Somlet | `born_somlet` | Lineup | Sleeping square cotton puff, mail carrier's cap with gold envelope badge, drifting Zs | |
| Gemtoe | `born_gemtoe` | Lineup | Crimson feathered dragon with a bird's face, two pairs of wings, crystals held up by four tails | |
| Hennrick | `city_hennrick` | Lineup | Pulled from Greeblis City | Locked |
| Etcher | `born_etcher` | Lineup | Serpent-dragon rising from a bell of scales, purple tentacle tails | Locked |
| King Dino | `born_kingdino` | Drum set at the back of the dance floor's extension | Lemon-yellow gummy dino, turquoise crown, side plume; drums all through the Event | |
| Gooward | `born_gooward` | Final row | Howard + Gorbo + Mama Gorbo goo family | Locked |
| Nextessa | `city_nextessa` | Final row | Pizza courier through the portal | Locked |
| Backpacka | `born_backpacka` | Final row (stand-in) | Event climax: drinks the pond and sprays the garden | Locked |
| Mushroom | `born_mushroom` | Final row | Glowing cap, sheriff's star and hat | Locked |
| Fortizmo | `fortizmoPick` (`city_fortizmo`) | Final row | Jazz horn for the Event's song | Locked |
| Anomalee | `anomaleePeg` | Final row | Wooden peg leg | Locked |
| Zollod | `born_zollod` | Final row | Two-legged gardener with a mossy back garden, apron and trowel | Locked |

## How creatures are built

### Pulled models

Models from earlier games are extracted with only the helpers they reach and wrapped in a module. Engine
services are captured as `$x` aliases, because the original minified code shadows one-letter names.

```js
const JGP_WOODS = (() => { const $R = R, $S = S, $T = T, $ao = ao, $b = b, ...;
  return { mont: function (e, t) { /* original builder */ } }; })();
const PULLED = { city: JGP_CITY, woods: JGP_WOODS };   // registered as so.city_nextessa, so.woods_mont, ...
```

A builder that throws never stops the game booting: the registry wrapper reports the error and leaves that
creature empty.

### Born creatures

New designs live in `BORN` and are registered as `so["born_" + name]`. Each builder starts with a plain-language
comment describing the creature (silhouette, palette, signature features, behaviour). That comment is the
design brief and is kept up to date with the model.

### From artwork

1. List every visible feature in the artwork first. For Mama Gorbo: the balloon body, two octagon port eyes with
   magenta rims and purple lenses, the lime goo tail hooking underneath, the smoke wisps, the AP / IP / wifi tags
   and the sparks.
2. Build them all, render from four sides, compare with the artwork and iterate.
3. Ask before guessing what an ambiguous shape is: Mama Gorbo's pink-and-purple octagons turned out to be her eyes.

### blobBody: one smooth sculpted skin

This is the main tool for organic bodies. It blends ellipsoids into one signed-distance field and meshes it by
casting rays out from a centre point.

```js
const C = [0.02, 1.6, 0.02],                  // must see every part
  bb = blobBody([
    [0, 1.9, 0, 1.13, 1.0, 1.08],             // [cx, cy, cz, rx, ry, rz, tiltX?, turnY?]
    [0.04, 0.72, 0.04, 0.84, 0.62, 0.82],
  ], C, { k: 0.3, col: (p, fold, cc) => cc.set(PEACH).offsetHSL(0, 0, -0.05 * fold) });
keepR(bb.geo, gradMat("goo", { shine: 110 }), body);
const { p, n } = bb.hit(C, [0.42, 0.5, 0.8]);  // a skin point and its normal along a ray
```

- **`k`:** how softly the parts melt together (0.2 is firm, 0.3 is goo).
- **`fold`:** 0 to 1, how deep a point sits in a crease. Darken by it for natural shading.
- **`hit()`:** places every eye, plate, port and tag on the skin. Never guess a surface position.
- **Small ellipsoids half out of the surface** make runs, lumps and folds (Mama Gorbo's goo runs). Colour them
  in `col` by distance to each part to make them paler or glossier.

### Lathes, tubes and decals

- **`latheGeo(smoothProfile(points))`:** anything round in section, such as stems, caps, cones and berries.
- **`ridgedTube(points, r0, r1, n, ridges)`:** tails, horns, tentacles, hoses and smoke wisps (tapered, with
  optional rings).
- **`onEllipsoid()` and `faceTo(group, normal)`:** lay flat details (spots, badges, decals) on a curved surface.
- **`cards`:** feathers, fur and quills as merged cards.

### Surfaces

- **`KIT.surf(kind, colour, {rep, bump, shine})`:** a painted, tactile texture. The kinds are scale, fur,
  feather, fabric, felt, metal, goo, skin, soft, plastic, rubber, wood, leaf, stone, thatch, sand, soil and grass.
- **`gradMat()` with vertex colours:** gradients baked into a body.
- **`texturize(group, kind)`:** gives a whole model's plain parts one finish.
- **Glows:** unlit `MeshBasicMaterial`, used for rune strokes, lens glints and the light bulb.

### Faces, limbs and parts

- **Eyes:** `KIT.eye(parent, pos, r, {iris, white, lid, open})` builds a full eye with a lid. Pass the lids to
  `born()` and they blink on their own.
- **Eyes that aren't eyeballs can still blink.** Mama Gorbo's port lenses squash to 6% height for 0.18 s every
  2.5 to 6 s.
- **Limbs:** `KIT.arm` and `KIT.leg` build jointed limbs (shoulder and elbow; hip, knee and foot with claw, pad,
  paw, boot or hoof). `KIT.stride` walks them.
- **Hats:** they sit on the head group so they move with it. Build brims and visors as thin solids, never as a
  single-sided plane (Somlet's flat visor vanished from below).

### Animation

Every born creature ends with `born()`, which handles blinking, finds the moving parts and merges the rest:

```js
return born(g, {
  height: 2.95,          // for the talk UI and name tag
  lids,                  // blinking eyelids
  step(t, dt, tk, wk) {  // tk: talking 0..1, wk: walking 0..1
    body.scale.set(1 - 0.018 * br, 1 + 0.035 * br, 1 - 0.018 * br);  // breathing
    body.position.y = 0.04 * tk * Math.abs(Math.sin(5 * t));       // talk bob
  },
});
```

- **Idle, talk and walk:** every creature breathes or sways at idle, bobs when talked to, and strides when it walks.
- **Talking, planting and dancing:** every creature has all three (see "Planting and dancing" below).
- **Merging:** `KIT.animated` samples `step` to learn which nodes move, and `KIT.compact` merges everything else
  per material. Mark a mesh `userData.keep = true` to keep it separate (transparent parts, sprites, materials
  that animate).
- **Effects that make creatures feel alive:**
  - goo drips that swell, fall and leave an `Nt.splat`;
  - Somlet's drifting Z sprites;
  - Sparkakus's tail mist;
  - Mama Gorbo's orbiting tags and her flowing goo streams (see "Flowing goo" below);
  - King Dino drumming in time with the drum sounds.

### Planting and dancing

Planting and dancing are whole-body moves layered on top of each creature's own `step`, so they work for pulled
models too.

- **Tables:** `MOVES` gives each creature a planting move and `DANCES` a dance, keyed by creature id:

  ```js
  const MOVES  = { m_somlet: ["pat", 1.5, 1.1], p_glyph: ["dig", 2.3, 1], ... };          // [move, speed, size, extra?]
  const DANCES = { m_kingdino: ["groove", 5.45, 1.1], p_mamagorbo: ["jelly", 5.45, 1], ... }; // [dance, beat rad/s, size]
  ```

  - Planting moves: dig (lean in and scoop), pat (rock and press down) and scatter (turn and toss).
  - Dances: bounce, sway, twirl, hop, wiggle, twist, robot, shimmy, stomp, groove and jelly (a squash and
    stretch for goo bodies).
  - Dance beats sit near the drum set's 104 BPM (5.45 rad/s is one bob per beat; 2.7 is half time, for Somlet,
    Gemtoe and Backpacka's slower, bigger moves).
  - `plantMove(key, t)` and `danceMove(key, t)` return an offset `{x, y, z, rx, ry, rz, sx, sy, sz}`.
- **Wrapper:** the offset is applied to a wrapper group round the creature (`wt(group)` makes it and `zt()`
  measures its footprint), so the creature's own animation keeps running inside it. The wrapper is made the
  first time the creature plants or dances. Feet are kept above the ground.
- **Driver:** one per-frame loop keeps a state per creature (`bt.tg`: mode, blend `k`, walking `mv`).
  - A creature only starts a move when it is standing still. It eases in and out over about a quarter second,
    and switches between planting and dancing only once the old move has eased out.
  - Who wants what: at the Garden Event, dancing while Fortizmo plays and planting otherwise. The librarian
    (`keeper`) does the same when he is away from the Library.
- **Not a menu option:** these are creature animations. An earlier build had "Ask … to dance / plant" menu
  options; the owner removed them, so every creature's menu holds only Talk and Blossom.
- **Hennrick** keeps his own built-in Greeblis City dance (`concertDance`) instead of a table dance.
- **Adding a creature:** give it an entry in both tables. Anyone missing falls back to dig and bounce.

### Flowing goo (Mama Gorbo's streams)

Goo that runs down a body and moves like goo, without clipping:

- **Path:** sample points down the skin with `hit()` (12 steps of elevation from the same centre), offset each by
  the tube's radius + 1.5 cm along the skin normal, and keep the normals. End with two points out over the ground
  that spread into a puddle. Avoid other parts' paths (her peach runs and the lime tail).
- **Tube:** `ridgedTube(points, 0.06, 0.095, 70, 0, 0, 12)`, thicker as it goes down, with vertex colours paler
  along the top (like the lime tail).
- **Flow:** each frame, swell the tube's rings in a wave that rolls down it
  (`R = r · (1 + 0.42 · max(0, sin(2π · 2.2u − 2.4t))²)`, tapered to nothing at both ends). Move each ring's centre
  out along the skin normal by `R − r`, so a ring only grows away from the skin. Rings are `(n + 1)` groups of
  `(rad + 1)` vertices round `curve.getPointAt(i / n)`: store each vertex's unit direction once and write
  `centre + dir · R`. Keep the normals; set `needsUpdate` and enlarge the bounding sphere.
- **A glob on top:** a bigger blob slides down each stream (slow, then faster), riding out along the normal by its
  extra width and staying above the ground; the puddle swells as it arrives.
- **Closed ends:** a tube is open at both ends, so cap them. Each cap must be wider than the tube all round, or
  the rim shows and you can see through it. The top cap just touches the skin; the bottom one just clears the
  ground.

## How creatures behave

- **Rows:** creatures stand in the rows defined in `ROWS` (lineup, final, drums). Each entry is
  `[id, NAME, builder, def, [x, z]]`, and each row has a facing. NPCs don't wander. The lineup's eight stand
  evenly spaced from z = −12 to 28.4 at x = 34 (5.77 m apart, at least 1.2 m between neighbours' outlines);
  measure each creature's outline with a `Box3` before re-spacing.
- **Menus:** Talk, plus "Give a blossom" while the player has one. A creature whose def has a `goo` palette and
  whose id is listed in `te()` (Gooward, Mama Gorbo) shoots goo arcs at the player's head when given a Blossom
  (`Ie()`: eight `Nt.gooArc` shots that splat on the view). Zollod's menu is a single "Shop at Garden
  Supplies", so interacting opens the shop at once.
- **Talking:**
  - Talk opens dialogue pages split with `|`, and every creature has a talk animation.
  - Long speeches can use the Greeblis City light bulb: `Bulb.start(getPos, height)` fades a bulb in over the
    speaker, lights them with a cone and dims the town toward night until the dialogue closes.
  - Sparkakus walks straight out to the front of the Library first.
- **Vignettes:** `VIG` pairs creatures by two-letter codes. Each code has a signature: an item, a colour, a
  gesture, an emote and a sound. A pair plays a short animated exchange with optional lines, with a 15% chance
  for any passing pair.
- **Garden Event roles:**
  - `MOVES` gives each creature its own planting animation: dig, pat or scatter, with its speed and reach.
  - While Fortizmo plays, creatures waiting round the garden dance their `DANCES` move.
  - `NO_PLANT` creatures come but don't plant.
  - `NOT_AT_EVENT` creatures stay away.
  - `AT_POST` creatures keep working (King Dino drums all through).
- **Seeds:** the Event is decided by them.
  - Without Seeds, nobody comes, there's no music, and Backpacka sprays a garden that doesn't grow.
  - With Seeds, everyone gathers and plants, and a special ring of flowers grows.
  - Plants stay for the session; nothing regrows on a repeat.
- **Workers:** a kiosk worker (`st`, Sparkakus) has `join`, `leave`, `away` and `talking`. Workers walk out by a
  fixed route (behind the counter, along a side wall, out the front) and can turn to face the player.

## How the town is built

- **Frames and bins:**
  - The town is built in local frames: `place(x, z, ry)` returns a builder with `box`, `geo`, `sign`, `win`
    and `sub`.
  - Every piece goes into a material bin (plain, siding, brick, shingle, stone, concrete, glass, lit, …), and
    each bin is merged into one mesh at the end.
  - Unit geometries are cached and scaled. Tiling textures are painted in greys and tinted per vertex. All signs
    share one atlas.
- **Kiosks:**
  - `kioskFrame(o, {sign, ink, wall, wall2, tin})` builds the shared shell. Each kiosk adds its goods through
    `goods()`, which merges every small item into one vertex-coloured mesh.
  - `KIOSK_AT` holds each kiosk's position and its `front`, `spot`, `desk`, `exit` and `at(name, lx, lz)`
    points.
- **Solid ground and clear ground:**
  - `F.add(x, z, r)` makes round colliders.
  - `F.addBuilding(x, z, ry, hull, parts, name)` makes an oriented building: creatures path round the hull, and
    the parts are the solid walls.
  - `E.add(x, z, r, tag)` zones keep pickups out.
  - `keepAt`, `WALKS` and `onDance` keep lawn tufts off structures, walks and the dance floor.
  - When scenery is removed, its colliders go too. Leftover colliders become invisible obstacles.
- **Paths with a purpose.** Each walk leads somewhere and ends there:
  - the ring round the garden;
  - a walk to the Library;
  - a walk to a cross walk along the Post Office and Sheriff's fronts;
  - a walk to Garden Supplies;
  - the south walk to the church steps.

### Set pieces

- **Garden:**
  - Tilled rings with planting slots, and stepping-stone paths.
  - Plants are merged meshes that grow from scale 0.01 and are never removed.
  - The Seeds flowers are a ring of 16 that come up one after another.
- **Summoning Stone:**
  - A six-sided standing stone with rune strokes (shapes, not letters) in one merged unlit mesh, and five
    floating pebbles.
  - The runes stay dark until the player uses the stone while holding the Summoning Stone item
    (`garden.stoneAwake` is set when its panel opens). Then they light up over 1.5 s, breathe from then on, and
    blaze during the Event.
  - Using it is the only way to start the Event.
- **Library:** open ground with no walls, roof or raised floor (`LIB_LAYOUT`):
  - eight freestanding double-sided bookcases (2.2 m long, 2.1 m tall, books on both faces), two rows behind
    Sparkakus and a row down each side, with open aisles;
  - the LIBRARY banner on two posts 1.4 m behind him (the kiosks' sign painter, `kioskSignTex`);
  - a small reading table to his left, where the Ancient Artifacts go on show;
  - its colliders are the bookcases, posts and table, and lawn tufts keep off the bookcases and the rug;
  - a big rug (`LIB_LAYOUT.rug`, 11 × 7.8 m, under the bookcases and the table) woven from the Buns' clothes
    in Greeblis Woods: Miss Bun's red floral skirt print for the field, edged with her lace and gold-dotted
    braid, and a border, corner pieces and a medallion in Mr Bun's jacket green sprinkled with his shirt's
    specks, her cream chest bow in the middle, a cream fringe at each end. The prints are the Woods 128-pixel
    tiles (same seeds and colours) drawn seamlessly and painted at 0.6 scale. It is a 4 cm slab with its top
    at 3 cm (1 cm over a walk, 5 cm over the lawn) and is part of `JGP.groundAt`; Sparkakus stands on it.
- **Plant test row (testing the Garden Event's plant designs):** five placeholder plants, one of each kind in
  `PLANT_KINDS` (a red tulip, a daisy, a lupin spike, arching pink bells, a marigold bush), drawn at `PLANT_SIZE`
  2.4 so they stand out, each on a soil mound along the east side where the old line-up stood (x 34, every
  5.77 m). Each is a station whose Talk line says which plant it is (testing only). The Garden Event grows these
  same kinds, picked at random per plant. Leaves stay 0.26 m up so they clear a garden row's ridge.
- **The avatar in the test modes:** `dkAnim` strides her legs, swings her arms against them (held 0.21 rad out so
  the hands clear the skirt), bobs her on each step, sways the skirt and bounces the pigtails a beat behind; still,
  she breathes, glances about and blinks. Desktop and mobile only (VR has no body to see).
- **Ancient Artifacts (placeholder):** for now three pickups hidden round town. In the final game each of the
  three Dancers gives one unique artifact for winning a Dance battle, and the player must hold all three to
  complete that part of the quest and move on.
- **Church:**
  - It stands at the end of the south walk with its back to the fence. Nothing is placed inside it.
  - **Roof:** a `GABLE` prism's slopes rise from its outer edge, so with eaves the base must sit lower than the
    wall tops, by `height · overhang / half-width` (0.5 m here), for the slopes to meet the walls. The gable ends
    then fill up to the same slope, `height − that drop` tall.
  - **Stained glass:** every window is painted on a canvas by code, on a 384 × 1024 lancet layout scaled up for
    sharpness. `stainedKit(cx)` holds the shared tools:
    - `glass(points, fill, lead)` fills a polygon with a light-to-dark gradient, scatters faint streaks and
      bubbles over it, and leads its edge; `oval()` does the same for an ellipse;
    - `panes()` cuts a region into a jittered grid of leaded panes, as real glass is cut, colouring each by a
      callback; `mix` and `shade` blend and lighten or darken colours;
    - `reseed(n)` makes each window's streaks repeatable, and `border()` leads the pointed lancet arch with a
      ring of 64 jewel-coloured pieces.
  - **Traveler window** (back wall, above the altar): `paintTravelerWindow`, at twice the needed resolution.
  - **Garden windows** (one on each side wall): `paintGardenWindow(cx, swap)` ports the right-hand window from
    Greeblis City and redraws it at 1.5×:
    - sky panes, a rayed sun, clouds, a meadow with flowers and two butterflies;
    - a robed figure with no face (a pale gradient oval, as on the Traveler);
    - Mama Gorbo with her port eyes, lime tail, wisps, sparks and AP / IP / wifi tags.
    - The right wall (the viewer's right, facing the church) has the Greeblis City layout: Mama Gorbo on the
      left, the figure on the right. The left wall's copy is drawn with `swap` set, which mirrors the figure and
      Mama Gorbo's places (`X(x) = W0 - x`) and moves one cloud, while the sun and the meadow stay put.
    - Each sits in an extruded stone frame with a sill, 2.6 × 5.2 m, its glass 4 cm off the wall (the frame
      1 cm) so nothing flickers from inside. The small side windows moved out to ±7.5 m to make room.
  - All window glass glows at night and has no words.
- **Post Office mail mountain:**
  - A heightfield of 19 overlapping cones gives a faceted paper heap, not a dome.
  - About 2,300 envelopes lie along the slope (some on edge), with tied bundles, parcels, leaning stacks and an
    avalanche round the foot.
  - It is kept under the roof line, so it is hidden from the square: a visual joke.
- **Dance floor:**
  - 1.2 m tiles in front of the Juice Bar's counter, 32 long (from the bar's north end, south for twice the bar's
    length). Along the bar it is 5 tiles deep; the extension south of the bar runs out 10 tiles. King Dino and his
    drum kit stand centred along the extension's length, at its back, facing out across the floor.
  - One canvas covers the whole 10 × 32 grid; tiles outside the floor are left transparent (`alphaTest`), and the
    same `on(i, j)` test tells tufts and pickups where the floor is.
  - One plane whose black-and-white checker is a tiny canvas with one texel per tile and nearest filtering, at
    y = 0.035; anything standing on it starts 1 cm or more above that (the bar stools' feet, the drum kit's
    two-layer rug, which also stays inside the floor's edge).

## Performance

- **Merge per material:** kiosk goods, plants, town bins, born creatures (`KIT.compact`).
- **Freeze static groups:** `H(group)` turns off matrix auto-updates.
- **Mobile counts:** check `window.__jgpMobile` to place fewer envelopes, tufts and fence pickets.
- **Cut what nobody needs:** the street cars went. Prefer one canvas texture over many meshes for flat patterns.
- **Keep per-frame work tiny:**
  - Search on from last frame's answer (Somlet's tentacles take a step or two).
  - Repaint textures a few times a second at most.
  - Never allocate in loops.
- **Event safeguard:** during the Garden Event far scenery is hidden to protect the frame rate. Mark anything that
  must stay visible with `keepInFinale`.
- **Scale and cost:** after this batch the start view draws 131 batches and 365k triangles.

## Pitfalls already hit

| Pitfall | Fix |
| --- | --- |
| Tags orbiting on a 0.95 m ellipse passed through Mama Gorbo's 1.08 m body | Orbit radius must be greater than body radius + item size + jiggle; they now orbit at 1.78 m |
| Flat ports on a curved body floated at their edges | Sink by the sagitta, r² / (2R) |
| Glyph's arm swung through his shield; moving it put it under back plates | Move the shield clear of the arm's swing; skip plates whose spot lies under the shield |
| Somlet's tentacles went into the ground as she bobbed | Each frame, splay them outward just enough to keep every mesh vertex 2 cm up |
| Somlet's visor vanished from below | Single-sided plane: make it a thin solid half-disc |
| Flicker inside the church (VR head clipping in) | Double-sided bins show both sides of walls. Window trims, door frames, belfry, cornice and steps each got their own depth (1 cm or more apart) |
| Tile rows on the dance floor came out mirrored | Canvas row 0 is the plane's north edge |
| A tree grew into the moved church | Re-check scenery against a building's new footprint after any move |
| The mail pile read as a blob | Smooth dome core: use faceted cones, dense varied envelopes (some on edge), bundles and parcels, and no round sacks |
| Pickups and creatures placed inside kiosks or buildings | Check `F.inHull`, `F.free` and `E` zones for every fixed spot (artifacts, rows) |
| A creature asked to dance or plant didn't move | The wrapper only existed during the Event. Make it on the first request |
| A test of one move picked up the last one | Reset the creature's `bt.tg` state between moves, and wait on game time (`Re.t`), not wall time |
| Mama Gorbo's goo foot dipped 9.5 cm into the ground | Flatten the blob's lowest vertices to a sole 1.2 cm up, and lift the body by `1.1 · (|rot.z| + |rot.x|)` as it sways, so a tilt never tips the foot's edge down |
| The ends of the goo tubes could be seen through | Tubes are open: cap both ends with spheres wider than the tube all round |
| A blob riding down a stream was wider than it and sank into the skin | Push it out along the skin normal by the difference in radius, and keep it above the ground |
| A portrait render showed a creature "inside the church", sunk into its floor | The portrait tool built it at (0, 41), now inside the moved church (floor 0.8 m up). Render on open lawn (`SPAWN=-18,24`); re-check render spots after moving buildings |
| A big gap between the church roof and its side walls | The roof's eaves lifted its slopes 0.5 m above the wall tops: lower the roof by that much |
| Bar stool feet flickered against the dance floor | Their tops were flush with the floor (y 0.035): raise them 1 cm |
| The menu showed Talk only for Zollod's shop check | His entity has no `id`; match creatures by `Xt(ent)` (the builder key) |
| Headless tests run very slowly in game time | Fast-forward with `JGP.backpacka.start(Re.t - …)`; give planting checks minutes |
| A pale disc in the sky that turned with the view | The sky dome (375 m) was bigger than the camera's far plane (310 m, 260 m on mobile), so its middle was cut away. Size the dome from the far plane: `0.85 · t.far` |
| Two headless browsers at once time out | Run one at a time. Don't `pkill -f` a pattern that matches your own shell command |

## No clipping, no flicker

Rule of thumb: place from the skin (`hit()`), keep orbits wider than the body, and never let two faces share a
plane.

- **Flat parts on curved skin:** sink them by the sagitta, r² / (2R), so their edges meet the curve.
- **Orbiting things:** orbit radius > body radius + item size + jiggle.
- **Decorations that overlap:** skip plates under a shield. Move a shield clear of the arm's whole swing, not
  just its rest pose.
- **The ground:** parts below a bobbing body must never go into the floor. Check real mesh vertices.
- **Z-fighting:** any two faces in one plane flicker; offset them by 1 cm or more. That includes faces seen only
  from inside a building, because double-sided bins show both sides of a wall.
- **Single-sided planes** disappear from behind. Use thin boxes or double-sided materials.
- **Merged scenery fixes itself at load:** `unfightParts()` (Greeblis Park's fix) runs on the town's bins and every
  `goods()` merge (kiosks, Library, Juice Bar, drum kit) before they are merged. Wherever two parts' faces share a
  plane (within 4 mm, overlapping over 1 cm each way), the smaller part moves: 8 mm proud when both faces look
  the same way (a sign, window or mat on a wall or pavement, the cubbies' back on their frame), 1 cm into the
  bigger part when they press back to back. It moved about 5,900 parts and costs about 0.5 s at load (stats in
  `JGP.unfightParts.moved` / `.ms`). It is never run on a creature.
- **Locked creatures:** where a final model's own parts share a surface (Somlet's cap: the crown's top, the white
  piping, the badge's flap), give the overlay a cloned material with `polygonOffset` (factor −1, units −4). The
  depth changes, the shape does not.
- **Finding it:** `test/t_zfight.js` lists coplanar overlaps that the player's eyes can see, and `test/t_zcheck.js`
  shows which of those really flicker (the near plane nudged with nothing moving: changed pixels are fights).
  Moving the camera instead, even by millimetres, reports fine textures as flicker; and an eye straight below a
  point makes `lookAt` spin.
- **The head guard (VR):** a head can lean into what the body can't walk into. `JGP.headGuard` darkens the view from
  20 cm off any solid structure (building parts with their real heights, the portal's pillars, the Summoning Stone)
  to fully black at 8 cm, and clears as the head comes out.
- **The sky dome must fit inside the far plane** (`0.85 · t.far`), or its middle is cut away and a pale disc turns
  with the view.

## Checking the work

1. Lint after every edit (`no-undef`, `no-unused-vars`).
2. Render portraits of a creature from 2 to 4 angles at several elevations. Look for clipping, floating parts,
   wrong colours and faces that vanish.
3. Render a top view after layout changes, and head-height views inside buildings to catch z-fighting.
4. Boot on desktop and mobile, run the ordinals test, talk to every creature, play every vignette pair, call
   the pizza courier, and walk a long soak.
5. Check every creature's menu holds only Talk (and Give a blossom), and that each one plants and dances by
   itself at the Garden Event (and moves when its `bt.tg` mode is forced, for a quick check).
6. Play the Garden Event with and without Seeds, and as a repeat.

The scripts for all of these are in [`tools/greeblis-town-usa/test/`](../../tools/greeblis-town-usa/test/).
