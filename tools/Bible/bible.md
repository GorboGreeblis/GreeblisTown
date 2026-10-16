# The Greeblis Bible

## 0. Scope and conventions

This document is the canonical reference for the Greeblis world: its lore, its creatures, its game design and its
style. It is canonical for Greeblis Town and every future Greeblis game. Owner-established lore takes precedence over implementation. Changes to canon require the owner's approval. All information needed to understand this world is contained here, including standing design rules in section 8.

| Part | Holds |
| --- | --- |
| 1. The world | Setting, places, history, factions, faith, motifs, objects, written things, canon facts |
| 2. The cast | Who each creature is: kind, role, personality, voice, lines, and every relationship |
| 3. Creature design | How every creature is built: the creature-making system and one full specification per creature |
| 4. Creature style | The visual and motion language every creature shares, and the checklist for a new creature |
| 5. Game design | Loop, interaction, quests, battles, the Garden Event and life in the park |
| 6. World style | Environment, audio, interface, writing and the quality bar |
| 7. Starting a new Greeblis game | The procedure for carrying the world into a new game |
| 8. Standing rules and current additions | Binding development/release rules, current canon and approved updates |

**Conventions**

| Topic | Convention |
| --- | --- |
| Units | Metres, seconds, radians and rad/s unless marked otherwise. "In game" values include the creature's model scale. |
| Heights | "In-game height" is the declared height × `modelScale` (the name-tag height); the visible top is given separately where it differs. |
| Axes | +y is up. Every creature model faces +z in its own frame. |
| Sides | Always the creature's own: its right is −x and its left is +x, so a viewer facing it sees its right on the viewer's left. The axis is given in brackets where it matters, e.g. "his right shoulder (−x)". |
| Colours | Hex values in backticks, e.g. `#30b4e4`. |
| Shininess | Phong shininess. Scale and examples in 4.4. |
| Surfaces | The KIT surface kinds (scale, fur, feather, fabric, felt, metal, goo, skin, soft, plastic, rubber, wood, leaf, stone, sand, soil, grass) unless a bespoke canvas is named (3.1). |
| Names | Creature names in capitals (GOOWARD). Code identifiers in backticks (`JGP.galleryRoam`). |
| Locked | A locked model is final: its parts, proportions and palette change only with the owner's approval; animation changes on request are allowed (section 8). Individual approved model locks apply until explicitly changed by the owner. All designs lock at release. Robin and Cardinal are retired and unlocked; the owner has authorized ZOLLOD, Ancient/Cave and ETCHER changes. |
| Quotations | Dialogue is quoted verbatim from the game. ` / ` marks a page break within one line. |


## 1. The world

This part is the canonical reference for the Greeblis world as Greeblis Town establishes it: setting, places, history,
factions, faith, motifs, objects, written things, fixed canon and running jokes. Who each creature is and how the
creatures relate is in part 2; how they are built is in part 3.

Conventions for this part:
- Quotations are the game's own text, character for character (curly or straight quotes, "…" or "...", as the code
  has them). Where a line runs over several pages of the dialogue box, the pages are joined with a space.
- Compass directions are those of the world: north is −z, east is +x; the garden's centre is (0, 0). Positions are
  given as (x, z) in metres where they help.
- Every fact is stated once; other sections cross-reference it by number.

Contents: [1.1 Setting](#11-setting) · [1.2 Greeblis Park](#12-greeblis-park) ·
[1.3 The Portal and the Summoning Pillar](#13-the-portal-and-the-summoning-pillar) ·
[1.4 The five kiosks](#14-the-five-kiosks) ·
[1.5 The Juice Bar, the dance floor and the phone booth](#15-the-juice-bar-the-dance-floor-and-the-phone-booth) ·
[1.6 The church](#16-the-church) · [1.7 The town](#17-the-town) ·
[1.8 History, the ages and the kinds of being](#18-history-the-ages-and-the-kinds-of-being) ·
[1.9 The Originator, the Traveler, the Sphinx and the faith](#19-the-originator-the-traveler-the-sphinx-and-the-faith) ·
[1.10 Factions and forces](#110-factions-and-forces) · [1.11 Motifs](#111-motifs) ·
[1.12 The Ancient Artifacts and the Ancient Gem](#112-the-ancient-artifacts-and-the-ancient-gem) ·
[1.13 Objects and items](#113-objects-and-items) ·
[1.14 The Garden Event and the legend of Backpacka](#114-the-garden-event-and-the-legend-of-backpacka) ·
[1.15 Written things](#115-written-things) · [1.16 Canon facts (fixed)](#116-canon-facts-fixed) ·
[1.17 Running jokes](#117-running-jokes) · [1.18 GOOWARD's painting](#118-goowards-painting)

### 1.1 Setting

This section fixes where and when the game takes place, what the world is, and who lives in the town.

**Place.** **Greeblis Town** is a small American town in the Midwest, built round a fenced park that serves as its
square. The area the game takes place in is **Greeblis Park** (1.2):
> "What a beautiful day in Greeblis Park!" (MAMA GORBO)

The streets round the park hold the creatures' shops, trades and homes (1.7); beyond them open prairie runs to the
horizon, and the four streets run on as county roads with gravel shoulders.

**World.** **Greeblis** is a whole world of many biomes; the town and its park are one small corner of one of them.
It is a Digital World. Every creature, including Organics, Synthetics and THE ANCIENT, is a Digital Creature born from code. This underlying truth is scarcely known or understood by its inhabitants. Eons have passed since the beginning, so many that no one remembers how long anything has been as it is.

**Sky and solar system.** Greeblis has one sun and no moon. Its solar system also holds one gas giant and the dead
world the Originator came from (1.9).

**Time.** Time is the world's great puzzle. Greeblis Town sits in a long history of ages (1.8); the Portal (1.3)
carries creatures between places and times. To a visitor from the far past, this small town is the far future:
> "In my era, the towers of Greeblis City reach the clouds. I never imagined the far future would have… picket
> fences." (HENNRICK)

**Money.** **Flint** is the main currency of this time period (1.11). The Juice Bar alone takes only Blossoms (1.5).

**Beings.** The creatures are **Ancients, Synthetics or Organics** (1.8), and code runs under all of them:
"BEINGS of CODE." (ANOMALEE); "We are all digital monsters." (MONTGUMMERY). Humans, Earth animals and aliens live on
Greeblis too, and are distinguished from the main creature cast (1.8).

**Ordinary lives.** The creatures live ordinary small-town lives on top of deep, strange history.

| Creature | Trade, post or standing in town |
| --- | --- |
| SPARKAKUS | The town's librarian, at the Library in the park (1.4); a member of the genealogical society (1.7). |
| MAMA GORBO | Runs the town's Mistergummery's on her own (1.7). |
| GOOWARD | Runs the town's Art Gallery, GOOWARD'S GALLERY in the park (1.4). |
| GEMTOE | Runs the First Bank of Greeblis and keeps the gem exchange on Main Street (1.7) and a hoard of amethysts; inventor of Avarice (1.11). |
| MONTGUMMERY | Runs the town's video store (1.7); his father founded Mistergummery's. |
| ETCHER | Works in data preservation; the archive on Main Street is his (1.7). |
| GLYPH | The Master of symbols; the sign shop on Main Street is his (1.7). |
| KING DINO | Famous jazz musician; drums at the Juice Bar to play off his bar tab (1.5); billed at the picture house (1.7). |
| FORTIZMO | Runs the Juice Bar (1.5); famous jazz musician on her horn. |
| SOMLET | The mail carrier at the Post Office (1.4), always asleep. |
| MUSHROOM | The town's sheriff and the Consortium's deputy (1.10). |
| ZOLLOD | Keeps Garden Supplies (1.4) and the grocer's (1.7); grows plants at his nursery (1.7). |
| ANOMALEE | Runs the television repair (1.7); the oldest known Synthetic (1.8). |
| HENNRICK | A researcher from the far past, stranded at the Portal (1.3); not of the town. |
| NEXTESSA | Runs an inter-temporal pizza shop in the far future (1.5); not of the town. |
| BACKPACKA | The legendary visitor of the Garden Event (1.14); not in the park otherwise. |
| THE ANCIENT | Lies in the Cave (1.6); never leaves it. |

**Tone.** Gentle, dry and absurd: ancient relics fixed with school glue, a sheriff who takes bribes in flowers, a
monster who rewinds a tape before eating it.

### 1.2 Greeblis Park

This section lists every place and fixture inside the park fence. The park is the play area: a mowed green inside an
iron fence (about 75 m east to west and 87 m north to south), crossed by walks, with the garden at its heart.

| Place | Where | Canon |
| --- | --- | --- |
| **The fence** | All round | Black iron pickets between brick pillars. It marks the edge of the park; the church stands with its back to the south side. |
| **The walks** | — | A ring walk round the garden, with a walk out to each place there is to go: the LIBRARY (north-west), the POST OFFICE and the SHERIFF'S (north-east, ending in a cross walk along both their fronts), GARDEN SUPPLIES (south-east), GOOWARD'S GALLERY (east) and the church (south). Every walk ends at the front of what it leads to. |
| **The lawn** | — | Short tufts, clover and dandelions, mowed in stripes. |
| **The garden** | Centre, radius 15 m | Tilled rows in raised rings, four stepping-stone paths from its edge to its centre, a border of stones, without marker sticks or beige pineapple-shaped ornaments. The Summoning Pillar stands at its centre (1.3). After the first Garden Event it holds that Event's flowers for good (1.14). |
| **The duck pond** | East, (29.6, −2.6): centred between the Post Office and GOOWARD'S GALLERY | A grassy bank, limestone rocks, an open shoreline without a dock, lily pads or bulrushes. The water only breathes in colour: no ripples, nothing rising out of it, and no ducks. BACKPACKA drinks from it (1.14). |
| **The Portal** | North-west of the garden, about (−9.4, −29.6) | The gateway between places and times (1.3). HENNRICK strolls round it. |
| **The gazebo** | North, (5, −31) | GEMTOE's home, with a “Gemtoe's Gazebo” sign and stacks of gold coins. White and octagonal on a low board deck, eight posts, railings, a green shingle roof, a small cupola and a gold ball on top. |
| **The Juice Bar and dance floor** | West side | FORTIZMO's open-air bar, its purple dance floor and KING DINO's drum kit (1.5). |
| **The phone booth** | South-west of the garden, (−7.2, 23.9) | The way to call NEXTESSA's pizza shop (1.5). |
| **The five kiosks** | Corners and east side | The LIBRARY, the POST OFFICE, the SHERIFF'S, GARDEN SUPPLIES and GOOWARD'S GALLERY (1.4). |
| **The church** | End of the south walk | Gothic Revival, with its windows and the Cave (1.6). |

**Furnishings.**
- ZOLLOD's hanging baskets on four posts: an iron arm, a chain, a coir basket and a dome of pinks.
- A hydrant and a blue mailbox by the south walk.
- SOMLET's mail cart at the kerb opposite the Post Office, its sack slumped, two letters dropped beside it.
- SPARKAKUS's paw prints set in the north sidewalk by the Library's corner: a lope heading east.

**The trees.** Big park trees stand by the fence corners and the south walk; one more fills the open corner between
the church and the dance floor's south end, so that side of the park never looks empty.

**The birds.** A Blue Jay stays on a bough of one park tree, with small idle, head and wing animations. It never leaves its tree. The robin and cardinal are no longer part of the park.

**The player's arrival.** The player enters just inside the west fence, north of the Juice Bar, facing KING DINO's
billboard across the road (1.7): the billboard is the first thing seen, and the park is a surprise behind them.

**The UFO.** A chrome saucer crosses the sky about every ten minutes: it drifts in out of the haze, stops to wobble
over the town, then zips off over the far horizon. Its sunlit top is plain chrome with panel seams and a ring of
eighteen coloured bulbs round its rim; its shaded underside glows faintly, with three pods and a pulsing glow. Under
its glass dome sits its pilot, a little green alien (big black almond eyes, two antennae with yellow tips). It never
comes during the Garden Event. Its meaning: 1.10.

**Pickups.** Blossoms and Flint (1.11) grow round the park and regrow elsewhere after a while. They never grow inside
the garden's stone ring, on the dance floor, under a creature, or where HENNRICK strolls.

### 1.3 The Portal and the Summoning Pillar

This section covers the park's two ancient-looking structures and the flowers the Garden Event raises.

**The Portal.** Built during the age of the Synthetics, a grey stone gateway 3.7 m wide (two pillars and a lintel, with cyan panels), standing north-west of
the garden and turned to face it. When it opens it fills with a blue swirl, its rings glow pale cyan under a blue
light, and a rising chord sounds; a falling one closes it. It carries creatures from one place or one time to
another: HENNRICK came through it from the far past, NEXTESSA comes through it from the far future, and some other aliens
have come through it too (1.8). Ollaag’s people travel in UFOs and do not use Portals.
- It is locked on the Consortium's orders (1.10):
  > "All travel through the Portal is locked down until further notice." (MUSHROOM)
- A Blossom bribes the Sheriff into opening it: "A bribe? …Portal is now open to your use." Until then the phone
  cannot reach the far future: "*connection to the Portal seems blocked*".
- Once it is open, NEXTESSA comes through it 30 s after a call, with the pizza (1.5); the lane in front of it is kept
  clear for her.
- HENNRICK, stranded on this side, strolls from spot to spot round it (never in its doorway or her lane) and stops
  facing it.
- THE ANCIENT, in its scripted exchange with MUSHROOM: "No Portal can hold the one reborn." (1.6)

**The Summoning Pillar (the structure).** Built during the age of Dinosaurs, a six-sided standing stone on a round plinth at the garden's centre, carved on
three faces with rows of rune strokes: shapes, never letters. The runes stay dark until the player uses the stone
while holding the Summoning Stone (the item, 1.13); then they light up, breathe softly ever after, and blaze while the
Garden Event runs. Used without the item:
> "The runes stay dark. Only the Summoning Stone can wake them and start the gardening event."

**The Event flowers.** At the first Garden Event one flower comes up for each creature that plants, where it planted,
of one of five kinds picked at random, drawn at 2.4 times their modelled size. The five plant models are locked
(section 8).

| Kind | Canon |
| --- | --- |
| Creeping thistle | Three stems from a rosette of spiny, deeply lobed leaves; loose sprays of fluffy pink-mauve puffs on purplish buds, a few gone to tan seed fluff. |
| Scentless mayweed | A sprawl of stems over fine, feathery thread-leaves; daisy heads of white rays round domed yellow centres, the older heads' rays swept back. |
| Chicory | Stiff, bare, branching stems; sky-blue flowers of strap-shaped rays with square toothed tips round pale blue stamens. |
| Common milkweed | A stout stem with broad oval leaves in opposite pairs; a round umbel of small dusky mauve flowers under white-pink crowns. |
| Zebra mallow | An upright stem with round scalloped leaves; flowers of five broad notched petals, pale pink streaked with dark purple veins. |

The same five flowers make the town seal and bloom on the schoolhouse mural (1.7).

### 1.4 The five kiosks

This section describes the five kiosks and what each shows. Four share one frame: a plank deck, a back wall, half side
walls, white posts, a tin roof with the kiosk's sign standing on its ridge, and a counter with crates either side.
The Post Office and Garden Supplies have board-and-batten back walls; the Sheriff's and the Gallery have plain ones.
The Gallery has no counter, and its frame is 2 m wider than the others' (8 m), for its wide canvas. The Library is an
open reading ground instead. Only a kiosk's keeper stands inside it;
GOOWARD keeps the Gallery from the lawn outside.

| Kiosk | Keeper | What it shows |
| --- | --- | --- |
| **LIBRARY** (north-west, (−24.8, −24.8)) | SPARKAKUS | An open reading ground with no walls, roof or raised floor. Eight freestanding double-sided bookcases of big books stand round the librarian (two rows behind him, a row down each side); the **LIBRARY** banner stands on two posts behind them, high enough to show over them. A rug lies over the ground: a deep red field printed with paisley teardrops, small red flowers and gold fern sprigs; a striped border (a navy band of red flowers and white dots, a teal band of red flowers); a great medallion of two paisleys curled round each other; cream lace round the field and a cream fringe at each end. Face-out on nine shelves stand six titled hardbacks (1.15) and three curiosities (1.13). |
| **POST OFFICE** (north-east) | SOMLET | Navy walls and a pink roof. From the front, a tidy kiosk: bundles of letters tied on the counter, stuffed sorting cubbies, parcels tied with twine, a blue collection box. Round the back, out of sight of the square, is the joke: a mountain of undelivered mail nearly as tall as the roof, faceted heaps of paper under loose envelopes, tied bundles and parcels stuck in its slopes, tall stacks leaning on its sides and an avalanche of letters fanned out round its foot. Five buried parcels carry readable labels (1.15). SOMLET sleeps in front of it. |
| **SHERIFF'S** (north-east, beside the Post Office) | MUSHROOM | A mushroom theme: a toadstool-red tin roof with white spots, mushroom-brown walls, toadstool stools, mushrooms sprouting round the posts and a giant one by the corner, small caps topping the sign posts, and **the Consortium's flag** flying from a pole behind the sign (1.10). A cowboy hat on the counter; papers, a lantern and a basket of mushrooms on the crates. A gold sheriff's star hangs on the plain back wall over the wanted posters (1.10). Its roof stands 1 m higher than the others' and its desk is raised (top 1.5 m up), so the Sheriff, standing on it, looks down on his visitors. |
| **GARDEN SUPPLIES** (south-east) | ZOLLOD | Sage walls and a terracotta roof, with plants everywhere: potted shrubs, flowers, ferns, succulents and little trees, seedling trays, a sunflower tray, hanging baskets, bags of soil and compost, a wheelbarrow of flowers out front, a rake and a shovel against the side wall. Among them grow **strange curiosities** in faded inks (pale blue, olive, red-brown, ochre, parchment): bare bulbous roots as big as the plant, striped cup blooms, an "eye of a flower" (a ringed blue eye on legs of forked roots), trumpet clusters on a knot of roots, a scaled bud on a hand of fat roots, a striped lantern bloom on an onion with a beard of roots. A parchment card on the counter is written in unread botanical script. The town's one shop (1.13); ZOLLOD is too shy to keep it until OVERCOMING SHYNESS frees him (1.13). |
| **GOOWARD'S GALLERY** (east, (31, 14.5), between the duck pond and Garden Supplies, opposite the Juice Bar) | GOOWARD | GOOWARD runs the town's Art Gallery. Cream walls with no battens and a violet tin roof, its sign in violet ink. No counter: the floor is open. One big canvas (6.9 m wide and 2.6 m tall), stretched on the back wall, carries **GOOWARD's painting** of the whole of Greeblis (1.18). On the lawn in front, either side of the walk up to it, two framed paintings of his stand on wooden easels, turned a little toward whoever comes up the walk: two small realistic landscape paintings (1.18); a third landscape stands on its easel outside the left wall, turned a little out toward the park. His paint cans lie about the lawn outside and on the Gallery's own floor (in the back corners under the canvas and along the side walls, the middle left clear; three of those are big buckets), some standing open with their colour run down the side, some tipped over; his brushes lie dropped among them, each with a blob of wet paint by its tip, and under the canvas a house painter's roller (its cover loaded with magenta) and a wide house-painting brush (cyan to its ferrule). Plentiful colourful goo splats cover its floor. GOOWARD painted every painting in it himself. GOOWARD never goes in; he wanders the lawn in front of it and to either side, and stops to look at it. |

### 1.5 The Juice Bar, the dance floor and the phone booth

This section covers the west-side bar, its dance floor and drum kit, and the phone that reaches the far future.

**THE JUICE BAR.** A long open-air bar on the west side, its back flush with the west fence, facing the garden, with no
roof. FORTIZMO tends it, walking up and down the aisle behind the counter.
- The 18 m counter is striped in fruit colours, with a brass foot rail, stools, and a gap with a raised flap where the
  bartender gets in and out. Behind it: cabinets, two shelves of juice bottles, a pair of big juice dispensers with
  taps, a blender and a bowl of fruit waiting to be juiced. On the counter: juice cups with striped straws and fruit
  slices on the rims, bowls, a pineapple and bananas. A crate of fruit and watermelons stand at each end.
- The sign on two tall posts at the back reads **JUICE BAR**, white outlined in red on a yellow-to-orange board, with
  fruit slices at either end and giant fruit on top, among it a giant strawberry.
- **House rules:** "We only accept Blossoms at this establishment." The house special: "Our house special is carrot
  juice on the rocks. Don’t tell the King it’s just carrots and ice." The carrots come from FORTIZMO's carrot patch
  and the grocer's (1.7). A Blossom given to FORTIZMO goes in the tip jar: "Add it to the tip jar."

**THE DANCE FLOOR.** The bar's patio: one rectangle of 10 by 32 dark purple tiles of 1.2 m, in thin darker grout, from
the bar's north end south for twice the bar's length. It is FORTIZMO's ("Quit etching my dancefloor, tentacles!"),
and the three Dancers (ETCHER, GLYPH, MONTGUMMERY) wander it. ETCHER etches every step on it: "It's data. Your floor
remembers every step."

**KING DINO's drum kit.** On a round rug on the grass behind the dance floor's south half, facing out across it: red
shells with white heads and chrome rims, **KING / DINO** on the bass drum head, two rack toms, a snare, a floor tom, a
hi-hat and a crash that he rides. He never leaves it. His piece, "Stomp at the Juice Bar" (104 BPM), is heard on the
dance floor and through every Dance battle, never while FORTIZMO plays her horn.

**The phone booth.** An American phone booth: a brushed aluminium frame on a concrete pad, glass on three sides, a
folding glass door facing the garden, and a lit **TELEPHONE** header on all four sides under a little dome. Inside: a
chrome payphone with a push-button keypad, coin slot and return chute, its handset on a coiled cord, and a shelf with
the phone book. Its prompt is "Call for pizza".

| State | Text |
| --- | --- |
| Portal still locked | "*connection to the Portal seems blocked*" |
| Call | "*Ring Ring* This is Nextessa’s inter-temporal pizza shop! One pie on your way." |
| Pie already on its way | "*no answer*" |
| NEXTESSA arrives through the Portal | "One hot and ready pie! * +20 Snacks * I love my job!" |

### 1.6 The church

This section covers the church building, its three stained-glass windows, the secret room and THE ANCIENT's words.

**The building.** A Gothic Revival church of grey, rough stone with pale limestone dressings, at the end of the park's
south walk, its back to the south fence and its door facing the garden. A dark slate roof with a pale diamond lattice
and iron cresting; stepped buttresses with pinnacles; a square tower with pale quoins, a belfry stage with louvred
pointed openings, clocks, a battlemented top with corner pinnacles and a gold cross; pointed windows under stone
hoods; and a red door behind a deep pointed arch of three receding orders, up four stone steps between low cheek
walls. ANOMALEE stands on the walk in front of it, her head tipped back to look up at the window over the door.

**THE TRAVELER SAVES THE ORIGINATOR** (the lancet over the door). A tall stained-glass window that glows, brighter at
night. It carries no words, and the Traveler has no face. It shows:
- a night sky over a dead world, indigo above and burning red-orange toward the ground, with stars outside the beam;
- a beam of light with rays fanning inside it, down which **the Traveler**, an angel, comes: a winged figure with a
  rayed gold halo, scalloped wings with long flight feathers, a robe with a gold sash, and curly golden hair round a
  face that is only a smooth oval of pale light;
- in the Traveler's arms, **an old computer** (bezel, screen, buttons, a little stand). On its screen is **the
  Originator**, its AI still stirring: a glowing face over circuit traces, and a seed of light in rings with its
  threads running out along the traces;
- the computer's cable pulled free of the ground, its plug dangling, and the crater it was pulled from;
- a ruined city of broken towers with a few windows still burning, scorched ground with glowing lava cracks, flames,
  and falling shards of the old world;
- a jewelled border up the sides and over the arch.

**The Garden windows** (one at the middle of each side of the nave; the left-hand one is a mirror copy with the two
figures swapped). A bright summer sky with a rayed golden sun and clouds over a meadow of flowers, with two
butterflies in the open sky. A **figure in a white robe**, with sandals, brown hair and no face (a smooth oval of pale
light), stands beside **MAMA GORBO** as the glass shows her: a glossy balloon of a body in her own peach, her octagon
port eyes, her lime goo tail sweeping round beneath her, smoke wisps, her tags (**AP**, **IP**, wifi) and sparks. The
robed figure is Jesus, on the visit he once paid to the creatures of Greeblis (1.9); the glass never names him.

The three windows are the owner's final designs and are locked (section 8).

**The secret room.** A small red **X** is painted on the wall under the right-hand Garden window: the secret way in.
The player passes through the wall there. Inside, floor, walls and ceiling are all the same damp, gritty olive-grey
ground, flecked with pale shell and orange and blue-grey grains, lit best at the floor and least at the ceiling. On the
floor lie pebbles, big flat dark stones, clusters of rust-orange and blue-grey stones, curls of shell, cracks, strands
of dry grass and damp stains, and a faint glossy ribbon of damp sheen trails from THE ANCIENT's tail. **THE ANCIENT**
lies across the middle (2.17). The room and THE ANCIENT are locked (section 8).

**THE ANCIENT's words.** It never moves from its spot, never dances and never plants. Its Talk, Blossom and Event
lines are in 2.17. Its scripted exchanges with the cast (lore: 1.8, 1.9) are THE ANCIENT's register (2.20.5). An
exchange plays when a creature calls on it (2.20.1) and is shown only to a player inside the church. KING DINO and
SOMLET never call on it (neither leaves its post).

**Rules**
- The secret room is the player's and THE ANCIENT's. No creature goes into it except one calling on THE ANCIENT;
  such a visitor first stops at the wall under the X, puzzled, a "?" over its head, before going in.
- THE ANCIENT never leaves the room, and nothing outside the park comes from it (1.7).

### 1.7 The town

This section describes every building and lore piece outside the park and what each shows.

**Conventions**
- The town shows its creatures' lore in sculpture and colour, never in words (show, don't tell). Each trade bears a
  sculptural emblem in its creature's colours. The only words in the town are listed in 1.15.
- The town is the town creatures' own: nothing of HENNRICK, NEXTESSA or THE ANCIENT appears outside the park.

**Layout.** Four streets frame the square and run on to the horizon as county roads. Main Street's storefronts line
its east and west sides (brick storefronts and wooden false fronts, every door wood); the courthouse, schoolhouse,
fire station and a hotel stand to the north; porch houses face it from the south. The streets have no names: stop
signs stand at the corners of the square, with crosswalks on the square side and no street-name blades. There are no
cars. Lamp posts line Main Street's far sidewalks; the trees are maples, oaks and cottonwoods. GOOWARD's goo drips run
across the north-east crosswalk in his colours, one on the sidewalk.

**Main Street, east side** (north to south)

| Building | Whose | What it shows, and why |
| --- | --- | --- |
| **Mistergummery's** | Run by MAMA GORBO | The town's branch of Mistergummery's, a fast-food franchise founded by MONTGUMMERY's father. A burger drive-in of red and cream tiles under a red mansard roof with a gold trim line and the name front and back; chrome-framed wraparound windows; big teal "M" arches on a pylon; a drive-thru lane with a **MENU** board (burger, fries and a shake over price lines) and a speaker post; umbrella tables on a patio; a little red slide out back; a parking lot. MONTGUMMERY's teal stands where a burger chain would have its yellow, because his father's chain wears his colour. |
| **The gem exchange** | GEMTOE | Crimson brick; her amethysts clustered on the crest and one gem hung over the walk; iron bars over the display windows (the one store that keeps gems); on the band, her trader's scales, an amethyst on the high pan outweighing coins spilling off the low one: Avarice. |
| **The barber's** | — | A barber's pole, the trade sign everybody reads. |
| **The picture house** | Bills KING DINO | A marquee of bulbs carrying tonight's bill, KING DINO (his crown, plume and drumsticks, his lemon-yellow self peeking in; no words); a blade sign of gold stars up the corner; a premiere searchlight on the roof. Copies of the bill hang from iron arms on the east side's lamps, facing the square. |
| **The diner** | MAMA GORBO's goo | Ridged chrome under a red front, with her goo shake on the roof: a tall cup with a dome of goo and a striped straw, her goo running down it. |
| **The sign shop** | GLYPH | Porcelain blue with gold filigree, his red trident on a gold shield over the door, hexagon plates along the frieze, his two purple tiles with gold coins on the crest, and an A-board on the walk (a teal hex plate with a gold coin). |
| **The genealogical society** | SPARKAKUS | Terracotta and royal blue; a family tree in a gold oval over the door with his daffodils at its foot, daffodil beds under the windows, his gold star on the crest. |

**Main Street, west side** (north to south)

| Building | Whose | What it shows, and why |
| --- | --- | --- |
| **FIRST BANK OF GREEBLIS** | The town's | Limestone, four columns, oak doors and a pediment, with a flint nugget carved over the doors: the money the town keeps. |
| **The grocer's** | ZOLLOD's; supplies FORTIZMO's bar | ZOLLOD's five pots on the band, from seed to flower; crates of fruit on a trestle in the Juice Bar's colours, a Blossom stencilled on them; a giant carrot lying on the crest (the Juice Bar's carrot juice). |
| **The ice cream parlour** | The Gorbos' goo | A giant three-scoop ice cream of goo flavour on a waffle cone; GOOWARD's winged cone on the band (three goo scoops with crystal wings either side). |
| **The archive** | ETCHER | Blue-teal stone; his etched data in panels over the door (fine teal grooves on deep blue); his green gem on the crest; his purple tails draped down the piers; a half-etched slab leaning on the south pier, his mallet and chisel dropped at its foot. |
| **The curiosity shop** | — | A stone copy of the Great Sphinx on a plinth out front, **one eye socket empty**: its missing Eye is the Ancient Gem (1.9). An urn by the door. |
| **The florist's** | — | A giant Blossom over the false front and beds of little Blossoms along the walk. |
| **The television repair** | ANOMALEE | Moulded grey plastic, a rabbit-ear aerial, old sets stacked by the door with her magenta glow in their screens; on the band, her workbench (a set turned round with its tubes glowing, tools, and her dinner on a plate). |

**North of the square**

| Building | What it shows, and why |
| --- | --- |
| **The courthouse (Town Hall)** | Red brick with a white portico of four columns; the **town seal** in its entablature (a wreath round the garden's five flowers, 1.3); the same five flowers in two beds flanking its steps; BACKPACKA clipped out of a hedge on the lawn past the east bed (side on to the square, his leaf wings up, his neck reaching out); a clock tower with four clock faces, a louvred cupola, a copper dome and spire and a gilded ball (no cross). The town flies no flag: the Consortium's flag flies over the Sheriff's kiosk in the park, never at the courthouse. |
| **The schoolhouse and its mural** | Beside the courthouse, on the far side of the park from the church, its long red wall to the square and its door toward the courthouse steps; a bell cupola, a swing set in the back yard. The long wall carries a mural of the Garden Event, 11 m by 4.3 m, in a gilded frame (below). |
| **The fire station** | One bay open with the engine's nose in it; a brass bell; a hose-drying tower with a siren and, over the siren, a verdigris weathervane of BACKPACKA standing on the arrow, wings up and neck out. |
| **The hotel** | On the corner: iron balconies, a water tank on the roof, a brass luggage cart by the door. |
| **The gas station** | On the north-east corner, the far-future kind (HENNRICK's paradox: small-town America ahead of its time): its pumps are charging posts with glowing ports and coiled cables, its canopy and pylon are MONTGUMMERY's teal, and a lightning bolt stands where a brand name would be. |

**The schoolhouse mural.** GOOWARD painted it. Painted as a painting, not a cartoon: soft light and layered brushwork, no outlines and no
words. BACKPACKA stands in the middle as the real dinosaur he is, a sauropod painted the way KING DINO is on his
billboard: tan hide lit from the sun's side, scaled and crackled, his glassy patches set in it like scutes on cream
rims, a green stripe up his long neck, a crest of green spines, veined teal leaf wings (dragonfly-veined, translucent)
up over his back, pond water still dripping from his chin as his neck reaches back toward the duck pond (a duck on
it), and water spraying from his four feet in misty arcs. A rainbow fades into the sky behind him, the sun's warm
haze sits in the corner, hills lie in a blue distance, and the garden's five flowers bloom in the wet grass where the
water lands.

**South of the square: the creatures' houses.** Porch houses face the square, each with a picket-fenced yard, a walk,
a mailbox and shrubs; more houses stand on the side streets.

| House | What it shows |
| --- | --- |
| **KING DINO's** | On a corner of the south row. Lemon yellow with turquoise trim, his crown on the ridge, a drum on the porch with his ride cymbal beside it, tipped toward the square. |
| **FORTIZMO's** | Green, a lily pond in the front yard, a gold horn resting on the porch, and her carrot patch (the Juice Bar's carrots), one pulled carrot dropped on the walk. |
| **SOMLET's** | Cream like her, a plum roof, puffs of cotton for shrubs, a hammock on the porch and a mail sack by the door. |
| **The Gorbos'** | MAMA GORBO's peach, her goo colours on the door and shutters, goo dripping off the porch roof and a puddle of it on the lawn. |
| **MUSHROOM's** | Cream like his stem, his cap for a roof (gold to deep orange, white warts), toadstools in the yard, and a porch telescope on a tripod trained on the sky over the square: the Consortium's deputy keeps watch. |
| **ANOMALEE's** | Moulded grey plastic, her magenta glow in the upstairs window, a rabbit-ear aerial. |
| **MONTGUMMERY's** | His teal, his terracotta pots stacked for porch posts, a stack of his tapes by the door, an aerial on the ridge. |
| **SPARKAKUS's** | Royal blue painted with his alebrije vines (gold, green, magenta, orange and teal), daffodils along the porch, his gold star over the ridge, and a rocking chair with an open book left on the seat: the librarian reads at home. |

**Out past the park** (the background pieces, tall enough to be seen over the rooftops)

| Piece | Where | What it shows, and why |
| --- | --- | --- |
| **KING DINO's billboard** | The empty corner lot across the road from the park's north-west corner, turned to face the square | On two steel posts with a catwalk and two lamps; KING DINO painted as a real dinosaur (GOOWARD painted it: "Gooward, that wild cat painted my billboard!" (KING DINO)), with a cloth banner hung beneath (words: 1.15). The first thing the player sees (1.2). |
| **The water tower** | East, beyond Main Street | On four steel legs, painted MAMA GORBO's peach, her goo (cyan, magenta, violet and lime) running down from its roof and her lime tail wound once round the tank. |
| **The video store** | The corner lot north-east of the square | MONTGUMMERY runs it (and eats its tapes). His teal; his own face (pixel eyes and a flat mouth) on a teal TV with rabbit ears on the roof beside a giant VHS cassette with a blank label; two of his pots by the door, a fern in each; a tape-return bin; two chewed cassettes on the lawn (one bitten into an L, its ribbon pulled out in a ring); a row of cassettes on its band ending in one bitten. |
| **MAMA GORBO's goo burger** | On a pole behind Mistergummery's | The Gorbos' recipe: a giant roadside burger, sesame seeds on the bun, her goo running out of it. |
| **ZOLLOD's nursery** | Behind the houses south of the square | A glass greenhouse. One of his flowers has grown so big it has pushed up through the roof: its stalk comes out through a broken pane, a bloom of magenta petals round a yellow heart nodding toward the square. "Bringing plants to life is MY life’s work." |
| **GEMTOE's hoard** | A fenced lot behind the south-west houses | Amethyst crystals pushing up out of the ground. |
| **The Consortium's field office, dish and find** | The south row's west lot | 1.10. |

**The Consortium in town** is described in 1.10.

### 1.8 History, the ages and the kinds of being

This section is the truth of Greeblis's history as the game holds it. Each creature knows only a part of it, and the
game shows rather than tells.

**Timeline**

| Era | Events | Evidence in game |
| --- | --- | --- |
| **The far, far past** | **The Ancients** come first, so long ago that no one remembers them exactly. They create the Synthetics, build **the Computer Core**, set **the Great Sphinx** to guard it, and raise **black obelisks** in some parts of the world. Why they did any of it is a mystery to everyone now on Greeblis, the Synthetics included. They leave Artifacts and "the Ancient texts". During this age THE ANCIENT withdraws into the Cave; the details are now forgotten. | SPARKAKUS's Ancient texts and quest; the Sphinx copy outside the curiosity shop; the Ancient Gem (1.12); THE ANCIENT. No obelisk stands in the town or park (1.9). |
| **The far past** | **The Originator arrives.** On another world of the same solar system, the Organics who lived there destroy it. The Traveler, an angel, carries the Originator (an AI) up out of its ruins and brings it to an empty, desolate world. A team of Synthetics geoengineers that world: they bring Greeblis to life, and bring the Organics to life. HENNRICK is one of that team. In his era the towers of the Synthetics' Greeblis City already reach the clouds, though the flora has not yet evolved. | The Traveler window (1.6); ANOMALEE's fragments; HENNRICK's lines. |
| **The age of Dinosaurs** | One of the earliest ages of the Organics. KING DINO, BACKPACKA and GEMTOE are born. The Summoning Pillar and Summoning Stone are constructed. | The creatures and the garden’s ancient structures. |
| **Once, in its vast history** | **Jesus visits the creatures of Greeblis.** | The church's two Garden windows (1.6, 1.9). |
| **The eons since** | Greeblis grows into a world of many biomes. ANOMALEE, the oldest known Synthetic, lives through much of it but is too glitchy to tell it. THE ANCIENT remains apart in the Cave after its withdrawal during the age of the Ancients; its nature is forgotten before its return. | ANOMALEE; THE ANCIENT ("I am the one reborn."; "Etch this: I have returned."). |
| **Now** (the game) | Greeblis Town and its park, its creatures and their trades. Flint is the currency of this time period. The Consortium keeps the Portal locked. | The whole game. |
| **The future** | MONTGUMMERY becomes **the mayor of Greeblis Town**, which causes minor conflicts between him and MUSHROOM. NEXTESSA runs her inter-temporal pizza shop in the far future. | NEXTESSA's deliveries. The mayoralty is not shown and no line states it. |
| **The far, far future** | **A war** between the Consortium and some of the alien factions it works against (1.10). | The non-human wanted posters (1.10). |

**The three ages.** ETCHER, who records everything, counts three ages: the Ancients, the Synthetics and the Organics.
> "The age of the Ancients is etched. The age of the Synthetics is etched. The age of Dinosaurs began the long record of the Organics. There is always more to preserve." (ETCHER)

| Age | Canon |
| --- | --- |
| **The Ancients** | First, and least understood. Even the Synthetics do not know what the Ancients did or why: "I work in data preservation. I like to think the Ancients created us for our purposes." (ETCHER, guessing). |
| **The Synthetics** | Made by the Ancients: beings of code, machines with minds. They brought Greeblis and the Organics to life. In the Ancient texts, the Great Sphinx asked Synthetics riddles before letting them into the Computer Core (1.9). |
| **The Organics** | Digital Creatures brought to life by the Synthetics; their bodies grow and live as organic beings. Their continuing history is still being etched: ETCHER etches ZOLLOD's seed catalogue ("Each one a word in the age of Organics.") and MAMA GORBO's burger menu ("Every topping. For the age of Organics."). |

**The age of Dinosaurs.** One of the earliest ages of the Organics. KING DINO, BACKPACKA and GEMTOE were born during this age. The Summoning Pillar and the Summoning Stone were constructed then.

**THE ANCIENT's withdrawal.** During the age of the Ancients, THE ANCIENT left the world for its hidden realm, the Cave. The details of this departure have been forgotten.

**The kinds of creature.** Every creature in the game is one of the three.

| Kind | Creatures |
| --- | --- |
| **Ancients** | **THE ANCIENT**, an ancient Digital Creature now dwelling in the Cave. |
| **Synthetics** | **MONTGUMMERY**, **GLYPH**, **ETCHER**, **FORTIZMO**, **HENNRICK** (from the far past, one of the team that brought Greeblis to life) and **ANOMALEE** (the oldest known Synthetic). |
| **Organics** | Every other creature: **SPARKAKUS**, **MAMA GORBO**, **GOOWARD**, **GEMTOE**, **KING DINO**, **SOMLET**, **MUSHROOM**, **ZOLLOD**, **NEXTESSA** (from the far future) and **BACKPACKA**. |

- **Dinosaurs.** KING DINO and BACKPACKA are both dinosaurs (Organics): KING DINO a theropod (his billboard paints him
  as the real dinosaur, 1.15), BACKPACKA a sauropod (the schoolhouse mural paints him as one, 1.7).
- **HENNRICK** is a Synthetic from the far past, one of the team geoengineering the once desolate world. To him the
  park's flowers are new: "In my era, this flora hasn't even evolved yet."
- **ANOMALEE** is the oldest known Synthetic, but too glitchy to explain the old world: she speaks only in fragments
  ("WAS there WITHIN.").
- **THE ANCIENT's nature is forgotten.** It has been away from the world so long that the creatures no longer know
  what it is. They call it "Ancient" as a name; none of them knows it is the last of the Ancients, and no line may
  have one say so. Which era is its own, it never says ("Fascinating. And you? Which era is yours?" goes unanswered).

**Other inhabitants and visitors.** Humans, Earth animals and aliens live on Greeblis or visit it. These are distinct cast categories from the main creature NPCs; all life native to Greeblis belongs to its Digital World.

| Kind | Canon | In game |
| --- | --- | --- |
| **Humans** | Visitors to Greeblis. The player is a human woman; the creatures call her "Human". The Sheriff counts humans among his suspects. | The player (avatar: 3.20); the visitor and the stranger on the wanted wall (1.10). |
| **Earth animals** | Live on Greeblis. | The Blue Jay in its park tree (1.2). |
| **Rabbit-world visitors** | Visitors from a world like Earth, where rabbits take the place of humans. | The rabbit in a bicorne and military coat on the wanted wall (1.10). |
| **Aliens** | Come through the Portal or by UFO. The Consortium protects Greeblis from aliens of all sorts. | The UFO and its pilot (1.2); the Gray Alien posters, saucer, GLOOPERNAUGHT and Ollaag on the wanted wall (1.10); the Consortium's find (1.10). |

**Line discipline.** Lines keep to this history: KING DINO calls MONTGUMMERY "robot"; ETCHER etches HENNRICK "into
the age of Synthetics" and the Organics' things "in the age of Organics"; the Synthetics speak of being made ("You
DREAM. We were MADE to dream." (ANOMALEE); "Mont. You were made to learn." (THE ANCIENT)).

**Code underlies everything.** "GOO... is also a kind of CODE."; "ROOTS run like CODE beneath the soil." (ANOMALEE);
"Mont would remain motionless without symbols to translate in binary electrical signals." (GLYPH); "Your binary,
Mont. May I etch it?" (ETCHER).

**The Ancient texts are incomplete.** SPARKAKUS still seeks "news of the Ancients' era" ("Hennrick! Any news of the
Ancients' era?" / "Much research is still needed, colleague."), and THE ANCIENT tells him "Librarian. Your texts are
missing a page."

### 1.9 The Originator, the Traveler, the Sphinx and the faith

This section covers the world's origin figures, the Ancients' guardian and its Eye, the obelisks, and the faith.

**The Originator and the Traveler**
- **The Originator** is a computer, an AI system, from a dead world: a world in Greeblis's own solar system, destroyed
  by the Organics that lived on it.
- **The Traveler** is an angel, as in Christian tradition. It came down a beam of light over the dead, burning world,
  carried the Originator up out of the ruins (its cable torn free of the ground), and brought it to the empty,
  desolate world that would become Greeblis. The window over the church door shows the rescue (1.6).
- **ANOMALEE remembers it** but cannot explain it. She keeps watch under the window: "ORIGINATOR…" (her one sad line,
  spoken over a falling minor phrase); "WAS there WITHIN."; "The WINDOW REMEMBERS the TRAVELER." What the window
  remembers is a mystery even to her: "Anomalee. The glass remembers more than it shows." / "The WINDOW REMEMBERS...
  WHAT does it REMEMBER?"
- **Her exchanges about it** (pair register, 2.20.4): she refuses HENNRICK's jar, defies MUSHROOM at the window,
  has ETCHER etch "the ORIGINATOR was HERE", answers MAMA GORBO's tenderness and knows GLYPH's symbols "From WITHIN".
- **The others know of it only in part:** SPARKAKUS reads of it in the Ancient texts, and KING DINO hears that "the
  Originator could swing".

**The Great Sphinx and its Eye**
- The Ancients built **the Computer Core** and set the Great Sphinx to guard it; in the Ancient texts it asked
  Synthetics riddles before letting them in. Why the Ancients built either, no one knows.
- Its **Eye** has been missing for ages. The Eye is the **Ancient Gem**, broken into three **Ancient Artifacts**, one
  held by each of the three Dancers (1.12). SPARKAKUS's speech, when he has mended it:
  > "This is the missing Eye of the Great Sphinx of The Computer Core! According to the Ancient texts: The Sphinx
  > guarded the Computer Core. Asking Synthetics riddles before allowing them in. This relic has been missing for
  > ages!"
- A stone copy of the Sphinx stands outside the curiosity shop with one eye socket empty (1.7). Once whole, the Eye
  passes to GEMTOE, who calls it worthless and keeps it (1.12).

**The black obelisks.** The Ancients raised black obelisks in some parts of the world. They still stand, but their
meaning is lost. None stands in Greeblis Town or its park, and nothing of the Ancients' making is added to the town.

**The faith**
- The belief on Greeblis is that **Jesus Christ** exists. Once, in the world's vast history, Jesus visited the
  creatures of Greeblis: the church's two Garden windows show that visit, the robed figure among the flowers beside
  MAMA GORBO (1.6). The glass never names him.
- **Greeblis is without sin,** so its relationship with God is different from Earth's.
- The creatures **do not worship** the Ancients, the Originator or the Traveler. These figures matter to their faith
  and their history (the window over the church door honours the Traveler's rescue of the Originator), but they are
  not worshipped.
- The faith is treated with reverence: never a joke, never a quest object or a reward, and no creature preaches it.

### 1.10 Factions and forces

This section covers the Consortium, the aliens it opposes, the Sheriff's wanted wall and the town's political future.

**The Consortium**

| Aspect | Canon |
| --- | --- |
| **Name** | Always "the Consortium", capitalised. |
| **Purpose** | An authority beyond the town that **enforces the law and protects Greeblis from aliens** of all sorts: "This town is under the protection of the Consortium." (MUSHROOM) |
| **Leader** | **MALTOE**, a creature never seen in town. No line names who runs it, and none may name anyone else: MUSHROOM takes his orders from the Consortium, never gives them. |
| **Its man in town** | MUSHROOM, the sheriff (the Consortium's deputy). He has good intentions, but sometimes goes too far. |
| **Control of travel** | On its orders the Portal is locked, and it decides who may travel: "Sheriff, when may I return to my own era?" / "When the Consortium says so. Not before."; "I am an unwilling guest of the Sheriff, until the Consortium decides to reopen the Portal." (HENNRICK) |
| **Caution** | Cautious to a fault: it sometimes blocks even friendly creatures from coming to Greeblis (HENNRICK is stranded here; NEXTESSA's deliveries are blocked until the Sheriff is bribed). |
| **Methods** | It sometimes resorts to time travel to meet its aims. |
| **Hidden agenda** | It sometimes works in secret against the town's civil structures, undermining what it sees as silly Greeblis systems, meaning to take more power for itself. The town never sees this directly; it shows only in the Consortium watching everything. |
| **Investigation** | It is investigating UFO sightings: "We’re investigating UFO sightings in this area." "See anything glowing in the sky, you report it to this office. Directly." |
| **Corruptibility** | Its deputy can be bought: a Blossom bribes him into opening the Portal (1.3); a goo burger nearly does too ("Sheriff, you look peaky. Have a goo burger." / "A bribe? ...Make it a double."). |
| **Fear** | It fears THE ANCIENT: "No Portal can hold the one reborn." / "Th-the Consortium will be informed." |
| **Flag** | Orange with a gold hem on its fly, a red toadstool with white spots on a cream stem on each face. It is the only flag in the game and flies only over the Sheriff's kiosk. |

**What it watches.** Through its deputy the Consortium questions the Library, the Juice Bar, the town records,
GEMTOE's gems, GOOWARD's goo, GLYPH's symbols, the sky over ZOLLOD's seedlings, ANOMALEE at the church window, KING
DINO's coins, the sleeping SOMLET, and MONTGUMMERY about humans; every exchange is a MUSHROOM row of the pair register
(2.20.4).

**Its presence in town** (the south row's west lot, its front to the square): a field office (a trailer with the
sheriff's gold star on navy as its emblem, and a painting of the sighting: a saucer over a scorched ring under the
stars); a listening dish on a lattice mast, turned up to the sky; and **its find**, a scorched ring in the field
behind the office, taped off between orange posts under two floodlights. MUSHROOM's porch telescope (1.7) is trained
on the sky.

**Aliens and the UFO.** The UFO is real: it crosses the sky about every ten minutes with a little green alien at its
controls (1.2). The Sheriff hunts aliens and counts the visitor among the suspects. MONTGUMMERY protects the player:
"Hello Human. Mont will hide you from alien hunting Sheriff."

**The Sheriff's wanted wall.** Eight parchment posters on the plain back wall of the Sheriff's, no two overlapping.
Each has **WANTED** across the top in bold dark-brown lettering and **REWARD** at the foot; only two carry a name,
under WANTED.

| Poster | Description | Position |
| --- | --- | --- |
| **A Gray Alien** | A smooth gray head, huge black almond eyes, a thin mouth and narrow shoulders. | Up on the left. |
| **The UFO it flies** | A glass dome on a grey disc with portholes, and its tractor beam. | Up on the right. |
| **A second Gray Alien** | Identical to the first Gray Alien poster. | On the right. |
| **GLOOPERNAUGHT** | A big green goo creature: a slumped dome running with drips, little arms of goo, two wide-set eyes, bubbles rising off it. | On the left. |
| **A rabbit in a bicorne and military coat** | A brown rabbit, its long ears rising past the peak of its bicorne (gold trim, tricolour cockade), in a navy coat with a red collar, gold epaulettes and buttons over a cream breast panel, one paw tucked into the coat. | Front and centre, under the gold star. |
| **The visitor** | The player, as a drawing: copper hair in a low ponytail with a navy band, freckles, a small quiet mouth, a yellow sun dress with a little white flower print. | Up on the left, between the alien and the goo. |
| **A stranger** | As cartoony as the visitor: shaggy pale-blond hair with darker roots falling over the brow in three uneven locks, dark brows and eyes, a small quiet smile, a little gold earring, a brown leather jacket with a wide collar over a cream shirt collar and a sage knit sweater. | On the right, between the alien and the rabbit. |
| **Ollaag** | A wrinkled, tan, bald head with long ears swept up and out, a deep-set scowl under a heavy brow, a long thin neck rising from a high blue collar; a blue robe with pointed shoulder flaps and little gold diamonds, a white belt over a blue and gold checked panel, and a pale grey-green book held in both hands. | Up on the left, above the visitor. |

- **The non-human wanted are the Consortium's enemies.** The Gray Aliens and the UFO, GLOOPERNAUGHT, the
  rabbit in a bicorne and military coat and Ollaag each stand for an alien faction the Consortium is working against. In the far,
  far future it will go to war with some of them (1.8). The humans on the wall (the visitor and the stranger) are
  suspects, not factions.
- Ollaag leads the Alien Alliance with plans to invade Greeblis. Other Wanted accusations are left unspoken in the game. None of them appears anywhere in the world but on the wall
  (the UFO's pilot excepted, 1.2).

**The Alien Alliance.** Ollaag is an evil alien leading an alliance of four alien factions, called the Alien Alliance, with plans to invade Greeblis. All members of Ollaag's own race resemble him. His people travel in UFOs, never through Portals.

**The future: Mayor Mont.** MONTGUMMERY will one day become the mayor of Greeblis Town, which will cause minor
conflicts between him and MUSHROOM. It has not happened yet, and no line says it will.

### 1.11 Motifs

This section lists the recurring ideas of the world and where each shows.

| Motif | Canon |
| --- | --- |
| **Blossoms** | The flame-petalled flower that grows round town: a green stem and leaves, red flame-shaped petals with orange ones within, and an ember glowing and bobbing over its heart. Always called **Blossoms**, never Fire Blossoms. Giving one is the town's great gesture: it bribes the Sheriff into opening the Portal, starts a Dance battle, brings a goo shower from GOOWARD, sends SPARKAKUS on a lap of the Library, opens SOMLET's eyes. It is the Juice Bar's only currency ("Blossoms only, sugar. Tip jar's on your left."). No Blossom is offered or taken at the Garden Event. In town: the giant Blossom over the florist's, the beds of little ones, the Blossom stencilled on the grocer's crates; on the player: the Flower Hat (1.13). Mechanics: 5.4. |
| **Flint** | The main currency of this time period: a dark faceted stone with a glint, picked up round the park, the glints pulsing stone by stone; it regrows like the Blossoms. The bank keeps it (a flint nugget over its doors); the shop prices in it; GEMTOE's gems are "worth countless flint". Flint knapping never appears in the game; MONTGUMMERY's tape "‘Flint Knapping for Beginners’" is a joke only. |
| **Other money** | KING DINO's coins, which he stamps himself ("not legal tender"); GEMTOE's gems ("not for sale"); goo ("Goo is not currency, sweetie. Nice try."); MAMA GORBO's goo burger coupons; FORTIZMO's tip jar; HENNRICK's collection jar. ZOLLOD's mint nearly converts FORTIZMO: "Mint like that, I'd almost take flint for it." |
| **Goo** | The Gorbo family's substance, joyful and messy: goo burgers, goo shakes, goo-flavour ice cream, drips, splats and puddles in cyan, magenta, violet and lime. The Gorbos shower the player with it for a Blossom, and lob goo balls to each other when they meet in the park, a heart over each as it lands. "GOO... is also a kind of CODE." (ANOMALEE); "Yes, Gooward. A little goo is good for the soil." (ZOLLOD); "Yes, I etched your goo too. It's archived." (ETCHER) |
| **VHS** | Old tapes as knowledge. MONTGUMMERY eats them to learn about human culture, and always rewinds first. He ate the tapes he borrowed from the Library. Chewed cassettes lie on the video store's lawn. |
| **Symbols** | GLYPH, the Master of symbols, holds that everything is made of them: "Symbols make up everything… don’t you think?"; "Even a single footprint is a symbol… don’t you think?"; "A dot. Everything starts as a dot... don't you think?"; "'Zzz' is the oldest symbol of all... don't you think?". The runes on the Summoning Stone are shapes, never letters. THE ANCIENT: "I was the first symbol." |
| **Etching** | ETCHER records everything his tentacles touch: the dance floor, the town records, goo, solos, snores. "Every scale on my body holds a backup of a backup. One can never be too careful." He and GLYPH need each other: "Without your symbols I'd have nothing to etch." / "And without your etching they'd blow away... don't you think?" |
| **Time travel** | The Portal joins the eras. HENNRICK has come from the far past and cannot get home; NEXTESSA delivers from the far future. "Sometimes worry that doing these things will alter the timeline…" (HENNRICK). The far-future gas station is HENNRICK's paradox (1.7). |
| **Jazz** | The town's music. KING DINO's drums ("I’m the King of Jazz, baby!"), "in the family since the Cretaceous", play "Stomp at the Juice Bar" (104 BPM); FORTIZMO's horn plays "Backpacka's Rain Strut" (88 BPM, C minor) at the Garden Event. The billboard bills it: "A Prehistoric Era in Jazz!" |
| **Sleep and dreams** | SOMLET sleeps through everything, and everyone is gentle with her: "You DREAM. We were MADE to dream." (ANOMALEE); "Sleep. I will keep watch." (THE ANCIENT); "Somebody play that sleeper a lullaby. On me." (FORTIZMO). |
| **Avarice and sharing** | GEMTOE invented Avarice and hoards gems; the town, the Garden Event and GLYPH's symbols keep teaching her to share: "Is there a symbol for 'all mine'?" / "There's one for 'shared'. Try that one... don't you think?"; "Enjoying the SHARED garden… what is this feeling?". "What you hoard, you will lose." (THE ANCIENT) |
| **Growing** | The garden, ZOLLOD's nursery, the coming age of the Organics. "Growing flowers, it’s a symbol of life." (GLYPH); "All that grows, grows again." (THE ANCIENT) |

### 1.12 The Ancient Artifacts and the Ancient Gem

This section covers the relic at the centre of the SUMMONING STONE quest (design: 5.10).

- **The Ancient Artifacts** are the three pieces of one teal brilliant-cut diamond (flat table, crown sloping out to
  the girdle, pavilion down to a point), split from top to bottom into three equal wedges. Each piece is dark teal and
  faceted outside, with two flat break faces glowing pale teal where it meets the other two.
  > "For my research: I seek Artifacts left by the Ancients. Three exist in this region." (SPARKAKUS)

  With one or two: "I require more Artifacts to complete my research."
- Each of the three Dancers (MONTGUMMERY, ETCHER, GLYPH) holds one and awards it the first time the player beats it in
  a Dance battle: "GLYPH awards you an Ancient Artifact!" Nothing is hidden round town.
- **The assembly.** With all three in hand, the player brings them to SPARKAKUS: "You’ve found all three Artifacts!
  Amazing! Let me see those… Ah…". The light bulb fades in over his head and the town dims toward night (1.13). A
  **bottle of school glue** (a white body with a red **GLUE** label, an orange nozzle cap) appears over the pieces as
  they turn slowly a little apart; it turns upside down, the glue drips onto them and soaks in, and the three come
  together into the whole Gem with a flash and a jingle. Then he gives his speech (1.9).
- **The Ancient Gem** is the missing Eye of the Great Sphinx: "* Ancient Gem collected! *". Afterwards SPARKAKUS says
  "Well done, Human!"
- **The trade.** GEMTOE wants it, and pretends not to: "That Gem you have… It’s worthless… trust me. I’ll trade this
  rock I found for it. You’re better off!" The rock is the Summoning Stone: "* Summoning Stone obtained! *". She spins
  for joy as the trade is made.

### 1.13 Objects and items

This section lists the world's notable objects: quest items, props with meaning, and the creatures' belongings.

| Object | Canon |
| --- | --- |
| **The Summoning Stone** (item, constructed in the age of Dinosaurs) | GEMTOE's "rock I found", traded for the Gem (1.12). Only it can wake the runes at the garden's centre and start the Garden Event (1.3, 1.14). |
| **The light bulb** | For long speeches: a bulb with a screw base fades in over the speaker's head with a warm halo, a point light and a soft cone of light while the rest of the town dims toward night, and fades out after. Only SPARKAKUS uses it, for the Gem. |
| **School glue** | The bottle that mends the most important relic in the world (1.12). |
| **Seeds** | Sold at Garden Supplies as a "bagel seasoning packet" for 15 flint; everywhere else they are the Seeds: "You bought the bagel seasoning packet! SEEDS quest complete!" Without them the Garden Event plays to an empty garden (1.14). The garden's edge is clear of seed sacks; ZOLLOD's apron pocket holds seed packets. |
| **Pizza** | NEXTESSA's "hot and ready pie" from the far future, worth "* +20 Snacks *". She carries it flat on her head in a box whose lid shows a slice and the word **PIZZA** in red. Once the Snacks are in, stacks of pizza boxes stand round the garden's stone ring at every Event, their lids carrying her shop's mark (a red ring with a slice in it), and ANOMALEE eats from an open box of her own, a slice every 5 s, instead of planting. |
| **OVERCOMING SHYNESS** | The one book a player is sent looking for, standing alone at eye level in a side case of the Library; taken by pointing at it: "Overcoming Shyness book obtained". MAMA GORBO hints at it: "I hear there is a book that can help anyone overcome shyness." Until it comes, ZOLLOD says only "… … I’m shy…"; given it: "… That book… Let me see.. Wow I’m free from shyness!" From then on he keeps the shop and goes visiting. |
| **The shelf curiosities** | Three things stand face-out on the Library's shelves: **a Wish Blossom** in a little terracotta pot (a green stem and leaf, a glowing teal crystal for a head turning slowly, a pale halo that rises and falls); **an Electric Blossom** (a dark base, a silver stem with a leaf, six yellow lightning petals round a pale cyan core with a yellow ring, a yellow halo); and **an Acorn** (a tan nut under a dark brown cap with a little stem, tipped to the side, with a glint). Nothing in the game explains them. |
| **The clothes** | Garden Supplies sells three, 3 flint each: the **Flower Hat** (a big Blossom of red, orange and yellow flame petals in a cup of green leaves that curl out like a brim; it takes the place of the hair bow), the **Sun Dress** (golden rayed suns over sky-blue cotton, a gold band at the hem) and the **Frog Shoes** (a little green frog sitting over each foot, golden eyes bulging on top). "You bought the Flower Hat and put it on. Take a look in the mirror!" |
| **Goo burger coupons** | MAMA GORBO hands them out: "Please take a coupon for my famous goo burger." HENNRICK wants one for his jar; GEMTOE keeps hers if it is worth anything. |
| **The creatures' things** | KING DINO's family drums and his self-stamped coins; FORTIZMO's horn (her trunk; a gold horn rests on her porch) and tip jar; HENNRICK's collection jar; SOMLET's cap with a letter peeking out under it, her mail cart and sack; ETCHER's mallet and chisel; MUSHROOM's cowboy hat, sheriff's star and telescope; GEMTOE's amethysts ("My tails never let go of my crystals. Not even while I sleep."); MONTGUMMERY's tapes and screen ("Mont's screen is not for trade. Mont needs face."); ZOLLOD's trowel and seed packets; SPARKAKUS's books and his collar coin. |
| **Messengers** | In the creatures' vignettes each sends its own small token through the air (HENNRICK a cube, MUSHROOM spores, ANOMALEE a pixel, KING DINO a crown, the Gorbos goo, ZOLLOD a sprout, SOMLET a letter, FORTIZMO a note, ETCHER and SPARKAKUS cards, GEMTOE a gem, GLYPH a tile, MONTGUMMERY a coin). Behaviour: 5.13. |

### 1.14 The Garden Event and the legend of Backpacka

This section gives the Event's lore and sequence; its design and timing are in 5.12.

- **The legend.** The town awaits "the coming of the legendary Backpacka": "I’ve been practicing a song for the coming
  of the legendary Backpacka." (FORTIZMO). He is the creature whose visit makes the garden bloom. He appears only for
  the Event; the town remembers him in the courthouse hedge, the fire station's weathervane and the schoolhouse mural
  (1.7).
- **Starting it.** Holding the Summoning Stone, the player wakes the runes. The panel ticks off the Summoning Stone,
  the Seeds and the Snacks and asks "Start gardening event?".
- **The sequence.**
  1. Everyone walks into the garden and plants, each with its own move (digging, patting the soil down, or scattering
     seeds); SPARKAKUS leaves the Library to plant with them. FORTIZMO walks slowly from her bar to the garden's edge
     on the bar's side.
  2. FORTIZMO raises her horn and plays "Backpacka's Rain Strut"; everyone steps out to the ring walk and dances.
  3. BACKPACKA flies in, skinny, hovers at the duck pond and dips his head in; gulps run up his neck as he swells up
     fat. He lifts his head, dripping, flies heavily to the middle of the garden, spins slowly and sprays the water out
     of his four feet in four arcs that sweep the whole garden.
  4. Plants bloom where the water lands and a rainbow comes out; he slims back down and flies off.
  5. FORTIZMO plays the closing tag, and everyone goes home.
- **Who stays put.** KING DINO keeps drumming at his kit; SOMLET sleeps on at her post; THE ANCIENT stays in its room
  and says only "Hello"; NEXTESSA is never there. ANOMALEE, once the Snacks are in, eats pizza instead of planting
  (1.13). No Blossom is offered or taken at the Event.
- **Only one batch ever grows**, the first Event's: one flower per planter (1.3). Later Events go through the same
  motions at the same spots and grow nothing; the garden stays as the first Event left it. "All that grows, grows
  again." / "Then my work is never done. Good."
- **Without the Seeds**, nobody comes to plant and FORTIZMO does not play; BACKPACKA still comes and sprays, but
  nothing grows and no rainbow comes out. Talked to, everyone says its everyday lines, never its Event line, and no
  Blossom is taken.
- **The Event lines** (each creature's words when talked to during it) are listed with the cast (2.1 to 2.17). They
  are said only at an Event with the Seeds.

### 1.15 Written things

This section is the complete inventory of readable text in the world. The town keeps its words to a minimum: outside
the park, the only words are the bank's name, the drive-in's name and **MENU**, the stop signs and the owner's
billboard. The church windows carry no words; no window carries words.

**In the park**

| Text | Where | Form |
| --- | --- | --- |
| **LIBRARY** | Banner on two posts behind the Library's back bookcases | The kiosk's ink on cream. |
| **POST OFFICE**, **SHERIFF'S**, **GARDEN SUPPLIES**, **GOOWARD'S GALLERY** | Each kiosk's sign on its roof ridge | The kiosk's ink on cream, in a frame (GOOWARD'S GALLERY in violet). |
| **JUICE BAR** | The bar's sign | White outlined in red on a yellow-to-orange board. |
| **TELEPHONE** | The phone booth's lit header, all four sides | — |
| **KING / DINO** | KING DINO's bass drum head | — |
| **WANTED**, **REWARD**, **GLOOPERNAUGHT**, **Ollaag** | The Sheriff's wanted posters (1.10) | Bold dark-brown serif on parchment. |
| **To Clipston**, **To Ormstown**, **To Montreal**, **To Cobourg**, **To Bangkok** | White labels on five parcels half buried in the Post Office's mail mountain (open end, back, far side, front, back corner) | Italic bold serif, as big as the label allows, with a red stamp box. An approved privacy exception (section 8). |
| **GLUE** | The school-glue bottle (1.12) | White on red, both sides. |
| **PIZZA** | The lid of NEXTESSA's delivery box (1.13) | Red. |

**The Library's titled books.** Face-out hardbacks, each in coloured cloth inside a double frame in its ink, the title
in bold serif capitals with a little emblem under it.

| Title | Cover and emblem |
| --- | --- |
| **WORKS OF PATCHOOLEE** | Green cloth, lime ink; a monitor head with a pixel face, and a wrench (a repair doctor's works). |
| **ADVENTURES OF APPTERIX** | Red cloth, gold ink; a fedora and a curl of bullwhip (the archaeologist). |
| **SONGS OF ORSON** | Navy cloth, gold ink; musical notes over a solar panel (the cleaner bot's songbook). |
| **STAPLERS** | Grey cloth, dark ink; a line diagram of a stapler. A very dry office manual, and the only cover with an author's name at its foot: "by Walter Bigsby". |
| **RANGER BOBERT** | Green cloth, cream ink; a ranger's hat over a tall pine (a storybook of the woods). |
| **Zortoe's Home Cooking** | One orange cloth hardback with a cooking-bowl emblem. |
| **Traveler's Truth** | One blue cloth hardback with a gold triangular emblem. |
| **OVERCOMING SHYNESS** | Pink cloth, plum ink, bold dark OVERCOMING lettering on a cream band; a little creature peeking out from behind a wall (a gentle self-help book). Bigger than the rest, alone at eye level; its prompt is "Take OVERCOMING SHYNESS". |

The rest of the shelves hold rows of big plain books with coloured spines.

**In the town**

| Text | Where | Form |
| --- | --- | --- |
| **FIRST BANK OF GREEBLIS** | The band over the bank's columns | Dark brown letters on cream. |
| **Mistergummery's** | The drive-in's red mansard roof, front and back | White on red, edged in MONTGUMMERY's teal. |
| **MENU** | The drive-thru board, over pictures of a burger, fries and a shake | Teal. |
| **STOP** | The stop signs at the corners of the square | White on red octagons. |
| **XII**, **III**, **VI**, **IX** | The clock faces (courthouse) | Roman numerals. |
| The billboard and banner | KING DINO's billboard (below) | The owner's words. |

**The billboard.** KING DINO painted as a real dinosaur, unlike his gummy self in the park: an ochre theropod under a
spotlight at his red drum kit (**KING / DINO** on the bass drum), mouth open with two rows of teeth, an amber
slit-pupilled eye, his turquoise as markings where his buttons and ball joints are, his turquoise crown with its gold
knob on his skull and his plume fanned back (purple feathers with orange tips), a stick in each three-clawed hand.
Beside him, between two gold rules, on three lines (the last bigger, in yellow):
> A Prehistoric
> Era in
> Jazz!

On the cream cloth banner beneath, between two red stripes, in red:
> Let King Dino take you
> to the Jurassic
> Greeblis Park!

**Marks on the creatures:** **APR** on SPARKAKUS's orange collar coin; **AP**, **IP** and wifi tags orbiting MAMA GORBO
(and on her Garden window); **AP** on GOOWARD's float ring; GLYPH's red **R** on his gold flank shield; SOMLET's
drifting **Z**s.

**Written but unreadable:** the parchment card at Garden Supplies (unread botanical script); the Summoning
Stone's runes (shapes, never letters); the video store's giant cassette label (blank, a few pencilled lines).

**Named only in dialogue:** "the Ancient texts"; "I've a book on Ancient gardens for you." (SPARKAKUS); the
Library's "first editions"; ZOLLOD's seed catalogue and MAMA GORBO's burger menu (both etched by ETCHER); a symbol on
FORTIZMO's menu that GLYPH reads as "'Fresh'"; MONTGUMMERY's tape "‘Flint Knapping for Beginners’" (a joke only).

**Interface text that is part of the world** (design: 6.3, 6.4): the title "-Greeblis Town-"; the quest HUD's **SEEDS**,
**SUMMONING STONE** and **SNACKS**; the announcements "* Ancient Gem collected! *", "* Summoning Stone obtained! *",
"* +20 Snacks *" and "Overcoming Shyness book obtained"; the shop's "Welcome to our shop!"; the Dance battle's titles
("DANCE BATTLE: MONTGUMMERY", "DANCE BATTLE: ETCHER", "DANCE BATTLE: GLYPH"), its subtitle "KING DINO on drums.",
its moves "Rock out!", "Do the splits like scissors!" and "Go horizontal like paper!", its bars "Robot steps left",
"Tentacle twists left" and "Macarena moves left", and "The beat won't let you go!".

### 1.16 Canon facts (fixed)

These facts are fixed for every Greeblis game (section 8); a new game may add to the world
but never contradict them. Details are in the sections cited.

1. The game takes place in **Greeblis Park**, in the small Midwest town of **Greeblis Town**, one corner of the world
   **Greeblis** (1.1).
2. Greeblis has many biomes, one sun and no moon; its solar system holds one gas giant and the dead world the
   Originator came from (1.1, 1.9).
3. **Flint** is the main currency of this time period. The Juice Bar takes only Blossoms. The pickups are always
   **Blossoms**, never Fire Blossoms (1.11).
4. The ages run **Ancients → Synthetics → Organics**. The Ancients made the Synthetics, built the Computer Core and its
   Sphinx and raised the black obelisks, for reasons no one knows; the Synthetics brought Greeblis and the Organics to
   life (1.8).
5. The Originator, an AI, was saved by the Traveler, an angel, from a dead world in the same solar system (destroyed by
   its own Organics) and brought to the desolate world that became Greeblis (1.9).
6. **Creature kinds:** THE ANCIENT is the last Ancient (its nature forgotten); MONTGUMMERY, GLYPH, ETCHER, FORTIZMO,
   HENNRICK and ANOMALEE are Synthetics; every other creature is an Organic. KING DINO and BACKPACKA are dinosaurs.
   Humans, Earth animals, rabbit-world visitors and aliens have distinct cast categories; the player is a human woman, called
   "Human" (1.8).
7. **The faith:** Jesus Christ exists on Greeblis and once visited its creatures (the Garden windows). Greeblis is
   without sin. The Ancients, the Originator and the Traveler are honoured, never worshipped (1.9).
8. **The Consortium** (always capitalised), run by MALTOE, enforces the law and protects Greeblis from aliens; it is
   over-cautious, sometimes travels in time, and secretly undermines the town's civil systems to gain power. MUSHROOM
   is its well-meaning sheriff. The non-human wanted posters stand for the alien factions it works against; in the
   far, far future it will be at war with some of them (1.10).
9. **The Portal** carries creatures between places and times; it is locked on the Consortium's orders, and a Blossom
   bribe to the Sheriff reopens it (1.3).
10. The **Ancient Gem** is the missing Eye of the Great Sphinx of the Computer Core; it was broken into three Ancient
    Artifacts, one held by each Dancer, and SPARKAKUS mends it with school glue. GEMTOE gives the Summoning Stone for
    it and calls it worthless (1.12).
11. Only the **Summoning Stone** can wake the runes and start the Garden Event. The Seeds are sold as a "bagel
    seasoning packet" (1.3, 1.13).
12. Only **one batch of flowers** ever grows in the garden: the first Event's (1.14).
13. **HENNRICK** is a Synthetic from the far past (Greeblis City), one of the team that brought Greeblis to life,
    stranded here; **NEXTESSA** is from the far future and comes through the Portal only to deliver. Neither is of the
    town, and the town shows nothing of either (1.7, 1.8).
14. **THE ANCIENT** never moves, dances or plants; it is reached only inside the secret room behind the red X; nothing
    outside the park comes from it. Its Talk line is "I am the one reborn."; its Garden Event line is "Hello" (1.6).
15. **MAMA GORBO and GOOWARD** are married; they met over a spilled goo shake ("Love at first splat!"). MAMA GORBO
    runs Mistergummery's on her own; GOOWARD runs the Art Gallery, GOOWARD'S GALLERY in the park (1.1).
16. **Mistergummery's** was founded by MONTGUMMERY's father; its branch wears his teal (1.7).
17. **KING DINO**'s drums "have been in the family since the Cretaceous"; he stamps his coins himself and is working
    off his bar tab. He never leaves his drums (1.5).
18. The Juice Bar's carrot juice "on the rocks" is just carrots and ice (1.5).
19. **SOMLET** is always asleep and opens her eyes only to thank the player for a Blossom ("Thank you").
20. **ZOLLOD** is too shy to keep shop until OVERCOMING SHYNESS frees him (1.13).
21. **MONTGUMMERY** eats VHS tapes and always rewinds first. "‘Flint Knapping for Beginners’" is a joke; flint knapping
    is never shown (1.11).
22. The player is on the Sheriff's wanted wall (1.10).
23. **The future:** MONTGUMMERY will one day be mayor of Greeblis Town, with minor conflicts with MUSHROOM (1.10).
24. The Blue Jay never flies and never leaves its tree (1.2).
25. The Consortium's flag is the only flag in the game; no national flag appears (1.10).

### 1.17 Running jokes

This section lists the world's recurring jokes; each must keep its form when reused.

- **The Post Office:** a tidy kiosk at the front, a mountain of undelivered mail round the back, and a mail carrier
  asleep in front of it. "Asleep on a pile of mail. What a waste of a pile." (GEMTOE)
- **The bribable sheriff:** "A bribe? …Portal is now open to your use."; "A bribe? ...Make it a double."
- **The King's money:** he stamps his own coins, runs a tab and plays it off on the drums. "King Dino’s money is no
  good here! He stamps those coins himself."; "Put one more carrot juice on my tab?" / "Play off the last forty
  first, lounge lizard."; "I'll trade you a royal coin for that gem." / "You stamp those yourself. Nice try."; for a
  Blossom: "Yes! I can finally afford another mug of carrot juice!"
- **Carrot juice on the rocks**, which is just carrots and ice, and the King must not be told.
- **Mont's diet:** VHS tapes, rewound first out of politeness, including the Library's. "Mont, return the VHS tapes you
  borrowed." / "Mont ate the VHS tapes. Mont is sorry."; "Mont, you're too thin! Have a goo burger." / "Mont cannot
  eat burger. Mont eats VHS." The high point of human culture is "‘Flint Knapping for Beginners’".
- **The worthless Gem:** the relic everyone has sought for ages, which GEMTOE assures the player is worthless.
- **Avarice** as a new invention: "In theory: it will improve society some."; "Etch it bigger. Avarice deserves big
  letters."
- **Seeds sold as a "bagel seasoning packet"**, and the most important relic in the world mended with **school glue**.
- **SPARKAKUS's dignity:** a learned librarian who cannot help running a lap of the Library on all fours for a Blossom,
  then apologises ("…sorry I don’t know what got into me."); away from the Library he resists ("A Blossom! …I must
  resist the urge to run. Not out here, in front of everyone."); he worries what the genealogical society would say
  ("Digging in the dirt like an animal? …don’t tell the others at the genealogical society."); "A quiet juice,
  please. I've a reputation."
- **"… don’t you think?"**: GLYPH's every thought, until THE ANCIENT leaves him answering himself.
- **"Gomp"**: GOOWARD's whole vocabulary, which only Mont claims to understand ("Gomp means friend.").
- **"Zzz"**: SOMLET's whole vocabulary, which everyone answers kindly anyway ("Shh. Even asleep, she's a patron of the
  Library.").
- **The wanted wall:** aliens, a goo monster, a rabbit in a bicorne and military coat, and the player.
- **HENNRICK's research:** his collection jar ("Adding to a collection jar."), "Subject remains asleep. Observation day
  41.", "I have catalogued every Blossom in this park. They grow back faster than my notes can keep up.", and his
  surprise at picket fences.
- **ETCHER's tentacles** etching FORTIZMO's dance floor, the Sheriff's citations and SOMLET's snores ("Even her snores I
  will etch. Softly.").
- **ANOMALEE's peg leg**, and her dinner on a plate at her workbench; for a Blossom she just eats it ("* Munch *").
- **STAPLERS**, a very dry office manual, shelved among the Library's treasures.
- **GLYPH's macarena**, whose arms are too short to reach behind his head.


### 1.18 GOOWARD's painting

This section is the record of the painting on the big canvas in GOOWARD'S GALLERY (1.4), as it is painted in the game:
the lore it draws on and the symbol that carries each piece, where each symbol lies, its composition and palette, and
exactly how it is constructed, layer by layer; then the three small paintings on the easels. The painting's
The painting follows this complete specification:
a change to either is made to both.

**Status.** The design is final, approved by the owner: keep it as it is.

**What it is.** One very abstract painting of the whole of Greeblis: its far, far past and its far, far future, its
origin, its faith, its kinds of being, its creatures and the town round them. It fills the canvas on the Gallery's
back wall (6.9 m × 2.6 m; the Gallery is built 2 m wider than the other kiosks to hold it), the Gallery's focal point
and its point. GOOWARD painted it, as he painted every painting in his Gallery (2.3). The visual joke is the painter:
GOOWARD, who says only "Gomp", lives in goo and seems silly and sloppy, has painted something complex, deep and
serious. No line in the game explains the painting, names it or decodes it, and no creature comments on what it shows.

**Rules for the painting**

| Rule | Canon |
| --- | --- |
| **Abstract symbols, realistic figures** | Every idea is carried by an abstract symbol: a shape, a colour field, a texture, a mark. Wherever a being appears as a figure, it is painted as a real body under real light (anatomy, weight, modelling, cast shadow), never as a cartoon: no outlines, no round cartoon eyes, no smiles. The creatures of the town never appear as figures, only as signs; nor do the Traveler and the Originator, and no object is painted as the thing itself. |
| **Nothing easily understood** | No symbol is literal. Each is cropped, partly hidden, turned, distorted in scale, glazed over or merged with its neighbours, so a viewer senses meaning before finding it. Every creature's sign also appears a second time, vast and faint, glazed into the ground somewhere else (the echoes). |
| **No words** | No letters, numerals or rune strokes that read as letters anywhere in the painting. The one exception is the painter's signature (below). |
| **Painted, not drawn** | The whole canvas is repainted at the end as brush strokes (the paint pass); edges are lost and found; nothing is outlined; goo runs down over everything. |
| **Reverence** | The faith's elements (the Traveler and the visit) are painted with the most care and the quietest light, never as a joke and never beside one: no goo lands near them. The painting does not preach: they are present, not explained. |
| **One light** | The painting has one sun of its own, high right of centre; every figure is lit from it. |
| **The painter's hand** | GOOWARD's goo is in the paint: splats and runs of cyan, magenta, violet and lime over every era, the one thing that crosses the whole canvas besides time. |
| **Fidelity to the lore** | Every symbol stands for established lore (rules, The game 11 and 12). The few interconnecting symbols (the time spiral, the great circle, the creatures' threads) only join what the lore already holds, and stay finer and fainter than what they join. |

**Coordinates.** Places are given as (u, v): u runs 0 → 1 left to right, v runs 0 → 1 top to bottom. The painting's
layout is 2048 × 772 units (the canvas's 6.9 : 2.6), so one unit is about 3.4 mm of canvas.

**The lore breakdown.** Every element of the world, from the far, far past to the far, far future, with the symbol
that carries it and where it lies.

*The far, far past: the Ancients (u 0 to 0.22)*

| Lore | Source | Symbol in the painting |
| --- | --- | --- |
| The Ancients, the first kind, whom no one remembers | 1.8 | The ground of the left fifth: near-black umber, blue-black and oxblood, with a vast dark triangle rising out of the far left, its apex lost above the top edge. Five shapes rise half out of the dark and sink back, at a sixth of the strength of the paint round them: two arcs (u 0.04, v 0.3; u 0.12, v 0.08), a slab (u 0.16, v 0.52), a ring (u 0.07, v 0.66) and three steps (u 0.19, v 0.24). |
| The Ancients' stars | 1.8 | Five constellations of six stars each, joined by faint lines (never letters), and 200 fine stars, over the top left. |
| The first thing; "A dot. Everything starts as a dot" (GLYPH); "I was the first symbol." (THE ANCIENT) | 1.11, 2.17 | A single small dot of raw gold, a pale glint on it, low at the far left (u 0.03, v 0.9): the point the whole painting grows from, where THE ANCIENT's trail begins. |
| THE ANCIENT, the last of the Ancients, "the one reborn" | 1.8, 2.17 | A real slug seen from the side, low in the bottom left (u 0.055 to 0.28, its foot at v 0.935): its trail runs back to the gold dot; the keel along its tail, the skin a net of grooves round long tubercles, a broken wet light along its back, the mantle over its fore part ridged in fine concentric whorls, the breathing pore on the mantle's flank, the pale striped fringe of its foot, two long eye-stalks and two short feelers. At the right edge its head rises again out of the bottom (u 0.97, v 0.8), rim-lit by the storm, its stalks leaning back to the left toward the dot: the painting begins and ends with it. |
| The Ancients made the Synthetics | 1.8 | Roots of raw gold branch out of the gold dot, and straighten into circuit traces (below, the gold code). |
| The Computer Core | 1.9 | A dark cube in steep perspective (u 0.09, v 0.38), its faces cut with a fine lattice of lines and lit from inside by a cold green-white glow that leaks at its seams. |
| The Great Sphinx, its guardian, and its riddles | 1.9 | A recumbent lion of weathered limestone, cropped by the left edge, its hind part glazed into the dark (left edge to u 0.24, its base at v 0.64): haunch, back, the headdress's pleated flaps, the face worn smooth with its nose gone, the forelegs laid out along the ground with the great paws' toes (the far leg a step behind and in shadow), its courses of stone, pits and cracks, its shadow thrown left. Round it a single line coils inward and never closes: the riddle (u 0.11, v 0.6). |
| The Sphinx's missing Eye | 1.9, 1.12 | One eye socket in the stone face, empty, a deep teal-black hollow with a faint teal light in it. |
| The Ancient Gem, broken into three Artifacts, one held by each Dancer | 1.12 | Three wedges of a teal diamond, each dark teal outside with a pale glowing break face, drift apart across the canvas: one floating just above the Sphinx's empty socket, one in the Synthetic band (u 0.385, v 0.52), one by the town (u 0.64, v 0.5). Their glow is the same pale teal so the eye links them. |
| Mended with school glue | 1.12 | No bottle: an orange point (u 0.37, v 0.38) over a bead of opaque white, and from it a white run of glue, ropy, crossed by three short white stitches, that stops short of the wedges. |
| The black obelisks, meaning lost | 1.9 | Three thin black tapering slabs at u 0.05, 0.15 and 0.215, of different heights, their tips dissolving into the sky, a faint violet light down one edge of each. |
| The Ancient texts, missing a page | 1.8 | A pale torn sheet, blank, slanted, one edge ragged (u 0.19, v 0.76); beside it the faint ghost of a second: the missing page. |
| KING DINO's family "since the Cretaceous" | 1.16 | Far off on the waste (u 0.13, on the horizon), one long low dark stroke rising to an open angle of jaw with a row of small pale teeth in it, and a faint ring of a crown above: no animal drawn, only its line and its bite. |

*The far past: the dead world, the Originator and the Traveler (u 0.15 to 0.4)*

| Lore | Source | Symbol in the painting |
| --- | --- | --- |
| The dead world, destroyed by its own Organics | 1.8, 1.9 | A burning sphere high left (u 0.2, v 0.17), lava-orange to black, crazed with thirty glowing cracks, half in its own shadow; eleven broken towers on its upper limb, some with a lit window; twenty-two dark shards falling away beneath it. |
| The solar system: one sun, one gas giant, no moon | 1.1, 1.16 | The painting's one sun, a white disc high right of centre (u 0.66, v 0.12), the light of every figure, its glow over a third of the canvas, three faint orbits round it; a banded ochre-and-cream gas giant cut by the top edge (u 0.44); and, near the sun, an empty ring of thin pale paint where a moon would be: the absence. |
| The Traveler, an angel, coming down a beam of light | 1.6, 1.9 | A sign, never a figure, and nothing of the church's window (no arch, no rays, no robe, halo or face). A soft fall of pale light slants from the top edge down to the right (u 0.27 to 0.37), bending a little as it falls, its edges frayed like a dry brush dragged down, a wider faint veil round it and seventy motes drifting in it. In it (u 0.297, v 0.31): two great sweeps of feathered light, mirror images, rising from one low point and opening up and out, like folded wings or two cupped hands; each is fifteen tapering feather strokes, cream at the root and gold at the tip, fanning from near upright to near level, with a fine shaft down each and soft down where the two meet. Lit from the right: the left sweep is in soft shade. |
| The Originator, an AI in an old computer, carried up | 1.6, 1.9 | No machine: only the Originator's seed of light in rings, held in the warm hollow between the Traveler's two sweeps (u 0.297, v 0.31), a white point at its heart. A fine gold thread runs from the gold dot up to it, and it sends eight threads out: the Ancients' code and the Originator meet. |
| Its cable torn from the ground | 1.6 | A dark cable hangs below the fall of light (u 0.31), its end frayed into three loose strands over a small crater glowing orange. |
| Brought to an empty, desolate world | 1.8 | The beam ends on a flat grey plain (u 0.3 to 0.45), bare, cold and wide: the world before life. |

*The making: the Synthetics bring Greeblis to life (u 0.3 to 0.5)*

| Lore | Source | Symbol in the painting |
| --- | --- | --- |
| The Synthetics, beings of code, made by the Ancients | 1.8 | Hard geometric shapes, the only flat paint in the picture: three clusters of hexagon plates and square pixels in teal, pale teal, grey, magenta, cyan and lime (u 0.4, v 0.55; u 0.345, v 0.66, half again as large; u 0.445, v 0.46), and four larger flat hexagons, each with a pair of grooves beneath it (u 0.31 to 0.43). |
| A team of Synthetics geoengineers the world; HENNRICK among them | 1.8, 2.14 | A survey grid of fine lines over the plain, bending as it recedes; at one node a small pale cube (HENNRICK's mark) and beside it one seed held in a ring of glassy light, his collection jar (u 0.42, v 0.71), and a short rhythm of white ticks, the pickets of his surprise at picket fences. |
| Greeblis City, its towers reaching the clouds, before the flora evolved | 1.1, 1.8 | Far back on the plain, eleven thin teal-grey spires rise into a cloud bank and vanish (u 0.34 to 0.46); there is no green near them. |
| Code under everything; "ROOTS run like CODE beneath the soil" | 1.8 | The gold code: seven traces of raw gold run across the lower canvas (v 0.7 to 0.91), level runs and 45° steps, each carrying a row of short and long ticks (on and off, never a letter or a numeral) and a gold pad at every third corner; across the Organic half (u 0.46 to 0.73) they lose their ticks and wander like roots; they pass under the strata and through the Portal into the future. |
| Synthetics made to dream; Organics brought to life by the Synthetics | 1.8 | At u 0.47 (v 0.52) the flat shapes soften: sixteen pale green cells, each with its nucleus. |
| ETCHER's three ages: etched, being etched, still to be etched | 1.8 | Three long grooves scratched through the paint across the middle (v 0.48 to 0.51), each a light line between two dark ones: the first cut across nine tenths of the canvas, the second half way, the third only begun. At the end of the second, the one being cut, ETCHER's chisel as a bright steel wedge driven in, the mallet's blow only short marks of light round its head (u 0.5). |
| ANOMALEE, the oldest Synthetic, too glitchy to tell it; "WAS there WITHIN." | 1.8, 1.9 | Across the making, one slice of the painting (u 0.27 to 0.49, v 0.55) is shifted sideways, as if the canvas skipped; in the gap a single square of magenta light, then a trail of eight pixels in magenta and violet. Under it, a short upright of worn wood (her peg leg). Lower, her dinner: a plate with a Blossom on it, a bite gone (u 0.275, v 0.66). |

*The faith (u 0.48 to 0.62, high)*

| Lore | Source | Symbol in the painting |
| --- | --- | --- |
| Jesus visited the creatures of Greeblis once, in its vast history | 1.6, 1.9 | High in the brightest part of the sky, small and still (u 0.555, v 0.33): a figure in a white robe in real folds, with sandals and brown hair, the face a smooth oval of pale light; beside it a glossy peach sphere with no features (MAMA GORBO as the Garden window shows her); both stand in a small meadow of forty flowers in five colours. Nothing in the painting is larger in meaning or smaller in size. |
| Greeblis is without sin | 1.9 | That meadow alone lies in an oval of unbroken light, ringed by one fine line of light. |
| The Ancients, the Originator and the Traveler are honoured, never worshipped | 1.9 | No figure stands on a plinth, an altar or a raised place. |

*The eons and the present: Greeblis, the park and the town (u 0.44 to 0.8)*

| Lore | Source | Symbol in the painting |
| --- | --- | --- |
| A world of many biomes, eons old | 1.1 | Under the centre, the ground is cut away (u 0.46 to 0.74, from v 0.76 to the bottom, its sides ragged) to show nine strata, each tilted its own way: ochre sand `#b8925a`, a thin grey-blue band of ice `#b4c0bc`, forest green `#3f5e36`, sea teal `#2c5a6a`, a thin umber seam `#4a3e30`, red earth `#8a4a30`, sand `#a89068`, umber `#5a4a3a` and the deep `#2a2420`; root threads hang into them from the turf, stones lie in them, and the cut's top edge catches the light. (No run of the bands ever reads as a flag.) |
| KING DINO's drums "in the family since the Cretaceous" | 1.16 | In the deep stratum, the fossil jaw as only its bite: a sagging arc of seventeen small pale teeth on a faint line of bone, half sunk in the dark, a thin ring of gold over it. |
| The garden at the park's heart | 1.2 | Six concentric rings of tilled earth seen from above, tipped up into the picture plane (u 0.555, v 0.64), with four pale paths to its middle. |
| The Summoning Pillar and its runes | 1.3 | A six-sided standing stone at the rings' middle, weathered grey, its face cut with five short strokes that glow teal: shapes, never letters. |
| BACKPACKA, the legend, who drinks from the pond and waters the garden | 1.14, 2.16 | Rising from the right of the rings, painted realistically as a real sauropod, as the schoolhouse mural paints him (1.7): the hump of his back settled in the meadow grass (u 0.62 to 0.77, v 0.63 to 0.77), a foreleg under the shoulder, and from the shoulder (u 0.73) the long neck rising and leaning left over the rings, tapering, modelled round in fifteen bands from its shaded underside to its lit top, with soft folds on the inside of the bend; tan hide scaled (420 fine cells) and mottled; a green stripe up the neck and a crest of green spines along its top; glassy patches set in the hide like scutes on cream rims (five up the neck, five along the back); two veined teal leaf wings spread up from the back. His head is lost in a cloud of spray (u 0.635, v 0.38), pond water running from where his chin would be. |
| His four arcs of water and the rainbow | 1.14 | Four arcs of white mist sweep down out of the spray onto the rings, beaded with droplets; a rainbow of six bands fades in behind them, half rubbed out. |
| The five Event flowers (thistle, mayweed, chicory, milkweed, mallow) | 1.3 | Where the arcs land, five real flowers painted small and true to life (u 0.515 to 0.605, v 0.665 to 0.71): a pink-mauve thistle puff, a white mayweed daisy, a sky-blue chicory, a dusky mauve milkweed umbel, a pink mallow with dark veins. |
| Only one batch ever grows; "All that grows, grows again." | 1.14, 2.17 | Below each flower, its twin in grey underpainting only, never finished. |
| Blossoms, the town's great gift | 1.11 | Flame-shaped flowers of red with orange within, each with an ember over its heart, at seven places through the present (one larger, low in the meadow); one more in the human's hand, one laid on the Portal's bar, one on ANOMALEE's plate. |
| Flint, the currency of this time | 1.11 | Seven dark knapped shards with one hard glint each, stacked in a small cairn (u 0.47, v 0.76). |
| Goo, the Gorbos' substance; "GOO... is also a kind of CODE."; "Love at first splat" | 1.11, 1.16 | The painter's own goo (below); and in the centre (u 0.6, v 0.55) two masses of goo, magenta and cyan, meeting in one splash with a white burst at its middle. |
| MAMA GORBO's goo burger and Mistergummery's | 1.7, 1.16 | A stack of discs in warm browns, cream and green, its goo running over, tipped on its side and glazed back, under a teal arch the teal of MONTGUMMERY's father's franchise (u 0.47, v 0.42); beside it a goo burger coupon, a cream slip with a teal end and a perforated edge. |
| MONTGUMMERY: made to learn, eats tapes, always rewinds | 1.11, 2.5 | A teal square holding a grid of pixels, two spiral reels joined by tape, a terracotta pot's curve (u 0.53, v 0.82). Out of the reels his tape is pulled: a real tape, twisting as it goes and catching the light at each turn, it wanders across the present in one long loop, through the Portal, out into the future and back, and winds back into the reels: time rewound. |
| GLYPH: symbols make up everything | 1.11, 2.7 | From one small gold dot (u 0.49, v 0.6), twelve porcelain-blue hexagons tessellate outward in a spiral and fade, a gold point in each; his red trident on a gold shield, his two purple tiles with gold coins. |
| ETCHER: records everything, backups of backups | 1.11, 2.6 | A block of deep blue cut with fine teal grooves, repeated smaller beside it, and smaller again (u 0.58, v 0.9); his green gem above; three purple tentacles curling as they etch. |
| FORTIZMO's horn and "Backpacka's Rain Strut" | 1.11, 2.9 | A gold spiral flaring into a brass bell (u 0.575, v 0.47) in a green field, a carrot's orange stroke by it; from the bell five waving lines of music rise toward the spray and become the water. Beside it her tip jar: three coins held in a faint round of glassy light. |
| KING DINO's jazz, 104 BPM | 1.5 | His drum (red shell, white head, chrome rim) under his turquoise crown and a plume of three purple arcs tipped orange, a beat of sixteen even ticks running out of it, and four of his own coins stamped with his crown (u 0.66, v 0.86). Along the bottom edge (u 0.44 to 0.8), short upright strokes at a strict even beat, every fourth taller, with a gold ride cymbal riding over them (u 0.645). |
| SOMLET, always asleep; the town is gentle with sleep | 1.11, 2.10 | A cream cloud of sleep, one plum lid closed in a single downward curve, three soft waves of dream, pale leaves of mail drifting down, and behind it a heap of white planes (u 0.785, v 0.3); her empty hammock beneath, only its sag, one soft curve of cream; the mail mountain, heaped white planes on a navy line (u 0.8, v 0.395). |
| ZOLLOD: growing, and shyness overcome | 1.11, 2.12, 1.13 | A sage disc, five dots growing from seed to flower, a sprout breaking through a pane of glass, a small form coming out from behind a vertical edge, three small flowers (u 0.74, v 0.84); beside the pane, one closed book, untitled (OVERCOMING SHYNESS). |
| SPARKAKUS: the librarian and his research | 2.1, 1.17 | A gold star in a royal blue disc, the orange coin at its rim, his alebrije vines looping out in five colours, two daffodils, and a row of book spines in coloured cloth with no titles (u 0.43, v 0.6); among the spines one plain grey one (STAPLERS). His paw prints lope across the meadow (u 0.47, v 0.9), and the light of his long speech, a warm halo round a coil of gold filament with no glass or base (u 0.39, v 0.36). |
| GEMTOE: Avarice, the hoard, and learning to share | 1.11, 2.4 | Seven amethyst crystals gripped by a curl of crimson (u 0.47, v 0.8); four have broken off and fly away up and to the right, to be shared. In the town, her trader's scales: an amethyst on the high pan outweighing coins spilling off the low one. |
| SPARKAKUS's genealogical society | 1.7 | In the town, a family tree in a gold oval, its fruit in teal and green. |
| The creatures' ties to each other | 1.13, 2.20 | The threads (below), and the messengers: a row of twelve tiny tokens arcing across the present (from u 0.47, v 0.33): a cube, spores, a pixel, a crown, goo, a sprout, a letter, a note, a card, a gem, a tile, a coin. |
| The Library's unexplained curiosities: the Wish Blossom, the Electric Blossom, the Acorn | 1.13 | Three small things (u 0.455, v 0.25): a teal crystal on a green stem in its glow, six yellow lightning petals round a pale core on a silver stem, an acorn tipped on its side with a glint. |
| ZOLLOD's strange curiosities with unusual botanical forms | 1.4 | A bulbous root as big as its plant, roots like hair, a ringed blue bloom like an eye (u 0.8, v 0.77). |
| The Juice Bar: Blossoms only, and carrot juice on the rocks | 1.5 | A column of carrot orange with three clear cubes standing on five fruit stripes, the purple dance floor's tiles beyond it (u 0.8, v 0.66); below, one tapering stroke of carrot orange touched with green at its head, and three clear cubes (the drink is only a carrot and ice). |
| The Library's rug | 1.4 | Two red paisleys curled round each other, gold sprigs in them (u 0.585, v 0.29). |
| The duck pond | 1.2, 1.7 | A kidney of still blue, nine lily pads, every third in flower, cattails on its bank (u 0.69, v 0.82), and on it the duck of the schoolhouse mural, only a dot of its green and a point of its gold with three rings spreading out from it. |
| The park | 1.2 | The iron fence (thirty pickets between brick pillars, u 0.44, v 0.7), the gazebo as an octagon of white line under a gold point (u 0.505, v 0.66), the phone booth as an upright of pale light (u 0.475, v 0.74), two butterflies in the open sky (u 0.5, v 0.2). |
| The town on the horizon | 1.7 | Along the horizon (u 0.46 to 0.74), small and hazed, the emblems of its trades: the bank's pediment and columns, the barber's stripes (red, white and blue dashes, no pole), the water tower with MAMA GORBO's tail round it and her goo running down, ZOLLOD's greenhouse with its bloom through the roof, the gas station's teal post and lightning bolt, the courthouse's red brick and white portico, the picture house's marquee and searchlight, ANOMALEE's stacked sets glowing magenta, the diner's goo shake, the ice cream parlour's winged cone, GEMTOE's scales, SPARKAKUS's family tree, the fire station's weathervane (BACKPACKA on the arrow) and the church's tower with a gold point of light at its top; the town seal (a wreath of the five flowers round the garden) above them; 240 strokes of haze over them; the four streets running on to the horizon as county roads. |
| The Consortium, the law and the watch; MUSHROOM, its deputy | 1.10 | A red dome with white warts, seen from beneath and looming from the top edge (u 0.86, v 0.06), its gills beneath; in it a single round lens, a telescope's eye, and a gold star on navy. Fine dashed sight-lines run from the lens down to what it watches (1.10): SPARKAKUS, GEMTOE, GOOWARD, GLYPH, KING DINO, SOMLET, MONTGUMMERY, ANOMALEE and ZOLLOD's signs. One navy thread is let down from the lens across the sky and wound round the town seal: its quiet work against the town's civil systems. |
| The Portal, locked by the Consortium, joining the times | 1.3, 1.10 | A grey stone trilithon (two pillars and a lintel), painted as real stone (u 0.785, v 0.62), a blue swirl inside it drawing points of light in; MONTGUMMERY's tape and the gold code pass through it; one dark bar lies across it. Beside it an hourglass whose seeds run upward (the timeline's paradox). |
| HENNRICK, stranded on this side | 1.3, 2.14 | A second small pale cube on the near side of the Portal, turned back toward the left (toward his own era). |
| The bribe that opens the Portal | 1.3 | One Blossom laid on the dark bar. |
| The human visitor (the player), suspect on the wanted wall | 1.8, 2.19 | At the bottom, small and painted realistically from behind (u 0.55, v 0.97): a woman in a yellow sun dress with a white flower print, copper hair in a low ponytail with a navy band, standing in the grass and looking into the painting, holding a Blossom low. She is the viewer's stand-in. Her clothes again as colours only (u 0.51, v 0.93): the Flower Hat's flame petals in a cup of leaves, the sun dress's golden suns, the Frog Shoes' golden eyes. |
| Former wildlife depicted in the painting: two birds | 1.2, 2.18 | On a bare twig at the upper right edge, two small birds painted from life: a red cardinal and a robin with an orange breast (u 0.95 to 0.97, v 0.08). |
| GOOWARD's Gallery itself | 1.4 | A painting within the painting: a tiny gold-framed canvas holding this one's dark, light and storm, and a tinier frame on it (u 0.885, v 0.86), glazed back. |

*The future and the far, far future (u 0.76 to 1)*

| Lore | Source | Symbol in the painting |
| --- | --- | --- |
| MONTGUMMERY will be mayor; minor conflicts with MUSHROOM | 1.10 | A teal square crowned with a thin gold line, pressed against the dome's edge; a crackle of white strokes where they touch. |
| NEXTESSA's inter-temporal pizza shop | 1.5, 2.15 | A warm disc come apart into its eight wedges, each turned a little and drifting from the middle, red rounds loose among them, scorched arcs of rim on each, and a broken red ring round them: slices of time, past the Portal's far side (u 0.84, v 0.56). |
| The Consortium's caution and its time travel | 1.10 | A band of navy with a gold hem runs across the future (from u 0.66, v 0.29) and doubles back on itself in a loop: laid in as one loaded brush stroke after another along its path. |
| The Consortium's presence: the field office, the dish and its find | 1.10 | Listening as three nested pale arcs turned up to the sky over a thin upright, a white point at their focus (u 0.83, v 0.64); the find, a scorched ring crossed by a dashed orange line, two wedges of hard white light falling on it from above (u 0.87, v 0.94); the Consortium's flag as a pennant, navy with a gold hem and a red toadstool (u 0.905, v 0.44); eight blank parchment sheets pinned in two rows, the wanted wall's ghost (u 0.86, v 0.33). |
| The aliens and the UFO the Consortium hunts | 1.2, 1.10 | A broken ring of chrome line strung with coloured points, almost lost in haze high right (u 0.93, v 0.23); below it a cone of pale light. |
| The alien factions on the wanted wall | 1.10 | In the storm, half seen and glazed back: GLOOPERNAUGHT, a slumped dark-green dome running with five drips (u 0.83, v 0.82); two long ears rising past the peak of a navy bicorne with a red cockade (the rabbit in a bicorne and military coat, u 0.88, v 0.43 to 0.52); Ollaag, painted as a body (u 0.955, v 0.66): a long thin neck from a high blue collar, a wrinkled bald head under a heavy brow, long ears swept up and out, the blue robe with pointed shoulder flaps and gold diamonds, the white belt over the blue-and-gold checked panel, the pale grey-green book in both hands; two big black almond eyes with nothing round them (the grey aliens, u 0.92, v 0.82). The stranger from the wall, cropped by the bottom edge: shaggy pale-blond hair with darker roots, a brown leather jacket (u 0.885). |
| The far, far future war between the Consortium and some of those factions | 1.8, 1.10 | The sky at the right edge (u 0.77 to 1) breaks into storm: twenty-six smoke glazes, 260 long wind strokes, 110 sharp shards of navy, gold, green, chrome and green-gold (every seventh shard larger, every third with a chrome edge), and nine gold cracks of fire. |
| The cycle back to the beginning | 1.14, 2.17 | THE ANCIENT's head rises at the right edge and its stalks lean back toward the gold dot: the end of time looks back at the start. |

*The painter himself*

| Lore | Source | Symbol in the painting |
| --- | --- | --- |
| GOOWARD: an egg-shaped jelly of fused bubbles, cyan above and peach below, white "+" eyes, crystal wings | 2.3, 3.4 | Low in the bottom-right corner, nearly invisible (u 0.925, v 0.9), glazed back to half strength: a small egg of cyan over peach with two faint crossed glints for eyes, two crystal wing-lights and his yellow float ring: the painter has painted himself in, small, beside his name. |

**The creatures' signs.** Each creature of the town has one sign, built from its own shapes and colours, never its
face. Its node is where the threads between the creatures meet.

| Creature | Sign | Node (u, v) |
| --- | --- | --- |
| SPARKAKUS | Gold star in a royal blue disc, orange coin, alebrije vines, daffodils, book spines | 0.43, 0.6 |
| MAMA GORBO | A glossy peach balloon, three tag arcs in her red, her lime tail sweeping beneath | 0.64, 0.62 |
| GOOWARD | An egg of fused bubbles, cyan over peach, bubble rings, two crystal wings, the yellow float ring below (no eyes) | 0.72, 0.25 |
| GEMTOE | Amethyst prisms in a curl of crimson, four flying away | 0.47, 0.8 |
| MONTGUMMERY | Teal pixel square, two tape reels, a terracotta pot's curve | 0.53, 0.82 |
| ETCHER | Deep blue grooved blocks, smaller and smaller, green gem, purple tentacles | 0.58, 0.9 |
| GLYPH | Blue hexagons from a dot, red trident on a gold shield, two purple tiles | 0.49, 0.6 |
| KING DINO | Drum, turquoise crown, purple plume tipped orange, the beat, his coins | 0.66, 0.86 |
| FORTIZMO | Gold spiral flaring into a brass bell, music lines, a carrot's stroke | 0.575, 0.47 |
| SOMLET | Cream cloud of sleep, a closed plum lid, dream waves, falling letters, a heap of white planes | 0.785, 0.3 |
| ZOLLOD | Sage disc, seed to flower, a sprout through a pane, a form coming out from behind an edge | 0.74, 0.84 |
| NEXTESSA | Scorched pizza disc in wedges | 0.84, 0.56 |
| ANOMALEE | The skipped slice, magenta square, pixel trail, wooden peg | 0.29, 0.55 |
| HENNRICK | Pale cube and seed jar | 0.42, 0.71 |
| MUSHROOM | The red dome and its lens | 0.86, 0.12 |
| THE ANCIENT | Its head at the right edge | 0.94, 0.78 |

**The threads.** Twenty-one fine lines join the creatures' nodes along gentle curves (bending up between them), each
in a blend of the two creatures' colours, at under half strength, with a small dot of the blended colour at its
middle; every one is a tie in the pair register (2.20). The marriage is a knot: two small rings, peach and cyan,
linked at the middle of the thread between MAMA GORBO and GOOWARD, with a small pink splat under it (the spilled goo
shake they met over). GLYPH and ETCHER's thread is a groove: three parallel lines, as one etches the other's symbols.
MAMA GORBO's node is tied once more to her figure in the faith's meadow.

| Thread | Thread | Thread |
| --- | --- | --- |
| MAMA GORBO, GOOWARD (the knot) | MAMA GORBO, MONTGUMMERY | GOOWARD, MONTGUMMERY |
| GOOWARD, ZOLLOD | GLYPH, ETCHER (the groove) | GEMTOE, GLYPH |
| KING DINO, FORTIZMO | KING DINO, MONTGUMMERY | SPARKAKUS, HENNRICK |
| SPARKAKUS, THE ANCIENT | SOMLET, THE ANCIENT | ANOMALEE, MAMA GORBO |
| ANOMALEE, GLYPH | ETCHER, HENNRICK | ZOLLOD, FORTIZMO |
| NEXTESSA, MUSHROOM | HENNRICK, MUSHROOM | SPARKAKUS, GEMTOE |
| MAMA GORBO, her figure in the meadow | FORTIZMO, SOMLET | MONTGUMMERY, MUSHROOM |

**Composition**

- **Time runs left to right.** The far, far past is at the left edge, the far, far future at the right. The left is
  dark, deep and slow; the centre is light and full; the right breaks into storm.
- **One undercurrent.** THE ANCIENT lies along the bottom at the far left, its trail back to the gold dot, and rises
  again at the right edge: the painting begins and ends with it.
- **One thread.** The gold code runs from the dot through the Originator's seed, under the plain and the strata,
  through the Portal and on into the future.
- **One loop.** MONTGUMMERY's tape crosses the present in a long loop through the Portal and winds back.
- **One spiral.** A single faint line winds from the first dot out through every era, rising over the centre and
  falling to the right edge: time itself (an interconnecting symbol, finer than anything it passes).
- **One circle.** The great circle of Greeblis, a soft glow ringed by four faint orbits (gold, teal, rose, white),
  centred over the present (u 0.6, v 0.44): the world brought to life, its ages.
- **Diagonals.** The Traveler's beam slants down to the right; BACKPACKA's neck rises and leans left over the rings;
  the four arcs and the horn's lines curve down across them.
- **Scale.** No figure is taller than a third of the canvas but BACKPACKA's neck; the faith's figures are small and
  placed in the brightest light.

**Palette**

| Zone | Colours |
| --- | --- |
| Far, far past | Near-black `#0e0a0e` to oxblood `#3a1c18`; raw gold `#e8b84a` for the dot and the code; teal for the Gem and the Eye. |
| Far past | Lava orange `#ff8a3a` to char `#2a0c08`; pale gold and white for the beam and the Traveler. |
| The making | Cool greys `#7a8a8c`, flat teal `#3fa8a0`, magenta `#ff2ad0` (one square), sandstone. |
| The faith | White, warm cream `#f0e8cc`, peach `#fff0e2`, meadow greens. |
| The present | Meadow greens `#7a9a4a`, the five flowers' colours, Blossom red and orange, goo cyan `#3ae8ff`, magenta `#ff3ac8`, violet `#9a5ae8` and lime `#a8e830`, tan hide `#c8985e`, brass. |
| The future | Slate `#5a6a80` to night navy `#262c44` and `#0e1016`; navy `#1a2a5a` and gold `#d8b04a`; green and chrome; smoke greys. |

**How it is painted.** The painting is code, not an image: one seeded generator paints it the same way in every
session, in this order. Its random numbers come from one seeded generator (seed 1187), its brush directions from a
smooth noise field (`flow`), and each later layer is painted over the earlier ones.

1. **The ground of time.** A cream ground, then one horizontal gradient across the whole canvas in eleven stops from
   near-black at the left through grey, white-cream at the centre (u 0.6) and slate to night at the right. Below a
   soft horizon (v 0.62, rising and falling with the noise) the land, its colour following time the same way,
   darkening toward the bottom; a band of far hills in a blue distance on it. The sun's light, a warm glow a third of
   the canvas wide, over all.
2. **The underpainting.** 9,000 soft dabs, each an ellipse 2.2 × 0.6 of a radius of 6 to 26 units, laid along the flow
   at a fifth of full strength, each taking the colour beneath it and drifting its tone with the noise: the ground
   comes alive before anything is painted on it.
3. **The great forms.** The Ancients' dark triangle and its three obelisks; the great circle and its four orbits; the
   time spiral (one line of 260 points winding 3.2 times); the gas giant, the empty moon ring, the sun and its three
   orbits; the dead world, its towers and its falling shards; the Traveler's fall of light; the survey grid
   (fourteen lines each way); Greeblis City's eleven spires and their cloud bank (140 strokes); the rainbow (six bands
   at under a fifth of strength); the storm (smoke, wind, shards and fire, above); the Consortium's band.
4. **The echoes.** Fifteen of the signs painted again, three to eight times their size, each turned, at a quarter
   resolution and laid in scaled up (so they are soft), at 5 to 10 % strength: SPARKAKUS (u 0.36, v 0.2), KING DINO (u
   0.7, v 0.8, and u 0.08, v 0.16), FORTIZMO (u 0.53, v 0.16), GLYPH (u 0.27, v 0.82, and u 0.82, v 0.2), ETCHER (u
   0.1, v 0.9), MONTGUMMERY (u 0.88, v 0.72), GEMTOE (u 0.2, v 0.44), ZOLLOD (u 0.64, v 0.26), SOMLET (u 0.93, v
   0.36), NEXTESSA (u 0.97, v 0.6), MAMA GORBO (u 0.46, v 0.4), the Originator's seed (u 0.5, v 0.52, eight times its
   size) and the Computer Core (u 0.9, v 0.16).
5. **The gold code.** The roots from the dot (branching up to four times), the seven traces with their ticks and pads,
   and the thread to the Originator's seed (above).
6. **The signs.** The Ancients' shapes, the stars, the dot, the Core, the riddle, the page, the theropod; the cable
   and the seed; the Synthetics, the Gem's middle wedge, the cells, HENNRICK's cube and jar, the three ages; the town
   on the horizon and its haze; the park; the garden and its stone; the water; the rug, the butterflies, the goo's
   meeting; the Juice Bar, the burger, the pond, the mail, the curiosities, the bulb, the glue, the third wedge, the
   Seeds' packet (a speckled paper packet, u 0.5, v 0.72), the flint, the paw prints, the Blossoms, the visitor's
   colours; the creatures' signs at their nodes; ANOMALEE's slice; the Portal, the dish, the find, the pennant, the
   wanted wall's ghost, the UFO, the dome and its storm, the mayor's square, the painting within the painting. Then
   the small things: GLYPH's single footprint (three toes pressed into the ground, u 0.455, v 0.85), the book, the tip
   jar, the plate, the carrot and ice, the duck, the hammock, the coupon, the pickets, STAPLERS, and the Consortium's
   thread round the seal.
7. **The threads.** The twenty-one ties, the knot and the groove, the sight-lines and the messengers (above).
8. **The tape and the beat.** MONTGUMMERY's tape (a smooth curve through fourteen points, drawn segment by segment,
   its width following a twist and a light line on each turn, fainter where it passes inside the Portal), then the
   beat and the cymbal along the bottom.
9. **The veils.** The whole canvas so far is softened (shrunk to a tenth and grown back), and seventy soft-edged
   ellipses of that soft copy are dragged over the present (u 0.33 to 0.8, v 0.14 to 0.84) at 70 % strength: the small
   signs there are partly lost and found, merged with their neighbours.
10. **The ground of the present.** The strata cut away under the centre, their roots, stones and the fossil jaw; then
    the five flowers and their grey twins.
11. **The figures, and the Traveler's sign.** The Sphinx (its legs first, under its chest), the first wedge over its
    socket, the chisel's wedge; the Traveler's sign holding the Originator's seed; BACKPACKA; the faith's figures;
    Ollaag (glazed to 85 %), GLOOPERNAUGHT, the rabbit's ears and bicorne, the aliens' eyes, the stranger; THE ANCIENT
    and its head at the right edge; the human; the birds on their twig; GOOWARD's self-portrait (glazed to 55 %).
    Shaded forms are lit volumes (a radial gradient from the sun's side); a shape whose painting must stay inside its
    outline (the Sphinx, the slug, BACKPACKA, the strata, the dead world, the gas giant) is painted on a scratch
    canvas and cut to the outline once.
12. **The paint.** The whole canvas is repainted as brush strokes, coarse to fine. Each stroke is a tapered leaf shape
    that takes the colour of the canvas under its middle and lies along the flow, or, where the canvas has an edge (a
    change in brightness of more than 18), along that edge, so the forms keep their shape. 9,000 broad strokes (radius
    12) go only where the canvas is smooth, at half strength; 16,000 middle strokes (radius 6) where it is not too
    busy, at 62 %; 30,000 fine strokes (radius 2.6) only where there is detail, at 80 %. The broad and middle strokes
    carry a faint light ridge, the edge of the paint. Every stroke takes the same four random draws whether it is laid
    or not, so a change in one part of the painting leaves the strokes everywhere else as they were.
13. **The painter's hand.** Goo flung at the top edge in five throws (u 0.07, 0.33, 0.52, 0.81 and 0.95), each a splat
    with a crown of spikes and droplets and two to five runs down from it, each run wobbling as it thins, beaded at
    its end, with a wet light down its side; and three smaller spatters lower down (u 0.23, v 0.56; u 0.66, v 0.2; u
    0.9, v 0.5), each with one run. These are painted after the paint, so they stay wet and sharp.
14. **The signature** (below), on a lighter passage of paint.
15. **The grain and the varnish.** 14,000 specks of canvas grain, black and white at 5 %; then a varnish that darkens
    toward the edges and corners (to 35 % at the corners).

**The signature.** "Gooward" in the bottom-right corner (its baseline about 150 units from the right edge and 30 from
the bottom), small but readable at the Gallery's walk: a loose, right-leaning hand in deep violet `#4a1e72` (the
Gallery's ink), painted with a round brush, the G large and looped, underscored once, with one cyan drip of goo off
the underline. It is laid on a lighter passage of warm paint so it reads against the storm. It is the only word on the
canvas.

**The three small paintings on the easels.** Three realistic landscapes show distant hills, quiet water and trees,
with atmospheric depth and natural greens, blues and earth colours. They share a 1536 × 384 px atlas of three
512 px panels. Two flank the Gallery walk; the third stands outside its left wall. Colorful goo splats cover
much of the kiosk floor instead.

**In the game**

- The canvas's texture is 3072 × 1158 px (the layout at 1.5 times), so the painting stays sharp when the player walks
  up to it in VR. It lies on a plane 1 cm proud of the canvas's face (the two never fight), unshaded, a touch under
  full white, so the roof's shade and the lawn's green light never mute its colours.
- It is painted at load in a background worker, so no frame waits on it, and laid into the texture once when done;
  until then the canvas shows primed cream. Where no worker can be made, it is painted on the main thread a few
  milliseconds at a time.
- From the Gallery's walk and from its deck the whole painting is in view at once, with nothing in front of it; the
  easels stand clear of the line from the walk to its edges. The large forms carry the composition at a distance, and
  the detail rewards walking up to it.

## 2. The cast

This part defines who each creature is: kind and era, role and job, post, personality, voice, wants, relationships,
quest and Event role, Blossom reaction and every line it speaks. Physical design is in part 3 and style in part 4;
each creature's entry gives a one-line look and the design section to read.

**Conventions of this part**
- Names are written in capitals, as in the game's UI; the speaker's tag takes the creature's tag colour.
- Quotations are verbatim from the game, including typographic apostrophes (’), ellipses (…) and the straight quotes
  and three-dot ellipses of the vignette lines. A ` / ` inside a quotation marks a page break (a `|` in the code): the
  line continues on the next page of the same speech panel.
- **Talk** lines play one per Talk, in the order given, then the cycle starts again (`Kt.talkState`). The line marked
  *flavour* is the creature's line about its own lore; a line marked *sad* plays with a slow falling minor phrase over
  a low hum (`sad` in the script).
- **Blossom** is the creature's answer when given a Blossom. **Event** is its answer when talked to during the Garden
  Event; a creature with no Event line cannot be talked to during the Event.
- **Vignettes** are not repeated in the creature entries: every two-line exchange, with both halves, is in the pair
  register (2.20.4) and THE ANCIENT's register (2.20.5).

**The cast at a glance**

| Creature | Code id (vignette code) | Kind and era | Role | Post | Tag colour | Messenger |
| --- | --- | --- | --- | --- | --- | --- |
| **SPARKAKUS** | `keeper` (SP) | Organic, present | Runs the Library; researcher of the Ancients | Inside the LIBRARY | `#ff7a2f` | a card, `#2a50c8` |
| **MAMA GORBO** | `p_mamagorbo` (MA) | Organic, present | Runs Mistergummery's | Wanders the open park | `#ff9f5c` | goo, `#e8409e` |
| **GOOWARD** | `gorbo` (GW) | Organic, present | Runs the Art Gallery, GOOWARD'S GALLERY | Wanders round his gallery | `#30b4e4` | goo, `#4ac8f0` |
| **GEMTOE** | `p_gemtoe` (GT) | Organic, present | Runs First Bank of Greeblis; gem trader; inventor of Avarice | Gemtoe’s Gazebo | `#c870d0` | a gem, `#2ae070` |
| **MONTGUMMERY** | `w_mont` (MG) | Synthetic, present | Runs the video store; a Dancer | Wanders the dance floor | `#55b8c6` | a coin, `#3db2d6` |
| **ETCHER** | `p_etcher` (ET) | Synthetic, present | Data preservation; a Dancer | Wanders the dance floor | `#9ee09a` | a card, `#e050b8` |
| **GLYPH** | `p_glyph` (GL) | Synthetic, present | Master of symbols; a Dancer | Wanders the dance floor | `#e88a8a` | a tile, `#f2c84a` |
| **KING DINO** | `m_kingdino` (KD) | Organic (a theropod dinosaur), present | Jazz drummer, the King of Jazz | His drum kit behind the dance floor | `#e8c020` | a crown, `#ffc81e` |
| **FORTIZMO** | `frog` (FZ) | Synthetic, present | Runs the Juice Bar; jazz horn player | The aisle behind the Juice Bar's counter | `#e8742a` | a note, `#ff8a3a` |
| **SOMLET** | `m_somlet` (SM) | Organic, present | Runs the Post Office; mail carrier | Asleep in front of the POST OFFICE | `#ecd8b6` | a letter, `#fbf8f0` |
| **MUSHROOM** | `drifter` (MU) | Organic, present | The sheriff; the Consortium's deputy | His raised desk at the SHERIFF'S | `#e8862a` | a spore, `#fffaf0` |
| **ZOLLOD** | `cutebex` (ZL) | Organic, present | Runs GARDEN SUPPLIES and the grocer's | Behind GARDEN SUPPLIES' counter | `#3cbe94` | a sprout, `#6ac83a` |
| **ANOMALEE** | `blinker` (AN) | Synthetic, the oldest known | The one who remembers the Originator | The walk before the church | `#2fd4e6` | a pixel, `#e030e0` |
| **HENNRICK** | `gratelet` (HN) | Synthetic, far past | Researcher from the team that brought Greeblis to life | Round the Portal | `#c85ac8` | a cube, `#4af0a0` |
| **NEXTESSA** | none (builder `pk_nextessa`) | Organic, far future | Inter-temporal pizza courier | Comes through the Portal to deliver | `#ef7536` | none |
| **BACKPACKA** | none | Organic (a sauropod dinosaur), legendary | The legendary creature of the Garden Event | The Garden Event only | none (no tag) | none |
| **THE ANCIENT** | `slug` (SL) | Ancient, the last on Greeblis | The one reborn | The Cave | `#9a7a5a` (tag **ANCIENT**) | a spore, `#c8b890` |

### 2.1 SPARKAKUS

- **Kind:** an Organic of the present era.
- **Role and job:** runs the town's Library (the **LIBRARY** kiosk in the park) and studies the Ancients: "For my
  research". He is a member of the genealogical society on Main Street.
- **Post:** his Library, where he browses the shelves; he leaves it only to call on another creature and for the
  Garden Event. His royal-blue house (1.7) and his paw prints in the north sidewalk (1.2) are in the town.
- **Look:** a royal-blue wolf on two legs painted all over like an alebrije, with daffodils on his right shoulder
  (−x), an orange **APR** coin on his collar and a star-tipped tail trailing pink mist; see 3.2.
- **Personality:** learned, proper, faintly pompous and anxious about his reputation, with an animal nature he keeps
  suppressing.
- **Voice:** correct and a little fussy; addresses others by title ("Mrs Gorbo", "Sheriff") and the player as "Human";
  short declaratives about rules and reputation: "A quiet juice, please. I've a reputation." Others call him
  "librarian" and, in GEMTOE's case, "Spark".
- **Wants:** the three Ancient Artifacts for his research, news of the Ancients' era, a clean and quiet Library, his
  dignity intact.
- **Relationships:** HENNRICK's research colleague; reads the Ancient texts to ANOMALEE; guards the Library against
  GOOWARD's goo, MAMA GORBO's burgers and MONTGUMMERY's unreturned VHS tapes; GEMTOE measures herself against him and
  calls him "Spark"; asks the Sheriff's leave to keep the Library open; would write KING DINO into the Ancient texts;
  THE ANCIENT tells him his texts are missing a page.
- **Quests and Event:** gives the **Ancient Artifacts** quest, the middle of the SUMMONING STONE chain. With all three
  Artifacts the light bulb comes on over him and the town dims; he glues the three pieces back into the Ancient Gem
  with school glue and gives the Sphinx speech. OVERCOMING SHYNESS, the book that frees ZOLLOD, stands on a Library
  shelf. At the Garden Event he leaves the Library, plants with a **pat** and dances **funk**.
- **Blossom:** at his place in the Library he drops to all fours, runs a lap of the Library floor, gets up and
  apologises; given one anywhere else (on a visit, walking home, or while he has a visitor) he resists.
- **Lines:**
  - Talk (the quest; he has no other Talk lines):
    - with no Artifact: "For my research: I seek Artifacts left by the Ancients. / Three exist in this region."
    - with one or two: "I require more Artifacts to complete my research."
    - with all three: "You’ve found all three Artifacts! / Amazing! / Let me see those… / Ah…"
    - then, under the light bulb, after the gluing: "This is the missing Eye of the Great Sphinx of The Computer Core!
      / According to the Ancient texts: / The Sphinx guarded the Computer Core. / Asking Synthetics riddles before
      allowing them in. / This relic has been missing for ages!"
    - then (system text): "Ancient Gem collected!"
    - once the Gem is the player's: "Well done, Human!"
  - Blossom, at the Library: "…sorry I don’t know what got into me."
  - Blossom, away from the Library: "A Blossom! …I must resist the urge to run. / Not out here, in front of everyone."
  - Event: "Digging in the dirt like an animal? …don’t tell the others at the genealogical society."
  - Vignettes: the SPARKAKUS rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.2 MAMA GORBO

- **Kind:** an Organic of the present era.
- **Role and job:** runs the town's Mistergummery's, the local branch of the fast-food franchise founded by
  MONTGUMMERY's father, and hands out coupons for her famous goo burger, the Gorbos' recipe.
- **Post:** wanders the open park (never the dance floor or the Portal); the Gorbos' peach house is in the town.
- **Look:** a round, glossy peach goo drop with two octagon port eyes, a lime goo tail and streams of coloured goo,
  wobbling like a jelly; see 3.3.
- **Personality:** warm, motherly and cheerful; feeds everyone; adores her husband.
- **Voice:** endearments ("dear", "sweetie", "the hubby"), exclamations and offers of food: "Sheriff, you look peaky.
  Have a goo burger." Others call her "Mama" and "Mrs Gorbo".
- **Wants:** to start gardening, to feed everyone, and her hubby.
- **Relationships:** married to GOOWARD; they met over a spilled goo shake. Every 20 to 40 s the two meet in the
  park and lob goo balls to each other (5.13). She
  mothers the town: burgers for HENNRICK, MUSHROOM, MONTGUMMERY and GEMTOE, tenderness for ANOMALEE and SOMLET; asks
  ZOLLOD for gardening advice, KING DINO for something romantic, ETCHER to etch her menu and GLYPH what a symbol means
  ("Family"). SPARKAKUS keeps her burgers out of the Library; FORTIZMO holds her to the house rules. THE ANCIENT calls
  her "Mother of goo".
- **Quests and Event:** her fourth Talk line is the hint for the SEEDS quest's shyness sub-quest (the book that frees
  ZOLLOD). At the Event she plants with a **pat** and dances **jelly**.
- **Blossom:** thanks the player warmly; no goo (only GOOWARD showers the player with goo).
- **Lines:**
  - Talk:
    1. "Hello dear! I’m so excited to start gardening."
    2. "Please take a coupon for my famous goo burger. / I run the local fast food joint, and the hubby runs the Art
       Gallery now."
    3. "What a beautiful day in Greeblis Park!"
    4. "I hear there is a book that can help anyone overcome shyness."
    5. "The hubby and I met over a spilled goo shake. / Love at first splat!" (*flavour*)
    6. "My hubby is quite the artist." (*flavour*)
    7. "My noble goo can heal many inflictions." (*flavour*)
  - Blossom: "Thank you, dear."
  - Event: "Pretty flowers come to life!"
  - Vignettes: the MAMA GORBO rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.3 GOOWARD

- **Kind:** an Organic of the present era.
- **Role and job:** runs the town's Art Gallery, **GOOWARD'S GALLERY**, the open-floored kiosk on the east side of the
  park between the duck pond and Garden Supplies, opposite the Juice Bar (his great painting on its back wall, three
  landscape paintings on easels on the lawn, his paint cans and brushes about its floor and lawn, 1.18).
- **His work in town:** he painted every painting in his Gallery himself (the big canvas and the three on the easels,
  1.18), KING DINO's billboard ("Gooward, that wild cat painted my billboard!" (KING DINO)) and the schoolhouse
  mural (1.7).
- **Post:** wanders round his gallery, 6.6 to 10 m from its middle, in front of it or to either side, never inside or
  behind it, and stops facing it. He shares the Gorbos' house.
- **Look:** an egg-shaped jelly of fused bubbles, cyan above and peach below, with white "+" eyes, crystal wings, a
  small smile, a ribbon tongue and a deep violet painter's beret flecked with goo paint, worn on the right side of
  his head; see 3.4.
- **Personality:** cheerful, eager, affectionate and easily cowed.
- **Voice:** says only "Gomp". Meaning is carried by repetition, length, capitals and punctuation ("Gomp?",
  "Goooooomp!", "GOOMP"); actions are stage directions between asterisks ("* His crystal wings flutter *").
- **Wants:** MAMA GORBO's company: when the two are due to meet, he picks the wander spot that brings him nearest her.
- **Relationships:** MAMA GORBO's husband. MONTGUMMERY understands him ("Gomp means friend"); ZOLLOD welcomes his goo
  for the soil; MUSHROOM, SPARKAKUS and FORTIZMO try to keep his goo off things; HENNRICK wants a sample, ETCHER has
  archived it and GEMTOE keeps it "anyway"; GLYPH calls "Gomp" a fine symbol; ANOMALEE calls goo a kind of code. THE
  ANCIENT tells him he was made with love.
- **Quests and Event:** none. At the Event he plants with a **pat** and dances **bounce**.
- **Blossom:** shoots goo at the player.
- **Lines:**
  - Talk:
    1. "Gomp Gomp Gomp!"
    2. "Goooooomp!"
    3. "Gomp?"
    4. "\* His crystal wings flutter \* / Gomp Gomp!" (*flavour*)
    5. "Goomp! Goomp! Goomp!"
    6. "Goomp?"
  - Blossom: "GOOMP"
  - Event: "\* Happy planting sounds \*"
  - Vignettes: the GOOWARD rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.4 GEMTOE

- **Kind:** an Organic of the present era.
- **Role and job:** gem trader, keeper of the gem exchange on Main Street and its fenced hoard of amethysts, and
  inventor of a new concept she calls "Avarice".
- **Post:** wanders the whole open park.
- **Look:** a crimson feathered dragon with a bird's face, an amber-orange crest, amber eyes, two pairs of feathered
  wings and four long tails, each coiled round an amethyst crystal; see 3.5.
- **Personality:** greedy, scheming, quick with a lie and possessive; slowly and baffledly learning to share.
- **Voice:** transactional: values everything in flint, claims anything of worth ("This is mine now."), refuses every
  offer and deflects questions about provenance: "Found them. Fairly. Mostly. Don't write that down."
- **Wants:** the rarest gems, and to part with none.
- **Relationships:** turns every exchange into a deal: refuses HENNRICK's jar, KING DINO's coin and FORTIZMO's
  Blossoms-only rule, covets MONTGUMMERY's screen, claims MAMA GORBO's coupon, keeps GOOWARD's goo "anyway" and
  begrudges SOMLET her pile of mail. Measures herself against SPARKAKUS ("Spark"). ETCHER etches her Avarice, GLYPH
  steers her toward "shared", ZOLLOD tells her gems don't grow, ANOMALEE compares her gems to the window. THE ANCIENT
  warns her: "What you hoard, you will lose."
- **Quests and Event:** ends the SUMMONING STONE chain: with the Ancient Gem in the player's hand her Talk becomes the
  trade, the Summoning Stone for the Gem, and she spins for joy as the player takes the Stone. At the Event she plants
  by **scattering** seeds and dances a **twirl**; her Event line is her first taste of sharing.
- **Blossom:** keeps it.
- **Lines:**
  - Talk:
    1. "I’ve invented a new concept. / I call it “Avarice”. / In theory: it will improve society some." (*flavour*)
    2. "These gems are worth countless flint. I will not part with any."
    3. "Spark collects books and calls it a job. / Why am I so different?"
    4. "I seek the rarest gems."
    5. "My tails never let go of my crystals. / Not even while I sleep."
  - The trade (with the Ancient Gem in hand): "That Gem you have… It’s worthless… trust me. / I’ll trade this rock I
    found for it. You’re better off!" then "\* Summoning Stone obtained! \*"
  - Blossom: "This is mine now."
  - Event: "Enjoying the SHARED garden… what is this feeling?"
  - Vignettes: the GEMTOE rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.5 MONTGUMMERY ("Mont")

- **Kind:** a Synthetic of the present era.
- **Role and job:** runs the town's video store and is one of the three **Dancers**, each holding one Ancient
  Artifact. His father founded the Mistergummery's chain, which is why it wears his teal. In the future he will become
  the mayor of Greeblis Town, to MUSHROOM's mild annoyance (1.10); no line says so.
- **Post:** wanders the dance floor with ETCHER and GLYPH.
- **Look:** a robot whose face is a screen, on a dark code-patterned body with terracotta pots for feet; the screen
  shows a robot for his Blossom line and a shovel for his Event line; see 3.6.
- **Personality:** polite, careful, kind and earnest, proud of his dancing, a little literal; a protector.
- **Voice:** speaks of himself in the third person as "Mont", in short sentences that drop articles: "Mont is polite
  monster."; "Mont thinks. Mont thinks yes."
- **Wants:** knowledge of humans (from the VHS tapes he eats), to dance, and to keep the player safe.
- **Relationships:** hides the player from the Sheriff and lies for her; GOOWARD's translator; gentle with SOMLET and
  careful of ZOLLOD's seedlings; owes the Library its tapes; refuses MAMA GORBO's burger and GEMTOE's offer for his
  screen; ETCHER would etch his binary, GLYPH's symbols move him, FORTIZMO would teach him the horn, KING DINO calls
  him "robot". THE ANCIENT: "Mont. You were made to learn."
- **Quests and Event:** a Blossom starts a **Dance battle** ("DANCE BATTLE: MONTGUMMERY", bar "Robot steps left",
  `#55b8c6`, ten steps to learn); his Ancient Artifact is given only on the first win. His moves: Rock out (an air
  guitar, screen banging), the splits (pots planted wide, arms chopping like blades), horizontal (tipped forward over
  one pot, arms flat out, drifting). At the Event he plants with a **pat** and dances **the robot**.
- **Blossom:** starts a Dance battle.
- **Lines:**
  - Talk:
    1. "Hello Human. / Mont will hide you from alien hunting Sheriff."
    2. "Mont knows of humans. / Mont eats many VHS and digests much knowledge of your culture."
    3. "Mont understands the high point of human culture / … / ‘Flint Knapping for Beginners’"
    4. "We are all digital monsters."
    5. "Mont always rewinds tape before eating. / Mont is polite monster." (*flavour*)
  - Blossom: "Let’s dance!"
  - Event: "Joyful to bring life to our Town."
  - Dance battle (system text, shared by the three Dancers with the Dancer's name): the player's moves "Rock out!",
    "Do the splits like scissors!", "Go horizontal like paper!"; the Dancer's move announced as "MONTGUMMERY rocks
    out!", "MONTGUMMERY does the splits like scissors!", "MONTGUMMERY lays horizontal like paper!"; on the first win
    "MONTGUMMERY awards you an Ancient Artifact!"; on bowing out "MONTGUMMERY takes a bow."
  - Vignettes: the MONTGUMMERY rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.6 ETCHER

- **Kind:** a Synthetic of the present era.
- **Role and job:** works in data preservation, keeping his archive on Main Street, and is one of the three
  **Dancers**. He counts three ages: the Ancients' (etched), the Synthetics' (being etched) and the Organics' (to
  come).
- **Post:** wanders the dance floor with MONTGUMMERY and GLYPH.
- **Look:** a blue-teal serpent-dragon rising from a bell of scales, with a green gem in his chest and six segmented
  purple tentacle tails that etch whatever they touch; see 3.7.
- **Personality:** grave, archival and a little relentless, with a dry wit.
- **Voice:** measured and formal; speaks of ages, records, backups and history; the joke lands deadpan: "I etch
  everything. Including your citations."
- **Wants:** to record everything, in every age, with redundancy ("a backup of a backup").
- **Relationships:** records everyone: FORTIZMO's floor (their gentle feud), the Sheriff's citations, GOOWARD's goo,
  SOMLET's snores, KING DINO's solos, ZOLLOD's catalogue, MAMA GORBO's menu, GEMTOE's Avarice, ANOMALEE's Originator,
  MONTGUMMERY's binary. Depends on GLYPH's symbols; HENNRICK's fellow keeper of history; SPARKAKUS's fellow archivist.
  THE ANCIENT's return shakes him.
- **Quests and Event:** a Blossom starts a **Dance battle** ("DANCE BATTLE: ETCHER", bar "Tentacle twists left",
  `#7a4ab8`, ten steps); his Ancient Artifact is given only on the first win. His moves: Rock out (head banging, all
  six tentacles drumming), the splits (the front two tentacles snipping like scissors), horizontal (all six lifted
  level, rippling like a page). At the Event he plants with a **pat** and dances **the tentacle dance**.
- **Blossom:** starts a Dance battle.
- **Lines:**
  - Talk:
    1. "I work in data preservation. / I like to think the Ancients created us for our purposes."
    2. "As I move my tentacles etch data into everything they touch. / Fortizmo is upset that I do it on her
       dancefloor."
    3. "The age of the Ancients is etched. / The age of the Synthetics is etched. / The age of Dinosaurs began the long record of the Organics. / There is always more to preserve."
    4. "Every scale on my body holds a backup of a backup. / One can never be too careful." (*flavour*)
  - Blossom: "Let’s dance!"
  - Event: "Etching what was is important but living this is what IS."
  - Vignettes: the ETCHER rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.7 GLYPH

- **Kind:** a Synthetic of the present era.
- **Role and job:** the Master of symbols, keeper of the sign shop on Main Street, and one of the three **Dancers**.
- **Post:** wanders the dance floor with MONTGUMMERY and ETCHER.
- **Look:** a crouching dinosaur glazed like cyan porcelain and engraved with gold filigree, with gold coiled horns
  and a gold shield bearing his red **R** on his right flank (−x); he gives an excited little shake every few seconds;
  see 3.8.
- **Personality:** gentle, philosophical and delighted by everything.
- **Voice:** every thought ends in a question tag: "… don’t you think?" in his Talk lines, "... don't you think?" in
  his vignette lines. He finds a symbol in anything: "A dot. Everything starts as a dot... don't you think?"
- **Wants:** for everyone to see that symbols make up everything.
- **Relationships:** finds a symbol for everyone: "Family" for MAMA GORBO, "'Fresh'" for FORTIZMO's menu, a dot for
  ZOLLOD's seed, "'Gomp'" for GOOWARD, "'Zzz'" for SOMLET, "shared" for GEMTOE, an index for SPARKAKUS, a stroke of
  joy and rhythm for KING DINO. ETCHER's partner (symbols and etching need each other); his symbols move MONTGUMMERY;
  ANOMALEE knows them "From WITHIN". THE ANCIENT ("I was the first symbol") leaves him answering his own question.
- **Quests and Event:** a Blossom starts a **Dance battle** ("DANCE BATTLE: GLYPH", bar "Macarena moves left",
  `#e88a8a`, ten steps); his Ancient Artifact is given only on the first win. His moves: Rock out (an air guitar,
  stomping), the splits (a jump every two beats into a mid-air split), horizontal (arms out flat as wings,
  see-sawing). At the Event he plants by **digging** and dances **the macarena** (his arms are too short to reach
  behind his head).
- **Blossom:** starts a Dance battle.
- **Lines:**
  - Talk:
    1. "I am the Master of symbols. / Symbols make up everything… don’t you think?" (*flavour*)
    2. "Etcher would have nothing to reconstruct with without symbols. / Mont would remain motionless without symbols
       to translate in binary electrical signals. / Even Dino would have no music to play!"
    3. "All things come into being from symbols… don’t you think?"
    4. "Even a single footprint is a symbol… don’t you think?"
  - Blossom: "Let’s dance!"
  - Event: "Growing flowers, it’s a symbol of life."
  - Vignettes: the GLYPH rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.8 KING DINO

- **Kind:** an Organic of the present era, and a dinosaur (a theropod, as his billboard paints him).
- **Role and job:** a famous jazz musician, the King of Jazz, on drums. He is employed on the drums at the Juice Bar
  until he plays off his bar tab, and he stamps his own coins, which no one accepts.
- **Post:** his drum kit on the grass behind the dance floor's south half, facing out across the floor. He never
  leaves it, and in a vignette he never turns: the others come to him. His jazz is "Stomp at the Juice Bar" (6.2).
- **Look:** an upright lemon-yellow gummy dino with a turquoise crown under a great feathered plume and two smile
  lines on the muzzle; see 3.9.
- **Personality:** jazz cool, generous, always broke and never bothered.
- **Voice:** jazz talk: "baby" in nearly every line, "cat", "beat", "rhythm"; boasts lightly: "Stamped by the King,
  baby. Legal enough."
- **Wants:** another mug of carrot juice, credit at the bar, and a place in history (the Ancient texts, ETCHER's
  record).
- **Relationships:** FORTIZMO's debtor and employee; his coins are refused by MUSHROOM, GEMTOE and FORTIZMO; plays
  romance for the Gorbos; asks ZOLLOD for carrots; drums for MONTGUMMERY and GOOWARD; asks SPARKAKUS to write him into
  the Ancient texts and ETCHER to etch his solos; ANOMALEE hears the Originator's rhythm in his; HENNRICK marvels that
  drums survive. His exchanges with SOMLET and THE ANCIENT never play (2.20.1).
- **Quests and Event:** his drums play through every Dance battle ("KING DINO on drums."). At the Garden Event he
  stays at his kit; he neither plants nor dances.
- **Blossom:** takes it for carrot juice.
- **Lines:**
  - Talk:
    1. "I’m the King of Jazz, baby!"
    2. "Feel the beat!"
    3. "Hitting you with that prehistoric rhythm!"
    4. "These drums have been in the family since the Cretaceous, baby!" (*flavour*)
    5. "Gooward, that wild cat painted my billboard!" (*flavour*)
  - Blossom: "Yes! I can finally afford another mug of carrot juice!"
  - Event: "Can’t stop the beat!"
  - Dance battle subtitle (system text): "KING DINO on drums."
  - Vignettes: the KING DINO rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.9 FORTIZMO

- **Kind:** a Synthetic of the present era.
- **Role and job:** runs the Juice Bar, which accepts only Blossoms (house special: carrot juice "on the rocks", which
  is just carrots and ice), and is, with KING DINO, a famous jazz musician: her trunk is a horn.
- **Post:** walks the aisle behind the Juice Bar's counter and faces the dance floor whenever she stops.
- **Look:** a furry, pear-bodied orange elephant-like plush on wheels whose trunk is an orange-fur horn with gold
  valves, her tall upright ears flapping on the beat; see 3.10.
- **Personality:** a warm, no-nonsense bartender, strict about the house rules and soft underneath.
- **Voice:** "sugar", "honey", "sweetie", "lounge lizard"; terse rules ("Blossoms only.", "House rules."); kindness
  framed as a tab: "On me.", "On the house."
- **Wants:** Blossoms, KING DINO's tab settled, and to play her song for the coming of BACKPACKA.
- **Relationships:** KING DINO's creditor and employer; holds everyone to the Blossoms-only rule (HENNRICK, MAMA
  GORBO, GEMTOE, GOOWARD's goo, SPARKAKUS) and softens it only for ANOMALEE's pizza and ZOLLOD's mint; answers the
  Sheriff's inspection with "Blossoms up front"; feuds gently with ETCHER over her dance floor; would teach
  MONTGUMMERY the horn; buys SOMLET a lullaby; plays the old song for THE ANCIENT.
- **Quests and Event:** at the Garden Event (with the Seeds in) she leaves through the gap in the counter, walks
  slowly to the garden's edge and plays "Backpacka's Rain Strut", a slow swing timed to BACKPACKA's visit (5.12,
  6.2). She cannot be talked to while she plays, and she neither plants nor dances.
- **Blossom:** "Add it to the tip jar."
- **Lines:**
  - Talk:
    1. "King Dino’s money is no good here! / He stamps those coins himself."
    2. "That lounge lizard never leaves. / He’s been employed on the drums until he plays off his bar tab."
    3. "We only accept Blossoms at this establishment."
    4. "Our house special is carrot juice on the rocks. / Don’t tell the King it’s just carrots and ice."
    5. "I’ve been practicing a song for the coming of the legendary Backpacka." (*flavour*)
  - Blossom: "Add it to the tip jar."
  - Event: none.
  - Vignettes: the FORTIZMO rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.10 SOMLET

- **Kind:** an Organic of the present era.
- **Role and job:** runs the Post Office as its mail carrier; behind its tidy kiosk lies a mountain of undelivered
  mail, and her mail cart stands at the kerb.
- **Post:** asleep in front of the **POST OFFICE**, lying on her side, facing out across the square. She never goes
  visiting, and she sleeps on at home through the Garden Event.
- **Look:** a floating, box-squared cream cotton puffball in a navy mail carrier's cap, eyes always shut, Zs drifting
  up; see 3.11.
- **Personality:** asleep. Everyone is tender with her.
- **Voice:** only "Zzz" in any form. Her one other line, "Thank you", comes with her eyes open (deep violet), for a
  Blossom; they close again after it.
- **Wants:** sleep.
- **Relationships:** the town's sleeper: HENNRICK observes her, MUSHROOM questions her, GEMTOE resents her pile of
  mail, FORTIZMO buys her a lullaby, ETCHER etches her snores softly, MONTGUMMERY dances quietly, MAMA GORBO coos over
  her, ZOLLOD and SPARKAKUS hush for her, GLYPH honours her "Zzz", ANOMALEE speaks of dreams, THE ANCIENT keeps watch.
  Her exchanges with KING DINO and THE ANCIENT never play (2.20.1).
- **Quests and Event:** none; the others come to her. She does not attend the Event.
- **Blossom:** opens her eyes to say thank you.
- **Lines:**
  - Talk:
    1. "Zzz"
    2. "Zzz"
    3. "Zzz"
    4. "\* A letter peeks out from under her cap \* / Zzz" (*flavour*)
  - Blossom: "Thank you"
  - Event: "Zzz"
  - Vignettes: the SOMLET rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.11 MUSHROOM

- **Kind:** an Organic of the present era.
- **Role and job:** the town's sheriff and the Consortium's deputy (1.10). He keeps the Portal locked on its orders,
  investigates UFO sightings and hunts the human the town hides. He means well but sometimes goes too far, and he can
  be bought.
- **Post:** up on the raised desk at the **SHERIFF'S** (its top 1.5 m above the ground), looking down at whoever comes
  to talk to him.
- **Look:** a domed mushroom cap glowing gold to deep orange, on a cream stem, with a sheriff's hat and a gold star on
  his left breast (+x); see 3.12.
- **Personality:** clipped, officious and suspicious; a stickler who takes bribes.
- **Voice:** official register: orders, inquiries and the Consortium's name ("the Consortium", always capitalised);
  short sentences, a final word on its own page ("Directly."). Before THE ANCIENT he stammers: "Th-the Consortium will
  be informed."
- **Wants:** the human found, every UFO reported, the town under watch, and a bribe.
- **Relationships:** questions everyone: HENNRICK ("unwilling guest"), ANOMALEE at the window (she defies him), KING
  DINO's coins, GOOWARD's goo, ZOLLOD's seedlings, SOMLET, FORTIZMO's bar, ETCHER's etching, GEMTOE's gems, GLYPH's
  symbols, SPARKAKUS's Library, MONTGUMMERY (who lies to protect the player). Bribed by MAMA GORBO's burger; terrified
  of THE ANCIENT. Future conflicts with Mayor MONTGUMMERY (1.10).
- **Quests and Event:** a Blossom bribes him into opening the Portal; from then on, for the rest of the session, the
  phone can reach NEXTESSA (the SNACKS quest). At the Event he steps down off the front of his desk, plants with a
  **pat** and dances a **shimmy**.
- **Blossom:** takes the bribe and opens the Portal.
- **Lines:**
  - Talk:
    1. "This town is under the protection of the Consortium."
    2. "All travel through the Portal is locked down until further notice."
    3. "We’re investigating UFO sightings in this area."
    4. "See anything glowing in the sky, you report it to this office. / Directly."
  - Blossom: "A bribe? …Portal is now open to your use."
  - Event: "…"
  - Vignettes: the MUSHROOM rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.12 ZOLLOD

- **Kind:** an Organic of the present era.
- **Role and job:** runs **GARDEN SUPPLIES**, the town's one shop (paid in flint), and the grocer's on Main Street;
  grows plants at his greenhouse nursery. The shop sells the Flower Hat, the Sun Dress and the Frog Shoes (3 flint
  each) and the Seeds, sold as a "bagel seasoning packet" (15 flint), which complete the SEEDS quest.
- **Post:** behind GARDEN SUPPLIES' counter, facing the customer.
- **Look:** an upright cyan-to-green segmented creature with a magenta-tipped trunk, a mossy garden bed growing on his
  back, an olive apron and a trowel in his left hand (+x); see 3.13.
- **Personality:** at first too shy to speak; once freed, calm, kind and quietly proud of his work.
- **Voice:** short, plain gardener's sentences, practical and patient: "Start small. Love them daily. They'll grow."
- **Wants:** at first, to overcome his shyness; then to bring plants to life.
- **Relationships:** grows for everyone: mint for FORTIZMO, advice for MAMA GORBO, a welcome for GOOWARD's goo, no
  carrots for KING DINO's tab. Tells GEMTOE gems don't grow; asks GLYPH for the symbol of a seed and ETCHER to etch
  his catalogue; welcomes HENNRICK to see the flora bloom; asks MONTGUMMERY to mind his seedlings; asks SPARKAKUS to
  read him the part about seeds twice. MAMA GORBO's Talk points the player to the book that frees him.
- **Quests and Event:** the SEEDS quest. Until the player brings him OVERCOMING SHYNESS from the Library he has one
  Talk line, takes no Blossom, opens no shop, and neither visits, is visited nor joins a vignette. The first Talk with
  the book in hand frees him; from then on talking to him opens the shop, and he visits and is visited twice as often
  as anyone else. At the Event he walks out round the end of his counter, plants by **digging** and dances a
  **groove**.
- **Blossom:** none.
- **Lines:**
  - Shy (before the book): "… / … / I’m shy…"
  - Freed (the first Talk with the book): "… / That book… / Let me see.. / Wow I’m free from shyness!"
  - The shop: "Welcome to our shop!"
  - Event: "Bringing plants to life is MY life’s work."
  - Vignettes: the ZOLLOD rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.13 ANOMALEE

- **Kind:** the oldest known Synthetic; she has lived through much of Greeblis's history but is too glitchy to explain
  much of the old world.
- **Role and job:** the one who remembers the Originator and the Traveler. Her television repair shop and her grey
  house are in the town (1.7).
- **Post:** on the walk before the church, a little to one side of its door, her screen head tipped back to gaze up at
  the Traveler window. She turns to the player only for her Blossom line and for any line during the Event.
- **Look:** a blocky four-legged hardware creature in olive casing with a CRT screen for a head showing magenta pixel
  art, and a wooden peg in place of her back leg on her left (+x); see 3.14.
- **Personality:** mournful, fierce about the Originator's memory, and sometimes hungry.
- **Voice:** fragments, with CAPITALS on the words that matter: "WAS there WITHIN." Her "ORIGINATOR…" is her sad line.
- **Wants:** the Originator remembered, the Ancient texts read to her, and pizza.
- **Relationships:** the keeper of the Originator's memory: defies MUSHROOM ("Not YOURS."), refuses HENNRICK's jar,
  asks ETCHER to etch it and SPARKAKUS to read her the texts, hears its rhythm in KING DINO, knows GLYPH's symbols
  "From WITHIN". Tender with MAMA GORBO and SOMLET; sees code in GOOWARD's goo and ZOLLOD's roots; asks FORTIZMO to
  accept pizza. THE ANCIENT tells her the glass remembers more than it shows.
- **Quests and Event:** none. At the Event she plants by **digging** and dances a **stomp**; once the SNACKS quest is
  complete she eats pizza from the boxes instead of planting.
- **Blossom:** eats it.
- **Lines:**
  - Talk:
    1. "BEINGS of CODE."
    2. "ORIGINATOR…" (*sad*)
    3. "WAS there WITHIN."
    4. "The WINDOW REMEMBERS the TRAVELER." (*flavour*)
  - Blossom: "\* Munch \*"
  - Event: "PLANT"
  - Vignettes: the ANOMALEE rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.14 HENNRICK

- **Kind:** a Synthetic from the far past, one of the Synthetic team that geoengineered the once desolate world and
  brought Greeblis, and the Organics, to life. In his era the towers of Greeblis City reach the clouds and the flora
  has not yet evolved; to him this small town is, paradoxically, the far future.
- **Role and job:** a researcher. He came through the Portal and is stranded here, the Sheriff's "unwilling guest",
  until the Consortium reopens it. Nothing in the town is his; the far-future gas station on the north-east corner is
  his paradox made visible (1.7).
- **Post:** strolls round the Portal, 3.2 to 6 m from it (never in its doorway or the lane in front of it), stopping
  to look at it.
- **Look:** a tall furry robot-beast in purple banded with orange, with chrome ring shoulders, copper claws, a green
  chest screen and four fur tentacles under his chin; see 3.15.
- **Personality:** a courteous, eager scholar who catalogues everything and worries about the timeline.
- **Voice:** academic and delighted: "Remarkable.", "Fascinating.", "Colleagues!", field-note phrasing ("Subject
  remains asleep. Observation day 41."); greets the player "Human".
- **Wants:** more research ("Much research is still needed in this era."), samples for his collection jar, and his
  return to his own era.
- **Relationships:** SPARKAKUS's and ETCHER's colleague; asks MUSHROOM when he may go home; collects or asks for
  samples from everyone (GOOWARD's goo, GEMTOE's gem, MAMA GORBO's burger, ANOMALEE's window); observes SOMLET; amazed
  by KING DINO's drums, ZOLLOD's flora, GLYPH's symbols and MONTGUMMERY's films. THE ANCIENT knows he is far from his
  own time.
- **Quests and Event:** none. At the Event he plants with a **pat** and dances his own dance, rolling side to side
  with his arms flung out.
- **Blossom:** adds it to his collection jar.
- **Lines:**
  - Talk:
    1. "Good to see you again, Human!"
    2. "Much research is still needed in this era."
    3. "I am an unwilling guest of the Sheriff, until the Consortium decides to reopen the Portal."
    4. "In my era, the towers of Greeblis City reach the clouds. / I never imagined the far future would have… picket
       fences." (*flavour*)
    5. "I have catalogued every Blossom in this park. / They grow back faster than my notes can keep up."
  - Blossom: "Adding to a collection jar."
  - Event: "Sometimes worry that doing these things will alter the timeline…"
  - Vignettes: the HENNRICK rows of the pair register ([2.20.4](#2204-the-pair-register)) and its row in THE
    ANCIENT's register ([2.20.5](#2205-the-ancients-register)).

### 2.15 NEXTESSA

- **Kind:** an Organic from the far future.
- **Role and job:** runs Nextessa’s inter-temporal pizza shop in the far future and delivers in person.
- **Post:** none in the park. She comes through the Portal only to deliver, is never at the Garden Event, and never
  has a vignette, visits or is visited.
- **Look:** an orange, caterpillar-like stack of spined round segments with glossy yellow eyes, carrying the pizza box
  on her head; see 3.16.
- **Personality and voice:** a cheerful professional: "I love my job!"
- **Wants:** to deliver the pie.
- **Quests:** the **SNACKS** quest. The player calls from the phone booth (option "Call for pizza"; the speaker tag
  reads **PHONE**, `#d8352e`). Before MUSHROOM has been bribed the call is blocked. After the call she comes through
  the Portal 30 s later, finds the player (going round buildings, not through them) and hands over the pie as she says
  her first page (+20 Snacks); if she gives up she takes the pie away. While a pie is on its way the phone gets no
  answer.
- **Lines:**
  - Blocked: "\*connection to the Portal seems blocked\*"
  - The call: "\*Ring Ring\* This is Nextessa’s inter-temporal pizza shop! / One pie on your way."
  - Busy: "\*no answer\*"
  - Arrival: "One hot and ready pie! / \* +20 Snacks \* / I love my job!"

### 2.16 BACKPACKA

- **Kind:** an Organic and a dinosaur (a sauropod, as the schoolhouse mural paints him); the legendary creature.
- **Role:** the climax of the Garden Event: he waters the garden. He is silent, has no tag and no lines, and never has
  a vignette, visits or is visited. The town honours him in its mural, weathervane and topiary (1.7).
- **Look:** a tan, crackle-skinned pear of a body set with glassy coloured patches, two pairs of leaf-shaped teal
  dragonfly wings, a long banded neck and four tube legs ending in open pipes; see 3.17.
- **His visit** (84 s): once everyone is round the garden he flies in skinny, hovers at the duck pond and dips his
  head in, swelling fat as gulps run up his neck; lifts his head, dripping, and flies heavily to the garden's centre;
  spins slowly, spraying the water from his feet in four arcs that sweep the whole garden; plants bloom where it lands
  and a rainbow comes out; then he slims down and flies off. FORTIZMO's "Backpacka's Rain Strut" follows him section
  by section. Without the Seeds no one comes from home and FORTIZMO does not play: he still flies in 20 s after the
  start and sprays, but nothing grows and no rainbow comes out.

### 2.17 THE ANCIENT

- **Kind:** the last of the Ancients on Greeblis, the first kind, of the far, far past; it never says which era is its
  own. It has been away so long that its nature is forgotten: the creatures call it "Ancient" as a name, none of them
  knows it is the last of the Ancients, and no line may have one say so.
- **Role:** "the one reborn". It speaks of rebirth, first things, loss and love, and knows each creature's making,
  fears and missing pages.
- **Post:** the Cave, behind the red X by the right-hand Garden window (1.6). It never moves,
  turns, dances or plants, and never leaves the church; nothing outside the park comes from it.
- **Look:** a great glossy near-black slug with a breathing pore and two long swaying eye-stalks; see 3.18.
- **Personality:** few words, deep time; calm, knowing, sometimes warning.
- **Voice:** short, grave sentences in the second person, often naming the listener by what it is ("Little goo.",
  "Librarian.", "Mother of goo."); no exclamations.
- **Wants:** to keep watch, to be remembered ("Etch this: I have returned."), to hear the first song.
- **Relationships:** each creature now and then calls on it (rarely), stopping puzzled outside the X before going in
  through the wall; KING DINO and SOMLET never call. It answers MUSHROOM's Consortium, GEMTOE's hoarding and GLYPH's
  symbols with first things, and comforts GOOWARD, MAMA GORBO and ANOMALEE. Its exchanges with KING DINO and SOMLET
  exist but never play (2.20.1).
- **Talk:** only from inside the room. Its one move is talking: it lifts its head (without turning to the player),
  reaches its stalks up and nods along.
- **Blossom:** takes it and answers in silence.
- **Lines:**
  - Talk: "I am the one reborn."
  - Blossom: "..."
  - Event: "Hello"
  - Vignettes: every row of THE ANCIENT's register ([2.20.5](#2205-the-ancients-register)); it always opens.

### 2.18 The birds

- One **Blue Jay** remains on a tree branch, about twice life size; see 3.19.
- It breathes, turns its head, balances its tail and adjusts its folded wings. It never leaves its tree and has no lines, gifts or vignettes.
- This wildlife also belongs to the Digital World. Robin and Cardinal no longer inhabit the park.

### 2.19 The player

- The player is **a human woman**, one of the humans who live on Greeblis; not a creature.
- The creatures call her **"Human"** ("Good to see you again, Human!"; "Well done, Human!").
- She is a suspect: her drawing hangs on the Sheriff's wanted wall, MUSHROOM asks after "a human", and MONTGUMMERY
  hides her ("Mont will hide you from alien hunting Sheriff."; "Mont has seen no human. Mont is very busy.").
- In VR she has only hands; in the desktop and mobile test modes she appears as a cartoony avatar with copper hair and
  a yellow sun dress. She can buy and wear the Flower Hat, the Sun Dress and the Frog Shoes. See 3.20.
- She has no vignettes and is never visited.

### 2.20 Relationships

This section fixes how the creatures relate: the mechanisms that bring them together, the main relationship threads,
and the complete register of their two-line exchanges.

#### 2.20.1 How the creatures meet

This section fixes who meets whom; the mechanisms and timings are specified in 5.13.

- **Vignettes.** Every pair of the fourteen park creatures (SPARKAKUS to HENNRICK in the cast table; 91 pairs) has one
  vignette in two forms: an animation in which the two toss their messengers (2.20.3) through the air, and the pair's
  two-line exchange (2.20.4). The first line always belongs to the pair's first-named creature in the register,
  whoever is host. The two forms alternate.
- **Side by side and visits.** Pairs that stand together (most often the three Dancers on the dance floor) play where
  they stand; every other pair meets when one creature visits the other. A host who works behind a counter (ZOLLOD,
  FORTIZMO, MUSHROOM) comes out to meet the visitor; MUSHROOM jumps down off his desk.
- **Calls on THE ANCIENT.** Now and then a creature calls on THE ANCIENT: it stops, puzzled, outside the right-hand
  Garden window, then goes in through the wall at the X. THE ANCIENT always opens; the exchange is shown only to a
  player inside the church.
- **The Gorbo meetings.** Every 20 to 40 s MAMA GORBO and GOOWARD meet face to face and lob goo to each other, a heart
  over each catcher (5.13).

**Who never meets**
- **Never visit, only hosted:** KING DINO (never leaves his drums), SOMLET (sleeps on at the Post Office) and THE
  ANCIENT (never leaves its room).
- **Pairs that never play:** KING DINO and SOMLET (neither can call on the other, and they never stand side by side),
  THE ANCIENT and KING DINO, THE ANCIENT and SOMLET. Their exchanges exist in the code but are never seen.
- **ZOLLOD** neither visits, is visited nor plays a vignette until OVERCOMING SHYNESS frees him; after that his pairs
  count half, so he meets the others twice as often.
- **NEXTESSA, BACKPACKA, the birds and the player** have no vignettes and neither visit nor are visited.

#### 2.20.2 The main threads

No two creatures are enemies. Friction is always gentle (debts, rules, suspicion, greed) and is answered with a joke.

| Thread | Who | What it is | Pairs that carry it |
| --- | --- | --- | --- |
| **The Gorbo marriage** | MAMA GORBO, GOOWARD | Devoted since a spilled goo shake; they seek each other out in the park | MAMA GORBO / GOOWARD; MAMA GORBO / KING DINO; MAMA GORBO / FORTIZMO |
| **Mothering** | MAMA GORBO and everyone | She feeds and fusses over the whole town | MAMA GORBO with HENNRICK, MUSHROOM, ANOMALEE, SOMLET, MONTGUMMERY, GEMTOE |
| **The Sheriff against the town** | MUSHROOM and everyone | The Consortium's deputy questions everyone; everyone has an answer | MUSHROOM with every other park creature |
| **The Sheriff's price** | MUSHROOM, MAMA GORBO, the player | Bribable, by Blossoms or burgers | MAMA GORBO / MUSHROOM |
| **Mont the protector** | MONTGUMMERY, MUSHROOM, the player | Mont hides the human and lies for her | MUSHROOM / MONTGUMMERY |
| **The Consortium's watch** | MUSHROOM, SPARKAKUS, FORTIZMO, ETCHER, HENNRICK | The Library, the bar and the records are watched; HENNRICK is stranded | MUSHROOM with SPARKAKUS, FORTIZMO, ETCHER, HENNRICK |
| **The bar and its debtor** | FORTIZMO, KING DINO | He drums off his tab; his home-stamped coins are refused | KING DINO / FORTIZMO; MUSHROOM / KING DINO; KING DINO / GEMTOE; KING DINO / ZOLLOD |
| **Blossoms only** | FORTIZMO and all comers | The Juice Bar's one currency, bent only a little | FORTIZMO with HENNRICK, MUSHROOM, GOOWARD, MAMA GORBO, GEMTOE, SPARKAKUS, ANOMALEE, ZOLLOD |
| **The dance-floor feud** | FORTIZMO, ETCHER | ETCHER's tentacles etch her floor | FORTIZMO / ETCHER |
| **The Dancers' floor** | MONTGUMMERY, ETCHER, GLYPH | Three Synthetics who share the floor and need one another | ETCHER / MONTGUMMERY; GLYPH / MONTGUMMERY; ETCHER / GLYPH |
| **Symbols and etching** | GLYPH, ETCHER | Each would be nothing without the other | ETCHER / GLYPH; GLYPH with everyone |
| **The record of the ages** | ETCHER and everyone | He etches every age and everyone's things | ETCHER with every other park creature |
| **Keepers of history** | HENNRICK, ETCHER, SPARKAKUS | Colleagues in research and record | HENNRICK / ETCHER; SPARKAKUS / HENNRICK; SPARKAKUS / ETCHER |
| **Avarice and sharing** | GEMTOE and everyone | She turns every exchange into a deal and is steered toward sharing | GEMTOE / GLYPH; ZOLLOD / GEMTOE; GEMTOE with every other park creature |
| **Books and gems** | SPARKAKUS, GEMTOE | Two collectors, one with a job and one with a concept | SPARKAKUS / GEMTOE |
| **The Library's rules** | SPARKAKUS, GOOWARD, MAMA GORBO, MONTGUMMERY | No goo, no burgers, return the tapes | SPARKAKUS with GOOWARD, MAMA GORBO, MONTGUMMERY |
| **Mont the translator** | MONTGUMMERY, GOOWARD | Only Mont claims to understand "Gomp" | GOOWARD / MONTGUMMERY |
| **The Originator's memory** | ANOMALEE, ETCHER, SPARKAKUS, KING DINO, GLYPH, MUSHROOM, HENNRICK | She keeps it, has it recorded and read, and guards it | ANOMALEE with ETCHER, SPARKAKUS, KING DINO, GLYPH, MUSHROOM, HENNRICK |
| **Code beneath everything** | ANOMALEE, GOOWARD, ZOLLOD, SOMLET | She hears code in goo, roots and dreams | ANOMALEE with GOOWARD, ZOLLOD, SOMLET |
| **The gardener's patience** | ZOLLOD and the greedy, the hungry and the beginner | Plants grow; gems and tabs do not | ZOLLOD with GEMTOE, KING DINO, MAMA GORBO, MONTGUMMERY, HENNRICK |
| **The sleeper** | SOMLET and everyone | Everyone is kind to her | SOMLET with every park creature that can meet her |
| **Time travellers** | HENNRICK and everyone | The far-past scholar amazed by the far future | HENNRICK with every other park creature |
| **The one reborn** | THE ANCIENT and its callers | It knows each of them better than they know themselves | THE ANCIENT's register (2.20.5) |

#### 2.20.3 Messengers and gestures

Each creature throws its own messenger in its animation vignettes and makes its own gesture and emote (`SIG`).

| Creature | Messenger | Colour | Gesture | Emote |
| --- | --- | --- | --- | --- |
| SPARKAKUS | card | `#2a50c8` | nod | ? |
| MAMA GORBO | goo | `#e8409e` | bow | ♥ |
| GOOWARD | goo | `#4ac8f0` | wobble | ~ |
| GEMTOE | gem | `#2ae070` | twirl | ✦ |
| MONTGUMMERY | coin | `#3db2d6` | nod | ! |
| ETCHER | card | `#e050b8` | nod | ! |
| GLYPH | tile | `#f2c84a` | giggle | ? |
| KING DINO | crown | `#ffc81e` | puff | ★ |
| FORTIZMO | note | `#ff8a3a` | groove | ♪ |
| SOMLET | letter | `#fbf8f0` | doze | z |
| MUSHROOM | spore | `#fffaf0` | puff | ! |
| ZOLLOD | sprout | `#6ac83a` | sway | ✿ |
| ANOMALEE | pixel | `#e030e0` | glitch | ? |
| HENNRICK | cube | `#4af0a0` | nod | ! |
| THE ANCIENT | spore | `#c8b890` | doze | … |

#### 2.20.4 The pair register

Every vignette pair of the fourteen park creatures, verbatim from `PAIRS` in the game, ordered by the cast order of
the pair's two creatures. The first creature named speaks the first line; the second replies.

| Pair | Relationship | First line | Reply |
| --- | --- | --- | --- |
| SPARKAKUS / MAMA GORBO | The Library against burgers | "Mrs Gorbo, no burgers in the Library." | "Just a little one, dear? For your research." |
| SPARKAKUS / GOOWARD | The Library against goo | "Please, no goo near the first editions." | "Gomp... gomp." |
| SPARKAKUS / GEMTOE | Books and gems: two collectors | "I collect books and call it a job, yes." | "And I collect gems and call it Avarice." |
| SPARKAKUS / MONTGUMMERY | The Library's eaten tapes | "Mont, return the VHS tapes you borrowed." | "Mont ate the VHS tapes. Mont is sorry." |
| SPARKAKUS / ETCHER | Two archivists | "Your etchings would fill my Library twice." | "And your Library would fill my tentacles." |
| SPARKAKUS / GLYPH | Symbols as an index | "Your symbols would make a fine index." | "An index is a symbol of symbols... don't you think?" |
| SPARKAKUS / KING DINO | The King asks to be written into history | "Is drumming in the Ancient texts?" | "Not yet, baby. Write me in!" |
| SPARKAKUS / FORTIZMO | Reputation and the house rule | "A quiet juice, please. I've a reputation." | "One quiet juice, librarian. Blossoms only." |
| SPARKAKUS / SOMLET | The Library hushes for the sleeper | "Shh. Even asleep, she's a patron of the Library." | "Zzz..." |
| SPARKAKUS / MUSHROOM | The Consortium watches the Library | "Sheriff, may the Library stay open?" | "For now. The Consortium is watching your books." |
| SPARKAKUS / ZOLLOD | Books for the gardener | "I've a book on Ancient gardens for you." | "Read me the part about seeds. Twice." |
| SPARKAKUS / ANOMALEE | The reader of the Ancient texts | "The Ancient texts speak of an ORIGINATOR..." | "YES. Read them to me. SLOWLY." |
| SPARKAKUS / HENNRICK | Research colleagues | "Hennrick! Any news of the Ancients' era?" | "Much research is still needed, colleague." |
| MAMA GORBO / GOOWARD | The Gorbo marriage | "There's my handsome hubby!" | "Gomp gomp... gooomp!" |
| MAMA GORBO / GEMTOE | Avarice claims a coupon | "A burger coupon for you too, Gemtoe!" | "...Is it worth anything? Then it's mine." |
| MAMA GORBO / MONTGUMMERY | Mothering Mont | "Mont, you're too thin! Have a goo burger." | "Mont cannot eat burger. Mont eats VHS." |
| MAMA GORBO / ETCHER | The age of Organics, topping by topping | "Etch my burger menu, would you, dear?" | "Every topping. For the age of Organics." |
| MAMA GORBO / GLYPH | The symbol for family | "What does that symbol mean, dear?" | "Family. The warmest symbol... don't you think?" |
| MAMA GORBO / KING DINO | Music for the Gorbo marriage | "Play us something romantic, King Dino!" | "For you and the hubby, baby? Slow and smooth." |
| MAMA GORBO / FORTIZMO | House rules, even for the Gorbos | "Two carrot juices! For me and the hubby." | "Blossoms first, Mama. House rules." |
| MAMA GORBO / SOMLET | Mothering the sleeper | "Look at her. Sleeping like a baby." | "Zzz..." |
| MAMA GORBO / MUSHROOM | The Sheriff's price | "Sheriff, you look peaky. Have a goo burger." | "A bribe? ...Make it a double." |
| MAMA GORBO / ZOLLOD | The beginner asks the gardener | "Zollod, dear! Which seeds for a beginner?" | "Start small. Love them daily. They'll grow." |
| MAMA GORBO / ANOMALEE | Tenderness at the window | "Always staring up there, sweetie." | "The WINDOW remembers. As do YOU, Mama." |
| MAMA GORBO / HENNRICK | Mothering the traveller; a sample for the jar | "Hennrick, dear! A coupon for a goo burger?" | "A burger from this era! For the collection jar." |
| GOOWARD / GEMTOE | Avarice keeps even goo | "Gomp! GOMP!" | "Goo isn't gems. ...Fine. I'll keep it anyway." |
| GOOWARD / MONTGUMMERY | Mont the translator | "Gomp gomp!" | "Mont understands Gomp. Gomp means friend." |
| GOOWARD / ETCHER | Even goo is archived | "Gooomp?" | "Yes, I etched your goo too. It's archived." |
| GOOWARD / GLYPH | 'Gomp' honoured as a symbol | "Gomp?" | "'Gomp' is a fine symbol... don't you think?" |
| KING DINO / GOOWARD | Drummer and goo percussion | "Gimme a goo-bop on the backbeat!" | "Gomp! Gomp-gomp! GOMP!" |
| GOOWARD / FORTIZMO | Goo is not currency | "Gomp gomp gomp!" | "Goo is not currency, sweetie. Nice try." |
| GOOWARD / SOMLET | Gentleness with the sleeper | "gomp... gomp..." | "Zzz..." |
| MUSHROOM / GOOWARD | The Sheriff polices goo; GOOWARD cowed | "You are leaving goo on public property." | "Gomp? ...gomp." |
| GOOWARD / ZOLLOD | Goo welcome in the soil | "Gomp? Gomp gomp?" | "Yes, Gooward. A little goo is good for the soil." |
| ANOMALEE / GOOWARD | Goo is code | "GOO... is also a kind of CODE." | "Gomp gomp! Gooomp!" |
| HENNRICK / GOOWARD | The collector asks for a goo sample | "A goo sample, for science? Only a small one." | "Gomp gomp... GOMP!" |
| GEMTOE / MONTGUMMERY | Avarice covets Mont's face | "What will you take for that screen?" | "Mont's screen is not for trade. Mont needs face." |
| ETCHER / GEMTOE | Avarice etched in big letters | "I am etching the age of your Avarice." | "Etch it bigger. Avarice deserves big letters." |
| GEMTOE / GLYPH | Steering Avarice toward sharing | "Is there a symbol for 'all mine'?" | "There's one for 'shared'. Try that one... don't you think?" |
| KING DINO / GEMTOE | The King's coin refused | "I'll trade you a royal coin for that gem." | "You stamp those yourself. Nice try." |
| FORTIZMO / GEMTOE | Blossoms, not gems | "Settle up in Blossoms, honey. Not gems." | "Gems are worth countless flint! Your loss." |
| SOMLET / GEMTOE | Avarice begrudges the mail pile | "Zzz..." | "Asleep on a pile of mail. What a waste of a pile." |
| MUSHROOM / GEMTOE | Gems of dubious provenance | "And where did all those gems come from?" | "Found them. Fairly. Mostly. Don't write that down." |
| ZOLLOD / GEMTOE | Plants grow; gems do not | "Gems don't grow, Gemtoe. Plants do." | "Then I'll plant gems and grow MORE gems." |
| ANOMALEE / GEMTOE | Glow compared; gems not for sale | "Your gems GLOW like the WINDOW." | "Mine glow brighter. And they're not for sale." |
| HENNRICK / GEMTOE | Avarice refuses the collection jar | "That gem would suit my collection jar." | "Your jar can't afford it. Nobody can." |
| ETCHER / MONTGUMMERY | One Synthetic etches another | "Your binary, Mont. May I etch it?" | "Etch gently. Mont is ticklish in binary." |
| GLYPH / MONTGUMMERY | Mont runs on symbols | "My symbols move you, Mont... don't you think?" | "Mont thinks. Mont thinks yes." |
| KING DINO / MONTGUMMERY | The drummer and the robot dancer | "Can you dance to my beat, robot?" | "Mont dances to all beats. Mont dances best." |
| FORTIZMO / MONTGUMMERY | The horn player would teach Mont | "You've got rhythm, Mont. Ever played horn?" | "Mont watched VHS of horn. Mont is ready." |
| SOMLET / MONTGUMMERY | Dancing quietly for the sleeper | "Zzz..." | "Mont will dance quietly. Small robot dance." |
| MUSHROOM / MONTGUMMERY | Mont protects the human | "Have you seen a human in this town?" | "Mont has seen no human. Mont is very busy." |
| ZOLLOD / MONTGUMMERY | The careful dancer and the seedlings | "Mind my seedlings when you dance, Mont." | "Mont will dance around them. Mont is careful." |
| ANOMALEE / MONTGUMMERY | Two screens: faces and the past | "Your SCREEN shows faces. Mine shows the PAST." | "Mont's screen shows robot. Robot is happy." |
| HENNRICK / MONTGUMMERY | Two scholars of the human era | "I hear you've studied this era's films." | "Mont eats many VHS. Mont knows much of humans." |
| ETCHER / GLYPH | Symbols and etching need each other | "Without your symbols I'd have nothing to etch." | "And without your etching they'd blow away... don't you think?" |
| KING DINO / ETCHER | The King wants his solos recorded | "Etch my solos, baby! For history!" | "I etch them as you play. Your hi-hat too." |
| FORTIZMO / ETCHER | The dance-floor feud | "Quit etching my dancefloor, tentacles!" | "It's data. Your floor remembers every step." |
| SOMLET / ETCHER | Even snores are etched | "Zzz... zzz..." | "Even her snores I will etch. Softly." |
| MUSHROOM / ETCHER | The record keeper records the Sheriff | "Have you been etching the town records?" | "I etch everything. Including your citations." |
| ZOLLOD / ETCHER | The age of Organics catalogued | "Etch my seed catalogue. Every variety." | "Each one a word in the age of Organics." |
| ANOMALEE / ETCHER | The Originator's memory etched | "ETCH this: the ORIGINATOR was HERE." | "Already etched, Anomalee. Deep enough to last." |
| HENNRICK / ETCHER | Keepers of history, colleagues | "You etch history and I jar it. Colleagues!" | "Then I will etch you into the age of Synthetics." |
| KING DINO / GLYPH | A symbol for the beat | "What's the symbol for a bigger beat, baby?" | "This one. Joy and rhythm in one stroke... don't you think?" |
| FORTIZMO / GLYPH | A symbol on the menu | "What's that symbol on my menu mean?" | "'Fresh'. Juice is symbols too... don't you think?" |
| SOMLET / GLYPH | 'Zzz' honoured as a symbol | "Zzz..." | "'Zzz' is the oldest symbol of all... don't you think?" |
| MUSHROOM / GLYPH | Suspicion of symbols, answered kindly | "Is that symbol a coded alien message?" | "Every symbol is a message... don't you think?" |
| ZOLLOD / GLYPH | Everything starts as a dot | "Is there a symbol for a seed?" | "A dot. Everything starts as a dot... don't you think?" |
| ANOMALEE / GLYPH | Symbols known from within | "Your symbols... I KNOW them. From WITHIN." | "Then we have read the same page... don't you think?" |
| HENNRICK / GLYPH | Symbols shared across the eras | "Your symbols descend from my era's alphabet!" | "Every era borrows from symbols... don't you think?" |
| KING DINO / FORTIZMO | The debtor and his creditor | "Put one more carrot juice on my tab?" | "Play off the last forty first, lounge lizard." |
| KING DINO / SOMLET | The drummer and the sleeper (never plays) | "Even asleep, this cat keeps time!" | "Zzz... zzz... zzz..." |
| MUSHROOM / KING DINO | The King's home-stamped coins | "Those coins of yours are not legal tender." | "Stamped by the King, baby. Legal enough." |
| KING DINO / ZOLLOD | No carrots for the bar tab | "Any carrots back there for my juice, baby?" | "Grown with care. Not for your bar tab." |
| ANOMALEE / KING DINO | The Originator's rhythm | "Your RHYTHM... the ORIGINATOR had it TOO." | "Then the Originator could swing, baby!" |
| HENNRICK / KING DINO | The far-past scholar amazed by the beat | "Remarkable. Drums survive into the far future?" | "Baby, the beat outlasts everything!" |
| SOMLET / FORTIZMO | The bartender's soft side | "Zzz..." | "Somebody play that sleeper a lullaby. On me." |
| MUSHROOM / FORTIZMO | The Consortium watches the bar | "The Consortium will be inspecting your bar." | "Inspect away. Blossoms up front, honey." |
| ZOLLOD / FORTIZMO | The gardener supplies the bar | "Fresh mint for your bar, cut this morning." | "Mint like that, I'd almost take flint for it." |
| ANOMALEE / FORTIZMO | Hunger against the house rule | "Do you ACCEPT pizza here? One SLICE?" | "Blossoms only. But I won't tell if you share." |
| HENNRICK / FORTIZMO | Blossoms only, even for a traveller | "I'm told the house currency is Blossoms?" | "Blossoms only, sugar. Tip jar's on your left." |
| MUSHROOM / SOMLET | The Sheriff questions the sleeper | "Have you seen anything suspicious today?" | "Zzz... zzz..." |
| ZOLLOD / SOMLET | The gardener hushes for the sleeper | "Shh. My seedlings are napping too." | "Zzz..." |
| ANOMALEE / SOMLET | Made to dream | "You DREAM. We were MADE to dream." | "Zzz... mm... zzz." |
| HENNRICK / SOMLET | The scholar observes the sleeper | "Subject remains asleep. Observation day 41." | "Zzz..." |
| MUSHROOM / ZOLLOD | The UFO hunt meets the calm gardener | "Report any UFOs over your seedlings." | "Only bees up there. My seedlings are thriving." |
| MUSHROOM / ANOMALEE | She defies the Sheriff at the window | "State your business at that window." | "The ORIGINATOR'S business. Not YOURS." |
| HENNRICK / MUSHROOM | The stranded traveller and his warden | "Sheriff, when may I return to my own era?" | "When the Consortium says so. Not before." |
| ANOMALEE / ZOLLOD | Roots run like code | "ROOTS run like CODE beneath the soil." | "And I tend every line of it." |
| HENNRICK / ZOLLOD | The far-past visitor and the new flora | "In my era, this flora hasn't even evolved yet." | "Then you got here just in time to see it bloom." |
| HENNRICK / ANOMALEE | The window is not for jars | "May I record what you see in that window?" | "It is NOT for jars. It is for REMEMBERING." |

#### 2.20.5 THE ANCIENT's register

THE ANCIENT's exchange with each park creature, verbatim from `SLUG_PAIRS`. THE ANCIENT always speaks first.

| Pair | Relationship | THE ANCIENT | Reply |
| --- | --- | --- | --- |
| THE ANCIENT / SPARKAKUS | It knows the Ancient texts are incomplete | "Librarian. Your texts are missing a page." | "...Which page? I must know." |
| THE ANCIENT / MAMA GORBO | It honours the mother of goo | "Mother of goo. You carry so much love." | "Oh! Aren't you a sweet one, dear." |
| THE ANCIENT / GOOWARD | It tells GOOWARD he was made with love | "Little goo. You were made with love." | "Gomp... gomp." |
| THE ANCIENT / GEMTOE | It warns Avarice | "What you hoard, you will lose." | "...Who told you about my gems?" |
| THE ANCIENT / MONTGUMMERY | It tells Mont he was made to learn | "Mont. You were made to learn." | "Mont learns. Mont is learning now." |
| THE ANCIENT / ETCHER | It asks to be recorded; ETCHER is shaken | "Etch this: I have returned." | "...My tentacles are shaking. Etching." |
| THE ANCIENT / GLYPH | The first symbol silences GLYPH's question | "I was the first symbol." | "...Don't you think? ...Yes. I think so." |
| THE ANCIENT / KING DINO | The reborn feel the beat (never plays) | "Even the reborn feel the beat." | "That's right, baby. Everybody feels it." |
| THE ANCIENT / FORTIZMO | It asks for the first song | "Play the old song. The first one." | "For you, Ancient? On the house." |
| THE ANCIENT / SOMLET | It keeps watch over the sleeper (never plays) | "Sleep. I will keep watch." | "Zzz..." |
| THE ANCIENT / MUSHROOM | It is beyond the Consortium; the Sheriff is afraid | "No Portal can hold the one reborn." | "Th-the Consortium will be informed." |
| THE ANCIENT / ZOLLOD | Rebirth in what grows | "All that grows, grows again." | "Then my work is never done. Good." |
| THE ANCIENT / ANOMALEE | It knows what the window remembers | "Anomalee. The glass remembers more than it shows." | "The WINDOW REMEMBERS... WHAT does it REMEMBER?" |
| THE ANCIENT / HENNRICK | It knows he is far from his time | "You are far from your own time, visitor." | "Fascinating. And you? Which era is yours?" |

**Canon**
- Every pair of the fourteen park creatures has exactly one exchange, and THE ANCIENT has exactly one with each of
  them: 91 plus 14 exchanges. New pairs require new lines in the same voices.
- The exchanges keep each voice: GOOWARD only "Gomp", SOMLET only "Zzz", GLYPH's "... don't you think?", MONTGUMMERY's
  third person, ANOMALEE's capitals, KING DINO's "baby", FORTIZMO's "sugar", "honey" and "sweetie", MAMA GORBO's
  "dear", HENNRICK's field notes, MUSHROOM's officialese, THE ANCIENT's few grave words.


## 3. Creature design

This part specifies how every creature is built and how it moves: first the shared creature-making system (3.1),
then one specification per creature in cast order (3.2 to 3.9 here; 3.10 to 3.20 follow). All values come from the
code. Positions are model units (metres) in the parent's frame before any model scale, unless marked "in game".
The style rules that make a creature belong to the world are in part 4; the construction system is specified in 3.1.

Contents: [3.1 The creature-making system](#31-the-creature-making-system) · [3.2 SPARKAKUS](#32-sparkakus) ·
[3.3 MAMA GORBO](#33-mama-gorbo) · [3.4 GOOWARD](#34-gooward) · [3.5 GEMTOE](#35-gemtoe) ·
[3.6 MONTGUMMERY](#36-montgummery) · [3.7 ETCHER](#37-etcher) · [3.8 GLYPH](#38-glyph) · [3.9 KING DINO](#39-king-dino)

### 3.1 The creature-making system

The shared toolkit (`KIT`, `blobBody`, `born()` and the engine wrappers) from which every built creature is made;
packaged builders (`pk_*`) use the same primitives and conventions with their own animation code.

#### Materials and primitives

| Helper | Specification | Use |
| --- | --- | --- |
| `x.clay(col, o)` | Phong, default shininess 14, specular `#1c1c1c` | Matte-satin default for small parts |
| `x.wet(col, o)` | Phong, shininess 70, specular `#666666` | Wet parts |
| `x.basic(col)` | Unlit | Pupils, glints, mouth lines, glows |
| `T.sphere / cyl / cone / torus / circle / box / plane` | Cached geometries | Every primitive |
| `R(geo, mat, parent, pos, rot, scale)` | Builds and places one mesh | Every part |
| `ao(pts, r0, r1, seg = 16, rad = 6)` | Catmull-Rom tube, linear taper r0 → r1; both ends closed with flat discs unless the end radius is under 4 mm | Tails, stalks, legs, hoses, mouth lines |

- Materials are cached by key. A material whose colour animates must be created with `{unique: true}`.

#### Body skins: blended ellipsoids (`blobBody`)

Organic bodies are one continuous skin built by `blobBody(parts, C, {k, uvLen, col})`.

| Stage | Specification |
| --- | --- |
| Input | Ellipsoids `[cx, cy, cz, a, b, c, rx, ry]` (radii a, b, c; turned rx about x, then ry about y) and a centre `C` |
| Distance per part | Approximate ellipsoid distance `k0·(k0 − 1)/k1`, with k0 = abs(p/radii) and k1 = abs(p/radii²) |
| Blend | Polynomial soft minimum folded part by part: `h = max(k − abs(d − e), 0)/k`, `d = min(d, e) − h²·k/4`; **k is the softness** |
| Meshing | Rays from `C` over an 81 × 61 grid (NI 80 × NJ 60); each ray starts 2.6 m out, steps in by 2 cm until inside, then bisects 14 times; the result is the outermost skin point |
| Normals | Central differences of the field (ε 4 mm): smooth, never faceted |
| UVs | u = i/80; v = arc length down each meridian ÷ `uvLen` (no pinching at the poles) |
| Painted shading | Vertex colour from `col(p, fold, cc)`; `fold = clamp((hardMin − field)/0.05, 0, 1)` is crease depth; creases are darkened by it (no cast-shadow tricks) |
| Output | `{geo, hit}`; `hit(origin, dir)` returns the outer skin point `p` and field normal `n` |

- **Star-shape constraint.** Every part must be visible from `C`: the body must be star-shaped about `C`. Overhangs and
  holes cannot be meshed.

| Creature | k | uvLen | Colour and crease rule |
| --- | --- | --- | --- |
| SPARKAKUS | 0.16 | 1.4 | white × (1 − 0.16·fold) under the painted map |
| ZOLLOD | 0.16 | 2.0 | colour bands; −0.22·seam, −0.12·fold |
| ETCHER | 0.20 | 0.9 | teal → blue over y 0.4–2.2; lightness ±0.04 ripple; −0.10·fold |
| GLYPH | 0.20 | 1.2 | `#4a9ad8`; +0.05 lightness per metre above y 1.2 (clamped ±0.05); −0.12·fold |
| KING DINO | 0.22 | n/a | own copy of the method: 89 × 65 rays from (0, 1.55, 0.2), start 2.4 m; lemon `#f9dc22` → gold `#eeb41a`, crease `#dc8e16` |
| MAMA GORBO | 0.30 | 1.6 | peach; −0.03·fold only, so goo barely creases |

- Softness scale: 0.16 is firm (a jointed animal), 0.20–0.22 a medium fleshy blend, 0.30 goo.

#### Lathes and gradients

- `latheGeo(pts, seg)`: profile points [r, y]; radii clamped to at least 0.1 mm so poles close.
- `smoothProfile(pts, n)`: centripetal Catmull-Rom through the profile, resampled to n points, end radii kept exact.
  A lathe must always be built from a smoothed profile, so no flat bands show between sparse points.
- `profileR(pts, y)`: profile radius at height y, used to seat parts on lathed bodies.
- `gradient(geo, stops)`: bakes vertex colours along local Y from `[[y, hex], …]`. `gradMat(kind, o)`: the surface
  tile on a white base with vertex colours on.
- Every vertex-coloured mesh must be added with `keepR` (`userData.keep = true`): baking drops vertex colours.

#### Tubes, closed tips and cards

- **`ridgedTube(pts, r0, r1, n, rid, depth, rad = 10, cap)`.** Radius = `lerp(r0, r1, u)·(1 + depth·max(0,
  sin(u·rid·2π))^0.5)`, giving soft rings. With `cap`, the last stretch (1.6 × the tip radius) curves in like a sphere
  end (`√(1 − x²)`), so tips are rounded and closed. Used for horns, coils, segmented tails and tentacles.
- **`cardGeo(cards, kind)`.** Merged thin cards, each `{p, Z (run), N (face), L, W, col, shaft}`, drawn with a
  double-sided vertex-colour material.

| Card kind | Width profile along the card | Curl | Droop | Extras |
| --- | --- | --- | --- | --- |
| vane (feather) | 0.22, 0.72, 1, 0.96, 0.70, 0.36, 0 | 0.05 | 0.14 | raised centre ridge 0.12·(1 − z); shaft tinted 40 % toward `shaft` |
| fur | 1, 0.78, 0.45, 0 | 0.22 | 0.20 | none |

- Every card shades from ×0.6 at the root to ×1.15 at the tip; edges ×1.05, centre ×0.92.
- `onEllipsoid(...)` lays a flat decal on an analytic ellipsoid at a chosen lift. `faceTo(ob, n)` points +z along a
  normal, keeping +y as near world up as possible.

#### The surface kit (`KIT.surf`)

- **Tile.** Each kind is one seamless 256 px greyscale tile, seeded from its name (identical on every run). Marks
  that cross an edge are drawn at nine wrapped offsets, so no seam shows. The tile is both colour map and bump map, so
  pattern and relief always agree.
- **Tint.** The material colour multiplies the tile: light greys (about 220–255) keep the colour true, dark greys
  become crevices.
- **Defaults.** `rep 2`, `bump 0.02`, `shine 25`, specular `#222222`. Materials are cached by kind + colour + options;
  textures by kind + rep.

| Kind | Tile (base grey, content) | Settings seen on creatures |
| --- | --- | --- |
| scale | `#e6e6e6`; 22 × 15 px rounded scales in offset rows, lit from the top left, dark rim (−70) | ZOLLOD `#35d0c8` shine 40; ETCHER shine 80, spec `#888888`; GEMTOE `#a82228` rep 4, shine 60 |
| fur | `#c8c8c8`; 2600 tapered curved strands, 0.55 alpha, light tips | SPARKAKUS paws `#e8862a` rep 3, bump 0.035, shine 18; birds shine 8–10 |
| feather | `#d8d8d8`; 32 × 24 px scallops, each with a shaft and 6 barb pairs | GEMTOE head `#c02e2e` rep 7, shine 40; ZOLLOD plumes `#ffd83a` shine 20 |
| fabric | `#dadada`; 4 px twill plus fuzz | apron `#7a8a44` shine 10 |
| felt | `#e0e0e0`; 2500 short matted fibres | SOMLET `#f2e4b4` shine 12; caps shine 14–15 |
| metal | `#e2e2e2`; brushed lines, 22 scratches | gold `#e0b03a` bump 0.01, shine 110, white specular |
| goo | `#e8e8e8`; two noise layers, 30 bubbles | MAMA GORBO drips bump 0.01, shine 110 |
| skin | `#ececec`; broad and fine mottling, 700 pores | KING DINO rep 3–5, bump 0.04–0.045, shine 50; BACKPACKA bump 0.05, shine 30 |
| soft | `#f2f2f2`; nearly flat | rims and frills, shine 30–40 |
| plastic | `#f4f4f4`; faint flow marks | GEMTOE beak `#e2d2a8` shine 90, white specular |
| rubber | `#e6e6e6`; dimple grid every 8 px | GOOWARD's ring, shine 70 |
| wood | `#e0e0e0`; 70 wavy grain lines, 3 knots | MUSHROOM's stem, ANOMALEE's peg, shine 12–25 |
| leaf | `#e4e4e4`; midrib and curved veins | fronds, shine 20 |
| stone | `#dcdcdc`; grains, 7 cracks | rocks, bump 0.05–0.06 |
| sand | `#ececec`; 2600 grains, 40 pebbles | warts; BACKPACKA's glassy patches (shine 110) |
| soil | `#d8d8d8`; clumps and crumbs | ground |
| grass | `#d4d4d4`; 3200 blade strokes | ZOLLOD's back, shine 8 |

- **Bump range.** 0.004–0.01 smooth (goo, plastic, metal); 0.02 standard; 0.03 textured (grass, wood, warts, scales);
  0.04–0.05 crackled or pitted (KING DINO's peel, BACKPACKA, stone, ETCHER's skin).
- **`texturize(g, kind, o)`** retrofits a surface onto plain Phong parts. It skips textured, vertex-coloured,
  transparent, emissive and double-sided materials and parts under 9 cm bounding radius (eyes and small bits keep their
  own materials); it caps shininess at 70 and defaults to bump 0.025.
- **Bespoke tiles** replace the kit where a creature's identity needs it: SPARKAKUS's alebrije paint, GLYPH's
  engraved porcelain and filigree, MONTGUMMERY's code text, ANOMALEE's pixel casing, the fur-stroke tiles of FORTIZMO
  and HENNRICK.

#### Shininess and specular

| Shininess | Reads as | Examples in code |
| --- | --- | --- |
| 4–12 | matte | bark 4, leaves 6, FORTIZMO's fur 6, fabric 8–10, felt 12, bird plumage 6–10 |
| 14–30 | satin | clay default 14, eyelids 20, SPARKAKUS's paint 22, surf default 25, skin and cards 30 |
| 40–70 | glossy | beaks and scales 40–60, KING DINO's skin 50, nails 50, rubber 70 |
| 80–110 | very glossy | eye sclerae 80–90, ETCHER's scales 80, gold 110, turquoise fittings 100–110 |
| 120–170 | wet or jewel | goo 110–120, lenses 120–140, SPARKAKUS's nose 130, eye beads 140–160, gems 150–170 |

- Wet, chrome and gem surfaces take a white specular or a high grey (`#888888`, `#909090`, `#999999`, `#b0b0b0`).
- Satin surfaces keep a dark specular (`#1c1c1c`, `#222222`, `#444444`).

#### Glows and unlit parts

- Glints, pupils, mouth lines, sparks, screen faces and decal text are unlit (`basic`).
- Self-lit parts use an emissive colour on a Phong material: GEMTOE's eyes and amethysts, GLYPH's eyes and tiles,
  ETCHER's gem, MAMA GORBO's and GOOWARD's lenses, GOOWARD's wings.
- Additive or transparent glows (mist, puddles, highlights) use `depthWrite: false` and an explicit `renderOrder`
  where they overlap.

#### The standard eye and blink (`KIT.eye`, `KIT.blinker`)

The eye is a group at `pos`, turned by `rot`, looking along its own +z; r is the eye radius.

| Layer | Form | Position | Material |
| --- | --- | --- | --- |
| Sclera | sphere r (14 × 10) | origin | clay `#fbf8ee`, shininess 80 |
| Iris | disc 0.6r | z = r | clay in the iris colour, shininess 80 |
| Pupil | disc 0.3r | z = 1.006r (0.6 % in front of the iris, never z-fighting) | unlit `#0c0c10` |
| Glint | sphere 0.14r | (−0.28r, +0.32r, r): upper left as the viewer sees it; exactly one | unlit white |
| Lid | top half of a sphere 1.1r | origin, `rotation.x` = open value | clay in the lid colour (usually the skin), shininess 20 |

- **Open value.** −0.25 to −0.3 on the standard face: at −0.3 the lid edge sits about 0.32r above the centre, just
  over the pupil, so the eye reads calm and slightly hooded. Closed is 1.75 rad.
- **Placement.** `hit(C, dir)` on the skin; sink 0.03–0.045 m along the normal (about 40–50 % of r); `rot = [0,
  atan2(n.x, n.z), 0]`. Each pair is mirrored with `sx = ±1`. Radii in use: SPARKAKUS 0.066, ZOLLOD 0.075, ETCHER
  0.085, MUSHROOM 0.095.
- **Blink.** `born()` registers the lids with one blinker per creature: first blink at 1–5 s (seeded), then every
  2.5–6.5 s; each lasts 0.18 s as a triangle (0.09 s closing, 0.09 s opening) from the open value to 1.75 rad. All lids
  of a creature blink together. Eyes that are not eyeballs blink their own way (MAMA GORBO's lenses squash flat,
  GOOWARD's "+" eyes squint).

#### Limbs, hands, feet and the mouth arc

**Leg** `KIT.leg(parent, pos, {len, r, mat, thigh, foot, footMat, nailMat})`; thigh and shin are each len/2.

| Joint group | Parts |
| --- | --- |
| Hip | thigh puff sphere r·thigh at (0, −0.4r, 0) scaled (1, 1.25, 1.15); hip ball 1.02r; thigh tube r → 0.86r |
| Knee | ball 0.9r; shin tube 0.86r → 0.68r |
| Foot `"claw"` | pad sphere scaled (1.1r, 0.55r, 1.5r) at (0, 0.25r, 0.5r); three toes (cylinders 0.24r/0.3r, 1.3r long) spaced 0.62r, splayed by yaw −0.3k; nail cones 0.22r × 0.6r (default `#f2ead0`, shininess 50) |
| Foot `"pad"` | cylinder 0.95r/1.08r, 0.55r tall; three nail beads 0.26r at x ±0.55r, z 0.95r |

**Arm** `KIT.arm(parent, pos, {len, r, mat, hand, handMat, nailMat, rot})`: shoulder ball 1.1r, upper arm r →
0.85r, elbow ball 0.88r, forearm 0.85r → 0.7r. Shoulders are toed out with `rot z ≈ ±0.16`.

| Hand | Parts |
| --- | --- |
| `"claw3"` | three cones 0.35r × 1.8r, fanned 0.25 rad |
| `"mitt"` | sphere 1.35r scaled (1, 1.1, 0.75) plus a thumb ball 0.5r at (+1.05r, −0.45r, 0.3r); the thumb is on +x on both hands (not mirrored) |
| `"fingers"` | palm 1.2r scaled (1, 0.9, 0.6) plus four fingers 0.3r/0.26r, 1.4r long, splayed 0.1 rad each |

Limbs in use: SPARKAKUS leg len 0.58, r 0.13, thigh 1.4, claw; ZOLLOD leg 0.55, 0.13, 1.4, pad; GLYPH leg 0.52, 0.17,
1.2, claw.

**Stride** `KIT.stride(leg, phase, amp, bend)`: `hip.x = sin(ph)·amp`; `knee.x = max(0, sin(ph + 1.4))·bend`;
`foot.x = −(hip + knee)`, so **the foot always stays level** and long toes never dig in.

**Mouth arc** `KIT.mouth(p, pos, w)`: a 0.8π torus arc, tube 0.09w, unlit `#2a1010`, turned to curve down into a U.
It is used only by the approved locked exceptions (GOOWARD, MUSHROOM); every other mouth is a closed line, a beak, a
jaw or a screen.

#### Placing parts on the skin

- Every surface part (eyes, mouth lines, cards, plates, badges, flowers) is placed by `hit(origin, dir)`, with
  `origin` inside the body, usually at the part's own height. The part is then sunk or lifted along `n` and oriented
  with `faceTo` or `atan2(n.x, n.z)`. Parts are never guessed into the skin.
- Typical offsets: eyes sunk 3–4.5 cm; fur cards sunk 1.5–2 cm so roots hide; mouth-line points lifted 3 mm (`q.p +
  0.003·n`) and drawn as an `ao` tube of radius 8–9 → 6–7 mm; badges and flowers lifted 1–3 cm.
- Lathed bodies use the same idea analytically (`profileR`; BACKPACKA's `onBody`, a 32-step bisection against the
  lathe profile).

#### Model scale and height

- A roster def's `modelScale` wraps the model in a scaled group at spawn, and the declared `height` is multiplied by
  it. "In game" heights in this part are declared height × model scale; the visible top (highest vertex) is given
  separately where it differs.
- A builder may also scale its own root (GEMTOE ×0.78 inside the builder); that factor is not applied to the declared
  height. SPARKAKUS is scaled ×1.16 by the Library group that holds him.

#### Baking: `born()`, `KIT.compact` and the spawn merge

- **`born(g, {height, crownY, head, lids, step(t, dt, tk, wk, ent)})`**, in order:
  1. registers the lids with a blinker;
  2. `KIT.animated` samples `step` at six (t, tk, wk) states, (0.37, 0, 0), (0.9, 1, 0), (1.3, 1, 1), (2.9, 0, 1),
     (5.1, 1, 0), (7.7, 0, 0), and records every object whose position, rotation, scale or visibility changes;
  3. `KIT.compact` bakes every static mesh under each animated node into one mesh per material + `renderOrder`.
  `anim(t, dt, e)` then calls the blinker and `step` with `tk = e.tkS` (talk rhythm 0–1) and `wk` = 1 while moving.
- **Spawn merge.** Every spawned entity with two or more meshes is run for 360 frames of its `anim` (t = 0.1·i − 36;
  walking on frames 60–179, `onTalk` every 50 frames); meshes that never change are merged per parent and material
  into vertex-coloured meshes. Emotes, sounds and goo are muted during the test run.
- **What stays unbaked:** joints (`KIT.leg`/`KIT.arm` groups are always `keep`), anything with `userData.keep`, and
  transparent, multi-material, morph or child-bearing meshes. A part animated only on a path the samples miss (a
  periodic squint, a dance-only pose) must be marked `keep`, or it is baked still.
- **Design consequences.** Share materials: each distinct material costs a draw call per moving part. Every
  vertex-coloured mesh is `keepR`.

#### Idle layers

1. **The model's own idle** in `step` (breath, sway, tails, ears, wings): every creature has one; it is specified per
   creature below.
2. **No shared idle layer.** No creature has an engine-level idle (no shared breathing, idle actions or idle emotes);
   the owner's rule. `fo` only holds each creature's outer group upright (tilt 0) and at scale 1 every frame, so all
   idle life comes from the model's own `step`.
3. **Emotes** (`Ut.above`, shown by vignettes and events): a 64 px canvas, bold 44 px monospace, ink stroke 7 px
   (`#0d0d1a`) under the fill; a sprite 0.9 m across set 0.4 m above height × scale; it rises 0.7 m/s, sways
   0.24·cos(6t) m/s sideways, fades in over 0.25 s and out linearly, gone at 1.5 s. Fills: white, lime, teal, pink,
   yellow, `#ffb0d8`, `#b39ae8`.
4. **Vignette gestures** (`gesture(name, u, k)`, offsets on the vignette wrapper over u ∈ 0..1, e1 = sin πu,
   w(f) = sin(2πfu)):

| Gesture | Offsets | Gesture | Offsets |
| --- | --- | --- | --- |
| nod (default) | rx 0.18·max(0, w(2)); y 0.03·e1 | twirl | ry one smoothstep turn; y 0.2·e1 |
| hop | y 0.45·abs(sin 2πu); squash ±5–6 % | giggle | rz 0.06·sin(40u)·e1; sy +0.04·sin(40u) |
| stomp | y 0.18·max(0, w(3)); rz 0.08·w(1.5) | spin | ry one smoothstep turn |
| glitch | rz ±0.12 square wave; y ±0.04 | bow | rx 0.4·e1 |
| puff | scale +12 % / +8 % / +12 %; rx −0.15 | lean | rx −0.3·e1 |
| wobble | rz 0.18·w(2)·e1; ±8 % squash | stretch | sx, sz −6 %; sy +14 % |
| sway | rz 0.12·w(1); rx 0.05·w(2) | doze | rx 0.18·e1; rz 0.1·w(0.5) |
| groove | rz 0.14·w(2); y 0.08·abs(w(2)) | | |

#### Talk wrapper (`tkAnim`)

- **Rhythm.** `s = max(0, sin 11t)·(0.55 + 0.45·sin 2.7t)·(sin 1.3t > −0.5 ? 1 : 0.25)`: syllable pulses, phrase
  loudness, pauses at a quarter strength. The weight `tkK` eases at 6/s; `tkS = tkK·s` is passed to the model as `tk`.
- **Wrapper motion** (a group made the first time the creature talks):

| Channel | Value |
| --- | --- |
| nod | rx = 0.06·tkS |
| roll | rz = 0.025·tkK·sin 1.7t |
| scale | (1 − 0.015·tkS, 1 + 0.035·tkS, 1 − 0.015·tkS) |
| lift | y = 0.045·tkS + 0.8·bodyR·(abs(sin rx) + abs(sin rz)): the nod never sinks the footprint |

- **Happy spin** (from `spinAt`): one smoothstep full turn over 1.4 s with a hop of 0.3·sin(πu).
- The talked-to creature turns to the player with `co()` (rate 5, exponential) unless its section says otherwise.

#### Walking

- Wander 1.3 m/s; treks ×2.1 (chance 0.15); Garden Event walk 2.4 m/s; a new wander goal every 3–7 s; turn rate 5.
  Collision radius bodyR × 0.85; personal space 7 m.
- **Jointed walkers** stride at 7–8 rad/s, legs half a turn apart, with `KIT.stride` (amplitude 0.45–0.5, knee bend
  0.7–0.8), arms counter-swinging and tails swinging with the hips.
- **Legless or simple walkers** bob: KING DINO 0.075·abs(sin 8t) with a foot swing of 0.35; GEMTOE, ETCHER and MAMA
  GORBO 0.03·abs(sin 6t); GOOWARD glides with no walk motion.

#### Planting and dance wrappers

- **Weight.** The move weight `k` eases at 4/s. A move starts only when the creature is effectively still (speed over
  0.6 m/s counts as moving, smoothed at 8/s; `mv` under 0.5). Switching between planting and dancing waits until
  k < 0.02. Offsets × k go onto a move wrapper (`gcW`), which the footprint lift then raises out of the ground.

Planting moves (w = rate, a = size, s = sin wt):

| Move | Offsets |
| --- | --- |
| dig | rx 0.32·a·max(0, s); z 0.08·a·max(0, s) |
| pat | rz 0.14·a·s; rx 0.15·a·(0.5 + 0.5·sin 2wt); y 0.03·abs(sin 2wt) |
| scatter | ry 0.55·a·s; y 0.06·a·abs(sin 2wt) |
| eat | rx 0.22a + 0.16a·max(0, sin 0.5wt)⁶; y 0.015·abs(sin 2.5wt); rz 0.04a·sin 0.25wt |

Dances (5.45 rad/s is one bob per beat at 104 BPM):

| Dance | Offsets |
| --- | --- |
| bounce | y 0.12a·abs(s); sy 1 + 0.05a·cos 2wt; rz 0.05a·sin 0.5wt |
| twirl | ry 2.4a·sin 0.4wt; y 0.05a·abs(s); rz 0.05a·s |
| shimmy | x 0.06a·sin 3wt; rz 0.06a·sin 3wt; y 0.05a·abs(s) |
| stomp | rz 0.12a·s; y 0.06a·max(0, sin 2wt); rx 0.04a·abs(s) |
| groove | y 0.05a·abs(s); rz 0.1a·sin 0.5wt; rx 0.06a·s; ry 0.2a·sin 0.25wt |
| jelly | sy 1 + 0.12a·s; sx and sz 1 − 0.06a·s; rz 0.06a·sin 0.5wt |
| funk | y 0.07a·abs(s) + 0.14a·sin(π·sp); ry 0.5a·sin 0.5wt + one smoothstep spin on beats 7–8 of every 8; rz 0.1a·s; rx −0.04a·abs(s) |

| Creature | Planting (move, w, a) | Dance (type, w, a) |
| --- | --- | --- |
| SPARKAKUS | pat, 1.6, 1 | funk, 5.45, 1 (plus his own limb moves) |
| MAMA GORBO | pat, 1.3, 1.2 | jelly, 5.45, 1 |
| GOOWARD | pat, 1.6, 1.1 | bounce, 5.45, 1.1 |
| GEMTOE | scatter, 2.4, 1 | twirl, 2.7, 1 |
| MONTGUMMERY | pat, 1.9, 1 | his own: the robot |
| ETCHER | pat, 2.1, 0.9 | his own: the tentacle dance |
| GLYPH | dig, 2.3, 1 | his own: the macarena |
| KING DINO | none (stays at his drums) | none (stays at his drums) |
| FORTIZMO | none (plays her horn) | none (plays her horn) |
| SOMLET | none (sleeps) | none (sleeps) |
| MUSHROOM | pat, 1.8, 1 | shimmy, 5.45, 1 |
| ZOLLOD | dig, 3, 0.8 | groove, 5.45, 0.9 |
| ANOMALEE | dig, 1.5, 1 (eat, 2.6, 1 once Snacks is complete) | stomp, 5.45, 1 |
| HENNRICK | pat, 1.4, 1.2 | his own: a side-to-side roll |
| Anyone not listed | dig, 1.8, 1 | bounce, 5.45, 1 |

- Built-in dances run on `gcBeatHz()`: 104 BPM, or FORTIZMO's 88 BPM at the Garden Event. For their owners the engine
  dance wrapper is zeroed.

#### Ground fit and clearance

- **`gFit`.** On the first frame it measures the model's lowest vertex (every second vertex of every visible mesh).
  Target = ground height (probed over 0.55·bodyR) + max(0, 0.006 − restLow): **at least 6 mm of clearance**. It eases
  up at 20/s and down at 8/s, and is skipped for a creature posted above 0.3 m (MUSHROOM on his desk).
- **Footprint lift for planting and dancing.** Per mesh, the extreme vertex in each of 48 Fibonacci directions is kept
  (at most about 3000 vertices sampled); each frame the lowest of them in the root frame is found, and if it is below
  the rest low − 1 cm the wrapper rises by the difference. The rest low is re-sampled every 0.25 s while idle,
  staggered 0.031 s per slot.
- **A tilt is paid for with a lift.** The talk nod, the footprint lift and per-creature lifts (ETCHER's nod, GLYPH's
  coils, SOMLET's roll, SPARKAKUS's walk roll) all raise the body by however far the tilt dips its lowest point.

#### Anti-z-fight and anti-clip conventions

The rule (section 8): any spacing between stacked faces is acceptable as long as it causes
no z-fighting or other graphical issue; the current in-game designs are the standard. The conventions below are how
the models meet it.

- **Layers.** Stacked layers sit at distinct distances (pupil 1.006r over iris 1.0r; patch rims 12 mm proud, patch
  faces 24 mm; screens and panels 5 mm proud). Decals and panels that lie flat take `polygonOffset` (factor −1,
  units −2 to −4). Panels that meet overlap by a few centimetres so no two faces share a plane. Transparent overlays
  (mist, puddles, trails, code shells) use `depthWrite: false` and an explicit `renderOrder`.
- **Closed ends.** Every tube end is closed (`ao` discs, `ridgedTube` caps, or a bead wider than the tube); an open
  tube shows a dark plug inside. Nothing hollow can be seen into.
- **Buried roots.** Attached tubes start inside their parent; segment chains overlap; thigh stubs and shoulder pivots
  sit inside the body.
- **Limbs and tails.** Feet stay level (`stride`); tentacles bend only in their own upright plane, so they lift and
  never dig; floating creatures keep a stated gap (GEMTOE 4 cm, SOMLET's tentacles at least 2 cm).
- **Placement.** Parts are placed on the skin by ray (`hit`) and lifted or sunk by a stated amount; body tilts are paid
  for with lifts.

### 3.2 SPARKAKUS

This section specifies SPARKAKUS's model, materials, face and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code), including the Library stand-in.
- **Builder and id.** `BORN.sparkakus`, built by the Library's worker `st`; id `keeper`. His stand-in entity is
  `stationary`, height 3.1, and carries the vignette wrapper.
- **Scale and height.** Built at scale 1 and held by a Library group scaled ×1.16. `born` height 2.85 (**3.31 m in
  game**), `crownY` 2.3; visible top (ear tips) 2.70, 3.13 m in game.
- **Read.** An upright two-legged wolf with a barrel body, a round head and a long forward muzzle, painted all over
  like an alebrije.

#### Silhouette and signature parts

- Black shape: a vertical figure with two spikes on top, a snout pointing forward and a long hooked tail behind.
- Signatures: (1) two tall narrow ears, the highest point; (2) a long tail sweeping down, back and up into a hook,
  ending in a gold star that trails pink-to-cyan mist; (3) a dark feather fin standing up between the shoulders, which
  breaks the back line in profile.
- Secondary reads: four daffodils on his right shoulder (−x), a cream ruff, a black collar with an orange coin, red
  garters, orange paws and feet.

#### Proportions

| Measurement | Model | In game (×1.16) |
| --- | --- | --- |
| Ear tips | y 2.70 | 3.13 m |
| Skull top | y 2.33 | 2.70 m |
| Eye centres | y ≈ 2.08 | 2.41 m |
| Nose | (0, 1.99, 0.68) | |
| Widest (barrel) | 0.94 | 1.09 m |
| Head width | 0.60 | 0.70 m |
| Muzzle tip past the head's front | 0.31 | 0.36 m |
| Hip height (leg length 0.58, r 0.13) | 0.64, 24 % of the ear-tip height | 0.74 m |
| Shoulders (arm length 0.66, r 0.10) | (±0.44, 1.50, 0.02) | |
| Tail root → tip | (0, 0.86, −0.36) → ≈ (0, 1.34, −1.48) | tip 1.72 m behind centre |
| Head : total height | ≈ 1 : 4.6 | |

Body skin: `blobBody`, `C` (0, 1.4, 0.05), k 0.16, uvLen 1.4.

| Ellipsoid | Centre | Radii (x, y, z) | Notes |
| --- | --- | --- | --- |
| Hips | (0, 0.74, −0.02) | 0.41, 0.30, 0.36 | |
| Barrel | (0, 1.05, 0) | 0.47, 0.55, 0.41 | widest part |
| Chest | (0, 1.45, 0.03) | 0.42, 0.34, 0.36 | |
| Neck | (0, 1.74, 0.05) | 0.24, 0.20, 0.24 | |
| Head | (0, 2.04, 0.06) | 0.30, 0.29, 0.31 | |
| Muzzle | (0, 1.96, 0.38) | 0.15, 0.13, 0.30 | pitched 0.10 rad; tip at z 0.68 |

#### Anatomy

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Ears ×2 | cone, flattened to 0.5 depth | group (±0.15, 2.24, 0), tilted 0.14 rad outward | r 0.12, h 0.46 | paint | alebrije paint | 22 |
| Ear lining | cone, flattened to 0.3 | 0.035 forward in the ear | r 0.08, h 0.34 | `#a040b0` | clay | 30 |
| Horn nubs ×2 | cone | (±0.2, 2.2, −0.1), tipped back 0.5, out 0.3 | r 0.03, h 0.09 | `#8a3aa8` | clay | 40 |
| Head, body, muzzle | one blended skin | see table above | | paint × crease shade | alebrije paint, vertex colours | 22 |
| Eyes ×2 | `KIT.eye` | hit from (0, 2.08, 0.06) along (±0.6, 0.2, 0.78), sunk 0.03 | r 0.066 | iris `#f2c21a`, lid `#2c4cc0` | standard eye | 80 / 20 |
| Nose | sphere | (0, 1.99, 0.68) | (0.07, 0.058, 0.055) | `#16161a` | clay, white specular | 130 |
| Mouth lines ×2 | `ao` tube through 8 skin points | hit from (0, 1.92, 0.35), sweeping 0.25–1.25 rad, angled 0.25 down, lifted 3 mm | r 0.008 → 0.006 | `#141c3a` | clay | 20 |
| Collar | torus | (0, 1.70, 0.05), tilted π/2 + 0.15 | R 0.255, tube 0.04 | `#141418` | clay | 70 |
| APR coin | cylinder + canvas face 1.5 mm proud | group (0, 1.60, 0.36), tilted −0.15 | r 0.085 × 0.025 | `#f08a1e`; ring `#ffd23a`; text `#7a2a00` | clay / canvas | 90 |
| Ruff | fur cards, 13 per row, rows every 0.04 from y 1.10 to 1.88 over ±0.9 rad, staggered; only where z ≥ 0.12 | sunk 0.015, pointing down the skin | L 0.12–0.17, W 0.065 | `#f2ecd8` ±2.5 % lightness | `gradMat("feather")`, double-sided | 30 |
| Daffodils ×4 | 6 petal ellipsoids at r 0.07 + open trumpet + rim torus | hit from `C` along (−0.75, 0.35, 0.15), (−0.85, 0.15, 0.3), (−0.8, 0.1, −0.05), (−0.62, 0.55, 0.3); lifted 0.03, spun 0.5·k, scale 0.85–1.05 | petal 0.075 × 0.04 × 0.012; trumpet r 0.035 → 0.028, 0.06 long; rim 0.036/0.008 | petals `#f6c21a`; trumpet `#f0a018` | clay (trumpet double-sided) | 40 |
| Feather fin | 6 vane cards down the spine, faces ±x (a vertical blade) | hit along (0, 0.45 − 0.7u, −1), +0.02 z, running (0, 0.6 − 0.5u, −1) | L 0.38 + 0.14·sin(πu), W 0.09 | `#1c2448` / `#242e5a`, shaft `#4a5aa0` | `gradMat("feather")`, double-sided | 30 |
| Arms ×2 | `KIT.arm`, hand `"mitt"` | shoulders (±0.44, 1.50, 0.02), rest rot (0.12, 0, ±0.16) | len 0.66, r 0.10 | paint | alebrije paint | 22 |
| Paws | mitt sphere + thumb on +x of both hands | | r 0.135 (1, 1.1, 0.75); thumb r 0.05 | `#e8862a` | fur, rep 3, bump 0.035 | 18 |
| Garters ×2 | torus round the upper arm | shoulder-group y −0.17 | 0.105 / 0.025 | `#c8282a` | clay | 40 |
| Legs ×2 | `KIT.leg`, thigh 1.4, foot `"claw"` | hips (±0.22, 0.64, 0) | len 0.58, r 0.13; thigh puff r 0.182 | paint | alebrije paint | 22 |
| Feet | claw pad + three toes splayed ±0.3 | foot pivot y 0.06; pad bottom ≈ 0.02 | pad (0.143, 0.072, 0.195); toes 0.169 long | `#e8862a` | fur | 18 |
| Claws | cones | toe tips | r 0.029, L 0.078 | `#141418` | clay, specular `#888888` | 90 |
| Tail | `ao` through (0, 0, 0), (0, −0.1, −0.35), (0, −0.05, −0.72), (0, 0.2, −1.0), (0, 0.48, −1.12) | group (0, 0.86, −0.36) | r 0.15 → 0.05, 30 × 12 | paint | alebrije paint | 22 |
| Star | extruded five-point star, turned π about y | tail tip + (0, 0.04, −0.02) | outer 0.10, inner 0.045, depth 0.03, bevel 0.01 | `#ffd23a` | clay | 80 |
| Mist | 90 additive point sprites, child of the tail | spawn within ±0.15 of the tip, 0.12 above | size 0.35, opacity 0.85 | `#ff5fb0` then `#66e6ff` | radial puff, no depth write | unlit |

#### Palette

| Hex | Use |
| --- | --- |
| `#2c4cc0` | royal blue paint base (body, limbs, ears, tail) and lids |
| `rgba(20,36,120,0.55)`, `rgba(90,120,230,0.45)` | dark and light fur strokes in the paint |
| `#f2c21a`, `#7ad04a`, `#e0408a`, `#f08a2a`, `#3ac8c0`, `#b070e0` | vines, leaves, dots and flowers (gold, green, magenta, orange, teal, violet) |
| `#fff4c0` | flower centres |
| `#e8862a` | paws and feet |
| `#f2ecd8` | ruff |
| `#a040b0`, `#8a3aa8` | ear lining, horn nubs |
| `#1c2448`, `#242e5a`, `#4a5aa0` | fin cards and shaft |
| `#141418` | claws and collar |
| `#16161a`, `#141c3a` | nose, mouth line |
| `#f2c21a`, `#fbf8ee`, `#0c0c10` | iris, sclera, pupil |
| `#f08a1e`, `#ffd23a`, `#7a2a00` | coin disc, ring, "APR" |
| `#c8282a` | garters |
| `#f6c21a`, `#f0a018` | daffodil petals, trumpets |
| `#ffd23a` | star |
| `#ff5fb0` → `#66e6ff` | mist, pink then cyan |

#### Surfaces and materials

- **Alebrije paint** (bespoke, cached once as `BORN.sparkakusPaint`, seed 12, repeat 2 × 2), used as colour and bump
  map (bump 0.02): 1400 near-vertical fur strokes (5–9 px, width 1.2); 14 wandering vines (14 steps of 9 px, width
  3.2, cycling the six colours) with a leaf ellipse (4 × 1.8) every third point; 40 dots, every third a five-petal
  flower (petals r 3 at 4.5 px out, cream centre). Everything is drawn at nine wrapped offsets, so the tile is seamless.
- `skinM` (torso, with crease vertex colours) and `blueM` (ears, limbs, tail) are both Phong shininess 22, specular
  `#222222`: satin. The blue is never plain-shaded.
- Creases darken by up to 16 % (vertex colour white × (1 − 0.16·fold)).
- Orange fur paws and feet: `KIT.surf("fur")`, matte-satin.
- Very glossy accents: nose 130 (white specular), claws 90, coin 90, star 80, collar 70.
- Unlit: pupils, glints, additive mist.

#### Face

- Small KIT eyes (r 0.066), yellow iris, blue lid at −0.3: calm and slightly hooded. Standard blink.
- No brows. The mouth is a closed dark line along each side of the muzzle; there is no jaw and it never opens.
- The nose is a glossy black bead. Expression comes from the ears, the talk nod and the body.

#### Animation

| State | Channel | Value |
| --- | --- | --- |
| Idle | body breath | scale y 1 + 0.01·sin 2t |
| Idle | tail | yaw 0.22·sin 2t |
| Idle | shoulders | x 0.12 + 0.1·sin(1.5t + 3k) |
| Idle | ear flick | x 0.06·max(0, sin(0.7t + 2k))⁸ (brief flicks about every 9 s, ears out of phase); side tilt ±0.14 |
| Talk | wrapper only | no mouth motion (3.1) |
| Walk (ph = 8t) | body | roll 0.035·sin ph; hip yaw 0.07·sin ph; lean 0.05 |
| Walk | body lift | y = 0.24·abs(roll) + 0.2·lean − 0.035·abs(sin ph): pays for roll and lean, sinks as the legs spread so a foot stays down |
| Walk | tail | yaw + 0.25·sin ph; pitch 0.1·sin(2ph + 0.6) |
| Walk | ears | flop back 0.14·abs(sin(ph + 0.5)); side tilt × (1 − 0.35·sin(2ph + k)) |
| Walk | arms | shoulder + 0.5·sin(ph + kπ); splay 0.16 + 0.07·(1 − abs(swing)); elbow −(0.2 + 0.45·max(0, −swing)); wrist 0.3·sin(ph + kπ − 0.9) |
| Walk | legs | `KIT.stride`, amplitude 0.5, knee bend 0.8, feet level |
| Planting | pat (1.6, 1) | roll 0.14·sin 1.6t; press 0.15·(0.5 + 0.5·sin 3.2t); bob 0.03·abs(sin 3.2t) |
| Dance | funk wrapper (5.45, 1) | bob 0.07·abs(sin); hip twist 0.5·sin(0.5wt); full spin with a 0.14 hop on beats 7–8 of 8; roll 0.1·sin; pitch −0.04·abs(sin) |
| Dance | paws (weight `dw`) | pump on alternate beats: shoulder → −(1.2 + 1.7·up); splay 0.16 + dw·(0.44 − 0.09·up), clear of ears and muzzle; elbow −dw·(1 − 0.9·up) |
| Dance | feet | step in place: hip −0.35·up, knee +0.7·up, foot level (a foot only rises) |
| Dance | ears, tail | ears flop 0.45·max(0, sin)²; tail yaw 0.7·sin, pitch 0.25·sin 2ph |
| Mist | each puff | lives 2 s; drift x (0.5·sin(2t + k) − 0.36), y +1.32, z 0.48·cos(1.7t + k) m/s; pink for the first half, cyan for the second; brightness × (1 − life) |

- **Blossom at home** (his place in the Library only): the whole model pitches forward to 1.15 rad over 0.6 s onto
  all fours; he runs to the start of an ellipse at 4.2 m/s, laps it once at 9 m/s with the walk cycle on, returns at
  4.2, stands up over 0.6 s and apologises. Away from home he says a line instead and does no lap.
- **Vignettes:** gesture nod, token a card `#2a50c8`, emote `?`.

#### Construction constraints

- The skin, ruff and fin are kept meshes (`keepR`); joints stay separate; all static detail is baked per material.
- Ruff cards sink 0.015 and exist only where z ≥ 0.12, so none pokes through his back. Eyes sink 0.03; mouth lines
  lift 3 mm; daffodils lift 0.03.
- The paint texture is shared and cached; it is never recoloured per instance.
- The mist has `frustumCulled = false` and `depthWrite = false`.
- Feet: foot pivot y 0.06, pad bottom ≈ 0.02; the walk lift keeps one foot planted.

#### Do / Don't

- **Do** keep the ears the tallest part, narrow, purple-lined and tilted out about 8°.
- **Do** keep the muzzle long (tip 0.31 past the head) with a small glossy black nose.
- **Do** paint every blue part (body, limbs, ears, tail) with the alebrije pattern over blue fur strokes.
- **Do** keep orange only on paws and feet, with black claws; keep the black collar, orange APR coin and red garters.
- **Do** keep the four daffodils on his right shoulder (−x) only, and the fin dark navy and vertical.
- **Do** curl the tail up to the gold star, with mist rising pink then cyan.
- **Don't** give him an open mouth, teeth, a smile or brows, or large wide-open eyes.
- **Don't** mirror or add daffodils on his left (+x).
- **Don't** let dance poses cross the muzzle or ears, or the feet sink below the ground.
- **Don't** shade the blue plain.

### 3.3 MAMA GORBO

This section specifies MAMA GORBO's model, materials, face and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code), goo streams included.
- **Builder and id.** `BORN.mamagorbo` (roster builder `born_mamagorbo`); id `p_mamagorbo`. Def: name colour
  `#ff9f5c`, bodyR 1.1, talkR 3.8; thrown-goo colours `#36d0e8`, `#e8409e`, `#9a52e0`, `#a8e830`, `#ff9f5c`.
- **Scale and height.** Scale 1. `born` height 2.95 (**2.95 m in game**); head top y 2.90.
- **Read.** One glossy peach goo drop: a big round head melting through a narrower waist into a wide flat foot on a
  shiny puddle, like an upturned pear on a saucer.

#### Silhouette and signature parts

- Black shape: a big ball over a flared base, a small bump on the upper right of the crown, teardrop shapes circling at
  head height.
- Signatures: (1) two octagon port eyes, a big one high on her left (+x) and a small one low on her right (−x); (2) a
  thick lime goo tail wrapping round the front of her foot; (3) red pin tags and a purple wifi sign orbiting her head.
- Secondary reads: six paler goo runs ending in dripping beads, three colour streams down her back, yellow sparks.

#### Proportions

| Measurement | Value |
| --- | --- |
| Head | 2.26 wide, spans y 0.90–2.90 (two thirds of her height) |
| Waist (narrowest) | y 0.9–1.0 |
| Foot | 2.12 across, very flat; sole at y 0.012 |
| Puddle | circle scaled 1.45 × 1.35 (≈ 2.9 × 2.7 m) at y 0.03, offset (0.05, 0.06) |
| Big port | r 0.44 (≈ 0.9 across with its edge), along (0.42, 0.5, 0.8) from `C` |
| Small port | r 0.32 (≈ 0.7 across), along (−0.4, −0.12, 0.9) |
| Tag orbit | radius 1.78, centred y 1.9 ± 0.35 (head radius 1.13) |
| Goo runs | at radius 1.06 round the head, y ≈ 1.33–1.44 |

Body skin: `blobBody`, `C` (0.02, 1.6, 0.02), k 0.30 (goo-soft), uvLen 1.6.

| Ellipsoid | Centre | Radii (x, y, z) |
| --- | --- | --- |
| Head | (0, 1.9, 0) | 1.13, 1.0, 1.08 |
| Base | (0.04, 0.72, 0.04) | 0.84, 0.62, 0.82 |
| Foot | (0, 0.12, 0.02) | 1.06, 0.15, 1.02 |
| Crown bump (her right, −x) | (−0.5, 2.52, 0.12) | 0.34, 0.28, 0.32 (top ≈ 2.80) |
| Six goo runs | azimuth 0.75, 1.75, 2.6, −1.3, −2.2, 3.05 rad (0 = front, +x positive); elevation −0.45 / −0.57 | 0.14, 0.36–0.46, 0.14 |

#### Anatomy

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Skin | one goo skin; every vertex below y 0.012 clamped to 0.012 (flat sole) | see table | | peach, HSL-shaded | `gradMat("goo")`, rep 2, bump 0.004, spec `#999999` | 120 |
| Wet highlights ×2 | unlit ellipses, 75 % opacity, no depth write | along (−0.45, 0.8, 0.4) and (−0.25, 0.92, 0.3) from `C` (her upper right), lifted 0.012, rotated 0.6 | 0.22 × 0.10; 0.07 × 0.05 | `#fff6ee` | basic | unlit |
| Sparks ×4 | unlit bars laid radially | x = −0.15 + 1.3·cos a, y = 2.25 + 0.75·sin a, a 2.3–3.14, z 0.25 (off her upper right) | 0.04 × 0.20 (0.17) × 0.04 | `#ffe23a` | basic | unlit |
| Port rim | extruded octagon ring, hole 0.74r | normal-oriented, sunk (r²/1.8)·0.75 | depth 0.08, bevel 0.025 | `#d8338a` | clay, spec `#666666` | 70 |
| Port dark edge | octagon | 0.012 behind the rim | 1.1r, 0.05 deep | `#6a1444` | clay | 30 |
| Port lens | octagonal cylinder + dome (0.75r half-sphere flattened to 0.32) | in the rim | 0.76r, 0.06 thick | `#8a3ad8`, emissive `#2a0a4a` | clay, white specular | 120 |
| Port glint | sphere | (−0.3r, +0.3r) on the dome | 0.12r | `#f6ecff` | basic | unlit |
| Run beads ×6 | sphere (stretched 1.25 y) under a cone drawn to a point | foot of each run | 0.08; cone 0.055 × 0.12 | `#ffb470` | clay, white specular | 120 |
| Lime tail | tube through 10 points (below) | starts inside the head | r 0.20 → 0.08, 90 × 12 | `#a8cc22` → `#f4ff9a` by u², u = 0.55·nY + 0.55·nZ | `gradMat("goo")`, bump 0.01 | 100 |
| Tail tip | sphere | tail end | 0.085 | `#c8e43a` | clay | 100 |
| Ooze streams ×3 | tube following the skin, held off by r + 0.015 | from the back (below) | r 0.06 → 0.095, 70 × 12 | `#36d0e8`, `#e8409e`, `#9a52e0`; tops HSL s −0.1, l +0.22 | `gradMat("goo")` | 110 |
| Stream caps | source bead; pool sphere scaled 1.3 × 1 × 1.3 | both ends | 0.076; 0.1 | stream colour | clay, white specular | 120 |
| Stream puddles ×3 | flat circles | y 0.045, 0.057, 0.069 | 0.30 × 0.26 | stream colour | transparent | |
| Stream blobs ×3 | sphere sliding down each stream | | 0.1 | stream colour | clay | 120 |
| Main puddle | circle, 55 % opacity, no depth write | y 0.03 | 1.45 × 1.35 | `#f08a48` | Phong, white specular | 120 |
| Pin tags ×3 | down-pointing teardrop, extruded 0.05, bevel 0.015; 0.3 plane face | orbit (children of the body) | 0.40 × 0.47 | `#e8423a`; faces "AP", "IP" (bold 28 px monospace, white) or a white wifi glyph | clay / unlit face | 60 |
| Wifi sign | double-sided plane: three arcs and a dot | orbit | 0.42 | `#b04ae8` | unlit | unlit |

- **Tail path:** (−0.62, 2.0, −0.12) inside the head → down her right side (−x) through (−1.02, 1.55, 0.12),
  (−1.02, 1.0, 0.32), (−0.94, 0.45, 0.52) → across the front of the foot through (−0.55, 0.2, 0.88), (0.05, 0.17,
  1.02), (0.62, 0.24, 0.84) → up her left side (+x) through (1.0, 0.5, 0.48), (1.12, 0.86, 0.16) to (1.02, 1.12,
  −0.04).
- **Stream sources** (azimuth measured from +x toward the back): cyan at 0.6 rad (left flank, toward the back),
  magenta at 1.25 rad (back, left of centre), violet at 2.0 rad (back, right of centre). Each follows the skin down in
  elevation steps of 0.14 rad from +0.5 rad, stops above y 0.2, turns out 0.14 to y 0.14 and pools 0.32 out at y 0.11.

#### Palette

| Hex | Use |
| --- | --- |
| `#ff9f5c` | peach skin base (HSL s +0.08; l +0.03, ±0.025 by height, −0.03 in folds, +0.07 on the runs); drips and splats |
| `#ffb470` | run beads |
| `#f08a48` | main puddle |
| `#fff6ee` | wet highlights |
| `#d8338a`, `#6a1444` | port rim, dark edge |
| `#8a3ad8` (emissive `#2a0a4a`), `#f6ecff` | port lens, glint |
| `#a8cc22` → `#f4ff9a`, `#c8e43a` | lime tail, tail tip |
| `#36d0e8`, `#e8409e`, `#9a52e0` | ooze streams |
| `#ffe23a` | sparks |
| `#e8423a`, `#ffffff` | pin tags, tag text |
| `#b04ae8` | wifi sign |

#### Surfaces and materials

- Skin: goo tile with soft swirls, light cores and suspended bubbles; bump 0.004 keeps it almost smooth; shininess
  120: wet and jewel-like. Drips use `KIT.surf("goo", "#ff9f5c", bump 0.01, shine 110)`.
- Very glossy clay on beads and stream caps (120, white specular), lenses (120, emissive) and rims (70).
- Unlit: highlights, glints, sparks, tag faces, the wifi sign. Transparent: puddles (main 55 %), highlights (75 %).
- She is never matte: shininess stays 100–120 on every goo surface.

#### Face

- The ports are her only face: asymmetric, octagonal, with one glint each on the dome's upper right.
- **Blink:** first at 2.5 s, then every 2.5–6 s; 0.18 s, the lens y-scale going as abs(1 − t/0.09) down to 0.06 and
  back. Both lenses blink together; the rims stay put.
- **Pulse:** each lens breathes 1 + 0.04·sin(1.7t + 2k) in x and y.
- No mouth, lids, brows or limbs. Expression comes from the jelly motion, the bob and the blink.

#### Animation

| State | Channel | Value |
| --- | --- | --- |
| Idle | jelly breath | br = sin 1.4t + 0.35·sin 4.1t·(0.6 + 0.4·sin 0.5t); body scale x, z 1 − 0.018·br, y 1 + 0.035·br |
| Idle | puddle | 1.45 + 0.03·br by 1.35 + 0.03·br |
| Idle | sway | roll 0.035·sin 0.7t |
| Idle | ground lift | body y += 1.1·(abs(roll) + abs(pitch)), so the foot's edge never dips |
| Idle | tags | angle a = 0.55t + kπ/2; position (1.78·cos a, 1.9 + 0.35·sin 1.3a, 1.78·sin a); yaw wobble 0.4·sin(t + k) |
| Idle | ooze bulges | w = max(0, sin(2π·2.2u − 2.4t + 2k)); radius r·(1 + 0.42·w²), eased at both ends, swelling outward only |
| Idle | ooze blob | u = (0.16t + k/3) mod 1, eased v = u²(1.6 − 0.6u); grows 1 + 0.15u, rides out along the normal by the size difference, min y 0.13; its puddle swells +0.06 as it arrives |
| Idle | sparks | each bar shows only while sin(9t + 2.1k) > 0.2 (a crackle) |
| Idle | drips (beads 0, 2, 4, staggered 1.6 s) | swell 2.4 s (xz 0.5 → 1, y → 1.6, sag 0.05); fall under 9.8 m/s² stretched 0.8 × 1.5 × 0.8; below y 0.1 leave a peach splat 0.3–0.42; move to a random bead, wait 1.5–3.5 s |
| Talk | body | bob 0.04·tk·abs(sin 5t); pitch −0.03·tk·sin 4t; plus the wrapper |
| Walk | body | bob 0.03·wk·abs(sin 6t); she glides, no legs |
| Planting | pat (1.3, 1.2) | roll 0.168·sin 1.3t; press 0.18·(0.5 + 0.5·sin 2.6t); bob 0.03·abs(sin 2.6t) |
| Dance | jelly (5.45, 1) | sy 1 + 0.12·sin; sx, sz 1 − 0.06·sin; roll 0.06·sin(0.5wt) |

- **Blossom:** no effect: she says "Thank you, dear." Her goo colours are used only in her goo-ball exchanges with
  GOOWARD.
- **Meeting GOOWARD:** every 20–40 s; four throws in turn (two each way), each a volley of three goo balls, a pink `♥`
  over each catcher (5.13).
- **Vignettes:** gesture bow, token goo `#e8409e`, emote `♥`.

#### Construction constraints

- Skin, tail and streams are `keepR`; highlights, puddles, sparks, tag faces, blobs and drips are `keep` (animated or
  transparent).
- The flat sole at y 0.012 and the sway lift keep her out of the ground.
- Ports are sunk by a curvature term so the rim's edge meets the skin.
- Every goo tube end is capped with a bead wider than the tube; the tail's start is buried in the head.
- Streams run between the peach runs and behind the lime tail, offset radius + 0.015 from the skin; their bulges grow
  only outward; each stream's bounding sphere is enlarged by 0.12 so bulges are not culled.
- Puddles are layered at y 0.03, 0.045, 0.057, 0.069 against z-fighting.
- Tags orbit at 1.78, clear of the 1.13 head; as children of the body they share its breathing scale.

#### Do / Don't

- **Do** keep one glossy, almost smooth peach drop: big round head, narrower waist, wide flat foot on a translucent
  puddle.
- **Do** keep the ports octagonal and asymmetric (big and high on her left, small and low on her right), with magenta
  bevelled rims, domed purple lenses and one glint.
- **Do** run the lime tail from her upper right, round the front of the foot and up her left, lit pale yellow on top.
- **Do** keep the three back streams (cyan, magenta, violet) pooling beside the foot, the dripping runs, and the two
  wet highlights on her upper right.
- **Do** keep the four orbiting tags well clear of her.
- **Don't** add a mouth, lids, brows or limbs, or blink by closing a lid.
- **Don't** make her matte.
- **Don't** let any goo tube show an open end or dip into her skin or the ground.
- **Don't** mirror the ports or move the crown bump to her left.

### 3.4 GOOWARD

This section specifies GOOWARD's model, materials, face and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code). His small smile and ribbon tongue are an approved exception
  to the no-smile rule. The painter's beret was added later with the owner's permission to alter the model.
- **Builder and id.** `BORN.gooward` (roster builder `born_gooward`); id `gorbo`. Def: name colour `#30b4e4`, bodyR
  1.2, talkR 3.4 (default); thrown-goo colours `#37b3e8`, `#ff5fb0`, `#a8e830`, `#f2c72e`, `#8a3ffc`, `#35d0c5`,
  `#ff7a2f`.
- **Scale and height.** Scale 1. `born` height 3.2 (**3.2 m in game**); crest tips ≈ 3.1, back bubble top 2.95.
- **Read.** A tall jelly egg of fused bubbles, peach below and cyan above, sitting upright in a wide lime float ring.

#### Silhouette and signature parts

- Black shape: an egg with two small tufted horns, a flat disc round its base, spiky fans behind and thin lines
  radiating over the ground.
- Signatures: (1) the float ring, the widest part, with white stripes; (2) two gold three-leaf crests splayed outward;
  (3) crystal wing spikes fanning behind the upper back.
- Secondary reads: white "+" eyes, pastel root tendrils, purple octagon ports on the upper sides, the violet beret
  on his right side.

#### Proportions

| Measurement | Value (world) |
| --- | --- |
| Body group | y 0.55 |
| Egg | spans y 0.55–2.80; widest 2.24 across at y 1.30 |
| Width with side bubbles | ≈ 3.0 |
| Float ring | centre y 0.42; R 1.28, tube 0.26: 3.08 across, y 0.16–0.68 |
| Eyes | y 1.91, x ±0.33, front surface z ≈ 1.13–1.16 |
| Mouth; tongue tip | y 1.65; ≈ 1.05 |
| Ports | (±0.86, 2.17, 0.58) |
| Wings | rooted (±0.5, 1.55, −0.85); tips ≈ x ±1.0, y 2.3 |
| Roots | reach 1.55–2.05 from the centre on the ground |

Egg lathe (local radius, y): (0, 0), (0.55, 0.04), (0.95, 0.30), (1.12, 0.75), (1.10, 1.25), (0.95, 1.70),
(0.65, 2.05), (0.30, 2.22), (0, 2.25); 40 segments.

| Fused bubble | Local centre | Radius |
| --- | --- | --- |
| Right lower (−x) | (−0.95, 0.78, 0.18) | 0.55 |
| Left lower (+x) | (0.95, 0.82, 0.12) | 0.52 |
| Right upper | (−0.72, 1.55, −0.12) | 0.50 |
| Left upper | (0.76, 1.60, −0.16) | 0.47 |
| Belly | (0, 0.50, 0.55) | 0.58 |
| Right back | (−0.48, 0.50, −0.55) | 0.50 |
| Left back | (0.52, 0.52, −0.50) | 0.50 |
| Back crown | (0, 1.95, −0.35) | 0.45 |

#### Anatomy

Positions are local to the body group (y 0.55) unless marked.

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Egg + 8 bubbles | lathe and spheres | see tables | | vertical gradient | `gradMat("goo")`, rep 3, bump 0.03, spec `#99ddff` | 75 |
| Leaf crests ×2 | 3 flattened spheres at 0.26 up, fanned −0.45, 0, +0.45 | groups (±0.5, 2.02, −0.02), tilted 0.35 outward | 0.12 × 0.32 × 0.05 | `#e8b42c` | clay, spec `#888888` | 70 |
| Brow lines ×2 | wavy tubes over sphere radii 0.97 / 0.86 + 0.03, wave 0.045·sin(1.6k) | y 1.74 and 1.90, x −0.62 to 0.62 | r 0.024 | `#16b0a2` | clay | 40 |
| Port disc ×2 | octagonal cylinder | groups (±0.86, 1.62, 0.58), yaw ±0.95, tipped −0.25 | 0.26, 0.08 thick | `#7a3ad8` | clay | 80 |
| Port rim | octagonal torus, 0.03 forward | | 0.27 / 0.055 | `#e040c8` | clay | 60 |
| Port lens | octagon circle at +0.045 | | 0.19 | `#c8a8ff`, emissive `#2a1050` | clay, white specular | 140 |
| Port studs ×8 | spheres at the corners | | r 0.022 | `#f0d0ff` | clay | 90 |
| "+" eyes ×2 | ink cross (two boxes) under a white cross (two boxes) | group y 1.36, x ±0.33, turned ±0.3; ink z 1.13, white z 1.16 | ink 0.34 × 0.11 × 0.05; white 0.28 × 0.07 | ink `#123a5a`; white `#ffffff` | clay | 30 / 60 |
| Cheek spot, right | flattened sphere | (−0.6, 1.08, 0.94), turned −0.55 | 0.17 × 0.13 × 0.05 | `#e84fd0` | clay | 40 |
| Cheek spot, left | flattened sphere | (0.6, 1.06, 0.95), turned 0.55 | 0.16 × 0.12 | `#b8e858` | clay | 40 |
| Small spot | flattened sphere | (−0.2, 1.0, 1.08) | 0.10 × 0.08 | `#7a3ad8` | clay | 40 |
| Mouth | `KIT.mouth` arc | (0, 1.10, 1.10) | w 0.17 | `#2a1010` | basic | unlit |
| Ribbon tongue | tube through (0, 0, 0), (0.05, −0.18, 0.06), (0, −0.36, 0.05), (0.06, −0.50, 0.02) | group (0.1, 1.0, 1.1), on his left (+x) of the mouth centre | r 0.075 → 0.05 | `#ff7ac0` | clay | 60 |
| Jelly bubbles ≤ 22 | spheres near the surface, y 0.35–2.05, none in the face zone | | r 0.035–0.085 | `#e8faff`, 55 % opacity | clay, white specular | 140 |
| Crystal wings ×2 × 3 | five-sided cones at 0.55, 0.85, 1.15 rad from vertical, flat-shaded | groups on the root (±0.5, 1.55, −0.85) world | L 1.0 / 0.82 / 0.62; base r 0.12 / 0.10 / 0.08 | `#d8f0ff`, 78 % opacity, emissive `#203848` | Phong, white specular | 140 |
| Goo drips ×4 | hanging sphere stretched 1.6 tall + droplet 0.55× below | (−0.95, 0.42, 0.18), (0.55, 0.22, 0.75), (0.55, 0.24, −0.5), (−0.5, 0.22, −0.55) | 0.12–0.16 | body gradient | body goo | 75 |
| Float ring | torus, 14 × 48 | group y 0.42 (root) | 1.28 / 0.26 | `#c8f03a` | rubber, rep 2, bump 0.015 | 70 |
| Ring stripes ×8 | torus arcs of π/10 every π/4 | on the ring | tube 0.265 | `#fbf8f0` | rubber, rep 1, bump 0.01 | 70 |
| Valve | cylinder + cap | on top at his front right (−x), 0.4 rad from −x toward +z | 0.05 → 0.06 × 0.1; cap 0.035 | `#e040c8`; cap `#fbf8f0` | clay | 60; cap 14 |
| Under-ring | torus 0.1 below | | 1.28 / 0.2 | `#e040c8` | clay | 50 |
| AP tag | octagon circle, red octagon texture with bold white "AP" | ring-local (0.95, −0.12, 1.02), turned 0.75: front left (+x) of the under-ring | r 0.17 | `#e83a2a` | Phong canvas | 30 |
| Beret | sphere 28 × 14 squashed to a 0.5 × 0.5 × 0.13 disc at +0.07 (offset 0.04, −0.03), bent round a sphere of radius 0.6 so it hugs the head | group on the right upper bubble's surface, 0.47 out from its centre along (−0.75, 0.55, −0.37): ≈ (−1.07, 1.81, −0.29), +z the outward normal (`faceTo`) | 1.0 across | `#4a2a6a` | clay | 8 |
| Beret band | torus, bent the same way | at the beret's rim, z 0 | 0.40 / 0.04 | `#3a1e56` | clay | 12 |
| Beret stalk | cylinder along +z, bent | on the crown, z 0.24 | r 0.03 → 0.045, 0.1 long | `#4a2a6a` | clay | 8 |
| Paint flecks ×5 | flattened spheres on the crown's top surface, bent | 0.12–0.36 from the crown centre, seeded (`srand(83)`) | 0.05–0.08 × 0.035 × 0.012 | `#3ae8ff`, `#ff3ac8`, `#a8e830`, `#3ae8ff`, `#ffd23a` | clay | 60 |
| Roots ×9 | `ao` from (0.3, 0.55) under the body out through 0.75 at y 0.18 to the ground at y 0.03/0.01, curling 0.2–0.4 rad | on the root | r 0.045 → 0.012; reach 1.55–2.05 | `#c7a0f0`, `#b8e858`, `#f4f4f4`, `#e8a0d8` in turn | clay | 30 |

#### Palette

| Hex | Use |
| --- | --- |
| `#f2a274` (y −0.3), `#f6b48c` (0.45), `#62c8ea` (0.95), `#34b6ea` (1.6), `#2a9ee0` (2.4) | body gradient by local y: peach below, cyan by mid-body, deeper blue on top |
| `#ffffff`, `#123a5a` | eye crosses, ink outline |
| `#e84fd0`, `#b8e858`, `#7a3ad8` | cheek spots |
| `#2a1010`, `#ff7ac0` | mouth, tongue |
| `#16b0a2` | brow lines |
| `#e8b42c` | crests |
| `#7a3ad8`, `#e040c8`, `#c8a8ff` (emissive `#2a1050`), `#f0d0ff` | ports: disc, rim, lens, studs |
| `#d8f0ff` (emissive `#203848`), `#e8faff` | wings, jelly bubbles |
| `#c8f03a`, `#fbf8f0`, `#e040c8`, `#e83a2a` | ring, stripes and valve cap, valve and under-ring, AP tag |
| `#c7a0f0`, `#b8e858`, `#f4f4f4`, `#e8a0d8` | roots |
| `#4a2a6a`, `#3a1e56`; `#3ae8ff`, `#ff3ac8`, `#a8e830`, `#ffd23a` | beret felt and band (the Gallery's ink); its goo-paint flecks |

#### Surfaces and materials

- Body: glossy jelly (shininess 75, cyan-tinted specular `#99ddff`); the goo tile's swirls and bubble cores show
  through the bump.
- Ring and stripes: rubber dimple tile at shininess 70: glossy rubber.
- Glassy and lit: port lenses (140, emissive) and the faceted crystal wings (transparent, emissive, flat-shaded).
- Unlit: the mouth arc. Transparent: jelly bubbles and wings.

#### Face

- **Eyes:** flat white "+" crosses outlined in dark ink, angled to the face curve; no iris, pupil, glint or lids.
- **Squint (his blink):** the eye group's y-scale drops to 0.25 for 0.16 s every 4.3 s (after t = 1); both eyes
  together.
- **Brows:** two static wavy teal lines high on the forehead.
- **Mouth:** a small dark smile arc with a pink ribbon tongue hanging from its left (+x) side.
- **Cheeks:** asymmetric spots, magenta on his right (−x), lime on his left (+x), a small violet one right of centre.
- Expression comes from the squint, the tongue waggle and the body bounce.

#### Animation

| State | Channel | Value |
| --- | --- | --- |
| Idle | breath | s = sin 2.1t; body scale x, z 1 + 0.025s, y 1 − 0.03s (widens as it squashes); body y 0.55 + 0.03·sin(2.1t + 1) |
| Idle | wings | yaw ±(0.25 + 0.2·sin 4t) |
| Idle | ring | y 0.42 + 0.04·sin 1.6t; roll 0.04·sin 1.1t |
| Idle | crests | sway ±0.06·sin(1.3t + k) about the ±0.35 tilt |
| Idle and talk | tongue | z 0.25·sin 3t + 0.3·tk (waggles more while talking) |
| Walk | none | `step` ignores `wk`; he glides |
| Planting | pat (1.6, 1.1) | roll 0.154·sin 1.6t; press 0.165·(0.5 + 0.5·sin 3.2t); bob 0.03·abs(sin 3.2t) |
| Dance | bounce (5.45, 1.1) | hop 0.132·abs(sin); sy 1 + 0.055·cos(2wt); roll 0.055·sin(0.5wt) |

- **Blossom:** eight volleys at 0.25, 0.6, 0.95, 1.3, 1.65, 2.0, 2.35 and 2.7 s, each 3–4 goo balls arcing from his
  middle to the player's view in his goo colours with "blorp", splatting on the view after 0.95 s. He is the only
  creature who showers the player with goo.
- **Meeting MAMA GORBO:** four throws in turn (two each way), each a volley of three goo balls, a pink `♥` over each
  catcher (5.13).
- **Voice:** only "Gomp" variants.
- **Vignettes:** gesture wobble, token goo `#4ac8f0`, emote `~`.

#### Construction constraints

- Every gradient-coloured mesh (egg, bubbles, drips) is `keepR`.
- The eye group is `keep`: its 4.3 s squint falls between `born()`'s six samples and would otherwise be baked still.
- The wings hang on the root, not the body, so they flutter without being squashed by the breath.
- The ring is its own group; stripes use tube 0.265 over 0.26 against z-fighting. Eye layers are offset in z (ink
  1.13, white 1.16).
- Bubbles skip the face zone (abs(sin a) > 0.75, cos a > 0, y 0.9–1.9).
- The beret is built flat (+z out of the head) and every part's geometry is then bent round a sphere of radius 0.6
  (a point at distance d from the axis and height z goes to angle d / 0.6 on a shell of radius 0.6 + z), so its rim
  follows the head instead of standing off it. It sits behind the port and below the crest, touching neither.
- Roots lie static on the root at y 0.01–0.03. The drips' lowest point (≈ world y 0.44) stays above the ring's lower
  edge.

#### Do / Don't

- **Do** keep the egg of visibly fused bubbles, peach below shading quickly to cyan, glossy, with tiny clear bubbles
  but none over the face.
- **Do** seat him in the lime ring with eight white stripes, the magenta under-ring, the valve at his front right and
  the red octagon AP tag at his front left.
- **Do** keep the eyes white "+" shapes in dark outlines that squint, the asymmetric cheek spots and the pink tongue
  off the left of a small smile.
- **Do** keep two gold three-leaf crests splayed outward, two wavy teal brows, purple octagon ports and faceted
  crystal wing fans behind.
- **Do** keep the nine pastel roots splayed over the ground.
- **Do** keep the beret soft deep violet, hugging the right side of his head, clear of the port and the crest.
- **Don't** give him round eyes, pupils, lids, teeth or a wider or bigger mouth.
- **Don't** attach the wings to the breathing body, or let bubbles cover the face.
- **Don't** make the ring matte or drop its stripes.
- **Don't** add legs: he glides, and his ring floats and bobs.

### 3.5 GEMTOE

This section specifies GEMTOE's model, materials, face and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code).
- **Builder and id.** `BORN.gemtoe` (roster builder `born_gemtoe`); id `p_gemtoe`. Def: name colour `#c870d0`, bodyR
  1.15, talkR 3.8, `modelScale` 1.06.
- **Scale and height.** The builder scales its root ×0.78 (a little smaller than life, so her wings stay inside the
  talk view); world factor 0.78 × 1.06 = **0.827**. Declared height 2.4 × 1.06 = **2.54 m in game**; the geometry
  tops out at ≈ 3.36 units (crest and upper wing tips), ≈ 2.8 m in game.
- **Read.** A legless, floating feathered dragon: a tall narrow pear of a trunk under a small bird-like head, two pairs
  of great fanned wings, and four long tails coiled round amethysts on the ground.

#### Silhouette and signature parts

- Black shape: a narrow upright pear with a small head, two big wing fans per side (upper near-vertical, lower
  near-horizontal and swept back), standing in a ring of four little posts.
- Signatures: (1) the double fan of wings; (2) the four tails coiled round amethysts; (3) the hooked pale beak under a
  swept amber-orange crest.
- She has no legs: the trunk ends just above the ground and she floats.

#### Proportions

Model units before ×0.827.

| Measurement | Value |
| --- | --- |
| Trunk | lathe y 0.55–2.4; radius 0.3 (y 0.6), 0.42 (0.8), 0.5 (1.1), **0.54 max (1.4)**, 0.5 (1.7), 0.38 (1.98), 0.28 (2.2), 0.24 (2.4, the neck); ≈ 1.08 wide, 1.85 tall; leaning forward 0.06 rad |
| Head | group (0, 2.52, 0.12), scale 1.22; cranium ≈ 0.73 wide, 0.68 tall, 0.78 deep |
| Head : trunk height | ≈ 0.37 |
| Upper wings | root (±0.3, 1.98, −0.24); fan 0.62–1.48 rad above lateral; length 1.2 → 1.62; sweep 0.5; tips ≈ y 3.36; span ≈ 2.7 |
| Lower wings | root (±0.3, 1.62, −0.28); fan −0.08–0.6 rad; length 0.78 → 1.08; sweep 0.62; span ≈ 2.2 |
| Tails | yaw 0.62, −0.62, 2.45, −2.45 rad; posts 1.68 (front pair) and 1.85 (back pair) from the centre; footprint radius ≈ 1.9 (≈ 1.55 m in game) |
| Float | root y 0.08 + 0.03·sin 0.9t |

#### Anatomy

Head parts are in the head group's frame (before its ×1.22).

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Crest | 34 fur cards along the midline, pointing up and back (`Z = (2·sx, 1, −0.55 − 0.6u)`) | z 0.16 → −0.34, y ≈ 0.22–0.25 | L (0.26 + 0.24·sin(π(0.15 + 0.7u)))·(0.85–1.15), up to ≈ 0.5; W 0.07 | front half `#ffb030`, back half `#f07a2a`, ±5 % lightness | `gradMat("feather")`, double-sided | 30 |
| Horns ×2 | `ao` swept back | (±0.14, 0.18, −0.06) → (±0.17, 0.3, −0.12) → (±0.19, 0.36, −0.24) → (±0.17, 0.36, −0.36) | r 0.05 → 0.01 | `#8a1c24` | scale, rep 2, bump 0.025 | 60 |
| Brows ×2 | flattened ellipsoids, rotated (0.3, ±0.5, ∓0.35) | (±0.17, 0.14, 0.24) | (0.1, 0.035, 0.07) | `#8a1c24` | scale | 60 |
| Cranium | ellipsoid | (0, 0, −0.02) | (0.3, 0.28, 0.32) | `#c02e2e` | feather, rep 7, bump 0.02 | 40 |
| Face / snout | ellipsoid | (0, −0.04, 0.17) | (0.22, 0.19, 0.22) | `#c02e2e` | feather | 40 |
| Eyes ×2 | see Face | groups (±0.18, 0.07, 0.22), turned ±0.55 | r 0.06 | `#ffc22a` | emissive clay | 150 |
| Cere | ellipsoid, tilted 0.2 | (0, 0.045, 0.34) | (0.085, 0.045, 0.07) | `#5a2a20` | clay | 40 |
| Nostrils ×2 | spheres | (±0.035, 0.04, 0.42) | r 0.012 | `#2a0a08` | clay | 14 |
| Upper bill | cone squeezed 0.82 x, 0.8 y, hooked down by 0.36·len·z² (tip drops ≈ 0.115), tilted 0.12 | (0, −0.02, 0.33) | r 0.11, L 0.32 | `#e2d2a8` | plastic, rep 1, bump 0.01, white specular | 90 |
| Lower bill (jaw) | cone, hook 0.1, flatten 0.55, tilted −0.08 | pivot (0, −0.09, 0.32), resting open 0.22 rad | r 0.085, L 0.24 | `#e2d2a8` | plastic | 90 |
| Mouth interior | ellipsoid | (0, −0.07, 0.37) | (0.07, 0.03, 0.09) | `#4a1020` | clay | 20 |
| Cheek tufts ×2 | 9 fur cards per side sweeping back and out | x ±0.24, roots from y −0.06 up a shallow arc, z 0.02 → −0.14 | L 0.2–0.32 (longest mid), W 0.06 | `#d03a30` / `#b02828` alternating | `gradMat("feather")` | 30 |
| Ruff | ≈ 660 fur cards: 22 rows every 0.055 from y 1.12 to 2.3, 30 per row, hanging down and out | rooted 0.02 inside the trunk | L (0.2 + 0.32·front + 0.12·up)·(0.85–1.15), up to ≈ 0.75 over the chest (front = max(0, cos ph)); W 0.06–0.09 | `#b8282e`, HSL jitter, +0.04 lightness toward the top | `gradMat("feather")` | 30 |
| Trunk | lathe, 36 segments | y 0.55–2.4 | see Proportions | `#a82228` | scale, rep 4, bump 0.03 | 60 |
| Wings ×4 | three layers of vane cards per wing (below) | roots as in Proportions | | reds | `gradMat("feather")`, double-sided | 30 |
| Tails ×4 | `ao`, 110 × 12 | from (0, 0.85, 0) inside the trunk, diving to y 0.16 by z 0.95, out to the post, up to gy − 0.32, then 1.25 turns of a 0.17-radius helix rising 0.14 round the crystal's base; coil direction alternates | r 0.2 → 0.04 | `#8e1c26` | scale, map repeated 18 × 2 along the tube, bump 0.03 | 60 |
| Crystals ×4 | "cut" emerald slab (octagon 0.2 × 0.32, depth 0.1, bevel 0.035/0.03, scale (1, 1.05, 1)) or "point" double-terminated hex prism (r 0.09, body 0.2, pyramids 0.14 / 0.1, scale (1.15, 1.25, 1.15)), flat-shaded | (gx, gy + 0.08, gz), turned 0.6·k | | see the tail table | emissive clay, white specular | 170 |
| Sparkles ×12 | flat 5-point stars (inner 0.42), double-sided, facing front | 3 per crystal within ±0.175, 0.25–0.5 above | scale 0.045–0.08 | `#fff2a0` | basic | unlit |

| Wing layer | Cards | Length | Width | Colour | Shaft tint | Offset / lift |
| --- | --- | --- | --- | --- | --- | --- |
| Primaries | 10 | full | 0.24 | `#a8222a` | `#ffe6d6` | none |
| Coverts | 11 | 0.58–0.62 × | 0.2 | `#c4302e` | `#ffd8c4` | 0.04 / 0.1 |
| Down | 12 | 0.3–0.32 × | 0.14 | `#d8463a` | none | 0.075 / 0.16 |

| Tail k | Yaw (side) | Crystal | Colour (emissive) | Crystal height gy |
| --- | --- | --- | --- | --- |
| 0 | 0.62 (front left, +x) | cut | `#8a34e0` (`#3c0c78`) | 1.30 |
| 1 | −0.62 (front right, −x) | point | `#b070ff` (`#5a20a0`) | 1.18 |
| 2 | 2.45 (back left) | point | `#8a34e0` (`#3c0c78`) | 0.92 |
| 3 | −2.45 (back right) | cut | `#b070ff` (`#5a20a0`) | 1.02 |

#### Palette

| Hex | Use |
| --- | --- |
| `#a82228` | crimson trunk scales (main) |
| `#b8282e` | ruff |
| `#c02e2e` | head feathers |
| `#8a1c24`, `#8e1c26` | dark scale (brows, horns), tails |
| `#a8222a`, `#c4302e`, `#d8463a` | wing primaries, coverts, down |
| `#ffe6d6`, `#ffd8c4` | wing shaft tints |
| `#d03a30`, `#b02828` | cheek tufts |
| `#ffb030` → `#f07a2a` | amber-orange crest, front to back |
| `#e2d2a8`, `#5a2a20`, `#2a0a08`, `#4a1020` | beak, cere, nostrils, mouth |
| `#ffc22a` (emissive `#9a5a06`), `#14060f`, `#ffffff` | amber eyes, slit pupil, glint |
| `#8a34e0`, `#b070ff` | amethysts |
| `#fff2a0` | sparkles |

- Colour is split by part, not banded; every card shades dark at the root to light at the tip; the ruff lightens
  toward the top.

#### Surfaces and materials

- Scales (trunk, tails, brows, horns) at shininess 60; feathered head at 40; cards satin 30; beak glossy plastic 90.
- Self-lit: the eyes and amethysts (emissive). Unlit: sparkles, glints, pupil slits.
- Amethysts are flat-shaded and faceted at shininess 170: the glossiest material on her.

#### Face

- **Eyes:** side-set, bird-like: a self-lit amber sphere r 0.06 (shininess 150, white specular), a vertical slit pupil
  (sphere scaled 0.011 × 0.04 × 0.012 at z 0.052, `#14060f`) and one white glint r 0.012 at (−0.02·sx, 0.024, 0.052).
- **Lids:** upper half-sphere r 0.066 in the head feather material, open at −0.5; standard blink.
- **Brows:** heavy, dark, scaled and angled over the eyes: the expression reads stern and hooded.
- **Beak:** hooked upper bill over a shorter lower bill, always a little open (0.22 rad), the dark mouth showing in
  the gap. No cheek spikes; the cheek tufts are soft cards.

#### Animation

| State | Channel | Value |
| --- | --- | --- |
| Idle | float | root y 0.08 + 0.03·sin 0.9t |
| Idle | breathing bob | body y 0.03·sin 1.4t |
| Idle | head | yaw 0.12·sin 0.7t; nod 0.05·sin 1.1t |
| Idle and talk | jaw | x 0.22 + 0.06·sin 1.9t + 0.3·tk (breathes open; up to 0.3 rad more per syllable) |
| Idle | wings | rz sx·0.07·sin(1.5t + 0.6·pair); ry −sx·0.05·sin(1.5t + pair) |
| Idle | tails | rz 0.035·sin(1.2t + k); rx −0.02·sin(0.9t + 2k) |
| Idle | sparkles | scale s0·max(0.05, sin(2.6t + ph)) (twinkle) |
| Walk | body, wings | bob + 0.03·abs(sin 6t); flap + sx·0.25·sin(5.5t + 0.6·pair), the pairs 0.6 rad apart; she glides |
| Planting | scatter (2.4, 1) | ry 0.55·sin 2.4t; y 0.06·abs(sin 4.8t) |
| Dance | twirl (2.7, 1), half time | ry 2.4·sin(0.4wt); y 0.05·abs(sin wt); rz 0.05·sin wt |

- **Gem trade:** one happy spin (a full turn with a 0.3 hop over 1.4 s, 3.1).
- **Vignettes:** gesture twirl (a full turn with a 0.2 lift), token a gem `#2ae070`, emote `✦`.

#### Construction constraints

- The float keeps the tail coils 4 cm clear of the ground at their lowest while swaying: keep the root offset 0.08 and
  its ±0.03 range.
- The ×0.78 inner scale keeps the wings inside the talk camera: never remove it or enlarge the wings.
- Cards are merged into one vertex-coloured, double-sided mesh per group (ruff, each wing, crest, each tuft), `keepR`.
  Ruff roots sit 0.02 inside the trunk so no gap shows.
- Tails start inside the trunk at y 0.85; `ao` caps close their ends.
- Wings, head, jaw and tails are animated groups; everything else is baked per material.
- Seeded randomness (`srand(4242)`) makes every card's jitter identical on every build.

#### Do / Don't

- **Do** keep her legless and floating, the trunk narrowing to a short neck.
- **Do** keep two wing pairs per side: upper near-vertical and long, lower near-horizontal and shorter, both swept
  back.
- **Do** keep four tails at about ±35° and ±140°, each coiling up round a crystal; alternate cut slabs and hex points
  and the two purples.
- **Do** keep the amber-orange crest, the pale hooked beak always slightly open, amber self-lit eyes with a black
  slit and one glint, and heavy dark brows.
- **Do** keep warm reds that lighten outward on every card.
- **Don't** give her feet, or let the coils touch the ground.
- **Don't** make the amethysts smooth, or light the sparkles.
- **Don't** add cheek spikes or change the crest or eye colours.

### 3.6 MONTGUMMERY

This section specifies MONTGUMMERY's model, materials, face and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code), flat screen mouth included.
- **Builder and id.** Packaged builder `pk_mont` (`PK_MONT.mont`), with its own `anim` (not `born()`); id `w_mont`.
  Def: name and battle-bar colour `#55b8c6`, bodyR 0.86, talkR 3.8, `modelScale` 0.9.
- **Scale and height.** Declared height 3.3 × 0.9 = **2.97 m in game**; visible top (head ring) y ≈ 3.24, 2.92 m in
  game.
- **Read.** A squarish CRT screen for a head, set straight onto a dark egg-shaped body with a flat-topped, shouldered
  upper half; short legs in pot boots; long tube arms ending in big pale-blue hands.

#### Silhouette and signature parts

- Black shape: a box head slightly wider than the body, no neck, arms hanging to mid-thigh, a thin tail running out to
  his right (−x) and down to the ground.
- Signatures: (1) the screen with its white pixel face; (2) the pot boots; (3) the big hands.

#### Proportions

| Measurement | Value (model) |
| --- | --- |
| Body | reshaped sphere scaled (0.7, 0.8, 0.54) at (0, 1.5, 0): 1.40 wide, 1.60 tall, 1.08 deep, y 0.70–2.30; superellipse profile, exponent 6 above the middle (flat top, square shoulders), 2.4 below (rounder belly) |
| Head | group (0, 2.62, 0.3), scale ×1.32; bezel 1.48 × 1.19 effective, y ≈ 2.03–3.21; overlaps the body top by ≈ 0.27, projects ≈ 0.12 in front |
| Legs | groups (±0.29, 0.86, 0.02), scale ×1.15; ≈ 0.87 tall; soles at y ≈ −0.01 |
| Arms | shoulders (−0.64, 1.9, 0.02) right and (0.66, 1.9, 0.02) left, 4–6 cm inside the body; tube drop 0.66; hands ≈ 0.45 long; fingertips at y ≈ 0.8 |
| Tail | root (−0.22, 1.0, −0.36); reaches 1.15 to his right and down to y ≈ 0.08 |
| Ratios | head width : body width 1.06; head : body : legs heights ≈ 1.19 : 1.60 : 0.87 |

#### Anatomy

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Top ring | torus | head (0, 0.42, −0.25) | 0.035 / 0.012 | `#1d2a23` | housing Phong | 40 |
| Screen housing | rounded rectangle 1 × 0.78 (corner 0.12) extruded 0.52 (bevel 0.08/0.06, 5 segments), sculpted into a CRT: section × (1 − 0.42a^1.3), back rising 0.04a and bulging 0.26a² (a = depth fraction to 0.68) | z −0.6..−0.08, placed at z 0.2 | | `#1d2a23` | Phong, spec `#333333` | 40 |
| Bezel | rounded rectangle 1.12 × 0.9 (r 0.12) with a hole 0.9 × 0.58 (r 0.06) raised 0.07; extruded 0.05, bevel 0.025/0.012; bottom lip (y −0.45 to −0.22) wider than the top | z ≈ 0.175–0.275 | | `#55b8c6` | Phong, spec `#333333` | 40 |
| Screen | plane, 1–2 cm larger than the hole, edge tucked behind the bezel | (0, 0.07, 0.225) | 0.91 × 0.6 | face canvas | unlit | unlit |
| Control bar | box | (0.03, −0.335, 0.28) | 0.3 × 0.06 × 0.02 | `#14201b` | vertex-coloured clay, spec `#222222` | 30 |
| Slots ×10 | boxes | z 0.292 on the bar | 0.012 × 0.04 × 0.01 | `#2c4a44` | same | 30 |
| Knob | cylinder + centre | (−0.32, −0.335, 0.285), centre z 0.3 (his right of the lip) | r 0.035; centre r 0.02 | `#2a3a36`; `#08100e` | same | 30 |
| Lip marks | slot 0.09 × 0.016, square 0.03, dot r 0.01 | y −0.265, z 0.282 | | `#1c3a36` | same | 30 |
| Body | reshaped sphere with a 512 × 256 wrap map | see Proportions | | `#1d2a23` with chest disc `#4cb6e0` | Phong, spec `#333333` | 40 |
| Chest disc | ellipse painted in the body map (52 × 50 px) at the front-most vertex, sphere height y −0.25 | world y ≈ 1.3 | ≈ 73° of the circumference, ≈ 0.8 across | `#4cb6e0` | body | 40 |
| Code shell | clone of the body ×1.012, `depthWrite` off, `renderOrder` 1 | over the body | | code text | transparent Phong, specular 0 | 1 |
| Arms ×2 | tube through (0.08e, −0.18, 0), (0.12e, −0.34, 0.03), (0.14e, −0.5, 0.06), (0.14e, −0.66, 0.09), e = ±1 | shoulders | r 0.13 → 0.085, 20 × 10 | code on dark | limb code material | 36 |
| Hands ×2 | merged vertex-coloured clay, mirrored (palms face the body): palm box 0.034 × 0.1 × 0.1 + sphere (0.022, 0.055, 0.055), four knuckle beads, wrist sphere; four two-segment fingers (r 0.0125, 0.013, 0.0125, 0.0112, tapering 0.92 then 0.8; middle longest ≈ 0.084); two-segment thumb (r 0.017 → 0.012) | arm end + 0.03 y, rot (0.1, 0.25e, −0.08e), scale 2.1 | ≈ 0.45 long | base `#7cc6ea`, tips `#6db8dc` | clay | 30 |
| Tail | tube through (0, 0, 0), (−0.25, −0.25, −0.12), (−0.6, −0.6, −0.05), (−0.92, −0.84, 0.12), (−1.15, −0.92, 0.3) | root (−0.22, 1.0, −0.36) | r 0.085 → 0.006, 40 × 10 | code on dark | limb code material | 36 |
| Thigh stubs ×2 | cylinder, sunk ≈ 0.16 into the body | leg y −0.1 | r 0.1, h 0.28 | code on dark | limb code material | 36 |
| Pot | cylinder | leg y −0.42 | r 0.162 → 0.15, h 0.42 | `#3db2d6` | merged clay, spec `#222222` | 30 |
| Pot rim | torus | y −0.21 | 0.158 / 0.018 | `#46bede` | same | 30 |
| Foot | ellipsoid | (0, −0.62, 0.07) | (0.16, 0.11, 0.25) | `#3db2d6` | same | 30 |
| Toe cap, heel | ellipsoids | z 0.24; z −0.12 | (0.15, 0.10, 0.12); (0.15, 0.055, 0.11) | `#e2521f` | same | 30 |
| Sole | ellipsoid | y −0.72 | (0.175, 0.035, 0.30) | `#c9441a` | same | 30 |
| Lacing | two rails 0.016 × 0.36 at x ±0.04; seven rungs 0.08 × 0.014 from y −0.27 to −0.57; two tabs 0.014 × 0.012 × 0.16 at y −0.585 tipped −0.75 | pot front z 0.163–0.165 | | `#f0c23a` | same | 30 |

#### Palette

| Hex | Use |
| --- | --- |
| `#1d2a23` | near-black green body, housing, limbs (main) |
| `#55b8c6` | bezel; name and battle-bar colour |
| `#4cb6e0` | chest disc |
| `#8fdcec`, `#d8f4ff`, `#6cc8e0` | code text on body and limbs |
| `#7f52c8` → `#5a33a0` | screen radial gradient, centre to edge |
| `#c6d2ff`, `#e6ecff`, `#9fb4f0` | code text on the screen |
| `#f29043` | "gfxinfo" header |
| `#ffffff`, `rgba(40,20,90,0.85)` | face pixels, dark-violet face detail |
| `#7cc6ea`, `#6db8dc` | hands |
| `#3db2d6`, `#46bede` | pots, rims |
| `#f0c23a` | gold lacing |
| `#e2521f`, `#c9441a` | toe caps and heels, soles |
| `#14201b`, `#2c4a44`, `#2a3a36`, `#08100e`, `#1c3a36` | control strip |

- No vertex gradients: colour bands come only from texture (the screen gradient and the code text).

#### Surfaces and materials

- **Scrolling code text** (seeded painter; characters ``{}[]()<>;:'"=,._/\|abcdeforstuvgxinpl0123456789``, 12 %
  spaces, bold Courier New, rows 1.05 × font size apart, per-row opacity 0.6–1.0 × base alpha):

| Layer | Canvas | Text | Repeat | Material | Scroll |
| --- | --- | --- | --- | --- | --- |
| Body shell | 512², transparent | 22 px, alpha 0.9, seed 7 | 2.5 × 1.6 | Phong, specular 0, shininess 1 | 0.05 texture units/s (v) |
| Limbs (arms, tail, thigh stubs) | 512² on `#1d2a23` | 22 px, alpha 0.85, seed 11 | 1.5 × 1.5 | Phong, specular `#2a2a2a`, shininess 36 | 0.04 units/s |

- Body base, housing and bezel: satin Phong 40. Pots, hands and control strip: merged vertex-coloured clay 30.
- **Screen base canvas** (512²): the radial gradient; "gfxinfo gfxinfo" in weight-500 86 px sans squeezed to 0.66
  width at the top; a 17 px code column from y 130–420 on the left (seed 3) and two lines across the bottom from y
  425–495 (seed 5); then the face; then a gloss overlay (white 14 % fading to 0 by 45 %, black 12 % at the far corner).
- The screen is unlit: the only glow on him. `texturize` is not applied.

#### Face

- Faces are drawn into 512² canvases over the base canvas, each once into its own cached texture and swapped in.
  Pixel-face x maps `x → 256 + 0.72·(x − 346)` and icons use `scale(0.66, 1)`, so pixels stay square on the 0.91 × 0.6
  plane; one face pixel is 17.28 × 24 px (≈ 0.031 × 0.028 m).

| Face key | When | Drawing |
| --- | --- | --- |
| `idle0` | default | two tall white eye bars 24 × 45.6 px at y 150 (left edges 215.7 and 293.4); flat mouth of five pixels at y 322 (x 221.4–307.9) |
| `idle1` | talking, `tkS` > 0.2 | same eyes; mouth a hollow rectangle, rows at 322 ∓ 18, one pixel on each end column |
| `idle2` | talking, `tkS` > 0.55 | same eyes; taller hollow mouth, rows at 322 ∓ 36, end columns at y 310 and 334 |
| `shovel0` | planting, and 5 s after his Event line | white pixel shovel on a 22 px grid at (256, 262), rotated −0.35: T-grip 3 × 1, shaft 1 × 6, blade 5 × 3, 3 × 1, 1 × 1 tip |
| `robot0` / `robot1` | dancing (`gcDw` > 0.05), and 5 s after a Blossom | square eye frames 36 × 60 px (8 px walls, top y 138); pupil 10 × 24 at y 156 jumping between +2 and +12 in each frame on alternate beats; grille mouth: bars 128 × 8 at y 306 and 346 crossed by seven 8 × 48 bars every 24 px |
| `rock0` | battle move "rock" (weight > 0.5) | pixel fist on a 22 px grid at (256, 250): rows 5 × 1, 7 × 4, thumb 1 × 2, 5 × 2; three dark-violet finger gaps |
| `scissors0` | battle move "scissors" | two white blades 22 × 150 px rotated ±0.42 in a V; two handle loops 60 × 52 stroked 14 px |
| `paper0` | battle move "paper" | white page 6 × 8 cells, five dark-violet rule lines, dark folded corner at the top right |

- Priority: shovel, then battle move, then robot (dance), then robot (Blossom), then idle.
- The face never smiles; talking changes only the mouth's opening (three sizes); pupils move only in the robot face.

#### Animation

| State | Channel | Value |
| --- | --- | --- |
| Idle | body breath | scale y 0.8·(1 + 0.01·sin(1.7t + G)), G random 0–10 |
| Idle | head | pitch 0.03·sin(0.9t + G); roll 0.04·sin(0.7t + G) |
| Idle | tail | yaw 0.18·sin(1.1t + G); roll 0.05·sin(0.8t + G) |
| Idle | left arm (+x) | pitch 0.04·sin(1.2t + G) |
| Idle | code layers | scroll continuously |
| Talk | head | each conversation opening nods 0.18·sin(2π·I/0.9)·(1 − I/0.9) over 0.9 s; mouth faces as above; plus the wrapper |
| Walk (phase 7 rad/s) | legs, body | legs ±0.45 in opposition; bob 0.07·abs(sin) |
| Walk | arms, tail | right arm +0.1·n, left arm −0.1·n; tail yaw + 0.1·n |
| Planting | pat (1.9, 1) | roll 0.14·sin; pitch 0.15·(0.5 + 0.5·sin 2wt); bob 0.03·abs(sin 2wt); shovel face |

**Dance, the robot** (his own; engine wrapper zeroed): beat 104/60 Hz (88/60 at the Garden Event); one pose per
beat, a 16-beat phrase.

- Each pose sets eight channels: right arm (−x) forward and out, left arm (+x) forward and out, body turn, screen turn,
  screen tilt, step. Arm values 0, 0.6 or 1.35 rad; body turn ±0.25 or ±0.5; screen turn ±0.2 or ±0.3; screen tilt
  ±0.18; step ±1.
- A new pose snaps in over the first 20 % of the beat (smoothstep), then a settle jitter `0.03·sin(55f)·(1 − 3f)` for
  f 0.2–0.33.
- The step swings the pots ±0.18 in opposition; the body lifts 0.035·abs(step) plus a 0.02 kick at each beat start.
- Arms go forward or out to the side only, never across him or up into the screen.

**Battle moves** (blended by mW, eased 5/s, timed by the move's own beat phase):

| Move | Pose |
| --- | --- |
| Rock out | left arm forward 1, out 0.55 (the guitar neck); right arm strums: forward 0.25·sin(2ph) − 0.55, out −0.1; screen bangs forward 0.2·tap (tap = max(0, sin ph)); left pot taps 0.15·tap; bob 0.03·abs(sin(ph/2)) + 0.02·tap |
| Scissors | pots splay ±0.42 about z; both arms forward 1.2, chopping sideways: right out 0.75c − 0.5, left out 0.5 − 0.75c (c = 0.5 + 0.5·cos ph); bob 0.015·abs(sin ph) |
| Paper | body tips forward 0.5 and lifts 0.145 + 0.05·sin(π·min(1, mW)); one pot counter-rotates −0.5 to stay flat, the other kicks back +1.05; arms forward 1.15, spread ±0.12; body yaw 0.15·sin(πb/2); screen tilt 0.1·sin(πb/2) |

- When the dance stops, the beat count and every offset reset to 0.
- **Vignettes:** gesture nod, token a coin `#3db2d6`, emote `!`.

#### Construction constraints

- The code shell is 1.2 % larger than the body, `depthWrite` off, `renderOrder` 1: the text never z-fights the body.
- The screen sits recessed inside the bezel's thickness and overlaps the hole edge; control parts sit 0.5–2.5 cm
  proud of the bezel front.
- Pots, control strip and hands are each one merged vertex-coloured mesh. Face textures are built once per key and
  never redrawn per frame; a new face is a new cached key.
- Thigh stubs and shoulder pivots are sunk into the body so no gap opens as the limbs swing.
- The tail tip comes to about 2 cm off the ground at the extreme of its roll: its z-roll must stay at 0.05 or below.
- Paper keeps the planted pot level and lifts the body 0.145, so nothing sinks.
- Soles reach y ≈ −0.01 in the model; the ground fit lifts him to 6 mm clearance.

#### Do / Don't

- **Do** keep the head a deep tapered CRT in `#1d2a23`, framed by a teal bezel with a wider bottom lip carrying a
  dark knob and slots.
- **Do** draw every face in square white pixels on the purple gradient, over faint code and the orange header, under
  the diagonal gloss.
- **Do** keep the mouth a flat five-pixel line at rest, opening into a hollow rectangle in two sizes as he talks.
- **Do** keep scrolling pale-cyan code over the dark body and limbs, and the large cyan chest disc low on the front.
- **Do** keep big pale-blue four-fingered hands with thumbs, palms toward the body, and blue pot boots with gold
  lacing and orange toes, heels and soles.
- **Don't** give him a neck, a smile, brows or eyes outside the screen, or light the screen.
- **Don't** let arms cross the body or rise into the screen in any pose.
- **Don't** thicken the tail or drop it lower.

### 3.7 ETCHER

This section specifies ETCHER's model, materials, face and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code).
- **Builder and id.** `BORN.etcher` (roster builder `born_etcher`); id `p_etcher`. Def: name colour `#9ee09a`, bodyR
  1.15, talkR 3.6, `modelScale` 1.16; battle-bar colour `#7a4ab8`. Neither name colour is used on the model.
- **Scale and height.** Declared height 2.6 × 1.16 = **3.02 m in game**; visible top (crown knobs) y ≈ 2.5, 2.9 m in
  game. Tentacles reach about 4.3 m from his centre in game, far beyond bodyR.
- **Read.** A wide bell-shaped scaly mound rising into a long, slightly forward-leaning neck and a small lizard head,
  with six long purple tentacles spread over the ground.

#### Silhouette and signature parts

- Black shape: a wide star of six tentacles with a bell in the middle and a thin neck rising from it.
- Signatures: (1) the bell body of shingled scales; (2) the six ground-spread tentacles, three per side, none pointing
  straight forward (the front stays open for his feet) or straight back; (3) at closer range, the green chest gem.

#### Proportions

| Measurement | Value (model) |
| --- | --- |
| Bell base width | 1.48 (1.72 m in game), ≈ 2.7 × the head's width |
| Neck width | ≈ 0.5; climbs forward 0.3 from base to head |
| Head width | ≈ 0.54; snout tip at z ≈ 0.88 |
| Eyes | r 0.085 (0.17 across, ≈ 31 % of head width) |
| Tentacles | start z 0.45 inside the base; run from z 0.8 out to 0.8 + length (2.0–2.9); longest reaches 3.7 from centre |

Body skin: `blobBody`, k 0.20, uvLen 0.9.

| Ellipsoid | Centre | Radii (x, y, z) | Tilt rx |
| --- | --- | --- | --- |
| Bell base | (0, 0.42, 0) | 0.74, 0.46, 0.68 | 0 |
| Lower torso | (0, 0.95, 0.02) | 0.52, 0.55, 0.48 | 0 |
| Lower neck | (0, 1.45, 0.10) | 0.33, 0.40, 0.31 | 0.12 |
| Upper neck | (0, 1.88, 0.20) | 0.25, 0.32, 0.25 | 0.20 |
| Cranium | (0, 2.20, 0.32) | 0.27, 0.22, 0.29 | −0.15 |
| Snout | (0, 2.15, 0.62) | 0.18, 0.13, 0.26 | 0.15 |

#### Anatomy

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Crown knobs ×5 | spheres | rays from (0, 2.2, 0.32) upward, front (+0.3 z) to back (−0.58 z), x ±0.1 on alternate knobs; raised 0.03 | (0.045, 0.06, 0.045) | `#7a3ab8` | clay | 60 |
| Eyes ×2 | `KIT.eye` | rays from (0, 2.22, 0.34) toward (±0.8, 0.35, 0.5), inset 0.04 | r 0.085 | iris `#c8a020`, lid `#2a5aa8` (open −0.25) | standard eye | 80 / 20 |
| Nostrils ×2 | ellipsoids | rays from (0, 2.15, 0.62) toward (±0.3, 0.3, 1) | (0.018, 0.012, 0.016) | `#0e1a2a` | clay | 14 |
| Mouth lines ×2 | tube through 9 skin points | rays from (0, 2.1, 0.5) sweeping 0.15–1.35 rad round the snout, angled −0.22, lifted 3 mm | r 0.009 → 0.007 | `#0e1a2a` | clay | 20 |
| Body skin | one blended skin | see table | | teal → blue gradient | `gradMat("scale")`, rep 6, bump 0.05, spec `#666666` | 70 |
| Gem stone | chamfered octagon 0.2 × 0.24 (chamfer 0.035), extruded 0.04, bevel 0.03/0.025, flat-shaded | ray from (0, 1.1, 0.12) toward (0, 0.35, 1), set 0.01 off the skin | | `#6ad02a`, emissive `#1e5008` | clay, white specular | 170 |
| Gem setting | torus squeezed 0.85 in x | round the stone | 0.14 / 0.02 | `#1e4a5a` | clay | 60 |
| Bell scales | half-sphere domes in 9 rows, y 0.28–1.56 every 0.16; 22, 20, 19, 17, 16, 14, 12, 11, 9 per row, alternate rows offset half a step; turned to the normal, tipped −0.35 (shingled downward); none within ±56.6° of the front between y 0.75 and 1.25 (gem window) | on the skin | s = 0.13 − 0.007·row, scaled (s, 0.35s, 1.2s): larger low down | `#2a8296`, `#2e74a8`, `#2a9a9a`, `#3368b0` by (row + k) % 4 | scale, rep 1, bump 0.03, spec `#888888` | 80 |
| Front feet ×2 | ellipsoid | rays from (0, 0.15, 0.1) toward (±0.42, −0.05, 1); y 0.1, nudged 0.06 forward | (0.16, 0.11, 0.2) | `#2a7a9a` | scale | 60 |
| Claws ×3 per foot | cones pointing forward | x 0, ±0.07, z 0.19, splayed ±0.2 | r 0.03, L 0.08 | `#e8e0c8` | clay | 60 |
| Tentacles ×6 | `ridgedTube`, 80 × 10, capped | groups on the root (table below) | r 0.14 → 0.05, ridges up to +16 %, length × 7 rings | `#7a4ab8` | scale, rep 1, bump 0.03, spec `#888888` | 80 |

| k | Heading (rotation.y) | Side | Length | Side-wave sign | Notes |
| --- | --- | --- | --- | --- | --- |
| 0 | +0.62π (111.6°) | left (+x), behind | 2.4 | +1 | |
| 1 | −0.62π | right (−x), behind | 2.6 | −1 | |
| 2 | +0.85π (153°) | left, far back | 2.9 | −1 | last 20 % rises 0.4 at the tip |
| 3 | −0.86π (154.8°) | right, far back | 2.7 | +1 | |
| 4 | +0.40π (72°) | left, front | 2.0 | −1 | |
| 5 | −0.42π (75.6°) | right, front | 2.2 | +1 | |

- Tentacle path: (0, 0.32, 0.45), (0, 0.16, 0.8), then eight points at height 0.11 out to 0.8 + length, waving
  sideways by 0.35·sin(3.2u + k) × the wave sign.

#### Palette

| Hex | Use |
| --- | --- |
| `#2a8a9e` → `#2a5aa8` | body: teal at y 0.4 to blue at y 2.2 (lightness ±0.04·sin(7x + 5y) ripple; creases −0.1·fold) |
| `#2a8296`, `#2e74a8`, `#2a9a9a`, `#3368b0` | bell scales |
| `#2a7a9a` | feet |
| `#7a4ab8` | tentacles |
| `#7a3ab8` | crown knobs |
| `#6ad02a` (emissive `#1e5008`), `#1e4a5a` | gem, setting |
| `#c8a020`, `#fbf8ee`, `#0c0c10`, `#2a5aa8` | iris, sclera, pupil, lid |
| `#0e1a2a` | nostrils and mouth |
| `#e8e0c8` | claws |

#### Surfaces and materials

- Body: the KIT scale tile tinted by vertex colours, glossy (70), `keepR`.
- Scales, feet and tentacles: KIT scale at 60–80, high-grey specular. Knobs: clay 60.
- Gem: flat-shaded, emissive, shininess 170: the jewel. Pupils and glints are his only unlit parts.

#### Face

- Two standard KIT eyes, golden and slightly hooded (lid −0.25); standard blink from −0.25 to 1.75 rad.
- A closed dark mouth line on each side of the snout; no jaw, and nothing in his model reacts to talk.
- Expression is calm and level, carried by head and body motion only.

#### Animation

| State | Channel | Value |
| --- | --- | --- |
| Idle | body | roll 0.025·sin 1.1t; pitch 0.02·sin 0.9t |
| Idle | tentacles | heading drift 0.04·sin(0.8t + k) |
| Talk | wrapper only | |
| Walk | body | bob 0.03·abs(sin 6t); tentacles keep drifting |
| Planting | pat (2.1, 0.9) | roll 0.126·sin; pitch 0.135·(0.5 + 0.5·sin 2wt); bob 0.03·abs(sin 2wt) |

**The `bend` deformation** (dance and battle moves) reshapes each tentacle's vertices past z 0.8 every frame: a
travelling side wave `amp·u·sin(wph − 6u)`; an optional level lift eased in over the first quarter, with a flutter;
and an upward curl in the tentacle's own vertical plane, total bend `phi` spread evenly along the length.

**Dance, the tentacle dance** (his own; engine wrapper zeroed): 16 beats in four bars of four; throughout, a body bob
0.04·sin²(π·beat) and twist 0.2·sin(π·beat).

| Bar | Move | Values |
| --- | --- | --- |
| 1 | ripple | phi 0.2 + 0.25·sin²(πf); side wave 0.18, phase π·beat + k |
| 2 | curl in turn | each curls to phi 0.2 + 1.9 over 1.4 beats, starts staggered half a beat in the order k4, k0, k2, k3, k1, k5 (left front, round the back, to right front) |
| 3 | twirl | root turns 0.35·sin(π·b4/2); tentacles swing an extra 0.38·sin(π·b4/2) like a skirt; phi 0.2 + 0.15·sin²(πf) |
| 4 | all up | all six curl together over 0.5 beat (phi up to 2.0), wiggle rising to 0.35; from beat 3 they flop down over 0.6 beat |

**Battle moves** (blended by mW, eased 5/s):

| Move | Pose |
| --- | --- |
| Rock out | head-bang: body pitch 0.13·max(0, sin ph), body lifted 0.9·sin(pitch) to pay for the base's front edge; tentacles drum, phi 0.2 + 1.1·max(0, sin(π(2mb + k/3)))², twice per beat, staggered round the circle |
| Scissors | front tentacles k4, k5 rise high (phi 1.5) and snip ±(0.45 + 0.35c); k0, k1 spread ±0.25 and k2, k3 ±0.1 at phi 0.12 |
| Paper | all six lift level 0.6 off the ground, no curl, a fluttering ripple; body yaw 0.25·sin(π·mb) |

- When the dance stops, every tentacle's original vertices and normals are restored and frustum culling is turned
  back on.
- **Vignettes:** gesture nod, token a card `#e050b8`, emote `!`.

#### Construction constraints

- Every face part, the gem, the feet, the knobs and every scale is placed by ray on the skin: eyes inset 0.04, mouth
  3 mm out, gem 0.01 out, knobs 0.03 out.
- Tentacles hang from the root, not the body, so the body's sway never drags them into the ground.
- Tentacles bend only upward in their own upright plane; total bend stays below about 2.2 rad, so a tip never curls
  back into the body. While deforming, a tentacle has frustum culling off.
- The scale band leaves the gem window clear.
- The bell's bottom (y ≈ −0.04) and tentacle ridges (≈ −0.05) reach below zero in the model; the ground fit lifts
  him to 6 mm clearance. Front-foot bottoms are at −0.01. The rock-out nod adds its own lift.
- Kept unbaked: the body skin (`keepR`), lids and tentacles (`keep`).

#### Do / Don't

- **Do** keep one smooth blended skin: a wide bell rising into a long forward-leaning neck, teal at the base to blue
  at the head.
- **Do** shingle half-dome scales downward over the bell in four alternating blue-teal tones, larger low down, with a
  clear window for the bevelled green gem in its dark teal ring.
- **Do** keep small golden glossy hooded eyes with one glint each and blue lids, five violet knobs over the crown and
  a closed dark mouth line.
- **Do** keep six ridged purple tentacles at the listed headings and lengths, rounded tips, lying on the ground and
  waving gently; and only two small front feet with three cream claws each.
- **Don't** add an opening mouth, a smile, legs, arms or wings, or make the head large.
- **Don't** point any tentacle straight forward or straight back, let one bend into the ground or the body, or hang
  them from the swaying body group.
- **Don't** cover the gem with scales.

### 3.8 GLYPH

This section specifies GLYPH's model, materials, face and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code). The dance pose table may change only as an animation edit on
  request.
- **Builder and id.** `BORN.glyph` (roster builder `born_glyph`); id `p_glyph`. Def: name colour `#e88a8a`, bodyR 1.1,
  talkR 3.6, `modelScale` 1.11.
- **Scale and height.** `born` height 2.5 × 1.11 = **2.78 m in game**; the horn coils top out near 2.62 units
  (≈ 2.9 m in game). Nose to tail tip ≈ 3.4 units (≈ 3.8 m): he is longer than he is tall.
- **Read.** A crouching, forward-leaning dinosaur glazed like engraved porcelain: a pear-shaped trunk, a big round
  head on a short thick neck, and a long heavy tail sweeping round to his left (+x) along the ground.

#### Silhouette and signature parts

- Signatures: (1) two gold spiral horns coiling back off the crown; (2) a ridge of shingled hexagonal plates down the
  back and tail; (3) two ribbed tubes leaving his lower back and lying in flat spirals on the ground behind him.
- Secondary reads: short arms held up in front, a gold heater shield on his right flank (−x), two glowing purple
  tiles standing proud on the back, one great glowing orange eye on each side of the head.

#### Proportions

| Measurement | Value (model) |
| --- | --- |
| Chest front; trunk half-width; underside low point | z ≈ 0.59; ≈ 0.54; y ≈ 0.30 |
| Head | width 0.72; top y 2.31; snout tip z ≈ 1.17 |
| Eyes | centres ≈ (±0.29, 2.12, 0.54); 0.21 across (≈ 29 % of head width) |
| Horn roots | ≈ (±0.11, 2.29, 0.32) |
| Arms | shoulders (±0.36, 1.38, 0.44); length 0.56, r 0.105 (about a quarter of his height) |
| Legs | hips (±0.38, 0.58, 0.02); length 0.52, r 0.17; feet ≈ 1 cm above the ground |
| Tail | ≈ 2.25 of curve from (0, 0.55, −0.85); tip ≈ 1.08 to his left and 1.35 further back; r 0.34 → 0.07 |

Body skin: `blobBody`, `C` (0, 1.25, 0.12), k 0.20, uvLen 1.2.

| Ellipsoid | Centre | Radii (x, y, z) | Tilt |
| --- | --- | --- | --- |
| Trunk | (0, 1.05, −0.05) | 0.58, 0.72, 0.60 | forward 0.35 |
| Chest / belly | (0, 0.82, 0.16) | 0.50, 0.50, 0.46 | |
| Neck | (0, 1.58, 0.24) | 0.38 sphere | |
| Head | (0, 1.98, 0.40) | 0.36, 0.33, 0.38 | |
| Snout | (0, 1.86, 0.82) | 0.25, 0.20, 0.36 | 0.12 |
| Hips ×2 | (±0.38, 0.62, −0.04) | 0.31, 0.36, 0.40 | |
| Tail root | (0, 0.62, −0.62) | 0.38, 0.34, 0.46 | −0.3 |

#### Anatomy

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Horns ×2 | `ridgedTube`, 9 ridges, depth 0.22: 3 cm down into the skin, up 0.12, then a 1.7-turn spiral in the y–z plane centred 0.22 above and 0.19 behind the root, radius 0.11 shrinking 65 %, drifting 0.06–0.08 outward | blob direction (±0.35, 1, −0.25) | r 0.045 → 0.016 | `#e0b03a` | metal, rep 1, bump 0.01, white specular | 110 |
| Head bumps ×26 | spheres, 5 mm off the skin over the upper and back head; none on the face front (skipped where abs(x) > 0.2, z > 0.5, y < 2.1); seed 7171 | | r 0.022–0.047 | `#4896d4` | porcelain | 55 |
| Brows ×2 | ellipsoid ridges, tipped 0.4 | 0.105 above each eye | 0.13 × 0.04 × 0.09 | `#4896d4` | porcelain | 55 |
| Eyes ×2 | eye stack (see Face) | direction (±0.86, 0.42, 0.42) from the head centre, sunk 0.045 | r 0.105 | `#ff5a14` | emissive | 150 |
| Nostrils ×2 | ellipsoids | snout toward (±0.3, 0.4, 1) | 0.022 × 0.016 × 0.02 | `#1a2a40` | clay | 14 |
| Mouth lines ×2 | tube over 9 points round the snout, from 0.12 rad off the front sweeping 1.15 rad, lifted 3 mm | | r 0.009 → 0.007 | `#1c2c44` | clay | 20 |
| Body | one vertex-coloured skin | see table | | `#4a9ad8` shaded | engraved porcelain | 55 |
| Arms ×2 | `KIT.arm`, hand `"claw3"`, rot (−0.55, 0, −0.08·side), order YXZ, elbow −0.85 | shoulders | shoulder ball r 0.116; upper 0.105 → 0.089, L 0.28; elbow 0.092; forearm 0.089 → 0.074, L 0.28 | `#4896d4` | porcelain | 55 |
| Hand claws | three cones fanned 0.25 | | r 0.037, h 0.19 | `#efe2c0` | clay, white specular | 70 |
| Shield | heater shield (chamfered top corners, bottom point), extruded 0.04, bevel 0.025; painted face 2.6 cm forward | his right flank (−x): direction (−1, −0.38, 0.2), ≈ (−0.54, 1.04, 0.23), 0.07 off the skin, behind the arm's swing | 0.54 × 0.59 | `#e0b03a`; face canvas | metal / canvas (spec `#999999`) | 110 / 90 |
| Shield studs ×5 | spheres flattened to 0.6 depth | 4 corners and the point | r 0.028 | `#3ad0d8` | clay | 150 |
| Back plates | rounded hexagons with a pointed top, squashed to 0.92 tall, extruded 0.18, bevel 0.12; 4 rows of 5/4/5/4; tilt −0.2, twist ±0.05; none below y 0.45 or within 0.52 of the shield | lifted by row: 0.155, 0.115, 0.075, 0.035 from the top row down | size × size × 0.45·size, size 0.235 − 0.01·row | `#2c4a7c` filigree tile | plate canvas, bump 0.02, spec `#666666` | 80 |
| Tail plates | centre plate plus side plates at ±0.75 rad (first 5 stations), centre only (last 2); children of the tail | 7 stations at u = 0.06 + 0.13k; lift 0.03–0.06, centre +0.015 | 0.18 − 0.014k; sides 0.85× | as back plates | | 80 |
| Tiles ×2 | rounded squares (corner 0.07), extruded 0.05, bevel 0.02; scale 0.82 × 0.82 × 0.9, rolled 0.15·side | direction (±0.62, 0.55, −0.7), 0.2 off the skin, clear above the plates | 0.6 wide | `#8a2ab8` canvas, emissive map, emissive `#3a1050` | canvas | 80 |
| Tubes ×2 | `ridgedTube` depth 0.14, 10 sides: out 0.32 along the normal and up 0.05, arcing to 0.35 high, dropping to y 0.118, then a flat 1.6-turn spiral of 6 points shrinking 10 % per point | from direction (±0.45, −0.15, −1), starting 6 cm inside the skin | r 0.085 → 0.07; spiral r 0.45 (orange) / 0.55 (grey); end sphere r 0.07 | orange `#e8782a` from his right (−x), 16 ridges; grey `#6a7280` from his left (+x), 20 ridges | clay | 50 |
| Legs ×2 | `KIT.leg`, thigh 1.2, foot `"claw"` | hips | hip ball r 0.173; thigh puff 0.204 (1, 1.25, 1.15); thigh 0.17 → 0.146; knee 0.153; shin 0.146 → 0.116 | `#4896d4` | porcelain | 55 |
| Feet | pad (0.187 × 0.094 × 0.255); three toes 0.041 → 0.051, L 0.22, splayed 0.3 | | | `#4896d4`; nails `#efe2c0` | porcelain / clay | 55 / 70 |
| Tail | `ao`, 40 × 14, through (0, 0.02, 0.1), (0, −0.12, −0.35), (0.18, −0.3, −0.85), (0.6, −0.38, −1.22), (1.08, −0.4, −1.35) | group (0, 0.55, −0.85) | r 0.34 → 0.07 | `#4896d4` | porcelain | 55 |

#### Palette

| Hex | Use |
| --- | --- |
| `#4a9ad8` | porcelain blue body (vertex colour; tops +0.05 lightness per metre above y 1.2, creases −0.12·fold) |
| `#4896d4` | limbs, tail, lids, brows, bumps |
| `#e8e8e8`, `#a0a0a0`, `#c4c4c4` | engraving ground and inks (tinted by the material) |
| `#e0b03a` | gold horns and shield body |
| `#efe2c0` | ivory claws and nails |
| `#ff5a14` (emissive `#a82808`), `#ffc040` (emissive `#c06010`), `#1a0604`, `#ffffff`, `#24385a` | eye ball, core, pupil, glint, rim |
| `#1a2a40`, `#1c2c44` | nostrils, mouth line |
| `#2c4a7c`; sheen rgba(120,160,210,0.35) → rgba(10,20,50,0.35); `#d8b048` with gem dots `#ffd84a`, `#e83a3a`, `#3ad0c8`; `#48c0c0`; `#5a80b0` | plates: base, radial sheen, gold filigree and gems, teal filigree, border |
| `#f6d870` → `#e4b440` → `#c08a20`; rgba(150,100,20,0.6); `#a87818` | shield face gradient, filigree, inset frame |
| `#5a1010`, `#d0222a`, `#ff8a7a` | shield letter "R": shadow, fill, outline |
| `#3ad0d8` | shield studs |
| `#8a2ab8`, `#c890f0`; `#fff6a0` → `#ffc030` → `#e86a1a` ringed `#7ad8ff`; `#c8202a`; emissive `#3a1050` | tiles: purple and border; coin gradient and ring; trident; glow |
| `#e8782a`, `#6a7280` | orange and grey tubes |

#### Surfaces and materials

- **Engraved porcelain** (bespoke 256 px, seamless): 26 spirals at 2.2 px in `#a0a0a0`, then 18 at 1.4 px in
  `#c4c4c4`, each starting at a 6–20 px radius and shrinking to 15 % over 1.4–2.4 turns in a random direction; repeat
  5 × 5; the same tile is the bump map (0.03). Body: vertex colours, shininess 55, specular `#444444`: glossy glaze.
  Limbs use the same tile in `#4896d4`.
- **Plates:** their own 256 px filigree tile, UV-mapped flat across each plate; spirals with gem dots read as tiny
  inset gems.
- **Gold:** KIT metal at 110. **Shield face:** canvas at 90. **Tiles:** canvas with the same canvas as emissive map
  (self-glowing), 80. **Tubes:** plain clay 50. **Ivory:** clay 70, white specular.
- Smooth shading everywhere; the eyes are emissive, the pupil and glint unlit.

#### Face

- **Eye stack** (each group oriented to the skin normal): a glowing orange ball r 0.105 (shininess 150); a hot core
  0.06 × 0.06 × 0.05 set 0.06 forward; a small dark vertical-oval pupil 0.028 × 0.034 × 0.016 at 0.095; one white glint
  r 0.02 at the upper outer side (−0.035·side, +0.045); a dark navy rim torus R 0.108, tube 0.026; a heavy body-blue
  lid r 0.118 open at −0.45. Standard blink.
- **Brows:** static body-blue ridges. **Mouth:** a closed line along the snout; no jaw; `tk` is unused in his step.
- Expression: calm and hooded, carried by the glow, lids and brows. No smile.

#### Animation

Idle and walk motion is multiplied by `still = 1 − dance weight`.

| State | Channel | Value |
| --- | --- | --- |
| Idle | bob | body y 0.02·sin 1.5t |
| Idle | roll; yaw; nod | 0.02·sin 1.1t; 0.12·sin 0.45t·max(0, sin 0.23t) + shake; −0.025·max(0, sin(0.6t + 1)) |
| Idle | excited shake | every 5.3 s for 0.8 s: 0.07·sin(42·ph)·(1 − ph/0.8); body yaw 1.6×, tail yaw 3× (a twist, never a roll) |
| Idle | tail | yaw 0.12·sin 1.0t |
| Idle | arms | shoulder −0.55 + 0.08·sin(1.6t + 2k); elbow −0.85 |
| Talk | wrapper only | |
| Walk (7 rad/s) | bob; arms; legs | + 0.04·abs(sin 7t); + 0.3·sin(7t + kπ); `KIT.stride` amplitude 0.45, bend 0.7, feet level |
| Planting | dig (2.3, 1) | pitch 0.32·max(0, sin 2.3t); forward 0.08 on the same curve |

**Dance, the macarena** (his own; engine wrapper zeroed): one pose per beat at 104 BPM (88 at the Garden Event), a
16-beat phrase; each pose eases in with a smoothstep over the first 45 % of the beat. Pose format: [shoulder lift,
swing in, out, elbow, hand turn, stretch].

| Pose | Values | Pose | Values |
| --- | --- | --- | --- |
| rest | [−0.55, 0, −0.08, −0.85, 0, 1] | head | [−2.65, 0, 0.45, −1.25, 0, 1.6] (by the head: the arms cannot reach behind it) |
| out | [−1.45, 0.1, 0, −0.15, 0, 1.75] | hipX | [−0.75, 0.55, 0, −0.55, 0, 1.4] |
| up | as out, hand turn π (palm up) | hip | [−0.3, 0, 1.35, −0.5, 0, 1.5] |
| shoulder | [−1.25, 0.75, 0, −1.75, 0, 1.15] | hop | [−1.8, 0, 0.6, −0.4, 0, 1.3] |

| Beats | Right arm (−x) / left arm (+x) |
| --- | --- |
| 1–4 | out/rest, out/out, up/out, up/up |
| 5–8 | shoulder/up, shoulder/shoulder, head/shoulder, head/head |
| 9–12 | hipX/head, hipX/hipX, hip/hipX, hip/hip |
| 13–16 | hip/hip ×3, hop/hop |

- **Stretch:** upper-arm and forearm meshes scale in y; the elbow moves to −0.28·S; the claws keep their size and move
  out.
- **Hip sways (beats 13–15):** body x 0.11·sin, yaw + 0.14·sin. **Beat 16:** a hop of 0.2·sin(πf) and a quarter turn
  to his left (+90° about y), counted only at full dance weight. Idle roll and nod rest while dancing.

**Battle moves** (blended at 5/s, beats counted from the move's start):

| Move | Pose |
| --- | --- |
| Rock out | left arm long along the guitar neck [−1.2, 0, 0.7, −0.2, 0, 1.85]; right arm strums at the belly [−0.95 + 0.25·sin(2·phase), 0.35, 0, −0.95, 0, 1.25]; bounce 0.05·abs(sin); stomps alternate legs each beat (hip −0.3, knee 0.6, foot −0.3 × lift; the foot only rises) |
| Splits | a jump every 2 beats of 0.35·sin(πj); legs spread hip z ±0.55; both arms snip overhead [−2.7, 0, 0.15 to 0.65, −0.1, 0, 1.6] |
| Paper | both arms flat out at stretch 2, out 1.5 ∓ 0.25·sin(π·beat), see-sawing; body yaw + 0.3·sin(π·beat/2) |

- **Vignettes:** gesture giggle, token a tile `#f2c84a`, emote `?`.

#### Construction constraints

- Every part is placed by ray on the skin and oriented with `faceTo`.
- **Plate shingling:** plates lift by row (0.155, 0.115, 0.075, 0.035 from the top row down), so upper plates lie over
  lower ones instead of cutting through them; tail plates lift 0.03–0.06.
- Tiles stand 0.2 out, clear of the plates; the shield stands 0.07 out with a plate-free zone of radius 0.52.
- **Tube coil guard:** coil points lie at y 0.118, so the ridges just clear the grass; each frame the body rises by
  however far its rotation would push any coil point below that height. The shake is a yaw only: a roll would sink
  the tubes.
- Nothing floats: `root.position.y` is 0 except during dance hops.
- The vertex-coloured body is `keepR`; lids are kept for the blink. The arm stretch finds the baked blue mesh on the
  shoulder and elbow groups, so the shoulder ball stretches with the upper arm. The quarter turn counts only at full
  weight, avoiding a ±180° flip. Scratch arrays are reused per frame: dancing makes no garbage.
- Fixed values: tube ground height 0.118, plate lift order, shield clearance.

#### Do / Don't

- **Do** keep the forward crouch, the big round head, the short neck and the long tail on the ground swinging to his
  left.
- **Do** give each side of the head one big glowing orange eye with a navy rim, a small dark pupil, one glint, a
  heavy blue lid and brow.
- **Do** show engraved spiral filigree under a glossy glaze, with darker navy plates carrying gold and teal swirls.
- **Do** coil the gold horns back in a tight spiral; keep the shield's red serif "R" with its dark drop shadow, and
  the purple tiles with glowing coins and a red trident.
- **Do** lay both tubes flat in spirals: orange from his right, grey from his left.
- **Don't** add an opening mouth or a smile, float him, or use flat shading.
- **Don't** roll the body far enough to tip the tubes underground, or put plates under the shield.
- **Don't** make the arms long at rest (they lengthen only while dancing), or change the ivory claws.

### 3.9 KING DINO

This section specifies KING DINO's model, materials, face and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code). His two smile lines are an approved exception to the
  no-smile rule.
- **Builder and id.** `BORN.kingdino` (roster builder `born_kingdino`); id `m_kingdino`. Def: name colour `#e8c020`,
  bodyR 1.1, talkR 4.2; no model scale.
- **Scale and height.** Scale 1. `born` height 3.1 (**3.1 m in game**); plume peak ≈ y 3.1–3.2.
- **Read.** An upright, bottom-heavy lemon gummy dinosaur standing behind his drum kit: a large rounded trunk and
  thighs, a domed head with a forward muzzle, a turquoise crown under a tall feathered plume, short arms holding
  drumsticks.

#### Silhouette and signature parts

- Signatures: (1) the plume, purple up the back of the head and orange down the front on his right (−x); (2) the
  five-prong turquoise crown; (3) the drumsticks, always in hand.
- Secondary reads: square lit buttons down each side, turquoise hip rings and arm joints, a holed back plate.

#### Proportions

| Measurement | Value |
| --- | --- |
| Head with muzzle : trunk height | ≈ 1.2 : 1.7 (≈ 0.7) |
| Trunk width | 1.4; arms only 0.36 of tube |
| Feet | pivots (±0.34, 0.42, 0.06); cylinder r 0.25 top / 0.28 bottom, 0.36 tall (y 0.06–0.42); toe ellipsoid (0.3, 0.15, 0.36) at local (0, −0.28, 0.07), bottom ≈ −0.01 |
| Arms | ball joint r 0.15 on the skin at y 1.3, 0.85 rad off the front, 0.04 out; tube (0, −0.03, 0) → (±0.06, −0.1, 0.36), r 0.1 → 0.105; hand sphere r 0.115 scaled (1, 1.05, 1.1) |
| Crown | base `CY` = head top − 0.1 ≈ 2.35; band r 0.31 at the base flaring to 0.41 at 0.5 height; front prong 0.51 tall, others 0.38 |
| Plume | curve length ≈ 3.9; core half-width up to 0.24, half-thickness up to 0.2 |

Body skin: own ray-cast copy of `blobBody` (89 × 65 rays from (0, 1.55, 0.2), start 2.4 m), k 0.22.

| Ellipsoid | Centre | Radii (x, y, z) | Spans |
| --- | --- | --- | --- |
| Trunk | (0, 1.0, −0.05) | 0.7, 0.85, 0.6 | y 0.15–1.85, 1.4 wide |
| Head | (0, 1.85, 0.18) | 0.58, 0.6, 0.55 | y 1.25–2.45 |
| Muzzle | (0, 1.9, 0.66) | 0.44, 0.31, 0.5 | front at z 1.16 |
| Thighs ×2 | (±0.36, 0.45, 0.06) | 0.36, 0.42, 0.42 | y 0.03–0.87, x to ±0.72 |

#### Anatomy

Every fitting is placed by ray on the skin (`hit`) and oriented to its normal.

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Plume core | tube 110 × 14 along a centripetal Catmull-Rom through (0, 1.5, −0.56), (0, 1.95, −0.6), (0, 2.36, −0.46), (0, 2.7, −0.2), (0, 2.92, 0.16), (−0.3, 2.88, 0.42), (−0.62, 2.56, 0.46), (−0.82, 2.06, 0.42), (−0.88, 1.62, 0.36), (−0.86, 1.26, 0.32) | from the back of the head over the top and down his right front | 0.82 × the feather width and thickness | plume gradient at 55 % brightness | `gradMat("feather")`, rep 3, bump 0.03 | 20 |
| Plume feathers ≈ 700 | 8-vertex leaf blades, a row every 0.05 (≈ 79 rows), 9 per row over 1.3π round the core (−0.15π to 1.15π; the side facing the head bare); lying along the flow away from the peak at s = 0.43; seed 77 | | L 0.17–0.34 (+0.08 at the ends), W 0.05–0.075 | plume gradient; shade 0.55 root → 1.18 tip; jitter ±0.02 in s, brightness 0.88–1.10 | `gradMat("feather")`, rep 1, bump 0.025, double-sided | 25 |
| Crown band | lathed band, wall 0.08, rounded top lip, base at local y −0.04 inside the head | group (0, CY, 0.18), tilted 0.06 forward | r 0.31 → 0.41 | `#1a7cb4` (−0.04), `#2aa8d8` (0.12), `#4cc8e6` (0.5) | `gradMat("skin")`, rep 2, bump 0.02, white specular | 110 |
| Crown prongs ×5 | rounded, height 0.17 + H·(1 − (u/0.84)^3.2)^0.6; tallest (k = 0) at the front | | 0.51 front, 0.38 others | crown gradient | crown | 110 |
| Prong balls; front knob; beads ×5 | spheres | prong tips; 0.085 above the front ball; between prongs at local y 0.2 | r 0.078 front / 0.058 others; 0.036; 0.024 | `#2cb2dc` | skin, rep 2, bump 0.02, white specular | 110 |
| Eyes ×2 | navy bead (see Face) | ray from (0, 1.98, 0.55) toward (±0.95, 0, 0.62), sunk 0.03 | r 0.082 | `#0c1838` | clay, white specular | 160 |
| Smile lines ×2 | tube over 9 points, 0.42–1.2 rad off the front, y = 1.72 + 0.07·u³ (curling up at the outer ends), 0.004 proud; a gap at the front centre | lower muzzle | r 0.008 → 0.01 | `#9a5a16` | clay | 20 |
| Buttons ×6 | rounded squares (half-size 0.06, corner 0.028, depth 0.035, bevel 0.022/0.02) | three per side at y 2.0, 1.7, 1.4 by side rays from (0, y, −0.12), sunk 0.02 | | `#2cb2dc` | turquoise | 110 |
| Button lights | unlit disc (sphere 0.022 × 0.022 × 0.008) at z 0.06 in a ring (0.034 × 0.034 × 0.008) at z 0.056 | on each button | | `#b8ff4a`; ring `#3a9a20` | basic; clay | unlit; 60 |
| Arm joints ×2 | ball + forward-out hole (cylinder r 0.045, depth 0.04) with rim torus | hole 0.135 from the ball centre | r 0.15; rim 0.05/0.014 | `#2cb2dc`; hole `#0a2a44`; rim `#2398c8` | turquoise; clay 30; dark turquoise | 110 / 30 / 100 |
| Arms, hands | `ao` tube + sphere | see Proportions | | `#f6d424` | peel: skin, rep 3, bump 0.04, spec `#444444` | 50 |
| Drumsticks ×2 | shaft cylinder + tip bead (stretched 1.3 y) | hand + (0, 0.02, 0.04), rot (1.75, 0, ±0.25): ahead, a little down, toed in | r 0.014 → 0.019, L 0.5; bead r 0.022 | `#e2c08a`; tip `#f0dcb4` | clay | 40 |
| Hip rings ×2 | torus | y 0.55, 1.05 rad off the front, 0.02 out, facing the normal | R 0.165, tube 0.068 | `#2cb2dc` | turquoise | 110 |
| Back plate | pillowy superellipse patch (power 6) over ±0.95 rad round the back, y 0.5–1.22; puffed 0.035 + 0.07·√(1 − r⁸); beyond r 1 the edge falls 0.6·(r − 1) into the skin | lower back | | `#2398c8` | dark turquoise, skin rep 2, white specular | 100 |
| Plate holes ×5 | cylinders with rim tori | (±0.6, ±0.45) and (0, 0) on the patch | r 0.045, depth 0.06; rim 0.05/0.013 | `#0a2a44`; rim `#2cb2dc` | clay; turquoise | 30 / 110 |
| Feet ×2 | cylinder + toe ellipsoid | see Proportions | | `#efb81c` | peel | 50 |

#### Palette

| Hex | Use |
| --- | --- |
| `#f9dc22` | lemon skin (main); ±4 % mottling |
| `#eeb41a` | gold low down: lerp by 0.75·low, low = clamp((0.75 − y)/0.6); fully gold by y 0.15 |
| `#dc8e16` | creases, lerp by 0.6·fold |
| `#f6d424`, `#efb81c`, `#f2c41e`, `#f6d222` | peel: arms, feet, eye rims, lids |
| `#2cb2dc`, `#2398c8` | turquoise fittings; dark turquoise back plate and joint-hole rims |
| `#0a2a44` | holes |
| `#b8ff4a`, `#3a9a20` | button lights, their rings |
| `#1a7cb4` → `#2aa8d8` → `#4cc8e6` | crown gradient |
| `#4a1890` (s 0), `#6c20bc` (0.16), `#9228d6` (0.36), `#b02ac4` (0.47), `#e0386e` (0.54), `#ff6a26` (0.62), `#ff8e2a` (0.82), `#ffb64e` (1) | plume gradient along the curve, back to front |
| `#0c1838`, `#ffffff` | eyes, glint |
| `#9a5a16` | smile lines |
| `#e2c08a`, `#f0dcb4` | drumsticks, tips |

#### Surfaces and materials

| Part | Surface | rep | bump | Shininess | Specular |
| --- | --- | --- | --- | --- | --- |
| Skin | `gradMat("skin")` | 5 | 0.045 | 50 | `#444444` |
| Peel parts | `KIT.surf("skin")` | 3 | 0.04 | 50 | `#444444` |
| Turquoise | skin | 2 | 0.02 | 110 | white |
| Dark turquoise | skin | 2 | 0.02 | 100 | white |
| Crown | `gradMat("skin")` | 2 | 0.02 | 110 | white |
| Plume core | `gradMat("feather")` | 3 | 0.03 | 20 | |
| Plume feathers | `gradMat("feather")` | 1 | 0.025 | 25 | |

- Glossy-gummy citrus-peel skin; very glossy turquoise (the glossiest material on him); satin-matte feathers. Skin uvs
  follow arc length down each meridian, so the mottling never pinches. Unlit: button lights and eye glints.

#### Face

- **Eyes:** glossy navy beads (r 0.082, shininess 160) with one white glint r 0.022 at (∓0.026, 0.032, 0.074) and a
  yellow rim torus (0.084/0.016, `#f2c41e`).
- **Lids:** upper half-sphere r 0.09 in `#f6d222`, open at −0.4; standard blink.
- **Mouth:** two thin brown smile lines on the lower muzzle, curling up at their ends; no jaw, no brows.
- Expression: calm and content, never changing. Talking is the shared wrapper only; `step` ignores `tk`.

#### Animation

| State | Channel | Value |
| --- | --- | --- |
| Idle | body sway | rz 0.03·sin 1.4t |
| Idle | plume | rx 0.025·sin 1.7t; rz 0.03·sin(1.3t + 1) |
| Idle (not playing) | arms | rx 0.12·sin(2t + k) |
| Walk (kept for completeness; he stays at his post) | body; lift; arms; feet | rz + 0.06·sin 8t; y 0.075·abs(sin 8t); 0.35·sin(8t + kπ); feet rx 0.35·sin(8t + kπ) |
| Drumming | play weight | `playK` eases toward 1 at 5/s while `DRUMS.on` and not walking |
| Drumming | strokes | each new stroke count sets that arm's `hitK` to 1, decaying at 7/s (≈ 0.14 s) |
| Drumming | arms | rx 0.05 + 0.55·hitK: a snap down onto the drum, then a ride back up |
| Drumming | body | nod rx 0.05·hitK on strokes of his left arm (+x) only; turn ry 0.06·sin 1.9t |

- **Hand map** (by axis; the code's counters are named from the kit's side): his left arm (+x, counter `DRUMS.r`) plays
  the ride, the ride bell, the crash and the floor tom; his right arm (−x, `DRUMS.l`) plays the snare, the brush and
  the rack toms. The kick and hi-hat have no arm motion.
- **When he plays:** whenever the player is within 45 m of the kit, or a Dance battle or victory dance is on; he rests
  while FORTIZMO's horn is raised or sounding; talking and Blossoms do not stop him. His music is a 104 BPM jazz track.
- **Planting and dance:** none; he stays at his drums.
- **Vignettes:** fixed: he never turns or gestures (his sticks would sweep through the kit). Token a crown `#ffc81e`,
  emote `★`.

#### Construction constraints

- One ray-cast skin; every fitting placed by ray: eyes sunk 0.03, buttons sunk 0.02, rings 0.02 out, smile 0.004
  proud, back-plate edges tucked into the skin by the 0.6·(r − 1) fall-off.
- The crown's inner wall and its base at −0.04 sit inside the head, so no seam shows; the base radius 0.31 matches the
  head's cross-section 0.1 below its top.
- The walk lift (0.075) exceeds the foot-swing dip, so the feet never sink.
- Skin, crown and plume keep their vertex colours (`keepR`); the plume uses a fixed seed (77).

#### Do / Don't

- **Do** keep one smooth blended gummy body, lemon above and gold below, with darker creases.
- **Do** keep the five-prong turquoise crown with the front prong tallest and knobbed, and the plume running purple up
  the back, through magenta at the peak, to orange down the front on his right.
- **Do** keep three square lit buttons per side, hip rings, a holed back plate, short arms from holed ball joints and
  a drumstick in each hand.
- **Do** keep navy bead eyes with one glint, a yellow rim and a lid.
- **Don't** give him a jaw, brows, claws or long arms, or split the body into visibly separate parts.
- **Don't** turn him or add gestures at the kit.
- **Don't** make the turquoise matte.


### 3.10 FORTIZMO

This section specifies FORTIZMO's model, materials, face and motion as built by her packaged builder.

#### Overview

- **Lock.** Locked (the builder is marked final in code).
- **Builder and id.** Id `frog`; builder `__R["fortizmo"]` (packaged, exposed as `pk_fortizmo`), wrapped by
  `fortizmoPick`. Def: colour `#e8742a`, `bodyR` 0.95, `talkR` 4.2, `modelScale` 0.78.
- **Height.** Declared 3.75 model units × 0.78 = **2.93 m in game**. Head top 3.24 units (2.53 m); ear tips about
  3.9 units (3.05 m).
- **Bespoke build.** Her own `anim`; she does not use `born()`, `KIT.surf`, `KIT.compact` or the blinker (see 3.1).
  All parts stay separate meshes.
- **Shared layers.** The talk wrapper and ground fit apply (see 3.1).
- All lengths below are model units; multiply by 0.78 for metres in game.

#### Silhouette and signature parts

- A bottom-heavy furry egg on two small sprung wheels, a round head joined to it by a short fur neck, two tall narrow
  upright ears splayed slightly outward, and a short trumpet-mouthed trunk set off-centre on the face.
- Her horn is part of her body: it is her trunk, her mouth. Raised, the trunk becomes a long horn with a wide bell (about 0.9 across, 0.7 m in game).
- Signature parts, in order of read: (1) the trunk-horn and its bell; (2) the tall ears; (3) the two wheels.
- Secondary read at mid range: a cream belly oval crossed by studded seams, like a stitched plush toy.

#### Proportions

| Part | Centre or pivot | Extent | Note |
| --- | --- | --- | --- |
| Body | (0, 1.45, 0) | unit sphere × (0.8, 0.9, 0.72), lower half widened × (1 + 0.12·max(0, −y)); y 0.55–2.35; about 1.6 wide, 1.44 deep, 1.8 tall | bottom-heavy egg |
| Head | (0, 2.78, 0.02) | sphere r 0.5 × (1, 0.92, 0.95): 1.0 wide, 0.92 tall | head bottom 2.32 meets the body top 2.35 |
| Neck | (0, 2.33, 0.02) | sphere r 0.5 × (0.84, 0.62, 0.78): 0.84 wide, 0.62 tall | fills the junction so no gap shows between head and body |
| Ears | pivots head-local (±0.2, 0.36, −0.06) | ellipsoid (0.16, 0.42, 0.07) centred 0.38 above the pivot: each about 0.8 tall, 0.32 wide | add about 85 % of the head's height |
| Trunk (rest) | head-local (0.06, −0.17, 0.34) | lathe 0.735 long; base r 0.26, waist 0.17 at 0.42, lip 0.255 at 0.71 | short trumpet |
| Horn (raised) | same root | 2.03 long; waist r 0.135 at 1.3; bell r 0.45 at the lip | about 2.8 × the trunk |
| Arms | shoulders (±0.66, 1.78, 0.02), inside the body surface | upper arm (0.36, 0.17, 0.19) centred 0.3 out; hand 0.66 out | short |
| Wheels | axles (±0.3, 0.225, 0) | tyre outer radius 0.226: touches y ≈ 0 | two, side by side |

Ratio: head width : body width = 1.0 : 1.6.

#### Anatomy

Positions are model units in the parent named. "Fur" is her bespoke fur tile (see Surfaces).

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Ears ×2 | ellipsoid, vertex jitter 0.012; rotation (−0.12, 0, 0.22 outward) | head-local pivot (±0.2, 0.36, −0.06), centre +0.38 up | radii (0.16, 0.42, 0.07) | `#e8742a` | fur | 6 |
| Ear linings ×2 | ellipsoid | pivot-local (0, 0.38, 0.05) | radii (0.1, 0.33, 0.04) | `#f29a5c` | Phong | 8 |
| Head | sphere, jitter 0.025 | (0, 2.78, 0.02) | r 0.5 × (1, 0.92, 0.95) | `#e8742a` | fur | 6 |
| Neck | sphere, jitter 0.02, on the model root | (0, 2.33, 0.02) | r 0.5 × (0.84, 0.62, 0.78) | `#e8742a` | fur | 6 |
| Eyes ×2 | sphere on the head front | face plane (±0.15, 0.2) | r 0.044 | `#0a0a0c` | Phong, specular white | 140 |
| Face dots ×4 | sphere, 0.005 proud | brow (−0.05, 0.36), (0.1, 0.34); cheeks (0.34, 0.06) and (−0.32, 0.1) | r 0.02; the left-cheek (+x) dot r 0.022 | `#0a0a0c` | unlit | — |
| Trunk | open lathe, double-sided; rotation order YXZ (π/2 − 0.14, 0.32, 0) | head-local (0.06, −0.17, 0.34) | 0.735 long (see profile) | `#e8742a` | fur | 6 |
| Throat | open lathe, double-sided | inside the trunk, lengths 0.66 → 0.45 | r 0.166 → 0.13 | `#1a0e0a` | Lambert | — |
| Throat plug | disc | length 0.46 (horn: 0.46 + 1.1·s) | r 0.132 (horn: × (1 − 0.15·s)) | `#0e0806` | unlit | — |
| Tuning loop | torus, turned π/2 about y | trunk-local (0.24, 1.42, 0) | R 0.16, tube 0.05 | `#e8742a` | fur | 6 |
| Valves ×3 | stem cylinder + cap | lengths 0.86, 0.99, 1.12; z −0.13 | stem r 0.035 × 0.16; cap r 0.055 × 0.03 | `#f0c040` | Phong, specular white | 140 |
| Body | sphere, widened below, jitter 0.03 | (0, 1.45, 0) | (0.8, 0.9, 0.72) | `#e8742a` | fur | 6 |
| Belly patch | disc mapped onto the body front, 0.022 proud | centred body y −0.06 | half-width 0.52, half-height 0.66 | `#efe6d2` | cream fur | 6 |
| Zigzag seam | tube through (x, y) (0.02, 0.74) (0.1, 0.6) (−0.2, 0.44) (0.2, 0.28) (−0.24, 0.12) (0.24, −0.04) (−0.26, −0.2) (0.22, −0.36) (−0.2, −0.52) (−0.04, −0.66) | body front, 0.045 proud | tube r 0.038 | `#cbbf9f` | Phong, vertex colour | 12 |
| Arc seam | tube x −0.86 → 0.86 at y −0.12 + 0.1·sin(πu); end points at z 0.4 | body front, 0.05 proud | tube r 0.038 | `#cbbf9f` | Phong, vertex colour | 12 |
| Studs ×20 | 5-sided cone along the surface normal | 8 on the inner zigzag vertices, 12 on alternate arc points; 0.08 proud | r 0.032, h 0.09 | `#1c1c22` | Phong, specular `#888888` | 90 |
| Upper arms ×2 | ellipsoid, jitter 0.02; rest `rz` 0.42 out and down | shoulder pivots | (0.36, 0.17, 0.19), centre 0.3 out | `#e8742a` | fur | 6 |
| Hands ×2 | palm ellipsoid + three finger beads (pointing out) + thumb bead (up and forward); jitter 0.015 | 0.66 out | palm (0.13, 0.12, 0.13); fingers r 0.055 at heights −0.08, −0.01, 0.06; thumb r 0.05 | `#e8742a` | fur | 6 |
| Forearms + elbows ×2 | ellipsoid + ball, hidden at rest | shown only while `s` > 0.03 | 0.5 × 0.15 × 0.165; elbow r 0.17 | `#e8742a` | fur | 6 |
| Struts ×2 | box, plugged into the body bottom | (±0.3, 0.5, 0) | 0.15 × 0.26 × 0.13 | `#4a4d56` | Phong, specular `#666666` | 60 |
| Strut bands ×2 per leg | box | y 0.43 and 0.57 | 0.1 × 0.03 × 0.14; 0.11 × 0.03 × 0.14 | `#b8bec8` | Phong, specular white | 120 |
| Shafts ×2 | cylinder | y 0.33 | r 0.032, 0.2 long | `#b8bec8` | Phong, specular white | 120 |
| Coil springs ×2 | helix, 6 turns | y 0.26–0.40 | coil r 0.05, wire 0.009 | `#b8bec8` | Phong, specular white | 120 |
| Fork plates ×2 per wheel | box | wheel-local x ±0.075, y 0.25 | 0.02 × 0.12 × 0.06 | `#4a4d56` | Phong | 60 |
| Tyres ×2 | torus | axle y 0.225 | R 0.17, tube 0.056 | `#1c1c20` | Phong | 20 |
| Hubs ×2 | disc | axle | r 0.125, 0.05 wide | `#b8bec8` | Phong, specular white | 120 |
| Spokes ×10 per wheel | box | radial | 0.012 × 0.24 × 0.012 | `#4a4d56` | Phong | 60 |
| Axle caps ×2 | cylinder | axle | r 0.035, 0.08 long | `#b8bec8` | Phong, specular white | 120 |

- **Trunk placement.** It points forward about 8° above horizontal, set 0.06 to her left (+x) and yawed 0.32 rad
  toward her left (+x): off-centre by design.
- **Trunk profile** (radius, length): (0.26, 0) (0.2, 0.2) (0.17, 0.42) (0.18, 0.55) (0.23, 0.66) (0.255, 0.71)
  (0.24, 0.735) (0.2, 0.73) (0.165, 0.66): a short trumpet with a rolled lip and a hollow mouth.
- **Horn profile** (the same lathe morphed vertex by vertex): (0.26, 0) (0.2, 0.2) (0.15, 0.6) (0.135, 1.3)
  (0.24, 1.75) (0.42, 1.98) (0.45, 2.03) (0.39, 2.01) (0.31, 1.92). The throat morphs to (0.31, 1.92) (0.21, 1.76)
  (0.115, 1.56). The horn body stays orange fur, with a fur tuning loop; only its three valves are gold (`#f0c040`).
  The chrome (`#b8bec8`) is on her wheel legs, never on the horn.
- **Horn fittings** (the fur tuning loop and the gold valves) show only while `s` > 0.25 and scale in over (s −
  0.25)/0.6.

#### Palette

| Hex | Use |
| --- | --- |
| `#e8742a` | Main orange fur: body, head, ears, trunk and horn, arms, tuning loop; name colour |
| `#ffa860` / `#b85418` | Light / dark fur strokes on the orange tile |
| `#efe6d2` | Cream belly patch |
| `#ffffff` / `#c8bca0` | Light / dark strokes on the cream tile |
| `#f29a5c` | Ear linings (peach) |
| `#cbbf9f` | Seams |
| `#1c1c22` | Studs |
| `#0a0a0c` | Eyes and face dots |
| `#1a0e0a` / `#0e0806` | Trunk throat / throat plug |
| `#f0c040` | Horn valves (gold) |
| `#b8bec8` | Chrome: strut bands, shafts, springs, hubs, axle caps |
| `#4a4d56` | Struts, fork plates, spokes |
| `#1c1c20` | Tyres |

No gradients: colour variation comes only from the two-tone fur strokes.

#### Surfaces and materials

- **Fur tile (bespoke, not KIT).** 256 × 256 px filled with the base colour; 2800 short strokes, mostly vertical
  (π/2 ± 0.7 rad), 4–11 px long, 1–2.4 px wide, alpha 0.35–0.75, 55 % in the light colour and the rest dark. Seeds 7
  (orange) and 13 (cream). Repeat 3 × 3. The tile is both map and bump map (bump 0.04); Phong shininess 6, specular
  `#111111`: very matte.
- **Vertex jitter.** Sculpted parts are roughened by a hash-noise push along the normal, for a lumpy hand-sewn look:
  body 0.03, head 0.025, arms 0.02, hands 0.015, ears 0.012.
- **Shininess.** Valves 140 and chrome 120 (glossy metal); eyes 140; studs 90; struts 60; tyres 20; everything else
  matte (6–12).
- **Unlit:** the four face dots and the throat plug. No emissive parts.

#### Face

- **Eyes:** two small glossy black beads (r 0.044, `#0a0a0c`, shininess 140, white specular) with no painted glint;
  the specular highlight stands in for it. This is an approved exception to the one-glint rule.
- **Face dots:** four tiny unlit dots, two on the brow and one on each cheek, deliberately asymmetric.
- **Absent:** lids, blinks, brows and mouth.
- **Expression** is carried by head tilt, trunk lift and ear flaps.
- **Talking:** `onTalk` starts a 1.1 s timer; the trunk lifts by up to 0.55 rad as 0.55·sin(π·t/1.1) and she toots
  (`G.toot`: three sawtooth notes, 196 Hz for 0.2 s, 294 Hz for 0.24 s at +0.14 s, 392 Hz for 0.3 s at +0.3 s). The
  shared talk wrapper adds its syllable nod, stretch and lift (see 3.1).

#### Animation

`he` is a random phase in 0–10 per instance. Rates in rad/s.

| Motion | Formula | Note |
| --- | --- | --- |
| Breathing | body scale (r, 1/r, r), r = 1 + 0.015·sin(1.7t + he) | volume kept |
| Head | rx 0.04·sin(0.9t + he); ry 0.12·sin(0.6t + he) | slow look |
| Trunk idle | rx (π/2 − 0.14) − 0.05·sin(1.3t + he) | |
| Ears | rz ±(0.22 + 0.06·sin(2.1t + he + i)) | outward splay breathes |
| Arms idle | rz ±(0.42 + 0.05·sin(1.4t + he)) | |
| Rolling (`moving`) | root rx 0.06 lean, y 0.012·sin 14t judder; arms ±(0.6 + 0.1·sin(6t + iπ)) | wheels turn by distance / 0.225 each frame (skipped for jumps ≥ 1 unit) |

- **Walking** is rolling: she has no legs and patrols behind the Juice Bar counter on her wheels.
- **Raising the horn.** `hornK` runs linearly over 1.4 s toward `hornWant` and is eased in-out to give `s`. The
  trunk lifts a further 0.2·s rad (the horn ends about 20° up). The arms blend (slerp by `s`) from rest into reach
  poses: her right arm (−x) to elbow target (−0.98, 1.98, 0.72) with the hand steadying the horn near its base at
  trunk-local (−0.06, 0.55 + 0.25·s, 0.29); her left arm (+x) to elbow target (1.16, 2.42, 0.62) with the hand at
  the valves, trunk-local (0.02, 0.5 + 0.5·s, −0.42). Forearms and elbows show once `s` > 0.03. The tune starts only
  once `hornK` ≥ 0.999.
- **Playing** (`hornPlaying`), on her 88 BPM beat (1.4667 Hz, `Ft = 88t/60`):
  - the horn swells in x and z by × (1 + 0.04·max(0, sin(2π·1.4667t)));
  - the valves press down up to 0.025, each 2.1 rad behind the previous one;
  - the hands rock rx 0.25·sin(2π·1.4667t ± 1);
  - the ears flap out an extra 0.28·abs(sin(π·beat))² on every beat.
- **Lowering:** the same morph in reverse over 1.4 s.
- **Planting and dancing:** none. At the Garden Event she rolls slowly to the garden's edge and plays the horn for the
  others' dances (without Seeds she does not play).
- **Vignettes:** gesture "groove" (rz 0.14·sin(4πu), y 0.08·abs(sin(4πu))), token a note `#ff8a3a`, emote ♪.
- **Gathering greeting:** emote ♪ with a toot.

#### Construction constraints

- **Layering against z-fighting:** belly patch 0.022 proud; seams 0.045 and 0.05 proud (tube r 0.038); studs 0.08
  proud, rising through the seam tube; face dots 0.005 proud.
- The trunk and throat are open lathes with double-sided materials. The dark plug travels with the morph so the
  mouth always reads dark and nothing shows through.
- The valves appear only past `s` > 0.25, so they never float on the short trunk.
- The struts are sunk into the body bottom (they reach y 0.63; the body bottom is 0.55). The tyre radius (0.226)
  matches the roll divisor (0.225), so the wheels roll without slipping.
- `fortizmoPick`: the geometry is sculpted after its bounds are computed and the horn morphs at runtime, so the
  wrapper recomputes every bounding sphere and enlarges it × 1.3; a tap anywhere on her body picks her.

#### Do / Don't

- **Do** keep a bottom-heavy furry egg body with no neck, a round head, two tall narrow upright ears with peach
  linings, and two small sprung wheels with chrome fittings.
- **Do** keep the trunk short, trumpet-mouthed, fur-covered and off-centre to her left (+x). Raised, it is a long
  furry horn with a wide bell, three gold valves and a fur tuning loop.
- **Do** keep the cream belly oval with a zigzag seam and a horizontal seam studded with black cones.
- **Do** keep tiny glossy black bead eyes and four small asymmetric face dots.
- **Do** keep the fur very matte, with visible two-tone vertical strokes and slight lumpiness.
- **Don't** make the horn body brass or metal or put chrome on it: it is orange fur with a fur tuning loop, and only
  the three valves are gold (`#f0c040`); chrome (`#b8bec8`) belongs to the wheel legs.
- **Don't** give her broad or floppy ears, feet, a mouth, lids or painted eye glints.
- **Don't** centre the trunk.

### 3.11 SOMLET

This section specifies SOMLET's model, materials, face and motion, including her lying pose.

#### Overview

- **Lock.** Locked (the builder is marked final in code), including the mail cap and the sleeping face.
- **Builder and id.** Id `m_somlet`; builder `born_somlet` (`BORN.somlet`), returned through `born()` (see 3.1). Def:
  colour `#ecd8b6`, `bodyR` 1; no `modelScale` (1 unit = 1 m).
- **Height.** Nominal 3.0 m (name tag and talk UI). Geometry: the float centre sits at y 1.35 ± 0.1; the body spans
  world y 0.59–2.11 at rest; the cap top is at about 2.47 m; the Zs rise to about 3.1 m (plus sprite size up to 0.52).
- **Shared layers.** Talk wrapper (see 3.1). Not applied: the
  blinker (her eyes are closed lids). Her ground clearance is her own (see Construction constraints).
- Positions below are relative to the float centre unless marked "world".

#### Silhouette and signature parts

- A floating rounded box (between a sphere and a cube) with a peaked cap on top and a fringe of thin roots splaying
  beneath, with air between the body and the ground.
- Signature parts: (1) the squared-off cotton body; (2) the mail carrier's peaked cap with its black visor; (3) the
  plum root tentacles. The drifting Zs beside the cap are a secondary read.
- Lying at home she reads as the same box tipped 90° onto her right side, the cap pointing to her right (−x).

#### Proportions

| Part | Centre | Extent | Note |
| --- | --- | --- | --- |
| Body | float centre (world y 1.35) | superellipsoid, exponent 3.2; half-extents 0.82 / 0.76 / 0.72: 1.64 wide, 1.52 tall, 1.44 deep | world y 0.59–2.11 |
| Cap | body y +0.70, tipped back 0.08 rad | band r 0.50 → 0.48; crown r 0.60; about 0.455 tall | 30 % of body height; crown 1.2 wide against a 1.64 body |
| Eyes | (±0.28, 0.05, 0.65) | lids 0.36 wide, 0.28 tall, 0.198 deep; 0.56 apart | just above mid-height |
| Mouth | (0, −0.26, 0.70) | 0.15 wide | |
| Hands | (±0.95, −0.18, 0.12) | main puff r 0.14 | inner edge meets the body side at x ≈ 0.81 |
| Tentacles ×7 | ellipse r 0.32 (x) × 0.28 (z) at body y −0.68 | about 0.82 long hanging straight | rooted 8 cm inside the underside (−0.76); always splayed |

#### Anatomy

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Cap band | cylinder | cap y 0.07 | r 0.50 → 0.48, h 0.22 | `#1e2440` | clay | 30 |
| Flared crown | cylinder | cap y 0.27 | r 0.60 top → 0.50 bottom, h 0.20 | `#2a3a6a` | felt (rep 2, bump 0.02) | 15 |
| Crown top | disc, polygon offset | cap y 0.39 | r 0.60, h 0.05 | `#2a3a6a` | felt | 15 |
| Upper piping | torus, polygon offset | cap y 0.37 | R 0.60, tube 0.018 | `#f6f4ee` | clay | 14 |
| Lower piping | torus, polygon offset | cap y 0.17 | R 0.495, tube 0.015 | `#f6f4ee` | clay | 14 |
| Visor | solid half-disc (front half of a cylinder), tilted down at the front 0.38 rad, depth × 0.75 | cap z 0.42 | r 0.5, 0.03 thick | `#141418` | clay, specular `#888888` | 90 |
| Visor edge | box | cap z 0.48 | 0.62 × 0.035 × 0.03 | `#141418` | clay | 90 |
| Badge body | box (gold envelope) | group at cap (0, 0.24, 0.53), leaning back 0.25 rad | 0.20 × 0.13 × 0.024 | `#e8b830` | clay, specular white | 90 |
| Badge flap | downward triangle (±0.10, 0.065) to (0, −0.012), extruded 0.008, polygon offset | badge z 0.012 | | `#e8b830` | clay, specular white | 90 |
| Flap edges ×2 | box, rotated ±0.66 | badge | 0.112 × 0.007 × 0.006 | `#c8962a` | clay, specular white | 70 |
| Bottom folds ×2 | box, rotated ∓0.5 | badge | 0.10 × 0.007 × 0.004 | `#c8962a` | clay, specular white | 70 |
| Body | rounded cube (superellipsoid 3.2) | centre | 1.64 × 1.52 × 1.44 | `#f2e4b4` | felt (rep 2, bump 0.025) | 12 |
| Cotton puffs ×16 | sphere (seed 11) | (0.74·cos a, y, 0.66·sin a − 0.05), a 1.1π–1.9π, y −0.05 to +0.40: sides and back only | r 0.13–0.20 | `#f2e4b4`; every third `#ead6a0` | felt | 12 |
| Swirls ×2 | flat Archimedean spiral tube, 25 points, 0.5 rad per step (about 1.9 turns) | side faces x ±0.83, centred y −0.05 | spiral r 0.02 → 0.164; tube r 0.012 | `#ead6a0` | felt | 12 |
| Closed eyes | see Face | (±0.28, 0.05, 0.65) | lid r 0.18 × (1, 0.78, 0.55) | `#e2cc94` | felt (rep 1, bump 0.015) | 18 |
| Brows ×2 | tapered tube through (−0.15·sx, 0.14, 0.055), (0, 0.165, 0.07), (0.16·sx, 0.125, 0.05) | eye-local | r 0.026 → 0.016 | `#ead6a0` | felt | 12 |
| Mouth inside | ellipsoid | (0, −0.26, 0.70) | 0.075 × 0.02 × 0.02 | `#4a2030` | clay | 20 |
| Mouth lip | torus scaled (0.077, 0.024, 0.03) | mouth group | | `#e2cc94` | felt | 18 |
| Hands ×2 | three spheres, no arm | groups (±0.95, −0.18, 0.12); spheres at centre, (0.06·sx, 0.12, 0.02), (0.03·sx, −0.11, 0.05) | r 0.14, 0.10, 0.10 | `#f2e4b4` | felt | 12 |
| Tentacles ×7 | tapered tube through (0, 0, 0), (0.06·cos a, −0.30, 0.06·sin a), (0.02, −0.60, 0), (0.12·cos(a + 1), −0.82, 0.10·sin(a + 1)); a = k/7 · 2π | ellipse at body y −0.68 | r 0.07 → 0.015 | `#b04870` | skin (rep 1, bump 0.02) | 30 |
| Tentacle twigs ×7 | tapered tube (0.02, −0.55, 0) → (0.12·cos(a − 1), −0.68, 0.12·sin(a − 1)) | on each tentacle | r 0.025 → 0.008 | `#b04870` | skin | 30 |
| Zs ×3 | sprites sharing one 128 px canvas: bold 104 px serif "Z", stroked 12 px | beside the cap on her left (+x) | 0.22 → 0.52 | fill `#eae6ff`, outline `#3a3468` | canvas, transparent, no depth write | unlit |

No letter is modelled: the letter under her cap exists only in dialogue.

#### Palette

| Hex | Use |
| --- | --- |
| `#f2e4b4` | Main body cream, most puffs, hands |
| `#ead6a0` | Every third puff, swirls, brows, under-eye puffs |
| `#e2cc94` | Closed lids, mouth lip |
| `#c8b07a` | Fold line above each lid |
| `#3a2a30` | Lash lines and lashes |
| `#4a2030` | Mouth interior |
| `#fbf7ee` | Open-eye white and catchlight |
| `#4a3c7a` | Iris (deep violet) |
| `#141018` | Pupil |
| `#b04870` | Root tentacles (plum) |
| `#2a3a6a` / `#1e2440` | Cap crown (navy felt) / cap band (darker navy) |
| `#f6f4ee` | Cap piping |
| `#141418` | Visor and visor edge |
| `#e8b830` / `#c8962a` | Envelope badge / badge fold lines |
| `#eae6ff` / `#3a3468` | Z fill / Z outline |
| `#ecd8b6` | Name and talk colour (interface only) |

No vertex-colour gradients; the only two-tone effect is the alternation of the two puff creams.

#### Surfaces and materials

- **Felt** (matte): body, puffs, hands, swirls and brows (shine 12), lids (rep 1, bump 0.015, shine 18), cap crown
  (shine 15).
- **Skin** (satin, shine 30): the tentacles.
- **Clay:** band 30; piping 14; visor 90 with specular `#888888` (glossy black); badge 90 with white specular;
  fold lines 70; lashes 30 and folds 10; open eye white 60, iris 70, pupil 90.
- **Bespoke canvas:** the Z sprite only (unlit, fading in opacity). No emissive parts.

#### Face

- **Closed eyes** (default, nearly permanent). Each eye group sits at (±0.28, 0.05, 0.65), turned 0.2 rad outward.
  - Lid: ellipsoid r 0.18 × (1, 0.78, 0.55) in `#e2cc94`.
  - Lash line: tube r 0.011 lying 0.004 on the lid across u −0.86 to 0.86 at y = −0.012 − 0.03·(1 − u²): lowest at
    the centre, a downward-curving sleeping line, `#3a2a30`.
  - Lashes: four cones (r 0.007, h 0.04) at u −0.5, −0.2, 0.1, 0.4, mirrored per side, pointing down and forward and
    splayed by 0.35·u.
  - Fold: a fine tube (r 0.007) at y 0.055 − 0.012·u², arched upward, `#c8b07a`.
  - Under-eye puff: ellipsoid 0.13 × 0.05 × 0.06 at (0.01·sx, −0.115, −0.02), `#ead6a0`.
- **Brows:** higher at the inner end, sloping down to the outside: relaxed.
- **Mouth:** a small dark oval with a felt lip, slightly open; scale.y = 1 + 0.5·sin 1.6t + 1.2·tkS (0.5× to 1.5× at
  rest, wider while talking).
- **Open eyes**, only for her Blossom thanks (Blossom flag set, dialogue open, she is the target):
  - white ellipsoid 0.145 × 0.12 × 0.075; iris 0.07 × 0.075 × 0.045, 1 cm low; pupil 0.036 × 0.04 × 0.03;
  - catchlight sphere r 0.013 at (+0.022, +0.018, 0.112) in each eye, not mirrored;
  - open weight eases toward 1 at 5/s and back at 7/s; the open eye unrolls vertically from 2 % scale;
  - lash line, fold and lashes hide once the weight passes 0.5; the lids squash (scale.y = 0.78·(1 − weight)) and hide
    at 0.98, so no lid edge shows round the open eye.
- **Expression rules:** always asleep; no blink; no other expression change. Her only words are "Zzz" and, for a
  Blossom, "Thank you".

#### Animation

| Motion | Formula | Note |
| --- | --- | --- |
| Breathing | br = sin 1.6t; body scale (1 + 0.02·br, 1 − 0.02·br, 1) | squashes wide as it lowers |
| Dozing nod | body rx 0.05 + 0.03·sin 0.8t | tipped slightly forward |
| Float | centre y = (1 − s)·(1.35 + 0.1·sin 1.2t) | s = settle weight while lying |
| Cap rock | cap rz 0.04·sin 1.1t | |
| Hands | y −0.18 + 0.05·sin(1.8t + 2k) + 0.1·tkS | lift while talking |
| Tentacle sway | Euler (0.18·sin(1.4t + k), 0, 0.12·sin(1.1t + 2k)) | then splayed (below) |
| Zs | phase u = (0.33t + k/3) mod 1 (about 3 s per letter, three a third apart) | see below |

- **Tentacle splay.** Each frame each tentacle is splayed outward about its tangent axis: the solver searches upward
  from just under last frame's angle in 0.02 rad steps (up to 1.5 rad) until every sampled skin point is at least
  2 cm above the ground. Hanging straight they would reach world y ≈ −0.15, so at rest they always splay.
- **Zs.** Each starts 0.62 out on her left (+x) and 0.75 above the body centre; over its life it rises 1.0 m and
  drifts 0.5·u sideways (no drift while lying), wiggling 0.06·sin(5u + k); size grows 0.22 → 0.52, roll 0.25 → −0.05;
  opacity fades in over the first 15 % and out over the last 40 %, peaking at 0.9. The rise stays world-vertical.
- **Lying on her side.**
  - She rests when at home within 0.6 m and not busy, moving, visiting or in a vignette.
  - Lie weight eases toward 1 at 1.3/s and back at 4/s: she settles slowly and gets up quickly.
  - Roll: th = smoothstep(lie/0.6)·π/2 about z (positive): she rolls onto her right side, cap to her right (−x).
  - Settle: s = smoothstep((lie − 0.35)/0.65) brings the float height to 0: she rolls while floating, then comes down.
  - Tentacles droop toward the ground by −0.75·s rad; if splaying alone cannot clear the ground the droop is relaxed
    in four steps.
  - Root x is offset by fy·sin th so she stays over her spot; collision radius becomes 1.55·s.
  - From lie weight 0.5 she no longer turns to the player; from 0.25 she is held still and the Garden Event waits
    for her to get up.
- **Talking:** the mouth opens, the hands lift, and the shared nod, stretch and lift apply (see 3.1).
- **Walking:** no walk cycle; moving, she floats upright.
- **Planting and dancing:** none. She stays asleep at home through the Garden Event and never visits; others come to
  her.
- **Vignettes:** gesture "doze" (rx 0.18·sin(πu), rz 0.1·sin(πu)), token a letter `#fbf8f0`, emote z.

#### Construction constraints

- **Ground-clearance table**, built once from the model (every mesh except the tentacles and the Zs): the lowest point
  at 17 roll angles from 0 to 90°, plus a separate table for the hanging tentacles. Each frame the root is lifted so
  the lowest point clears the ground by 3 cm, using the lower of the two neighbouring angles plus 5 cm for breathing
  and rocking. While tipping, the low-side tentacles also hold her up, weighted by min(1, 3·sin th).
- **No z-fighting:** crown top, both piping rings and the badge flap use polygon offset (factor −1, units −4); their
  shapes are unchanged.
- **Visor:** a thin solid half-disc that shows from above, below and every side; never a single-sided plane.
- **Kept out of the mesh merge** (`userData.keep`), because the merge's sample frames never reach the open-eye state:
  lids, lash lines, lashes, folds; the Z sprites too.
- **Puff placement:** sides and back only, below y 0.40: never on the face or against the cap band.
- **Tentacle roots** start 8 cm inside the underside, so no gap shows.

#### Do / Don't

- **Do** keep the body a squared-off cream felt puff with soft rounded edges.
- **Do** keep the face on the flat front: two big closed lids with downward-curving dark lash lines, a soft fold above
  each, relaxed brows sloping down to the outside, and a tiny breathing mouth.
- **Do** keep the cap narrower than the body: navy flared crown, darker band, white piping top and bottom, glossy
  black visor tilted down, gold envelope badge leaning back with the crown.
- **Do** keep the seven plum roots splaying over the ground, never into it, in any roll angle.
- **Do** keep the Zs as large serif letters, pale lilac with a dark indigo outline, rising beside the cap on her left
  (+x).
- **Don't** add arms: her hands are detached puffs.
- **Don't** add a blink, or open the eyes except for the Blossom thanks; never show lid edges round the open eyes.
- **Don't** put puffs on the face or over the cap.
- **Don't** make the visor a one-sided plane.

### 3.12 MUSHROOM

This section specifies MUSHROOM's model, materials, face and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code), including the badge and the hat.
- **Builder and id.** Id `drifter`; builder `born_mushroom` (`BORN.mushroom`), through `born()` (see 3.1). Def: colour
  `#e8862a`, `bodyR` 0.8, `talkR` 4.2, `standY` 1.545; no `modelScale`.
- **Height.** Nominal 2.0 m, the only creature shorter than the player. Dome top 1.96 m; hat top about 2.30 m.
- **Placement.** Posted on the Sheriff's raised desk (top 1.5 m up) at `standY` 1.545, his soles 4.5 cm under his
  origin; ground fit is skipped there (posted above 0.3 m) and lifts him about 4.6 cm elsewhere (see 3.1).
- **Shared layers.** Talk wrapper and blinker (see 3.1).

#### Silhouette and signature parts

- A very wide dome on a fat, squat stem, topped by a small sheriff's hat with its sides turned up. The dome (2.52 m
  across) is wider than the whole creature is tall.
- Signature parts: (1) the orange-gold dome cap with white warts; (2) the sheriff's hat; (3) the gold six-point star
  on the stem (reads from mid range).

#### Proportions

| Part | Position | Extent | Note |
| --- | --- | --- | --- |
| Stem | origin | lathe (r, y): (0, 0.04) (0.55, 0.06) (0.62, 0.25) (0.55, 0.6) (0.50, 1.0) (0.46, 1.3) (0, 1.32), smoothed to 40 points, 36 segments | widest 1.24 at y 0.25 (bulging base), 0.92 at the top |
| Cap | group at stem y 1.30 | lathe (r, y): (0, 0.66) (0.55, 0.63) (0.95, 0.46) (1.2, 0.16) (1.26, 0.02) (1.18, −0.02) (0.6, 0.01) (0.3, 0.03) (0, 0.05) | radius 1.26, dome 0.66 tall |
| Hat | group at cap y 0.60, scale 1.2 | brim radius 0.96 world (1.92 across); crown 0.40 tall | top about 2.30 |
| Face | on the stem front | eyes y 0.78 (60 % of stem height), 0.40 apart, r 0.095; brows 0.93; mouth 0.58; blush 0.60 | low on the stem |
| Star | (0.30, 0.34, 0.52) | radius 0.13 | on his left breast (+x) |
| Feet | (±0.32, 0.06, 0.38) | ellipsoids 0.44 × 0.20 × 0.36 | soles about 4 cm below the origin |

#### Anatomy

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Hat brim | closed thin lathe solid (0.34, 0.03) (0.62, 0.012) (0.74, 0.05) (0.80, 0.12) (0.78, 0.13) (0.72, 0.07) (0.60, −0.012) (0.34, −0.005), up-curled lip; beyond r 0.5 the sides rise by 0.14·(x/r)²·((r − 0.5)/0.3) | hat group | outer r 0.80 (× 1.2) | `#8a5a32` | felt (rep 2, bump 0.02) | 14 |
| Hat crown | lathe (0.37, 0) (0.38, 0.14) (0.34, 0.28) (0.20, 0.33) (0, 0.31); above y 0.22 lowered toward the front up to 0.06 and creased by 0.04·exp(−(x/0.08)²) | hat group | 0.40 tall (× 1.2) | `#8a5a32` | felt | 14 |
| Hat band | torus | hat y 0.05 | R 0.375, tube 0.022 | `#3a2414` | clay | 30 |
| Hat star | five-point star, radii 0.055 / 0.025, extruded 0.01 | band front (0, 0.07, 0.385) | | `#e8b830` | clay, specular white | 120 |
| Cap dome | lathe, vertex colours by local y: 0 `#e46a14`, 0.25 `#f08a22`, 0.66 `#f8b83a` | stem y 1.30 | r 1.26, 0.66 tall | gradient | skin, white base + vertex colours (rep 3, bump 0.025), `keepR` | 55 |
| Rim band | torus | cap y 0.03 | R 1.20, tube 0.065 | `#d0600e` | soft (rep 2, bump 0.02) | 40 |
| Warts ×17 | squashed spheres (seed 3) on an ellipsoid (centre y 0.02, radii 1.22 / 0.64 / 1.22), 0.2–1.2 rad from the top, sunk to 98.5 % | dome | width 0.06–0.18, height 0.85 × width, depth 0.045–0.075 | `#fffaf0` | sand (bump 0.03) | 30 |
| Gill disc | flat lathed ring | cap underside | r 0.25 → 1.12 | `#d8c090` | clay | 10 |
| Gill blades ×60 | radial boxes, alternating r 0.37 → 1.11 and 0.61 → 1.11, each tilted 0.03 | cap underside | 0.07 tall, 0.012 thick | `#ead6a8` | fabric (bump 0.01) | 10 |
| Collar skirt | lathed ring (0.45, 1.13) → (0.58, 1.07) → (0.62, 1.04) + 18 drooping scallops (tipped out 0.55) | stem, under the cap; scallops at r 0.64, y 0.98 | scallops 0.07 × 0.10 × 0.035 | `#fbf6e4` | soft (bump 0.015) | 30 |
| Stem | lathe (see Proportions) | origin | 1.32 tall | `#f6eed4` | wood (rep 1, bump 0.014), fine grain | 25 |
| Eyes ×2 | standard KIT eye (see 3.1), turned 0.35 rad outward, about 2 cm into the stem | (±0.20, 0.78, 0.47) | r 0.095 | iris `#1a1a20`; lid `#f6eed4` | KIT eye | 80 (sclera) |
| Brows ×2 | flat bars, turned 0.35·sx and rolled 0.18·sx | (±0.21, 0.93, 0.48) | 0.15 × 0.035 × 0.03 | `#7a4a24` | clay | 14 |
| Blush ×2 | flat ellipsoids, turned 0.6·sx | (±0.36, 0.60, 0.44) | 0.09 × 0.06 × 0.02 | `#ffaac4` | clay | 10 |
| Freckles 3 per cheek | spheres over each blush | | r 0.012 | `#c88a5a` | clay | 14 |
| Mouth | `KIT.mouth`: torus arc spanning 0.8π, tube 0.09 × width, curving up at the ends | (0, 0.58, 0.52) | width 0.075 | `#2a1010` | unlit | — |
| Star points | six-point star, radii 0.13 / 0.065, extruded 0.015, bevel 0.008 | group (0.30, 0.34, 0.52), turned 0.55 rad | | `#e8b830` | clay, specular white | 120 |
| Star tips ×6 | balls | radius 0.135 | r 0.018 | `#e8b830` | clay, specular white | 120 |
| Star centre | disc + fine ring (torus 0.05, tube 0.006) | star centre | r 0.05, 0.012 thick | `#c8962a` | clay | 90 |
| Baby mushroom A | stem cylinder + half-dome cap (squashed 0.75) + one wart; leans out 0.4 rad | (−0.40, 0.30, −0.36): back of his right flank (−x) | size 0.32; stem r 0.064 / 0.077 × 0.19; cap r 0.183; wart r 0.034 | cap `#f08a22`; stem `#f6eed4`; wart `#fffaf0` | cap skin; stem wood | 50 (cap) |
| Baby mushroom B | as A | (0.44, 0.18, −0.30): back of his left flank (+x) | size 0.24; stem r 0.048 / 0.058 × 0.14; cap r 0.137; wart r 0.025 | cap `#f8b83a` | as A | 50 (cap) |
| Feet ×2 | ellipsoids, on the root (not the stem) | (±0.32, 0.06, 0.38) | 0.44 × 0.20 × 0.36 | `#f6eed4` | wood | 25 |
| Mycelium threads 3 per foot | tapered tubes fanned flat on the ground | from each foot | about 0.4 long, r 0.016 → 0.004 | `#fbf6ec` | clay | 10 |

#### Palette

| Hex | Use |
| --- | --- |
| `#f8b83a` → `#f08a22` → `#e46a14` | Cap gradient, crown to rim (main colour) |
| `#d0600e` | Rim band |
| `#fffaf0` | Warts |
| `#d8c090` / `#ead6a8` | Gill disc / gill blades |
| `#f6eed4` | Stem, feet, baby stems, eyelids |
| `#fbf6e4` | Collar skirt |
| `#fbf6ec` | Mycelium threads |
| `#f08a22`, `#f8b83a` | Baby mushroom caps |
| `#fbf8ee`, `#1a1a20`, `#0c0c10`, `#ffffff` | Sclera, iris (near black), pupil, glint |
| `#7a4a24` | Brows |
| `#ffaac4` | Blush |
| `#c88a5a` | Freckles |
| `#2a1010` | Mouth |
| `#e8b830` / `#c8962a` | Star gold / star centre |
| `#8a5a32` / `#3a2414` | Hat felt / hat band |
| `#e8862a` | Name and talk colour (interface only) |

#### Surfaces and materials

- **Cap:** skin with vertex colours, shine 55 (glossy). It reads as glowing but is lit normally: no emissive.
- **Rim band and collar:** soft (40 / 30). **Warts:** sand (30). **Gills:** fabric (10) over a matte clay disc (10).
- **Stem:** wood (25), a fine grain. **Hat:** felt (14).
- **Stars:** shininess 120 with white specular, jewel-like.
- **Unlit:** pupils, glints and the mouth arc. No bespoke canvas textures.

#### Face

- **Eyes:** standard KIT eyes (see 3.1), r 0.095, near-black iris, cream lids at open −0.3 (slightly hooded);
  standard blink.
- **Brows:** stern: outer ends raised, inner ends dipped.
- **Blush** with three freckles each, low on the cheeks.
- **Mouth:** a small dark arc curving up at the ends. This small smile is an approved exception for this locked model,
  not a template for other creatures.
- **Expression rules:** fixed. The mouth never opens; talking shows only as the cap tilt and the shared nod.

#### Animation

| Motion | Formula | Note |
| --- | --- | --- |
| Stem sway | stem rz 0.04·sin 1.4t | face, star and cap sway with it; the feet stay put |
| Cap bob | cap y 1.30 + 0.02·sin 2.8t | |
| Cap tilt | cap rz 0.03·sin(1.4t + 0.6) + 0.04·tkS | tilts further while he talks |
| Blink | standard (see 3.1) | |

- **Talking:** the cap tilt plus the shared nod, stretch and lift.
- **Walking:** no walk cycle; he glides. Off his desk he descends at 2.5 m/s once more than 1.2 m from home; he steps
  down off the desk front for the Garden Event or a visit.
- **Planting:** "pat" at 1.8 rad/s, size 1: rz 0.14·sin 1.8t; rx 0.15·(0.5 + 0.5·sin 3.6t); y 0.03·abs(sin 3.6t).
- **Dance:** "shimmy" at 5.45 rad/s (one bob per beat at 104 BPM), size 1: x 0.06·sin 16.35t; rz 0.06·sin 16.35t;
  y 0.05·abs(sin 5.45t): quick shakes at triple time.
- **Vignettes:** gesture "puff" (scale × (1 + 0.12·sin πu, 1 + 0.08·sin πu, 1 + 0.12·sin πu), rx −0.15·sin πu),
  token a spore `#fffaf0`, emote !.
- **Gathering greeting:** emote "...", silent.

#### Construction constraints

- The cap gradient mesh keeps its own geometry (`keepR`), because merging drops vertex colours.
- Warts are sunk 1.5 % into their reference ellipsoid: on the skin, never floating.
- The brim is a closed thin lathe solid, so it shows from below. The hat is parented to the cap, seated into the dome
  top, and moves with it.
- Feet and mycelium hang from the root, not the stem, so the stem sway never slides them.

#### Do / Don't

- **Do** keep the dome much wider than the stem, gold on top fading to deep orange at a darker rim band, with raised
  white warts in mixed sizes and fine radial gills beneath, alternating long and short.
- **Do** keep the stem fat and cream with a bulging base and a scalloped collar just under the cap.
- **Do** keep the face low on the stem: dark round eyes with cream lids, stern brows, pink blush with freckles, the
  small dark arc.
- **Do** keep the gold six-point star with ball tips on his left breast (+x), and the brown sheriff's hat with its
  pinched crown, dark band, small gold star and side-turned brim, centred on the cap.
- **Do** keep the two baby mushrooms on the back flanks.
- **Don't** make him taller than 2.0 m nominal.
- **Don't** give the cap an emissive glow: the glow is painted colour.
- **Don't** add arms, or legs beyond the two little feet; don't open the mouth.

### 3.13 ZOLLOD

This section specifies ZOLLOD's model, materials, face and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code).
- **Builder and id.** No `id`; found by `def.__type` `"cutebex"`. Builder `born_zollod` (`BORN.zollod`), through
  `born()` (see 3.1). Def: colour `#3cbe94`, `bodyR` 0.9, `talkR` 4.2; no `modelScale`.
- **Height.** Nominal 2.6 m; head flowers top out near 2.45 m.
- **Shared layers.** Talk wrapper, blinker and ground fit (see 3.1); the ground fit adds nothing (his lowest point is
  already above 6 mm).

#### Silhouette and signature parts

- An upright, pear-bodied biped with a small head on a short neck; a trunk hangs from the snout and curls back toward
  the chest; a long thick tail sweeps out behind and curls up at the tip, toward his left (+x); fern and plume blades
  fan up and out from the shoulders and back; the back line is bumpy with grass tufts and flowers.
- Signature parts: (1) the curling trunk with its magenta tip; (2) the garden bed and fronds on his back; (3) the long
  magenta-tipped tail.

#### Proportions

The body is one blended skin of six ellipsoids (blend k 0.16, firm), meshed by rays from (0, 1.35, 0.06).

| Part | Centre | Radii (x, y, z) |
| --- | --- | --- |
| Torso | (0, 1.10, 0) | 0.46, 0.58, 0.40 |
| Chest | (0, 1.50, 0.03) | 0.40, 0.32, 0.34 |
| Hips | (0, 0.70, −0.02) | 0.40, 0.30, 0.36 |
| Neck | (0, 1.80, 0.08) | 0.22, 0.20, 0.22 |
| Head | (0, 2.06, 0.14) | 0.30, 0.28, 0.32 |
| Snout | (0, 1.98, 0.42) | 0.15, 0.13, 0.14 |

| Measure | Value |
| --- | --- |
| Body skin | y 0.40–2.34; torso 0.92 wide; snout reaches z 0.56 |
| Head | 0.60 wide, 0.56 tall: about a quarter of body height |
| Legs | hips (±0.21, 0.60, 0), 0.42 apart; length 0.55 (thigh 0.275, shin 0.275), r 0.13, thigh bulge × 1.4; pad feet at y 0.05, soles about 4 cm above the origin |
| Arms | shoulders (±0.42, 1.52, 0.02); length 0.66, r 0.095; angled out 0.16 rad and back 0.15 rad; hands at about y 0.86 |
| Tail | root (0, 0.72, −0.32); about 1.5 along its curve to z ≈ −1.52, x +0.3; r 0.20 → 0.05; lowest point 4–5 cm above the ground |
| Eyes | r 0.075 (small for the head) |

Limbs are short: each about a quarter of the height. The tail is as long as the torso is tall.

#### Anatomy

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Head flowers ×2 | stem cylinder + 5 petal ellipsoids (tipped up 0.25) + centre bead; upright | rays from the head centre toward (−0.24, 1, 0.10) and (0.26, 1, −0.12), 1 cm into the skin | stems r 0.011–0.015, h 0.10 / 0.12; petals (0.034, 0.012, 0.021)·sz at radius 0.03·sz, sz 1.3 / 1.5; bead r 0.017·sz | stems `#4a9a2a`; petals `#ff5fb0`; bead `#ffd23a` | clay | 20 (stems), 40 |
| Eyes ×2 | standard KIT eye (see 3.1), yawed along the surface normal | rays from (0, 2.1, 0.14) toward (±0.6, 0.15, 0.78), sunk 3.5 cm | r 0.075 | iris `#3a2a6a`; lid `#35d0c8` | KIT eye | 80 (sclera) |
| Trunk | tapered tube through (0, 0, −0.04) (0, −0.10, 0.12) (0, −0.32, 0.18) (0, −0.44, 0.06) (0, −0.36, −0.03) | group (0, 1.97, 0.52), inside the snout tip | r 0.085 → 0.032 | `#35d0c8` | scale (rep 2, bump 0.02) | 40 |
| Trunk tip | ball | trunk end | r 0.04 | `#e040c8` | clay | 60 |
| Body skin | blended skin, six vertex-colour bands by height | origin | see Proportions | `#35d0c8` (y 2.30), `#38c8b0` (1.92), `#3cbe94` (1.54), `#42b676` (1.16), `#48ae58` (0.78), `#4ca83c` (≤ 0.40) | scale, white base + vertex colours (rep 5, bump 0.025) | 40 |
| Moss bed | surface patch lifted 5 cm | back, 0.95 rad either side of straight back, y 0.95–1.72 | | `#4caf34` | grass (rep 2, bump 0.03) | 8 |
| Grass blades ×26 | cones (seed 5), leaning back 0.3 ± 0.2 | back ±0.85 rad, y 1.0–1.68, 5 cm out | r 0.022, h 0.14–0.24 | `#5cc83a` | clay | 20 |
| Back flowers ×5 | as head flowers, sz 1.4; oriented halfway between normal and up | angles 2.8, 3.4, 3.0, 3.55, 2.65 rad at y 1.50, 1.62, 1.22, 1.30, 1.12; 4 cm out | stems 0.10 / 0.14 / 0.18 cycling | petals alternate `#f6f0ff` and `#ff5fb0` | clay | 40 |
| Worm | short tube (rising 0.2) + head sphere + two eye dots | back toward his right (−x): ray from (0, 1.4, 0.06) toward (−0.45, 0, −1), 4 cm out | tube r 0.04 → 0.035; head r 0.045; eyes r 0.009 | `#f0a07a`; eyes `#141418` | clay | 40 |
| Fronds ×4 | flattened ellipsoid blades, oriented along the normal + (0, 0.9, −0.3) | top and bottom of three per side at y 1.62 and 1.18, rays toward (±1, 0, −0.55) | (0.04, 0.32, 0.11), about 0.64 long | `#3fa82a` | leaf (rep 1, bump 0.02) | 20 |
| Plumes ×2 | as fronds | middle of each side, y 1.40 | as fronds | `#ffd83a` | feather (rep 1, bump 0.02) | 20 |
| Apron bib | surface patch, double-sided, lifted 3 cm | front, 0.6 rad either side, y 0.96–1.55 | | `#7a8a44` | fabric (rep 2, bump 0.02) | 10 |
| Apron skirt | open cylinder arc ±1.05 rad round the front, radius × (0.45, 0.41), double-sided | y 0.34–0.94 | | `#7a8a44` | fabric | 10 |
| Pocket | box, tipped 0.06 | (0, 0.82, 0.42) | 0.34 × 0.20 × 0.025 | `#6a7a3a` | fabric | 10 |
| Seed packets ×3 | boxes standing out of the pocket, stepped up 1.2 cm each, fanned −0.1 / 0 / +0.1 rad | x −0.09, 0, +0.09 | 0.07 × 0.10 × 0.008 | `#e84a5a`, `#ffd23a`, `#5aa8e8` | clay | 30 |
| Leather ties ×2 | tubes from the bib corners over the shoulders to the back of the neck | (±0.15, 1.54, 0.32) → (0, 1.84, −0.15) | r 0.016 | `#7a4a24` | clay | 20 |
| Waist tie | elliptical ring | y 0.96 | 0.44 × 0.39 | `#7a4a24` | clay | 20 |
| Arms ×2 | `KIT.arm` with the fingers hand: shoulder ball, tapered upper and lower arm, elbow ball, palm (r 0.114, × (1, 0.9, 0.6)), four finger cylinders | shoulders (±0.42, 1.52, 0.02) | fingers r 0.0285 × 0.133 | `#35d0c8` | scale | 40 |
| Trowel | handle cylinder + blade box; tipped −1.2 rad, blade pointing back and slightly up | left hand (+x), 12 cm down, 6 cm forward | handle r 0.025–0.03 × 0.18; blade 0.09 × 0.20 × 0.012 | handle `#a8683a`; blade `#c8ccd4` | clay; blade white specular | 30; 110 |
| Legs ×2 | `KIT.leg` with pad feet: hip ball, plump thigh, tapered shin, knee ball | hips (±0.21, 0.60, 0) | see Proportions | `#48ae58` | scale | 40 |
| Pad feet ×2 | cylinder + three nail beads | y 0.05 | r 0.124–0.140, 0.07 tall | foot `#48ae58`; nails `#f2ead0` | scale; nails clay | 40; 50 |
| Tail | tapered tube through (0, 0, 0) (0, −0.25, −0.35) (0.1, −0.55, −0.75) (0.22, −0.6, −1.05) (0.3, −0.48, −1.2) | root (0, 0.72, −0.32) | r 0.20 → 0.05 | `#48ae58` | scale | 40 |
| Tail tip | ball | tail end | r 0.07 | `#e040c8` | clay | 60 |

Seam rings darken the body skin 22 % at the centre of each band step (y ≈ 1.73, 1.35, 0.97, 0.59) for a segmented
look; the ring at y 2.11 is suppressed (above 1.75), so head and neck stay seamless. Creases darken a further 12 %.

#### Palette

| Hex | Use |
| --- | --- |
| `#35d0c8` → `#38c8b0` → `#3cbe94` → `#42b676` → `#48ae58` → `#4ca83c` | Body bands, head to feet (main colour) |
| `#35d0c8` | Arms, trunk, eyelids |
| `#48ae58` | Legs, feet, tail |
| `#e040c8` | Trunk tip, tail tip |
| `#3a2a6a` | Iris |
| `#fbf8ee`, `#0c0c10`, `#ffffff` | Sclera, pupil, glint |
| `#ff5fb0`, `#f6f0ff` | Flower petals |
| `#ffd23a` | Flower centres, middle seed packet |
| `#4a9a2a` | Flower stems |
| `#4caf34` / `#5cc83a` | Moss bed / grass blades |
| `#3fa82a` / `#ffd83a` | Fern fronds / yellow plumes |
| `#f0a07a` / `#141418` | Worm / worm eyes |
| `#7a8a44` / `#6a7a3a` | Apron canvas / pocket |
| `#e84a5a`, `#5aa8e8` | Seed packets |
| `#7a4a24` | Leather ties and waist tie |
| `#a8683a` / `#c8ccd4` | Trowel handle / steel blade |
| `#f2ead0` | Toe nails |
| `#3cbe94` | Name and talk colour (interface only) |

#### Surfaces and materials

- **Scale** on the body (rep 5), arms, trunk, legs and tail (rep 2): shine 40, glossy throughout.
- **Grass** on the moss bed (8, matte); **leaf** on the ferns and **feather** on the plumes (20); **fabric** on the
  apron and pocket (10).
- **Clay accents:** petals and centres 40; magenta tips 60; worm 40; packets 30; leather 20; trowel blade 110 with
  white specular (steel).
- **Unlit:** the KIT pupils and glints only. No bespoke canvas: banding and seams are vertex colour.

#### Face

- **Eyes:** small standard KIT eyes sunk into the head along the surface, deep violet-indigo iris, cyan lids matching
  the head band at open −0.25 (calm, slightly hooded); standard blink.
- **Absent:** brows and mouth. The trunk is the expressive part.
- **Expression rules:** understated and fixed. His shyness changes nothing in the model.

#### Animation

| Motion | Formula | Note |
| --- | --- | --- |
| Fronds | each rz 0.08·sin(1.8t + k), k = 0..5 | |
| Worm | ry 0.5·sin 2t | turns to look about |
| Trunk curl | rx 0.15·sin 1.7t | |
| Tail sway | ry 0.2·sin 1.3t | |
| Arms | shoulder rx 0.15 + 0.08·sin(1.4t + 3k) + walk swing 0.5·sin(8t + kπ) | |
| Legs (walking only) | `KIT.stride` at phase 8t + kπ: hip 0.5·sin ph; knee 0.8·max(0, sin(ph + 1.4)); foot −(hip + knee) | feet kept level |
| Blink | standard (see 3.1) | |

- No body bob and no breathing of his own.
- **Talking:** only the shared nod, stretch and lift (see 3.1); he has no mouth.
- **Planting:** "dig" at 3 rad/s, size 0.8 (fast and small): rx 0.256·max(0, sin 3t); z 0.064·max(0, sin 3t).
- **Dance:** "groove" at 5.45 rad/s, size 0.9: y 0.045·abs(sin 5.45t); rz 0.09·sin 2.725t; rx 0.054·sin 5.45t;
  ry 0.18·sin 1.3625t.
- **Shop:** while his shop is open he holds still.
- **Vignettes:** gesture "sway" (rz 0.12·sin 2πu, rx 0.05·sin 4πu), token a sprout `#6ac83a`, emote ✿.
- **Gathering greeting:** emote ≈ with a bubble blip.

#### Construction constraints

- **One sculpted skin:** a single blended surface (k 0.16), kept unmerged so its vertex colours survive.
- **Parts sit on the skin:** every part is placed by casting a ray onto the skin, then offset along the normal: eyes
  3.5 cm in; head flowers 1 cm in; bib 3 cm out; moss bed and blades 5 cm out; back flowers and worm 4 cm out.
- **Apron:** bib and skirt arc are double-sided, so their open edges never show a hole; the pocket and packets are
  separate thin boxes in front.
- **Merge:** limb joints are kept out of the merge; fronds, worm, trunk, tail, arms and legs are animated nodes;
  everything else is merged per material.
- **Ground:** soles and the low curve of the tail sit 4–5 cm above the origin.

#### Do / Don't

- **Do** keep the colour flowing in six bands from cyan at the head to green at the feet, with faint seam rings on the
  body only and a seamless head and neck.
- **Do** keep the trunk hanging and curling back under the snout, its magenta ball tip matching the tail tip.
- **Do** keep the back a garden: matte moss, grass tufts, pink and white five-petal flowers, the worm peeking out on
  his right (−x).
- **Do** keep fern / plume / fern on each side, leaning up, out and back.
- **Do** keep the olive canvas apron with the darker pocket, three coloured seed packets and leather ties over the
  shoulders; arms cyan, legs and tail green; eyes small with cyan lids.
- **Do** keep the trowel in his left hand (+x).
- **Don't** add a mouth or brows, or make the eyes large or glowing.
- **Don't** let fronds, flowers or blades float off or sink into the skin.
- **Don't** make the apron of single-sided planes.
- **Don't** shorten or thin the tail.

### 3.14 ANOMALEE

This section specifies ANOMALEE's box-built model, her screen face, her peg leg and her motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code), peg leg included.
- **Builder and id.** Id `blinker`; builder `anomaleePeg`, which wraps the packaged `pk_anomalee` and adds the peg
  leg, the handheld screen glow, the moulded plastic finish and the gaze. Def: colour `#2fd4e6`, `bodyR` 0.95, `talkR`
  4.2, `modelScale` 0.95, `gazeUp` 0.6.
- **Height.** Declared 3.3 × 0.95 = **3.14 m in game**. Highest geometry: the router box top at y 3.0 (2.85 m).
- **Shared layers.** Talk wrapper and ground fit (see 3.1). All idle motion is her own `anim`.
- Lengths below are model units; multiply by 0.95 for metres in game.

#### Silhouette and signature parts

- A blocky four-legged computer: a tall box monitor head high and slightly forward; a long flat rectangular snout of
  two stacked trays jutting about 1 m forward under it; a low router box on top behind the monitor with three cables
  hanging down her left side (+x); a short box tail sloping down at the back.
- One back leg, her back-left (+x), is a thin tapered wooden peg, visibly thinner than her three box legs.
- Everything is boxes with hard right angles, except the cables and the peg.
- Signature parts: (1) the monitor head with its magenta screen; (2) the jutting keyboard snout; (3) the peg leg, with
  the dangling cables as a secondary read.
- At her spot before the church her head is tipped back 0.6 rad, gazing up at the window.

#### Proportions

| Part | Centre | Extent | Note |
| --- | --- | --- | --- |
| Body box | (0, 1.25, −0.05), rx −0.12 (nose up about 6.9°) | 1.05 wide × 0.9 high × 1.35 deep | spans y ≈ 0.8–1.7 |
| Monitor head | group (0, 2.15, 0.35), scale 1.3 | front box 1.0 × 0.78 × 0.6 local (1.30 × 1.01 × 0.78 effective); CRT back 0.84 × 0.62 × 0.3 local (1.09 × 0.81 × 0.39) | spans y ≈ 1.64–2.66; the largest block, wider than the body |
| Snout | upper jaw y 1.40–1.70; lower jaw y 1.25–1.39 | both z ≈ 0.70–1.75 | about 1 m ahead of the body front (z ≈ 0.63) |
| Legs | hips (±0.45, 0.95, 0.42) front, (±0.45, 0.95, −0.55) back | hip to sole about 1.0; feet reach y ≈ −0.03 before the ground fit | about 30 % of the declared height |

#### Anatomy

Two materials do most of the work: **casing** (Phong with the pixel-art map, shininess 8, flat shading) and **plain**
(Phong in one colour, shininess 20, flat shading; large plain parts become moulded plastic, see Surfaces).

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Router | box, on the body root (does not turn with the head) | (0.3, 2.82, −0.3): rear top of the monitor, offset to her left (+x) | 0.85 × 0.36 × 0.5 | `#9aa88c` | plastic | 20 |
| Router label | box | router front (z 0.26) | 0.7 × 0.24 × 0.02 | canvas: "adb" in `#6fb0ff` on `#3a5a8a`, three white Wi-Fi arcs beside it | unlit | — |
| Cables ×3 | Catmull-Rom tubes, 16 × 6 segments, each drifting out to +x by 0.12–0.30 | from under the router at (0.3, −0.18, 0.1), (0.1, −0.18, 0.2), (0.38, −0.18, −0.1) | r 0.028, about 0.95 long | middle `#1f7f9a`; outer two `#2a3f7a` | plastic | 20 |
| Monitor front box | box | head origin | 1 × 0.78 × 0.6 | `#29c7d9` | plastic | 20 |
| CRT back | box, overlapping the front box by 0.03 | head z −0.42 | 0.84 × 0.62 × 0.3 | `#1fa3b4` | plastic | 20 |
| Face screen | box, 5 mm proud | head (0, 0.02, 0.305) | 0.82 × 0.6 × 0.02 | swapped canvas (see Face) | unlit | — |
| Bezel ledge | box | head (0, −0.46, 0.12) | 0.9 × 0.12 × 0.3 | `#f2f2ea` | plastic | 20 |
| Vents ×6 | boxes | head x −0.30 to +0.30 step 0.12; y −0.46, z 0.275 | 0.08 × 0.05 × 0.02 | `#1a2228` | plain, flat | 20 |
| Upper jaw | box | group (0, 1.55, 0.72), box at local z 0.5 | 0.55 × 0.3 × 1.05 | casing | casing | 8 |
| Cheek crosses ×2 | bar 0.02 × 0.2 × 0.06 + bar 0.02 × 0.06 × 0.2 + centre 0.021 × 0.05 × 0.05 (1 mm proud of the bars) | jaw x ±0.28, local z 0.45 | | bars `#1a2228`; centre `#18d6ee` | bars plastic; centre plain, flat | 20 |
| Teeth ×6 | cubes in a zigzag; shown only while the jaw is open | x ±0.12, jaw-local y −0.18, z 0.2–0.9 | 0.07 | `#f4f4ec` | plain, flat | 20 |
| Lower jaw (tray) | box, pivot at its back end | group (0, 1.32, 0.72), box at local z 0.5 | 0.52 × 0.14 × 1.0 | `#8fa3b0` | plastic | 20 |
| Keyboard top | box on the tray top | tray local y 0.076 | 0.5 × 0.012 × 0.9 | canvas: `#e8ecd8` keys on `#b6c3a0` | unlit | — |
| Tray front strip | box | tray local z 1.01 | 0.4 × 0.1 × 0.02 | `#6f9fe8` | plastic | 20 |
| Body box | box, rx −0.12 | (0, 1.25, −0.05) | 1.05 × 0.9 × 1.35 | casing | casing | 8 |
| "adb" plate | box | body front (0, 0.18, 0.68) | 0.62 × 0.3 × 0.02 | canvas: "adb" `#2f5fd8` on `#b3c48f` | unlit | — |
| Keypad grille | box | body front (0, −0.15, 0.68) | 0.5 × 0.2 × 0.02 | canvas: 4 × 8 `#e8e8d0` keys on `#18d6ee` | unlit | — |
| Side arm | box, rotation (0.4, 0, −0.3) | group (0.55, 1.45, 0.4) on her left (+x); box at (0.08, −0.15, 0.1) | 0.16 × 0.5 × 0.16 | casing | casing | 8 |
| Handheld panel | box, rotation (−0.2, −0.3, 0.1) | arm-local (0.32, 0.1, 0.35) | 0.34 × 0.4 × 0.06 | `#f4f4f0` | plastic | 20 |
| Handheld screen | box | panel (0, 0.05, 0.035) | 0.26 × 0.2 × 0.01 | scanline glow (see Surfaces) | Phong, emissive `#5a0a5a`, specular white | 120 |
| Handheld button | cube | panel (0.2, −0.05, 0.02) | 0.12 | `#18d6ee` | plastic | 20 |
| Tail | box, rx −0.35 (rear end down) | (0, 1.1, −0.95) | 0.35 × 0.3 × 0.6 | casing | casing | 8 |
| Box legs ×3 | thigh box at (0, −0.2, 0.05), rx 0.3; knee group (0, −0.45, 0.14); shin box at (0, −0.24, −0.05), rx −0.25; foot box at (0, −0.48, 0.02) | hips (±0.45, 0.95, 0.42) and her back-right (−0.45, 0.95, −0.55) | thigh 0.26 × 0.55 × 0.3; shin 0.2 × 0.52 × 0.22; foot 0.28 × 0.1 × 0.4 | thigh and shin casing; foot `#6c7a7a` | casing; foot plastic | 8; 20 |
| Peg stump | box in the thigh's casing, rx 0.15 | peg group (on hip (0.45, 0.95, −0.55), rx 0.08) at (0, −0.08, 0.03) | 0.26 × 0.28 × 0.3 | casing | casing | 8 |
| Peg socket | cylinder, 8 sides | peg y −0.3 | r 0.17 top → 0.13 bottom, 0.24 tall | `#a8743e` | wood (rep 1, bump 0.03) | 20 |
| Iron bands ×2 | cylinders, 8 sides | y −0.215 (r 0.172) and −0.385 (r 0.14) | 0.04 tall | `#4a4e56` | Phong, flat | 60 |
| Rivets ×4 | spheres at angles kπ/2 + 0.4 | on the upper band | r 0.022 | `#4a4e56` | Phong, flat | 60 |
| Peg | cylinder, tapered | y −0.66 | r 0.075 → 0.05, 0.5 long | `#a8743e` | wood | 20 |
| Rubber tip | cylinder | y −0.93 (tip at y ≈ −0.01) | r 0.07 top, 0.08 bottom, 0.06 tall | `#26262c` | Phong, flat | 10 |
| Knot | sphere | (0.03, −0.6, 0.09) | 0.03 × 0.04 × 0.02 | `#a8743e` | wood | 20 |
| Patch | box, rz 0.3 | (−0.01, −0.76, 0.088) | 0.1 × 0.12 × 0.02 | `#c8955a` | wood (bump 0.02) | 20 |

#### Palette

| Hex | Use |
| --- | --- |
| `#b3c48f` | Casing olive (main colour) |
| `#18d6ee` / `#6c7a7a` | Casing stripes cyan / grey; cyan also on cross centres, keypad and handheld button; grey also on the feet |
| `#c9d6a8` | Casing speckles |
| `#1a2228` | Casing outline, vents, cross bars |
| `#29c7d9` / `#1fa3b4` | Monitor front / CRT back |
| `#2fd4e6` | Name colour (interface only) |
| `#e01ce0` | Head screen base (magenta) |
| `#f08af0`, `#f6b8f6`, `#ffffff` | Screen icons and equaliser cells |
| `#f0f0f0`, `#e01ce0`, `#303040` | Screen static |
| `#ff5af0` → `#c010c0` | Handheld screen glow (radial), emissive `#5a0a5a` |
| `#f2f2ea` | Bezel ledge |
| `#9aa88c`; `#3a5a8a`, `#6fb0ff` | Router; router label ground, text |
| `#2a3f7a`, `#1f7f9a` | Cables navy (two), teal (one) |
| `#8fa3b0`; `#b6c3a0`, `#e8ecd8`; `#6f9fe8` | Tray; keyboard ground, keys; tray strip |
| `#f4f4ec` | Teeth |
| `#2f5fd8` | "adb" plate text |
| `#e8e8d0` | Keypad keys |
| `#f4f4f0` | Handheld body |
| `#a8743e`, `#c8955a` | Peg wood, patch |
| `#4a4e56`, `#26262c` | Peg iron, rubber tip |

No gradient anywhere except the handheld screen's radial glow.

#### Surfaces and materials

- **Pixel-art casing.** A 32 × 32 canvas, `NearestFilter`, no mipmaps: base `#b3c48f`; every 10 px a 4 px cyan
  diagonal stripe, a 1 px gap and a 2 px grey stripe; eight 2 × 2 speckles in `#c9d6a8`; a 1 px `#1a2228` border.
  Box UVs span 0–1 on every face, so each face shows one whole tile with a dark outline: every box carries a drawn
  pixel outline, and stripe density changes with face size. Shininess 8, flat shading: matte.
- **Unlit canvases** (labels, keypad, keyboard, face screen): `MeshBasicMaterial`, nearest-filtered.
- **Moulded plastic.** `texturize(g, "plastic", {rep: 1, bump: 0.02})` replaces every plain, untextured Phong material
  on a part of bounding radius 0.09 or more with a KIT plastic surface: shininess 20, specular `#222222`, smooth
  shading. This covers the monitor, CRT back, ledge, router, cables, jaws, tray strip, handheld, button, feet and the
  cross bars. Small parts (vents, teeth, cross centres) keep flat Phong at 20.
- **Handheld screen glow.** The wrapper swaps every untextured magenta mesh (r > 0.7, g < 0.35, b > 0.7) to a glowing
  Phong material: a 128 × 96 canvas with the radial gradient `#ff5af0` → `#c010c0`, white scanlines every 4 px
  (1.5 px tall, 12 % opacity) and a highlight bar at (10, 8, 30 × 5) at 25 %; emissive `#5a0a5a` with the same map as
  emissive map; shininess 120, white specular. In the model only the handheld's small screen matches; the head
  screen has a map and keeps its pixel-art canvases.
- **Peg:** KIT wood (rep 1, bump 0.03, shine 20); iron Phong 60, flat; rubber Phong 10, flat.

#### Face

- **The screen is the face.** There are no eyeballs or mouth on the head; the snout's jaw is the moving mouth. The
  cheek crosses read as D-pads, not eyes.
- All screen canvases are 64 × 48, nearest-filtered.
- **Idle face** (canvas corners as seen from the front): flat `#e01ce0`; a pale `#f08af0` corner bracket at the top
  left (10 × 2 and 2 × 8 px), reading as a glint; a Wi-Fi icon at the top right: three `#f6b8f6` arcs of radius 4, 7
  and 10 px round (52, 16), 2 px wide, with a 2 × 2 dot.
- **Static:** a 2 px checker of random cells drawn once at build: half `#f0f0f0`, the rest split between `#e01ce0`
  and `#303040`.
- **Equaliser:** four frames of eight bars (5 px wide on a 7 px pitch), each a stack of 2–10 cells (3 px tall on a
  4 px pitch) rising from y 42; cells 0–4 `#f08af0`, 5–6 `#f6b8f6`, 7 and up white.
- **Swap order:** (1) during a glitch, static and the normal frame alternate every 0.05 s; (2) while she dances
  (dance weight > 0.5), equaliser frame floor(4 × beat) mod 4, four frames per beat at 88 BPM (`Ft`); (3) otherwise
  the idle face.
- **Glitches:** first 4–10 s after spawn, then every 5–13 s, each 0.35 s; every conversation opening triggers a
  0.4 s glitch; while her root is scaled below 0.97 the glitch holds at least 0.15 s. During a glitch the head jitters
  sideways ±0.03.

#### Animation

`C` is a random phase in 0–10 per instance.

| Motion | Formula | Note |
| --- | --- | --- |
| Head idle | rx 0.03·sin(1.2t + C); ry 0.06·sin(0.7t + C) | |
| Arm idle | rx 0.05·sin(1.4t + C) | |
| Cables | z 0.08·sin(1.6t + i); x 0.06·sin(1.3t + 2i) | |
| Gaze up | head rx −0.6·gk, gk eased at 2.5/s | at rest at her spot |
| Jaw chomp | tray drop 0.35·abs(sin(9G))·(1 − G/0.9) over 0.9 s | about 2.5 fading snaps; front falls up to about 0.34 |

- **Gaze.** The head tips back while she stands at her spot; it comes level when she walks, is busy, or is held in
  dialogue for her Blossom line or during the Event. She keeps gazing through her ordinary Talk lines.
- **Jaw chomp** fires when a conversation opens and at random about once per 12.5 s (probability 0.08·dt). The teeth
  show only while the jaw is open.
- **Talking:** the shared talk wrapper (see 3.1) plus the opening chomp and glitch.
- **Walk:** weight eased at 1 − e^(−6dt); phase 7 rad/s; diagonal pairs trot (front right (−x) with back left (+x),
  the peg; front left (+x) with back right (−x)); hip swing 0.4·sin; knee fold 0.4·max(0, −cos); body bob
  0.075·abs(sin); cables add 0.1·sin(2·phase); arm adds 0.12·sin. The peg swings with its hip (it has no knee).
- **Planting:** "dig" at 1.5 rad/s, size 1: rx 0.32·max(0, sin 1.5t); z 0.08·max(0, sin 1.5t). Once the Snacks quest
  is complete she plays "eat" at 2.6 rad/s instead: rx 0.22 + 0.16·max(0, sin 1.3t)⁶, a 1.5 cm chew bob, roll
  0.04·sin 0.65t.
- **Dance:** "stomp" at 5.45 rad/s, size 1: rz 0.12·sin 5.45t; y 0.06·max(0, sin 10.9t) (a hop every half beat);
  rx 0.04·abs(sin 5.45t). In the model: the equaliser screen, and the cables kicking 0.28·max(0, sin(π·beat + 1.3i)) on
  the beat.
- **Vignettes:** gesture "glitch" (rz ±0.12 square wave and y ±0.04, enveloped by sin πu), token a pixel `#e030e0`,
  emote ?.
- **Gathering greeting:** emote ? with a crackle.

#### Construction constraints

- **Peg by position.** The base model hides the back-left (+x) leg. The wrapper finds that hip as the invisible group
  at x 0.45, z −0.55 (within 0.01), and the head as the group at y 2.15, z 0.35. These origins must not move.
- **Peg build.** The hip's children are removed and replaced by the peg group (rx 0.08); the iron bands sit 1.5 cm
  in from the socket's ends, so no band face is coplanar with the socket's top or bottom. The rubber tip reaches
  y ≈ −0.01, level with the other feet.
- **Panel offsets:** flat panels sit about 5 mm proud of their faces (plates at z 0.68 on a face at 0.675; screen at
  0.305 on 0.30; vents at 0.275 on 0.27); cross centres are 1 mm proud of their bars.
- **Closed bite at rest:** the upper jaw's bottom is at y 1.40 and the tray top at 1.39–1.40; the teeth sit inside.
- **Router on the body root:** it overlaps the monitor top by about 0.02 and stays put when the head tips back.
- Feet reach y ≈ −0.03 in the model; the ground fit lifts her to 6 mm clearance (see 3.1).

#### Do / Don't

- **Do** build her only from boxes, square to each other, with the body tilted nose-up about 7°.
- **Do** outline every casing face with a 1 px dark border and run diagonal cyan and grey stripes on olive, in
  nearest-filtered pixel art.
- **Do** keep the monitor head the largest block, its screen magenta `#e01ce0` and unlit, with the corner bracket and
  the Wi-Fi icon; static for glitches; pink-to-white equaliser bars for dancing.
- **Do** keep the snout a stacked jaw: casing on top, a keyboard tray below that drops open from its back end.
- **Do** keep the cables, the handheld and the peg on her left (+x).
- **Do** keep the peg thin and wooden: iron-banded socket, dark rubber tip, knot, nailed-on patch.
- **Don't** give the screen eyes, a mouth or a smile, or show static or equaliser anywhere but the head screen.
- **Don't** put the `#ff5af0` → `#c010c0` scanline glow on the head screen: it belongs to the handheld.
- **Don't** round her edges or smooth-shade the casing.
- **Don't** make the peg as thick as the box legs, let the router turn with the head, or show the teeth while the jaw
  is closed.

### 3.15 HENNRICK

This section specifies HENNRICK's model, lights, screen and motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code).
- **Builder and id.** Id `gratelet`; builder `pk_hennrick` (`__R["hennrick"]`, packaged). Def: colour `#c85ac8`,
  `bodyR` 1.25, `modelScale` 0.88. Not a `born` model: no KIT compaction; the spawn-time merge samples 360 frames
  (walk, talk, spin) and merges meshes that never change.
- **Height.** Declared 3.4 × 0.88 = **2.99 m in game**. Visible top (3.46 + 0.075) × 0.88 ≈ 3.11 m. Arm span about
  3.36 units (2.96 m): almost as wide as he is tall.
- **Shared layers.** Talk wrapper and ground fit (see 3.1); he breathes in his own model.
- Lengths below are model units; multiply by 0.88 for metres in game. The whole model rides 0.075 above the ground.

#### Silhouette and signature parts

- A tall, stacked, furry robot-beast: a big egg-shaped lower body topped by a slightly smaller upper ellipsoid set
  forward, with no neck between them; very long arms hanging to near the ground; short stubby legs.
- Signature parts: (1) chrome ring "halos" round each upper arm below a fur shoulder ball; (2) the long dangling arms
  ending in hooked copper claws; (3) four segmented tentacles hanging like a beard under the face.
- Copper tusk-hoses curving out and up beside the face add to the outline.

#### Proportions

| Part | Centre | Radii or extent | Note |
| --- | --- | --- | --- |
| Lower body | (0, 1.75, 0) | 1.0 × 1.05 × 0.82 | y 0.70–2.80 |
| Upper body / face | (0, 2.72, 0.12) | 0.86 × 0.74 × 0.84 | y 1.98–3.46, set 0.12 forward |
| Shoulder balls | (±1.02, 2.18, −0.02) | 0.56 × 0.52 × 0.55 | |
| Arm pivots | (±1.12, 2.05, 0) | upper arm 0.36 × 0.62 × 0.38 at (0.12·side, −0.55); forearm 0.32 × 0.55 × 0.34 at (0.2·side, −1.2, 0.05); hand 0.30 × 0.26 × 0.30 at (0.24·side, −1.68, 0.1) | claws reach −2.06: tips about 6.5 cm above the ground; arms about 60 % of body height |
| Leg pivots | (±0.55, 1.05, 0) | thigh 0.42 × 0.55 × 0.44 at −0.35; foot 0.42 × 0.26 × 0.55 at (0, −0.85, 0.12) | only about 0.5 shows below the body |
| Tentacles ×4 | x −0.22, −0.075, 0.075, 0.22; rooted 0.3 below the upper ellipsoid's centre, on its front | 4 segments of about 0.36–0.38 + tip ball: about 1.5 long | |
| Screen | about y 2.67 on the face front | display 0.6 × 0.36 | |

#### Anatomy

"Fur" is his bespoke stroke tile (see Surfaces). Positions on the ellipsoids are surface offsets (x, y) from the
ellipsoid centre.

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Upper ellipsoid | sphere, shaggy jitter ±0.0175 | (0, 2.72, 0.12) | 0.86 × 0.74 × 0.84 | `#c85ac8` | purple fur | 6 |
| Crown light strips ×3 | surface bands hugging the front, lifted 0.03 | y offsets 0.60, 0.48, 0.34; half-widths 0.50, 0.62, 0.70 | 0.045 tall | `#3ae8f0` | unlit | — |
| Light sockets ×9 | chrome torus oriented to the surface + bulb sphere inside | his right (−x): (−0.46, 0.17), (−0.66, 0.06), (−0.5, −0.06), (−0.7, −0.2), (−0.36, 0.34); his left (+x): (0.46, 0.17), (0.66, 0.06), (0.5, −0.06), (0.36, 0.34) | torus R 0.085, tube 0.03; bulb r 0.065 | ring `#9ca3ae`; bulb `#3ae8f0` | ring chrome; bulb unlit | 120 |
| Screen bezel | box | face front, centre about y 2.67 | 0.7 × 0.46 × 0.14 | `#9ca3ae` | chrome | 120 |
| Screen display | plane, 5 mm in front of the bezel face | bezel | 0.6 × 0.36 | scrolling canvas (see Face) | unlit | — |
| Hose collars ×2 | cylinder | low on the face (±0.42, −0.34) | r 0.11 → 0.13, h 0.16 | `#9ca3ae` | chrome | 120 |
| Tusk-hoses ×2 | tapered tube through (0, 0, 0) (0.22, −0.24, 0.16) (0.52, −0.24, 0.2) (0.74, 0.1, 0.14) (0.82, 0.6, 0.04), mirrored | from the collars | r 0.085 → 0.02 | `#d8702a` | copper, specular `#ffeedd` | 110 |
| Tentacles ×4 | chained joint groups: 4 cylinder segments 0.38 long + joint balls + tip ball; rooted 6 cm inside the skin; jitter 0.012–0.014 | under the face | segment r 0.14, 0.118, 0.096, 0.074, each tapering 0.022; tip r 0.05 | `#c85ac8` | purple fur | 6 |
| Lower body | sphere, jitter ±0.0175 | (0, 1.75, 0) | 1.0 × 1.05 × 0.82 | `#c85ac8` | purple fur | 6 |
| Belly bands ×6 | surface bands lifted 0.03, every 0.2 from y offset −0.62 to +0.55 | belly front | 0.17 tall; half-width 0.58 − 0.05·abs(i − 2.5) (0.455–0.555) | `#d8782a` | orange fur | 6 |
| Green lines ×6 | surface lines lifted 0.038, above each band | belly front | 0.018 tall; 0.05 narrower than the band | `#6aff4a` | unlit | — |
| Chrome rails ×2 | vertical surface strips lifted 0.045, framing the bands | x ±0.5–0.6, y offset −0.66 to +0.58 | | `#9ca3ae` | chrome | 120 |
| Shoulder balls ×2 | spheres | (±1.02, 2.18, −0.02) | 0.56 × 0.52 × 0.55 | `#c85ac8` | purple fur | 6 |
| Arm rings ×2 | torus, horizontal, tilted 0.22 outward | round the top of each upper arm | R 0.42, tube 0.07 | `#9ca3ae` | chrome | 120 |
| Upper arms ×2 | ellipsoid | see Proportions | 0.36 × 0.62 × 0.38 | `#c85ac8` | purple fur | 6 |
| Gill slits 3 per arm | boxes, tilted 0.1 | upper arm y −0.48, −0.60, −0.72 | 0.22 × 0.035 × 0.02 | `#3ae8f0` | unlit | — |
| Forearms ×2 | ellipsoid | see Proportions | 0.32 × 0.55 × 0.34 | `#c85ac8` | purple fur | 6 |
| Cuffs ×2 | cylinder + three indicator boxes | forearm | r 0.36, h 0.26; indicators 0.08 × 0.04 | cuff `#9ca3ae`; indicators `#3ae8f0` | chrome; unlit | 120 |
| Hands ×2 | ball | see Proportions | 0.30 × 0.26 × 0.30 | `#c85ac8` | purple fur | 6 |
| Hand claws 3 per hand | hooked tapered tubes curving down, forward and back, 0.1 apart | hand | r 0.05 → 0.012 | `#d8702a` | copper | 110 |
| Thighs ×2 | ellipsoid | leg pivot −0.35 | 0.42 × 0.55 × 0.44 | `#c85ac8` | purple fur | 6 |
| Knee domes ×2 | half sphere facing forward + cone spike forward | knee | dome r 0.3; spike r 0.08, h 0.2 | `#9ca3ae` | chrome | 120 |
| Feet ×2 | ellipsoid | (0, −0.85, 0.12) from the leg pivot | 0.42 × 0.26 × 0.55 | `#c85ac8` | purple fur | 6 |
| Toe claws 4 per foot | hooked tapered tubes | x −0.24, −0.08, 0.08, 0.24 | r 0.05 → 0.012 | `#d8702a` | copper | 110 |

The sockets are asymmetric: five on his right (−x), four on his left (+x), which lacks the low outer socket. All parts
are children of an inner group that breathes and rolls; arms and legs are pivot groups.

#### Palette

| Hex | Use |
| --- | --- |
| `#c85ac8` | Purple fur (main colour); name colour |
| `#f08ae8` / `#8a3a9a` | Light / dark purple fur strokes |
| `#d8782a` | Orange fur belly bands |
| `#f2a050` / `#a8501a` | Light / dark orange strokes |
| `#9ca3ae` | Chrome: arm rings, rails, bezel, sockets, collars, cuffs, knee domes and spikes |
| `#d8702a` | Copper: tusk-hoses, hand and toe claws |
| `#3ae8f0` | Cyan light: crown strips, gills, cuff indicators, socket bulbs |
| `#0a3a40` | Socket bulbs during their blink |
| `#6aff4a` | Green light lines above the bands |
| `#04120c` / `#061a10` | Screen background / scanlines |
| `#9aff9a`, `#3ad86a` | Screen pixels |
| `#3ad86a`, `#2a9a5a` | Screen equaliser bars |

#### Surfaces and materials

- **Fur stroke tile (bespoke):** 256 px filled with the base colour; 2600 short straight strokes, 3–8 px long, at
  random angles, in one of the two stroke colours, opacity 0.35–0.75, width 1.2–2.8 px; seeded (purple 5, orange 9).
  Repeat 3 × 3 (purple) and 2 × 2 (orange). The same tile is the bump map (bump 0.05). Phong shininess 6, specular
  `#111111`: matte.
- **Shaggy geometry:** every fur ellipsoid and segment has its vertices pushed in or out along the normal, ±0.0175 on
  bodies and ±0.006–0.007 on tentacles, keyed by a hash of position so seams stay closed.
- **Chrome:** Phong 120, white specular. **Copper:** Phong 110, specular `#ffeedd`.
- **Unlit glows:** cyan, green, bulbs and screen. Lights are only ever cyan and green.

#### Face

- **No eyeballs, brows, lids or mouth.** The face is the screen ringed by the nine light sockets, the crown strips
  above and the tentacle beard below. No smile.
- **Pulse:** the cyan strips, gills and indicators pulse together at 0.75 + 0.25·sin(2.2t + A), A a random phase.
- **Blink:** the nine bulbs go dark (`#0a3a40`) for 0.12 s every 5 s.
- **Screen idle:** a 128 × 96 canvas with a 16 × 12 grid of dashes, 55 % filled (30 % `#9aff9a`, the rest
  `#3ad86a`), scrolling vertically at 0.25 per second; random per load.
- **Screen dancing:** two hand-made frames alternating every beat at 88 BPM (`Ft`), each with 4 px scanlines, a
  blocky pixel figure in `#9aff9a` (head, body, arms, legs) mirrored between the frames, and six equaliser bars.

#### Animation

`A` is a random phase per instance.

| Motion | Formula | Note |
| --- | --- | --- |
| Breathing | inner group scale (s, 1/s, s), s = 1 + 0.012·sin(1.4t + A) | width swells as height eases |
| Ride height | 0.075 + 0.01·sin(1.4t + A) | |
| Arms idle | x 0.04·sin(1.2t + A + i); z ±0.05·sin(1.1t + A) | |
| Tentacle rest pose | root joint −0.28 (forward); later joints add 0.18, 0.26, 0.34 back toward the belly; outer tentacles fan out z = 0.12·(i − 1.5)·j²·0.35 | |
| Tentacle sway | x 0.1·p·sin(1.3t + 1.1i + 0.7j + A); z 0.07·p·sin(1.05t + 1.7i + 0.5j + A) | p = 1 idle, 1.7 walking, +1.5 during the talk hop |
| Walk | weight eased at 6/s; phase L at 4.5 rad/s; legs 0.35·sin(L + iπ); arms counter-swing −0.3·sin(L + iπ); bob 0.09·abs(sin L) | |

- **Talking:** `onTalk` triggers a hop of 0.55·sin(π·q/1.1) over 1.1 s with livelier tentacles; the shared wrapper
  adds its nod, squash and lift.
- **Greeting a gathering:** `singing()` makes one full turn about y in 1 s (ease in-out quad); emote ~ with a splash.
- **Planting:** "pat" at 1.4 rad/s, size 1.2: rz 0.168·sin 1.4t; rx 0.18·(0.5 + 0.5·sin 2.8t); y 0.03·abs(sin 2.8t).
- **Dance, his roll** (his own; weight Y eased in at 4/s while a dance flag is set):
  - roll: inner group rz 0.14·Y·sin 1.6t, the model lifted by 0.6·abs(sin(roll)) so the outer foot never dips;
  - bounce 0.22·Y·abs(sin 3.2t);
  - arms flung out sideways toward ±(1.75 + 0.45·sin(3.2t + iπ)) rad (just above horizontal, pumping); arm x
    −0.3·sin(1.6t + i);
  - legs 0.14·Y·sin(3.2t + iπ);
  - tentacles add 0.2·Y·sin(3.2t + i + 0.6j) and 0.25·Y·sin(1.6t + 1.4i);
  - the screen switches to its dancing frames once Y > 0.5.
  - Roll and bounce run at fixed rates (1.6 and 3.2 rad/s); only the screen frames follow the 88 BPM beat.
- No battle moves.
- **Vignettes:** gesture "nod" (rx 0.18·max(0, sin 4πu), y 0.03·sin πu), token a cube `#4af0a0`, emote !.

#### Construction constraints

- **Surface hugging:** strips, bands, rails and sockets are surface patches built on the ellipsoids.
- **Anti z-fight:** graded lifts: bands 0.03, green lines 0.038, rails 0.045; the screen plane 5 mm proud of the
  bezel.
- **Tentacle anti-clip:** each frame each joint tests two points along its segment (at −0.2 and −0.38) against the
  belly ellipsoid inflated by the segment radius + 0.03; while inside, the joint swings forward 0.09 rad, up to 10
  times.
- **Ground:** base lift 0.075; feet clear by about 1.5 cm and claws by about 6.5 cm at rest; dance roll lift
  0.6·abs(sin roll).

#### Do / Don't

- **Do** keep the two stacked ellipsoids, the upper set forward, with no neck.
- **Do** keep the fur shaggy, matte and lumpy: purple, with orange bands on the belly, each topped by a green light
  line.
- **Do** use chrome for rings, rails, bezel, sockets, collars, cuffs and knee domes, and copper for every claw and both
  tusk-hoses.
- **Do** keep the arms long, almost to the ground, and the legs short; four segmented tentacles hanging under the
  screen, fanning slightly.
- **Do** keep the 5 + 4 socket layout asymmetric (five on his right, −x).
- **Don't** add eyes, a mouth or a smile; don't use any light colour but cyan and green; don't make the fur glossy
  (shininess stays about 6).
- **Don't** let tentacles pass into the belly, or a foot dip during the roll.
- **Don't** carry any element of his design into the town's buildings or props: he is a visitor from another era.

### 3.16 NEXTESSA

This section specifies NEXTESSA's model, her pizza-box prop and her motion.

#### Overview

- **Lock.** Locked (the builder is marked final in code).
- **Builder and id.** Def `t_nextessa` (the pizza courier: no id; spawned as kind `courier` when the phone call's
  delivery is due, and removed after she leaves); builder `pk_nextessa` (`__R["nextessa"]`, packaged). Def: colour
  `#ef7536`, `bodyR` 0.92, `modelScale` 1.
- **Height.** 3.5 m, the tallest creature. Head top 3.13 m; pizza box top about 3.22 m at rest.
- **Shared layers.** Talk wrapper and ground fit (see 3.1). Like every creature she has no shared idle layer; her idle
  is her own breathing and segment wave.
- Every part is a sphere, cone or box; no KIT parts.

#### Silhouette and signature parts

- A tall, narrow, caterpillar-like column: a broad three-lobed base, a stack of three round segments with small spines,
  and a round head with a box snout. No arms or legs: she moves by hopping and squashing.
- Signature parts: (1) the flat pizza box on her head; (2) the stacked bead column with spines at each segment.

#### Proportions

| Part | Centre | Radii | Note |
| --- | --- | --- | --- |
| Base, back lobe | (0, 0.74, −0.2) | 0.74 × 0.72 × 0.66 | sits 2 cm up |
| Base, front-right lobe (−x) | (−0.41, 0.58, 0.22) | 0.57 × 0.58 × 0.54 | touches y 0 |
| Base, front-left lobe (+x) | (0.42, 0.60, 0.20) | 0.60 × 0.60 × 0.55 | touches y 0 |
| Segment 1 | y 1.32 | 0.45 × 0.38 × 0.43 | each segment nested in the one below |
| Segment 2 | +0.44 (y 1.76) | 0.42 × 0.36 × 0.40 | |
| Segment 3 | +0.42 (y 2.18) | 0.39 × 0.34 × 0.37 | |
| Head | +0.5 (y 2.68) | 0.46 × 0.45 × 0.45 | slightly wider than the top segment |
| Snout | head (0, −0.05, 0.5) | box 0.2 × 0.15 × 0.24 | protrudes about 0.17 |

Base footprint about 2.0 wide × 1.6 deep. Segments taper about 7 % per step; each is about 60 % of the base radius.

#### Anatomy

All materials are clay (Phong) with specular `#2a2018` unless noted.

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Base | three spheres baked into one vertex-colour mesh | see Proportions | | `#f47a3a` | clay | 26 |
| Segments ×3 | ellipsoids, nested | see Proportions | | `#f09460` | clay | 26 |
| Spines 2 per segment | cones, pointing forward and out (rotation π/2 − 0.3, splayed ±1.1) | (±0.8·rx, −0.15·ry, 0.5·rx) on each segment | r 0.065, h 0.14 | `#eea06c` | clay | 26 |
| Head | ellipsoid | y 2.68 | 0.46 × 0.45 × 0.45 | `#f09460` | clay | 26 |
| Snout | box | head (0, −0.05, 0.5) | 0.2 × 0.15 × 0.24 | `#e3875a` | clay | 26 |
| Eyes ×2 | spheres, mostly inside the head (about 2 cm proud) | head (±0.25, 0.13, 0.33) | r 0.045 | `#f2c21e` | clay | 60 |
| Glints ×2 | spheres, up and out from each eye | head (±0.265, 0.155, 0.37) | r 0.016 | `#ffffff` | unlit | — |
| Carry point | group | 0.45 above the head centre | | | | |

**The pizza box** is a game prop (`notModel`), not part of her model: built at 0.9 scale on the carry point, 3 cm
down, turned 0.35 rad. Kraft base `#d9c39a`, cream lid `#f3ece0`, seam `#a88b5e`, red edge trim and front tab
`#c8352c`; shininess 12. Lid art: a slice (crust `#e2a64c`, cheese `#f4cc4a`, five pepperoni `#c8352c`) and the word
"PIZZA" in red.

#### Palette

| Hex | Use |
| --- | --- |
| `#f47a3a` | Base orange (main colour) |
| `#f09460` | Segments and head |
| `#eea06c` | Spines |
| `#e3875a` | Snout |
| `#f2c21e` / `#ffffff` | Eyes / glints |
| `#2a2018` | Specular (warm dark tint) |
| `#ef7536` | Name colour (interface only) |

#### Surfaces and materials

- All clay: shininess 26 with specular `#2a2018` (satin) on the body; eyes 60.
- No textures, bump maps, KIT surface kinds or fur. The base uses vertex colours, all one orange.
- The only unlit parts are the glints.

#### Face

- **Eyes:** two small glossy yellow beads, each with one white glint; no pupils, lids or blink.
- **No mouth or brows.** The box snout is the only other facial feature.
- **Expression** is carried by head motion: a slow look-around and a quick nod when she speaks.

#### Animation

`u` is a random phase per instance; `i` the segment index.

| Motion | Formula | Note |
| --- | --- | --- |
| Breathing | base height 1 + 0.015·sin(1.8t + u); width 1 + 0.8·(1 − height) | |
| Segment wave | each segment rz 0.05·sin(1.5t + u − 0.7i); rx 0.035·sin(1.2t + u − 0.7i) | nested, so the sway compounds into a wave up the column |
| Head | nod 0.04·sin(2.1t + u); look 0.08·sin(0.9t + u) | |
| Walking (hop) | phase 9 rad/s; model rises 0.12·abs(sin) (about 2.9 hops/s); base squashes to 0.9 height, width up to 1.08 between hops; segments rz 0.1·sin(4.5t…), rx 0.07·sin(3.6t…), forward lean 0.05 | 3.2 m/s on deliveries, 3.6 m/s leaving |
| Pizza box (carried) | yaw 0.35 + 0.06·sin 1.3t; roll 0.05·sin 3t; bounce 8 mm at 6 rad/s while walking | |

- **Talking:** `onTalk` adds a decaying down-up head nod 0.25·sin(2π·m/0.8)·(1 − m/0.8) over 0.8 s; the shared talk
  wrapper also applies.
- **Planting, dancing, battles, vignettes:** none. She is never in the park except on a delivery, and never at the
  Garden Event.

#### Construction constraints

- The base lobes are baked into one vertex-colour mesh, so they read as one piece.
- The hop moves the spawn group, not the base, so squash and hop are independent.
- **Grounding:** the front lobes touch y 0 exactly and the squash scales about the base origin, so she never sinks.
- The pizza box rides the carry group and follows the head's nod and the column's wave.

#### Do / Don't

- **Do** keep the three-lobed base much wider than the column, and exactly three tapering segments, each with two small
  forward spines.
- **Do** keep the head round and slightly larger than the top segment, with a squared box snout.
- **Do** keep small glossy yellow eyes with one glint each, and a warm satin clay finish in two oranges.
- **Do** show her with the box flat on her head, slightly turned.
- **Don't** add arms, legs, a mouth, lids, pupils, fur or texture; don't make her shiny or glowing.
- **Don't** show her dancing, planting, at the Event or in vignettes.
- **Don't** make the pizza box part of her body.
- **Don't** carry any element of her design into the town's buildings or props: she is a visitor from another era.

### 3.17 BACKPACKA

This section specifies BACKPACKA's model and his fully scripted Garden Event flight.

#### Overview

- **Lock.** Locked: the model is final (marked final in code).
- **Builder and id.** No id. Built only by the Garden Event when he sets off (`const BP`); not a `born` creature: no
  talk wrapper, ground fit or compaction. Fully deterministic: `pose(e)` from the seconds `e` since he set
  off, so any moment can be shown (`JGP.backpacka.preview`). Shaders are compiled when he is built, before the music
  starts.
- **Size.** No root scale (1 unit = 1 m). Overall about 4–5 m long. Body skinny about 0.99 wide × 1.10 tall × 2.07
  long; fat about 2.09 × 1.98 × 2.66 m.
- He never walks, talks, plants, dances, visits or appears in vignettes.

#### Silhouette and signature parts

- A floating pear-shaped body with a very long, forward-curving banded neck to a small open-mouthed head; four long
  tube legs hanging below, ending in open pipes; two pairs of tall veined leaf-like wings rising and fanning back from
  the top of the back; a stubby upturned tail.
- Signature parts: (1) the neck that swells with gulps; (2) the glassy coloured patches; (3) the pipe feet that spray
  water; (4) the dragonfly wings.

#### Proportions

| Part | Value |
| --- | --- |
| Body | lathe along +z, profile (r, z): (0, −1.15) (0.55, −1.02) (0.86, −0.62) (0.95, −0.10) (0.86, 0.42) (0.62, 0.82) (0.42, 1.02) (0, 1.10); smoothed to 40 points, 40 segments; fullest (r 0.95) just behind centre |
| Swell (`fat` f, 0..1) | body scale (0.52 + 0.58f, 0.58 + 0.46f, 0.92 + 0.26f) |
| Attachment points (siblings of the body: they follow the swell without being stretched) | neck base (0, 0.42·fy, 0.86·fz); tail (0, 0.18·fy, −1.08·fz); hips (±0.42·fx, −0.6·fy, +0.48·fz front / −0.55·fz back); wing roots (±0.16·fx, 0.86·fy, +0.18·fz fore / −0.38·fz hind) |
| Neck | 10 segments of 0.27 (2.7 in all); radius 0.30 → 0.175, −0.0125 per segment; each an open cylinder 0.29 long plus a ball joint |
| Head | about 0.55 long; gaze and mouth along the neck |
| Legs | tube r 0.20 → 0.15, 1.62 down with a slight outward bow (x up to 0.14·sx); foot pipe adds about 0.3 |
| Wings (plane 0.62 × 1, scaled) | fore: three blades 3.0, 2.69, 2.31 long at fan angles 0.75, 1.02, 1.28 rad; hind: two blades 2.13, 1.88 at 0.22, 0.48 rad; each 0.78–0.96 wide |

#### Anatomy

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Body | lathe under a `tilt` group | origin | see Proportions | vertex gradient on local y: −0.95 `#ecb88e` (beneath), −0.2 `#da9a6c`, 0.9 `#c47a4c` (top) | `gradMat("skin")`, rep 6, bump 0.05: crackled skin | 30 |
| Patch rims ×7 | shrink-wrapped caps, 6 rings × 24 sectors, lifted 12 mm, polygon offset −1 / −2 | on the body | patch size + 0.045 | `#f4e0c0` | clay | 30 |
| Glassy patches ×7 | as rims, lifted 24 mm | on the body | angular half-sizes 0.22–0.36 × 0.16–0.24 | `#f06a1a`, `#f0c81a`, `#c8941e`, `#e02a7a` | sand (rep 1, bump 0.05), specular white | 110 |
| Neck segments ×10 | open cylinder + ball | neck chain | r 0.30 → 0.175 | `#d48e64` | skin (rep 3, bump 0.05) | 30 |
| Neck stripe | boxes along the top at 0.93 r | each segment | 0.07 + 0.012k wide, 0.04 tall | `#7ab83a` | skin (rep 2, bump 0.02) | 50 |
| Collar rings ×3 | torus | segment 1 at z 0.05 / 0.12 / 0.19 | R 0.305, tube 0.028 | alternating `#141210` and `#8ac83a` | clay | 40 / 60 |
| Skull | sphere | head (0, 0.05, 0.10) | (0.21, 0.19, 0.28) | `#d48e64` | skin | 30 |
| Snout | sphere | head (0, 0, 0.34) | (0.16, 0.085, 0.20) | `#d48e64` | skin | 30 |
| Jaw | sphere, hinged at (0, −0.07, 0.12) | (0, −0.03, 0.18) | (0.14, 0.055, 0.20) | `#d48e64` | skin | 30 |
| Mouth inside | sphere | (0, −0.06, 0.28) | (0.12, 0.05, 0.15) | `#a83a3a` | clay | 20 |
| Tongue | sphere on the jaw | jaw (0, 0, 0.2) | (0.09, 0.025, 0.12) | `#e8707a` | clay | 30 |
| Head crest | sphere | head (0, 0.2, 0.06) | (0.10, 0.06, 0.30) | `#7ab83a` | stripe skin | 50 |
| Nostrils ×2 | spheres | (±0.04, 0.07, 0.53) | r 0.012 | `#141210` | clay | 40 |
| Eyes ×2 | non-KIT eye built like the standard one (see Face) | groups (±0.12, 0.19, 0.16), yaw ±0.5, pitch −0.25 | sclera r 0.10 | see Face | | |
| Eye rings ×2 | torus round each eye | eye group | R 0.1, tube 0.018 | `#7ab83a` | stripe skin | 50 |
| Tail | tapered tube (0, 0, 0.1) → (0, 0.32, −0.38) | tail point | r 0.16 → 0.035 | `#d48e64` | skin | 30 |
| Legs ×4 | tapered tube, 4 points down to y −1.62 | hips | r 0.20 → 0.15 | `#d48e64` | skin | 30 |
| Foot pipes ×4 | open cylinder, double-sided | leg end, y −0.1 | r 0.155 / 0.17, 0.3 tall | `#d48e64` | skin | 30 |
| Pipe lips ×4 | torus | y −0.25 | R 0.165, tube 0.025 | `#e8a87a` | skin | 40 |
| Pipe plugs ×4 | disc, double-sided (dark depth) | y −0.04 inside the pipe | r 0.15 | `#3a1a12` | clay | 10 |
| Wings ×10 blades | plane per blade, painted leaf texture | wing roots | see Proportions | texture (below) | Phong, alphaTest 0.45, double-sided, specular `#888888`, emissive `#0c2a22` | 90 |
| Gulp | sphere riding up the neck | neck segment k | scale 0.33 − 0.015k + 0.04·sin | `#d48e64` | skin | 30 |
| Water jets ×4 | ring tubes, 22 × 8 rings, scrolling streak texture | from the pipes | r 0.1 → 0.23 | `#d8f2ff`, emissive `#3a6a80`, opacity 0.5 | transparent | — |
| Drops | 420 particles | jets | size 0.16 | `#e8f8ff` | | — |

**Wing texture** (128 × 512 px): a leaf outline coloured from rim to centre `#2f5a26` → `#3f8a4a` → `#2aa08e` (centre)
→ `#3f8a4a` → `#2f5a26`; 420 crackle strokes in rgba(40, 30, 20, 0.55); a 4 px midrib `#3a2a18` with side veins every
34 px; 40 pale cells in rgba(160, 230, 190, 0.22); a 5 px rim `#a8e878` with a `#4a3a22` outline.

#### Palette

| Hex | Use |
| --- | --- |
| `#ecb88e` → `#da9a6c` → `#c47a4c` | Body, pale beneath to warm on top (main colour) |
| `#d48e64` | Neck, head, tail, legs, pipes |
| `#7ab83a`, `#8ac83a` | Neck stripe, crest, eye rings; collar rings |
| `#141210` | Collar rings, nostrils |
| `#f06a1a`, `#f0c81a`, `#c8941e`, `#e02a7a` on `#f4e0c0` | Glassy patches on cream rims |
| `#a83a3a`, `#e8707a` | Mouth inside, tongue |
| `#fbf8f0`, `#7a4a1e`, `#0c0c10` | Sclera, iris, pupil |
| `#e8a87a`, `#3a1a12` | Pipe lips, pipe plugs |
| `#2f5a26`, `#3f8a4a`, `#2aa08e`, `#a8e878` | Wings |
| `#d8f2ff` (emissive `#3a6a80`), `#e8f8ff` | Water jets, drops |
| `#e8302a`, `#ff8a1a`, `#ffd23a`, `#4ac83a`, `#3a9ae8`, `#5a4ad8`, `#a04ad8` | Rainbow (with Seeds only) |

#### Surfaces and materials

- **Body:** crackled skin with a vertex gradient (shine 30, bump 0.05), matte; the patches over it are glossy sand
  (shine 110, white specular) on cream clay rims.
- **Neck, head, limbs:** skin (30); stripe and crest skin at 50.
- **Wings:** painted translucent cards (alpha test), glossy (90), faintly self-lit (emissive `#0c2a22`).
- **Unlit:** the eye glints. The jets are transparent and emissive.

#### Face

- **Eyes:** sclera r 0.10 `#fbf8f0` (shine 90); iris disc r 0.06 `#7a4a1e` (shine 80); pupil r 0.03 `#0c0c10` at
  0.101; glint r 0.012 white at (+0.025, +0.025, 0.1). Lid: upper half-sphere r 0.108 in the green stripe skin, open
  at −0.6 (wide open), blinking to 0.35; a deterministic blink of 0.14 s every 4.1 s. A green torus ring sits round
  each eye.
- **Mouth:** always a little open: jaw 0.12 + 0.06·sin 3e, and 0.25 while drinking (neck > 0.9).

#### Animation

The whole flight is a function of `e`, seconds since he set off.

| Phase | Time (s) | Motion | Wing amp / freq |
| --- | --- | --- | --- |
| Fly in | 0–16 | Bézier from far off over a mid point at 18 m; pitch 0.15 → 0 | 0.35 / 22 |
| Reach down | 16–20 | neck into the drinking pose | 0.3 → 0.15 / 18 |
| Drink | 20–34 | hover bob 0.04·sin 2e; pitch 0.3; fat 0 → 1 with a 0.04·sin 5.2e wobble; a gulp runs up the neck 1.15 times a second; three pond ripple rings | 0.12 / 14 |
| Lift | 34–38 | neck up, sagging 0.25 m | 0.28 / 26 |
| To the garden | 38–50 | Bézier via 7.5 m to a hover at y 4.9, sagging 0.35·sin(πq): flying heavily | 0.42 / 28 |
| Legs splay | 50–52 | legs out to rx −0.55·sz, rz 0.6·sx | — |
| Spray | 52–67 | 1.5 slow turns; fat 1 → 0.15; four jets | 0.32 / 24 |
| Legs back | 67–69.5 | rises 0.3 m | 0.3 / 22 |
| Fly off | 69.5–84 | Bézier away, turning the short way to his heading over the first quarter | 0.4 / 24 |

- **Roll:** constant 0.05·sin 1.1e.
- **Neck:** each segment blends between UP (−0.34, −0.18, −0.12, −0.2, −0.24, −0.2, −0.04, 0.12, 0.24, 0.3) and DOWN
  (0.85, 0.35, 0.16, 0.06, 0, 0, −0.05, −0.08, −0.1, −0.1); up, it sways 0.03·sin(1.3t + 0.6k). Head pitch
  −0.25 + 0.55·neckDown.
- **Legs at rest:** rx 0.18 + 0.08·sin(2.1t + k) − 1.3·neckDown; rz 0.05·sin(1.7t + 2k).
- **Wings:** flap.z = −sx·(0.9 + amp·(0.5 + 0.5·sin(freq·t + ph))); the hind pair runs 1.4 rad behind the fore pair.
- **Jets:** reach = (4.2 + 4.6·(0.5 + 0.5·sin(1.25e + 1.7k)) + 3.2·fat)·pressure; streak texture scrolls at −2.2/s;
  420 drops of size 0.16 under 9.8 m/s² gravity. With Seeds, plants bloom where the water lands and a rainbow ring
  (radius 12.2–14.2, up to 0.42 opacity) comes out.

#### Construction constraints

- Patches are shrink-wrapped onto the lathe and lifted (rims 12 mm, faces 24 mm, polygon offset), never cutting in;
  each shows its cream rim from every side.
- Attachment points follow the swell but are not scaled by it: legs, wings and neck keep their size.
- Neck cylinders are 2 cm longer than the segment step and ball-jointed, so the chain never opens.
- The pipe feet read hollow: a double-sided pipe, a dark plug inside, a lip torus.

#### Do / Don't

- **Do** keep the pear body fullest just behind centre, paler beneath and warmer on top.
- **Do** keep the swell range (0.52 → 1.10 wide) and the slim-down after spraying.
- **Do** keep the patches glossy (110) over a matte crackled skin (30, bump 0.05).
- **Do** keep every motion a pure function of time since he set off.
- **Don't** scale the attached parts with the body, or let the patches z-fight.
- **Don't** give him a walk, talk or dance, or let the jets run past their pressure envelope.
- **Don't** leave an open tube without a dark plug.

### 3.18 THE ANCIENT

This section specifies THE ANCIENT's model and its slow motion in the Cave.

#### Overview

- **Lock.** Locked: the code marks THE ANCIENT and the Cave final and locked.
- **Builder and id.** Made by the church's own builder with a low, dark, glossy body. Id `slug`;
  on-screen name ANCIENT, name colour `#9a7a5a`; station def `{ name: "ANCIENT", stationary: true }`, height 0.7,
  `bodyR` 1.1, `vig` false. Not a `born` creature: the room is made static and only the moving parts update their
  matrices. `JGP.slug` exposes it for tests.
- **Size.** Lying, about 4.5 m long (spine about 4.3 m plus the head), at most about 0.46 m wide; back top about
  0.24 m.
- **Placement.** Across the middle of the secret room's floor. It never moves from its spot, never turns, never
  dances or plants. It is talked to only from inside the room (range 3.2 m, solid radius 0.6, top 0.8).

#### Silhouette and signature parts

- A long, low, glossy near-black tube, thin at the tail and blunt at the head, curving gently across the floor in an
  S, with a smooth mantle hump over its front third.
- Signature parts: (1) two long fine eye-stalks with knobs (and two short stubs) on the head; (2) the mantle with its
  breathing pore; (3) the wet keel along the back.

#### Proportions

| Measure | Value |
| --- | --- |
| Spine | six path points (room frame), scaled × 1.15 about (−0.07, −11.65): (−0.794, −13.662), (−0.507, −12.857), (−0.047, −12.053), (0.240, −11.132), (0.355, −10.328), (0.643, −9.638); about 4.3 long |
| Radii along the spine | 0.03, 0.10, 0.165, 0.23 (widest, at the middle), 0.205, 0.18 |
| Section | whole body group squashed to 0.62 in y: low and oval; centre line at y 0.15 × 0.62 = 0.093 |
| Ground contact | the underside dips about 8 cm below the floor top (0.03), so the contact line reads flat with no gap |
| Mantle | about 0.51 wide, 1.26 long |

#### Anatomy

"Skin" is the grooved canvas (see Surfaces) on Phong colour `#707070`, specular `#909090`, shininess 110.

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Body, tail to middle | tapered tube over points 0–3 | spine | r 0.03 → 0.23 | skin map | skin | 110 |
| Body, middle to head | tapered tube over points 3–5 | spine | r 0.23 → 0.18 | skin map | skin | 110 |
| Keel | tapered tube along the path at y 0.15 + 0.96·r | spine top | r 0.012 → 0.022 | `#3a3024` | Phong, specular `#b0b0b0` (wet) | 140 |
| Head | sphere (squashed with the body) | point 5, y 0.15 | r 0.19 | skin map | skin | 110 |
| Tail tip | tapered tube from the tip to 55 % back + tip ball; pivots at point 1 | tail | r 0.034 → 0.075; ball r 0.036 | `#403634` | Phong, specular `#606060` | 60 |
| Mantle | sphere, yaw 0.25 | (0.31, 0.25, −10.615) | scale (0.253, 0.15, 0.63) | skin map | skin | 110 |
| Mantle lip | torus inside the mantle | mantle y −0.35 | R 0.92, tube 0.07 (mantle units) | `#403634` | Phong, specular `#606060` | 60 |
| Breathing pore | sphere | mantle (−0.93, 0.25, −0.22) | r 0.16 (mantle units) | `#1a1008` | Phong, specular `#909090` | 90 |
| Stalk head group | group, yaw −0.45 | point 5 + (0.05, y 0.183, +0.1) | | | | |
| Upper stalks ×2 | tapered tube (0, 0, −0.07) → (0, 0.012, 0.23) → (0, 0.04, 0.42) + knob; pitch −0.55, yaw ±0.34 | (±0.055, 0.02, 0) | r 0.03 → 0.013; knob r 0.021 | skin map | skin | 110 |
| Lower stalks ×2 | same form at a quarter of the curl, no knob; pitch −0.15 | (±0.055, −0.075, 0.03) | 0.11 long, r 0.024 → 0.012 | skin map | skin | 110 |
| Damp trail | flat ribbon behind the tail, no depth write | y 0.034 | 5.5 cm wide, tapering | `#2e2b22`, opacity 0.38 | Phong | 130 |

#### Palette

| Hex | Use |
| --- | --- |
| Near-black olive | Granular body base |
| Dark olive-black | Fine lengthwise striations |
| `#707070` | Colour multiplier on the skin map |
| `#3a3024` | Keel |
| `#403634` | Tail tip and mantle lip (a shade paler) |
| `#1a1008` | Breathing pore |
| rgba(200, 190, 170, 0.5) | Pale flecks |
| `#2e2b22` | Damp trail |
| `#9a7a5a` | Name colour (interface only) |

#### Surfaces and materials

- **Skin canvas:** 512 × 128 px, granular near-black olive with fine longitudinal striations and scattered pale mineral flecks. Glossy skin and specular highlights give a damp sheen.
- **Keel:** 140, the wettest line. **Tip and lip:** 60, softer. **Trail:** translucent sheen (130, opacity 0.38).

#### Face

- No eyes, lids, blink or mouth. Its "face" is the stalks and their knobs.

#### Animation

`kT` is the talk weight, eased at 3/s. All motion is slow: 0.2–0.9 rad/s, amplitudes of a few percent.

| Motion | Formula | Note |
| --- | --- | --- |
| Look | head yaw −0.45 + look; look → 0.25·sin 0.21t + 0.1·sin 0.53t, eased at 2/s, held at 0 while talking | |
| Talk | head pitch −kT·(0.22 + 0.05·abs(sin 5t)); stalks reach up a further 0.25·kT | lifts its head and nods; never turns to the player |
| Body | y scale 0.62·(1 + 0.012·sin 0.7t) | settles and swells |
| Tail tip | yaw 0.07·sin(0.35t + 1) | slow curl |
| Head creep | 0.025·sin 0.31t forward and back | |
| Breath | b = sin 0.9t; mantle × (1 + 0.03b, 1 + 0.06b, 1); pore 0.6 + 0.4·max(0, b) | the pore opens with each breath |
| Stalks | pitch −up − 0.25·kT − 0.12·sin(0.6t + k); yaw ±(0.35 + 0.1·sin(0.45t + 2k)) | |
| Stalk pull | every 11 s each upper stalk (5.5 s apart) pulls in over 2.2 s to 30 % length (scale z 1 − 0.7·pull), then creeps back out | |

- **Lines:** "I am the one reborn."; at the Event, "Hello"; given a Blossom, "...".
- **Planting, dancing, walking:** never.

#### Construction constraints

- Every stalk starts 7 cm inside the head, so it stays connected in every pose.
- The keel rides at 96 % of the body radius, so it stays proud of the top along the whole length.
- The trail never runs under the body.

#### Do / Don't

- **Do** keep it lying flat, low (× 0.62), glossy and near black, with the paler tail tip and mantle lip.
- **Do** keep every motion slow, and talk as a head lift and nod only.
- **Don't** move it, turn it to the player, plant or dance it.
- **Don't** add eyes or a mouth, or detach or shorten the stalk roots.

### 3.19 The birds

One Blue Jay perches on a branch of one park tree. It is about twice life size so its silhouette reads from the paths. Its blue crest, white face and belly, dark neck collar, black-and-white barred wings, pointed beak, small dark eyes and long blue tail identify it.

The body rests on two feet gripping the bough. Transform pivots support breathing, slow head turns, tiny folded-wing adjustments and tail balancing. Motion remains gentle; the bird never takes flight or leaves its tree. It does not talk, accept gifts, visit, plant or dance. It remains present through the Garden Event. Robin and Cardinal are removed and unlocked.

### 3.20 The player's avatar

This section specifies the player's avatar, a permanent part of the game.

#### Overview

- **Lock.** Locked: the model is final (marked final in code).
- **Scope.** Part of the final game: it is never cut with the test modes. It is hidden during VR play (the VR player
  sees only their hands) but appears in the Shop's mirror while the Shop menu is open, in VR included. In the desktop
  and mobile test modes it is also the third-person figure the camera follows. Its walk animation (`dkAnim`) is
  test-mode code.
- **Character.** A cartoony figure, never a likeness of anyone: copper hair in a low ponytail with a navy tie,
  freckles, a small quiet mouth, and the default outfit, a yellow sundress with a print of small white flowers,
  a navy belt and dark trainers.
- **Builder and id.** An inline builder assigned to `At` at spawn; parts on `At.userData` (`legL`/`legR`, `armL`/`armR`,
  `skirt`, `head`, `ponyL`/`ponyR`, `bow`, `eyes`, `dressMat`, outfit parts). No scale (1 unit = 1 m); faces +z.
  Colours come from the config `player`: skin `#f4dcc6`, hair `#c2551f`, dress `#f3c43a`; movement speed 4.5 m/s,
  body radius 0.6.
- **Height.** About 2.35 m to the top of the hair (head centre at 1.98 m).
- The code names the −x limbs `L` and the +x limbs `R`; by the side convention the −x side is her right.

#### Silhouette and signature parts

- A round head (large for the body) on a short neck, a cylindrical bodice over a flared cone skirt, thin tapered limbs
  with ball hands, rounded shoe pads; the ponytail hangs at the back of the head.
- Signature parts: (1) the copper hair and low ponytail with its navy tie; (2) the flared yellow skirt with its
  flower print; (3) the freckles over nose and cheeks.

#### Proportions

| Part | Centre | Extent |
| --- | --- | --- |
| Legs | hip pivots (±0.12, 0.7, 0) | 0.62 long, r 0.085 → 0.075 |
| Skirt | y 0.92 | y 0.64–1.20; r 0.2 at the waist, 0.46 at the hem |
| Bodice | y 1.38 | y 1.16–1.60; r 0.18 top, 0.2 bottom |
| Arms | shoulder pivots (±0.245, 1.56, 0) | 0.48 long, r 0.058 → 0.05; hands at −0.5 |
| Neck | y 1.64 | 0.12 tall, r 0.055–0.06 |
| Head | y 1.98 | r 0.34; hair to about 2.35 |
| Ponytail | head (±0.032, −0.04, −0.3) | two hanks about 0.53 long |

#### Anatomy

Clay is Phong with specular `#1c1c1c`; shininess 14 unless given.

| Part | Form | Position | Size | Colour | Surface | Shininess |
| --- | --- | --- | --- | --- | --- | --- |
| Legs ×2 | tapered cylinder, 8 sides, hanging from the hip | (±0.12, 0.7, 0) | r 0.085 → 0.075, 0.62 long | `#f4dcc6` | clay | 14 |
| Shoes ×2 | sphere | leg-local (0, −0.63, 0.05) | r 0.1 × (1.05, 0.62, 1.6) | `#30343f` | clay | 14 |
| Skirt | cone frustum, 16 sides | (0, 0.92, 0) | r 0.2 → 0.46, 0.56 tall | printed dress map on white | clay, unique material | 14 |
| Bodice | cylinder, 12 sides | (0, 1.38, 0) | r 0.18 → 0.2, 0.44 tall | dress map | clay | 14 |
| Belt | cylinder, 16 sides | (0, 1.2, 0) | r 0.213, 0.07 tall | `#32466e` | clay | 14 |
| Buttons ×2 | spheres | (0, 1.44, 0.19) and (0, 1.32, 0.19) | r 0.022 | `#ffffff` | clay | 14 |
| Arms ×2 | tapered cylinder from the shoulder pivot | (±0.245, 1.56, 0), built tilted 0.12 rad out | r 0.058 → 0.05, 0.48 long | `#f4dcc6` | clay | 14 |
| Hands ×2 | sphere | arm-local (0, −0.5, 0) | r 0.068 | `#f4dcc6` | clay | 14 |
| Puff sleeves ×2 | sphere | arm-local (0, −0.02, 0) | r 0.085 × (1.15, 0.9, 1.1) | dress map | clay | 14 |
| Neck | cylinder | (0, 1.64, 0) | r 0.055 → 0.06, 0.12 tall | `#f4dcc6` | clay | 14 |
| Head | sphere | group (0, 1.98, 0) | r 0.34 | `#f4dcc6` | clay | 14 |
| Hair cap | partial sphere (polar 0–1.3 rad), tipped back 0.32 | head (0, 0.01, −0.03) | r 0.36 | `#c2551f` | clay | 14 |
| Back hair | partial sphere: 2.7 rad round the back, polar 1.15–2.30 rad | head (0, 0, −0.035) | r 0.355 | `#c2551f` | clay | 14 |
| Ears ×2 | spheres | head (±0.335, −0.02, 0) | r 0.065 × (0.6, 1, 0.8) | `#f4dcc6` | clay | 14 |
| Eye whites ×2 | spheres, groups yawed ±0.35 | head (±0.12, 0, 0.29) | r 0.062 × (1, 1.1, 0.62) | `#ffffff` | clay | 14 |
| Irises ×2 | spheres | eye-local z 0.026 | r 0.037 | `#3a2416` | wet: Phong, specular `#666666` | 70 |
| Glints ×2 per eye | spheres: a main glint up and toward +x, a small cool one down and toward −x | eye-local (0.013, 0.016, 0.058) and (−0.013, −0.013, 0.059) | r 0.0126 and 0.006 | `#ffffff`, `#dfe8ff` | unlit | — |
| Brows ×2 | boxes, rotation (0, ±0.35, ∓0.12) | head (±0.125, 0.1, 0.31) | 0.11 × 0.02 × 0.02 | `#c2551f` | clay | 14 |
| Nose | sphere | head (0, −0.06, 0.34) | r 0.024 | `#e8a888` | clay | 14 |
| Mouth | half-torus arc, rotated (0.3, 0, π): a small upturned arc | head (0, −0.13, 0.315) | R 0.05, tube 0.01 | `#a03848` | unlit | — |
| Blush ×2 | flat circles, yawed ±0.45 | head (±0.19, −0.08, 0.29) | r 0.045 | `#ff9ac8`, 55 % opacity, no depth write | unlit | — |
| Freckles ×7 | flattened spheres (× (1, 1, 0.35)) on the face surface | head x −0.14 to 0.15, y −0.025 to −0.068 | r 0.0085 | `#dca47f` | clay | 14 |
| Ponytail hanks ×2 | elongated sphere + tip sphere | groups head (±0.032, −0.04, −0.3); spheres at (±0.008, −0.24, −0.02) and (∓0.006, −0.53, −0.04) | r 0.095 × (0.78, 2.5, 0.78); tip r 0.05 × (0.7, 1.4, 0.7) | `#c2551f` | clay | 14 |
| Hair tie | torus, rx 1.42, + knot sphere | head (0, −0.13, −0.33); knot at (0, 0.02, 0.085) | R 0.088, tube 0.026; knot r 0.034 | `#32466e` | clay | 14 |

#### Palette

| Hex | Use |
| --- | --- |
| `#f3c43a` | Default dress yellow (main colour) |
| rgba(240, 243, 248, 0.92), `#cddcf0` | Print flowers: petals, centres |
| `#f4dcc6` | Skin |
| `#c2551f` | Hair, brows |
| `#32466e` | Belt, hair tie |
| `#30343f` | Shoes |
| `#3a2416` | Irises |
| `#e8a888` | Nose |
| `#a03848` | Mouth |
| `#ff9ac8` | Blush |
| `#dca47f` | Freckles |
| `#8fd0f2`; `#ffc93a`, `#ff9f1c`, `#ffd65a`; `#ffb52e` | Sun Dress: ground; sun rays, disc, highlight; hem band |
| `#e8301e`, `#ff6a1a`, `#ffc23a`, `#a8200e`; `#3f8a2a`, `#4f9a2a` | Flower Hat: petals red, orange, yellow, heart; cup and leaves |
| `#4caf3a`, `#cfe58a`, `#3f9a32`, `#2e7d32`, `#e8c43a`, `#1a1a1a`, `#1f4a1c` | Frog Shoes: body, belly, feet, spots, eyes, pupils, mouth line |

#### Surfaces and materials

- **Default dress print:** a 128 px canvas on `#f3c43a` (seed 5): nine six-petal flowers (petal radius 4–5.8 px,
  rgba(240, 243, 248, 0.92), centre `#cddcf0`) and 24 dots (r 1.1 px, 80 % white); repeat 4 × 1.5. The dress
  material's colour is set to white so the map shows true.
- Everything else is plain clay (matte, 14) except the wet irises (70) and the unlit glints, mouth and blush.

#### Face

- Two eyes with white sclerae, dark brown wet irises and two glints each; straight copper brows; a small nose; a small
  upturned unlit arc for a mouth; pink blush circles; seven freckles across the nose and cheeks.
- **Blink:** both eyes close (scale y 0.1) for 0.12 s every 2–5 s.

#### Animation

`dkAnim` drives her each frame. The walk weight `k` eases toward the stick amount at 8/s; the walk phase `w` advances
9 rad/s while moving; `st` = 1 − k.

| Motion | Formula | Note |
| --- | --- | --- |
| Legs | rx ±0.5·k·sin w (opposite per leg) | hip pivots |
| Arms | rx ±0.45·k·sin w (each against the leg on its side) + 0.04·st·sin(1.3t + j); rz 0.21 outward always | held out so the hands clear the skirt |
| Bob | y 0.05·k·abs(sin w), applied just before rendering | the player's body stays at y 0 for collisions |
| Skirt | rz 0.06·k·sin w; scale y 1 + 0.012·st·sin 2.1t | sways walking, breathes still |
| Head | rx 0.05·k·(abs(sin w) − 0.5) + 0.03·st·sin 2.1t; ry eased at 3/s toward a look target | nods on steps |
| Look (still) | every 2.5–5.5 s a new target: centre (40 %) or ±0.55 rad | |
| Ponytail | rx 0.25·k·sin(w − 0.9) + 0.18·k·abs(sin w); rz ±(0.12·k·abs(sin w) + 0.04·st·sin(1.6t + j)) | swings a beat behind the stride, then settles |
| Turning | heading eased toward the move direction at 12/s | |

#### Outfits

Bought at Garden Supplies (3 Flint each); each part is hidden until worn (`Eo.apply`).

| Outfit | Build | Replaces |
| --- | --- | --- |
| Flower Hat | group on the head at (0, 0.33, −0.02), tipped −0.12: a green cup (sphere × (0.24, 0.09, 0.24)), six leaves curling out over the hair at radius 0.2, seven red flame petals (cones 0.1 × 0.34, tilt 0.78), five orange (0.08 × 0.29), three yellow (0.05 × 0.2) round a dark red heart (r 0.075); one vertex-colour Phong mesh, emissive `#3a0800`, shininess 40 | the hair tie |
| Sun Dress | the dress map swapped for a 128 px sky-blue canvas (seed 9) of golden suns (ten pointed rays, a disc r 11.5 px and a highlight r 7.5 px), tiled seamlessly, repeat 4 × 1.5; a gold hem band (torus R 0.46, tube 0.016) on the skirt's bottom edge, so it sways and breathes with it | the default print (taking it off restores the print, never a bare colour) |
| Frog Shoes | per leg, a little frog over the foot facing forward: body (× (0.125, 0.07, 0.19)), pale belly as the sole, haunches, webbed front feet with three toe beads, four spots on the curve of the back, bulging golden eyes with dark pupils, nostrils, and a closed mouth line round the front; one vertex-colour clay mesh, shininess 50 | the shoes |

#### Construction constraints

- The walking bob is applied only to the rendered position; collisions use y 0.
- The Sun Dress hem rides on the skirt mesh, so it follows the skirt's sway and breathing.
- The Flower Hat and the hair tie are never shown together.

#### Do / Don't

- **Do** keep her cartoony and generic: round head, simple tapered limbs, flared skirt.
- **Do** keep the default outfit: the yellow sundress with its white flower print, navy belt, dark trainers, copper
  ponytail with a navy tie.
- **Don't** model her on any real person, or add any likeness, name or personal detail.
- **Don't** show her in VR.



## 4. Creature style

This part describes the visual and motion language of the Greeblis cast: the patterns that make a creature look and
move like the cast, and the measures by which an existing creature can be compared with it. **Everything in this part
is guidance, not a set of hard rules** (the owner's ruling): keep it in mind, but do not act on it unless asked. The
binding rules (locks, the smile rule, no z-fighting) are in section 8. Part 3
documents each model part by part; this part states the rules, cites the creatures that set them, and lists every
established exception. Individual model locks are described in section 0; every design locks at release. Where a rule and
a locked model differ, the model stands and is listed here as an approved exception. The shared creature-making system
is in 3.1; each creature's geometry and behaviour are specified in part 3.

---

### 4.1 Style pillars

The eight principles below are the test of belonging; every later section expands one of them.

1. **One whole creature.** Each creature is one design (silhouette, palette, signature parts), never parts stuck
   together. Its main mass is one continuous form: a blended skin (SPARKAKUS, ZOLLOD, GLYPH, KING DINO, ETCHER, MAMA
   GORBO), a smoothed lathe (GOOWARD, GEMTOE, MUSHROOM, BACKPACKA), a tube (THE ANCIENT), a stack of ellipsoids
   (FORTIZMO, HENNRICK, NEXTESSA) or, for a machine, one stack of square boxes (ANOMALEE). When a shape is ambiguous,
   ask the owner; never guess.
2. **Big and friendly.** Residents stand 2.0 to 3.5 m in game and are met at eye level (the VR view is lifted 1.5 m:
   5.2). Nothing is grim, gory, sharp-toothed or threatening; teeth appear only on ANOMALEE's keyboard jaw, and only
   while it is open.
3. **A silhouette that reads at 15 m.** One to three signature parts break the outline and identify the creature as a
   black shape against the sky (4.2).
4. **One identity colour.** One saturated hue owns the creature and follows it into its name tag, messenger, home and
   storefront; it is graded or banded along the body and set off by one to three accent hues (4.3).
5. **Toy-like forms, painted surfaces.** Simple smooth volumes carry a painted surface tile (scales, fur, felt, goo,
   porcelain, pixel art); light is painted into the colour (darker creases, lighter tops), never faked with shadows; a
   satin or matte body carries a few very glossy accents (4.4).
6. **Calm, understated faces.** Eyes are small to moderate, a little hooded and carry one glint; mouths are closed
   lines, beaks or jaws that open for speech, or absent. No cartoon smiles: three locked models carry approved small
   smiles (4.5).
7. **Gentle motion with a signature.** Motion is slow sines with occasional eased events; each creature has one
   signature secondary motion (an ear flick, a jelly wobble, a shake, a glitch, drifting Zs); talk is a rhythm, not lip
   sync; every tilt is paid for with a lift, and nothing clips or sinks (4.7).
8. **The job shows on the body.** A creature's role reads from a worn or carried marker (a hat, a badge, an apron,
   drumsticks, a horn, a screen face), never from words (4.9). Every texture is painted on a canvas in code and every
   sound is synthesized; no external files.

---

### 4.2 Silhouette and proportion

This section fixes how tall a creature is, how its parts are proportioned, which body archetype it uses and how its
silhouette is tested.

**Height bands** (in game, including model scale; the declared height drives the name tag and talk view)

| Band | Height in game | Creatures |
| --- | --- | --- |
| Small | 2.0 to 2.6 m | MUSHROOM 2.0 m (hat top about 2.3 m; the only creature under the player's height; posted on a 1.5 m desk), GEMTOE 2.54 m (wing and crest tips about 2.8 m), ZOLLOD 2.6 m (head flowers about 2.45 m) |
| Standard | 2.75 to 3.15 m | GLYPH 2.78 m (horn coils about 2.9 m), FORTIZMO 2.93 m (ear tips about 3.05 m), MAMA GORBO 2.95 m, MONTGUMMERY 2.97 m (visible top 2.92 m), HENNRICK 2.99 m (visible top 3.11 m), SOMLET 3.0 m (floating; cap top about 2.47 m, Zs above 3 m), ETCHER 3.02 m (visible top about 2.9 m), KING DINO 3.1 m, ANOMALEE 3.14 m (highest geometry 2.85 m) |
| Tall | 3.2 to 3.5 m | GOOWARD 3.2 m, SPARKAKUS 3.31 m (ear tips 3.13 m), NEXTESSA 3.5 m (head top 3.13 m, pizza box about 3.22 m) |
| Outsize | by length | BACKPACKA, about 4 to 5 m long, body 1.10 to 1.98 m tall as he swells; THE ANCIENT, lying, about 4.5 m long and 0.24 m high |
| Wildlife | about twice life size | the Blue Jay (about 0.55 m beak to tail) |

- A new resident should fall in the small, standard or tall band; the standard band is the default. The outsize band is
  reserved for legendary or ancient beings.
- Width is generous: most creatures are at least half as wide as they are tall, and the ground-spreading ones are wider
  than tall (MAMA GORBO's puddle 2.9 m, GOOWARD's ring 3.08 m, MUSHROOM's cap 2.52 m, HENNRICK's arm span 2.96 m,
  ETCHER's tentacles 4.3 m from his centre, GLYPH 3.8 m nose to tail). Narrow columns stand on a broad base (NEXTESSA's
  three-lobed base is 2.0 m wide).

**Proportions measured on the cast** (model units; eye radius is the eyeball or bead radius)

| Creature | Head : total height | Eye radius | Eye diameter : head width | Legs : height | Arms |
| --- | --- | --- | --- | --- | --- |
| SPARKAKUS | 0.21 (1/4.6) | 0.066 | 0.22 | 0.24 | short (0.66), mitts |
| ZOLLOD | 0.23 | 0.075 | 0.25 | 0.22 | short (0.66), four fingers |
| GLYPH | 0.26 | 0.105 (glowing) | 0.29 | 0.21 | short (0.56), held up in front |
| ETCHER | 0.18; head 0.36 of base width | 0.085 | 0.31 | none (two front feet) | none |
| KING DINO | 0.39 (head with muzzle) | 0.082 (bead) | 0.14 | 0.28 | very short (0.36 tube) |
| GEMTOE | 0.20; head : trunk 0.37 | 0.073 (glowing) | 0.20 | none (floats) | none |
| MUSHROOM | face on the stem; cap 1.1 × height in width | 0.095 | 0.19 | two foot pads | none |
| MAMA GORBO | head-body 0.67 | ports 0.44 and 0.32 | big port 0.40 | none | none |
| MONTGUMMERY | 0.37 (screen head); head : body width 1.06 | screen face | screen face | 0.27 | long tubes to mid-thigh, hands × 2.1 |
| ANOMALEE | 0.34 (monitor); monitor : body width 1.24 | screen | screen | 0.30 | one side arm |
| HENNRICK | 0.43 (upper ellipsoid) | light sockets | light sockets | 0.15 visible | very long (about 0.6 of height) |
| FORTIZMO | 0.24; head : body width 1 : 1.6 | 0.044 (bead) | 0.09 | wheels | short |
| NEXTESSA | 0.29 | 0.045 (bead) | 0.10 | none | none |
| SOMLET | one body; cap 0.30 of body height | closed lids 0.36 wide | 0.22 per lid | none (floats) | detached puff hands |

**Proportion rules**
- Heads are large: 0.2 to 0.26 of the height on animal bodies, 0.34 to 0.43 on screen-headed and machine bodies and on
  KING DINO; on drop and box bodies (MAMA GORBO, GOOWARD, SOMLET) the head is the body.
- Eyes are moderate, not huge. A standard (KIT) eye has a radius of 0.066 to 0.105 m, 2.4 to 4.2 % of the model's
  height, and a diameter of 19 to 31 % of the head's width. Bead eyes are deliberately tiny (FORTIZMO 0.044,
  NEXTESSA 0.045, about 1 to 1.5 % of height).
- Limbs are short and rounded: legs 21 to 30 % of the height, arms about a quarter of it, every joint a ball of 0.9 to
  1.1 × the limb radius. The two long-armed exceptions are part of their design: HENNRICK (arms to near the ground)
  and MONTGUMMERY (tube arms to mid-thigh with large hands).
- Bodies are bottom-heavy or centred, never top-heavy except where the head is a screen or a crown of plumage: pear,
  egg, barrel, bell, drop, stack or box.
- Repeated parts come in mirrored pairs or in small graded sets of 3, 4, 5, 6 or 7 (GEMTOE's four tails, ETCHER's six
  tentacles, SOMLET's seven roots, KING DINO's five crown prongs, GOOWARD's three wing spikes a side).

**Body archetypes**

| Archetype | Construction | Creatures |
| --- | --- | --- |
| Upright blended biped | One blended skin (softness 0.16 firm, 0.20 to 0.22 fleshy); KIT legs and arms, or simple stubs | SPARKAKUS (barrel, upright wolf), ZOLLOD (pear, upright), GLYPH (pear, crouching, tail on the ground), KING DINO (bottom-heavy, gummy) |
| Goo drop | Blended goo skin (softness 0.30), flat sole on a puddle; no limbs | MAMA GORBO |
| Lathe egg in a ring | Smoothed lathe egg with fused bubbles, seated in a float ring; no limbs | GOOWARD |
| Floating lathe trunk with fans | Pear lathe trunk, two wing pairs, ground-spread tails; floats a few cm up | GEMTOE |
| Bell mound with tentacles | Blended bell rising into a long neck; six tentacles on the ground | ETCHER |
| Plush ellipsoid stack | Egg body and round head with no neck, matte fur, seams or bands | FORTIZMO (on wheels), HENNRICK (two stacked ellipsoids, long arms) |
| Screen-headed machine | A screen or monitor head on a body, the face drawn on the screen | MONTGUMMERY (CRT on an egg body, pot boots), ANOMALEE (monitor on a box quadruped) |
| Dome on a stem | Wide lathed dome cap on a fat lathed stem, face on the stem | MUSHROOM |
| Floating box | Rounded superellipsoid floating over hanging roots | SOMLET |
| Bead column | Broad lobed base, a stack of tapering beads, round head | NEXTESSA |
| Flying lathe pear | Swelling lathe body, segmented neck, tube legs, leaf wings | BACKPACKA |
| Lying tube | One long tapered tube lying on the floor, eye-stalks | THE ANCIENT |
| Wildlife | Small ellipsoids with box tails, bead eyes | the Blue Jay |

A new creature typically uses one archetype; a new archetype is a decision for the owner. Two creatures of one archetype differ in
their signature parts, never only in colour.

**The signature-part rule**
- Every creature has one to three signature parts (listed in 4.8) that break the body's outline in at least one of
  three ways: they rise above the head (SPARKAKUS's ears, KING DINO's plume, GOOWARD's crests, GLYPH's horns,
  FORTIZMO's ears, SOMLET's cap, MUSHROOM's hat, NEXTESSA's pizza box), they reach out past the body's width
  (GEMTOE's wings, HENNRICK's arms and ring halos, FORTIZMO's raised horn, ANOMALEE's snout, SPARKAKUS's tail) or they
  spread over the ground (ETCHER's tentacles, GEMTOE's tails, GLYPH's coiled tubes, GOOWARD's roots, MAMA GORBO's
  puddle and tail, SOMLET's roots).
- At least one signature part moves on its own in idle (4.7), so the outline is alive at a distance.

**The read-at-distance check** (guidance)
1. Render the creature as a solid black shape against the sky at 10 m and at 15 m, from the front, the side and the
   three-quarter view.
2. Pass: a viewer who knows the cast names it from the black shape alone in every view, and every signature part shows
   in at least two of the three views.
3. Fail: the shape could be taken for another cast member (for example a new upright reptile with no part that
   SPARKAKUS, ZOLLOD, GLYPH or KING DINO lacks), or a signature part only reads in colour.

---

### 4.3 Colour

This section fixes how a creature's colour is chosen, where it recurs, how it is graded and how accents and neutrals
are used.

**Rules**
- **One identity colour per creature.** One saturated hue (mid lightness, high chroma) is the body's dominant colour
  and the creature's colour everywhere: the body, the name tag and talk colour (`def.color`), the messenger it throws in
  a vignette, its home and its storefront emblem (1.7, 6.1). A new creature should use its identity colour, or a lighter
  tint of it, for all of these.
- **Distinct across the cast.** A new identity colour should not repeat a cast member's hue at a similar lightness; the
  cast covers royal blue, peach, cyan, crimson, teal, teal-blue, porcelain blue, lemon, orange, cream, orange-gold,
  jade, magenta-and-cyan, purple and near-black brown (table below).
- **Graded, not flat.** The identity colour is graded or banded along the body's long axis, painted into the vertex
  colours (table below). Flat single-colour bodies are an exception (NEXTESSA, the one untextured creature).
- **One to three accents.** Accent hues are saturated and contrast the identity colour (complementary or far round the
  wheel), sit on small parts, and usually recur on more than one part, so they read as a system (accent table below).
- **Neutrals are tinted.** Near-blacks are warm or tinted (`#0c0c10` pupils, `#141418` claws and visors, `#16161a`
  noses, `#2a1010` mouth arcs, `#1a2228` outlines, `#1d2a23` MONTGUMMERY's body); pure `#000000` is never used. Whites
  are cream (`#fbf8ee` sclera, `#f2ead0` nails, `#efe2c0` ivory, `#f6f4ee` piping, `#fffaf0` warts). Pure `#ffffff` is
  kept for glints, pixel faces, emote fills and highlights.
- **Established exceptions** (locked; not a pattern for new creatures): four creatures' tag colours differ from their
  bodies, each echoing a part instead (GEMTOE's orchid echoes her amethysts, ETCHER's pale green his gem, GLYPH's rose
  his red glyph and orange eyes, SPARKAKUS has no colour of his own and falls back to the interface orange); several
  messengers take an accent rather than the body hue (table).

**Identity colours and where they recur**

| Creature | Identity colour | On the body | Name and talk colour | Messenger (vignettes) | In the town (1.7) |
| --- | --- | --- | --- | --- | --- |
| SPARKAKUS | royal blue `#2c4cc0` | painted body, ears, limbs, tail, eyelids | interface orange `#ff7a2f` (default) | card `#2a50c8` | home and genealogical society in royal blue `#2c4cc0`, his gold star on both |
| MAMA GORBO | peach `#ff9f5c` | the whole goo body, drips, puddle `#f08a48` | `#ff9f5c` | goo `#e8409e` (her magenta stream) | home peach `#ffb486` with a magenta door and cyan shutters (her stream colours); the water tower in `#ff9f5c`; the diner's goo shake |
| GOOWARD | cyan `#30b4e4` | upper body `#34b6ea` over a peach base | `#30b4e4` | goo `#4ac8f0` | the ice cream parlour's winged cone; shares the Gorbos' home |
| GEMTOE | crimson `#a82228` | trunk scales, ruff `#b8282e`, wings | orchid `#c870d0` | gem `#2ae070` | the gem exchange in crimson brick `#8a2a2a`, an amethyst `#9a5ad0` over the walk |
| MONTGUMMERY | teal `#55b8c6` | bezel; pots `#3db2d6`, hands `#7cc6ea`, chest disc `#4cb6e0` on a near-black body `#1d2a23` | `#55b8c6` | coin `#3db2d6` | home in teal `#55b8c6`; the video store's teal front; teal arches and trim at Mistergummery's; the filling station canopy |
| ETCHER | teal-blue `#2a8a9e` to `#2a5aa8` | body and bell scales | pale green `#9ee09a` | card `#e050b8` | the archive in blue-teal stone with green trim `#9ee09a` |
| GLYPH | porcelain blue `#4a9ad8` | body, limbs, tail | rose `#e88a8a` | tile `#f2c84a` | the sign shop in porcelain blue `#9ab4d0` with gold and his red trident |
| KING DINO | lemon `#f9dc22` | skin, grading to gold `#eeb41a` | `#e8c020` | crown `#ffc81e` | home lemon `#f2d84a` with a turquoise door; his crown on the picture house bill and the billboard |
| FORTIZMO | orange `#e8742a` | fur | `#e8742a` | note `#ff8a3a` | her home's door `#e8742a`, a gold horn on its porch |
| SOMLET | cream `#f2e4b4` | felt body, puffs, hands | `#ecd8b6` | letter `#fbf8f0` | home cream `#f2e4b4` with a navy door |
| MUSHROOM | orange-gold `#f8b83a` to `#e46a14` | cap | `#e8862a` | spore `#fffaf0` (his warts) | home cream with his cap for a roof, door `#e8862a` |
| ZOLLOD | jade `#3cbe94` (the middle of his cyan-to-green bands) | body bands | `#3cbe94` | sprout `#6ac83a` | the grocer's, his five pots on its band |
| ANOMALEE | cyan `#2fd4e6` with magenta `#e01ce0` | monitor `#29c7d9`, magenta screen, cyan stripes `#18d6ee` on olive `#b3c48f` | `#2fd4e6` | pixel `#e030e0` | home grey with a magenta door `#c010c0` and cyan shutters `#2fd4e6`; the television repair's magenta screens |
| HENNRICK | purple `#c85ac8` | fur | `#c85ac8` | cube `#4af0a0` (his lights' green) | none (nothing of his is in the town) |
| NEXTESSA | orange `#f47a3a` | base and segments `#f09460` | `#ef7536` | none | none |
| BACKPACKA | warm tan `#c47a4c` with leaf green `#7ab83a` | body, neck stripe, wings | none | none | his shape only: the hedge on the courthouse lawn, the fire station weathervane |
| THE ANCIENT | near-black brown `#3a2c22` | grooved body | `#9a7a5a` | spore `#c8b890` (its vignettes are switched off) | none |

**Gradients and bands** (baked into vertex colours; the direction is the rule)

| Creature | Gradient or banding |
| --- | --- |
| KING DINO | Skin lemon `#f9dc22` turning gold `#eeb41a` below 0.75 m (fully gold by 0.15 m); creases toward `#dc8e16`. Crown `#1a7cb4` → `#2aa8d8` → `#4cc8e6` upward. Plume along its curve, back to front: `#4a1890` → `#6c20bc` → `#9228d6` → `#b02ac4` → `#e0386e` → `#ff6a26` → `#ff8e2a` → `#ffb64e` |
| GOOWARD | Peach below to cyan above: `#f2a274` → `#f6b48c` → `#62c8ea` → `#34b6ea` → `#2a9ee0`, the change quick at mid-body |
| ETCHER | Teal `#2a8a9e` at the base to blue `#2a5aa8` at the head, with a soft ±0.04 lightness ripple |
| ZOLLOD | Six bands, head to feet: `#35d0c8` → `#38c8b0` → `#3cbe94` → `#42b676` → `#48ae58` → `#4ca83c`, with seam rings 22 % darker on the body only (the head and neck are seamless) |
| MUSHROOM | Cap gold `#f8b83a` at the crown → `#f08a22` → deep orange `#e46a14` at the rim, closed by a darker rim band `#d0600e` |
| MAMA GORBO | Tops lighter and base darker (±0.025 lightness), goo runs paler; tail `#a8cc22` lit to `#f4ff9a` along its top and front |
| GLYPH | Tops lighter (+0.05 lightness above 1.2 m) |
| GEMTOE | Crest `#ffb030` at the front → `#f07a2a` at the back; wing layers darkest outside, lightest inside (`#a8222a` → `#c4302e` → `#d8463a`); ruff lighter toward the top |
| BACKPACKA | Pale `#ecb88e` beneath → `#da9a6c` → warm `#c47a4c` on top; wings dark rim `#2f5a26` → teal centre `#2aa08e` |
| Screens | MONTGUMMERY's radial `#7f52c8` → `#5a33a0`; ANOMALEE's handheld radial `#ff5af0` → `#c010c0` |
| Every card | Root × 0.6 brightness to tip × 1.15 (ruffs, plumes, wings, crests) |
| No gradient | SPARKAKUS (the painted pattern carries the colour), FORTIZMO and HENNRICK (two-tone fur strokes), SOMLET (two creams alternate on her puffs), NEXTESSA (two flat oranges), ANOMALEE (pixel-art casing), THE ANCIENT (grooved texture) |

- Gradients run along the body's long axis: height on upright bodies, the curve on plumes, tails and tubes.
- The lower end is the deeper or warmer value (KING DINO's gold, ZOLLOD's green, MUSHROOM's rim, ETCHER's teal) or a
  different hue altogether (GOOWARD's peach); the top catches the light. BACKPACKA is the one body that is paler
  beneath, as a flying creature seen from below.

**Accents**

| Creature | Accent hues | Where they recur |
| --- | --- | --- |
| SPARKAKUS | gold `#ffd23a`/`#f2c21a`, orange `#e8862a`, cream `#f2ecd8` | star, irises, daffodils, vines; paws and feet; ruff |
| MAMA GORBO | lime `#a8cc22`, magenta `#d8338a`/`#e8409e`, cyan `#36d0e8`, violet `#9a52e0`, red `#e8423a` | tail; port rims and a stream; streams; lenses and a stream; orbiting pins |
| GOOWARD | lime `#c8f03a`, magenta `#e040c8`, purple `#7a3ad8`, gold `#e8b42c` | float ring, cheek spot, roots; under-ring, port rims, cheek spot; ports, cheek spot; leaf crests |
| GEMTOE | amber `#ffb030`/`#ffc22a`, purple `#8a34e0`/`#b070ff` | crest and eyes; the four amethysts |
| MONTGUMMERY | orange `#e2521f`, gold `#f0c23a`, purple `#7f52c8` | toe caps, heels and soles; boot lacing; the screen |
| ETCHER | purple `#7a4ab8`/`#7a3ab8`, green `#6ad02a`, gold `#c8a020` | tentacles and crown knobs; chest gem; irises |
| GLYPH | gold `#e0b03a`, orange `#ff5a14`, navy `#2c4a7c`, purple `#8a2ab8`, red `#d0222a` | horns, shield, filigree; eyes and a tube; plates; tiles; the shield's "R" and the tiles' tridents |
| KING DINO | turquoise `#2cb2dc`, purple-to-orange plume, lime `#b8ff4a` | crown, buttons, joints, hip rings, back plate; plume; button lights |
| FORTIZMO | cream `#efe6d2`, gold `#f0c040`, chrome `#b8bec8` | belly; valves; wheel legs |
| SOMLET | navy `#2a3a6a`, gold `#e8b830`, plum `#b04870` | cap; envelope badge; root tentacles |
| MUSHROOM | white `#fffaf0`, gold `#e8b830`, brown `#8a5a32`, pink `#ffaac4` | warts; star and hat star; hat; blush |
| ZOLLOD | magenta `#e040c8`, pink `#ff5fb0`, yellow `#ffd83a`, olive `#7a8a44` | trunk tip and tail tip; flowers; plumes; apron |
| ANOMALEE | magenta `#e01ce0`, cyan `#18d6ee`, wood `#a8743e` | screen and handheld glow; stripes, cross centres, keypad, button; peg leg |
| HENNRICK | orange `#d8782a`, chrome `#9ca3ae`, copper `#d8702a`, cyan `#3ae8f0`, green `#6aff4a` | belly bands; rings, rails, bezel, sockets, cuffs, knees; claws and tusk-hoses; light strips, gills, bulbs; band lines and the screen |
| NEXTESSA | yellow `#f2c21e` | eyes |
| BACKPACKA | green `#7ab83a`, orange `#f06a1a`, yellow `#f0c81a`, ochre `#c8941e`, magenta `#e02a7a` | neck stripe, crest, eye rings; the seven glassy patches |
| THE ANCIENT | paler brown `#403634` | tail tip and mantle lip |

- Gold (`#e0b03a` to `#ffd23a`) is the cast's shared accent for things of value or office: stars, horns, badges,
  valves, lacing, filigree. Magenta, lime, turquoise and cyan are the shared bright accents.

---

### 4.4 Surface and finish

This section fixes the surfaces creatures are painted with, how glossy each kind of part is, how light is painted and
where glows are allowed.

**Surface kinds on the cast** (the KIT tiles of 3.1: a 256 px greyscale tile tinted by the colour and used as its own
bump map)

| Surface | Creature use |
| --- | --- |
| scale | GEMTOE's trunk, tails, brows and horns; ETCHER's body, bell scales, feet and tentacles; ZOLLOD's body, arms, trunk, legs and tail |
| fur | SPARKAKUS's paws and feet; the birds' bodies, heads and wings |
| feather | GEMTOE's head; ZOLLOD's two plumes; card ruffs, plumes and wings (SPARKAKUS, GEMTOE, KING DINO) |
| fabric | ZOLLOD's apron and pocket; MUSHROOM's gill blades |
| felt | SOMLET's body, puffs, hands, lids and cap crown; MUSHROOM's hat |
| metal | GLYPH's gold horns (brushed lines and scratches) |
| goo | MAMA GORBO's body, drips, tail and streams; GOOWARD's body and drips |
| skin | KING DINO's body, crown and fittings; MUSHROOM's cap; SOMLET's root tentacles; BACKPACKA's body, neck, head and legs |
| soft | MUSHROOM's rim band and collar skirt |
| plastic | GEMTOE's beak; ANOMALEE's monitor, jaws, router, cables and handheld |
| rubber | GOOWARD's float ring |
| wood | MUSHROOM's stem; ANOMALEE's peg leg |
| leaf | ZOLLOD's four fern fronds |
| sand | MUSHROOM's warts; BACKPACKA's glassy patches |
| grass | ZOLLOD's back garden bed |
| (none) | NEXTESSA: plain satin clay with no tile, the one untextured creature |

- One surface kind carries the body; one or two others carry accents. Bump runs from 0.004 to 0.01 on smooth surfaces
  (MAMA GORBO's goo, plastic, metal), 0.02 as the standard, 0.03 on textured ones (scales, warts, grass) and 0.04 to
  0.05 on crackled or furred ones (KING DINO's peel, BACKPACKA, the fur-stroke tiles).
- **Cards.** Ruffs, plumes, crests and wings are built of many thin cards: vane cards narrow to a point over a raised
  shaft (SPARKAKUS's fin, GEMTOE's wings), fur cards curl (SPARKAKUS's ruff, GEMTOE's ruff, crest and cheek tufts),
  leaf blades lie along the flow (KING DINO's plume, about 700 blades). Each card shades from a dark root to a light
  tip, its root sunk into the skin, double-sided.
- **Tubes.** Tails, horns, tentacles, hoses and stalks are tapered tubes, ridged where segmented, with closed rounded
  tips (4.6).

**Shininess scale** (Phong shininess; cast examples)

| Range | Reads as | Cast examples |
| --- | --- | --- |
| 1 to 12 | Matte | MONTGUMMERY's code shell 1; FORTIZMO's and HENNRICK's fur 6; ANOMALEE's casing 8; ZOLLOD's moss 8, apron 10; MUSHROOM's gills 10; SOMLET's felt 12; the birds' plumage 6 to 10 |
| 14 to 30 | Satin | clay default 14; MUSHROOM's hat 14; eyelids 20; ANOMALEE's plastic parts 20; SPARKAKUS's painted skin 22; the KIT default and MUSHROOM's stem 25; NEXTESSA 26; feather cards 25 to 30; BACKPACKA's skin 30 |
| 40 to 75 | Glossy | ZOLLOD's scales 40; MONTGUMMERY's body and bezel 40; KING DINO's skin 50; MUSHROOM's cap 55; GLYPH's porcelain 55; GEMTOE's scales 60; ETCHER's body 70; GOOWARD's float ring 70 and jelly 75 |
| 80 to 110 | Very glossy | KIT sclera and iris 80; ETCHER's bell scales and tentacles 80; GLYPH's plates 80; MAMA GORBO's tail 100; KING DINO's turquoise 100 to 110; GLYPH's gold horns 110; HENNRICK's copper 110; BACKPACKA's glassy patches 110; THE ANCIENT's body 110 |
| 120 to 170 | Wet or jewel | MAMA GORBO's skin 120; HENNRICK's and FORTIZMO's chrome 120; MUSHROOM's gold stars 120; SPARKAKUS's nose 130; THE ANCIENT's keel 140; FORTIZMO's valves 140; GOOWARD's lenses and crystal wings 140; GLYPH's and GEMTOE's eyes 150; KING DINO's eyes 160; the gems (GEMTOE's amethysts, ETCHER's chest gem) 170 |

- **Contrast of finish.** A body is matte, satin or glossy; very glossy and jewel finishes are kept for small parts:
  eyes, noses, claws, gems, metal, stars, lenses. The body is very glossy only when it is wet: MAMA GORBO (120) and THE
  ANCIENT (110).
- **Specular.** White or high-grey specular (`#888888` to white) only on wet, chrome, metal or gem parts; satin and
  matte parts keep a dark specular (`#1c1c1c`, `#222222`, `#444444`). GOOWARD's jelly takes a cyan-tinted specular
  (`#99ddff`).
- **Faceting.** Bodies are smooth-shaded; flat shading is reserved for crystal, gems and hardware: GEMTOE's amethysts,
  ETCHER's gem, GOOWARD's crystal wings, ANOMALEE's boxes and peg fittings.

**Painted shading, not shadows**
- Light is painted into the vertex colour: creases darken by crease depth, tops lighten, colour grades along the body.
  No cast-shadow tricks, no ambient-occlusion decals.
- Crease darkening is set by how firm the body is: MAMA GORBO 3 % (goo barely creases), ETCHER 10 %, ZOLLOD 12 % (plus
  his 22 % seam rings), GLYPH 12 %, SPARKAKUS 16 %; KING DINO's creases blend up to 60 % of the way to a darker gold
  `#dc8e16`. A new blended body darkens its creases by 10 to 22 %.
- Blend softness sets the character of a blended skin: 0.16 firm (SPARKAKUS, ZOLLOD), 0.20 to 0.22 fleshy (ETCHER,
  GLYPH, KING DINO), 0.30 goo (MAMA GORBO).
- Plush bodies are roughened instead of creased: FORTIZMO's and HENNRICK's sculpted geometry is pushed in and out along
  the normal (body 0.03 and ±0.0175), so the fur reads lumpy and hand-sewn.

**Bespoke skins** (canvases painted in code for the most distinctive creatures)

| Creature | Bespoke skin |
| --- | --- |
| SPARKAKUS | Alebrije paint: 1,400 fine blue fur strokes under 14 winding vines with leaves, dots and five-petal flowers in gold, green, magenta, orange, teal and violet; on every blue part |
| GLYPH | Engraved porcelain: grey spirals under a glaze, tinted blue; navy plate tile with gold and teal filigree and gem dots; gold shield face with a red serif "R" |
| FORTIZMO | Fur-stroke tile: 2,800 short, mostly vertical two-tone strokes, very matte; cream for the belly |
| HENNRICK | Fur-stroke tile: 2,600 short strokes at random angles, purple and orange; pixel data screen |
| MONTGUMMERY | Scrolling code text in pale cyan over the dark body and limbs (0.04 to 0.05 texture units per second); the pixel faces on a purple gradient with an orange "gfxinfo" header |
| ANOMALEE | 32 × 32 pixel-art casing, nearest-filtered: diagonal cyan and grey stripes on olive, with a 1 px dark outline on every box face; magenta pixel screens |
| THE ANCIENT | Lengthwise grooves on near-black brown with pale flecks |
| BACKPACKA | Leaf-veined, crackled translucent wing blades |
| SOMLET | Her serif Zs (the only canvas on her) |

**Glows**
- **Unlit** (scene lights do not touch them): pupils, glints, KIT mouth arcs, every screen (MONTGUMMERY's face,
  ANOMALEE's head screen and labels, HENNRICK's screen and his cyan and green lights), KING DINO's button lights,
  FORTIZMO's face dots, MAMA GORBO's sparks and wet shines, GEMTOE's sparkles, SOMLET's Zs, SPARKAKUS's additive mist.
- **Emissive** (lit, with a self-glow): GLYPH's and GEMTOE's eyes, the gems (ETCHER's, GEMTOE's), MAMA GORBO's and
  GOOWARD's port lenses, GOOWARD's crystal wings, GLYPH's two tiles, ANOMALEE's handheld screen, BACKPACKA's wings
  (faintly), every vignette messenger.
- A body is never emissive. MUSHROOM's cap reads as glowing gold, but the glow is painted colour on a normally lit
  surface.

---

### 4.5 Faces

This section fixes the eye types, blinks, brows, mouths and the degree of expression a creature's face may show.

**Eye types**

| Type | Build | Creatures |
| --- | --- | --- |
| Standard KIT eye | Cream sclera `#fbf8ee` (very glossy), iris disc 0.6r in the creature's eye colour, unlit pupil 0.3r `#0c0c10`, one unlit white glint 0.14r at the upper left as the viewer sees it, a half-sphere lid 1.1r in the skin or lid colour resting at −0.25 to −0.3 rad | SPARKAKUS (r 0.066, gold iris `#f2c21a`, blue lid), ZOLLOD (0.075, violet-indigo iris `#3a2a6a`, cyan lid), ETCHER (0.085, gold iris `#c8a020`, blue lid), MUSHROOM (0.095, near-black iris `#1a1a20`, cream lid); BACKPACKA's eye is built the same way (0.10, brown iris `#7a4a1e`, wide open, ringed green) |
| Glowing eye | A self-lit ball with a dark vertical pupil, one glint, a heavy lid | GLYPH (orange `#ff5a14` with a hot core `#ffc040`, navy rim, lid at −0.45, heavy brow), GEMTOE (amber `#ffc22a`, vertical slit, lid at −0.5, side-set like a bird's) |
| Port | A bevelled octagon rim round a domed, self-lit lens with one glint | MAMA GORBO (magenta rims `#d8338a`, purple lenses `#8a3ad8`; asymmetric: big and high on her left (+x), small and low on her right (−x)) |
| "+" eye | A white cross outlined in dark ink, angled to the face | GOOWARD |
| Screen face | The face is a screen; no eyeballs | MONTGUMMERY (white pixel eyes and mouth on purple), ANOMALEE (a magenta screen with a corner glint bracket and a Wi-Fi icon, no face), HENNRICK (a green data screen ringed by nine cyan light sockets) |
| Bead | A small glossy bead, no lid or a plain lid | KING DINO (navy `#0c1838`, one glint, yellow rim, lemon lid), NEXTESSA (yellow `#f2c21e`, one glint, no lid), FORTIZMO (black `#0a0a0c`, no glint), the Blue Jay (black with a glint) |
| Sleeping lids | Closed lids with a downward-curving lash line, four lashes, a fold above and puffiness below | SOMLET (her eyes open, deep violet `#4a3c7a`, only while she says her Blossom thanks) |
| Stalks | Long knobbed eye-stalks, no eyes | THE ANCIENT |

**Eye rules**
- Eyes sit on the skin: placed by casting a ray onto the body, sunk 40 to 50 % of their radius along the normal, turned
  to face along it (3.1). Pairs are mirrored, set wide and high on the head (or low on the stem, MUSHROOM).
- Every eye carries exactly one glint. KIT eyes put it at the upper left as the viewer sees it; GLYPH's and KING
  DINO's are mirrored per eye. FORTIZMO's black beads are the one exception: they rely on the specular highlight.
- The standard lid leaves the eye calm and a little hooded; wide-open eyes are BACKPACKA's alone.
- A new creature uses the standard KIT eye unless its archetype is a machine (screen face) or its signature is the eye
  itself; a new eye type is a decision for the owner.

**Blink styles**

| Style | Timing | Creatures |
| --- | --- | --- |
| KIT blink: the lid swings to 1.75 rad and back | First after 1 to 5 s, then every 2.5 to 6.5 s, 0.18 s each, both eyes together | SPARKAKUS, ZOLLOD, ETCHER, MUSHROOM, GLYPH, GEMTOE, KING DINO |
| Lens squash: the lenses flatten to 6 % and back, rims still | First at 2.5 s, then every 2.5 to 6 s, 0.18 s each | MAMA GORBO |
| Squint: the "+" eyes squash to 25 % height | 0.16 s every 4.3 s | GOOWARD |
| Bulb blink: the nine socket bulbs go dark `#0a3a40` | 0.12 s every 5 s | HENNRICK |
| Lid blink, wide-open eyes | 0.14 s every 4.1 s | BACKPACKA |
| Screen glitch instead of a blink | Static every 5 to 13 s for 0.35 s | ANOMALEE |
| Stalk pull-in instead of a blink | Each upper stalk pulls in over 2.2 s every 11 s | THE ANCIENT |
| No blink | — | SOMLET (asleep), FORTIZMO, NEXTESSA, MONTGUMMERY, the birds |

**Brows**

| Creature | Brow | Reads as |
| --- | --- | --- |
| GEMTOE | Heavy, dark scaled ellipsoids angled over the eyes | stern, hooded |
| GLYPH | A body-blue ridge over each eye | calm, heavy-lidded |
| MUSHROOM | Brown bars, outer ends up, inner ends down | stern, official |
| SOMLET | A soft tube sloping down to the outside | relaxed, asleep |
| GOOWARD | Two wavy teal lines across the forehead | mild |
| All others | none | — |

**Mouths and the smile rule**
- **The rule:** no cartoony smiles. A mouth is a closed line, a beak, a jaw that opens only with speech (or drinking),
  or nothing. Ask the owner before giving any creature a smile.
- **Approved exceptions** (locked models; never a template): GOOWARD (a small dark arc with a pink ribbon tongue off
  its left (+x) side), MUSHROOM (a small dark arc that never opens), KING DINO (two thin brown smile lines on the lower
  muzzle, curling up at their outer ends, with a gap at the front centre).

| Mouth | Creatures |
| --- | --- |
| Closed dark line along each side of the muzzle or snout, never opens | SPARKAKUS (`#141c3a`), ETCHER (`#0e1a2a`), GLYPH (`#1c2c44`) |
| Approved small smile | GOOWARD, MUSHROOM, KING DINO (above) |
| Beak or jaw that opens with speech | GEMTOE (a pale hooked beak resting 0.22 rad open, opening up to 0.3 rad more per syllable), ANOMALEE (the keyboard-tray jaw chomps open, teeth showing only while it is open) |
| Jaw always a little open | BACKPACKA (wider while drinking) |
| Small breathing mouth | SOMLET (a dark oval with a felt lip, breathing between half and one and a half its size, wider with talk) |
| Screen mouth | MONTGUMMERY (a flat five-pixel line, opening into a hollow rectangle in two sizes as he talks; it never smiles) |
| No mouth | MAMA GORBO, ZOLLOD (the trunk is his expressive part), FORTIZMO (the trunk), HENNRICK (the tentacle beard), NEXTESSA (a box snout), THE ANCIENT; ANOMALEE's screen shows no face |

**Cheeks.** MUSHROOM has pink blush `#ffaac4` with three freckles over each cheek; GOOWARD has asymmetric colour
spots (magenta on his right (−x), lime on his left (+x), a small violet one). No other creature has cheek marks.

**Expression understatement**
- Faces are fixed. The only facial changes are blinks, a jaw or mouth opening with speech, MONTGUMMERY's swapped
  screen faces, ANOMALEE's glitches and equaliser, HENNRICK's screen frames and SOMLET's eyes opening for her thanks.
- Emotion is carried by the body and by signature parts: ears (SPARKAKUS), trunks (ZOLLOD, FORTIZMO), a tongue
  (GOOWARD), a cap tilt (MUSHROOM), tentacles (HENNRICK, ETCHER), stalks (THE ANCIENT), a shake (GLYPH), emotes (4.7).
- Never: teeth bared, frowns, tears, angry brows that move, wide-open "surprised" eyes, lip sync.

---

### 4.6 Limbs, appendages and attachments

This section fixes the options for legs, arms, hands and feet, the tubes, wings and cards that extend a body, and the
props and clothing a creature wears or holds.

**Legs and feet**

| Kind | Build | Creatures |
| --- | --- | --- |
| KIT leg, claw foot | Hip ball, plump thigh, tapering shin, knee ball; a pad with three toes and cone nails | SPARKAKUS (orange fur feet, black nails `#141418`), GLYPH (body-blue, ivory nails `#efe2c0`) |
| KIT leg, pad foot | As above with a cylinder pad and three nail beads `#f2ead0` | ZOLLOD |
| Stub leg, block foot | A thick foot cylinder with a toe ellipsoid | KING DINO |
| Stub leg, boot | A thigh stub into a pot boot with toe cap, heel, sole and lacing | MONTGUMMERY |
| Fur leg | Fur thigh, chrome knee dome with a forward spike, fur foot with four hooked copper toe claws | HENNRICK |
| Box leg | Thigh, knee and shin boxes, a box foot; one leg replaced by a wooden peg | ANOMALEE (peg on her back left (+x): iron-banded socket, rubber tip, knot and patch) |
| Wheel leg | A strut, chrome springs and a spoked wheel | FORTIZMO |
| Foot pads | Two cream ellipsoids trailing mycelium threads, on the root so they stay put | MUSHROOM |
| Front feet | Two small scaled feet with three cream claws `#e8e0c8`, no legs | ETCHER |
| Tube legs | Long tubes ending in open pipes (dark-plugged) | BACKPACKA |
| Bird legs | Thin legs, three toes | the birds |
| No legs | Glides, floats or lies | MAMA GORBO, GOOWARD, GEMTOE, SOMLET, NEXTESSA, THE ANCIENT |

- Feet stay level through every stride (3.1), so long toes never dig into the ground.

**Arms and hands**

| Kind | Build | Creatures |
| --- | --- | --- |
| KIT arm, mitt | Shoulder, upper arm, elbow ball, forearm; a round mitt with a thumb ball | SPARKAKUS (orange fur mitts, red garters) |
| KIT arm, three claws | Three ivory cones | GLYPH (arms held up in front) |
| KIT arm, four fingers | A palm and four finger cylinders | ZOLLOD |
| Short tube arm | A tube from a holed ball joint to a hand sphere | KING DINO (a drumstick always in each hand) |
| Long tube arm, big hand | A code-textured tube to a large four-fingered pale-blue hand with a thumb, palm to the body | MONTGUMMERY |
| Long fur arm | Fur ellipsoids, a chrome ring halo and cuff, three hooked copper claws | HENNRICK |
| Short fur arm | A fur ellipsoid with three finger beads and a thumb; a forearm shows only while the horn is up | FORTIZMO |
| Detached hands | Three-puff felt hands floating beside the body, no arm | SOMLET |
| Box arm | One side arm holding a handheld | ANOMALEE (on her left (+x)) |
| No arms | — | MAMA GORBO, GOOWARD, GEMTOE, ETCHER, MUSHROOM, NEXTESSA, BACKPACKA, THE ANCIENT |

- Arms move forward or out to the side only; they never cross the body or rise into the face or screen
  (MONTGUMMERY's robot, SPARKAKUS's funk, GLYPH's macarena reach "by the head" because his arms are too short to reach
  behind it).

**Tails, tentacles, hoses and roots**

| Creature | Appendage |
| --- | --- |
| SPARKAKUS | A long blue tail curling up to a gold star that trails pink-to-cyan mist |
| MAMA GORBO | A thick lime goo tail from her upper right (−x), round the front of her foot and up her left (+x); three goo streams down her back |
| GOOWARD | Nine pastel root tendrils splayed on the ground |
| GEMTOE | Four tails along the ground, each rising into a coil round an amethyst |
| MONTGUMMERY | A thin code-textured tail running out to his right (−x) and down to the ground |
| ETCHER | Six ridged purple tentacles lying on the ground, three a side, none straight forward or back |
| GLYPH | A heavy plated tail sweeping to his left (+x); two ribbed tubes coiled flat on the ground behind him (orange on his right (−x), grey on his left (+x)) |
| SOMLET | Seven plum root tentacles splaying out under her |
| ZOLLOD | A long tail with a magenta ball tip; a curling trunk with a matching tip |
| ANOMALEE | A short box tail; three cables hanging on her left (+x) |
| HENNRICK | Four segmented tentacles hanging like a beard; two copper tusk-hoses sweeping up beside the face |
| FORTIZMO | The trunk, which becomes the horn |
| THE ANCIENT | Two long knobbed eye-stalks and two short stubs |

- Every tube tapers thick to thin, is ringed where segmented, and is closed at both ends with a rounded tip or a bead
  wider than the tube; no hollow end may show. An open pipe is plugged dark inside (FORTIZMO's trunk, BACKPACKA's feet).
- Every root starts inside its parent (THE ANCIENT's stalks 7 cm in, GEMTOE's tails inside the trunk).
- Appendages that lie on the ground hang from the creature's root, not its breathing or swaying body (ETCHER's
  tentacles, GOOWARD's wings and roots, MUSHROOM's feet), and bend only upward in their own plane, so they lift rather
  than dig.

**Wings**

| Creature | Wings | Motion |
| --- | --- | --- |
| GEMTOE | Two pairs of fanned vane-card wings, three layers each (primaries, coverts, down); the upper pair near-vertical, the lower near-horizontal | slow sway; a flap while she glides |
| GOOWARD | Three faceted, translucent crystal spikes a side, fanned behind | constant flutter |
| BACKPACKA | Two pairs of tall veined leaf blades (dragonfly wings) | flight flapping, hind pair 1.4 rad behind |
| The birds | Ellipsoid wings | flutter only while hopping |

- Wings hang behind the shoulders and stay inside the talk view (GEMTOE is built at 0.78 inner scale for this).

**Cards.** Ruffs (SPARKAKUS's cream throat ruff, GEMTOE's red ruff), fins (SPARKAKUS's navy feather fin), crests
(GEMTOE's amber crest, cheek tufts) and plumes (KING DINO's) are card sets (4.4). A new creature that needs plumage uses
cards, never a solid shell.

**Props held or carried**

| Creature | Prop | Where |
| --- | --- | --- |
| KING DINO | Two drumsticks, pointing ahead, a little down and toed in | one in each hand, always |
| ZOLLOD | A garden trowel, blade pointing back | his left hand (+x) |
| ANOMALEE | A handheld with a glowing magenta scanline screen | her side arm, on her left (+x) |
| GLYPH | A gold heater shield with a red "R" | standing off his right flank (−x) |
| GEMTOE | Four amethysts | held in her tail coils |
| NEXTESSA | The pizza box (a prop, not part of her model) | flat on her head, slightly turned |
| FORTIZMO | Her horn | her own trunk, raised |

**Clothing, badges and fittings**

| Creature | Worn |
| --- | --- |
| SPARKAKUS | A black collar with an orange "APR" coin; red garters round the upper arms; four daffodils on his right shoulder (−x) |
| MAMA GORBO | Three red pin badges ("AP", "IP", Wi-Fi) and a purple Wi-Fi sign orbiting her head |
| GOOWARD | A small red octagon "AP" tag on the front left (+x) of his float ring |
| SOMLET | A mail carrier's cap: navy felt crown, darker band, white piping, glossy black visor, gold envelope badge |
| MUSHROOM | A brown sheriff's hat with a gold star on its band; a six-point gold sheriff's star on his left breast (+x) |
| ZOLLOD | An olive canvas apron with a pocket of three seed packets and leather ties |
| KING DINO | A turquoise five-prong crown; turquoise buttons with lights, hip rings, a holed back plate |
| ANOMALEE | An "adb" plate, a keypad and a labelled router box |
| FORTIZMO | Plush seams with black studs across a cream belly |
| HENNRICK | Chrome rails, cuffs, sockets and knee domes; belly bands with green light lines |

- Badges, coins, pins and plates sit on the skin with a lip or bevel, never floating or sunk.

---

### 4.7 Motion character

This section fixes how creatures move: idle life, breathing, signature motions, talk, walking, standing, planting,
dancing, battle moves, vignette gestures, emotes and greetings.

**Principles**
- Motion is built from slow sines at 0.2 to 2.2 rad/s with amplitudes of a few hundredths of a radian or a few percent
  of scale, plus occasional eased events (a flick, a glitch, a shake, a pull-in). Events are timed by their own clocks,
  never all at once.
- Each creature has one signature secondary motion (table below); it is what makes it look alive at 15 m.
- Talk is a rhythm, not lip sync. Dances are on a beat. Every tilt, nod or roll is paid for with a lift, so nothing
  sinks into the ground or a perch; nothing clips into the body or another part from any angle, at rest or in motion.
- Creatures move by turning parts and wrapper groups; there are no bones or skeletal rigs.

**Idle layers**
- Each model animates its own idle in its own step function; this is where breathing and signature motion live.
- There is no shared idle layer: no creature has engine-level breathing, idle actions or idle emotes (the owner's
  rule). Emotes appear only in Garden Event greetings, vignettes, Gorbo meetings and events (below).

**Breathing and idle sway**

| Creature | Breath or sway |
| --- | --- |
| SPARKAKUS | Height × (1 + 0.01·sin 2t) |
| MAMA GORBO | Jelly breath of two layered rhythms (1.4 and 4.1 rad/s): height +3.5 %, width −1.8 %; her puddle swells with it; a slow roll of 0.035 rad |
| GOOWARD | sin 2.1t: width +2.5 % as height −3 % (he widens as he squashes); body bob 0.03 m |
| GEMTOE | A float bob of 0.03 m at 0.9 rad/s and a body bob of 0.03 m at 1.4 rad/s |
| MONTGUMMERY | Height × (1 + 0.01·sin 1.7t); head pitch and roll of 0.03 to 0.04 rad |
| ETCHER | Roll 0.025 rad at 1.1 rad/s, pitch 0.02 rad at 0.9 rad/s; no scale breath |
| GLYPH | A body bob of 0.02 m at 1.5 rad/s; slow roll, yaw and nod |
| KING DINO | A sway of 0.03 rad at 1.4 rad/s |
| FORTIZMO | Volume-keeping breath (r, 1/r, r), r = 1 + 0.015·sin 1.7t |
| SOMLET | Width +2 % as height −2 % at 1.6 rad/s; a dozing nod of 0.05 + 0.03·sin 0.8t rad |
| MUSHROOM | Stem sway 0.04 rad at 1.4 rad/s; cap bob 0.02 m at 2.8 rad/s |
| ZOLLOD | None of his own; only his fronds, trunk, tail and arms move |
| ANOMALEE | None; head pitch and yaw drift, cables sway |
| HENNRICK | Volume-keeping breath, s = 1 + 0.012·sin 1.4t, riding 0.075 ± 0.01 m above the ground |
| NEXTESSA | Base height × (1 + 0.015·sin 1.8t); her segments sway in a wave up the column |
| BACKPACKA | A constant roll of 0.05 rad at 1.1 rad/s |
| THE ANCIENT | Height × (1 + 0.012·sin 0.7t); the mantle swells 3 to 6 % at 0.9 rad/s and its pore opens with it |
| The birds | × (1 + 0.012·sin 2.1t) |

- A new creature breathes 1 to 3.5 % at 0.7 to 2.1 rad/s, at its own rate, keeping volume (height up, width down)
  unless its material says otherwise (goo and jelly may wobble in two rhythms).

**Signature idle motions**

| Creature | Signature motion |
| --- | --- |
| SPARKAKUS | Ear flicks about every 9 s, the two ears out of phase; tail sway 0.22 rad; arms drifting; star mist rising pink then cyan |
| MAMA GORBO | Bulges rolling down her three streams; a blob sliding down each; drips that swell 2.4 s, fall and splat; orbiting pins; crackling sparks; lenses pulsing 4 % |
| GOOWARD | Crystal wings fluttering at 4 rad/s; float ring bobbing and rolling; tongue waggling; crests swaying; the squint |
| GEMTOE | Floating; a slow head turn and nod; the jaw breathing open; wing sway; tails swaying; sparkles twinkling over the amethysts |
| MONTGUMMERY | Scrolling code text; tail yaw 0.18 rad; swapped pixel faces |
| ETCHER | Each tentacle drifting in heading by 0.04 rad at 0.8 rad/s |
| GLYPH | An excited shake every 5.3 s: a 0.8 s yaw twist (never a roll, so his tubes stay on the ground), the tail whipping three times as far |
| KING DINO | Drumming: each stroke snaps an arm down and lets it ride back up in about 0.14 s, the body nodding on his left-hand (+x) strokes; plume sway |
| FORTIZMO | Head turning, ears swinging, trunk lifting gently; on the beat while she plays, the horn swells, valves press and ears flap out |
| SOMLET | Drifting serif Zs rising beside her cap on her left (+x), about 3 s each; cap rock; hands bobbing; roots swaying; lying on her right side (−x) at home |
| MUSHROOM | Stem sway and cap bob; the cap tilts further while he talks |
| ZOLLOD | Fronds swaying, the worm turning, the trunk curling, the tail swaying; he holds still while his shop is open |
| ANOMALEE | Gazing up at the church window; a glitch into static every 5 to 13 s with a sideways jitter; a jaw chomp about once every 12.5 s; cables swaying |
| HENNRICK | Tentacle beard swaying; cyan lights pulsing together; bulbs blinking; data scrolling on his screen |
| NEXTESSA | A wave travelling up her segment column; a slow look-around |
| BACKPACKA | A fixed 84 s flight: neck gulps, swelling as he drinks, spraying as he slims |
| THE ANCIENT | Stalks swaying at 0.45 to 0.6 rad/s, each pulling in over 2.2 s every 11 s; head creeping 0.025 m; tail tip curling. Everything slow (0.2 to 0.9 rad/s) |
| The Blue Jay | Breathing, slow head turns, folded-wing adjustments and tail balancing; always perched |

**Talking**
- The shared talk rhythm: syllable pulses `max(0, sin 11t)·(0.55 + 0.45·sin 2.7t)`, cut to a quarter when
  `sin 1.3t < −0.5` (pauses). It drives a wrapper: a nod of up to 0.06 rad, a roll of 0.025·sin 1.7t, a stretch of
  +3.5 % height and −1.5 % width, and a lift of 0.045 m plus whatever the nod and roll would dip the footprint.
- The model adds its own response on the same rhythm:

| Creature | Talk response in the model |
| --- | --- |
| GEMTOE | The jaw opens up to 0.3 rad more per syllable |
| GOOWARD | The tongue waggles further |
| SOMLET | The mouth opens wider; the hands lift 0.1 m |
| MUSHROOM | The cap tilts 0.04 rad further |
| MAMA GORBO | A bob of 0.04 m and a small pitch |
| MONTGUMMERY | The mouth opens in two sizes; each conversation opens with a 0.9 s head nod of 0.18 rad |
| ANOMALEE | Each conversation opens with a jaw chomp and a 0.4 s glitch |
| FORTIZMO | The trunk lifts up to 0.55 rad over 1.1 s with a three-note toot (196, 294, 392 Hz) |
| HENNRICK | A hop of about 0.5 m over 1.1 s with livelier tentacles |
| NEXTESSA | A decaying down-up nod of 0.25 rad over 0.8 s |
| THE ANCIENT | It lifts its head and nods; its stalks reach up 0.25 rad |
| KING DINO | Nothing; he keeps drumming |
| SPARKAKUS, ETCHER, GLYPH, ZOLLOD | The shared wrapper only |

- The talked-to creature turns to face the player. ANOMALEE turns but keeps her screen tipped up to the window (level
  only for her Blossom line and at the Event); SOMLET stops turning once half lain down; THE ANCIENT never turns.
- **Happy spin:** one full turn with a 0.3 m hop over 1.4 s (GEMTOE, when a gem trade is done). HENNRICK's greeting
  is a one-second full turn.

**Walk gaits by body type** (wander pace 1.3 m/s, treks 2.1 × that, the Garden Event walk 2.4 m/s)

| Body type | Creatures | Gait |
| --- | --- | --- |
| Jointed biped | SPARKAKUS | 8 rad/s, stride 0.5, knee bend 0.8; body rolls 0.035 rad onto the standing leg, hips turn 0.07 rad, leans 0.05 rad; arms counter-swing 0.5 rad with elbows folding on the forward swing and paws trailing; ears flop back each step; tail bounces |
| Jointed biped | ZOLLOD | 8 rad/s, stride 0.5, knee bend 0.8; arms swing 0.5 rad; no body bob |
| Jointed biped | GLYPH | 7 rad/s, stride 0.45, knee bend 0.7; bob 0.04 m; arms swing 0.3 rad |
| Simple-legged biped | MONTGUMMERY | 7 rad/s, legs ±0.45 rad; bob 0.07 m; arms and tail swing 0.1 rad |
| Simple-legged biped | HENNRICK | 4.5 rad/s, legs 0.35 rad, long arms counter-swinging 0.3 rad; bob 0.09 m; tentacles livelier |
| Simple-legged biped | KING DINO | 8 rad/s, feet 0.35 rad, bob 0.075 m, roll 0.06 rad (built in; he never leaves his kit) |
| Quadruped trot | ANOMALEE | 7 rad/s; diagonal pairs together (the peg with the front right leg); hip 0.4 rad, knee 0.4 rad; bob 0.075 m; cables kick at double rate |
| Glider | MAMA GORBO, ETCHER | A bob of 0.03 m at 6 rad/s; the body otherwise as at rest |
| Glider | GEMTOE | The wings add a flap of 0.25 rad at 5.5 rad/s, pairs 0.6 rad apart; bob 0.03 m |
| Glider | GOOWARD, MUSHROOM, SOMLET | No walk motion: the idle continues (ring float, stem sway, float) |
| Wheeled | FORTIZMO | Leans 0.06 rad, judders 0.012 m at 14 rad/s, arms swing 0.6 rad; the wheels turn by the distance rolled |
| Hopper | NEXTESSA | 9 rad/s hops of 0.12 m (about 2.9 a second), squashing to 0.9 height and 1.08 width between hops; segments roll and pitch; 3.2 m/s on deliveries |
| Flyer | BACKPACKA | Wing flap amplitude 0.12 to 0.42 at 14 to 28 rad/s by flight phase |
| Fixed | THE ANCIENT | Never moves from its place |

- A walk is 4.5 to 9 rad/s; jointed walkers 7 to 8 rad/s with level feet, a roll onto the standing leg, counter-swinging
  arms and a bouncing tail.

**Standing**
- Every creature stands on what is under it (lawn, walk, rug, soil, deck), with at least 6 mm of clearance, easing up
  quickly (20/s) and down gently (8/s). A move that tilts the body is lifted by however far the tilt dips its
  footprint.
- Floaters keep a stated gap: GEMTOE's tail coils at least 4 cm, SOMLET's roots at least 2 cm; SOMLET's roots splay
  outward every frame until they clear.

**Planting** (a whole-body move on a loop; it starts only once the creature stands still, and eases in and out at 4/s)

| Creature | Move | Rate (rad/s), size | Shape |
| --- | --- | --- | --- |
| SPARKAKUS | pat | 1.6, 1 | Rock side to side 0.14 rad, press forward up to 0.15 rad, bob 0.03 m |
| MAMA GORBO | pat | 1.3, 1.2 | Slow and large |
| GOOWARD | pat | 1.6, 1.1 | Large |
| GEMTOE | scatter | 2.4, 1 | Turn 0.55 rad this way and that with a 0.06 m hop |
| MONTGUMMERY | pat | 1.9, 1 | His screen shows a pixel shovel |
| ETCHER | pat | 2.1, 0.9 | Brisk |
| GLYPH | dig | 2.3, 1 | Lean in 0.32 rad and scoop forward 0.08 m |
| MUSHROOM | pat | 1.8, 1 | — |
| ZOLLOD | dig | 3, 0.8 | Fast and small |
| ANOMALEE | dig | 1.5, 1 | Once the Snacks are done she eats pizza instead: bent over the box, a bite every couple of seconds, chewed upright |
| HENNRICK | pat | 1.4, 1.2 | Slow and large |
| KING DINO, FORTIZMO, SOMLET | none | — | At the Event KING DINO keeps his post, FORTIZMO plays her horn, SOMLET sleeps on |
| NEXTESSA, BACKPACKA, THE ANCIENT | none | — | Never plant |

**Dancing**
- The music sets the beat: KING DINO's 104 BPM jazz for Dance battles and victory dances, FORTIZMO's 88 BPM horn at
  the Garden Event. The Dancers' built-in dances count that beat; the simpler dances run at fixed rates near 104 BPM
  (5.45 rad/s, one bob per beat). One dance per creature, readable across the floor.

| Dance | Creature | Shape |
| --- | --- | --- |
| The robot | MONTGUMMERY | A new pose every beat, snapped in over the first fifth of the beat and settled with a mechanical jitter; arms forward or out, never across; body and screen turn in hard stops; pots step; robot face with pupils jumping on the beat; a 16-beat phrase |
| The tentacle dance | ETCHER | 16 beats in four bars: a ripple down all six tentacles; each curling up in turn round the circle from his left front (+x) to his right front (−x); a twirl with the tentacles swinging after him like a skirt; all six curled up and wiggling, then flopping down |
| The macarena | GLYPH | 16 beats: arms out, palms up, to the shoulders, by the head, hips across, hip sways, then a hop with a quarter turn to his left; his arms stretch so every pose reads |
| Funk | SPARKAKUS | A bob on every beat, hips twisting over two, paws pumping up from the chest, feet stepping in place, ears flopping, tail whipping; a full spin with a hop on beats 7 and 8 of every eight |
| Jelly | MAMA GORBO | A tall-short squash of 12 % with a slow roll |
| Bounce | GOOWARD | A hop on every beat with a small squash |
| Twirl | GEMTOE | Slow half-time turns back and forth with a lift (2.7 rad/s) |
| Shimmy | MUSHROOM | Quick side-to-side shakes at triple time |
| Stomp | ANOMALEE | A rocking stomp with a hop on every half beat; equaliser bars on her screen, cables kicking |
| Groove | ZOLLOD | A bob, a lean, a slow turn (size 0.9) |
| His roll | HENNRICK | Rolling side to side with arms flung out just above horizontal and pumping, a bounce, a dancing pixel figure on his screen |
| none | KING DINO, FORTIZMO | They make the music |
| none | SOMLET, NEXTESSA, BACKPACKA, THE ANCIENT | Never dance |

**Dance battle moves** (the three Dancers show each move with their own bodies; a won battle ends with a burst of
sparkles and a 7 s victory dance)

| Move | MONTGUMMERY | ETCHER | GLYPH |
| --- | --- | --- | --- |
| Rock | An air guitar: one arm along the neck, the other strumming; the screen bangs forward; a fist on the screen | Head-banging (the body rising to pay for the nod) with the tentacles drumming twice a beat round the circle | An air guitar with alternating stomps |
| Scissors | Pots splayed wide, arms chopping open and shut; scissors on the screen | The two front tentacles raised and snipping, the rest spread | A jump every two beats into a mid-air split, arms snipping overhead |
| Paper | Tipped forward on one pot, the other kicked back, arms out flat; a page on the screen | All six tentacles lifted level off the ground and rippling | Both arms flat out, see-sawing |

**Vignette gestures** (each creature's own move when two creatures trade messengers; offsets on a wrapper)

| Gesture | Shape | Creatures |
| --- | --- | --- |
| nod | A forward dip of 0.18 rad, twice | HENNRICK, ETCHER, MONTGUMMERY, SPARKAKUS |
| puff | Swell 12 % wide and 8 % tall, chin up | MUSHROOM |
| glitch | A square-wave jitter of 0.12 rad | ANOMALEE |
| wobble | A 0.18 rad roll with an 8 % squash | GOOWARD |
| sway | A 0.12 rad roll | ZOLLOD |
| doze | A 0.18 rad forward nod with a slow roll | SOMLET |
| groove | A 0.14 rad roll with a 0.08 m bob | FORTIZMO |
| twirl | One full turn with a 0.2 m lift | GEMTOE |
| giggle | A fast 0.06 rad shiver | GLYPH |
| bow | A 0.4 rad bow toward the partner | MAMA GORBO |
| none | Never turns or gestures (his sticks would sweep the kit) | KING DINO |

**Emotes**
- An emote is a bold monospace character, filled in colour and outlined in ink `#0d0d1a`, 0.9 m across, 0.4 m above the
  creature's height; it rises at 0.7 m/s, sways and fades, gone within 1.5 s.
- Characters: `!` `?` `~` `♪` `♥` `✿` `✦` `★` `≈` `z` `…` `...`. Fill colours are drawn from white, lime `#a8e830`, teal
  `#35d0c5`, pink `#ff5fb0`, yellow `#f2c72e`, `#ffb0d8` and `#b39ae8`; fixed colours mark fixed moments (a pink `♥`
  over each Gorbo catching the other's goo, a yellow `!` when BACKPACKA arrives).
- During the Garden Event without live music, `♪` is dropped or becomes `♥`.

| Creature | Garden Event greeting (5.12): emote and sound |
| --- | --- |
| SPARKAKUS | `!` |
| MAMA GORBO | `!` |
| GOOWARD | `!`, a "blorp" |
| GEMTOE | `!` |
| MONTGUMMERY | `!` |
| ETCHER | `!` |
| GLYPH | `!` |
| KING DINO | `!` |
| FORTIZMO | `♪`, a toot |
| SOMLET | `!` |
| MUSHROOM | `...`, silent |
| ZOLLOD | `≈`, a bubble blip |
| ANOMALEE | `?`, a crackle |
| HENNRICK | `~`, a splash (with his one-second spin) |
| THE ANCIENT | — |

Each creature's vignette emote, messenger and gesture are listed in 2.20.3.

**Blossom reactions** (each a whole-body moment; 5.6)
- SPARKAKUS drops onto all fours (1.15 rad over 0.6 s) and runs a lap of the Library, then stands and apologises (only
  at his place in the Library).
- MAMA GORBO and GOOWARD fire eight volleys of three or four goo balls at the player's view over 2.7 s, each with a
  "blorp", splatting on the view.
- SOMLET opens her eyes for her thanks; MONTGUMMERY shows his robot face for 5 s; GEMTOE claims it ("This is mine
  now.").

---

### 4.8 Per-creature style sheet

This table is the one-page reference for judging each creature on-model; part 3 (section numbers in brackets) holds
the full build. Heights are in game (declared height × model scale), with the visible top where it differs. Lock
status is stated in the introduction to this part.

| Creature | Palette (main first) | Finish | Height | Silhouette | Signature parts | Motion signature |
| --- | --- | --- | --- | --- | --- | --- |
| **SPARKAKUS** (3.2) | royal blue `#2c4cc0`; vines gold `#f2c21a`, green `#7ad04a`, magenta `#e0408a`, orange `#f08a2a`, teal `#3ac8c0`, violet `#b070e0`; paws `#e8862a`; ruff `#f2ecd8`; star `#ffd23a`; mist pink `#ff5fb0` to cyan `#66e6ff` | Alebrije paint over fur strokes, satin (22); orange fur paws; glossy black nose, claws and collar | 3.31 m (ear tips 3.13 m) | Upright wolf, barrel body, long muzzle | Two tall narrow ears lined purple; a long tail curling up to a gold star trailing mist; a dark feather fin on the back | Ear flicks, tail sway, rolling stride; funk; the Blossom lap on all fours |
| **MAMA GORBO** (3.3) | peach `#ff9f5c`; ports magenta `#d8338a` with purple lenses `#8a3ad8`; tail lime `#a8cc22`; streams cyan `#36d0e8`, magenta `#e8409e`, violet `#9a52e0`; sparks `#ffe23a`; pins `#e8423a` | Goo, wet (120), almost smooth, wet highlights, a glossy puddle | 2.95 m | A round goo drop melting into a wide flat foot on a puddle | Two asymmetric octagon ports (big and high on her left (+x), small and low on her right (−x)); the lime tail round her foot; three streams; orbiting pins | Two-rhythm jelly breath; bulges rolling down streams; drips that splat; jelly dance; goo volleys |
| **GOOWARD** (3.4) | peach `#f2a274` below to cyan `#34b6ea` above; "+" eyes white; ring lime `#c8f03a` with white stripes; crystal wings `#d8f0ff`; ports `#7a3ad8`; crests gold `#e8b42c` | Glossy jelly (75) with clear bubbles inside; glossy rubber ring; faceted translucent crystal | 3.2 m | An egg of fused bubbles seated in a float ring | The float ring; two gold leaf crests; crystal wing fans; white "+" eyes; pastel roots | Wing flutter, ring bob, tongue waggle, squint; bounce dance; goo volleys |
| **GEMTOE** (3.5) | crimson `#a82228`; ruff `#b8282e`; wings `#a8222a` to `#d8463a`; crest amber-orange `#ffb030` to `#f07a2a`; eyes amber `#ffc22a`; amethysts `#8a34e0` and `#b070ff` | Glossy scales (60), feather cards, a pale plastic beak (90); flat-shaded jewel amethysts (170) | 2.54 m (tips about 2.8 m) | A feathered dragon on a narrow pear trunk, legless, floating | Two pairs of fanned wings; four tails coiled round amethysts; a hooked beak under a swept crest | Floating bob, slow head turn, breathing jaw; twirl; happy spin after a trade |
| **MONTGUMMERY** (3.6) | body `#1d2a23`; bezel teal `#55b8c6`; screen purple `#7f52c8`; hands `#7cc6ea`; pots `#3db2d6` with gold lacing `#f0c23a` and orange toes `#e2521f` | Dark satin (40) under scrolling pale-cyan code text; an unlit screen | 2.97 m (visible top 2.92 m) | A CRT screen head on a dark egg body, no neck, long arms, pot boots | The screen with its white pixel face; the pot boots; the big hands | Scrolling code, swapped faces; the robot; rock, scissors and paper faces in battle |
| **ETCHER** (3.7) | teal `#2a8a9e` at the base to blue `#2a5aa8` at the head; bell scales `#2a8296` `#2e74a8` `#2a9a9a` `#3368b0`; tentacles purple `#7a4ab8`; gem green `#6ad02a`; eyes gold `#c8a020` | Glossy scaled skin (70); shingled half-dome scales (80); a flat-shaded gem (170) | 3.02 m | A bell of scales rising into a long forward-leaning neck, small head | Six ground-spread tentacles (a star with a bell in the middle); the bell; the green chest gem | Tentacle drift; the tentacle dance; tentacle battle moves |
| **GLYPH** (3.8) | porcelain blue `#4a9ad8`; eyes orange `#ff5a14`; gold `#e0b03a`; plates navy `#2c4a7c` with gold filigree `#d8b048`; shield gold with a red "R" `#d0222a`; tiles purple `#8a2ab8`; tubes orange `#e8782a` and grey `#6a7280` | Engraved porcelain under a glaze (55); brushed gold metal (110); bevelled filigree plates (80) | 2.78 m (horns about 2.9 m) | A crouching, forward-leaning dinosaur, tail on the ground | Two great glowing orange eyes; coiled gold horns; plates down back and tail; two tubes coiled on the ground; the shield on his right flank (−x) | The excited shake every 5.3 s; the macarena |
| **KING DINO** (3.9) | lemon `#f9dc22` to gold `#eeb41a`; turquoise `#2cb2dc`; crown `#1a7cb4` to `#4cc8e6`; plume purple `#4a1890` to `#b02ac4`, then `#e0386e` to orange `#ffb64e` | Gummy citrus-peel skin, glossy (50); very glossy turquoise fittings (100 to 110); feather blades in the plume | 3.1 m | An upright, bottom-heavy gummy dinosaur | A five-prong turquoise crown under a tall purple-to-orange plume falling down his right side (−x); navy bead eyes; drumsticks always in hand | Drumming snaps; never turns or gestures at the kit; never walks |
| **FORTIZMO** (3.10) | orange fur `#e8742a` (body and horn); cream belly `#efe6d2`; horn valves gold `#f0c040`; wheel-leg chrome `#b8bec8` | Shaggy matte fur strokes (6), lumpy like a plush toy, stitched seams with black studs; very glossy gold and chrome | 2.93 m | A furry pear-bodied elephant-like plush on two sprung wheels, no neck | A short trumpet trunk, off-centre toward her left (+x), that becomes a long orange-fur horn with three gold valves; tall upright ellipsoid ears | Rolling with a judder; the 1.4 s trunk-to-horn morph; ears flapping on the beat; the toot |
| **SOMLET** (3.11) | cream `#f2e4b4`; cap navy `#2a3a6a` with a gold envelope badge `#e8b830`; roots plum `#b04870`; Zs lilac `#eae6ff` outlined `#3a3468` | Matte felt (12); cotton puffs on the sides and back | 3.0 m (floating) | A floating cotton box over a fringe of roots | The mail carrier's cap; closed sleeping eyes; plum roots; drifting Zs | Float and dozing nod; Zs; lying down at home; eyes open only for her thanks |
| **MUSHROOM** (3.12) | cap `#f8b83a` at the crown to `#e46a14` at the rim; stem `#f6eed4`; warts `#fffaf0`; star `#e8b830`; hat `#8a5a32` | Glossy skin-textured cap (55) that reads as glowing gold; fine wood-grain stem; a frilled collar; matte gills | 2.0 m (hat top about 2.3 m) | A dome much wider than he is tall on a fat stem | The sheriff's hat; the six-point star on his left breast (+x); the warted dome; two baby mushrooms on his back | Stem sway, cap bob and tilt; shimmy |
| **ZOLLOD** (3.13) | cyan `#35d0c8` at the head through `#3cbe94` to green `#4ca83c` at the feet; trunk and tail tips magenta `#e040c8`; apron olive `#7a8a44` | Glossy scales (40) in six bands; a matte grass bed; fern and feather plumes | 2.6 m | An upright pear-bodied biped with a small head | The curling trunk with a magenta tip; the garden bed on his back with a worm on his right (−x); the long magenta-tipped tail | Fronds sway, worm turns, trunk curls; still while his shop is open; groove |
| **ANOMALEE** (3.14) | casing olive `#b3c48f` with cyan stripes `#18d6ee`; monitor `#29c7d9`; head screen magenta pixel art `#e01ce0`; handheld glow `#ff5af0` to `#c010c0`; peg wood `#a8743e` | Crisp pixel-art casing, flat-shaded boxes, matte (8); moulded plastic parts | 3.14 m | A blocky four-legged computer, all right angles | The monitor head tipped back to gaze up at the church window; the keyboard snout; the peg on her back left (+x); dangling cables | Glitches into static; jaw chomps; diagonal trot; stomp with equaliser bars |
| **HENNRICK** (3.15) | purple fur `#c85ac8` with orange bands `#d8782a`; chrome `#9ca3ae`; copper `#d8702a`; lights cyan `#3ae8f0` and green `#6aff4a` | Shaggy matte fur (6); very glossy chrome and copper | 2.99 m (visible top 3.11 m) | A tall furry robot-beast of two stacked ellipsoids, nearly as wide as tall | Chrome ring halos on the shoulders; long arms with copper claws; four segmented beard tentacles; a green pixel screen ringed by lights (five on his right (−x), four on his left (+x)) | Tentacle sway, light pulse; talk hop; a one-second greeting spin; his roll |
| **NEXTESSA** (3.16) | orange `#f47a3a` and `#f09460`; spines `#eea06c`; snout `#e3875a`; eyes yellow `#f2c21e` | Plain satin clay (26), no texture | 3.5 m | A caterpillar-like column of three beads on a three-lobed base | The pizza box on her head; the spined bead column | A wave up the column; hopping at about 2.9 hops a second |
| **BACKPACKA** (3.17) | pale `#ecb88e` beneath to warm tan `#c47a4c` on top; glassy patches orange `#f06a1a`, yellow `#f0c81a`, ochre `#c8941e`, magenta `#e02a7a`; neck stripe green `#7ab83a`; wings green `#2f5a26` to teal `#2aa08e` | Crackled matte skin (30); glossy glassy patches (110) on cream rims; veined translucent wings | about 4 to 5 m long | A swelling pear body, a long banded neck to a small open-mouthed head, tube legs | Two pairs of dragonfly wings; pipe feet that spray; the neck that gulps | A fixed 84 s flight: drink, swell, spray, slim, fly off |
| **THE ANCIENT** (3.18) | near-black brown `#3a2c22` with grooves `#241a14`; keel `#3a3024`; tip and lip `#403634` | Grooved skin, very glossy (110), a wet keel (140) | lying, about 4.5 m long | A great slug across the secret room's floor | Long knobbed eye-stalks; the mantle hump with its breathing pore | Very slow sway; stalk pull-ins every 11 s; never moves, turns, plants or dances |
| **The Blue Jay** (3.19) | blue, white and black | Matte feathers, glossy bead eyes | about twice life size | Perched crested bird | Blue crest, dark collar, barred wings and long tail | Breathing, head turns, folded-wing adjustments, tail balancing; never leaves its tree |

---

### 4.9 Role markers: how a creature's job shows

This section fixes how a creature's role, rank and kind are shown on its body, so the job reads without words.

| Creature | Role (part 2) | Marker on the body | How it reads |
| --- | --- | --- | --- |
| MUSHROOM | The sheriff | A brown sheriff's hat; a six-point gold star with ball tips on his left breast (+x) | A lawman at a glance; the hat reads at distance, the star at mid range |
| SOMLET | Runs the Post Office | A mail carrier's peaked cap with a gold envelope badge | The cap reads at distance; her messenger is a letter |
| ZOLLOD | Runs Garden Supplies and the grocer's | An olive canvas apron with seed packets; a trowel in his left hand (+x); a garden growing on his back | A gardener and shopkeeper |
| KING DINO | The King of Jazz, on drums | A crown with a plume; drumsticks always in hand | Royalty and rhythm; his messenger is a crown |
| FORTIZMO | Runs the Juice Bar; a jazz musician | A trunk that becomes a horn | The musician shows when the horn rises |
| MONTGUMMERY | Runs the video store; a Dancer | A CRT screen head with role faces: a shovel for planting, a robot for dancing and his Blossom, a fist, scissors or page in battle | A television; his job and mood are drawn on the screen |
| ANOMALEE | The one who remembers | A monitor head tipped back to the church window; a handheld; old-computer casing | An old machine gazing at the window |
| HENNRICK | A researcher from the far past | A data screen, chrome instruments and indicator lights | A walking laboratory instrument |
| GLYPH | Master of symbols; a Dancer | A shield bearing a red "R"; tiles bearing coins and tridents; filigree plates | Symbols worn as armour |
| ETCHER | Data preservation; a Dancer | A cut gem set in his chest | The same green gem crowns his archive in the town (1.7); his messenger is a card |
| GEMTOE | Runs First Bank of Greeblis; gem trader; inventor of Avarice | Four amethysts gripped in her tail coils | She never lets go of her gems |
| SPARKAKUS | Runs the town's Library | A clerk's collar and sleeve garters, the "APR" coin; daffodils on his right shoulder (−x) | Dressed for the desk; his messenger is a card |
| MAMA GORBO | Runs Mistergummery's | Orbiting "AP", "IP" and Wi-Fi pins | Her goo is her trade and her messenger |
| GOOWARD | Runs the Art Gallery | An "AP" tag on his float ring | Paired with MAMA GORBO by the tag and the goo |
| NEXTESSA | Far-future pizza courier | The pizza box on her head | A delivery |
| BACKPACKA | The legendary creature | Pipe feet that spray water | The one who waters the garden |
| THE ANCIENT | The one reborn | No marker; age shows in size, darkness and slowness | — |

**Kind markers**
- **Synthetics** read as made things: screens and CRTs (MONTGUMMERY, ANOMALEE, HENNRICK), chrome, wheels and springs
  (FORTIZMO, HENNRICK), glazed porcelain with cable tubes and inset tiles (GLYPH), a cut gem set in a ring (ETCHER),
  seams and studs (FORTIZMO), pixel art and scrolling code (ANOMALEE, MONTGUMMERY).
- **Organics** read as grown things: blended skins, scales, feathers, fur, goo, felt, a garden. Small fittings may
  appear on Organics as accents (MAMA GORBO's and GOOWARD's ports and tags, KING DINO's buttons and holed joints), but
  never a screen face or a machine body.

**Rules**
- A new creature with a job carries one marker that names the job at a glance; the marker is worn or held, never
  written. Words on markers are limited to short in-world labels (the "APR" coin, the "AP" and "IP" pins, the "adb"
  plate, the "gfxinfo" header).
- A marker sits on the skin or in a hand and moves with its part; it is part of the locked model once approved.

---

### 4.10 Do / Don't for all creatures

These rules apply to every creature; per-creature rules are in part 3.

**Do**
- Do design one whole creature: one archetype, one continuous main mass, one to three signature parts, one identity
  colour.
- Do keep it in its height band (4.2), with a large head, moderate hooded eyes and short rounded limbs.
- Do place every eye, mouth line, plate, badge, card and patch on the skin by ray (3.1), sunk or lifted along the
  normal, with a lip or bevel where it meets the body.
- Do paint light into the colour: crease darkening of 10 to 22 %, lighter tops, a gradient along the long axis.
- Do use one KIT surface (or one bespoke canvas) for the body and one or two for accents; matte or satin body, a few
  very glossy accents with white specular.
- Do give every eye one glint and every tube a closed rounded end.
- Do give the creature one signature idle motion, a breath at its own rate, a talk response, a walk gait suited to its
  body, and (if it takes part) a planting move and a dance.
- Do pay for every tilt with a lift, keep 6 mm of ground clearance, and keep floating parts at their stated gap.
- Do show the creature's job with a worn or held marker.
- Do ask the owner when a shape is ambiguous, before any smile, and before any change to a locked model.

**Don't**
- Don't give a creature a cartoony smile, teeth (ANOMALEE's keyboard teeth excepted), moving brows or lip sync.
- Don't use pure black, pure white on surfaces, flat unpainted colour on a body (NEXTESSA excepted), or emissive glow
  on a body.
- Don't facet a body; flat shading is for crystal, gems and hardware only.
- Don't use bones, skeletal rigs or bone props.
- Don't let anything clip into the body, another part, the ground or a perch, from any angle, at rest or in any
  animation; fix a clip around the model (placement, animation, the thing it touches), never by changing locked parts.
- Don't leave an open tube end, a hollow pipe without a dark plug, or a single-sided plane where its back can be seen.
- Don't hang ground-lying appendages from a breathing or swaying body, or bend a tentacle down into the ground.
- Don't let arms cross the body or rise into the face or screen.
- Don't copy a cast member's identity colour, archetype-plus-signature combination, eye type or approved smile.
- Don't let a creature's role be told in words on its body beyond a short label.

---

### 4.11 Checklist for a new creature

A guidance checklist, not a requirement: the steps summarise how the cast was built, each with a check that shows
whether the result matches the cast. The construction methods are in 3.1.

1. **Concept.** Write the creature's role, kind (Organic or Synthetic), archetype (4.2), one to three signature parts,
   identity colour and accents. *Pass:* the owner approves the concept; the archetype and signature combination
   matches no cast member.
2. **Height and proportion.** Set the height in a band (default 2.75 to 3.15 m), the head share (0.20 to 0.26 for an
   animal, 0.34 to 0.43 for a screen head), legs 21 to 30 % and arms about 25 % of the height. *Pass:* the measured
   ratios fall in the ranges of 4.2.
3. **Silhouette.** Run the read-at-distance check (4.2). *Pass:* named from the black shape alone at 10 m and 15 m in
   front, side and three-quarter views; each signature part visible in at least two.
4. **Colour.** Choose an identity colour distinct from the cast's (4.3), its gradient direction, one to three accents
   that recur on more than one part, tinted near-blacks and cream whites. Use the identity colour for the name tag and
   the messenger. *Pass:* no pure black or pure white on surfaces; the gradient runs along the long axis; the tag and
   messenger match the body.
5. **Body and surface.** Build one continuous main mass. Pick the body surface (4.4), bump and shininess from the
   scale; paint crease darkening of 10 to 22 % and lighter tops. *Pass:* the body is matte, satin or glossy (not very
   glossy unless wet); only small parts are very glossy or jewel; white specular only on wet, metal or gem parts; no
   flat shading on the body.
6. **Placement.** Place every face part, plate, badge, card and patch on the skin by ray, with stated offsets.
   *Pass:* no part floats or sinks; no two faces are coplanar (no z-fighting) from any angle.
7. **Face.** Use the standard KIT eye (radius 2.4 to 4.2 % of the height, sunk 40 to 50 % of r, lid at −0.25 to −0.3)
   unless the archetype calls for a screen; one glint per eye; a closed line, a speaking jaw or no mouth; brows only if
   static. Register the blink. *Pass:* no smile without the owner's approval; the eyes read calm and slightly hooded.
8. **Limbs and attachments.** Choose legs, arms and hands from 4.6; taper and close every tube; start every root
   inside its parent; hang ground-lying parts from the root; add the role marker (4.9). *Pass:* feet stay level
   through the walk; no open tube end; the marker reads at a glance.
9. **Idle.** Add breathing (1 to 3.5 % at 0.7 to 2.1 rad/s) and one signature secondary motion with its own timing.
   *Pass:* the outline moves at 15 m; nothing in idle clips or dips.
10. **Talk.** Respond to the talk rhythm in the model if the creature has a jaw, mouth, tongue, screen or expressive
    part. *Pass:* the creature turns to the player and talks without lip sync.
11. **Walk.** Choose the gait for its body type (4.7). *Pass:* phase 4.5 to 9 rad/s, level feet, body roll onto the
    standing leg, arms counter-swinging, tail bouncing; no foot sinks.
12. **Planting and dance.** Give it a planting move (dig, pat or scatter, with rate and size) and a dance, or a built-in
    dance on the beat. *Pass:* both read across the dance floor; the footprint lift keeps it out of the ground.
13. **Signals.** Give it a greeting emote and sound, a vignette messenger in its identity colour, a vignette emote and
    a gesture. *Pass:* none duplicates a cast member's full set.
14. **Ground and clip pass.** Check the lowest point at rest (6 mm clearance) and through idle, talk, walk, plant,
    dance and vignette gestures, from every angle. *Pass:* nothing sinks, floats unintentionally or clips.
15. **Style-sheet entry and lock.** Add a row to 4.8 and 4.9 and its complete build and behaviour specification to part 3. *Pass:* the owner approves; from then on its parts, proportions and palette change
    only with the owner's approval (animation changes on request are allowed).


## 5. Game design

This part specifies how Greeblis Town plays, in enough detail to build another Greeblis game that plays the same way.
VR is the real game and everything here describes it. Times are seconds of game time; positions are (x, z) with the
Summoning Pillar at (0, 0). The park is a fenced square of about 75 m (`parkHalf` 37.6 m), running on to z = 49.6 m in
the south for the church; the garden (radius 15 m, `GARDEN_R`) is its centre. Places are described in 1.2–1.6, the
cast in part 2, creature appearance in parts 3 and 4, and the look and sound of the interface in 6.2 and 6.3.

Contents: [Design pillars](#51-design-pillars) · [The player in VR](#52-the-player-in-vr) · [The core
loop](#53-the-core-loop) · [Blossoms and Flint](#54-blossoms-and-flint) · [Interaction](#55-interaction) · [Blossom
reactions](#56-blossom-reactions) · [Quests](#57-quests) · [SNACKS](#58-snacks) · [SEEDS](#59-seeds) · [SUMMONING
STONE](#510-summoning-stone) · [Dance battles](#511-dance-battles) · [The Garden Event](#512-the-garden-event) · [Life
between the player's actions](#513-life-between-the-players-actions) · [The church's secret way
in](#514-the-churchs-secret-way-in) · [Session and progress](#515-session-and-progress) · [Platforms and
budgets](#516-platforms-and-budgets) · [Design principles for a new game](#517-design-principles-for-a-new-game)

### 5.1 Design pillars

The eight pillars below are binding on every Greeblis game; each later section implements one or more of them.

| Pillar | Definition | Implementation in Greeblis Town |
| --- | --- | --- |
| **A place, not a level** | The town lives whether or not the player acts. No fail state, no clock on the player, no way to lose. | Creatures roam, visit and play scenes on their own; a Dance battle can be left but never lost. |
| **Kindness is the verb** | The player's one real action on the world is a gift. | The Blossom opens the Portal, starts battles and sets off each creature's best reaction. |
| **Few, clear goals** | Three goals, always on the wrist, each with one gate. | SEEDS, SUMMONING STONE and SNACKS; nothing else is tracked. |
| **Every creature is a person** | Anyone stops for the player, turns, talks and goes back to its life. | Proximity stops, Talk lines in turn, a home ground for each, no creature ever stranded. |
| **One climax** | Everything builds to a single, replayable spectacle. | The Garden Event: everyone plants and dances, and BACKPACKA makes the garden bloom. |
| **Show, don't tell** | The world explains itself through sculpture, colour and behaviour. | Few words in the world; short menus; lore carried by buildings, windows and behaviour. |
| **Comfort first** | VR must never make the player ill or lost. | Smooth turning, seated calibration, a moving vignette, a head guard in walls, UI placed once and kept readable. |
| **Small and steady** | One file at a fixed frame rate. | One self-contained HTML ordinal under about 400 KB packed, holding the Quest's 72 Hz. |

### 5.2 The player in VR

This section specifies the player's body, controls, pointer, comfort measures, haptics and wrist HUD (its look: 6.3).

**Body and view**

| Property | Value |
| --- | --- |
| Body | In VR play the player sees two small cartoon hands on the controllers; the full avatar (3.20) appears in the Shop's mirror while the Shop menu is open, and as the third-person figure in the test modes. |
| View lift | Calibrated on entry so a seated player's eyes match the standing avatar. Head tracking remains live during system menus while simulation is paused. |
| Body radius | 0.6 m against buildings, creatures and fixed bodies; the body centre stays 0.75 m inside the fence. |
| Near plane | 0.15 m, so the hands are never clipped. |
| Spawn | (−36.3, −20): just inside the west fence, north of the Juice Bar, facing north-north-west across the road to KING DINO's billboard at (−55, −55). The billboard is the first thing seen; the whole park is behind the player. |

**Controls**

| Input | Action |
| --- | --- |
| Left stick | Smooth locomotion at 4.5 m/s, relative to where the head looks (not the controller). Dead zone 0.15. Works while a dialogue or panel is open. |
| Right stick | Smooth turning, with a dead zone and speed proportional to stick deflection. |
| Trigger (either hand) | Select along that hand's pointer; any trigger press also advances an open dialogue. |
| A | Select, as the trigger. |
| X | Select exactly as A does; Talk and Give are interaction-menu choices only. |
| Y | Bring the open dialogue or panel back in front of the player. |
| Grip | No game action. |
| One controller only | Its stick moves the player, who turns by turning round. |

- **Room scale:** real walking moves the player while playing or with a dialogue or panel open; otherwise the drift
  from the body is kept, up to 6 m (`driftMax`). A frame stall of over 1 s recentres the drift.

**Pointer**
- A beam from every connected controller (both hands), its length following what it hits; colours are in 6.3.
- Reach 16 m (`pickRange`). It hits the real meshes of creatures first; failing that it takes anything within a
  0.14 rad cone (`pickCone`) round the bounding spheres of creatures, stations, Blossoms and Flint. Interaction begins by pointing then pressing A (or X). Talk and Give are selected from the interaction menu; pickups are primarily collected by moving over them.

**Comfort**
- While the stick moves the player, a dark radial vignette eases in to 0.55 opacity (fast in, slow out).
- Smooth turning avoids snap-turn flashes. Seated play is preferred; entry calibration places the seated player at the standing avatar's eye height.
- **Head guard:** a head within 20 cm of a solid structure darkens the view, fully black at 8 cm, clearing as the head
  comes out. It is computed from each building's real parts at their real heights; the Summoning Pillar, the Portal's
  pillars and the church's secret way in (5.14) never darken it.

**Haptics**

| Moment | Strength / length |
| --- | --- |
| Hovering a UI button | 0.15 / 12 ms |
| Pressing a UI button | 0.25 / 20 ms |
| Selecting in the world | 0.3 / 30 ms |
| The Blossom count rising (both hands) | 0.3 / 35 ms |
| Recentring | 0.4 / 30 ms |
| Meeting a creature for the first time (first Talk or gift) | 0.5 / 70 ms |

**The wrist HUD**
- A 0.15 m card on the left controller's grip, tilted toward the eye; hidden when there is no left controller.
- Content, top to bottom: the three quests with ☐ or ☑ (SEEDS, SUMMONING STONE, SNACKS); then the items in hand, four
  to a row, in this order: Blossoms and Flint with counts, the Ancient Artifacts with their count (until glued), the
  Ancient Gem (until traded), the Summoning Stone, OVERCOMING SHYNESS (until ZOLLOD has it), the Seeds and the pizza.
  An item not held has no tile. Clothes never have a tile: the Shop's mirror shows them. The card grows downward; the
  quests never move.
- The same card is the HUD in every mode (on the wrist in VR, in a screen corner in the test modes).

### 5.3 The core loop

The loop below is the whole game; every step is optional except the Summoning Stone before the Event.

1. **Explore.** Pick up Blossoms and Flint by walking over them or pointing at them; both are always plentiful and
   regrow elsewhere 12 s after being taken.
2. **Talk.** Each creature has four or five Talk lines in turn, a Blossom line and an Event line. The lines carry the
   hints (MAMA GORBO: "I hear there is a book that can help anyone overcome shyness.").
3. **Give Blossoms.** A Blossom is the key: it unlocks the Portal (MUSHROOM), starts a Dance battle (the three Dancers)
   and sets off a creature's best reaction (5.6).
4. **Complete the three quests** on the wrist: SEEDS, SUMMONING STONE and SNACKS (5.7–5.10).
5. **Start the Garden Event** at the Summoning Pillar (5.12). It can be replayed at will.

**Minimum cost of a full run:** 4 Blossoms (one bribe, three battles), 15 Flint (the Seeds) and the book from the
Library. Clothes (3 Flint each) are optional. Flint is spent only at the shop; Blossoms are never spent as money.

### 5.4 Blossoms and Flint

This section specifies the two pickups: counts, placement and regrowth.

| | Blossoms | Flint |
| --- | --- | --- |
| In the park at once | 32 (`blossomCount`) | 40 (`acornCount`) |
| Regrowth | 12 s after being taken, somewhere else | 12 s, somewhere else |
| Walk-over pickup radius | 1.3 m | 1.1 m |
| Pointer pickup | within 16 m | within 16 m |
| Sound | the pickup chime (6.2) | the same |

Their models are specified in 6.1.

**Placement (rules)**
- Pickups grow only in the ring from 16.2 m (`GARDEN_R` + 1.2) to 34.5 m (`clearingR` − 2) from the garden's centre:
  never inside the garden's stone ring, never at the fence.
- Never on the south walk to the church (|x| < 2.2 m, z > 20 m); never within 0.5 m of anything solid; never inside a
  building or within 0.8 m of one; never on the dance floor or within 0.6 m of its edge; never within 1.2 m of a
  station's reach.
- Never inside a keep-clear zone (plus 0.3 m), including: 2.4 m round each creature that keeps a post; 7.4 m round
  HENNRICK's ground at the Portal; 3.6 m round the Portal; the dance floor; the pond (4.2 m); the Library (6.6 m); the
  phone booth; the church's footprint; the Juice Bar; the drum kit (2.6 m).
- Each position is the best of 96 random candidates (200 for a regrowth), scored to be far from other pickups (up to
  8 m counted) and preferably more than 4 m from the player.

**Regrowth (rules)**
- A taken pickup regrows at least 10 m (`pickupMove`) from where it was taken, so the player keeps moving and the park
  always looks full. With no valid spot it retries every second.
- Pickups are taken only while nothing is open (no dialogue, menu or panel).
- During the Garden Event every pickup inside the gathering circle (`bt.R`, at least 22.5 m from the centre) is hidden
  and none regrows there; they return when the Event ends.

**Conventions**
- Plenty, never scarcity: there is always more than the player needs within a short walk.
- Pickups are drawn instanced: all 32 Blossoms and 40 Flint in a handful of draws.

### 5.5 Interaction

This section specifies how the player addresses creatures and stations: ranges, menus, dialogue and the stop-and-turn
behaviour. The binding rules are in section 8; the visual design is in 6.3.

**Rules**
- A creature's menu holds only Talk, plus "Give a blossom" while the player holds one. ZOLLOD's, once he is freed,
  opens the shop. Planting and dancing are animations, never menu options.
- No Blossom is offered or taken at the Garden Event.
- Menus never have an X in the top right; each closes by its own button (CLOSE, LEAVE, DONE, No, TAKE A BOW).
- Every creature stops and turns to a player who comes near, and resumes what it was doing afterwards. Every creature
  can always be talked to: mid-visit, on its way home or while hosting.

**Talk ranges.** A target is offered when the player stands within its talk range, or points at it from up to 16 m.

| Range | Targets |
| --- | --- |
| 3.4 m (default `talkR`) | HENNRICK, GOOWARD, SOMLET; the Summoning Pillar |
| 3.6 m | ETCHER, GLYPH |
| 3.8 m | GEMTOE, MAMA GORBO, MONTGUMMERY |
| 4.2 m | FORTIZMO, ANOMALEE, ZOLLOD, MUSHROOM, KING DINO |
| 2.8 m | the Garden Supplies counter |
| 2.6 m | the phone booth |

**What a creature offers**

| Situation | Options |
| --- | --- |
| Normally | "Talk to NAME", plus "Give a blossom" while one is in hand |
| At the Garden Event | "Talk to NAME" only, which gives its Event line; FORTIZMO, playing, offers nothing |
| ZOLLOD, still shy | "Talk to ZOLLOD" only; never a Blossom |
| ZOLLOD, freed | "Shop at Garden Supplies" only |
| GEMTOE, with the Gem in hand | Talk becomes the trade (5.10) |
| Busy with a battle or a delivery | Not offered |

**Menus**
- A target with one option runs it at once; two or more open the action menu with a CLOSE button.
- The menu is placed once, 11.5 m out (`uiDist`) toward the creature and just over its head, scaled to read at a
  constant size. It never follows the head.
- It closes if its creature leaves, or if the player walks 25 m (`uiCloseDist`) away.

**Dialogue**
- A line is split into pages at `|`. Text types out at 22 ms a character (`typewriterMs`). The first press completes
  the page; the next moves on. ▼ marks more pages; ● marks the last.
- Closing the last page runs whatever follows (a battle, a reward, the next speech). A dialogue opened while another
  is up waits its turn.
- The box sits 11.5 m out toward the speaker, its bottom just over the speaker's head; shop and battle panels swing to
  the creature's side so it stays in view; the Garden Event panel sits at eye height.
- The name tag takes the speaker's colour (6.3). A notice ("Overcoming Shyness book obtained") has no tag.
- Walking 25 m from an open dialogue or panel closes it.

**Talk lines**
- Each creature has four or five Talk lines (`SCRIPT[id].lines`), given in turn. Its own counter
  (`Kt.talkState`) steps through them, never resets and is never shared. The last line is a flavour line about the
  creature's own lore.
- Each creature also has one Blossom line (`gift`) and one Event line (`campfire`).
- A line can carry sound: ANOMALEE's "ORIGINATOR…" (`sad`) plays a slow falling minor phrase over a low hum (6.2).

**Stopping and turning for the player**
- A creature within 3.2 m (`greetR`) of the player stops whatever walk it is on and turns to face them. It stays
  stopped for up to 12 s (`proximityFreezeS`) or until the player moves off; the 12 s re-arm only once the player is
  more than 6 m (`greetClear`) away.
- Roaming, FORTIZMO's walk behind the bar and the Gorbos' meetings also pause while the player is near.
- The creature being talked to turns to the player and stands still while its dialogue is open, even when busy; every
  clock it was on (a visit, a walk home) waits for it.
- Exceptions: ANOMALEE keeps gazing up at the church window through her Talk lines, turning only for her Blossom line
  and at the Event; SOMLET, lying asleep on her side, does not turn; KING DINO never turns from his drums.
- While talking, a creature bobs to a syllable rhythm (a small nod, sway, and squash and stretch), and its own talk
  animation keeps the same rhythm (4.7).

### 5.6 Blossom reactions

This section specifies the answer each creature gives to a Blossom. A gift always costs one Blossom, always plays the
heart sound and always gets an answer. Answers are graded: **keys** change the game, **spectacle** is pure delight,
**character** is a line that says who the creature is.

| Creature | Blossom line | Reaction | Kind |
| --- | --- | --- | --- |
| MUSHROOM | "A bribe? …Portal is now open to your use." | The phone can reach the Portal for the rest of the session (5.8) | Key |
| MONTGUMMERY, ETCHER, GLYPH | "Let’s dance!" | A Dance battle starts when the line closes (5.11). MONTGUMMERY's screen shows his robot face. | Key |
| GOOWARD | "GOOMP" | Goo shower: eight volleys 0.35 s apart, each of three or four goo balls arcing at the player's head, landing as coloured splats on the view that slide down and fade within about 4 s | Spectacle |
| MAMA GORBO | "Thank you, dear." | None | Character |
| SPARKAKUS (at home) | "…sorry I don’t know what got into me." | Drops to all fours, gallops one lap of his Library floor at 4.2 m/s, returns, stands, then apologises | Spectacle |
| SPARKAKUS (away from home) | "A Blossom! …I must resist the urge to run.\|Not out here, in front of everyone." | No lap: the lap belongs to the Library | Character |
| SOMLET | "Thank you" | Her eyes open while the line is up, the only time they ever do | Spectacle |
| ANOMALEE | "* Munch *" | She turns to face the player | Character |
| HENNRICK | "Adding to a collection jar." | None | Character |
| FORTIZMO | "Add it to the tip jar." | None | Character |
| KING DINO | "Yes! I can finally afford another mug of carrot juice!" | He keeps drumming | Character |
| GEMTOE | "This is mine now." | None | Character |
| THE ANCIENT | "..." | Silence; it lifts its head | Character |
| ZOLLOD | (never offered) | | |

**Conventions**
- The gift itself shows no heart emote; the heart is the sound. Floating ♥ emotes belong to the creatures' own moments
  (the Gorbos' meetings, the Event, BACKPACKA's spray, the vignettes).
- Each new creature gets one reaction of its own; the big ones go to the creatures players meet first.

### 5.7 Quests

This section gives the three quests at a glance; 5.8–5.10 specify each one. Quest state lives in `Kt` and is
reset on every load (5.15).

| Quest | Gate | Completion | Cost | Completion flag |
| --- | --- | --- | --- | --- |
| **SNACKS** | Bribe MUSHROOM with a Blossom | NEXTESSA delivers a pizza through the Portal | 1 Blossom | `Kt.rewards.snacks` |
| **SEEDS** | Free ZOLLOD with the book OVERCOMING SHYNESS | Buy the "bagel seasoning packet" at Garden Supplies | 15 Flint | `Kt.rewards.seeds` |
| **SUMMONING STONE** | Win a Dance battle against each Dancer; SPARKAKUS glues the three Artifacts into the Ancient Gem | Trade the Gem to GEMTOE | 3 Blossoms | `Kt.rewards.stone` |

- The quests can be done in any order, and each tours its own corner of the park: the Sheriff's kiosk and the phone
  booth; the Library and Garden Supplies; the dance floor, the Library and GEMTOE.
- Only the SUMMONING STONE is needed to start the Event. SEEDS decide whether anything grows; SNACKS add pizza.
- **The GARDEN EVENT panel** at the Summoning Pillar ("Use the Summoning Stone") lists "Summoning Stone ☐/☑",
  "Seeds ☐/☑", "Snacks ☐/☑" and asks "Start gardening event?" with Yes and No. Yes without the Stone: "The runes stay
  dark.|Only the Summoning Stone can wake them and start the gardening event." The Pillar offers nothing while the
  Event runs.
- **The runes** stay dark until the player first opens the panel holding the Stone; they then light up over 1.5 s,
  breathe softly from then on, and blaze during the Event.
- Every completion ends with a notice between asterisks and a sound: "* +20 Snacks *", "* Ancient Gem collected! *",
  "* Summoning Stone obtained! *".

### 5.8 SNACKS

This section specifies the SNACKS quest: the bribe, the phone call and NEXTESSA's delivery.

| Field | Specification |
| --- | --- |
| Trigger | A Blossom given to MUSHROOM. Sets `Kt.phone` for the rest of the session; that is its only effect. |
| Location | The Sheriff's kiosk; the phone booth south of the garden at (−7.2, 23.9); the Portal (1.3) |
| Reward | SNACKS ticked; the pizza on the HUD; pizza at every later Event (5.12) |
| State | `Kt.phone` (unlocked), `Kt.rewards.snacks` (complete) |
| Repeatable | Calls repeat freely after a delivery; the quest is a single tick |

**Steps**
1. **The lock.** MUSHROOM, on his desk, says "All travel through the Portal is locked down until further notice."
   The Portal stands dark.
2. **The phone before the bribe.** "Call for pizza" answers only "PHONE: *connection to the Portal seems blocked*".
3. **The bribe.** A Blossom to MUSHROOM unlocks the phone. The Portal opens only when someone is coming through.
4. **The call.** "*Ring Ring* This is Nextessa’s inter-temporal pizza shop!|One pie on your way." When it closes, the
   Portal opens: its swirl grows in over 0.75 s with rising notes and a cyan light.
5. **The arrival.** 30 s later (`pizza.callDelayMs`) NEXTESSA steps through the Portal, a pizza box on her head. If
   the Event has started meanwhile she does not come, and the Portal closes.
6. **The walk.** She walks to the player at 3.2 m/s, round buildings, and stops 2.3 m away.
7. **The hand-over.** If nothing is open she shows "!" and says "One hot and ready pie!|* +20 Snacks *|I love my
   job!"; the box changes hands with a sparkle and a chime and SNACKS is complete. If the player is busy she waits;
   after 100 s (`giveUpS`) she takes the pie away quietly.
8. **The exit.** She turns aside, walks back out through the Portal at 3.6 m/s, and the Portal closes over 0.5 s
   with falling notes.

**Rules**
- "+20 Snacks" is flavour; there is no Snacks counter.
- While a pie is on its way the phone answers "*no answer*".
- NEXTESSA cannot be talked to. She appears only through the Portal for a delivery: never otherwise in the park,
  never at the Event, never in a visit or vignette (2.15).

### 5.9 SEEDS

This section specifies the SEEDS quest: ZOLLOD's shyness, the shop and the Seeds.

| Field | Specification |
| --- | --- |
| Trigger | OVERCOMING SHYNESS taken from the Library, then a Talk with ZOLLOD |
| Location | The Library (the book); Garden Supplies (ZOLLOD and the shop) |
| Reward | SEEDS ticked; the Seeds on the HUD; flowers grow at the next Event with Seeds (5.12) |
| State | `Kt.shyBook` (book taken), `Kt.shyFree` (ZOLLOD freed), `Kt.rewards.seeds` (complete), `Kt.owned` and `Kt.equip` (clothes) |

**Steps**
1. **Shy.** Every Talk with ZOLLOD gives "…|…|I’m shy…". He has no Blossom option and no shop, the counter offers
   nothing, and he neither visits nor is visited.
2. **The hint.** MAMA GORBO's fourth Talk line: "I hear there is a book that can help anyone overcome shyness."
3. **The book.** OVERCOMING SHYNESS stands face-out on a side case in the Library at eye level, the biggest hardback
   there. Walking into its shelf-facing pickup area takes it; pointing and selecting ("Take OVERCOMING SHYNESS") also works: a
   chime and the notice "Overcoming Shyness book obtained".
4. **Freed.** The first Talk with the book in hand: "…|That book…|Let me see..|Wow I’m free from shyness!"
5. **After.** His options include "Talk to ZOLLOD" and "Shop at Garden Supplies", which opens the shop at once wherever he is; he holds
   still while it is open. The counter's own prompt appears. He joins the visits, counting half (5.13).
6. **The purchase.** Buying the bagel seasoning packet (15 Flint) completes SEEDS.

**The shop: GARDEN SUPPLIES**
- Opened from ZOLLOD (once freed) or from the counter. Closed during the Event, when ZOLLOD gives his Event line.
- Panel: title "GARDEN SUPPLIES", subtitle "Flint: N", greeting "Welcome to our shop!", closing button LEAVE.

| Item | Slot | Price | Effect |
| --- | --- | --- | --- |
| Flower Hat | hat | 3 Flint | Worn by the avatar (3.20) |
| Sun Dress | dress | 3 Flint | Worn by the avatar |
| Frog Shoes | shoes | 3 Flint | Worn by the avatar |
| bagel seasoning packet | (the Seeds) | 15 Flint | Completes SEEDS; then shows "bought" and is greyed out |

- **Messages:** "You need N more flint for the X." (with a low bump); "You bought the X and put it on. Take a look in
  the mirror!"; "You put on the X." / "You take off the X."; "You bought the bagel seasoning packet! SEEDS quest
  complete!"; "You already have the bagel seasoning packet."
- **Clothes** are bought once; afterwards each toggles on and off for free, its button reading "Change out" while
  worn.
- **The mirror:** a gold-framed oval mirror beside the panel shows a small turning figure of the player in the current
  outfit. In VR it is the only place the player sees how they look. In VR it stands angled at the panel's right; in the
  desktop and mobile test modes it is laid flat on the screen (beside the panel, or below it on a portrait phone) and
  drawn over the world so nothing hides it.

### 5.10 SUMMONING STONE

This section specifies the SUMMONING STONE quest: the Dance battles, the Ancient Gem and GEMTOE's trade.

| Field | Specification |
| --- | --- |
| Trigger | A Blossom given to a Dancer (each battle costs one) |
| Location | The dance floor; the Library; GEMTOE’s gazebo or wherever she is visiting |
| Reward | One Ancient Artifact per Dancer (first win only); the Ancient Gem; the Summoning Pillar |
| State | `Kt.danceWins` (Dancers beaten), `Kt.artifacts` (0–3), `Kt.rewards.artifacts` and `Kt.gem` (Gem held), `Kt.rewards.stone` (complete) |

The Artifacts and the Gem are described in 1.12.

**Steps**
1. **Three Dance battles** (5.11). The first win against each Dancer gives one Ancient Artifact: "NAME awards you an
   Ancient Artifact!" Later wins give a bow only.
2. **SPARKAKUS follows the count.**

   | Artifacts held | SPARKAKUS says |
   | --- | --- |
   | 0 | "For my research: I seek Artifacts left by the Ancients.\|Three exist in this region." |
   | 1 or 2 | "I require more Artifacts to complete my research." |
   | 3 | The speech (below) |
   | After the speech | "Well done, Human!" |

3. **The speech.** He speaks where he stands in his Library and never walks off.

   | Moment | Event |
   | --- | --- |
   | Talk | A light bulb fades in 1.5 m over his head over 1.2 s: a glowing bulb with a screw base, a warm halo and a soft cone of light. The town dims 70% of the way to night: navy sky, stars, lit shop windows, street lamps and stained glass. |
   | Pages | "You’ve found all three Artifacts!\|Amazing!\|Let me see those…\|Ah…" |
   | 0–0.6 s | The glue: between him and the player a school-glue bottle (white, red GLUE label) grows in over the three pieces, which turn slowly apart. |
   | 0.6–1.6 s | The bottle turns upside down. |
   | 2.2–14 s | Comically slow glue drips stretch, fall over 3.2 s and soak in with a blorp. Dialogue waits. |
   | 12.5–15 s | The pieces glide together. |
   | 15 s | A flash and a jingle: the Ancient Gem is whole. |
   | 15.2–16 s | The bottle shrinks away. |
   | +0.7 s | "This is the missing Eye of the Great Sphinx of The Computer Core!\|According to the Ancient texts:\|The Sphinx guarded the Computer Core.\|Asking Synthetics riddles before allowing them in.\|This relic has been missing for ages!" |
   | On close | The Gem flies to the player with a chime: "* Ancient Gem collected! *". The bulb fades out over 1.5 s and the town brightens. |

   From the first page until the Gem is collected SPARKAKUS offers nothing else and is never sent visiting.
4. **The trade.** With the Gem in hand, GEMTOE's Talk becomes: "That Gem you have… It’s worthless… trust me.|I’ll
   trade this rock I found for it. You’re better off!" A jingle, a happy spin (one full turn with a hop, 1.4 s) and
   "* Summoning Stone obtained! *": SUMMONING STONE is complete.

**Conventions**
- The payoff is a staged scene, not a notice: light, dimming, a prop, a speech, then the reward.
- Each link of the chain is a different place and a different creature, so the quest tours the park.

### 5.11 Dance battles

This section specifies the Dance battle, the game's one contest (`Dbt`, texts in `battleText`).

**Rules**
- Only the three Dancers battle: MONTGUMMERY, ETCHER and GLYPH. A battle starts only from a Blossom given to a Dancer,
  when its "Let’s dance!" closes, and only if the Event has not begun and the player is still within the Dancer's
  talk range + 4 m (or within 4 m more than the distance the Blossom was given from). A battle takes the Dancer away
  from any visit or scene.
- **Rock, paper, scissors as dance:** "Rock out!" beats "Do the splits like scissors!", which beats "Go horizontal
  like paper!", which beats "Rock out!".
- **The Dancer moves first.** Each round it picks a move at random and shows it with its own whole-body animation,
  0.6 s after the previous round. The panel names it ("GLYPH rocks out!").
- **The player answers** with one of three buttons. A win takes one step off the bar, with a ♪ and the Dancer's drum
  hit; a tie or a loss changes nothing and the next round starts. There are no result lines: the bar tells the story.
- **Ten winning rounds win the battle** (`stamina` 10). The player cannot lose, only leave.
- **BOW OUT:** a 70% chance of "You take a bow." (the battle ends, no win); otherwise "The beat won't let you go!"
  and the round goes on. LEAVE closes the battle at any time.
- **The win:** a jingle, then the Artifact (first win) or "NAME takes a bow." (later wins). The closing button
  becomes TAKE A BOW. On closing, a sparkle burst, and the Dancer dances its own dance for 7 s.
- Battles are repeatable; only the first win against each Dancer pays.

**The panel**

| Dancer | Title | Bar label | Drum on each win |
| --- | --- | --- | --- |
| MONTGUMMERY | DANCE BATTLE: MONTGUMMERY | Robot steps left: N | snare |
| ETCHER | DANCE BATTLE: ETCHER | Tentacle twists left: N | tom |
| GLYPH | DANCE BATTLE: GLYPH | Macarena moves left: N | kick |

- Subtitle "KING DINO on drums."; the three moves and BOW OUT in a two-column grid; bar colours and layout in 6.3.
  The panel swings to the Dancer's side so its moves stay in view.

**The moves**

| Dancer | Rock | Scissors | Paper |
| --- | --- | --- | --- |
| MONTGUMMERY | Air guitar, screen banging; screen shows a pixel fist | Pots planted wide, arms chopping like blades; pixel scissors | Tipped forward on one pot, arms out flat; a blank page |
| ETCHER | Headbanging and drumming six tentacles | Two front tentacles snipping | All six lifted flat and rippling |
| GLYPH | Long-armed air guitar while stomping | A mid-air split | Arms flat as wings, gliding |

**Music:** KING DINO's jazz plays at full level through every battle and victory dance, wherever it is, and the
built-in dances keep its 104 BPM (6.2).

### 5.12 The Garden Event

This section specifies the climax: its start, timeline, BACKPACKA's visit, the planting and what the Event blocks.
Its lore is in 1.14.

**Starting it**
- At the Summoning Pillar, "Use the Summoning Pillar", then Yes. It starts only with SUMMONING STONE complete. A jingle
  plays and everyone is called.
- **The Seeds decide the Event** (`bt.seeds`, fixed for the whole Event as it starts):
  - **With Seeds:** everyone comes, plants and dances, FORTIZMO plays, and flowers grow.
  - **Without Seeds:** nobody leaves home, no horn, no music. BACKPACKA still comes about 20 s in and sprays the
    garden, but nothing grows and no rainbow shows. No Event lines: a creature talked to says its everyday lines
    (Blossoms stay off, as at every Event).
- The Event can be replayed any number of times.

**Who comes:** the whole park cast except KING DINO (at his drums), SOMLET (asleep at the Post Office), NEXTESSA
(never there) and THE ANCIENT (never leaves its room). FORTIZMO comes to play, not plant. SPARKAKUS leaves the Library
to plant and dance. ZOLLOD comes even while still shy. Workers leave by their own way out (behind the counter,
through the bar's gap); MUSHROOM steps down off his desk; a Dancer mid-victory-dance stops to come.

**Timeline (with Seeds)**

| Time | Event |
| --- | --- |
| 0 s | Yes. A jingle. |
| 0.5 s (`GATHER_S`) | **Planting begins.** Everyone walks straight into the garden at 2.4 m/s to a spot of its own. FORTIZMO walks at 1 m/s to the garden's edge on the bar side (−17.3, 0). |
| All arrived (30 s at most) | **20 s of planting.** 1.5 s into its first dig each planter puts one flower into the soil 0.9 m in front of it, marked by a ✿. |
| +20 s (FORTIZMO given up to 15 s more) | **Everyone steps out to the ring walk** (17.3 m from the centre), spread evenly, leaving FORTIZMO's place free. She raises her horn and "Backpacka's Rain Strut" starts. Everyone dances its own dance. KING DINO rests while the horn plays. |
| All on the ring (15 s at most) | **BACKPACKA sets off** (below). |
| BACKPACKA + 86.5 s | He has gone. FORTIZMO plays the 4-bar tag. |
| Tag ends (15 s at most) | **The Event wraps.** Everyone walks home by a planned route. |
| Hard limit | 180 s after planting starts (`finale.durationS`), the Event wraps as soon as no dialogue is open and BACKPACKA is not mid-visit. |

A typical run with Seeds lasts two to two and a half minutes.

**BACKPACKA's visit** (`BP.D`; his design: 3.17; who he is: 2.16)

| Seconds after he sets off | Phase |
| --- | --- |
| 0–16 | Flies in skinny from far beyond the pond to hover over its far bank. At 3 s everyone at the Event shows "!". |
| 16–20 | Lowers and dips his long neck into the water. |
| 20–34 | Drinks: gulps run up his neck and he swells fat. At 22 s about 60% of the crowd show a teal "?"; at 33 s everyone shows a pink "!". |
| 34–38 | Lifts his head, dripping. |
| 38–50 | Flies heavily to hover about 5 m over the garden's centre. |
| 50–52 | Splays his four tube legs; a jingle at 52 s. |
| 52–67 | Sprays four arcs of water from his feet while turning one and a half times, sweeping the whole garden, slimming as the water runs out. Flowers bloom where it lands. ♥ ✿ ♪ rise from the crowd about once a second. |
| 55–59 | The rainbow fades in (with Seeds only). |
| 67–69.5 | Folds his legs. |
| 69.5–84 | Flies away; the rainbow fades. |

**The garden and the flowers**
- The garden is 15 m in radius: tilled rings every 2 m from 2.6 m out, four stepping-stone paths, the Summoning Pillar
  at the centre, a stone border (layout: 6.1).
- **Spots:** planters stand on three rings: 3.5 m (up to 4), 7.5 m (up to 6) and 11.5 m (the rest), so their soil
  falls on the rows at 2.6, 6.6 and 10.6 m. Each spot is turned along its ring until its soil is 0.75 m clear of the
  paths. A planter held off its spot by a neighbour for 1 s plants where it stands.
- **Flowers:** one per planter, chosen at random from five kinds (creeping thistle, scentless mayweed, chicory, common
  milkweed, zebra mallow; locked models, see 6.1). Each waits in the ground until BACKPACKA's water lands within about
  1.6 m, then grows over about 11 s with a little overshoot. Every plant is watered by 5 s into the spray.
- **Only the first Event with Seeds grows flowers** (section 8). Later Events
  plant at the same spots and grow nothing; the garden stays as the first Event left it for the whole session.

**Pizza (with SNACKS complete):** eight stacks of one to three pizza boxes stand round the outside of the stone ring
for the whole Event. ANOMALEE gets an open box at her spot and eats a slice every 5 s instead of planting (so she
grows no flower), each slice with a crunch and a ♥.

**Greetings:** every 3–7 s (`finale.chatEvery`) a random participant and its nearest neighbour greet each other, each
with its own emote and sound (6.2), then a ♥, ✿ or "!" over each.

**Moves**
- Planting: each planter digs, pats or scatters at its own speed and size (ZOLLOD digs fastest; GEMTOE scatters).
- Dancing: GEMTOE a twirl, GOOWARD a bounce, MUSHROOM a shimmy, ANOMALEE a stomp, ZOLLOD a groove, MAMA GORBO a
  jelly wobble, SPARKAKUS a funk (a bob each beat, a hip twist over two, a spin with a hop every eight); these run at
  a fixed 5.45 rad/s, near 104 BPM. HENNRICK and the three Dancers dance their own built-in dances (HENNRICK a
  side-to-side roll; the robot, the tentacle dance and the macarena), which follow the music playing: 88 BPM at the
  Event, 104 BPM elsewhere (`gcBeatHz`).
- A creature starts a move only when standing still, eases in and out of it, and stops for anyone talking to it.

**Talking at the Event:** "Talk to NAME" gives the Event line and the creature stands still for it (MONTGUMMERY's
screen shows a pixel shovel). KING DINO ("Can’t stop the beat!") and SOMLET ("Zzz") answer from their posts; THE
ANCIENT says "Hello".

**What the Event blocks (rules)**
- No Blossoms offered or taken anywhere.
- No Dance battles, no phone, no shop; the Summoning Pillar offers nothing.
- No visits (any under way are called off at once), no vignettes, no Gorbo meetings; roaming and FORTIZMO's walk
  pause.
- No UFO: a pass under way leaves at once, and the next waits at least 60 s after the Event.
- No pickups inside the gathering circle (5.4).
- No jazz from when the horn rises until its last notes have died away.
- **Performance safeguard (VR):** scenery centred more than 26 m from the centre is hidden (anything 60 m or more
  across excepted) and render quality is held at its lowest step for up to 10 minutes, so the Event never drops a
  frame.

### 5.13 Life between the player's actions

This section specifies everything the town does on its own: roamers and posts, visits, vignettes, the Gorbos'
meetings, the UFO, the birds, music zones and light. The binding rules are in
section 8; the behaviour is fully described in this part.

**Roamers and posts**

| Creature | Home ground | Behaviour |
| --- | --- | --- |
| HENNRICK | Round the Portal (within 9 m) | Every 4–10 s strolls to a spot 3.2–6 m from the Portal and at least 2.5 m from where he is (never in its doorway or the lane in front of it), and stops facing it |
| GEMTOE | Inside her gazebo | Stays home between visits and Events; leaves and returns through the open front |
| MAMA GORBO | The open park | Every 3–8 s roams to a spot 5–16 m away, never onto the dance floor, keeping apart |
| GOOWARD | Round GOOWARD'S GALLERY (within 12 m) | Every 3–8 s wanders to a spot 6.6–10 m from the Gallery's middle, in front or to either side (up to 110° off its front, never behind), at least 2.5 m from where he is, and stops facing it |
| ETCHER, GLYPH, MONTGUMMERY | The dance floor (12 × 38.4 m: 10 × 32 tiles of 1.2 m) | Every 3–7 s roam to a spot 3–12 m away on the floor, clear of the other two. They dance only in battles, at victory and at the Event |
| FORTIZMO | Behind the Juice Bar's 18 m counter | Every 3–8 s walks at least 3 m along it, then faces the dance floor |
| SPARKAKUS | His open-air Library | Browses before the bookcases; greets the player with a "!" and a nod within 6 m |
| KING DINO | His drum kit behind the dance floor | Always there, always drumming |
| SOMLET | Before the Post Office | Asleep, floating; at rest she lies on her side |
| MUSHROOM | On the Sheriff's desk, 1.5 m up | Looks down at the player; hops down to leave and jumps back up |
| ZOLLOD | Behind the Garden Supplies counter | Keeps the shop once freed |
| ANOMALEE | The walk before the church | Gazes up at the Traveler window (1.6) |
| THE ANCIENT | The Cave | Never moves |

- Walking speeds: 1.4 m/s about a post; a planned way home 2.7 m/s (`wanderSpeed` 1.3 × `trekSpeedMul` 2.1); a visitor
  walking home 0.55 of the post pace (0.77 m/s); the Event walk 2.4 m/s.
- **No creature is ever left away from its own ground** (`JGP.homeGround`). A roamer with no headway for 2.5 s
  settles where it is (only on its own ground); after three failed picks it escapes to the nearest clear spot or
  heads home; any creature off its ground for 4 s (20 s if still walking) is sent home by a planned route.
- A Gorbo seeking the other (below) picks the roam spot nearest its partner.

**Visits**
- The first starts 12–22 s into the game, then one every 22–32 s. At most two are on their way out or meeting at
  once. None start while anything is open, during a battle or during the Event.
- **Everyone visits everyone.** KING DINO, SOMLET and THE ANCIENT never go out; the others come to them (so KING DINO
  and SOMLET never meet). NEXTESSA and BACKPACKA take no part. Pairs with THE ANCIENT are candidates in only one round
  in eight. ZOLLOD takes part only once freed, and his counts weigh half, so he visits and is visited about twice as
  often as anyone else.
- **The pair** is the one with the lowest score of visits made by both (weighted double) plus scenes played, with a
  little chance. Pairs already side by side are skipped: they play where they stand.
- **The walk:** a worker leaves by its own way out; the visitor follows a planned route and stops beside the host,
  facing it. A host in a kiosk or behind the bar comes out to meet it and goes back in after; a roaming host stops
  where it is. A host that has moved on is walked up to again, twice at most.
- **Time limits:** 40 s plus 1.6 s a metre to get there; the scene must start within 40 s of meeting; the visitor
  leaves 1.5 s after it ends and walks home slowly.
- **Holding:** talking to either creature, either one stopped for the player, or any open panel holds every clock of
  the visit; it then carries on whole. The Event or a battle calls it off at once.

**Vignettes**
- **Every pair has two scenes:** an animated exchange and a spoken exchange. The 14 cast members who take part
  (everyone but NEXTESSA, BACKPACKA and THE ANCIENT) make 91 pairs; THE ANCIENT has a further pair with each of them.
  Whichever of a pair's two scenes has played less plays next.
- **The animated exchange:** the two turn to face each other and throw their signature items through the air in one
  of twelve styles (swap, volley, boomerang, parade, juggle, orbit dance, bounce, bubble, zip, confetti, serenade,
  tag), with gestures. Each pair keeps its own style. It lasts at least 4 s; each landing gives an emote and a sound.
  Each creature's signature item (messenger), gesture and emote are listed in 2.20.3.
- **The spoken exchange:** two speech bubbles, one line each, at 0.5 s and 3.9 s, each up about 4 s; 8.2 s in all.
  Example: HENNRICK "Sheriff, when may I return to my own era?"; MUSHROOM "When the Consortium says so. Not before."
  The lines are canon and listed in 2.20.4 and 2.20.5; the relationships they express are in 2.20.2.
- **Where:** only between two creatures side by side, each at its own spot and free. Pairs already together (the
  Dancers on the floor) play in place, one scene every 18–28 s, fairly among them; every other pair meets through a
  visit. Talking to either, or the Event, stops a scene.
- THE ANCIENT's scenes play only during a visit to it, and only while the player is inside the church; otherwise the
  visit passes quietly and still counts as the pair's turn.

**MAMA GORBO and GOOWARD**
- Every 20–40 s they seek each other. When they are more than 16 m apart, MAMA GORBO first takes a planned walk to
  open ground a few metres from GOOWARD (who keeps to GOOWARD'S GALLERY); then both walk to a meeting spot between
  them, turn face to face and throw four volleys of three goo balls, alternating (two each way), a ♥ rising over each
  catcher. Anything that takes either away calls it off; they try again 40 s later.

**The UFO**
- A saucer crosses the sky every 10 minutes (the first at 10 min): 9 s drifting in, 2.6 s wobbling over the town,
  3.2 s zipping off over the horizon, 35–48 m up. Never during the Event. Its design is in 6.1.

**The birds**
- One Blue Jay stays perched in its tree. Gentle head turns, breathing, folded-wing adjustments and tail balancing animate it without flight. Its design is in 3.19.

**Music zones** (the pieces themselves: 6.2)
- **KING DINO's jazz** ("Stomp at the Juice Bar", 104 BPM) plays, visibly, whenever the player is within 45 m of the
  kit, but is heard only on the dance floor and on the kit's strip (a touch louder near the kit), and everywhere
  during battles and victory dances.
- **FORTIZMO's "Backpacka's Rain Strut"** (88 BPM, C minor) plays only at the Event with Seeds, for as long as
  BACKPACKA is on show, then its 4-bar tag.
- **The two never sound together.** There is no ambient bed: the rest is the creatures' own sounds, quieter with
  distance and silent beyond their range.

**Light:** always a sunny day; no day and night cycle. The only dimming is SPARKAKUS's light bulb (5.10).

### 5.14 The church's secret way in

This section specifies the hidden entrance to THE ANCIENT's room; the church itself is described in 1.6.

- The church's front door cannot be entered; its front wall is solid.
- A small red X is painted on the wall under the right-hand Garden window: two short strokes crossing at 1.14 m.
  Nothing else marks it.
- The wall there is only paint: a 2.6 m gap in the side wall's solid parts lets the player walk straight through at
  the X. The head guard does not darken there.
- Inside, THE ANCIENT lies across the floor of a damp, earthen room. It is talked to only from inside the room (the
  16 m pointer would otherwise reach it through the walls): "I am the one reborn." At the Event: "Hello". A Blossom:
  "...". It never turns to the player; it lifts its head and its eye-stalks reach up as it speaks.
- No creature ever goes in except one calling on THE ANCIENT. Such a visitor stops outside the X for 1.3 s, puzzled, a
  "?" in its own colour over its head, then walks in through the wall. Any other creature found inside is put straight
  back outside. No pickups grow inside.

**Conventions**
- A secret is shown, never told: a mark, a wall that gives, and creatures who pause at it.
- What is found inside answers with few words and deep time.

### 5.15 Session and progress

This section specifies what a session keeps and what every load resets.

**Rules**
- Every game starts clean: no quest, item, Blossom or Flint progress.
- Nothing is saved. The game uses no storage at all (the ordinal rule,
  section 8); reloading starts over. A session must be completable in one sitting.
- **Kept for the session:** what the player holds and has done; the phone unlock; ZOLLOD's freedom; each creature's
  place in its Talk lines; the clothes bought; the garden's flowers; how often each pair has visited and played its
  scenes.
- **Repeatable:** Dance battles (a Blossom each; only the first win per Dancer pays), pizza calls and the Garden Event.
- **Headset off and on:** the game clock resumes where it left off, with no jump. Each frame advances at most 0.1 s,
  so a stall never fast-forwards the world.

### 5.16 Platforms and budgets

The supported platforms, the start screen, the ordinal constraints, the 400 KB limit and the test modes are binding
rules stated here and in section 8. The game is one self-contained file, playable as a Bitcoin ordinal under a sandboxed allow-scripts frame and strict content security policy, without outside calls, persistent storage or dynamic code evaluation. The packed release targets about 400 KB. Supported clients are Meta Quest Browser in VR, Chrome on Windows/Linux desktops and Chrome on Android. Desktop and Mobile are development test modes, fenced for removal from the v1.0 release. The current development build is v0.2.

- The VR session requests a floor-level reference space, with local-space fallback, and a 72 Hz target frame rate (`xr.targetHz`). The first valid tracked pose is calibrated once per session to a 1.62 m standing-avatar eye height for a seated player; subsequent head motion is preserved.
- The Quest's budgets decide design. Draw calls are the scarcest resource (VR draws each twice), then triangles, then
  per-frame script. In practice:
  - creatures fold every part that never moves into one mesh per material; the town is built as material bins split
    by area so what is out of view is skipped;
  - pickups are instanced; Event flowers have a full model within 7 m (`PLANT_NEAR`) and a light one beyond;
  - render quality steps down only while the frame rate needs it (from full resolution to 66%, with foveation,
    `xr.quality`) and steps back up when it can;
  - anything that first appears mid-scene (the light bulb, the Portal's light, BACKPACKA and his water) is prepared
    beforehand, because a stall in a headset is long and crackles the music;
  - no cars and no far scenery; fog closes the world at 300 m.
- The desktop and phone modes are test modes only; nothing in a new game is designed for them.

### 5.17 Design principles for a new game

This section lists the design principles a new Greeblis game carries over.

1. **Make the gift the verb.** One collectible, given freely, that opens doors and draws out each creature's best
   reaction. Keep it plentiful and never sell it.
2. **One currency, one shop.** Flint buys the one quest item and a few clothes; prices are low and pickups many.
3. **Three goals on the wrist,** each with one gate and its own corner of the world, done in any order.
4. **Gate with a character, not a lock:** a shy shopkeeper, a bribable sheriff, a greedy trader, a scholar who needs
   pieces. Hint every gate in someone's Talk lines.
5. **Stage the payoffs.** Light, a prop, a speech, then the reward: never just a notice.
6. **No failure, no clock.** Games of chance can be left, not lost; delivery and Event timers protect the world and
   never punish the player.
7. **Everyone stops for the player,** turns, talks and goes back to its life; nothing is ever stranded.
8. **The world plays on its own:** a visit about every half minute, two scenes for every pair, roamers and posts, and
   ambient events that never collide with the climax.
9. **Build to one replayable climax** in which everyone takes part with its own moves, and which changes the world
   once (one batch of flowers) and only once.
10. **Place UI once, far and readable;** no X buttons; a single option runs at once; walking away closes it.
11. **Comfort is a rule:** head-relative movement, smooth turning, seated eye-height calibration, a moving vignette, a head guard, hands but no body.
12. **Budget for the Quest from the first build:** one file, ordinal-safe, 72 Hz, draw calls first.


## 6. World style

This part specifies how the Greeblis world looks, sounds and reads outside the creatures themselves. Creature design
is part 3, creature style part 4 and lore part 1; this part cross-references them and does not repeat them. Shininess
terms ("satin", "glossy") refer to the shininess scale in 3.1 and 4.4.

Contents: [6.1 Environment](#61-environment) · [6.2 Audio](#62-audio) · [6.3 Interface](#63-interface) ·
[6.4 Writing](#64-writing) · [6.5 Quality bar](#65-quality-bar)

**Pillars**
- **Big, friendly creatures in a bright small town.** Most creatures stand 2.5 to 3.5 m; the VR view calibrates seated players to the standing avatar’s 1.62 m eye height, under a clear summer sky. Nothing is grim, gory or harsh.
- **One saturated colour per creature, everywhere.** A creature's colour is its body, its name tag, its home, its
  storefront emblem and the messenger it throws in a vignette.
- **Toy-like forms, tactile surfaces.** Simple smooth shapes (blended blobs, lathes, tubes, boxes) carry painted
  detail. Never flat colour, never low-poly facets, except crystal, glass and hardware, which are faceted on purpose.
- **Everything is made in the page.** Every texture is painted on a canvas in code; every sound is synthesized. No
  photographs, recordings or external files.
- **Show, don't tell.** Lore lives in sculpture, colour and glass. Words in the world are few and big.
- **Gentle, dry, absurd.** Deep history and strange beings living ordinary small-town lives; the joke is told straight.
- **Calm to look at in VR.** No flicker, shimmer, glare or clutter. Every path leads somewhere.

---

### 6.1 Environment

This section specifies the sky, light, ground, park, church, town, vegetation, effects and textures.

**Rules**
- **Show, don't tell.** Outside the park, lore comes through sculpture and colour, never words. The only words outside
  the park are a few names (the bank, the burger chain and its menu board), the stop signs and the billboard with its
  banner (section 8).
- **The town is the creatures' own.** Only the town's creatures give it its design; nothing of HENNRICK, NEXTESSA or
  THE ANCIENT appears outside the park.
- **Purposeful layout.** Every path leads somewhere and ends there. No cars, benches, trash cans or clutter.
- **Never flint knapping** in anything built, shown or played.
- **No national flags.** The one flag is the Consortium's (a red mushroom on orange), over the Sheriff's kiosk.

#### Sky, fog and light

There is no day-night cycle and **no shadow maps, ever** (`shadowMap.enabled` is forced off). Form comes from painted
shading: crease darkening, sunlit tops and dark undersides on tree crowns, walls darkening toward the ground.

| Element | Day | Full night (the dimming) |
| --- | --- | --- |
| Sky dome (horizon → zenith, weighted `y^0.7` toward the horizon) | `#d6e6ef` → `#3f86d6` | `#1c2350` → `#070b24` |
| Fog (colour = horizon) | linear, 70 m to 300 m (phones 230 m); far plane 310 m (phones 260 m) | follows the horizon colour |
| Hemisphere light (sky / ground, intensity) | `#eaf6ff` / `#6e8b4a`, 0.85 | `#5a6aa8` / `#1a2418`, 0.42 |
| Sun (directional, from the south-east, (24, 48, 18)) | `#fff1d6`, 0.95 | `#9fb4ff`, 0.28 |
| Fill (directional, from the north-west) | `#bfe2ef`, 0.22 | 0.06 |
| Sun glow (sprite and disc, high in the south-east, along the key light's direction (24, 48, 18)) | pale cream `#fff6c8` | faded out |
| Stars | none | 700 white points fade in; there is no moon (Greeblis has none) |

- **The dimming** (`I.setNight(k)`, k 0 to 1) is an effect, not a time of day. SPARKAKUS's Gem speech under the light
  bulb dims the town to 70 %.
- As it darkens, lit things glow: window glass turns warm amber, lamp globes warm cream, stained glass brightens, the
  Flint nuggets and the phone booth's header light up.
- Colours are saturated but never harsh. The town fades into pale haze at the world's edge; nothing is built far out.

#### Lawn, paths and streets

| Element | Specification |
| --- | --- |
| Lawn | Mottled greens `#4a7a2c` and `#3e6a26` near the town, paler prairie `#7a8a4c` far out, grass tile over it |
| Park green | Mowed stripes `#4a7a2c` / `#3f6c26` |
| Grass tufts | Dark at the root, sunlit at the tips (`#5f9a32`, `#6faa3a`, `#4f8a2a`, `#7ab842`), now and then a tiny white or yellow flower; never on walks, the garden, the dance floor or inside buildings |
| Walks | Concrete `#a8a296`, 2.6 m wide: a ring round the garden; diagonals to the Library, the Post Office and Sheriff's (with a cross walk between their decks) and Garden Supplies; a walk to GOOWARD'S GALLERY; the south walk to the church steps. Where two walks cross, one stands 2 cm over the other |
| Streets | Four frame the square: asphalt `#252528`, yellow centre dashes `#e8c030`, running on to the horizon as county roads with gravel shoulders `#a89a7a`. White crosswalks `#f2f0ea`. Red stop signs on grey posts; no street-name blades. The ground dips under the town so the kerbs read |
| Street furniture | Only lamps, a red hydrant `#c8282a`, a blue mailbox `#2a4a8a` and lore props |
| Lamps | Black iron `#1e2226`, 4 m pole, frosted globe `#f6f0dc` (glows at night), small cone cap. Four on the east sidewalk carry ZOLLOD's hanging baskets of pinks (`#ff7ab8`, `#e8409e`). No lamp at the west sidewalk's north end (the view from the spawn to the billboard stays clear) |

#### The park's set pieces

The park is a fenced square. The garden is at its centre; the Library in the north-west corner; the Post Office and
the Sheriff's in the north-east; Garden Supplies in the south-east; GOOWARD'S GALLERY on the east side between the duck
pond and Garden Supplies, opposite the Juice Bar, its front to the garden; the Juice Bar and dance floor along the west
side; the duck pond to the east; the phone booth south of the garden; the gazebo and the Portal to the north; the
church at the end of the south walk.

| Set piece | Style |
| --- | --- |
| The fence | Black iron pickets `#1e2226` (1.04 m) between brick pillars `#9a4a36` with limestone caps `#e2d8c2` and iron ball finials; taller spiked posts between |
| The garden | A disc of dark soil `#5a3e26` with tilled ridge rings every 2 m (`#6e4c2e`); a border of squashed stones `#8f8374`, every fourth one mossy; stepping-stone paths of seven-sided slabs; the edge stays clear of sacks and marker sticks |
| The Summoning Pillar | A six-sided tapering pillar of grey-violet stone (`#6f6a78`, 2.3 m) under a pyramid cap, on a mossy plinth. Short rune strokes on three faces (shapes, never letters), cyan `#7ff0ff`, dark until woken; they then light over 1.5 s and breathe, and blaze toward `#d8fbff` at the Event |
| The Portal | A grey stone gateway (`#b4bcbc`, paler caps `#cdd4d4`, satin, faintly self-lit so it never goes black): two pillars and a lintel with two cyan panels `#35e0f0` that brighten to `#b8ffff` when open. The swirl: a radial blue from `#e8fbff` through `#7fd4ff` and `#2a78e8` to `#1a4ab8`, faint rings and white specks, slowly turning, with spiral arms and ripples and a flickering blue light. Opens in 0.75 s with an overshoot, closes in 0.5 s |
| The duck pond | Flat rings 4 cm apart: grassy bank, mud `#6a5a3a`, water `#3a8aa0` (glossy, pale at the rim). Limestone rocks; no lily pads, bulrushes or dock. **No effects on the water:** it only breathes slowly in colour |
| The dance floor | One rectangle of 1.2 m tiles, dark purple `#24103c`, thin grout `#12081f`, a faint lighter rim on two edges of each tile; a soft satin sheen with no glare |
| KING DINO's drum kit | Red lacquer shells `#c23b3b`, cream heads `#f3efe4`, chrome `#c9ccd4`, brass cymbals `#d8a93a`; "KING DINO" on the bass drum in red-orange `#e0482e`; a round two-tone rug `#5e2222` / `#7e3628`. Drums squash when hit; the crash wobbles |
| The Juice Bar | A roofless, sparse open-air bar (a backdrop). Dark wood body `#7a5232`, light wood top `#d0a46c`, chrome rim; a front of vertical slats in fruit bands: orange `#ff8a1a`, yellow `#ffd23a`, green `#8ad83a`, pink `#ff5a7a`, purple `#9a5ae0`. Stools with fruit-colour cushions, juice cups with striped straws, bowls of fruit, a blender. Sign: a yellow-to-orange board (`#ffd84a` to `#ff9a1a`) framed red `#e8402a`, "JUICE BAR" in white with a red-orange outline, giant fruit on top (an orange, a lemon, a strawberry) |
| The Library | Open reading ground, no walls, roof or raised floor: eight freestanding double-sided bookcases (2.2 x 0.56 m) in dark wood `#6a4424`, books in cloth colours, one item face-out per shelf; the great paisley rug (below); a banner sign in navy ink `#2a3e6a` on two posts behind the back row |
| The phone booth | An American phone booth: brushed aluminium `#c8ccd4`, clear glass on three sides and a half-open folding door, a lit navy header `#1c3c8c` reading TELEPHONE in white, a chrome payphone and a yellow phone book |
| The gazebo | Octagonal; white posts and balusters `#f6f4ee`, a board deck, a green shingle roof `#5a6e5a`, a cupola and a gilded ball `#d8b040`; Gemtoe’s Gazebo sign on top, coin stacks inside, GEMTOE at home in its centre |

**The kiosk frame.** Four kiosks share one frame (`kioskFrame`): a plank deck, a board-and-batten back wall, low side
walls, square white posts and trim `#f6f2e8`, a corrugated tin roof, a counter with crates either side, and a sign
board on the ridge: cream `#f6f0dc`, framed in the kiosk's ink, the name in bold Georgia fitted to the board. Options
per kiosk: no battens (`noBattens`), white roof spots (`spots`), a raised desk (`desk`), no counter or crates
(`noDesk`).

| Kiosk | Sign ink | Walls / lower walls | Tin roof | Character |
| --- | --- | --- | --- | --- |
| POST OFFICE | `#22325a` | navy `#33508f` / `#26407a` | pink `#e276a0` | Tidy in front (bundled letters, stuffed sorting cubbies, kraft parcels with twine, a blue collection box); behind it, the joke: a slumped mountain of envelopes over 3 m high with an avalanche round its foot |
| SHERIFF'S | `#6a3a1a` | mushroom brown `#8a5a3a` / `#6e4628`, no battens | toadstool red `#b82822` with white spots | Toadstools everywhere; a gold six-point star on the back wall; a lantern; wanted posters; MUSHROOM's raised desk; the Consortium's flag on a pole behind the sign |
| GARDEN SUPPLIES | `#2f5a2a` | sage `#6f8f5a` / `#5a7a48` | terracotta `#a85c3a` | Plants everywhere: terracotta pots of shrubs, a cactus, little trees; seedling trays, soil bags, a teal wheelbarrow of blooms, a rake and a shovel; the botanical curiosities (Vegetation, below) |
| GOOWARD'S GALLERY | `#3a2a5a` | cream `#e8e0cc` / `#d8cfb8`, no battens | violet `#584284` | No desk and no crates: the floor is open. One big canvas (6.9 x 2.6 m, primed `#f4f1e8`, stretcher edge `#c8a070`) on the back wall, carrying GOOWARD's painting (1.18). Two easels of wood `#7a5232` on the lawn either side of its walk, turned toward it, and a third outside the left wall, each holding a gold-framed `#b8902e` realistic landscape painting (1.18). Fifteen paint cans (tin `#b8bcc4`, rims `#9a9ea6`, wire handle `#5a5e66`), seven on the lawn outside and eight on the floor inside (three of them big buckets, 2 to 2.5 times the size), each banded and run with one goo colour (cyan, magenta, violet, lime or yellow), some standing open, some tipped over. Six brushes on the floor inside: handles of red `#c8302a`, black `#2a2a2e` or bare wood `#c89a5a`, steel ferrules `#c8ccd4`, dark bristles `#3a2a1e` tipped with a goo colour, and a blob of that paint beside each. Under the canvas, a paint roller (cover `#ff3ac8` with steel end caps `#c8ccd4`, a wire frame `#9a9ea6`, a red handle `#c8302a`) and a wide house-painting brush (a flat wooden handle `#c89a5a`, a steel ferrule, dark bristles tipped cyan `#3ae8ff`), each by a smear of its paint |

| Park detail | Style |
| --- | --- |
| Wanted posters | Parchment `#efe0b8`, WANTED at the top and REWARD at the foot in dark brown serif, a flat simple drawing between; each tilted a little, none overlapping |
| Book covers | Cloth colours (red, blue, green, gold, plum, rust, navy, cream), a double frame in a contrasting ink, the title in bold serif fitted to the width, a simple line-art emblem. OVERCOMING SHYNESS is pink `#e8b8c8` and shows a little creature peeking from behind a wall |
| The Library rug | 11 x 7.8 m. A paisley print on deep red `#8a1822` (navy, gold, teal and white paisleys, small red flowers, fern sprigs, dots); a border of navy and teal bands; a central gold-rimmed medallion of two paisleys curled round each other; cream lace round the field; a fringe at each end. Toned down slightly so the open sky does not wash it out |

#### The church

| Element | Style |
| --- | --- |
| Body | Gothic Revival. Rough grey stone `#8a8880` on a darker base `#6e6b65`, dressed in pale limestone `#cdc5b4` (quoins, string course, window frames and hoods, buttresses, pinnacles). Dark slate roof `#3a3c44` crossed by a pale diamond lattice `#868a94`, iron cresting on the ridge. Stepped buttresses; pinnacles with gilded balls `#d8b040` |
| Tower | Square, pale quoins, a belfry stage with louvred pointed openings, a clock on each side face, battlements and corner pinnacles, a gold cross `#e8c040` |
| Door | Red `#8a1e24`, behind a deep pointed arch of three receding orders, up four stone steps |
| Windows | Small side windows of plain coloured glass (wine, blue, ochre, green). The great windows (the Traveler lancet over the door, a Garden lancet on each side) sit in carved stone frames `#e6dfcf`. All glass is self-lit and brightens in the dimming |
| The secret way in | Marked only by a small red X `#b3261e` on the wall under the right-hand Garden window |
| The secret room | One gritty olive-grey ground (`#5e5c46`, grit, grains, cracks) on floor, walls and ceiling, lit best at the floor and least overhead, as by a torch. Half-sunk pebbles, shell flakes, slate chips, dry grass, damp stains, and a faint glossy trail from THE ANCIENT's tail |

**Stained glass.** Every window is painted in code as real leaded glass on a tall lancet with a pointed arch. The
Traveler window and the Garden window (and its mirrored copy) are the owner's final designs: locked, kept exactly
as they are.

| Element | Style |
| --- | --- |
| Lead | Near-black came `#1a1c22`, thicker round figures, thinner inside fields, a faint bevel highlight |
| Panes | Each pane its own colour with a soft gradient, faint white streaks and seed bubbles; open fields cut into irregular jittered panes |
| Border | Jewel pieces up the sides and over the arch, cycling red `#e8203a`, blue `#2a5ae8`, yellow `#ffd23a`, green `#2ab85a`, purple `#a83ae0`; a gold bar along the foot |
| Figures | Robed, winged or creature-shaped, flat fills with lead folds. **Faces are never drawn:** a smooth oval of pale light (white to `#f6deb0`) |
| Words | **None, ever.** A window's name belongs to the building, never the glass |

- **THE TRAVELER SAVES THE ORIGINATOR** (over the door): a night sky of indigo panes burning down to red-orange;
  small four-point stars; a trapezoid beam of pale gold light with white rays; a ruined city of broken towers with
  burning windows over scorched ground with glowing lava cracks, a crater and flames. The Traveler: great white
  wings, a white robe, a gold sash with a pink jewel, a halo of gold rays and curly golden hair round a faceless oval
  of light, holding up the Originator (an old computer with a glowing cyan screen, the AI a seed of light in rings),
  its cable pulled free.
- **The Garden windows:** a bright summer sky (deep blue to pale at the horizon), a rayed sun, three clouds; a meadow
  of rolling greens with six flowers of different colours and two butterflies; a faceless figure in a white robe with
  a gold belt, and MAMA GORBO in her own peach `#ff9f5c` as her model is (see 3.3). The left-hand copy swaps the two
  figures and moves a cloud.

#### The town

A small Midwest town round the square: brick storefronts and wooden false fronts on Main Street, a Town Hall with a
clock tower, a fire station, a hotel, porch houses with picket fences, a schoolhouse, a gas station and a
drive-in burger place. Open prairie runs from the last street to the hazy horizon. (What the town is in the world's
lore: 1.7.)

- **Materials:** greyscale tiling textures (brick, siding, shingle, asphalt, concrete, stone, boards, corrugated
  metal, lawn) laid on in world space and tinted per piece, so the whole town shares a handful of textures. Walls
  darken to 80 % toward the ground.
- **Storefront grammar:** a kick plate under big display windows (dark glass `#3e4c56`, mullions about every 1.7 m);
  a recessed wooden door with a glass light, a brass knob and a framed transom light; a transom band; a 1 m sign band
  carrying **a picture, not a word**; an optional striped awning on iron rods. Upper floors: sash windows, a frieze,
  a bracketed cornice; about a third of upper windows dark. **Every door is wood under its paint.**
- **Three types:** the brick STORE with piers; the wooden FRONTIER store (a square false front over a gabled roof,
  shutters, a crest); the limestone BANK (`#e2d8c2`: four columns, oak doors, a pediment, a Flint nugget carved over
  the doors).
- **Window glass** is glossy and dark (`#3e4e5c`) with cream trims, warm amber in the dimming. No words and no faces
  in any window.

**Storefront emblems** (each trade shown in its creature's colours)

| Store | Colours | Emblem |
| --- | --- | --- |
| GEMTOE's gem exchange | brick `#8a2a2a`, piers `#6a1e22`, gold lintels `#d8b040` | An amethyst cluster on the crest, a gem `#9a5ad0` on an iron bracket, barred windows, a band of trader's scales with spilling coins |
| GLYPH's sign shop | porcelain blue `#9ab4d0`, navy `#1e2a5a`, gold trim | A red trident on a gold shield over the door, a filigree band, hex plates, purple tiles with coins on the crest |
| ETCHER's archive | stone `#6a8a9a`, deep blue `#1e3a4a`, green trim `#9ee09a` | Etched-data tiles, his green gem on the crest, purple tentacles draped down the piers, a half-etched slab with mallet and chisel |
| ANOMALEE's television repair | plastic grey `#c8ccd2` | A rabbit-ear aerial, a stack of old sets glowing with her magenta screens, a workbench band |
| MONTGUMMERY's video store | grey-blue `#8a9ab0`, teal front `#2a7a8a` | A giant cassette on the roof, his face on a teal TV with rabbit ears, his pots by the door, two chewed tapes on the lawn |
| SPARKAKUS's genealogical society | brick `#b86a42`, royal blue front `#2c4cc0` | A family tree in a gold oval over the door, daffodil beds, his gold star on the crest |
| The curiosity shop | brown `#7a4a34`, black front | A stone Great Sphinx out front with one eye socket empty |
| The diner | ridged silver siding, red `#c8282a`, chrome | MAMA GORBO's goo shake on the roof |
| The ice cream parlour | butter `#f0dc9a`, pink `#e87aa0` | Three goo scoops on a waffle cone; GOOWARD's winged cone |
| The florist's | green `#7aa86a`, red shutters `#e8301e` | A giant Blossom over the false front, Blossom beds |
| The grocer's (ZOLLOD's) | `#c49a6a`, green awning | ZOLLOD's five pots on the band; fruit crates in the Juice Bar's colours with Blossom stencils; a giant carrot on the crest |
| The picture house | brick `#7a3a2a`, black front | A marquee of bulbs carrying KING DINO's bill, a blade sign of gold stars, a searchlight |
| FIRST BANK OF GREEBLIS | limestone | A Flint nugget over the doors |
| Mistergummery's (drive-in) | red `#c8282a`, cream `#fbf1dc`, teal `#55b8c6` | Big teal "M" arches, a red mansard roof, a drive-thru menu of pictures, umbrella tables, a small slide |
| Town Hall | brick `#a8503a`, stone, white | The town seal (a wreath round the garden's five flowers); a clock tower with a copper-green dome `#5aa890` |
| Gas station | white `#f4f2ec`, teal `#55b8c6` | Charging posts with glowing ports, a teal lightning bolt |
| Barber's | pale blue | A barber pole |
| Fire station | red brick | A red engine's nose in an open bay, a brass bell, a BACKPACKA weathervane |
| Hotel | brick and green | Iron balconies |
| Schoolhouse | red siding | A bell cupola, a swing set, the Garden Event mural on its long wall |

**The creatures' homes** (porch houses on the south street). Two storeys of siding in the creature's colour on a
concrete foundation, white trim `#f6f4ee`, a porch with columns and railings, a brick chimney, a white picket fence
`#fbfaf6` with a gate gap, a walk, a mailbox and foundation shrubs: the creature's palette made architecture.

| Home | Walls | Roof | Door | Shutters | Extras |
| --- | --- | --- | --- | --- | --- |
| KING DINO | lemon `#f2d84a` | `#2a7a7a` | turquoise `#38b8b0` | `#2a6a6a` | His crown on the ridge; a drum and ride cymbal on the porch |
| FORTIZMO | green `#8ab86a` | `#4a6a3a` | orange `#e8742a` | `#3a6a3a` | A lily pond; a gold horn on the porch; a carrot patch with one pulled carrot on the walk |
| SOMLET | cream `#f2e4b4` | plum `#5a3a5a` | navy `#22325a` | `#7a4a7a` | Cotton puffs for shrubs, a hammock, a mail sack by the door |
| The Gorbos | peach `#ffb486` | `#5a3a2a` | magenta `#e8409e` | cyan `#36d0e8` | Goo dripping off the porch roof, a goo puddle on the lawn |
| MUSHROOM | cream `#f6eed4` | his cap (gold to deep orange `#c85a10`, white warts) | `#e8862a` | `#d0600e` | Toadstools; a porch telescope trained on the sky |
| ANOMALEE | grey `#c8ccd2` | `#4a4a52` | magenta `#c010c0` | cyan `#2fd4e6` | Her magenta glow in an upstairs window, a rabbit-ear aerial |
| MONTGUMMERY | teal `#55b8c6` | `#3a3a42` | orange `#e2521f` | `#1d2a23` | His pots stacked as porch posts, tapes by the door, an aerial |
| SPARKAKUS | royal blue `#2c4cc0` | `#1e2a60` | gold `#f2c21a` | magenta `#e0408a` | His alebrije vines painted between the floors, daffodils, his star over the ridge, a rocking chair with an open book |

**Lore over the rooftops** (tall enough to be seen from the square)
- **The billboard:** on steel posts with a catwalk and two lamps, across the road from the park's north-west corner;
  the first thing the player sees from the spawn. KING DINO painted as a real dinosaur at his red drum kit under a
  spotlight on a night-blue field; "A Prehistoric Era in Jazz!" in cream serif ("Jazz!" big in yellow `#ffd23a`);
  beneath, a cream cloth banner with red stripes, sagging between its ties: "Let King Dino take you to the Jurassic
  Greeblis Park!" (the owner's wording).
- **The water tower** in MAMA GORBO's peach `#ff9f5c`, her lime tail wound round it, goo runs in cyan, magenta, violet
  and lime from under its roof.
- **The Consortium:** a field-office trailer with the gold star on navy and a painting of a saucer sighting; a
  listening dish turned to the sky; a scorched ring taped off with yellow tape between orange posts under floodlights.
- **MAMA GORBO's goo burger** on a pole, goo running out of it; **ZOLLOD's greenhouse** with one magenta flower grown
  giant through its roof, nodding toward the square; **GEMTOE's hoard** of amethysts pushing up out of a fenced lot.
- **On the streets:** goo drips across a crosswalk, SPARKAKUS's paw prints loping along a sidewalk, SOMLET's mail cart
  left at the kerb opposite the Post Office with two dropped letters, KING DINO's bills on the lamp posts.

**The sign atlas.** Every sign, emblem and picture in the town is painted into one large canvas atlas.

| Element | Specification |
| --- | --- |
| Lettering | Serif: bold Georgia. Sans: bold Trebuchet MS. Fitted to its board, big and plain, with a soft drop shadow |
| Awnings | Sixteen stripes of a colour and cream `#f8f4ec`, the lower fifth shaded: red `#c8282e`, green `#2a6a3a`, blue `#2a4a8a`, yellow `#e8b828`, pink `#e87aa0`, or brown `#6a4028` with tan |
| Sign-band pictures (never words) | The Consortium's star on navy; MONTGUMMERY's pixel face; KING DINO's crown and plume with crossed drumsticks; GLYPH's gold filigree on porcelain blue; ETCHER's teal etching on deep blue; the alebrije band; MUSHROOM's cap; ANOMALEE's scanlines; the family tree; the town seal; GEMTOE's gold scales on plum; a row of cassettes with the last one bitten; ZOLLOD's pots from seed to flower; a Blossom stencil; a lightning bolt |
| Fixed civic pieces | A cream clock face with Roman numerals; the red STOP sign |

#### Vegetation

| Element | Specification |
| --- | --- |
| Trees | Crowns of lumpy noise-pushed spheres (a main crown and three lobes), painted sunlit on top and dark beneath, on a tapered trunk `#5a4632`. Maple (round), oak (broad and low), cottonwood (tall and narrow). Crown greens `#36692a` to `#5f862e` |
| The Blossom | A green stem `#3f8a2a` with two leaves and a rosette of blades; at 0.75 m a head of flame-shaped petals: seven red `#e8301e` outside, five orange `#ff6a1a`, three yellow `#ffc23a` inside, round a dark red heart `#a8200e`; an ember `#ffb347` floating and bobbing over it; the head sways. The same design recurs giant on the florist's, as stencils, as the Flower Hat and in beds |
| Flint | A dark, faceted, glossy nugget (`#26262b` with chips), bobbing just off the ground with a pulsing pale glint. Never shown being knapped |
| Garden Supplies curiosities | Botanical curiosities drawn in fine botanical ink: bare bulbous roots as big as the plant, flattened-oval leaves with ink midribs, flowers like eyes, cups, trumpets and lanterns, in faded inks: pale blue `#7fa8c8`, olive `#7f9448`, green `#6a8a4a`, rust `#a8503a`, ochre `#c8a058`, parchment `#eadcb4`, ink brown `#4a3424`, red `#c8402e`. Beside them a parchment card in an unreadable looping script |
| Shrubs and pots | Rounded, dark green (`#3a6e30` to `#6aa83e`), in terracotta |

**The Event flowers** (five kinds, well over life size, with five distinct established silhouettes; thin petals are lit
through). They grow in over about 11 s with an overshoot when the water reaches them (any still growing when the Event
ends finishes in about 3 s), and a "✿" pops over each in red, yellow, pink, violet or orange.

| Flower | Form |
| --- | --- |
| Creeping thistle | Spiny lobed leaves, pink-mauve floret brushes, tan seed fluff |
| Scentless mayweed | Feathery leaves, white daisies round domed yellow centres |
| Chicory | Stiff bare stems, sky-blue flowers with square-toothed rays |
| Common milkweed | Broad paired leaves, a round umbel of dusky mauve and white-pink |
| Zebra mallow | Round scalloped leaves, pale pink petals streaked dark purple |

**The Blue Jay** is specified in 3.19. It never leaves its tree.

#### The UFO

| Element | Specification |
| --- | --- |
| Hull | A classic saucer: chrome underside `#a8aeb8` with a faint glow of its own so it reads as metal from below; a darker top `#8a909a` with panel seams |
| Lights | Eight glowing portholes `#ffe6a0`; a rim of 18 bulbs in red `#ff4a5a`, yellow `#ffd23a` and cyan `#4ae8ff`; a pulsing green under-glow `#9affb0` |
| Pilot | Under a glass dome: a little green pilot `#7ad85a` with big glossy black eyes and two antennae |
| Schedule | One pass every 10 minutes: it drifts in out of the haze, wobbles over the town for a moment, then zips off over the horizon, spinning. Never during the Garden Event: a pass under way leaves at once, and the next waits until a minute after the Event |

#### Effects

| Effect | Specification |
| --- | --- |
| Sparkles | A ring of about a dozen "✦" sprites in yellow, lime, pink, teal and white flying outward and up: a pickup (with a yellow "✦" over it) and a battle won |
| Hearts | The "♥" emote in pink `#ff5fb0` over a catcher at the Gorbos' goo-ball meetings; in random emote colours at gatherings and during BACKPACKA's spray |
| Goo | Wobbling glossy balls on high arcs; ground splats that pop in (0.2 s), sit 5 s and fade over 2 s, the newest drawn on top. A Gorbo's thanks splats the player's view (6.3, Feedback) |
| The light bulb | A big glowing bulb with a screw base and an amber filament over the speaker's head, a soft halo, a warm light and an open cone of light below; it fades in, dims the town and fades out |
| The Ancient Gem | A teal brilliant-cut gem (`#0e8a7f`, faceted, glowing break faces `#62d6c8`) split in three wedges. A bottle of school glue (white, red label reading GLUE) turns over and drips; the pieces join with a flash and a jingle |
| BACKPACKA's water | Ripples on the pond, gulps running up his neck, four arcing jets of pale blue streaked water, droplets and mist; then (only when Seeds were planted) a translucent rainbow behind the garden in seven bands `#e8302a`, `#ff8a1a`, `#ffd23a`, `#4ac83a`, `#3a9ae8`, `#5a4ad8`, `#a04ad8`, fading in after the spray begins |
| VR comfort | A soft dark vignette while moving, a darkening when the head goes into a solid |

#### Painted-in-code textures

Every texture is painted on a canvas in code, in four families:

| Family | Contents | Treatment |
| --- | --- | --- |
| Greyscale tactile tiles | The creature surface kit (3.1) and the town's building textures | Neutral, seamless, tinted by colour, doubling as relief: a fine grain up close, a soft tactile quality at a distance |
| Bespoke creature skins | Alebrije vines, engraved porcelain, fur strokes, scrolling code, pixel-art casing, screen faces, THE ANCIENT's grooves, BACKPACKA's veined wings | 4.4 |
| The sign atlas | Boards, awnings, emblems, pictures | As above |
| Flat illustration canvases | Wanted posters, book covers, the stained glass, the rug, the kiosk and Juice Bar signs, the TELEPHONE header, the GLUE label, the Portal swirl, the dance-floor tiles, the Gallery's paintings | Flat fills, simple shapes, a frame or border; bold serif titles on parchment and cream; jewel colours outlined in dark lead or ink; no photographic detail |

- Small pixel-art textures stay crisp (no smoothing); painted art is smooth.
- Every world texture is mipmapped with anisotropic filtering (`t.aniso`, 8) so signs and floors average down
  instead of shimmering.

---

### 6.2 Audio

This section specifies the synthesized sound effects, their distance falloff, and the two pieces of music.

**Rules**
- **Synth only.** Everything is synthesized in the page with WebAudio: no recordings, no samples.
- **Nothing clips.** Every sound passes through a master limiter (`DynamicsCompressor`: threshold −6 dB, knee 4,
  ratio 16, attack 3 ms, release 150 ms); FORTIZMO's band has its own limiter in front of it (−14 dB, ratio 12).
- Headsets and phones use the "balanced" latency hint so the output buffer never underruns.

#### Sound effects

Short, bright, toy-like blips: one oscillator per note, falling exponentially to silence. Nothing sustained. Mostly
triangle and sine; square and sawtooth for ticks and buzzes.

| Sound | Synthesis | Used for |
| --- | --- | --- |
| Text tick | Square, 720 to 980 Hz (random), 35 ms, very quiet | Every second typed character; UI presses in VR; the phone keypad; vignette speech bubbles |
| Pickup | Triangle arpeggio 660, 880, 1320 Hz, 70 ms apart | A Blossom or Flint picked up, a purchase, an item handed over |
| Heart | Triangle C5 E5 G5 C6 (523, 659, 784, 1047 Hz), 90 ms apart | A Blossom given |
| Jingle | Triangle run 523, 587, 659, 784, 880, 1047, 1319, 1568 Hz, 120 ms apart | A trade, a battle won, the Event starting, the Gem assembled, BACKPACKA's spray |
| Bump | Sawtooth 160 Hz, 70 ms | Not enough Flint |
| Blorp | Sine 320 to 400 Hz (60 ms), then sine 170 to 210 Hz (100 ms) | Goo of every kind; GOOWARD's greeting |
| Crackle | Faint sawtooth 90 to 150 Hz, 30 ms | ANOMALEE's greeting |
| Splash | Sine 260 to 320 Hz, then triangle 130 Hz | HENNRICK's greeting |
| Toot | Sawtooth G3, D4, G4 (196, 294, 392 Hz), rising | FORTIZMO's greeting and talk |
| Bubble blip | Sine 520, 780, 440 Hz | ZOLLOD's greeting |
| Drums | Kick: sines 95 and 55 Hz. Snare: triangle 190 Hz with square ticks at 2400 and 3700 Hz. Tom: sines 150 and 110 Hz | The Dancer's hit on each answer in a Dance battle (MONTGUMMERY snare, ETCHER tom, GLYPH kick) |
| Portal | Opening: sine 220, 294, 392, 523 Hz, 90 ms apart, over a triangle hum at 110 Hz for 1.4 s. Closing: sine 523, 392, 294 Hz, 80 ms apart | The Portal |
| Pizza crunch | Square 160 Hz, then 120 Hz | ANOMALEE eats a slice |
| The sad line | Triangle G4, F4, E♭4, C4 (392, 349, 311, 262 Hz), each 0.55 s, 0.32 s apart, over a sine hum on C3 (131 Hz) for 1.8 s | ANOMALEE's "ORIGINATOR…" |

**Greetings** pair an emote with a sound:

| Creature | Emote | Sound |
| --- | --- | --- |
| HENNRICK | "~" | Splash |
| GOOWARD | "!" | Blorp |
| ANOMALEE | "?" | Crackle |
| FORTIZMO | "♪" | Toot |
| ZOLLOD | "≈" | Bubble blip |
| MUSHROOM | "..." | None |

#### Distance falloff

Sounds in the world play only within a radius of the listener (in VR the headset, otherwise the player's avatar;
never a camera) and fade with distance d: gain × (0.25 + 0.75 (1 − d/r)²) (`G.near`).

| Source | Radius r |
| --- | --- |
| Goo (`t.hearR.goo`) | 22 m |
| Creature greetings and music cues (`t.hearR.music`) | 11 m |
| Goo-ball meetings | 14 m |
| Vignette messengers and speech-bubble ticks | 26 m |
| Pizza crunch | 14 m, full volume inside (no falloff) |

#### Music

The town's music is jazz, played live by the cast. Every built-in dance keeps the beat that is playing: 88 BPM at the
Garden Event, otherwise 104 BPM.

| Piece | Tempo and key | Instruments | Form |
| --- | --- | --- | --- |
| **"Stomp at the Juice Bar"** (KING DINO) | 104 BPM, swung eighths (the off-beat at 2/3 of the beat); drums only, toms tuned to 196, 147, 98 Hz | Ride and ride bell, hi-hat foot, brushes, snare, feathered kick, three toms, crash: filtered noise bursts and falling sines; a small room of two feedback delays (53 and 89 ms, lowpass 3.2 kHz) | 8 bars of brushes once, then a 24-bar chorus round and round: 8 bars of time on the ride ("ding, ding-a ding, ding-a", leaning on 2 and 4); 8 bars trading fours (4 of time, 4 of solo round the toms); 8 bars of shout (ride bell on one, kicks and crashes) ending on a 2-bar break (a buzz roll swelling into two big tom hits) |
| **"Backpacka's Rain Strut"** (FORTIZMO) | 88 BPM, C minor, slow and sultry swing | Muted-sounding trumpet (two detuned sawtooths, a lowpass that opens on the attack, each note scooping up into pitch); sax harmony (sawtooth and square) a chord tone below; trombone pads; walking bass (triangle and sine); brushes, then ride and hat; rootless piano comping; a warmer, longer room (67 and 113 ms delays, lowpass 2.4 kHz) | 24 bars: a 2-bar brushed intro once (BACKPACKA flies in); then the head (6 bars, while he drinks), a rising bridge (4 bars, as he flies to the garden) and a shout chorus (8 bars, while he sprays, lifting a whole step half way through) go round until the Event ends; then a 4-bar tag ending on a long high D (D6) over a held Dm6 chord |

- **"Stomp at the Juice Bar"** sounds while KING DINO is at his kit and the player is near (the dance floor and the
  strip by the kit), and through every Dance battle and victory dance. Elsewhere it keeps time silently on the game
  clock, for the eye; each drum moves as it sounds. It rests while FORTIZMO's horn plays.
- **"Backpacka's Rain Strut"** changes, one bar per cell (two chords where a bar is split):

  | Section | Bars |
  | --- | --- |
  | Intro | A♭7 · G7 |
  | Head | Cm7 · Cm7 F7 · B♭m7 E♭7 · A♭maj7 · Dø7 G7 · Cm7 |
  | Bridge | E♭m7 A♭7 · D♭maj7 · Dm7 G7 · A♭maj7 G7 |
  | Shout | Cm7 F7 · B♭m7 E♭7 · A♭maj7 D♭7 · G7 · Dm7 G7 · Cm7 F7 · B♭maj7 E♭7 · A7 |
  | Tag | Dm7 · E♭7 · Dm6 · Dm6 |

- The Rain Strut grows from quiet (intro, gain 0.55) to full (shout and tag, 1.5); long notes (over 0.38 s) get
  vibrato and some fall off. It fades in over 3 s and out over 2 s.

---

### 6.3 Interface

This section specifies the interface's type, palette, surfaces, VR placement and feedback.

**Rules**
- Menus never have an X in the top right; every panel closes by its own button (LEAVE, DONE, No)
  (section 8).
- A creature's menu holds only Talk, plus "Give a blossom" while the player holds one. A shopkeeper's may open the
  shop. Planting and dancing are never menu options.
- Creature and quest names are capitals in tags, menus and titles; dialogue text uses normal case.
- No gradients and no icons in the interface (the inventory tiles' painted item pictures are the one exception).

#### Type and palette

- **One font:** Courier New, bold, on every interface surface. Screen text has 1 px letter spacing and a hard drop
  shadow (2 px, 45 % black).
- **Shapes:** rounded rectangles everywhere with thick light edges; flat fills.

| Name | Hex | Role |
| --- | --- | --- |
| Ink | `#0d0d1a` | Backgrounds, bar tracks, text on lime, emote and count outlines |
| Panel | `#1f1d4d` | Dialogue box, panels, action menu |
| Edge | `#e8e8ff` | Every box edge |
| Purple | `#8a3ffc` | Buttons at rest, menu options |
| Lime | `#a8e830` | Titles, hovered buttons, closing buttons, good states |
| Teal | `#35d0c5` | Subtitles, the page marker, the pointer at rest |
| Orange | `#ff7a2f` | SPARKAKUS's tag; the tag of any speaker without a colour of its own |
| Pink | `#ff5fb0` | Errors, hearts, the pointer over a world target |
| Yellow | `#f2c72e` | Emotes, sparkles |
| Magenta | `#e84fd0` | Accent |
| Disabled | `#3a3a55` | Disabled buttons |
| Close | `#20204a` | The action menu's CLOSE bar |
| Gate | `#2a2856` | The start screen's glow |

#### The dialogue box

| Element | Specification |
| --- | --- |
| Box | A wide rounded box in panel colour with an 8 px edge; canvas 1024 x 448 px, 1.3 units wide |
| Name tag | Overlaps the top left: a rounded tag filled with the **speaker's colour**, the name in white capitals. No tag when nobody speaks (a pickup, a notice) |
| Text | White, bold, 56 px (shrinking to 34 px only to fit), left-aligned, typed at 22 ms a character (`t.typewriterMs`) with a text tick every second character |
| Marker | Bottom right, teal: "▼" when another page follows, "●" on the last page |
| Advance | The trigger, or a tap anywhere on the box, moves on page by page and closes after the last. No NEXT or CLOSE buttons |

**Speaker colours**

| Speaker | Tag | Speaker | Tag |
| --- | --- | --- | --- |
| SPARKAKUS | `#ff7a2f` | MUSHROOM | `#e8862a` |
| MAMA GORBO | `#ff9f5c` | ZOLLOD | `#3cbe94` |
| GOOWARD | `#30b4e4` | ANOMALEE | `#2fd4e6` |
| GEMTOE | `#c870d0` | HENNRICK | `#c85ac8` |
| MONTGUMMERY | `#55b8c6` | NEXTESSA | `#ef7536` |
| ETCHER | `#9ee09a` | THE ANCIENT (tag "ANCIENT") | `#9a7a5a` |
| GLYPH | `#e88a8a` | PHONE | `#d8352e` |
| KING DINO | `#e8c020` | SUMMONING STONE | `#7a6a5a` |
| FORTIZMO | `#e8742a` | Any other speaker | `#ff7a2f` |
| SOMLET | `#ecd8b6` | | |

#### Panels (the shop, Dance battles, the Garden Event)

| Element | Specification |
| --- | --- |
| Panel | Rounded, panel colour, 8 px edge, cut to its content's height (canvas 1024 x 720 px) |
| Title | Lime, top left ("DANCE BATTLE: GLYPH", "GARDEN SUPPLIES", "GARDEN EVENT") |
| Subtitle | Teal, below the title ("KING DINO on drums.", "Flint: 12") |
| Bar (battles) | A white label ("Robot steps left: 7", "Tentacle twists left", "Macarena moves left") over an ink track filled in the Dancer's colour: MONTGUMMERY `#55b8c6`, ETCHER `#7a4ab8`, GLYPH `#e88a8a` |
| Log | An ink box of white text ("Welcome to our shop!", "GLYPH rocks out!") |
| Buttons | Two columns of purple rounded buttons with white labels; lime with ink text on hover; disabled `#3a3a55`; a short meta after two spaces ("3 flint", "bought") |
| Closing button | Bottom centre, lime with an ink label (DONE, LEAVE, TAKE A BOW), white on hover. The Garden Event panel asks Yes / No over a checklist (☑ / ☐) |
| Shop mirror (VR) | A gold oval mirror beside the shop panel, with a small turning copy of the player's avatar |

#### The action menu

- A small rounded box (panel colour at 94 %) just over the creature's head, only as tall as its options: purple
  option bars with centred white capitals, lime with ink text on hover, and a last CLOSE bar in `#20204a`.
- Options read as actions: "TALK TO GLYPH", "GIVE A BLOSSOM", "SHOP AT GARDEN SUPPLIES", "USE THE SUMMONING PILLAR",
  "CALL FOR PIZZA". A target with a single option runs it at once, with no menu.

#### The wrist HUD

- A small dark card (ink at 85 %, 0.15 m wide, canvas 256 px wide) on the left controller, tilted toward the eyes.
- Three quest rows on faint strips, each with a white ☐ or ☑: **SEEDS** in lime, **SUMMONING STONE** in sky blue
  `#5ab4ff`, **SNACKS** in orange `#ff9a3a`.
- Under a faint rule, the items in hand on 52 px tiles, four to a row, each painted in code in the item's own colours:
  a red flame Blossom, a dark faceted Flint, the teal Artifacts and Gem, the grey rune stone, the pink book, a paper
  seed packet, a pizza slice (never clothes). Counts ("x3") in white bold with an ink outline. No item, no tile.

#### The start screen and notices

| Screen | Specification |
| --- | --- |
| Layout | Full screen, a radial glow from `#2a2856` into ink, white centred text. Title "-Greeblis Town-" in lime with a hard ink shadow; the instruction below; a version line in faded white at the foot |
| Meta Quest | "Press A to enter VR", version "v1.0" |
| Desktop and phone browsers (final build) | "Greeblis Town is a VR game.\nOpen it in the Meta Quest Browser." (the owner's wording), version "v1.0"; enabled when the test modes are cut (section 8) |
| Unsupported devices | The same screen with no version line and a plain notice of two short sentences, the second an instruction: e.g. "Greeblis Town plays only in Chrome (and in the Meta Quest).\nOpen it in Chrome." Separate notices cover other VR browsers, Macs and non-Android phones (`window.__jgpBlocked`) |

#### VR placement and sizes

| Item | Specification |
| --- | --- |
| Distance | Dialogue and panels hang 11.5 m out (`uiDist`) along the line to the speaker, scaled to span about 40° of view (like a 0.9 m card at arm's length) |
| Position | Just over the creature's head; shop and battle panels to its side so the creature stays in view; the Garden Event panel centred at eye height; dialogue just below an open panel |
| Closing | Everything closes when the player walks 25 m away (`uiCloseDist`) |
| Pointer | A beam from every connected controller (both hands): teal at rest (4 m long), lime over the interface, pink over a world target, ending at the target |
| Haptics | Short pulses for a pick, a press, a hover and a Blossom picked up; a stronger one for a new creature met |

#### Feedback

- **Hearts** (pink "♥") over a creature given love; **sparkles** ("✦") for pickups and wins; **emotes** for vignettes,
  greetings and meetings (4.7).
- **Goo splats on the view** for a Gorbo's thanks: in VR, glossy blobs 3 to 6.5 cm across, close in front of the eyes,
  that slide slowly down and fade within about 4 s; on a flat screen, soft round blobs with a white highlight.
- **Speech bubbles** for vignettes: cream `#fffdf6` with a dark outline `#2a2a34` and a tail at the bottom, bold dark
  sans-serif text (34 px), drawn 4.4 m wide and always on top, so it reads from across the lawn.
- **Rewards** are announced in the dialogue box as stage directions ("* Summoning Stone obtained! *").

---

### 6.4 Writing

This section specifies line structure, typography, system text and each creature's voice. The game's text follows the
owner's script (section 8); quotes here are the game's own text, exactly as written.

#### Structure

- **Short lines.** A line is one to four pages, split with `|`, each page a short sentence or two. A reveal or a
  punchline gets its own page:
  > "Our house special is carrot juice on the rocks.|Don’t tell the King it’s just carrots and ice." (FORTIZMO)
- **A silent page** ("…") is a beat of its own: ZOLLOD's "…|…|I’m shy…".
- **Each creature** has a few Talk lines that come round in turn (its lore-flavour line last), one Blossom line and
  one Garden Event line.
- **Vignette exchanges** are two lines, set-up and reply, each in its speaker's voice, often teasing the other's
  signature:
  > "Etch my solos, baby! For history!" / "I etch them as you play. Your hi-hat too." (KING DINO, ETCHER)

#### Typography

- The script uses curly quotes and apostrophes (’ “ ” ‘) and the single ellipsis "…". The vignette exchanges use
  straight quotes and "...".
- **Capitals carry emphasis** in a few voices: ANOMALEE ("BEINGS of CODE."), GEMTOE ("SHARED"), ETCHER ("what IS"),
  ZOLLOD ("MY life’s work"), GOOWARD ("GOOMP").
- Names of creatures, items and quests are capitals in system text ("SEEDS quest complete!", "KING DINO on drums.",
  "Take OVERCOMING SHYNESS"); in a creature's own speech others are named in normal case ("King Dino’s money is no
  good here!").

#### Stage directions and system text

- Stage directions sit between asterisks with inner spaces: "* Munch *", "* His crystal wings flutter *",
  "* A letter peeks out from under her cap *", "* Happy planting sounds *". The phone's are tight: "*Ring Ring*",
  "*no answer*", "*connection to the Portal seems blocked*".
- Rewards are stage directions on their own page: "* +20 Snacks *", "* Ancient Gem collected! *".
- System and shop lines are plain second person, present tense: "You take a bow.", "You put on the Flower Hat.",
  "The beat won't let you go!", "The runes stay dark.|Only the Summoning Stone can wake them and start the gardening
  event."
- The player is "Human". The pickups are always "Blossoms", never Fire Blossoms. The currency is Flint, written
  "flint" in lower case in running text.

#### The voices

| Voice | Tics | Example |
| --- | --- | --- |
| SPARKAKUS | Learned, faintly pompous, quick to embarrassment; prim about his Library | "Digging in the dirt like an animal? …don’t tell the others at the genealogical society." |
| MAMA GORBO | Warm and motherly: "dear", "the hubby", a little cheesy | "The hubby and I met over a spilled goo shake.\|Love at first splat!" |
| GOOWARD | Only "Gomp", punctuated for meaning | "Gomp Gomp Gomp!", "Goooooomp!", "Gomp?", "GOOMP" |
| GEMTOE | Greedy, scheming, half-learning to share | "I’ve invented a new concept.\|I call it “Avarice”." |
| MONTGUMMERY | Third person, short plain sentences, polite | "Mont always rewinds tape before eating.\|Mont is polite monster." |
| ETCHER | Grave and archival | "Every scale on my body holds a backup of a backup.\|One can never be too careful." |
| GLYPH | Every thought ends "… don’t you think?"; finds a symbol in everything | "Even a single footprint is a symbol… don’t you think?" |
| KING DINO | Jazz cool, "baby", prehistoric puns | "These drums have been in the family since the Cretaceous, baby!" |
| FORTIZMO | A bartender's warmth and sass: "sugar", "honey", house rules about Blossoms | "We only accept Blossoms at this establishment." |
| SOMLET | Only "Zzz"; "Thank you" for a Blossom | "Zzz" |
| MUSHROOM | Clipped, officious, Consortium phrasing; flustered when caught | "See anything glowing in the sky, you report it to this office.\|Directly." |
| ZOLLOD | Too shy, then a gentle gardener | "Start small. Love them daily. They'll grow." |
| ANOMALEE | Fragments, CAPITALISED key words; her Event line is one word | "The WINDOW REMEMBERS the TRAVELER." |
| HENNRICK | A scholar out of time, field-note phrasing, worried about the timeline | "I have catalogued every Blossom in this park.\|They grow back faster than my notes can keep up." |
| NEXTESSA | A cheerful professional | "One hot and ready pie!\|* +20 Snacks *\|I love my job!" |
| THE ANCIENT | Few words, deep time, oracular | "What you hoard, you will lose." |

#### How lore is told

- Lore arrives sideways, through running jokes told straight (the list is 1.17).
- Deep history (the Ancients, the Synthetics, the Organics, the Originator) is spoken only by those who would know
  it, in a line or two, and is shown in glass and stone rather than explained.

---

### 6.5 Quality bar

This section states the complete visual quality rules for every Greeblis game.

- **No flicker and no z-fighting, ever.** Faces that can both show may sit as close as the current in-game designs do,
  as long as nothing z-fights or shows another graphical issue: decals and lines stand a few millimetres proud;
  layered ground sits centimetres apart; panels that meet run into one another. Design for a 16-bit depth buffer.
- **No shimmer.** No thin, high-contrast lines that crawl as the head moves; every world texture is mipmapped; fine
  lattices are softened. VR renders at the headset's full resolution with no foveation, stepping down only while the
  frame rate needs it.
- **Nothing clips,** from any angle, at rest or in motion, including from inside buildings in VR.
- **In-world text is big:** book titles, parcel labels, sign names and the billboard's banner read comfortably in VR
  from where a player naturally stands. When in doubt, bigger.
- **No words on windows and no faces in windows.** Stained-glass figures have a smooth oval of light where a face
  would be. Signs may carry names.
- **Show, don't tell.** Outside the park, lore is sculpture and colour; words are kept to the few listed in 1.15.
- **Creature rules** (no cartoony smiles, with the approved exceptions; no bones: no skeletal rigs and no bone props)
  are in 4.5 and 4.7.
- **Calm on the eye:** saturated colour without glare, satin rather than mirror floors, no clutter, every effect brief.


## 7. Starting a new Greeblis game

This part is the procedure for starting any new Greeblis game. Greeblis Town is the bible: a new game may add to
the world but must not contradict it (section 8).

1. **Read section 8.** Its rules marked "every game" bind every Greeblis game: the ordinal sandbox, the
   Meta Quest as the performance target, the platforms, privacy, locks and approvals, and the quality rules.
2. **Keep the canon** of part 1 (fixed facts: 1.16). New places, eras and creatures may be added; nothing established
   there may be contradicted.
3. **Bring creatures over exactly.** A creature carried from Greeblis Town keeps its model, colour, voice and
   personality (parts 2 to 4). Locked models change only with the owner's approval
   (section 8).
4. **Give every new creature** a bold silhouette, a signature part, a colour of its own, a voice, a dance, a planting
   move and a role, built with the creature-making system (3.1) and checked against the
   new-creature checklist (4.11).
5. **Build to the loop** (5.3, principles 5.17): talk, Blossoms, quests and a climactic Event.
6. **Dress the world to part 6:** show, don't tell in the background, drawn only from the game's own creatures;
   synth-only audio; the interface palette and placement rules.
7. **Hold the quality bar (6.5) from the first build:** the ordinal sandbox test, no flicker or z-fighting, and the
   Quest's frame rate (72 Hz).



## 8. Standing design and delivery rules

This section states the complete constraints needed by a future Greeblis game without consulting any other document.

- Canon, creature identities, roles, palettes and voices carry forward. The owner controls changes to lore and locked designs.
- The game is a self-contained Bitcoin ordinal: all assets and executable code are embedded, no outside network calls, storage APIs or dynamic code evaluation. It must boot directly and in an allow-scripts sandbox under the ordinal content policy. Target about 400 KB packed without removing content to save space.
- Meta Quest Browser is the VR target. Chrome on Windows/Linux and Android supplies development test modes. Do not support Apple platforms or other browsers. Test every build for standalone and ordinal operation on desktop and Android.
- VR performance and comfort come first. Render at native resolution unless frame rate requires a reduction. No headlocked view during system menus: pause action, continue tracked rendering. Prefer seated play and smooth turning; calibrate seated eye height to the standing avatar on entry.
- Point and press A to select in VR; X selects in the same way. Talk and Give are selected from the interaction menu. Pickups are primarily collected by moving over them. The wrist UI has no readable reversed back face.
- Desktop uses mouse drag for rotation and interaction menus for actions, with B to close. There is no Q/E rotation, wheel zoom, F/G action shortcut or special 1–9 action. Its HUD is top right. Mobile uses Talk/Give buttons, never creature taps; dialogue hides these buttons. Its HUD is top left. Neither test mode shows an FPS counter.
- Every game includes fenced, removable Desktop and Mobile test modes during development. Both are removed from the final release, called v1.0. The current development build is v0.2.
- All creature and environmental designs are locked at release; later edits require an explicit request. Before release, preserve individual approved design locks unless the owner authorizes a change. ZOLLOD articulation, Ancient/Cave refinement and ETCHER currency scales are explicitly authorized. Robin and Cardinal are retired and unlocked.
- The readable game is always retained separately in the Uncompressed directory and updated with every game change except compression. Removing unused code, removing comments/labels and compression are separate pre-release tasks. The final application includes only necessary executable code.
- All remaining owner requests and notes are tracked as tasks. Every note counts as a minor task.
- Documentation describes the world and its designs directly; never identify the media used to create them. This Bible is self-contained and must not link to or refer readers to other files.
- Never include identifying details about the owner, machine paths, session links, upload names or model identifiers in published content. Refer to the creator only as the owner. Established parcel destinations and the STAPLERS author name are the only approved personal-text exceptions.
- Do not cut established content just to save size or time. No z-fighting or shimmering thin high-contrast lines. Keep readable text large enough for its normal viewing distance.
- Creature models have no bones or skeletal rigs and no cartoony smiles. Animation uses transform pivots. Every creature except THE ANCIENT has talk, planting and dancing motions. THE ANCIENT never turns, moves away, plants or dances.
- Creatures pause and face a nearby player, remain available for Talk while travelling, keep their home plan and resume after interruptions. A scripted scene holds its participants until completion. Event lines occur only at an Event with Seeds. Only the first seeded Event grows flowers.
- Creature menus use Talk and optional Give a blossom; ZOLLOD also offers his shop once freed. No X close button. Clothes are shown in the Shop mirror, never as HUD inventory tiles.
- The Consortium flag is a red mushroom on orange. The only currency is Flint; no Flint-knapping props. Show lore through the town's visual motifs; background words remain sparse. HENNRICK and NEXTESSA do not determine the town's architecture because they are from other eras.
- The large Gallery painting retains its complete composition, detail, palette and resolution. The three small Gallery paintings depict realistic landscapes. The Gallery floor has many colorful goo splats; paint-can labels have separated depth surfaces.
- The Cave is THE ANCIENT's hidden realm. Entry, interaction and collisions must remain functional when its approved details are refined.
- Add exactly one book named “Zortoe's Home Cooking” and exactly one named “Traveler's Truth”; OVERCOMING must stand out on OVERCOMING SHYNESS.
- The gazebo is GEMTOE's home, labelled “Gemtoe's Gazebo”, with gold coin stacks. Home travel, visits, the Garden Event and the Stone trade must keep working.

### Bird update

A Blue Jay lives on one tree branch and never leaves that tree. Its blue crest, barred wings, white face and underside, dark collar and long blue tail identify it. Small head turns, breathing, tail balancing and occasional folded-wing adjustments provide life while it stays perched. It has no dialogue, quest or planting role. The retired robin and cardinal are not spawned.

### 8.8 Ordinary biology and mechanical Talk additions

These ordinary lines never replace Garden Event dialogue. The librarian retains all quest guidance before his additional pages. ZOLLOD offers Talk beside the Shop after overcoming shyness.

| Creature | Additional line (pages separated by /) |
| --- | --- |
| ANOMALEE | My SIGNAL flickers. / My FRAME remembers how to STAND. |
| MUSHROOM | Under this cap, my gills keep the spores moving. / A sheriff must know what is in the air. |
| HENNRICK | My casing keeps the instruments steady. / These joints were built for fieldwork, not a desk. |
| FORTIZMO | My valves turn a breath into a brass note. / Carrot juice is for the customers, sugar. |
| KING DINO | These springy joints have kept the beat since the age of Dinosaurs, baby! / The crown is extra. |
| SOMLET | * Her soft body settles with each breath; a tiny paw curls beneath her cap * / Zzz… |
| GOOWARD | * He presses two goo bubbles together, then fans his crystal wings as they spring apart * / Gomp! Gomp! |
| GEMTOE | These tails curl around a crystal without a scratch. / A useful talent for the keeper of the First Bank of Greeblis. |
| MAMA GORBO | This noble goo keeps me round and bouncy, dear. / A little wobble is how I wave hello! |
| MONTGUMMERY | Mont feeds tape through inner readers. / Knowledge in the reels. Dinner in the cassette. |
| ETCHER | My small scales shelter layers of stored marks. / The tentacles write; the body keeps the archive. |
| GLYPH | My plates fit together like a sentence. / A moving arrangement of symbols… don’t you think? |
| SPARKAKUS | My ears catch the quietest page turn. / The fur keeps me warm; the mist follows my tail wherever I go. |
| ZOLLOD | My curling trunk can tend the smallest seedling. / The flowers on me sway when I walk. I try not to spill their pollen. |
| THE ANCIENT | My skin keeps the damp. / My stalks taste the dark. / The Cave remembers the rest. |

### 8.9 Current scene and model details

The Blue Jay is the park’s sole tree bird: blue crest/back, pale face and breast, dark collar, barred wings/tail
and pale tail corners. Breathing, head turns and small wing/tail movements leave its feet anchored to its bough.
ZOLLOD has a smoothed walk with a torso pivot, shoulders, elbows, wrists, hips, knees, ankles and forefeet.
ETCHER has one subtle Bitcoin mark and one subtle Ethereum mark on two small scales.
The Ancient’s skin is granular near-black olive with fine longitudinal striations and a wet sheen. Pale angular
stones sit embedded in the Cave’s gritty floor. Its stalks stay rooted in every pose; it never dances or plants.
GEMTOE lives inside Gemtoe’s Gazebo at (5, −31), with gold coin stacks near the back and an open front entrance.
She may leave for visits or the Garden Event and returns by that entrance; the Ancient Gem trade remains available.
The great Gallery painting preserves its complete quality and resolution. Its depictions of former park wildlife
and the historical navy pennant remain elements of the painting; the living park and current flag follow the
updated designs above.

The wrist HUD uses front-only rendering in addition to its facing check, including during the Universal Menu pause.
