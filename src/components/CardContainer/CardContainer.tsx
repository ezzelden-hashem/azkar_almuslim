import './CardContainer.css'
import { ReactNode } from "react"

export type CardContainerProps = {
    children: ReactNode
}
export default function CardContainer({children}: CardContainerProps)
{
    return (<>
        <div className="card-container">
            {children}
        </div>
    </>)
}