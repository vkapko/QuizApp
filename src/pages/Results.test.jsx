import { render, screen } from '@testing-library/react';
import Results from './Results';

test('renders Results placeholder', () => {
  render(<Results />);
  expect(screen.getByText(/results/i)).toBeInTheDocument();
});
