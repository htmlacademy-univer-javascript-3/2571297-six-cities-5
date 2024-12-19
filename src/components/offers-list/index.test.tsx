import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OffersList } from './';
import { mockOffer } from '../../mocks/offers';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Offer, OfferCardType } from '../../types/offer';

const mockStore = configureMockStore();
const mockSetActiveOfferId = vi.fn();

vi.mock('../offer-card', () => ({
  OfferCard: ({
    cardType,
    offer,
    onHover,
  }: {
    cardType: OfferCardType;
    offer: typeof mockOffer;
    onHover?: (id: string | undefined) => void;
  }) => (
    <div data-testid="offer-card" onClick={() => onHover?.(offer.id)}>
      Mock Card {offer.id} - {cardType}
    </div>
  ),
}));

vi.mock('../../hooks', () => ({
  useSorting: vi.fn().mockImplementation((offers: Offer[]) => offers),
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

describe('Component: OffersList', () => {
  const mockOffers = [
    { ...mockOffer, id: '1' },
    { ...mockOffer, id: '2' },
    { ...mockOffer, id: '3' },
  ];

  const renderOffersList = (offers = mockOffers, cardType?: OfferCardType) => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList offers={offers} cardType={cardType} setActiveOfferId={mockSetActiveOfferId} />
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render all offers', () => {
    renderOffersList();

    const cards = screen.getAllByTestId('offer-card');
    expect(cards).toHaveLength(mockOffers.length);
    mockOffers.forEach((offer, index) => {
      expect(cards[index]).toHaveTextContent(`Mock Card ${offer.id}`);
    });
  });

  it('should have correct class names based on card type', () => {
    const cardTypes: Record<OfferCardType, string> = {
      regular: 'cities__places-list places__list tabs__content',
      favorites: 'favorites__places',
      nearest: 'near-places__list places__list',
    };

    Object.entries(cardTypes).forEach(([type, className]) => {
      const { container } = render(
        <Provider store={mockStore()}>
          <MemoryRouter>
            <OffersList offers={mockOffers} cardType={type as OfferCardType} setActiveOfferId={mockSetActiveOfferId} />
          </MemoryRouter>
        </Provider>
      );

      expect(container.firstChild).toHaveClass(className);
    });
  });

  it('should handle hover events', () => {
    renderOffersList();

    const cards = screen.getAllByTestId('offer-card');
    cards.forEach((card, index) => {
      card.click();
      expect(mockSetActiveOfferId).toHaveBeenLastCalledWith(mockOffers[index].id);
    });
  });

  it('should not render anything when offers array is empty', () => {
    renderOffersList([]);
    expect(screen.queryByTestId('offer-card')).not.toBeInTheDocument();
  });

  it('should use regular card type by default', () => {
    renderOffersList();

    const cards = screen.getAllByTestId('offer-card');
    cards.forEach((card) => {
      expect(card).toHaveTextContent('regular');
    });
  });
});
