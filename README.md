<p align="center">
  <img src="assets/logo.svg" alt="semver-guard" width="96" height="96" />
</p>

<h1 align="center">semver-guard</h1>

<p align="center"><b>Catch breaking changes before you call it a patch.</b></p>

<p align="center">
  🇺🇸 English · <a href="README.id.md">🇮🇩 Bahasa Indonesia</a> · <a href="README.zh-CN.md">🇨🇳 简体中文</a>
</p>

<p align="center">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-34D399" />
  <img alt="skill" src="https://img.shields.io/badge/Claude%20Code-skill-34D399" />
  <img alt="harness" src="https://img.shields.io/badge/also-Codex%20·%20Cursor%20·%20Gemini%20·%20opencode-blue" />
  <img alt="install" src="https://img.shields.io/badge/install-one%20line-34D399" />
</p>

<p align="center">
  <img src="demo.gif" alt="semver-guard demo" width="760" />
</p>

A skill for your coding agent (Claude Code — also Codex, Cursor, Gemini CLI,
opencode). Before you bump a version or call a change "a patch", it diffs your
**public surface** — exports, signatures, types, return shapes — classifies each
change as breaking / additive / internal, and won't let a breaking change ship
under a patch or minor label.

A breaking change released as a patch is how you wake up to a hundred red builds
that updated overnight. The bump is a promise; semver-guard keeps it honest.

## Before / After

**Without semver-guard** — the agent renames things and ships a "patch":

```ts
- export const parseConfig = ...
+ export const withRetry = ...
- export function fetchUser(id) { ... }
+ export function fetchUser(id, opts) { ... }   // opts now required
```
```
$ npm version patch   ✅ "small change, just a patch"
```
(…every caller of `parseConfig` and `fetchUser(id)` breaks on update.)

**With semver-guard** — it diffs the public surface first:

```
semver-guard — 3 changes to the public surface
  ✗ breaking  removed export `parseConfig`            → major
  ✗ breaking  `fetchUser` now requires `opts`          → major  (make opts optional to avoid)
  ✓ additive  new export `withRetry`                  → minor
This is a MAJOR bump. You called it a patch.
```

Same diff. The version stops lying about what changed.

## Real runs

Not a mockup. Actual semver-guard runs in Claude Code — see **[CASES.md](CASES.md)**.

## Install

```bash
# macOS / Linux / WSL
curl -fsSL https://raw.githubusercontent.com/ryanda9910/semver-guard/main/install.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/ryanda9910/semver-guard/main/install.ps1 | iex
```

Finds every coding agent you have and installs the skill into each. ~10 seconds,
safe to re-run. `--project` also installs into the current repo's `.claude/`. No
key, no account, no dependency.

Manual: copy [`skill/SKILL.md`](skill/SKILL.md) into your agent's skills/rules dir
(Claude Code: `~/.claude/skills/semver-guard/SKILL.md`).

## Documentation

Full docs in **[docs/](docs/)** — [usage](docs/usage.md) · [reference](docs/checklist.md) ·
[install](docs/install.md) · [customizing](docs/customizing.md) · [FAQ](docs/faq.md) ·
[real runs](CASES.md) · [contributing](CONTRIBUTING.md).

## Works in

Claude Code (native skill), plus any agent that loads a rules/skill file — Codex,
Cursor, Gemini CLI, opencode, Aider, GitHub Copilot CLI.

## License

MIT.
