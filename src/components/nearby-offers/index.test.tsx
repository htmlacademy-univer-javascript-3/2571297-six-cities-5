import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NearbyOffers } from './';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockOffer, mockOfferDetails } from '../../mocks/offers';
import { OfferDetails } from '../../types/offer';

const mockStore = configureMockStore();
const mockFetchNearbyOffers = vi.fn();

vi.mock('../../hooks', () => ({
  useActions: () => ({
    fetchNearbyOffers: mockFetchNearbyOffers,
  }),
  useAppSelector: () => ({
    offers: [mockOffer, mockOffer, mockOffer],
  }),
}));

vi.mock('../map', () => ({
  Map: ({ city, offers }: { city: OfferDetails['city']; offers: OfferDetails[] }) => (
    <div data-testid="map">
      Map Component: {offers.length} offers in {city.name}
    </div>
  ),
}));

vi.mock('../offers-list', () => ({
  OffersList: ({ offers, cardType }: { offers: OfferDetails[]; cardType: string }) => (
    <div data-testid="offers-list">
      Offers List: {offers.length} {cardType} offers
    </div>
  ),
}));

describe('Component: NearbyOffers', () => {
  const renderNearbyOffers = () => {
    const store = mockStore({
      nearbyOffers: {
        offers: [mockOffer, mockOffer, mockOffer],
      },
    });

    render(
      <Provider store={store}>
        <NearbyOffers currentOffer={mockOfferDetails} />
      </Provider>
    );
  };

  it('should render map and offers list', () => {
    renderNearbyOffers();

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
  });

  it('should fetch nearby offers on mount', () => {
    renderNearbyOffers();

    expect(mockFetchNearbyOffers).toHaveBeenCalledWith({ offerId: mockOfferDetails.id });
  });

  it('should display correct title', () => {
    renderNearbyOffers();

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('should pass correct props to child components', () => {
    renderNearbyOffers();

    const map = screen.getByTestId('map');
    const offersList = screen.getByTestId('offers-list');

    expect(map).toHaveTextContent(`Map Component: 3 offers in ${mockOfferDetails.city.name}`);
    expect(offersList).toHaveTextContent('Offers List: 3 nearest offers');
  });

  it('should have correct structure', () => {
    renderNearbyOffers();

    expect(screen.getByTestId('map').parentElement).toHaveClass('offer__map');
    expect(screen.getByTestId('offers-list').parentElement).toHaveClass('near-places', 'places');
  });
});
