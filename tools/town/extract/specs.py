# Build portrait specs for pulled builders (ours) and originals (sandbox) from dumped defs.
import json,os,sys
S=os.environ.get('JGP_WORK', '.')  # the extraction work folder (holds ex/, ours/, up_*/)
game=sys.argv[1]; mode=sys.argv[2]  # mode: ours|orig
d=json.load(open(S+'/ex/defs_%s.json'%game))
pre={'City':'city_','Park':'park_','Woods':'woods_'}[game]
specs=[]
for i,e in enumerate(d):
    df=dict(e['def']); b=df['builder']
    lbl=(e.get('id') or df.get('__type') or 'c%d'%i)
    if game=='Park' and b=='park_fixture': lbl='fx_'+df['__type']
    nb=b if mode=='orig' else (pre+b.replace('park_',''))
    specs.append([lbl,nb,df,df.get('builderOpts') or {}])
json.dump(specs,open(S+'/ex/specs_%s_%s.json'%(game,mode),'w'))
print(len(specs),' '.join(s[0] for s in specs))
