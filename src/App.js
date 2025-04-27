import CinemaCard from './CinemaCard.jsx';
import React, { useState } from "react";
import DatePickerComponent from './DatePickerComponent.jsx';
import Componente from './componente.jsx';
import FilmTab from './FilmTab.jsx';
import ComJose1 from './ComJose1.jsx';
import ComJose2 from './ComJose2.jsx';

const sede1 = {
    sede: 'CineAgile Trujillo',
    funciones: [
        {
            dimension: "2D",
            categoria: "Premium",
            horaInicio: "4:00 pm",
            sala: 1,
            precio: 1000,
        },
        {
            dimension: "2D",
            categoria: "Premium",
            horaInicio: "4:30 pm",
            sala: 1,
            precio: 1000,
        },
        {
            dimension: "3D",
            categoria: "Regular",
            horaInicio: "5:30 pm",
            sala: 1,
            precio: 1000,
        }
    ]
}
const sede2 = {
    sede: 'CineAgile Lima',
    funciones: [
        {
            dimension: "2D",
            categoria: "Premium",
            horaInicio: "5:00 pm",
            sala: 1,
            precio: 1000,
        },
        {
            dimension: "3D",
            categoria: "Regular",
            horaInicio: "5:30 pm",
            sala: 1,
            precio: 1000,
        },
        {
            dimension: "3D",
            categoria: "Regular",
            horaInicio: "6:30 pm",
            sala: 1,
            precio: 1000,
        }
    ]
}
const sede3 = {
    sede: 'CineAgile Cajamarca',
    funciones: [
        {
            dimension: "3D",
            categoria: "Premium",
            horaInicio: "6:00 pm",
            sala: 1,
            precio: 1000,
        },
        {
            dimension: "3D",
            categoria: "Regular",
            horaInicio: "7:30 pm",
            sala: 1,
            precio: 1000,
        },
        {
            dimension: "3D",
            categoria: "Premium",
            horaInicio: "8:30 pm",
            sala: 1,
            precio: 1000,
        }
    ]
}


/*    @Column
    @Temporal(TemporalType.DATE)      
    LocalDate   fechaInicioPreventa;
    @Column
    @Temporal(TemporalType.DATE)
    LocalDate   fechaInicioEstreno;
    @Column
    String estado;*/
//"En cartelera", "Próximamente", "Preventa", "No visible"
const peliculas = [
    { id: 1, nombre: "Pelicula 1", sinopsis: "Descripcion de la pelicula 1", genero: '', director: '', clasificacion:'', actores:'', imagen:'./img/Imagen1.png', estado: "En cartelera" },
    { id: 2, nombre: "Pelicula 2", sinopsis: "Descripcion de la pelicula 2", genero: '', director: '', clasificacion:'', actores:'', imagen:'./img/Imagen2Apple.png', estado: "En cartelera" },
]

function App() {
    return (
        <div className="App p-4">
            <div className="mx-3 d-flex justify-content-between">
                <div>
                    <h4>Pelicula</h4>
                    <h4>Star Wars capitulo 3</h4>
                </div>
                <DatePickerComponent></DatePickerComponent>
            </div>
            
            <CinemaCard sede={sede1.sede} funciones={sede1.funciones}></CinemaCard>
            <CinemaCard sede={sede2.sede} funciones={sede2.funciones}></CinemaCard>
            <CinemaCard sede={sede3.sede} funciones={sede3.funciones}></CinemaCard>

            <FilmTab estado="En cartelera" peliculas={peliculas} />
           
            <ComJose1></ComJose1>
        </div>
    );
}
export default App;