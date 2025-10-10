import { RouterProvider } from "react-router";
import "./styles/App.css";
import { router } from "./routes/routes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "#hooks/hooks";
import { initFavState } from "#store/slices/favSlice";
import { deleteTimerCounters, initTimerState } from "#store/slices/timerSlice";
import { initCounterState } from "#store/slices/counterSlice";
import { AzkarPages } from "#content/_azkar.pages";
import { PageCounterStateObject } from "#types/content.model";
import { initTimerSettingsState, setTimerSettingsState } from "#store/slices/timerSettingsSlice";
import { initCopyTextState } from "#store/slices/copyTextSlice";
import { initFontSizeState } from "#store/slices/fontSizeSlice";
import { initThemeState } from "#store/slices/themeSlice";
import { initVibrationState } from "#store/slices/vibrationSlice";
import { initFingerTrackingState } from "#store/slices/fingerTrackingSlice";
import { RootState } from "#store/store";
import { SelectedTimerProvider } from "#context/timerDefaultValueContext";

function App()
{
  const dispatch = useAppDispatch();
  const pagesCounters: PageCounterStateObject[] = AzkarPages.flatMap(p =>
  {
    return { id: p.id, counters: p.azkar.flatMap(c => c.count) } as PageCounterStateObject;
  });
  const currentTheme = useAppSelector((state: RootState) => state.themeState);
  useEffect(() =>
  {
    dispatch(initFavState());
    dispatch(initTimerSettingsState());
    dispatch(initTimerState());
    dispatch(initCounterState(pagesCounters));
    dispatch(initCopyTextState());
    dispatch(initFontSizeState());
    dispatch(initThemeState());
    dispatch(initVibrationState());
    dispatch(initFingerTrackingState());
  }, [])
  useEffect(() =>
  {
    const bodyElement = document.body;
    bodyElement.className = currentTheme;
  }, [currentTheme])
  return (
    <div className='App' id="app-id">
      <SelectedTimerProvider>
        <RouterProvider router={router} />
      </SelectedTimerProvider>
    </div>
  );
}

export default App;
