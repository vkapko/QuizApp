import quizData, { getCategoryById } from './quizData';

describe('quizData', () => {
  test('exports an array of 3 categories', () => {
    expect(Array.isArray(quizData)).toBe(true);
    expect(quizData).toHaveLength(3);
  });

  test('each category has id, category, and questions fields', () => {
    quizData.forEach((cat) => {
      expect(cat).toHaveProperty('id');
      expect(cat).toHaveProperty('category');
      expect(cat).toHaveProperty('questions');
      expect(Array.isArray(cat.questions)).toBe(true);
    });
  });

  test('each category has exactly 5 questions', () => {
    quizData.forEach((cat) => {
      expect(cat.questions).toHaveLength(5);
    });
  });

  test('each question has text, options (4 strings), correctIndex, and explanation', () => {
    quizData.forEach((cat) => {
      cat.questions.forEach((q) => {
        expect(typeof q.text).toBe('string');
        expect(q.text.length).toBeGreaterThan(0);
        expect(Array.isArray(q.options)).toBe(true);
        expect(q.options).toHaveLength(4);
        q.options.forEach((opt) => expect(typeof opt).toBe('string'));
        expect(typeof q.correctIndex).toBe('number');
        expect(typeof q.explanation).toBe('string');
        expect(q.explanation.length).toBeGreaterThan(0);
      });
    });
  });

  test('all correctIndex values are in range [0, 3]', () => {
    quizData.forEach((cat) => {
      cat.questions.forEach((q) => {
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThanOrEqual(3);
      });
    });
  });

  test('categories cover the three required topics', () => {
    const ids = quizData.map((c) => c.id);
    expect(ids).toContain('agent-fundamentals');
    expect(ids).toContain('prompt-engineering');
    expect(ids).toContain('model-selection');
  });
});

describe('getCategoryById', () => {
  test('returns the matching category for a known id', () => {
    const cat = getCategoryById('agent-fundamentals');
    expect(cat).toBeDefined();
    expect(cat.id).toBe('agent-fundamentals');
  });

  test('returns undefined for an unknown id', () => {
    expect(getCategoryById('does-not-exist')).toBeUndefined();
  });
});
