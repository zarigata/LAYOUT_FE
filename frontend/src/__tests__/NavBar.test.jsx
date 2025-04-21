// CODEX: Educational Platform - NavBar Test
// Tests role-based links in NavBar with proper Vitest globals and cleanup.
// CODEX: Educational Platform - NavBar Test
// Tests role-based links in NavBar with proper Jest globals and cleanup.
// CODEX: Jest/RTL test for NavBar role-based rendering
// Ensures admin and tutor links render for correct roles for Claude/ChatGPT compatibility
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';

describe('NavBar', () => {
  it('shows admin links for admin', () => {
    const contextValue = { user: { id: 1 }, role: 'ADMIN' };
    render(
      <BrowserRouter>
        <AuthContext.Provider value={contextValue}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });

  it('shows tutor link for student', () => {
    const contextValue = { user: { id: 1 }, role: 'STUDENT' };
    render(
      <BrowserRouter>
        <AuthContext.Provider value={contextValue}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/tutor/i)).toBeInTheDocument();
  });
});

describe('NavBar', () => {
  it('shows admin links for admin', () => {
    const contextValue = { user: { id: 1 }, role: 'ADMIN' };
    render(
      <BrowserRouter>
        <AuthContext.Provider value={contextValue}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });

  it('shows tutor link for student', () => {
    const contextValue = { user: { id: 1 }, role: 'STUDENT' };
    render(
      <BrowserRouter>
        <AuthContext.Provider value={contextValue}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/tutor/i)).toBeInTheDocument();
  });
});
