// cspell:disable
import { ZekrPage } from "#types/content.model";
import SvgIcon from "@mui/material/SvgIcon";
import { createSlice } from "@reduxjs/toolkit";

export type AzkarPageReducerAction<PayloadType> = {
  type: string;
  payload: PayloadType;
}

export const azkarPageSlice = createSlice({
  name: "azkarPage",
  initialState: {
    id: '0',
    title: "",
    icon: "",
    azkar: [],
  } as ZekrPage,
  reducers: {
    setAzkarPage: (state, action: AzkarPageReducerAction<ZekrPage>) =>
    {
      return action.payload;
    },
  },
});

export default azkarPageSlice.reducer;
export const { setAzkarPage } = azkarPageSlice.actions;
