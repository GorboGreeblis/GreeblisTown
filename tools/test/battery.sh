#!/bin/bash
# Runs every check, one browser at a time. Serve the repo root first:  python3 -m http.server 8765
# (from the repo root), then:  tools/test/battery.sh > battery.log 2>&1
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
echo "== drums, respawn, Blossom option"; VW=320 VH=240 NOSHOT=1 timeout 400 node shot2.js $U x.png ./t_misc.js 2>&1 | grep -v "^$" | tail -9
echo "== Fortizmo's patrol"; NOSHOT=1 timeout 400 node shot2.js $U x.png ./t_fz.js 2>&1 | grep -v "^$" | tail -3 | cut -c1-700
echo "== shaders"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_shader.js 2>&1 | grep -v "^$" | tail -3
echo "== walking soak"; NOSHOT=1 timeout 600 node shot2.js $U x.png ./soak.js 2>&1 | grep -v "^$" | tail -3 | cut -c1-400
echo "== DONE"
