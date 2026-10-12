#!/bin/bash
# The readable copy of the game: tools/index.html must hold the uncompressed page (the owner's rule, for this and
# every future game). Until the final size pass the root index.html and the copy are byte for byte the same; after
# it the root is minified and packed (still a working ordinal) and only the copy stays readable.
#   tools/test/copycheck.sh            (from anywhere; exit 1 when the copy is missing or stale)
R="$(cd "$(dirname "$0")/../.." && pwd)"
G="$R/index.html"; C="$R/tools/index.html"
[ -f "$C" ] || { echo "MISSING: tools/index.html. Copy the readable page there before pushing:  cp index.html tools/index.html"; exit 1; }
if cmp -s "$G" "$C"; then echo "ok: tools/index.html is the game, byte for byte ($(wc -c < "$G") bytes)"; exit 0; fi
# (a packed root carries the loader's readout and the 7-bit payload instead of the game script)
if grep -q "LOADING" "$G" && ! grep -q "const SCRIPT = {" "$G"; then
  echo "ok: the root index.html is packed ($(wc -c < "$G") bytes); the readable page is tools/index.html ($(wc -c < "$C") bytes)."
  echo "    (check the root with test/ordtest.js, desktop and MOBILE=1, and the round trip with pack/park/woods-unpack.js)"; exit 0
fi
echo "STALE: index.html and tools/index.html differ and the root is not packed. Copy the page before pushing:  cp index.html tools/index.html"; exit 1
