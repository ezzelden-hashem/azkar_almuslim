// cspell:disable
import { configureStore } from "@reduxjs/toolkit";
import drawerState from "./slices/drawerSlice";
import azkarPageState from "./slices/azkarPageSlice";

export const store = configureStore({
  reducer: {
    drawerState,
    azkarPageState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
