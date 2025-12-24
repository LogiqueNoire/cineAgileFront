import React, { useState } from "react";
import { Outlet } from "react-router";

import Header from '@/components/Header/Header.jsx'
import Footer from '@/components/Footer.jsx'
import Encriptador from "@/services/Encriptador";

import "./App.css"


function App() {
    const generador = new Encriptador();
  
    return (<>
        <Header>
        </Header>

        { /* Muestra el contenido de las rutas hijas, como el componente Inicio */ }
        <div className="contenedor container-fluid">
            
            <Outlet />
        </div>
           
        {/*
        <Footer>
        </Footer>
            */}
    </>
        
    );
}
export default App;
