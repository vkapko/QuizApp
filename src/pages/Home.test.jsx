import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Home placeholder', () => {
  render(<Home />);
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
