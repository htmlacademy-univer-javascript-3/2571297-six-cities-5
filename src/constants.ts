export const TOTAL_STARS = 5;
export const DEFAULT_ZOOM = 10;

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

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
