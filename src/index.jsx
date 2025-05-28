import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import PeliculaSedes from './3 componentesVenta/PeliculaSedes.jsx';
import Inicio from './Inicio.jsx'
import ButacaSelect from './3 componentesVenta/ButacaSelect.jsx'
import FlujoVenta from './3 componentesVenta/FlujoVenta.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VentanaPeliculas from './B usuarioInterno/Peliculas/VentanaPeliculas.jsx';
import VentanaSedesYSalas from './B usuarioInterno/SedesYSalas/VentanaSedesYSalas.jsx';
import AddSede from './B usuarioInterno/SedesYSalas/AddSede.jsx';
import { VentaContextProvider } from './3 componentesVenta/VentaContextProvider.jsx';

import VentanaInterior from './B usuarioInterno/VentanaInterior.jsx';
import InfoEntradas from './5 6 pago/InfoEntradas.jsx';

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
                    <Route path='/entradas' element={ <InfoEntradas /> } />
                </Route>


                <Route path='/intranet' element={ <App /> }>
                    <Route index element={<VentanaInterior/>}></Route>
                    <Route path="peliculas" element={<VentanaPeliculas></VentanaPeliculas>}></Route>
                    <Route path="sedesysalas" element={<VentanaSedesYSalas></VentanaSedesYSalas>}></Route>
                    <Route path="salas" element={<VentanaSedesYSalas></VentanaSedesYSalas>}></Route>
                </Route>
                
                <Route path='/butacas' element={ <ButacaSelect idSala={ 5 } /> }/>
                
            </Routes>
        </BrowserRouter>
    </StrictMode>
);