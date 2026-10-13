# Greeblis Town: Creatures

Every creature in the game: how it is built, how it looks, how it moves and what it does. Every model here is final
and locked; changing one needs the owner's approval first ([rules](rules.md#locks-and-approvals)). Animation
changes on request are fine. The shared methods (builders, `born()`, planting and dancing, roaming, visits) are in
[construction.md](construction.md); who each creature is in the world is in the [bible](bible.md#2-the-cast).

Contents: [The cast](#the-cast) · [Residents](#residents) · [The Dancers](#the-dancers) ·
[Visitors from other eras](#visitors-from-other-eras) · [Backpacka](#backpacka) · [The Ancient](#the-ancient) ·
[The park's birds](#the-parks-birds) · [The player's avatar](#the-players-avatar)

## The cast

Planting and dance speeds are in radians per second of game time: 5.45 is one bob per beat of KING DINO's 104 BPM,
and 2.7 is half time. A move's size scales its whole-body offset.

| Creature | Id | Builder | Home | Planting (move, speed, size) | Dance |
| --- | --- | --- | --- | --- | --- |
| SPARKAKUS | `keeper` | `BORN.sparkakus`, through the Library's worker `st` | The Library, browsing | pat, 1.6, 1 | funk (5.45, 1), with his own moves in his model |
| MAMA GORBO | `p_mamagorbo` | `born_mamagorbo` | Wanders the park | pat, 1.3, 1.2 | jelly (5.45, 1) |
| GOOWARD | `gorbo` | `born_gooward` | Wanders the park | pat, 1.6, 1.1 | bounce (5.45, 1.1) |
| GEMTOE | `p_gemtoe` | `born_gemtoe` | Wanders the park | scatter, 2.4, 1 | twirl (2.7, 1) |
| MONTGUMMERY | `w_mont` | `woods_mont` | Wanders the dance floor | pat, 1.9, 1 | His own: the robot |
| ETCHER | `p_etcher` | `born_etcher` | Wanders the dance floor | pat, 2.1, 0.9 | His own: the tentacle dance |
| GLYPH | `p_glyph` | `born_glyph` | Wanders the dance floor | dig, 2.3, 1 | His own: the macarena |
| HENNRICK | `gratelet` | `city_hennrick` | Strolls round the Portal | pat, 1.4, 1.2 | His own: a side-to-side roll |
| KING DINO | `m_kingdino` | `born_kingdino` | His drum kit behind the dance floor | Stays at his drums | Stays at his drums |
| FORTIZMO | `frog` | `fortizmoPick` (wraps `city_fortizmo`) | Behind the Juice Bar's counter | Plays her horn | Plays her horn |
| SOMLET | `m_somlet` | `born_somlet` | Asleep before the Post Office | Stays asleep at home | Stays asleep at home |
| MUSHROOM | `drifter` | `born_mushroom` | On the Sheriff's desk | pat, 1.8, 1 | shimmy (5.45, 1) |
| ZOLLOD | `cutebex` | `born_zollod` | Behind the Garden Supplies counter | dig, 3, 0.8 | groove (5.45, 0.9) |
| ANOMALEE | `blinker` | `anomaleePeg` (wraps `city_anomalee`) | Before the church, gazing up | dig, 1.5, 1 (eats pizza instead once Snacks is done) | stomp (5.45, 1) |
| NEXTESSA | `t_nextessa` | `city_nextessa` | Only through the Portal, with a pizza | Never at the Event | Never at the Event |
| BACKPACKA | none | `BP`, made by the Garden Event | Only at the Garden Event | The Event's climax | The Event's climax |
| THE ANCIENT | `slug` | Built by the church | The church's secret room | Never | Never |

Every born creature returns `born(g, {height, lids, step(t, dt, tk, wk)})`. ZOLLOD has no `id`, only
`def.__type` `"cutebex"`; code finds him by that.

## Residents

### SPARKAKUS: the librarian

- **Build:** standing on two legs, at 1.16 scale (3.13 m tall).
- **Body:** a royal-blue wolf painted all over like an alebrije (winding vines, little flowers and dots in gold,
  green, magenta, orange and teal), with orange paws and socks, black claws, and a fluffy cream ruff down his throat
  and chest.
- **Face:** tall ears lined in purple with two little purple horn nubs, yellow eyes, a glossy black nose and a
  closed mouth line. His ears twitch now and then.
- **Signature:** yellow daffodils on his left shoulder; a dark feather fin between his shoulders; a collar with an
  orange APR coin; red sleeve garters; a long tail with a gold star at its tip, trailing a glowing mist (puffs that
  rise and swirl out of the tip for two seconds each, pink fading through cyan).
- **Animation:** he breathes, his tail sways and his arms move slowly; his head turns to greet the player; he talks
  while his dialogue is open.
- **Walk** (the owner asked for more articulation): his body rolls over onto the leg he stands on, turns a little
  with his hips and leans into the walk; it sinks as his legs spread, so a foot stays on the ground. His arms swing
  against his legs, the elbow folding more on the forward swing and the paw trailing at the wrist; the arms roll
  out a little as they pass his sides; his ears flop back on each step; his tail bounces and swings with his hips.
- **Dance, funk** (the owner asked for funky): his move wrapper bobs on every beat, twists his hips over two, leans
  side to side, and on the last two beats of every eight spins with a hop. His model, on the same beat, pumps his
  paws up to ear height and back to his chest on alternate beats (out to the sides, clear of his ears and muzzle),
  steps in place (a foot only ever rises), flops his ears and whips his tail.
- **Role:** stands on the Library's rug and browses the open floor when nobody needs him, keeping clear of every
  bookcase. He gives the Ancient Artifacts quest; his Talk follows how many the player has. With all three, the light
  bulb comes on over him wherever he is and the town dims; he glues the three pieces together with a bottle of
  school glue in the air before him, gives his speech about the Eye of the Great Sphinx, and the Ancient Gem flies
  to the player.
- **Blossom:** at his place in the Library he drops to all fours, runs a lap of the Library floor, comes back,
  stands and apologises. Out on a visit, walking home from one or with a visitor, he takes it with a line of his own
  and no lap ("A Blossom! …I must resist the urge to run."), as his lap belongs to the Library floor.
- **At the Event:** he plants (only when Seeds are in) at a spot of his own inside the garden, grows a flower there
  like every planter, and is embarrassed about digging.

### MAMA GORBO

- **Build:** from her artwork, a bright, vibrant peach `#ff9f5c`, 2.95 m tall. Her shading darkens only a little in
  folds and toward her base.
- **Body:** a round, glossy goo drop: a big round head melts into a narrower base and a foot of goo spread over a
  shiny translucent puddle. The foot rests on a flat sole 1.2 cm up, and her body lifts as it sways, so she never
  sinks into the ground.
- **Goo:** six runs of paler goo slide down her sides, each ending in a drop that swells, stretches, falls and
  leaves a splat. Two wet highlights sit on her upper left.
- **Eyes:** two octagon ports, a big one high and a small one low: a raised magenta rim round a domed glassy purple
  lens with a glint. They blink together by squashing the lens to 6% height for 0.18 s every 2.5 to 6 s.
- **Signature:** a thick lime goo tail with pale yellow highlights, from her upper left round the front of her foot
  and up her right; three goo streams (cyan `#36d0e8`, magenta `#e8409e`, violet `#9a52e0`) welling out of her back
  and right side and pooling beside her foot, each with a glob rolling down it and both ends closed, so the goo
  never clips and no end can be seen into; yellow sparks; three red pin tags (AP, IP, wifi) and a purple wifi sign
  orbiting at 1.78 m.
- **Animation:** she breathes and jiggles like jelly, the puddle swelling with her; she sways, bobs when talked to,
  and her eyes pulse slightly.
- **Blossom:** she shoots her colourful goo at the player: eight arcs that splat on the view.
- **Role:** wanders the park, and meets GOOWARD every 20 to 40 s to throw goo balls, with hearts. She also appears,
  in the window's own cyan, in the church's two Garden windows.

### GOOWARD

- **Body:** an egg of fused bubbles, cyan above and peach below, with little bubbles caught in the jelly and goo
  drips off the lower blobs; pastel root tendrils spill out underneath.
- **Face:** white "+" eyes that squint instead of blinking, cheek spots, wavy teal brow lines, and a ribbon tongue
  that waggles more when he talks.
- **Signature:** gold leaf crests, purple octagon ports and a float ring (with a little AP tag), and crystal wings
  that flutter.
- **Voice:** only ever "Gomp".
- **Blossom:** he shoots goo at the player, as MAMA GORBO does.
- **Role:** wanders the park and meets MAMA GORBO.

### GEMTOE

- **Build:** from her artwork, in red, at 1.06 scale (as tall as MONTGUMMERY), a little smaller than life so her
  wings stay inside the talk view.
- **Body:** a crimson feathered dragon with a deep fur ruff over the chest and two pairs of great feathered wings.
- **Face:** a bird's face on a feathered horned head with a mint crest: glowing magenta eyes with slit pupils under
  heavy brows, and a hooked pale beak a little open (more as she talks).
- **Signature:** four long scaly tails run along the ground and rise at their ends round her sparkling amethyst
  crystals.
- **Animation:** she breathes, turns her head, and sways her wings and tails. She floats a little above the ground,
  so her coils never touch it (4 cm clear at their lowest).
- **Role:** wanders the park; the inventor of "Avarice". She talks the player out of the Ancient Gem ("worthless…
  trust me") for the Summoning Stone, and does a happy spin with a hop when the trade is done.

### KING DINO

- **Build:** from his artwork.
- **Body:** an upright lemon-yellow gummy dino (one smooth body: trunk, domed head, muzzle and thighs) with a
  citrus-peel skin, three square turquoise buttons with green lights down each side, short arms out of turquoise
  ball joints, turquoise rings on the hips, a holed plate on the lower back, and stubby feet.
- **Face:** a rounded muzzle, glossy navy bead eyes with yellow lids, and a quiet line for a mouth.
- **Signature:** a glossy turquoise crown (five rounded prongs, the front one tallest) under a great feathered plume
  running purple down the back of his head and orange down the front.
- **Drumming:** behind his kit with a stick in each hand. While the player is near the dance floor, or a Dance battle
  is on, he plays his jazz: the right hand keeps the ride and takes the crash and the floor tom; the left has the
  snare and the rack toms; each stroke snaps the arm down onto the drum and lets it ride back up.
- **Role:** stays at his kit, through the Garden Event too, and never goes visiting: the others come to him.

### FORTIZMO

- **Build:** `fortizmoPick` wraps her model at 0.78 scale. Her geometry is sculpted after its bounds are computed,
  so the wrapper refreshes them with headroom, and a tap on her outer body always picks her.
- **Look:** a furry elephant whose trunk is a horn.
- **Role:** the Juice Bar's bartender, walking up and down behind the counter. At the Garden Event she walks slowly to
  the garden's edge, raises her horn as Backpacka arrives and plays "Backpacka's Rain Strut" until the Event ends.
  Without Seeds she doesn't play.

### SOMLET

- **Body:** a floating cotton puffball squared off into a box, with a swirl, cream-puff hands and dangling plum root
  tentacles.
- **Face:** always asleep: big heavy eyelids closed over full eyes, each with a dark lash line, a soft brow, and a
  small mouth that breathes (and opens more as she talks). Zs drift up beside her cap.
- **Signature:** a mail carrier's peaked cap with a navy band, white piping and a solid black visor (a thin
  half-disc, so it shows from every angle); a little gold envelope for a badge. The cap's crown, piping and the
  badge's flap are depth-biased so they never flicker; the shape is unchanged.
- **Animation:** she floats up and down (centre 1.35 ± 0.1 m) and her cap tilts. Her tentacles sway, and splay
  outward just enough to keep every vertex at least 2 cm above the ground.
- **Lying down:** resting at her spot she sleeps on her right side. How low she may sit at each roll angle is worked
  out once from her vertices, so nothing goes into the ground as she rolls over; she settles slowly and gets up
  quickly. Asleep on her side, she doesn't turn to the player.
- **Role:** the mail carrier. She sleeps through everything, the Garden Event included (she stays home and never goes
  visiting: the others come to her), and only ever says "Zzz". Given a Blossom, her eyes open for the first time
  (white, violet iris, a catchlight; her heavy lids squash away so none of them shows) for her "Thank you", and
  close again.

### MUSHROOM: the sheriff

- **Build:** the one creature allowed to be shorter than the avatar.
- **Body:** a domed cap with a rim band and raised white warts in two sizes, glowing from gold at the crown to deep
  orange at the rim, gills beneath; a grained cream stem with a frilled collar skirt, little feet trailing mycelium,
  and two baby mushrooms on the stem.
- **Face:** eyes, brows, blush and a little smile.
- **Signature:** a gold sheriff's star on his stem and a sheriff's hat (a pinched felt crown, band, star, brim turned
  up) on his cap.
- **Animation:** his stem sways, and his cap bobs and tilts more as he talks.
- **Role:** stands on the Sheriff's raised desk (its top 1.5 m up), looking down at the player, and steps down off its
  front for the Garden Event or a visit. The Consortium's man in town: he has the Portal locked down while he
  investigates UFO sightings. A Blossom (a bribe) opens it, which also lets the phone reach NEXTESSA.

### ZOLLOD

- **Build:** standing on two legs.
- **Body:** a segmented body fading from cyan at the head to green at the feet; a mossy garden bed over his back with
  small pink and white flowers and a little worm peeking out; fern fronds and yellow plumes along his shoulders; a
  thick tail with a magenta tip.
- **Signature:** a curling trunk with a magenta tip, small pink flowers on his head, an olive canvas gardener's apron
  with seed packets in the pocket, and a trowel in his right hand.
- **Animation:** his fronds sway, the worm turns, his trunk and tail move, and he strides when walking.
- **Role:** the Garden Supplies keeper, once he dares. He starts too shy for it: one Talk ("…|…|I'm shy…"), no
  Blossom option, no shop, and he neither visits nor is visited. The player takes OVERCOMING SHYNESS from its
  Library shelf (pointing at it and selecting) and talks to him with it in hand: "…|That book…|Let me see..|Wow I'm
  free from shyness!" From then on a Talk with him opens the shop at once, wherever he is (out visiting, walking
  home, being visited); he holds still while it is open and goes on with his visit when it closes. He goes visiting
  about twice as often as anyone else. At the Garden Event he says his line instead.

### ANOMALEE

- **Build:** `anomaleePeg` wraps her model at 0.95 scale. She has lost her back-right leg; she stomps about on a
  wooden peg leg (an iron-banded socket, a tapered peg with a rubber tip, a knot and a little nailed-on patch) on
  that hip, which still swings with her walk. Her screen glows with scanlines; the plain casing has a moulded
  plastic finish.
- **Role:** stands on the walk before the church, a little to one side of its door, her screen head tipped back to
  gaze up at the Traveler window. She keeps gazing through her Talk lines and turns to the player (head level) only
  for her Blossom line, or for any line during the Event. Her second line ("ORIGINATOR…") plays with a falling sad
  phrase. Once the Snacks quest is complete she eats pizza at the Event instead of planting.

## The Dancers

The three creatures the player can Dance-battle. Each dances its own built-in dance on the floor and at the Event,
shows each battle move with its own animation, and gives one Ancient Artifact for its first win.

### MONTGUMMERY

- **Build:** `woods_mont` at 0.9 scale, about 2.92 m. His hands are mirrored so the palms face his body.
- **Face:** a CRT screen head, redrawn only when it changes: pixel eyes over a flat mouth; the mouth opens and closes
  as he talks; a pixel shovel while he plants (and for his line at the Event); a robot face (square eyes flicking on
  the beat over a grille mouth) while he dances and for a while after a Blossom; a pixel fist, scissors or blank page
  in a Dance battle.
- **Dance, the robot:** a new pose on every beat, snapped into and held with a little mechanical settle; arms forward,
  out or down (never across him or up into his screen), body and screen turning in hard stops, his pots marking
  time; 16 beats.
- **Battle moves:** Rock out!, an air guitar with his screen banging; the splits, pots planted wide and arms chopping
  like blades; paper, tipped forward on one pot with the other kicked out behind.
- **Voice:** speaks of himself as Mont, in short plain sentences ("Mont eats many VHS and digests much knowledge of
  your culture."). He hides the player from the alien-hunting sheriff.

### ETCHER

- **Build:** from his artwork, at 1.16 scale (as tall as MONTGUMMERY).
- **Body:** a blue-teal serpent-dragon whose body rises like a bell of overlapping scales (larger low down) into a
  long neck.
- **Face:** a lizard's head with golden eyes, nostrils, a closed mouth and a row of little purple knobs.
- **Signature:** a green gem in the chest, two stubby clawed front feet, and six long segmented purple tentacle tails
  spreading over the ground, each tip rounded off closed.
- **Animation:** a slow sway and lean; his tails drift. A nod lifts him by as much as his base's front edge dips.
- **Dance, the tentacle dance** (16 beats, four to a move): a ripple runs down all six; they curl up high one after
  another round the circle; he twirls and they swing after him like a skirt; all six curl up together and wiggle.
  Each tentacle bends in its own upright plane, so it only ever lifts off the ground.
- **Battle moves:** Rock out!, headbanging and drumming all six on the ground; the splits, the two front tentacles
  snipping; paper, all six lifted flat and rippling.

### GLYPH

- **Build:** from his artwork, at 1.11 scale (as tall as MONTGUMMERY). Nothing of him floats.
- **Body:** a crouching blue dinosaur glazed like old porcelain and engraved all over with swirling filigree, short
  clawed arms held up in front, thick clawed legs and a heavy tail swinging along the ground.
- **Face:** one great glowing orange eye on each side of a round head studded with little bumps, heavy brows and two
  gold coiled horns.
- **Signature:** overlapping rounded-hexagon armour plates (dark blue, gold and teal filigree, tiny inset gems)
  shingled over his back and tail, each row a little further off the skin than the one below; a gold shield on his
  left flank, behind the arm's swing, bearing a red glyph, with no plate under it; two purple tiles on his back with
  glowing coins bearing his red trident; two ribbed tubes (orange and grey) coiling on the ground.
- **Animation:** every few seconds an excited little shake (a quick twist: a roll would tip his tubes into the
  grass); his tail sways and his arms bob. When his sway would tip a coil under the ground, he rises by just that
  much.
- **Dance, the macarena:** all 16 moves, from arms out and palms up to the hip sways and a hop with a quarter turn.
  His arms stretch out long so each move reads from across the floor.
- **Battle moves:** Rock out!, a long-armed air guitar, stomping; the splits, a jump into a mid-air split with arms
  snipping overhead; paper, arms stretched flat as wings, gliding.
- **Voice:** ends his thoughts with "…don't you think?"

## Visitors from other eras

Neither is of the town, and the town takes nothing of either's design.

### HENNRICK

- **Build:** `city_hennrick` at 0.88 scale, 3.15 m.
- **Lore:** he comes from the far past, from Greeblis City, and came through the Portal some time before the player
  arrived. To him, this small town is the far future ("In my era, the towers of Greeblis City reach the clouds.").
- **Role:** strolls from spot to spot round the Portal and stops to look at it. His own built-in dance rolls him side
  to side about his feet; he is lifted by the roll so the outer foot never dips into the ground.

### NEXTESSA

- **Build:** `city_nextessa`.
- **Lore:** she is from the far future, which is why she comes through the Portal.
- **Role:** the pizza courier. Called from the phone booth (only once MUSHROOM has opened the Portal), she comes
  through the Portal 30 s later with a pizza box on her head, walks to wherever the player is, hands it over (+20
  Snacks, which completes the Snacks quest) and goes back through. While a pie is on its way the phone gets no answer.
  She is never in the park otherwise, never at the Garden Event, has no vignettes, and never dances or plants.

## Backpacka

- **Build:** made by the Garden Event (`BP`) when he sets off: a tan, crackle-skinned pear of a body with glassy
  coloured patches, two pairs of veined teal dragonfly wings, a long banded neck with a green stripe up to a little
  open-mouthed head, a stubby tail, and four tube legs ending in open pipes. Everything is a function of the time
  since he set off (`pose(e)`), so any moment can be shown (`JGP.backpacka.preview`).
- **The climax:** he flies in skinny, hovers over the pond's far bank and dips his head in, gulps running up his neck
  as he swells; flies heavily to the garden, spins and sprays four arcs from his feet; with Seeds, plants bloom where
  the water lands and a rainbow comes out; he slims down and flies off. He has no vignettes and never visits.

## The Ancient

- **Build:** the church's own builder makes it, only from the owner's photo of a slug at night. Its name on screen is
  ANCIENT; its id in code is `slug`. Locked: the owner called it perfect.
- **Look:** a great slug lying across the middle of the secret room's floor: a glossy body, 1.15 times bigger about
  its middle, with a thin wet keel along its top, a mantle with a paler lip, a breathing pore, a tail whose last
  stretch and tip are a shade paler, and eye-stalks thicker at the root, bending up a little, each starting 7 cm
  inside the head so they stay connected in every pose.
- **Idle:** its stalks sway slowly, and now and then one pulls in short and creeps back out; its head looks a little
  this way and that; its mantle swells and settles as it breathes, the pore opening with it; its body settles and
  swells, its tail tip curls slowly and its head creeps forward and back.
- **Talk:** it lifts its head (not turning to the player), stalks reaching up, and nods along with its words. It is
  talked to only from inside its room.
- **Blossom:** it takes one and answers "...".
- **It never moves from its spot, and never dances or plants** (the owner: it never will). Others rarely come to it
  (see the visits in [construction.md](construction.md#visits)). `JGP.slug` exposes it for tests.

## The park's birds

Each is built from the owner's two photos, at twice life size so it reads from the walks, on a low bough grown out of
its tree on the side toward the square. It never flies and never leaves its tree (the owner's rule). One bird to a
tree. `JGP` keeps each in the scene through the Event.

| | The cardinal | The robin |
| --- | --- | --- |
| Builder | `cardinal(X, Z, s, ry)` | `robin(X, Z, s, ry)` |
| Tree | The maple by the park's north-east corner (31, −33.5) | The oak by the north fence's west half (−17, −34) |
| Look | A plump bright red body (`#e23a1e`), a pointed crest, a black mask round the orange beak, glossy black eyes, wings a shade darker, a long tail held down and back; about 45 cm long | An upright grey-brown bird (`#5c5248`), a near-black head with a white ring round each eye, a streaked white throat, a slim yellow beak, a rusty orange breast (`#c85a26`), white under the tail; about 50 cm long |
| Life | Looks about every few seconds with a little nod; flicks its tail every 2–6 s; every 6–14 s hops a hand's width along the bough and back with a flutter; breathes | Looks about and cocks its head to listen; flicks its tail every 3–8 s; hops every 7–16 s with a flutter; breathes |

## The player's avatar

Only in the desktop and mobile test modes; in VR the player has no body. A cartoony figure, never a likeness of
anyone, in a yellow sun dress (`#f3c43a`, the default outfit) with its own print of small white flowers, a navy belt
and dark trainers, its hair gathered in a low ponytail with a navy tie and bow.
- **Walk** (`dkAnim`): strides her legs, swings her arms against them (held out so the hands clear the skirt), bobs
  on each step, sways the skirt and bounces the ponytail a beat behind. Still, she breathes, glances about and
  blinks. The walking bob is applied just before rendering; the player's body stays at y 0 for collisions.
- **Outfits** from Garden Supplies: the Flower Hat (a big Blossom in a cup of leaves, in place of the bow), the Sun
  Dress (its gold hem rides on the skirt and sways with it) and the Frog Shoes. Taking the Sun Dress off goes back
  to her own print, never to a bare colour.
