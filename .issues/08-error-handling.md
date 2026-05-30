# Issue #8: Error handling + edge cases

## What to build

Add guard clauses for the two navigation edge cases: an unknown category ID in the Quiz route, and direct navigation to `/results` without quiz state. Both should redirect gracefully rather than crash or render broken UI.

## Acceptance criteria

- [ ] Navigating to `/quiz/unknown-id` renders a "Category not found" message (not a crash)
- [ ] "Category not found" view includes a link back to `/` (Home)
- [ ] Navigating directly to `/results` with no `location.state` redirects immediately to `/`
- [ ] No `console.error` or uncaught exception in either edge case
- [ ] Both cases covered by tests or verified manually with `npm start`

## Blocked by

- Issue #6 (Quiz page)
- Issue #7 (Results page)
