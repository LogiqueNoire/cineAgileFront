import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import MostrarSedesHorarios from './MostrarSedesHorarios.js';


import { RouterProvider, createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/MostrarSedesHorarios',
        element: <MostrarSedesHorarios/>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);