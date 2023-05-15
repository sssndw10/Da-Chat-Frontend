import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export interface AuthState {
  isLoggedIn: boolean;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}

const initialState: AuthState = {
  isLoggedIn: cookies.get('refreshToken') ? true : false,
  tokens: {
    accessToken: null,
    refreshToken: cookies.get('refreshToken') ?? null,
  },
};

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (arg, { getState }) => {
    const state = (getState() as any).auth as AuthState;

    try {
      const response = await axios.get('http://localhost:3000/auth/refresh', {
        headers: {
          Authorization: `Bearer ${state.tokens.refreshToken}`,
        },
      });

      return {
        isError: false,
        accessToken: response.data.accessToken,
      };
    } catch {
      return {
        isError: true,
        accessToken: null,
      };
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      cookies.set('refreshToken', action.payload.refreshToken);
      return {
        ...state,
        tokens: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
      };
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    },
    resetTokens: (state) => {
      cookies.remove('refreshToken');
      return {
        isLoggedIn: false,
        tokens: {
          accessToken: null,
          refreshToken: null,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      if (action.payload.isError) {
        return {
          isLoggedIn: false,
          tokens: {
            accessToken: null,
            refreshToken: null,
          },
        };
      } else {
        return {
          isLoggedIn: true,
          tokens: {
            ...state.tokens,
            accessToken: action.payload.accessToken,
          },
        };
      }
    });
  },
});

export const { setTokens, setIsLoggedIn, resetTokens } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectTokens = (state: RootState) => state.auth.tokens;

export default authSlice.reducer;
