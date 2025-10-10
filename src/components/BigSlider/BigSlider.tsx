import Slider from '@mui/material/Slider';
import './BigSlider.css';

export type BigSliderProps = {
    title: string;
    step: number;
    min: number;
    max: number;
    defaultValue?: number;
    value?: number;
    onChange?: ((event: Event, value: number, activeThumb: number) => void)
}


export default function BigSlider({title, step, max, min, defaultValue, value, onChange}: BigSliderProps)
{
    return (<>
        <div className="big-slider">
            <div className="big-slider-title">{title}</div>

            <Slider 
            value={value}
            onChange={onChange}
            step={step}
            min={min}
            max={max}
            defaultValue={defaultValue}
            />
        </div>
    </>)
}