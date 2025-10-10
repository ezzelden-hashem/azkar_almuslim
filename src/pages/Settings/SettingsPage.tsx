import BigSlider from '#components/BigSlider/BigSlider';
import CheckButton from '#components/CheckButton/CheckButton';
import FloatingList from '#components/FloatingList/FloatingList';
import { useState } from 'react';
import './SettingsPage.css'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '#hooks/hooks';
import { setCopyTextState } from '#store/slices/copyTextSlice';
import { useNavigate } from 'react-router';
import { setFontSizeState } from '#store/slices/fontSizeSlice';
import { setVibrationState } from '#store/slices/vibrationSlice';
import { setFingerTrackingState } from '#store/slices/fingerTrackingSlice';
import FloatingListItem from '#components/FloatingListItem/FloatingListItem';
import { AppThemes } from '#styles/themes/themes';
import { setThemeState } from '#store/slices/themeSlice';


export default function SettingsPage()
{   const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const copyTextState = useAppSelector(state => state.copyTextState)
    const fontSizeState = useAppSelector(state => state.fontSizeState)
    const themeState = useAppSelector(state => state.themeState)
    const vibrationState = useAppSelector(state => state.vibrationState)
    const fingerTrackingState = useAppSelector(state => state.fingerTrackingState)
    
    const [showThemes, setShowThemes] = useState(false);
    

    const onCopyText = () => {
        dispatch(setCopyTextState(!copyTextState));
    }

    const onFontSize = (e: any, value: number) => {
        dispatch(setFontSizeState(value));
    }

    const onThemeChange = () => {
        setShowThemes(true);
        // todo...
    }
    
    const onVibration = () => {
        dispatch(setVibrationState(!vibrationState));
    }
    
    const onFingerTracking = () => {
        dispatch(setFingerTrackingState(!fingerTrackingState));
    }


    return (<>
        <div className="app-settings">
            <div className="as-header">
                <div className="as-h-icon"><SettingsOutlinedIcon style={{fontSize: "22px"}}/></div>
                <div className="as-h-title">الاعدادات</div>
            </div>
            <div className="as-body">
                <CheckButton title='نسخ النص' checked={copyTextState} onClick={onCopyText} />
                <BigSlider title='حجم الخط' step={1} min={1} max={5} value={fontSizeState} onChange={(e, v) => onFontSize(e, v)}/>
                <Button 
                className='show-themes-btn'
                variant='contained'
                sx={{justifyContent: 'end'}}
                onClick={onThemeChange}>الثيمات</Button>
                

                <Button 
                onClick={e => navigate('/timer')}
                className='show-themes-btn'
                variant='contained'
                sx={{justifyContent: 'end'}}
                >المؤقت</Button>
                
                <CheckButton title='الاهتزاز' checked={vibrationState} onClick={onVibration} />
                
                <CheckButton title='تتبع الاصبع' checked={fingerTrackingState} onClick={onFingerTracking} />
                
                <FloatingList 
                visible={showThemes}
                onChange={(e, v) => dispatch(setThemeState(v))}
                onDone={e => setShowThemes(false)}
                title='الثيمات'>
                    {AppThemes.map(t => {
                        return (
                            <FloatingListItem icon={t.icon ?? ''} key={t.name} checked={themeState == t.name} title={t.title} value={t.name}/>
                        )
                    })}
                </FloatingList>
            </div>
        </div>
    </>)
}