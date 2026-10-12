# Checks the creature-pair vignette lines: reads the game's PAIRS table (two creature codes, a gesture style, two
# lines) and its NAMES out of index.html and prints the number of pairs, any pair of the cast missing or
# duplicated, the longest line's length and how often each gesture style is used.
#   python3 pairs.py [path/to/index.html]   (default: the index.html two folders up)
import itertools, collections, json, os, re, sys
src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "..", "..", "..", "index.html")
txt = open(src, encoding="utf-8").read()
names = re.search(r"const NAMES = \{([^}]*)\}", txt).group(1)
K = re.findall(r"(\w\w): \"", names)
body = txt[txt.index("PAIRS = [") + 9 : txt.index("// what each creature sends")]
P = [json.loads(m) for m in re.findall(r"^\s*(\[\"\w\w\", \"\w\w\", \d+, \".*\"\]),$", body, re.M)]
seen = collections.Counter(frozenset((a, b)) for a, b, *_ in P)
missing = [p for p in itertools.combinations(K, 2) if frozenset(p) not in seen]
dups = [k for k, v in seen.items() if v > 1]
print(len(P), "pairs of", len(K), "creatures; missing", missing, "dups", dups)
print("max len", max(max(len(a), len(b)) for *_, a, b in P))
print("styles", collections.Counter(s for _, _, s, _, _ in P))
