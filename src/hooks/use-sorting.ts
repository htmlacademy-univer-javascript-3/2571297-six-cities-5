import { useSelector } from 'react-redux';
import { SortOption } from '../constants';
import { Offer } from '../types/offer';
import { sortOffers } from '../utils/sort';

export const useSorting = (offers: Offer[]): Offer[] => {
  const currentSort = useSelector((state: { sortOption: SortOption }) => state.sortOption);

  return sortOffers(offers ?? [], currentSort);
};
