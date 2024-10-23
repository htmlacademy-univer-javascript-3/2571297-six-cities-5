import { OfferPriceText, OfferType } from '../constants';

type OfferCity = {
  name: string;
  lat?: number;
  long?: number;
};

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  priceText: OfferPriceText;
  city: OfferCity;
  isFavorite: boolean;
  isPremium: boolean;
  rating: 1 | 2 | 3 | 4 | 5;
  preview: string;
  images?: string[];
};
