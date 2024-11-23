import { SortOption } from '../constants';
import { Offer } from '../types/offer';

export const getSortOptionText = (option: SortOption): string => {
  switch (option) {
    case SortOption.Popular:
      return 'Popular';
    case SortOption.PriceLowToHigh:
      return 'Price: low to high';
    case SortOption.PriceHighToLow:
      return 'Price: high to low';
    case SortOption.TopRatedFirst:
      return 'Top rated first';
    default:
      return 'Popular';
  }
};

export const sortOffers = (offers: Offer[], sortType: SortOption): Offer[] =>
  [...offers].sort((a, b) => {
    switch (sortType) {
      case SortOption.PriceLowToHigh:
        return a.price - b.price;
      case SortOption.PriceHighToLow:
        return b.price - a.price;
      case SortOption.TopRatedFirst:
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
