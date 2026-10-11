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
