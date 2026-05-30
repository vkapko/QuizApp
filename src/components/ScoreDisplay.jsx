import styles from './ScoreDisplay.module.css';

function getLabel(score, total) {
  const pct = score / total;
  if (pct === 1) return 'Excellent!';
  if (pct >= 0.6) return "Good job! You're getting there!";
  return 'Needs review — keep studying!';
}

function ScoreDisplay({ score, total }) {
  const pct = Math.round((score / total) * 100);
  return (
    <div className={styles.container}>
      <p className={styles.score}>{score} / {total}</p>
      <p className={styles.percentage}>{pct}%</p>
      <p className={styles.label}>{getLabel(score, total)}</p>
    </div>
  );
}

export default ScoreDisplay;
