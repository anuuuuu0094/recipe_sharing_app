// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import recipeReducer from "./redux/recipeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
