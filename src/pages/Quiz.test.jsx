import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Quiz from './Quiz';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  mockNavigate.mockClear();
  localStorage.clear();
});

function renderQuiz(categoryId = 'agent-fundamentals') {
  return render(
    <MemoryRouter initialEntries={[`/quiz/${categoryId}`]}>
      <Routes>
        <Route path="/quiz/:categoryId" element={<Quiz />} />
      </Routes>
    </MemoryRouter>,
  );
}

// ── Behavior 13: unknown category shows "Category not found" ─────────────────
it('renders "Category not found" for an unknown categoryId', () => {
  renderQuiz('does-not-exist');
  expect(screen.getByText(/category not found/i)).toBeInTheDocument();
});

// ── Behavior 14: "Category not found" view links back to / ───────────────────
it('"Category not found" view contains a link back to /', () => {
  renderQuiz('does-not-exist');
  const link = screen.getByRole('link', { name: /home/i });
  expect(link).toHaveAttribute('href', '/');
});

// ── Behavior 9: renders progress and question on mount ────────────────────────
it('shows "Question 1 of 5" and a question on mount', () => {
  renderQuiz('agent-fundamentals');
  expect(screen.getByText('Question 1 of 5')).toBeInTheDocument();
  expect(screen.getAllByRole('button').length).toBe(4);
});

// ── Behavior 10: Next button appears after answering ─────────────────────────
it('shows Next button after clicking an answer option', () => {
  renderQuiz('agent-fundamentals');
  fireEvent.click(screen.getAllByRole('button')[0]);
  expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
});

// ── Behavior 11: progress advances after Next ─────────────────────────────────
it('progress updates to "Question 2 of 5" after answering and clicking Next', () => {
  renderQuiz('agent-fundamentals');
  fireEvent.click(screen.getAllByRole('button')[0]);
  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  expect(screen.getByText('Question 2 of 5')).toBeInTheDocument();
});

// ── Behavior 12: navigates to /results with attempt after all questions ───────
it('navigates to /results with attempt object after completing all questions', () => {
  renderQuiz('agent-fundamentals');
  for (let i = 0; i < 5; i++) {
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
  }
  expect(mockNavigate).toHaveBeenCalledWith(
    '/results',
    expect.objectContaining({
      state: expect.objectContaining({
        categoryId: 'agent-fundamentals',
        categoryName: 'Agent Fundamentals',
        total: 5,
        answers: expect.arrayContaining([
          expect.objectContaining({ selectedIndex: expect.any(Number), correctIndex: expect.any(Number) }),
        ]),
      }),
    }),
  );
});
