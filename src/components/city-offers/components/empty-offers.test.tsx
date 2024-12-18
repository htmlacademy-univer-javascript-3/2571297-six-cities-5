import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyOffers } from './empty-offers';

describe('EmptyOffers Component', () => {
  const mockCityName = 'Amsterdam';

  const renderComponent = (cityName = mockCityName) => render(<EmptyOffers cityName={cityName} />);

  it('should render no places message', () => {
    renderComponent();
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render city-specific message', () => {
    renderComponent();
    expect(screen.getByText(/We could not find any property available at the moment in Amsterdam/)).toBeInTheDocument();
  });

  it('should have correct structure', () => {
    renderComponent();

    const container = screen.getByTestId('empty-offers');
    expect(container).toHaveClass('cities');
    expect(screen.getByText('No places to stay available')).toHaveClass('cities__status');
    expect(container.querySelector('.cities__places-container')).toHaveClass('cities__places-container--empty');
  });
});
