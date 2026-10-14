"""Diffs two snap.js dumps: every changed, added (+) or removed (-) value, and every list whose length changed, by its
path, values cut to 150 characters.
Env: none.
Output: one line per difference, `<path> :: <before> -> <after>`; nothing when the dumps match.
  python3 audit/snapdiff.py snap_before.json snap_after.json
"""
import json
import sys


def show(v):
    return json.dumps(v)[:150]


def walk(x, y, path):
    if type(x) != type(y):
        print(path, '::', show(x), '->', show(y))
    elif isinstance(x, dict):
        for k in sorted(set(x) | set(y)):
            if k not in x:
                print(path + '.' + k, ':: + ', show(y[k]))
            elif k not in y:
                print(path + '.' + k, ':: - ', show(x[k]))
            else:
                walk(x[k], y[k], path + '.' + k)
    elif isinstance(x, list):
        if len(x) != len(y):
            print(path, ':: len', len(x), '->', len(y), show(y))
            return
        for i, (p, q) in enumerate(zip(x, y)):
            walk(p, q, path + '[%d]' % i)
    elif x != y:
        print(path, '::', show(x), '->', show(y))


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    walk(json.load(open(sys.argv[1])), json.load(open(sys.argv[2])), '')
