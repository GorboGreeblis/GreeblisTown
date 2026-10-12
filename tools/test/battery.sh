#!/bin/bash
# Runs every check, one browser at a time. Serve the repo root first:  python3 -m http.server 8765
# (from the repo root), then:  tools/test/battery.sh > tools/test/battery.log 2>&1
# (the Garden Event with the new flowers is t_plants.js, run on its own: it is slow)
cd "$(dirname "$0")"; U=${URL:-http://localhost:8765/index.html}; G=$(cd ../.. && pwd)/index.html
echo "== boot desktop"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./boot.js 2>&1 | grep -v "^$" | tail -3 | cut -c1-400
echo "== boot mobile + GIVE button"; timeout 300 node mob.js $U x_mob.png ./t_give.js 2>&1 | grep -v "^$" | tail -3 | cut -c1-300
echo "== ordinal sandbox, desktop"; timeout 300 node ordtest.js $G x_ord.png 2>&1 | tail -3
echo "== ordinal sandbox, mobile"; MOBILE=1 timeout 300 node ordtest.js $G x_ordm.png 2>&1 | tail -3
echo "== talk to everyone"; NOSHOT=1 timeout 400 node shot2.js $U x.png ./talk.js 2>&1 | grep -v "^$" | tail -16
echo "== battles, Artifacts, Library"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_blog2.js 2>&1 | grep -v "^$" | tail -16
echo "== Ancient Gem trade"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_gem.js 2>&1 | grep -v "^$" | tail -6
echo "== pizza"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_pizza.js 2>&1 | grep -v "^$" | tail -3
echo "== vignettes"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./vigrun.js 2>&1 | grep -v "^$" | tail -2
echo "== pickups reachable"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_reach2.js 2>&1 | grep -v "^$" | tail -2 | cut -c1-300
echo "== jazz on the floor, respawn, Blossom option"; VW=320 VH=240 NOSHOT=1 timeout 400 node shot2.js $U x.png ./t_misc.js 2>&1 | grep -v "^$" | tail -9
echo "== Fortizmo's patrol"; NOSHOT=1 timeout 400 node shot2.js $U x.png ./t_fz.js 2>&1 | grep -v "^$" | tail -3 | cut -c1-700
echo "== shaders"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_shader.js 2>&1 | grep -v "^$" | tail -3
echo "== walking soak"; NOSHOT=1 timeout 600 node shot2.js $U x.png ./soak.js 2>&1 | grep -v "^$" | tail -3 | cut -c1-400
echo "== King Dino's jazz"; VW=320 VH=240 NOSHOT=1 timeout 600 node shot2.js $U x.png ./t_jazz.js 2>&1 | grep -v "^$" | tail -14 | cut -c1-300
echo "== Somlet asleep on her side"; VW=320 VH=240 NOSHOT=1 timeout 600 node shot2.js $U x.png ./t_somlet.js 2>&1 | grep -v "^$" | tail -4 | cut -c1-300
echo "== roamers (short; ROAM_S/TRAP_S longer for a full check)"; VW=320 VH=240 ROAM_S=40 TRAP_S=40 NOSHOT=1 timeout 1800 node shot2.js $U x.png ./t_roam.js 2>&1 | grep -v "^$" | tail -17 | cut -c1-300
echo "== the church's secret room and the slug"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_church.js 2>&1 | grep -v "^$" | tail -9 | cut -c1-300
echo "== a Dance battle costs a Blossom"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_battlecost.js 2>&1 | grep -v "^$" | tail -4 | cut -c1-300
echo "== the phone lock"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_phone.js 2>&1 | grep -v "^$" | tail -4 | cut -c1-300
echo "== the avatar's walk (test modes)"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_avatar.js 2>&1 | grep -v "^$" | tail -2
echo "== VR head guard"; VW=320 VH=240 NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_headguard.js 2>&1 | grep -v "^$" | tail -10
echo "== Sparkakus browsing"; VW=320 VH=240 NOSHOT=1 timeout 900 node shot2.js $U x.png ./t_library.js 2>&1 | grep -v "^$" | tail -3 | cut -c1-300
echo "== the script (Sparkakus, shelves, posters)"; VW=320 VH=240 NOSHOT=1 timeout 900 node shot2.js $U x.png ./t_script.js 2>&1 | grep -v "^$" | tail -12 | cut -c1-300
echo "== every pair's vignette"; NOSHOT=1 timeout 600 node shot2.js $U x.png ./t_vigall.js 2>&1 | grep -v "^$" | tail -4 | cut -c1-400
echo "== z-fighting (visible clashes; check any with t_zcheck.js)"; VW=320 VH=240 NOSHOT=1 timeout 600 node shot2.js $U x.png ./t_zfight.js 2>&1 | grep -v "^$" | sed -n "1p;\$p"
echo "== DONE"
