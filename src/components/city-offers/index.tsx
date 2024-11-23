import { useState, useMemo } from 'react';
import { Offer } from '../../types/offer';
import { OffersList } from '../offers-list';
import { Map } from '../map';
import { useSelector } from 'react-redux';
import { Cities } from '../../constants';
import { SortingForm } from '../sorting-form';
import { useSorting } from '../../hooks/use-sorting';

interface CityOffersProps {
  offers: Offer[];
}

export const CityOffers = ({ offers }: CityOffersProps) => {
  const activeCityName = useSelector((state: { city: Cities }) => state.city);
  const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | undefined>(undefined);
  const sortedOffers = useSorting(offers);

  const offersCount = offers.length;

  const activeOffer = sortedOffers.find((offer: Offer) => offer.id === activeOfferId);
  const activeOfferPoint = activeOffer && {
    title: activeOffer.title,
    ...activeOffer.location,
  };

  const points = sortedOffers.map((offer: Offer) => ({
    title: offer.title,
    ...offer.location,
  }));

  const city = useMemo(() => {
    const foundCity = offers.find((offer) => offer.city.name === activeCityName)?.city;
    if (!foundCity && offers.length > 0) {
      return offers[0].city;
    }
    return foundCity;
  }, [offers, activeCityName]);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offersCount} places to stay in {activeCityName}
          </b>
          <SortingForm />
          <OffersList offers={sortedOffers} setActiveOfferId={setActiveOfferId} />
        </section>
        <div className="cities__right-section">
          <section className="cities__map">
            <Map city={city} points={points} selectedPoint={activeOfferPoint} />
          </section>
        </div>
      </div>
    </div>
  );
};
