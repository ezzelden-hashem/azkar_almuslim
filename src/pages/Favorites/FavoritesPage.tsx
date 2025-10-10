import { MuiIcons } from '#assets/icons/mui.icons';
import CardContainer from '#components/CardContainer/CardContainer';
import ZekrCard from '#components/ZekrCard/ZekrCard';
import { AzkarPages } from '#content/_azkar.pages';
import { ZekrPage } from '#types/content.model';
import { useDispatch, useSelector } from 'react-redux';
import './FavoritesPage.css';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router';
import { RootState } from '#store/store';
import { setAzkarPage } from '#store/slices/azkarPageSlice';


export default function FavoritesPage()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector((state: RootState) => state.favState);
    const icons = MuiIcons

    const gotoAzkarPage = (azkarPage: ZekrPage) => {
        dispatch(setAzkarPage(azkarPage));
        setTimeout(() => {
            navigate('/azkar');
        }, 300);
    }
    return (<>
        <div className="app-favorites">
            <div className="af-header">
                <div className="af-h-icon"><FavoriteBorderIcon style={{fontSize: "22px"}}/></div>
                <div className="af-h-title">المفضلة</div>
            </div>
            <div className="af-body">
                <CardContainer>
                    {AzkarPages.map(t => {
                        const icon = icons.find(i => i.name === t.icon)!.icon
                        const currentFav = favorites.find(f => f.id === t.id);
                        if (currentFav?.state)
                        {
                            return (
                                <div key={t.id} onClick={e => gotoAzkarPage(t)}>
                                    <ZekrCard title={t.title} icon={icon} />
                                </div>
                            )
                        }
                        
                    })}
                    
                </CardContainer>
            </div>
        </div>
    </>)
}