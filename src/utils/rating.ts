import { TOTAL_STARS } from '../constants';
import { Offer } from '../types/offer';

export const calculateRating = (rating: Offer['rating']): number => +((rating / TOTAL_STARS) * 100).toFixed(2);
