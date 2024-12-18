import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CityOffers } from './index';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { commonReducer } from '../../store/common';
import { mockOffer } from '../../mocks/offers';
import { Cities, SortOption } from '../../constants';

// Mock child components
vi.mock('../offers-list', () => ({
  OffersList: ({ offers }: { offers: unknown[] }) => <div data-testid="offers-list">Offers: {offers.length}</div>,
}));

vi.mock('../map', () => ({
  Map: () => <div data-testid="map">Map Component</div>,
}));

vi.mock('../sorting-form', () => ({
  SortingForm: () => <div data-testid="sorting-form">Sorting Form</div>,
}));

describe('CityOffers Component', () => {
  const mockOffers = [
    { ...mockOffer, id: '1' },
    { ...mockOffer, id: '2' },
    { ...mockOffer, id: '3' },
  ];

  const createStore = (city = Cities.Paris) =>
    configureStore({
      reducer: {
        common: commonReducer,
      },
      preloadedState: {
        common: {
          city,
          sortOption: SortOption.Popular,
        },
      },
    });

  const renderComponent = (offers = mockOffers) => {
    const store = createStore();
    return render(
      <Provider store={store}>
        <CityOffers offers={offers} />
      </Provider>
    );
  };

  it('should render offers count and city name', () => {
    renderComponent();
    expect(screen.getByText(`${mockOffers.length} places to stay in ${Cities.Paris}`)).toBeInTheDocument();
  });

  it('should render all required components when has offers', () => {
    renderComponent();

    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('sorting-form')).toBeInTheDocument();
  });

  it('should render EmptyOffers when no offers available', () => {
    renderComponent([]);
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should have correct structure when has offers', () => {
    renderComponent();

    const container = screen.getByTestId('offers-list').closest('.cities');
    expect(container).toHaveClass('cities');
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass('visually-hidden');
    expect(screen.getByText(/places to stay in/)).toHaveClass('places__found');
  });

  it('should display correct number of offers', () => {
    renderComponent();
    expect(screen.getByTestId('offers-list')).toHaveTextContent(`Offers: ${mockOffers.length}`);
  });

  it('should handle different city names', () => {
    const store = createStore(Cities.Amsterdam);
    render(
      <Provider store={store}>
        <CityOffers offers={mockOffers} />
      </Provider>
    );

    expect(screen.getByText(`${mockOffers.length} places to stay in ${Cities.Amsterdam}`)).toBeInTheDocument();
  });
});
