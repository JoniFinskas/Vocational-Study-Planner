import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import App from './App';

beforeEach(() => {
    localStorage.clear();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
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
    vi.restoreAllMocks();
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

test('closes target tracking with its close button or the Escape key', async () => {
    render(<App />);

    await screen.findByText('Demo qualification');

    fireEvent.click(
        screen.getByRole('button', { name: /tavoiteseuranta/i })
    );
    const closeButton = screen.getByRole('button', {
        name: /sulje tavoiteseuranta/i,
    });
    expect(closeButton).toBeInTheDocument();
    expect(document.getElementById('Tavoite-seuranta')).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(document.getElementById('Tavoite-seuranta')).toBeNull();

    fireEvent.click(
        screen.getByRole('button', { name: /tavoiteseuranta/i })
    );
    expect(document.getElementById('Tavoite-seuranta')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.getElementById('Tavoite-seuranta')).toBeNull();
});
