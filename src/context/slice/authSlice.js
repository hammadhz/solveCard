import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: {
      token: null,
      user: null,
    },
  },
  reducers: {
    registerUser: (state, action) => {
      state.userInfo.user = action.payload.user;
      state.userInfo.token = action.payload.token;
    },
    loginUser: (state, action) => {
      state.userInfo.user = action.payload.user;
      state.userInfo.token = action.payload.token;
    },
    logout: (state, action) => {
      state.userInfo.user = null;
      state.userInfo.token = null;
    },
  },
});

export const { registerUser, loginUser, logout } = authSlice.actions;
export default authSlice.reducer;
