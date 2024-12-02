import { CitiesList, CityOffers } from '../../components';
import { CITIES } from '../../constants';
import { useEffect } from 'react';
import { useActions, useAppSelector } from '../../hooks';
import { PageLayout, Header, Spinner } from '../../components';
import { selectCommonData, selectOffersData } from '../../store/selectors';

export const MainPage = () => {
  const { fetchOffers } = useActions();
  const cityName = useAppSelector(selectCommonData).city;
  const { offers, isLoading } = useAppSelector(selectOffersData);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers, cityName]);

  return (
    <PageLayout pageClassName="page--gray page--main">
      <Header showUserNav />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CITIES} />
        {isLoading ? <Spinner /> : <CityOffers offers={offers} />}
      </main>
    </PageLayout>
  );
};
