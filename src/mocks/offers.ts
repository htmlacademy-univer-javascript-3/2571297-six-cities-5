import { Cities } from '../constants/cities';
import { OfferType } from '../constants/offer';
import { Offer, OfferDetails } from '../types/offer';

export const mockOfferDetails: OfferDetails = {
  id: '1',
  title: 'Studio in Amsterdam',
  type: OfferType.Apartment,
  price: 120,
  city: {
    name: Cities.Amsterdam,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  isFavorite: true,
  isPremium: false,
  rating: 4,
  description: 'Just a studio in Amsterdam',
  bedrooms: 3,
  goods: ['Heating'],
  host: {
    name: 'Oliver Conner',
    avatarUrl: 'avatar-max.jpg',
    isPro: true,
  },
  images: ['apartment-01.jpg'],
  maxAdults: 4,
};

export const mockOffer: Offer = {
  id: '1',
  title: 'Studio in Amsterdam',
  type: OfferType.Apartment,
  price: 120,
  city: {
    name: Cities.Amsterdam,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  isFavorite: true,
  isPremium: false,
  rating: 4,
  previewImage: 'apartment-01.jpg',
};
