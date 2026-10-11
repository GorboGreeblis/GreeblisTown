# Greeblis Town USA: standing rules for Claude

Greeblis Town USA is the one Greeblis game being worked on, and this repo (GreeblisTown) is the only repo: the
game is `index.html`, and everything used to make it (tools, guides, notes) is in `tools/`. The earlier games
(Greeblis City, Park and Woods) and the GreeblisGuides repo are gone; what was worth keeping from them is in
[`learnings.md`](learnings.md). Read the guides here before changing the game.

## Rules (from the owner)

1. **The game must be fully playable as a Bitcoin ordinal.** It is one self-contained `index.html`: no external
   URLs, network requests, storage APIs, `eval` or `new Function`. It must boot under ord's
   Content-Security-Policy, both opened directly (`/content/<id>`) and inside a sandboxed `allow-scripts`
   iframe. Keep it under ~400 KB. Run the ord test (`tools/test/ordtest.js`, desktop and `MOBILE=1`) before every
   push.
2. **The game is `index.html`; everything else lives in `tools/`.** Tools, guides and notes go in `tools/`, never
   anywhere else.
3. **Never cut content to save size or time.** Size and speed come from minifying, packing and smarter code.
4. **Always default to the smallest file**, even when it unpacks more slowly (see the packing recipes in
   [`learnings.md`](learnings.md)).
5. **Creature models and their characteristics are protected.** Never simplify a creature's shape, palette,
   signature parts or personality without asking first (see [`construction.md`](construction.md)).
6. Commit and push to the branch you are given. Open a PR when asked. If the previous PR is merged, restart
   the branch from `main`.
7. **Write down how the game's creatures and environments were built** in [`construction.md`](construction.md)
   and the per-creature [`creature-profiles.md`](creature-profiles.md). Creature models and their characteristics
   are the most important part of the game.
8. **Tools count as documentation.** Every tool created and needed to make the game (build, pack, extract,
   decode, test, review, audit, analysis, porting, lint and editing scripts, configs and dev test modes) goes into
   `tools/`, with a README saying what each one does and how to run it. Don't leave tools only in a scratch
   folder.

## Privacy (from the owner)

- This repo is public. Never put the owner's full name, workplace, job or location in anything pushed: code,
  game text, docs, tools, comments, commit messages or PR descriptions. Refer to them only as "the owner".
  The one exception, chosen by the owner, is the readable parcel's label in the mail pile.

## Creature and art rules (from the owner)

- No bones anywhere: no skeletal rigs and no bone props.
- A merge is a new, cohesive creature that blends its parents' silhouettes, palettes and signature features, never
  parts glued together. A creature rebuilt from artwork takes the artwork's shape and features; keep its current
  colour and size when asked, and ask before guessing what an ambiguous shape is.
- No cartoony smiles. Faces are expressive but understated.
- Nothing clips (into the body, the ground or another part) from any angle, including from inside buildings in VR.
- Locked models (marked "final" in their builder) are never changed without asking.
- No words on windows.

## Where things are

| Path | What |
| --- | --- |
| `index.html` | The game |
| `tools/README.md` | Setup, how to check the game, the game's globals, trimming, packing, lessons |
| `tools/docs/construction.md` | How creatures and the town are built: toolkit, behaviour, set pieces, pitfalls, no clipping or flicker |
| `tools/docs/creature-profiles.md` | Per-creature notes for the cast, with each creature's planting move and dance |
| `tools/docs/history.md` | Every PR and the owner decisions behind it |
| `tools/docs/learnings.md` | What was learned from Greeblis City, Park and Woods (the only record of them now), with the packing recipes |
| `tools/test/` | Playwright checks, audits and renders (see the README) |
| `tools/town/` | Creature extraction, safe decoding of uploads, lint, review renders, audits (see `tools/town/README.md`) |
| `tools/three/`, `tools/pack/` | three.js trimming, and the minify-and-pack toolchain |
