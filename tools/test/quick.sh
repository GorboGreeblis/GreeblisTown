#!/bin/bash
# The quick check, for passes between builds (about 5 to 10 minutes): the readable copy, lint, both boots, the
# ordinal sandbox on desktop and mobile, the shaders and the church. Name the probes for what the change touched
# after it, each run on its own page (small viewport, so the game runs near full speed headless):
#   tools/test/quick.sh                          the core checks only
#   tools/test/quick.sh t_church.js t_misc.js    plus those probes
#   Z=1 tools/test/quick.sh                      plus the z-fighting scan (for a change to what is drawn)
# The full battery (battery.sh, two hours and more) is kept for once in a while: see the README.
# Serve the repo root first (python3 -m http.server 8765), or set URL=file:///…/index.html.
cd "$(dirname "$0")"; U=${URL:-http://localhost:8765/index.html}; G=$(cd ../.. && pwd)/index.html
h() { echo "== $* [${SECONDS} s]"; }
h "the readable copy"; sh ./copycheck.sh 2>&1 | tail -1
h "lint"; sh ../town/lint/lint.sh 2>&1 | tail -3
h "boot desktop"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./boot.js 2>&1 | grep -v "^$" | tail -3 | cut -c1-300
h "boot mobile + GIVE button"; timeout 300 node mob.js $U x_mob.png ./t_give.js 2>&1 | grep -v "^$" | tail -3 | cut -c1-300
h "ordinal sandbox, desktop"; timeout 300 node ordtest.js $G x_ord.png 2>&1 | tail -3
h "ordinal sandbox, mobile"; MOBILE=1 timeout 300 node ordtest.js $G x_ordm.png 2>&1 | tail -3
h "shaders"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_shader.js 2>&1 | grep -v "^$" | tail -3
h "the church's secret room and the Ancient"; NOSHOT=1 timeout 300 node shot2.js $U x.png ./t_church.js 2>&1 | grep -v "^$" | tail -9 | cut -c1-300
for t in "$@"; do h "$t"; VW=320 VH=240 NOSHOT=1 timeout 900 node shot2.js $U x.png ./"$t" 2>&1 | grep -v "^$" | tail -12 | cut -c1-300; done
[ -n "$Z" ] && { h "z-fighting"; VW=320 VH=240 NOSHOT=1 timeout 600 node shot2.js $U x.png ./t_zfight.js 2>&1 | grep -v "^$" | sed -n "1p;\$p"; }
h "DONE"
