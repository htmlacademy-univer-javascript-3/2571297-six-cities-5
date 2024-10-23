import { OfferType } from '../constants';
import { Location } from './geo';

type OfferCity = {
  name: string;
  location: Location;
};

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: OfferCity;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: 1 | 2 | 3 | 4 | 5;
  previewImage: string;
};
