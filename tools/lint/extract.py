"""Cuts the game script out of the page for the lint: every line after the page's last bare `<script>` line up to its
`</script>`, written to game.js in this folder.
Env: PAGE (the page to read, default the repo root's index.html; GAME is read too). Once the root is packed, point it
  at tools/index.html.
Output: `<offset> <end>`: the `<script>` line's index.html line number (a game.js line plus the offset is its
index.html line) and the `</script>` line's; game.js.
  python3 extract.py   (lint.sh runs it from tools/lint/)
"""
import os

here = os.path.dirname(os.path.abspath(__file__))
page = os.environ.get('PAGE') or os.environ.get('GAME') or os.path.join(here, '..', '..', 'index.html')
with open(page, encoding='utf-8') as f:
    s = f.read().split('\n')
start = max(i for i, l in enumerate(s) if l.strip() == '<script>')
end = next(i for i in range(start + 1, len(s)) if s[i].strip() == '</script>')
with open(os.path.join(here, 'game.js'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(s[start + 1:end]) + '\n')
print(start + 1, end)
