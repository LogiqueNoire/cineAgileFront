import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import Inicio from './Inicio.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/inicio',
        element: <Inicio />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);