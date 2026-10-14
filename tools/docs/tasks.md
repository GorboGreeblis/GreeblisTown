# Open tasks

The running list of the work that is not finished yet ([rules](rules.md#working-on-it), Working on it 10). A task
comes off this list when it is done; its record is then its PR and the docs. Newest requests are added at the end of
their section.

## In progress

| Task | State | Next step |
| --- | --- | --- |
| Performance pass 5 (VR and the Meta Quest Browser first) | Done so far: GOOWARD's transparent parts merged (28 draws to 3, PR #120); the painting's blank full-size canvas and first upload removed; each kiosk's frame (deck, walls, posts, roof, trim, counter, crates) baked into one mesh per material in `kioskFrame` (the four kiosks: 261 meshes to 129, triangles unchanged, no errors on boot). The frame bake is committed but not yet checked by eye. | Render the four kiosks before and after the frame bake (front, back and inside) and compare: they must look the same (Locks and approvals 7); run `quick.sh` and `t_perf.js` against the baseline. Next targets: the other creatures with many unbatched parts (HENNRICK, GEMTOE, ZOLLOD, ANOMALEE), the Library, the church (19 draws), the phone booth (8). |
| Scenes hold creatures; SPARKAKUS faces the player; Event lines only with Seeds | Code done and committed earlier. The Event-lines probe passed without Seeds; the with-Seeds half and the SPARKAKUS-at-the-Event probe still have to run (the last run timed out headless before the dance). | Re-run both probes on a fresh page with a longer limit. |
| Optimise for the three supported platforms (the Meta Quest Browser in VR, Chrome on a Windows or Linux desktop, Chrome on an Android phone), the Desktop and Mobile test modes included | New. | Measure each platform first (frame time, draw calls, triangles, load time, memory) and report to the owner where each one stands; then optimise each, VR first. |
| Second PR (everything on the branch since PR #120) | The branch holds: the open-tasks rule, the pond move, the extra tree, GOOWARD's two new Talk lines, the Gallery roller and wide brush, the standing performance-approval rule, this list's updates and the kiosk frame bake. | Once the frame bake is checked and the quick check passes, open the PR to main. |

## Waiting on the owner

Nothing at the moment.
