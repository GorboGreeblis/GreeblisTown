# Greeblis Town USA: creature profiles

How each Greeblis Town USA creature is modelled, coloured, given a face and animated, read from the game
(JurassicGreeblisPark `index.html`). Builders named `born_*` are readable functions in `BORN`. Builders named
`city_*` and `woods_*` are pulled from earlier games; their Greeblis City originals are in
[greeblis-city/creature-profiles.md](../greeblis-city/creature-profiles.md). The construction methods are in
[construction.md](construction.md).

Every born creature returns `born(g, {height, lids, step(t, dt, tk, wk)})`, where `tk` is talking (0 to 1) and
`wk` is walking (0 to 1). Every creature also nods and bobs while it is talked to, through the shared talk animation.

## Talking, planting and dancing

Every creature has at least these three animations. Talking is each builder's own `tk` animation plus the shared
nod and bob. Planting and dancing come from the `MOVES` and `DANCES` tables (see "Planting and dancing" in
[construction.md](construction.md)). They are creature animations, not menu options: at the Garden Event the
creatures plant, or dance while Fortizmo plays. Every creature's menu holds only Talk, plus "Give a blossom" while
the player has one. Speed is in radians per second of game time; 5.45 is one bob per beat at
the drum set's 104 BPM.

| Creature | Id | Planting move (speed, size) | Dance (beat, size) |
| --- | --- | --- | --- |
| Sparkakus, the librarian | `keeper` | pat (1.6, 1) | twist (5.45, 1) |
| Sparkakus, lineup stand-in | `orbiter` | dig (1.2, 0.7), with a little sway | twist (5.45, 1) |
| Mama Gorbo | `p_mamagorbo` | pat (1.3, 1.2) | jelly (5.45, 1): squash and stretch |
| Montgummery | `w_mont` | pat (1.9, 1) | robot (5.45, 1): snapping turns |
| Glyph | `p_glyph` | dig (2.3, 1) | hop (5.45, 1) |
| Somlet | `m_somlet` | pat (1.5, 1.1) | sway (2.7, 0.8), half time |
| Gemtoe | `p_gemtoe` | scatter (2.4, 1) | twirl (2.7, 1), half time |
| Hennrick | `gratelet` | pat (1.4, 1.2) | his own built-in Greeblis City dance |
| Etcher | `p_etcher` | pat (2.1, 0.9) | wiggle (5.45, 1) |
| King Dino | `m_kingdino` | scatter (1.9, 1.1), stepping forward | groove (5.45, 1.1) |
| Goward | `gorbo` | pat (1.6, 1.1) | bounce (5.45, 1.1) |
| Nextessa | `t_nextessa` | scatter (2.2, 0.9) | twist (5.45, 0.9) |
| Backpacka | `t_backpacka` | dig (1.4, 0.8) | bounce (2.7, 0.8), half time |
| Mushroom | `drifter` | pat (1.8, 1) | shimmy (5.45, 1) |
| Fortizmo | `frog` | scatter (2, 1) | sway (5.45, 1) |
| Anomalee | `blinker` | dig (1.5, 1) | stomp (5.45, 1) |
| Zollod | `cutebex` | dig (3, 0.8) | groove (5.45, 0.9) |

- **At the Garden Event:** King Dino stays at his drums; Nextessa, Backpacka's lineup stand-in and Sparkakus's
  stand-in stay away; Fortizmo and Backpacka come but don't plant. Their moves are still there for when the
  player asks.
- **Moves:** dig leans in and scoops; pat rocks and presses down; scatter turns and tosses. The dances are bounce,
  sway, twirl, hop, wiggle, twist, robot, shimmy, stomp, groove and jelly.

## Sparkakus (orbiter): the librarian

- **Build:** `born_sparkakus`, a merge of Sparkakus and Shopstar, standing on two legs.
- **Body:** a royal-blue wolf painted all over like an alebrije (winding vines, little flowers and dots in gold,
  green, magenta, orange and teal). Shopstar's orange for his paws and socks. A fluffy cream ruff down his throat
  and chest.
- **Face:** tall ears lined in purple with two little purple horn nubs, yellow eyes and a glossy black nose. Ears
  twitch now and then.
- **Signature:**
  - yellow daffodils on his shoulder and a dark feather fin between his shoulders;
  - Shopstar's collar with the orange APR coin, and red sleeve garters;
  - a long tail with a gold star at its tip, trailing Sparkakus's glowing mist from Greeblis Park. The mist is a
    pool of puffs that rise and swirl out of the tail tip for two seconds each.
- **Animation:**
  - Idle: the tail sways, he breathes, and his arms move slowly.
  - Walking: the tail and arms swing.
  - He talks while his dialogue is open.
- **Role:** the Library's librarian. He stands on the ground at local (0, 0, -0.45), scale 0.85, among open rows
  of bookcases, with the LIBRARY banner just behind him. A stand-in stands in the lineup.
  - He gives the Ancient Artifacts quest.
  - With all three artifacts he walks straight out to the front, turns to the player, and gives his long speech
    under the light bulb while the town dims. The artifacts then go on show on his reading table.
  - (Final game: each of the three Dancers gives one artifact for winning a Dance battle.)
  - He comes to the Garden Event only when Seeds are owned.

## Mama Gorbo (p_mamagorbo)

- **Build:** `born_mamagorbo`, rebuilt from her artwork as a merge with Gorbo, in a bright, vibrant peach
  `#ff9f5c` (made brighter and more saturated on request; her shading darkens only a little in folds and toward her
  base), height 2.95.
- **Body:** a round, glossy goo drop. A big round head (blob part 1.13 × 1.0 × 1.08) melts into a narrower base
  and a foot of goo spread on the ground (flat part 1.06 × 0.15 × 1.02) over a shiny translucent puddle. The
  foot rests on a flat sole 1.2 cm up, and her body lifts as it sways, so she never sinks into the ground.
- **Goo:**
  - Six runs of paler goo slide down her sides; they are ellipsoids half out of the skin, lightened in the vertex
    colours.
  - Each run ends in a hanging drop (a sphere with a cone neck) that swells, stretches, falls and leaves a peach
    splat on the ground.
  - Two wet highlights sit on the upper left of her head.
- **Eyes:** the two octagon ports, big one high and small one low. Each has a raised magenta rim with a dark
  edge, sunk by the sagitta so it meets her curve, around a domed glassy purple lens with a glint. They blink
  together by squashing the lens to 6% height.
- **Signature:**
  - a thick lime goo tail with pale yellow highlights, running from her upper left down her side, round the
    front of her foot and up her right;
  - three colourful goo streams (cyan `#36d0e8`, magenta `#e8409e`, violet `#9a52e0`) welling out of her back and
    right side, running down her skin and pooling in little puddles beside her foot. Bulges roll down them and a
    glob slides down each, and the puddles swell as it arrives. (They replaced white smoke wisps, on request.)
    Both ends of each stream are capped;
  - yellow sparks flickering off her upper left;
  - three red pin tags (AP, IP, wifi) and a purple wifi sign, orbiting at 1.78 m (well clear of her body).
- **Animation:**
  - She breathes and jiggles like jelly: a slow squash with a quicker wobble on top. The puddle swells with her.
  - She sways, bobs when talked to, and her eyes pulse slightly.
- **Given a Blossom:** she shoots her colourful goo at the player, eight arcs that splat on the view, as Goward
  does (her def's `goo` palette: cyan, magenta, violet, lime and peach).
- **Removed on request:** a red eye in a side fold, a dangling knob under the chin, and the smoke wisps.
- **In stained glass:** she appears in the church's two side windows (ported from Greeblis City), with the faceless
  robed figure, in the window's own cyan. See "Church" in [construction.md](construction.md).
- **Role:** at the south end of the lineup with the other creatures still being worked on, at (34, 28.4).
  Placeholder lines.

## Montgummery (w_mont): locked

- **Build:** `woods_mont`, Mont pulled from Greeblis Woods (height 3.3, `modelScale` 0.9). He replaced Gorton
  everywhere. Marked final.
- **Face:** a CRT screen head. The mouth was changed from a U-shaped smile to a flat line of pixels.
- **Behaviour:**
  - Planting move: pat.
  - Vignette code `MG`: item coin, colour `#3db2d6`, gesture nod, emote "!", sound pickup.
  - He speaks in robot all-caps lines ("BPM: VERY GOOD, YOUR MAJESTY.").

## Glyph (p_glyph)

- **Build:** `born_glyph`, from his artwork.
- **Body:** a crouching blue dinosaur glazed like old porcelain and engraved all over with swirling filigree.
  Short clawed arms are held up in front, and he has thick clawed legs. Nothing of him floats.
- **Face:** one great glowing orange eye on each side of a round head studded with little bumps, and two gold
  coiled horns.
- **Signature:**
  - **Armour plates:** overlapping rounded-hexagon plates (dark blue, gold and teal filigree, tiny inset gems)
    shingled over his back and down his tail. Each row stands a little further off the skin than the one below.
  - **Shield:** a gold shield on his left flank bearing a red R, placed low and behind the arm's swing. No plate
    sits under it.
  - **Tiles:** Gigglyph's two purple tiles on his back, carrying glowing coins with his red trident symbol from
    the artwork.
  - **Tubes:** two ribbed tubes (orange and grey) coming out of his back and coiling on the ground.
- **Animation:**
  - Every 5.3 s he gives an excited little shake and lifts his head to look about.
  - His tail sways, his arms bob, and he strides when walking.

## Somlet (m_somlet)

- **Build:** `born_somlet`, a merge of Gratelet and Somnux.
- **Body:** a floating cotton puffball squared off like Somnux's box body, with Gratelet's swirl, cream-puff hands
  and dangling plum root tentacles.
- **Face:** always asleep. Big heavy eyelids are closed over full eyes, with a soft brow and a small mouth that
  breathes (and opens more as she talks). Zs drift up beside the cap.
- **Signature:** a mail carrier's peaked cap with a navy band, white piping and a solid black visor (a thin
  half-disc, so it shows from every angle). Her badge is a little gold envelope.
- **Animation:**
  - She floats up and down (centre 1.35 ± 0.1 m) and her cap tilts.
  - Her tentacles sway, and as she sinks they splay outward just enough to keep every vertex at least 2 cm above
    the ground. The search starts from last frame's angle.

## Gemtoe (p_gemtoe)

- **Build:** `born_gemtoe`, from her artwork, in red.
- **Body:** a crimson feathered dragon with a deep fur ruff over the chest and two pairs of great feathered wings.
- **Face:**
  - a bird's face on a feathered horned head with a mint crest;
  - glowing magenta eyes under heavy brows;
  - a hooked pale beak a little open, which opens more as she talks;
  - feather tufts at the cheeks.
- **Signature:** four long scaly tails run out along the ground and rise at their ends to hold up her amethyst
  crystals, coiled round them. The crystals sparkle.
- **Animation:** she breathes, turns her head, and her wings and tails sway. Sized down to fit the talk UI.

## Hennrick (gratelet): locked

- **Build:** `city_hennrick`, pulled from Greeblis City (`modelScale` 0.88). Marked final. See the Greeblis City
  profile.
- **Role:** in the lineup. He plants with a pat. When he dances (while Fortizmo plays at the Garden Event) he
  does his own built-in Greeblis City dance instead of a table dance.

## Etcher (p_etcher): locked

- **Build:** `born_etcher`, from his artwork. Marked final.
- **Body:** a blue-teal serpent-dragon whose body rises like a bell of overlapping scales from the ground into a
  long neck.
- **Face:** a lizard's head with golden eyes and a row of little purple knobs.
- **Signature:** a green gem in the chest, two stubby clawed front feet, and long segmented purple tentacle tails
  spreading across the ground around him.
- **Animation:** a slow sway and lean. His tails drift slightly.

## King Dino (m_kingdino)

- **Build:** `born_kingdino`, from his artwork.
- **Body:** an upright lemon-yellow gummy dino with a citrus-peel skin, three square turquoise buttons with green
  lights down each side, turquoise ball joints with holes, donut rings on the hips, a holed plate on the back,
  and stubby feet.
- **Face:** a rounded muzzle, glossy navy bead eyes and a quiet smile line.
- **Signature:** a glossy turquoise crown (the front prong tallest) under a great feathered plume that runs purple
  down the back of the head, over the crown and orange down the front.
- **Drumming:**
  - He stands behind his drum set, centred at the back of the dance floor's wide southern extension, holding drumsticks. The set is from Greeblis Woods, a
    third bigger.
  - While the player is near he plays the 104 BPM groove, his arms hitting on the beat and his body rocking.
  - He stays at his kit all through the Garden Event (`AT_POST`).

## Goward (gorbo): locked

- **Build:** `born_goward`, a merge of Howard, Gorbo and Mama Gorbo (the goo family). Marked final.
- **Body:** Gorbo and Mama's egg built from Howard's fused bubbles, cyan above and peach below. Howard's pastel root
  tendrils spill out underneath.
- **Face:** Howard's "+" eyes (they blink every 4.3 s), cheek spots, wavy brow lines and a ribbon tongue that waggles
  more when he talks.
- **Signature:** gold leaf crests, the purple octagon ports and float ring Gorbo and Mama share (with a little AP
  tag), and Mama's crystal wings, which flutter.

## Nextessa (t_nextessa): locked

- **Build:** `city_nextessa`, her Greeblis City model.
- **Role:** the pizza courier. Call from the phone booth, and she comes through the portal with a pizza.
- **Garden Event:** she is not at it.

## Backpacka (t_backpacka): locked

- **Build:** `born_backpacka`, marked final.
- **Line-up stand-in:** hovers on his wings, half full, with his neck swaying and legs dangling.
- **Garden Event climax:**
  - Fills up: he drinks from the pond, gulps running up his neck as he swells.
  - Sprays: he flies to the garden, spins and sprays four arcs from his feet.
  - With Seeds: plants bloom where the water lands, and a rainbow comes out.
  - Leaves: he slims down and flies off.

## Mushroom (drifter): locked

- **Build:** `born_mushroom`, a merge of Mushroom from Greeblis City and Mushroom from Greeblis Woods. Marked final.
- **Body:**
  - City's domed cap with Woods' rim band and white spots in both sizes, glowing from gold at the crown to deep
    orange at the rim.
  - A cream stem with City's grain, Woods' collar skirt, and City's little feet and brows.
  - The blush both share.
- **Signature:** the town's sheriff, with a gold sheriff's star on his stem and a sheriff's hat on his cap.
- **Animation:** the stem sways, and the cap bobs and tilts more as he talks.

## Fortizmo (frog): locked

- **Build:** `fortizmoPick` wraps `city_fortizmo`. It refreshes her bounds so taps on her outer body always pick her.
- **Role:** in the final row. With Seeds, she raises her horn as Backpacka arrives and plays "Backpacka's Rain Strut"
  until the Event ends. Without Seeds she doesn't play.

## Anomalee (blinker): locked

- **Build:** `anomaleePeg` wraps her pulled model with a wooden peg leg.

## Zollod (cutebex): locked

- **Build:** `born_zollod`, a merge of Zollox and Kollod, standing on two legs. Marked final.
- **Body:**
  - Zollox's segmented body fades from cyan at the head to Kollod's green at the feet.
  - Kollod's mossy garden bed grows over his back with small pink and white flowers and Kollod's little worm
    peeking out.
  - Fern fronds and yellow plumes run along his shoulders, and a thick tail has Zollox's magenta tip.
- **Signature:** Zollox's curling trunk with its magenta tip, small pink flowers on his head, an olive canvas
  gardener's apron with seed packets in the pocket, and a trowel.
- **Animation:** his fronds sway, the worm turns, his trunk and tail move, and he strides when walking.
- **Role:** the Garden Supplies keeper. Interacting with him opens the shop straight away; he has no other
  menu options.
