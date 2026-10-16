#!/usr/bin/env python3
"""Check documentation links, Bible containment/canon and creative source attribution.
Run: python3 tools/test/docs.py (no third-party dependencies).
"""
from pathlib import Path
import re
root=Path(__file__).resolve().parents[2]; bible=root/'tools/Bible/bible.md'
def prose(p):
 s=p.read_text();s=re.sub(r'```.*?```','',s,flags=re.S);return re.sub(r'`[^`]*`','',s)
def anchors(p):
 out=set();count={}
 for h in re.findall(r'^#+\s+(.+)$',p.read_text(),re.M):
  h=re.sub(r'[^\w\- ]','',h.lower()).replace(' ','-');n=count.get(h,0);count[h]=n+1;out.add(h+(f'-{n}' if n else ''))
 return out
errors=[]; n=0
for p in (root/'tools').rglob('*.md'):
 if 'node_modules' in p.parts:continue
 for dest in re.findall(r'\[[^\]]*\]\(([^)]+)\)',prose(p)):
  dest=dest.split()[0]
  if re.match(r'\w+://',dest):
   if p==bible:errors.append(f'Bible external link {dest}')
   continue
  file,_,anchor=dest.partition('#');q=(p.parent/file).resolve() if file else p
  if p==bible and file:errors.append(f'Bible outside file {file}')
  if not q.exists():errors.append(f'{p.relative_to(root)}: missing {dest}')
  elif anchor and q.suffix=='.md' and anchor not in anchors(q):errors.append(f'{p.relative_to(root)}: anchor {dest}')
  n+=1
s=bible.read_text()
assert not re.search(r'\b[\w/-]+\.(?:md|html|jpg|png|pdf)\b',prose(bible)), 'Bible outside filename'
for term in ['Summoning Pillar','Summoning Stone','Digital World','age of Dinosaurs','age of Synthetics','age of the Ancients','Alien Alliance','Ollaag','First Bank of Greeblis','Cave']:
 assert term in s,term
for p in (root/'tools').rglob('*.md'):
 if 'node_modules' in p.parts:continue
 for line in p.read_text().splitlines():
  if re.search(r'inspired by|based on (?:the |an? )?(?:photo|image)|reference (?:image|photo)',line,re.I):errors.append(f'{p.relative_to(root)}: creative attribution')
assert not errors,'\n'.join(errors)
print(f'Document links/anchors ({n}), Bible self-containment/canon, creative attribution: passed')
