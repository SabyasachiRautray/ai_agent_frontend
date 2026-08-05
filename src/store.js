import { configureStore } from "@reduxjs/toolkit";
import { jarvisApi } from "./api/jarvisApi";

export const store = configureStore({
  reducer: {
    [jarvisApi.reducerPath]: jarvisApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(jarvisApi.middleware),
});