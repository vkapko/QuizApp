import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';
import { getCategoryById } from '../api/quizData';
import ProgressBar from '../components/ProgressBar';
import AnswerOption from '../components/AnswerOption';
import styles from './Quiz.module.css';

const USERNAME_KEY = 'quizapp:username';

function Quiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = getCategoryById(categoryId);
  const quiz = useQuiz(category?.questions ?? []);

  useEffect(() => {
    if (category) quiz.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (quiz.phase === 'finished') {
      const attempt = {
        categoryId: category.id,
        categoryName: category.category,
        score: quiz.score,
        total: quiz.totalQuestions,
        date: new Date().toISOString(),
        answers: quiz.answers,
        questions: quiz.questions,
        username: localStorage.getItem(USERNAME_KEY) ?? '',
      };
      navigate('/results', { state: attempt });
    }
  }, [quiz.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!category) {
    return (
      <main className={styles.page}>
        <h2>Category not found</h2>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  if (quiz.phase === 'idle' || !quiz.currentQuestion) {
    return null;
  }

  return (
    <main className={styles.page}>
      <ProgressBar
        current={quiz.currentIndex + 1}
        total={quiz.totalQuestions}
      />
      <h2 className={styles.question}>{quiz.currentQuestion.text}</h2>
      <AnswerOption
        options={quiz.currentQuestion.options}
        correctIndex={quiz.currentQuestion.correctIndex}
        selectedIndex={quiz.phase === 'reviewing'
          ? quiz.answers[quiz.answers.length - 1]?.selectedIndex ?? null
          : null}
        explanation={quiz.currentQuestion.explanation}
        onAnswer={quiz.answer}
      />
      {quiz.phase === 'reviewing' && (
        <button className={styles.nextButton} onClick={quiz.next}>
          Next
        </button>
      )}
    </main>
  );
}

export default Quiz;
