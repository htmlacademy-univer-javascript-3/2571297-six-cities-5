import { useSelector } from 'react-redux';
import { Offer } from '../types/offer';
import { sortOffers } from '../utils/sort';
import { RootState } from '../store/types';

export const useSorting = (offers: Offer[]): Offer[] => {
  const currentSort = useSelector((state: RootState) => state.common.sortOption);

  return sortOffers(offers ?? [], currentSort);
};
