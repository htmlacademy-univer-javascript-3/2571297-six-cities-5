import { CommentForm } from '../comment-form';
import { ReviewsList } from '../reviews-list';
import { useActions, useAppSelector } from '../../hooks';
import { BaseOffer } from '../../types/offer';
import { useEffect } from 'react';
import { selectCommentsData } from '../../store/selectors';

type ReviewSectionProps = {
  offerId: BaseOffer['id'];
};

export const ReviewSection = ({ offerId }: ReviewSectionProps) => {
  const { comments } = useAppSelector(selectCommentsData);
  const { fetchComments } = useActions();

  const orderedComments = [...comments].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

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
      <ReviewsList comments={orderedComments.slice(0, 10)} />
      <CommentForm offerId={offerId} />
    </section>
  );
};
