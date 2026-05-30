import styles from './ReviewPanel.module.css';

function ReviewPanel({ questions, answers }) {
  return (
    <section className={styles.panel}>
      {questions.map((q, i) => {
        const { selectedIndex, correctIndex } = answers[i];
        const isCorrect = selectedIndex === correctIndex;
        return (
          <div key={i} className={styles.item}>
            <p className={styles.question}>{q.text}</p>
            <p className={isCorrect ? styles.correct : styles.wrong}>
              You answered: {q.options[selectedIndex]}
            </p>
            {!isCorrect && (
              <p className={styles.correctAnswer}>
                Correct answer: {q.options[correctIndex]}
              </p>
            )}
          </div>
        );
      })}
    </section>
  );
}

export default ReviewPanel;
