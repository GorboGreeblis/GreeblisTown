#!/bin/bash
# usage: envsheet.sh prefix VIEWS_JSON   (game served at http://localhost:8765/; images go to ./town/)
# VIEWS_JSON is a list of [name, camPos, lookAt] for env.js; writes town/<prefix>_<name>.png and town/<prefix>_all.png
H="$(cd "$(dirname "$0")" && pwd)"
mkdir -p town
VIEWS="$2" NOSHOT=1 WAIT=9000 timeout 300 node "$H/../test/run.js" "http://localhost:8765/index.html?desktop=1" town/$1.png "$H/env.js" 2>&1 | grep err
python3 - "$1" "$2" <<'P'
import sys, json
from PIL import Image
p=sys.argv[1]; v=json.loads(sys.argv[2])
ims=[Image.open(f'town/{p}_{x[0]}.png') for x in v]
cols=2; rows=(len(ims)+1)//2
s=Image.new('RGB',(960*cols,540*rows))
for i,im in enumerate(ims): s.paste(im,((i%cols)*960,(i//cols)*540))
s.resize((1440, int(540*rows*0.75))).save(f'town/{p}_all.png')
P
