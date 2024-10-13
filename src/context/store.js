import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slice/themeSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});

export default store;
