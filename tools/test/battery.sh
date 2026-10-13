#!/bin/bash
# The full battery: every regression probe, one browser at a time (two hours and more; the visits alone take 30 to
# 60 minutes headless). Run it once in a while: before a release build, after a change to a whole system (the
# Event, the visits, the roaming, the battles), every few PRs, or when the owner asks. Between builds, run quick.sh.
#   tools/test/battery.sh > tools/test/battery.log 2>&1
# Serve the repo root first (python3 -m http.server 8765, from the repo root), or set URL=file:///…/index.html.
# Every probe's lines are printed in full; each section header carries the seconds elapsed. A clean run has no
# FAIL and every error count at 0.
cd "$(dirname "$0")"; U=${URL:-http://localhost:8765/index.html}; G=$(cd ../.. && pwd)/index.html
h() { echo "== $* [${SECONDS} s]"; }
run() { local t=$1; shift; timeout "$t" node "$@" 2>&1 | grep -v "^$" | cut -c1-400; }
small() { VW=320 VH=240 NOSHOT=1 run "$@"; }
h "the readable copy"; sh ./copycheck.sh 2>&1 | tail -1
h "lint"; sh ../lint/lint.sh 2>&1
h "boot, desktop"; NOSHOT=1 run 300 shot.js $U x.png ./boot.js
h "boot, mobile, and the GIVE button"; run 300 mob.js $U x_mob.png ./t_give.js
h "ordinal sandbox, desktop"; run 300 ordtest.js $G x_ord.png
h "ordinal sandbox, mobile"; MOBILE=1 run 300 ordtest.js $G x_ordm.png
h "shaders"; NOSHOT=1 run 300 shot.js $U x.png ./t_shader.js
h "talk to everyone"; NOSHOT=1 run 400 shot.js $U x.png ./talk.js
h "the flavor and Event lines"; small 600 shot.js $U x.png ./t_flavor.js
h "Dance battles, Artifacts, the Library finale"; NOSHOT=1 run 300 shot.js $U x.png ./t_battles.js
h "a Dance battle costs a Blossom"; NOSHOT=1 run 300 shot.js $U x.png ./t_battlecost.js
h "the Ancient Gem trade"; NOSHOT=1 run 300 shot.js $U x.png ./t_gem.js
h "the phone and the pizza courier"; NOSHOT=1 run 400 shot.js $U x.png ./t_pizza.js
h "the Summoning Stone"; NOSHOT=1 run 300 shot.js $U x.png ./t_stone.js
h "SPARKAKUS"; small 1800 shot.js $U x.png ./t_sparkakus.js
h "ZOLLOD"; small 900 shot.js $U x.png ./t_zollod.js
h "the script"; small 900 shot.js $U x.png ./t_script.js
h "the church's secret room and the Ancient"; NOSHOT=1 run 300 shot.js $U x.png ./t_church.js
h "KING DINO's jazz"; small 900 shot.js $U x.png ./t_jazz.js
h "FORTIZMO's patrol"; NOSHOT=1 run 400 shot.js $U x.png ./t_fortizmo.js
h "pickups reachable"; NOSHOT=1 run 300 shot.js $U x.png ./t_reach.js
h "the roamers (short; ROAM_S, TRAP_S longer for a full check)"; ROAM_S=40 TRAP_S=40 small 1800 shot.js $U x.png ./t_roam.js
h "walking home: stopping for the player"; small 900 shot.js $U x.png ./t_nearstop.js
h "vignettes"; NOSHOT=1 run 600 shot.js $U x.png ./t_vigall.js
h "visits"; small 4000 shot.js $U x.png ./t_visits.js
h "the avatar"; small 600 shot.js $U x.png ./t_avatar.js
h "the VR head guard"; small 300 shot.js $U x.png ./t_headguard.js
h "a walking soak"; NOSHOT=1 run 600 shot.js $U x.png ./soak.js
h "z-fighting (check any clash with t_zcheck.js)"; small 600 shot.js $U x.png ./t_zfight.js
h "DONE"
