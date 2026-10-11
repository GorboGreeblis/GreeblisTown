# Greeblis Town USA: older test scripts

Playwright scripts from before the main checks in [`tools/test/`](../../test). Setup, the one-browser-at-a-time
rule and the game's globals are in the [tools README](../../README.md). Serve the repo root
(`python3 -m http.server 8765`), then:

```sh
node run.js        http://localhost:8765/index.html out.png scene.js   # desktop 1280x720 (VW, VH, WAIT, NOSHOT)
node run-mobile.js http://localhost:8765/index.html out.png scene.js   # iPhone 13
```

`run.js`, `run-mobile.js`, `ordtest.js`, `boot.js`, `talk.js`, `soak.js` and `pizza.js` are byte-identical copies
of `tools/test/shot2.js`, `mob.js`, `ordtest.js`, `boot.js`, `talk.js`, `soak.js` and `t_pizza.js`, documented
there; `review/envsheet.sh` runs `run.js`. A scene script exports `async (page, outPath) => {}`; its output is
printed and images are written next to `outPath`.

| Scene script | What it checks |
| --- | --- |
| `dance-plant.js` | Menus hold only Talk and Blossom (Zollod's opens the shop); each creature's planting move and dance move it; creatures plant and dance by themselves at the Garden Event |
| `vignettes.js` | Plays every pair's vignette through `JGP.vignette` (no longer exported: use `tools/test/vigrun.js`) |
| `artifacts-quest.js` | The Ancient Artifacts quest as three hidden pickups (`ARTS.SPOTS`, since removed), Sparkakus's speech, the bulb and the dimming, the shop, the Stone |
| `garden-event.js` | The Garden Event without Seeds, with Seeds, and as a repeat (reads the special flower ring, since removed) |
| `planting.js` | A long Event with Seeds, until creatures put plants in |
| `perf.js` | Draw calls, triangles and geometries per part of the scene (superseded by `tools/test/t_perf.js`) |
| `portraits.js` | Renders creatures alone from several angles (`IDS=m_somlet,p_glyph`, `ANGS`, `ELEV`, `DIST`) on open lawn (`SPAWN=x,z`, default `-18,24`; keep it clear of buildings, whose raised floors hide a model's lower part) |
| `topview.js` | A top view of the whole park, for layout checks |
| `church-views.js` | The church from the front, both sides and a corner |
| `church-windows.js` | Straight-on views of the two side windows |
| `church-inside.js` | Head-height views inside the church, to catch z-fighting from a VR head clipping in |
| `somlet-tentacles.js` | Somlet's lowest tentacle vertex over her bob cycle, standing (must stay 2 cm up; `tools/test/t_somlet.js` covers her lying down too) |
