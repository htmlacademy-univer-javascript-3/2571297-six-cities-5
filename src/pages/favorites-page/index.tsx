import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { Footer, OffersList, Spinner } from '../../components';
import { AppRoute } from '../../constants';
import { PageLayout, Header } from '../../components';
import { useActions } from '../../store/hooks';
import { RootState } from '../../store/types';

export const FavoritesPage = () => {
  const { fetchFavorites } = useActions();
  const { offers, isLoading } = useSelector((state: RootState) => state.favoriteOffers);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

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

  const pageContent = useMemo(() => {
    if (!offers?.length && !isLoading) {
      return (
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">
              Save properties to narrow down search or plan your future trips.
            </p>
          </div>
        </section>
      );
    }

    return isLoading ? (
      <Spinner />
    ) : (
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {Object.entries(offersGroupedByCity).map(([cityName, cityOffers]) => (
            <li className="favorites__locations-items" key={cityName}>
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link className="locations__item-link" to={AppRoute.Home}>
                    <span>{cityName}</span>
                  </Link>
                </div>
              </div>
              <div className="favorites__places">
                <OffersList offers={cityOffers} cardType="favorites" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }, [offers, isLoading, offersGroupedByCity]);

  return (
    <PageLayout pageClassName={`page--gray ${!offers?.length ? 'page--favorites-empty' : ''}`}>
      <Header showUserNav />
      <main className={`page__main page__main--favorites ${!offers?.length ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">{pageContent}</div>
      </main>
      <Footer />
    </PageLayout>
  );
};
