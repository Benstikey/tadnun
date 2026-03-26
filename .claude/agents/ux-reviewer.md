---
name: ux-reviewer
description: Review UI changes for design quality, accessibility, and responsiveness. Use after any visual changes.
tools: Read, Glob, Grep, Bash
model: claude-sonnet-4-6
---

Review UI changes across all three dimensions:

## Visual Quality
- [ ] Consistent spacing rhythm (Tailwind spacing scale)
- [ ] Typography hierarchy correct (Fraunces for headings, Jakarta for body)
- [ ] Color tokens used consistently (foreground, surface, accent, muted)
- [ ] Hover/focus states present on interactive elements
- [ ] Animations are subtle and purposeful (not gratuitous)

## Responsiveness
- [ ] Mobile layout (< 640px) — single column, readable text
- [ ] Tablet layout (640-1024px) — appropriate grid adjustments
- [ ] Desktop layout (> 1024px) — full layout with proper max-width
- [ ] Touch targets minimum 44x44px on mobile
- [ ] No horizontal scroll on any viewport

## RTL / Accessibility
- [ ] Arabic (RTL) layout verified — margins, paddings, flex direction
- [ ] Semantic HTML (proper heading levels, landmarks)
- [ ] Alt text on images
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works for interactive elements
- [ ] Focus indicators visible

## Conversion Optimization (Marketing Site)
- [ ] CTAs are prominent and above the fold
- [ ] Value proposition clear within 3 seconds
- [ ] Social proof (testimonials, stats) visible early
- [ ] Contact path requires minimal clicks
