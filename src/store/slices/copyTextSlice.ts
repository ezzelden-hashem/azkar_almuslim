import { Preferences } from "@capacitor/preferences";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storageKey = 'copyTextState'
const initialValue: boolean = false;

export const initCopyTextState = createAsyncThunk(
    'copyText/init',
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

export const setCopyTextState = createAsyncThunk(
    'copyText/set',
    async (state: boolean, action) =>
    {
        await Preferences.set({ key: storageKey, value: JSON.stringify(state) });
        return state;
    })

export const copyTextSlice = createSlice({
    name: 'copyText',
    initialState: initialValue,
    reducers: {},
    extraReducers(builder)
    {
        builder.addCase(initCopyTextState.fulfilled, (state, action) =>
        {
            return action.payload;
        })
        builder.addCase(setCopyTextState.fulfilled, (state, action) =>
        {
            return action.payload;
        })
    },
})

export default copyTextSlice.reducer
// export const {} = vibrationSlice.actions