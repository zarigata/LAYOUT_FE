// CODEX: Educational Platform - NavBar Test
// Tests role-based links in NavBar.
import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';

describe('NavBar', () => {
  it('shows admin links for admin', () => {
    render(
      <AuthContext.Provider value={{ user: { role: 'ADMIN' } }}>
        <NavBar />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/admin portal/i)).toBeInTheDocument();
  });
  it('shows teacher links for teacher', () => {
    render(
      <AuthContext.Provider value={{ user: { role: 'TEACHER' } }}>
        <NavBar />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/teacher dashboard/i)).toBeInTheDocument();
  });
  it('shows student links for student', () => {
    render(
      <AuthContext.Provider value={{ user: { role: 'STUDENT' } }}>
        <NavBar />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/student dashboard/i)).toBeInTheDocument();
  });
});
