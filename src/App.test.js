import { render, screen } from '@testing-library/react';
import App from './App';

test("checks if the title contains 'React App'", () => {
  render(<App />);
  const titleElement = screen.getByText(/React App/i); // Case insensitive match
  expect(titleElement).toBeInTheDocument();
});
