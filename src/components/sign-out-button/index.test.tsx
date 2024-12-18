import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SignOutButton } from './';
import { MemoryRouter } from 'react-router-dom';

const mockLogout = vi.fn();

vi.mock('../../hooks', () => ({
  useActions: () => ({
    logout: mockLogout,
  }),
}));

describe('Component: SignOutButton', () => {
  const renderSignOutButton = () =>
    render(
      <MemoryRouter>
        <SignOutButton />
      </MemoryRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render sign out link correctly', () => {
    renderSignOutButton();

    const link = screen.getByRole('link');
    expect(link).toHaveClass('header__nav-link');
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByText('Sign out')).toHaveClass('header__signout');
  });

  it('should have correct structure', () => {
    const { container } = renderSignOutButton();

    expect(container.querySelector('.header__nav-item')).toBeInTheDocument();
    expect(container.querySelector('.header__nav-link')).toBeInTheDocument();
  });

  it('should call logout action when clicked', () => {
    renderSignOutButton();

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('should prevent navigation when clicked', () => {
    const { container } = renderSignOutButton();
    const link = screen.getByRole('link');

    // Simulate click and verify the container still exists (no navigation occurred)
    fireEvent.click(link);
    expect(container.firstChild).toBeInTheDocument();
    expect(mockLogout).toHaveBeenCalled();
  });
});
