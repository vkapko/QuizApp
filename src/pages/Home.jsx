import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import quizData from '../api/quizData';
import styles from './Home.module.css';

const USERNAME_KEY = 'quizapp:username';

function Home() {
  const [username, setUsername] = useState(() => localStorage.getItem(USERNAME_KEY) ?? '');
  const navigate = useNavigate();

  function handleUsernameChange(e) {
    const value = e.target.value;
    setUsername(value);
    localStorage.setItem(USERNAME_KEY, value);
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>AI Dev Quiz</h1>

      <div className={styles.usernameSection}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your name"
        />
      </div>

      <h2 className={styles.subtitle}>Choose a category</h2>
      <div className={styles.cardGrid}>
        {quizData.map((cat) => (
          <button
            key={cat.id}
            className={styles.card}
            onClick={() => navigate(`/quiz/${cat.id}`)}
          >
            {cat.category}
          </button>
        ))}
      </div>
    </main>
  );
}

export default Home;
