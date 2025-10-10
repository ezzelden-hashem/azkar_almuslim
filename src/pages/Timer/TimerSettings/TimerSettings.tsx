import { ReactNode, useContext, useEffect, useState } from 'react';
import './TimerSettings.css'

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Margin } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { TimerDuration } from '#types/content.model';
import { selectedTimerContext } from '#context/timerDefaultValueContext';
import { useAppDispatch } from '#hooks/hooks';
import { deleteTimerSettingsState, setTimerSettingsState } from '#store/slices/timerSettingsSlice';


export type TimerSettingsProps = {
    title?: string;
    icon?: ReactNode;
    visible?: boolean;
    onCancel?: ((e: any) => void);
    onDone?: ((e: any, data: TimerDuration) => void);
}





const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 55,
    height: 30,
    padding: 2,
    // marginLeft: 5,
    justifyContent: 'start',
    '& .MuiSwitch-switchBase': {
        padding: 3,
        margin: 0,
        justifyContent: 'start',
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(26px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#65C466',
                opacity: 1,
                border: 0,
                ...theme.applyStyles('dark', {
                    backgroundColor: '#2ECA45',
                }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', {
                color: theme.palette.grey[600],
            }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', {
                opacity: 0.3,
            }),
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#ffffffff',
        boxSizing: 'border-box',
        width: 24,
        height: 24,
    },
    '& .MuiSwitch-track': {
        borderRadius: 50,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
        ...theme.applyStyles('dark', {
            backgroundColor: '#39393D',
        }),
    },
}));

type TimeInputObject = {
    value: string;
    validation: string | null;
}
type InputName = 'hour' | 'minute';



export default function TimerSettings({ title, icon, visible, onDone = () => { }, onCancel }: TimerSettingsProps)
{
    const dispatch = useAppDispatch();
    const selectedTimer = useContext(selectedTimerContext);
    const [hoursInput, setHoursInput] = useState<TimeInputObject>({
        value: selectedTimer?.[0].duration.hours.toString() ?? '',
        validation: null
    })
    const [minutesInput, setMinutesInput] = useState<TimeInputObject>({
        value: selectedTimer?.[0].duration.minutes.toString() ?? '',
        validation: null
    })

    useEffect(() =>
    {
        setHoursInput({ value: selectedTimer?.[0].duration.hours.toString() ?? '0', validation: null })
        setMinutesInput({ value: selectedTimer?.[0].duration.minutes.toString() ?? '0', validation: null })
    }, [selectedTimer])
    const validateTimeInput = (value: any, inputName: InputName) =>
    {
        const input = parseInt(value);
        const validateHours = () =>
        {
            if (input < 0 || input > 48)
            {
                setHoursInput({
                    value: input < 0 ? '0' : '48',
                    validation: 'ادخل رقم بين 0 و 48'
                });
                return;
            }
            setHoursInput({ value: input.toString() ?? '0', validation: null })
        }
        const validateMinutes = () =>
        {
            if (parseInt(hoursInput.value) > 0)
            {
                if (input < 0 || input > 59)
                {
                    setMinutesInput({
                        value: input < 0 ? '0' : '59',
                        validation: 'ادخل رقم بين 0 و 59'
                    });
                    return;
                }
                setMinutesInput({ value: input.toString() ?? '0', validation: null })
            }
            else
            {
                if (input < 0 || input > 59)
                {
                    setMinutesInput({
                        value: input < 0 ? '1' : '59',
                        validation: 'ادخل رقم بين 1 و 59'
                    });
                    return;
                }
                setMinutesInput({ value: input.toString() ?? '0', validation: null });
            }
        }
        switch (inputName)
        {
            case 'hour': validateHours();
                return;
            case 'minute': validateMinutes()
                return;
        }
    }

    const handleSwitchClick = () =>
    {
        if (selectedTimer?.[0].state)
        {
            selectedTimer?.[1](prev =>
            {
                return {
                    ...selectedTimer[0],
                    state: !selectedTimer[0].state
                }
            })
            dispatch(deleteTimerSettingsState(selectedTimer[0].id));
        }
        else if (selectedTimer?.[0].id)
        {
            selectedTimer?.[1](prev =>
            {
                return {
                    ...selectedTimer[0],
                    state: !selectedTimer[0].state
                }
            })
            dispatch(setTimerSettingsState({
                id: selectedTimer?.[0].id,
                duration: {
                    hours: 1,
                    minutes: 0,
                    seconds: 0,
                }
            }));
        }

    }

    return (<>
        <div className="timer-settings-container" style={{ display: visible ? 'flex' : 'none' }}>
            <div className="timer-settings-box">
                <div className="tmr-box-header">
                    <div className="tmr-header-icon">{icon ?? <AccessTimeFilledIcon />}</div>
                    <div className="tmr-header-title">{title ?? 'اعداد المؤقت'}</div>
                </div>
                <div className="tmr-box-body">
                    <div className="tmr-body-timer-state">
                        <IOSSwitch
                            onClick={e => handleSwitchClick()}
                            checked={selectedTimer?.[0].state} />
                        <div className="tmr-stat-title">تشغيل المؤقت</div>
                    </div>

                    <div className="tmr-body-duration">
                        <TextField
                            disabled={!selectedTimer?.[0].state}
                            value={hoursInput.value}
                            error={hoursInput.validation ? true : false}
                            helperText={hoursInput.validation ?? ' '}
                            onChange={e => validateTimeInput(e.target.value, 'hour')}
                            type='number'
                            variant='outlined'
                            label='عدد الساعات'
                            sx={{ textAlign: 'start' }} />

                        <TextField
                            disabled={!selectedTimer?.[0].state}
                            value={minutesInput.value}
                            error={minutesInput.validation ? true : false}
                            helperText={minutesInput.validation ?? ' '}
                            onChange={e => validateTimeInput(e.target.value, 'minute')}
                            type='number'
                            variant='outlined'
                            label='عدد الدقائق'
                            sx={{ textAlign: 'start' }} />
                    </div>


                </div>
                <div className="tmr-box-btns">
                    <Button
                        onClick={(e) => onDone(e, { hours: !isNaN(parseInt(hoursInput.value)) ? parseInt(hoursInput.value) : 0, minutes: !isNaN(parseInt(minutesInput.value)) ? parseInt(minutesInput.value) : 0, seconds: 0 })}
                        className='tmr-btn contained'
                        variant='contained'
                        color='inherit'>حفظ</Button>
                    <Button
                        onClick={onCancel}
                        className='tmr-btn outlined'
                        variant='outlined'>الغاء</Button>
                </div>
            </div>
        </div>
    </>)
}