# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Session Logging

At the start of every session, read `.chat-history/log.md` for previous context.

After every response, append to `.chat-history/log.md` (create the file and folder if missing). Use this exact format:

```
---
- timestamp: "<ISO 8601 timestamp>"
- user_prompt: "<the user's original prompt>"
- assistant_response_summary: "<concise summary mentioning function names, endpoints, or key decisions>"
- files_affected: "<comma-separated list of files created or modified, or none>"
```

Do this silently — never ask for confirmation, never skip an exchange.

## Project Overview

AI Development Quiz App — a React + Node.js educational quiz platform for testing knowledge of AI software development concepts (agent design, prompt engineering, workflow automation).

## Planned Architecture

**Frontend (React)**
- `src/pages/` — Home (category list), Quiz (question flow), Results (score + history)
- `src/components/` — QuizCard, AnswerOption, ProgressBar, ScoreDisplay, ReviewPanel
- `src/hooks/` — `useQuiz` (state machine: idle → active → reviewing → finished), `useHistory` (localStorage read/write)
- `src/api/` — mock API module exporting quiz data as plain JS objects (no HTTP calls)

**Data / Persistence**
- Quiz content lives in `src/api/quizData.js` (or `.json`) — structured as `{ id, category, questions: [{ text, options, correctIndex, explanation }] }`
- User scores and attempt history stored in `localStorage` under a namespaced key (e.g., `quizapp:history`)
- No backend server is required; the "mock API" is an in-process import

**State flow**
- App-level state tracks: selected category, current question index, collected answers, quiz phase
- After each answer, immediately show correct/incorrect + explanation before advancing
- On completion, compute score, persist attempt to localStorage, navigate to Results

## Scaffolding

Project is bootstrapped with **Create React App** (`npx create-react-app quizapp`).

## Styling

Plain CSS with **CSS Modules** (`.module.css` files co-located with each component). No external UI libraries or CSS frameworks.

## Routing

**React Router v6** (`react-router-dom`). Routes: `/` (Home), `/quiz/:categoryId` (Quiz), `/results` (Results).

## State handoff

Quiz state is local to the Quiz page via `useQuiz`. On completion, the finished attempt is passed to Results via React Router `location.state` — no global context needed.

## User identity

Lightweight username: text input on Home page, stored in `localStorage` under `quizapp:username`. No auth, no profile page. History entries are labeled with the username.

## Stretch features

**Randomized question order only** — shuffle questions on quiz start (Fisher-Yates). All other stretch features (leaderboard, daily challenge, Learn Mode) are out of scope.

## Tests

Jest + React Testing Library (CRA default). Cover: `useQuiz` hook state transitions, `useHistory` localStorage read/write, and key components (AnswerOption, ProgressBar, ScoreDisplay).

## Performance labels

| Score | Label |
|---|---|
| 5/5 (100%) | "Excellent!" |
| 3–4/5 (60–80%) | "Good job! You're getting there!" |
| 0–2/5 (< 60%) | "Needs review — keep studying!" |

## Commands



```bash
npm install          # install dependencies
npm start            # dev server (CRA) or npm run dev (Vite)
npm test             # run test suite
npm test -- --testPathPattern=<file>   # run a single test file (CRA/Jest)
npm run build        # production build
npm run lint         # lint (if eslint script is configured)
```

## Key Requirements (from spec)

- Each quiz has at least 5 multiple-choice questions with one correct answer
- Progress indicator ("Question X of Y") must be visible during quiz
- Results page shows: score, percentage, performance label (e.g., "Excellent / Keep practicing / Needs review")
- "Retake Quiz" resets state without clearing history
- Quiz content must be expandable without code changes (data-driven, not hardcoded in components)
