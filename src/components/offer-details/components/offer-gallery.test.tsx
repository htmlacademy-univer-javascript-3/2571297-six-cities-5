import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferGallery } from './offer-gallery';

describe('Component: OfferGallery', () => {
  const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  it('should render all images', () => {
    render(<OfferGallery images={mockImages} />);

    const images = screen.getAllByAltText('Photo studio');
    expect(images).toHaveLength(mockImages.length);
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('src', mockImages[index]);
    });
  });

  it('should have correct structure', () => {
    const { container } = render(<OfferGallery images={mockImages} />);

    expect(container.querySelector('.offer__gallery-container')).toBeInTheDocument();
    expect(container.querySelector('.offer__gallery')).toBeInTheDocument();
    expect(container.querySelectorAll('.offer__image-wrapper')).toHaveLength(mockImages.length);
  });
});
