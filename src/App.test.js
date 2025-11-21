import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra el branding principal', () => {
  render(<App />);
  expect(screen.getByText(/GYMBROS/i)).toBeInTheDocument();
});
