# Greeblis Town: How It Is Built

How the game is put together and how it behaves: the page, the creatures, the systems that move them, the park, the
town, rendering and performance. The game is the single readable `index.html` at the repo root; this guide names its
code by identifier and section banner, never by line number. Each creature's own look and role is in
[creatures.md](creatures.md); the rules are in [rules.md](rules.md).

Contents:
1. [Overview](#1-overview)
2. [The park at a glance](#2-the-park-at-a-glance)
3. [Building creatures](#3-building-creatures)
4. [How creatures behave](#4-how-creatures-behave)
5. [Gameplay systems](#5-gameplay-systems)
6. [The Garden Event](#6-the-garden-event)
7. [Audio](#7-audio)
8. [The park's set pieces](#8-the-parks-set-pieces)
9. [The town](#9-the-town)
10. [Platforms and modes](#10-platforms-and-modes)
11. [No clipping, no flicker](#11-no-clipping-no-flicker)
12. [Performance](#12-performance)
13. [Code habits](#13-code-habits)

---

## 1. Overview

### The page

`index.html` holds, in order: the head (styles and the hidden DOM the VR interface mirrors), a small console-throttle
and error guard, the bundled three.js (r128, trimmed: see [release.md](release.md#trimming-threejs)), and the game
script. The game script has two layers:
- **The engine:** the config object `t` (player, park bounds, timings), the frame loop `Re`, the renderer, input, the
  dialogue and panels, entities (`It`), colliders (`F`), sounds (`G`), pickups.
- **The game layer:** the creatures, the park and town, the quests, the Garden Event and every system on top. It
  exports what the tests need on `JGP` (see [testing.md](testing.md#the-games-globals)).

### From builder to frame

```
ROWS entry  ->  builder so[name](group, def)  ->  born(): blink, find the moving parts, merge the rest
                                                     |
Every frame:  step(t, dt, talk, walk)  ->  posts, patrols and roamers  ->  visits and vignettes  ->  Event roles
```

### Where builders come from

| Source | What it is |
| --- | --- |
| **Born** | Readable builders in `BORN`, registered as `born_*`. Each starts with a plain-language comment describing the creature and saying its model is final: that comment is the design brief. |
| **Packaged models** | Minified builder modules, `JGP_CITY` and `JGP_WOODS` (historical identifiers), between the `PULLED-MODELS-BEGIN` and `-END` markers, registered as `city_*` and `woods_*`. Engine services reach them as `$x` aliases, because the minified code shadows one-letter names. |
| **Wrappers** | Round a packaged model: `anomaleePeg` (ANOMALEE's peg leg) and `fortizmoPick` (FORTIZMO's bounds). |
| **Special** | Backpacka is built by the Garden Event (`BP`), SPARKAKUS by the Library's worker (`st`), the Ancient by the church. |

A builder that throws never stops the game booting: the registry reports the error and leaves that creature empty.

---

## 2. The park at a glance

The park is a fenced square from x −37.6 to 37.6 and z −37.6 to 49.6 (`t.parkHalf`, `t.parkSouth`); +z is south.

| Place | Where |
| --- | --- |
| The garden and the Summoning Stone | Centred on the origin, radius 15 (`GARDEN_R`): tilled rings with stepping-stone paths, the stone at the middle. |
| The Library | The north-west corner, centred at (−24.75, −24.75). |
| The Post Office and the Sheriff's | The north-east corner, side by side on the diagonal. |
| Garden Supplies | The south-east corner. |
| The Juice Bar and the dance floor | The west side: the bar, then the purple floor before it. KING DINO's drum kit stands on the grass behind the floor's south half. |
| The duck pond | The east side, at (24.6, 0). |
| The phone booth | South of the garden, at (−7.2, 23.9). |
| The Portal | In the park, with HENNRICK's ground round it. |
| The church | At the end of the south walk, its back to the fence. |
| The player's spawn | (−36.3, −20), just inside the west fence north of the Juice Bar, facing KING DINO's billboard across the road. |

---

## 3. Building creatures

### From artwork

1. List every visible feature in the artwork first.
2. Build them all, render from four sides, compare with the artwork and iterate.
3. Ask before guessing what an ambiguous shape is.

### `blobBody`: one smooth sculpted skin

The main tool for organic bodies. It blends ellipsoids into one signed-distance field and meshes it by casting rays
out from a centre point.

```js
const C = [0.02, 1.6, 0.02],                  // must see every part
  bb = blobBody([
    [0, 1.9, 0, 1.13, 1.0, 1.08],             // [cx, cy, cz, rx, ry, rz, tiltX?, turnY?]
    [0.04, 0.72, 0.04, 0.84, 0.62, 0.82],
  ], C, { k: 0.3, col: (p, fold, cc) => cc.set(PEACH).offsetHSL(0, 0, -0.05 * fold) });
keepR(bb.geo, gradMat("goo", { shine: 110 }), body);
const { p, n } = bb.hit(C, [0.42, 0.5, 0.8]);  // a skin point and its normal along a ray
```

- **`k`:** how softly the parts melt together (0.2 firm, 0.3 goo).
- **`fold`:** 0 to 1, how deep a point sits in a crease. Darken by it for natural shading.
- **`hit()`:** places every eye, plate, port and tag on the skin. Never guess a surface position.
- **Small ellipsoids half out of the surface** make runs, lumps and folds; colour them in `col` by distance.

### Shapes and surfaces

| Helper | Use |
| --- | --- |
| `latheGeo(smoothProfile(points, n))` | Anything round in section: stems, caps, cones, berries. |
| `ridgedTube(points, r0, r1, n, ridges, depth)` | Tails, horns, tentacles, hoses: tapered, optionally ringed; with `cap` the far end closes. |
| `onEllipsoid()`, `faceTo(group, normal)` | Lay flat details (spots, badges, decals) on a curved surface. |
| `cardGeo(cards, kind)` | Feathers, fur and quills as merged cards (`vane` or `fur`), with `gradMat`. |
| `KIT.surf(kind, colour, {rep, bump, shine})` | A painted, tactile texture in greys, tinted by the material, shared by every creature using that kind: scale, fur, feather, fabric, felt, metal, goo, skin, soft, plastic, rubber, wood, leaf, stone, thatch, sand, soil, grass. |
| `gradMat()` | Vertex-colour gradients baked into a body. |
| `texturize(group, kind, o)` | One finish for a whole model's plain parts. |
| `MeshBasicMaterial` | Glows without lights: rune strokes, lens glints, the light bulb. |

### Faces, limbs and parts

- **Eyes:** `KIT.eye(parent, pos, r, {iris, lid, open, rot})` builds a full eye with a lid; pass the lids to `born()`
  and they blink. Eyes that aren't eyeballs can blink too (MAMA GORBO's lenses squash to 6%).
- **Limbs:** `KIT.arm` (shoulder `sh`, elbow `el`, `hand`) and `KIT.leg` (`hip`, `knee`, `foot`: claw, pad, paw, boot
  or hoof). `KIT.stride(leg, phase, swing, bend)` walks a leg with the foot kept level.
- **Hats** sit on the head group so they move with it. Build brims and visors as thin solids, never a single-sided
  plane (it vanishes from below).

### `born()`: animation and merging

Every born creature ends with `born()`, which handles blinking, finds the moving parts and merges the rest:

```js
return born(g, {
  height: 2.95,          // for the talk interface and the name tag
  lids,                  // blinking eyelids
  step(t, dt, tk, wk) {  // tk: talking 0..1, wk: walking 0..1
    body.scale.set(1 - 0.018 * br, 1 + 0.035 * br, 1 - 0.018 * br);  // breathing
    body.position.y = 0.04 * tk * Math.abs(Math.sin(5 * t));       // talk bob
  },
});
```

- Every creature breathes or sways at rest, bobs when talked to (its own `tk` animation plus the shared talk
  wrapper's nods) and strides when it walks.
- **Merging:** `KIT.animated` samples `step` to learn which nodes move, and `KIT.compact` merges everything else per
  material. Mark a mesh `userData.keep = true` to keep it apart: transparent parts, sprites, materials that animate,
  and **any part its animation changes only in a rare state** the samples never reach (a squint every few seconds,
  lids that hide when the eyes open for a Blossom). A part merged away is never drawn, so an animation acting on it
  never shows; `test/t_baked.js` lists such parts.
- `step` runs from absolute time: anything it moves, it sets every frame. Nothing the sampled frames do may be seen or
  heard (no emotes, sounds or goo).
- **Standing on the ground:** each creature stands on what is under it (`JGP.groundAt`: lawn, walks, dance floor,
  garden soil, rows and stones, decks, bar boards, rugs), lifted by however far its model reaches below its feet at
  rest, through a wrapper round the whole model. Not for one posted up off the ground (MUSHROOM on his desk).

### Planting and dancing

Whole-body moves layered on top of each creature's own `step`, so they work for packaged models too.

```js
const MOVES  = { p_glyph: ["dig", 2.3, 1], p_etcher: ["pat", 2.1, 0.9], ... };       // [move, speed, size]
const DANCES = { p_mamagorbo: ["jelly", 5.45, 1], keeper: ["funk", 5.45, 1], ... };  // [dance, rad/s, size]
```

- **Planting moves:** dig (lean in and scoop), pat (rock and press down), scatter (turn and toss), and eat
  (ANOMALEE's pizza, once the Snacks quest is done).
- **Dances:** bounce, twirl, shimmy, stomp, groove, jelly (a squash and stretch for goo bodies) and funk (SPARKAKUS).
  5.45 rad/s is one bob per beat of KING DINO's 104 BPM; 2.7 is half time.
- `plantMove(key, t)` and `danceMove(key, t)` return an offset `{x, y, z, rx, ry, rz, sx, sy, sz}`.
- HENNRICK and the three Dancers dance their own built-in dances. KING DINO and SOMLET stay at their posts and
  FORTIZMO plays her horn, so none of the three has a move. Anyone else missing from a table digs and bounces.
- **The wrapper:** the offset goes on a wrapper group round the creature (`wt(group)` makes it the first time the
  creature plants or dances; `zt()` measures its footprint), so its own animation keeps running inside. Feet stay
  above the ground.
- **The driver:** one per-frame loop keeps each creature's state (`bt.tg`: mode, blend `k`, walking `mv`). A creature
  starts a move only standing still, eases in and out over about a quarter second, and switches between planting and
  dancing only once the old move has eased out. One being talked to stops for it.

### Flowing goo (MAMA GORBO's streams)

Goo that runs down a body and moves like goo, without clipping:
- **Path:** sample points down the skin with `hit()` (12 steps of elevation from the same centre), offset each by the
  tube's radius plus 1.5 cm along the skin normal, and keep the normals. End with two points out over the ground that
  spread into a puddle. Keep clear of other parts' paths.
- **Tube:** `ridgedTube(points, 0.06, 0.095, 70, 0, 0, 12)`, thicker as it goes down, paler along the top.
- **Flow:** each frame, swell the rings in a wave rolling down the tube
  (`R = r · (1 + 0.42 · max(0, sin(2π · 2.2u − 2.4t))²)`, tapered to nothing at both ends), and move each ring's
  centre out along the skin normal by `R − r`, so a ring only grows away from the skin. Store each vertex's unit
  direction once and write `centre + dir · R`; set `needsUpdate` and enlarge the bounding sphere.
- **A glob on top:** a bigger blob slides down each stream, riding out along the normal by its extra width and staying
  above the ground; the puddle swells as it arrives.
- **Closed ends:** a tube is open at both ends. Cap each with a sphere wider than the tube all round, or the rim shows
  and you can see in.

---

## 4. How creatures behave

### Placement

- **`ROWS`** (the start of the game layer) places everyone: each entry is `[id, NAME, builder, def, spot]`. A spot is
  `[x, z]`, a function, `"kiosk:<name>"` (behind a kiosk's counter) or `"kiosk-desk:<name>"` (on its desk). `via`
  is the way a worker walks out: `"kiosk:<name>"`, `"kiosk-front:<name>"` or a function. Kiosk names: `post`,
  `sheriff`, `garden` and `shop` (the Library).
- A creature turns to face a player standing near it.
- Creature keep-clear zones are added in `applyCast`, once the spots are known. Pickups never land on a creature's
  spot, nor where the Dancers and HENNRICK roam.

### Posts, patrols and roamers

- **Workers** walk out of a kiosk or bar by a fixed route (behind the counter, along a side wall, out through the gap)
  and back the same way. One posted up on a raised floor (MUSHROOM, 1.5 m up) steps down when it leaves.
- **FORTIZMO** walks the aisle behind the Juice Bar by moving her `home`: every few seconds she picks a spot at least
  3 m along and walks there, then faces the dance floor; not while she is busy or the player is close.
- **Roamers** (`roam(id, pick, wait…)`) walk their `home` to a new spot picked by `JGP.portalRoam` (HENNRICK: 3.2 to
  6 m from the Portal, never in its doorway or NEXTESSA's lane), `JGP.parkRoam` (GEMTOE and the Gorbos: 5 to 16 m off,
  never on the dance floor) or `JGP.floorRoam` (the Dancers: 3 to 12 m off, on the floor). A spot is taken only if
  `JGP.roamFree` passes it (inside the square, out of the garden, buildings, the pond and every scenery zone) and
  `JGP.roamWalk` passes a straight walk there.
- A roamer with no headway for 2.5 s, or late, settles where it is and picks again; one boxed in heads back to its
  starting spot. None moves while busy (talking, a vignette, the Event) or with the player close.
- **MAMA GORBO and GOOWARD** meet every 20 to 40 s (`JGP.meetAt(t)` forces it): they walk to a spot between them, turn
  face to face and throw goo balls to each other, a heart over the one who catches each.

### Home ground

No creature is ever left stuck away from home, whatever the player does (the owner's rule).
- Each creature's place is fixed (`def.at`), and so is the ground it belongs on (`JGP.homeGround`): the dance floor for
  the Dancers, the open park for GEMTOE and the Gorbos, round the Portal for HENNRICK, the aisle behind the bar for
  FORTIZMO, its spot for everyone else. Its `home` is only where it is walking to now.
- A roamer never settles where its walk stalled unless that is on its ground; off it, it first goes back to its own
  place (`JGP.sendHome`, a planned route; a worker by its way in).
- A guard sends home anyone left off its ground for 4 s (20 s if still trying to walk) while it has nothing else to do.

### Routing

`JGP.route` plans a walk over a 1.2 m grid of open ground (as `roamFree`), pulled taut into clear straight walks round
the garden, the pond, buildings and scenery. A start off open ground (at a door) first steps to its nearest open
cell; the last cell gives way to the goal only when the line there is clear. Costs are full precision and loops are
bounded, so a plan never holds up a frame.

### Visits

About twice a minute (22 to 32 s apart; at most two on their way out or meeting at once) one creature leaves its place
to call on another, so every pair's two vignettes play in about an hour and a half.
- **Choosing the pair:** first by how often the two have been out visiting or been called on (fewest first; ZOLLOD's
  count is halved, so he goes twice as often), then by how often the pair has met. The meeting plays whichever of the
  pair's two vignettes has played less, never both.
- **Who visits:** everyone visits everyone, kiosk workers included. KING DINO (at his drums), SOMLET (asleep) and the
  Ancient never leave; the others come to them. NEXTESSA and Backpacka neither visit nor are visited. ZOLLOD takes no
  part until OVERCOMING SHYNESS frees him.
- **The way:** a worker leaves by its `via` (MUSHROOM jumps down off the front of his desk first), then follows
  `JGP.route`.
- **The meeting:** the visitor stops beside the host, facing it (a wandering host stops where it is; one that has moved
  on is walked up to again, twice at most). A host who works in a kiosk or behind the bar comes out to meet it and
  goes back in after. SPARKAKUS stops where he is in his Library and the visitor comes in across its open front.
  The Ancient is called on only one round in eight, in and out through the wall where the X is (`inside` "church");
  on the way in, every visitor stops a moment at the open ground outside the X, puzzled, a "?" in its own colour over
  its head, then goes in.
- **Home again:** slowly (`walkK` 0.55). A worker goes back in by its `via`; one whose place is up on a desk walks the
  corners flat on the ground and gets its height back only on the last leg. The Event, a battle or a meeting calls a
  visit off (homes put back at once; one called off inside the church slips out by the X first).
- **Always talkable:** the talked-to creature stops where it stands (ZOLLOD too, while the shop opened from him is up:
  `heldBy`); the visit's clocks wait; the walk picks up when the dialogue closes.
- **Stopping for the player:** every creature on any walk stops for the player coming near, turned to them, for
  `proximityFreezeS` (12 s) or until the player moves off; the freeze sets `held`, the visit holds its clocks while
  either of the pair is held (or while a panel is open), and a planned way home keeps its budget.
- **SPARKAKUS out in the world:** his `stump` station follows him (only the Event hides it, and `xo` speaks for him
  then); his walk waits while his dialogue is open. Sent out with no way planned, he plans his own (`wayOut`): out of
  the church by the X if he is in it, then `JGP.route`. A host is released only by the visit that took it
  (`h.hostQ`). He is never sent visiting during his Artifacts speech (`Bulb.hold`).
- While in one, `visiting` / `hosting` keep roaming, FORTIZMO's patrol, the Gorbo meetings, other vignettes and
  SOMLET's lying down out of it.
- **For tests:** `JGP.visitAt(t, v, h)` starts the named visit at once; with no pair, `t` is the next natural visit's
  time (a far future time silences them). `JGP.visits()` and `JGP.visitPlan(v, h)` report.

### Talking, menus and gifts

- Talk opens dialogue pages split with `|`. Whatever opens a dialogue must set `xe.lastTarget`, or the next speech goes
  to the wrong creature. `te(ent, gift)` sets `ent.gifting` for a Blossom line.
- Menus: Talk, plus "Give a blossom" while the player holds one. ZOLLOD's is a single "Shop at Garden Supplies". Match
  creatures by `Xt(ent)` (the builder key): some entities have no `id`.
- **Gifts:** GOOWARD and MAMA GORBO (a `goo` palette in their def) shoot goo at the player's head (eight `Nt.gooArc`
  shots that splat on the view). A Blossom to a Dancer starts a Dance battle once their thanks is said, unless the
  player has walked away or the Event has begun. SPARKAKUS runs his lap only at his place in the Library
  (`st.atHome()`); anywhere else he takes the Blossom with his `giftAway` line. With no Blossom in hand there is no
  Blossom option, and `te()` refuses a gift.
- **The light bulb:** `Bulb.start(getPos, height)` fades a bulb in over a speaker, lights them with a cone and dims the
  town toward night until the dialogue closes. It is built and compiled at load. `getPos` must give a world position
  (`st.pos()` does, at home in his Library's own frame too). From the first finale page until the Gem speech is done
  (`Bulb.hold`) SPARKAKUS offers no Talk or Blossom.
- ANOMALEE keeps gazing at the church window through her Talk lines; she turns to the player only for her Blossom
  line, or for any line during the Event. Anyone talked to during the Event stands still for it.

### Vignettes

- Every creature has two vignettes with every other: an animation and an exchange of lines. The fourteen in `NAMES`
  (two-letter codes) make 91 pairs in `PAIRS`; the Ancient has one with each in `SLUG_PAIRS`. NEXTESSA and Backpacka
  have none.
- **The animation:** a choreography style (one of twelve), both creatures' signatures from `SIG` (item, colour,
  gesture, emote) and a seeded twist. **The lines:** the pair's two lines, the two turned to each other. `plays[AB]`
  and `plays[ABt]` count them. `test/pairs.py` checks every pair is there once.
- **Who takes part** (`lineUp`): the cast at their own spots, not busy, not in a visit, a meeting or a victory dance;
  SPARKAKUS through his stand-in `st.ent` (a marker kept at his world position whose wrapper wraps his model). The
  Ancient's play only on a visit to it, and are seen only by a player in the church.
- **Only side by side:** two already together (the Dancers on the floor) play there, fairly among the pairs standing
  together; every other pair meets by a visit. Talking to either, or the Event, stops one. KING DINO and the Ancient
  never turn or take gestures (a bow would tip his sticks into his kit). Wrappers turn in `YXZ` order: the turn to the
  partner first, then a gesture's lean and roll in the turned frame.
- Thrown things are cached and reused across flights (the gem's octahedron, each colour's halo material); a lines
  vignette's bubble canvas and material are disposed at its end.

---

## 5. Gameplay systems

### Pickups and money

- 32 Blossoms and 40 flint (`Kt.blossoms`, `Kt.acorns`) lie round the park; each taken one comes back elsewhere after
  12 s. Spots come from `go()`, which turns down anything in a keep-clear zone, on the dance floor or within 0.8 m of a
  building's hull. The pickups are instanced (see [Performance](#12-performance)).

### Quests

Three quests on the HUD: **SEEDS**, the **SUMMONING STONE** and **SNACKS**.
- **Seeds:** sold at Garden Supplies as a "bagel seasoning packet" for 15 flint.
- **The Summoning Stone:** through the Ancient Artifacts chain (below).
- **Snacks:** NEXTESSA's pizza, called from the phone booth.
- **The phone is locked** until MUSHROOM has a Blossom (`Kt.phone`, set in `te()`): before, the booth says the
  connection to the Portal seems blocked; after, it works for the rest of the session.
- **The shop** (Garden Supplies): the Flower Hat, the Sun Dress and the Frog Shoes at 3 flint each, and the Seeds. The
  mirror lets the player change outfits.

### Dance battles

- With the three Dancers: rock, paper, scissors. The Dancer goes first and shows its move with its own animation;
  Rock out! beats the splits, the splits beat going horizontal, going horizontal beats Rock out!. Each round won
  teaches one of the Dancer's ten steps; learn all ten to win. The bar counts the steps left; the panel shows only the
  Dancer's move. The winner does a victory dance. A battle has LEAVE from its first round.
- A battle starts only from a Blossom given to a Dancer, so each one costs a Blossom.

### The Ancient Artifacts chain

- Each Dancer's first win gives one Ancient Artifact (a third of one teal brilliant-cut diamond; later wins get a bow).
  SPARKAKUS's Talk follows the count. With all three he stays where he stands, wherever he is, and the bulb comes on;
  after his first lines `ARTS.assemble` puts the diamond together in the air between him and the player: a school-glue
  bottle appears over the pieces, turns upside down, glue drips, and each piece moves to its `userData.gemOffset` with
  a flash (about 5 s). Then his speech, and the Gem flies to the player ("Ancient Gem collected!").
- GEMTOE trades the Summoning Stone for it, with a happy spin, and the Stone starts the Garden Event.

### The shyness sub-quest

ZOLLOD starts too shy to keep shop (`Kt.shyFree` false): one Talk, no Blossom option, no shop, no visits. The Garden
Supplies counter's own shop prompt (`gshop`) is hidden too until he is freed. OVERCOMING SHYNESS stands alone at eye
level in the middle of a side case on the left, the biggest of the hardbacks (0.34 × 0.44 m), and is taken by pointing
at it and selecting (`Kt.shyBook`). The first Talk with it in hand frees him; from then on talking to him opens the
shop, and his pairs count half in the visit order. MAMA GORBO's fourth Talk line hints at the book.

### Flavour lines

Every creature but the Ancient, NEXTESSA, Backpacka, ZOLLOD and SPARKAKUS has a flavour line last in its turn, a word
about its own lore. They come only outside the Event. SPARKAKUS's Talk follows his quest instead.

---

## 6. The Garden Event

- **Starting it:** only from the Summoning Stone, and only once the Summoning Stone quest is complete. "Use the
  Summoning Stone" opens the GARDEN EVENT menu: the Summoning Stone, Seeds and Snacks with their boxes, "Start gardening
  event?", Yes / No. Without the Stone, Yes only says the runes stay dark; `oe.yes()` itself refuses.
- **The order** (the Backpacka block, `finale.durationS` 180): everyone walks into the garden and plants for 20 s once
  they are all there (or 30 s in), while FORTIZMO walks slowly to the garden's edge; she raises her horn and plays
  "Backpacka's Rain Strut" and everyone steps out to the ring walk and dances; Backpacka flies in (timeline `D`: 16 s to
  the pond, 14 s drinking, 12 s to the garden, 15 s spraying, 14.5 s away); FORTIZMO plays the tag and everyone goes
  home.
- **Roles:** `NO_PLANT` (FORTIZMO) comes but doesn't plant; `AT_POST` (KING DINO at his drums, SOMLET asleep) stay
  where they are; NEXTESSA is never there; Backpacka only appears for it. SPARKAKUS leaves the Library to plant and
  dance with everyone (only when Seeds are in), at a spot of his own inside the garden, and grows a flower there. His
  Talk at the Event is his Event line, wherever he is. A planter held off its spot by a neighbour takes the spot where
  it stands after a second, within a metre. The Ancient stays as it always is.
- **Workers come out straight:** a kiosk or bar worker walks its way out from inside only; one already out (on a
  visit, or stepped out to meet a visitor) goes straight to the garden.
- **Pizza** (once the Snacks quest is done, `Kt.rewards.snacks`): stacks of pizza boxes stand outside the garden's stone
  ring beside the seed sacks for the whole Event (fixed bodies in `uo.fixed`), and ANOMALEE eats a slice every 5 s at
  her spot instead of planting (`PIZZA`).
- **Seeds decide it** (`bt.seeds`, fixed for the whole Event): without them nobody comes, there is no music, and
  Backpacka sprays a garden that doesn't grow. With them each planter puts in exactly one flower, of a kind picked at
  random, in the soil 0.9 m in front of it, 1.5 s into its first dig (`plantTick`). `beginPlanting` puts that soil on a
  row and at least 0.75 m clear of the stepping-stone paths.
- **Rounds** (`garden.round`): only the first Event grows flowers. Every Event uses the same spots (the rows at 2.6, 6.6
  and 10.6 m); from the second on everyone plants there again but nothing more comes up. Plants stay for the session.
- **Growing:** a plant waits in the ground until Backpacka's water reaches it, then comes up over about 11 s; by halfway
  through the spray every plant is watered. Anything still growing when the Event ends finishes at once.
- Backpacka is built, and his shaders compiled, before the music starts: a compile stall mid-song crackles.
- An Event wrapped early (by its time limit, or left) leaves nothing pending for the next one, and drops any route home
  planned before it.

---

## 7. Audio

All sound is synthesized in the page (WebAudio) by `G`; there are no recordings. The context is made lazily on the
first input, with `latencyHint "balanced"` on the Quest and phones, a master compressor as a limiter, and a feedback
delay for reverb. It resumes when the headset comes back on. Effects (`G.note`, `G.jingle`, `G.heart`, `G.near(x, z, r,
name)`) fall off with distance (`hearR`).

### KING DINO's jazz

- `JAZZ` in the drum-kit block (`JGP.jazz`), "Stomp at the Juice Bar": a synthesized drum-kit piece at 104 BPM. Eight
  bars of brushes once, then a 24-bar chorus round and round: 8 bars of time on the ride, 8 trading fours with tom
  solos, 8 of shout ending on a 2-bar break.
- Notes are scheduled 3 s ahead on the audio clock (more than a bar, so a held frame never leaves a gap). Each listening
  stretch has its own bus; stopping cuts it, so queued notes are never heard late. After a stall it starts afresh. The
  kit and his sticks move on the hits as they sound (`DRUMS.r` / `DRUMS.l`); when nobody can hear it, it keeps time
  silently on the game clock.
- Heard anywhere on the dance floor and the strip where the kit stands, and through every Dance battle and victory
  dance. Never with FORTIZMO's horn: from when she raises it until her last notes die away, he rests. Otherwise he
  never stops, not even while talked to.
- "Heard" is judged from the player's head, `we.headPos`; in the test modes that is the avatar's head, never the
  orbiting camera.

### FORTIZMO's horn

"Backpacka's Rain Strut": 88 BPM, C minor, 24 bars timed to Backpacka's visit; a muted trumpet over sax and trombone
(`gcHorn`, `ee`).

### Sad lines

ANOMALEE's sad line plays with a falling minor phrase.

---

## 8. The park's set pieces

### The garden and the Event flowers

- Tilled rings every 2 m from 2.6 m (13 cm ridges), four stepping-stone paths, and a border of stones creatures step
  over (part of `JGP.groundAt`).
- **The five Event flowers** (locked; each built only from the owner's photos): `PLANT_KINDS` holds each kind's
  builder `(add) => …`: a creeping thistle, a scentless mayweed, a chicory, a common milkweed and a zebra mallow. One
  merged vertex-coloured mesh per kind, drawn at `PLANT_SIZE` 2.4; leaves stay 0.11 model units up so they clear a
  row's ridge.
  - The toolkit inside `PLANT_KINDS`: `part(name, make, lit)` builds a flat double-sided part once (`lit`: the back lit
    like the face, for thin petals); `blade` fans an outline into a curved blade; `ribLeaf` folds a leaf along its
    midrib; `stems(add, STEMS, o)` grows stems, branches, stalks and leaves (`o.leafPlus` adds ribs, veins and spines);
    `faceFrom` turns a flower head away from its stalk; `cup` is the cup of bracts under a head.
  - Each plant has a full and a light mesh (`plantMesh`); the full one shows within `PLANT_NEAR` (7 m) of the eye. The
    light one drops parts under about 1.5 cm (`LO_SKIP`) and rebuilds the `T` spheres, cylinders and cones with fewer
    segments (`loGeo`, from the `lp` each remembers).
  - Plants grow from scale 0.01. `JGP.plantShow(kind, x, z, ry)` puts a full-grown one anywhere, for renders.
- With the Snacks done, ANOMALEE's pizza box goes 0.8 m to her side if a flower of hers stands where it would.

### The Summoning Stone

A six-sided standing stone on a round plinth with rune strokes (shapes, not letters) in one merged unlit mesh. The
runes stay dark until the player uses the stone holding the Summoning Stone (`garden.stoneAwake` is set when its panel
opens); then they light up over 1.5 s, breathe from then on, and blaze during the Event.

### The Library

Open ground with no walls, roof or raised floor (`LIB_LAYOUT`):
- eight freestanding double-sided bookcases (2.2 m long, 2.1 m tall): two rows behind SPARKAKUS and one down each side,
  with open aisles; its colliders are the bookcases and posts, and it is kept explicitly when the engine's scenery is
  cleared (it is wider than the 12 m that rule spares);
- the LIBRARY banner on two posts behind the back row, high enough to show over it;
- one thing face-out in a gap on each of nine shelves (`LIB_LAYOUT.features`): six cloth hardbacks with their own covers
  (WORKS OF PATCHOOLEE, ADVENTURES OF APPTERIX, SONGS OF ORSON, STAPLERS by Walter Bigsby, OVERCOMING SHYNESS, RANGER
  BOBERT; 30 × 40 cm, OVERCOMING SHYNESS 34 × 44, each title fitted to its cover so it reads in VR), a Wish Blossom in a
  little pot (its crystal turning, its halo bobbing), an Electric Blossom (its head turning) and an Acorn;
- a rug (`LIB_LAYOUT.rug`, 11 × 7.8 m) after the owner's paisley fabric: a deep crimson field printed with paisleys,
  small red flowers and gold fern sprigs, a striped border, a medallion of two paisleys, cream lace round the field and
  a fringe at each end. One seamless 128-pixel tile at 0.75 scale, the material toned down (`0xa29a98`) so the sky
  doesn't wash it out; a 4 cm slab with its top 3 cm up, part of `JGP.groundAt`.

### The church

At the end of the south walk, its back to the fence.
- **Outside**, after the owner's two photos of a Gothic Revival stone church: grey stone walls (the stone bin tinted
  `#8a8880`) on a darker base, with pale limestone dressings (`#cdc5b4`) for the tower's quoins, the string course, the
  window frames and hoods, the buttresses and the pinnacles. Two stepped buttresses along each side and one at every
  corner; pinnacles (a square shaft, a pyramid spire and a gilded ball) over the front corners. A dark slate roof
  (`#3a3c44`) under a pale diamond lattice cut to each slope's edges, with iron cresting along the ridge. The tower
  runs straight up to a dressed cornice and a battlemented top with four corner pinnacles and a gold cross; a clock on
  either side face and a louvred belfry opening on each face. The red door stands behind a deep pointed arch of three
  receding orders, up four stone steps.
- **The roof:** a `GABLE` prism's slopes rise from its outer edge, so with eaves the base sits lower than the wall tops
  by `height · overhang / half-width` (0.5 m here) for the slopes to meet the walls.
- **Stained glass** (final; no words, no faces): every window is painted on a canvas by code on a 384 × 1024 lancet
  layout, scaled up for sharpness. `stainedKit(cx)` holds the tools: `glass(points, fill, lead)` fills a polygon with a
  gradient, streaks and bubbles and leads its edge; `oval()`; `panes()` cuts a region into jittered leaded panes; `mix`
  and `shade` blend colours; `reseed(n)` makes each window repeatable; `border()` leads the arch with 64 jewel-coloured
  pieces.
  - **The Traveler window** over the door: `paintTravelerWindow`, at twice the needed resolution.
  - **The Garden windows**, one on each side wall: `paintGardenWindow(cx, swap)`, after the cathedral of Greeblis City:
    sky, a rayed sun, clouds, a meadow with flowers and two butterflies, a robed figure, and MAMA GORBO. The left wall's
    copy has `swap` set, which mirrors the two figures' places and moves one cloud.
  - Each sits in an extruded stone frame with a sill, 2.6 × 5.2 m, its glass 4 cm off the wall. All window glass glows
    at night.
- **The secret room** (locked; built only from the owner's photo of a slug at night): the player gets in through the
  wall under the right-hand Garden window, marked only by a small red X; the building's parts leave a 2.6 m gap there,
  and every mode moves the same body through it. Floor, walls and ceiling are one gritty olive-grey ground texture (lit
  best at the floor), with pebbles, big flat dark stones half sunk in shadowed pits, rust-orange and blue-grey stones,
  slate chips, shell flakes and curls, cracks with lighter rims, low humps, dry grass, a band of shadow along the back
  wall and damp stains, and a faint glossy trail of damp from the Ancient's tail. The room's panels run a few
  centimetres into each other at every corner, each overlap offset, so no seam shows and nothing z-fights.
- **Nothing spawns inside:** every pickup spot comes from `go()`, which turns down anything within 0.8 m of a building's
  hull. **No creature goes inside:** they path round the hull, and `JGP.churchGuard` puts any that ends up inside
  straight back out. No lawn tufts grow inside any building.

### The kiosks

- `kioskFrame(o, {sign, ink, wall, wall2, tin})` builds the shared shell (deck, back wall, half side walls, posts, tin
  roof, counter at 1.12 m). Each kiosk adds its goods through `goods()`, which merges every small item into one
  vertex-coloured mesh. `KIOSK_AT` holds each kiosk's position and its `front`, `spot`, `desk`, `exit` and
  `at(name, lx, lz)` points.
- **The Sheriff's** back wall is plain (no battens, so they never cross the posters) and carries Wanted posters on
  parchment, none overlapping: two little green aliens and their UFO; GLOOPERNAUGHT, a big green goo creature, named
  under its picture; a rabbit dressed as Napoleon front and centre under the star; the player's avatar; a stranger;
  and OLAG, named under WANTED. MUSHROOM's desk is raised (`SHERIFF_DESK`).
- **Garden Supplies'** wheelbarrow of flowers stands on its wheel: two fork rails from under the tray's front edge to
  the axle, the wheel's top level with the tray's bottom, two legs at the back.
- **The Post Office mail mountain** stands behind the kiosk under its roof line, hidden from the square (a visual joke):
  a heightfield of 19 overlapping cones makes a faceted paper heap under about 2,300 envelopes, tied bundles, parcels,
  leaning stacks and an avalanche round the foot. Five readable kraft parcels, each with a label the owner chose, sit
  half sunk round the heap, never stacked or set out for the player; each label is 6 mm proud of its box and always
  faces straight out of the heap (`buildPostOffice` takes another in one line, placed clear of the others).

### The Juice Bar and the dance floor

- **The dance floor:** 1.2 m tiles in front of the Juice Bar's counter, one 10 × 32 m rectangle from the bar's north
  end south for twice the bar's length. All tiles one dark purple in darker grout with a satin sheen; one canvas at
  32 px per tile with mipmaps, so the grout doesn't shimmer. The plane sits at y 0.035; anything standing on it starts 1
  cm or more above that. `onDance(x, z, m)` tells tufts and pickups where it is.
- **The drum kit:** on the grass behind the floor's south half, its rug and cymbals stopping just short of the floor;
  KING DINO stands behind it facing across the floor. Each drum is one merged mesh. The two-layer rug's inner layer
  stands 6 mm into the outer with its top 1.2 cm above it.

### The pond, the square and the sky

- **The duck pond** (`buildPond`, at the `pool` station): bank, mud and water circles 4 cm apart, rocks, lily pads,
  cattails and the dock; the water only breathes in colour. It carries no effects (the owner asked); Backpacka's
  ripples while he drinks are his own.
- **The square:** walks with a purpose (each leads somewhere and ends there: the ring round the garden, the Library, a
  cross walk along the Post Office and Sheriff's fronts, Garden Supplies, the south walk to the church steps). No
  benches, trash cans or flowerbeds. The Town Hall's spire ends in a gilded ball.
- **The UFO** crosses the sky every 10 minutes, never during the Event (`JGP.ufoNow` sends one now).
- **The sky dome** fits inside the far plane (`0.85 · t.far`; far is 310 m, 260 m on mobile), or its middle is cut away
  and a pale disc turns with the view.

### Solid ground and clear ground

- `F.add(x, z, r)` makes round colliders. `F.addBuilding(x, z, ry, hull, parts, name)` makes an oriented building:
  creatures path round the hull; the player and workers meet its parts (walls, counters).
- `E.add(x, z, r, tag)` zones keep pickups and roamers out. `keepAt`, `WALKS` and `onDance` keep lawn tufts off
  structures, walks and the dance floor.
- When scenery is removed its colliders go too; left behind they are invisible obstacles. Re-check scenery and every
  fixed spot (`F.inHull`, `F.free`, `E`) against a building's new footprint after any move.

---

## 9. The town

### How it is built

The town is built in local frames: `place(x, z, ry)` returns a builder with `box`, `geo`, `sign`, `win` and `sub`. Every
piece goes into a material bin (plain, siding, brick, shingle, stone, concrete, glass, lit, boards, mark, …), and each
bin is merged at the end, split by area (four quarters of the park, eight slices of the town) so out-of-view pieces are
skipped. Unit geometries are cached and scaled, tiling textures are painted in greys and tinted per vertex, and all signs
share one atlas. The town is about 101.6k triangles in 24 meshes; `test/t_townview.js` prints the counts.

### Rules it keeps

- **Show, don't tell:** lore through sculpture and colour, never words. The only words outside the park are FIRST BANK
  OF GREEBLIS, Mistergummery's and its menu board, the stop signs, and the owner's billboard.
- **Only the town's creatures** give it its design; nothing of HENNRICK, NEXTESSA or the Ancient, and no flint knapping.
- **Doors:** every door is wood (the `boards` bin under its paint), and a storefront's door has a framed transom light
  over it up to the band above the windows.
- **No far scenery** beyond the ring of streets round the square, and no cars.
- New detail stays inside the existing bins and atlas (no new draw calls), and its triangles are paid for elsewhere.

### The catalogue

- **Main Street, east side** (north to south): Mistergummery's; GEMTOE's gem exchange (crimson brick, amethysts on the
  crest, one hung over the walk, iron bars on the windows, a picture band of her scales with spilling coins); the
  barber's by its pole and blue awning; the picture house (a marquee of bulbs carrying a painted bill of KING DINO, a
  blade sign of gold stars, a premiere searchlight on the roof); the diner (ridged cream siding under a red front, MAMA
  GORBO's goo shake on the roof); GLYPH's sign shop (porcelain blue, gold filigree on its band, his red trident on a
  gold shield over the door, hexagon plates along the frieze, his A-board on the walk); SPARKAKUS's genealogical society
  (a family tree in a gold oval over the door, daffodil beds, his gold star on the crest).
- **Main Street, west side:** the bank with a flint nugget carved over its doors; the grocer's (crates of fruit in the
  Juice Bar's colours with Blossom stencils, a giant carrot on the crest); the ice cream parlour (three scoops of goo
  flavour on a cone, GOOWARD's winged goo cone on its band); ETCHER's archive (blue-teal stone, his etched data in
  painted tiles, his green gem on the crest, his purple tails draped down the piers, a half-etched slab with mallet and
  chisel); the curiosity shop (a stone Great Sphinx out front, one eye socket empty: the missing Eye is the Ancient Gem);
  the florist's (a giant Blossom over its false front, ZOLLOD's five pots from seed to flower on its band); ANOMALEE's
  television repair (moulded plastic grey, a rabbit-ear aerial, old sets by the door with her glow in their screens, her
  workbench and pizza on its band).
- **North:** the Town Hall with the town's seal (a wreath round the garden's five flowers) and the clock, the seal's
  five flowers in beds at its steps; the fire station with its right bay open and the engine's nose in it; the hotel
  (balconies, a canopy, a brass luggage cart, a tank on the roof); MONTGUMMERY's video store (his teal, his face on a TV
  on the roof beside a giant blank cassette, his pots by the door, a tape-return bin and two chewed cassettes, a band of
  cassettes with the last one bitten); the filling station of the far future (charging posts with glowing ports, the
  canopy in his teal, a lightning bolt on the pylon); the Consortium's field office (the sheriff's star on its side), its
  listening dish, the sighting painted on its trailer, its standard on the mast, and its find behind them: a scorched
  ring taped off between orange posts under two floodlights.
- **Mistergummery's:** MONTGUMMERY's teal (`#55b8c6`) wherever a burger chain would have its yellow (the building,
  trim, lot and menu); the pylon is just the big teal M on a beam, about as tall as the Main Street rooftops, beside the
  restaurant's front corner, meant to show over the rooftops from the square.
- **The south street, the homes:** SPARKAKUS (royal blue, his vines painted between the floors, daffodils, his star
  over the ridge, his rocking chair and open book on the porch, paw prints in the sidewalk), KING DINO (lemon yellow and
  turquoise, his crown on the ridge, a drum and ride cymbal on the porch), FORTIZMO (green, a lily pond, her horn on the
  porch, a carrot patch), SOMLET (cream and plum, cotton puffs for shrubs, a hammock, a mail sack; her mail cart at the
  kerb opposite the Post Office), the Gorbos (peach, goo dripping off the porch roof, puddles on the lawn), MUSHROOM
  (cream, his spotted cap for a roof, toadstools, a porch telescope trained on the sky), ANOMALEE (plastic grey, her
  glow in the upstairs window, an aerial), MONTGUMMERY (teal, stacks of his pots for porch posts, his tapes by the door).
- **Out past them:** the water tower in MAMA GORBO's peach with her goo and lime tail; her goo burger on a pole behind
  Mistergummery's; ZOLLOD's greenhouse with one of his flowers grown giant through its roof (and his hanging baskets on
  the lamps); GEMTOE's amethysts in a fenced lot; GOOWARD's drips across the north-east crosswalk.
- **The billboard,** on the empty corner lot across the road from the park's north-west corner, turned to face the
  square: KING DINO painted as a real dinosaur (a theropod in his own lemon yellow, his turquoise as markings, his crown
  and plume) at his drums under a spotlight, with the words the owner gave it, "A Prehistoric Era in Jazz!", and a cloth
  banner hung under the board on two ropes: "Let King Dino take you to the Jurassic Greeblis Park!" The banner is wider
  than the board (11 m to its 10) and three lines tall, its words as big as the cloth allows (`bb_ban`, 640 × 192 in the
  sign atlas), so it reads from the spawn.

---

## 10. Platforms and modes

### The gate

`window.__jgpBlocked`, computed from the user agent at the top of the game script, holds a notice for any browser or
device the game is not for (a phone that is not Android, a Mac, a browser that is not Chrome, a headset browser that is
not the Quest's). The boot then calls `blockedGate()`, which puts the notice on the start screen and builds nothing. The
Quest's browser always passes, and so does headless Chromium.

### VR (the real game)

- The start screen says "Press A to enter VR". The left stick moves; the right stick snap-turns; the trigger selects
  through a pointer ray from the right hand (it reaches 16 m); the quest HUD sits on the left grip. WebXR input sources
  are re-read every frame, as controllers come and go mid-session.
- VR renders at the headset's full resolution unless the frame rate needs a step down, with the near plane at 0.15 m
  for the hands.
- **The head guard:** a head can lean into what the body can't walk into. `JGP.headGuard` darkens the view from 20 cm
  off any solid structure (building parts at their real heights) to fully black at 8 cm, and clears as the head comes
  out. The Summoning Stone and the Portal's pillars never darken it (the player walks through them). Its `TOPS` table
  lists each building's parts in order. The Ancient is talked to only from inside its room (the pointer would reach it
  through the walls).

### The desktop and mobile test modes

Third-person modes for testing, with an avatar walked through the park (`dk`). `?desktop=1` and `?mobile=1` force them;
`__jgpMobile` (the mobile mode) turns on by itself on Android.
- **Desktop:** WASD or the arrows to walk, drag (or Q and E) to look, the wheel to zoom, a click to pick. The quest HUD
  sits top left; the frame rate and the error count sit bottom left (`#jgpDeskErr`) with a `copy errors` button that
  copies the error report. Nothing sits top right.
- **Mobile:** a joystick bottom left and TALK / GIVE bottom right; the fps and resolution chip (`#jgpDiag`, tap it for
  the diagnostics panel) top left, the quest HUD top right. No zoom buttons.
- **Taps:** a tap or click moves a dialogue on, page by page, and closes it after the last; a tap off the action menu or
  a panel closes it. VR is unchanged (the trigger moves dialogue on).
- **The action menu's place** (`placeMenu`): right over the creature's head, at the creature's own distance from the
  camera, facing it and placed again every frame while open, since the camera swings and eases behind the avatar. A
  station's `top` is a set height; SPARKAKUS gives the real top of his head. In VR the menu is placed once from the head.
- **The camera** starts near level (`dk.pitch` 0.2), so KING DINO's billboard is in the first frame. The near plane is
  0.2 m.
- **The error tools** count every error in one place, `vo()` (the frame loop, a click, a key, a button), so the counter
  and the copied report agree.

### The dialogue box

One canvas, drawn the same in every mode. It shows the speaker's name tag only when there is a speaker: a notice with no
name (a pickup's, such as "Overcoming Shyness book obtained") has no tag at all.

---

## 11. No clipping, no flicker

Rule of thumb: place from the skin (`hit()`), keep orbits wider than the body, and never let two faces share a plane.

### Clipping

- **Flat parts on curved skin:** sink them by the sagitta, r² / (2R), so their edges meet the curve.
- **Orbiting things:** orbit radius > body radius + item size + jiggle (MAMA GORBO's tags orbit at 1.78 m).
- **Overlapping decorations:** skip plates under a shield; move a shield clear of the arm's whole swing, not just its
  rest pose.
- **The ground:** parts below a bobbing or swaying body never go into the floor. Check real mesh vertices
  (`test/t_ground.js`), and lift the body by what a tilt dips its footprint. Tentacles that would dip splay outward
  just enough each frame, searching on from last frame's answer.
- **After any fix, re-check its neighbours,** and render mirrored pairs from both sides.

### Flicker and z-fighting

- **Any two faces in one plane flicker:** offset them by 1 cm or more, including faces seen only from inside a
  building (double-sided bins show both sides of a wall).
- **Design for a coarse depth buffer.** A 24-bit depth buffer with the near plane at 0.15 m tells 4 mm apart at 100 m;
  a 16-bit one, which a phone's canvas or a headset's layer may give the page, tells only 1 mm at 3 m, 1.5 cm at 10 m
  and 9 cm at 30 m. So:
  - the ground sits 4 depth steps back (`polygonOffsetUnits` 4, no slope factor), the park's lawn 2 back, the roads'
    markings (the `mark` bin) and the window panes (`glassM`) 2 forward: whatever lies on the ground or stands on a wall
    always wins. Steps only: a slope factor at a grazing angle would push the ground back by metres;
  - gaps are 2 cm where one surface lies on another over a wide area (the cross walk, the gazebo's deck), and the secret
    room's flat details sit 1 cm over its floor;
  - every canvas texture gets mipmaps on WebGL2 (`b()`), so signs, posters and walls average down in the distance
    instead of shimmering;
  - the error report and the mobile panel show the depth buffer's bits (`window.__jgpDepthBits`, `__jgpDepthXr`): the
    number to read off a device that flickers.
- **Merged scenery fixes itself at load:** `unfightParts()` runs on the town's bins and every `goods()` merge (kiosks,
  Library, Juice Bar, drum kit), never on a creature. Wherever two parts' faces share a plane (within 4 mm, overlapping
  over 1 cm each way), the smaller part moves: 8 mm proud when both faces look the same way (a sign on a wall), or into
  the bigger part when they press back to back, by 1 cm or half the thinner part's depth if that is less, and not at all
  when both are only a few millimetres thick. Up to three passes; about 5,900 parts in about 0.5 s
  (`JGP.unfightParts.moved` / `.ms`). Merged faces lying flat on the ground facing down are dropped.
- **Locked creatures:** where a final model's own parts share a surface, give the overlay a cloned material with
  `polygonOffset` (factor −1, units −4). The depth changes, the shape does not.
- **Transparent overlays** each get their own render order (goo splats on the view: the newest on top), or they swap
  as the view moves.
- **Single-sided planes** disappear from behind. Use thin boxes or double-sided materials.
- **Finding it:** `test/t_zfight.js` lists coplanar overlaps the player's eyes can see; `test/t_zcheck.js` shows which
  really flicker; `test/t_shimmer.js` simulates a headset's shimmer. Moving the camera instead, even by millimetres,
  reports fine textures as flicker.

---

## 12. Performance

The Quest decides ([rules](rules.md#the-game)): draw calls are the scarcest resource (VR submits each draw twice, and
the cost is CPU per draw), then triangles and per-frame JavaScript. Measure with `test/t_perf.js`.

- **Merge per material:** kiosk goods, plants, the town's bins, born creatures (`KIT.compact`).
- **Freeze static groups:** `H(group)` turns off matrix auto-updates. The bundled three.js's `Object3D.updateMatrix`
  composes the local matrix only when position, rotation or scale changed since the last compose, and `add` marks a
  re-parented object's world matrix, so still objects cost nothing. Code that writes `matrix` by hand sets
  `matrixAutoUpdate = false`; an object animated after being frozen needs it back on.
- **The creature batcher** (`gcEB`, updated by `Qe`) leaves a part whose matrix, colour and on-state are unchanged as
  it is, recomputes a batch's bounds only when something in it changed, and uploads only its batch's parts' uniforms.
- **Pickups are instanced** (`qe`): each mesh of the Blossoms and the flint becomes one `InstancedMesh` (a taken one is
  scaled to nothing). The flint's glints share one material, each stone's pulse riding in the spare slot of its
  instance matrix (`userData.gcOp`, element 3), read by `gcOpPatch` in the vertex shader, which also puts `w` back to 1.
- **Hidden faces are left out of the kiosk merges** (`dropInside`): a face whose three corners lie a millimetre or more
  inside another opaque part's solid (a box, sphere, cylinder, cone or icosahedron carrying `lp`) can never be seen and
  is dropped. Lossless to the pixel; about 8,900 faces in about 80 ms at load. Not for the mail heap (too slow for what
  it saves), creatures, or the town's bins.
- **Mobile counts:** `window.__jgpMobile` places fewer envelopes, tufts and fence pickets.
- **One canvas texture over many meshes** for flat patterns (the dance floor, the rug).
- **Keep per-frame work tiny:** search on from last frame's answer, repaint textures a few times a second at most, never
  allocate in loops, and work only when something changed (a creature's ground height only when it has moved; squared
  distances before any square root; a failed search retried a second later; idle samples staggered across frames).
- **Never mutate a cached or shared material;** clone it.
- **Compile early:** anything that first shows mid-game (the bulb, Backpacka, his water) is built and compiled ahead,
  as a compile stall in a headset is long and crackles the music.
- **During the Event** a safeguard hides far scenery (outside `finaleKeepR`, 26 m); mark anything that must stay
  visible `keepInFinale`. Hide what has finished (Backpacka's droplet cloud is its own object, hidden with him).

---

## 13. Code habits

- Timers (`setTimeout`) that touch a creature are stored on it and cleared when something else takes it.
- Anything that pulls a creature away (a vignette, the Event, a battle) checks the others first: `busy`, `vig`,
  `me.active`.
- Re-read WebXR input sources every frame.
- A test of one move resets the creature's `bt.tg` state first, or it picks up the last one.
- After moving a building, re-check scenery and render spots against its new footprint, and render portraits on open
  lawn (`SPAWN=-18,24`).
- Lint after every edit (`npm run lint`), and run the quick check between builds ([testing.md](testing.md)).
