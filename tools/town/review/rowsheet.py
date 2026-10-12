# Contact sheet with one row per name: its four views <prefix>_<name>_0.png … _3.png side by side at their own size.
# Needs Pillow.
#   python3 rowsheet.py <prefix> <out.png> <name…>
import sys
from PIL import Image
prefix, out = sys.argv[1], sys.argv[2]; names = sys.argv[3:]
ims = [[Image.open(f"{prefix}_{n}_{j}.png") for j in range(4)] for n in names]
w, h = ims[0][0].size
s = Image.new("RGB", (w * 4, h * len(names)))
for i, row in enumerate(ims):
    for j, im in enumerate(row): s.paste(im, (j * w, i * h))
s.save(out)
