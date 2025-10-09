import { PageCounterStateObject } from "#types/content.model";
import { createSlice } from "@reduxjs/toolkit";
import { createTimerCounters, deleteTimerCounters, initTimerState, updateTimerCounters } from "./timerSlice";
import { AzkarPages } from "#content/_azkar.pages";

export type AppCounter = {
  id: string;
  counter: {
    idx: number;
    value: number;
  }
}
export type CounterPageId = {
  id: string;
}
export type CounterReducerAction<PayloadType> = {
  type: string;
  payload: PayloadType;
}
const counterState: PageCounterStateObject[] = [];








export const counterSlice = createSlice({
  name: "counter",
  initialState: counterState,
  reducers: {
    initCounterState: (state, action: CounterReducerAction<PageCounterStateObject[]>) =>
    {
      return action.payload;
    },
    updateCounterState: (state, action: CounterReducerAction<AppCounter>) =>
    {
      if (!state.find(c => c.id === action.payload.id)) return state;
      return state.map(c => 
      {
        if (c.id === action.payload.id)
        {
          const newCounters = [...c.counters];
          newCounters[action.payload.counter.idx] = action.payload.counter.value;
          return {
            id: c.id,
            counters: newCounters
          } as PageCounterStateObject
        }
        return c;
      }
      )
    },
    resetCounterState: (state, action: CounterReducerAction<CounterPageId>) =>
    {
      return state.map(c =>
      {
        if (c.id == action.payload.id)
        {
          return {
            id: c.id,
            counters: AzkarPages.find(p => p.id == action.payload.id)?.azkar.flatMap(z => z.count)
          } as PageCounterStateObject
        }
        return c;
      })
    }
  },
  extraReducers(builder)
  {
    builder.addCase(initTimerState.fulfilled, (state, action) =>
    {
      return state.map(c =>
      {
        const timer = action.payload.find(t => t.id === c.id)
        if (timer)
        {
          return {
            id: timer.id,
            counters: timer.counters
          } as PageCounterStateObject;
        }
        return c;
      })
    });
    builder.addCase(createTimerCounters.fulfilled, (state, action) =>
    {
      return state.map(c =>
      {
        const timer = action.payload.find(t => t.id === c.id)
        if (timer)
        {
          return {
            id: timer.id,
            counters: timer.counters
          } as PageCounterStateObject;
        }
        return c;
      })
    });
    builder.addCase(updateTimerCounters.fulfilled, (state, action) =>
    {
      return state.map(c =>
      {
        const timer = action.payload.find(t => t.id === c.id)
        if (timer)
        {
          return {
            id: timer.id,
            counters: timer.counters
          } as PageCounterStateObject;
        }
        return c;
      })
    });
    builder.addCase(deleteTimerCounters.fulfilled, (state, action) =>
    {
      return state.map(c =>
      {
        const timer = action.payload.find(t => t.id === c.id)
        if (timer)
        {
          return {
            id: timer.id,
            counters: timer.counters
          } as PageCounterStateObject;
        }
        return c;
      })
    });
  },
});
export default counterSlice.reducer;
export const { initCounterState, updateCounterState, resetCounterState } = counterSlice.actions;
