import './NewFeature.css'

import CheckIcon from '@mui/icons-material/Check';

export type NewFeatureProps = {
    title: string;
    description: string;
}

export default function NewFeature({ title, description }: NewFeatureProps)
{
    return (<>
        <div className="new-feature">
            <div className="nf-header">
                <div className="nf-h-title">{title}</div>
                <div className="nf-h-icon"><CheckIcon /></div>
            </div>
            <div className="nf-body">{description}</div>
        </div>
    </>)
}