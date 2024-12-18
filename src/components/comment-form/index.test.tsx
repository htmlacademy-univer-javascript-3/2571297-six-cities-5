import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { CommentForm } from './';
import { useActions } from '../../hooks';
import { ratingMap } from './constants';

vi.mock('../../hooks', () => ({
  useActions: vi.fn(),
}));

describe('CommentForm Component', () => {
  const mockOfferId = '1';
  const mockPostComment = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useActions as Mock).mockReturnValue({
      postComment: mockPostComment,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const submitForm = () => {
    const form = screen.getByTestId('review-form');
    fireEvent.submit(form);
  };

  it('should render form elements correctly', () => {
    render(<CommentForm offerId={mockOfferId} />);

    expect(screen.getByTestId('review-label')).toBeInTheDocument();
    expect(screen.getByTestId('review-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();

    Object.values(ratingMap).forEach((title) => {
      expect(screen.getByTitle(title)).toBeInTheDocument();
    });
  });

  it('should handle rating selection', () => {
    render(<CommentForm offerId={mockOfferId} />);
    const ratingLabel = screen.getByTitle(ratingMap[5]);
    const ratingInput = screen.getByTestId('rating-input-5');

    fireEvent.click(ratingLabel);

    expect((ratingInput as HTMLInputElement).checked).toBe(true);
  });

  it('should handle review text input', () => {
    render(<CommentForm offerId={mockOfferId} />);
    const textarea = screen.getByTestId('review-textarea');
    const testValue = 'Test review text that is longer than fifty characters to be valid input';

    fireEvent.change(textarea, { target: { value: testValue } });

    expect((textarea as HTMLTextAreaElement).value).toBe(testValue);
  });

  it('should disable submit button initially', () => {
    render(<CommentForm offerId={mockOfferId} />);
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });

  it('should enable submit button when form is valid', () => {
    render(<CommentForm offerId={mockOfferId} />);
    const ratingLabel = screen.getByTitle(ratingMap[5]);
    const textarea = screen.getByTestId('review-textarea');
    const validReview = 'Test review text that is longer than fifty characters to be valid input';

    fireEvent.click(ratingLabel);
    fireEvent.change(textarea, { target: { value: validReview } });

    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should submit form with correct data', () => {
    render(<CommentForm offerId={mockOfferId} />);
    const ratingLabel = screen.getByTitle(ratingMap[5]);
    const textarea = screen.getByTestId('review-textarea');
    const validReview = 'Test review text that is longer than fifty characters to be valid input';

    fireEvent.click(ratingLabel);
    fireEvent.change(textarea, { target: { value: validReview } });
    submitForm();

    expect(mockPostComment).toHaveBeenCalledWith({
      offerId: mockOfferId,
      rating: 5,
      comment: validReview,
    });
  });

  it('should reset form after submission', () => {
    render(<CommentForm offerId={mockOfferId} />);
    const ratingLabel = screen.getByTitle(ratingMap[5]);
    const ratingInput = screen.getByTestId('rating-input-5');
    const textarea = screen.getByTestId('review-textarea');
    const validReview = 'Test review text that is longer than fifty characters to be valid input';

    fireEvent.click(ratingLabel);
    fireEvent.change(textarea, { target: { value: validReview } });
    submitForm();

    expect((textarea as HTMLTextAreaElement).value).toBe('');
    expect((ratingInput as HTMLInputElement).checked).toBe(false);
  });
});
