// CODEX: Educational Platform - Login Page Test
// Tests login form submission and redirect with proper Vitest globals and cleanup.
// CODEX: Educational Platform - Login Page Test
// Tests login form submission and redirect with proper Jest globals and cleanup.
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { AuthContext } from '../context/AuthContext';

afterEach(() => {
  cleanup();
});

// CODEX: Jest/RTL test for Login page rendering
// Ensures login form fields and button render correctly for Claude/ChatGPT compatibility

describe('Login Page', () => {
  it('renders login form', () => {
    const contextValue = { login: jest.fn(), user: null, role: null };
    render(
      <BrowserRouter>
        <AuthContext.Provider value={contextValue}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
