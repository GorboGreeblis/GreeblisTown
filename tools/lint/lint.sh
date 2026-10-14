#!/bin/sh
# Lints the game script: cuts it out of the page with extract.py, runs ESLint 8 with .eslintrc.json and prints each
# finding at its index.html line. Needs ESLint 8 in this folder (`npm run lint` in tools/ installs it and runs this).
# Env: PAGE (the page, default the repo root's index.html; passed to extract.py).
# Output: one `<index.html line>:  <message> [<severity>/<rule>]` line per finding; a clean game prints exactly one,
#   the known `'p' is not modified in this loop` warning.
#   sh lint/lint.sh   (from tools/; any folder works)
cd "$(dirname "$0")" && off=$(python3 extract.py | cut -d' ' -f1) && npx eslint --no-eslintrc -c .eslintrc.json -f unix game.js | awk -F: -v off="$off" 'NF>3 {printf "%d: ", $2+off; for(i=4;i<=NF;i++) printf "%s%s", $i, (i<NF?":":""); print ""}'
