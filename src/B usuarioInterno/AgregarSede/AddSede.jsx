import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddSede() {
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
      await axios.post('http://localhost:8080/sede/agregar', sede);
      alert('Sede agregada correctamente');
      navigate('/'); 
    } catch (error) {
      alert('Error al agregar la sede');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Agregar Sede</h2>
          <form onSubmit={(e) => onSubmit(e)}>
                
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
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
