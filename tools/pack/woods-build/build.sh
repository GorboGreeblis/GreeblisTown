#!/bin/sh
# Build Greeblis Woods from the readable source. Run from the root of a GreeblisGuides clone after
# `npm install terser@5.31.6 acorn@8.12.1`. Outputs go to games/greeblis-woods/build/ (git-ignored):
#   game.html        unpacked production page        game_debug.html  unpacked debug page (keeps /*<dbg>*/ hooks)
#   test_page.html   debug page with XR internals    index.html       the packed ordinal to push to GreeblisWoods
set -e
G=games/greeblis-woods; T=tools/greeblis-woods; B=$G/build
mkdir -p $B
python3 -I -c "import re,sys;s=open(sys.argv[1]).read();p=re.sub(r'/\*<dbg>\*/.*?/\*</dbg>\*/','',s,flags=re.S);assert '<dbg>' not in p;open(sys.argv[2],'w').write(p)" $G/game.js $B/game.prod.js
node $T/build/min.js $B/game.prod.js $B/game.min.js
python3 -I - "$G" "$B" <<'PY'
import sys
G, B = sys.argv[1], sys.argv[2]
r = lambda n: open(G + '/page/' + n).read()
head = r('00-head.html')
art = '<canvas id="pArt" width="192" height="108"></canvas>'
assert head.count(art) == 1; head = head.replace(art, '')
for name, game in [('game.html', open(B + '/game.min.js').read()), ('game_debug.html', open(G + '/game.js').read())]:
    assert '</script' not in game
    inner = (head + '<script>' + r('01-guard.js') + '</script>' + r('02.html') + '<script>' + r('03-three.js') + '</script>'
             + r('04.html') + '<script>' + r('05-patch.js') + r('05-polyfill.js').strip() + '</script>' + r('06.html')
             + '<script>' + r('07-canvas.js') + '</script>' + r('08.html') + '<script>' + game + '</script>' + r('10.html'))
    open(B + '/' + name, 'w').write(inner)
PY
python3 -I $T/build/mk_debug_page.py $B/game_debug.html $B/test_page.html
node $T/pack/build_loader.js
python3 -I $T/pack/pack_cm.py $B/game.html "Greeblis Woods" $B/index.html
