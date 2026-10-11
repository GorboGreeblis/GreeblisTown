import sys; sys.path.insert(0, sys.argv[0].rsplit('/', 1)[0])
from lib import *
s = load()
src = open(sys.argv[1]).read()
for blk in src.split('//@@ ')[1:]:
    header, body = blk.split('\n', 1)
    header = header.strip()
    i, j = span(s, '  ' + header if not header.startswith('function') else '  ' + header)
    # also drop the comment lines directly above the old builder
    k = s.rfind('\n', 0, i - 1)
    while s[k + 1:i].lstrip().startswith('//'):
        i = k + 1
        k = s.rfind('\n', 0, i - 1)
    end = j + len('\n  };')
    s = s[:i] + body.rstrip('\n') + s[end:]
    print('replaced', header)
save(s)
