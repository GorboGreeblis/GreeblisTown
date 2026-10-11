# Expose a few XR-layer internals (window.__tt, __F, __o) on a debug page for the test scripts.
# usage: python3 mk_debug_page.py <debug.html> <test_page.html>
import sys
src, out = sys.argv[1:3]
s = open(src).read()
a = 'const tt = { open: !1, target: null, options: [] };'
assert s.count(a) == 1
s = s.replace(a, a + ' window.__tt = tt; window.__F = F; window.__o = o;')
open(out, 'w').write(s)
