import { render, screen } from '@testing-library/react';
import DailyDive from './DailyDive';

test('renders learn react link', () => {
  render(<DailyDive />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
