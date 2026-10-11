# Greeblis Town USA: test scripts

Playwright scripts used to check Greeblis Town USA (the JurassicGreeblisPark repo's `index.html`). They read the
game's minified globals (`It`, `Re`, `bt`, `xe`, `z`, `At`, `O`, `C`, `B`, `JGP`, …), so a rename in the game
can break them; check the names first.

Playwright is expected at `/opt/node22/lib/node_modules/playwright` (the Claude Code cloud default) or under
`npm root -g`. Edit the `require` path elsewhere.

**Run one browser at a time.** Two headless browsers at once time out. Never `pkill -f` a pattern that matches your
own shell command. Headless game time runs very slowly, so scripts wait on `Re.t` (game time), not wall time.

## Runners

Serve the game folder (for example `python3 -m http.server 8765`), then:

```sh
node run.js        http://localhost:8765/index.html out.png scene.js   # desktop 1280x720 (VW, VH, WAIT, NOSHOT)
node run-mobile.js http://localhost:8765/index.html out.png scene.js   # iPhone 13 profile
node ordtest.js    index.html out.png                                  # ordinal: sandboxed iframe + ord's CSP
MOBILE=1 node ordtest.js index.html out.png                            # the same on an Android phone profile
```

`ordtest.js` serves the file from memory inside `<iframe sandbox="allow-scripts">` with ord's
Content-Security-Policy and blocks and lists every other request. A pass shows all creatures, 0 errors and
`blocked: []`.

Each scene script exports `async (page, outPath) => {}` and is run by `run.js` or `run-mobile.js` after the page
loads. Output is printed; images are written next to `outPath`.

## Scene scripts

| Script | What it checks |
| --- | --- |
| `boot.js` | Boots, counts creatures by kind, lists names and errors |
| `talk.js` | Opens talk on every creature and measures how much each moves |
| `dance-plant.js` | Menus hold only Talk and Blossom (Zollod's opens the shop); each creature's planting move and dance move it; creatures plant and dance by themselves at the Garden Event |
| `vignettes.js` | Plays every creature pair's vignette and counts errors and leaks |
| `artifacts-quest.js` | Ancient Artifacts: three pickups, Sparkakus's speech, the light bulb and the dimming, then the display |
| `garden-event.js` | The Garden Event without Seeds, with Seeds, and as a repeat (plants kept, nothing regrows) |
| `planting.js` | A long Event with Seeds, until creatures put plants in |
| `pizza.js` | Calls Nextessa from the phone booth and checks she comes through the portal |
| `soak.js` | A long walk: errors, memory, draw calls and triangles over time |
| `perf.js` | Draw calls, triangles and geometries per part of the scene |
| `portraits.js` | Renders creatures alone from several angles (`IDS=m_somlet,p_glyph`, `ANGS`, `ELEV`, `DIST`) on open lawn (`SPAWN=x,z`, default `-18,24`; keep it clear of buildings, whose raised floors hide a model's lower part) |
| `topview.js` | A top view of the whole park, for layout checks |
| `church-views.js` | The church from the front, both sides and a corner |
| `church-windows.js` | Straight-on views of the two side windows |
| `church-inside.js` | Head-height views inside the church, to catch z-fighting from a VR head clipping in |
| `somlet-tentacles.js` | Somlet's lowest tentacle vertex over her bob cycle (must stay 2 cm up) |
