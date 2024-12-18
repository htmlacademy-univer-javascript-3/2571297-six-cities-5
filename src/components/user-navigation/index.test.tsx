import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserNavigation } from './';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../constants';
import { UserData } from '../../types/auth';
import { mockOffer } from '../../mocks/offers';
import { RootState } from '../../types/store';

const mockStore = configureMockStore<RootState>();

describe('Component: UserNavigation', () => {
  const mockUser: UserData = {
    email: 'test@test.com',
    avatarUrl: 'avatar.jpg',
    name: 'Test User',
    token: 'token',
  };

  let store: ReturnType<typeof mockStore>;

  const renderUserNavigation = (favoriteCount = 0, user: UserData | undefined = mockUser) => {
    store = mockStore({
      favoriteOffers: {
        offers: Array(favoriteCount).fill(mockOffer),
        isLoading: false,
        error: null,
      },
      auth: {
        user,
        isLoading: false,
        error: null,
      },
    });

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <UserNavigation />
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    store?.clearActions();
  });

  it('should render user info correctly when authenticated', () => {
    renderUserNavigation();

    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toHaveAttribute('src', mockUser.avatarUrl);
  });

  it('should display correct favorites count when authenticated', () => {
    const favoriteCount = 5;
    renderUserNavigation(favoriteCount);

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
    store = mockStore({
      favoriteOffers: {
        offers: [],
        isLoading: false,
        error: null,
      },
      auth: {
        user: undefined,
        isLoading: false,
        error: null,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UserNavigation />
        </MemoryRouter>
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should handle empty email when authenticated', () => {
    renderUserNavigation(0, { ...mockUser, email: '' });

    expect(screen.queryByText(mockUser.email)).not.toBeInTheDocument();
  });

  it('should render zero favorites count when authenticated', () => {
    renderUserNavigation(0);

    expect(screen.getByText('0')).toHaveClass('header__favorite-count');
  });
});
