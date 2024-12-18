import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OfferDetails } from './';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockOfferDetails } from '../../mocks/offers';
import { AuthStatus, AppRoute } from '../../constants';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore();
const mockToggleFavorite = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockUseAppSelector = vi.fn(() => ({
  authorizationStatus: AuthStatus.NoAuth,
}));

vi.mock('../../hooks', () => ({
  useActions: () => ({
    toggleFavorite: mockToggleFavorite,
  }),
  useAppSelector: () => mockUseAppSelector(),
}));

vi.mock('../review-section', () => ({
  ReviewSection: ({ offerId }: { offerId: string }) => (
    <div data-testid="review-section">Review Section for {offerId}</div>
  ),
}));

describe('Component: OfferDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderOfferDetails = (authStatus = AuthStatus.NoAuth) => {
    const store = mockStore({
      auth: {
        data: {
          authorizationStatus: authStatus,
        },
      },
    });

    mockUseAppSelector.mockReturnValue({
      authorizationStatus: authStatus,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferDetails offer={mockOfferDetails} />
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render all offer details correctly', () => {
    renderOfferDetails();

    expect(screen.getByText(mockOfferDetails.title)).toBeInTheDocument();
    expect(screen.getByText(mockOfferDetails.type)).toBeInTheDocument();
    expect(screen.getByText(`${mockOfferDetails.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${mockOfferDetails.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOfferDetails.price}`)).toBeInTheDocument();

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(mockOfferDetails.host.name)).toBeInTheDocument();
    expect(screen.getByText(mockOfferDetails.description)).toBeInTheDocument();

    // eslint-disable-next-line quotes
    expect(screen.getByText("What's inside")).toBeInTheDocument();
    mockOfferDetails.goods.forEach((good: string) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should show Premium mark when offer is premium', () => {
    renderOfferDetails();

    if (mockOfferDetails.isPremium) {
      expect(screen.getByText('Premium')).toBeInTheDocument();
    } else {
      expect(screen.queryByText('Premium')).not.toBeInTheDocument();
    }
  });

  it('should show Pro badge when host is pro', () => {
    renderOfferDetails();

    if (mockOfferDetails.host.isPro) {
      expect(screen.getByText('Pro')).toBeInTheDocument();
    } else {
      expect(screen.queryByText('Pro')).not.toBeInTheDocument();
    }
  });

  it('should navigate to login when unauthorized user clicks favorite button', () => {
    renderOfferDetails(AuthStatus.NoAuth);
    const favoriteButton = screen.getByRole('button', {
      name: mockOfferDetails.isFavorite ? 'In bookmarks' : 'To bookmarks',
    });

    fireEvent.click(favoriteButton);
    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('should toggle favorite status when authorized user clicks favorite button', () => {
    renderOfferDetails(AuthStatus.Auth);
    const favoriteButton = screen.getByRole('button', {
      name: mockOfferDetails.isFavorite ? 'In bookmarks' : 'To bookmarks',
    });

    fireEvent.click(favoriteButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith({
      offerId: mockOfferDetails.id,
      status: mockOfferDetails.isFavorite ? 0 : 1,
    });
  });

  it('should show review section only for authorized users', () => {
    renderOfferDetails(AuthStatus.NoAuth);
    expect(screen.queryByTestId('review-section')).not.toBeInTheDocument();

    renderOfferDetails(AuthStatus.Auth);
    expect(screen.getByTestId('review-section')).toBeInTheDocument();
  });

  it('should render all images in gallery', () => {
    renderOfferDetails();

    mockOfferDetails.images.forEach((image: string) => {
      const img = screen.getByAltText('Photo studio');
      expect(img).toHaveAttribute('src', image);
    });
  });
});
