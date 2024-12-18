import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferFeatures } from './offer-features';

describe('Component: OfferFeatures', () => {
  const mockProps = {
    type: 'Apartment',
    bedrooms: 2,
    maxAdults: 4,
    price: 120,
  };

  it('should render all features correctly', () => {
    render(<OfferFeatures {...mockProps} />);

    expect(screen.getByText(mockProps.type)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${mockProps.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(`€${mockProps.price}`)).toBeInTheDocument();
  });

  it('should have correct structure', () => {
    const { container } = render(<OfferFeatures {...mockProps} />);

    const features = container.querySelectorAll('.offer__feature');
    expect(features).toHaveLength(3);
    expect(features[0]).toHaveClass('offer__feature--entire');
    expect(features[1]).toHaveClass('offer__feature--bedrooms');
    expect(features[2]).toHaveClass('offer__feature--adults');
  });

  it('should render price with correct format', () => {
    render(<OfferFeatures {...mockProps} />);

    const priceValue = screen.getByText(`€${mockProps.price}`);
    const priceText = screen.getByText('night');

    expect(priceValue).toHaveClass('offer__price-value');
    expect(priceText).toHaveClass('offer__price-text');
  });
});
