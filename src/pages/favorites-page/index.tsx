import { useEffect, useMemo, memo } from 'react';
import { Offer } from '../../types/offer';
import { Footer, Spinner } from '../../components';
import { PageLayout, Header } from '../../components';
import { useActions, useAppSelector } from '../../hooks';
import { selectFavoriteOffersData } from '../../store/selectors';
import { FavoriteLocation } from '../../components/favorite-location';
import { EmptyFavorites } from '../../components/empty-favorites';

const FavoritesPage = memo(() => {
  const { fetchFavorites } = useActions();
  const { offers, isLoading } = useAppSelector(selectFavoriteOffersData);

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
      return <EmptyFavorites />;
    }

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {Object.entries(offersGroupedByCity).map(([cityName, cityOffers]) => (
            <FavoriteLocation key={cityName} cityName={cityName} offers={cityOffers} />
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
});

FavoritesPage.displayName = 'FavoritesPage';

export { FavoritesPage };
