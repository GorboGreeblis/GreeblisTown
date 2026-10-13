# Cuts the game script (the last bare `<script>` line of index.html, or of GAME) out to game.js in the current
# folder; prints the `<script>` line's index.html line number (a game.js line plus that number is its index.html
# line) and the last line.
#   python3 extract.py   (lint.sh runs it from this folder)
import re,sys
import os
s=open(os.environ.get('GAME',os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../index.html'))).read().split('\n')
# game: the game script's lines, after its bare `<script>` line up to the closing </script>
start=max(i for i,l in enumerate(s) if l.strip()=='<script>')
end=next(i for i in range(start+1,len(s)) if s[i].strip()=='</script>')
open('game.js','w').write('\n'.join(s[start+1:end])+'\n')
print(start+1,end)
