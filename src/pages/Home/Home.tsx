// cspell:disable

// external imports
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// mui icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// internal imports
import ZekrCard from "#components/ZekrCard/ZekrCard";
import CardContainer from "#components/CardContainer/CardContainer";
import Drawer from "#components/Drawer/Drawer";
import DrawerItem from "#components/DrawerItem/DrawerItem";
import Header from "#components/Header/Header";
import { AzkarPages } from "#content/_azkar.pages";
import { setAzkarPage } from "#store/slices/azkarPageSlice";
import { MuiIcons } from "#assets/icons/mui.icons";
import { ReactNode, useEffect } from "react";
import { PageCounterStateObject, ZekrPage } from "#types/content.model";
import { RootState } from "#store/store";


export default function Home()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const counterState = useSelector((state: RootState) => state.counterState);
    const icons = MuiIcons
    
    const gotoAzkarPage = (azkarPage: ZekrPage) => {
        dispatch(setAzkarPage(azkarPage));
        setTimeout(() => {
            navigate('/azkar');
        }, 300);
    }
    return (<>
        <Header/>
        <Drawer>
            <div className="margin_top" style={{marginTop: "20px", padding: "20px 0", fontSize: "18px", fontWeight: "700"}}>اذكار المسلم</div>
            <DrawerItem title="المفضلة" icon={<FavoriteBorderIcon style={{fontSize: "22px"}}/>}/>
            <DrawerItem title="الاعدادات" icon={<SettingsOutlinedIcon style={{fontSize: "22px"}}/>}/>
            <DrawerItem title="حول التطبيق" icon={<InfoOutlinedIcon style={{fontSize: "22px"}}/>}/>
        </Drawer>
        <CardContainer>
            {AzkarPages.map(t => {
                const icon = icons.find(i => i.name === t.icon)!.icon
                return (
                    <div key={t.id} onClick={e => gotoAzkarPage(t)}>
                        <ZekrCard title={t.title} icon={icon} />
                    </div>
                )
            })}
            
        </CardContainer>
    </>)
}