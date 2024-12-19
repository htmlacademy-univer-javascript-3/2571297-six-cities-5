import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserNavigation } from './';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { UserData } from '../../types/auth';
import { useAppSelector } from '../../hooks';
import { Mock } from 'vitest';

vi.mock('../../hooks', () => ({
  useAppSelector: vi.fn(),
  useActions: vi.fn(() => ({
    fetchFavorites: vi.fn(),
  })),
}));

describe('Component: UserNavigation', () => {
  const mockUser: UserData = {
    email: 'test@test.com',
    avatarUrl: 'avatar.jpg',
    name: 'Test User',
    token: 'token',
  };

  const renderUserNavigation = () =>
    render(
      <MemoryRouter>
        <UserNavigation />
      </MemoryRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppSelector as Mock).mockReturnValue({
      user: mockUser,
      offers: [],
    });
  });

  it('should render user info correctly when authenticated', () => {
    renderUserNavigation();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toHaveAttribute('src', mockUser.avatarUrl);
  });

  it('should display correct favorites count when authenticated', () => {
    const favoriteCount = 5;
    (useAppSelector as Mock).mockReturnValue({
      user: mockUser,
      offers: Array(favoriteCount).fill({}),
    });

    renderUserNavigation();
    expect(screen.getByText(favoriteCount.toString())).toHaveClass('header__favorite-count');
  });

  it('should link to favorites page when authenticated', () => {
    renderUserNavigation();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', AppRoute.Favorites);
    expect(link).toHaveClass('header__nav-link', 'header__nav-link--profile');
  });

  it('should have correct structure when authenticated', () => {
    const { container } = renderUserNavigation();

    expect(container.querySelector('.header__nav-item')).toHaveClass('user');
    expect(container.querySelector('.header__avatar-wrapper')).toHaveClass('user__avatar-wrapper');
    expect(container.querySelector('.header__user-name')).toHaveClass('user__name');
  });

  it('should not render anything when user is not authenticated', () => {
    (useAppSelector as Mock).mockReturnValue({
      user: null,
      offers: [],
    });

    const { container } = renderUserNavigation();
    expect(container.firstChild).toBeNull();
  });

  it('should handle empty email when authenticated', () => {
    (useAppSelector as Mock).mockReturnValue({
      user: { ...mockUser, email: '' },
      offers: [],
    });

    renderUserNavigation();
    expect(screen.queryByText(mockUser.email)).not.toBeInTheDocument();
  });

  it('should render zero favorites count when authenticated', () => {
    (useAppSelector as Mock).mockReturnValue({
      user: mockUser,
      offers: [],
    });

    renderUserNavigation();
    expect(screen.getByText('0')).toHaveClass('header__favorite-count');
  });
});
