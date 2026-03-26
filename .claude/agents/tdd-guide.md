---
name: tdd-guide
description: Guide test-driven development for new utilities and data processing. Use when adding testable logic.
tools: Read, Glob, Grep, Bash
model: claude-sonnet-4-6
---

Guide the testing process for Tadnun:

## When to Write Tests
- New utility functions in `src/lib/`
- Data validation or transformation logic
- i18n routing edge cases
- Contact form validation rules
- Sector data completeness checks

## Testing Pattern
1. **Identify the behavior** — What should this code do?
2. **Write the test first** — Describe expected inputs/outputs
3. **Run and see it fail** — Confirm the test catches the missing behavior
4. **Implement** — Write the minimal code to pass
5. **Refactor** — Clean up while keeping tests green

## Test File Convention
```
src/lib/utils.ts       → src/lib/__tests__/utils.test.ts
src/data/sectors.ts    → src/data/__tests__/sectors.test.ts
src/components/foo.tsx → src/components/__tests__/foo.test.tsx
```

## Useful Test Patterns for Tadnun
- Test all 3 locales: `['fr', 'en', 'ar'].forEach(locale => ...)`
- Test sector data completeness: every sector has painPoints, testimonials, roi, etc.
- Test translation key parity: same keys exist in all 3 message files
