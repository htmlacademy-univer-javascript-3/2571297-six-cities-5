import { memo, useMemo } from 'react';
import { Comment } from '../../types/comment';
import { convertDate } from '../../utils/date';
import { calculateRating } from '../../utils/rating';

interface ReviewItemProps {
  comment: Comment;
}

const ReviewItem = memo((props: ReviewItemProps) => {
  const { comment } = props;
  const { user, rating, date, comment: text } = comment;

  const ratingWidth = useMemo(() => calculateRating(rating), [rating]);
  const formattedDate = useMemo(() => convertDate(date), [date]);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingWidth}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{text}</p>
        <time className="reviews__time">{formattedDate}</time>
      </div>
    </li>
  );
});

ReviewItem.displayName = 'ReviewItem';

export { ReviewItem };
