#!/bin/sh
# The readable copy: tools/Uncompressed/index.html must hold the uncompressed page (the owner's rule). Until the final pass the root
# index.html and the copy are identical byte for byte; after it the root is packed (a working ordinal whose payload
# sits in <script type="b">) and only the copy is readable.
# Env: none.
# Output: one `ok:` line (two when the root is packed), or a STALE or MISSING line and exit 1.
#   sh test/copycheck.sh   (from any folder)
R="$(cd "$(dirname "$0")/../.." && pwd)"
G="$R/index.html"; C="$R/tools/Uncompressed/index.html"
[ -f "$C" ] || { echo "MISSING: tools/Uncompressed/index.html. Copy the readable page there before pushing:  cp index.html tools/Uncompressed/index.html"; exit 1; }
if cmp -s "$G" "$C"; then echo "ok: tools/Uncompressed/index.html is the game, byte for byte ($(wc -c < "$G") bytes)"; exit 0; fi
if grep -q '<script type="b">' "$G"; then
  echo "ok: the root index.html is packed ($(wc -c < "$G") bytes); the readable page is tools/Uncompressed/index.html ($(wc -c < "$C") bytes)."
  echo "    (check the root with test/ordtest.js, desktop and MOBILE=1, and the round trip with pack/unpack.js)"; exit 0
fi
echo "STALE: index.html and tools/Uncompressed/index.html differ and the root is not packed. Copy the page before pushing:  cp index.html tools/Uncompressed/index.html"; exit 1
