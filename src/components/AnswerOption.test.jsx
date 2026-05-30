import { render, screen, fireEvent } from '@testing-library/react';
import AnswerOption from './AnswerOption';

const OPTIONS = ['Alpha', 'Beta', 'Gamma', 'Delta'];

function renderAnswerOption(overrides = {}) {
  const props = {
    options: OPTIONS,
    correctIndex: 0,
    selectedIndex: null,
    explanation: 'Because Alpha.',
    onAnswer: jest.fn(),
    ...overrides,
  };
  return { ...render(<AnswerOption {...props} />), onAnswer: props.onAnswer };
}

// ── Behavior 1: renders all options ──────────────────────────────────────────
it('renders all 4 option buttons', () => {
  renderAnswerOption();
  OPTIONS.forEach((opt) =>
    expect(screen.getByRole('button', { name: opt })).toBeInTheDocument(),
  );
});

// ── Behavior 2: click fires onAnswer with correct index ───────────────────────
it('clicking an option fires onAnswer with that option index', () => {
  const { onAnswer } = renderAnswerOption();
  fireEvent.click(screen.getByRole('button', { name: 'Beta' }));
  expect(onAnswer).toHaveBeenCalledWith(1);
});

// ── Behavior 3: buttons disabled after answering ──────────────────────────────
it('all buttons are disabled when selectedIndex is non-null', () => {
  renderAnswerOption({ selectedIndex: 2 });
  screen.getAllByRole('button').forEach((btn) => expect(btn).toBeDisabled());
});

// ── Behavior 4: correct option highlighted green ──────────────────────────────
it('correct option has "correct" class after answering', () => {
  renderAnswerOption({ correctIndex: 0, selectedIndex: 2 });
  expect(screen.getByRole('button', { name: 'Alpha' })).toHaveClass('correct');
});

// ── Behavior 5: wrong selected option highlighted red ─────────────────────────
it('wrong selected option has "incorrect" class after answering', () => {
  renderAnswerOption({ correctIndex: 0, selectedIndex: 2 });
  expect(screen.getByRole('button', { name: 'Gamma' })).toHaveClass('incorrect');
});

// ── Behavior 6: explanation hidden before answering ───────────────────────────
it('explanation is not visible before answering', () => {
  renderAnswerOption({ selectedIndex: null });
  expect(screen.queryByText('Because Alpha.')).not.toBeInTheDocument();
});

// ── Behavior 7: explanation visible after answering ───────────────────────────
it('explanation is visible after answering', () => {
  renderAnswerOption({ selectedIndex: 0 });
  expect(screen.getByText('Because Alpha.')).toBeInTheDocument();
});
