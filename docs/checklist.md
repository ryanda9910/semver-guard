# Reference

How semver-guard classifies a change to the public surface. Mirrors `skill/SKILL.md`.

## ✗ Breaking → major

A consumer's code stops compiling, or its behavior changes silently.

```ts
- export const parseConfig = ...                 // removed an export
- export function fetchUser(id) {}
+ export function fetchUser(id, opts) {}          // added a REQUIRED param
- type Status = "ok" | "err" | "pending"
+ type Status = "ok" | "err"                      // removed an enum member
- function get(): User | null
+ function get(): User                            // narrowed the return (callers handling null still fine,
                                                  //   but widening input / narrowing output to required = break)
```
Also breaking: changing a parameter's type or order, making a field required,
changing a default callers relied on, tightening input validation that used to
pass, changing the error type thrown.

**Cheap escapes (offer these before forcing a major):** re-export the old name,
make the new parameter optional, add an overload, deprecate instead of remove.

## ✓ Additive → minor

```ts
+ export const withRetry = ...                    // new export
+ function fetch(url, opts?) {}                    // new OPTIONAL param
+ interface Opts { timeout?: number }              // new optional field
```
New surface, nothing removed or tightened.

## · Internal → patch

Bug fix, refactor, perf, docs, tests — no change a consumer can observe through
the public surface.

## The bump rule

`max(class for each change)`: any ✗ → **major**, else any ✓ → **minor**, else
**patch**. Don't invent breaks — a renamed local or a changed private helper is
not breaking. Only the public surface counts.
