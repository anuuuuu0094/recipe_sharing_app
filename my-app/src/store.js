// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../my-app/src/redux/authSlice";
import recipeReducer from "../../my-app/src/redux/recipeSlice";

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
