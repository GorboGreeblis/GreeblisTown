#!/bin/sh
# Lints the game script: cuts it out of index.html with extract.py, runs ESLint 8 with .eslintrc.json, drops the
# no-use-before-define findings and prints each finding at its index.html line. Needs ESLint 8 in this folder;
# `npm run lint` in tools/ installs it and runs this.
#   sh tools/lint/lint.sh   (from any folder)
cd "$(dirname "$0")" && off=$(python3 extract.py | cut -d' ' -f1) && npx eslint --no-eslintrc -c .eslintrc.json -f unix game.js | grep -v "no-use-before-define" | awk -F: -v off="$off" 'NF>3 {printf "%d: ", $2+off; for(i=4;i<=NF;i++) printf "%s%s", $i, (i<NF?":":""); print ""}'
