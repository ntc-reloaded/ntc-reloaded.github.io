#!/usr/bin/env bash
#
# publish.sh — push the current snapshot to the live site as a SINGLE clean
# commit, without exposing your local development history.
#
# Workflow:
#   1. Edit the site and commit locally as often as you like:
#        git add -A && git commit -m "whatever you want"
#      (These commits stay on your machine — they are never pushed.)
#   2. When you want the changes live, run:
#        ./publish.sh
#
# The public repo (ntc-reloaded.github.io) will then show exactly ONE commit,
# now and after every future publish. Always publish via this script — do not
# `git push` or `git pull` to main directly.
#
set -euo pipefail

MSG="Publish NTC-R 2026 website"
BRANCH="main"
REMOTE="origin"

# The published snapshot comes from your latest local commit (HEAD), so make
# sure nothing is left uncommitted.
if ! git diff-index --quiet HEAD --; then
  echo "✗ You have uncommitted changes."
  echo "  Commit them locally first:  git add -A && git commit -m \"...\""
  echo "  then re-run ./publish.sh"
  exit 1
fi

# Build a brand-new parentless commit pointing at HEAD's tree, and force it to
# be the entire public history. Local branches/history are left untouched.
NEW_COMMIT=$(git commit-tree "HEAD^{tree}" -m "$MSG")
git push --force "$REMOTE" "$NEW_COMMIT:$BRANCH"

echo "✓ Published. The public repo now shows exactly one commit: \"$MSG\""
echo "  (Your local history is unchanged and still private.)"
