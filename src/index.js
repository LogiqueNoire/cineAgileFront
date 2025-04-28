import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import MostrarSedesHorarios from './MostrarSedesHorarios.js';
import Inicio from './Inicio.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Inicio />
    },
    {
        path: '/MostrarSedesHorarios',
        element: <MostrarSedesHorarios />,
    },
    {
        path: '/app',
        element: <App />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);