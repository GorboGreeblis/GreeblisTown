# Greeblis Town USA: change history

Every change to the game went through a PR in this repo,
[GorboGreeblis/GreeblisTown](https://github.com/GorboGreeblis/GreeblisTown) (named JurassicGreeblisPark at first).
The game began as **Jurassic Greeblis Park**, a prehistoric clearing with dinosaurs; with #20 it became a small
Midwest town, and with #31 it was renamed **Greeblis Town USA**. Newest first.

| PR | Merged | What changed |
| --- | --- | --- |
| [#55](https://github.com/GorboGreeblis/GreeblisTown/pull/55) | | Creatures visit each other about once a minute, everyone to everyone (kiosk workers too); King Dino, Somlet and the church's slug are only visited (the slug rarely, in and out through the X), never Nextessa or Backpacka. Vignettes play only with the two side by side, an animation or the lines (two per pair, every pair's in about three hours); pairs not together meet by a visit. Kiosk hosts step out to meet a visitor; Sparkakus is met on his open Library floor and gives the Artifacts speech where he stands; Mushroom jumps down off and back onto his desk. The slug takes a Blossom ("...") and is picked by its whole body. The Library's Electric Blossom, Acorn and "Overcoming Shyness"; Montgummery's fourth Talk line; GLUE on the glue bottle. The GARDEN EVENT menu (Summoning Stone, Seeds, Snacks) and the Event needs the Summoning Stone; the Artifacts and Gem are quest items only. Walking through the Summoning Stone never darkens the view. A copy-errors button in the desktop and mobile test modes, and an error counter on desktop; the mobile errors near the church fixed. Somlet's lids, sill and counter-glass z-fighting. The route planner can no longer hang. |
| [#54](https://github.com/GorboGreeblis/GreeblisTown/pull/54) | 2026-10-12 | The owner's script: Sparkakus's Artifacts talk by count, the glue bottle putting the Ancient Gem together, his Blossom lap; pizza at the Event once Snacks is done; the Library's face-out books and Wish Blossom; the GLOOPERNAUGHT poster in the Sheriff's kiosk; every vignette rewritten, one for every pair of creatures. |
| [#53](https://github.com/GorboGreeblis/GreeblisTown/pull/53) | 2026-10-12 | Only the first Event ever grows flowers (later Events replay the same spots). The Library has no reading table and shows no Artifacts. No Blossom or Flint spawns in the church's secret room (tested). Every tool script says what it does and how to run it. |
| [#52](https://github.com/GorboGreeblis/GreeblisTown/pull/52) | 2026-10-11 | The five plants finished from the owner's photos, with a light version beyond 7 m, and locked; the church's secret room (built from the slug photo, a small red X at the way in) and its slug (one Talk, idle/Talk/Dance/Planting moves where it lies), locked. One flower per planter, where it digs. The plant test row removed. The phone locked until Mushroom gets a Blossom. No quest or item progress at the start. Every Blossom gift costs one (so every Dance battle does). OVERCOMING SHYNESS in the Library; no cross on the Town Hall; Anomalee's peg-leg z-fight. Tools cleaned up (duplicates and broken scripts removed, new church, phone and Blossom tests). |
| [#51](https://github.com/GorboGreeblis/GreeblisTown/pull/51) | 2026-10-11 | One repo: the other games' copies removed, so [learnings.md](learnings.md) is the only record of City, Park and Woods; the privacy rule; a final pass over the docs. Every building door is wood, with a transom over storefront doors. Mistergummery's in Montgummery's teal, with no burger on the roof and the pylon just the M. King Dino's drum rug layers no longer fight (`unfightParts` sinks a part at most half the thinner part's depth). His jazz is scheduled 3 s ahead, judged from the avatar's head in the test modes, and rests from when Fortizmo raises her horn. The Summoning Stone's floating pebbles, the park's three round flowerbeds and the park's benches and trash cans removed. The player starts just south of the Summoning Stone, facing the church. The ground grid has a third of the triangles (5 m cells in play, 40 m in the fog), and merged scenery drops faces lying face-down on the ground. Tools: `t_zfight.js` names clashes by the triangles' own colours (it had lumped unnamed merges together and missed real clashes), `t_jazz.js` prints FAIL where the jazz is missing, `t_perf.js` attributes draws from the render list. |
| [#49](https://github.com/GorboGreeblis/GreeblisTown/pull/49) | 2026-10-11 | Tools only: `t_perf.js` (performance profile), `t_ground.js` prints where each worst dip happens, learnings on the uploaded final builds. |
| [#48](https://github.com/GorboGreeblis/GreeblisTown/pull/48) | 2026-10-11 | Plant test row with five placeholder kinds, which the Event now grows. Library rug from the Buns' Woods prints. VR head guard. No z-fighting in merged scenery (load-time fix); Somlet's cap depth-biased. Creatures stand on the real surface under them. The avatar walks and idles in the test modes. Sky dome inside the far plane. The readable parcel in the mail pile; Mistergummery's replaces the hardware store. Bug-pass fixes (Event, Somlet, roamers, Mushroom's desk, goo splat order); Sparkakus browses his Library. |
| [#47](https://github.com/GorboGreeblis/GreeblisTown/pull/47) | 2026-10-11 | King Dino's jazz. Roaming creatures (Hennrick at the Portal, Gemtoe and the Gorbos in the park, the Dancers on the floor) and the Gorbos' meetings. Somlet asleep on her side. Anomalee keeps gazing at the window through Talk. Garden Event rounds. Goward renamed Gooward. Far scenery removed. The VR sound wakes when the headset is put back on. |
| [#46](https://github.com/GorboGreeblis/GreeblisTown/pull/46) | 2026-10-11 | Bug pass: Event wrap-up, talk targets, battles, VR controllers, the courier, vignettes, walk animation. `tools/` holds every tool, with a README. |
| [#45](https://github.com/GorboGreeblis/GreeblisTown/pull/45) | 2026-10-11 | Size pass (1,084,904 to 1,040,924 bytes: dead code removed, three.js trimmed). New spots: Sparkakus only at the Library, Zollod behind his counter, Somlet at the Post Office, Anomalee at the church, Fortizmo behind the Juice Bar. The Garden Event in order. The drums never stop on the floor. Shop and pickup fixes. |
| [#44](https://github.com/GorboGreeblis/GreeblisTown/pull/44) | 2026-10-11 | Nextessa's pizza completes the Snacks quest. A Blossom to a Dancer starts a Dance battle, and first wins award the Ancient Artifacts (the hidden pickups are gone). Performance pass. |
| [#43](https://github.com/GorboGreeblis/GreeblisTown/pull/43) | 2026-10-11 | Pickups kept off the dance floor. Every creature model marked final. Glyph's tubes stay on the ground, Etcher's tentacle tips closed. The THEATER sign. A three-quest HUD (`TEST_QUESTS`). No park copies of Nextessa or Backpacka. |
| [#42](https://github.com/GorboGreeblis/GreeblisTown/pull/42) | 2026-10-11 | Dance battles (rock, paper, scissors) and the Dancers' own dances. New clothes (Flower Hat, Sun Dress, Frog Shoes). The Ancient Gem, traded by Gemtoe for the Summoning Stone; the Artifacts become three pieces of a teal diamond. Mushroom on the Sheriff's raised desk. Church windows final. The UFO. Plants come up only where creatures plant (the special ring of flowers is gone). |
| [#41](https://github.com/GorboGreeblis/GreeblisTown/pull/41) | 2026-10-11 | Montgummery's hands face inward. Glyph, Gemtoe and Etcher scaled to Montgummery's height. The dance floor one 10 × 32 rectangle. |
| [#40](https://github.com/GorboGreeblis/GreeblisTown/pull/40) | 2026-10-11 | A purple tiled dance floor; King Dino and his kit on the grass behind it; drums heard only on the floor. Sparkakus as tall as Hennrick. The Library banner behind the bookcases. Montgummery's screen faces (talking, a Blossom smile, a planting shovel). |
| [#39](https://github.com/GorboGreeblis/GreeblisTown/pull/39) | 2026-10-11 | The dance floor's extension south of the bar reaches out twice as far, with King Dino and his drum kit centred at its back. |
| [#38](https://github.com/GorboGreeblis/GreeblisTown/pull/38) | 2026-10-10 | Menus hold only Talk and Blossom (planting and dancing are creature animations; Zollod only opens the shop); Blossoms renamed. Mama Gorbo joins the lineup, with colourful goo streams animated like goo, goo shot at the player for a Blossom and a brighter peach. Hennrick and Montgummery locked. A rectangular dance floor, an open Library of bookcases, runes dark until the stone is used, and the church roof meeting its walls. |
| [#37](https://github.com/GorboGreeblis/GreeblisTown/pull/37) | 2026-10-10 | Church garden windows: the right-hand window from Greeblis City on the church's right side (the figure's face removed) and a copy with the figure and Mama Gorbo swapped on the left. Every creature talks, plants and dances: its own dance and planting move, "Ask … to dance / plant" menu options, and dancing round the garden while Fortizmo plays. |
| [#36](https://github.com/GorboGreeblis/GreeblisTown/pull/36) | 2026-10-10 | Library (Sparkakus is the librarian) and the Ancient Artifacts quest with the Greeblis City light bulb. Garden Supplies is the only shop; Seeds decide how the Garden Event plays out. The Summoning Stone starts the Event. Montgummery replaces Gorton. Mama Gorbo is rebuilt from her artwork. Glyph and Somlet fixes; Etcher locked. Purposeful paths, the church moved to the south walk, the obelisk removed, a dance floor by the Juice Bar, a mail mountain behind the Post Office, and the cars removed. |
| [#35](https://github.com/GorboGreeblis/GreeblisTown/pull/35) | 2026-10-10 | Bug pass, dead-code cleanup, performance and size pass (file 22% smaller). King Dino's drum set from Greeblis Woods, the phone booth, Gorbo and Mama Gorbo. |
| [#34](https://github.com/GorboGreeblis/GreeblisTown/pull/34) | 2026-10-10 | Zollod replaces Larry, Sparkakus merges with Shopstar, all NPCs in rows, Greeblis Park's tail mist. |
| [#33](https://github.com/GorboGreeblis/GreeblisTown/pull/33) | 2026-10-10 | Creatures from artwork, Gorton, kiosk shopkeepers, solid buildings, two NPC rows. |
| [#32](https://github.com/GorboGreeblis/GreeblisTown/pull/32) | 2026-10-10 | The church with the Traveler window; Anomalee gazes up at it; Sparkstar recoloured. |
| [#31](https://github.com/GorboGreeblis/GreeblisTown/pull/31) | 2026-10-10 | Renamed Greeblis Town USA; Sheriff's fixes, doors, the big M, creature fixes, ground-level gazebo. |
| [#30](https://github.com/GorboGreeblis/GreeblisTown/pull/30) | 2026-10-10 | Juice Bar with Fortizmo as bartender; line-up behind the pond; event cast cleanup. |
| [#29](https://github.com/GorboGreeblis/GreeblisTown/pull/29) | 2026-10-09 | Gardening Event: planting animations, crackle-free jazz, clean ending, performance and file size. |
| [#28](https://github.com/GorboGreeblis/GreeblisTown/pull/28) | 2026-10-09 | Garden event: plant inside the garden and step out for Backpacka; Fortizmo plays from Backpacka's arrival to the end. |
| [#27](https://github.com/GorboGreeblis/GreeblisTown/pull/27) | 2026-10-09 | Backpacka climax and Fortizmo's new jazz tune, pair vignettes, creature quality pass, the UFO, Voynich plants, depth fixes. |
| [#26](https://github.com/GorboGreeblis/GreeblisTown/pull/26) | 2026-10-09 | Removed Patchoolee, Slugwerth, Appterix, Seedric, Interstitia and The Professor. |
| [#25](https://github.com/GorboGreeblis/GreeblisTown/pull/25) | 2026-10-09 | NPC round: 4 deletions, 4 new merges, unified options, one line-up on a longer square. |
| [#24](https://github.com/GorboGreeblis/GreeblisTown/pull/24) | 2026-10-09 | Somlet's mail cap, Maltoe's mushrooms and badge, Larry's apron, Mistergummery's. |
| [#23](https://github.com/GorboGreeblis/GreeblisTown/pull/23) | 2026-10-09 | Fixed creatures at the row ends; Larry and Nextessa added to the north row. |
| [#22](https://github.com/GorboGreeblis/GreeblisTown/pull/22) | 2026-10-09 | Post Office: comically high mail piles (later replaced by the mail mountain behind it). |
| [#21](https://github.com/GorboGreeblis/GreeblisTown/pull/21) | 2026-10-09 | Corner kiosks, park fence, gazebo collision, the "Greeblis Town USA" sign. |
| [#20](https://github.com/GorboGreeblis/GreeblisTown/pull/20) | 2026-10-09 | Remodelled the environment as a small Midwest town. |
| [#19](https://github.com/GorboGreeblis/GreeblisTown/pull/19) | 2026-10-09 | Reimagined merges; John Owl and Toebert removed; peg-legged Anomalee; park creatures removed. |
| [#18](https://github.com/GorboGreeblis/GreeblisTown/pull/18) | 2026-10-09 | New merged creatures, row cleanup and a scenery fix. |
| [#17](https://github.com/GorboGreeblis/GreeblisTown/pull/17) | 2026-10-09 | Kept Gorbo's goo strands attached to Gorbo. |
| [#16](https://github.com/GorboGreeblis/GreeblisTown/pull/16) | 2026-10-09 | Replaced all NPCs with models pulled from Greeblis City, Park and Woods. |
| [#15](https://github.com/GorboGreeblis/GreeblisTown/pull/15) | 2026-10-09 | Fixed UI text overflow; kept the quest HUD on screen. |
| [#14](https://github.com/GorboGreeblis/GreeblisTown/pull/14) | 2026-10-09 | Environment model and texture pass. |
| [#13](https://github.com/GorboGreeblis/GreeblisTown/pull/13) | 2026-10-09 | Creature texture system v2 and rebuilt models for 20 creatures. |
| [#12](https://github.com/GorboGreeblis/GreeblisTown/pull/12) | 2026-10-09 | Merged the owls, the rabbits, and Gratelet with Somnux; restored Nextessa; fixed Fortizmo picking. |
| [#11](https://github.com/GorboGreeblis/GreeblisTown/pull/11) | 2026-10-08 | Made the dinosaurs friendly and talkative. |
| [#10](https://github.com/GorboGreeblis/GreeblisTown/pull/10) | 2026-10-08 | Creature models with more detail and structure. |
| [#9](https://github.com/GorboGreeblis/GreeblisTown/pull/9) | 2026-10-08 | Greeblis Woods creatures: a new row, and merges with same-named creatures. |
| [#8](https://github.com/GorboGreeblis/GreeblisTown/pull/8) | 2026-10-08 | Merged creatures, a Greeblis City creature row, smoother mobile camera and rotation. |
| [#7](https://github.com/GorboGreeblis/GreeblisTown/pull/7) | 2026-10-08 | Temporary mobile testing mode (touch controls, diagnostics, Android fixes). |
| [#6](https://github.com/GorboGreeblis/GreeblisTown/pull/6) | 2026-10-08 | 19 creatures rebuilt from GREEBLIS v15; Appterix uses the original Appteryx model. |
| [#5](https://github.com/GorboGreeblis/GreeblisTown/pull/5) | 2026-10-08 | Appterix as a Rex hybrid; quest renamed "Watering Cans" (later removed). |
| [#4](https://github.com/GorboGreeblis/GreeblisTown/pull/4) | 2026-10-08 | Garden-planting event, Seeds and Watering Can quests, portal and Nextessa, Hennrick, a new volcano. |
| [#3](https://github.com/GorboGreeblis/GreeblisTown/pull/3) | 2026-10-08 | Tropical clearing, prehistoric shop and pond, Flint, Fire Blossoms, NPC line-up, tail jitter fix. |
| [#1](https://github.com/GorboGreeblis/GreeblisTown/pull/1), [#2](https://github.com/GorboGreeblis/GreeblisTown/pull/2) | 2026-10-08 | Jurassic Greeblis Park: prehistoric clearing, dinosaurs, placeholder text, desktop test mode. |

## Owner decisions recorded along the way

The standing rules that came out of these are in [greeblis-rules.md](greeblis-rules.md); these are the other
decisions, with the PR that carried them.

- **The game:** it is called "Greeblis Town USA" (#31). One repo from #51 on; the readable parcel's label in the
  mail pile is the one exception to the privacy rule.
- **Creatures:**
  - Every model is final (#43); Montgummery's screen mouth is a flat line, with a pixel smile only for a while
    after a Blossom (#40).
  - Creatures first stood still in rows; from #47 some roam (Hennrick round the Portal, Gemtoe and the Gorbos in
    the park, the Dancers on the dance floor), and the rest keep a post.
  - Mama Gorbo is a bright, vibrant peach, with colourful goo dripping out of her (animated like goo, never
    clipping, no see-through ends), and shoots goo at the player when given a Blossom (#38).
  - Vignettes play with a 15% chance.
- **Quests:** the Ancient Artifacts come from Dance battles, one from each Dancer's first win (#42, #44). For a
  while the Summoning Stone was owned from the start and all three quests started complete, only for testing
  (`TEST_QUESTS`, #43); that head start was removed, so a game starts with no quest or item progress.
- **The Garden Event:** it starts only from the Summoning Stone, whose runes stay dark until the player uses it
  holding the Stone (#36, #38). Without Seeds it is bare; with them the plants are the ones the creatures plant
  (#42), the first two Events each grow a batch and later ones grow nothing (#47), and plants persist for the
  session.
- **The church:** a garden window on each side wall, the right one as in Greeblis City and the left a copy with the
  figure and Mama Gorbo swapped (#37); figures in the windows have no faces; the windows are final (#42). Nothing
  is placed inside the church, and the park has no flowerbeds (#51).
- **The town:**
  - Every path leads to a kiosk or a building and ends there (#36).
  - The Library is open: only rows of bookcases spaced out, the LIBRARY banner behind them, no walls or raised
    platforms (#38, #40).
  - The dance floor is one 10 × 32-tile rectangle from the bar's north end, twice the bar's length (#39, #41); King
    Dino and his kit stand on the grass behind its south half (#40).
  - No cars (#36), no far scenery (#47), no benches or trash cans, and no floating pebbles round the Summoning
    Stone (#51).
  - Every door is wood, with a transom over storefront doors; Mistergummery's uses Montgummery's teal instead of
    yellow, has no roof burger, and its pylon is just the M (#51).
  - The player starts just south of the Summoning Stone, facing the church (#51).
