import { invertDrawerState } from "#store/slices/drawerSlice";
import { useDispatch } from "react-redux";
import "../Header.css";

import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";

export type FloatingHeaderProps = {
    title: string;
}

export default function FloatingHeader()
{
    const dispatch = useDispatch();
    return (<>
        <div className="floating-header" id="floating-header-id">
            <Button className="fh-menu-btn" onClick={e => dispatch(invertDrawerState())}>
                <MenuIcon />
            </Button>
            <div className="fh-title">أذكار المسلم</div>
        </div>
    </>)
}