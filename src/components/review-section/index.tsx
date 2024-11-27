import { useSelector } from 'react-redux';
import { CommentForm } from '../comment-form';
import { ReviewsList } from '../reviews-list';
import { RootState } from '../../store/types';
import { useActions } from '../../store/hooks';
import { BaseOffer } from '../../types/offer';
import { useEffect } from 'react';

type ReviewSectionProps = {
  offerId: BaseOffer['id'];
};

export const ReviewSection = ({ offerId }: ReviewSectionProps) => {
  const { comments } = useSelector((state: RootState) => state.comments);
  const { fetchComments } = useActions();

  useEffect(() => {
    if (!offerId) {
      return;
    }
    fetchComments({ offerId });
  }, [fetchComments, offerId]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ReviewsList comments={comments} />
      <CommentForm offerId={offerId} />
    </section>
  );
};
