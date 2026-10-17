#!/bin/bash
# The full battery: the quick check's core, then every regression probe, one browser at a time (two hours and more;
# the visits alone take 30 to 60 minutes headless). Run it before a release build, after a change to a whole system
# (the Event, the visits, the roaming, the battles), every few PRs, or when the owner asks; between builds, quick.sh.
# Env: URL (the page, default http://localhost:8765/index.html; serve the repo root with python3 -m http.server 8765,
#   or use file:///…/index.html).
# REUSE_QUICK=1 reuses an already passing Z=1 quick suite with equivalent inputs for its checks;
# only use after recording that pass. Default runs every check.
# Output: each section's lines (cut at 400 characters) under an `== <section> [<s> s]` header, then a SUMMARY line;
#   exit 1 on any FAIL, PAGEERROR, TIMEOUT, EXIT, STALE or MISSING line or error count above 0. Renders go to
#   test/x*.png (the HUD items to test/x_inv_*.png).
#   test/battery.sh > test/battery.log 2>&1
cd "$(dirname "$0")" || exit 1
. ./lib.sh
[ "${REUSE_QUICK:-0}" = 1 ] || core
h "mobile controls"; MOBILE=1 NOSHOT=1 run 300 shot.js "$U" x.png ./t_controls.js
h "graphics recovery and one-time quest actions"; small 300 shot.js "$U" x.png ./t_stability.js
h "talk to everyone"; NOSHOT=1 run 400 shot.js "$U" x.png ./talk.js
h "the flavor and Event lines"; small 600 shot.js "$U" x.png ./t_flavor.js
h "Dance battles, Artifacts, the Library finale"; NOSHOT=1 run 300 shot.js "$U" x.png ./t_battles.js
h "a Dance battle costs a Blossom"; NOSHOT=1 run 300 shot.js "$U" x.png ./t_battlecost.js
h "the Ancient Gem trade"; NOSHOT=1 run 300 shot.js "$U" x.png ./t_gem.js
h "the phone and the pizza courier"; NOSHOT=1 run 400 shot.js "$U" x.png ./t_pizza.js
h "the Summoning Stone"; NOSHOT=1 run 300 shot.js "$U" x.png ./t_stone.js
h "SPARKAKUS"; small 1800 shot.js "$U" x.png ./t_sparkakus.js
h "ZOLLOD"; NOSHOT=1 run 1200 shot.js "$U" x.png ./t_zollod.js
h "the script"; small 900 shot.js "$U" x.png ./t_script.js
[ "${REUSE_QUICK:-0}" = 1 ] || { h "the church's secret room and the Ancient"; NOSHOT=1 run 300 shot.js "$U" x.png ./t_church.js; }
h "KING DINO's jazz"; small 900 shot.js "$U" x.png ./t_jazz.js
h "FORTIZMO's patrol"; NOSHOT=1 run 400 shot.js "$U" x.png ./t_fortizmo.js
h "pickups reachable"; NOSHOT=1 run 300 shot.js "$U" x.png ./t_reach.js
h "the roamers (short; ROAM_S, TRAP_S longer for a full check)"; ROAM_S=40 TRAP_S=40 small 1800 shot.js "$U" x.png ./t_roam.js
h "walking home: stopping for the player"; small 1800 shot.js "$U" x.png ./t_nearstop.js
h "interrupted visits get home"; small 3000 shot.js "$U" x.png ./t_stuck.js
h "vignettes"; NOSHOT=1 run 600 shot.js "$U" x.png ./t_vigall.js
h "visits"; small 4000 shot.js "$U" x.png ./t_visits.js
h "the Garden Event's planters and the Ancient"; PART=planters VW=200 VH=150 NOSHOT=1 run 1800 shot.js "$U" x.png ./t_event.js
h "the avatar"; small 600 shot.js "$U" x.png ./t_avatar.js
h "the items on the HUD (look at x_inv_*.png)"; NOSHOT=1 run 300 shot.js "$U" x_inv.png ./t_inventory.js
h "the VR head guard"; small 300 shot.js "$U" x.png ./t_headguard.js
h "a walking soak"; NOSHOT=1 run 600 shot.js "$U" x.png ./soak.js
[ "${REUSE_QUICK:-0}" = 1 ] || { h "z-fighting (check any clash with t_zcheck.js)"; small 600 shot.js "$U" x.png ./t_zfight.js; }
summary
