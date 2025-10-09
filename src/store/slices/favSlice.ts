import { Preferences } from "@capacitor/preferences";
import { FavObject } from "#types/content.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storageKey = "favState";
const favState: FavObject[] = [];
export type FavReducerAction<PayloadType> = {
  type: string;
  payload: PayloadType;
}

// -------------------------------------------------------------
// Initialize favorites from storage
// -------------------------------------------------------------

export const initFavState = createAsyncThunk("fav/init", async () =>
{
  const storedFavState = await Preferences.get({ key: storageKey });
  if (storedFavState.value === null)
  {
    const state: FavObject[] = [];
    await Preferences.set({ key: storageKey, value: JSON.stringify(state) });
    return state;
  } else
  {
    return JSON.parse(storedFavState.value) as FavObject[];
  }
});

// -------------------------------------------------------------
// Add or update a favorite item
// -------------------------------------------------------------

export const setFavState = createAsyncThunk(
  "fav/set",
  async (fav: FavObject, action) =>
  {
    const storedFavState = await Preferences.get({ key: storageKey });
    if (storedFavState.value === null)
    {
      const state = [fav];
      await Preferences.set({ key: storageKey, value: JSON.stringify(state) });
      return state;
    } else
    {
      const favStateArray = JSON.parse(storedFavState.value) as FavObject[];
      const findResult = favStateArray.find((f) => f.id === fav.id);
      if (findResult)
      {
        const newFavArray = favStateArray.map((f) =>
        {
          if (f.id === fav.id)
          {
            return {
              ...f,
              state: fav.state
            }
          }
          return f;
        });
        await Preferences.set({
          key: storageKey,
          value: JSON.stringify(newFavArray),
        });
        return newFavArray;
      } else
      {
        const state = [...favStateArray, fav];
        await Preferences.set({
          key: storageKey,
          value: JSON.stringify(state),
        });
        return state;
      }
    }
  }
);
export const favSlice = createSlice({
  name: "fav",
  initialState: favState,
  reducers: {},
  extraReducers(builder)
  {
    builder.addCase(setFavState.fulfilled, (state, action) =>
    {
      return action.payload;
    });
    builder.addCase(initFavState.fulfilled, (state, action) =>
    {
      return action.payload;
    });
  },
});

export default favSlice.reducer;
// export const { invertFavState } = favSlice.actions;
