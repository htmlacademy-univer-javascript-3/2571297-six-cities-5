import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OfferCard } from './';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockOffer } from '../../mocks/offers';
import { AuthStatus, AppRoute } from '../../constants';
import { MemoryRouter } from 'react-router-dom';
import { OfferCardType } from '../../types/offer';

const mockStore = configureMockStore();
const mockToggleFavorite = vi.fn();
const mockNavigate = vi.fn();

const testOffer = {
  ...mockOffer,
  id: '1',
  isFavorite: false,
};

const favoriteOffer = {
  ...mockOffer,
  id: '1',
  isFavorite: true,
};

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

describe('Component: OfferCard', () => {
  const mockOnHover = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderOfferCard = (offer = testOffer, authStatus = AuthStatus.NoAuth, cardType: OfferCardType = 'regular') => {
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
          <OfferCard offer={offer} onHover={mockOnHover} cardType={cardType} />
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render offer details correctly', () => {
    renderOfferCard();

    expect(screen.getByText(testOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${testOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(testOffer.type.charAt(0).toUpperCase() + testOffer.type.slice(1))).toBeInTheDocument();
    expect(screen.getByAltText(testOffer.title)).toHaveAttribute('src', testOffer.previewImage);
  });

  it('should show Premium mark when offer is premium', () => {
    renderOfferCard();

    if (testOffer.isPremium) {
      expect(screen.getByText('Premium')).toBeInTheDocument();
    } else {
      expect(screen.queryByText('Premium')).not.toBeInTheDocument();
    }
  });

  it('should handle hover events', () => {
    renderOfferCard();
    const card = screen.getByRole('article');

    fireEvent.mouseEnter(card);
    expect(mockOnHover).toHaveBeenCalledWith(testOffer.id);

    fireEvent.mouseLeave(card);
    expect(mockOnHover).toHaveBeenCalledWith(undefined);
  });

  it('should navigate to login when unauthorized user clicks favorite button', () => {
    renderOfferCard(testOffer, AuthStatus.NoAuth);
    const favoriteButton = screen.getByRole('button', { name: /to bookmarks/i });

    fireEvent.click(favoriteButton);
    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('should toggle favorite status when authorized user clicks favorite button', () => {
    renderOfferCard(testOffer, AuthStatus.Auth);
    const nonFavoriteButton = screen.getByRole('button', { name: /to bookmarks/i });
    fireEvent.click(nonFavoriteButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith({
      offerId: '1',
      status: 1,
    });

    mockToggleFavorite.mockClear();
    mockUseAppSelector.mockClear();

    renderOfferCard(favoriteOffer, AuthStatus.Auth);
    const favoriteButton = screen.getByRole('button', { name: /in bookmarks/i });
    fireEvent.click(favoriteButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith({
      offerId: '1',
      status: 0,
    });
  });

  it('should have correct class names based on card type', () => {
    const cardTypes = {
      regular: 'cities',
      favorites: 'favorites',
      nearest: 'near-places',
    } as const;

    Object.entries(cardTypes).forEach(([type, className]) => {
      const { container } = render(
        <Provider store={mockStore()}>
          <MemoryRouter>
            <OfferCard offer={testOffer} cardType={type as keyof typeof cardTypes} />
          </MemoryRouter>
        </Provider>
      );

      const card = container.querySelector(`.${className}__card`);
      expect(card).toBeInTheDocument();
      expect(card?.querySelector(`.${className}__image-wrapper`)).toBeInTheDocument();
    });
  });

  it('should have active bookmark button class when offer is favorite', () => {
    renderOfferCard(favoriteOffer);
    const bookmarkButton = screen.getByRole('button', { name: /in bookmarks/i });
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });
});
