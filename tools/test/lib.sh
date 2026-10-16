# The setup quick.sh and battery.sh share (sourced, never run): the page's URL and path, the section header, the
# probe runner, the core checks both start with, and the closing summary.
# Env: URL (the page the browser loads, default http://localhost:8765/index.html).
# Output: `== <section> [<s> s]` headers, each runner's lines (blank lines dropped, cut at 400 characters), TIMEOUT or
#   EXIT lines for a runner that timed out or failed, then a SUMMARY line; summary exits 1 on any failure.
#   . ./lib.sh   (from tools/test/, as the runners do after their cd)
U=${URL:-http://localhost:8765/index.html}
G=$(cd ../.. && pwd)/index.html
LOG=$(mktemp)
trap 'rm -f "$LOG"' EXIT

h() { echo "== $* [${SECONDS} s]"; }

# run <timeout s> <runner.js> <args…>: one Node runner, its output kept for the summary
run() {
  local t=$1 rc
  shift
  timeout "$t" node "$@" 2>&1 | grep -v '^$' | cut -c1-400 | tee -a "$LOG"
  rc=${PIPESTATUS[0]}
  if [ "$rc" = 124 ]; then echo "TIMEOUT after $t s" | tee -a "$LOG"; elif [ "$rc" != 0 ]; then echo "EXIT $rc" | tee -a "$LOG"; fi
}
# small <timeout s> <runner.js> <args…>: the same at 320×240 px with no screenshot, so long probes run near full speed
small() { VW=320 VH=240 NOSHOT=1 run "$@"; }

# the checks both runners start with
core() {
  h "the readable copy"; sh ./copycheck.sh 2>&1 | tee -a "$LOG"
  h "lint (one known warning)"
  sh ../lint/lint.sh 2>&1 | tee "$LOG.lint"
  grep -v "'p' is not modified in this loop" "$LOG.lint" | grep -q . && echo "FAIL: lint findings beyond the known warning" | tee -a "$LOG"
  rm -f "$LOG.lint"
  h "game clock"; run 30 clock.js
  h "XR controls"; run 30 xrcontrols.js
  h "boot, desktop"; NOSHOT=1 run 300 shot.js "$U" x.png ./boot.js
  h "boot, mobile, and the GIVE button"; MOBILE=1 run 300 shot.js "$U" x_mob.png ./t_give.js
  h "ordinal sandbox, desktop"; run 300 ordtest.js "$G" x_ord.png
  h "ordinal sandbox, mobile"; MOBILE=1 run 300 ordtest.js "$G" x_ordm.png
  h "shaders"; NOSHOT=1 run 300 shot.js "$U" x.png ./t_shader.js
}

# The closing summary: every FAIL, PAGEERROR, TIMEOUT, EXIT, STALE or MISSING line and every error count above 0.
# Exits 1 when there is any.
summary() {
  local re='FAIL|PAGEERROR|^TIMEOUT|^EXIT |^STALE|^MISSING|(^|[^A-Za-z])err(ors)?"?:? *[1-9]' n
  n=$(grep -Ec "$re" "$LOG")
  h "DONE"
  if [ "$n" -gt 0 ]; then
    echo "SUMMARY: $n failing line(s):"
    grep -E "$re" "$LOG" | cut -c1-200
    exit 1
  fi
  echo "SUMMARY: clean (no FAIL, PAGEERROR, TIMEOUT or EXIT line, every error count 0)"
}
