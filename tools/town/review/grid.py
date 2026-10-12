# Contact sheet of portrait renders: one 300 px column per id, its two angles (<prefix>_<id>_0.png and _1.png) one
# above the other. Needs Pillow.
#   python3 grid.py <prefix> <id,id,…> <out.png>
import sys
from PIL import Image
pre, ids, out = sys.argv[1], sys.argv[2].split(','), sys.argv[3]
W = Image.new('RGB', (len(ids) * 300, 600))
for k, i in enumerate(ids):
    for j in range(2):
        try: W.paste(Image.open('%s_%s_%d.png' % (pre, i, j)).resize((300, 300)), (k * 300, j * 300))
        except Exception as e: print(e)
W.save(out)
