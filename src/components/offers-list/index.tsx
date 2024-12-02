import { memo, useCallback, useMemo } from 'react';
import { Offer, OfferCardType } from '../../types/offer';
import { OfferCard } from '../';

interface OffersListProps {
  offers: Offer[];
  cardType?: OfferCardType;
  setActiveOfferId?: (id: Offer['id'] | undefined) => void;
}

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

const OffersList = memo((props: OffersListProps) => {
  const { offers, cardType = 'regular', setActiveOfferId } = props;

  const handleOfferCardActive = useCallback(
    (id: Offer['id'] | undefined) => {
      setActiveOfferId?.(id);
    },
    [setActiveOfferId]
  );

  const className = useMemo(() => getClassName(cardType), [cardType]);

  if (!offers.length) {
    return null;
  }

  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCard key={offer.id} cardType={cardType} offer={offer} onHover={handleOfferCardActive} />
      ))}
    </div>
  );
});

OffersList.displayName = 'OffersList';

export { OffersList };
