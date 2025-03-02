import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileSlice from "./slice/profileSlice";
import authSlice from "./slice/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import profilesSlice from "./slice/profilesSlice";

const persistConfig = {
  key: "solveCard",
  storage,
};

const rootReducer = combineReducers({
  profile: profileSlice,
  auth: authSlice,
  profiles: profilesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
