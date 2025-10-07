import { useEffect } from "react";
import FloatingHeader from "./FloatingHeader/FloatingHeader";
import "./Header.css";
import MainHeader from "./MainHeader/MainHeader";

export default function Header()
{
    const rootElement = document.getElementById("root");
    useEffect(() => {
        const floatingHeaderElement = document.getElementById('floating-header-id')
        rootElement?.addEventListener('scroll', () => {
            if (rootElement.scrollTop > 200)
            {
                floatingHeaderElement!.style.transform = 'translateY(0)';
            } else floatingHeaderElement!.style.transform = 'translateY(-100%)';
        });
        
    }, [])
    return (<>
        <FloatingHeader/>
        <MainHeader/>
    </>)
}