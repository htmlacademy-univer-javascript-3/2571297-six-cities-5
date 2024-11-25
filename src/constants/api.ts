export enum ApiRoute {
  Offers = '/offers',
  OfferDetails = '/offers/:id',
  NearbyOffers = '/offers/:id/nearby',
  Favorites = '/favorite',
  FavoriteStatus = '/favorite/:offerId/:status',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments/:offerId',
}

export enum ApiErrorType {
  CommonError = 'COMMON_ERROR',
  ValidationError = 'VALIDATION_ERROR',
}

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;
