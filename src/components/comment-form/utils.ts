import { ratingMap } from './constants';

export const getRatingTitle = (rating: number): string => ratingMap[rating];
