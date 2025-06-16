import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Inicio from './Inicio.jsx'

// Componentes de venta
import PeliculaSedes from './3 componentesVenta/PeliculaSedes.jsx';
import ButacaSelect from './3 componentesVenta/ButacaSelect.jsx'
import { VentaContextProvider } from './3 componentesVenta/VentaContextProvider.jsx';
import FlujoVenta from './3 componentesVenta/FlujoVenta.jsx';

import InfoEntradas from './5 6 pago y entradas/InfoEntradas.jsx';

// Usuario interno
import VentanaIntranet from './B usuarioInterno/VentanaIntranet.jsx';
import VentanaPeliculas from './B usuarioInterno/Peliculas/VentanaPeliculas.jsx';
import VentanaSedesYSalas from './B usuarioInterno/SedesYSalas/VentanaSedesYSalas.jsx';
import VentanaFunciones from './B usuarioInterno/Funciones/VentanaFunciones.jsx';
import VentanaUsuario from './B usuarioInterno/Usuarios/VentanaUsuario.jsx';
import VentanaAjustes from './B usuarioInterno/Ajustes/VentanaAjustes.jsx';
import Intranet from './B usuarioInterno/Intranet.jsx';
import LoginForm from './B usuarioInterno/LoginForm.jsx';
import Sala from './B usuarioInterno/SedesYSalas/Sala.jsx';
import { FuncionesContextProvider } from './B usuarioInterno/Funciones/FuncionesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
        <BrowserRouter>
            <Routes>
                { /* Ruta principal: La idea es que el componente App muestra el contenido de las rutas
                hijas (ej: Inicio) dependiendo de la ruta. En este caso, Inicio es lo que se motrará en la
                ruta por defecto. Esto nos permite cambiar entre páginas sin necesidad de recargar. */ }
                <Route path='/' element={ <App /> }>
                    <Route index element={ <Inicio /> } />
                    <Route path='/funcion/pelicula/' element={ <PeliculaSedes /> }/>
                    <Route path='/compra' element={ <VentaContextProvider><FlujoVenta/></VentaContextProvider> } />
                    <Route path='/entradas' element={ <InfoEntradas /> } />
                </Route>


                <Route path='/intranet' element={ <Intranet /> }>
                    <Route index element={<VentanaIntranet />}></Route>
                    <Route path='login' element={<LoginForm />}></Route>
                    <Route path="peliculas" element={<VentanaPeliculas />}></Route>
                    <Route path="sedesysalas" element={<VentanaSedesYSalas />}></Route>
                    <Route path="sala" element={ <Sala /> }></Route>
                    <Route path="funciones" element={ <FuncionesContextProvider><VentanaFunciones /></FuncionesContextProvider> }></Route>
                    { /* <Route path="usuarios" element={ <VentanaUsuario /> }></Route> */ }
                    <Route path='ajustes' element={ <VentanaAjustes /> }></Route>
                    <Route path="salas" /*element={<VentanaSedesYSalas></VentanaSedesYSalas>}*/></Route>
                </Route>
                
                <Route path='/butacas' element={ <ButacaSelect idSala={ 5 } /> }/>
                
            </Routes>
        </BrowserRouter>
);