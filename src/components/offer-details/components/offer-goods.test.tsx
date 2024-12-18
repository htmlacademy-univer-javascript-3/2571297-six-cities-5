import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferGoods } from './offer-goods';

describe('Component: OfferGoods', () => {
  const mockGoods = ['Wi-Fi', 'Washing machine', 'Kitchen', 'Heating'];

  it('should render all goods', () => {
    render(<OfferGoods goods={mockGoods} />);

    mockGoods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should have correct structure', () => {
    const { container } = render(<OfferGoods goods={mockGoods} />);

    // eslint-disable-next-line quotes
    expect(screen.getByText("What's inside")).toHaveClass('offer__inside-title');
    expect(container.querySelector('.offer__inside-list')).toBeInTheDocument();

    const items = container.querySelectorAll('.offer__inside-item');
    expect(items).toHaveLength(mockGoods.length);
  });
});
