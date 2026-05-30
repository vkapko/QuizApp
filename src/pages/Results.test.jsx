import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Results from './Results';

const mockNavigate = jest.fn();
const mockAddAttempt = jest.fn();
const mockUseHistory = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../hooks/useHistory', () => ({
  useHistory: (...args) => mockUseHistory(...args),
}));

const sampleQuestions = [
  { text: 'Q1', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'E1' },
  { text: 'Q2', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'E2' },
  { text: 'Q3', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'E3' },
  { text: 'Q4', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'E4' },
  { text: 'Q5', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'E5' },
];

const sampleAttempt = {
  categoryId: 'agent-fundamentals',
  categoryName: 'Agent Fundamentals',
  score: 4,
  total: 5,
  date: '2026-01-01T00:00:00.000Z',
  answers: [
    { selectedIndex: 1, correctIndex: 1 },
    { selectedIndex: 1, correctIndex: 1 },
    { selectedIndex: 1, correctIndex: 1 },
    { selectedIndex: 1, correctIndex: 1 },
    { selectedIndex: 0, correctIndex: 1 },
  ],
  questions: sampleQuestions,
  username: 'Alice',
};

function renderResults(state = sampleAttempt) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/results', state }]}>
      <Routes>
        <Route path="/results" element={<Results />} />
        <Route path="/" element={<div data-testid="home-page">Home</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  mockNavigate.mockClear();
  mockAddAttempt.mockClear();
  mockUseHistory.mockReturnValue({ addAttempt: mockAddAttempt, history: [] });
});

// ── Behavior 1: missing state redirects to / ──────────────────────────────────
it('redirects to / when location.state is missing', () => {
  renderResults(null);
  expect(screen.getByTestId('home-page')).toBeInTheDocument();
});

// ── Behavior 2: ScoreDisplay shows score from attempt ─────────────────────────
it('renders the score and percentage from the attempt', () => {
  renderResults();
  expect(screen.getByText('4 / 5')).toBeInTheDocument();
  expect(screen.getByText('80%')).toBeInTheDocument();
});

// ── Behavior 3: addAttempt called exactly once on mount ───────────────────────
it('calls addAttempt once on mount with the attempt', () => {
  renderResults();
  expect(mockAddAttempt).toHaveBeenCalledTimes(1);
  expect(mockAddAttempt).toHaveBeenCalledWith(sampleAttempt);
});

// ── Behavior 4: history list renders past attempts ────────────────────────────
it('renders history entries with category, score, and date', () => {
  mockUseHistory.mockReturnValue({
    addAttempt: mockAddAttempt,
    history: [
      {
        categoryName: 'Prompt Engineering',
        score: 3,
        total: 5,
        date: '2025-12-01T00:00:00.000Z',
      },
    ],
  });
  renderResults();
  expect(screen.getByText(/Prompt Engineering/)).toBeInTheDocument();
  expect(screen.getByText(/3 \/ 5/)).toBeInTheDocument();
});

// ── Behavior 5: Retake Quiz navigates to /quiz/:categoryId ────────────────────
it('"Retake Quiz" navigates to /quiz/agent-fundamentals', () => {
  renderResults();
  fireEvent.click(screen.getByRole('button', { name: /retake quiz/i }));
  expect(mockNavigate).toHaveBeenCalledWith('/quiz/agent-fundamentals');
});

// ── Behavior 6: Back to Home is a link to / ──────────────────────────────────
it('"Back to Home" is a link to /', () => {
  renderResults();
  const link = screen.getByRole('link', { name: /back to home/i });
  expect(link).toHaveAttribute('href', '/');
});
