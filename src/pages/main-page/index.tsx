import { CitiesList, CityOffers } from '../../components';
import { CITIES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Offer } from '../../types/offer';
import { Cities } from '../../constants';
import { getOffers } from '../../store/action';
import { useEffect } from 'react';

export const MainPage = () => {
  const dispatch = useDispatch();
  const offers = useSelector((state: { offers: Offer[] }) => state.offers);
  const activeCity = useSelector((state: { city: Cities }) => state.city);

  useEffect(() => {
    dispatch(getOffers(activeCity));
  }, [activeCity, dispatch]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CITIES} />
        <CityOffers offers={offers} />
      </main>
    </div>
  );
};
