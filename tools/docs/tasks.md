# Open tasks

The running list of the work that is not finished yet ([rules](rules.md#working-on-it), Working on it 10). A task
comes off this list when it is done; its record is then its PR and the docs. Newest requests are added at the end of
their section.

## In progress

| Task | State | Next step |
| --- | --- | --- |
| Performance pass 5 (VR and the Meta Quest Browser first) | Done so far (PR #120): GOOWARD's transparent parts merged (28 draws to 3); the painting's blank full-size canvas and first upload removed. | Re-run `t_perf.js` against the baseline; next targets: the other creatures with many unbatched parts (HENNRICK, GEMTOE, ZOLLOD, ANOMALEE), the church (19 draws), the phone booth (8). |
| Scenes hold creatures; SPARKAKUS faces the player; Event lines only with Seeds | Code done and committed earlier. The Event-lines probe passed without Seeds; the with-Seeds half and the SPARKAKUS-at-the-Event probe still have to run (the last run timed out headless before the dance). | Re-run both probes on a fresh page with a longer limit. |
| Optimise for the three supported platforms (the Meta Quest Browser in VR, Chrome on a Windows or Linux desktop, Chrome on an Android phone), the Desktop and Mobile test modes included | New. | Measure each platform first (frame time, draw calls, triangles, load time, memory) and report to the owner where each one stands; then optimise each, VR first. |

## Waiting on the owner

Nothing at the moment.
