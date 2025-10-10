// cspell:disable
import { configureStore } from "@reduxjs/toolkit";
import drawerState from "./slices/drawerSlice";
import azkarPageState from "./slices/azkarPageSlice";
import favState from "./slices/favSlice";
import counterState from "./slices/counterSlice";
import timerState from "./slices/timerSlice";
import timerSettingsState from "./slices/timerSettingsSlice";
import copyTextState from "./slices/copyTextSlice";
import fontSizeState from "./slices/fontSizeSlice";
import themeState from "./slices/themeSlice";
import vibrationState from "./slices/vibrationSlice";
import fingerTrackingState from "./slices/fingerTrackingSlice";

export const store = configureStore({
  reducer: {
    drawerState,
    azkarPageState,
    favState,
    counterState,
    timerState,
    timerSettingsState,
    copyTextState,
    fontSizeState,
    themeState,
    vibrationState,
    fingerTrackingState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
