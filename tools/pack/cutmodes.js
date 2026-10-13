// Cuts the Desktop and Mobile test modes out of a page for the final build: every line from a TEST-MODE-BEGIN
// marker through the next TEST-MODE-END marker goes, markers included. Fails on a fence left open, a nested one or
// an END with no BEGIN, and prints how many fences and lines it cut.
//   node pack/cutmodes.js ../index.html cut.html   (from tools/)
const fs = require('fs');
const [src, out] = process.argv.slice(2);
if (!src || !out) throw new Error('usage: node pack/cutmodes.js <page.html> <out.html>');
const keep = [];
let open = 0, fences = 0, cut = 0;
fs.readFileSync(src, 'utf8').split('\n').forEach((line, i) => {
  if (/TEST-MODE-BEGIN/.test(line)) {
    if (open) throw new Error(`line ${i + 1}: a fence opens inside another (opened at line ${open})`);
    open = i + 1;
  }
  if (open) cut++;
  else keep.push(line);
  if (/TEST-MODE-END/.test(line)) {
    if (!open) throw new Error(`line ${i + 1}: TEST-MODE-END with no TEST-MODE-BEGIN`);
    open = 0, fences++;
  }
});
if (open) throw new Error(`the fence opened at line ${open} is never closed`);
fs.writeFileSync(out, keep.join('\n'));
console.log(`cut ${fences} fences, ${cut} lines; ${out}: ${fs.statSync(out).size} bytes`);
