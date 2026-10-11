# swap3.py <page.html> <three.js> <out.html>: puts a three.js build into the page's second script
import re,sys
s=open(sys.argv[1]).read(); t=open(sys.argv[2]).read()
ms=list(re.finditer(r'<script[^>]*>',s)); m=ms[1]; e=s.find('</script>',m.end())
assert s[m.end():m.end()+10]=='var THREE=', s[m.end():m.end()+20]
open(sys.argv[3],'w').write(s[:m.end()]+t+s[e:])
