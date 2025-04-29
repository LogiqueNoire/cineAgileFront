import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import MostrarSedesHorarios from './MostrarSedesHorarios.js';
import Inicio from './Inicio.jsx'
import ButacaSelect from './componentesVenta/ButacaSelect.jsx'

import { BrowserRouter, Routes, Route } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <App /> }>
                    <Route index element={ <Inicio /> } />
                </Route>

                <Route path='/MostrarSedesHorarios' element={ <MostrarSedesHorarios /> }/>

                <Route path='/butacas' element={ <ButacaSelect idSala={ 5 } /> }/>

            </Routes>
        </BrowserRouter>
    </StrictMode>
);