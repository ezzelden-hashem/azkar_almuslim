import { SvgIconComponent } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { ReactNode } from "react";

// cspell:disable
export type Zekr = {
  begin?: string;
  content: string;
  end?: string;
  info?: string;
  count: number;
};
export type AzkarPage = {
  name: string;
  title: string;
  favState: boolean;
};
export type ZekrPage = {
  id: number;
  title: string;
  icon: string;
  azkar: Zekr[];
};
export type MuiIcon = {
  name: string;
  icon: ReactNode;
};
