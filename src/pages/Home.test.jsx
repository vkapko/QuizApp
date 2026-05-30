import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Home from './Home';

function LocationDisplay() {
  const loc = useLocation();
  return <div data-testid="location">{loc.pathname}</div>;
}

function renderHome(initialLocalStorage = {}) {
  localStorage.clear();
  Object.entries(initialLocalStorage).forEach(([k, v]) => localStorage.setItem(k, v));
  return render(
    <MemoryRouter>
      <Home />
      <LocationDisplay />
    </MemoryRouter>
  );
}

beforeEach(() => localStorage.clear());

// Cycle 1: username input renders
test('renders username input', () => {
  renderHome();
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
});

// Cycle 2: all 3 category cards render by name
test('renders all 3 category cards', () => {
  renderHome();
  expect(screen.getByText('Agent Fundamentals')).toBeInTheDocument();
  expect(screen.getByText('Prompt Engineering')).toBeInTheDocument();
  expect(screen.getByText('Model Selection')).toBeInTheDocument();
});

// Cycle 3: typing username saves to localStorage immediately (no blur required)
test('saves username to localStorage on change', () => {
  renderHome();
  const input = screen.getByLabelText(/username/i);
  fireEvent.change(input, { target: { value: 'Ada' } });
  expect(localStorage.getItem('quizapp:username')).toBe('Ada');
});

// Cycle 4: pre-fills username from localStorage on mount
test('pre-fills username from localStorage', () => {
  renderHome({ 'quizapp:username': 'Turing' });
  expect(screen.getByLabelText(/username/i)).toHaveValue('Turing');
});

// Cycle 5: clicking a card navigates to /quiz/:categoryId
test('clicking a category card navigates to /quiz/:categoryId', () => {
  renderHome();
  fireEvent.click(screen.getByText('Prompt Engineering'));
  expect(screen.getByTestId('location').textContent).toBe('/quiz/prompt-engineering');
});
