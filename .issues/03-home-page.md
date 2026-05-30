# Issue #3: Home page — category list + username input

## What to build

Build the Home page end-to-end: a username input that persists to localStorage, a list of category cards rendered from the quiz data module, and navigation to the Quiz route on card click. This slice is the app's entry point and first demoable vertical.

## Acceptance criteria

- [ ] Username text input renders on the Home page
- [ ] Typing a username and leaving the field saves it to `localStorage` under `quizapp:username`
- [ ] On return visits the username input is pre-filled from localStorage
- [ ] All 3 quiz categories from `quizData` are rendered as clickable cards
- [ ] Each card displays the category name
- [ ] Clicking a card navigates to `/quiz/:categoryId` (using the category's `id`)
- [ ] Home page has a CSS Module stylesheet; layout is clear and usable
- [ ] No console errors on mount

## Blocked by

- Issue #1 (project scaffold)
- Issue #2 (quiz data module)
