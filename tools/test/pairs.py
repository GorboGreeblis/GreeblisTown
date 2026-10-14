"""The vignette tables: reads the game's NAMES (each creature's two-letter code), PAIRS (two codes, a gesture style,
two lines) and SLUG_PAIRS (the church's ANCIENT with each creature: a code, its line, the reply) out of the page.
Env: none.
Output: the pair count, every pair of the cast missing or duplicated, the longest line's length and the use of each
  gesture style; then the ANCIENT's exchanges, the codes missing from them and their longest line.
  python3 test/pairs.py [index.html]   (default: the repo root's index.html)
"""
import collections
import itertools
import json
import os
import re
import sys

src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "index.html")
txt = open(src, encoding="utf-8").read()
K = re.findall(r"(\w\w): \"", re.search(r"const NAMES = \{([^}]*)\}", txt).group(1))
body = txt[txt.index("PAIRS = [") + 9 : txt.index("// what each creature sends")]
P = [json.loads(m) for m in re.findall(r"^\s*(\[\"\w\w\", \"\w\w\", \d+, \".*\"\]),$", body, re.M)]
seen = collections.Counter(frozenset((a, b)) for a, b, *_ in P)
missing = [p for p in itertools.combinations(K, 2) if frozenset(p) not in seen]
dups = [sorted(k) for k, v in seen.items() if v > 1]
print(len(P), "pairs of", len(K), "creatures; missing", missing, "dups", dups)
print("max len", max(max(len(a), len(b)) for *_, a, b in P))
print("styles", collections.Counter(s for _, _, s, _, _ in P))
slug = txt[txt.index("SLUG_PAIRS = [") :]
slug = slug[: re.search(r"^\s*\],\s*$", slug, re.M).start()]
S = [json.loads(m) for m in re.findall(r"^\s*(\[\"\w\w\", \".*\"\]),$", slug, re.M)]
print("the ANCIENT:", len(S), "exchanges; missing", [k for k in K if k not in {c for c, *_ in S}], "| max len", max(max(len(a), len(b)) for _, a, b in S))
