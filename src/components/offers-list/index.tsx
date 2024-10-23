import { Offer } from '../../types/offer';
import { FavoriteCard } from '../';
import { OfferCard } from '../';
import { useState } from 'react';

interface OffersListProps {
  offers: Offer[];
  isFavoritesPage?: boolean;
}

export const OffersList = (props: OffersListProps) => {
  const { offers, isFavoritesPage } = props;

  // TODO: Use for map markers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | undefined>(undefined);

  const handleOfferCardHover = (id: Offer['id'] | undefined) => {
    setActiveOfferId(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        isFavoritesPage ? (
          <FavoriteCard key={offer.id} {...offer} />
        ) : (
          <OfferCard key={offer.id} {...offer} onHover={handleOfferCardHover} />
        )
      )}
    </div>
  );
};
