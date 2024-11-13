import { Comment } from '../../types/comment';
import { ReviewItem } from '../review-item';

interface ReviewsListProps {
  comments: Comment[];
}

export const ReviewsList = (props: ReviewsListProps) => {
  const { comments } = props;

  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <ReviewItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};
