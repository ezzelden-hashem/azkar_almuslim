import './AboutPage.css'

import InfoIcon from '@mui/icons-material/Info';
import { ReactComponent as Svg } from '#assets/vectors/initiation.svg';
import SvgInitiation from './SvgComponent/SvgInitiation';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import NewFeature from './NewFeature/NewFeature';

export default function AboutPage()
{
    return (<>
        <div className="app-info">
            <div className="ai-header">
                <div className="ai-h-icon"><InfoIcon /></div>
                <div className="ai-h-title">حول التطبيق</div>
            </div>
            <div className="ai-body">
                <div className="initiation">
                    <SvgInitiation fill='yellow' />
                </div>
                <div className="ai-contact-us">
                    <div className="ai-cu-title">تواصل معنا</div>
                    <Divider />
                    <div className="cu-box outline">muslim.athkar8@gmail.com</div>
                    <Button className='cu-btn' variant='outlined'>Facebook</Button>
                </div>
                <div className="app-version">v1.0.0</div>
                <div className="features">
                    <NewFeature title='المفضلة' description='a;klfj;lsdkjfa;ldkjfljk' />
                </div>
            </div>
        </div>
    </>)
}