import styles from './ProgressBar.module.css';

function ProgressBar({ current, total }) {
  return (
    <div className={styles.container}>
      <span className={styles.text}>Question {current} of {total}</span>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
