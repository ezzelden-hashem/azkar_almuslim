import CheckButton from '#components/CheckButton/CheckButton';
import Button from '@mui/material/Button';
import './FloatingList.css'

import ClearAllIcon from '@mui/icons-material/ClearAll';
import React, { isValidElement, ReactElement, ReactNode, useEffect, useState } from 'react';

export type FloatingListProps = {
    title: string;
    visible?: boolean;
    buttonTitle?: string
    children?: ReactNode;
    value?: any;
    onDone?: ((e: any) => void);
    onChange?: ((e: any, value: any) => void)
}


export default function FloatingList({title, children, value, visible, buttonTitle, onDone, onChange = () => {}}: FloatingListProps)
{
    const [listValue, setListValue] = useState(undefined);
    return (<>
        <div className="floating-list" id='floating-list-id' 
        style={{display: visible? 'flex': 'none'}}>
            <div className="flt-lst-box">
                <div className="flt-lst-header">
                    <div className="flt-lst-icon"><ClearAllIcon/></div>
                    <div className="flt-lst-title">{title}</div>
                </div>
                <div className="flt-lst-body">
                    {React.Children.map(children, (child) => {
                        if (!React.isValidElement(child)) return null;
                        const element = child as ReactElement<any>;
                        const childValue = (child.props as {value?: any}).value ?? null;
                        
                        return React.cloneElement(element, {...child.props ?? null,
                            onClick: (e: any, v: any) => {
                                element.props?.onClick?.(e);
                                onChange(e, v);
                            }
                        })
                    })}
                </div>
                <Button
                onClick={onDone}
                variant='outlined' 
                className='flt-lst-btn'
                >{buttonTitle ?? 'Done'}</Button>
            </div>
        </div>
    </>)
}