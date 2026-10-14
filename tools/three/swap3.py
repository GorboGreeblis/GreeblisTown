"""Puts a three.js build into a page: replaces the text of the page's second <script> block, after asserting that the
block holds three.js (it starts with `var THREE=`).
Env: none.
Output: nothing printed; the page with the new build to <out.html>.
  python3 three/swap3.py <page.html> <three.js> <out.html>
"""
import re
import sys

if len(sys.argv) != 4:
    sys.exit(__doc__)
s = open(sys.argv[1], encoding='utf-8').read()
t = open(sys.argv[2], encoding='utf-8').read()
m = list(re.finditer(r'<script[^>]*>', s))[1]
e = s.find('</script>', m.end())
assert s[m.end():m.end() + 10] == 'var THREE=', s[m.end():m.end() + 20]
open(sys.argv[3], 'w', encoding='utf-8').write(s[:m.end()] + t + s[e:])
