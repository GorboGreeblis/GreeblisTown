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

## Waiting on the owner

Quest 3S confirmation of distant fence/building-edge comfort and frame rate (highest-priority task above).

## Separate pre-release tasks — v1.0

- [ ] Remove fenced Desktop/Mobile test modes; mark final build v1.0; lock all creature/environment designs.
- [ ] Remove unused application code.
- [ ] Remove comments and labels, retaining executable necessities.
- [ ] Compress final root file; retain tools/Uncompressed/ readable and validate final standalone ordinal on both platforms.
