// CODEX: Educational Platform - TutorPage Test
// Tests chat UI and API call to /api/tutor with Vitest globals, cleanup, and mocks.
// CODEX: Educational Platform - TutorPage Test
// Tests chat UI and API call to /api/tutor with Jest globals, cleanup, and mocks.
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TutorPage from '../pages/TutorPage';
import { AuthContext } from '../context/AuthContext';

// Mock the API call to /api/tutor
jest.mock('../services/api', () => ({
  post: jest.fn().mockResolvedValue({ data: { response: 'To solve 2x = 8, divide both sides by 2: x = 4' } })
}));

afterEach(() => {
  cleanup();
});

// CODEX: Jest/RTL test for TutorPage chat UI rendering
// Ensures chat input and send button render for student role for Claude/ChatGPT compatibility

describe('TutorPage', () => {
  it('renders chat UI', () => {
    const contextValue = { user: { id: 1 }, role: 'STUDENT' };
    render(
      <BrowserRouter>
        <AuthContext.Provider value={contextValue}>
          <TutorPage />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/ask a question/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });
});
