import { ReactNode } from 'react';
import './CheckButton.css'

import CheckIcon from '@mui/icons-material/Check';

export type CheckButtonProps = {
    title: string;
    checked: boolean;
    icon?: ReactNode;
    onClick?: ((e: any) => void);
}


export default function CheckButton({title, checked, icon, onClick}: CheckButtonProps)
{
    return(<>
        <div className="check-button" onClick={onClick}>
            <div className="chk-canvas" style={{opacity: checked? '1' : '0'}}></div>
            {checked && <div className="chk-btn-icon">{icon ?? <CheckIcon/>}</div>}
            <div className="chk-btn-title">{title}</div>
        </div>
    </>)
}