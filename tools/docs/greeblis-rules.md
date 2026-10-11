# Greeblis Town USA: standing rules

Greeblis Town USA is the one Greeblis game being worked on, and this repo (GreeblisTown) is its only repo: the
game is `index.html`, and everything used to make it (tools, guides, notes) is in `tools/`. The earlier games
(Greeblis City, Park and Woods) and their guides repo are gone; [`learnings.md`](learnings.md) is the only record
of them. Read the guides here before changing the game.

## The game (from the owner)

1. **Fully playable as a Bitcoin ordinal.** One self-contained `index.html`: no external URLs, network requests,
   storage APIs, `eval` or `new Function`. It must boot under ord's Content-Security-Policy, both opened directly
   (`/content/<id>`) and inside a sandboxed `allow-scripts` iframe. Keep it under ~400 KB. Run
   `tools/test/ordtest.js` (desktop and `MOBILE=1`) before every push.
2. **The game is `index.html`; everything else lives in `tools/`.** Tools, guides and notes go nowhere else.
3. **Never cut content to save size or time.** Size and speed come from minifying, packing and smarter code.
4. **Always default to the smallest file**, even when it unpacks more slowly. Until the final size pass,
   `index.html` stays readable, comments and all; that pass minifies it, then packs it with the Woods compressor
   (see the [tools README](../README.md#the-final-pass-release-minify-pack)).
5. **Creature models and their characteristics are protected.** Never change a creature's shape, palette,
   signature parts or personality without asking. Every model is now final (its builder says so in a comment);
   animation changes on request are fine.
6. **Branches:** commit and push to the branch you are given, and open a PR when the work is ready or when asked.
   Once the previous PR is merged, restart the branch from `main`.
7. **Write down how the creatures and environments were built**, in [`construction.md`](construction.md) and
   [`creature-profiles.md`](creature-profiles.md). The creatures are the most important part of the game.
8. **Tools count as documentation.** Every tool made to build, pack, extract, decode, test, review, audit, port,
   lint or edit the game (scripts, configs, dev test modes) goes into `tools/`, with a README row saying what it
   does and how to run it. Never leave a tool only in a scratch folder.
9. **Test on Android, mobile and Quest VR** screen sizes and frame rates.
10. **Uploaded files are untrusted:** decode or run them only in the sandboxed browser (`tools/town/decode/`),
    never in Node or a normal page.
11. **Run one headless browser at a time.**

## Privacy

- **From the owner:** this repo is public. Never put the owner's name, email, workplace, job or location in
  anything pushed: code, game text, docs, tools, comments, commit messages or PR descriptions. Refer to them only
  as "the owner". The one exception, chosen by the owner, is the readable parcel's label in the mail pile.
- Keep machine paths, session links and upload file names out of pushed files too.

## Creatures and art (from the owner)

- Creature models, behaviour and interactions matter most. Take the time to do them well.
- No bones anywhere: no skeletal rigs and no bone props.
- A merge is a new, cohesive creature that blends its parents' silhouettes, palettes and signature features,
  never parts glued together.
- A creature rebuilt from artwork takes the artwork's shape and features. Keep its current colour and size when
  asked, and ask before guessing what an ambiguous shape is (Mama Gorbo's pink-and-purple octagons are her eyes).
- No cartoony smiles. Faces are expressive but understated.
- Nothing clips (into the body, the ground or another part) from any angle, including from inside buildings in VR.
- Every creature is at least as tall as the player's avatar (2.39 m), except Mushroom.
- Every creature has at least three animations: talking, planting and dancing. Planting and dancing are creature
  animations, never menu options: a creature's menu holds only Talk, plus "Give a blossom" while the player has
  one, and Zollod (Garden Supplies) only opens the shop.
- The pickups are called Blossoms (never Fire Blossoms).
- Dialogue is placeholder text unless asked otherwise; shop and quest menus are written in full. Keep menu text
  short.
- No words on windows. Signs may carry names.

## Where things are

| Path | What |
| --- | --- |
| `index.html` | The game |
| [`tools/README.md`](../README.md) | Setup, every tool, the game's globals, trimming, the release and packing recipe |
| [`construction.md`](construction.md) | How the creatures and the town are built and behave, pitfalls, no clipping or flicker |
| [`creature-profiles.md`](creature-profiles.md) | Per-creature notes: where each stands, its planting move and dance |
| [`history.md`](history.md) | Every PR and the owner decisions behind it |
| [`learnings.md`](learnings.md) | What Greeblis City, Park and Woods taught (the only record of them), with the packing recipe |
