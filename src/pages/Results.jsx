import { useEffect } from 'react';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import { useHistory } from '../hooks/useHistory';
import ScoreDisplay from '../components/ScoreDisplay';
import ReviewPanel from '../components/ReviewPanel';
import styles from './Results.module.css';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addAttempt, history } = useHistory();
  const attempt = location.state;

  useEffect(() => {
    if (attempt) {
      addAttempt(attempt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!attempt) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Quiz Results</h1>

      <ScoreDisplay score={attempt.score} total={attempt.total} />

      <ReviewPanel questions={attempt.questions} answers={attempt.answers} />

      <div className={styles.actions}>
        <button
          className={styles.retakeButton}
          onClick={() => navigate(`/quiz/${attempt.categoryId}`)}
        >
          Retake Quiz
        </button>
        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </div>

      {history.length > 0 && (
        <section className={styles.history}>
          <h2 className={styles.historyHeading}>Past Attempts</h2>
          <ul className={styles.historyList}>
            {history.map((entry, i) => (
              <li key={i} className={styles.historyItem}>
                <span className={styles.historyCategory}>{entry.categoryName}</span>
                <span className={styles.historyScore}>{entry.score} / {entry.total}</span>
                <span className={styles.historyDate}>
                  {new Date(entry.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Results;
