import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContextProvider } from "./context/ToastContextProvider";

// Componentes de venta
import Venta from '@/ventat/Venta.jsx';
import FilmPanel from '@/ventat/1 cartelera/FilmPanel';
import FilmPage from '@/ventat/2 sedes-horarios/FilmPage';
import { VentaContextProvider } from '@/ventat/VentaContextProvider';
import FlujoVenta from '@/ventat/FlujoVenta';
import InfoEntradas from '@/ventat/6 entradas/InfoEntradas.jsx';
import Error from "@/components/Error.jsx"

// Intranet
import LoginForm from '@/intranett/LoginForm.jsx';
import Intranet from '@/intranett/Intranet.jsx';
import IntranetPanel from '@/intranett/IntranetPanel.jsx';
import VentanaPeliculas from '@/intranett/peliculas/VentanaPeliculas.jsx';
import VentanaSedesYSalas from '@/intranett/sedes-salas/VentanaSedesYSalas.jsx';
import { FuncionesContextProvider } from '@/intranett/funciones/FuncionesContext.jsx';
import VentanaFunciones from '@/intranett/funciones/VentanaFunciones.jsx';
import VentanaUsuario from '@/intranett/usuarios/VentanaUsuario.jsx';
import VentanaAjustes from '@/intranett/cuenta/VentanaAjustes.jsx';
import Sala from '@/intranett/sedes-salas/Sala.jsx';
import Generos from '@/intranett/generos/Generos.jsx';
import Analiticas from '@/intranett/analiticas/Analiticas.jsx';
import Auditoria from '@/intranett/auditoria/Auditoria.jsx';
import OpcionesDesarrollador from '@/intranett/dev/OpcionesDesarrollador.jsx'

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