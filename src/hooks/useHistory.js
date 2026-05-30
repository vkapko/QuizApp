import { useState, useCallback } from 'react';

const USERNAME_KEY = 'quizapp:username';
const HISTORY_KEY = 'quizapp:history';

export function useHistory() {
  const [username, setUsernameState] = useState(
    () => localStorage.getItem(USERNAME_KEY) ?? '',
  );
  const [history, setHistory] = useState(
    () => JSON.parse(localStorage.getItem(HISTORY_KEY) ?? 'null') ?? [],
  );

  const setUsername = useCallback((name) => {
    localStorage.setItem(USERNAME_KEY, name);
    setUsernameState(name);
  }, []);

  const addAttempt = useCallback((attempt) => {
    setHistory((prev) => {
      const next = [...prev, attempt];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { username, setUsername, history, addAttempt };
}
