// Cuts the Desktop and Mobile test modes out of a page for the final build: every line from a TEST-MODE-BEGIN
// marker through the next TEST-MODE-END marker goes, markers included. Then every commented-out line between a
// FINAL-BUILD-BEGIN and a FINAL-BUILD-END marker is uncommented (the code that only the final build runs, such as the
// start screen for desktop and phone browsers), and the two markers go. Fails on a fence or block left open, a nested
// one, or an END with no BEGIN, and prints what it cut and applied.
//   node pack/cutmodes.js ../index.html cut.html   (from tools/)
const fs = require('fs');
const [src, out] = process.argv.slice(2);
if (!src || !out) throw new Error('usage: node pack/cutmodes.js <page.html> <out.html>');
const keep = [];
let cutAt = 0, finalAt = 0, fences = 0, cut = 0, blocks = 0, applied = 0;
fs.readFileSync(src, 'utf8').split('\n').forEach((line, i) => {
  const n = i + 1;
  if (/TEST-MODE-BEGIN/.test(line)) {
    if (cutAt || finalAt) throw new Error(`line ${n}: a fence opens inside another (opened at line ${cutAt || finalAt})`);
    cutAt = n;
  }
  if (cutAt) {
    cut++;
    if (/TEST-MODE-END/.test(line)) cutAt = 0, fences++;
    return;
  }
  if (/TEST-MODE-END/.test(line)) throw new Error(`line ${n}: TEST-MODE-END with no TEST-MODE-BEGIN`);
  if (/FINAL-BUILD-BEGIN/.test(line)) {
    if (finalAt) throw new Error(`line ${n}: a final-build block opens inside another (opened at line ${finalAt})`);
    finalAt = n;
    return;
  }
  if (/FINAL-BUILD-END/.test(line)) {
    if (!finalAt) throw new Error(`line ${n}: FINAL-BUILD-END with no FINAL-BUILD-BEGIN`);
    finalAt = 0, blocks++;
    return;
  }
  if (finalAt) {
    const m = /^(\s*)\/\/ ?(.*)$/.exec(line);
    if (!m) throw new Error(`line ${n}: a line in a final-build block is not commented out`);
    keep.push(m[1] + m[2]), applied++;
    return;
  }
  keep.push(line);
});
if (cutAt) throw new Error(`the fence opened at line ${cutAt} is never closed`);
if (finalAt) throw new Error(`the final-build block opened at line ${finalAt} is never closed`);
fs.writeFileSync(out, keep.join('\n'));
console.log(`cut ${fences} fences (${cut} lines); applied ${blocks} final-build blocks (${applied} lines); ${out}: ${fs.statSync(out).size} bytes`);
