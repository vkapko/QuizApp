import { render, screen } from '@testing-library/react';
import Quiz from './Quiz';

test('renders Quiz placeholder', () => {
  render(<Quiz />);
  expect(screen.getByText(/quiz/i)).toBeInTheDocument();
});
