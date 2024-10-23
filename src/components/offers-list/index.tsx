import { Offer } from '../../types/offer';
import { FavoriteCard } from '../';
import { OfferCard } from '../';

interface OffersListProps {
  offers: Offer[];
  favorites?: boolean;
}

export const OffersList = (props: OffersListProps) => {
  const { offers, favorites } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        favorites ? <FavoriteCard key={offer.id} {...offer} /> : <OfferCard key={offer.id} {...offer} />
      )}
    </div>
  );
};
