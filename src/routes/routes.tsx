// cspell:disable
import AppInfo from "#pages/AppInfo/AppInfo";
import Azkar from "#pages/Azkar/Azkar";
import Favorites from "#pages/Favorites/AppFavorites";
import Home from "#pages/Home/Home";
import AppSettings from "#pages/Settings/AppSettings";
import { Settings } from "@mui/icons-material";
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
        path: 'favs',
        element: <Favorites/>
    },
    {
        path: 'settings',
        element: <AppSettings/>
    },
    {
        path: 'appInfo',
        element: <AppInfo/>
    },
    {
        path: '*',
        element: <div>not found error</div>
    },
])