/* existing imports */
import Home from "./routes/home";
import ErrorPage from "./routes/error-page";
import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);