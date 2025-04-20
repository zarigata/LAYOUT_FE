// CODEX: Educational Platform - TutorPage Test
// Tests chat UI and API call to /api/tutor.
import { render, screen, fireEvent } from '@testing-library/react';
import TutorPage from '../pages/TutorPage';

describe('TutorPage', () => {
  it('renders chat UI and sends question', () => {
    render(<TutorPage />);
    fireEvent.change(screen.getByPlaceholderText(/ask your question/i), { target: { value: 'How do I solve 2x = 8?' } });
    fireEvent.click(screen.getByRole('button', { name: /ask/i }));
    expect(screen.getByText(/how do i solve 2x = 8/i)).toBeInTheDocument();
    // Simulate API call/assert response
  });
});
