import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewSection } from './';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockComment } from '../../mocks/comments';

const mockStore = configureMockStore();
const mockFetchComments = vi.fn();

vi.mock('../../hooks', () => ({
  useActions: () => ({
    fetchComments: mockFetchComments,
  }),
  useAppSelector: () => ({
    comments: [mockComment, { ...mockComment, id: '2' }],
  }),
}));

vi.mock('../reviews-list', () => ({
  ReviewsList: ({ comments }: { comments: (typeof mockComment)[] }) => (
    <div data-testid="reviews-list">Reviews List: {comments.length} items</div>
  ),
}));

vi.mock('../comment-form', () => ({
  CommentForm: ({ offerId }: { offerId: string }) => (
    <div data-testid="comment-form">Comment Form for offer {offerId}</div>
  ),
}));

describe('Component: ReviewSection', () => {
  const mockOfferId = '1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderReviewSection = (offerId = mockOfferId) => {
    const store = mockStore({
      comments: {
        data: {
          comments: offerId ? [mockComment, { ...mockComment, id: '2' }] : [],
        },
      },
    });

    return render(
      <Provider store={store}>
        <ReviewSection offerId={offerId} />
      </Provider>
    );
  };

  it('should render all section components', () => {
    renderReviewSection();

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Reviews');
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getByTestId('comment-form')).toBeInTheDocument();
  });

  it('should fetch comments on mount', () => {
    renderReviewSection();

    expect(mockFetchComments).toHaveBeenCalledTimes(1);
    expect(mockFetchComments).toHaveBeenCalledWith({ offerId: mockOfferId });
  });

  it('should display correct number of reviews', () => {
    renderReviewSection();

    const reviewsAmount = screen.getByText('2');
    expect(reviewsAmount).toHaveClass('reviews__amount');
    expect(screen.getByTestId('reviews-list')).toHaveTextContent('2 items');
  });

  it('should pass correct props to child components', () => {
    renderReviewSection();

    expect(screen.getByTestId('reviews-list')).toHaveTextContent('2 items');
    expect(screen.getByTestId('comment-form')).toHaveTextContent(`Comment Form for offer ${mockOfferId}`);
  });

  it('should not fetch comments if offerId is empty', () => {
    vi.clearAllMocks();
    renderReviewSection('');

    expect(mockFetchComments).not.toHaveBeenCalled();
  });
});
