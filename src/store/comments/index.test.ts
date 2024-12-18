import { describe, it, expect } from 'vitest';
import { commentsReducer } from './index';
import { fetchComments, postComment } from '../action';
import { DEFAULT_REQUEST_ERROR } from '../../constants';
import { Comment } from '../../types/comment';
import { mockComment } from '../../mocks/comments';

describe('Comments Reducer', () => {
  const initialState = {
    comments: [],
    isLoading: false,
    error: null,
  };

  describe('initial state', () => {
    it('should return initial state when passed empty action', () => {
      const result = commentsReducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('fetchComments', () => {
    it('should set loading state when fetchComments.pending', () => {
      const result = commentsReducer(initialState, fetchComments.pending);

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should handle fetchComments.pending', () => {
      const result = commentsReducer(initialState, fetchComments.pending);

      expect(result).toEqual({
        ...initialState,
        isLoading: true,
        error: null,
      });
    });

    it('should clear loading state when fetchComments.fulfilled', () => {
      const loadingState = {
        ...initialState,
        isLoading: true,
      };

      const mockComments: Comment[] = [mockComment];
      const result = commentsReducer(loadingState, fetchComments.fulfilled(mockComments, '', { offerId: '1' }));

      expect(result.isLoading).toBe(false);
      expect(result.error).toBeNull();
    });

    it('should handle fetchComments.fulfilled', () => {
      const mockComments: Comment[] = [mockComment];
      const result = commentsReducer(initialState, fetchComments.fulfilled(mockComments, '', { offerId: '1' }));

      expect(result).toEqual({
        ...initialState,
        comments: mockComments,
        isLoading: false,
        error: null,
      });
    });

    it('should clear loading state when fetchComments.rejected', () => {
      const loadingState = {
        ...initialState,
        isLoading: true,
      };

      const result = commentsReducer(
        loadingState,
        fetchComments.rejected(null, '', { offerId: '1' }, DEFAULT_REQUEST_ERROR)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe(DEFAULT_REQUEST_ERROR);
    });

    it('should handle fetchComments.rejected', () => {
      const result = commentsReducer(
        initialState,
        fetchComments.rejected(null, '', { offerId: '1' }, DEFAULT_REQUEST_ERROR)
      );

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        error: DEFAULT_REQUEST_ERROR,
      });
    });
  });

  describe('postComment', () => {
    it('should handle postComment.fulfilled', () => {
      const existingComments: Comment[] = [mockComment];
      const stateWithComments = {
        ...initialState,
        comments: existingComments,
      };

      const newComment: Comment = {
        ...mockComment,
        id: '2',
        comment: 'New comment',
      };

      const result = commentsReducer(
        stateWithComments,
        postComment.fulfilled(newComment, '', {
          offerId: '1',
          comment: 'New comment',
          rating: 4,
        })
      );

      expect(result).toEqual({
        ...stateWithComments,
        comments: [...existingComments, newComment],
      });
    });

    it('should handle postComment.rejected', () => {
      const result = commentsReducer(
        initialState,
        postComment.rejected(
          null,
          '',
          {
            offerId: '1',
            comment: 'New comment',
            rating: 4,
          },
          DEFAULT_REQUEST_ERROR
        )
      );

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        error: DEFAULT_REQUEST_ERROR,
      });
    });
  });
});
