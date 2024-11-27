import { Link } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import { Offer, OfferCardType } from '../../types/offer';
import { calculateRating } from '../../utils/rating';
import { useActions } from '../../store/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

interface OfferCardProps {
  offer: Offer;
  cardType?: OfferCardType;
  onHover?: (id: Offer['id'] | undefined) => void;
}

export const OfferCard = (props: OfferCardProps) => {
  const { offer, onHover, cardType = 'regular' } = props;
  const { id, title, price, previewImage, isFavorite, isPremium, rating, type } = offer;
  const authorizationStatus = useSelector((state: RootState) => state.auth.authorizationStatus);
  const { toggleFavorite } = useActions();

  const isNearestCardType = cardType === 'nearest';

  const getClassName = (offerCardType: OfferCardType) => {
    switch (offerCardType) {
      case 'favorites':
        return 'favorites';
      case 'nearest':
        return 'near-places';
      default:
        return 'cities';
    }
  };

  const handleMouseEnter = () => {
    if (onHover) {
      onHover(id);
    }
  };

  const handleMouseLeave = () => {
    if (onHover) {
      onHover(undefined);
    }
  };

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthStatus.Auth) {
      toggleFavorite({ offerId: id, status: isFavorite ? 0 : 1 });
    }
  };

  return (
    <article
      className={`${getClassName(cardType)}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${getClassName(cardType)}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}${id}`} replace={isNearestCardType}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={`${title}`} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{`${isFavorite ? 'In' : 'To'} bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calculateRating(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`} replace={isNearestCardType}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type.slice(0, 1).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
};
