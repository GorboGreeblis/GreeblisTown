// For probes made of several parts: runs each part on a fresh page (reloaded between parts, so no part sees
// another's state), or only the parts named in PART (comma-separated), each under its own "== part" line.
//   module.exports = require('./parts.js')({ name: async (page, out) => { … }, … });
module.exports = (parts) => async (p, out) => {
  const want = process.env.PART ? process.env.PART.split(',') : Object.keys(parts);
  for (const [k, name] of want.entries()) {
    if (!parts[name]) throw new Error('no part "' + name + '": ' + Object.keys(parts).join(', '));
    if (k) await p.reload(), await p.waitForTimeout(+process.env.WAIT || 6000);
    console.log('== part: ' + name);
    await parts[name](p, out);
  }
};
