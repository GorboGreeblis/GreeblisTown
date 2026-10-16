# v0.2 progression and stability audit

## Scope

The current development build was inspected after the three merged changes. Checks cover the Artifact battles
and Library finale, Gem-to-Stone trade, Seeds purchase, phone gate and pizza delivery, shyness book, Garden Event
gating, dialogue, creature travel and graphics recovery. Desktop and Android browser probes use synthetic state;
physical Quest 3S tracking, comfort, GPU performance and Android touch hardware require device confirmation.

## Confirmed issues repaired

- A paused XR session stopped submitting views. The Universal Menu now pauses simulation and input while tracked
  rendering continues; the frame clock discards the paused interval. Deterministic frame-loop regression verifies
  rendering continues without world updates.
- Desktop/mobile context loss could advance the world while no view was available. The frame loop now pauses on
  context loss and resets its clock on restoration. A real browser context-loss/restoration probe verifies both.
- X could give a Blossom directly. X now follows the same pointing/selection path as A; gifts require the menu.
- Freed ZOLLOD's additional Talk was inaccessible through mobile's Talk button. The button now exposes Shop/Talk
  choices and preserves the rule that tapping a creature does not interact.
- GEMTOE retained a roaming-creature pickup exemption after gaining a fixed home. Her home now excludes pickup spawns, as other posted creatures do.
- The wrist HUD used a two-sided material behind its visibility check. It now culls its back in the renderer too, including while simulation/UI updates pause for the Universal Menu.
- The Pillar's blocked-interaction title used the item's name. It now reads SUMMONING PILLAR.
- SPARKAKUS's mist inflated interaction placement. Ear height now determines the model's interaction height.

## Progression invariants

- Each Dancer awards one Artifact; repeat wins do not duplicate it. A battle requires a Blossom.
- The Library finale holds its actor through the silent glue animation and guards duplicate starts. Completion
  happens once after 15 seconds; the Gem is given after the following speech.
- GEMTOE consumes the Gem and grants the Stone once. Repeated Talk does not repeat the trade.
- Seeds purchase charges once and records ownership before subsequent purchase attempts.
- The phone remains gated by the Sheriff's Blossom; Event start remains gated by the Stone.
- Only the first seeded Event grows persistent flowers. Ordinary biology lines do not replace seeded Event lines.
- GEMTOE's gazebo route uses the open entrance for departures and returns. Trade behavior is independent of home.

These invariants are the audit's selected checks. The validation record distinguishes completed probes from
outstanding runs; this document does not substitute for observed test results.
