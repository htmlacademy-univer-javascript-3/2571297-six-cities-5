import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/comment';
import { fetchComments, postComment } from './actions';
import { RequestError } from '../../types/error';
import { DEFAULT_REQUEST_ERROR } from '../../constants';

type CommentsState = {
  comments: Comment[];
  isLoading: boolean;
  error: RequestError | null;
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
