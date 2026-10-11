#!/usr/bin/env python3
"""Tile renders into one contact sheet, or show what changed between two renders. Needs Pillow.

  python3 tile.py sheet out.png COLS W H a.png b.png ...   each image scaled to W x H, COLS to a row
  python3 tile.py diff out.png a.png b.png [GAIN]           a, b and |a-b| x GAIN (default 6) side by side

The diff is how flicker shows up: two renders that should be identical (t_zcheck.js SHOTS=1 writes such
pairs) differ only where surfaces fight, so bright specks in the third panel are z-fighting, and scattered
single pixels on fine edges are only rasterising noise.
"""
import sys
from PIL import Image, ImageChops


def sheet(out, cols, w, h, files):
    rows = (len(files) + cols - 1) // cols
    W = Image.new('RGB', (cols * w, rows * h), 'white')
    for i, f in enumerate(files):
        W.paste(Image.open(f).convert('RGB').resize((w, h)), ((i % cols) * w, (i // cols) * h))
    W.save(out)


def diff(out, a, b, gain=6):
    A, B = Image.open(a).convert('RGB'), Image.open(b).convert('RGB').resize(Image.open(a).size)
    D = ImageChops.difference(A, B).point(lambda v: min(255, int(v * gain)))
    W = Image.new('RGB', (A.width * 3, A.height), 'white')
    for i, im in enumerate((A, B, D)):
        W.paste(im, (i * A.width, 0))
    W.save(out)


if __name__ == '__main__':
    if len(sys.argv) > 2 and sys.argv[1] == 'sheet':
        sheet(sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5]), sys.argv[6:])
    elif len(sys.argv) > 4 and sys.argv[1] == 'diff':
        diff(sys.argv[2], sys.argv[3], sys.argv[4], float(sys.argv[5]) if len(sys.argv) > 5 else 6)
    else:
        sys.exit(__doc__)
