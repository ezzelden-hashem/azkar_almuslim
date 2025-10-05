import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: '',
        element: <div>home</div>
    },
    {
        path: 'welcome',
        element: <div>welcome</div>
    },
    {
        path: '*',
        element: <div>not found error</div>
    },
])