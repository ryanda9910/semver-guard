# Usage

## When it runs

- **Automatically** when you're about to bump a version, publish, tag a release,
  or describe a change as "a patch" / "a minor" / "non-breaking".
- **On demand** via `/semver-guard`.

## What it looks at

The diff to the **public surface** — what consumers can import and call: exported
functions, classes, constants, types; public methods/fields; the package's
declared API (`exports`/`main`/`types`, `__all__`, `pub`); documented behavior.
Internal or private changes don't affect the bump.

## The output

```
semver-guard — 3 changes to the public surface
  ✗ breaking  removed export `parseConfig`                  → major
  ✗ breaking  `fetch(url)` now requires `fetch(url, opts)`   → major  (make opts optional to avoid)
  ✓ additive  new optional export `withRetry`               → minor
  · internal  refactored the cache (no surface change)       → patch
This is a MAJOR bump. You called it a patch.
```

- `✗ breaking → major` — a consumer's code stops compiling or changes behavior.
- `✓ additive → minor` — new surface, nothing removed or tightened.
- `· internal → patch` — no public surface change.

## The bump rule

The release is **at least** the highest class present: any breaking → **major**,
else any additive → **minor**, else **patch**. semver-guard won't let a breaking
change ship under a patch or minor — bump major, or keep the old surface working.
