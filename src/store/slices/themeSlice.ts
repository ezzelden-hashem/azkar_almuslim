import { Preferences } from "@capacitor/preferences";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialValue: string = 'default'
const storageKey = 'themeState'

export const initThemeState = createAsyncThunk(
    'theme/init',
    async () =>
    {
        const storedState = await Preferences.get({ key: storageKey });
        if (storedState.value)
        {
            return JSON.parse(storedState.value) as string;
        }
        await Preferences.set({ key: storageKey, value: JSON.stringify(initialValue) });
        return initialValue;
    })

export const setThemeState = createAsyncThunk(
    'theme/set',
    async (themeName: string) =>
    {
        await Preferences.set({ key: storageKey, value: JSON.stringify(themeName) });
        return themeName;
    })

export const themeSlice = createSlice({
    name: 'theme',
    initialState: initialValue,
    reducers: {},
    extraReducers(builder)
    {
        builder.addCase(initThemeState.fulfilled, (state, action) =>
        {
            return action.payload;
        })
        builder.addCase(setThemeState.fulfilled, (state, action) =>
        {
            return action.payload;
        })
    },
})

export default themeSlice.reducer
// export const {} = vibrationSlice.actions