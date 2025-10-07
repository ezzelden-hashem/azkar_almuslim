// cspell:disable
import { ReactNode } from 'react';
import './ZekrCard.css';
import Button from '@mui/material/Button';
import { ReactJSXIntrinsicElements } from 'node_modules/@emotion/styled/dist/declarations/src/jsx-namespace';
import { SvgIconComponent } from '@mui/icons-material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
export type ZekrCardProps = {
    title: string;
    icon: ReactNode
;
}
export default function ZekrCard({title, icon}: ZekrCardProps)
{
    return (<>
        <Button variant='contained' className='zekr-card'>
            <div className="zc-icon">{icon}</div>
            <div className="zc-title">{title}</div>
        </Button>
    </>)
}