# Old Greeblis City world-build chain: what swapWorld() throws away (read-only analysis)

Analysed from a snapshot copy of index.html (19782 lines). Line numbers are approximate. Use the quoted anchors to find each block.

## Context that decides the verdicts

- **Where the chain sits.** It lives inside `(function () {` (about line 16133), which is inside the boot `try { ... } catch (t) { vo(t, "boot") }`. Any throw in the chain stops the whole boot.
- **A local `t` hides the config `t`.** The chain's enclosing function ends with `const t = []; C.children.forEach(...); io(t);`. Code pasted inline into the chain that reads the global config `t` (for example `t.fog`) would hit that local instead and throw. Top-level functions such as `Z`, `at` and `ct` are not affected.
- **When swapWorld runs.** `swapWorld()` runs from `JGP.beforeSpawn()`. That is after the whole chain, after `io(t)` and after `At` is built. It is before `It.spawn`, `le.build`/`ce.build` and the gcEB batching (`_e`). So the gcEB batching never sees the old scenery.
- **Clouds are kept on purpose.** swapWorld keeps any child with `userData.w`. Only the cloud groups have it (`o.userData = { r: h(40, 95), ..., w: ... }`).
- **E (exclusion zones) is never pruned.** Two live functions read `E.clear`:
  - `at()` places the pizza portal. It only sees E entries added before it in the chain.
  - `g()` (about line 255) picks spawn points for roaming creatures, called from `Mo()` at about line 5562. It searches radius 5 to 34.5, needs 1.2 m clearance, and runs at boot and again later.
  - Every old-world E entry inside about 36 m therefore still blocks creature spawns where nothing exists any more.
- **F (colliders).** Old-world F entries are pruned by swapWorld unless they are within 6 m of a keepAt point.
- **k (waypoints).** `ho()` sends NPCs (not kind "creature") on treks to waypoints more than 13 m (`spreadR`) from the centre.
- **Night lighting (`gcNight`).** The only live driver is the third `L.push` inside `function Z()`:
  - It builds `V.nightMats` lazily on the first frame (so after swapWorld) by traversing C.
  - Live materials with `gcNight` today: the `ce` pickup material (`o.userData.gcNight = [0.06, 0.45]`), plus gcEB batch copies, which copy `emissiveIntensity` from the source material.
  - `gcNight` is also set on the skyline facade materials and the City Hall clock material, which are removed.
  - The new town and its Gas Station Sign have their own `L.push` loops that read `I.nightK`.
  - Conclusion: removing the old skyline cannot break night lighting, but `Z()`'s night loop must stay.
- **`facM`, `V.facade`, `V.neonM`, `V.blinkM`, `V.holoM`.** They are written only by the skyline IIFE and read only by other old-world IIFEs (City Hall, sheriff jars, LAB, REPAIR, cathedral, mechtrees). No live code reads them.

## Simulated pizza-portal placement (`at()`)

I re-ran the `at()` search with the E entries that exist when it runs.

| Case | Portal position | Transportation Terminal sign distance from portal |
|---|---|---|
| With the `"drums"` E entry (today) | (-8.6, -29.6) | 6.17 m, so swapWorld removes it |
| Without `"drums"` | (-9.4, -29.6) | 5.85 m, so swapWorld would KEEP it as a station |

- Removing the `"ring"` and `"path"` entries does not change the portal position.

## Block by block

1. **`E.add(-15.9, -26.8, 4.2, "drums"),`** → **MUST KEEP.**
   - It has no visuals. It is the only E entry that blocks the centre of the portal search.
   - Removing it moves the pizza portal 0.8 m (and the keepAt portal point with it). It would also put the Terminal sign inside the 6 m keep radius, unless block 18 is removed too.

2. **`ct(),`** (ground: paved clearing disc, promenades, rings, lawn quadrants, road and sidewalk rings, outer pavement) → **SAFE TO REMOVE ENTIRELY.**
   - Every mesh is a direct child of C and larger than 12 m (or more than 6 m from the keepAt points), so all of it is removed.
   - It is also the source of the io-merged mesh in the trace (about 4255 via `io` from about 19452): `U(...)` planes and lawns that share a cached material get merged under C.
   - Side effects: textures from `N(...)` and `x.world` cache entries (unique keys), nothing else. No E/F/k/z/L/V/G.
   - `ct` is called only here. Afterwards `ct`, `U` and `j` (and the top-level `Y`, not the local `Y` at about 6503) are dead code.

3. **`(function () { E.add(0, 24, 3.5, "path"), E.add(0.8, 19, 2.6, "path");`** (road markings, avenue strips and curbs: one mesh on C) → **REMOVE PARTIALLY.**
   - Remove the marker geometry: everything from `const t = [], e = "#f4f4ee"` through `H(R(v(t), x.world(...polygonOffset...), C))`.
   - Keeping the two `E.add(... "path")` lines is the conservative choice. They do not affect the portal, but they keep creature spawns (`g()`) off the garden-to-sign/phone walk.
   - No other side effects.

4. **Skyline IIFE `const t = (function () {` + `for (let e = 0; e < 16; e++) t.push(Math.random() < 0.45);`** → **SAFE TO REMOVE ENTIRELY, but only together with its consumers.**
   - What it builds:
     - 8 sector groups (via `q()`, about line 891) holding the facade, shop, roof, neon, blink and holo meshes;
     - via `pt()`: "Mistergummery's" fast food (`ut`) and "Department Store" (`Et`) groups;
     - via `mt()`: the building at `dt`.
     - All of these are at radius 61 m or more, so all are removed.
   - Side effects:
     - Writes `V.neonM`, `V.blinkM`, `V.holoM` and `V.facade = { T, facM }`.
     - Sets `gcNight` on its own three materials.
     - `L.push`: holo opacity and blink colour animation. It touches only `V.holoM` and `V.blinkM`, which are used only by removed objects.
     - Inside `ut`: `L.push((t, e) => no.anim(t, e))`, which animates only the removed fast-food rooftop prop.
     - Writes `ht.slots`, `dt.done`, `dt.x`, `dt.z`. None of these is read anywhere else.
     - No E/F/k/z.
   - **Required companion edit:** remove block 13 (City Hall) at the same time. Its `R(i.geo(), V.facade.facM, e)` throws a TypeError without the skyline and kills boot.
   - The other consumers do not throw, but should go too since everything they build is removed:
     - sheriff (block 17) has a `V.neonM || new ...` fallback;
     - LAB, REPAIR, cathedral and mechtrees would silently get a default white material.
   - Afterwards these become dead: `pt`, `ht`, `ut`, `Et`, `ft`, `mt`, `dt`, `no`, `_`, `X`, `re`, `lt` (also used by block 13), and `ae.halfW`/`ae.back`. `ae.z0` is still used by block 21 if that block stays.

5. **Garden `E.add(0, 0, JGP.GARDEN_R + 1, "campfire");` / `JGP.buildGarden(o)`** → **MUST KEEP** (kept station; E/z entries).

6. **Obelisk `})(-21.8, -17.4),`** → **MUST KEEP** (kept station; F/E/z).

7. **Shop `JGP.buildShop(o);` ... `})(-24.75, -24.75),`** → **MUST KEEP** (station; shopkeeper `st.*`, `uo.fixed`, `L.push`, z "stump").

8. **Pond `JGP.buildPond(o)` `})(24.6),`** → **MUST KEEP.**

9. **Sign `})(4.6, 25.4),`** → **MUST KEEP** (station; F/E entries and `k.push` "sign").

10. **`E.add(-10, -21, 3, "ring"), k.push({ x: -10, z: -18.2, id: "ring" }),`** → **MUST KEEP (conservative).**
    - It builds nothing, but the waypoint is a live NPC trek target (`ho()`), and the E entry shapes creature spawns.
    - It does not affect the portal.
    - Removing it is behaviour-only and optional, not part of the scenery cleanup.

11. **Clouds `const t = x.world("#ffffff", { fog: !1 }), e = [];` + `for (let o = 0; o < 7; o++)`** → **MUST KEEP.**
    - swapWorld keeps the clouds deliberately through `userData.w`. Its `L.push` drifts them.

12. **Phone booth `})(-7.2, 23.9),`** → **MUST KEEP.**

13. **City Hall `const t = lt(), e = new THREE.Group();` ... `"GREEBLIS CITY HALL"`** → **SAFE TO REMOVE ENTIRELY.**
    - At 70 m and 45 degrees, so it is removed.
    - Side effects:
      - clock material `gcNight`;
      - `L.push` clock loop (runs `new Date()` every frame, touches only its own removed hands).
    - It reads `V.facade.facM`, `V.neonM` and `V.holoM`, so it must go if block 4 goes.
    - No E/F/k/z.

14. **`E.add(-7.2, 23.9, 2.2, "phone"), E.add(0, 0, JGP.GARDEN_R + 3, "gathering"), [e, o, n].forEach(... "still")`** → **MUST KEEP** (live exclusion zones, added before `at()`).

15. **`at(),`** → **MUST KEEP** (pizza portal).

16. **The gameplay `L.push`es between them.** These are `if (!Mt.core) return;`, the `gcHid` loop, the concert/`bt.chips` loop, `L.push((t) => gcHorn.update(t))`, `xt && (Kt.rewards...`, the singer loop, `Pe.prep()`, `Pe.update`, and `ze.update`/`ke.update`/`gcOut`. → **MUST KEEP** (gameplay, not scenery).

17. **Sheriff `const t = K, e = 34.3 * Math.cos(t)` / `"★ SHERIFF ★"`** (sign plus 4 glass jars) → **SAFE TO REMOVE ENTIRELY.**
    - At about (24.3, 24.3), removed (the about 17569 and about 17679 objects in the trace).
    - F entries: one with `owner = "orbiter"` plus 4 jars, all pruned.
    - E entries: `"sheriff"` (3.6) and 4 × `"jar"` (2.95) at radius about 34. These are stale and block `g()` spawns, so removing them is a fix.
    - `V.jars` is never read.

18. **Terminal `const t = ot, e = It.all && It.all.find((t) => t.def && "Sunny" === t.def.name)` / `"Transportation Terminal"`** → **SAFE TO REMOVE ENTIRELY.**
    - Removed today, but borderline (6.17 m from the portal; see the table above).
    - It reads `ot` and does not write it.
    - `E.add(... "terminal")` is added after `at()` and is stale.
    - `V.terminal` is never read.
    - Removing it also removes the risk that it reappears if the portal moves.

19. **LAB `const t = Math.atan2(-23, 21), e = 38.6 * Math.cos(t)`** → **SAFE TO REMOVE ENTIRELY.**
    - The `M()` helper adds E and F entries for `labtable`/`labshelf` at about 38 m. These are outside the `g()` range and the F entries are pruned.
    - `L.push` (distance-gated) animates only its own objects.
    - `V.lab` is never read.

20. **REPAIR `const t = (3 * Math.PI) / 4, e = 38.6 * Math.cos(t)`** → **SAFE TO REMOVE ENTIRELY.**
    - E and F entries for repairbench, medbed, repairrack and scrap at about 38 m (pruned or out of range).
    - `L.push` animates only its own objects.
    - It reads `gcRepairBed`, which is defined at about line 1299 and used by the live `gcLie` code. Removing this block leaves `gcRepairBed` alone.

21. **Cathedral `t.position.set(0, 0, ae.z0), (t.userData.keepInFinale = !0), C.add(t);`** (stained glass, through about line 19306) → **SAFE TO REMOVE ENTIRELY.**
    - No E/F/k/z.
    - `L.push` touches only its own glass materials (`O`, `X`).
    - `ae.glass`, `ae.small` and `ae.k` are never read.
    - It uses `V.neonM`, `V.blinkM` and `V.holoM`.

22. **`(G.walkChirp = () => {`** → removable only together with Z's traffic-signal loop (block 23). Its only caller is `G.near(..., "walkChirp")` in `Z`. `G.near` catches a missing sound, so removing it alone would not throw.

23. **`Z(),`** (`function Z()`, about line 1096) → **REMOVE PARTIALLY.** What it builds:
    - bollards, traffic lights, lamps and manholes in 8 `q()` sector groups;
    - the signal-light group `u`, which is the about-1161 object in the trace.
    - All of it is removed. Its side effects and what to do with each:

    | Part of `Z` | Live? | Action |
    |---|---|---|
    | `V.sig` + signal-cycle `L.push` | Touches only removed lights, but plays `walkChirp` within 24 m of (±53.4, 0) / (0, ±53.4) every 28 s, a sound from a crossing that no longer exists | Remove (with block 22) |
    | Fog `L.push` (`const e = Math.min(t.fog.far, B.far - 6); C.fog && ...`) | Yes, generic and not old-world | **MUST KEEP** |
    | Night `L.push` (`const t = I.nightK \|\| 0; if (t !== V.lastN) ... V.nightMats ...`) | Yes, drives `ce` and the gcEB night materials | **MUST KEEP** |

    - Keep these two loops inside `function Z()`, with the rest of the body stripped, or in another top-level function. Do not paste them inline into the chain: the fog loop reads the global config `t`, which the chain's `const t = []` hides there.

24. **Mechtree scatter `const t = [], e = [], o = [], a = "#8e97a6", n = "#3a3f4c",`** (ends `V.mechTrees = V.aves.length;`) → **SAFE TO REMOVE ENTIRELY.**
    - It builds `q()` sector groups, all removed (the about-19436 object in the trace).
    - F entries are flagged `scenery`, so they are pruned.
    - `E.add(..., "mechtree")` covers the whole 12 to 46 m ring. These are stale and block `g()` creature spawns, so removing them is a fix that changes where creatures spawn.
    - `V.mechTrees` is never read. Afterwards `tt` is dead.

25. **Final `const t = []; C.children.forEach(... matrixAutoUpdate ...); io(t);`** → **MUST KEEP.**
    - It also merges the kept stations' static meshes, and `io` is used elsewhere (about lines 4323, 5611, 5688).
    - The about-4255 merged mesh in the trace disappears once `ct()` is gone.

## Required companion edits, summarised

1. Remove the skyline (4) and City Hall (13) together; City Hall throws without the skyline. Removing 17 to 21 and 24 together with them is recommended.
2. Keep every E entry added before `at()`, especially `"drums"`. If you do want `"drums"` gone, hard-code the portal at (-8.6, -29.6) and remove the Terminal block (18) first.
3. In `Z()`, keep the fog and night `L.push` loops inside a top-level function. Remove the sectors, the signal group, `V.sig`, the signal loop and `G.walkChirp`.
4. Keep the clouds, all stations, the gameplay `L.push`es, `at()` and the final `io(t)`.
5. Optional dead-code cleanup afterwards: `ct`, `U`, `j`, top-level `Y`, `Q`, `_`, `X`, `pt`, `ht`, `ut`, `Et`, `ft`, `mt`, `dt`, `no`, `lt`, `re`, `tt` (keep `ae` if block 21 stays; otherwise it is dead too). Grep each for top-level calls first, because minified names are heavily shadowed by locals. `W`, `D` and `q` become unused only if `Z` no longer builds sectors and blocks 4 and 24 are gone. `N` has many local shadows, so check carefully.
