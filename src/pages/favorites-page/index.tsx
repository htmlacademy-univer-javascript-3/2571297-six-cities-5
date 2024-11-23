import { useMemo, useEffect } from 'react';
import { Offer } from '../../types/offer';
import { OffersList } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoritesOffers } from '../../store/action';
import { Cities, AppRoute } from '../../constants';
import { Link } from 'react-router-dom';

export const FavoritesPage = () => {
  const dispatch = useDispatch();
  const offers = useSelector((state: { favoritesOffers: Offer[] }) => state.favoritesOffers);
  const activeCity = useSelector((state: { city: Cities }) => state.city);

  useEffect(() => {
    dispatch(getFavoritesOffers());
  }, [activeCity, dispatch]);

  const offersGroupedByCity = useMemo(() => {
    if (!offers || !offers.length) {
      return {} as Record<Offer['city']['name'], Offer[]>;
    }

    return offers.reduce(
      (acc, currentOffer) => {
        if (!acc[currentOffer.city.name]) {
          acc[currentOffer.city.name] = [];
        }
        acc[currentOffer.city.name].push(currentOffer);
        return acc;
      },
      {} as Record<Offer['city']['name'], Offer[]>
    );
  }, [offers]);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Home}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {offers.length ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(offersGroupedByCity).map(([city, cityOffers]) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OffersList offers={cityOffers} cardType="favorites" />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Home}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};
