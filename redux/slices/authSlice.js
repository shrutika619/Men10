import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isfirstime: false,
  isExpired: false,
  orgData: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSuccess: () => initialState,

    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.orgData = action.payload.user;
      state.loading = false;
      state.error = null;
    },

    updateRole: (state, action) => {
      state.role = action.payload;
    },

    updateFirstLogin: (state, action) => {
      state.isfirstime = action.payload;
    },

    setExpired: (state, action) => {
      state.isExpired = action.payload;
    },

    updateOrgData: (state, action) => {
      state.orgData = action.payload;
    },
  },
});

export const {
  logoutSuccess,
  loginSuccess,
  updateRole,
  updateFirstLogin,
  setExpired,
  updateOrgData,
} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;

export default authSlice.reducer;
