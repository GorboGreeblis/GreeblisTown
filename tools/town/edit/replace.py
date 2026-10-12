# Swaps whole builders in index.html for new versions from a file of `//@@ <header>` blocks: each block replaces the
# old function from its header to its closing `  };`, with the comment lines directly above it. Prints each header.
#   python3 tools/town/edit/replace.py <blocks.js>   (from the repo root)
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
