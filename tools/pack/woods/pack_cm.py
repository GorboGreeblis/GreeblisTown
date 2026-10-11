# Compress an unpacked game page with the CM codec and wrap it in the 7-bit ordinal page.
# usage: python3 pack_cm.py <unpacked.html> "<Title>" <index.html>
import os, sys, subprocess
D = os.path.dirname(os.path.abspath(__file__))
inner_path, title, out_path = sys.argv[1:4]
data = open(inner_path, 'rb').read()
payload_bin = out_path + '.cm.bin'
subprocess.check_call(['node', os.path.join(D, 'enc.js'), inner_path, payload_bin])
comp = open(payload_bin, 'rb').read()
os.remove(payload_bin)
E = [0, 13, 60]  # NUL, CR and '<' are escaped into one character in 128-511 that also carries the next group
bits = int.from_bytes(comp, 'little'); nbits = len(comp) * 8
groups = [(bits >> (7 * i)) & 127 for i in range((nbits + 6) // 7)]
out = []; i = 0
while i < len(groups):
    g = groups[i]
    if g in E:
        nxt = groups[i + 1] if i + 1 < len(groups) else 0
        out.append(chr(128 + (E.index(g) << 7) + nxt)); i += 2
    else:
        out.append(chr(g)); i += 1
payload = ''.join(out)
loader = open(os.path.join(D, 'loader.min.js')).read().replace('__CLEN__', str(len(comp))).replace('__LEN__', str(len(data)))
assert '__' not in loader.replace('__THREE', '')
html = ('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"><title>%s</title><style>html,body{margin:0;padding:0;height:100%%;overflow:hidden;background:#0d0d1a}#ld{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;color:#a8e830;font:bold 22px "Courier New",monospace;letter-spacing:2px}</style></head><body><div id="ld">LOADING</div><script type="b">' % title) + payload + '</script><script>' + loader + '</script></body></html>'
assert '</script' not in payload.lower()
open(out_path, 'w', encoding='utf8').write(html)
print('inner', len(data), 'cm', len(comp), 'html bytes', len(html.encode('utf8')))
