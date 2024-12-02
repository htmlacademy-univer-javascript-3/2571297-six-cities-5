import { useState, useMemo, useCallback } from 'react';
import { Offer } from '../../types/offer';
import { OffersList } from '../offers-list';
import { Map } from '../map';
import { SortingForm } from '../sorting-form';
import { useSorting } from '../../hooks';
import { useAppSelector } from '../../hooks';
import { selectCommonData } from '../../store/selectors';
import { EmptyOffers } from './components/empty-offers';

interface CityOffersProps {
  offers: Offer[];
}

export const CityOffers = ({ offers }: CityOffersProps) => {
  const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | undefined>(undefined);
  const activeCityName = useAppSelector(selectCommonData).city;
  const sortedOffers = useSorting(offers);

  const offersCount = useMemo(() => sortedOffers.length, [sortedOffers]);

  const activeOffer = useMemo(
    () => sortedOffers.find((offer: Offer) => offer.id === activeOfferId),
    [sortedOffers, activeOfferId]
  );

  const city = useMemo(() => {
    const foundCity = offers.find((offer) => offer.city.name === activeCityName)?.city;
    if (!foundCity && offers.length > 0) {
      return offers[0].city;
    }
    return foundCity;
  }, [offers, activeCityName]);

  const handleActiveOfferChange = useCallback((id: Offer['id'] | undefined) => {
    setActiveOfferId(id);
  }, []);

  if (!offersCount) {
    return <EmptyOffers cityName={activeCityName} />;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offersCount} places to stay in {activeCityName}
          </b>
          <SortingForm />
          <OffersList offers={sortedOffers} setActiveOfferId={handleActiveOfferChange} />
        </section>
        <div className="cities__right-section">
          <section className="cities__map">
            <Map city={city} offers={offers} selectedOffer={activeOffer} />
          </section>
        </div>
      </div>
    </div>
  );
};
