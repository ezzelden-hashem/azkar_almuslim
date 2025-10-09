import { createSlice } from "@reduxjs/toolkit";


export type DrawerReducerAction<PayloadType> = {
  type: string;
  payload: PayloadType;
}


export const drawerSlice = createSlice({
  name: "drawer",
  initialState: false,
  reducers: {
    setDrawerState: (state, action: DrawerReducerAction<boolean>) =>
    {
      return action.payload;
    },
    invertDrawerState: (state, action: DrawerReducerAction<undefined>) =>
    {
      return !state;
    },
  },
});
export default drawerSlice.reducer;
export const { setDrawerState, invertDrawerState } = drawerSlice.actions;
