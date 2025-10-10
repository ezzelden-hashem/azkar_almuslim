import { MuiIcons } from '#assets/icons/mui.icons';
import CardContainer from '#components/CardContainer/CardContainer';
import ZekrCard from '#components/ZekrCard/ZekrCard';
import { AzkarPages } from '#content/_azkar.pages';
import { RootState } from '#store/store';
import './TimerPage.css'

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useContext, useEffect, useState } from 'react';
import { SelectedTimerInfo, TimerDuration } from '#types/content.model';
import TimerSettings from './TimerSettings/TimerSettings';
import { setTimerSettingsState } from '#store/slices/timerSettingsSlice';
import { useAppDispatch, useAppSelector } from '#hooks/hooks';
import { selectedTimerContext, SelectedTimerProvider } from '#context/timerDefaultValueContext';



export default function TimerPage()
{
    const dispatch = useAppDispatch();
    const selectedTimerCtx = useContext(selectedTimerContext);
    const timerSettingsState = useAppSelector(state => state.timerSettingsState)
    const [showTimerSettings, setShowTimerSettings] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>('');
    const [hasTimer, setHasTimer] = useState<boolean>(false);

    const [defaultTimerValue, setDefaultTimerValue] = useState<TimerDuration>({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const icons = MuiIcons;
    const saveTimeSettings = (duration: TimerDuration) =>
    {
        if (selectedTimerCtx?.[0].state)
        {
            dispatch(setTimerSettingsState({ id: selectedId, duration: duration }))
        }
        setShowTimerSettings(false);
    }
    const showSettings = (id: string) =>
    {
        setSelectedId(prev => id);
        setShowTimerSettings(true);
    }
    useEffect(() =>
    {
        const pageTimer = timerSettingsState.find(t => t.id == selectedId)
        if (pageTimer)
        {
            selectedTimerCtx?.[1]({
                id: selectedId,
                duration: {
                    hours: pageTimer.duration.hours,
                    minutes: pageTimer.duration.minutes,
                    seconds: pageTimer.duration.seconds
                },
                state: true
            })
        }
        else
        {
            selectedTimerCtx?.[1]({
                id: selectedId,
                duration: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                },
                state: false
            })
        }

    }, [timerSettingsState, selectedId])
    return (<>
        <div className="app-timer">
            <div className="at-header">
                <div className="at-h-icon"><AccessTimeFilledIcon style={{ fontSize: "22px" }} /></div>
                <div className="at-h-title">المؤقت</div>
            </div>
            <div className="at-body">

                <TimerSettings
                    onDone={(e, duration) => saveTimeSettings(duration)}
                    onCancel={e => setShowTimerSettings(false)}
                    visible={showTimerSettings} />




                <CardContainer>
                    {AzkarPages.map(t =>
                    {
                        const icon = icons.find(i => i.name === t.icon)!.icon

                        return (
                            <div key={t.id} onClick={e => showSettings(t.id)}>
                                <ZekrCard title={t.title} icon={icon} />
                            </div>
                        )
                    })}
                </CardContainer>
            </div>

        </div>
    </>)
}