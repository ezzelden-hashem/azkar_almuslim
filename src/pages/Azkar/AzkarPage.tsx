// cspell:disable
import { useSelector } from 'react-redux'
import './AzkarPage.css'
import { RootState } from '#store/store'

import ReplayIcon from '@mui/icons-material/Replay';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MouseEvent, TouchEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { setFavState } from '#store/slices/favSlice';
import { useAppDispatch, useAppSelector } from '#hooks/hooks';
import { resetCounterState, updateCounterState } from '#store/slices/counterSlice';
import { createTimerCounters, deleteTimerCounters, updateTimerCounters } from '#store/slices/timerSlice';
import { CurrentMoment, TimeUnitConverter } from '#utils/time.util';


export default function AzkarPage()
{
    const dispatch = useAppDispatch();
    const favState = useSelector((state: RootState) => state.favState);
    const counterState = useSelector((state: RootState) => state.counterState);
    const azkarPage = useAppSelector((state: RootState) => state.azkarPageState);
    const routerLocation = useLocation();
    const [pageFavState, setPageFavState] = useState<boolean>(false);
    const [progressValue, setProgressValue] = useState(0);
    const [timerUi, setTimerUi] = useState('00:00:00');


    const timerSettingsState = useSelector((state: RootState) => state.timerSettingsState);
    const pageTimerSetting = timerSettingsState.find(p => p.id === azkarPage.id);
    const timerState = useSelector((state: RootState) => state.timerState);
    const pageTimerState = timerState.find(t => t.id === azkarPage.id);
    let index = 0;
    const startSqueeze = (e: TouchEvent | MouseEvent) =>
    {
        (e.target as HTMLDivElement).classList.add('active')
    }
    const endSqueeze = (e: TouchEvent | MouseEvent) =>
    {
        setTimeout(() => {
            (e.target as HTMLDivElement).classList.remove('active')
        }, 50);
    }


    useEffect( () => {
        const timerUiElement = document.getElementById('timer-ui-id');
        if (pageTimerState)
        {
            const timerWatcher = setInterval(() => {
                if (pageTimerState.end! < Date.now())
                {
                    async function deleteAndResetTimer()
                    {
                        await dispatch(deleteTimerCounters({id: azkarPage.id.toString()}));
                        dispatch(resetCounterState({id: azkarPage.id.toString()}));
                    }
                    deleteAndResetTimer()
                    clearInterval(timerWatcher)
                    timerUiElement?.classList.remove('active');
                }
                else
                {
                    const rest = new TimeUnitConverter(pageTimerState.end! - Date.now()).getTimeFormat('HH:mm:ss');
                    setTimerUi(prev => rest)
                    timerUiElement?.classList.add('active');
                }
            }, 500)
            return () => clearInterval(timerWatcher);
        }
        else
        {
            timerUiElement?.classList.remove('active');
        }
    }, [counterState, timerState, timerSettingsState])


    useEffect(() => {
        const rootElement = document.getElementById('root') as HTMLDivElement;
        const onScroll = () => {
            const progress = (rootElement.scrollTop / (rootElement.scrollHeight - window.innerHeight)) * 100;
            setProgressValue(progress);
        }
        rootElement.addEventListener('scroll', onScroll)
        return () => rootElement.removeEventListener('scroll', onScroll);
    }, [routerLocation])


    useEffect(() => {
        const _fav = favState.find(f => f.id === azkarPage.id)
        if (_fav)
        {
            setPageFavState((_fav.state)? true : false)
        }
        else setPageFavState(false);
    }, [favState, azkarPage.id])

    const decrementCounter = (e: MouseEvent | PointerEvent) => 
    {
        const counterElement = (e.currentTarget as HTMLDivElement);
        const idx = parseInt(counterElement.id.split('-')[counterElement.id.split('-').length - 1]) - 1;
        const count = counterState.find(c => c.id === azkarPage.id)?.counters[idx] ?? 0;
        if (count <= 0) return;
        if (pageTimerState)
        {
            dispatch(updateTimerCounters({
                id: azkarPage.id,
                payload: {idx: idx, value: count - 1}
            }))
        }
        else if (pageTimerSetting)
        {
            const newCounters = [...azkarPage.azkar.flatMap(t => t.count)];
            newCounters[idx] = count - 1;
            const startTime = new CurrentMoment().getMoment();
            const endTime = new CurrentMoment()
            .addHours(pageTimerSetting.duration.hours)
            .addMinutes(pageTimerSetting.duration.minutes)
            .addSeconds(pageTimerSetting.duration.seconds)
            .getMoment();
            dispatch(createTimerCounters({
                id: azkarPage.id,
                payload: {
                    start: startTime,
                    end: endTime,
                    counters: newCounters
                }
            }))
        }
        else
        {
            dispatch(updateCounterState({id: azkarPage.id, counter: {idx, value: count - 1}}))
        }
    }
    const resetCounter = (e: MouseEvent | PointerEvent | TouchEvent) => {
        const resetElement = (e.currentTarget as HTMLDivElement);
        const resetIdx = parseInt(resetElement.id.split('-')[resetElement.id.split('-').length - 1]) - 1;
        
        resetElement.classList.add('active');
        setTimeout(() => {
            resetElement.classList.remove('active');
        }, 100);
        
        if (pageTimerState)
        {
            dispatch(updateTimerCounters({
                id: azkarPage.id,
                payload: {
                    idx: resetIdx, value: azkarPage.azkar[resetIdx].count
                }
            }))
        }
        else
        {
            dispatch(updateCounterState({
                id: azkarPage.id, 
                counter: {idx: resetIdx, value: azkarPage.azkar[resetIdx].count}
            }));
        }
    }
    return (<>
        <div className="azkar-header">
            <div className="ah-icon" onClick={e => dispatch(setFavState({id: azkarPage.id, state: !pageFavState}))}>
                {pageFavState? <FavoriteIcon/> : <FavoriteBorderIcon/>}
            </div>
            <div className="ah-title">{azkarPage.title}</div>
            <div className="progress-bar">
                <div className="progress-value" id='progress-value-id' style={{width: `${progressValue}%`}}></div>
            </div>
        </div>
        
        <div className="azkar-cards-wrapper" id='azkar-cards-wrapper-id'>
            <div className="timer-ui" id='timer-ui-id'>{timerUi}</div>
            {azkarPage.azkar.map(t => {
                index = index + 1;
                return (
                    <div key={`zekr-card-key-${index}`} className="zekr-card">
                        <div className="zc-header">
                            <div className="zc-number">{index}</div>
                            <div 
                            id={`zekr-reset-id-${index}`}
                            className="zc-reset-icon"
                            onClick={resetCounter}
                            ><ReplayIcon/></div>
                        </div>
                        <div className="zc-body">
                            <div className="zc-begin">{t.begin}</div>
                            <div className="zc-content">{t.content}</div>
                            <div className="zc-end">{t.end}</div>
                            <div className="zc-info">{t.info}</div>
                        </div>
                        <div 
                        id={`zekr-counter-id-${index}`}
                        className="zc-counter" 
                        onTouchStart={startSqueeze} 
                        onTouchEnd={endSqueeze} 
                        onClick={e => decrementCounter(e)}>
                            {/* <Button>{t.count}</Button> */}
                            {counterState.find(c => c.id === azkarPage.id)?.counters[index - 1]}
                        </div>
                    </div>
                )
            })}
        </div>
    </>)
}