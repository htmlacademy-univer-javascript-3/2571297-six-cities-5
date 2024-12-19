import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './';
import { AuthStatus } from '../../constants';
import { useAppSelector } from '../../hooks';

vi.mock('../user-navigation', () => ({
  UserNavigation: () => <div data-testid="user-navigation">User Navigation</div>,
}));

vi.mock('../sign-out-button', () => ({
  SignOutButton: () => <div data-testid="sign-out-button">Sign Out</div>,
}));

vi.mock('../sign-in-button', () => ({
  SignInButton: () => <div data-testid="sign-in-button">Sign In</div>,
}));

vi.mock('../../hooks', () => ({
  useActions: vi.fn(),
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Header Component', () => {
  const renderComponent = (props = {}) =>
    render(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );

  it('should render logo', () => {
    (useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthStatus.NoAuth });
    renderComponent();

    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('alt', '6 cities logo');
    expect(logo).toHaveAttribute('src', 'img/logo.svg');
  });

  it('should show sign-in button when unauthorized', () => {
    (useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthStatus.NoAuth });
    renderComponent();

    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
    expect(screen.queryByTestId('user-navigation')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sign-out-button')).not.toBeInTheDocument();
  });

  it('should show user navigation and sign-out button when authorized', () => {
    (useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthStatus.Auth });
    renderComponent();

    expect(screen.getByTestId('user-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument();
  });

  it('should not show navigation when isNavVisible is false', () => {
    (useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthStatus.Auth });
    renderComponent({ isNavVisible: false });

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('should not show user navigation when showUserNav is false', () => {
    (useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthStatus.Auth });
    renderComponent({ showUserNav: false });

    expect(screen.queryByTestId('user-navigation')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sign-out-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument();
  });

  it('should have correct structure', () => {
    (useAppSelector as Mock).mockReturnValue({ authorizationStatus: AuthStatus.NoAuth });
    renderComponent();

    expect(screen.getByRole('banner')).toHaveClass('header');
    expect(screen.getByRole('link')).toHaveClass('header__logo-link', 'header__logo-link--active');
  });
});
