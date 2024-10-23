export const OFFERS_COUNT = 312;
export const TOTAL_STARS = 5;

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
