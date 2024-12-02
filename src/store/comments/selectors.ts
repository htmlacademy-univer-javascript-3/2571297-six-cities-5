import { RootState } from '../../types/store';

export const selectCommentsData = (state: RootState) => state.comments;
