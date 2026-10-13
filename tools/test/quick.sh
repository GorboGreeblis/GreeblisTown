#!/bin/bash
# The quick check, for passes between builds (about 4 minutes): the readable copy, lint, both boots, both ordinal
# sandboxes, the shaders and the church. Name the probes for what the change touched after it; each runs on its own
# page at a small viewport (VW, VH change it), so the game runs near full speed headless:
#   tools/test/quick.sh                              the core checks only
#   tools/test/quick.sh t_zollod.js t_sparkakus.js   plus those probes (PART=… narrows a multi-part probe)
#   Z=1 tools/test/quick.sh                          plus the z-fighting scan, for a change to what is drawn
# The full battery (battery.sh) is kept for once in a while: see the README.
# Serve the repo root first (python3 -m http.server 8765, from the repo root), or set URL=file:///…/index.html.
cd "$(dirname "$0")"; U=${URL:-http://localhost:8765/index.html}; G=$(cd ../.. && pwd)/index.html
h() { echo "== $* [${SECONDS} s]"; }
run() { local t=$1; shift; timeout "$t" node "$@" 2>&1 | grep -v "^$" | cut -c1-400; }
h "the readable copy"; sh ./copycheck.sh 2>&1 | tail -1
h "lint"; sh ../lint/lint.sh 2>&1
h "boot, desktop"; NOSHOT=1 run 300 shot.js $U x.png ./boot.js
h "boot, mobile, and the GIVE button"; run 300 mob.js $U x_mob.png ./t_give.js
h "ordinal sandbox, desktop"; run 300 ordtest.js $G x_ord.png
h "ordinal sandbox, mobile"; MOBILE=1 run 300 ordtest.js $G x_ordm.png
h "shaders"; NOSHOT=1 run 300 shot.js $U x.png ./t_shader.js
h "the church's secret room and the Ancient"; NOSHOT=1 run 300 shot.js $U x.png ./t_church.js
for t in "$@"; do h "$t"; VW=${VW:-320} VH=${VH:-240} NOSHOT=1 run 1800 shot.js $U x.png ./"$t"; done
[ -n "$Z" ] && { h "z-fighting"; VW=320 VH=240 NOSHOT=1 run 600 shot.js $U x.png ./t_zfight.js; }
h "DONE"
