#!/bin/bash
# The quick check, run before every push (about 4 minutes): the readable copy, the lint, both boots, both ordinal
# sandboxes, the shaders and the church, then the probes named for what the change touched, each on its own page at a
# small viewport so the game runs near full speed headless. The full battery is battery.sh.
# Env: URL (the page, default http://localhost:8765/index.html; serve the repo root with python3 -m http.server 8765,
#   or use file:///…/index.html); VW, VH (the named probes' viewport, default 320×240); PART (narrows a multi-part
#   probe); Z=1 (adds the z-fighting scan, for a change to what is drawn).
# Output: each section's lines under an `== <section> [<s> s]` header, then a SUMMARY line; exit 1 on any FAIL,
#   PAGEERROR, TIMEOUT, EXIT, STALE or MISSING line or error count above 0. Renders go to test/x*.png.
#   test/quick.sh                              the core checks only
#   test/quick.sh t_zollod.js t_sparkakus.js   plus those probes
#   Z=1 test/quick.sh                          plus the z-fighting scan
cd "$(dirname "$0")" || exit 1
. ./lib.sh
core
h "the church's secret room and the Ancient"; NOSHOT=1 run 300 shot.js "$U" x.png ./t_church.js
for t in "$@"; do h "$t"; VW=${VW:-320} VH=${VH:-240} NOSHOT=1 run 1800 shot.js "$U" x.png ./"$t"; done
[ -n "$Z" ] && { h "z-fighting"; small 600 shot.js "$U" x.png ./t_zfight.js; }
summary
