# AI Development Quiz App

An interactive quiz platform for testing and reinforcing knowledge of AI software development concepts — agent design, prompt engineering, and model selection.

## Features

- **Three quiz categories** — Agent Fundamentals, Prompt Engineering, Model Selection
- **5 questions per quiz** with multiple-choice answers, instant feedback, and explanations
- **Randomized question order** (Fisher-Yates shuffle) on every attempt
- **Per-question review** — see correct/incorrect immediately with an explanation before advancing
- **Lightweight username** — stored in `localStorage`, pre-filled on return visits
- **Attempt history** — past scores and dates persisted in `localStorage`, visible on the Results page
- **Performance labels** — Excellent / Good job / Needs review based on score
- **Retake Quiz** — resets state without clearing history
- **Error handling** — unknown category IDs and missing results state redirect gracefully

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (Create React App) |
| Routing | React Router v6 |
| Styling | CSS Modules (no UI libraries) |
| Persistence | `localStorage` only — no backend |
| Tests | Jest + React Testing Library |

## Project Structure

```
src/
├── api/
│   └── quizData.js          # Quiz content + getCategoryById helper
├── hooks/
│   ├── useQuiz.js           # State machine: idle → active → reviewing → finished
│   └── useHistory.js        # localStorage read/write for username + history
├── pages/
│   ├── Home.jsx             # Category picker + username input
│   ├── Quiz.jsx             # Question flow with progress indicator
│   └── Results.jsx          # Score, review panel, history list, retake action
└── components/
    ├── AnswerOption.jsx     # Single answer button with correct/incorrect highlight
    ├── ProgressBar.jsx      # "Question X of Y" indicator
    ├── ScoreDisplay.jsx     # Score, percentage, and performance label
    └── ReviewPanel.jsx      # Per-question answer review after completion
```

## Quiz Categories

| Category | Topics Covered |
|---|---|
| Agent Fundamentals | Tools, ReAct loops, memory types, multi-agent systems, stopping conditions |
| Prompt Engineering | Few-shot prompting, Chain-of-Thought, prompt injection, system prompts, temperature |
| Model Selection | Small vs. frontier models, context windows, RAG vs. fine-tuning, hallucination |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run the test suite
npm test

# Run a single test file
npm test -- --testPathPattern=useQuiz

# Production build
npm run build
```

The app runs at `http://localhost:3000` by default.

## Performance Labels

| Score | Label |
|---|---|
| 5/5 (100%) | Excellent! |
| 3–4/5 (60–80%) | Good job! You're getting there! |
| 0–2/5 (< 60%) | Needs review — keep studying! |

## State Flow

```
Home (pick category + username)
  → Quiz (useQuiz state machine drives question flow)
      → Results (attempt passed via React Router location.state)
          → Retake (resets useQuiz, same category)
          → Home
```

Quiz state is local to the Quiz page via `useQuiz`. On completion, the finished attempt is handed off to Results via `location.state` — no global context or Redux needed.

## Adding Quiz Content

All quiz data lives in `src/api/quizData.js`. To add a new category, append an object to the array:

```js
{
  id: 'my-category',          // used in the route: /quiz/my-category
  category: 'Display Name',
  questions: [
    {
      text: 'Question text?',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 2,          // zero-based index into options
      explanation: 'Why C is correct.',
    },
    // ...at least 5 questions
  ],
}
```

No code changes beyond the data file are required — the UI is fully data-driven.

## License

MIT
