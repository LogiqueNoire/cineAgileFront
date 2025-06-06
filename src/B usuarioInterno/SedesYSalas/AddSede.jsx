import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../../configuracion/backend.js'
import Cookies from 'js-cookie';
import sedeDark from '../../assets/sedeDark.svg';

export default function AddSede({ onSucess }) {
  const navigate = useNavigate();

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

    try {
      await axios.post(`${url}/intranet/sedesysalas/agregar`, sede, {
        headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
      });
      alert('Sede agregada correctamente');
      if (onSucess) {
        onSucess()
      }
    } catch (error) {
      alert('Error al agregar la sede');
      console.error(error);
    }
  };

  return (
    <div className="justify-self-center" style={{ width: "400px" }}>
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

            <button type="submit" className="btn btn-outline-primary">
              Agregar Sede
            </button>
            {/*

            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancelar
            </Link>
            */}
          </form>
        </div>
      </div>
    </div>
  );
}
