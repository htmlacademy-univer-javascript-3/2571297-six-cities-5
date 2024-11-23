export const TOTAL_STARS = 5;
export const DEFAULT_ZOOM = 10;

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export enum AppRoute {
  Home = '/',
  Login = '/login',
  Favorites = '/favorites',
  OfferRouter = '/offer/:id',
  Offer = '/offer/',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum OfferType {
  Apartment = 'apartment',
  Room = 'room',
}

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const CITIES: Cities[] = [
  Cities.Paris,
  Cities.Cologne,
  Cities.Brussels,
  Cities.Amsterdam,
  Cities.Hamburg,
  Cities.Dusseldorf,
];

export enum SortOption {
  Popular,
  PriceLowToHigh,
  PriceHighToLow,
  TopRatedFirst,
}

export const SORT_OPTIONS = [
  SortOption.Popular,
  SortOption.PriceLowToHigh,
  SortOption.PriceHighToLow,
  SortOption.TopRatedFirst,
] as const;

export const DEFAULT_SORT_OPTION = SortOption.Popular;
