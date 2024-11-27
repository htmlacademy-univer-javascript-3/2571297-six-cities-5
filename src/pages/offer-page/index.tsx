import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { useActions } from '../../store/hooks';
import { useEffect } from 'react';
import { PageLayout, Header, OfferDetails, NearbyOffers } from '../../components';
import { AppRoute } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components';

export const OfferPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchOfferDetails } = useActions();
  const { offer, isLoading, error } = useSelector((state: RootState) => state.offerDetails);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchOfferDetails({ offerId: id });
  }, [fetchOfferDetails, id]);

  useEffect(() => {
    if (error?.status === 404) {
      navigate(AppRoute.NotFound);
    }
  }, [error, navigate]);

  return (
    offer && (
      <PageLayout>
        <Header />
        <main className="page__main page__main--offer">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <OfferDetails offer={offer} />
              <NearbyOffers currentOffer={offer} />
            </>
          )}
        </main>
      </PageLayout>
    )
  );
};
