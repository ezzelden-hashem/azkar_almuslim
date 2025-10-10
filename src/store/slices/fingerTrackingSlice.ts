import { Preferences } from "@capacitor/preferences";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storageKey = 'fingerTrackingState'
const initialValue: boolean = false;

export const initFingerTrackingState = createAsyncThunk(
    'fingerTracking/init',
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

export const setFingerTrackingState = createAsyncThunk(
    'fingerTracking/set',
    async (state: boolean, action) =>
    {
        await Preferences.set({ key: storageKey, value: JSON.stringify(state) });
        return state;
    })

export const fingerTrackingSlice = createSlice({
    name: 'fingerTracking',
    initialState: initialValue,
    reducers: {},
    extraReducers(builder)
    {
        builder.addCase(initFingerTrackingState.fulfilled, (state, action) =>
        {
            return action.payload;
        })
        builder.addCase(setFingerTrackingState.fulfilled, (state, action) =>
        {
            return action.payload;
        })
    },
})

export default fingerTrackingSlice.reducer
// export const {} = vibrationSlice.actions