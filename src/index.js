import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import MostrarSedesHorarios from './MostrarSedesHorarios.js';
import ejemplo from './ejemplo.json'

import { RouterProvider, createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/MostrarSedesHorarios',
        element: <MostrarSedesHorarios pelicula={ejemplo.pelicula} sedes={ejemplo.pelicula.sedes}/>,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);