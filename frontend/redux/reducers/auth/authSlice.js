import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuth: false,
  errorMessage: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuth = true;
    },
    loginFailed: (state, action) => {
      state.errorMessage = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.errorMessage = '';
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.errorMessage = '';
    },
  },
});

export const {
  loginSuccess,
  setUser,
  loginFailed,
  logout,
} = authSlice.actions;

export default authSlice.reducer;


