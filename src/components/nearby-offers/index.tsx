import { OfferDetails } from '../../types/offer';
import { OffersList } from '../offers-list';
import { Map } from '../map';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { useActions } from '../../store/hooks';
import { useEffect } from 'react';

type NearbyOffersProps = {
  currentOffer: OfferDetails;
};

export const NearbyOffers = ({ currentOffer }: NearbyOffersProps) => {
  const { offers } = useSelector((state: RootState) => state.nearbyOffers);
  const { fetchNearbyOffers } = useActions();

  useEffect(() => {
    fetchNearbyOffers({ offerId: currentOffer.id });
  }, [fetchNearbyOffers, currentOffer.id]);

  const slicedOffers = offers.slice(0, 3);

  return (
    <>
      <section className="offer__map">
        <Map width="100%" city={currentOffer.city} offers={slicedOffers} selectedOffer={currentOffer} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OffersList offers={slicedOffers} cardType="nearest" />
        </section>
      </div>
    </>
  );
};
