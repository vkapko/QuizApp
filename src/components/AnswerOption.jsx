import styles from './AnswerOption.module.css';

function AnswerOption({ options, correctIndex, selectedIndex, explanation, onAnswer }) {
  const answered = selectedIndex !== null;

  function getButtonClass(index) {
    if (!answered) return styles.option;
    if (index === correctIndex) return `${styles.option} ${styles.correct}`;
    if (index === selectedIndex) return `${styles.option} ${styles.incorrect}`;
    return styles.option;
  }

  return (
    <div className={styles.container}>
      {options.map((text, index) => (
        <button
          key={index}
          className={getButtonClass(index)}
          disabled={answered}
          onClick={() => onAnswer(index)}
        >
          {text}
        </button>
      ))}
      {answered && <p className={styles.explanation}>{explanation}</p>}
    </div>
  );
}

export default AnswerOption;
