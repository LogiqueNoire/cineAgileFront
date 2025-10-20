import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../../configuracion/backend.js'
import Cookies from 'js-cookie';
import sedeIcon from '../../assets/modulos/sedeIcon.svg';
import BotonCarga from '../../0 componentesGenerales/BotonCarga.jsx';
import Toast from '../../Toast.jsx';

export default function AddSede({ onSucess }) {
  const [toast, setToast] = useState({ tipo: '', visible: false, titulo: '', mensaje: '' });

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

    setSede({
      ...sede,
      nombre: nombre.trim(),
    });

    try {
      await axios.post(`${url}/api/v1/intranet/sedes`, sede, {
        headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
      });
      if (onSucess) {
        setToast({
          tipo: 'toast-info',
          visible: true,
          titulo: 'Sede agregada',
          mensaje: ''
        });
        setTimeout(() => setToast({ visible: false }), 3000); onSucess()
      }
    } catch (error) {
      if (error.status == 409){
        setToast({
          tipo: 'toast-danger',
          visible: true,
          titulo: 'Error al agregar la sede',
          mensaje: error.response.data
        });
        setTimeout(() => setToast({ visible: false }), 3000);
      } else {
        setToast({
          tipo: 'toast-danger',
          visible: true,
          titulo: 'Error al agregar la sede',
          mensaje: ''
        });
        setTimeout(() => setToast({ visible: false }), 3000);
      }
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
            <img src={sedeIcon} alt="" style={{ filter:'invert(100%)' }}/>
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
      {<Toast tipo={toast.tipo}
        titulo={toast.titulo}
        mensaje={toast.mensaje}
        visible={toast.visible} />}
    </div>
  );
}
