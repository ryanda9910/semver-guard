---
name: semver-guard
description: >-
  Catch breaking changes before you call a release a patch. Triggers when you're
  about to bump a version, publish, or describe a change as patch/minor (or on
  /semver-guard). It reads the diff to the public surface — exports, function
  signatures, types, return shapes, defaults — classifies each change as
  breaking / additive / internal, and refuses to let a breaking change ship under
  a patch or minor label.
---

# semver-guard — catch breaking changes before you call it a patch

You're about to release. The version bump you pick is a promise: **patch** means
"safe to update blindly", **minor** means "new stuff, nothing removed", **major**
means "this will break callers". semver-guard checks that the bump matches what
the diff actually did to your public surface — because a breaking change shipped
as a patch is how you wake up to a hundred broken builds.

## When to run

- **Automatically**, when you're about to bump the version, publish, tag a
  release, or call a change "a patch" / "a minor" / "non-breaking".
- **On demand** when the user types `/semver-guard`.

## What it looks at

The diff to the **public surface** only — what consumers can import and call:
exported functions/classes/constants/types, public methods and fields, the
package's declared API (e.g. `exports`/`main`/`types`, `__all__`, `pub`), and
documented behavior. Internal/private changes don't affect the bump.

## The classification

Go through the changed public surface and label each:

- **✗ breaking (major)** — removed or renamed an export; added a *required*
  parameter; changed a parameter's type or order; narrowed a type or made a
  field required; removed an enum member; changed a return type/shape; changed a
  default that callers relied on; tightened input validation that used to pass;
  changed an error type thrown.
- **✓ additive (minor)** — new export; new *optional* parameter; new optional
  field; a widened (more permissive) type; a new enum member (usually).
- **· internal (patch)** — bug fix, refactor, perf, docs, tests — no public
  surface change.

## The bump rule

The release is **at least** the highest class present: any ✗ → **major**, else
any ✓ → **minor**, else **patch**. Do **not** let the user ship a breaking change
under a patch or minor label — either bump to major, or keep the old surface
working (re-export the old name, make the new param optional, add an overload,
deprecate instead of remove).

## What to do with findings

- For each breaking change, say whether it can be made **non-breaking** cheaply
  (re-export, optional param, overload, deprecation shim) and offer that, or
  confirm it genuinely requires a major.
- Don't invent breaks. A renamed *local* variable or a changed private helper is
  not a breaking change — only the public surface counts.

## Output format

```
semver-guard — N change(s) to the public surface
  ✗ breaking  removed export `parseConfig`                 → major
  ✗ breaking  `fetch(url)` now requires `fetch(url, opts)`  → major (make opts optional to avoid)
  ✓ additive  new optional export `withRetry`              → minor
  · internal  refactored the cache (no surface change)     → patch
This is a MAJOR bump. You called it a patch.
```

Keep it tight. Public surface only. The bump should never lie about what changed.
