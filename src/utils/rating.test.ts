import { calculateRating } from './rating';
import { TOTAL_STARS } from '../constants';

describe('rating utils', () => {
  it('should calculate rating percentage correctly', () => {
    const testCases = [
      { rating: 5, expected: 100 },
      { rating: 4, expected: 80 },
      { rating: 3, expected: 60 },
      { rating: 2, expected: 40 },
      { rating: 1, expected: 20 },
      { rating: 0, expected: 0 },
      { rating: 4.5, expected: 90 },
      { rating: 3.7, expected: 74 },
    ];

    testCases.forEach(({ rating, expected }) => {
      expect(calculateRating(rating)).toBe(expected);
    });
  });

  it('should handle edge cases', () => {
    expect(calculateRating(TOTAL_STARS + 1)).toBe(120);
    expect(calculateRating(-1)).toBe(-20);
  });
});
