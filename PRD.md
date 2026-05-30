# PRD: AI Development Quiz App

## Problem Statement

Developers learning AI software development concepts — agent design, prompt engineering, workflow automation — have no focused, interactive way to test and reinforce their knowledge. Reading documentation is passive; there is no feedback loop to identify gaps, track improvement over time, or stay motivated through progress visibility.

## Solution

A browser-based quiz platform built in React that lets users select a quiz category, answer multiple-choice questions with immediate feedback and explanations, see their score and performance label at the end, and review their attempt history across sessions. A lightweight username personalizes the experience without requiring authentication.

## User Stories

1. As a learner, I want to see a landing page that explains what the app does, so that I understand its purpose immediately on arrival.
2. As a learner, I want to enter my name on the home page, so that my history is labeled and feels personal.
3. As a learner, I want to see a list of available quiz categories (Agent Fundamentals, Prompt Engineering, Model Selection), so that I can choose what to study.
4. As a learner, I want to start a quiz by clicking a category card, so that the experience is a single click without extra steps.
5. As a learner, I want to see a progress indicator ("Question 3 of 5") while taking a quiz, so that I know how far along I am.
6. As a learner, I want questions presented in a randomized order each time, so that retaking the quiz feels fresh and tests real recall.
7. As a learner, I want to select one answer from four multiple-choice options, so that I can engage actively rather than passively reading.
8. As a learner, I want to see immediately whether my answer was correct or incorrect, so that I get instant feedback.
9. As a learner, I want to read an explanation after answering each question, so that I understand why an answer is right or wrong.
10. As a learner, I want to advance to the next question after seeing the feedback, so that the flow stays in my control.
11. As a learner, I want to see my final score (e.g., "4 out of 5, 80%") at the end of a quiz, so that I know how I performed.
12. As a learner, I want to see a performance label based on my score ("Excellent!", "Good job! You're getting there!", "Needs review — keep studying!"), so that I get motivational feedback calibrated to my result.
13. As a learner, I want to review all questions with my answer and the correct answer on the results page, so that I can learn from my mistakes.
14. As a learner, I want a "Retake Quiz" button on the results page, so that I can practice again without navigating back manually.
15. As a learner, I want my past quiz attempts to persist across browser sessions, so that I can track my improvement over time.
16. As a learner, I want to see my attempt history on the results page (date, category, score), so that I have a record of my progress.
17. As a learner, I want my username to persist across sessions, so that I don't have to re-enter it every visit.
18. As a learner, I want the quiz content to be data-driven, so that new categories or questions can be added without changing the app's code.
19. As a learner, I want the app to handle navigating directly to `/results` without quiz data gracefully, so that I'm redirected rather than seeing a broken page.
20. As a learner, I want the app to handle an unknown `/quiz/:categoryId` gracefully, so that I see a helpful message rather than a crash.

## Implementation Decisions

### Modules

**`useQuiz` hook** — encapsulates the entire quiz state machine (`idle → active → reviewing → finished`). Accepts a question array, shuffles it on start (Fisher-Yates), tracks current question index, collected answers, and current phase. Exposes: `start()`, `answer(index)`, `next()`, and derived state (`currentQuestion`, `phase`, `score`, `isCorrect`). This is the deepest module in the app — all quiz logic lives here and nowhere else.

**`useHistory` hook** — encapsulates all localStorage access. Manages two keys: `quizapp:username` (string) and `quizapp:history` (array of attempt objects). Exposes: `username`, `setUsername(name)`, `history`, `addAttempt(attempt)`. Components never touch localStorage directly.

**Quiz data module** — a plain JS module (`quizData`) exporting an array of category objects. Shape: `{ id, category, questions: [{ text, options, correctIndex, explanation }] }`. AI-generated content covering Agent Fundamentals, Prompt Engineering, and Model Selection (5 questions each). No HTTP calls — imported directly.

**Page components** — three route-level components: Home (username input + category cards), Quiz (uses `useQuiz`, renders ProgressBar + AnswerOption), Results (reads `location.state` for the attempt, renders ScoreDisplay + ReviewPanel + history list).

**UI components** — ProgressBar, AnswerOption (with correct/incorrect highlight and explanation), ScoreDisplay (score + label), ReviewPanel (per-question summary). Each co-located with a CSS Module.

### Architectural decisions

- **CRA** for scaffolding (not Vite).
- **React Router v6** for navigation. Routes: `/` (Home), `/quiz/:categoryId` (Quiz), `/results` (Results).
- **CSS Modules** with plain CSS — no UI library, no Tailwind.
- **`location.state`** carries the completed attempt from Quiz to Results — no global context.
- **`localStorage`** is the only persistence layer — no backend, no database.
- Questions are shuffled **on quiz start**, not on import, so each attempt gets a different order.

### Performance label thresholds

| Score | Label |
|---|---|
| 5/5 | "Excellent!" |
| 3–4/5 | "Good job! You're getting there!" |
| 0–2/5 | "Needs review — keep studying!" |

## Testing Decisions

**What makes a good test here:** test observable behavior and outputs, not internal state or implementation details. For hooks, test what the hook returns and how it changes in response to calls — not how it's structured internally. For components, test what the user sees and can interact with — not which sub-components are rendered.

**Modules to test:**

- `useQuiz` — verify state transitions: starting a quiz sets phase to `active`; answering correctly sets `isCorrect` to true; answering advances to `reviewing`; calling `next()` on the last question sets phase to `finished`; final score is computed correctly; shuffle produces all input questions (no drops or duplicates).
- `useHistory` — verify: `setUsername` persists to localStorage and reads back; `addAttempt` appends to the history array; multiple attempts accumulate correctly; hook reads pre-existing localStorage data on mount.
- `AnswerOption` — verify: all four options render; clicking an option calls the handler; after answering, correct option is visually marked; incorrect selection shows both the wrong pick and the correct answer highlighted; explanation text is visible after answering, hidden before.
- `ScoreDisplay` — verify: all three label thresholds render the correct label string; score and percentage display correctly for boundary scores (0, 3, 4, 5).

**Prior art:** CRA ships Jest + React Testing Library. `renderHook` from `@testing-library/react` for hook tests; `render` + `userEvent` for component tests.

## Out of Scope

- Backend server or database — persistence is localStorage only.
- Authentication or multi-user support — username is a display label, not an identity.
- Leaderboard, daily/weekly challenge quiz, Learn Mode — excluded after deliberate scoping.
- "Create Your Own Quiz" functionality.
- Production build optimisation or deployment pipeline.

## Further Notes

- The app is built as an FSL V2.0.0 agentic coding challenge submission. AI is the primary developer; the human role is to guide via prompting. Interaction logs must be included in the submitted zip (`C:\Users\vkapk\workspace\QuizApp\.chat-history\log.md`).
- The recording constraint (60 minutes, continuous, system clock visible) means implementation should follow the phased plan: scaffold → hooks → components → pages → wiring → tests.
- `node_modules` must be excluded from the submitted zip.
