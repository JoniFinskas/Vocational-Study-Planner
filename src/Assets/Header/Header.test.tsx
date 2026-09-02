import { render, screen } from '@testing-library/react';
import Header from './Header';

test('does not expose account controls in the portfolio demo', () => {
    render(
        <Header
            title="Demo qualification"
            currentOp={0}
            requiredOp={180}
            opinnot={[]}
            alotus="syksy"
        />
    );

    expect(
        screen.queryByRole('button', { name: /kirjaudu sisään/i })
    ).toBeNull();
    expect(
        screen.getByRole('link', { name: /palaa päänäkymään/i })
    ).toHaveAttribute('href', '/');
});
