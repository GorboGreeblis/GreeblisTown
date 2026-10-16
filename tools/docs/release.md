# Releasing Greeblis Town

This file specifies how the readable game becomes the packed ordinal: the requirements on the packed page, the
final pass, the packed page's structure, the codec, trimming three.js, finding dead code, opening packed pages
safely, and the release checklist. All commands run from `tools/`.

Contents: [Requirements](#requirements) · [The final pass](#the-final-pass) · [The packed page](#the-packed-page) ·
[The codec](#the-codec) · [Trimming three.js](#trimming-threejs) · [Finding dead code](#finding-dead-code) ·
[Opening packed and uploaded pages](#opening-packed-and-uploaded-pages) · [Release checklist](#release-checklist)

## Requirements

This section gives the technical detail behind the binding ordinal rules in [rules.md](rules.md#the-game) (rule 2:
one self-contained page, ord's CSP, under about 400 KB packed; rules 5 to 7: no content cut, the smallest file
wins, labels and comments stripped).

- **Content-Security-Policy:** ord serves content with `default-src 'self' 'unsafe-eval' 'unsafe-inline' data:
  blob:`. The game never uses `eval` regardless.
- **Two contexts:** the page must boot opened directly (`/content/<id>`) and inside the explorers' sandboxed
  `allow-scripts` iframe (`/preview/<id>`, origin `null`, where storage throws).
- **VR entry:** on a Quest the player enters VR from `/content/<id>`; the explorers' iframe blocks it.
- **Encoding:** the outer page declares `<meta charset="UTF-8">`, so it decodes correctly when served as
  `text/html` with no charset. Everything outside the payload is ASCII; the payload's escape characters lie in
  U+0080 to U+01FF (see [The packed page](#the-packed-page)).

## The final pass

This section is the release procedure, from the readable page to the packed `index.html`.

1. **Keep the readable copy.** Copy the readable page to `tools/Uncompressed/index.html` (`cp ../index.html Uncompressed/index.html`;
   `test/copycheck.sh` confirms). That copy is never minified or packed; once the root is packed, it is the only
   readable page and every later change starts from it.
2. **Start clean.** The game starts with no quest or item progress; the tests grant themselves what they need.
3. **Cut the Desktop and Mobile test modes** ([rules.md](rules.md#the-game), rule 10):
   `node pack/cutmodes.js ../index.html cut.html`. Every line from a `TEST-MODE-BEGIN` marker through the next
   `TEST-MODE-END` is removed, markers included, and every commented-out line between `FINAL-BUILD-BEGIN` and
   `FINAL-BUILD-END` is uncommented. The tool fails on a fence or block left open, a nested one, or an END with no
   BEGIN. The remaining code runs unchanged:
   - the `const dk = { on: !1 }` stub stays outside the fences, so the shared code's `dk.on` checks read false;
   - `window.__jgpMobile` is never set, so every check on it takes the headset's settings;
   - in the Meta Quest Browser the start screen shows the game's name and "Press A to enter VR"; on desktop and
     phone browsers (the final-build block) it shows the game's name and "Greeblis Town is a VR game. Open it in
     the Meta Quest Browser."

   All later steps work on `cut.html`.
4. **Cut the game script out** (the last `<script>` in `cut.html`) to `game.js`.
5. **Remove unused code as a separate task.** Inspect the release candidate, remove application code it never uses,
   and validate the result. Do not treat a minifier’s later dead-code pass as completion of this task.
6. **Strip every label and comment** from `game.js`: every comment and section banner, every object name, and every
   test-only label or hook (the `window.__jgp…` and `__gb…` hooks, the test modes' text) the game does not need to
   run. Retain text and identifiers needed for gameplay. Apply the cleaned source to the readable copy as well.
7. **Freeze the uncompressed release source.** Set the final version to **v1.0**. Reinsert the cleaned, unminified
   `game.js` into `cut.html`, then apply that page to both root `index.html` and `tools/Uncompressed/index.html`.
   Both must include mode removal, unused-code removal and comment/label removal. Verify their bytes match before
   compression. The original development source remains in Git history. Lock creature and environment designs at
   release; later design changes require an explicit owner request.
8. **Minify:** `node pack/min.js game.js game.min.js` (terser 5.31.0: ECMAScript 2020, top-level mangling, two
   compress passes, no parentheses wrapped round function arguments; `pack/size.js` uses the same settings). Release checks must use an external harness compatible with removed test modes/hooks; do not reintroduce development code into the artifact.
9. **Reassemble:** put `game.min.js` back in place of the game script, giving `page.html`, and boot-test it with
   `test/ordtest.js`, desktop and `MOBILE=1`.
10. **Pack:** `node pack/pack.js page.html ../index.html "Greeblis Town"` (the root page; `tools/Uncompressed/index.html` stays the
   readable copy). Check the round trip with `node pack/unpack.js ../index.html check.html`: it must report
   `decoder matches model.js: true`, and `check.html` must be identical to `page.html`.
11. **Test the packed page** with `test/ordtest.js`, desktop and `MOBILE=1`, and complete the
   [release checklist](#release-checklist).

| Pack tool | Behaviour |
| --- | --- |
| `pack/cutmodes.js <in.html> <out.html>` | Removes the test-mode fences and applies the final-build blocks (step 3); prints what it cut and applied. |
| `pack/min.js <in.js> <out.js>` | Minifies the game script with the release settings (exported as `OPTIONS` for `size.js`); prints the size before and after. |
| `pack/pack.js <page.html> <out.html> "<title>"` | Packs a page into the ordinal; the round trip is checked on every pack. |
| `pack/unpack.js <packed.html> <out.html>` | Unpacks with the page's own decoder and reports whether it is `model.js`. The decoder runs unsandboxed in Node: only for pages this repo packed; an uploaded page is opened only with `sandbox/decode.js`. |
| `pack/model.js` | The decoder every packed page carries, embedded verbatim (4,353 bytes); text read by `pack.js` and `unpack.js`, not a runnable script. |
| `pack/cmz.js` | The codec as readable source (see [The codec](#the-codec)). |
| `pack/size.js [index.html] [outdir]` | The page's weight at each step, without touching the repo: readable; with every script minified (the game script with `pack/min.js`'s settings, the helper scripts without top-level mangling, three.js as is); packed (round trip checked). Writes `page.html` and `index.html` to `<outdir>` (default: a temporary folder) for boot tests. It does not perform the separate source-cleanup and release-freeze tasks (steps 5–7). Also `npm run size`. |

Reference measurement (`pack/size.js`, 14 Oct 2026): readable 1,407,196 B (game script 1,116,159 B), minified
908,518 B (game script 617,982 B), packed 241,224 B.

Three.js must never be minified with top-level mangling: `var THREE` must stay global. Property mangling must stay
off: a name that also appears in a string or in GLSL breaks when mangled as a property.

## The packed page

This section specifies the structure of the page `pack/pack.js` writes.

- **Outer page:** doctype, charset, viewport, the title (the third argument of `pack.js`, so the tab shows it while
  unpacking), a dark background (`#0d0d1a`), and one `LOADING` line that paints before decoding starts (within
  about 50 ms).
- **Payload:** in `<script type="b">` (a type the browser never runs), packed 7 bits to a character. The values 0,
  13 and 60 (NUL, CR, `<`) would break inline script text, so each is folded with the next value into one
  character in the range 128 to 511; the escaping costs no extra characters. The payload never contains
  `</script`.
- **Loader:** finds the payload by its type (`script[type="b"]`, never `document.scripts[0]`), unpacks the 7-bit
  text, runs the decoder (updating `LOADING nn%` every 16 KB of output), then calls `document.open()`,
  `document.write(page)` and `document.close()`.
- **Recovering the readable page** from a packed one requires hooking `document.write`, and is done only in the
  sandboxed browser (`sandbox/decode.js`, see [below](#opening-packed-and-uploaded-pages)).

## The codec

This section specifies the context-mixing compressor; only its decoder ships, inside every packed page.

| Component | Specification |
| --- | --- |
| Generator | One generator, `cmz(data, len, enc)`, shared by encoder and decoder so the two cannot drift; it yields progress every 16 KB. |
| Contexts | 12 hashed contexts: orders 0 to 4; two longer orders (5 to 6 bytes, and up to 8); the current word's hash with the previous word; two sparse byte pairs; an order-4 and order-5 mix; the word with the previous byte. Each has two adaptive probabilities and a run model, in a 2^23-bucket table (64 MB of `Uint16`). |
| Match model | 4-byte minimum match; predicts the next bit from the longest earlier match. |
| Mixing | Three neural mixers (selected by the partial byte, by the previous byte and bit position, and by the match state) feed a final mixer, followed by two interpolated APM/SSE stages. |
| Coder | 32-bit binary arithmetic coder. |
| Cost | Decoder about 4.3 KB. Encoding takes 5 to 7 s on a desktop; decoding about 5 s in Node and 15 s in headless SwiftShader. |

`pack/pack.js` builds its encoder from `pack/model.js`: it runs the decoder's model with the known input bits and
swaps the arithmetic decoder's lines for the matching encoder's, so the shipped decoder unpacks the result bit for
bit. `pack/cmz.js` is the same codec as readable source; its encoder output is byte-identical to `pack.js`'s. To
change the model, change `cmz.js`, rebuild `model.js` and `pack.js`'s encoder from it together, then check the
round trip.

Rejected options (measured, not worth adopting): a larger model (no gain); terser's `unsafe` options (about
100 bytes, with semantic risk); squeezing whitespace in shader strings (4 bytes); reading the page back with
`fetch` for an 8-bit payload (unreliable in ordinals); Roadroller (larger at its fast setting, far slower to
unpack).

## Trimming three.js

This section is the procedure for re-trimming the bundled three.js (r128, the page's second `<script>`), which is
already trimmed. Redo the trim whenever the game starts using more of three.js. Every step must keep renders
pixel-identical.

1. Record coverage of a broad session on the current build: `node test/cov.js <url> cov_d.json <scenes…>`, then
   again with `MOBILE=1` to `cov_m.json` (`test/cov_extra.js` reaches what the other scenes do not).
2. Cut the page apart in `tools/`: `three.js` is the second `<script>` block's text, exactly as the coverage recorded
   it; `game_all.js` is every other script plus the HTML, joined (the name check needs everything that could name a
   method). Both names are ignored by git.
3. Run the four steps:
   ```sh
   node three/prune3.js three.js game_all.js three_p1.js cov_d.json cov_m.json   # never-ran methods nothing names
   node three/glsl_if.js three_p1.js three_p2.js   # impossible shader #if blocks
   node three/noconsole.js three_p2.js three_p3.js # developer warnings
   node three/min3.js three_p3.js three_p4.js      # re-minify (top level kept, so var THREE stays global)
   ```
4. Put a build into a page with `python3 three/swap3.py <page.html> <three.js> <out.html>` (it replaces the page's
   second `<script>` block's text and asserts the block holds three.js). Before swapping the result in:
   - `test/t_shader.js` on a page with the `three_p2` build (warnings still on) must show no shader errors;
   - `test/pxcmp.js` between the old and new pages must show 0 differing pixels.

| Tool | Behaviour |
| --- | --- |
| `three/prune3.js <three.js> <game_all.js> <out.js> <cov.json…>` | Removes class methods that never ran in any recorded session and that nothing names, in rounds. |
| `three/glsl_if.js <in.js> <out.js>` | Drops GLSL `#if` blocks whose condition cannot hold for the game's materials and renderer settings; lists the literals it skipped. |
| `three/noconsole.js <in.js> <out.js>` | Replaces `console.*` calls with `void 0`; lists calls with nested calls in their arguments. |
| `three/min3.js <in.js> <out.js>` | Re-minifies with terser (3 compress passes, `toplevel: false`); fails if the output no longer starts with `var THREE=`. |
| `three/swap3.py <page.html> <three.js> <out.html>` | Puts a three.js build into the page's second `<script>`. |

Safety conditions for each step:
- **Only exported classes are used.** An unexported `THREE.X` is `undefined` and fails silently, so every class the
  game uses must be exported.
- **A method is removed only if it never ran and its name appears nowhere else** in three.js or the game. three.js
  has no dynamic `obj[name]()` dispatch, so the name check is a proof. Coverage must be recorded on the same build
  that is trimmed.
- **`console.*` calls become `void 0`;** fallback code stays, and shader compile diagnostics are still recorded.
- **Shader `#if` blocks are dropped only when false for every setting** of the macros the game never defines. Each
  unknown macro is evaluated on its own: a single shared value for all of them wrongly drops
  `defined(USE_UV) && !defined(UVS_VERTEX_ONLY)` and breaks every textured shader. An `#if` spanning several JS
  strings is skipped. Macros the game uses stay (`USE_EMISSIVEMAP`: ANOMALEE and MONTGUMMERY).
- **Re-minify with `toplevel: false`,** so `var THREE` stays global.

## Finding dead code

This section is the procedure for removing code the game no longer reaches.

1. Record coverage over a broad session (desktop, then `MOBILE=1`; see [Trimming three.js](#trimming-threejs)) and
   list what never ran with `node test/uncov.js ../index.html cov_d.json cov_m.json > uncov.txt`; `uncov.js` cuts the
   game script out of the page the coverage was recorded on and reports `index.html` lines.
2. Treat coverage as a lead, not proof. VR, mobile, error handlers and random events (vignettes, the UFO, battle
   moves) are live even when a headless session never reaches them. Remove only what nothing live can reach:
   entries for creatures that are gone, options no caller passes, unread fields.
3. `node lint/deadprops.js` lists properties nothing reads (see [testing.md](testing.md#lint)). During development, anything a probe or
   an audit reads stays available. Remove test-only hooks in the separate release cleanup in step 6 above.
4. Prove a removal lossless: the creatures build the same (`NOSHOT=1 node test/shot.js <url> snap_before.json
   audit/snap.js` before and `snap_after.json` after, compared with
   `python3 audit/snapdiff.py snap_before.json snap_after.json`) and `test/pxcmp.js` shows 0 differing pixels. Then
   run the quick check and measure with `pack/size.js`.

## Opening packed and uploaded pages

This section specifies the sandbox in `tools/sandbox/`. Uploaded files are untrusted and must be decoded or run only
with these tools, never in Node or a normal page ([rules.md](rules.md#working-on-it), rule 5).

| Tool | Behaviour | Settings |
| --- | --- | --- |
| `node sandbox/decode.js <packed.html> <decoded.html>` | Decodes a packed page in the browser with every network request blocked and nothing rendered, saving the page its loader would `document.write()` (30 s timeout). | None. |
| `node sandbox/run.js <decoded.html> <expr.js> [shot.png]` | Runs a decoded page served from memory with every network request blocked (SwiftShader WebGL, 1280×720 px), evaluates the expression in `<expr.js>` and prints the result and the first 10 page errors, with an optional screenshot. | `WAIT` (ms, default 8000); `CLICK=1` (clicks in and walks first); `MOD=<scene.js>` (runs a scene script with `(page, shot.png)` instead; `<expr.js>` is then not read); `HARNESS=1` (sets `window.__gbHarness`). |

## Release checklist

This section lists the conditions a release must meet before it ships.

- [ ] `tools/Uncompressed/index.html` holds the readable page, made before the root was minified or packed
      (`test/copycheck.sh`).
- [ ] The test modes are cut (`pack/cutmodes.js`): a desktop browser shows the game's name and the VR notice; the
      Quest shows the game's name and "Press A to enter VR".
- [ ] The round trip is exact with the decoder that ships in the page (`decoder matches model.js: true`, and the
      unpacked page identical to the minified one).
- [ ] The packed page passes `test/ordtest.js` (inside the sandboxed iframe), desktop and `MOBILE=1`: start
      screen, canvas, no page errors, no blocked requests. It also boots opened directly (`/content/<id>`).
- [ ] The `LOADING` line paints at once, and the page boots when served as `text/html` with no charset.
- [ ] No `http://`, `https://`, `fetch(`, `XMLHttpRequest`, `localStorage`, `eval(` or `Function(` in the outer page.
- [ ] Under about 400 KB.
- [ ] The full battery ran clean on the readable page, and every shader compiles (`test/t_shader.js`).
