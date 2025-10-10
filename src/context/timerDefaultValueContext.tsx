import { SelectedTimerInfo, TimerDuration } from "#types/content.model";
import { createContext, ReactNode, useState } from "react";

type SelectedTimerProviderProps = {
    children: ReactNode;
}

const initialValue: SelectedTimerInfo = {
    id: '',
    duration: {
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    state: false
}
export const selectedTimerContext = createContext<[SelectedTimerInfo, React.Dispatch<React.SetStateAction<SelectedTimerInfo>>] | undefined>(undefined);

export function SelectedTimerProvider({ children }: SelectedTimerProviderProps)
{
    const [selectedTimer, setSelectedTimer] = useState(initialValue)
    return (
        <selectedTimerContext.Provider value={[selectedTimer, setSelectedTimer]}>
            {children}
        </selectedTimerContext.Provider>
    )
}