import { ReactNode } from 'react';
import './FloatingListItem.css'



export type FloatingListItemProps = {
    title: string;
    icon?: ReactNode;
    value?: any;
    checked?: boolean;
    onClick?: ((e: any, value: any) => void) | undefined;
}

export default function FloatingListItem({title, value, checked, icon, onClick = () => {}}: FloatingListItemProps)
{
    return (<>
        <div className="flt-lst-item" onClick={e => onClick(e, value)}>
            <div className="chk-canvas" style={{opacity: checked? '1' : '0'}}></div>
            <div className="flt-lst-item-icon">{icon}</div>
            <div className="flt-lst-item-title">{title}</div>
        </div>
    </>)
}