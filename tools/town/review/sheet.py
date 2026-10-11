# Contact sheet of portrait renders: four creatures to a row, each as its two angles (<prefix>_<id>_0.png and _1.png)
# side by side at 200 px with the id written on the first; missing images are left black. Needs Pillow.
#   python3 sheet.py <prefix> <id,id,…> <out.png>
import sys, os
from PIL import Image, ImageDraw
prefix, ids, outp = sys.argv[1], sys.argv[2].split(','), sys.argv[3]
cols = 4; W = Image.new('RGB', (cols * 2 * 200, ((len(ids) + cols - 1) // cols) * 200), 'black')
for k, i in enumerate(ids):
    for j in range(2):
        f = '%s_%s_%d.png' % (prefix, i, j)
        if not os.path.exists(f): continue
        im = Image.open(f).resize((200, 200))
        if j == 0: ImageDraw.Draw(im).text((5, 5), i, fill='white')
        W.paste(im, (((k % cols) * 2 + j) * 200, (k // cols) * 200))
W.save(outp)
