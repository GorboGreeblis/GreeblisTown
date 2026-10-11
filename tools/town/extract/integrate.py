# (Re)insert the pulled model code into index.html between markers.
import os,re,sys
S=os.environ.get('JGP_WORK', '.')  # the extraction work folder (holds ex/, ours/, up_*/)
H='index.html'
h=open(H).read()
pulled=open(S+'/ex/pulled.js').read()
B1='/* PULLED-MODELS-BEGIN */'; E1='/* PULLED-MODELS-END */'
block=(B1+'\n/* =========================================================================\n'
 ' * CREATURE MODELS PULLED FROM GREEBLIS CITY, GREEBLIS PARK AND GREEBLIS WOODS\n'
 ' * Each game\'s original builder functions are copied verbatim (with the helpers\n'
 ' * they use) into an isolated scope, so names from different games never clash.\n'
 ' * Shared engine services (three.js helpers, scene, audio, effects) are ours.\n'
 ' * ========================================================================= */\n'
 +pulled+'\n'+E1+'\n')
if B1 in h:
    a=h.index(B1); b=h.index(E1)+len(E1)+1; h=h[:a]+block+h[b:]
else:
    k=h.index('/* =========================================================================\n * JURASSIC GREEBLIS PARK LAYER'); h=h[:k]+block+h[k:]
# polyfills from Woods / Park (before the main script)
P1='<script data-pulled-polyfills>'
if P1 not in h:
    ws=open(S+'/up_Woods/s2.js').read(); k=ws.index('"undefined"!=typeof THREE&&function(){var e=THREE.IcosahedronGeometry'); poly=ws[k:]
    ps=open(S+'/up_Park/s4.js').read()
    tag=P1+'\n// geometry polyfills used by the pulled Greeblis Woods / Greeblis Park models\n'+poly.strip()+'\n'+ps.strip()+'\n</script>'
    k=h.index('<script>\n  // UI safety net'); h=h[:k]+tag+' '+h[k:]
open(H,'w').write(h)
print('ok',len(h))
