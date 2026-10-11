#!/bin/sh
# Trim the bundled three.js r128: page/03-three-trim.js -> page/03-three.js. Run from the repo root.
# three-coverage.json must have been recorded on 03-three-trim.js (prune3.js checks its sha256).
set -e
G=games/greeblis-woods; T=tools/greeblis-woods/three; W=$G/build/three
mkdir -p $W
node $T/prune3.js $G/page/03-three-trim.js $G/three-coverage.json $G/game.js $W/p1.js   # unreachable methods
node $T/noconsole.js $W/p1.js $W/p2.js                                                  # developer warnings
node $T/glsl_if.js $W/p2.js $W/p3.js                                                    # impossible shader blocks
node $T/min3.js $W/p3.js $G/page/03-three.js
