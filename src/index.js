import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

import { RouterProvider, createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);