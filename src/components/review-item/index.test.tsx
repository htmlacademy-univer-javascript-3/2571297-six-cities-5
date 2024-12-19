import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewItem } from './';
import { Comment } from '../../types/comment';

vi.mock('../../utils/date', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  convertDate: (_date: string) => 'Mocked date',
}));

vi.mock('../../utils/rating', () => ({
  calculateRating: (rating: number) => rating * 20,
}));

describe('Component: ReviewItem', () => {
  const mockComment: Comment = {
    id: '1',
    user: {
      name: 'John Doe',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    },
    rating: 4,
    date: '2024-01-01',
    comment: 'Great place to stay!',
  };

  it('should render review details correctly', () => {
    render(<ReviewItem comment={mockComment} />);

    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute('src', mockComment.user.avatarUrl);

    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
    expect(screen.getByText('Mocked date')).toBeInTheDocument();
  });

  it('should have correct rating width', () => {
    render(<ReviewItem comment={mockComment} />);

    const ratingSpan = screen.getByText('Rating').previousSibling as HTMLElement;
    expect(ratingSpan.style.width).toBe('80%');
  });

  it('should have correct structure', () => {
    const { container } = render(<ReviewItem comment={mockComment} />);

    expect(container.querySelector('.reviews__item')).toBeInTheDocument();
    expect(container.querySelector('.reviews__user')).toBeInTheDocument();
    expect(container.querySelector('.reviews__avatar-wrapper')).toBeInTheDocument();
    expect(container.querySelector('.reviews__info')).toBeInTheDocument();
    expect(container.querySelector('.reviews__rating')).toBeInTheDocument();
    expect(container.querySelector('.reviews__text')).toBeInTheDocument();
    expect(container.querySelector('.reviews__time')).toBeInTheDocument();
  });

  it('should format date using convertDate util', () => {
    render(<ReviewItem comment={mockComment} />);

    expect(screen.getByText('Mocked date')).toBeInTheDocument();
  });

  it('should calculate rating width using calculateRating util', () => {
    render(<ReviewItem comment={mockComment} />);

    const ratingSpan = screen.getByText('Rating').previousSibling as HTMLElement;
    expect(ratingSpan.style.width).toBe('80%');
  });
});
