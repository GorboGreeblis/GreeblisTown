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
- NEXTESSA could stop fractionally above her exact delivery radius and never grant Snacks. Arrival now allows
  1 mm of tolerance; the regression reproduces the original stalled distance with the actual delivery update.
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

## Observed results

The v0.2 browser checks have confirmed:

- All three Artifact rewards, repeat-win protection, battle cost, the Library finale, Gem trade, Stone gate and
  one-time Seeds purchase.
- NEXTESSA's reproduced stopping-boundary stall is fixed. Both that boundary and the complete Snacks delivery
  and departure pass with no game errors.
- The 15-second glue pause and single completion, including SPARKAKUS holding position during Talk at home,
  visiting and hosting.
- Ordinary biology Talk and seeded/unseeded Event dialogue, including the no-Give rule during the Event.
- Real WebGL context loss/restoration with simulation paused and no game errors after recovery.
- Eight interrupted visits: every actor reached its requested travel stage and returned home, with no remaining
  visit, busy or battle state. GEMTOE returned to [5, -31] inside her gazebo after an interrupted Blossom meeting.
- All 168 visitor/host route plans and eight complete visit playbacks, including the Cave approach and return.
  GEMTOE retains her gazebo home; SPARKAKUS returns to the Library.
- Desktop shortcut removal, drag rotation, HUD placement and real mobile Shop/Talk touches after menu draw readiness.
- Pickup reachability: 4,000 samples plus the two earlier problem points have no permanent obstruction; all live
  pickups remain reachable. Moving creatures can temporarily cover some sample points.
- Seven-actor roaming and obstruction recovery: every actor finishes on its own ground, including GEMTOE inside
  the gazebo. The earlier short recovery window sampled active return trips.
- Planned return stops and shop holds: ETCHER stops for the nearby player; ZOLLOD holds still for 20 game seconds
  with his shop open and returns after it closes.
- Desktop and Android ordinal sandboxes, shader compilation, church/Cave collision checks and pickup spawn checks.

Fresh shader compilation and both ordinal sandboxes pass. All 10 NPC planters plus SPARKAKUS grow their
flowers; ZOLLOD avoids his kiosk during the Event, the Ancient stays idle and GEMTOE returns inside the gazebo
after Event wrap. MAMA GORBO, GEMTOE, KING DINO and SPARKAKUS menus stay centred just above their heads
after orbiting and walking; SPARKAKUS uses his ears, excluding the mist. Temporary harness failures and
timeouts are recorded separately; passing targeted reruns complete their coverage.
Physical Quest 3S comfort and performance still require headset testing.
