# Issue #5: `useHistory` hook with tests

## What to build

Implement the `useHistory` hook — the single point of contact with localStorage. No component or page should touch localStorage directly; everything goes through this hook. Must be independently testable.

## Acceptance criteria

- [x] `useHistory()` returns `{ username, setUsername, history, addAttempt }`
- [x] `setUsername(name)` writes to `localStorage` under `quizapp:username` and updates state
- [x] `username` is read from `localStorage` on mount (pre-populates from prior sessions)
- [x] `addAttempt(attempt)` appends to the `quizapp:history` array in localStorage and updates state
- [x] `attempt` shape: `{ categoryId, categoryName, score, total, date (ISO string), answers }`
- [x] Multiple `addAttempt` calls accumulate — history is never overwritten
- [x] `history` is read from localStorage on mount (prior sessions persist)
- [x] localStorage is mocked in tests (no real browser storage dependency)
- [x] Tests cover: username round-trip, addAttempt appends, multi-attempt accumulation, cold-mount reads pre-existing data

## Blocked by

- Issue #1 (project scaffold)
