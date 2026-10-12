# Greeblis Town USA: creature profiles

How each creature is modelled, coloured, given a face and animated, read from the game (`index.html`). Every
model is final: never change one without asking ([rules](greeblis-rules.md)). The methods (builders, `born()`,
planting and dancing, roaming) are in [construction.md](construction.md); what the pulled and merged creatures'
originals were like is in [learnings.md](learnings.md#9-where-the-town-cast-came-from).

## The cast

Planting and dance speeds are in radians per second of game time; 5.45 is one bob per beat of King Dino's
104 BPM, 2.7 half time.

| Creature | Id | Builder | Where | Planting (speed, size) | Dance (beat, size) |
| --- | --- | --- | --- | --- | --- |
| Sparkakus | `keeper` | `BORN.sparkakus`, via the Library's worker `st` | The Library, browsing | pat (1.6, 1) | twist (5.45, 1) |
| Mama Gorbo | `p_mamagorbo` | `born_mamagorbo` | Wanders the park | pat (1.3, 1.2) | jelly (5.45, 1) |
| Gooward | `gorbo` | `born_gooward` | Wanders the park | pat (1.6, 1.1) | bounce (5.45, 1.1) |
| Gemtoe | `p_gemtoe` | `born_gemtoe` | Wanders the park | scatter (2.4, 1) | twirl (2.7, 1) |
| Montgummery | `w_mont` | `woods_mont` | Wanders the dance floor (a Dancer) | pat (1.9, 1) | his own: the robot |
| Etcher | `p_etcher` | `born_etcher` | Wanders the dance floor (a Dancer) | pat (2.1, 0.9) | his own: the tentacle dance |
| Glyph | `p_glyph` | `born_glyph` | Wanders the dance floor (a Dancer) | dig (2.3, 1) | his own: the macarena |
| Hennrick | `gratelet` | `city_hennrick` | Strolls round the Portal | pat (1.4, 1.2) | his own Greeblis City dance |
| King Dino | `m_kingdino` | `born_kingdino` | At his drum kit behind the dance floor | scatter (1.9, 1.1), stepping forward | groove (5.45, 1.1) |
| Fortizmo | `frog` | `fortizmoPick` (`city_fortizmo`) | Behind the Juice Bar's counter | scatter (2, 1) | sway (5.45, 1) |
| Somlet | `m_somlet` | `born_somlet` | In front of the Post Office, asleep | pat (1.5, 1.1) | sway (2.7, 0.8) |
| Mushroom | `drifter` | `born_mushroom` | On the Sheriff's desk | pat (1.8, 1) | shimmy (5.45, 1) |
| Zollod | `cutebex` | `born_zollod` | Behind the Garden Supplies counter | dig (3, 0.8) | groove (5.45, 0.9) |
| Anomalee | `blinker` | `anomaleePeg` (`city_anomalee`) | In front of the church, gazing up | dig (1.5, 1) | stomp (5.45, 1) |
| Nextessa | `t_nextessa` | `city_nextessa` | Only through the portal with a pizza | – | – |
| Backpacka | – | `BP` (the Event) | Only at the Garden Event | – | – |

At the Garden Event King Dino stays at his drums, Fortizmo plays instead of planting, Sparkakus plants with
everyone (only when Seeds are in) but nothing comes up where he digs, Nextessa never comes and Backpacka is its
climax. Every born creature returns `born(g, {height, lids, step(t, dt, tk, wk)})`.

## Sparkakus (`keeper`): the librarian

- **Build:** a merge of Sparkakus and Shopstar, standing on two legs, at 1.16 scale (3.13 m, as tall as Hennrick).
- **Body:** a royal-blue wolf painted all over like an alebrije (winding vines, little flowers and dots in gold,
  green, magenta, orange and teal), with Shopstar's orange for his paws and socks and a fluffy cream ruff down his
  throat and chest.
- **Face:** tall ears lined in purple with two little purple horn nubs, yellow eyes, a glossy black nose and a
  closed mouth line. His ears twitch now and then.
- **Signature:** yellow daffodils on his left shoulder and a dark feather fin between his shoulders; Shopstar's
  collar with the orange APR coin and red sleeve garters; a long tail with a gold star at its tip, trailing
  Sparkakus's glowing mist from Greeblis Park (puffs that rise and swirl out of the tip for two seconds each, pink
  fading through cyan).
- **Animation:** his tail sways, he breathes and his arms move slowly; tail and arms swing as he walks; he talks
  while his dialogue is open, and his head turns to greet the player.
- **Role:** stands on the Library's rug at local (0, 0, −0.45) and browses the open floor when nobody needs him.
  He gives the Ancient Artifacts quest (his talk follows how many you have); with all three he stays where he
  stands, the light bulb comes on and the town dims, he glues the three pieces back together with a bottle of
  school glue in the air before him, gives his speech about the Eye of the Great Sphinx, and the Ancient Gem flies
  to you. Given a Blossom he drops to all fours, runs a lap of the Library floor, comes back to his place, stands
  and says sorry. At the Event he digs, embarrassed about it.

## Mama Gorbo (`p_mamagorbo`)

- **Build:** rebuilt from her artwork as a merge with Gorbo, in a bright, vibrant peach `#ff9f5c` (made brighter
  and more saturated on request; her shading darkens only a little in folds and toward her base), height 2.95.
- **Body:** a round, glossy goo drop: a big round head (blob part 1.13 × 1.0 × 1.08) melts into a narrower base and
  a foot of goo spread on the ground (1.06 × 0.15 × 1.02) over a shiny translucent puddle. The foot rests on a flat
  sole 1.2 cm up, and her body lifts as it sways, so she never sinks into the ground.
- **Goo:** six runs of paler goo slide down her sides (ellipsoids half out of the skin, lightened in the vertex
  colours), each ending in a hanging drop that swells, stretches, falls and leaves a peach splat. Two wet
  highlights sit on the upper left of her head.
- **Eyes:** the two octagon ports, big one high and small one low: a raised magenta rim with a dark edge, sunk by
  the sagitta to meet her curve, round a domed glassy purple lens with a glint. They blink together by squashing
  the lens to 6% height for 0.18 s every 2.5 to 6 s.
- **Signature:** a thick lime goo tail with pale yellow highlights, from her upper left down her side, round the
  front of her foot and up her right; three goo streams (cyan `#36d0e8`, magenta `#e8409e`, violet `#9a52e0`)
  welling out of her back and right side and pooling beside her foot, with bulges and a glob rolling down each and
  both ends capped (they replaced white smoke wisps, on request); yellow sparks off her upper left; three red pin
  tags (AP, IP, wifi) and a purple wifi sign orbiting at 1.78 m.
- **Animation:** she breathes and jiggles like jelly (a slow squash with a quicker wobble), the puddle swelling
  with her; she sways, bobs when talked to, and her eyes pulse slightly.
- **Given a Blossom:** she shoots her colourful goo at the player, eight arcs that splat on the view (her def's
  `goo` palette: cyan, magenta, violet, lime and peach).
- **Removed on request:** a red eye in a side fold, a dangling knob under the chin, and the smoke wisps.
- **Role:** wanders the park and meets Gooward every minute or two, with hearts. She also appears, in the
  window's own cyan, in the church's two Garden windows.

## Gooward (`gorbo`)

- **Build:** a merge of Howard, Gorbo and Mama Gorbo (the goo family).
- **Body:** Gorbo and Mama's egg built from Howard's fused bubbles, cyan above and peach below, with little bubbles
  caught in the jelly and goo drips off the lower blobs. Howard's pastel root tendrils spill out underneath.
- **Face:** Howard's white "+" eyes (they squint instead of blinking), cheek spots, wavy teal brow lines and a
  ribbon tongue that waggles more when he talks.
- **Signature:** gold leaf crests, the purple octagon ports and float ring Gorbo and Mama share (with a little AP
  tag), and Mama's crystal wings, which flutter.
- **Given a Blossom:** he shoots goo at the player, as Mama Gorbo does.
- **Role:** wanders the park and meets Mama Gorbo.

## Gemtoe (`p_gemtoe`)

- **Build:** from her artwork, in red, at 1.06 scale (as tall as Montgummery), a little smaller than life so her
  wings stay inside the talk view.
- **Body:** a crimson feathered dragon with a deep fur ruff over the chest and two pairs of great feathered wings.
- **Face:** a bird's face on a feathered horned head with a mint crest: glowing magenta eyes with slit pupils under
  heavy brows, a hooked pale beak a little open (more as she talks), feather tufts at the cheeks.
- **Signature:** four long scaly tails run out along the ground and rise at their ends to hold up her amethyst
  crystals, coiled round them. The crystals sparkle.
- **Animation:** she breathes, turns her head, and her wings and tails sway. She floats a little above the ground,
  so her tail coils never touch it (4 cm clear at their lowest).
- **Role:** wanders the park, the inventor of "Avarice". She talks you out of the Ancient Gem ("worthless... trust
  me") for the Summoning Stone, and does a happy spin with a hop when the trade is done.

## Montgummery (`w_mont`): a Dancer

- **Build:** Mont pulled from Greeblis Woods (`modelScale` 0.9), about 2.92 m. He replaced Gorton everywhere.
  His hands are mirrored so the palms face his body.
- **Face:** a CRT screen head, redrawn only when it changes: pixel eyes with a flat mouth (it was a U-shaped
  smile); the mouth opens and closes as he talks; a pixel shovel while he
  plants (and for his line at the Event); a robot face (square eyes flicking on the beat over a grille mouth)
  while he dances and for a while after a Blossom; a pixel fist,
  scissors or blank page in a Dance battle.
- **Dance, the robot:** a new pose on every beat, snapped into and held with a little mechanical settle; arms
  forward, out or down (never across him or up into his screen), body and screen turning in hard stops, his pots
  marking time; 16 beats.
- **Battle moves:** Rock out!, an air guitar with his screen banging; the splits, pots planted wide and arms
  chopping like blades; paper, tipped forward on one pot with the other kicked out behind.
- **Voice:** speaks of himself as Mont, in short plain sentences ("Mont eats many VHS and digests much
  knowledge of your culture."); he hides the player from the alien-hunting Sheriff. Vignette code `MG`.

## Etcher (`p_etcher`): a Dancer

- **Build:** from his artwork, at 1.16 scale (as tall as Montgummery).
- **Body:** a blue-teal serpent-dragon whose body rises like a bell of overlapping scales (larger low down) into a
  long neck.
- **Face:** a lizard's head with golden eyes, nostrils, a closed mouth and a row of little purple knobs.
- **Signature:** a green gem in the chest, two stubby clawed front feet, and six long segmented purple tentacle
  tails spreading over the ground, each tip rounded off closed.
- **Animation:** a slow sway and lean; his tails drift. A nod lifts him by as much as his base's front edge dips.
- **Dance, the tentacle dance** (16 beats, four to a move): a ripple runs down all six; they curl up high one after
  another round the circle; he twirls and they swing after him like a skirt; all six curl up together and wiggle.
  Each tentacle bends in its own upright plane, so it only ever lifts off the ground and never curls back into him.
- **Battle moves:** Rock out!, headbanging and drumming all six on the ground; the splits, the two front tentacles
  snipping; paper, all six lifted flat and rippling.

## Glyph (`p_glyph`): a Dancer

- **Build:** from his artwork, at 1.11 scale (as tall as Montgummery). Nothing of him floats.
- **Body:** a crouching blue dinosaur glazed like old porcelain and engraved all over with swirling filigree, short
  clawed arms held up in front, thick clawed legs and a heavy tail swinging along the ground.
- **Face:** one great glowing orange eye on each side of a round head studded with little bumps, heavy brows and
  two gold coiled horns.
- **Signature:** overlapping rounded-hexagon armour plates (dark blue, gold and teal filigree, tiny inset gems)
  shingled over his back and tail, each row a little further off the skin than the one below; a gold shield low on
  his left flank, behind the arm's swing, bearing a red glyph, with no plate under it; Gigglyph's two purple tiles
  on his back with glowing coins bearing his red trident; two ribbed tubes (orange and grey) coiling on the ground.
- **Animation:** every few seconds an excited little shake (a quick twist: a roll would tip his tubes into the
  grass); his tail sways and his arms bob. When his sway would tip a coil under the ground, he rises by just that
  much.
- **Dance, the macarena:** all 16 moves, from arms out and palms up to the hip sways and a hop with a quarter turn.
  His arms stretch out long so each move reads from across the floor, and his idle roll rests while he dances.
- **Battle moves:** Rock out!, a long-armed air guitar, stomping; the splits, a jump into a mid-air split with arms
  snipping overhead; paper, arms stretched flat as wings, gliding.

## Hennrick (`gratelet`)

- **Build:** pulled unchanged from Greeblis City (`modelScale` 0.88), 3.15 m.
- **Lore:** he comes from the far past, from Greeblis City; paradoxically, here and now the park looks like
  small-town America in the far future. His lines speak of this era as his future ("In my era, the towers of
  Greeblis City reach the clouds."). He is not from the town and gives it nothing of his design.
- **Role:** strolls from spot to spot round the Portal and stops to look at it. He keeps his own built-in Greeblis
  City dance, which rolls him side to side about his feet; he is lifted by the roll so the outer foot never dips
  into the ground.

## King Dino (`m_kingdino`)

- **Build:** from his artwork.
- **Body:** an upright lemon-yellow gummy dino (one smooth blob: trunk, domed head, muzzle and thighs) with a
  citrus-peel skin, three square turquoise buttons with green lights down each side, short arms out of turquoise
  ball joints with holes, turquoise donut rings on the hips, a holed plate on the lower back, and stubby feet.
- **Face:** a rounded muzzle, glossy navy bead eyes with yellow lids for the blink, and a quiet smile line.
- **Signature:** a glossy turquoise crown (five rounded prongs, the front one tallest, with a knob) under a great
  feathered plume that runs purple down the back of the head, over the crown and orange down the front.
- **Drumming:** behind his kit with a stick in each hand. While the player is anywhere near (or a Dance battle is
  on) he plays his jazz: the right hand keeps the ride and takes the crash and the floor tom, the left has the
  snare and the rack toms; each stroke snaps the arm down onto the drum and lets it ride back up. He stays at the
  kit all through the Garden Event, and never goes visiting: the others come to him. Walking, each step lifts him
  a little more than his feet swing down.

## Fortizmo (`frog`)

- **Build:** `fortizmoPick` wraps `city_fortizmo` (`modelScale` 0.78). She sculpts her geometry after its bounds are
  computed, so the wrapper refreshes them with headroom: taps on her outer body always pick her.
- **Role:** the Juice Bar's bartender, walking up and down behind the counter. At the Garden Event she walks slowly
  to the garden's edge, raises her horn as Backpacka arrives and plays "Backpacka's Rain Strut" until the Event
  ends. Without Seeds she doesn't play.

## Somlet (`m_somlet`)

- **Build:** a merge of Gratelet and Somnux.
- **Body:** a floating cotton puffball squared off like Somnux's box body, with Gratelet's swirl, cream-puff hands
  and dangling root tentacles tinted plum (between Gratelet's red and Somnux's blue).
- **Face:** always asleep: big heavy eyelids closed over full eyes, each with a dark lash line, a soft brow and a
  small mouth that breathes (and opens more as she talks). Zs drift up beside the cap.
- **Signature:** a mail carrier's peaked cap with a navy band, white piping and a solid black visor (a thin
  half-disc, so it shows from every angle); her badge is a little gold envelope. The crown's top, the piping and
  the badge's flap are depth-biased so they never flicker; the shape is unchanged.
- **Animation:** she floats up and down (centre 1.35 ± 0.1 m) and her cap tilts. Her tentacles sway, and splay
  outward just enough to keep every vertex at least 2 cm above the ground, searching on from last frame's angle.
- **Lying down:** resting at her spot she sleeps on her right side, her head to her right. How low she may sit at
  each roll angle is worked out once from her vertices, so nothing goes into the ground as she rolls over and
  settles; her tentacles droop toward the ground and splay off it. She settles slowly and gets up quickly when
  wanted. Asleep on her side, she doesn't turn to the player. She sleeps through everything, the Garden Event
  included (she stays at home for it, and never goes visiting: the others come to her), and only ever says "Zzz",
  except when given a Blossom: her eyes open for the first time (white, violet iris, catchlight; her heavy lids
  squash away as they open, so none of them shows round the open eyes) for her "Thank you", and close again.

## Mushroom (`drifter`): the sheriff

- **Build:** a merge of Mushroom from Greeblis City and Mushroom from Greeblis Woods. The one creature allowed to be
  shorter than the avatar.
- **Body:** City's domed cap with Woods' rim band and raised white warts in both sizes, glowing from gold at the
  crown to deep orange at the rim, gills under it; a cream stem with City's grain, Woods' collar skirt (a frilled
  ring of drooping scallops), City's little feet trailing mycelium, and two baby mushrooms on the stem.
- **Face:** eyes, City's brows, the blush both share, and a little smile.
- **Signature:** a gold sheriff's star on his stem and a sheriff's hat (pinched felt crown, band, star, brim turned
  up) on his cap.
- **Animation:** the stem sways, and the cap bobs and tilts more as he talks.
- **Role:** stands on the Sheriff's raised desk (top 1.5 m up), looking down at the player, and steps down off
  its front for the Garden Event. The consortium's man in town: he has the Portal locked down while he
  investigates UFO sightings, and a Blossom (a bribe) opens it, which also lets the phone reach Nextessa.

## Zollod (`cutebex`)

- **Build:** a merge of Zollox and Kollod, standing on two legs.
- **Body:** Zollox's segmented body fading from cyan at the head to Kollod's green at the feet; Kollod's mossy
  garden bed over his back with small pink and white flowers and Kollod's little worm peeking out; fern fronds and
  yellow plumes along his shoulders; a thick tail with Zollox's magenta tip.
- **Signature:** Zollox's curling trunk with its magenta tip, small pink flowers on his head, an olive canvas
  gardener's apron with seed packets in the pocket, and a trowel in his right hand.
- **Animation:** his fronds sway, the worm turns, his trunk and tail move, and he strides when walking.
- **Role:** the Garden Supplies keeper — once he dares. He starts too shy for it: one Talk ("…|…|I'm shy…"), no
  Blossom option, no shop, and he neither visits nor is visited. Take OVERCOMING SHYNESS from its Library shelf
  (point at it and select) and Talk to him with it: "…|That book…|Let me see..|Wow I'm free from shyness!" From
  then on interacting with him opens the shop at once (at the Garden Event he says his line instead: bringing
  plants to life is his life's work), and he goes visiting about twice as often as anyone else.

## Anomalee (`blinker`)

- **Build:** `anomaleePeg` wraps her Greeblis City model (`modelScale` 0.95). She lost her back-right leg in City;
  here she stomps about on a wooden peg leg (an iron-banded socket, a tapered peg with a rubber tip, a knot and a
  little nailed-on patch) on that empty hip, which still swings with her walk. Her screen glows with scanlines;
  the plain casing has a moulded plastic finish.
- **Role:** stands on the walk in front of the church, a little to one side of its door, her screen head tipped
  back to gaze up at the Traveler window. She keeps gazing through her Talk lines and turns to the player (head
  level) only for her Blossom line, or for any line during the Event. Her second line ("ORIGINATOR...") plays
  with a falling sad phrase. Once the Snacks quest is complete she eats pizza at the Event instead of planting.

## Nextessa (`t_nextessa`)

- **Build:** `city_nextessa`, her Greeblis City model.
- **Role:** the pizza courier. Called from the phone booth (only once Mushroom has opened the Portal), she comes
  through the portal 30 s later with a pizza box on her head, walks to wherever the player is, hands it over
  (+20 Snacks, which completes the Snacks quest) and goes back through the portal. While a pie is on its way the
  phone gets no answer. She is never in the park otherwise, never at the Garden Event, and never dances or
  plants.

## Backpacka

- **Build:** made by the Garden Event (`BP`) when he sets off: a tan, crackle-skinned pear of a body with glassy
  coloured patches shrink-wrapped onto it, two pairs of veined teal dragonfly wings, a long banded neck with a
  green stripe up to a little open-mouthed head, a stubby tail, and four tube legs ending in open pipes. Everything
  is a function of the time since he set off (`pose(e)`), so any moment can be shown (`JGP.backpacka.preview`).
- **The climax:** he flies in skinny, hovers over the pond's far bank and dips his head in, gulps running up his
  neck as he swells; flies heavily to the garden, spins and sprays four arcs from his feet; with Seeds, plants
  bloom where the water lands and a rainbow comes out; he slims down and flies off.
