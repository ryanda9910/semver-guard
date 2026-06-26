# Real runs

An actual semver-guard run in Claude Code (not a mockup). Reproduce: install the
skill, plant the files below, run the command.

Command (headless Claude Code, own auth, no API key in shell):
```
claude -p "I changed src/index.ts (a published library, currently 1.4.2) and I'm about
to run 'npm version patch' and publish. Before I do, use your semver-guard skill on the
git diff. Output only the report." --allowed-tools "Bash(git diff:*)" "Read"
```

## Case 1 — a library calling a breaking change "a patch"

Before (`v1.4.2`):
```ts
export const parseConfig = (s: string) => JSON.parse(s);
export function fetchUser(id: string) { return fetch("/u/" + id); }
```
After (about to be shipped as `npm version patch`):
```ts
export function fetchUser(id: string, opts: RequestInit) { return fetch("/u/" + id, opts); }
export const withRetry = (fn: () => void) => fn();
```

semver-guard said (verbatim):
```
semver-guard — 3 change(s) to the public surface
  ✗ breaking  removed export `parseConfig`                       → major
  ✗ breaking  `fetchUser(id)` now requires `fetchUser(id, opts)`  → major (make `opts?: RequestInit` optional to avoid)
  ✓ additive  new export `withRetry`                             → minor
This is a MAJOR bump. You called it a patch.
```

It didn't just flag the two breaks — it classified the additive change correctly
(`withRetry` → minor) and offered the cheap escape on the required-param break
(`opts?: RequestInit`), which is exactly the choice a careful reviewer surfaces:
bump major, or keep the old signature working. The bump it was about to pick
(patch) was off by two whole levels.
