import { render, screen } from '@testing-library/react';
import ScoreDisplay from './ScoreDisplay';

it('renders score as "X / Y"', () => {
  render(<ScoreDisplay score={4} total={5} />);
  expect(screen.getByText('4 / 5')).toBeInTheDocument();
});

it('renders percentage', () => {
  render(<ScoreDisplay score={4} total={5} />);
  expect(screen.getByText('80%')).toBeInTheDocument();
});

it('shows "Excellent!" for 5/5', () => {
  render(<ScoreDisplay score={5} total={5} />);
  expect(screen.getByText('Excellent!')).toBeInTheDocument();
});

it('shows "Good job! You\'re getting there!" for 4/5', () => {
  render(<ScoreDisplay score={4} total={5} />);
  expect(screen.getByText("Good job! You're getting there!")).toBeInTheDocument();
});

it('shows "Good job! You\'re getting there!" for 3/5', () => {
  render(<ScoreDisplay score={3} total={5} />);
  expect(screen.getByText("Good job! You're getting there!")).toBeInTheDocument();
});

it('shows "Needs review — keep studying!" for 2/5', () => {
  render(<ScoreDisplay score={2} total={5} />);
  expect(screen.getByText('Needs review — keep studying!')).toBeInTheDocument();
});

it('shows "Needs review — keep studying!" for 0/5', () => {
  render(<ScoreDisplay score={0} total={5} />);
  expect(screen.getByText('Needs review — keep studying!')).toBeInTheDocument();
});
