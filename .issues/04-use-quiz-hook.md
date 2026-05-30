# Issue #4: `useQuiz` hook with tests

## What to build

Implement the `useQuiz` hook — the app's deepest module. It owns the entire quiz state machine and must be independently testable with no DOM dependency. All quiz logic lives here; pages and components are thin consumers.

## Acceptance criteria

- [x] `useQuiz(questions)` accepts an array of question objects
- [x] Calling `start()` shuffles questions (Fisher-Yates) and transitions phase to `active`
- [x] Hook exposes `currentQuestion` (the question object at the current index)
- [x] Hook exposes `phase`: `'idle' | 'active' | 'reviewing' | 'finished'`
- [x] Calling `answer(selectedIndex)` records the answer and transitions phase to `reviewing`
- [x] Hook exposes `isCorrect` (boolean, valid during `reviewing` phase)
- [x] Calling `next()` during `reviewing` advances to the next question (phase → `active`)
- [x] Calling `next()` on the last question transitions phase to `finished`
- [x] Hook exposes `score` (number of correct answers, valid during `finished` phase)
- [x] Hook exposes `answers` (array of `{ selectedIndex, correctIndex }` for all answered questions)
- [x] Hook exposes `currentIndex` and `totalQuestions`
- [x] Shuffle produces all input questions with no drops or duplicates (test verifies this)
- [x] Tests cover: idle→active transition, correct answer, incorrect answer, reviewing→active advancement, last question → finished, score computation, shuffle completeness

## Blocked by

- Issue #1 (project scaffold)
