// cspell:disable
import InfoPage from "#pages/AppInfo/InfoPage";
import AzkarPage from "#pages/Azkar/AzkarPage";
import FavoritesPage from "#pages/Favorites/FavoritesPage";
import HomePage from "#pages/Home/HomePage";
import SettingsPage from "#pages/Settings/SettingsPage";
import TimerPage from "#pages/Timer/TimerPage";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: '',
        element: <HomePage/>
    },
    {
        path: 'home',
        element: <HomePage/>
    },
    {
        path: 'azkar',
        element: <AzkarPage/>
    },
    {
        path: 'favs',
        element: <FavoritesPage/>
    },
    {
        path: 'settings',
        element: <SettingsPage/>
    },
    {
        path: 'appInfo',
        element: <InfoPage/>
    },
    {
        path: 'timer',
        element: <TimerPage/>
    },
    {
        path: '*',
        element: <div>not found error</div>
    },
])