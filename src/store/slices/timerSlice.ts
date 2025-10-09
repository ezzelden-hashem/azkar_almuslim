import { AzkarPages } from "#content/_azkar.pages";
import { useAppDispatch } from "#hooks/hooks";
import { PageTimerStateObject } from "#types/content.model";
import { deepEqual } from "#utils/objects.util";
import { Preferences } from "@capacitor/preferences";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "#store/store";
import { resetCounterState, updateCounterState } from "./counterSlice";

const storageKey = "timerState";
const timerState: PageTimerStateObject[] = [];

export type TimerReducerAction<PayloadType> = {
  type: string;
  payload: PayloadType;
};
export type TimerCounter = {
  idx: number;
  value: number;
};
export type NewTimerCounter = {
  counters: number[];
  start: number;
  end: number;
};

export type TimerCounterId = {
  id: string;
}

export type TimerCounterThunkObject<PayloadType> = {
  id: string;
  payload: PayloadType;
};

// -------------------------------------------------------------
// Initialize timer from storage
// -------------------------------------------------------------
export const initTimerState = createAsyncThunk(
  "timer/init",
  async (state, action) =>
  {
    const storedTimer = await Preferences.get({ key: storageKey });
    if (storedTimer.value === null)
    {
      const state: PageTimerStateObject[] = [];
      await Preferences.set({ key: storageKey, value: JSON.stringify(state) });
      return state;
    } else
    {
      return JSON.parse(storedTimer.value) as PageTimerStateObject[];
    }
  }
);

// -------------------------------------------------------------
// update the current timer counter if exist
// -------------------------------------------------------------
export const updateTimerCounters = createAsyncThunk(
  "timer/update/counters",
  async (timerCounter: TimerCounterThunkObject<TimerCounter>, { dispatch, getState }) =>
  {
    // const dispatch = useAppDispatch();
    const storedTimers = await Preferences.get({ key: storageKey });
    if (storedTimers.value)
    {
      const allTimers: PageTimerStateObject[] = (JSON.parse(storedTimers.value) as PageTimerStateObject[]);
      const timer = allTimers.find(t => t.id === timerCounter.id);
      if (timer)
      {
        timer.counters[timerCounter.payload.idx] = timerCounter.payload.value;
        if (deepEqual(
          timer.counters,
          AzkarPages.find(p => p.id === timerCounter.id)?.azkar.flatMap(z => z.count)
        ))
        {
          await dispatch(deleteTimerCounters({ id: timerCounter.id.toString() }));
          dispatch(resetCounterState({ id: timerCounter.id }));
        }
        else
        {
          const newTimers = allTimers.map(t =>
          {
            if (t.id === timerCounter.id)
            {
              const newCounters = [...t.counters];
              newCounters[timerCounter.payload.idx] = timerCounter.payload.value;
              return {
                id: t.id,
                start: t.start,
                end: t.end,
                counters: newCounters
              } as PageTimerStateObject
            }
            return t;
          });
          await Preferences.set({
            key: storageKey,
            value: JSON.stringify(newTimers),
          });
          return newTimers;
        }
      }
    }
    await Preferences.set({
      key: storageKey,
      value: JSON.stringify([]),
    });
    return [];
  }
);

// -------------------------------------------------------------
// create a new timer if not exist
// -------------------------------------------------------------
export const createTimerCounters = createAsyncThunk(
  "timer/create/counters",
  async (timerCounter: TimerCounterThunkObject<NewTimerCounter>, action) =>
  {
    const storedTimers = await Preferences.get({ key: storageKey });
    if (storedTimers.value)
    {
      const allTimers: PageTimerStateObject[] = (JSON.parse(storedTimers.value) as PageTimerStateObject[]);
      if (allTimers.find(t => t.id === timerCounter.id) === undefined)
      {
        const newTimers = [...allTimers, {
          id: timerCounter.id,
          start: timerCounter.payload.start,
          end: timerCounter.payload.end,
          counters: timerCounter.payload.counters
        } as PageTimerStateObject];
        await Preferences.set({
          key: storageKey,
          value: JSON.stringify(newTimers),
        });
        return newTimers;
      }
      return allTimers;
    }
    await Preferences.set({
      key: storageKey,
      value: JSON.stringify([]),
    });
    return [];
  }
);





// -------------------------------------------------------------
// delete timer 
// -------------------------------------------------------------
export const deleteTimerCounters = createAsyncThunk(
  "timer/delete/counters",
  async (timerCounter: TimerCounterId, { dispatch }) =>
  {
    const storedTimers = await Preferences.get({ key: storageKey });
    if (storedTimers.value)
    {
      const allTimers: PageTimerStateObject[] = (JSON.parse(storedTimers.value) as PageTimerStateObject[]);
      if (allTimers.find(t => t.id == timerCounter.id))
      {
        const newTimers = allTimers.filter(t => t.id != timerCounter.id);
        await Preferences.set({
          key: storageKey,
          value: JSON.stringify(newTimers),
        });
        dispatch(resetCounterState({ id: timerCounter.id }))
        return newTimers;
      }
      return allTimers;
    }
    await Preferences.set({
      key: storageKey,
      value: JSON.stringify([]),
    });
    return [];
  }
);





// -------------------------------------------------------------
// Add or update a timer item
// -------------------------------------------------------------
export const setTimerState = createAsyncThunk(
  "timer/set",
  async (timer: PageTimerStateObject, action) =>
  {
    const storedTimer = await Preferences.get({ key: storageKey });
    if (storedTimer.value === null)
    {
      const state: PageTimerStateObject[] = [timer];
      await Preferences.set({ key: storageKey, value: JSON.stringify(state) });
      return state;
    } else
    {
      const timerStateArray = JSON.parse(
        storedTimer.value
      ) as PageTimerStateObject[];
      const findResult = timerStateArray.find((t) => t.id === timer.id);
      if (findResult)
      {
        const newTimerArray = timerStateArray.map((t) =>
        {
          if (t.id === timer.id)
          {
            return {
              ...t,
              start: timer.start,
              end: timer.end,
              counters: timer.counters,
            }
          }
          return t;
        });
        await Preferences.set({
          key: storageKey,
          value: JSON.stringify(newTimerArray),
        });
        return newTimerArray;
      } else
      {
        const state = [...timerStateArray, timer];
        await Preferences.set({
          key: storageKey,
          value: JSON.stringify(state),
        });
        return state;
      }
    }
  }
);

export const timerSlice = createSlice({
  name: "timer",
  initialState: timerState,
  reducers: {},
  extraReducers(builder)
  {
    builder.addCase(initTimerState.fulfilled, (state, action) =>
    {
      return action.payload;
    });
    builder.addCase(setTimerState.fulfilled, (state, action) =>
    {
      return action.payload;
    });
    builder.addCase(createTimerCounters.fulfilled, (state, action) =>
    {
      return action.payload;
    });
    builder.addCase(updateTimerCounters.fulfilled, (state, action) =>
    {
      return action.payload;
    });
    builder.addCase(deleteTimerCounters.fulfilled, (state, action) =>
    {
      return action.payload;
    });
  },
});

export default timerSlice.reducer;
