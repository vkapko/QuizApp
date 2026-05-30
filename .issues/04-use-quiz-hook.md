# Issue #4: `useQuiz` hook with tests

## What to build

Implement the `useQuiz` hook — the app's deepest module. It owns the entire quiz state machine and must be independently testable with no DOM dependency. All quiz logic lives here; pages and components are thin consumers.

## Acceptance criteria

- [ ] `useQuiz(questions)` accepts an array of question objects
- [ ] Calling `start()` shuffles questions (Fisher-Yates) and transitions phase to `active`
- [ ] Hook exposes `currentQuestion` (the question object at the current index)
- [ ] Hook exposes `phase`: `'idle' | 'active' | 'reviewing' | 'finished'`
- [ ] Calling `answer(selectedIndex)` records the answer and transitions phase to `reviewing`
- [ ] Hook exposes `isCorrect` (boolean, valid during `reviewing` phase)
- [ ] Calling `next()` during `reviewing` advances to the next question (phase → `active`)
- [ ] Calling `next()` on the last question transitions phase to `finished`
- [ ] Hook exposes `score` (number of correct answers, valid during `finished` phase)
- [ ] Hook exposes `answers` (array of `{ selectedIndex, correctIndex }` for all answered questions)
- [ ] Hook exposes `currentIndex` and `totalQuestions`
- [ ] Shuffle produces all input questions with no drops or duplicates (test verifies this)
- [ ] Tests cover: idle→active transition, correct answer, incorrect answer, reviewing→active advancement, last question → finished, score computation, shuffle completeness

## Blocked by

- Issue #1 (project scaffold)
