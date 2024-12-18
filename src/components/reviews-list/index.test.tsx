import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewsList } from './';
import { mockComment } from '../../mocks/comments';

vi.mock('../review-item', () => ({
  ReviewItem: ({ comment }: { comment: typeof mockComment }) => (
    <div data-testid="review-item">Review for {comment.id}</div>
  ),
}));

describe('Component: ReviewsList', () => {
  const mockComments = [
    { ...mockComment, id: '1' },
    { ...mockComment, id: '2' },
    { ...mockComment, id: '3' },
  ];

  it('should render all review items', () => {
    render(<ReviewsList comments={mockComments} />);

    const reviewItems = screen.getAllByTestId('review-item');
    expect(reviewItems).toHaveLength(mockComments.length);
    mockComments.forEach((comment, index) => {
      expect(reviewItems[index]).toHaveTextContent(`Review for ${comment.id}`);
    });
  });

  it('should have correct structure', () => {
    const { container } = render(<ReviewsList comments={mockComments} />);

    expect(container.querySelector('.reviews__list')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-testid="review-item"]')).toHaveLength(mockComments.length);
  });

  it('should not render anything when comments array is empty', () => {
    const { container } = render(<ReviewsList comments={[]} />);

    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId('review-item')).not.toBeInTheDocument();
  });

  it('should pass correct props to ReviewItem', () => {
    render(<ReviewsList comments={mockComments} />);

    mockComments.forEach((comment) => {
      expect(screen.getByText(`Review for ${comment.id}`)).toBeInTheDocument();
    });
  });
});
