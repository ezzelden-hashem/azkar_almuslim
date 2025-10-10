import { SvgIconComponent } from '@mui/icons-material'
import './DrawerItem.css'
import { ReactNode } from 'react';
import Button from '@mui/material/Button';

export type DrawerItemProps = {
    title: string;
    icon: ReactNode;
    onClick?: ((e: any) => void);
}

export default function DrawerItem({title, icon, onClick}: DrawerItemProps)
{
    return (<>
        <Button variant='outlined' className='drawer-item' onClick={onClick}>
            <div className="di-icon">{icon}</div>
            <div className="di-title">{title}</div>
        </Button>
    </>)
}