import sys
from PIL import Image, ImageDraw
lst=open(sys.argv[1]).read().split('\n'); out=sys.argv[2]
cols=10; rows=(len(lst)+cols-1)//cols
W=Image.new('RGB',(cols*160,rows*175),'white'); d=ImageDraw.Draw(W)
for k,f in enumerate(lst):
    x,y=(k%cols)*160,(k//cols)*175
    W.paste(Image.open(f).resize((160,160)),(x,y)); d.text((x+3,y+161),'all' if k==0 else 'part %d'%(k-1),fill='black')
W.save(out)
