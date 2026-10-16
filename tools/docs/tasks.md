# Open tasks

The running list of the work that is not finished yet ([rules](rules.md#working-on-it), Working on it 10). A task
comes off this list when it is done; its record is then its PR and the docs. Newest requests are added at the end of
their section.

## In progress

| Task | State | Next step |
| --- | --- | --- |
| Highest priority: VR comfort, distant fence and building-edge flicker | Distance-filtered fence coverage and front-only closed town boxes implemented; automated checks complete. Headset confirmation remains open. | On a Quest 3S, check distant fence and roof edges under slow head turns, native/adaptive quality and the Garden Event; confirm comfort and frame rate. |
| Performance pass 5 (VR and the Meta Quest Browser first) | Done so far: GOOWARD's transparent parts merged (28 draws to 3, PR #120); the painting's blank full-size canvas and first upload removed; each kiosk's frame (deck, walls, posts, roof, trim, counter, crates) baked into one mesh per material in `kioskFrame` (the four kiosks: 261 meshes to 129, triangles unchanged; `pxcmp.js` 0 differing pixels in all ten views, the close-ups alike; VR views 1 to 5 draws fewer). | Next targets: the other creatures with many unbatched parts (HENNRICK, GEMTOE, ZOLLOD, ANOMALEE), the Library, the church (19 draws), the phone booth (8). |
| Optimise for the three supported platforms (the Meta Quest Browser in VR, Chrome on a Windows or Linux desktop, Chrome on an Android phone), the Desktop and Mobile test modes included | New. | Measure each platform first (frame time, draw calls, triangles, load time, memory) and report to the owner where each one stands; then optimise each, VR first. |
| Benchmark the first build of the game and the latest build; keep a benchmarks file across builds | `test/bench.js` written (read from outside the game, so any build measures the same way); `docs/benchmarks.md` holds the results. | Run it on the first build (commit c2ae8e4) and the latest, on desktop and phone; fill in the table; add a row for every PR from now on. |

## Waiting on the owner

Quest 3S confirmation of distant fence/building-edge comfort and frame rate (highest-priority task above).

## Current request batch — v0.2

Every note is a task. Implemented visual, lore and control changes are described in the Bible and construction,
creature and audit documents. Remaining work:

- [ ] Finish targeted recovery after the full regression battery: permanent pickup
  reachability, roaming recovery, the remaining shop-hold checks, current shader/ordinal checks and the corrected
  SPARKAKUS planting-spot probe. The full battery completed; its mobile harness race is corrected and rechecked; the travel timeout is
  being recovered individually. A reproduced NEXTESSA delivery-boundary bug is fixed and both delivery tests pass.
- [ ] Complete original/current desktop and Android benchmarks and record them in the benchmarks file.
- [ ] Final documentation and source-copy consistency checks, then publish the v0.2 branch.

## Separate pre-release tasks — v1.0

- [ ] Remove fenced Desktop/Mobile test modes; mark final build v1.0; lock all creature/environment designs.
- [ ] Remove unused application code.
- [ ] Remove comments and labels, retaining executable necessities.
- [ ] Compress final root file; retain tools/Uncompressed/ readable and validate final standalone ordinal on both platforms.
