import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";
import type { RootState } from "../../store";
import { removeStorageItem } from "@/utils/storage";
  
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  /** Set true after we've tried loading auth from localStorage (avoids redirect before rehydration) */
  rehydrated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  rehydrated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    setRehydrated: (state) => {
      state.rehydrated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeStorageItem("token");
      removeStorageItem("user");
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    },
});

export const { setCredentials, setRehydrated, logout, setIsLoading } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectRehydrated = (state: RootState) => state.auth.rehydrated;