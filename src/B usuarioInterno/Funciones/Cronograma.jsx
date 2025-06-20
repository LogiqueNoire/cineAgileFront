import React from "react";
import { useState } from "react";
import MostrarSedesHorarios from "../../3 componentesVenta/MostrarSedesHorarios";
import { useContext } from "react";
import { FuncionesContext } from "./FuncionesContext";
import './Cronograma.css'

const Cronograma = () => {
  const {
    valoresBusqueda,
    setValoresBusqueda,
    funcion,
    setFuncion,
    listaFunciones,
    setListaFunciones
  } = useContext(FuncionesContext);

  const colores = [
    "#f0c9b3", // anaranjado claro (hue 20)
    "#f1d5b3", // durazno claro (hue 35)
    "#f1deb3", // amarillo cálido (hue 45)
    "#f1e6b3", // amarillo claro (hue 55)
    "#fcffa8", // amarillo puro
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
    "#a7bdcd", // azul grisáceo (hue 270)
    "#c5ac87", // marrón claro (hue 290)
    "#cccccc" // gris claro (hue 0)
  ];

  if (!listaFunciones.length) return null;
  const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const fechasSemana = [];
  let aux = new Date(valoresBusqueda.fechaElegida);
  aux.setDate(aux.getDate() - aux.getDay());
  while (fechasSemana.length < 7) {
    aux.setDate(aux.getDate() + 1);
    fechasSemana.push(new Date(aux));
  }
  const horas = [];

  for (let h = 0; h <= 23; h++) {
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

  function AdespuesB(hora1, hora2) {
    //console.log(hora1, hora2)
    /*const [horas, minutos] = hora1.split(':').map(Number);
    const hora1conFechahora2 = new Date(hora2);
    hora1conFechahora2.setHours(horas, minutos, 0, 0);
    return hora1conFechahora2 > hora2;*/
    //if (hora1.getDate)
    //return (hora1.getHours() > hora2.getHours() ||
    //  (hora1.getHours() == hora2.getHours() &&
    //    hora1.getMinutes() > hora2.getMinutes()));
    return hora1 > hora2
  }

  function comparar(el, hora) {
    const fechaInicio = new Date(el.fechaHoraInicio);
    const fechaFin = new Date(el.fechaHoraFin);

    // Clona hora y le suma una hora
    const horaMasUna = new Date(hora);
    horaMasUna.setHours(hora.getHours() + 1, hora.getMinutes(), 0, 0);

    return AdespuesB(horaMasUna, fechaInicio) &&
      AdespuesB(fechaFin, hora);
  }

  return (
    <section className=''>
      <h2 className='d-none d-lg-block mr-4'>Funciones de la semana</h2>
      <div className="table-responsive">
        <table className="table tableCronograma">
          <thead>
            <tr>
              <th className='text-center' scope="col mb-3" style={{ backgroundColor: 'rgb(184, 248, 255)' }}>Hora</th>
              {fechasSemana.map((_, index) => (
                <th className='text-center' key={index} scope="col" style={{ backgroundColor: 'rgb(184, 248, 255)' }}>
                  <div>{fechasSemana[index] ? `${diasDeLaSemana[index]}` : ''}</div>
                  <div>{fechasSemana[index] ? `${fechasSemana[index].getDate().toString().padStart(2, '0')}` : ''}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={{ 'height': '20px' }}>
              {fechasSemana.map((_, __) => (
                <td></td>
              ))}
              <td></td>
            </tr>
            {
              horas.map((hora, i) => (
                <tr >
                  <td style={{
                    position: 'relative', padding: '1.5rem', width: '80px',
                    borderBottom: (i === horas.length - 1) ? 'none' : ''
                  }}>
                    <div className='hora'>
                      {formatearHora(hora)}
                    </div>
                  </td>

                  {


                    fechasSemana.map((fs, index) => (
                      <td key={index} style={{
                        borderBottom: (i === horas.length - 1) ? 'none' : ''
                      }}>
                        <div className={`d-flex justify-content-center align-items-center gap-2 ${valoresBusqueda.filtro === "sala" ? "flex-column" : ""}`}>
                          {listaFunciones.map((el, key) => {
                            const horaDelDia = new Date(fs);
                            horaDelDia.setHours(hora.getHours(), hora.getMinutes(), 0, 0);
                            return (
                              AdespuesB((new Date(horaDelDia)).setHours(horaDelDia.getHours() + 1, horaDelDia.getMinutes(), 0, 0), new Date(el.fechaHoraInicio))
                              && AdespuesB(new Date(el.fechaHoraFin), horaDelDia))
                              ?
                              <div className='text-center p-2'
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFuncion(
                                    prev => ({
                                      ...prev,
                                      funcionElegida: el
                                    })
                                  )
                                }}
                                style={{ backgroundColor: `${colores[el.idFuncion % colores.length]}` }}>
                                <h6>{'#' + el.idFuncion}</h6>
                                <h6>{formatearHora(el.fechaHoraInicio) + '-' + formatearHora(el.fechaHoraFin)}</h6>
                                {valoresBusqueda.filtro === 'pelicula' ?
                                  <h6>{'Sala ' + el.codigoSala}</h6>
                                  :
                                  <h6>{el.nombrePelicula}</h6>
                                }
                                <h6>{el.categoria + ' ' + el.dimension}</h6>
                                <h6>{'S/ ' + el.precioBase}</h6>
                                <h6></h6>
                              </div>
                              :
                              <></>
                          })
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