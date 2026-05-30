import { useState, useCallback } from 'react';

function fisherYatesShuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function useQuiz(questions) {
  const [phase, setPhase] = useState('idle');
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);

  const start = useCallback(() => {
    setShuffledQuestions(fisherYatesShuffle(questions));
    setCurrentIndex(0);
    setAnswers([]);
    setIsCorrect(null);
    setPhase('active');
  }, [questions]);

  const answer = useCallback(
    (selectedIndex) => {
      const question = shuffledQuestions[currentIndex];
      const correct = selectedIndex === question.correctIndex;
      setIsCorrect(correct);
      setAnswers((prev) => [
        ...prev,
        { selectedIndex, correctIndex: question.correctIndex },
      ]);
      setPhase('reviewing');
    },
    [shuffledQuestions, currentIndex],
  );

  const next = useCallback(() => {
    if (currentIndex >= shuffledQuestions.length - 1) {
      setPhase('finished');
    } else {
      setCurrentIndex((prev) => prev + 1);
      setPhase('active');
    }
  }, [currentIndex, shuffledQuestions]);

  return {
    phase,
    currentQuestion: shuffledQuestions[currentIndex] ?? null,
    currentIndex,
    totalQuestions: shuffledQuestions.length,
    questions: shuffledQuestions,
    answers,
    isCorrect,
    score: answers.filter((a) => a.selectedIndex === a.correctIndex).length,
    start,
    answer,
    next,
  };
}
