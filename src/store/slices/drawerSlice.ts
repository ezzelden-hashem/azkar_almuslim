import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: false,
  reducers: {
    setDrawerState: (state, action) => {
      return action.payload.to as boolean;
    },
    invertDrawerState: (state, action) => {
      return !state;
    },
  },
});
export default drawerSlice.reducer;
export const { setDrawerState, invertDrawerState } = drawerSlice.actions;
