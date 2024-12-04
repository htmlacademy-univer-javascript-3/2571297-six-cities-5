import { memo } from 'react';
import { Comment } from '../../types/comment';
import { ReviewItem } from '../review-item';

interface ReviewsListProps {
  comments: Comment[];
}

const ReviewsList = memo((props: ReviewsListProps) => {
  const { comments } = props;

  if (!comments.length) {
    return null;
  }

  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <ReviewItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
});

ReviewsList.displayName = 'ReviewsList';

export { ReviewsList };
