import { renderHook } from '@testing-library/react';
import { useSorting } from './';
import { useSelector } from 'react-redux';
import { Offer } from '../../types/offer';
import { SortOption } from '../../constants';
import { mockOffer } from '../../mocks/offers';

// Mock redux hooks
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('useSorting', () => {
  const mockOffers: Offer[] = [
    { ...mockOffer, price: 50, rating: 4 },
    { ...mockOffer, price: 100, rating: 5 },
  ] as Offer[];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should sort by price: low to high', () => {
    vi.mocked(useSelector).mockReturnValue(SortOption.PriceLowToHigh);

    const { result } = renderHook(() => useSorting(mockOffers));

    expect(result.current[0].price).toBe(50);
    expect(result.current[1].price).toBe(100);
  });

  it('should sort by price: high to low', () => {
    vi.mocked(useSelector).mockReturnValue(SortOption.PriceHighToLow);

    const { result } = renderHook(() => useSorting(mockOffers));

    expect(result.current[0].price).toBe(100);
    expect(result.current[1].price).toBe(50);
  });

  it('should sort by rating: high to low', () => {
    vi.mocked(useSelector).mockReturnValue(SortOption.TopRatedFirst);

    const { result } = renderHook(() => useSorting(mockOffers));

    expect(result.current[0].rating).toBe(5);
    expect(result.current[1].rating).toBe(4);
  });

  it('should return original order for Popular option', () => {
    vi.mocked(useSelector).mockReturnValue(SortOption.Popular);

    const { result } = renderHook(() => useSorting(mockOffers));

    expect(result.current).toEqual(mockOffers);
  });

  it('should handle empty array', () => {
    vi.mocked(useSelector).mockReturnValue(SortOption.Popular);

    const { result } = renderHook(() => useSorting([]));

    expect(result.current).toEqual([]);
  });
});
