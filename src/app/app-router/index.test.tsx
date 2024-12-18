import { render, screen, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { MemoryRouter, Navigate, useLocation } from 'react-router-dom';
import { AppRoute, AuthStatus, Cities, SortOption } from '../../constants';
import { RootState } from '../../types/store';
import { useAppSelector } from '../../hooks';
import { AppRouter } from '.';

vi.mock('../../pages/main-page', () => ({ MainPage: () => <div>Main Page</div> }));
vi.mock('../../pages/login-page', () => ({ LoginPage: () => <div>Login Page</div> }));
vi.mock('../../pages/favorites-page', () => ({ FavoritesPage: () => <div>Favorites Page</div> }));
vi.mock('../../pages/offer-page', () => ({ OfferPage: () => <div>Offer Page</div> }));
vi.mock('../../pages/not-found-page', () => ({ NotFoundPage: () => <div>404 Page</div> }));

vi.mock('../../hooks', () => ({
  useActions: () => ({
    checkAuth: vi.fn(),
    fetchFavorites: vi.fn(),
  }),
  useAppSelector: vi.fn(),
}));

vi.mock('../../components/private-route', () => ({
  PrivateRoute: ({ children }: { children: JSX.Element }) => {
    const auth = useAppSelector((state: RootState) => state.auth);
    return auth.authorizationStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login} replace />;
  },
}));

const mockStore = configureMockStore<RootState>();

const defaultState: RootState = {
  auth: {
    authorizationStatus: AuthStatus.NoAuth,
    user: null,
    isLoading: false,
    error: null,
  },
  favoriteOffers: {
    offers: [],
    isLoading: false,
    error: null,
  },
  offers: {
    offers: [],
    isLoading: false,
    error: null,
  },
  offerDetails: {
    offer: null,
    isLoading: false,
    error: null,
  },
  nearbyOffers: {
    offers: [],
    isLoading: false,
    error: null,
  },
  comments: {
    comments: [],
    isLoading: false,
    error: null,
  },
  common: {
    city: Cities.Paris,
    sortOption: SortOption.Popular,
  },
} as const;

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

const renderWithProviders = (
  component: JSX.Element,
  initialState: RootState = defaultState,
  initialEntries: string[] = [AppRoute.Home]
): ReturnType<typeof render> => {
  const store = mockStore(initialState);

  vi.mocked(useAppSelector).mockImplementation((selector) => selector(initialState));

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        {component}
        <LocationDisplay />
      </MemoryRouter>
    </Provider>
  );
};

describe('App Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Main Page on default route', async () => {
    renderWithProviders(<AppRouter />);
    await waitFor(() => {
      expect(screen.getByText('Main Page')).toBeInTheDocument();
    });
  });

  it('should render Login Page when navigating to /login', async () => {
    renderWithProviders(<AppRouter />, defaultState, [AppRoute.Login]);
    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  it('should render Favorites Page when user is authorized', async () => {
    const authorizedState: RootState = {
      ...defaultState,
      auth: {
        ...defaultState.auth,
        authorizationStatus: AuthStatus.Auth,
      },
    };

    renderWithProviders(<AppRouter />, authorizedState, [AppRoute.Favorites]);
    await waitFor(() => {
      expect(screen.getByText('Favorites Page')).toBeInTheDocument();
    });
  });

  it('should render 404 Page for an unknown route', async () => {
    renderWithProviders(<AppRouter />, defaultState, ['/unknown']);
    await waitFor(() => {
      expect(screen.getByText('404 Page')).toBeInTheDocument();
    });
  });

  it('should render Offer Page for /offer/:id route', async () => {
    renderWithProviders(<AppRouter />, defaultState, [`${AppRoute.Offer}1`]);
    await waitFor(() => {
      expect(screen.getByText('Offer Page')).toBeInTheDocument();
    });
  });

  it('should redirect to login when accessing favorites without auth', async () => {
    renderWithProviders(<AppRouter />, defaultState, [AppRoute.Favorites]);
    await waitFor(() => {
      expect(screen.getByTestId('location-display')).toHaveTextContent(AppRoute.Login);
    });
  });
});
