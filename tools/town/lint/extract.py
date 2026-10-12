# Cuts the game script (the first bare `<script>` from line 37 of index.html, or of GAME) out to block6.js in the
# current folder, so a block6.js line plus 37 is its index.html line; prints the `<script>` line and the last line.
#   python3 extract.py   (lint.sh runs it from this folder)
import re,sys
import os
s=open(os.environ.get('GAME',os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../index.html'))).read().split('\n')
# block6: lines 37 .. the closing </script> (1-based index lines 38..21127 typically); keep line numbers aligned: index line = block line + 36
start=None
for i,l in enumerate(s):
    if i>=36 and l.strip()=='<script>': start=i; break
end=next(i for i in range(start+1,len(s)) if s[i].strip()=='</script>')
open('block6.js','w').write('\n'.join(s[start+1:end])+'\n')
print(start+1,end)
