import { PageTimerSettingsStateObject } from "#types/content.model";
import { Preferences } from "@capacitor/preferences";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
                        return {
                            ...t,
                            duration: timerSetting.duration
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
    },
})

export default timerSettingsSlice.reducer;