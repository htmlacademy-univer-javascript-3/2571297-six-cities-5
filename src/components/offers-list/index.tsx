import { Offer, OfferCardType } from '../../types/offer';
import { OfferCard } from '../';

interface OffersListProps {
  offers: Offer[];
  cardType?: OfferCardType;
  setActiveOfferId?: (id: Offer['id'] | undefined) => void;
}

export const OffersList = (props: OffersListProps) => {
  const { offers, cardType = 'regular', setActiveOfferId } = props;

  const handleOfferCardActive = (id: Offer['id'] | undefined) => {
    if (setActiveOfferId) {
      setActiveOfferId(id);
    }
  };

  const getClassName = (type: OfferCardType) => {
    switch (type) {
      case 'favorites':
        return 'favorites__places';
      case 'nearest':
        return 'near-places__list places__list';
      default:
        return 'cities__places-list places__list tabs__content';
    }
  };

  return (
    <div className={getClassName(cardType)}>
      {offers.length &&
        offers.map((offer) => (
          <OfferCard key={offer.id} cardType={cardType} offer={offer} onHover={handleOfferCardActive} />
        ))}
    </div>
  );
};
