import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import PeliculaSedes from './3 componentesVenta/PeliculaSedes.jsx';
import Inicio from './Inicio.jsx'
import ButacaSelect from './3 componentesVenta/ButacaSelect.jsx'
import FlujoVenta from './3 componentesVenta/FlujoVenta.jsx';
import { VentanaPrecios } from './4 precios/VentanaPrecios.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddFilm from './B usuarioInterno/AgregarPelicula/AddFilm.jsx';
import AddSede from './B usuarioInterno/AgregarSede/AddSede.jsx';
import { VentaContextProvider } from './3 componentesVenta/VentaContextProvider.jsx';

import { makeServer } from "./servicios/PagoServer.js";
import VentanaInterior from './B usuarioInterno/VentanaInterior.jsx';

/* Descomentar para probar
  makeServer();
*/



ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                { /* Ruta principal: La idea es que el componente App muestra el contenido de las rutas
                hijas (ej: Inicio) dependiendo de la ruta. En este caso, Inicio es lo que se motrará en la
                ruta por defecto. Esto nos permite cambiar entre páginas sin necesidad de recargar. */ }
                <Route path='/' element={ <App /> }>
                    <Route index element={ <Inicio /> } />
                    <Route path='/funcion/pelicula/' element={ <PeliculaSedes /> }/>
                    <Route path='/compra' element={ <VentaContextProvider><FlujoVenta></FlujoVenta></VentaContextProvider> } />
                    

                </Route>


                <Route path='/intranet' element={ <App /> }>
                    <Route index element={<VentanaInterior/>}></Route>
                    <Route path="addSede" element={<AddSede></AddSede>}></Route>
                    <Route path="addFilm" element={<AddFilm></AddFilm>}></Route>
                </Route>
                
                <Route path='/butacas' element={ <ButacaSelect idSala={ 5 } /> }/>
                
            </Routes>
        </BrowserRouter>
    </StrictMode>
);