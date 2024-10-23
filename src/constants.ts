export const OFFERS_COUNT = 312;
export const TOTAL_STARS = 5;

export enum AppRoute {
    Home = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer/:id',
}

export enum AuthStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum OfferType {
    Apartment = 'Apartment',
    Room = 'Room',
}

export enum OfferPriceText {
    Night = 'night',
}
