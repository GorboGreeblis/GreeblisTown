# Open tasks

The running list of the work that is not finished yet ([rules](rules.md#working-on-it), Working on it 10). A task
comes off this list when it is done; its record is then its PR and the docs. Newest requests are added at the end of
their section.

## In progress

| Task | State | Next step |
| --- | --- | --- |
| Highest priority: VR comfort, distant fence and building-edge flicker | Distance-filtered fence coverage and front-only closed town boxes implemented; automated checks complete. Headset confirmation remains open. | On a Quest 3S, check distant fence and roof edges under slow head turns, native/adaptive quality and the Garden Event; confirm comfort and frame rate. |
| Performance pass 5 (VR and the Meta Quest Browser first) | Done so far: GOOWARD's transparent parts merged (28 draws to 3, PR #120); the painting's blank full-size canvas and first upload removed; each kiosk's frame (deck, walls, posts, roof, trim, counter, crates) baked into one mesh per material in `kioskFrame` (the four kiosks: 261 meshes to 129, triangles unchanged; `pxcmp.js` 0 differing pixels in all ten views, the close-ups alike; VR views 1 to 5 draws fewer). | Next targets: the other creatures with many unbatched parts (HENNRICK, GEMTOE, ZOLLOD, ANOMALEE), the Library, the church (19 draws), the phone booth (8). |
| Scenes hold creatures; SPARKAKUS faces the player; Event lines only with Seeds | Code done and committed earlier. The Event-lines probe passed without Seeds; the with-Seeds half and the SPARKAKUS-at-the-Event probe still have to run (the last run timed out headless before the dance). | Re-run both probes on a fresh page with a longer limit. |
| Optimise for the three supported platforms (the Meta Quest Browser in VR, Chrome on a Windows or Linux desktop, Chrome on an Android phone), the Desktop and Mobile test modes included | New. | Measure each platform first (frame time, draw calls, triangles, load time, memory) and report to the owner where each one stands; then optimise each, VR first. |
| Benchmark the first build of the game and the latest build; keep a benchmarks file across builds | `test/bench.js` written (read from outside the game, so any build measures the same way); `docs/benchmarks.md` holds the results. | Run it on the first build (commit c2ae8e4) and the latest, on desktop and phone; fill in the table; add a row for every PR from now on. |

## Waiting on the owner

Quest 3S confirmation of distant fence/building-edge comfort and frame rate (highest-priority task above).

## Current request batch — v0.2

Every note is a task. These rows remain until implementation and validation finish.

### Comfort and controls

- [ ] VR pointing then A is the primary interaction; moving over pickups is the primary pickup method.

### Bible, lore and text — priority

- [ ] Remove media/source references everywhere in documentation, including Ancient/Cave and Wanted descriptions.
- [ ] Update lore: Greeblis and all its beings are digital/code-born; this is little known in-world.
- [ ] Age of Dinosaurs: early Organics, births of KING DINO, BACKPACKA and GEMTOE; construction of Summoning Pillar and Stone.
- [ ] Portal built during age of Synthetics; Ancient withdrew into the Cave during age of Ancients; details forgotten.
- [ ] Distinguish Summoning Pillar structure from Summoning Stone item in all UI/dialogue/lore.
- [ ] Ollaag spelling and lore: evil leader of four alien factions, Alien Alliance, planning invasion; his people resemble him and travel in UFOs, not Portals.
- [ ] GEMTOE runs First Bank of Greeblis.
- [ ] Audit all flavor text against lore; add one creative, non-Event biology/mechanics Talk line per normal-talking creature.
- [ ] Add exactly one Zortoe's Home Cooking book and exactly one Traveler's Truth book.
- [ ] Make OVERCOMING lettering more prominent on OVERCOMING SHYNESS.

### Gallery and environment

- [ ] Fix label z-fighting on Gallery's large purple paint can.
- [ ] Add plentiful colorful floor goo splats to Gallery kiosk.
- [ ] Replace three small splat paintings with realistic landscape paintings; retain the large painting's quality.
- [ ] Correct Ollaag Wanted poster name; replace blue/green alien Wanted posters with the same Gray Alien poster twice.
- [ ] Remove pond dock, lily pads and bulrushes.
- [ ] Remove Robin and Cardinal and their model locks; add animated Blue Jay that stays in one tree.
- [ ] Remove beige/yellow pineapple-shaped objects and wooden marker sticks around Garden circle.
- [ ] Thin excessive generic Garden Supplies plants and check performance.
- [ ] GEMTOE home inside gazebo; add Gemtoe's Gazebo sign and gold coin stacks; validate home/visits/Event/trade/collisions.
- [ ] Consortium flag: red mushroom on orange background.
- [ ] Remove exterior church clock textures.

### Models and scripted scenes

- [ ] ZOLLOD walking: add articulation (explicit permission to edit final model).
- [ ] Ancient and Cave: add more visual detail (explicit permission); detail direction received: low curved body, granular skin, rooted stalks, gritty ground and embedded angular stones.
- [ ] ETCHER: subtle Ethereum symbol on one small scale and Bitcoin symbol on another (explicit permission).
- [ ] Extend Gem gluing scene with dialogue pause and comically slow glue drips.

### Audits and standing/release rules

- [ ] Analyze progression bugs; reproduce and repair confirmed issues.
- [ ] Analyze stability bugs; reproduce and repair confirmed issues.
- [ ] Every build: standalone/no external calls and Bitcoin ordinal verification, desktop and Android.
- [ ] Release only: v1.0; remove fenced Desktop/Mobile test modes; lock all creature/environment designs unless explicitly requested.
- [ ] Separate pre-release task: remove unused application code.
- [ ] Separate pre-release task: remove comments and labels (only executable necessities remain).
- [ ] Separate pre-release task: compress final root file; keep tools/Uncompressed/ readable and validate final ordinal.
