#!/bin/sh
# Lints the game script: cuts it out of index.html with extract.py, runs ESLint 8 with .eslintrc.json, drops the
# no-use-before-define findings and prints each finding at its index.html line. Needs ESLint 8 in this folder;
# `npm run lint` in tools/ installs it and runs this.
#   sh tools/town/lint/lint.sh   (from any folder)
cd "$(dirname "$0")" && python3 extract.py >/dev/null && npx eslint --no-eslintrc -c .eslintrc.json -f unix block6.js | grep -v "no-use-before-define" | awk -F: 'NF>3 {printf "%d: ", $2+37; for(i=4;i<=NF;i++) printf "%s%s", $i, (i<NF?":":""); print ""}'
