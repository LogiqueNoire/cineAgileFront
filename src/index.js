import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import MostrarSedesHorarios from './MostrarSedesHorarios.js';
import Inicio from './Inicio.jsx'
import ButacaSelect from './3 componentesVenta/ButacaSelect.jsx'

import { BrowserRouter, Routes, Route } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                { /* Ruta principal: La idea es que el componente App muestra el contenido de las rutas
                hijas (ej: Inicio) dependiendo de la ruta. En este caso, Inicio es lo que se motrará en la
                ruta por defecto. Esto nos permite cambiar entre páginas sin necesidad de recargar. */ }
                <Route path='/' element={ <App /> }>
                    <Route index element={ <Inicio /> } />
                    <Route path='/funcion/pelicula/' element={ <MostrarSedesHorarios /> }/>
                </Route>

                <Route path='/butacas' element={ <ButacaSelect idSala={ 5 } /> }/>

            </Routes>
        </BrowserRouter>
    </StrictMode>
);