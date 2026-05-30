import { renderHook, act } from '@testing-library/react';
import { useQuiz } from './useQuiz';

const makeQuestions = (count = 3) =>
  Array.from({ length: count }, (_, i) => ({
    text: `Question ${i}`,
    options: ['A', 'B', 'C', 'D'],
    correctIndex: i % 4,
    explanation: `Explanation ${i}`,
  }));

describe('useQuiz', () => {
  // ── Behavior 1: initial state ──────────────────────────────────────────────
  it('starts in idle phase', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions()));
    expect(result.current.phase).toBe('idle');
  });

  // ── Behavior 2: start() ────────────────────────────────────────────────────
  it('start() transitions phase to active', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions()));
    act(() => result.current.start());
    expect(result.current.phase).toBe('active');
  });

  it('start() sets totalQuestions to input length', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(5)));
    act(() => result.current.start());
    expect(result.current.totalQuestions).toBe(5);
  });

  it('start() exposes a currentQuestion with required shape', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions()));
    act(() => result.current.start());
    expect(result.current.currentQuestion).toHaveProperty('text');
    expect(result.current.currentQuestion).toHaveProperty('options');
    expect(result.current.currentQuestion).toHaveProperty('correctIndex');
  });

  it('start() sets currentIndex to 0', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions()));
    act(() => result.current.start());
    expect(result.current.currentIndex).toBe(0);
  });

  // ── Behavior 3 & 4: answer() phase + isCorrect ─────────────────────────────
  it('answer(correctIndex) transitions phase to reviewing with isCorrect true', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions()));
    act(() => result.current.start());
    const { correctIndex } = result.current.currentQuestion;
    act(() => result.current.answer(correctIndex));
    expect(result.current.phase).toBe('reviewing');
    expect(result.current.isCorrect).toBe(true);
  });

  it('answer(wrongIndex) sets isCorrect to false', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions()));
    act(() => result.current.start());
    const { correctIndex } = result.current.currentQuestion;
    const wrongIndex = (correctIndex + 1) % 4;
    act(() => result.current.answer(wrongIndex));
    expect(result.current.phase).toBe('reviewing');
    expect(result.current.isCorrect).toBe(false);
  });

  // ── Behavior 5: answer() records to answers ────────────────────────────────
  it('answer() appends { selectedIndex, correctIndex } to answers', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions()));
    act(() => result.current.start());
    const { correctIndex } = result.current.currentQuestion;
    act(() => result.current.answer(correctIndex));
    expect(result.current.answers).toHaveLength(1);
    expect(result.current.answers[0]).toEqual({ selectedIndex: correctIndex, correctIndex });
  });

  // ── Behavior 6: next() mid-quiz ────────────────────────────────────────────
  it('next() during reviewing advances currentIndex and returns phase to active', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(3)));
    act(() => result.current.start());
    act(() => result.current.answer(0));
    act(() => result.current.next());
    expect(result.current.phase).toBe('active');
    expect(result.current.currentIndex).toBe(1);
  });

  // ── Behavior 7: next() on last question ───────────────────────────────────
  it('next() after the last question transitions phase to finished', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(2)));
    act(() => result.current.start());
    // first question
    act(() => result.current.answer(0));
    act(() => result.current.next());
    // second (last) question
    act(() => result.current.answer(0));
    act(() => result.current.next());
    expect(result.current.phase).toBe('finished');
  });

  // ── Behavior 8: score computation ─────────────────────────────────────────
  it('score counts correct answers across the full quiz', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(3)));
    act(() => result.current.start());

    // Q0: answer correctly
    act(() => result.current.answer(result.current.currentQuestion.correctIndex));
    act(() => result.current.next());

    // Q1: answer incorrectly
    const wrong = (result.current.currentQuestion.correctIndex + 1) % 4;
    act(() => result.current.answer(wrong));
    act(() => result.current.next());

    // Q2: answer correctly
    act(() => result.current.answer(result.current.currentQuestion.correctIndex));
    act(() => result.current.next());

    expect(result.current.phase).toBe('finished');
    expect(result.current.score).toBe(2);
  });

  // ── Behavior 9: shuffle completeness ──────────────────────────────────────
  it('shuffle produces all input questions with no drops or duplicates', () => {
    const questions = makeQuestions(5);
    const { result } = renderHook(() => useQuiz(questions));
    act(() => result.current.start());

    const seen = [];
    for (let i = 0; i < questions.length; i++) {
      seen.push(result.current.currentQuestion.text);
      if (i < questions.length - 1) {
        act(() => result.current.answer(0));
        act(() => result.current.next());
      }
    }

    expect(seen).toHaveLength(questions.length);
    expect(seen.sort()).toEqual(questions.map((q) => q.text).sort());
  });
});
