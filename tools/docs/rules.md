# Greeblis Town: Standing Rules

These are the owner's standing rules for Greeblis Town. Rules marked **(every game)** apply to every game made
after it as well. Read them before changing anything; when a rule and a request conflict, ask the owner.

Contents: [The game](#the-game) · [Working on it](#working-on-it) · [Locks and approvals](#locks-and-approvals) ·
[Platforms](#platforms-every-game) · [Privacy](#privacy-every-game) · [Creatures and art](#creatures-and-art) ·
[The world](#the-world) · [Where things are](#where-things-are)

## The game

1. **The game is called Greeblis Town.**
2. **It is fully playable as a Bitcoin ordinal, in its final form (every game).** It must work on ordinals.com
   and the other ordinal sites. That means:
   - one self-contained `index.html`, with no external URLs, network requests, storage APIs, `eval` or
     `new Function`;
   - it boots under ord's Content-Security-Policy, both opened directly (`/content/<id>`) and inside a sandboxed
     `allow-scripts` iframe (how ordinals.com and the explorers show it);
   - it stays under about 400 KB packed, so the inscription fits a standard Bitcoin transaction.

   `tools/test/ordtest.js` (desktop and `MOBILE=1`) runs before every push, and on the packed final file.
3. **The game is `index.html` at the repo root. Everything else lives in `tools/`:** tools, guides and notes go
   nowhere else.
4. **A readable copy of the game, `tools/index.html`, is kept at all times and never compressed (every game).**
   Every change to `index.html` is copied there before the push (`cp index.html tools/index.html`;
   `tools/test/copycheck.sh` checks). Once the final pass packs the root `index.html`, the copy is the only readable
   page, and every later change starts from it.
5. **Never cut content to save size or time.** Size and speed come from minifying, packing and smarter code.
   Performance is always optimised, but never at the expense of quality (every game).
6. **The smallest file wins (every game).** In compression, file size always matters more than load time. The
   final game file is made as small as it can be without losing any content or quality, and still works as an
   ordinal.
7. **The final pre-compression build is stripped of all labels and comments (every game).** Every comment, section
   banner, object name and test-only label or hook goes. Only the code the game needs to run is then minified and
   packed (see [release.md](release.md)). Until that final pass, `index.html` stays readable, comments and all.
8. **The Meta Quest decides performance (every game).** The game is fully playable in the Meta Quest Browser, in
   VR and flat, holding the headset's frame rate. The Quest's draw-call, triangle and CPU budgets are the ones
   that decide. Test at Android phone and Quest screen sizes and frame rates along the way.
9. **Greeblis Town is the bible.** Its lore, designs and style ([bible.md](bible.md)) are canonical for every
   future Greeblis game. The lore points established here do not change. An earlier Greeblis game, if it is ever
   worked on again, is brought in line with them.

## Working on it

1. **Work from the latest game in this repo**, never from files uploaded earlier.
2. **Commit and push to the branch you are given**, and open a PR when the work is ready or when asked. Once the
   previous PR is merged, restart the branch from `main`.
3. **Quick checks between builds; the full battery once in a while.** Between builds run `tools/test/quick.sh`
   (about four minutes), naming the probes for what the change touched. The full `tools/test/battery.sh` (two
   hours and more) is for before a release build, a change to a whole system, every few PRs, or when the owner
   asks.
4. **Run one headless browser at a time.**
5. **Uploaded files are untrusted.** Decode or run them only in the sandboxed browser (`tools/sandbox/`), never in
   Node or a normal page.
6. **Tools count as documentation.** Every tool made to build, pack, decode, test, audit, lint or edit the game
   goes into `tools/`, with an entry in the [tools README](../README.md) saying what it does and how to run it.
   Nothing is left only in a scratch folder, and nothing stays in `tools/` that the game no longer needs.
7. **Write down how the game is built** in [construction.md](construction.md) and [creatures.md](creatures.md).
   The creatures are the most important part of the game.

## Locks and approvals

1. **A finished model or design is locked down.** No direct change to its builder, parts, proportions or palette,
   by anyone, for any reason. A fix that would touch one (a clip, a flicker) is made around it (its placement, its
   animation, the thing it clips into) or put to the owner first. Animation changes on request are fine.
2. **A locked model or design can still change, but only with the owner's approval first (every game).** Ask, and
   wait for a yes.
3. **Locked today:**
   - every creature whose builder says its model is final;
   - the church's Ancient (the owner called it perfect);
   - the inside of the church and the design of its secret room (the room, the Ancient's corner, its props, the
     way in);
   - the Event flowers: the five plant models the Garden Event grows, and only those.
4. **A finished environment is locked down (every game).** Once the owner says the general environment (the town,
   the park, the buildings and their props, the scenery) is done, it is locked as finished models are, and any
   change to it needs the owner's approval first. Greeblis Town's environment is not marked done yet; the church's
   inside and its secret room already are.
5. **A creature carried into another game keeps its model exactly.**

## Platforms (every game)

- **Chrome is the only browser ever supported,** on desktop and on a phone.
- **On a phone the game is only ever playable on Android.** No iPhone, and no other kind of phone.
- **Mac computers are never supported,** not even Chrome on a Mac.
- **In VR, only the Meta Quest line and the Meta Quest Browser are supported.**
- **Only ever optimise for the supported platforms:** Chrome on a Windows or Linux desktop, Chrome on an Android
  phone, and the Meta Quest Browser. No performance, size, compatibility or layout work for anything else, and
  nothing is measured on anything else.
- Anything else is shown a plain notice on the start screen instead of the game, and the game is not booted. The
  notice names where the game does play. Test tools emulate only supported devices.

## Privacy (every game)

- **Never include any personal or identifying information about the game's creator in the tools folder.** The
  creator's name, workplace and location are never in it.
- **Nothing pushed carries the owner's name, email, workplace, job or location:** not code, game text, docs,
  tools, comments, commit messages or PR descriptions. Refer to them only as "the owner".
- The game's own text has one exception the owner chose: the readable parcel labels on the Post Office's mail
  heap. They appear in the game only, and are never repeated in the docs.
- Keep machine paths, session links and upload file names out of everything pushed.

## Creatures and art

**Building**
- Creature models, behaviour and interactions matter most. Take the time to do them well.
- Plant and flower models matter just as much. Build each from the images the owner gave for it, and only from
  those (shape, colours, leaves, buds, how it branches; nothing the photos don't show). Render it from several
  angles beside the photos and refine until it matches. The same goes for anything else the owner asks to be
  built from an image.
- A creature rebuilt from artwork takes the artwork's shape and features. Keep its current colour and size when
  asked, and ask before guessing what an ambiguous shape is.
- A merge is a new, cohesive creature that blends its parents' silhouettes, palettes and signature features,
  never parts glued together.
- No bones anywhere: no skeletal rigs and no bone props.
- No cartoony smiles. Faces are expressive but understated; ask before giving any creature a smile.

**Quality**
- **Nothing clips** into the body, the ground or another part, from any angle, including from inside buildings in
  VR.
- **No flickering and no z-fighting, ever.** No two faces share a plane where both can show: keep a clear gap of
  1 cm or more (2 cm where one surface lies on another over a wide area), or move them apart. Design for a 16-bit
  depth buffer (see [construction.md](construction.md#11-no-clipping-no-flicker)). No thin, high-contrast lines that
  shimmer as the head moves. VR renders at the headset's full resolution unless the frame rate needs a step down.
  Check with `Z=1 tools/test/quick.sh` and close renders before every push that changes what is drawn.
- **In-world text is big.** Any words in the world (book titles, parcel labels, sign names, the billboard's banner)
  read comfortably in VR from where a player naturally stands. When in doubt, bigger.

**Behaviour**
- **Every creature stops a while for the player coming near, on any walk it is on, and turns to them.** Nothing
  stops it resuming what it was doing once the player has gone: its clocks wait with it, a planned way home is
  kept, and no creature is ever left away from its own ground.
- **Anyone can always be talked to,** mid-visit or on the way home.
- **Every creature has at least three animations: talking, planting and dancing.** The church's Ancient is the
  exception: it never dances or plants, and never will.
- **Planting and dancing are animations, never menu options.** A creature's menu holds only Talk, plus "Give a
  blossom" while the player holds one. ZOLLOD's opens the shop.
- **Menus never have an X in the top right.** They close by their own button (LEAVE, DONE, No), and in the test
  modes a tap off them closes them too.
- Only one batch of flowers ever grows at the Garden Event: the first Event's. Every planting creature grows a
  flower at its spot then (SPARKAKUS included); a repeated Event never adds more.

**Words**
- The pickups are called Blossoms, never Fire Blossoms.
- Dialogue follows the owner's script. Shop and quest menus are written in full; keep menu text short.
- No words on windows. Signs may carry names.

## The world

- **The town outside the park gets time and care.** Make it as interesting as possible, drawn from the park's lore,
  style and design: its creatures, the Consortium, the Portal and Greeblis City, goo and VHS. Build it into the
  town's merged meshes and sign atlas. Small, measured increases in the background's complexity are allowed, as
  long as they stay merged.
- **Never flint knapping**, and nothing outside the park comes from the church's Ancient.
- **Show, don't tell (every game).** In the background outside the park, lore comes through visual elements, never
  through text; words on signs don't count as visual. Keep words and signs to a minimum. The one exception is the
  billboard the owner asked for, with the words they gave it.
- **Only creatures of the town give the town its design.** HENNRICK (from the far past) and NEXTESSA (from the far
  future, which is why she comes through the Portal) are not from here, and the town takes nothing from either.

## Where things are

| Path | What it holds |
| --- | --- |
| `index.html` (repo root) | The game |
| [`tools/README.md`](../README.md) | Setup, the tools, and how to check, measure and release the game |
| [`bible.md`](bible.md) | The lore, design and style for making another Greeblis game |
| [`construction.md`](construction.md) | How the game is built and behaves: systems, the park, the town, rendering |
| [`creatures.md`](creatures.md) | Every creature: look, role, behaviour, lines |
| [`testing.md`](testing.md) | The test runners and probes, and the game globals they use |
| [`release.md`](release.md) | The final pass: strip, minify, pack, check; trimming three.js; the codec |
