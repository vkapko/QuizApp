# Issue #5: `useHistory` hook with tests

## What to build

Implement the `useHistory` hook — the single point of contact with localStorage. No component or page should touch localStorage directly; everything goes through this hook. Must be independently testable.

## Acceptance criteria

- [ ] `useHistory()` returns `{ username, setUsername, history, addAttempt }`
- [ ] `setUsername(name)` writes to `localStorage` under `quizapp:username` and updates state
- [ ] `username` is read from `localStorage` on mount (pre-populates from prior sessions)
- [ ] `addAttempt(attempt)` appends to the `quizapp:history` array in localStorage and updates state
- [ ] `attempt` shape: `{ categoryId, categoryName, score, total, date (ISO string), answers }`
- [ ] Multiple `addAttempt` calls accumulate — history is never overwritten
- [ ] `history` is read from localStorage on mount (prior sessions persist)
- [ ] localStorage is mocked in tests (no real browser storage dependency)
- [ ] Tests cover: username round-trip, addAttempt appends, multi-attempt accumulation, cold-mount reads pre-existing data

## Blocked by

- Issue #1 (project scaffold)
