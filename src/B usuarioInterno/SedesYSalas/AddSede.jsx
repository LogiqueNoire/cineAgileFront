import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../../configuracion/backend.js'
import Cookies from 'js-cookie';
import sedeDark from '../../assets/sedeDark.svg';
import BotonCarga from '../../0 componentesGenerales/BotonCarga.jsx';

export default function AddSede({ onSucess }) {
  const [submitting, setSubmitting] = useState(false);
  const [sede, setSede] = useState({

    nombre: '',

  });

  const {

    nombre,

  } = sede;

  const onInputChange = (e) => {
    setSede({
      ...sede,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (submitting)
      return;

    setSubmitting(true);

    try {
      await axios.post(`${url}/intranet/sedesysalas/agregar`, sede, {
        headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
      });
      if (onSucess) {
        alert("Sede agregada!")
        onSucess()
      }
    } catch (error) {
      if (error.status == 409)
        alert(error.response.data);
      else
        alert('Error al agregar la sede');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="justify-self-center" style={{ width: "300px" }}>
      <div className="row">
        <div className="border rounded p-4 mt-4 shadow">
          <div className='d-flex justify-content-center align-items-center gap-2'>
            <h2 className="text-center">Agregar Sede</h2>
            <img src={sedeDark} alt="" />
          </div>
          <form onSubmit={(e) => onSubmit(e)} className='d-flex justify-self-center flex-column'>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <BotonCarga type={"submit"} className={"btn btn-outline-primary"} submitting={submitting}>
              Agregar sede
            </BotonCarga>

          </form>
        </div>
      </div>
    </div>
  );
}
