# Greeblis Town: Standing Rules

The owner's standing rules for Greeblis Town. Every rule binds every change to the game; a rule marked
**(every game)** also binds every game made after it. These rules must be read before any change, and any conflict
between a rule and a request must be put to the owner.

Contents: [The game](#the-game) · [Working on it](#working-on-it) · [Locks and approvals](#locks-and-approvals) ·
[Platforms](#platforms-every-game) · [Privacy and conduct](#privacy-and-conduct) ·
[Creatures and models](#creatures-and-models) · [Visual quality](#visual-quality) ·
[Creature behaviour](#creature-behaviour) · [Names and text](#names-and-text) · [The world](#the-world) ·
[Related documents](#related-documents)

## The game

Rules for what the game is, where it lives and what its final file must meet.

1. The game is called Greeblis Town.
2. **(every game)** The game must be fully playable as a Bitcoin ordinal in its final form, on ordinals.com and the
   other ordinal sites. The final file must:
   - be one self-contained `index.html`, with no external URLs, network requests, storage APIs, `eval` or
     `new Function`;
   - boot under ord's Content-Security-Policy, both opened directly (`/content/<id>`) and inside a sandboxed
     `allow-scripts` iframe (as ordinals.com and the explorers show it);
   - stay under about 400 KB packed, so the inscription fits a standard Bitcoin transaction.

   The full requirements for the packed page are in [release.md](release.md#the-packed-page).
3. The game is `index.html` at the repo root. Everything else (tools, guides, notes) must live in `tools/` and
   nowhere else.
4. **(every game)** A readable copy of the game, `tools/index.html`, must exist at all times and must never be
   compressed. Every change to `index.html` must be copied there before the push (`cp index.html tools/index.html`).
   Once the final pass packs the root `index.html`, the copy is the only readable page and every later change must
   start from it.
5. **(every game)** Content must never be cut to save size or time; size and speed come from minifying, packing and
   smarter code. Performance must always be optimised, but never at the expense of quality.
6. **(every game)** The smallest file wins: in compression, file size always takes priority over load time. The final
   game file must be as small as it can be without losing any content or quality, and must still work as an ordinal.
7. **(every game)** The final pre-compression build must be stripped of every comment, section banner, object name and
   test-only label or hook; only the code the game needs to run is then minified and packed (see
   [release.md](release.md#the-final-pass)). Until that final pass, `index.html` must stay readable, comments
   included.
8. **(every game)** The Meta Quest decides performance. The game must be fully playable in the Meta Quest Browser, in
   VR and flat, holding the headset's frame rate; the Quest's draw-call, triangle and CPU budgets are the binding
   ones. Testing must cover Android phone and Quest screen sizes and frame rates throughout development.
9. Greeblis Town is the bible: its lore, designs and style ([bible.md](bible.md)) are canonical for every future
   Greeblis game, and its established lore points must never change. The earlier Greeblis games must never be worked
   on again. One may be remade as an experiment; a remake must follow the bible like any new game.
10. Desktop and Mobile are test modes and must be removed from the final build; until the owner has them cut, they
    stay in. Their code must stay fenced between `TEST-MODE-BEGIN` and `TEST-MODE-END` markers so it can be cut
    cleanly (see [release.md](release.md#the-final-pass)), and anything new written only for them must go inside a
    fence.
    - Only once the test modes are cut: desktop and phone browsers must show the game's name and that it is a VR game
      to open in the Meta Quest Browser.
    - In VR the player must land on a screen with the game's name and "Press A to enter VR".
    - The player's avatar is not a test-mode part and must never be cut: it appears in the Shop's mirror while the
      Shop menu is open (VR included), and it is maintained for the final game.
11. Anything newly introduced (an element, a symbol, a line, a design) must always fit the established lore in
    [bible.md](bible.md).
12. Creative, improvised elements must never overpower the existing lore: they may only support and connect what is
    established, kept smaller and quieter than it.

## Working on it

Rules for how changes are made, checked and recorded.

1. Work must start from the latest game in this repo, never from files uploaded earlier.
2. Work must be committed and pushed to the branch given, with a PR opened when the work is ready or when asked. Once
   the previous PR is merged, the branch must restart from `main`.
3. Between builds, `tools/test/quick.sh` (about 4 minutes) must run, naming the probes for what the change touched.
   The full `tools/test/battery.sh` (2 hours and more) must run before a release build, after a change to a whole
   system, every few PRs, and whenever the owner asks (see [testing.md](testing.md#when-to-run-what)).
4. Before every push:
   - `tools/test/ordtest.js` must pass on desktop and with `MOBILE=1`; it must also pass on the packed final file;
   - `tools/test/copycheck.sh` must confirm the readable copy;
   - a change to what is drawn must pass `Z=1 tools/test/quick.sh` and close renders.
5. Only one headless browser may run at a time.
6. Uploaded files are untrusted: they must be decoded or run only in the sandboxed browser (`tools/sandbox/`), never
   in Node or a normal page.
7. Tools count as documentation. Every tool made to build, pack, decode, test, audit, lint or edit the game must go
   into `tools/`, with an entry in the [tools README](../README.md) stating what it does and how to run it.
   Nothing may be left only in a scratch folder, and nothing may stay in `tools/` that the game no longer needs.
8. How the game is built must be written down in [construction.md](construction.md) and, for the creatures,
   [creatures.md](creatures.md).
9. Long work must save its progress as it goes, so a run that fails or is cut off never has to start over: a long
   test writes each step to a log file the moment it happens (`LOG=` for the probes, see
   [testing.md](testing.md#writing-a-probe)), long runs go in the background with their output in a file (never only
   through a pipe that prints at the end), big tasks are split into short steps that are each committed and pushed
   when done, and a task's plan and state are written down where the next session can pick them up. The logs are
   working files, a tool for finishing the task: they stay in the scratch folder, are never committed, and are
   deleted once the task is finished. The method, step by step:
   - start the long run in the background, its log file named for the task in the scratch folder;
   - while it runs, read the log to follow its progress; if the run fails or is cut off, read the log, fix the
     cause, and resume from the last step it reached instead of starting over;
   - when the run ends, read the whole log and act on what it shows (report the results, fix what failed);
   - once the task is finished, delete its logs.

   This holds for this game and every future Greeblis game.

## Locks and approvals

Rules for what is finished and who may change it.

1. **(every game)** A finished model or design is locked. Its builder, parts, proportions and palette must not be
   changed directly, by anyone, for any reason, without the owner's approval first: ask, and wait for a yes.
2. A fix that would touch a locked model (a clip, a flicker) must be made around it (its placement, its animation, the
   thing it clips into) or put to the owner first. Animation changes on request are allowed.
3. Locked now:
   - every creature whose builder marks its model as final (see [creatures.md](creatures.md));
   - the church's Ancient;
   - the inside of the church and the design of its secret room (the room, the Ancient's corner, its props, the way
     in);
   - the Event flowers: the five plant models the Garden Event grows, and only those.

   BACKPACKA, the two park birds and the player's avatar are final and locked as well.
4. **(every game)** Once the owner declares the general environment (the town, the park, the buildings and their
   props, the scenery) done, it is locked as finished models are, and any change to it needs the owner's approval
   first. Greeblis Town's environment is not yet declared done; the church's inside and its secret room are.
5. A creature carried into another game must keep its model exactly.

## Platforms (every game)

Rules for where the game runs. The gate that enforces them is described in
[construction.md](construction.md#10-platforms-and-modes).

1. Chrome is the only browser ever supported, on desktop and on a phone.
2. On a phone, the game must only ever be playable on Android: no iPhone, and no other kind of phone.
3. Mac computers are never supported, Chrome on a Mac included.
4. In VR, only the Meta Quest line and the Meta Quest Browser are supported.
5. Optimisation must target only the supported platforms: Chrome on a Windows or Linux desktop, Chrome on an Android
   phone, and the Meta Quest Browser. No performance, size, compatibility or layout work is done for anything else,
   and nothing is measured on anything else.
6. Any other browser or device must be shown a plain notice on the start screen instead of the game, naming where the
   game does play, and the game must not boot.
7. Test tools must emulate only supported devices.

## Privacy and conduct

Rules for what pushed content may contain.

1. **(every game)** No personal or identifying information about the game's creator (name, email, workplace, job,
   location) may appear in the tools folder or in anything pushed: not code, game text, docs, tools, comments, commit
   messages or PR descriptions.
2. **(every game)** The game's creator must be referred to only as "the owner".
3. **(every game)** The owner has approved exactly two exceptions to rule 1:
   - the parcel labels on the Post Office's mail heap ("To Clipston", "To Ormstown", "To Montreal", "To Cobourg",
     "To Bangkok"), which may be quoted anywhere, in the game, its readable copy and the documentation;
   - "Walter Bigsby", the author's name on the Library's STAPLERS cover, which may appear anywhere, the bible
     included.
4. **(every game)** Machine paths, session links and upload file names must be kept out of everything pushed.
5. No AI model names or identifiers may appear in anything pushed.

## Creatures and models

Rules for how creatures, plants and other modelled things are built. The methods are in
[construction.md](construction.md#3-building-creatures).

1. Creatures are the most important part of the game: their models, behaviour and interactions must be given the
   time to be done well.
2. Plant and flower models matter just as much. Each must be built from the images the owner gave for it, and only
   from those (shape, colours, leaves, buds, branching; nothing the photos do not show), rendered from several angles
   beside the photos and refined until it matches. The same applies to anything else the owner asks to be built from
   an image.
3. A creature rebuilt from artwork must take the artwork's shape and features, and keep its current colour and size
   when asked. An ambiguous shape must be put to the owner, never guessed.
4. A merge must be a new, cohesive creature that blends its parents' silhouettes, palettes and signature features,
   never parts glued together.
5. No bones anywhere: no skeletal rigs and no bone props.
6. No cartoony smiles. Faces are expressive but understated, and no creature may be given a smile without asking the
   owner first.

## Visual quality

Rules for what the renderer must never show. The techniques are in
[construction.md](construction.md#11-no-clipping-no-flicker).

1. Parts must not clip into the body, the ground or another part, from any angle, including from inside buildings in
   VR. A little clipping is acceptable; z-fighting is not.
2. No flickering and no z-fighting, ever. Faces that can both show may sit as close as the current in-game designs
   do (decals and lines a few millimetres proud are the standard); any spacing is acceptable as long as it causes no
   z-fighting or other graphical issue. Geometry must be designed for a 16-bit depth buffer.
3. No thin, high-contrast lines that shimmer as the head moves.
4. VR must render at the headset's full resolution unless the frame rate needs a step down.
5. In-world text (book titles, parcel labels, sign names, the billboard's banner) must read comfortably in VR from
   where a player naturally stands. When in doubt, bigger.

## Creature behaviour

Rules for how creatures act towards the player and the park. The systems are in
[construction.md](construction.md#4-how-creatures-behave).

1. Every creature must stop a while for the player coming near, on any walk it is on, and turn to them. Nothing may
   stop it resuming what it was doing once the player has gone: its clocks wait with it, a planned way home is kept,
   and no creature is ever left away from its own ground.
2. Every creature must always be available to talk to, mid-visit or on the way home.
3. Every creature must have at least three animations: talking, planting and dancing. The church's Ancient is the
   exception: it never dances or plants, and never will.
4. Planting and dancing are animations, never menu options. A creature's menu holds only Talk, plus "Give a blossom"
   while the player holds one; ZOLLOD's also opens the shop.
5. Menus must never have an X in the top right. They close by their own button (LEAVE, DONE, No), and in the test
   modes a tap off them closes them too.
6. Every kiosk must keep creatures out: no creature may walk into a kiosk or get stuck in one; only its keeper stands
   inside (see [bible.md](bible.md#14-the-five-kiosks)).
7. Only one batch of flowers ever grows at the Garden Event: the first Event's. Every planting creature (SPARKAKUS
   included) must grow a flower at its spot then; a repeated Event must never add more.
8. A creature speaking to the player must face the player, wherever it is (at home, out on a visit, on its way
   home) and for every page of what it says, including the moments of a speech or scene between pages. The only
   exceptions are ones the owner has set: ANOMALEE keeps gazing up at the church window through her Talk lines, and
   the church's Ancient never turns. This holds in every Greeblis game.
9. While a creature's scripted scene plays (its effects, animations and dialogue: SPARKAKUS's Gem speech, for one),
   nothing takes it away: no visit goes on or ends, no walk home, wander, meeting or vignette starts, until the scene
   is over.
10. A creature says its Garden Event line only at an Event with the Seeds, when everyone comes to the garden. Without
    the Seeds nobody comes, and everyone says its everyday lines.
11. Clothes and outfit items never appear in the Game UI (the HUD's items); the Shop's mirror is where the player sees
    them.

## Names and text

Rules for names, currency and written content.

1. The currency is Flint.
2. The pickups are called Blossoms, never Fire Blossoms.
3. Dialogue must follow the owner's script. Shop and quest menus are written in full; menu text must be kept short.
4. No words on windows. Signs may carry names.

## The world

Rules for the park's surroundings and the world's design. The town's build is in
[construction.md](construction.md#9-the-town); its lore is in [bible.md](bible.md#17-the-town).

1. The town outside the park must be given time and care, made as interesting as possible and drawn from the park's
   lore, style and design: its creatures, the Consortium, the Portal and Greeblis City, goo and VHS. It must be built
   into the town's merged meshes and sign atlas. Small, measured increases in the background's complexity are allowed,
   as long as they stay merged.
2. No national flag, the US flag included, may appear anywhere in the game. The Consortium's flag (a red toadstool on
   navy) is the only flag; it flies over the Sheriff's kiosk, never at the courthouse.
3. Flint knapping must never appear in the game's elements (not shown, built or played), and nothing outside the park
   may come from the church's Ancient. A joke in a line is allowed: MONTGUMMERY's tape "Flint Knapping for Beginners".
4. **(every game)** Show, don't tell. In the background outside the park, lore must come through visual elements,
   never through text; words on signs do not count as visual. Words and signs must be kept to a minimum. The one
   exception is the owner's billboard, with the words the owner gave it.
5. Only the creatures of the town may give the town its design. HENNRICK (from the far past) and NEXTESSA (from the
   far future, which is why she comes through the Portal) are not from here, and the town takes nothing from either.

## Related documents

Descriptive material lives in the document that owns it.

| Path | Holds |
| --- | --- |
| `index.html` (repo root) | The game |
| [`tools/README.md`](../README.md) | The tools folder's layout, setup and everyday commands |
| [`bible.md`](bible.md) | Lore, design and style: the canonical world reference |
| [`construction.md`](construction.md) | How the game is built: systems, code structure, methods, rendering, performance |
| [`creatures.md`](creatures.md) | Per-creature build and behaviour reference |
| [`testing.md`](testing.md) | Test runners, probes, audits and the game globals they use |
| [`release.md`](release.md) | The final pass: strip, minify, pack, check; the codec; trimming three.js; dead code |
