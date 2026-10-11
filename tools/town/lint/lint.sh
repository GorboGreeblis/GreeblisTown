#!/bin/sh
cd "$(dirname "$0")" && python3 extract.py >/dev/null && npx eslint --no-eslintrc -c .eslintrc.json -f unix block6.js | grep -v "no-use-before-define" | awk -F: 'NF>3 {printf "%d: ", $2+37; for(i=4;i<=NF;i++) printf "%s%s", $i, (i<NF?":":""); print ""}'
