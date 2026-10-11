# Contact sheet of part-by-part renders: the images listed one per line in <list.txt> (no trailing blank line), 160 px
# each, 10 to a row, the first labelled "all" and the rest "part 0", "part 1", …. Needs Pillow.
#   python3 partsheet.py <list.txt> <out.png>
import sys
from PIL import Image, ImageDraw
lst=open(sys.argv[1]).read().split('\n'); out=sys.argv[2]
cols=10; rows=(len(lst)+cols-1)//cols
W=Image.new('RGB',(cols*160,rows*175),'white'); d=ImageDraw.Draw(W)
for k,f in enumerate(lst):
    x,y=(k%cols)*160,(k//cols)*175
    W.paste(Image.open(f).resize((160,160)),(x,y)); d.text((x+3,y+161),'all' if k==0 else 'part %d'%(k-1),fill='black')
W.save(out)
