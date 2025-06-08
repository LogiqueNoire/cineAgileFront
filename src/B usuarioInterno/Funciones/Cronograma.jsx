import React from "react";
import { useState } from "react";
import MostrarSedesHorarios from "../../3 componentesVenta/MostrarSedesHorarios";

const Cronograma = ({ funciones, fechaConsultada, filtro }) => {
  const colores = [
    "#f0c9b3", // anaranjado claro (hue 20)
    "#f1d5b3", // durazno claro (hue 35)
    "#f1deb3", // amarillo cálido (hue 45)
    "#f1e6b3", // amarillo claro (hue 55)
    "#edf0b3", // lima pálido (hue 65)
    "#e3f0b3", // verde lima claro (hue 75)
    "#caf0b3", // verde suave (hue 100)
    "#b3f0c1", // verde menta (hue 125)
    "#b3f0cc", // verde agua (hue 135)
    "#b3f0d8", // turquesa claro (hue 145)
    "#b3eee6", // cian pálido (hue 160)
    "#b3e6e6", // cian suave (hue 180)
    "#b3d6f0", // celeste (hue 200)
    "#b3cdf0", // azul claro (hue 210)
    "#c1b3f0", // violeta suave (hue 230)
    "#d6b3f0",  // lila claro (hue 250)
    "#97B0C3", // azul grisáceo (hue 270)
    "#c5ac87", // marrón claro (hue 290)
    "#cccccc" // gris claro (hue 0)
  ];

  if (!funciones.length) return null;

  const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const fechasSemana = [];
  let aux = new Date(fechaConsultada);
  aux.setDate(aux.getDate() - aux.getDay());
  while (fechasSemana.length < 7) {
    aux.setDate(aux.getDate() + 1);
    fechasSemana.push(aux.getDate());
  }

  const horas = [];

  for (let h = 7; h <= 23; h++) {
    const fecha = new Date();
    fecha.setHours(h, 0, 0);
    horas.push(new Date(fecha));
  }

  function formatearHora(fechaStr) {
    const fecha = new Date(fechaStr);
    const h = fecha.getHours().toString().padStart(2, '0');
    const m = fecha.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  function AdespuesoigualB(hora1, hora2) {
    return (hora1.getHours() > hora2.getHours() ||
      (hora1.getHours() === hora2.getHours() && hora1.getMinutes() >= hora2.getMinutes()))
  }

  function AdespuesB(hora1, hora2) {
    return (hora1.getHours() > hora2.getHours() ||
      (hora1.getHours() === hora2.getHours() && hora1.getMinutes() > hora2.getMinutes()))
  }

  return (
    <section className=''>
      <h2 className='d-none d-lg-block mr-4'>Funciones de la semana</h2>
      <div className="table-responsive">
        <table className="table" style={{ 'border-collapse': 'separate', width: '100%' }}>
          <thead>
            <tr>
              <th scope="col" style={{ backgroundColor: 'rgb(184, 248, 255)' }}>Hora</th>
              {fechasSemana.map((_, index) => (
                <th className='text-center' key={index} scope="col" style={{ backgroundColor: 'rgb(184, 248, 255)' }}>
                  {fechasSemana[index] ? `${diasDeLaSemana[index]} ${fechasSemana[index].toString().padStart(2, '0')}` : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              horas.map((hora, index) => (
                <tr>
                  <td>{formatearHora(hora)}</td>
                  {


                    fechasSemana.map((fs, index) => (
                      <td>
                        <div className='d-flex align-items-center gap-2'>

                          {
                            funciones.map((el, key) => (
                              (new Date(el.fechaHoraInicio)).getDay() + 1 === fs
                                &&
                                (
                                  (
                                    AdespuesoigualB(new Date(el.fechaHoraInicio), hora)
                                    &&
                                    AdespuesB(new Date(new Date().setHours(hora.getHours() + 1, hora.getMinutes(), 0, 0)), new Date(el.fechaHoraInicio))
                                  )
                                  ||
                                  (
                                    AdespuesoigualB(new Date(el.fechaHoraFin), hora)
                                    &&
                                    AdespuesB(new Date(new Date().setHours(hora.getHours() + 1, hora.getMinutes(), 0, 0)), new Date(el.fechaHoraFin))
                                  )
                                )
                                ?
                                <div className='text-center p-2'
                                  style={{ backgroundColor: `${colores[el.idFuncion % colores.length]}` }}>
                                  <h6>{'#' + el.idFuncion}</h6>
                                  <h6>{formatearHora(el.fechaHoraInicio) + '-' + formatearHora(el.fechaHoraFin)}</h6>
                                  {filtro === 'pelicula' ?
                                    <h6>{'Sala ' + el.codigoSala}</h6>
                                    :
                                    <h6>{el.nombrePelicula}</h6>
                                  }
                                  <h6>{el.categoria + ' ' + el.dimension}</h6>
                                  <h6></h6>
                                </div>
                                :
                                <></>
                            ))
                          }
                        </div>
                      </td>
                    ))


                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  );
};


export default Cronograma;      