import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContextProvider } from "./context/ToastContextProvider";

// Componentes de venta
import Venta from '@/venta/Venta.jsx';
import FilmPanel from '@/venta/1 cartelera/FilmPanel';
import FilmPage from '@/venta/2 sedes-horarios/FilmPage';
import { VentaContextProvider } from '@/venta/VentaContextProvider';
import FlujoVenta from '@/venta/FlujoVenta';
import InfoEntradas from '@/venta/6 entradas/InfoEntradas.jsx';
import Error from "@/components/Error.jsx"

// Intranet
import LoginForm from '@/intranet/LoginForm.jsx';
import Intranet from '@/intranet/Intranet.jsx';
import IntranetPanel from '@/intranet/IntranetPanel.jsx';
import VentanaPeliculas from '@/intranet/peliculast/VentanaPeliculas.jsx';
import VentanaSedesYSalas from '@/intranet/sedes-salas/VentanaSedesYSalas.jsx';
import { FuncionesContextProvider } from '@/intranet/funcionest/FuncionesContext.jsx';
import VentanaFunciones from '@/intranet/funcionest/VentanaFunciones.jsx';
import VentanaUsuario from '@/intranet/usuariost/VentanaUsuario.jsx';
import VentanaAjustes from '@/intranet/cuenta/VentanaAjustes.jsx';
import Sala from '@/intranet/sedes-salas/Sala.jsx';
import Generos from '@/intranet/generost/Generos.jsx';
import Analiticas from '@/intranet/analiticast/Analiticas.jsx';
import Auditoria from '@/intranet/auditoriat/Auditoria.jsx';
import OpcionesDesarrollador from '@/intranet/dev/OpcionesDesarrollador.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ToastContextProvider>
        <BrowserRouter>
            <Routes>
                { /* Ruta principal: La idea es que el componente App muestra el contenido de las rutas
                hijas (ej: Inicio) dependiendo de la ruta. En este caso, Inicio es lo que se motrará en la
                ruta por defecto. Esto nos permite cambiar entre páginas sin necesidad de recargar. */ }
                <Route path='/' element={<Venta />}>
                    <Route index element={<FilmPanel />} />
                    <Route path='/funcion/pelicula/' element={<FilmPage />} />
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
                    <Route path="usuarios" element={<VentanaUsuario />}></Route>
                    <Route path='ajustes' element={<VentanaAjustes />}></Route>
                    <Route path='analiticas' element={<Analiticas />}></Route>
                    <Route path='auditoria' element={<Auditoria />}></Route>
                    <Route path='dev' element={<OpcionesDesarrollador />}></Route>
                </Route>

            </Routes>
        </BrowserRouter>
    </ToastContextProvider>
);