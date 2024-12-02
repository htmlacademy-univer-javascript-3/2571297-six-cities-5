import { OfferDetails as TOfferDetails } from '../../types/offer';
import { ReviewSection } from '../review-section';
import { AppRoute, AuthStatus } from '../../constants';
import { useActions, useAppSelector } from '../../hooks';
import { selectAuthData } from '../../store/selectors';
import { OfferGallery, OfferHeader, OfferFeatures, OfferGoods, OfferHost } from './components';
import { useNavigate } from 'react-router-dom';

type OfferDetailsProps = {
  offer: TOfferDetails;
};

export const OfferDetails = ({ offer }: OfferDetailsProps) => {
  const { authorizationStatus } = useAppSelector(selectAuthData);
  const { toggleFavorite } = useActions();
  const {
    id,
    title,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    images,
    isFavorite,
    isPremium,
    rating,
  } = offer;
  const navigate = useNavigate();

  const handleToggleFavoriteClick = () => {
    if (authorizationStatus === AuthStatus.Auth) {
      toggleFavorite({ offerId: id, status: isFavorite ? 0 : 1 });
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <section className="offer">
      <OfferGallery images={images} />

      <div className="offer__container container">
        <div className="offer__wrapper">
          <OfferHeader
            title={title}
            isPremium={isPremium}
            isFavorite={isFavorite}
            rating={rating}
            onToggleFavoriteClick={handleToggleFavoriteClick}
          />

          <OfferFeatures type={type} bedrooms={bedrooms} maxAdults={maxAdults} price={price} />

          <OfferGoods goods={goods} />

          <OfferHost host={host} description={description} />

          {authorizationStatus === AuthStatus.Auth && <ReviewSection offerId={id} />}
        </div>
      </div>
    </section>
  );
};
