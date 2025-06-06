import React from "react";
import { useState } from "react";
import MostrarSedesHorarios from "../../3 componentesVenta/MostrarSedesHorarios";

const Cronograma = ({ funciones, fechaConsultada }) => {
  if (!funciones.length) return null;

  const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const fechasSemana = [];
  let aux = new Date(fechaConsultada);
  aux.setDate(aux.getDate() - aux.getDay());
  while (fechasSemana.length < 7) {
    aux.setDate(aux.getDate() + 1);
    fechasSemana.push(aux.getDate());
  }
  console.log("fechasSemana", fechasSemana);

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

  return (
    <section className=''>
      <h2 className='d-none d-lg-block mr-4'>Funciones</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ backgroundColor: 'rgb(184, 248, 255)' }}>
                <div>
                  <h4 className='d-flex align-items-center'>Hora</h4>
                </div>
              </th>
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
                  <td>{hora.getHours()}</td>
                  {


                    fechasSemana.map((fs, index) => (
                      <td>
                        <div className='d-flex flex-column align-items-center gap-2'>

                          {
                          funciones.map((el, key) => (
                            (new Date(el.fechaHoraInicio)).getDay() + 1 === fs && hora.getHours() === (new Date(el.fechaHoraInicio)).getHours()
                              ?
                              <td className='text-center' style={{ backgroundColor: 'rgb(184, 248, 255)' }}>
                                <h6>{'Funcion ' + el.idFuncion}</h6>
                                <h6>{formatearHora(el.fechaHoraInicio)}</h6>
                                <h6>{el.categoria + ' ' + el.dimension}</h6>
                                <h6>{'Sala ' + el.codigoSala}</h6>
                                <h6></h6>
                              </td>
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