import { Offer } from '../../types/offer';
import { FavoriteCard } from '../';
import { OfferCard } from '../';

interface OffersListProps {
  offers: Offer[];
  isFavoritesPage?: boolean;
  setActiveOfferId?: (id: Offer['id'] | undefined) => void;
}

export const OffersList = (props: OffersListProps) => {
  const { offers, isFavoritesPage, setActiveOfferId } = props;

  const handleOfferCardHover = (id: Offer['id'] | undefined) => {
    if (setActiveOfferId) {
      setActiveOfferId(id);
    }
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
