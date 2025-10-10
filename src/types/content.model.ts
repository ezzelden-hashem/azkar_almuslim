import { SvgIconComponent } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { ReactNode } from "react";

// cspell:disable
export type TimerDuration = {
  hours: number;
  minutes: number;
  seconds: number;
}
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
  id: string;
  title: string;
  icon: string;
  azkar: Zekr[];
};
export type MuiIcon = {
  name: string;
  icon: ReactNode;
};
export type FavObject = {
  id: string;
  state: boolean;
};
export type PageCounterStateObject = {
  id: string;
  counters: number[];
};
export type PageTimerStateObject = {
  id: string;
  start: number | null;
  end: number | null;
  counters: number[];
};
export type PageTimerSettingsStateObject = {
  id: string;
  duration: TimerDuration;
}
export type Theme = {
  name: string;
  title: string;
  icon?: ReactNode;
}
export type SelectedTimerInfo = {
  id: string;
  duration: TimerDuration;
  state: boolean;
}