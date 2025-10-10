import { Preferences } from "@capacitor/preferences";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storageKey = 'vibrationState'
const initialValue: boolean = false;

export const initVibrationState = createAsyncThunk(
    'vibration/init',
    async () =>
    {
        const storedState = await Preferences.get({ key: storageKey });
        if (storedState.value)
        {
            return JSON.parse(storedState.value) as boolean;
        }
        await Preferences.set({ key: storageKey, value: JSON.stringify(initialValue) });
        return initialValue;
    })

export const setVibrationState = createAsyncThunk(
    'vibration/set',
    async (state: boolean, action) =>
    {
        await Preferences.set({ key: storageKey, value: JSON.stringify(state) });
        return state;
    })

export const vibrationSlice = createSlice({
    name: 'vibration',
    initialState: false,
    reducers: {},
    extraReducers(builder)
    {
        builder.addCase(initVibrationState.fulfilled, (state, action) =>
        {
            return action.payload;
        })
        builder.addCase(setVibrationState.fulfilled, (state, action) =>
        {
            return action.payload;
        })
    },
})

export default vibrationSlice.reducer
// export const {} = vibrationSlice.actions