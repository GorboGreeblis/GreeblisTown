# Ordinal packing recipe

Every Greeblis game ships as one self-contained `index.html` that plays as a Bitcoin ordinal on
ordinals.com and Ordiscan. This is how Greeblis City was taken from 228,801 to 196,685 bytes with
byte-identical game content.

## Rules

- **Ordinal-playable, always.** No external URLs, network requests, `fetch`, storage APIs, `eval` or
  `new Function`. Must boot under ord's Content-Security-Policy and inside a sandboxed `allow-scripts` iframe
  (opaque `null` origin).
- **Only `index.html` is pushed** to a game repo.
- **No content is cut** to save size. Always default to the smallest file, even when it unpacks more slowly.
- **Stay under ~400 KB** so the inscription fits a standard Bitcoin transaction.
- **WebXR limit:** explorer preview iframes don't grant `xr-spatial-tracking`, so on a Quest the player
  enters VR from the inscription's own `/content/<id>` page.

## Pipeline

1. **Unpacked game page**: one HTML document holding the throttle prelude, the trimmed three.js bundle
   (`var THREE=...`, exports exactly the classes the game uses) and the game script.
2. **Build** (`tools/greeblis-city/build/build.py <app.js> <out.html> <mode>`):
   - patches three.js for radial fog and blanks unused shader chunks;
   - re-minifies three.js with terser `pure_funcs` for `console.warn/error/log` (removes developer-only
     deprecation messages, about 2.5 KB compressed);
   - aliases every `THREE.X` to a local `T_X`;
   - runs terser on the game: 5 compress passes, top-level mangling, and `gc*` property mangling
     (exclude every `gc*` name that also appears inside a string literal or GLSL).
   - Modes: `strip` (readable), `strip+terser` (keeps test hook names), `strip+terser+ship` (final).
   - Pin the terser version. The shipped file was built with terser 5.31.0. Terser 5.51.2 makes it 186 bytes
     smaller but different, so a rebuild only matches the shipped file byte for byte with 5.31.0.
   - `build.py` is written for Greeblis City. For another game, run terser on the game script only (never on the
     three.js script; split them first if they share a line), with the same options:
     `terser _in.js --ecma 2020 --compress passes=5,ecma=2020,keep_fargs=false --mangle --toplevel --mangle-props regex=/^gc(?!(?:Part|Roam|R|A|B|C|D|I|0|1|2)$)[A-Za-z0-9]/`.
     Rebuild the exclusion list for each game: every `gc*` name that appears inside a string literal.
   - Starting from a game that is already packed (LZMA or Roadroller)? Get the unpacked page by hooking
     `Document.prototype.write` in a browser and saving the string, as `tools/greeblis-city/test/ordtest.js` does
     (`tools/greeblis-city/build/decode.js` does the same in Node for Greeblis City's 7-bit pages).
3. **Compress with Roadroller 2.1.0**, patched for 8-bit output (`tools/greeblis-city/pack/rr8patch.py`). Input type
   `text`, action `return`, 150 MB model memory.
   - Tune with `node pack8.mjs game.html out 2 150` (level 2 takes about 25 minutes; worth it, about 0.5% smaller than level 1).
     Never use level 0: it skips tuning and comes out about 2% bigger.
   - Re-pack with known-good options: `node packopts.mjs game.html out '<options json>'`.
4. **Check** the fast decoder: `node fastdec.js out.bin out.dec.js game.html` must print `ok true`.
5. **Encode the page** (`python3 encode10.py out.bin out.dec.js index.html "Game Name"`):
   - compressed bytes are packed 7 bits per character into `<script type=b>`, escaping 0, 13 and 60
     (NUL, CR, `<`) as one character in 128-511;
   - a minimal outer page: doctype, charset, title, background, an "Unpacking <name>..." line that paints
     before decoding (about 30 ms), then the loader;
   - the loader unpacks the 7-bit text and runs a hand-written decoder that is bit-identical to Roadroller's
     but about 5x faster (about 5 s for a 750 KB game on a desktop test machine), then `document.write`s the game.

## Settings

| Setting | Value | Why |
| --- | --- | --- |
| Roadroller input | type `text`, action `return` | HTML is not JS; the loader does the `document.write` |
| Model memory | 150 MB | 64 MB costs about +4 KB, 32 MB about +8.5 KB; 300 MB gave no gain |
| Contexts | 12, tuned by `optimize` | 6 contexts decode about 30% faster but cost about +8 KB, so they are not used (smallest file wins) |
| Output | 8-bit bytes (patched) | stock 6-bit text wastes the gain (240 KB vs 202 KB) |
| Transport escapes | 0, 13, 60 | NUL, CR and `<` break inline script text |

Greeblis City's tuned options are in `games/greeblis-city/roadroller-opts.json`.

## Verification before every push

- [ ] `fastdec.js` round trip prints `ok true`.
- [ ] In a real browser the string passed to `document.write` is byte-identical to the unpacked game, in
      desktop and Quest (`window.__gbHarness=1`) modes.
- [ ] The "Unpacking..." line paints before decoding: `first-contentful-paint` within about 50 ms. Screenshots
      can't show it because the page is busy decoding, so check the paint timing instead.
- [ ] `tools/greeblis-city/test/ordtest.js index.html game.html` passes all four cases (direct and sandboxed iframe, desktop and Quest):
      gate visible, canvas present, no page errors, no CSP violations, iframe origin `null`, decode exact.
- [ ] It also passes when served as `text/html` with no charset (`CT=text/html node ordtest.js ...`).
- [ ] No `http(s)://`, `fetch(`, `XMLHttpRequest`, `localStorage`, `eval(` or `Function(` in the outer page.
- [ ] Final size under 400 KB; only `index.html` changed.
- [ ] If game code changed:
  - [ ] `progcheck.js` reports all shader programs compiling;
  - [ ] `sim.js` (390 s playthrough) ends with `ERRORS (0)`;
  - [ ] `vigtest.js` and `talkcheck.js` pass;
  - [ ] `cmp.js` pixel-compares against the previous build. Seed `Math.random`; `cmp.js` already does.

`ordtest.js` waits for an element with `id="gate"` (the start screen) and sets `window.__gbHarness` for Quest
mode. Change both to match another game before testing it.

## Sizes so far

Measured when Greeblis City moved to this recipe (unpack times on the desktop test machine).

| Game | `index.html` | Unpacked | Packing | Unpack time |
| --- | --- | --- | --- | --- |
| Greeblis City, before | 227,963 B | 746,606 B | LZMA | about 2.5 s |
| Greeblis City, PR #20 | 202,215 B | 746,606 B | Roadroller + fast decoder | about 7 s |
| Greeblis City, PR #22 (current) | 196,685 B | 730,166 B | Roadroller + fast decoder, engine warnings stripped, deep tuning | about 5 s |
| Greeblis Park, earlier | 227,030 B | 723,713 B | LZMA | about 2.6 s |
| Greeblis Park, PR #15 (10 Oct 2026) | 158,491 B | 586,728 B | Greeblis Woods compressor | about 5 s (Node) |
| Greeblis Woods, earlier | 160,734 B | 621,052 B | its own context-mixing coder | about 7.9 s |
| Greeblis Woods, PR #12 (10 Oct 2026) | 155,649 B | 589,715 B | its own context-mixing coder | about 5 s (Node) |

Greeblis Park moved to the Greeblis Woods compressor instead (see [games/greeblis-park](../../games/greeblis-park/README.md)).

## Tried and not worth it

- Terser "unsafe" options: about 100 bytes, with semantic risk.
- A larger compression model: no gain.
- Squeezing whitespace in shader strings: already done (4 bytes).
- Shortening the payload lookup to `document.scripts[0]`: saves about 10 bytes, but breaks if a viewer injects a script.

## Pitfalls

- Property mangling broke shader uniforms (`gcR`) and pattern names looked up by string (`"gcRoam"`). Exclude
  string-referenced names and pixel-compare.
- Stock Roadroller decodes at about 1 s per 30 KB: too slow for big games without the fast decoder.
- Decoding needs `Math.log`/`Math.exp` to match between Node (encoder) and the browser. Roadroller's author
  documents this as safe across browser engines.
- Decoding allocates about 150 MB briefly; it is freed before the game boots.
- `encode10.py` takes the game name as its last argument. Leave it out and the wrong title shows while unpacking.
