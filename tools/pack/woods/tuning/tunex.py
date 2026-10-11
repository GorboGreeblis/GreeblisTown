# Try compressor settings in parallel with the native research encoder.
# Build: gcc -O2 -ffp-contract=off -DNATIVE -o cmzx tools/greeblis-woods/pack/tuning/cmzx.c -lm
# usage: python3 tunex.py <cmzx binary> <unpacked game.html> "" "NC=11" "TB=23 LRK=0.5" ...   ("" = defaults)
# Prints the compressed size for each setting. Settings: NC TB LIMS LIMF LRK FB WI RUN CHK FSEL L1M L2M LFM.
# The shipped model is pack/cmz.js; port a winning setting there and re-check the round trip.
import subprocess, sys
from concurrent.futures import ThreadPoolExecutor
binary, page = sys.argv[1:3]
def run(a): return int(subprocess.check_output([binary, page, 'x'] + a).split()[3])
V = [a.split() for a in sys.argv[3:]]
with ThreadPoolExecutor(4) as ex:
    for a, r in zip(V, ex.map(run, V)): print(' '.join(a) or 'base', r, flush=True)
