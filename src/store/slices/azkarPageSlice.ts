// cspell:disable
import { ZekrPage } from "#types/content.model";
import SvgIcon from "@mui/material/SvgIcon";
import { createSlice } from "@reduxjs/toolkit";

export const azkarPageSlice = createSlice({
  name: "azkarPage",
  initialState: {
    title: "",
    icon: "",
    azkar: [],
  } as ZekrPage,
  reducers: {
    setAzkarPage: (state, action) => {
      return action.payload.azkarPage as ZekrPage;
    },
  },
});

export default azkarPageSlice.reducer;
export const { setAzkarPage } = azkarPageSlice.actions;
