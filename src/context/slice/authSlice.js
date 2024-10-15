import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { registerUser, loginUser, logout } = authSlice.actions;
export default authSlice.reducer;
