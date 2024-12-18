import { getSortOptionText, sortOffers } from './sort';
import { SortOption } from '../constants';
import { Offer } from '../types/offer';
import { mockOffer } from '../mocks/offers';

describe('sort utils', () => {
  describe('getSortOptionText', () => {
    it('should return correct text for each sort option', () => {
      expect(getSortOptionText(SortOption.Popular)).toBe('Popular');
      expect(getSortOptionText(SortOption.PriceLowToHigh)).toBe('Price: low to high');
      expect(getSortOptionText(SortOption.PriceHighToLow)).toBe('Price: high to low');
      expect(getSortOptionText(SortOption.TopRatedFirst)).toBe('Top rated first');
    });

    it('should return default text for unknown option', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(getSortOptionText('unknown')).toBe('Popular');
    });
  });

  describe('sortOffers', () => {
    const offers: Offer[] = [
      { ...mockOffer, price: 100, rating: 4 },
      { ...mockOffer, price: 50, rating: 5 },
      { ...mockOffer, price: 150, rating: 3 },
    ];

    it('should sort by price low to high', () => {
      const sorted = sortOffers(offers, SortOption.PriceLowToHigh);
      expect(sorted.map((o) => o.price)).toEqual([50, 100, 150]);
    });

    it('should sort by price high to low', () => {
      const sorted = sortOffers(offers, SortOption.PriceHighToLow);
      expect(sorted.map((o) => o.price)).toEqual([150, 100, 50]);
    });

    it('should sort by rating', () => {
      const sorted = sortOffers(offers, SortOption.TopRatedFirst);
      expect(sorted.map((o) => o.rating)).toEqual([5, 4, 3]);
    });

    it('should not sort when popular', () => {
      const sorted = sortOffers(offers, SortOption.Popular);
      expect(sorted).toEqual(offers);
    });

    it('should not mutate original array', () => {
      const original = [...offers];
      sortOffers(offers, SortOption.PriceLowToHigh);
      expect(offers).toEqual(original);
    });
  });
});
