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

// Intranet
import IntranetPanel from './Intranet/IntranetPanel.jsx';
import VentanaPeliculas from './Intranet/Peliculas/VentanaPeliculas.jsx';
import VentanaSedesYSalas from './Intranet/SedesYSalas/VentanaSedesYSalas.jsx';
import VentanaFunciones from './Intranet/Funciones/VentanaFunciones.jsx';
import VentanaUsuario from './Intranet/Usuarios/VentanaUsuario.jsx';
import VentanaAjustes from './Intranet/Ajustes/VentanaAjustes.jsx';
import Intranet from './Intranet/Intranet.jsx';
import LoginForm from './Intranet/LoginForm.jsx';
import Sala from './Intranet/SedesYSalas/Sala.jsx';
import { FuncionesContextProvider } from './Intranet/Funciones/FuncionesContext.jsx';
import Error from "./Error.jsx"
import Analiticas from './Intranet/Analiticas/Analiticas.jsx';
import Generos from './Intranet/Generos/Generos.jsx';
import Auditoria from './Intranet/Auditoria/Auditoria.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            { /* Ruta principal: La idea es que el componente App muestra el contenido de las rutas
                hijas (ej: Inicio) dependiendo de la ruta. En este caso, Inicio es lo que se motrará en la
                ruta por defecto. Esto nos permite cambiar entre páginas sin necesidad de recargar. */ }
            <Route path='/' element={<App />}>
                <Route index element={<Inicio />} />
                <Route path='/funcion/pelicula/' element={<PeliculaSedes />} />
                <Route path='/compra' element={<VentaContextProvider><FlujoVenta /></VentaContextProvider>} />
                <Route path='/entradas' element={<InfoEntradas />} />
                <Route path='/error' element={<Error />} />
                <Route path="/entrada/:codigo" element={<InfoEntradas />}></Route>
            </Route>


            <Route path='/intranet' element={<Intranet />}>
                <Route index element={<IntranetPanel />}></Route>
                <Route path='login' element={<LoginForm />}></Route>
                <Route path="peliculas" element={<VentanaPeliculas />}></Route>
                <Route path="sedesysalas" element={<VentanaSedesYSalas />}></Route>
                <Route path="sala" element={<Sala />}></Route>
                <Route path="funciones" element={<FuncionesContextProvider><VentanaFunciones /></FuncionesContextProvider>}></Route>
                <Route path='generos' element={<Generos />}></Route>
                <Route path="usuarios" element={ <VentanaUsuario /> }></Route>
                <Route path='ajustes' element={<VentanaAjustes />}></Route>
                <Route path='analiticas' element={<Analiticas />}></Route>
                <Route path='auditoria' element={<Auditoria />}></Route>
                <Route path="salas" /*element={<VentanaSedesYSalas></VentanaSedesYSalas>}*/></Route>
            </Route>

            <Route path='/butacas' element={<ButacaSelect idSala={5} />} />


        </Routes>
    </BrowserRouter>
);