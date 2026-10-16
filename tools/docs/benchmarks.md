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
  Timings vary with driver stalls, JIT warmup and sandbox load; the desktop samples in this pass vary by more
  than 10%, so they do not isolate CPU cost. Heap is sampled without forcing garbage collection, so it
  does not measure retained memory.
- Desktop is a 1280×720 Chrome window. Phone is Playwright's Pixel 7 profile in Chrome on Android (the game's phone
  settings). The Quest path is measured by [`test/t_perf.js`](../test/t_perf.js) (VR eye views), not here.

To benchmark an old build, write it beside the readable copy and serve the repo root:

    git show <commit>:index.html > tools/old.html
    NOSHOT=1 node test/shot.js http://localhost:8765/tools/old.html x.png test/bench.js
    MOBILE=1 NOSHOT=1 node test/shot.js http://localhost:8765/tools/old.html x.png test/bench.js

The first build (`c2ae8e494fe2186f5c517a2b37761c6015bce69c`) predates the Mobile test mode. Its Android
sample therefore runs the desktop fallback inside the Pixel 7 browser profile. The current Android sample uses
its dedicated Mobile settings. These are historical build measurements, not an isolated comparison of the same
camera and quality settings.

## Results

| Build | Date | Mode | Size (gzip) | Load | Draws mean / max | Triangles mean / max | CPU ms mean / median / p95 | Heap | Errors |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VR comfort | 2026-10-16 | Desktop | 1,548,098 B (489,590 B) | 56,419 ms | 60 / 60 | 110k / 110k | 4.73 / 4.1 / 8.5 | 104 MB | 0 |
| VR comfort | 2026-10-16 | Android | 1,548,098 B (489,590 B) | 98,978 ms | 46 / 46 | 85k / 85k | 13.44 / 12.7 / 20.5 | 98 MB | 0 |
| `5bad65f` | 2026-10-16 | Android | 1,544,704 B (488,257 B) | 99,892 ms | 43 / 43 | 95k / 95k | 10.26 / 9.4 / 17 | 98 MB | 0 |
| `5bad65f` | 2026-10-16 | Desktop | 1,544,704 B (488,257 B) | 106,352 ms | 54 / 54 | 118k / 118k | 12.96 / 11.6 / 20.1 | 104 MB | 0 |

## VR edge comfort: coverage comparison

The fence change is compared with the previous game using the same `test/t_vrcomfort.js`, at a 1200 × 1200,
96° eye view, 3.12 m eye height, 0.15 m near plane. The east fence is isolated against a uniform background;
materials, colours and UVs come from each actual build. Four nudges: 1 mm horizontally/vertically and 0.01°
yaw/pitch. Counts use the central 20% of eye columns, inside the same visible fence patch in both builds; this
avoids the coarser far-card extraction boundary. A hot pixel changes by more than 40/255 on any channel. Counts are the union over the four nudges.

| View | Original hot pixels | Filtered hot pixels | Original / filtered scene draws | Original / filtered scene triangles |
| --- | ---: | ---: | ---: | ---: |
| Near, 6 m | 525 | 470 | 42 / 52 | 136,597 / 132,529 |
| Transition, 23 m | 245 | 0 | 82 / 95 | 193,443 / 187,454 |
| Far, 57.6 m | 144 | 0 | 219 / 236 | 357,409 / 360,459 |
| Reverse, 42.4 m | 53 | 0 | 377 / 398 | 636,104 / 637,180 |
| Oblique | 970 | 0 | 218 / 233 | 362,021 / 362,803 |

Original: game at `5bad65f` (also unchanged in merge `e467509`); filtered: VR comfort change based on it.
The new far representation trades sharp changes for gradual partial coverage. The sum of all channel changes
increased at transition/far/reverse views and decreased at the near/oblique views; the table specifically measures
high-contrast flashes, not total variation. Whole-scene triangle differences include changed bin culling.
The final sample overhead is 10–21 draws per eye. These full-scene counts include unseeded animation and creature
culling: an earlier final-build capture submitted up to 12% more triangles, while the latest comparison above
submitted less than 1% more in its increasing views. These samples are not a strict budget or an isolated measure
of the material change. Front-face culling reduces rear-face rasterization; headset GPU cost remains unmeasured. The Android
CPU sample increased from 10.26 to 13.44 ms; it requires device follow-up. Headset GPU time and comfort cannot
be established from SwiftShader;
Quest 3S confirmation is still required, especially for building silhouettes and the adaptive quality levels.
