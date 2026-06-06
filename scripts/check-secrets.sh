#!/usr/bin/env sh
#
# Dependency-free secret scanner for staged changes (runs in pre-commit).
# 1) Blocks committing real env files (only *.env.example is allowed).
# 2) Scans added lines for high-signal secret patterns.
#
# Bypass intentionally with `git commit --no-verify` ONLY after manual review.

set -eu

red() { printf '\033[31m%s\033[0m\n' "$1"; }

staged=$(git diff --cached --name-only --diff-filter=ACM)
[ -z "$staged" ] && exit 0

# --- 1. Block committing env files that commonly hold secrets ---------------
blocked_env=$(printf '%s\n' "$staged" \
  | grep -E '(^|/)\.env([.][a-zA-Z0-9_-]+)?$' \
  | grep -vE '[.]example$' || true)
if [ -n "$blocked_env" ]; then
  red "✖ Refusing to commit environment file(s) that may contain secrets:"
  printf '   %s\n' $blocked_env
  echo "  Add them to .gitignore, or commit a redacted *.env.example instead."
  exit 1
fi

# --- 2. Scan added lines for secret-like content ----------------------------
# Patterns: AWS access key, private keys, GitHub tokens, Slack tokens,
# Stripe live keys, Google API keys, and JWTs.
patterns='AKIA[0-9A-Z]{16}'
patterns="$patterns|-----BEGIN ([A-Z]+ )?PRIVATE KEY-----"
patterns="$patterns|gh[pousr]_[0-9A-Za-z]{36,}"
patterns="$patterns|github_pat_[0-9A-Za-z_]{22,}"
patterns="$patterns|xox[baprs]-[0-9A-Za-z-]{10,}"
patterns="$patterns|sk_live_[0-9A-Za-z]{20,}"
patterns="$patterns|AIza[0-9A-Za-z_-]{35}"
patterns="$patterns|eyJ[A-Za-z0-9_-]{8,}[.][A-Za-z0-9_-]{8,}[.][A-Za-z0-9_-]{8,}"

# Only inspect added lines (leading '+'), excluding the diff header '+++'.
hits=$(git diff --cached --no-color -U0 \
  | grep -E '^\+' | grep -vE '^\+\+\+' \
  | grep -nE "$patterns" || true)

if [ -n "$hits" ]; then
  red "✖ Potential secret detected in staged changes:"
  printf '%s\n' "$hits"
  echo "  Remove the secret and rotate it if it was ever real."
  echo "  If this is a verified false positive: git commit --no-verify"
  exit 1
fi

exit 0
