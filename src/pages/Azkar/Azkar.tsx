// cspell:disable
import { useSelector } from 'react-redux'
import './Azkar.css'
import { RootState } from '#store/store'

import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MouseEvent, TouchEvent, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

export default function Azkar()
{
    let index = 0;
    const azkarPage = useSelector((state: RootState) => state.azkarPageState);
    const routerLocation = useLocation();
    const startSqueeze = (e: TouchEvent | MouseEvent) =>
    {
        (e.target as HTMLDivElement).classList.add('active')
    }
    const endSqueeze = (e: TouchEvent | MouseEvent) =>
    {
        (e.target as HTMLDivElement).classList.remove('active')
    }

    useEffect(() => {
        const rootElement = document.getElementById('root') as HTMLDivElement;
        rootElement.addEventListener('scroll', () => {
            if (routerLocation.pathname === '/azkar')
            {
                try
                {
                    const progressValue = (rootElement.scrollTop / (rootElement.scrollHeight - window.innerHeight)) * 100;
                    document.getElementById('progress-value-id')!.style.width = `${progressValue}%`
                } catch {}
            }
            
        })
    }, [])

    return (<>
        <div className="azkar-header">
            <div className="ah-icon"><FavoriteBorderIcon/></div>
            <div className="ah-title">{azkarPage.title}</div>
            <div className="progress-bar">
                <div className="progress-value" id='progress-value-id'></div>
            </div>
        </div>
        
        <div className="azkar-cards-wrapper" id='azkar-cards-wrapper-id'>
            {azkarPage.azkar.map(t => {
                return (
                    <div key={crypto.randomUUID()} className="zekr-card">
                        <div className="zc-header">
                            <div className="zc-number">{++index}</div>
                            <div className="zc-reset-icon"><ReplayIcon/></div>
                        </div>
                        <div className="zc-body">
                            <div className="zc-begin">{t.begin}</div>
                            <div className="zc-content">{t.content}</div>
                            <div className="zc-end">{t.end}</div>
                            <div className="zc-info">{t.info}</div>
                        </div>
                        <div className="zc-counter" onTouchStart={startSqueeze} onTouchEnd={endSqueeze}>
                            {/* <Button>{t.count}</Button> */}
                            {t.count}
                        </div>
                    </div>
                )
            })}
        </div>
    </>)
}