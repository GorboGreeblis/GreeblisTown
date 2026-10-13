# Releasing Greeblis Town

How the readable game becomes the packed ordinal: the rules a packed page meets, the final pass step by step, the
codec, trimming three.js, finding dead code, and the checks before a release. All commands run from `tools/`.

Contents: [What a packed page must meet](#what-a-packed-page-must-meet) · [The final pass](#the-final-pass) ·
[The packed page](#the-packed-page) · [The codec](#the-codec) · [Trimming three.js](#trimming-threejs) ·
[Finding dead code](#finding-dead-code) · [Release checklist](#release-checklist)

## What a packed page must meet

- **One self-contained `index.html`:** no external URLs, network requests, `fetch`, `XMLHttpRequest`, storage,
  `eval` or `new Function`.
- **It boots under ord's Content-Security-Policy** (`default-src 'self' 'unsafe-eval' 'unsafe-inline' data:
  blob:`; the game still never uses `eval`), both opened directly (`/content/<id>`) and inside the explorers'
  sandboxed `allow-scripts` iframe (`/preview/<id>`, origin `null`, where storage throws).
- **Under about 400 KB,** so the inscription fits a standard Bitcoin transaction. No content is ever cut; the
  smallest file wins, even when it unpacks more slowly.
- **On a Quest, the player enters VR from `/content/<id>`;** the explorer's iframe blocks it.
- **It stays 7-bit,** as pages may be served as `text/html` with no charset.

## The final pass

0. **Keep the readable copy.** Copy the readable page to `tools/index.html` first (`cp index.html tools/index.html`;
   `test/copycheck.sh` confirms). That copy is never minified or packed; once the root is packed, it is the only
   readable page and every later change starts from it.
1. **Start clean.** The game starts with no quest or item progress; the tests give themselves what they need.
2. **Cut the Desktop and Mobile test modes** (the owner's plan: they are not in the final build):
   `node pack/cutmodes.js ../index.html cut.html`. Every line from a `TEST-MODE-BEGIN` marker through the next
   `TEST-MODE-END` goes; the tool fails on a fence left open or nested. What is left still runs as it is:
   - the `dk = { on: false }` stub stays outside the fences, so the shared code's `dk.on` checks read false;
   - `window.__jgpMobile` is never set, so every check on it takes the headset's settings;
   - the start screen's flat-screen branch is left empty. Before the release, give it the notice the owner wants
     for desktop and phone browsers (see the platforms in [rules.md](rules.md#platforms-every-game)).

   Checked on 13 Oct 2026: the cut page parses, boots with 0 errors and builds the whole world. Work on `cut.html`
   from here on.
3. **Cut the game script out** (the last `<script>` in `index.html`) to `game.js`.
4. **Strip every label and comment from it:** every comment and section banner, every object name and test-only
   label or hook (the `window.__jgp…` and `__gb…` hooks, the test modes' text) the game does not need to run. The
   readable copy keeps all of it.
5. **Minify it:** `node pack/min.js game.js game.min.js` (terser 5.31.0, pinned: ECMAScript 2020, top-level
   mangling, two compress passes, no parentheses wrapped round function arguments). The probes rely on the global
   names, so test the readable page and ship the minified one.
6. **Put `game.min.js` back** in place of the game script, and boot-test that page with `test/ordtest.js`, desktop
   and `MOBILE=1`.
7. **Pack it:** `node pack/pack.js page.html index.html "Greeblis Town"`. Check the round trip with
   `node pack/unpack.js index.html check.html`: it must report `decoder matches model.js: true`, and `check.html`
   must be identical to `page.html`.
8. **Test the packed page** with `test/ordtest.js`, desktop and `MOBILE=1`, and go through the
   [release checklist](#release-checklist).

`node pack/size.js [index.html] [outdir]` measures every step without touching the repo: the readable page, the page
minified with the release settings, and that page packed (round trip checked), with the intermediate pages written
out for boot tests. On 13 Oct 2026 the readable 1,363,859-byte page minified to 886,528 bytes and packed to
235,338 bytes.

| Pack tool | What it does |
| --- | --- |
| `pack/min.js <in.js> <out.js>` | Minifies the game script with the release settings. |
| `pack/pack.js <page.html> <out.html> "<title>"` | Packs a page into the ordinal and checks the round trip. |
| `pack/unpack.js <packed.html> <out.html>` | Unpacks with the page's own decoder and says whether it is `model.js`. |
| `pack/model.js` | The decoder every packed page carries, embedded verbatim. |
| `pack/cmz.js` | The codec as readable source (see below). |
| `pack/size.js [index.html] [outdir]` | The page's weight at each step of the pass. |

Never minify three.js with top-level mangling: `var THREE` must stay global. A name that also appears in a string or
in GLSL breaks if it is mangled as a property; keep property mangling off.

## The packed page

- **The outer page is minimal:** doctype, charset, viewport, the title, a dark background, and one `LOADING` line
  that paints before decoding starts (within about 50 ms).
- **The payload** sits in `<script type="b">` (a type the browser never runs), packed 7 bits to a character. The
  values 0, 13 and 60 (NUL, CR, `<`) would break inline script text, so each is folded with the next value into one
  character of 128 to 511; escaping costs nothing. The payload never contains `</script`.
- **The loader** unpacks the 7-bit text, runs the decoder (updating `LOADING nn%` every 16 KB), then
  `document.open()`, `document.write(page)`, `document.close()`. It passes the game's title to the written page, so
  the right title shows while unpacking, and it finds the payload by its type, never as `document.scripts[0]`.
- **Recovering the readable page** from a packed one means hooking `document.write`, only ever in the sandboxed
  browser: `node sandbox/decode.js <packed.html> <decoded.html>`.

## The codec

The packer is a context-mixing compressor; only its decoder ships, inside every packed page.
- **One generator, `cmz(data, len, enc)`,** is shared by encoder and decoder, so the two can never drift.
- **12 hashed contexts:** orders 0 to 4; two longer orders (5 to 6 bytes, and up to 8); the current word's hash with
  the previous word; two sparse byte pairs; an order-4 and order-5 mix; the word with the previous byte. Each has
  two adaptive probabilities and a run model, in a 2^23-bucket table (64 MB of `Uint16`).
- **A match model** (4-byte minimum) predicts the next bit from the longest earlier match.
- **Three neural mixers** (selected by the partial byte, by the previous byte and bit position, and by the match
  state) feed a final mixer, then two interpolated APM/SSE stages.
- **A 32-bit binary arithmetic coder.** The decoder is about 5 KB. Encoding takes 5 to 7 seconds on a desktop;
  decoding about 5 seconds in Node and 15 in headless SwiftShader.

`pack/pack.js` builds its encoder from `pack/model.js` itself: it runs the decoder's model with the known input bits
and swaps the arithmetic decoder's lines for the matching encoder's, so the shipped decoder unpacks the result bit
for bit. `pack/cmz.js` is the same codec as readable source; its encoder output is byte-identical to `pack.js`'s. To
change the model, change `cmz.js` and rebuild `model.js` and `pack.js`'s encoder from it together, then check the
round trip.

Tried and not worth it: a larger model (no gain), terser's `unsafe` options (about 100 bytes, with semantic risk),
squeezing whitespace in shader strings (4 bytes), and reading the page back with `fetch` for an 8-bit payload
(unreliable in ordinals). Roadroller packed bigger at its fast setting and unpacked far more slowly.

## Trimming three.js

The bundled three.js (r128, the page's second `<script>`) is already trimmed. Redo the trim whenever the game starts
using more of it. Every step must keep renders pixel-identical.

1. Record coverage of a broad session on the current build: `node test/cov.js <url> cov_d.json <scenes…>`, then
   again with `MOBILE=1` (`test/cov_extra.js` pokes what the other scenes don't).
2. Cut the page apart: `three.js` is the second `<script>`'s text, and `game_all.js` is every other script plus the
   HTML, joined (the name check below needs everything that could name a method).
3. Run the four steps:
   ```sh
   node three/prune3.js three.js game_all.js three_p1.js cov_d.json cov_m.json   # never-ran methods nothing names
   node three/glsl_if.js three_p1.js three_p2.js   # impossible shader #if blocks
   node three/noconsole.js three_p2.js three_p3.js # developer warnings
   node three/min3.js three_p3.js three_p4.js      # re-minify (top level kept, so var THREE stays global)
   ```
4. Put a build into a page with `python3 three/swap3.py <page.html> <three.js> <out.html>` (it replaces the page's
   second `<script>`). Before swapping the result in:
   - `test/t_shader.js` on a page with the `three_p2` build (warnings still on) must show no shader errors;
   - `test/pxcmp.js` between the old and new pages must show 0 differing pixels.

Why each step is safe:
- **Only exported classes are used.** An unexported `THREE.X` is `undefined` and fails silently, so every class the
  game uses must be exported.
- **A method is removed only if it never ran and its name appears nowhere else** in three.js or the game. three.js
  has no dynamic `obj[name]()` dispatch, so the name check is a proof. Record coverage on the same build you trim.
- **`console.*` calls become `void 0`;** fallback code stays, and shader compile diagnostics are still recorded.
- **Shader `#if` blocks are dropped only when false for every setting** of the macros the game never defines. Each
  unknown macro is evaluated on its own (one value for all of them once wrongly dropped
  `defined(USE_UV) && !defined(UVS_VERTEX_ONLY)` and broke every textured shader). An `#if` spanning several JS
  strings is skipped. What the game uses stays (`USE_EMISSIVEMAP`: ANOMALEE and MONTGUMMERY).
- **Re-minify with `toplevel: false`,** so `var THREE` stays global.

## Finding dead code

1. Record coverage over a broad session (desktop, then `MOBILE=1`), and list what never ran with
   `node test/uncov.js game.js cov_d.json cov_m.json` (cut the game script out of the page first).
2. Treat coverage as a lead, not proof. VR, mobile, error handlers and random events (vignettes, the UFO, battle
   moves) are live even when a headless session never reaches them. Remove only what nothing live can reach:
   entries for creatures that are gone, options no caller passes, unread fields.
3. `node lint/deadprops.js` lists properties nothing reads (ESLint sees only unused local variables). Anything a
   probe reads is a test hook and stays.
4. Prove a removal lossless: the creatures build the same and `test/pxcmp.js` shows 0 differing pixels. Then run the
   quick check and measure with `pack/size.js`.

## Release checklist

- [ ] `tools/index.html` holds the readable page and matches it (`test/copycheck.sh`), made before the root was
      minified or packed.
- [ ] The test modes are cut (`pack/cutmodes.js`), and the flat-screen start screen shows the owner's notice.
- [ ] The round trip is exact with the decoder that ships in the page (`decoder matches model.js: true`, and the
      unpacked page identical to the minified one).
- [ ] The packed page passes `test/ordtest.js`, direct and in the sandboxed iframe, desktop and `MOBILE=1`: start
      screen, canvas, no page errors, no blocked requests.
- [ ] The `LOADING` line paints at once, and the page boots when served as `text/html` with no charset.
- [ ] No `http://`, `https://`, `fetch(`, `XMLHttpRequest`, `localStorage`, `eval(` or `Function(` in the outer page.
- [ ] Under about 400 KB.
- [ ] The full battery ran clean on the readable page, and every shader compiles (`test/t_shader.js`).
