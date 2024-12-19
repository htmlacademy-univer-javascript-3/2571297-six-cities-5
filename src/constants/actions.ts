export const Actions = {
  // Common Actions
  SET_ACTIVE_CITY: 'common/setActiveCity',
  SET_SORT_OPTION: 'common/setSortOption',
  SET_SERVER_ERROR: 'common/setServerError',

  // Offers Actions
  FETCH_OFFERS: 'offers/fetchOffers',
  FETCH_OFFER_DETAILS: 'offers/fetchOfferDetails',

  // Favorite Actions
  FETCH_FAVORITES: 'favorites/fetchFavorites',
  TOGGLE_FAVORITE: 'favorites/toggleFavorite',

  // Nearby Offers Actions
  FETCH_NEARBY_OFFERS: 'nearbyOffers/fetchNearbyOffers',

  // Comments Actions
  FETCH_COMMENTS: 'comments/fetchComments',
  POST_COMMENT: 'comments/postComment',

  // Auth Actions
  CHECK_AUTH: 'auth/checkAuth',
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
} as const;
