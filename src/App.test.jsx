import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

test('renders Home at /', () => {
  render(<MemoryRouter initialEntries={['/']}><AppRoutes /></MemoryRouter>);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
});

test('renders Quiz at /quiz/:categoryId', () => {
  render(<MemoryRouter initialEntries={['/quiz/1']}><AppRoutes /></MemoryRouter>);
  expect(screen.getByText(/quiz/i)).toBeInTheDocument();
});

test('renders Results at /results', () => {
  render(<MemoryRouter initialEntries={['/results']}><AppRoutes /></MemoryRouter>);
  expect(screen.getByText(/results/i)).toBeInTheDocument();
});
