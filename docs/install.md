# Install

## One line

```bash
# macOS / Linux / WSL
curl -fsSL https://raw.githubusercontent.com/ryanda9910/semver-guard/main/install.sh | bash
# Windows (PowerShell)
irm https://raw.githubusercontent.com/ryanda9910/semver-guard/main/install.ps1 | iex
```

Idempotent — re-run to update. Needs `curl` or `wget` (macOS/Linux); no other deps.

## Where it installs

| Agent | Location |
|---|---|
| **Claude Code** (native skill) | `~/.claude/skills/semver-guard/SKILL.md` |
| Codex | `~/.codex/semver-guard/semver-guard.md` |
| Cursor | `~/.cursor/semver-guard/semver-guard.md` |
| Gemini CLI | `~/.gemini/semver-guard/semver-guard.md` |
| opencode / Aider / Copilot CLI | manual (paste into the rules file) |

## Global vs project

- **Global** (default) — home agent dirs; applies to every repo.
- **Project** — add `-- --project` (sh) / `-project` (ps1) to also install into
  `./.claude/skills/semver-guard/SKILL.md` so the skill travels with the repo.

## Manual

```bash
mkdir -p ~/.claude/skills/semver-guard
cp skill/SKILL.md ~/.claude/skills/semver-guard/SKILL.md
```

## Uninstall

```bash
rm -rf ~/.claude/skills/semver-guard ~/.codex/semver-guard ~/.cursor/semver-guard ~/.gemini/semver-guard
```
