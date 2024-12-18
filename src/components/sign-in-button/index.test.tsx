import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignInButton } from './';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../constants';

describe('Component: SignInButton', () => {
  it('should render sign in link correctly', () => {
    render(
      <MemoryRouter>
        <SignInButton />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('header__nav-link', 'header__nav-link--profile');
    expect(link).toHaveAttribute('href', AppRoute.Login);
  });

  it('should have correct structure', () => {
    const { container } = render(
      <MemoryRouter>
        <SignInButton />
      </MemoryRouter>
    );

    expect(container.querySelector('.header__nav-item')).toHaveClass('user');
    expect(container.querySelector('.header__avatar-wrapper')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toHaveClass('header__login');
  });
});
