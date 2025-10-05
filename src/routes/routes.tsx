import Home from "#pages/Home/Home";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: '',
        element: Home()
    },
    {
        path: 'home',
        element: Home()
    },
    {
        path: '*',
        element: <div>not found error</div>
    },
])