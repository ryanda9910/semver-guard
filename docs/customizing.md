# Customizing

semver-guard is one file of instructions: `skill/SKILL.md` (installed at
`~/.claude/skills/semver-guard/SKILL.md`). Edit it to change behavior — no build, no code.

## Define your public surface

The single most useful tune: tell it exactly what "public" means for your repo.
Edit "What it looks at" in `SKILL.md` — e.g. "only `src/index.ts` re-exports are
public", or "anything under `packages/*/src/public/`", or "exported + not marked
`@internal`". The tighter the definition, the fewer false breaks.

## Stack mapping

Swap the TS/JS idioms for yours: Python `__all__` + type hints, Go exported
(capitalized) identifiers, Rust `pub`, Java `public`. The change classes are the
same; only the surface-detection hints differ.

## Tune the strictness

By default a new enum member is treated as additive — for some consumers
(exhaustive switches) it's breaking. If that's you, move "new enum member" to the
breaking list in `SKILL.md`.

## Project-specific rules

Use `--project` install to commit a tuned `./.claude/skills/semver-guard/SKILL.md` so
your team shares the same behavior.
