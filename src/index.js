import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import MostrarSedesHorarios from './MostrarSedesHorarios.js';
import Inicio from './Inicio.jsx'
import ButacaSelect from './componentesVenta/ButacaSelect.jsx'

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
    },
    {
        path: '/butacas',
        element: <ButacaSelect idSala={ 5 } />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);