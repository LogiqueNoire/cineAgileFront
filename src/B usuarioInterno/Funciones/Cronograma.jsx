import React from "react";
import { useState } from "react";

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
                <th key={index} scope="col" style={{ backgroundColor: 'rgb(184, 248, 255)' }}>
                  {fechasSemana[index] ? `${diasDeLaSemana[index]} ${fechasSemana[index].toString().padStart(2, '0')}` : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {funciones.map((el, key) => (
              <tr>
                <td>{key}</td>
                {fechasSemana.map((fs, index) => (
                  console.log("funciones", (new Date(el.fechaHoraInicio)).getDay() + 1),
                  (new Date(el.fechaHoraInicio)).getDay() + 1 === fs
                    ?
                    <td className='text-center' style={{ backgroundColor: 'rgb(184, 248, 255)' }}>
                      <h5>{'Funcion ' + el.idFuncion}</h5>
                      <h5>{el.categoria + el.dimension}</h5>
                      <h5>{'Sala '+el.codigoSala}</h5>
                      <h5></h5>
                    </td>
                    :
                    <td></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};


export default Cronograma;