// cspell:disable
import { configureStore } from "@reduxjs/toolkit";
import drawerState from "./slices/drawerSlice";
import azkarPageState from "./slices/azkarPageSlice";
import favState from "./slices/favSlice";
import counterState from "./slices/counterSlice";
import timerState from "./slices/timerSlice";
import timerSettingsState from "./slices/timerSettingsSlice";

export const store = configureStore({
  reducer: {
    drawerState,
    azkarPageState,
    favState,
    counterState,
    timerState,
    timerSettingsState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
