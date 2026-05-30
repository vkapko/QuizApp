# Issue #7: Results page — score, labels, review, history

## What to build

Build the Results page end-to-end. It reads the completed attempt from `location.state`, displays the score and performance label, shows a full answer review, persists the attempt to history, and lists all past attempts. It must also handle the case where `location.state` is missing.

## Acceptance criteria

- [x] Results page reads the attempt object from `location.state`
- [x] If `location.state` is missing or invalid, user is redirected to `/`
- [x] `ScoreDisplay` renders the score (e.g. "4 / 5"), percentage (e.g. "80%"), and performance label
- [x] Performance labels: 5/5 → "Excellent!", 3–4/5 → "Good job! You're getting there!", 0–2/5 → "Needs review — keep studying!"
- [x] `ReviewPanel` renders all 5 questions with the user's selected answer and the correct answer marked
- [x] Attempt is saved via `useHistory.addAttempt` on mount (saved once, not on every render)
- [x] Attempt history list renders all past attempts (category, score, date)
- [x] "Retake Quiz" button navigates back to `/quiz/:categoryId` for the same category; history is preserved
- [x] "Back to Home" link navigates to `/`
- [x] Results page has a CSS Module stylesheet
- [x] `ScoreDisplay` tests: all three label thresholds, score and percentage formatting at boundary values (0, 3, 4, 5)

## Blocked by

- Issue #5 (`useHistory` hook)
- Issue #6 (Quiz page — produces the `location.state` this page consumes)
