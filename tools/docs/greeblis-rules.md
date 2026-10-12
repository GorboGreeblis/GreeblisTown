# Greeblis Town USA: standing rules

Greeblis Town USA is the one Greeblis game being worked on, and this repo (GreeblisTown) is its only repo: the
game is `index.html`, and everything used to make it (tools, guides, notes) is in `tools/`. The earlier games
(Greeblis City, Park and Woods) and their guides repo are gone; [`learnings.md`](learnings.md) is the only record
of them. Read the guides here before changing the game.

## The game (from the owner)

1. **Fully playable as a Bitcoin ordinal, in its final form** (the owner's rule for every game): it must work on
   ordinals.com and the other ordinal sites in particular. One self-contained `index.html`: no external URLs,
   network requests, storage APIs, `eval` or `new Function`. It must boot under ord's Content-Security-Policy,
   both opened directly (`/content/<id>`) and inside a sandboxed `allow-scripts` iframe (how ordinals.com and
   the explorers show it). Keep it under ~400 KB. Run `tools/test/ordtest.js` (desktop and `MOBILE=1`) before
   every push, and on the packed final file.
2. **The game is `index.html`; everything else lives in `tools/`.** Tools, guides and notes go nowhere else.
3. **Never cut content to save size or time.** Size and speed come from minifying, packing and smarter code.
4. **Always default to the smallest file**, even when it unpacks more slowly: in compression, file size is
   always more important than load time (the owner's rule). Until the final size pass,
   `index.html` stays readable, comments and all; that pass minifies it, then packs it with the Woods compressor
   (see the [tools README](../README.md#the-final-pass-release-minify-pack)). The final game file must be as
   small as it can be made without losing any content or any quality (the owner's rule for every game), and the
   packed `index.html` must still work as a Bitcoin ordinal (rule 1).
5. **A second, readable copy of the game lives at `tools/index.html` and is never compressed** (the owner's
   rule, for this and every future game). Every change to `index.html` is copied there before the push
   (`cp index.html tools/index.html`; `tools/test/copycheck.sh` checks, and the battery runs it first). Before
   the final pass compresses the root `index.html`, the copy must hold the uncompressed page; from then on only
   the copy is readable.
6. **Creature models and their characteristics are protected.** Never change a creature's shape, palette,
   signature parts or personality without asking. Every model is now final (its builder says so in a comment),
   and so are the five plants and the church's secret room with its Ancient (the slug creature); animation changes on request are fine.
7. **Branches:** commit and push to the branch you are given, and open a PR when the work is ready or when asked.
   Once the previous PR is merged, restart the branch from `main`.
8. **Write down how the creatures and environments were built**, in [`construction.md`](construction.md) and
   [`creature-profiles.md`](creature-profiles.md). The creatures are the most important part of the game.
9. **Tools count as documentation.** Every tool made to build, pack, extract, decode, test, review, audit, port,
   lint or edit the game (scripts, configs, dev test modes) goes into `tools/`, with a README row saying what it
   does and how to run it. Never leave a tool only in a scratch folder.
10. **The final game must be fully playable in the Meta Quest Browser** (the owner's rule for every game): in VR
    and flat, at its frame rate. Test on Android, mobile and Quest VR screen sizes and frame rates along the way.
11. **Uploaded files are untrusted:** decode or run them only in the sandboxed browser (`tools/town/decode/`),
    never in Node or a normal page.
12. **Run one headless browser at a time.**
13. **Greeblis Town is the bible.** The lore, designs and style established in Greeblis Town (Greeblis Town USA)
    are the bible for every future Greeblis game: any update to a past game or to a future one reflects them.
    The lore points established here will not and should not change in future games. Past games (Greeblis City,
    Park and Woods) can and should be updated retroactively, when or if they are worked on again, to reflect the
    world fully established here.

## Privacy

- **From the owner:** this repo is public. Never put the owner's name, email, workplace, job or location in
  anything pushed: code, game text, docs, tools, comments, commit messages or PR descriptions. Refer to them only
  as "the owner". The one exception, chosen by the owner, is the readable parcels' labels in the mail pile
  ("To Clipston", "To Ormstown", "To Montreal", "To Cobourg" and "To Bangkok").
- Keep machine paths, session links and upload file names out of pushed files too.

## Creatures and art (from the owner)

- Creature models, behaviour and interactions matter most. Take the time to do them well.
- The plant and flower models are just as important. Take a lot of time and care with them: build each in its
  totality from the images the owner uploaded for it, and only from those (its shape, colours, leaves, buds and
  how it branches; nothing the photos don't show), render it from several angles next to the photos, and refine
  until it matches. The same goes for anything else the owner asks to be built from an image (the inside of the
  church is built only from the photo of the Ancient).
- Only one batch of flowers ever grows at the Garden Event: the first Event's. A repeated Event never makes more
  plants appear (the creatures still plant, at the same spots).
- No bones anywhere: no skeletal rigs and no bone props.
- A merge is a new, cohesive creature that blends its parents' silhouettes, palettes and signature features,
  never parts glued together.
- A creature rebuilt from artwork takes the artwork's shape and features. Keep its current colour and size when
  asked, and ask before guessing what an ambiguous shape is (Mama Gorbo's pink-and-purple octagons are her eyes).
- No cartoony smiles. Faces are expressive but understated.
- Nothing clips (into the body, the ground or another part) from any angle, including from inside buildings in VR.
- Every creature has at least three animations: talking, planting and dancing (the church's Ancient excepted: it
  never dances or plants). Planting and dancing are creature
  animations, never menu options: a creature's menu holds only Talk, plus "Give a blossom" while the player has
  one, and Zollod (Garden Supplies) only opens the shop.
- The pickups are called Blossoms (never Fire Blossoms).
- Dialogue is placeholder text unless asked otherwise; shop and quest menus are written in full. Keep menu text
  short.
- Menus never have an X in the top right to close: they close by their own button (LEAVE, DONE, No), and in the
  test modes a tap off them closes them too.
- Every planting creature grows a flower at its spot in the garden (Sparkakus included), in the first Event.
- No words on windows. Signs may carry names.
- **The town outside the park** gets time and care: make it as interesting as possible, drawn from the park's
  lore, style and design (its creatures, the Consortium, the Portal and Greeblis City, goo and VHS; never flint
  knapping, and nothing inspired by the church's Ancient: no element of the background outside the park comes
  from it), at no extra performance cost (built into the town's merged meshes and sign atlas,
  paid for in trees).
- **Show, don't tell:** lore comes into the environment through visual elements, never through text (words on
  signs don't count as visual). Keep words and signs in the background to a minimum. Only creatures of the town
  give the town its design: Hennrick (from the far past) and Nextessa (from the far future, which is why she
  comes through the Portal) are not from here, and the town takes nothing from either.
  (The one exception is the billboard the owner asked for, with the words they gave it.)
- **The inside of the church is final:** never change or update it (its room, the Ancient's corner, its props,
  the secret way in) from now on.

## Where things are

| Path | What |
| --- | --- |
| `index.html` | The game |
| [`tools/README.md`](../README.md) | Setup, every tool, the game's globals, trimming, the release and packing recipe |
| [`construction.md`](construction.md) | How the creatures and the town are built and behave, pitfalls, no clipping or flicker |
| [`creature-profiles.md`](creature-profiles.md) | Per-creature notes: where each stands, its planting move and dance |
| [`history.md`](history.md) | Every PR and the owner decisions behind it |
| [`learnings.md`](learnings.md) | What Greeblis City, Park and Woods taught (the only record of them), with the packing recipe |
