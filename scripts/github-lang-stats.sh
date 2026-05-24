#!/usr/bin/env bash
#
# github-lang-stats.sh
#
# Aggregate your real GitHub activity by language over a time window.
# For every repo you own (including forks) that was pushed in the window,
# clones it, runs `git log --author --numstat` against your identities,
# and sums lines added/deleted + commit counts grouped by file extension
# -> language.
#
# Usage:
#   scripts/github-lang-stats.sh [github_user] [since]
#
# Examples:
#   scripts/github-lang-stats.sh
#   scripts/github-lang-stats.sh Minifigures "1 year ago"
#   scripts/github-lang-stats.sh Minifigures 2025-05-24
#
# Requirements: gh (authenticated), git, jq, awk.

set -euo pipefail

USER="${1:-Minifigures}"
SINCE="${2:-1 year ago}"

# Identities to match in git history. Add aliases here if you commit under
# multiple names/emails.
AUTHORS=(
  "Minifigures"
  "Marco Anthony Ayuste"
  "minifiguresgt@gmail.com"
  "@users.noreply.github.com"
)
AUTHOR_RE=$(IFS='|'; echo "${AUTHORS[*]}")

WORKDIR="${WORKDIR:-$HOME/.cache/gh-lang-stats/$USER}"
mkdir -p "$WORKDIR"
cd "$WORKDIR"
echo "Working dir: $WORKDIR" >&2

# Convert SINCE to an ISO timestamp for the pushedAt comparison.
if date -u -d "$SINCE" +%FT%TZ >/dev/null 2>&1; then
  SINCE_ISO=$(date -u -d "$SINCE" +%FT%TZ)        # GNU date (Linux)
else
  SINCE_ISO=$(date -u -v-1y +%FT%TZ)              # BSD date (macOS) fallback
fi
echo "Window start: $SINCE_ISO" >&2

# 1) List repos (owner + forks). gh paginates automatically with --limit.
gh repo list "$USER" --limit 500 \
  --json name,nameWithOwner,primaryLanguage,isFork,pushedAt \
  > repos.json

REPOS=$(jq -r --arg since "$SINCE_ISO" \
  '.[] | select(.pushedAt >= $since) | .nameWithOwner' repos.json)

STATS=stats.tsv
: > "$STATS"

# 2) For each repo, clone (cached) and tally your commits.
for REPO in $REPOS; do
  DIR=$(echo "$REPO" | tr '/' '_')
  if [ ! -d "$DIR/.git" ]; then
    echo "Cloning $REPO ..." >&2
    if ! git clone --quiet --no-checkout "https://github.com/$REPO.git" "$DIR" 2>/dev/null; then
      echo "  skip (clone failed)" >&2
      continue
    fi
  else
    git -C "$DIR" fetch --quiet --all 2>/dev/null || true
  fi

  git -C "$DIR" log --all \
      --author="$AUTHOR_RE" --extended-regexp \
      --since="$SINCE" \
      --no-merges --numstat --format="" \
  | awk -v repo="$REPO" -v OFS='\t' '
      $1 ~ /^[0-9]+$/ && $3 != "" {
        n = split($3, parts, ".")
        ext = (n > 1) ? tolower(parts[n]) : "(none)"
        adds[ext] += $1
        dels[ext] += $2
      }
      END { for (e in adds) print repo, e, adds[e], dels[e] }
    ' >> "$STATS"

  COMMITS=$(git -C "$DIR" log --all \
              --author="$AUTHOR_RE" --extended-regexp \
              --since="$SINCE" --no-merges --oneline | wc -l | tr -d ' ')
  printf '%s\t__commits__\t%s\t0\n' "$REPO" "$COMMITS" >> "$STATS"
done

# 3) Roll up by language.
echo
echo "=== Lines added by language (your commits, window: $SINCE) ==="
awk -F'\t' '
  function lang(ext) {
    if (ext == "py") return "Python"
    if (ext == "ipynb") return "Python (notebook)"
    if (ext == "ts" || ext == "tsx") return "TypeScript"
    if (ext == "js" || ext == "jsx" || ext == "mjs" || ext == "cjs") return "JavaScript"
    if (ext == "rs") return "Rust"
    if (ext == "go") return "Go"
    if (ext == "cs") return "C#"
    if (ext == "java") return "Java"
    if (ext == "kt" || ext == "kts") return "Kotlin"
    if (ext == "swift") return "Swift"
    if (ext == "rb") return "Ruby"
    if (ext == "php") return "PHP"
    if (ext == "c" || ext == "h") return "C"
    if (ext == "cpp" || ext == "cc" || ext == "cxx" || ext == "hpp") return "C++"
    if (ext == "html" || ext == "htm") return "HTML"
    if (ext == "css" || ext == "scss" || ext == "sass") return "CSS"
    if (ext == "md" || ext == "mdx") return "Markdown"
    if (ext == "sh" || ext == "bash" || ext == "zsh") return "Shell"
    if (ext == "tex") return "TeX"
    if (ext == "json" || ext == "jsonc") return "JSON"
    if (ext == "yaml" || ext == "yml") return "YAML"
    if (ext == "toml") return "TOML"
    if (ext == "sql") return "SQL"
    return "Other(" ext ")"
  }
  $2 != "__commits__" {
    l = lang($2)
    add[l] += $3; del[l] += $4
  }
  END {
    printf "%-22s %12s %12s\n", "Language", "Added", "Deleted"
    for (l in add) printf "%-22s %12d %12d\n", l, add[l], del[l]
  }
' "$STATS" | (read -r header; echo "$header"; sort -k2 -rn)

echo
echo "=== Commits per repo (top 20, your commits in window) ==="
awk -F'\t' '$2 == "__commits__" && $3+0 > 0 {printf "%6d  %s\n", $3, $1}' "$STATS" \
  | sort -rn | head -20

echo
echo "Raw per-(repo,ext) data: $WORKDIR/$STATS"
