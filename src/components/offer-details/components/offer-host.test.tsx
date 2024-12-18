import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferHost } from './offer-host';

describe('Component: OfferHost', () => {
  const mockProps = {
    host: {
      name: 'John Doe',
      avatarUrl: 'avatar.jpg',
      isPro: true,
    },
    description: 'Beautiful place in the heart of the city',
  };

  it('should render host information correctly', () => {
    render(<OfferHost {...mockProps} />);

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(mockProps.host.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByAltText('Host avatar')).toHaveAttribute('src', mockProps.host.avatarUrl);
  });

  it('should show Pro badge when host is pro', () => {
    render(<OfferHost {...mockProps} />);

    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-wrapper')).toHaveClass('offer__avatar-wrapper--pro');
  });

  it('should not show Pro badge when host is not pro', () => {
    render(<OfferHost {...mockProps} host={{ ...mockProps.host, isPro: false }} />);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
    expect(screen.getByTestId('avatar-wrapper')).not.toHaveClass('offer__avatar-wrapper--pro');
  });

  it('should have correct structure', () => {
    const { container } = render(<OfferHost {...mockProps} />);

    expect(container.querySelector('.offer__host')).toBeInTheDocument();
    expect(container.querySelector('.offer__host-user')).toBeInTheDocument();
    expect(container.querySelector('.offer__description')).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toHaveClass('offer__text');
  });
});
