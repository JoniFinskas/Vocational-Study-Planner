import { render, screen } from '@testing-library/react';
import HistoricalProjectBanner from './HistoricalProjectBanner';

test('identifies the site as a 2022 student project', () => {
    render(<HistoricalProjectBanner />);

    expect(
        screen.getByText(/student project from 2022/i)
    ).toBeInTheDocument();
    expect(
        screen.getByText(/not an example of my current work/i)
    ).toBeInTheDocument();
});
