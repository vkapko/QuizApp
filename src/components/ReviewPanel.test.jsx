import { render, screen } from '@testing-library/react';
import ReviewPanel from './ReviewPanel';

const questions = [
  {
    text: 'Question 1 text',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctIndex: 1,
    explanation: 'Explanation 1',
  },
  {
    text: 'Question 2 text',
    options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
    correctIndex: 2,
    explanation: 'Explanation 2',
  },
];

const answers = [
  { selectedIndex: 1, correctIndex: 1 }, // correct
  { selectedIndex: 0, correctIndex: 2 }, // wrong
];

it('renders all question texts', () => {
  render(<ReviewPanel questions={questions} answers={answers} />);
  expect(screen.getByText('Question 1 text')).toBeInTheDocument();
  expect(screen.getByText('Question 2 text')).toBeInTheDocument();
});

it("shows the user's selected answer text for each question", () => {
  render(<ReviewPanel questions={questions} answers={answers} />);
  expect(screen.getByText('You answered: Option B')).toBeInTheDocument();
  expect(screen.getByText('You answered: Choice 1')).toBeInTheDocument();
});

it('shows the correct answer text when the user was wrong', () => {
  render(<ReviewPanel questions={questions} answers={answers} />);
  expect(screen.getByText('Correct answer: Choice 3')).toBeInTheDocument();
});
