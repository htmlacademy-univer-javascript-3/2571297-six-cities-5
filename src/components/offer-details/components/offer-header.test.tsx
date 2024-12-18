import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OfferHeader } from './offer-header';

describe('Component: OfferHeader', () => {
  const mockProps = {
    title: 'Beautiful apartment',
    isPremium: true,
    isFavorite: false,
    rating: 4.5,
    onToggleFavoriteClick: vi.fn(),
  };

  it('should render header content correctly', () => {
    render(<OfferHeader {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(mockProps.rating)).toBeInTheDocument();
  });

  it('should not show Premium mark when isPremium is false', () => {
    render(<OfferHeader {...mockProps} isPremium={false} />);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should handle favorite button click', () => {
    render(<OfferHeader {...mockProps} />);

    const button = screen.getByRole('button', { name: /to bookmarks/i });
    fireEvent.click(button);

    expect(mockProps.onToggleFavoriteClick).toHaveBeenCalled();
  });

  it('should have correct bookmark button state', () => {
    const { rerender } = render(<OfferHeader {...mockProps} />);

    let button = screen.getByRole('button');
    expect(button).not.toHaveClass('offer__bookmark-button--active');
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();

    rerender(<OfferHeader {...mockProps} isFavorite />);

    button = screen.getByRole('button');
    expect(button).toHaveClass('offer__bookmark-button--active');
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });

  it('should have correct rating width', () => {
    render(<OfferHeader {...mockProps} />);

    const ratingSpan = screen.getByText('Rating').previousSibling as HTMLElement;
    expect(ratingSpan.style.width).toBe('90%');
  });
});
