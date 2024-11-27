import { OfferDetails as TOfferDetails } from '../../types/offer';
import { ReviewSection } from '../review-section';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { AuthStatus } from '../../constants';
import { useActions } from '../../store/hooks';
import { calculateRating } from '../../utils/rating';

type OfferDetailsProps = {
  offer: TOfferDetails;
};

export const OfferDetails = ({ offer }: OfferDetailsProps) => {
  const authorizationStatus = useSelector((state: RootState) => state.auth.authorizationStatus);
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

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthStatus.Auth) {
      toggleFavorite({ offerId: id, status: isFavorite ? 0 : 1 });
    }
  };

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {images.map((image) => (
            <div key={image} className="offer__image-wrapper">
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>
          ))}
        </div>
      </div>

      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{title}</h1>
            <button
              className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`}
              type="button"
              onClick={handleFavoriteClick}
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{`${isFavorite ? 'In' : 'To'} bookmarks`}</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: `${calculateRating(rating)}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">{type}</li>
            <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>
            <li className="offer__feature offer__feature--adults">Max {maxAdults} adults</li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>

          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {goods.map((good) => (
                <li key={good} className="offer__inside-item">
                  {good}
                </li>
              ))}
            </ul>
          </div>

          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div
                className={`offer__avatar-wrapper ${host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}
              >
                <img
                  className="offer__avatar user__avatar"
                  src={host.avatarUrl}
                  width="74"
                  height="74"
                  alt="Host avatar"
                />
              </div>
              <span className="offer__user-name">{host.name}</span>
              {host.isPro && <span className="offer__user-status">Pro</span>}
            </div>
            <div className="offer__description">
              <p className="offer__text">{description}</p>
            </div>
          </div>

          {authorizationStatus === AuthStatus.Auth && <ReviewSection offerId={id} />}
        </div>
      </div>
    </section>
  );
};
