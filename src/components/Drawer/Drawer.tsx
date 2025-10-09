import { ReactNode, useEffect, useRef, type MouseEvent, type MouseEventHandler, type RefObject, type TouchEvent, type TouchEventHandler } from 'react';
import './Drawer.css'
import { Selector, useDispatch, useSelector } from 'react-redux';
import { RootState } from '#store/store';
import { setDrawerState } from '#store/slices/drawerSlice';

export type DrawerProps = {
    children: ReactNode;
}

export default function Drawer({ children }: DrawerProps)
{
    const dispatch = useDispatch();
    const drawerState = useSelector((state: RootState) => state.drawerState)
    const maxEventCount = 10;
    const maxAngle = 45;
    let prevPos = {x: 0, y: 0};
    let delta = {deltaX: 0, deltaY: 0};
    let eventsCount = 0;
    let angle = 0;
    let isListening = false;
    let lockHandle = false;
    let lockTransition = false;
    let drawerBoxElement: RefObject<HTMLDivElement | null> = useRef(null);
    let drawerContainerElement: RefObject<HTMLDivElement | null> = useRef(null);
    let drawerComputedStyle: RefObject<CSSStyleDeclaration | null> = useRef(null);

    useEffect(() => {
        drawerBoxElement.current = document.getElementById('drawer-box-id') as HTMLDivElement;
        drawerContainerElement.current = document.getElementById('drawer-container-id') as HTMLDivElement;
        drawerComputedStyle.current = {...window.getComputedStyle(drawerBoxElement.current)} as CSSStyleDeclaration;
    }, [])

    useEffect(() => {
        if (drawerState) openDrawer();
        else closeDrawer();
    }, [drawerState])

    const startListening = (e: MouseEvent | TouchEvent) => {
        
        if ('touches' in e)
        {
            try
            {
                prevPos = {
                    x: (e as TouchEvent).touches[0].clientX,
                    y: (e as TouchEvent).touches[0].clientY
                }
                isListening = true;
            } catch (err) {}
            
        }
    }
    const detectMovements = (e: MouseEvent | TouchEvent) => {
        const drawerWidth = parseInt(drawerComputedStyle.current!.width);
        if ('touches' in e)
        {
            if (eventsCount > maxEventCount && angle < maxAngle && isListening) lockHandle = true;
            else if (eventsCount > maxEventCount && angle > maxAngle && !lockHandle) isListening = false;
            try
            {
                const currentPos = {
                    x: (e as TouchEvent).touches[0].clientX,
                    y: (e as TouchEvent).touches[0].clientY
                }
                delta = {
                    deltaX: currentPos.x - prevPos.x,
                    deltaY: currentPos.y - prevPos.y
                }
                if (!lockHandle)
                {
                    angle = Math.atan(Math.abs(delta.deltaY) / Math.abs(delta.deltaX)) * (180 / Math.PI);
                    ++eventsCount;
                }
                if (lockHandle && currentPos.x < drawerWidth)
                {
                    drawerContainerElement.current!.style.display = 'block';
                    drawerBoxElement.current!.style.left = `${currentPos.x}px`
                    drawerContainerElement.current!.style.backgroundColor = `rgba(0, 0, 0, ${(currentPos.x / drawerWidth) * 0.8})`
                    drawerContainerElement.current!.style.backdropFilter = `blur(${currentPos.x / drawerWidth * 10}px)`
                    if (lockTransition) drawerBoxElement.current!.style.transition = '0ms';
                    else lockTransition = true;
                }
            } catch (err) {console.log(err)}
        }
    }
    const stopListening = (e: MouseEvent | TouchEvent) => {
        drawerBoxElement.current!.style.transition = drawerComputedStyle.current!.transition
        drawerComputedStyle.current = {...window.getComputedStyle(drawerBoxElement.current!)} as CSSStyleDeclaration;
        const drawerWidth = parseInt(drawerComputedStyle.current!.width);
        if ('touches' in e)
        {
            try
            {
                if (parseInt(drawerComputedStyle.current!.left) < (drawerWidth / 2))
                {
                    dispatch(setDrawerState(false));
                    drawerBoxElement.current!.style.left = `0px`
                    drawerContainerElement.current!.style.backgroundColor = `rgba(0, 0, 0, 0)`
                    drawerContainerElement.current!.style.backdropFilter = `blur(0px)`
                    setTimeout(() => drawerContainerElement.current!.style.display = 'none', 500);
                }
                else
                {
                    dispatch(setDrawerState(true));
                    drawerBoxElement.current!.style.left = `${drawerWidth}px`
                    drawerContainerElement.current!.style.backgroundColor = `rgba(0, 0, 0, 0.8)`
                    drawerContainerElement.current!.style.backdropFilter = `blur(10px)`
                }
                prevPos = {x: 0, y: 0};
                delta = {deltaX: 0, deltaY: 0};
                eventsCount = 0;
                angle = 0;
                lockHandle = false;
                lockTransition = false;
            } catch (err) {console.log(err)}
        }
    }
    const dragDrawerBox = (e: MouseEvent | TouchEvent) => {
        const drawerComputedStyle = window.getComputedStyle(drawerBoxElement.current!);
        if (lockTransition) drawerBoxElement.current!.style.transition = '0ms';
        else lockTransition = true;
        if ('touches' in e)
        {
            try
            {
                const currentPos = {
                    x: (e as TouchEvent).touches[0].clientX,
                    y: (e as TouchEvent).touches[0].clientY
                }
                delta = {
                    deltaX: currentPos.x - prevPos.x,
                    deltaY: currentPos.y - prevPos.y
                }
                if ((parseInt(drawerComputedStyle.width) + delta.deltaX) < parseInt(drawerComputedStyle.width))
                {
                    drawerBoxElement.current!.style.left = parseInt(drawerComputedStyle.width) + delta.deltaX + 'px';
                    drawerContainerElement.current!.style.backgroundColor = `rgba(0, 0, 0, ${(currentPos.x / parseInt(drawerComputedStyle.width)) * 0.8})`;
                    drawerContainerElement.current!.style.backdropFilter = `blur(${currentPos.x / parseInt(drawerComputedStyle.width) * 10}px)`;
                }
                
            } catch (err) {}
        }
    }
    const openDrawer = () => {
        dispatch(setDrawerState(true));
        drawerContainerElement.current!.style.display = 'block';
        setTimeout(() => {
            drawerBoxElement.current!.style.left = drawerComputedStyle.current!.width;
            drawerContainerElement.current!.style.backgroundColor = `rgba(0, 0, 0, 0.8)`
            drawerContainerElement.current!.style.backdropFilter = `blur(10px)`
        }, 10)
    }
    const closeDrawer = () => {
        dispatch(setDrawerState(false));
        drawerBoxElement.current!.style.left = `0px`
        drawerContainerElement.current!.style.backgroundColor = `rgba(0, 0, 0, 0)`
        drawerContainerElement.current!.style.backdropFilter = `blur(0px)`
        setTimeout(() => drawerContainerElement.current!.style.display = 'none', 500);
    }
    const handleContainerClick = (e: MouseEvent | PointerEvent | TouchEvent) => {
        if (e.target === e.currentTarget) closeDrawer();
    }
    return (<>
        <div 
        className="drawer-tongue" 
        onTouchStart={e => startListening(e)}
        onMouseDown={e => startListening(e)}
        onTouchMove={e => detectMovements(e)}
        onMouseMove={e => detectMovements(e)}
        onMouseUp={e => stopListening(e)}
        onTouchEnd={e => stopListening(e)}
        ></div>

        <div 
        id='drawer-container-id'
        className="drawer-container"
        onClick={handleContainerClick}
        >
            <div 
            id='drawer-box-id' 
            className="drawer-box"
            onTouchStart={e => startListening(e)}
            onMouseDown={e => startListening(e)}
            onTouchMove={e => dragDrawerBox(e)}
            onMouseMove={e => dragDrawerBox(e)}
            onTouchEnd={e => stopListening(e)}
            onMouseUp={e => stopListening(e)}
            >{children}</div>
        </div>
    </>)
}