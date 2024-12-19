import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types/comment';
import { ApiRoute } from '../../constants';
import { createError } from '../../utils/error';
import { ThunkConfig } from '../../types/store';
import { api } from '../../services/api';
import { Actions } from '../../constants';

export const fetchComments = createAsyncThunk<Comment[], { offerId: string }, ThunkConfig>(
  Actions.FETCH_COMMENTS,
  async ({ offerId }, { rejectWithValue }) => {
    try {
      const response = await api.get<Comment[]>(ApiRoute.Comments.replace(':offerId', offerId));
      const comments: Comment[] = response.data;
      return comments;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);

export const postComment = createAsyncThunk<Comment, { offerId: string; comment: string; rating: number }, ThunkConfig>(
  Actions.POST_COMMENT,
  async ({ offerId, comment, rating }, { rejectWithValue }) => {
    try {
      const response = await api.post<Comment>(ApiRoute.Comments.replace(':offerId', offerId), { comment, rating });
      const newComment: Comment = response.data;
      return newComment;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);
