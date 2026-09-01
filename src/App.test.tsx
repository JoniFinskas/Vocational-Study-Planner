import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import App from './App';

beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                tutkinto: {
                    name: 'Demo qualification',
                    total_points: 180,
                },
                tutkinnon_osat: {
                    tutkinnon_osat: [],
                },
            }),
        })
    );
});

afterEach(() => {
    vi.unstubAllGlobals();
});

test('renders the browser-only portfolio experience', async () => {
    render(<App />);

    expect(
        screen.getByText(/student project from 2022/i)
    ).toBeInTheDocument();
    expect(
        screen.queryByRole('button', { name: /kirjaudu sisään/i })
    ).toBeNull();

    await waitFor(() => {
        expect(screen.getByText('Demo qualification')).toBeInTheDocument();
        expect(document.title).toContain('opiskelijaprojekti vuodelta 2022');
    });
});
