import CinemaCard from './CinemaCard.jsx';
import React, { useState } from "react";
import DatePickerComponent from './DatePickerComponent.jsx';
import Componente from './componente.jsx';
import FilmTab from './FilmTab.jsx';

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

const peliculas = [
    { id: 1, nombre: "Pelicula 1", sinopsis: "Descripcion de la pelicula 1", genero: '', director: '', clasificacion:'', actores:'', './img/Imagen1.png' },
    { id: 2, titulo: "Pelicula 2", descripcion: "Descripcion de la pelicula 2", poster: './img/Imagen6.png' },
    { id: 3, titulo: "Pelicula 3", descripcion: "Descripcion de la pelicula 3", poster: './img/Imagen7.png' },
    { id: 4, titulo: "Pelicula 4", descripcion: "Descripcion de la pelicula 4", poster: './img/Imagen3.png' },
    { id: 5, titulo: "Pelicula 5", descripcion: "Descripcion de la pelicula 5", poster: './img/Imagen1.png' },
    { id: 6, titulo: "Pelicula 6", descripcion: "Descripcion de la pelicula 6", poster: './img/Imagen1.png' },
    { id: 7, titulo: "Pelicula 7", descripcion: "Descripcion de la pelicula 7", poster: './img/Imagen1.png' }
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
           

        </div>
    );
}
export default App;