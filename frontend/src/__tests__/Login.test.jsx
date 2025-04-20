// CODEX: Educational Platform - Login Page Test
// Tests login form submission and redirect.
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Login Page', () => {
  it('submits form and redirects on success', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    // Simulate redirect/assert
    expect(await screen.findByText(/dashboard/i)).toBeInTheDocument();
  });
});
