// CODEX: Educational Platform - AnalyticsPage Test
// Tests chart rendering with mock data.
import { render, screen } from '@testing-library/react';
import AnalyticsPage from '../pages/AnalyticsPage';

describe('AnalyticsPage', () => {
  it('renders charts with mock data', () => {
    render(<AnalyticsPage />);
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });
});
