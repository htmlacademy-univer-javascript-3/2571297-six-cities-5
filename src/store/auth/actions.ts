import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthInfo, UserData } from '../../types/auth';
import { ApiRoute } from '../../constants';
import { createError } from '../../utils/error';
import { ThunkConfig } from '../../types/store';
import { api } from '../../services/api';
import { Actions } from '../../constants';
import { handleToken, dropToken } from '../../utils/token';

export const checkAuth = createAsyncThunk<UserData, void, ThunkConfig>(
  Actions.CHECK_AUTH,
  async (_arg, { rejectWithValue }) => {
    try {
      const { data } = await api.get<UserData>(ApiRoute.Login);
      handleToken(data.token);
      return data;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);

export const login = createAsyncThunk<UserData, AuthInfo, ThunkConfig>(
  Actions.LOGIN,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(ApiRoute.Login, { email, password });
      handleToken(data.token);
      return data;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);

export const logout = createAsyncThunk<void, void, ThunkConfig>(Actions.LOGOUT, async (_arg, { rejectWithValue }) => {
  try {
    await api.delete(ApiRoute.Logout);
    dropToken();
  } catch (err) {
    return rejectWithValue(createError(err));
  }
});
