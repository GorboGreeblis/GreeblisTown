# Greeblis Town: Creatures

This register is the engineering reference for every creature: its roster entry, builder and def fields, how it is
spawned and wrapped, its behaviour states and flags, its quest hooks and its test hooks. Each creature's visual design
is in [bible part 3](../Bible/bible.md#3-creature-design), its style in [bible part 4](../Bible/bible.md#4-creature-style) and its place
in the world in [bible part 2](../Bible/bible.md#2-the-cast). The shared methods (`born()`, the planting and dancing layer,
roaming, home ground, routing, visits, vignettes) are specified once in [construction.md](construction.md); this file
states only what is particular to each creature.

The builders of SPARKAKUS, MAMA GORBO, GOOWARD, GEMTOE, MONTGUMMERY, ETCHER, GLYPH, KING DINO, FORTIZMO, SOMLET,
MUSHROOM, ZOLLOD, ANOMALEE, HENNRICK, NEXTESSA and THE ANCIENT are marked final in the code: these models are locked,
so parts, proportions and palette change only with the owner's approval ([rules](rules.md#locks-and-approvals));
animation changes on request are allowed. BACKPACKA and the avatar are
marked final in the code and locked as well.

Contents: [The cast](#the-cast) · [Placement and movement](#placement-and-movement) ·
[Event and social roles](#event-and-social-roles) · [Shared wiring](#shared-wiring) ·
[Per-creature wiring](#per-creature-wiring) · [The birds](#the-birds) · [The player's avatar](#the-players-avatar)

## The cast

This table lists each creature's identity in code and the def fields that size and label it.

| Creature | Id | Spawned as | Builder | Tag `color` | `bodyR` (m) | `talkR` (m) | `modelScale` | Tag height (m) | Code |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SPARKAKUS | `keeper` (stand-in `st.ent`) | Library worker `st`, not in `It` | `born_sparkakus` (`BORN.sparkakus`) | none (script `i`) | fixed body 0.9 | `i.greetR` 6 | 1.16 (Library group) | 3.1 (`st.ent.height`); model 2.85 × 1.16 = 3.31 | SP |
| MAMA GORBO | `p_mamagorbo` | `npc` | `born_mamagorbo` | `#ff9f5c` | 1.1 | 3.8 | none | 2.95 | MA |
| GOOWARD | `gorbo` | `companion` (engine def `e.gorbo`) | `born_gooward` | `#30b4e4` | 1.2 | 3.4 (default) | none | 3.2 | GW |
| GEMTOE | `p_gemtoe` | `npc` | `born_gemtoe` | `#c870d0` | 1.15 | 3.8 | 1.06 | 2.54 | GT |
| MONTGUMMERY | `w_mont` | `npc` | `pk_mont` (`PK_MONT`) | `#55b8c6` | 0.86 | 3.8 | 0.9 | 2.97 | MG |
| ETCHER | `p_etcher` | `npc` | `born_etcher` | `#9ee09a` | 1.15 | 3.6 | 1.16 | 3.02 | ET |
| GLYPH | `p_glyph` | `npc` | `born_glyph` | `#e88a8a` | 1.1 | 3.6 | 1.11 | 2.78 | GL |
| KING DINO | `m_kingdino` | `npc` | `born_kingdino` | `#e8c020` | 1.1 | 4.2 | none | 3.1 | KD |
| FORTIZMO | `frog` | `npc` | `fortizmoPick` (wraps `pk_fortizmo`) | `#e8742a` | 0.95 | 4.2 | 0.78 | 2.93 | FZ |
| SOMLET | `m_somlet` | `npc` | `born_somlet` | `#ecd8b6` | 1 | 3.4 (default) | none | 3.0 | SM |
| MUSHROOM | `drifter` | `npc` | `born_mushroom` | `#e8862a` | 0.8 | 4.2 | none | 2.0 | MU |
| ZOLLOD | none; `def.__type` `"cutebex"` | `creature` (`Mo`) | `born_zollod` | `#3cbe94` | 0.9 | 4.2 | none | 2.6 | ZL |
| ANOMALEE | `blinker` | `npc` | `anomaleePeg` (wraps `pk_anomalee`) | `#2fd4e6` | 0.95 | 4.2 | 0.95 | 3.14 | AN |
| HENNRICK | `gratelet` | `npc` | `pk_hennrick` | `#c85ac8` | 1.25 | 3.4 (default) | 0.88 | 2.99 | HN |
| NEXTESSA | none (`id: null`) | `courier` | `pk_nextessa` | `#ef7536` | 0.92 | none | 1 | 3.5 | none |
| BACKPACKA | none | not an entity (`BP`) | `BP` (`make()`) | none | none | none | none | none | none |
| THE ANCIENT | `slug` (stand-in `JGP.slug.ent`) | not an entity; station `slug` | the church builder | `#9a7a5a` (dialogue) | 1.1 (stand-in) | station r 3.2, inside the room only | none | 0.7 (stand-in) | SL |

- **Source of the fields:** `ROWS` (start of the game layer) holds `[id, NAME, builder, def, spot]`; `applyCast`
  merges each row over the engine defs (`e`, `o`, `n`), adding `name`, `builder`, `at`,
  `pattern: ["post", {face, y}]`, `stationary: true` and the creature's `SCRIPT` entry. SPARKAKUS, NEXTESSA,
  BACKPACKA and THE ANCIENT are not in `ROWS`. See [construction.md](construction.md#placement).
- **Spawn kinds:** ids in `e` spawn as `companion`, ids in `o` (including every row added by `applyCast`) as `npc`,
  and `n` (`cutebex` only) through `Mo()` as `creature`, which sets `def.__type` and no `id`. Code must find ZOLLOD by
  `def.__type` or `Xt(ent)`, never `It.byId`.
- **Defaults:** `bodyR` 0.8 m and `talkR` `t.talkR` (3.4 m) when a def omits them.
- **`modelScale`:** the spawner moves the model into a scaled wrapper group and multiplies the builder's `height` by
  it. Tag height is that product: the height used for the name tag and the talk interface.
- **`color`:** the name tag and dialogue colour.
- **Code:** the two-letter vignette code (`NAMES`, `CODE`); see [construction.md](construction.md#vignettes).

## Placement and movement

This table gives each creature's start spot, facing, exit route, movement and home ground.

| Creature | Spot | Faces | `via` | Movement | Home ground (`JGP.homeGround`) |
| --- | --- | --- | --- | --- | --- |
| SPARKAKUS | Library frame (0, −0.45); Library at `KIOSK_AT.K.shop` (−24.75, −24.75) | Library frame | Out by the Library front (`JGP.libFront()`) | Browses the floor band (local x −5.3 to 5.3, z −2.15 to 0.6), 0.8 m clear of every bookcase | The Library (worker `st`; not tested by `homeGround`) |
| MAMA GORBO | (34, 28.4) | −π/2 rad | none | `JGP.parkRoam`, wait 3 + 5·rand s | Any `roamFree` ground |
| GOOWARD | (24.2, 14.9) | −π/2 rad | none | `JGP.galleryRoam`, wait 3 + 5·rand s | Within 12 m of `KIOSK_AT.K.gallery` (31, 14.5), on `roamFree` ground |
| GEMTOE | (5, −31), gazebo centre | −π/2 rad | `JGP.gazeboVia()`, three points through open front | Fixed home between visits/Events | Within 1.2 m of `def.at` |
| MONTGUMMERY | `JGP.floorSpot(2)` | Toward (0, 0) | none | `JGP.floorRoam`, wait 3 + 4·rand s | `JGP.onDance(x, z, 0.05)` |
| ETCHER | `JGP.floorSpot(0)` | Toward (0, 0) | none | `JGP.floorRoam`, wait 3 + 4·rand s | `JGP.onDance(x, z, 0.05)` |
| GLYPH | `JGP.floorSpot(1)` | Toward (0, 0) | none | `JGP.floorRoam`, wait 3 + 4·rand s | `JGP.onDance(x, z, 0.05)` |
| KING DINO | (−36.35, 19.2) | π/2 rad | none | Post only | Within 1.2 m of `def.at` |
| FORTIZMO | `JGP.barSpot(-3)` | π/2 rad | `JGP.barVia()`: three points at z 1.7 through the counter gap | Aisle patrol (see [FORTIZMO](#fortizmo)) | Within 0.8 m of the aisle line, \|z\| < 8.5 |
| SOMLET | `KIOSK_AT.at("post", 0, 3.9)` | `KIOSK_AT.K.post.ry` | none | Post only | Within 1.2 m of `def.at` |
| MUSHROOM | `"kiosk-desk:sheriff"` (local (0, 0.72)), `standY` 1.545 | `KIOSK_AT.K.sheriff.ry` | `"kiosk-front:sheriff"`: local (0, 2.0), (0, 3.4) | Post only | Within 1.2 m of `def.at` |
| ZOLLOD | `"kiosk:garden"` (local (0, −0.45)) | `KIOSK_AT.K.garden.ry` | `"kiosk:garden"`: local (0, −1.75), (2.4, −1.75), (2.4, 1.85), (2.4, 3.4) | Post only | Within 1.2 m of `def.at` |
| ANOMALEE | `CHURCH_AT.at(CHURCH_AT.sFront - 3.2, 1.8)` | Toward `CHURCH_AT.tower` | none | Post only | Within 1.2 m of `def.at` |
| HENNRICK | `JGP.portalSpot()` | Toward the Portal (`ot`) | none | `JGP.portalRoam`, wait 4 + 6·rand s | Within 9 m of the Portal |
| NEXTESSA | Spawned beyond the Portal on a phone order | Toward the player | none | Courier state machine (see [NEXTESSA](#nextessa)) | none |
| BACKPACKA | Event only | Scripted | none | Timeline `BP.D` | none |
| THE ANCIENT | Church room frame (0.1, −11.6) | Fixed | none | Never moves | none |

- Local coordinates are in the kiosk's own frame (local +z faces the customer); see
  [construction.md](construction.md#placement) for `KIOSK_AT`.
- Pickups never spawn within 2.4 m of a posted creature's spot; the park roamers, the Dancers and HENNRICK are exempt,
  their ground being kept clear as a whole (the dance floor; 7.4 m round the Portal).
- Roaming, settling, `JGP.roamEscape` and the 0.5 s home guard are in
  [construction.md](construction.md#posts-patrols-and-roamers) and [Home ground](construction.md#home-ground).

## Event and social roles

This table gives each creature's planting move, dance, Garden Event role and part in visits.

| Creature | Planting (move, rad/s, size) | Dance (move, rad/s, size) | Event role | Visits |
| --- | --- | --- | --- | --- |
| SPARKAKUS | pat, 1.6, 1 | funk, 5.45, 1, plus his model's own moves (`st.dancing`) | Library planter (only with Seeds) | Visits and hosts through `st.ent` |
| MAMA GORBO | pat, 1.3, 1.2 | jelly, 5.45, 1 | Planter | Visits and hosts; Gorbo meetings |
| GOOWARD | pat, 1.6, 1.1 | bounce, 5.45, 1.1 | Planter | Visits and hosts; Gorbo meetings |
| GEMTOE | scatter, 2.4, 1 | twirl, 2.7, 1 | Planter | Visits and hosts |
| MONTGUMMERY | pat, 1.9, 1 | Built-in robot (`OWN_DANCE`) | Planter | Visits and hosts |
| ETCHER | pat, 2.1, 0.9 | Built-in tentacle dance (`OWN_DANCE`) | Planter | Visits and hosts |
| GLYPH | dig, 2.3, 1 | Built-in macarena (`OWN_DANCE`) | Planter | Visits and hosts |
| KING DINO | none | none | `AT_POST` (drums) | Host only (`STAYS`) |
| FORTIZMO | none | none | `NO_PLANT`; plays the horn | Visits and hosts by her `via` |
| SOMLET | none | none | `AT_POST` (asleep) | Host only (`STAYS`) |
| MUSHROOM | pat, 1.8, 1 | shimmy, 5.45, 1 | Planter | Visits and hosts; jumps off the desk first |
| ZOLLOD | dig, 3, 0.8 | groove, 5.45, 0.9 | Planter | Only once `Kt.shyFree`; counts half |
| ANOMALEE | dig, 1.5, 1; eat, 2.6, 1 once `Kt.rewards.snacks` | stomp, 5.45, 1 | Planter; eats pizza once Snacks is complete | Visits and hosts |
| HENNRICK | pat, 1.4, 1.2 | Built-in side-to-side roll (`OWN_DANCE`) | Planter | Visits and hosts |
| NEXTESSA | none | none | Absent | None |
| BACKPACKA | none | none | The climax | None |
| THE ANCIENT | none | none | Unchanged | Host only (`STAYS`), in one round in eight |

- Speeds are in rad/s of game time: 5.45 rad/s is one bob per beat at KING DINO's 104 BPM, 2.7 rad/s half time; size
  scales the whole-body offset. Tables `MOVES`, `DANCES` and `OWN_DANCE`; unlisted keys default to dig, 1.8, 1 and
  bounce, 5.45, 1 ([construction.md](construction.md#planting-and-dancing-layer)).
- Event roles: `NO_PLANT = ["frog"]`, `AT_POST = ["m_kingdino", "m_somlet"]` (`JGP.eventActor`); the courier is
  skipped by the Event driver. See [construction.md](construction.md#roles).
- Visits: `WHO` lists the fifteen participants; `STAYS = ["m_kingdino", "m_somlet", "slug"]` never leave, so a pair of
  two `STAYS` members never meets. See [construction.md](construction.md#visits).

## Shared wiring

This section lists the wrappers and flags every creature shares, so the per-creature sections can name them.

- **Wrappers:** the `modelScale` group is made at spawn; `userData.gW` (ground fit, `gFit`), `userData.tkW` (talk nod
  and happy spin, `tkAnim`), `userData.gcW` (planting and dancing move, `wt()`, footprint lift `kt()`) and
  `userData.vgW` (vignette turn and gesture) are each made on first use by moving the group's current children into
  a new group, so their nesting follows the order of first use. A model's own `step` runs inside all of them.
- **Ground fit:** `gFit` stands each creature on `JGP.groundAt`, at least 6 mm clear of its rest-pose lowest vertex;
  it is skipped while the group is above 0.3 m (MUSHROOM on his desk).
- **No shared idle layer:** `fo(e)` only holds each creature's outer group upright and at scale 1; no creature has
  engine-level breathing, idle actions or idle emotes (the owner's rule). Each model idles in its own `step`.
- **Per-frame flags** read by models and systems: `moving`, `busy`, `held`, `nearPlayer`, `gifting`, `giftAt`,
  `eventTalkAt`, `spinAt`, `planting`, `concertDance`, `battleDance`, `battleMove`, `vig`, `visiting`, `hosting`,
  `meeting`, `seek`, `goHome`, `gcNavHome`, `finaleSlot`, `watching`, `inside`.
- **Talk turn:** a creature turns to the player while held, except a gazer (`def.gazeUp`, unless gifting or during the
  Event) or SOMLET lying down (`lieK` > 0.5).
- **Gifts:** `te(ent, gift)`; ids `gorbo` and `p_mamagorbo` fire `Ie()` (eight `Nt.gooArc` shots in the def's `goo`
  palette); `drifter` sets `Kt.phone`. A Blossom to a Dancer (`Dbt.has`) starts a Dance battle after the thanks.
- **Event Talk:** the menu offers the `SCRIPT` `campfire` line; `Vt()` silences any creature without one, and
  FORTIZMO always.

## Per-creature wiring

This section gives, in cast order, each creature's spawn, states, quest hooks, test hooks and code constraints.

### SPARKAKUS

Design: [bible 3.2](../Bible/bible.md#32-sparkakus).

- **Spawn:** built inside the Library builder: group at Library local (0, −0.45), scale 1.16, `keepInFinale`; model
  from `so.born_sparkakus`. A fixed body (r 0.9 m, `"shopkeeper"`) in `uo.fixed`; the Library station `stump` with a
  6.6 m keep-clear zone. Script and lines in `i` (`ask`, `progress`, `finale`, `speech`, `gemGot`, `done`, `gift`,
  `giftAway`, `event`).
- **Worker `st`:** `st.join(o, face, path, sp)` sends him out (back to his place first, then by the front);
  `st.leave(path, sp)` brings him home; `wayOut(x, z)` plans his own route, leaving the church by the X first if he is
  inside; `st.there()`, `st.away()`, `st.atHome()`, `st.pos()`.
- **Browsing:** with nobody needing him he walks to a new spot in the floor band every few seconds (first after
  3 to 7 s), each straight walk 0.8 m clear of every bookcase, and faces the nearest bookcase on arrival.
- **Blossom:** `st.romp(done)` runs his lap (on all fours, round an ellipse of radii 4.4 and 1.0 m centred at local
  z −0.78) only when `st.atHome()`; otherwise `te()` answers with `i.giftAway` and no lap.
- **Quest:** his Talk follows `Kt.artifacts`; with all three, `Bulb.start` and `ARTS.assemble` run the finale and
  `Bulb.hold` blocks Talk, Blossom and visits until the Gem speech ends
  ([construction.md](construction.md#ancient-artifacts-chain)).
- **Visits and vignettes:** `st.ent` (id `keeper`, height 3.1 m) is a marker kept at his world position whose `vgW`
  wraps his model; `stay()` and `browse()` pause and resume browsing; a host is released only by the visit that
  claimed it (`h.hostQ`).
- **Event:** he plants and dances only while `st.away() && me.active && bt.seeds`; his move key is `keeper`, and
  `st.dancing` carries the dance weight into his model. `xo` speaks his `i.event` line in the garden while his
  station is hidden.

### MAMA GORBO

Design: [bible 3.3](../Bible/bible.md#33-mama-gorbo).

- **Spawn:** `ROWS.lineup`; def `goo` `["#36d0e8", "#e8409e", "#9a52e0", "#a8e830", "#ff9f5c"]`.
- **Roaming:** `JGP.parkRoam`: 5 to 16 m from where she stands, `roamFree`, a clear straight walk off the dance floor
  (`offFloor`), clear of the other park roamers (`JGP.roamApart` over `PARK_ROAMERS`); faces the direction of travel.
- **Gorbo meetings** (with GOOWARD): first due at 20 to 40 s of game time, then 20 to 40 s after each meeting. When
  due, both set `seek` and their pickers take the spot nearest the other. If both are free and more than 16 m apart,
  MAMA GORBO first takes a planned walk (`Be`) to open ground a few metres from GOOWARD, nearest her (retried at most
  every 20 s, `farAt`), since he keeps to GOOWARD'S GALLERY. Once both are free a meeting spot pair is found between
  them; both set `meeting`, walk there and face each other (deadline: distance + 30 s). Together they take four
  throws in turn (two each way), each a volley of three goo balls (`Nt.gooArc`, count 3, in the thrower's `def.goo`)
  with a "blorp", each followed by a pink heart over the catcher. Anything
  that takes either away (busy, vignette, visit, host, the Event) calls it off for 40 s. `JGP.meetAt(t)` sets the
  next meeting time.
- **Gift:** `Ie()` from `te()` (id match).
- **Script:** her fourth Talk line hints at OVERCOMING SHYNESS.

### GOOWARD

Design: [bible 3.4](../Bible/bible.md#34-gooward).

- **Spawn:** the engine's own def `e.gorbo` (kind `companion`), overlaid by `ROWS.final`; the engine def supplies his
  `goo` palette (seven colours: `#37b3e8`, `#ff5fb0`, `#a8e830`, `#f2c72e`, `#8a3ffc`, `#35d0c5`, `#ff7a2f`).
- **Roaming:** `JGP.galleryRoam`: 6.6 to 10 m from the Gallery's centre (`KIOSK_AT.K.gallery`, (31, 14.5)), within
  ±110° of its facing (front or sides, never behind or inside), at least 2.5 m from where he stands, clear of the park
  roamers, with a clear straight walk off the dance floor; he faces the Gallery on arrival.
- **Home ground:** he must stay within 12 m of `KIOSK_AT.K.gallery` on `roamFree` ground; off it for 4 s idle (20 s
  walking), the guard sends him home.
- **Meetings:** as MAMA GORBO's partner; while seeking, his picker keeps to the Gallery ring and takes the spot
  nearest her.
- **Gift:** `Ie()` from `te()` (id match).

### GEMTOE

Design: [bible 3.5](../Bible/bible.md#35-gemtoe).

- **Roaming:** `JGP.parkRoam` (as MAMA GORBO); a park roamer for `JGP.roamApart`.
- **Gem trade:** a Talk while `Kt.gem` is set plays `gemTrade` instead of her line: `Kt.gem` false,
  `Kt.rewards.stone` true, then `spinAt` starts the happy spin (one full turn with a hop, 1.4 s, in `tkAnim`) as the
  "Summoning Stone obtained!" line opens.

### MONTGUMMERY

Design: [bible 3.6](../Bible/bible.md#36-montgummery).

- **Model:** `PK_MONT`, registered as `pk_mont` with the packaged models; the screen face is drawn once per state into
  its own texture and swapped in.
- **Screen states** (priority order): shovel while `planting` or for 5 s after `eventTalkAt`; the battle move
  (`rock`, `scissors`, `paper`) while dancing with a `battleMove` set; robot while dancing (`gcDw` > 0.05) or for 5 s
  after `giftAt`; otherwise idle, the mouth following `tkS`.
- **Roaming:** `JGP.floorRoam`: on the dance floor (`JGP.floor`, kept 0.4 m + `bodyR` in from its edges), 3 to 12 m
  away, clear of the other two Dancers' positions and targets; faces the direction of travel.
- **Dance battle:** `battleText.w_mont` (stamina 10, bar "Robot steps left", `#55b8c6`, hit sound `drumSnare`).
  `Dbt` sets `battleDance` and `battleMove`; a win leaves `battleDance` set for 7 s (victory dance). The first win
  adds him to `Kt.danceWins` and increments `Kt.artifacts` ([construction.md](construction.md#dance-battles)).
- **Event:** built-in dance (`OWN_DANCE`): the move wrapper is held at identity and only footprint-lifted.

### ETCHER

Design: [bible 3.7](../Bible/bible.md#37-etcher).

- **Roaming and Event:** as MONTGUMMERY (`JGP.floorRoam`, `OWN_DANCE`).
- **Dance battle:** `battleText.p_etcher` (stamina 10, bar "Tentacle twists left", `#7a4ab8`, hit sound `drumTom`);
  the model reads `battleMove`.

### GLYPH

Design: [bible 3.8](../Bible/bible.md#38-glyph).

- **Roaming and Event:** as MONTGUMMERY (`JGP.floorRoam`, `OWN_DANCE`).
- **Dance battle:** `battleText.p_glyph` (stamina 10, bar "Macarena moves left", `#e88a8a`, hit sound `drumKick`);
  the model reads `battleMove`.

### KING DINO

Design: [bible 3.9](../Bible/bible.md#39-king-dino).

- **Post:** at (−36.35, 19.2) behind the drum kit (kit at (−34.8, 19.2), scale 1.35, `keepInFinale`); `JGP.rug`
  gives the rug's centre, reach and top for `JGP.groundAt`.
- **Drumming:** a per-frame callback sets `DRUMS.on` when the player (or the VR head) is within 45 m of the kit or a
  Dance battle or victory dance is on, and never while FORTIZMO's horn is raised or her notes are sounding
  (`ee.playing`, `ee.pendingNotes()`, `frog.hornWant`). `JAZZ.update` fires hits; each voice maps to a kit part and a
  hand (`PART`), counting `DRUMS.r` for his left arm (+x: ride, ride bell, crash, floor tom) and `DRUMS.l` for his
  right arm (−x: snare, brush, rack toms); the kick and hi-hat move no arm. His model strikes with that arm on each
  count change, nods its body on left-arm strokes, and plays only while not walking. See
  [construction.md](construction.md#king-dinos-jazz).
- **Constraints:** `AT_POST` at the Event; in `STAYS` for visits; vignettes never turn or gesture him (a bow would tip
  his sticks into the kit).
- **Test hook:** `JGP.jazz.state` (`clock`, `bar`, `gain`, `part`, `ahead`).

### FORTIZMO

Design: [bible 3.10](../Bible/bible.md#310-fortizmo).

- **Wrapper:** `fortizmoPick` builds `pk_fortizmo`, then recomputes every mesh's bounding sphere and enlarges its
  radius by 1.3, because her geometry is sculpted after its bounds are computed and her horn bends at runtime; without
  this, taps on her outer body miss her.
- **Patrol:** her `home` moves along the aisle behind the Juice Bar (x of `JGP.barSpot(0)`): after 3 to 8 s at a spot
  she picks a z in −7.6 to 7.6 m at least 3 m away, then faces the dance floor. Suspended while busy, in a vignette,
  visiting, hosting, at the Event, with the player near or in her dialogue.
- **Event:** `NO_PLANT`; `finaleSlot` (−17.3, 0) on the bar side of the garden, `walkSpeed` 1 m/s. `gcHorn.play()`
  sets `hornWant` only with Seeds in (phases `raising`, `playing` once `hornK` reaches 1, `lowering`, `off`); the
  horn phase waits for her to reach her slot, at most 15 s beyond the 20 s of planting. `gcHorn.finish()` stops the
  tune. See [construction.md](construction.md#fortizmos-horn).
- **Talk:** no `campfire` line; `Vt()` gives her no menu during the Event.

### SOMLET

Design: [bible 3.11](../Bible/bible.md#311-somlet).

- **Post:** 3.9 m in front of the Post Office; `AT_POST` at the Event; in `STAYS`.
- **Lying down:** her `step` computes `lie` (0 standing, 1 on her side) only when resting at her spot (not busy,
  heading home, in a vignette, visiting or moving, within 0.6 m of `home`); it settles at 1.3/s and rises at 4/s.
  She publishes `ent.lieK` and `ent.lieR` (1.55 m × settle); the body push radius uses `lieR`, any walk is held while
  `lieK` > 0.25, and she does not turn to the player while `lieK` > 0.5.
- **Blossom:** her eyes open only while `gifting`, the dialogue is open and she is `xe.lastTarget`; lids hide as the
  eyes open.

### MUSHROOM

Design: [bible 3.12](../Bible/bible.md#312-mushroom).

- **Post:** on the Sheriff's desk (`standY` 1.545: desk top 1.5 m, feet 4.5 cm under his origin); `gFit` does not
  apply while he is up. A posted creature with a `y` drops to the ground when busy (other than the Event) or heading
  home.
- **Exit:** `via` `"kiosk-front:sheriff"`; leaving for a visit, as visitor or host, he first jumps off the desk
  front (an 0.8 s arc) to the first `via` point, and on return regains his height on the last leg
  ([construction.md](construction.md#visits)).
- **Quest:** a Blossom (`te`, id `drifter`) sets `Kt.phone`, which opens the phone booth to NEXTESSA.

### ZOLLOD

Design: [bible 3.13](../Bible/bible.md#313-zollod).

- **Identity:** no `id`; `def.__type` `"cutebex"`. Find him with `Xt(ent)` or `It.all.find(e => e.def.__type ===
  "cutebex")`; `Xt` returns `cutebex` as his planting and dancing key.
- **Shyness** (`Kt.shyFree` false): his menu is one "Talk to ZOLLOD" entry ("…|…|I'm shy…"), no Blossom; the
  `gshop` station is hidden; `VIGS.lineUp` drops `ZL`; visits refuse him as visitor or host. The first Talk with
  `Kt.shyBook` set sets `Kt.shyFree` ([construction.md](construction.md#shyness-sub-quest)).
- **Freed:** outside the Event his single menu entry opens the shop (`ne.open()`) wherever he is; `heldBy` keeps him
  still while the shop panel is open. Visit selection counts his visits and his pairs' plays at half weight, so he
  meets others about twice as often.
- **Event:** a planter; Talk gives his `campfire` line instead of the shop.

### ANOMALEE

Design: [bible 3.14](../Bible/bible.md#314-anomalee).

- **Wrapper:** `anomaleePeg` builds `pk_anomalee`, then:
  - replaces the hidden hip group at (0.45, −0.55) (her back leg on her left, +x; the code comment's "back-right" is
    the viewer's side) with the peg leg, keeping the hip's walk swing;
  - swaps the magenta screen material for the scanline canvas; applies the plastic surface (`texturize`);
  - with `def.gazeUp` (0.6 rad), tips the head group back while she stands free, easing level (rate 2.5/s) when she
    walks, is busy, or speaks her Blossom line or any Event line.
- **Talk:** `SCRIPT.blinker.sad` = 1: her second line plays a falling triangle phrase (392, 349, 311, 262 Hz) over a
  131 Hz hum.
- **Event:** with `Kt.rewards.snacks`, `plantMove` gives her `["eat", 2.6, 1]` and `PIZZA` sets her own open box;
  pizza-box stacks stand outside the garden's stone ring as fixed bodies.

### HENNRICK

Design: [bible 3.15](../Bible/bible.md#315-hennrick).

- **Roaming:** `JGP.portalRoam`: 3.2 to 6 m from the Portal, at least 2.5 m from where he stands, never in its
  doorway or the lane in front of it (NEXTESSA's), with a straight walk that does not cross the frame; he faces the
  Portal on arrival. Home ground: within 9 m of the Portal.
- **Event:** a planter; built-in dance (`OWN_DANCE`).

### NEXTESSA

Design: [bible 3.16](../Bible/bible.md#316-nextessa).

- **Def:** `s` (name, `color`, `builder`, `bodyR`, `modelScale`, lines `blocked`, `call`, `busy`, `arrive`,
  `snacks` 20).
- **Phone:** without `Kt.phone` the booth shows `s.blocked`; while a courier exists or a call is pending, `s.busy`.
  A call opens the Portal and spawns her 30 s later (`at()` sets `t.pizza.callDelayMs` to 30 000 ms, overriding the
  config's 1 800) unless the Event has begun.
- **Courier:** `It.spawn({id: null, kind: "courier"})` with the pizza box on her head. States `arriving` (3.2 m/s,
  round buildings, stops 2.3 m from the player), `waiting` (while a panel or dialogue is up), `speaking` (sets
  `Kt.rewards.snacks`, opens `s.arrive`; the box leaves her head), `leaving` (3.6 m/s, back through the Portal). She
  gives up after 100 s (`giveUpS`) if never served.
- **Exclusions:** skipped by the Event driver; not in `WHO`, `NAMES` or `PAIRS`; never in the park otherwise.

### BACKPACKA

Design: [bible 3.17](../Bible/bible.md#317-backpacka).

- **Build:** `BP.make()` runs in the Event's phase 2 (the horn and ring dance), followed by `warm()` to compile his
  shaders before the music starts; a mid-song compile stall makes the audio crackle. He is not an `It` entity.
- **Timeline** `BP.D` (s since he set off): `inA` 16, `down` 20, `drink` 34, `up` 38, `toGarden` 50, `splay` 52,
  `spray` 67, `unsplay` 69.5, `gone` 84; `pose(e, dt)` is a pure function of that time. At `gone` he is hidden; at
  `gone` + 2.5 s FORTIZMO's tag starts (`ee.outro()`) and the Event wraps when it ends, at most 15 s later
  ([construction.md](construction.md#timeline)).
- **Test hooks:** `JGP.backpacka.preview(e)` builds him if needed, poses him at time `e` and returns his root (no side
  effects beyond the effects' state); `JGP.backpacka.start(now)`, `.busy()`, `.shape`, `.D`.

### THE ANCIENT

Design: [bible 3.18](../Bible/bible.md#318-the-ancient).

- **Build:** made by the church builder inside the secret room; the room and THE ANCIENT are locked together. Not an
  `It` entity.
- **Station `slug`:** r 3.2 m, `solidR` 0.6, `pickObj` its body and head; the Talk label shows only with the player
  inside the room (a 16 m VR pointer would otherwise reach through the walls). Talk: "I am the one reborn.", or
  "Hello" during the Event; a Blossom answers "...".
- **State:** `talking` while its dialogue is open or until a visit's `chat(sec)` time; weight `kT` eases at 3/s and
  lifts the head; idle stalk, mantle, pore, tail and head motion run from absolute time. It never moves, turns,
  dances or plants.
- **Visits:** `JGP.slug.ent` (id `slug`, `bodyR` 1.1, height 0.7, an empty `vgW`); called on in one round in eight;
  `JGP.slug.visit(vr)` returns the outside point, the way in through the X and the visitor's spot. Vignettes never
  turn or gesture it.
- **Test hook:** `JGP.slug` (`body`, `head`, `mantle`, `stalks`, `mode()`, `chat(sec)`, `ent`, `visit(vr)`).

## The birds

Design: [bible 3.19](../Bible/bible.md#319-the-birds).

One Blue Jay lives on the maple by the north-east corner, anchored to a bough at (31, −33.5).
Its blue crest and back, pale face and breast, dark collar, barred wings/tail and pale tail corners identify it.
Static geometry is batched within independent body, head, tail and folded-wing pivots. Feet remain fixed;
breathing, head turns, tail balancing and small wing adjustments never displace it from its tree.
It is scenery, not an `It` entity: no Talk, visits or quests. It remains present during the Event.
Robin and Cardinal and their builders have been removed; their model locks are retired.

## The player's avatar

Design: [bible 3.20](../Bible/bible.md#320-the-players-avatar).

- Part of the final game (`At`, built outside the test-mode fences): hidden during VR play, shown in the Shop's mirror
  while the Shop menu is open (VR included), and the third-person figure in the test modes (`dk.on`). It must never be
  cut with the test modes; only its walk animation `dkAnim` is test-mode code.
- **`dkAnim(t, amt)`** drives `At.userData` parts: `legL`, `legR`, `armL`, `armR` (held out 0.21 rad), `skirt`,
  `head`, `ponyL`, `ponyR`, `eyes`. The walk weight `dk.wk` eases at 8/s; blinks last 0.12 s, every 2 to 5 s.
- **Bob:** `dk.bobY` is applied to `At.position.y` in the render pre-pass (`o.post`), after the player step has reset
  it to 0 for collisions; the bob must never be applied earlier.
- **Outfits:** shop items `flowerhat` (slot `hat`), `sundress` (`dress`) and `frogshoes` (`shoes`), 3 Flint each, put
  on by `Eo`; without the Sun Dress the dress material takes the base print (`baseTex`), never a bare colour.

## v0.2 creature refinements

- ZOLLOD keeps his approved silhouette and colours with an independent torso/pelvis, elbow and wrist motion,
  articulated forefeet and toe roll. Gait strength eases rather than switching on abruptly. Existing hips,
  knees and ankles remain active. The body and shoulder foliage counter-sway with the stride.
- ETCHER retains all scales. Two small upper body scales carry low contrast marks: one Bitcoin, one Ethereum.
  The marks sit above the curved scale surfaces, each 6.5 cm across, rather than dominating his appearance.
- The Ancient's skin canvas is 512 × 128, granular near-black olive with long fine striations and a damp sheen.
  Angular pale and grey stones are embedded in the Cave floor. All rooted stalks and interaction/collision
  routes remain; the Ancient still never dances, plants or leaves its spot.
- GEMTOE's fixed home is the gazebo at (5, −31). A three-point route through its open front serves visits,
  returns and Event travel. She runs the First Bank of Greeblis; she continues to trade the Ancient Gem.
- Ordinary Talk adds a biology or mechanical line for each normal speaker. GOOWARD's and SOMLET's physical
  descriptions preserve their limited voices. SPARKAKUS appends ordinary pages after quest guidance; ZOLLOD
  has a separate Talk choice after the book frees him; the Ancient alternates its two normal lines.
