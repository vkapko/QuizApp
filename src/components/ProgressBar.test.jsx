import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

// ── Behavior 8: renders progress text ────────────────────────────────────────
it('renders "Question X of Y" text', () => {
  render(<ProgressBar current={1} total={5} />);
  expect(screen.getByText('Question 1 of 5')).toBeInTheDocument();
});

it('updates text when props change', () => {
  const { rerender } = render(<ProgressBar current={1} total={5} />);
  rerender(<ProgressBar current={3} total={5} />);
  expect(screen.getByText('Question 3 of 5')).toBeInTheDocument();
});
