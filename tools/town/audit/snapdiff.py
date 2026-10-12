# Diffs two snap.js dumps: prints each changed, added (+) or removed (-) value, and each list whose length changed,
# by its path, values cut to 150 characters.
#   python3 snapdiff.py before.json after.json
import json,sys
a=json.load(open(sys.argv[1]));b=json.load(open(sys.argv[2]))
def walk(x,y,path):
    if type(x)!=type(y): print(path, '::', json.dumps(x)[:150], '->', json.dumps(y)[:150]); return
    if isinstance(x,dict):
        for k in sorted(set(x)|set(y)):
            if k not in x: print(path+'.'+k,':: + ',json.dumps(y[k])[:150])
            elif k not in y: print(path+'.'+k,':: - ',json.dumps(x[k])[:150])
            else: walk(x[k],y[k],path+'.'+k)
    elif isinstance(x,list):
        if len(x)!=len(y): print(path, ':: len', len(x), '->', len(y), json.dumps(y)[:150]); return
        for i,(p,q) in enumerate(zip(x,y)): walk(p,q,path+'[%d]'%i)
    elif x!=y: print(path,'::',json.dumps(x)[:150],'->',json.dumps(y)[:150])
walk(a,b,'')
