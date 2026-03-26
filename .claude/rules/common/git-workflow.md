# Git Workflow — Tadnun

## Conventional Commits (Enforced)

Format: `type(scope): description`

| Type | When |
|------|------|
| `feat` | New feature or page |
| `fix` | Bug fix |
| `refactor` | Code restructuring (no behavior change) |
| `style` | Formatting, Tailwind changes (no logic change) |
| `docs` | Documentation, README, CLAUDE.md |
| `chore` | Dependencies, config, tooling |
| `test` | Adding or updating tests |
| `perf` | Performance improvements |
| `i18n` | Translation updates |

### Scopes (optional)
`nav`, `footer`, `hero`, `sectors`, `contact`, `i18n`, `seo`, `a11y`, `config`

### Examples
```
feat(sectors): add real-estate sector page
fix(nav): mobile menu not closing on route change
i18n: add Arabic translations for approach page
refactor(visuals): split visuals.tsx into individual components
```

## Branch Strategy
- `main` — production-ready code
- `feat/[name]` — new features
- `fix/[name]` — bug fixes
- `refactor/[name]` — restructuring

## PR Rules
- One concern per PR — don't mix features with refactors
- PR description must explain the "why"
- Self-review diff before requesting review
