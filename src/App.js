import React, { useState } from "react";
import { Outlet } from "react-router";

import ComJose1 from './precios/ComJose1.jsx';
import Header from './componentesGenerales/Header'
import Footer from './componentesGenerales/Footer'
import ScriptGenerarQR from "./servicios/ScriptGenerarQR.js"; // esta es la clase

import "./App.css"
import QRCode from "react-qr-code";

function App() {
    const generador = new ScriptGenerarQR(); // instancia de la clase
    const codigoQR = generador.generar();
    return (<>
        <Header>
            
            {/*
            <a href="#pelis">Pelis</a>
            <a href="#cines">Cines</a>
            <a href="#blog">Blog</a>
            */}
        </Header>

        { /* Muestra el contenido de las rutas hijas, como el componente Inicio */ }
        <div className="contenedor container-fluid">
            <Outlet />
        </div>
    
        <div className="App p-4">
            <ComJose1></ComJose1>
            {/*es pa ver si da el qr :v
            Bueno creo que en base a ese QR luego que se procese
            internamente cuando el empleado escanee ese qr
            y lo que nos retorna es un string encriptado
            se procede a desencriptar con el mismo algoritmo 
            y simplemente lo que haremos con ese codigo ver los
            ultimos digitos XD pq recordemos que los ultimos digitos
            de esa cadena cuando sea desencriptada es el ID de la entrada
            entonces se hace un update a esa fila cambiando su atributo
            booleano de consumido que pasaria de false a True asi evitando
            que algun vivo deduzca el codigo y canjee otra entrada*/}
            <QRCode value={codigoQR} /> 

        </div>
    
        <Footer>
        </Footer>
    </>
        
    );
}
export default App;
