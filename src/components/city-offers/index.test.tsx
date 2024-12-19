import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CityOffers } from './index';
import { mockOffer } from '../../mocks/offers';
import { Cities, DEFAULT_SORT_OPTION } from '../../constants';
import { useAppSelector } from '../../hooks';
import { Mock } from 'vitest';
import { Offer } from '../../types/offer';

vi.mock('../offers-list', () => ({
  OffersList: ({ offers }: { offers: unknown[] }) => <div data-testid="offers-list">Offers: {offers.length}</div>,
}));

vi.mock('../map', () => ({
  Map: () => <div data-testid="map">Map Component</div>,
}));

vi.mock('../sorting-form', () => ({
  SortingForm: () => <div data-testid="sorting-form">Sorting Form</div>,
}));

vi.mock('../../hooks', () => ({
  useAppSelector: vi.fn(),
  useActions: vi.fn(),
  useAppDispatch: vi.fn(),
  useSorting: vi.fn().mockImplementation((offers: Offer[]) => offers),
}));

describe('CityOffers Component', () => {
  const mockOffers = [
    { ...mockOffer, id: '1' },
    { ...mockOffer, id: '2' },
    { ...mockOffer, id: '3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppSelector as Mock).mockReturnValue({
      city: Cities.Paris,
      sortOption: DEFAULT_SORT_OPTION,
      isServerUnavailable: false,
    });
  });

  const renderComponent = (offers = mockOffers) => render(<CityOffers offers={offers} />);

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
    (useAppSelector as Mock).mockReturnValue({
      city: Cities.Amsterdam,
      sortOption: DEFAULT_SORT_OPTION,
      isServerUnavailable: false,
    });

    renderComponent();
    expect(screen.getByText(`${mockOffers.length} places to stay in ${Cities.Amsterdam}`)).toBeInTheDocument();
  });
});
