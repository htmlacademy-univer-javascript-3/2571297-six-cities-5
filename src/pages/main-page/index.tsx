import { CitiesList, CityOffers } from '../../components';
import { CITIES } from '../../constants';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../store/types';
import { useActions } from '../../store/hooks';
import { PageLayout, Header, Spinner } from '../../components';

export const MainPage = () => {
  const { fetchOffers } = useActions();
  const cityName = useSelector((state: RootState) => state.common.city);
  const { offers, isLoading } = useSelector((state: RootState) => state.offers);

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
