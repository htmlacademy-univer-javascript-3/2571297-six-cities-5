import { OfferType } from '../constants';
import { Location } from './geo';

export type OfferCity = {
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
  rating: number;
  previewImage: string;
};

export type OfferCardType = 'regular' | 'favorites' | 'nearest';
