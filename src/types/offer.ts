import { Cities, OfferType } from '../constants';
import { Location } from './geo';

export type OfferCity = {
  name: Cities;
  location: Location;
};

export type BaseOffer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: OfferCity;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type Offer = BaseOffer & {
  previewImage: string;
};

export type OfferHost = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type OfferDetails = BaseOffer & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: OfferHost;
  images: string[];
  maxAdults: number;
};

export type OfferCardType = 'regular' | 'favorites' | 'nearest';
