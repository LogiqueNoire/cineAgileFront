import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import MostrarSedesHorarios from './MostrarSedesHorarios.js';
import ejemplo from './ejemplo.json'
import Inicio from './Inicio.jsx'
import ButacaSelect from './componentes/ButacaSelect.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Inicio />
    },
    {
        path: '/MostrarSedesHorarios',
        element: <MostrarSedesHorarios pelicula={ejemplo.pelicula} sedes={ejemplo.pelicula.sedes}/>,
    },
    {
        path: '/app',
        element: <App />
    },
    {
        path: '/butacas',
        element: <ButacaSelect />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);