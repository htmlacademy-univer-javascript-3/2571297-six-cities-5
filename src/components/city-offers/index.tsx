import { useState, useMemo } from 'react';
import { Offer } from '../../types/offer';
import { OffersList } from '../offers-list';
import { Map } from '../map';
import { useSelector } from 'react-redux';
import { Cities } from '../../constants';

interface CityOffersProps {
  offers: Offer[];
}

export const CityOffers = ({ offers }: CityOffersProps) => {
  const activeCityName = useSelector((state: { city: Cities }) => state.city);
  const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | undefined>(undefined);

  const offersCount = offers.length;

  const activeOffer = offers.find((offer) => offer.id === activeOfferId);
  const activeOfferPoint = activeOffer && {
    title: activeOffer.title,
    ...activeOffer.location,
  };

  const points = offers.map((offer) => ({
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
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>
                Popular
              </li>
              <li className="places__option" tabIndex={0}>
                Price: low to high
              </li>
              <li className="places__option" tabIndex={0}>
                Price: high to low
              </li>
              <li className="places__option" tabIndex={0}>
                Top rated first
              </li>
            </ul>
          </form>
          <OffersList offers={offers} setActiveOfferId={setActiveOfferId} />
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
