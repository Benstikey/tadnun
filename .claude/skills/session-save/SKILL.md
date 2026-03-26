# Session Save — Cross-Session Memory

Save the current session's context so the next conversation can pick up where you left off.

## When to Use
Run `/session-save` at the end of every working session, or when switching context.

## What to Save
Create a file at `.claude/sessions/YYYY-MM-DD-HH-MM.md` with:

```markdown
# Session — [Date] [Time]

## What was done
- [Bullet list of changes made]

## Files modified
- [List of files changed with brief description]

## Decisions made
- [Any architectural or design decisions]

## Open questions
- [Unresolved items or things to revisit]

## Next steps
- [What should be done next]

## Current state
- [ ] Build passing?
- [ ] Any broken features?
- [ ] Uncommitted changes?
```

## How to Resume
At the start of a new session, read the latest file in `.claude/sessions/` to restore context.

## Important
- Keep session files concise (under 50 lines)
- Focus on decisions and context, not code details
- The code itself is the source of truth — sessions capture the "why"
