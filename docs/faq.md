# FAQ

### What is this, exactly?

A skill (plain instructions) your coding agent follows. It adds no network calls,
no telemetry, no account — your code goes wherever your agent already sends it and
nowhere new.

### How is it different from api-extractor / are-the-types-wrong / a CI semver check?

Those are great and you should use them — but they run after you've committed, in
a separate step, and most only understand types. semver-guard runs inside the
agent that *just wrote the change*, at the moment it's about to pick a bump. It
reasons about intent (a tightened validation, a changed default, a removed enum
member) the way a careful reviewer would, and it can offer the cheap non-breaking
escape (re-export, optional param, overload) on the spot. Use it with your CI
check, not instead of it.

### Will it slow me down?

It runs once, at the bump/release moment, over the changes to your public surface.
If nothing public changed, it says "patch" and gets out of the way.

### Does it nag?

No. It only looks at the public surface and never invents breaks — a renamed
local or a changed private helper is not flagged.

### What languages / stacks?

The classes (removed export, required param, narrowed type, changed return) are
universal. The examples are TS/JS-flavored; the idea maps cleanly to Python
(`__all__`, type hints), Go (exported identifiers), Rust (`pub`), etc. Tune the
surface-detection hints in `skill/SKILL.md` for your stack.

### Which agents?

Claude Code (native), plus Codex, Cursor, Gemini CLI, opencode, Aider, Copilot CLI.

### It missed / mis-flagged something.

Open an issue with the example and the output — the checklist is a living file.
