import { calculateRating } from '../../../utils/rating';

type OfferHeaderProps = {
  title: string;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  onToggleFavoriteClick: () => void;
};

export const OfferHeader = ({ title, isPremium, isFavorite, rating, onToggleFavoriteClick }: OfferHeaderProps) => (
  <>
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
        onClick={onToggleFavoriteClick}
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
  </>
);
