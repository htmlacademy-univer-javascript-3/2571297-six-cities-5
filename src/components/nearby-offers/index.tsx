import { memo, useEffect, useMemo } from 'react';
import { OfferDetails } from '../../types/offer';
import { OffersList } from '../offers-list';
import { Map } from '../map';
import { useActions, useAppSelector } from '../../hooks';
import { selectNearbyOffersData } from '../../store/selectors';

interface NearbyOffersProps {
  currentOffer: OfferDetails;
}

export const NearbyOffers = memo(({ currentOffer }: NearbyOffersProps) => {
  const { offers } = useAppSelector(selectNearbyOffersData);
  const { fetchNearbyOffers } = useActions();

  useEffect(() => {
    fetchNearbyOffers({ offerId: currentOffer.id });
  }, [fetchNearbyOffers, currentOffer.id]);

  const slicedOffers = useMemo(() => offers.slice(0, 3), [offers]);

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
});

NearbyOffers.displayName = 'NearbyOffers';
