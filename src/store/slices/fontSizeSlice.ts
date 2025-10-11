import { Preferences } from "@capacitor/preferences";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialValue: number = 3
const storageKey = 'fontSizeState'

const fontSizeMap: { [key: number]: string } = {
    1: '14px',
    2: '16px',
    3: '18px',
    4: '20px',
    5: '22px',
}


export const initFontSizeState = createAsyncThunk(
    'fontSize/init',
    async () =>
    {
        const storedState = await Preferences.get({ key: storageKey });
        if (storedState.value)
        {
            return JSON.parse(storedState.value) as number;
        }
        await Preferences.set({ key: storageKey, value: JSON.stringify(initialValue) });
        return initialValue;
    })

export const setFontSizeState = createAsyncThunk(
    'fontSize/set',
    async (fontSize: number) =>
    {
        await Preferences.set({ key: storageKey, value: JSON.stringify(fontSize) });
        return fontSize;
    })

export const fontSizeSlice = createSlice({
    name: 'fontSize',
    initialState: initialValue,
    reducers: {},
    extraReducers(builder)
    {
        builder.addCase(initFontSizeState.fulfilled, (state, action) =>
        {
            document.documentElement.style.fontSize = fontSizeMap[action.payload]
            return action.payload;
        })
        builder.addCase(setFontSizeState.fulfilled, (state, action) =>
        {
            document.documentElement.style.fontSize = fontSizeMap[action.payload]
            return action.payload;
        })
    },
})

export default fontSizeSlice.reducer
// export const {} = vibrationSlice.actions