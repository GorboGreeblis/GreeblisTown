# Greeblis Town USA: how the creatures and the town are built

How the creatures and the town of Greeblis Town USA are built and behave. The game is this repo's single readable
`index.html`, which is its source. The rules are in [greeblis-rules.md](greeblis-rules.md), per-creature detail in
[creature-profiles.md](creature-profiles.md), every PR in [history.md](history.md), the tools in the
[tools README](../README.md), and what the earlier games taught in [learnings.md](learnings.md).

## At a glance

```
ROWS entry  ->  builder so[name](group, def)  ->  born(): blink + find moving parts + merge the rest
                                                    |
Every frame:  step(t, dt, talk, walk)  ->  posts, patrols and roamers  ->  vignettes  ->  Garden Event roles
```

Builders come from three places:

1. **Pulled:** models extracted from earlier games into `JGP_CITY` and `JGP_WOODS` (between the
   `PULLED-MODELS-BEGIN` and `-END` markers), registered as `city_*` and `woods_*`.
2. **Born:** new designs and merges, readable functions in `BORN`, registered as `born_*`.
3. **Wrappers** round pulled models: `anomaleePeg` (Anomalee's peg leg) and `fortizmoPick` (Fortizmo's bounds).

Backpacka is built by the Garden Event itself (`BP`), and Sparkakus by the Library's worker (`st`).

## How creatures are built

### Pulled models

Models from earlier games are extracted with only the helpers they reach and wrapped in a module. Engine services
are captured as `$x` aliases, because the original minified code shadows one-letter names.

```js
const JGP_WOODS = (() => { const $R = R, $S = S, $T = T, $ao = ao, $b = b, ...;
  return { mont: function (e, t) { /* original builder */ } }; })();
const PULLED = { city: JGP_CITY, woods: JGP_WOODS };   // registered as so.city_nextessa, so.woods_mont, ...
```

A builder that throws never stops the game booting: the registry reports the error and leaves that creature empty.

### Born creatures

Each `BORN` builder starts with a plain-language comment describing the creature (silhouette, palette, signature
features, behaviour) and saying the model is final. That comment is the design brief and is kept up to date.

### From artwork

1. List every visible feature in the artwork first. For Mama Gorbo: the balloon body, two octagon port eyes with
   magenta rims and purple lenses, the lime goo tail hooking underneath, the smoke wisps, the AP / IP / wifi tags
   and the sparks.
2. Build them all, render from four sides, compare with the artwork and iterate.
3. Ask before guessing what an ambiguous shape is.

### blobBody: one smooth sculpted skin

The main tool for organic bodies. It blends ellipsoids into one signed-distance field and meshes it by casting
rays out from a centre point.

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
- **Small ellipsoids half out of the surface** make runs, lumps and folds; colour them in `col` by distance to
  each part to make them paler or glossier.

### Lathes, tubes, decals, surfaces

- **`latheGeo(smoothProfile(points))`:** anything round in section (stems, caps, cones, berries).
- **`ridgedTube(points, r0, r1, n, ridges)`:** tails, horns, tentacles, hoses and wisps, tapered, optionally ringed;
  with `cap` the far end rounds off closed.
- **`onEllipsoid()` and `faceTo(group, normal)`:** lay flat details (spots, badges, decals) on a curved surface.
- **`cardGeo(cards, kind)`:** feathers, fur and quills as merged cards (`vane` or `fur`), with `gradMat`.
- **`KIT.surf(kind, colour, {rep, bump, shine})`:** a painted, tactile texture in greys, tinted by the material,
  so every creature using a kind shares one texture. The kinds: scale, fur, feather, fabric, felt, metal, goo,
  skin, soft, plastic, rubber, wood, leaf, stone, thatch, sand, soil and grass.
- **`gradMat()` with vertex colours:** gradients baked into a body. **`texturize(group, kind)`:** one finish for
  a whole model's plain parts. **Glows:** unlit `MeshBasicMaterial` (rune strokes, lens glints, the light bulb).

### Faces, limbs and parts

- **Eyes:** `KIT.eye(parent, pos, r, {iris, white, lid, open})` builds a full eye with a lid; pass the lids to
  `born()` and they blink. Eyes that aren't eyeballs can still blink (Mama Gorbo's port lenses squash to 6%).
- **Limbs:** `KIT.arm` and `KIT.leg` build jointed limbs (shoulder and elbow; hip, knee and foot with claw, pad,
  paw, boot or hoof). `KIT.stride` walks them with the foot kept level.
- **Hats** sit on the head group so they move with it. Build brims and visors as thin solids, never a
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

- Every creature breathes or sways at idle, bobs when talked to (its own `tk` animation plus the shared talk
  wrapper's nods) and strides when it walks.
- **Merging:** `KIT.animated` samples `step` to learn which nodes move, and `KIT.compact` merges everything else
  per material. Mark a mesh `userData.keep = true` to keep it separate (transparent parts, sprites, materials
  that animate). Nothing the sampled frames do is seen or heard (no emotes, sounds or goo).
- **Standing on the ground:** each creature stands on what is under it (`JGP.groundAt`: lawn, walks, dance floor,
  garden soil, rows and stones, decks, bar boards, rugs), lifted by however far its model reaches below its feet
  at rest, through a wrapper round the whole model. Not for one posted up off the ground (Mushroom on his desk).

### Planting and dancing

Whole-body moves layered on top of each creature's own `step`, so they work for pulled models too.

- **Tables:** `MOVES` gives each creature its planting move and `DANCES` its dance, keyed by id (the values are in
  [creature-profiles.md](creature-profiles.md)):

  ```js
  const MOVES  = { m_somlet: ["pat", 1.5, 1.1], p_glyph: ["dig", 2.3, 1], ... };            // [move, speed, size, extra?]
  const DANCES = { m_kingdino: ["groove", 5.45, 1.1], p_mamagorbo: ["jelly", 5.45, 1], ... }; // [dance, beat rad/s, size]
  ```

  - Planting moves: dig (lean in and scoop), pat (rock and press down) and scatter (turn and toss).
  - Dances: bounce, sway, twirl, twist, shimmy, stomp, groove, jelly (a squash and stretch for goo bodies) and funk
    (Sparkakus: a bob per beat, hips over two, a lean, and a full spin with a hop on the last two beats of every eight,
    while his own model pumps his paws, steps, flops his ears and whips his tail on the same beat and weight).
  - 5.45 rad/s is one bob per beat of King Dino's 104 BPM; 2.7 is half time, for slower, bigger moves.
  - `plantMove(key, t)` and `danceMove(key, t)` return an offset `{x, y, z, rx, ry, rz, sx, sy, sz}`.
  - Hennrick and the three Dancers (Etcher, Glyph, Montgummery) dance their own built-in dances instead.
  - Anyone missing from a table digs and bounces.
- **Wrapper:** the offset goes on a wrapper group round the creature (`wt(group)` makes it, `zt()` measures its
  footprint), so its own animation keeps running inside. It is made the first time the creature plants or dances.
  Feet stay above the ground.
- **Driver:** one per-frame loop keeps a state per creature (`bt.tg`: mode, blend `k`, walking `mv`). A creature
  only starts a move standing still, eases in and out over about a quarter second, and switches between planting
  and dancing only once the old move has eased out. One being talked to stops for it.

### Flowing goo (Mama Gorbo's streams)

Goo that runs down a body and moves like goo, without clipping:

- **Path:** sample points down the skin with `hit()` (12 steps of elevation from the same centre), offset each by
  the tube's radius + 1.5 cm along the skin normal, and keep the normals. End with two points out over the ground
  that spread into a puddle. Keep clear of other parts' paths (her peach runs and the lime tail).
- **Tube:** `ridgedTube(points, 0.06, 0.095, 70, 0, 0, 12)`, thicker as it goes down, vertex colours paler along
  the top.
- **Flow:** each frame, swell the rings in a wave that rolls down the tube
  (`R = r · (1 + 0.42 · max(0, sin(2π · 2.2u − 2.4t))²)`, tapered to nothing at both ends), and move each ring's
  centre out along the skin normal by `R − r`, so a ring only grows away from the skin. Rings are `(n + 1)` groups
  of `(rad + 1)` vertices round `curve.getPointAt(i / n)`: store each vertex's unit direction once and write
  `centre + dir · R`. Keep the normals; set `needsUpdate` and enlarge the bounding sphere.
- **A glob on top:** a bigger blob slides down each stream (slow, then faster), riding out along the normal by its
  extra width and staying above the ground; the puddle swells as it arrives.
- **Closed ends:** a tube is open at both ends. Cap each with a sphere wider than the tube all round, or the rim
  shows and you can see in. The top cap just touches the skin; the bottom one just clears the ground.

## How creatures behave

### Where they stand

- **`ROWS`** (start of the game layer) places everyone: each row has a facing and a list of
  `[id, NAME, builder, def, spot]`. A spot is `[x, z]`, a function, `"kiosk:<name>"` (behind a kiosk's counter) or
  `"kiosk-desk:<name>"` (on its desk). `via` is the way a worker walks out for the Garden Event:
  `"kiosk:<name>"`, `"kiosk-front:<name>"` or a function. Kiosk names: `post`, `sheriff`, `garden` and `shop` (the
  Library).
- A creature turns to face a player standing near it.
- Creature keep-clear zones are added in `applyCast`, once the spots are known (zones added earlier never got
  their positions). Pickups never land on a creature's spot, nor where the Dancers and Hennrick roam.
- Where each creature is: see [creature-profiles.md](creature-profiles.md).

### Posts, patrols and roamers

- **Workers** walk out of a kiosk or bar by a fixed route (behind the counter, along a side wall, out through the
  gap) and come back the same way. One posted up on a raised floor (Mushroom on the Sheriff's desk, 1.5 m up)
  steps down when it leaves, and stays up if left at its post.
- **Fortizmo** walks the aisle behind the Juice Bar by moving her `home`: every few seconds she picks a spot at
  least 3 m along and walks there, then faces the dance floor. Not while she is busy or the player is close. The
  walk home routes through the counter gap only when she is outside the bar.
- **Roamers** (`roam(id, pick, wait…)`, by Fortizmo's patrol): each walks its home to a new spot picked by
  `JGP.portalRoam` (Hennrick: 3.2 to 6 m from the Portal, never in its doorway or the lane Nextessa comes
  through), `JGP.parkRoam` (Gemtoe, Mama Gorbo, Gooward: 5 to 16 m off, never on the dance floor) or
  `JGP.floorRoam` (the Dancers: 3 to 12 m off, on the dance floor). A spot is taken only if `JGP.roamFree` passes
  for it (inside the square, out of the garden, buildings, the pond and every scenery zone: lamps, trees and the
  gazebo are `E` zones, not colliders) and `JGP.roamWalk` passes for a straight walk there.
- A roamer with no headway for 2.5 s, or not there in good time, settles where it is and picks again; one boxed in
  heads back to its starting spot. None moves while busy (talking, a vignette, the Event) or with the player close.
- **Mama Gorbo and Gooward** meet every 20 to 40 s (`JGP.meetAt(t)` forces it for tests): they walk to a spot
  between them, turn face to face and throw colourful goo balls to each other, a heart over the one who catches
  each, then go back to wandering.
- **Visits** (owner's rules): about once a minute (45 to 65 s apart, two at most on their way out or meeting at
  once) one creature leaves its place to call on another, so that every pair's two vignettes play in about three
  hours (about 200 meetings). The pair is the one that has met least (its animation and lines counted together, in random order, so no
  pair meets a second time before every pair has met once),
  and the meeting plays whichever of its two vignettes, the animation or the lines, has played less: never both.
  Everyone visits everyone, kiosk workers included; King Dino (at his drums), Somlet (asleep at the Post Office)
  and the church's Ancient never leave, the others come to them (two of those three never meet, as intended).
  Nextessa and Backpacka neither visit nor are visited.
  - The way: a worker out by its `via` (Mushroom jumps down off the front of his desk first: an 0.8 s arc to the
    first step of his way out), then `JGP.route` (a 1.2 m grid of open ground, as `roamFree`, pulled taut into
    clear straight walks round the garden, the pond, buildings and scenery; a start off open ground, as at a door,
    first steps to its nearest open cell, and the last cell gives way to the goal only when the line there is
    clear; full-precision costs and bounded loops, so a plan never hangs a frame).
  - The meeting: the visitor stops beside the host, facing it (a host wandering somewhere stops where it is; one
    that has moved on is walked up to again, twice at most), and they play only side by side (`VIGS.beside`).
    A host who works in a kiosk or behind the bar (Zollod, Mushroom, Fortizmo) comes out by its way out to meet it
    and goes back in after (Mushroom jumping back up onto his desk: the last 1.3 m of his walk home is an arc clear
    of its front edge). Sparkakus stops where he is in his open Library and the visitor comes in across its open
    front to his side, clear of the bookcases (it meets the bookcases rather than the Library's whole ground,
    `inside` "shop"). The Ancient is called on only in one round in eight, in and out through the wall where the X
    is, as the player goes (`inside` "church"; the church guard lets it be), and that exchange is seen only by a
    player in the church too. On the way in, at the open ground outside the X, every visitor stops for a
    moment, puzzled — its own "?", in its own colour, over its head (Sparkakus too, between his two legs of the
    walk) — and then goes on in: the way through the wall, played out as a hint.
  - Home again slowly (`walkK` 0.55; a worker back in by its `via`; one whose place is up on a desk walks the
    corners of the way flat on the ground — pattern height 0 — and gets its height back only on the last leg,
    so the walk's own jump-up arc carries it onto the desk and nowhere else). The Event, a
    battle or a meeting calls a visit off (homes put back at once; one called off inside the church slips out by
    the X first, never through a wall). ANYONE CAN ALWAYS BE TALKED TO, mid-visit or on the way home (the owner's
    rule): the talked-to one stops where it stands, the visit's clocks (give-up time, jump arcs, the wall pause)
    wait with it, and the walk picks up when the box closes. SPARKAKUS answers out in the world too — his `stump`
    station follows him and only the Event hides it (then `xo` speaks for him instead), and his worker walk waits
    while `st.talking && qt.isOpen`. He is talked to through his station, never as himself, so the visit's hold
    reads his own state (his dialogue open, or his Blossom lap) when he is one of the pair. An exchange
    with the ANCIENT kept quiet (the player outside) still counts as the pair's turn, or the order would only
    send everyone back to it. A visitor never stops farther than a vignette reaches (`spotBy`'s rings stay inside
    `VIGS.beside`), and SPARKAKUS already out in the world never goes back via his Library's front first (whether
    he is at home is read before `st.join` attaches him to the world). Sent somewhere out there with no way planned
    — the Event calling him from a visit, a visit called off, the Event's end — he plans his own (`wayOut`): out of
    the church by the X if he is in it, then `JGP.route` round everything; called off by an Event without Seeds,
    he walks home rather than standing at the visit's spot. A host is released only by the visit that took it
    (`h.hostQ`), so a visit still walking home can't free a host already met by a newer one. He is never sent
    visiting during his Artifacts finale (`Bulb.hold`). While in one,
    `visiting` / `hosting` keep the roams, Fortizmo's patrol, the meetings, other vignettes and Somlet's lying down
    out of it. `JGP.visitAt(t, v, h)` begins the named visit at once (past the pacing and the two-at-once cap; `forced` keeps it
    first in `JGP.visits().now` while it lives); called with no pair, t is the next natural visit's time, so a time
    far in the future silences them for a test run. It reports through `JGP.visits()` and `JGP.visitPlan(v, h)` report;
    `test/t_visits.js` checks the plans and plays visits through, watching that nobody passes through anything,
    and `test/t_visitlive.js` watches them happen on their own. Zollod has no `id`, only `def.__type` "cutebex":
    the visits find him by that.
- **Sparkakus** browses his Library when nobody needs him, keeping 0.8 m clear of every bookcase and the banner's
  posts. Given a Blossom (his stump station's own "Give a blossom", `st.romp`), he drops to all fours, runs a lap
  of an ellipse over the Library floor (clear of every bookcase), comes back to his place, gets up and apologises.

### Talking, menus, gifts

- Talk opens dialogue pages split with `|`. Whatever opened the dialogue must set `xe.lastTarget`, or the next
  speech goes to the wrong creature. `te(ent, gift)` sets `ent.gifting` for a Blossom line.
- Menus: Talk, plus "Give a blossom" while the player has one. Zollod's menu is a single "Shop at Garden Supplies".
  Match creatures by `Xt(ent)` (the builder key): some entities have no `id`.
- **Gifts:** Gooward and Mama Gorbo (a `goo` palette in their def and listed in `te()`) shoot goo at the player's
  head (`Ie()`: eight `Nt.gooArc` shots that splat on the view). A Blossom to a Dancer starts a Dance battle once
  their thanks is said, unless the player has walked away or the Event has begun. A battle is only ever started
  that way, so each one costs a Blossom, and with none in hand there is no Blossom option (`te()` also refuses a
  gift then).
- **The light bulb** (from Greeblis City): `Bulb.start(getPos, height)` fades a bulb in over a speaker, lights them
  with a cone and dims the town toward night until the dialogue closes. It is built and compiled at load, so
  turning it on never stalls. `getPos` must give a WORLD position: `st.pos()` does, also at home in his Library's
  own frame (it used to give his local one there, and the bulb and the glued gem appeared over the garden).
  From the first finale page until the Gem speech is done (`Bulb.hold`) SPARKAKUS offers no Talk or Blossom, or a
  second Talk in the gluing gap would play the whole finale, assembly and reward again.
- Anomalee keeps gazing at the church window through her Talk lines; she turns to the player only for her Blossom
  line, or for any line during the Event. Any creature talked to during the Event stands still for it.

### Quests and Dance battles

- **Three quests** on the HUD: the Seeds (sold at Garden Supplies as a "bagel seasoning packet", 10 flint), the
  Summoning Stone and the Snacks (Nextessa's pizza, called from the phone booth).
- **The phone is locked** until Mushroom has been given a Blossom (`Kt.phone`, set in `te()`): before, it rings and
  no one answers, so Nextessa can't be called; after, it works for the rest of the session (also in testing).
  `test/t_phone.js` checks both.
- **Dance battles** (Greeblis City's panel and bar) with the three Dancers: rock, paper, scissors. The Dancer goes
  first and shows its move with its own animation; Rock out! beats the splits, the splits beat going horizontal,
  going horizontal beats Rock out!. Each round won teaches one of the Dancer's steps; learn them all to win. The
  panel shows only the Dancer's move; the bar shows how it is going. The winner does a victory dance.
- **The chain:** each Dancer's first win gives one Ancient Artifact (a third of one teal brilliant-cut diamond;
  later wins get a bow). Sparkakus's talk follows the count (none, one or two, all three). With all three he stays
  where he stands in his open Library and the bulb comes on; after his first lines `ARTS.assemble` puts the diamond back together in
  the air between him and the player: a school-glue bottle appears over the three pieces, turns upside down, glue
  drips onto them, and each piece moves to its `userData.gemOffset` with a flash (about 5 s). Then his speech, and
  the Gem flies to the player ("Ancient Gem collected!"). Gemtoe trades the Summoning Stone for it (with a happy
  spin), and the Stone starts the Garden Event.
- **The shyness sub-quest:** ZOLLOD starts too shy to keep shop: one Talk ("…|…|I'm shy…"), no Blossom option, no
  shop, and he neither visits nor is visited (`Kt.shyFree` false). The Garden Supplies counter's own Shop prompt
  (`gshop`) is hidden too until he is freed — it would open the shop straight past him (the owner hit exactly
  that with the book in hand). OVERCOMING SHYNESS stands alone at eye level in the middle of a side case on the
  left, half as big again as the other hardbacks (0.32 × 0.42 m, its title large), and is taken by pointing at it
  and selecting (a mouse click, a tap on a phone, the caster in VR — the same
  pointer pick as everything else; `Kt.shyBook`): it leaves the shelf, "Overcoming Shyness book obtained", and its
  station stops offering it. The first Talk with the book in hand frees him ("…|That book…|Let me see..|Wow I'm
  free from shyness!"): from then on talking to him opens the shop as before, and his pairs count half in the
  visit order, so he meets the others about twice as often. MAMA GORBO's fourth Talk line hints at the book;
  GEMTOE's fourth Talk line is his own. `test/t_shy.js` plays the whole quest through.
- Flavor lines (owner's request): every creature but the ANCIENT, NEXTESSA, BACKPACKA, ZOLLOD and SPARKAKUS has
  one more Talk line, last in its turn, a word about its own lore and design that only adds to the town. They
  come only outside the Event (Talk there gives the Event line). SPARKAKUS has none (owner's call: his Talk
  follows his quest). `test/t_flavor.js` talks each one through and checks the Event.

### Vignettes

- Every creature has two vignettes with every other, an animation and an exchange of lines: the fourteen in
  `NAMES` (two-letter codes) make 91 pairs in `PAIRS`, and the church's Ancient has one with each of them in
  `SLUG_PAIRS`. Nextessa and Backpacka never have vignettes (owner's rule). The animation is a short animated
  exchange: a choreography style, both creatures' signatures from `SIG` (item, colour, gesture, emote) and a
  seeded twist; the lines are the pair's two lines, the two turned to each other. Never both at once
  (`plays[AB]` and `plays[ABt]` count them). The
  lines follow the owner's script: Gooward only says Gomp, Somlet only snores, Glyph asks "don't you think?",
  Mont speaks of himself as Mont. `town/vignettes/pairs.py` checks every pair is there once.
- Who can take part (`lineUp`): the cast standing at their own spots, not busy, not in a visit, a meeting or a
  victory dance; Sparkakus in
  his Library through his stand-in `st.ent` (a marker kept at his world position whose wrapper wraps his model; he
  stops browsing for it). The Ancient's play only on a visit to it (`JGP.slug.ent`, its stand-in: it talks instead
  of moving), and are seen only by a player in the church too.
- They play only with the two side by side (owner's rule): two who already stand together (as the Dancers on the
  floor) play there, fair among the pairs standing together just then (none plays again before each of those has
  had its turn); every other pair meets by a visit (see the visits), so every pair's two come round in about
  three hours. Talking to either, or the Event,
  stops one. King Dino and the Ancient never turn or spin in one, and take no gestures at all (a bow or a hop
  would tip King Dino's sticks into his kit). Wrappers turn in `YXZ` order: the turn to the partner first, then a
  gesture's lean and roll in the turned frame, so a bow tips toward the partner.
- The thrown things are tidy: the gem's octahedron and the halo sprite's material (one per colour) are cached and
  reused across flights, and a lines vignette's bubble canvas AND material are both disposed at its end. Style 4
  (the gift-swap juggle) flies both messengers for real — each arcs over, circles above its receiver and arcs
  back on matching clocks — where the second used to pop in and out on 0.01 s legs.

### The Garden Event

- It starts only from the Summoning Stone, and only once the Summoning Stone quest is complete (owner's rule).
  "Use the Summoning Stone" opens the GARDEN EVENT menu (owner's layout): Summoning Stone, Seeds and Snacks with
  their boxes, "Start gardening event?", Yes / No. Without the Stone, Yes only says the runes stay dark (and they
  do); `oe.yes()` itself refuses. `test/t_stone.js` checks both.
- **In order** (the Backpacka block): everyone walks into the garden and plants for 20 s once they are all there
  (or 30 s in), while Fortizmo walks slowly to the garden's edge; she raises her horn and plays "Backpacka's Rain
  Strut" (88 BPM, C minor, 24 bars timed to his visit) and everyone steps out to the ring walk and dances;
  Backpacka flies in (timeline `D`: 16 s to the pond, 14 s drinking, 12 s to the garden, 15 s spraying, 14.5 s
  away); Fortizmo plays the tag and everyone goes home.
- **Roles:** `NO_PLANT` (Fortizmo) comes but doesn't plant; `AT_POST` (King Dino) keeps drumming; Nextessa is
  never there; Backpacka only appears for it. Sparkakus leaves the Library to plant and dance with everyone (only
  when Seeds are in): `beginPlanting` gives him a spot of his own inside the garden like theirs, and he grows a
  flower there like every planter (his dig is watched by its own small check, as he isn't one of the cast the
  Event steps). His Talk at the Event is his Event line, wherever he is (his station and his garden target are
  never silenced by the Event's no-talk check, which is for creatures with no Event line). A planter held off its
  spot by a neighbour or the stone (broad HENNRICK on the inner row) takes the spot where it stands after a
  second, within a metre, so it still plants and grows its flower. The church's ANCIENT never dances or
  plants (owner's rule): it stays as it always is and only talks when talked to.
- **Workers come out straight:** a kiosk or bar worker walks its way out from inside only; one already out when the
  Event starts (on a visit, or stepped out to meet a visitor) goes straight to the garden, never back into its
  kiosk to walk the way out again (ZOLLOD used to get stuck walking into Garden Supplies).
- **Pizza** (only once the Snacks quest is complete: `Kt.rewards.snacks`, Nextessa has delivered): stacks of pizza
  boxes stand outside the garden's stone ring beside the seed sacks for as long as the Event runs (fixed bodies in
  `uo.fixed`, so everyone keeps clear of them), and Anomalee doesn't plant: she gets an open box at her spot and
  eats it a slice every 5 s (`PIZZA`), and no flower comes up from her.
- **Seeds decide it** (`bt.seeds`, fixed for the whole Event). Without them nobody comes, there is no music, and
  Backpacka sprays a garden that doesn't grow. With them each planter puts in exactly one flower per Event, of a
  kind picked at random, right where it does its planting: in the soil 0.9 m in front of it, 1.5 s into its first
  dig at its spot (`plantTick`). It stays at that spot for the rest of the planting. The spots (`beginPlanting`)
  put that soil on a row and at least 0.75 m clear of the stepping-stone paths.
- **Rounds** (`garden.round`): only one batch of flowers ever grows, the first Event's (the owner's rule). Every
  Event uses the same spots (each planter's soil on the rows at 2.6, 6.6 and 10.6 m), and from the second on
  everyone plants there again but nothing more comes up. Plants stay for the session.
- **Growing:** a plant waits in the ground until Backpacka's water reaches it, then comes up over about 11 s; by
  halfway through the spray every plant is watered. Anything still growing when the Event ends finishes at once.
- Backpacka is built, and his shaders compiled, before the music starts: a compile stall mid-song crackles.

### King Dino's jazz

- `JAZZ` in the drum-kit block (`JGP.jazz`), "Stomp at the Juice Bar": a synthesized drum-kit piece at 104 BPM
  (the beat the built-in dances keep). Eight bars of brushes once, then a 24-bar chorus round and round: 8 bars of
  time on the ride, 8 trading fours with tom solos, 8 of shout ending on a 2-bar solo break.
- Notes are scheduled 3 s ahead on the audio clock (more than a bar, so a frame held up while walking never
  leaves a gap). Each listening stretch has its own bus; stopping cuts it, so notes queued ahead are never heard
  late. After a stall it starts afresh rather than build a bar in the past. The kit and his sticks move on the
  hits as they sound (`DRUMS.r` / `DRUMS.l` count his right- and left-hand strokes); when nobody can hear it, it
  keeps time silently on the game clock.
- Heard anywhere on the dance floor and the strip where the kit stands (a touch louder by the kit), and through
  every Dance battle and victory dance wherever they are. Never with Fortizmo's horn: from when she raises it in
  the Event until her last notes die away, he rests. Otherwise he never stops, not even while talked to.
- "Heard" is judged from the player's head, `we.headPos`. In the desktop and mobile test modes that is the
  avatar's head, never the orbiting camera (which sits 6.5 m behind and once made the jazz cut out near the
  floor's south end).

### Code habits from the bug passes

- Timers (`setTimeout`) that touch a creature are stored on it and cleared when something else takes it.
- Anything that pulls a creature away (a vignette, the Event, a battle) checks the others first: `busy`, `vig`,
  `me.active`.
- WebXR input sources change mid-session (a controller added, removed or swapped): re-read them every frame.
- An Event wrapped early (by its time limit, or left) leaves nothing pending for the next one, and drops any
  route home planned before it.

## How the town is built

- **Frames and bins:** the town is built in local frames: `place(x, z, ry)` returns a builder with `box`, `geo`,
  `sign`, `win` and `sub`. Every piece goes into a material bin (plain, siding, brick, shingle, stone, concrete,
  glass, lit, boards, …), and each bin is merged at the end, split by area (four quarters of the park, eight
  slices of the town) so out-of-view pieces are skipped. Unit geometries are cached and scaled, tiling textures
  painted in greys and tinted per vertex, and all signs share one atlas.
- **Doors** (owner's rule): every door is wood, the `boards` bin under its paint, and a storefront's door has a
  framed transom light over it up to the band above the windows, so no wall shows above it.
- **Mistergummery's** (owner's choices): Montgummery's teal (`#55b8c6`) wherever a burger chain would have its
  yellow (the building, trim, lot and menu); no burger on the roof; the pylon is just the big teal M on a beam,
  about as tall as the Main Street rooftops, beside the restaurant's front corner. Its 20 m lot replaced the
  hardware store on Main Street, and its M is meant to show over the rooftops from the square.
- **No far scenery:** the fields, farmsteads, turbines, windmills, railroad, telephone poles, water tower and grain
  elevator were removed for performance (about 48k triangles and 8 draw calls, and no spinners to turn each
  frame). The town ring round the square, the trees between its buildings and Mistergummery's stay. No cars.
- **The town is the creatures' own, shown not told** (owner's rules: as interesting as possible, from the park's
  lore, style and design; lore through visual elements, never words; few signs; nothing from creatures not of the
  town, such as Hennrick; no flint knapping; no extra cost). The only words left outside the park are the two
  names the owner gave (FIRST BANK OF GREEBLIS, Mistergummery's and its menu board), the stop signs, and the
  billboard the owner asked for. Every store on Main Street carries a sculptural trade emblem in its creature's
  colours where a name would be:
  - **east side** (north to south): Mistergummery's; GEMTOE's gem exchange (crimson brick, her amethysts
    clustered on the crest, one hung on a bracket over the walk); the barber's by its pole; the picture house
    (a marquee of bulbs carrying a painted bill of KING DINO, crown, plume and drumsticks, and a blade sign of
    gold stars); the diner (ridged cream siding under a red front, MAMA GORBO's goo shake on the roof); GLYPH's
    sign shop (porcelain blue, gold filigree painted on its band, his red trident on a gold shield over the door,
    hexagon plates shingled along the frieze, his two purple tiles with gold coins on the crest); SPARKAKUS's
    genealogical society (a family tree in a gold oval over the door, daffodil beds, his gold star over the crest);
  - **west side**: the bank with a flint nugget carved over its doors; the grocer's (crates of fruit on the walk in
    the Juice Bar's colours, a giant carrot on the crest); the ice cream parlour (three scoops of goo flavour on a
    cone over its false front); ETCHER's archive (blue-teal stone, his etched data in a row of painted tiles, his
    green gem on the crest, his purple tails draped down the piers and sides); the curiosity shop (a stone copy of
    the Great Sphinx out front, one eye socket empty: the missing Eye is the Ancient Gem); the florist's (a giant
    Blossom over its false front, beds of little ones); ANOMALEE's television repair (moulded plastic grey, a
    rabbit-ear aerial, old sets stacked by the door with her magenta glow in their screens);
  - **north**: the Town Hall with the town's seal (a wreath round the garden's five flowers) in its entablature
    and the clock; the fire station with its right bay rolled up and the engine's nose in it, a brass bell under
    the tower top; the hotel (balconies, a canopy, a brass luggage cart, a tank on the roof); MONTGUMMERY's video
    store on the north-east lot (his teal, his face on a TV on the roof beside a giant blank-labelled cassette,
    his pots by the door); the filling station of the far future (charging posts with glowing ports and coiled
    cables, the canopy in his teal, a lightning bolt on the pylon); the Consortium's field office (the sheriff's
    star on its side), its listening dish, and its find behind them: a scorched ring taped off between orange
    posts under two floodlights;
  - **south street, the homes**: SPARKAKUS (royal blue, his alebrije vines painted between the floors, daffodils,
    his star over the ridge), KING DINO (lemon yellow and turquoise, his crown on the ridge, a drum on the porch),
    FORTIZMO (green, a lily pond, her horn on the porch), SOMLET (cream and plum, cotton puffs for shrubs, a
    hammock, a mail sack), the Gorbos (peach, goo dripping off the porch roof, puddles on the lawn), MUSHROOM
    (cream, his spotted cap for a roof, toadstools in the yard), ANOMALEE (plastic grey, her glow in the upstairs
    window, an aerial), MONTGUMMERY (teal, stacks of his pots for porch posts, his tapes by the door, an aerial);
  - **out past them**: the water tower in MAMA GORBO's peach with her goo and her lime tail; her goo burger on a
    pole behind Mistergummery's; ZOLLOD's greenhouse with one of his flowers grown giant through its roof;
    GEMTOE's amethysts in a fenced lot (nothing inspired by the church's ANCIENT: the owner's rule, so the ring of
    standing stones that stood at the end of the road west is gone); and
    the owner's billboard, on the empty corner lot across the road from the park's north-west corner, turned to
    face the square diagonally (close enough to read from the garden, over the Library's low shelves): a painting of KING DINO as a real dinosaur (a theropod, in
    contrast to his gummy self in the park, but in his own lemon yellow with his turquoise as markings where his
    buttons and ball joints are) at his drums under a spotlight, his crown and plume on, and
    the words the owner gave it, "A Prehistoric Era in Jazz!", with a cloth banner hung under the board on two
    ropes carrying the second line in one row of big letters, "Let King Dino take you to the Jurassic Greeblis
    Park!" (the one piece of lore text in the background, at the owner's request).
  All of it goes into the existing bins and atlas (24 town meshes, no new draw calls). Its triangles are paid for:
  the park fence's pickets are four-sided tubes with no end faces (never seen; a third of the fence's triangles),
  the lamp globes and marquee bulbs are coarser spheres, and the far trees use the one-crown build. The town is
  99.5k triangles, under the 101.6k it was before any of this. `test/t_townview.js` renders the map, the views
  out of the square, every piece close up and the fence pickets from inside, and prints the counts.
- **The player** starts at (0, 2), just south of the Summoning Stone, facing the church (`player.spawn` and
  `player.face` in the config `t`; face 0 looks south along +z).
- **Kiosks:** `kioskFrame(o, {sign, ink, wall, wall2, tin})` builds the shared shell (deck, back wall, half side
  walls, posts, tin roof, counter at 1.12 m). Each kiosk adds its goods through `goods()`, which merges every small
  item into one vertex-coloured mesh. `KIOSK_AT` holds each kiosk's position and its `front`, `spot`, `desk`,
  `exit` and `at(name, lx, lz)` points. The Post Office and the Sheriff's share the north-east corner, Garden
  Supplies has the south-east and the Library the north-west. The Sheriff's back wall carries wanted posters on
  parchment: two little green aliens, their UFO, GLOOPERNAUGHT (a big green goo creature, named under its
  picture), a brown rabbit dressed as Napoleon Bonaparte (bicorne with gold trim and a tricolour cockade, navy coat
  with red collar and gold epaulettes, a paw tucked in) front and centre under the star, and a drawing of the
  player's own avatar (copper hair and ponytail band, freckles, the flowered indigo dress), pinned a few
  millimetres proud of the goo poster's corner so the two never flicker. Its back wall is plain: the battens
  every other kiosk has would cut across the posters, so the owner had them taken off (`noBattens`).
  Garden Supplies' wheelbarrow of flowers out front stands on its wheel: two fork rails run from under the tray's
  front edge down to the axle, the wheel's top level with the tray's bottom, and two legs at the back.
- **Solid ground and clear ground:**
  - `F.add(x, z, r)` makes round colliders. `F.addBuilding(x, z, ry, hull, parts, name)` makes an oriented
    building: creatures path round the hull; the player and workers meet its parts (walls, counters).
  - `E.add(x, z, r, tag)` zones keep pickups and roamers out. `keepAt`, `WALKS` and `onDance` keep lawn tufts
    off structures, walks and the dance floor.
  - When scenery is removed its colliders go too; left behind they are invisible obstacles. Re-check scenery and
    every fixed spot (`F.inHull`, `F.free`, `E`) against a building's new footprint after any move.
- **Walks with a purpose:** each leads somewhere and ends there: the ring round the garden, the Library, a cross
  walk along the Post Office and Sheriff's fronts, Garden Supplies, and the south walk to the church steps.

### Set pieces

- **Garden:** tilled rings every 2 m from 2.6 m (13 cm ridges), four stepping-stone paths, and a border of stones
  that creatures step over (`JGP.groundAt`). Plants are merged meshes that grow from scale 0.01; each has a full
  and a light mesh (`plantMesh`), the full one shown within `PLANT_NEAR` (7 m) of the eye. The light one drops
  small parts and rebuilds the `T` spheres, cylinders and cones with fewer segments (`loGeo`, from the `lp` each
  of those remembers: this three.js keeps no geometry `parameters`, so the light meshes used to be just as heavy).
  With the Snacks done, Anomalee's pizza box goes 0.8 m to her side if a flower of hers from an earlier Event
  stands where it would.
- **The plants** (final; each built only from the owner's photos of it): five kinds in `PLANT_KINDS`, each
  `[name, flower, talk colour, builder]`: a creeping thistle, a scentless mayweed, a chicory, a common milkweed and
  a zebra mallow. One merged vertex-coloured mesh per kind, drawn at `PLANT_SIZE` 2.4; leaves stay 0.11 model units
  up (stems aside) so they clear a row's ridge.
  - The toolkit inside `PLANT_KINDS`: `part(name, make, lit)` builds a flat double-sided part once from its
    triangles (`lit`: the back lit like the face, for thin petals the light comes through); `blade` fans an outline
    into a curved blade; `ribLeaf` folds a leaf along its midrib; `stems(add, STEMS, o)` grows stems, branches,
    flower stalks and leaves (with `o.leafPlus` parts such as ribs, veins and spines laid on each leaf);
    `faceFrom` turns a flower head away from its stalk; `cup` is the green cup of bracts under a head.
  - Details from the photos: the thistle's pale midribs and spines, the mayweed's toothed rays and bract cups, the
    chicory's ray veins and bracts at its joints, the milkweed's side veins and five-hooded crowns, the mallow's
    leaf veins, sepals and anther fuzz.
- **Seeing a plant up close** (testing): the plant test row was removed once the plants were final; instead
  `JGP.plantShow(kind, x, z, ry)` puts a full-grown one on show anywhere, and `test/plantshots.js` uses it to
  render each kind from four views for checking against the photos.
- **Summoning Stone:** a six-sided standing stone on a round plinth with rune strokes (shapes, not letters) in one
  merged unlit mesh; no floating pebbles (removed at the owner's request). The runes stay dark until the player
  uses the stone while holding the Summoning Stone (`garden.stoneAwake` is set when its panel opens); then they
  light up over 1.5 s, breathe from then on, and blaze during the Event.
- **Library:** open ground with no walls, roof or raised floor (`LIB_LAYOUT`):
  - eight freestanding double-sided bookcases (2.2 m long, 2.1 m tall), two rows behind Sparkakus and one down
    each side, with open aisles;
  - the LIBRARY banner on two posts behind the back row, high enough to show over it (the kiosks' sign painter,
    `kioskSignTex`) (the reading table was removed at the owner's request: the Library doesn't hold the
    Artifacts);
  - one thing stands face-out in a gap on each of nine shelves (`LIB_LAYOUT.features`): six cloth hardbacks with
    their own covers (WORKS OF PATCHOOLEE, ADVENTURES OF APPTERIX, SONGS OF ORSON, STAPLERS by Walter Bigsby, OVERCOMING SHYNESS, RANGER BOBERT) and a
    Wish Blossom from Greeblis Park in a little pot (its pickups' model at 22%, crystal turning, halo bobbing),
    an Electric Blossom from Greeblis City (its pickups' model at 30%, head turning, halo bobbing) and an Acorn
    from Greeblis Woods (its pickups' model at 1.1x, standing tipped on the shelf);
  - its colliders are the bookcases and posts; it is kept explicitly when the engine's scenery is cleared
    (it is wider than the 12 m that rule spares);
  - a rug (`LIB_LAYOUT.rug`, 11 × 7.8 m) after the owner's paisley fabric: a deep crimson field printed with
    paisleys (mustard-gold outlines, navy bands dotted white, teal and red hearts with little flowers), small
    red flowers with white eyes and gold fern sprigs; a border of the fabric's stripes (a navy band of red
    flowers and white dots, a teal band of red flowers, white and gold lines); a medallion of two paisleys curled
    round each other; cream lace round the field and a cream fringe at each end. The print is one seamless
    128-pixel tile at 0.75 scale, and the material is toned down (`0xa29a98`) so the open sky doesn't wash its
    colours out. It is a 4 cm slab with its top 3 cm up (1 cm over a walk, 5 cm over the lawn), part of
    `JGP.groundAt`.
- **Church:** at the end of the south walk, its back to the fence. The park has no flowerbeds, benches or trash
  cans (removed at the owner's request).
  - **The secret room** (final; built only from the owner's photo of a slug at night): the player gets in
    through the wall under the right-hand Garden window, marked only by a small red X painted there: the
    building's parts leave a 2.6 m gap in that wall, and every mode (desktop, mobile, VR) moves the same body
    through it. Inside, floor, walls and ceiling are one gritty olive-grey ground texture (lit best at the floor,
    least at the ceiling), with pebbles, big flat dark stones, shell flakes, cracks and dry grass on the floor.
    A second look at the photo added (additions only, the room and the ANCIENT untouched): a clustered patch of
    flat slate-dark chips beside its head; four bigger stones half sunk in their own shadowed pits; six more
    strands of dry grass, two crossed by a second straw; little white curls of shell; a long shallow crack along
    the front corner; and a faint glossy ribbon of damp trailing from its tail toward the back wall (its own
    thin transparent mesh, never under the body). The room's panels run a few centimetres into one another at
    every corner — walls into walls, ceiling into the wall tops — each overlap offset so no two faces share a
    plane: no slit of dark gap shows in a corner, and nothing z-fights.
    `test/t_church.js` checks the way in, the walls and the head guard; `test/churchshots.js` renders it.
  - **The Ancient** (the slug creature; its name on screen is ANCIENT, its id in code stays `slug`) lies across the middle of the floor and never moves from there. It has a Talk and, with one in
    hand, a Blossom (it takes one and answers "..."); it never leaves its place (others rarely come to it, see the visits), and its own moves: idle (stalks swaying and pulling in, breathing, looking
    round), Talk (head lifted, not turned to the player, nodding), Dance and Planting at the Event (it follows
    `JGP.eventMove`, which the Event's dance and plant loop sets each frame). `JGP.slug` exposes it for tests.
  - **No Blossom or Flint ever spawns inside:** every pickup spot comes from `go()`, which turns down anything within
    0.8 m of a building's hull, and the room lies inside the church's (`test/t_church.js` samples it).
  - **No creature goes inside:** they path round the hull and never pick a spot in it, and `JGP.churchGuard`
    puts any that ends up inside (or heads there) straight back out. No lawn tufts grow inside any building.
  - **Roof:** a `GABLE` prism's slopes rise from its outer edge, so with eaves the base sits lower than the wall
    tops by `height · overhang / half-width` (0.5 m here) for the slopes to meet the walls; the gable ends fill up
    to the same slope, `height − that drop` tall.
  - **Stained glass** (all final; no words, and no faces on the figures): every window is painted on a canvas by
    code on a 384 × 1024 lancet layout, scaled up for sharpness. `stainedKit(cx)` holds the tools: `glass(points,
    fill, lead)` fills a polygon with a gradient, streaks and bubbles and leads its edge; `oval()` does an ellipse;
    `panes()` cuts a region into a jittered grid of leaded panes; `mix` and `shade` blend colours; `reseed(n)`
    makes each window repeatable; `border()` leads the arch with 64 jewel-coloured pieces.
  - **Traveler window** (over the door): `paintTravelerWindow`, at twice the needed resolution.
  - **Garden windows** (one on each side wall): `paintGardenWindow(cx, swap)` redraws the right-hand window of
    Greeblis City's cathedral at 1.5×: sky, a rayed sun, clouds, a meadow with flowers and two butterflies, a
    robed figure, and Mama Gorbo with her port eyes, lime tail, wisps, sparks and tags. The right wall (facing the
    church) has the City layout; the left wall's copy has `swap` set, which mirrors the two figures' places
    (`X(x) = W0 - x`) and moves one cloud, while the sun and the meadow stay put.
  - Each sits in an extruded stone frame with a sill, 2.6 × 5.2 m, its glass 4 cm off the wall (the frame 1 cm),
    so nothing flickers from inside. All window glass glows at night.
- **Post Office mail mountain:** behind the kiosk, under the roof line so it is hidden from the square (a visual
  joke): a heightfield of 19 overlapping cones gives a faceted paper heap, not a dome, under about 2,300
  envelopes (some on edge), tied bundles, parcels, leaning stacks and an avalanche round the foot. Five kraft
  parcels spaced out round the heap and half sunk in it like the rest can be read, none of them obvious (the
  owner's call: never stacked or set out for the player), each label 6 mm proud of its box and always facing
  straight out of the heap (its turn is worked out from its spot, plus a small offset, and the box is tipped up
  a little toward the eye): "To Clipston" on the open end, "To Ormstown" at the back, "To Montreal" on the far
  side, "To Cobourg" by the front, "To Bangkok" at the back corner (the owner's words; the name on each is fitted
  to its label; the list in `buildPostOffice` takes another in one line, placed clear of the buried parcels and
  stacks, and `t_parcels.js` renders each label and checks it faces out).
- **Dance floor:** 1.2 m tiles in front of the Juice Bar's counter, one 10 × 32 rectangle from the bar's north end
  south for twice the bar's length. All tiles the same dark purple in darker grout with a satin sheen; one canvas
  at 32 px per tile with mipmaps, so the grout doesn't shimmer in the distance or in VR. Canvas row 0 is the
  plane's north edge. The plane sits at y 0.035; anything standing on it starts 1 cm or more above that (the bar
  stools' feet). `onDance(x, z, m)` tells tufts and pickups where it is.
- **Drum kit:** Greeblis Woods' kit, a third bigger, on the grass behind the floor's south half, its rug and
  cymbals stopping just short of the floor; King Dino stands behind it facing across the floor. Each drum is one
  merged mesh. The two-layer rug's inner layer stands 6 mm into the outer with its top 1.2 cm above it, so no
  face of one is within 4 mm of the other's.
- **The square:** no benches or trash cans (removed at the owner's request). The Town Hall's spire ends in a gilded
  ball (its cross was removed at the owner's request). The UFO crosses the sky every
  10 minutes, never during the Event.
- **The avatar in the test modes:** `dkAnim` strides her legs, swings her arms against them (held 0.21 rad out so
  the hands clear the skirt), bobs her on each step, sways the skirt and bounces her ponytail a beat behind; still,
  she breathes, glances about and blinks. Desktop and mobile only (in VR the player has no body).
- **The avatar's look** (from the owner's reference, always cartoony, never a likeness): copper hair gathered low
  at the nape — the two strand groups hang together as one low ponytail, keeping the old pigtails' swing — with a
  navy tie and a small navy bow riding it; pale warm skin with seven flat freckle dots over her nose and cheeks;
  an indigo dress wearing its own print of small white batik flowers (`userData.baseTex`, drawn like the Sun
  Dress's suns and tiled the same); navy belt; dark trainers. Taking the Sun Dress off goes back to her own print,
  never to a bare colour. The Sun Dress's gold hem rides on the skirt itself, so it sways with it. Her walking bob
  (`dk.bobY`) goes on just before the camera and render: the player step keeps her body at y 0 for collisions.
- **The dialogue box** (one canvas, drawn the same in every mode) shows the speaker's name tag only when there is a
  speaker: a box with no name (a pickup's notice, such as "Overcoming Shyness book obtained") has no tag at all,
  never an empty coloured one.
- **No X in the top right of any menu** (owner's rule): every panel closes by its own button at the bottom (LEAVE,
  DONE, No) or, in the test modes, a tap off it. A Dance battle has LEAVE from its first round.
- **Taps in the test modes** (owner's request: no NEXT or CLOSE buttons on mobile): a tap or click anywhere moves
  a dialogue on, page by page, and closes it after the last; a tap off the action menu or a panel (the shop)
  closes it. The panels keep their own X and LEAVE. VR is unchanged (the trigger already moves dialogue on).
- **The test modes' error tools** count every error in one place, `vo()` (the frame loop, a click, a key, a
  button), so the desktop counter and the copied report agree; and the VR placer never runs there (a new dialogue
  or panel used to show in the wrong place for one frame).

## Performance

- **Merge per material:** kiosk goods, plants, town bins, born creatures (`KIT.compact`).
- **Freeze static groups:** `H(group)` turns off matrix auto-updates.
- **Mobile counts:** check `window.__jgpMobile` to place fewer envelopes, tufts and fence pickets.
- **Prefer one canvas texture over many meshes** for flat patterns (the dance floor, the rug).
- **Keep per-frame work tiny:** search on from last frame's answer (Somlet's tentacles take a step or two),
  repaint textures a few times a second at most, and never allocate in loops.
- **Compile early:** anything that first shows mid-game (the bulb, Backpacka, his water) is built and compiled
  ahead, as a compile stall in a headset is long and crackles the music.
- **During the Event** a safeguard hides far scenery (outside `finaleKeepR`) to protect the frame rate; mark
  anything that must stay visible `keepInFinale`.
- **Work only when something changed:** a creature's ground height is worked out again only when it has moved
  (`gFit` keeps `gfX/gfZ/gfG`; a ground probe is seven samples); `F.inHull` works its local point out in place
  (no array per call); creature-to-creature pushes test squared distance before any square root; a visit's
  failed search for a spot is retried a second later, not every frame; idle footprint samples are staggered so
  they never all fall in one frame.
- **Hide what has finished:** Backpacka's droplet cloud is its own object in the scene, so it is hidden with him;
  it was drawn every frame for the rest of the session after the first Event.
- Measure with `test/t_perf.js`.

## No clipping, no flicker

Rule of thumb: place from the skin (`hit()`), keep orbits wider than the body, and never let two faces share a
plane.

- **Flat parts on curved skin:** sink them by the sagitta, r² / (2R), so their edges meet the curve.
- **Orbiting things:** orbit radius > body radius + item size + jiggle (Mama Gorbo's tags orbit at 1.78 m).
- **Overlapping decorations:** skip plates under a shield; move a shield clear of the arm's whole swing, not just
  its rest pose.
- **The ground:** parts below a bobbing or swaying body must never go into the floor. Check real mesh vertices
  (`test/t_ground.js`), and lift the body by what a tilt dips its footprint.
- **Z-fighting:** any two faces in one plane flicker; offset them by 1 cm or more. That includes faces seen only
  from inside a building, because double-sided bins show both sides of a wall.
- **Single-sided planes** disappear from behind. Use thin boxes or double-sided materials.
- **Merged scenery fixes itself at load:** `unfightParts()` (Greeblis Park's fix) runs on the town's bins and every
  `goods()` merge (kiosks, Library, Juice Bar, drum kit), never on a creature. Wherever two parts' faces share a
  plane (within 4 mm, overlapping over 1 cm each way), the smaller part moves: 8 mm proud when both faces look the
  same way (a sign, window or mat on a wall or pavement), or into the bigger part when they press back to back,
  by 1 cm or half the thinner part's depth if that is less (a full centimetre into a slab barely thicker brings
  the far faces level and they fight), and not at all when both are only a few millimetres thick. Up to three
  passes. It moves about 5,900 parts in about 0.5 s (`JGP.unfightParts.moved` / `.ms`). Merged faces lying flat on
  the ground facing down are dropped (no eye goes below the ground).
- **Locked creatures:** where a final model's own parts share a surface (Somlet's cap: the crown's top, the white
  piping, the badge's flap), give the overlay a cloned material with `polygonOffset` (factor −1, units −4). The
  depth changes, the shape does not.
- **Transparent overlays** each get their own render order (goo splats on the view: the newest on top), or they
  swap as the view moves and flicker.
- **Finding it:** `test/t_zfight.js` lists coplanar overlaps the player's eyes can see, and `test/t_zcheck.js`
  shows which really flicker (the near plane nudged with nothing moving). Moving the camera instead, even by
  millimetres, reports fine textures as flicker, and an eye straight below a point makes `lookAt` spin.
- **The head guard (VR):** a head can lean into what the body can't walk into. `JGP.headGuard` darkens the view
  from 20 cm off any solid structure (building parts at their real heights, and round colliders only where the
  player meets them) to fully black at 8 cm (the near plane is at 15 cm), and clears as the head comes out. The
  player walks right through the Summoning Stone and the portal's pillars, so they never darken it (owner's rule).
  Its `TOPS` table lists each building's parts in order: the Library's are its eight bookcases then the banner's
  two posts; the Sheriff's desk top is `SHERIFF_DESK` (raised), not the other counters' 1.12. The ANCIENT is
  talked to only from inside its room (a VR pointer reaches 16 m and would talk to it through the walls).
- **The sky dome fits inside the far plane** (`0.85 · t.far`; far is 310 m, 260 m on mobile), or its middle is
  cut away and a pale disc turns with the view.

## Pitfalls already hit

| Pitfall | Fix |
| --- | --- |
| Glyph's arm swung through his shield; moving it put it under back plates | Move the shield clear of the arm's swing; skip plates whose spot lies under the shield |
| Somlet's tentacles went into the ground as she bobbed | Each frame, splay them outward just enough to keep every vertex 2 cm up |
| Mama Gorbo's goo foot dipped 9.5 cm into the ground | Flatten the blob's lowest vertices to a sole 1.2 cm up, and lift the body by `1.1 · (|rot.z| + |rot.x|)` as it sways |
| A blob riding down a stream was wider than it and sank into the skin | Push it out along the skin normal by the difference in radius, and keep it above the ground |
| The mail pile read as a blob | Faceted cones, dense varied envelopes (some on edge), bundles and parcels, no round sacks |
| A tree grew into the moved church; a portrait render showed a creature sunk into the church floor | Re-check scenery and render spots after moving a building; render portraits on open lawn (`SPAWN=-18,24`) |
| A gap between the church roof and its side walls | The eaves lifted the slopes 0.5 m above the wall tops: lower the roof by that much |
| Bar stool feet flickered against the dance floor | Their tops were flush with the floor (y 0.035): raise them 1 cm |
| The drum rug's layers flickered | `unfightParts` sank the inner layer a full centimetre, level with the outer's top: it now sinks at most half the thinner part's depth, and the layers stand clear of each other |
| A creature asked to dance or plant didn't move | The wrapper only existed during the Event: make it on first use |
| A test of one move picked up the last one | Reset the creature's `bt.tg` state between moves |
| The jazz cut out near the dance floor's south end in the test modes | It was judged from the orbiting camera: judge from `we.headPos`, the avatar's head |
| The Library vanished once its bookcases were spaced out | It was wider than the 12 m the scenery clear spares: keep it explicitly |

## Checking the work

1. Lint after every edit (`npm run lint`: `no-undef`, `no-unused-vars`).
2. Render portraits of a creature from 2 to 4 angles at several elevations (`town/test/portraits.js`): look for
   clipping, floating parts, wrong colours and faces that vanish.
3. After layout changes, render a top view (`town/test/topview.js`) and head-height views inside buildings to
   catch z-fighting, then run `test/t_zfight.js`.
4. Run the battery (`test/battery.sh`), and for Event changes `t_event3.js`, `t_rounds.js` and `t_stress.js`.
5. Check every creature's menu holds only Talk (and Give a blossom), and that each plants and dances by itself at
   the Garden Event (`town/test/dance-plant.js`).
