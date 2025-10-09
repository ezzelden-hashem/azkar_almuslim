import "../Header.css";
import { invertDrawerState } from '#store/slices/drawerSlice';
import { useDispatch } from 'react-redux';

import MenuIcon from '@mui/icons-material/Menu';

export default function MainHeader()
{
    const dispatch = useDispatch();
    return (<>
        <div className="main-header">
            <MenuIcon 
            onClick={e => dispatch(invertDrawerState())}
            className='mh-menu-icon'/>
            <div className="mh-title">أذكار المسلم</div>
        </div>
        
    </>)
}