# Greeblis Town: Construction Reference

This reference covers how the game is built and how it behaves at runtime: page structure, creature construction and
behaviour, gameplay systems, the Garden Event, audio, the park, the town, platforms, depth correctness and
performance. Code is cited by identifier and section banner, never by line number. Per-creature builds are in
[creatures.md](creatures.md), binding rules in [rules.md](rules.md), lore and visual style in [bible.md](bible.md),
test tools in [testing.md](testing.md), and the release pipeline in [release.md](release.md).

Contents:
1. [Overview](#1-overview)
2. [Park layout](#2-park-layout)
3. [Building creatures](#3-building-creatures)
4. [How creatures behave](#4-how-creatures-behave)
5. [Gameplay systems](#5-gameplay-systems)
6. [The Garden Event](#6-the-garden-event)
7. [Audio](#7-audio)
8. [Park set pieces](#8-park-set-pieces)
9. [The town](#9-the-town)
10. [Platforms and modes](#10-platforms-and-modes)
11. [No clipping, no flicker](#11-no-clipping-no-flicker)
12. [Performance](#12-performance)
13. [Code conventions](#13-code-conventions)

Conventions: +z is south; positions are (x, z) in metres; angles in rad.

---

## 1. Overview

This section describes the page's structure and the path from a creature's builder to its per-frame update.

### Page structure

`index.html` contains, in order:
1. The head: styles and the hidden DOM that the VR interface mirrors.
2. A console throttle and error guard.
3. The bundled three.js r128, trimmed ([release.md](release.md#trimming-threejs)).
4. The game script, in two layers:
   - **Engine:** config object `t` (player, park bounds, timings), frame loop `Re`, renderer, input, dialogue and
     panels, entities (`It`), colliders (`F`), sounds (`G`), pickups.
   - **Game layer** (`JGP`, banner `GREEBLIS TOWN LAYER`): the cast, park, town, quests, Garden Event and every
     system above the engine. Test exports are on `JGP` ([testing.md](testing.md#the-games-globals)).

### Builder-to-frame pipeline

```
ROWS entry  ->  builder so[name](group, def)  ->  born(): blink, find the moving parts, merge the rest
                                                     |
Every frame:  step(t, dt, talk, walk)  ->  posts, patrols and roamers  ->  visits and vignettes  ->  Event roles
```

### Builder sources

| Source | Registration | Notes |
| --- | --- | --- |
| Born | `BORN`, registered as `born_*` | Readable builders. Each opens with a plain-language comment describing the creature and stating that its model is final; that comment is the design brief. |
| Packaged models | `PK_MODELS` (HENNRICK, FORTIZMO, ANOMALEE, NEXTESSA) and `PK_MONT` (MONTGUMMERY), registered as `pk_*` | Minified modules between `PACKAGED-MODELS-BEGIN` and `PACKAGED-MODELS-END`. Engine services are reached through `$x` aliases, because the minified code shadows one-letter names. |
| Wrappers | `anomaleePeg`, `fortizmoPick` | Wrap a packaged model: ANOMALEE's peg leg; FORTIZMO's bounds. |
| Special | `BP`, `st`, church builder | Backpacka is built by the Garden Event (`BP`), SPARKAKUS by the Library's worker (`st`), the Ancient by the church. |

A builder that throws must never stop boot: the registry reports the error and leaves that creature empty.

---

## 2. Park layout

This section gives the fixed positions of the park's main features.

The park is a fenced rectangle from x −37.6 to 37.6 and z −37.6 to 49.6 (`t.parkHalf` 37.6, `t.parkSouth` 49.6).

| Feature | Position |
| --- | --- |
| Garden and Summoning Stone | Centred on (0, 0), radius 15 m (`GARDEN_R`). |
| Library | North-west corner, centred at (−24.75, −24.75) (`KIOSK_AT.K.shop`). |
| Post Office and Sheriff's | North-east corner, either side of the diagonal walk (`KIOSK_AT.K.post`, `.sheriff`). |
| Garden Supplies | South-east corner (`KIOSK_AT.K.garden`). |
| GOOWARD'S GALLERY | East side at (31, 14.5), between the duck pond and Garden Supplies, facing the garden, opposite the Juice Bar (`KIOSK_AT.K.gallery`). |
| Juice Bar and dance floor | West side; the floor lies in front of the bar. KING DINO's drum kit stands on the grass behind the floor's south half; his spot is (−36.35, 19.2). |
| Duck pond | (24.6, 0). |
| Phone booth | (−7.2, 23.9). |
| Portal | In the park (`ot`), with HENNRICK's roaming ground round it. |
| Church | End of the south walk, back 1 m inside the south fence (`CHURCH_AT`; nave 18 m). |
| Player spawn | (−36.3, −20) (`t.player.spawn`), inside the west fence north of the Juice Bar, facing KING DINO's billboard at (−55, −55). |

---

## 3. Building creatures

This section specifies the modelling toolkit, the `born()` contract, merging, and the shared planting and dancing
layer. Locks on finished models are in [rules.md](rules.md#locks-and-approvals).

### Working from artwork

1. List every visible feature in the artwork.
2. Build all of them; render from four sides; compare with the artwork and iterate.
3. Ask before interpreting an ambiguous shape.

### `blobBody`: sculpted skin

`blobBody` blends ellipsoids into one signed-distance field and meshes it by casting rays from a centre point. It is
the primary tool for organic bodies.

```js
const C = [0.02, 1.6, 0.02],                  // ray centre: must see every part
  bb = blobBody([
    [0, 1.9, 0, 1.13, 1.0, 1.08],             // [cx, cy, cz, rx, ry, rz, tiltX?, turnY?]
    [0.04, 0.72, 0.04, 0.84, 0.62, 0.82],
  ], C, { k: 0.3, col: (p, fold, cc) => cc.set(PEACH).offsetHSL(0, 0, -0.05 * fold) });
keepR(bb.geo, gradMat("goo", { shine: 110 }), body);
const { p, n } = bb.hit(C, [0.42, 0.5, 0.8]);  // skin point and normal along a ray
```

| Parameter | Meaning |
| --- | --- |
| `k` | Blend softness: 0.2 firm, 0.3 goo. |
| `fold` | Crease depth, 0 to 1. Darken by it for shading. |
| `hit()` | Returns a skin point and normal. Every eye, plate, port and tag must be placed with it; surface positions are never guessed. |
| Small ellipsoids half out of the surface | Runs, lumps and folds; colour them in `col` by distance. |

### Geometry and surface helpers

| Helper | Use |
| --- | --- |
| `latheGeo(smoothProfile(points, n))` | Rotationally symmetric parts: stems, caps, cones, berries. |
| `ridgedTube(points, r0, r1, n, ridges, depth)` | Tapered, optionally ringed tubes (tails, horns, tentacles, hoses); `cap` closes the far end. |
| `onEllipsoid()`, `faceTo(group, normal)` | Flat details (spots, badges, decals) on curved surfaces. |
| `cardGeo(cards, kind)` | Feathers, fur and quills as merged cards (`vane` or `fur`), with `gradMat`. |
| `KIT.surf(kind, colour, {rep, bump, shine})` | Shared greyscale painted texture, tinted by the material. Kinds: scale, fur, feather, fabric, felt, metal, goo, skin, soft, plastic, rubber, wood, leaf, stone, sand, soil, grass. |
| `gradMat()` | Vertex-colour gradients baked into a body. |
| `texturize(group, kind, o)` | One finish for all plain parts of a model. |
| `MeshBasicMaterial` | Unlit glow: rune strokes, lens glints, the light bulb. |

### Faces, limbs and accessories

- **Eyes:** `KIT.eye(parent, pos, r, {iris, lid, open, rot})` builds an eye with a lid. Lids passed to `born()` blink.
  Non-eyeball eyes may blink by other means (MAMA GORBO's lenses squash to 6 % height).
- **Limbs:** `KIT.arm` (`sh`, `el`, `hand`) and `KIT.leg` (`hip`, `knee`, `foot`: claw, pad, paw, boot or hoof).
  `KIT.stride(leg, phase, swing, bend)` walks a leg with the foot kept level.
- **Hats** attach to the head group. Brims and visors must be thin solids, never single-sided planes.

### `born()` contract

Every born builder returns `born()`, which drives blinking, identifies moving parts and merges the rest.

```js
return born(g, {
  height: 2.95,          // m; for the talk interface and the name tag
  lids,                  // blinking eyelids
  step(t, dt, tk, wk) {  // tk: talking 0..1, wk: walking 0..1
    body.scale.set(1 - 0.018 * br, 1 + 0.035 * br, 1 - 0.018 * br);  // breathing
    body.position.y = 0.04 * tk * Math.abs(Math.sin(5 * t));       // talk bob
  },
});
```

- Every creature must breathe or sway at rest, bob when talked to (its own `tk` animation plus the shared talk
  wrapper's nods) and stride when walking.
- `step` runs from absolute time: every property it changes must be set every frame. Nothing done in sampled frames
  may be seen or heard (no emotes, sounds or goo).
- **Merging:** `KIT.animated` samples `step` to find moving nodes; `KIT.compact` merges everything else per material.
  Set `userData.keep = true` on transparent parts, sprites, animated materials, and any part animated only in a rare
  state the samples miss (a periodic squint; lids hidden while eyes open for a Blossom). A merged-away part is never
  drawn, so animation on it never shows; `test/t_baked.js` reports such parts.
- **Ground contact:** a wrapper round the whole model stands each creature on the surface below it (`JGP.groundAt`:
  lawn, walks, dance floor, garden soil, rows and stones, decks, bar boards, rugs), lifted by the model's rest-pose
  reach below its feet. Not applied to creatures posted above ground (MUSHROOM on his desk).

### Planting and dancing layer

Whole-body offsets are layered over each creature's own `step`, so they apply to packaged models as well.

```js
const MOVES  = { p_glyph: ["dig", 2.3, 1], p_etcher: ["pat", 2.1, 0.9], ... };       // [move, rad/s, size]
const DANCES = { p_mamagorbo: ["jelly", 5.45, 1], keeper: ["funk", 5.45, 1], ... };  // [dance, rad/s, size]
```

- `plantMove(key, t)` and `danceMove(key, t)` return `{x, y, z, rx, ry, rz, sx, sy, sz}`. Per-creature entries are
  tabulated in [creatures.md](creatures.md#the-cast).
- **Planting moves:** `dig`, `pat`, `scatter`, `eat` (ANOMALEE, `["eat", 2.6, 1]`, once `Kt.rewards.snacks` is set).
  Default for unlisted keys: `["dig", 1.8, 1]`.
- **Dances:** `bounce`, `twirl`, `shimmy`, `stomp`, `groove`, `jelly` (squash and stretch for goo bodies), `funk`
  (SPARKAKUS); `sway` is defined but unassigned. Default: `["bounce", 5.45, 1]`. 5.45 rad/s is one bob per beat at
  104 BPM; 2.7 rad/s is half time.
- **Exclusions:** HENNRICK and the three Dancers use built-in dances. KING DINO and SOMLET stay at their posts and
  FORTIZMO plays her horn; none of the three has a move.
- **Wrapper:** the offset is applied to a wrapper group round the creature (`wt(group)` creates it on first use;
  `zt()` measures the footprint), so the creature's own animation continues inside. Feet must stay above ground.
- **Driver:** one per-frame loop holds each creature's state in `bt.tg` (mode, blend `k`, walking `mv`). A move
  starts only while standing, eases in and out over about 0.25 s, and switches between planting and dancing only
  after the previous move has eased out. A creature being talked to stops.

### Flowing goo streams

This method produces goo that runs down a body without clipping (MAMA GORBO's streams).

1. **Path:** sample 12 elevation steps down the skin with `hit()` from one centre; offset each point by the tube
   radius plus 1.5 cm along the skin normal and keep the normals. Finish with two points over the ground that spread
   into a puddle. Paths must not cross other parts.
2. **Tube:** `ridgedTube(points, 0.06, 0.095, 70, 0, 0, 12)`, thickening downward, paler along the top.
3. **Flow:** each frame, swell the rings with a wave travelling down the tube,
   `R = r · (1 + 0.42 · max(0, sin(2π · 2.2u − 2.4t))²)`, tapered to zero at both ends, and offset each ring
   centre along the skin normal by `R − r` so rings grow only away from the skin. Store each vertex's unit
   direction once and write `centre + dir · R`; set `needsUpdate` and enlarge the bounding sphere.
4. **Glob:** a larger blob slides down each stream, displaced along the normal by its extra width and kept above
   ground; the puddle swells on arrival.
5. **Ends:** tubes are open-ended. Cap each end with a sphere wider than the tube on all sides.

---

## 4. How creatures behave

This section specifies placement, movement, home-ground enforcement, routing, visits, interaction and vignettes.

### Placement

- **`ROWS`** (start of the game layer) places the cast. It is an object of groups, each `{face, list}`; each list
  entry is `[id, NAME, builder, def, spot]`.
  - `spot`: `[x, z]`, a function, `"kiosk:<name>"` (behind a kiosk counter) or `"kiosk-desk:<name>"` (on its desk).
  - `def.via`: a worker's exit route: `"kiosk:<name>"`, `"kiosk-front:<name>"` or a function.
  - Kiosk names are the keys of `KIOSK_AT.K`: `post`, `sheriff`, `garden`, `shop` (the Library) and `gallery`.
- Creature keep-clear zones are added in `applyCast` once spots are known. Pickups never spawn on a creature's spot
  or on the Dancers' and HENNRICK's roaming ground.
- A creature turns to face a nearby player.

### Posts, patrols and roamers

- **Workers** leave a kiosk or the bar by a fixed route (behind the counter, along a side wall, out through the gap)
  and return the same way. MUSHROOM (desk top 1.5 m, `standY` 1.545) steps down when leaving.
- **FORTIZMO's patrol:** she moves her `home` along the aisle behind the Juice Bar, every 3 to 8 s choosing a point
  at least 3 m away, then faces the dance floor. Suspended while busy or with the player close.
- **Roamers** (`roam(id, pick, w0, w1)`; wait `w0 + w1 · random` s) move `home` to a spot from a picker:

| Roamer | Picker | Spot rule | Faces on arrival |
| --- | --- | --- | --- |
| HENNRICK | `JGP.portalRoam` | 3.2 to 6 m from the Portal; never in its doorway or NEXTESSA's lane; walk must not cross the frame | The Portal |
| GEMTOE, MAMA GORBO | `JGP.parkRoam` | 5 to 16 m away; never on the dance floor | Direction of travel |
| GOOWARD | `JGP.galleryRoam` | 6.6 to 10 m from the Gallery's centre, within ±110° of its facing (front or sides, never inside or behind) | The Gallery |
| ETCHER, GLYPH, MONTGUMMERY | `JGP.floorRoam` | 3 to 12 m away, on the dance floor, clear of the other Dancers | Direction of travel |

- Every spot must pass `JGP.roamFree` (inside the park; outside the garden, buildings, pond and all scenery zones)
  and `JGP.roamWalk` (a clear straight walk). Park wanderers also keep apart (`JGP.roamApart`) and their walks stay
  off the dance floor.
- A roamer with no headway for 2.5 s, or past its deadline, settles where it is (if on its home ground) and picks
  again. After three failed picks it tries `JGP.roamEscape`, else returns to `def.at`. No roamer moves while busy
  (talking, vignette, visit, meeting, battle, Event) or with the player close.
- **Gorbo meetings:** MAMA GORBO and GOOWARD meet every 20 to 40 s (`JGP.meetAt(t)` forces one). While seeking, each
  picker takes the spot nearest the other (GOOWARD's stays within his Gallery ring). When they are more than 16 m
  apart, MAMA GORBO first takes a planned walk to open ground a few metres from GOOWARD; then both walk to a meeting
  spot between them, face each other and take four throws in turn (two each way, three goo balls a volley), a heart
  over each catcher. A
  vignette, a visit or the Event calls the meeting off and defers the next by 40 s
  ([creatures.md](creatures.md#mama-gorbo)).

### Home ground

No creature may be left stranded away from home, whatever the player does ([rules](rules.md#creature-behaviour)).

- `def.at` is a creature's fixed place; `home` is only its current walk target.
- `JGP.homeGround(h)` defines the ground each creature belongs on:

| Creature | Home ground |
| --- | --- |
| Dancers | On the dance floor (`JGP.onDance`). |
| GEMTOE, MAMA GORBO | Any `roamFree` ground. |
| GOOWARD | Within 12 m of the Gallery's centre, on `roamFree` ground. |
| HENNRICK | Within 9 m of the Portal. |
| FORTIZMO | The aisle behind the bar: within 0.8 m of its line, \|z\| < 8.5. |
| Everyone else | Within 1.2 m of `def.at`. |

- A roamer settles where its walk stalled only on its home ground; otherwise `JGP.sendHome` returns it to `def.at`
  by a planned route (a worker by its `via`).
- **Guard:** every 0.5 s, any idle creature off its home ground for 4 s (20 s if still walking) is sent home.

### Routing

`JGP.route` plans a walk on a 1.2 m grid of open ground (as `roamFree`), pulled taut into straight segments round the
garden, pond, buildings and scenery. A start off open ground (at a door) first steps to the nearest open cell; the
last cell yields to the goal only when the straight line to it is clear. Costs are full precision and loops are
bounded, so planning never stalls a frame.

### Visits

A visit sends one creature to another so that each pair's vignettes play; one starts every 22 to 32 s, with at most
two on their way out or meeting at once. Every pair's two vignettes play within about 1.5 h.

- **Pair selection:** fewest visits made or received first (ZOLLOD's count halved once freed), then fewest plays of
  the pair; the meeting plays whichever of the pair's two vignettes has played less.
- **Participants:** everyone, kiosk workers included. KING DINO, SOMLET and the Ancient (`STAYS`) never leave; others
  come to them, so pairs between them never meet. NEXTESSA and Backpacka take no part. ZOLLOD takes no part until
  OVERCOMING SHYNESS frees him.
- **Outbound:** a worker exits by its `via` (MUSHROOM first jumps down off the front of his desk), then follows
  `JGP.route`.
- **Meeting:** the visitor stops beside the host, facing it. A wandering host stops; one that has moved on is
  re-approached at most twice. A kiosk or bar host steps out and returns afterwards. SPARKAKUS stops where he is in
  the Library and the visitor enters across its open front.
- **The Ancient:** called on in one round in eight, through the X in the church wall (`inside` `"church"`). On
  entry each visitor pauses outside the X with a "?" in its own colour. The exchange plays only if the player is in
  the church; otherwise it is counted silently.
- **Return:** at `walkK` 0.55. A worker re-enters by its `via`; one whose place is on a desk walks the corners at
  ground level and regains its height on the last leg. The Event, a battle or a Gorbo meeting cancels a visit (homes
  restored at once; a visitor inside the church leaves by the X first).
- **Always talkable:** a creature being talked to stops where it stands (ZOLLOD also while his shop is open:
  `heldBy`); the visit's clocks wait; the walk resumes when the dialogue closes.
- **Scenes hold too:** a creature in a scripted scene of its own (`e.scene()`; SPARKAKUS's Gem speech from its first
  page to its last, the assembly between pages included, and his Blossom lap) is `heldBy` for all of it: its visit
  waits where it stands, and no walk home, wander, meeting or vignette starts. Talking, or in his speech, SPARKAKUS
  turns to face the player wherever he is.
- **Proximity freeze:** any walking creature stops for an approaching player, turned to them, for
  `t.proximityFreezeS` (12 s) or until the player leaves. The freeze sets `held`; the visit holds its clocks while
  either party is held or a panel is open, and a planned route home keeps its budget.
- **SPARKAKUS:** his `stump` station follows him (hidden only during the Event, when `xo` speaks for him); his walk
  waits while his dialogue is open. Sent out with no route, he plans one (`wayOut`): out of the church by the X if
  inside, then `JGP.route`. A host is released only by the visit that claimed it (`h.hostQ`). He is never sent
  visiting during his Artifacts speech (`Bulb.hold`).
- **Exclusion:** `visiting` and `hosting` suspend roaming, FORTIZMO's patrol, Gorbo meetings, other vignettes and
  SOMLET lying down.
- **Test hooks:** `JGP.visitAt(t, v, h)` starts the named visit at once; with no pair, `t` sets the next natural
  visit time (a far-future `t` disables them). `JGP.visits()` and `JGP.visitPlan(v, h)` report.

### Talk, menus and gifts

- **Dialogue:** pages are split with `|`. Every code path that opens a dialogue must set `xe.lastTarget`, or the next
  line goes to the wrong creature. `te(ent, gift)` sets `ent.gifting` for a Blossom line.
- **Menus:** Talk, plus "Give a blossom" while one is held; ZOLLOD's single entry is "Shop at Garden Supplies".
  Identify creatures by `Xt(ent)` (builder key): some entities have no `id`.
- **Gifts:** creatures with a `goo` palette in their def (GOOWARD, MAMA GORBO) fire eight `Nt.gooArc` shots that
  splat on the view. A Blossom to a Dancer starts a Dance battle after the thanks line, unless the player has left or
  the Event has begun. SPARKAKUS runs his lap only at his place (`st.atHome()`); elsewhere he answers with his
  `giftAway` line. With no Blossom held there is no Blossom option and `te()` refuses a gift.
- **Light bulb:** `Bulb.start(getPos, height)` fades a bulb in over the speaker, lights them with a cone and dims the
  town toward night until the dialogue closes. It is built and compiled at load. `getPos` must return a world
  position (`st.pos()` does, including inside the Library's local frame). From the first finale page until the Gem
  speech ends (`Bulb.hold`), SPARKAKUS offers no Talk or Blossom.
- Anyone talked to during the Event stands still.

### Vignettes

- Each pair of creatures has two vignettes: an animation and an exchange of lines. The fourteen creatures in `NAMES`
  (two-letter codes) form 91 pairs in `PAIRS`; the Ancient has one exchange with each in `SLUG_PAIRS`, played only
  by visit (`SLUG_VIGNETTES` is false). NEXTESSA and Backpacka have none. `test/pairs.py` checks the tables.
- **Animation:** one of twelve choreography styles, both creatures' signatures from `SIG` (item, colour, gesture,
  emote) and a seeded variation. **Lines:** the two lines, the pair turned to each other. Counted in `plays[AB]` and
  `plays[ABt]`.
- **Participants** (`lineUp`): cast members at their own spots and not busy, visiting, meeting or in a victory
  dance. SPARKAKUS takes part through `st.ent`, a marker at his world position whose wrapper wraps his model.
- **Side by side only:** pairs already together (the Dancers on the floor) play in place, fairly among co-located
  pairs; all other pairs meet by visit. Talking to either party, or the Event, stops a vignette.
- KING DINO and the Ancient never turn or gesture (a bow would tip his sticks into the kit). Wrappers rotate in
  `YXZ` order: the turn to the partner first, then the gesture's lean and roll in the turned frame.
- Thrown objects are cached and reused across flights (the gem octahedron, each colour's halo material); a lines
  vignette disposes its bubble canvas and material when it ends.

---

## 5. Gameplay systems

This section specifies pickups, quests, the shop, Dance battles and the quest chains at the level of state and code.
Their design is in [bible.md, Game design](bible.md#5-game-design).

### Pickups

| Item | Count in park | Regrow | Held count |
| --- | --- | --- | --- |
| Blossoms | 32 (`t.blossomCount`) | 12 s (`t.blossomRegrowS`) | `Kt.blossoms` |
| Flint | 40 (`t.acornCount`) | 12 s (`t.acornRegrowS`) | `Kt.acorns` |

Spawn points come from `go()`, which rejects keep-clear zones, the dance floor and anything within 0.8 m of a
building hull. Pickups are instanced ([Performance](#12-performance)).

### Quests and HUD

- The HUD lists three quests: SEEDS, SUMMONING STONE and SNACKS.
- Below them it shows held items (`INV_ICON`, one painter per item; the list is rebuilt from `Kt` each frame and the
  card redrawn only on change): Blossoms, Flint, the Artifacts with counts, the Gem, the Summoning Stone, the shyness
  book, the Seeds and the pizza. Items not held are omitted, and clothes never show (a rule). The canvas extends below the quests
  and its plane is offset down, so the quests keep their position on the wrist and in the test modes' screen corner.

| Quest | Completion |
| --- | --- |
| SEEDS | Buy the "bagel seasoning packet" at Garden Supplies, 15 flint. |
| SUMMONING STONE | The Ancient Artifacts chain (below). |
| SNACKS | NEXTESSA's pizza, ordered from the phone booth. |

- **Phone lock:** `Kt.phone` is set in `te()` when MUSHROOM receives a Blossom. Before that, the booth reports the
  connection to the Portal as blocked; afterwards it works for the session.
- **Shop** (Garden Supplies): Flower Hat, Sun Dress and Frog Shoes at 3 flint each, and the Seeds. The mirror
  shows the outfit as it changes. It is shown in VR (angled at the panel's right) and in the test modes (flat beside the
  panel, or below it on a portrait phone, drawn over the world through `dk.mirror`).

### Dance battles

Rules, moves and panel are specified in [bible 5.11](bible.md#511-dance-battles). A battle (`Dbt`) starts
only from a Blossom given to a Dancer, so each costs one Blossom; ten won rounds win it, and LEAVE is available from
round one. The panel shows only the Dancer's move; the bar counts steps remaining.

### Ancient Artifacts chain

1. Each Dancer's first win sets one Artifact (`Kt.artifacts`); later wins award a bow. SPARKAKUS's Talk follows the
   count.
2. With all three, SPARKAKUS stays where he stands and the bulb comes on. After his first lines `ARTS.assemble`
   builds the Gem in the air between him and the player (glue bottle, drips, each piece moving to its
   `userData.gemOffset` with a flash; about 5 s). After his speech the Gem flies to the player (`Kt.gem`).
3. GEMTOE trades the Summoning Stone for the Gem; the Stone starts the Garden Event.

### Shyness sub-quest

- ZOLLOD starts with `Kt.shyFree` false: one Talk line, no Blossom option, no shop, no visits; the Garden Supplies
  counter's own shop prompt (`gshop`) is hidden.
- OVERCOMING SHYNESS (0.34 × 0.44 m, the largest hardback) stands alone at eye level in the middle of a left-hand
  side case and is taken by pointing and selecting (`Kt.shyBook`). The first Talk with it held frees him; from then
  on his Talk opens the shop and his pairs count half in the visit order. MAMA GORBO's fourth Talk line hints at it.

### Flavour lines

Talk cycles (`SCRIPT[id].lines`) play only outside the Event; during it Talk gives the `campfire` line. The code has
no flag for a creature's lore (flavour) line; [bible part 2](bible.md#2-the-cast) marks it. SPARKAKUS's Talk follows
his quest instead of a cycle.

---

## 6. The Garden Event

This section specifies the Event's trigger, timeline, roles, planting and growth. Its design is in
[bible 5.12](bible.md#512-the-garden-event).

### Trigger

The Event starts only from the Summoning Stone and only once the Summoning Stone quest is complete. "Use the
Summoning Stone" opens the GARDEN EVENT panel (Summoning Stone, Seeds and Snacks with their boxes; "Start gardening
event?"; Yes / No). Without the Stone, Yes reports that the runes stay dark, and `oe.yes()` refuses.

### Timeline

The Backpacka block runs for `t.finale.durationS` (180 s).

| Phase | Behaviour |
| --- | --- |
| Gather and plant | Everyone walks into the garden and plants for 20 s from the last arrival (or from 30 s in). FORTIZMO walks slowly to the garden's edge on the bar side, (−17.3, 0). |
| Horn and ring dance | FORTIZMO plays "Backpacka's Rain Strut"; everyone moves to the ring walk (radius 17.3 m) and dances. |
| Backpacka (`BP`, timeline `D`) | 16 s flying to the pond, 14 s drinking, 12 s to the garden, 15 s spraying, 14.5 s departing (gone at 84 s). |
| Close | FORTIZMO plays the tag; everyone returns home. |

### Roles

| Role | Members | Behaviour |
| --- | --- | --- |
| `NO_PLANT` | FORTIZMO | Attends but does not plant. |
| `AT_POST` | KING DINO, SOMLET | Remain at their posts (drums; asleep). |
| Absent | NEXTESSA | Never attends. |
| Event-only | Backpacka | Appears only for the Event. |
| Unchanged | The Ancient | Stays as it is. |
| Library planter | SPARKAKUS | Leaves the Library (only when Seeds are in), plants at his own spot inside the garden and grows a flower. His Talk is his Event line wherever he is. |

- **Workers:** a kiosk or bar worker exits by its route only from inside; one already outside goes straight to the
  garden.
- **Displacement:** a planter held off its spot by a neighbour adopts its current position after 1 s if within 1 m.
- **Pizza** (`Kt.rewards.snacks`): pizza-box stacks stand outside the garden's stone ring beside the seed sacks for
  the whole Event (fixed bodies in `uo.fixed`); ANOMALEE eats a slice every 5 s at her spot instead of planting
  (`PIZZA`).

### Seeds, planting and growth

- **`bt.seeds`** is fixed for the whole Event. Without Seeds nobody attends, there is no music, and Backpacka sprays
  a garden that does not grow. `evTalk()` (`me.active && bt.seeds`) gates every Event line (the `campfire` lines,
  SPARKAKUS's Event line, THE ANCIENT's "Hello", ZOLLOD's line in place of his shop): without Seeds everyone says
  its everyday lines. Blossoms are off at every Event.
- **Spots** (`beginPlanting`): planters stand on rings of radius 3.5 m (up to 4), 7.5 m (up to 6) and 11.5 m (the
  rest), so the soil 0.9 m in front of each falls on the rows at 2.6, 6.6 and 10.6 m, turned until the soil is at
  least 0.75 m clear of the stepping-stone paths.
- **Planting** (`plantTick`): each planter places exactly one flower of a random kind in the soil 0.9 m ahead,
  1.5 s into its first dig.
- **Rounds** (`garden.round`): only the first Event grows flowers. Later Events reuse the same spots and planting
  animation but produce nothing. Plants persist for the session.
- **Growth:** a plant waits until Backpacka's water reaches it, then grows over about 11 s; every plant is watered by
  the middle of the spray. Anything still growing when the Event ends completes at once.
- Backpacka is built and his shaders compiled before the music starts; a compile stall mid-song causes crackle.
- An Event ended early (time limit or exit) leaves nothing pending for the next and drops any route home planned
  before it.

---

## 7. Audio

This section specifies the synthesized audio engine and the two music sources.

All sound is synthesized with WebAudio by `G`; there are no recordings.

- The context is created on first input, with `latencyHint: "balanced"` on the Quest and phones, a master compressor
  as limiter and a feedback delay as reverb. It resumes when the headset is put back on.
- Effects (`G.note`, `G.jingle`, `G.heart`, `G.near(x, z, r, name)`) attenuate with distance (`t.hearR`: goo 22 m,
  music 11 m).
- Audibility is judged from `we.headPos`; in the test modes this is the avatar's head, never the orbiting camera.

### KING DINO's jazz

| Property | Value |
| --- | --- |
| Object | `JAZZ` in the drum-kit block (`JGP.jazz`), "Stomp at the Juice Bar" |
| Tempo | 104 BPM |
| Form | 8-bar brushes intro (once), then a 24-bar chorus repeated: 8 bars time on the ride, 8 bars trading fours with tom solos, 8 bars shout ending in a 2-bar break |
| Scheduling | 3 s ahead on the audio clock (more than one bar) |

- Each listening stretch has its own bus; stopping cuts the bus, so queued notes never sound late. After a stall it
  restarts cleanly. The kit and sticks animate on the hits as they sound (`DRUMS.r` / `DRUMS.l`); when inaudible it
  keeps time silently on the game clock.
- Audible on the dance floor and the strip where the kit stands, and through every Dance battle and victory dance.
- He rests from the moment FORTIZMO raises her horn until her last notes decay; otherwise he never stops, including
  while talked to.

### FORTIZMO's horn

"Backpacka's Rain Strut": 88 BPM, C minor, 24 bars timed to Backpacka's visit; muted trumpet over saxophone and
trombone (`gcHorn`, `ee`).

### Other cues

`SCRIPT[id].sad` is the index of a Talk line that plays with a falling minor phrase (ANOMALEE: index 1, her second
line, "ORIGINATOR…").

---

## 8. Park set pieces

This section specifies how the park's structures are built. Their visual style and colours are in
[bible 6.1](bible.md#61-environment).

### Garden and Event flowers

- Tilled rings every 2 m from 2.6 m (13 cm ridges), four stepping-stone paths, and a border of stones that creatures
  step over (all part of `JGP.groundAt`).
- **Event flowers** (locked; each built only from the owner's photos): `PLANT_KINDS` maps each kind to a builder
  `(add) => …`: creeping thistle, scentless mayweed, chicory, common milkweed, zebra mallow. One merged
  vertex-coloured mesh per kind, drawn at `PLANT_SIZE` 2.4; leaves sit 0.11 model units up to clear a row's ridge.
- **Toolkit inside `PLANT_KINDS`:**

| Tool | Purpose |
| --- | --- |
| `part(name, make, lit)` | Builds a flat double-sided part once; `lit` lights the back like the face (thin petals). |
| `blade` | Fans an outline into a curved blade. |
| `ribLeaf` | Folds a leaf along its midrib. |
| `stems(add, STEMS, o)` | Stems, branches, stalks and leaves; `o.leafPlus` adds ribs, veins and spines. |
| `faceFrom` | Turns a flower head away from its stalk. |
| `cup` | The cup of bracts under a head. |

- **Levels of detail** (`plantMesh`): each plant has a full and a light mesh. The full mesh shows within
  `PLANT_NEAR` (7 m) of the eye, with 1 m hysteresis, checked four times per second. The light mesh omits the parts
  named in `LO_SKIP` (spines, fine ribs and veins) and any part with a bounding radius under 0.006 model units
  (about 1.4 cm drawn), uses about half the outline points for flat parts, and rebuilds `T` spheres, cylinders and
  cones with fewer segments (`loGeo`, from each geometry's `lp`).
- Plants grow from scale 0.01. `JGP.plantShow(kind, x, z, ry)` places a full-grown plant anywhere, for renders.
- With Snacks complete, ANOMALEE's pizza box moves 0.8 m aside if one of her flowers occupies its spot.

### Summoning Stone

A six-sided standing stone on a round plinth, with rune strokes (shapes, not letters) in one merged unlit mesh. The
runes stay dark until the player uses the stone while holding the Summoning Stone (`garden.stoneAwake` is set when
its panel opens); they then light over 1.5 s, breathe thereafter and blaze during the Event.

### Library

Open ground with no walls, roof or raised floor (`LIB_LAYOUT`).

| Element | Specification |
| --- | --- |
| Bookcases | Eight freestanding double-sided cases, 2.2 m long and 2.1 m tall: two rows behind SPARKAKUS and one down each side, with open aisles. |
| Colliders | The bookcases and banner posts. The Library is kept explicitly when the engine clears scenery (it is wider than the 12 m that rule spares). |
| Banner | LIBRARY sign on two 4.3 m posts behind the back row, high enough to show over it. |
| Shelf features (`LIB_LAYOUT.features`) | One item face-out in a gap on each of nine shelves: six cloth hardbacks (covers: [bible 1.15](bible.md#115-written-things); 0.30 × 0.40 m, OVERCOMING SHYNESS 0.34 × 0.44 m, each title fitted to its cover for VR legibility), a potted Wish Blossom (crystal turning, halo bobbing), an Electric Blossom (head turning) and an Acorn. |
| Rug (`LIB_LAYOUT.rug`) | 11 × 7.8 m paisley. One seamless 128 px tile at 0.75 scale; material tinted `0xa29a98` so the open sky does not wash it out. A 4 cm slab with its top 3 cm up (`LIB_LAYOUT.rugTop`), part of `JGP.groundAt`. |

### Church

- **Exterior:** built from the owner's two photos of a Gothic Revival stone church; stone bin tinted `#8a8880`,
  limestone dressings `#cdc5b4`, slate roof `#3a3c44` (full design: [bible 1.6](bible.md#16-the-church) and
  [bible 6.1](bible.md#61-environment)).
- **Roof geometry:** a `GABLE` prism's slopes rise from its outer edge, so with eaves the base must sit below the wall
  tops by `height · overhang / half-width` (0.5 m here) for the slopes to meet the walls.
- **Secret room** (locked; built only from the owner's photo of a slug at night): entered through the wall under the
  right-hand Garden window, marked only by a small red X. The building's parts leave a 2.6 m gap there, and every mode
  moves the same body through it. Floor, walls and ceiling share one ground texture, lit most strongly at the floor.
  Panels overlap a few centimetres at every corner, each overlap offset, so no seam shows and nothing z-fights.
- **Containment:** pickups never spawn inside (`go()` rejects points within 0.8 m of a hull). Creatures path round
  the hull; `JGP.churchGuard` ejects any creature found inside. No lawn tufts grow inside any building.

**Stained glass** (final: the owner's designs, kept exactly; no words, no faces). Every window is painted in code on a
384 × 1024 px lancet layout (top 256 px the arch), drawn at 2× by the kit `stainedKit(cx)`:

| Tool | Purpose |
| --- | --- |
| `glass(points, fill, lead)` | Fills a polygon with gradient, streaks and bubbles; leads its edge. |
| `oval()` | A round pane. |
| `panes()` | Cuts a region into jittered leaded panes. |
| `mix`, `shade` | Colour blending. |
| `reseed(n)` | Makes each window repeatable. |
| `border()` | Leads the arch with 64 jewel-coloured pieces. |

| Window | Painter | Notes |
| --- | --- | --- |
| Traveler (over the door) | `paintTravelerWindow` | Painted at twice the required resolution. |
| Garden (one per side wall) | `paintGardenWindow(cx, swap)` | The left wall's copy sets `swap`: the two figures change places and one cloud moves. |

Each window sits in an extruded stone frame with a sill, 2.6 × 5.2 m, its glass 4 cm off the wall. All window glass
glows at night.

### Kiosks

`kioskFrame(o, th)` builds the shared shell: deck, back wall, half side walls, posts, tin roof, counter. Its closed
boxes take front-only material clones ([§11](#11-no-clipping-no-flicker)).

| `th` option | Effect |
| --- | --- |
| `sign`, `ink` | Sign text and ink colour. |
| `wall`, `wall2` | Wall and batten colours. |
| `tin` | Roof colour as `[r, g, b]`. |
| `spots` | White spots on the roof (Sheriff's). |
| `noBattens` | Plain back wall (Sheriff's, Gallery). |
| `dh` | Raises the roof and everything above the walls by that many metres (`SHERIFF_DH` 1). |
| `desk` | Counter-top height; default 1.12 m (`SHERIFF_DESK` 1.5). |
| `noDesk` | Omits the counter and crates (Gallery). |
| `hw` | Half width to the side walls' middles; default 3 m (Gallery `GALLERY.hw` 4). Deck, walls, beam, roof and ridge follow it; the sign does not. |

- Goods are added through `goods()`, which merges all small items into one vertex-coloured mesh.
- `KIOSK_AT` holds each kiosk's placement (`K[name]`: `x`, `z`, `ry`; local +z faces the customer) and the helpers
  `spot`, `desk`, `front`, `exit`, `at(name, lx, lz)`, plus the shared `hull` and `parts`.
- Each framed kiosk (`post`, `sheriff`, `garden`, `gallery`) adds a 5.2 m `scenery` keep-clear zone (6.2 m for the
  wider Gallery) and a tuft exclusion (`keepAt`) at its centre.

| Kiosk | Construction specifics |
| --- | --- |
| Sheriff's | Roof raised 1 m (`SHERIFF_DH`), raised desk (`SHERIFF_DESK`), plain back wall carrying eight non-overlapping parchment Wanted posters (0.62 × 0.78 m planes, 128 × 160 px canvases; subjects: [bible 1.10](bible.md#110-factions-and-forces)). **Consortium flag** (the only flag: [rules](rules.md#the-world)) on a pole rising from the roof behind the sign, built in the kiosk's `goods()` merge (no texture, no extra draw): a 2.1 × 1.4 m navy cloth and gold hem as flat planes; on each face a cream stem, red half-disc cap and white spots, each layer 1.5 cm further from the cloth than the one beneath, so no layer z-fights another. |
| GOOWARD'S GALLERY | `buildGallery` (`noBattens`, `noDesk`, `hw` 4: 2 m wider than the other kiosks). The `GALLERY.cw` × `GALLERY.ch` (6.9 × 2.6 m) canvas (1 cm off the back wall), both easel frames and seven paint cans on the lawn outside (out of the walk, clear of the easels; no colliders) are in the goods merge; easels at local (±2.6, 3.45), turned ±0.3 rad (`GALLERY.easels`). The two easel paintings (`paintSplats`) share one 512 × 192 px texture on one mesh. **The great painting** ([bible 1.18](bible.md#118-goowards-painting)) is `paintGallery(c, W, H, mk)`: a seeded generator that paints a 2048 × 772 layout at any resolution (the canvas's width over W is the scale) and yields between steps; `mk(w, h)` makes its scratch canvases. `paintArt(tex)` paints it at `ART.s` 1.5 (3072 × 1158 px) in a Worker made from the two functions' source (an OffscreenCanvas, `willReadFrequently`), then draws the returned ImageBitmap into the texture once; if no Worker can be made it steps the generator on the main thread about 6 ms at a time. The texture lies on a plane 1 cm proud of the canvas, unlit (`x.basic`, colour `#e8e8e8`) so the roof's shade and the lawn's light do not mute it; it shows primed cream until painted. Parts: the three walls at the wider half width plus each easel's footprint; hull `[-4.15, -2.62, 4.15, 3.8]` reaches the easels, which are also in `keepAt`. A walk runs from the garden ring to its deck. GOOWARD keeps it from outside (`JGP.galleryRoam`). |
| Garden Supplies | Wheelbarrow geometry: two fork rails from under the tray's front edge to the axle, wheel top level with the tray bottom, two rear legs. |
| Post Office | Mail mountain behind the kiosk, below its roof line and hidden from the square: a heightfield of 19 overlapping cones under about 2,300 envelopes, bundles, parcels and stacks. Five readable kraft parcels (labels chosen by the owner) sit half-sunk round the heap, never stacked; each label stands 6 mm proud and faces straight out. `buildPostOffice` adds another in one line, clear of the others. Solid: hull `[-3.4, -6.75, 3.4, 2.45]` plus a 4.2 m keep-clear zone. |

### Juice Bar, dance floor and drum kit

- **Dance floor:** 10 × 32 tiles of 1.2 m (12 × 38.4 m; `JGP.floor`), starting 0.9 m in front of the bar's counter
  at z −9.6. One canvas at 32 px per tile with mipmaps and anisotropic filtering, so the grout does not shimmer. The
  plane sits at y 0.035 m; anything standing on it starts at least 1 cm higher. `onDance(x, z, m)` tells tufts,
  pickups and roamers where it lies; `dance` keep-clear zones cover it.
- **Drum kit:** on the grass behind the floor's south half; its rug and cymbals stop just short of the floor. KING
  DINO stands behind it facing across the floor. Each drum is one merged mesh. The two-layer rug's inner layer sinks
  6 mm into the outer with its top 1.2 cm above it.

### Pond, square and sky

- **Duck pond** (`buildPond`, at the `pool` station): bank, mud and water discs 4 cm apart, rocks, lily pads,
  cattails and a dock. The water only breathes in colour and must carry no effects; Backpacka's drinking ripples
  are his own.
- **Walks:** each leads somewhere and ends there: the ring round the garden, the Library, a cross walk along the Post
  Office and Sheriff's fronts, Garden Supplies, GOOWARD'S GALLERY, and the south walk to the church steps. No
  benches, bins or flowerbeds.
- **UFO:** crosses the sky every 10 minutes, never during the Event (`JGP.ufoNow` sends one immediately).
- **Sky dome:** scaled to `0.85 · t.far` (far plane 310 m; 260 m on mobile) so it stays inside the far plane;
  otherwise its centre is clipped and a pale disc turns with the view.

### Colliders and keep-clear zones

| API | Purpose |
| --- | --- |
| `F.add(x, z, r)` | Round collider. |
| `F.addBuilding(x, z, ry, hull, parts, name)` | Oriented building: creatures path round `hull`; the player and workers collide with `parts` (walls, counters). |
| `E.add(x, z, r, tag)` | Keep-clear zone for pickups and roamers. |
| `keepAt`, `WALKS`, `onDance` | Keep lawn tufts off structures, walks and the dance floor. |

- Removing scenery must remove its colliders; orphaned colliders are invisible obstacles.
- After moving a building, re-check its scenery and every fixed spot (`F.inHull`, `F.free`, `E`) against the new
  footprint.

---

## 9. The town

This section specifies how the town outside the park is built and where its pieces stand. Its content (each
building's emblems and meaning) is canonical in [bible 1.7](bible.md#17-the-town); its constraints are in
[rules.md](rules.md#the-world).

### Build method

- Construction uses local frames: `place(x, z, ry)` returns a builder with `box`, `geo`, `sign`, `win` and `sub`.
- Every piece goes into a material bin; each bin is merged once at the end.

| Bin | Material | Depth bias |
| --- | --- | --- |
| `lawn` | Tiled lawn | `polygonOffsetUnits` +2 |
| `concrete`, `asphalt`, `brick`, `siding`, `shingle`, `stone`, `boards`, `metal` | Tiled greyscale textures, tinted per vertex | None |
| `plain`, `lamp` | Vertex colour (`plain` double-sided) | None |
| `mark` | Road markings, double-sided | −2 |
| `glass`, `lit` | Window panes (`lit` glows at night) | −2 |
| `sign` | Sign atlas, alpha-tested, double-sided | −4 |

- Bins under 12k triangles merge into one mesh (`town_<bin>`). Larger bins split by position into four park
  quarters (within 46 m of the centre) and eight angular slices beyond (`town_<bin>_<chunk>`), so out-of-view
  chunks are culled.
- Unit geometries are cached and scaled. All signs, awnings, clocks and painted panels share one atlas.
- The town measures about 101.0k triangles in 25 meshes; `test/t_townview.js` prints the counts.

### Constraints

- New detail must stay inside the existing bins and atlas (no new draw calls), and its triangles must be paid for
  elsewhere.
- Every door is wood (`boards` bin under its paint); a storefront door has a framed transom light up to the band
  above the windows.
- No far scenery beyond the ring of streets round the square, and no cars.
- Words outside the park are limited to FIRST BANK OF GREEBLIS, Mistergummery's and its menu board, the stop signs and
  the billboard ([bible 1.15](bible.md#115-written-things)).

### Placements

| Piece | Call or position | Construction notes |
| --- | --- | --- |
| Main Street, east (N to S) | x 52.6 side | Mistergummery's, gem exchange, barber's, picture house, diner, GLYPH's sign shop, SPARKAKUS's genealogical society. |
| Main Street, west | x −52.6 side | Bank, grocer's (ZOLLOD), ice cream parlour, ETCHER's archive, curiosity shop (Sphinx, empty eye socket), florist's, ANOMALEE's television repair. |
| Mistergummery's pylon | Beside the restaurant's front corner | The teal M (`#55b8c6`) on a beam, about Main Street rooftop height, to read over the rooftops from the square. |
| Courthouse (Town Hall) | `COURTHOUSE(0, -62)` | Seal, flower beds and BACKPACKA topiary; clock tower with copper dome, spire and gilded ball. |
| Fire station | `FIRE_STATION(29, -58)` | Right bay open with the engine's nose; BACKPACKA weathervane over the siren (`vane`, a cut-out on the sign atlas). |
| Hotel | `STORE(-70, -55, …)` | Iron balconies, canopy, brass luggage cart, roof tank. |
| Schoolhouse | `SCHOOL(-22, -64.5, Math.PI / 2)` | North of the square beside the courthouse, opposite the church across the park; long wall to the square, door toward the courthouse. Mural of the Garden Event: atlas slot `mural` (896 × 352 px), 11 × 4.3 m, 3 cm off the siding, seeded so it is identical every load, painted in the billboard's realistic manner. Gilded frame: four bars 0.29 to 0.30 m wide standing 12 cm out, with a bright inner fillet; bars and fillets are sized so no faces share a plane. |
| Video store, gas station | North side | MONTGUMMERY's store; far-future gas station with charging posts. |
| South-street homes | South row facing the square | SPARKAKUS, KING DINO, FORTIZMO, SOMLET (mail cart at the kerb opposite the Post Office), the Gorbos, MUSHROOM, ANOMALEE, MONTGUMMERY. |
| KING DINO's house | Corner lot, x −82 | West of the field office. |
| Consortium field office | `FIELD_OFFICE(-33.5, 61.5 + ZS, Math.PI)` | South row's west lot; front to the square; sheriff's star on its side; mast and listening dish on the side away from FORTIZMO's house; the sighting painted on its trailer. |
| Consortium find | `place(-29, 73 + ZS)` | Behind the office, clear of GEMTOE's hoard: a scorched ring taped off between six orange posts, two floodlights. |
| Water tower | `WATER_TOWER(84, -4)` | MAMA GORBO's peach, goo and lime tail. |
| Billboard | `BILLBOARD(-55, -55, "bb_dino", 10, "bb_ban")` | Corner lot across the road from the park's north-west corner, facing the square. Words as the owner gave them. Cloth banner 11 m wide (board 10 m), three lines, text maximised (`bb_ban`, 640 × 192 px atlas slot) so it reads from the spawn. |
| Other lore pieces | Out past the houses | Goo burger behind Mistergummery's, ZOLLOD's greenhouse (hanging baskets on the lamps), GEMTOE's amethyst lot, GOOWARD's drips across the north-east crosswalk. |

`ZS` is `t.parkSouth − t.parkHalf` (12 m), the southward extension of the square.

---

## 10. Platforms and modes

This section specifies the platform gate, VR input and rendering, the test modes and shared interface behaviour.
Supported platforms are defined in [rules.md](rules.md#platforms-every-game).

### Platform gate

`window.__jgpBlocked`, computed from the user agent at the top of the game script, holds a notice for any unsupported
browser or device. At boot, `blockedGate()` shows the notice on the start screen and builds nothing. The Quest
browser and headless Chromium always pass.

### VR

- Start screen: "Press A to enter VR".
- Input: left stick moves; right stick snap-turns (`t.xr.snapAngle` 0.5236 rad); either trigger selects along that
  controller's pointer beam (every connected controller has one; `t.xr.pickRange` 16 m); the quest HUD sits on the
  left grip. WebXR input sources
  must be re-read every frame, as controllers connect and disconnect mid-session.
- Rendering: full headset resolution unless frame rate requires a step down (`t.xr.quality` 1, 0.9, 0.82, 0.74,
  0.66 with matching `t.xr.foveation`; target 72 Hz). Near plane 0.15 m (`t.xr.near`).
- **Head guard** (`JGP.headGuard`): the view darkens from 20 cm off any solid structure to fully black at 8 cm and
  clears as the head withdraws. Solids are building parts at their real heights (`TOPS` lists each building's part
  heights in `parts` order; parts with no entry count as 3 m) and round colliders the player meets, except the
  Summoning Stone and the Portal's pillars, which the player walks through.
- The Ancient can be talked to only from inside its room (the pointer would otherwise reach it through the walls).

### Desktop and mobile test modes

Third-person test modes with an avatar (`dk`). `?desktop=1` and `?mobile=1` force them; `__jgpMobile` activates
automatically on Android.

- **Fencing:** test-mode code sits between `TEST-MODE-BEGIN` and `TEST-MODE-END`; `pack/cutmodes.js` removes it for
  the final build ([release.md](release.md#the-final-pass)). Only the `dk = { on: false }` stub stays outside, for
  shared `dk.on` checks. New test-mode-only code must go inside a fence. Final-build-only code sits commented out
  between `FINAL-BUILD-BEGIN` and `FINAL-BUILD-END` (the desktop and phone start screen); the cut
  uncomments it.

| Mode | Controls | Layout |
| --- | --- | --- |
| Desktop | WASD or arrows walk; drag (or Q / E) looks; wheel zooms; click picks | Quest HUD top left; frame rate and error count bottom left (`#jgpDeskErr`) with a `copy errors` button; nothing top right. |
| Mobile | Joystick bottom left; TALK / GIVE bottom right (TALK shows only with someone or something in talking range or a menu open; GIVE only when a Blossom can be given) | fps and resolution chip top left (`#jgpDiag`; tap for the diagnostics panel); quest HUD top right; no zoom buttons. |

- **Taps:** a tap or click advances dialogue page by page and closes it after the last; a tap outside the action menu
  or a panel closes it. In VR the trigger advances dialogue.
- **Action menu** (`placeMenu`): above the creature's head, at the creature's distance from the camera, facing it,
  and re-placed every frame while open (the camera swings and eases behind the avatar). A station's `top` is a fixed
  height; SPARKAKUS reports his real head top. In VR the menu is placed once from the head.
- **Camera:** starts near level (`dk.pitch` 0.2) so KING DINO's billboard is in the first frame. Near plane 0.2 m.
- **Error counting:** every error is counted in one place, `vo()` (frame loop, click, key, button), so the counter
  and the copied report agree.

### Dialogue box

One canvas, drawn identically in every mode. The speaker's name tag appears only when there is a speaker; a nameless
notice (a pickup's, such as "Overcoming Shyness book obtained") has no tag.

---

## 11. No clipping, no flicker

This section specifies the methods that keep geometry from intersecting and surfaces from z-fighting. The binding
rules are in [rules.md](rules.md#visual-quality).

Principle: place from the skin (`hit()`), keep orbits wider than the body, and never let two faces share a plane.

### Clipping

- **Flat parts on curved skin:** sink by the sagitta, r² / (2R), so the edges meet the curve.
- **Orbiting items:** orbit radius > body radius + item size + jiggle (MAMA GORBO's tags orbit at 1.78 m).
- **Overlapping decorations:** omit plates under a shield; clear a shield from the arm's full swing, not only its rest
  pose.
- **Ground:** parts below a bobbing or swaying body must never enter the floor. Check real mesh vertices
  (`test/t_ground.js`) and lift the body by the amount a tilt lowers its footprint. Tentacles that would dip splay
  outward just enough each frame, searching from the previous frame's answer.
- After any fix, re-check neighbouring parts, and render mirrored pairs from both sides.

### Depth precision

A 24-bit depth buffer with the near plane at 0.15 m resolves 4 mm at 100 m. A 16-bit buffer, which a phone canvas or
a headset layer may provide, resolves only 1 mm at 3 m, 1.5 cm at 10 m and 9 cm at 30 m. All scenery must be
designed for the 16-bit case.

| Measure | Specification |
| --- | --- |
| Coplanar faces | Any two faces in one plane flicker: separate them (a few millimetres is enough for small decals and lines; the current builds are the standard), including faces seen only from inside a building (double-sided bins show both sides of a wall). Any spacing is acceptable while it causes no z-fighting or other graphical issue. |
| Wide overlays | 2 cm gap where one surface lies on another over a wide area (cross walk, gazebo deck); the secret room's flat details sit 1 cm above its floor. |
| Ground bias | Ground `polygonOffsetUnits` +4 (no slope factor), park lawn +2; `mark` and `glass` −2; signs −4. Overlays always win. Units only: a slope factor at a grazing angle would displace the ground by metres. |
| Mipmaps | Every canvas texture is mipmapped on WebGL2 (`b()`), so signs, posters and walls average down at distance instead of shimmering. |
| Diagnostics | The error report and the mobile panel show the depth bits (`window.__jgpDepthBits`, `__jgpDepthXr`): the value to read from a device that flickers. |

### Merged scenery: `unfightParts`

`unfightParts()` runs at load on the town's bins and every `goods()` merge (kiosks, Library, Juice Bar, drum kit),
never on creatures.
- Where two parts have faces in one plane (within 4 mm) overlapping by more than 1 cm each way, the smaller part
  moves: 8 mm proud when both faces point the same way (a sign on a wall), or into the larger part when they press
  back to back, by 1 cm or half the thinner part's depth if less; not at all when both are only millimetres thick.
- Up to three passes. Moves about 5,600 parts; cost is reported in `JGP.unfightParts.moved` / `.ms` (about 0.5 to
  0.7 s headless).
- Merged faces lying flat on the ground and facing down are dropped.

### Materials and draw order

- **Locked creatures:** where a final model's own parts share a surface, give the overlay a cloned material with
  `polygonOffset` (factor −1, units −4). Depth changes; shape does not.
- **Transparent overlays** each get their own `renderOrder` (goo splats on the view: newest on top), or they swap as
  the view moves.
- **Single-sided planes** vanish from behind: use thin boxes or double-sided materials.
- **Closed boxes are drawn front-only.** All materials are double-sided by default (a shim at the top of the page); a
  double-sided box's inner faces meet its outer faces along every edge, which shimmers at grazing angles.
  `kioskFrame` uses front-only clones for this reason; apply the same to any closed solid whose edges show.

### Locating flicker

1. Render the view three times with the near plane nudged; changed pixels are depth ties.
2. Hide meshes by halves until the change stops, to name the two that tie. If hiding never stops it, the culprit is
   a `polygonOffset` decal's edge, which the nudge itself disturbs (the game's near plane never moves).
3. Never move the camera instead, even by millimetres: fine textures then report as flicker.

Tools: `test/t_zfight.js`, `test/t_zcheck.js` and `test/t_shimmer.js` ([testing.md](testing.md#probes)).

---

## 12. Performance

This section specifies the performance techniques in use. The Meta Quest sets the budget
([rules](rules.md#the-game)): draw calls are the scarcest resource (VR submits each draw twice, at CPU cost per
draw), then triangles, then per-frame JavaScript. Measure with `test/t_perf.js`.

### Draw calls and triangles

- **Merge per material:** kiosk goods, plants, town bins, born creatures (`KIT.compact`).
- **Creature batcher** (`gcEB`, updated by `Qe`): skips parts whose matrix, colour and visibility are unchanged,
  recomputes a batch's bounds only when something in it changed, and uploads only that batch's part uniforms.
- **Instanced pickups** (`qe`): each Blossom and flint mesh is one `InstancedMesh`; a taken pickup is scaled to zero.
  The flint glints share one material; each stone's pulse rides in the spare slot of its instance matrix
  (`userData.gcOp`, element 3), read by `gcOpPatch` in the vertex shader, which then restores `w` to 1.
- **Hidden-face removal** (`dropInside`, in `goods()` merges): a face whose three corners lie at least 1 mm inside
  another opaque part's convex solid (box, sphere, cylinder, cone or icosahedron carrying `lp`) is dropped. Lossless
  to the pixel; about 8,900 faces at load in about 0.1 s (`JGP.dropInside.dropped` / `.ms`). Not used for the mail
  heap (cost exceeds saving), creatures or town bins.
- **Far versions of kiosk goods** (`FAR_DETAIL`, `window.__jgpFar`): a `goods()` merge with fine detail is built
  twice; the far version shows beyond 30 m from its centre and the near version again inside 28 m, checked at 4 Hz.
  No extra draw call. In the table, `G` is a kiosk builder's `goods()` instance, not the sound object.

| Mechanism | Effect in the far version |
| --- | --- |
| Part added while `G.fine(1)` is on | Omitted (Garden Supplies' small curiosities in the jars and on the back shelf). |
| `G.add(geo, colour, matrix, G.TOP)` | Replaced by a coarse stand-in (a letter on the mail heap, as its top face). |
| `G.add(…, null)` | Omitted (heap letters' stamps and bands). |

| Kiosk | Near | Far |
| --- | --- | --- |
| Garden Supplies | 47.6k triangles | 35.4k triangles (deck curiosities always shown) |
| Post Office | 46.2k triangles | 17.3k triangles |

- **Mobile counts:** `window.__jgpMobile` places fewer envelopes, tufts and fence pickets.
- **Shared canvas textures** for flat patterns over many meshes (dance floor, rug).

### CPU

- **Static groups:** `H(group)` disables matrix auto-update. The bundled three.js `Object3D.updateMatrix` recomposes
  the local matrix only when position, rotation or scale changed, and `add` marks a re-parented object's world
  matrix, so static objects cost nothing. Code that writes `matrix` directly must set `matrixAutoUpdate = false`; an
  object animated after freezing must have it re-enabled.
- **No per-frame GPU reads:** `getParameter` stalls the CPU until the GPU drains. Depth bits are read once for the
  page canvas and once for the headset layer, 1 s after each starts.
- **Per-frame work:** search from the previous frame's answer; repaint textures a few times per second at most; never
  allocate in loops; work only on change (ground height only after movement; squared distances before any square
  root; a failed search retried 1 s later; idle samples staggered across frames).
- **Shared materials:** never mutate a cached or shared material; clone it.
- **Compile early:** anything first shown mid-game (the bulb, Backpacka, his water) is built and compiled ahead; a
  compile stall in a headset is long and crackles the music.
- **During the Event** a safeguard hides scenery beyond `t.xr.finaleKeepR` (26 m); anything that must stay visible
  is marked `userData.keepInFinale`. Hide finished effects (Backpacka's droplet cloud is its own object, hidden with
  him).

---

## 13. Code conventions

This section lists coding rules that apply across systems. Test and lint routines are in
[testing.md](testing.md#when-to-run-what).

- Timers (`setTimeout`) that touch a creature must be stored on it and cleared when another system takes it.
- Anything that claims a creature (vignette, Event, battle) must first check `busy`, `vig` and `me.active`.
- A test of one move resets the creature's `bt.tg` state first, or it inherits the previous state.
- After moving a building, re-check scenery and render spots against its new footprint; render portraits on open
  lawn (`SPAWN=-18,24`).
