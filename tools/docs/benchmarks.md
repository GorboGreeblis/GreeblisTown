# Benchmarks across builds

Performance of each build, measured the same way every time with [`test/bench.js`](../test/bench.js), so builds can
be compared over the life of the game. Add a row for every PR that changes the game, and a fresh row for the first
build whenever the benchmark itself changes.

## How it is measured

- `test/bench.js` wraps WebGL's draw calls and `requestAnimationFrame` before the page loads. It reads any build the
  same way, old or new, without relying on the game's internals.
- The page is clicked once to start. It then settles for 8 s and is measured for 20 s, with the player standing where
  the build starts them.
- **Draws** and **triangles** are per frame (instanced draws count each instance's triangles). **CPU** is the time per
  frame spent in the page's frame callbacks: game logic and three.js together.
- **Size** is the readable `index.html`, raw and gzipped (`gzip -9`). The final build is packed further
  ([release.md](release.md)). **Load** is the time to the page's load event.
- All of it runs in headless Chromium in the work container, with WebGL drawn on the CPU (SwiftShader). Frame rate
  and GPU time there are not a device's. The draw calls, triangles and CPU per frame are what compare between builds.
  Timings carry some run-to-run noise (about ±10 %).
- Desktop is a 1280×720 Chrome window. Phone is Playwright's Pixel 7 profile in Chrome on Android (the game's phone
  settings). The Quest path is measured by [`test/t_perf.js`](../test/t_perf.js) (VR eye views), not here.

To benchmark an old build, write it beside the readable copy and serve the repo root:

    git show <commit>:index.html > tools/old.html
    NOSHOT=1 node test/shot.js http://localhost:8765/tools/old.html x.png test/bench.js
    MOBILE=1 NOSHOT=1 node test/shot.js http://localhost:8765/tools/old.html x.png test/bench.js

## Results

| Build | Date | Mode | Size (gzip) | Load | Draws mean / max | Triangles mean / max | CPU ms mean / median / p95 | Heap | Errors |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
