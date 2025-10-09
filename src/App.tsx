import { RouterProvider } from "react-router";
import "./styles/App.css";
import { router } from "./routes/routes";
import { useEffect } from "react";
import { useAppDispatch } from "#hooks/hooks";
import { initFavState } from "#store/slices/favSlice";
import { deleteTimerCounters, initTimerState } from "#store/slices/timerSlice";
import { initCounterState } from "#store/slices/counterSlice";
import { AzkarPages } from "#content/_azkar.pages";
import { PageCounterStateObject } from "#types/content.model";
import { initTimerSettingsState, setTimerSettingsState } from "#store/slices/timerSettingsSlice";

function App() {
  const dispatch = useAppDispatch();
  const pagesCounters: PageCounterStateObject[] = AzkarPages.flatMap(p => {
    return {id: p.id, counters: p.azkar.flatMap(c => c.count)} as PageCounterStateObject;
  });
  useEffect(() => {
    dispatch(initFavState());
    dispatch(initTimerSettingsState());
    dispatch(initTimerState());
    dispatch(initCounterState(pagesCounters));
    dispatch(setTimerSettingsState({id: '1', duration: {hours: 0, minutes: 0, seconds: 20}}));
    dispatch(setTimerSettingsState({id: '2', duration: {hours: 0, minutes: 0, seconds: 20}}));
  }, [])
  return (
    <div className="App" id="app-id">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
