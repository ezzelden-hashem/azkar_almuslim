// cspell:disable
import Azkar from "#pages/Azkar/Azkar";
import Home from "#pages/Home/Home";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: '',
        element: <Home/>
    },
    {
        path: 'home',
        element: <Home/>
    },
    {
        path: 'azkar',
        element: <Azkar/>
    },
    {
        path: '*',
        element: <div>not found error</div>
    },
])