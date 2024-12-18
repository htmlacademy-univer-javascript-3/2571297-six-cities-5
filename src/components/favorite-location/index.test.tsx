import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoriteLocation } from './';
import { mockOffer } from '../../mocks/offers';

vi.mock('../offers-list', () => ({
  OffersList: ({ offers }: { offers: unknown[] }) => <div data-testid="offers-list">Offers count: {offers.length}</div>,
}));

describe('FavoriteLocation Component', () => {
  const mockOffers = [mockOffer];
  const mockCityName = 'Amsterdam';

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <FavoriteLocation cityName={mockCityName} offers={mockOffers} />
      </MemoryRouter>
    );

  it('should render city name', () => {
    renderComponent();
    expect(screen.getByText(mockCityName)).toBeInTheDocument();
  });

  it('should render offers list', () => {
    renderComponent();
    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
    expect(screen.getByText(`Offers count: ${mockOffers.length}`)).toBeInTheDocument();
  });

  it('should have correct structure', () => {
    renderComponent();
    expect(screen.getByRole('listitem')).toHaveClass('favorites__locations-items');
    expect(screen.getByRole('link')).toHaveClass('locations__item-link');
  });
});
