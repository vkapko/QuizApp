# Issue #6: Quiz page — full question flow

## What to build

Build the Quiz page and its two UI components end-to-end. A user navigating to `/quiz/:categoryId` should be able to complete a full quiz: see each question, pick an answer, see feedback, advance, and land on Results. This slice is the core quiz experience.

## Acceptance criteria

- [x] Quiz page reads `:categoryId` from the URL and loads the matching questions from `quizData`
- [x] `useQuiz` is called with the category's questions; quiz starts automatically on mount
- [x] `ProgressBar` component renders "Question X of 5" and updates on each advance
- [x] `AnswerOption` renders all 4 options as clickable buttons
- [x] Clicking an option disables all buttons and highlights the selected option
- [x] Correct option is highlighted green; incorrect selection is highlighted red with the correct option also highlighted green
- [x] Explanation text appears below the options after answering
- [x] A "Next" button appears after answering; clicking it advances to the next question
- [x] After the final question's "Next" click, the app navigates to `/results` with the attempt object in `location.state`
- [x] The attempt object passed via state matches the shape expected by `useHistory.addAttempt`
- [x] Quiz page has a CSS Module stylesheet
- [x] `AnswerOption` tests: all options render, click fires handler, post-answer highlights are correct, explanation visibility

## Blocked by

- Issue #3 (Home page — category navigation must work)
- Issue #4 (`useQuiz` hook)
