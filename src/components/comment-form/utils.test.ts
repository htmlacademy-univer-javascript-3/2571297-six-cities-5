import { describe, it, expect } from 'vitest';
import { getRatingTitle } from './utils';
import { ratingMap } from './constants';

describe('CommentForm utils', () => {
  describe('getRatingTitle', () => {
    it('should return correct rating title for each rating value', () => {
      Object.entries(ratingMap).forEach(([rating, expectedTitle]) => {
        expect(getRatingTitle(Number(rating))).toBe(expectedTitle);
      });
    });

    it('should return undefined for invalid rating', () => {
      expect(getRatingTitle(0)).toBeUndefined();
      expect(getRatingTitle(6)).toBeUndefined();
    });
  });
});
