import { PageTimerSettingsStateObject, TimerDuration } from "#types/content.model";
import { Preferences } from "@capacitor/preferences";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTimerCounters } from "./timerSlice";

const timerSettingsState: PageTimerSettingsStateObject[] = []
const storageKey = 'timerSettingsState'

// -------------------------------------------------------------
// Initialize timer from storage
// -------------------------------------------------------------

export const initTimerSettingsState = createAsyncThunk(
    "timer/settings/init",
    async (state, action) =>
    {
        const storedTimerSettings = await Preferences.get({ key: storageKey });
        if (storedTimerSettings.value === null)
        {
            const state: PageTimerSettingsStateObject[] = [];
            await Preferences.set({ key: storageKey, value: JSON.stringify(state) });
            return state;
        } else
        {
            return JSON.parse(storedTimerSettings.value) as PageTimerSettingsStateObject[];
        }
    }
);


// -------------------------------------------------------------
// Add or update a timer item
// -------------------------------------------------------------

export const setTimerSettingsState = createAsyncThunk(
    "timer/settings/set",
    async (timerSetting: PageTimerSettingsStateObject, action) =>
    {
        const storedTimerSettings = await Preferences.get({ key: storageKey });
        if (storedTimerSettings.value === null)
        {
            const state: PageTimerSettingsStateObject[] = [timerSetting];
            await Preferences.set({ key: storageKey, value: JSON.stringify(state) });
            return state;
        } else
        {
            const timerSettingsStateArray = JSON.parse(
                storedTimerSettings.value
            ) as PageTimerSettingsStateObject[];
            const findResult = timerSettingsStateArray.find((t) => t.id === timerSetting.id);
            if (findResult)
            {
                const newTimerSettingsArray = timerSettingsStateArray.map((t) =>
                {
                    if (t.id === timerSetting.id)
                    {
                        const hours = ((timerSetting.duration.hours ?? 0) === 0) &&
                            ((timerSetting.duration.minutes ?? 0) === 0) ? 1 : (timerSetting.duration.hours ?? 0)
                        return {
                            ...t,
                            duration: {
                                hours: hours,
                                minutes: timerSetting.duration.minutes ?? 0,
                                seconds: timerSetting.duration.seconds ?? 0,
                            }
                        }
                    }
                    return t;
                });
                await Preferences.set({
                    key: storageKey,
                    value: JSON.stringify(newTimerSettingsArray),
                });
                return newTimerSettingsArray;
            } else
            {
                const state = [...timerSettingsStateArray, timerSetting];
                await Preferences.set({
                    key: storageKey,
                    value: JSON.stringify(state),
                });
                return state;
            }
        }
    }
);



// -------------------------------------------------------------
// delete a timer item
// -------------------------------------------------------------

export const deleteTimerSettingsState = createAsyncThunk(
    "timer/settings/delete",
    async (timerId: string, { dispatch }) =>
    {
        await dispatch(deleteTimerCounters({ id: timerId }));
        const storedTimerSettings = await Preferences.get({ key: storageKey });
        if (storedTimerSettings.value === null)
        {
            const state: PageTimerSettingsStateObject[] = [];
            await Preferences.set({ key: storageKey, value: JSON.stringify(state) });
            return state;
        } else
        {
            const timerSettingsStateArray = JSON.parse(
                storedTimerSettings.value
            ) as PageTimerSettingsStateObject[];
            const findResult = timerSettingsStateArray.find((t) => t.id === timerId);
            if (findResult)
            {
                const newTimerSettingsArray = timerSettingsStateArray.filter(t => t.id != timerId)
                await Preferences.set({
                    key: storageKey,
                    value: JSON.stringify(newTimerSettingsArray),
                });
                return newTimerSettingsArray;
            }
            return timerSettingsStateArray;
        }
    }
);

export const timerSettingsSlice = createSlice({
    name: 'timer/settings',
    initialState: timerSettingsState,
    reducers: {},
    extraReducers(builder)
    {
        builder.addCase(initTimerSettingsState.fulfilled, (state, action) =>
        {
            return action.payload;
        });
        builder.addCase(setTimerSettingsState.fulfilled, (state, action) =>
        {
            return action.payload;
        });
        builder.addCase(deleteTimerSettingsState.fulfilled, (state, action) =>
        {
            return action.payload;
        });
    },
})

export default timerSettingsSlice.reducer;