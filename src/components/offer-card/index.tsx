import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import { Offer, OfferCardType } from '../../types/offer';
import { calculateRating } from '../../utils/rating';
import { useActions, useAppSelector } from '../../hooks';
import { selectAuthData } from '../../store/selectors';
import { memo, useMemo } from 'react';

interface OfferCardProps {
  offer: Offer;
  cardType?: OfferCardType;
  onHover?: (id: Offer['id'] | undefined) => void;
}

const getClassNameByType = (offerCardType: OfferCardType) => {
  switch (offerCardType) {
    case 'favorites':
      return 'favorites';
    case 'nearest':
      return 'near-places';
    default:
      return 'cities';
  }
};

const OfferCard = memo((props: OfferCardProps) => {
  const { offer, onHover, cardType = 'regular' } = props;
  const { id, title, price, previewImage, isFavorite, isPremium, rating, type } = offer;
  const { authorizationStatus } = useAppSelector(selectAuthData);
  const { toggleFavorite } = useActions();
  const navigate = useNavigate();

  const isNearestCardType = cardType === 'nearest';
  const className = useMemo(() => getClassNameByType(cardType), [cardType]);
  const ratingWidth = useMemo(() => calculateRating(rating), [rating]);
  const formattedType = useMemo(() => type.slice(0, 1).toUpperCase() + type.slice(1), [type]);

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

  const handleToggleFavoriteClick = () => {
    if (authorizationStatus === AuthStatus.Auth) {
      toggleFavorite({ offerId: id, status: isFavorite ? 0 : 1 });
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <article
      className={`${className}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}${id}`} replace={isNearestCardType}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
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
            onClick={handleToggleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{`${isFavorite ? 'In' : 'To'} bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingWidth}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`} replace={isNearestCardType}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{formattedType}</p>
      </div>
    </article>
  );
});

OfferCard.displayName = 'OfferCard';

export { OfferCard };
