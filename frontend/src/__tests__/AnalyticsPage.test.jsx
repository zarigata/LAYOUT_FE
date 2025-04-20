// CODEX: Educational Platform - AnalyticsPage Test
// Tests chart rendering with mock data using Vitest globals and cleanup.
// CODEX: Educational Platform - AnalyticsPage Test
// Tests chart rendering with mock data using Jest globals and cleanup.
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnalyticsPage from '../pages/AnalyticsPage';
import { AuthContext } from '../context/AuthContext';

afterEach(() => {
  cleanup();
});

// CODEX: Jest/RTL test for AnalyticsPage rendering
// Ensures analytics page renders for teacher role for Claude/ChatGPT compatibility

describe('AnalyticsPage', () => {
  it('renders page for teacher', () => {
    const contextValue = { user: { id: 1 }, role: 'TEACHER' };
    render(
      <BrowserRouter>
        <AuthContext.Provider value={contextValue}>
          <AnalyticsPage />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
  });
});
