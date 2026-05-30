import { renderHook, act } from '@testing-library/react';
import { useHistory } from './useHistory';

const makeAttempt = (overrides = {}) => ({
  categoryId: 'agent-fundamentals',
  categoryName: 'Agent Fundamentals',
  score: 4,
  total: 5,
  date: new Date().toISOString(),
  answers: [{ selectedIndex: 0, correctIndex: 0 }],
  ...overrides,
});

beforeEach(() => localStorage.clear());

describe('useHistory', () => {
  // ── Behavior 1: username cold mount ───────────────────────────────────────
  it('username is empty string when localStorage has no prior data', () => {
    const { result } = renderHook(() => useHistory());
    expect(result.current.username).toBe('');
  });

  // ── Behavior 2: setUsername round-trip ────────────────────────────────────
  it('setUsername updates state and writes to localStorage', () => {
    const { result } = renderHook(() => useHistory());
    act(() => result.current.setUsername('Alice'));
    expect(result.current.username).toBe('Alice');
    expect(localStorage.getItem('quizapp:username')).toBe('Alice');
  });

  // ── Behavior 3: cold mount pre-populates username ─────────────────────────
  it('cold mount pre-populates username from localStorage', () => {
    localStorage.setItem('quizapp:username', 'Bob');
    const { result } = renderHook(() => useHistory());
    expect(result.current.username).toBe('Bob');
  });

  // ── Behavior 4: history cold mount ───────────────────────────────────────
  it('history is empty array when localStorage has no prior data', () => {
    const { result } = renderHook(() => useHistory());
    expect(result.current.history).toEqual([]);
  });

  // ── Behavior 5: addAttempt appends ────────────────────────────────────────
  it('addAttempt appends attempt to history and writes to localStorage', () => {
    const { result } = renderHook(() => useHistory());
    const attempt = makeAttempt();
    act(() => result.current.addAttempt(attempt));
    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0]).toEqual(attempt);
    expect(JSON.parse(localStorage.getItem('quizapp:history'))).toEqual([attempt]);
  });

  // ── Behavior 6: multi-attempt accumulation ────────────────────────────────
  it('multiple addAttempt calls accumulate without overwriting', () => {
    const { result } = renderHook(() => useHistory());
    act(() => result.current.addAttempt(makeAttempt({ score: 3 })));
    act(() => result.current.addAttempt(makeAttempt({ score: 5 })));
    expect(result.current.history).toHaveLength(2);
    expect(result.current.history[0].score).toBe(3);
    expect(result.current.history[1].score).toBe(5);
  });

  // ── Behavior 7: cold mount reads pre-existing history ─────────────────────
  it('cold mount reads pre-existing history from localStorage', () => {
    const preExisting = [makeAttempt({ score: 2 }), makeAttempt({ score: 4 })];
    localStorage.setItem('quizapp:history', JSON.stringify(preExisting));
    const { result } = renderHook(() => useHistory());
    expect(result.current.history).toEqual(preExisting);
  });
});
