# Helpers for editing index.html (in the current folder) safely: load, save, sub1 (replace text that must appear
# exactly once), span (a whole function from its header to its closing `  }` line) and builder (substitutions inside
# one builder, and code injected before its `return life(g`). Run edit scripts from the repo root, with this folder
# on sys.path, then `from lib import *` (as replace.py does).
import re
P = 'index.html'
def load(): return open(P).read()
def save(s): open(P, 'w').write(s)
def sub1(s, old, new):
    assert s.count(old) == 1, ('count', s.count(old), old[:80])
    return s.replace(old, new)
def span(s, header):
    assert s.count(header) == 1, ('hdr', s.count(header), header)
    i = s.index(header)
    j = min(x for x in [s.find('\n  };\n', i), s.find('\n  }\n', i)] if x > 0)
    return i, j
def builder(s, header, inject=None, subs=()):
    i, j = span(s, header)
    body = s[i:j]
    for old, new in subs:
        assert body.count(old) >= 1, ('sub', header, old[:80])
        body = body.replace(old, new)
    if inject:
        k = body.index('return life(g')
        body = body[:k] + inject.strip('\n') + '\n    ' + body[k:]
    return s[:i] + body + s[j:]
