import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, UNSAFE_useScrollRestoration } from 'react-router-dom';
import { url } from '../../configuracion/backend.js'
import { format } from 'date-fns'

import peliculaIcono from '../../assets/peliculaDark.svg'
import Loading from '../../0 componentesGenerales/Loading.jsx';
import Cookies from 'js-cookie';


export default function AddFilm({ onSucess }) {
  const [pelicula, setPelicula] = useState({

    nombre: '',
    director: '',
    actores: '',
    genero: '',
    clasificacion: '',
    duracion: '',
    estado: '',
    fechaInicioEstreno: '',
    fechaInicioPreventa: '',
    imageUrl: '',
    sinopsis: '',
  });
  const [fechaReal, setFechaReal] = useState()

  const {
    nombre,
    director,
    actores,
    genero,
    clasificacion,
    duracion,
    estado = "próximamente",
    fechaInicioEstreno,
    fechaInicioPreventa,
    imageUrl,
    sinopsis,
  } = pelicula;

  const onInputChange = (e) => {
    setPelicula({
      ...pelicula,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    if (duracion > 500 || duracion < 0) {
      setPelicula(prev => ({ ...prev, duracion: '' }));
    }
  }, [duracion]);

  /*manejo de fecha*/
  let response
  useEffect(() => {
    const obtenerFecha = async () => {
      try {
        response = await axios.get(`${url}/fecha-actual`);
        setFechaReal(new Date(response.data));

      } catch (err) {
        console.error("Error al obtener la fecha:", err);
      }
    };

    obtenerFecha();
  }, []);

  useEffect(() => {
    if (fechaReal) {
      setPelicula((prev) => ({
        ...prev,
        fechaInicioEstreno: format(new Date(fechaReal), 'yyyy-MM-dd'),
      }));
    }
  }, [fechaReal]);


  const onFechaChange = (e) => {
    setFechaElegida(new Date(`${e.target.value}T00:00`));
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(pelicula)
    if (!(genero === '' || clasificacion === '' || estado === "")) {

      try {
        await axios.post(`${url}/intranet/peliculas/agregar`, pelicula, { 
          headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } 
      });
        alert('Película agregada correctamente');
        if (onSucess) {
          onSucess()
        }
      } catch (error) {
        alert('Error al agregar la película');
        console.error(error);
      }
    }
  };

  return (
    <div className="addFilm">
      {fechaReal !== undefined ?
        <div className="border rounded p-4 mt-4 shadow">
          <div className="d-flex align-items-center p-2 gap-4 justify-content-center">
            <img src={peliculaIcono} alt="" style={{ height: '60px' }} />
            <h2 className="text-center">Agregar película</h2>
          </div>
          <form onSubmit={(e) => onSubmit(e)} >
            <div className='d-flex flex-wrap gap-3 justify-content-center'>
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

              <div className="mb-3">
                <label htmlFor="duracion" className="form-label">
                  Duración (min)
                </label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  className="form-control"
                  placeholder="Duración"
                  name="duracion"
                  value={duracion}
                  onChange={(e) => onInputChange(e)}
                  required

                />
              </div>

              <div className="mb-3">
                <label htmlFor="genero" className="form-label">
                  Género
                </label>
                <select
                  className="form-select"
                  placeholder="Género"
                  name="genero"
                  value={genero}
                  onChange={(e) => onInputChange(e)}
                  required>
                  <option value="">Seleccione un género</option>
                  <option value="Acción">Acción</option>
                  <option value="Animación">Animación</option>
                  <option value="Biográfico">Biográfico</option>
                  <option value="Ciencia ficción">Ciencia ficción</option>
                  <option value="Comedia">Comedia</option>
                  <option value="Drama">Drama</option>
                  <option value="Documental">Documental</option>
                  <option value="Terror">Terror</option>
                  <option value="Thriller">Thriller</option>

                </select>

              </div>

              <div className="mb-3">
                <label htmlFor="director" className="form-label">
                  Director
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Director"
                  name="director"
                  value={director}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="clasificacion" className="form-label">
                  Clasificación
                </label>
                <select
                  className="form-select"
                  placeholder="Clasificación"
                  name="clasificacion"
                  value={clasificacion}
                  onChange={(e) => onInputChange(e)}
                  required>
                  <option value="">Seleccione una clasificación</option>
                  <option value="Apto para todos">Apto para todos</option>
                  <option value="+14">+14</option>
                  <option value="+18">+18</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="estado" className="form-label">
                  Estado
                </label>
                <input
                  type='text'
                  className="form-control"
                  placeholder="Estado"
                  name={estado}
                  value="Próximamente"
                  required
                  disabled>
                </input>
              </div>

              <div className="mb-3">
                <label htmlFor="actores" className="form-label">
                  Actores principales (opcional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Actores"
                  name="actores"
                  value={actores}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  URL Imagen
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://..."
                  name="imageUrl"
                  value={imageUrl}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="fechaInicioEstreno" className="form-label">
                  Fecha Inicio Estreno
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fechaInicioEstreno"
                  min={fechaInicioEstreno ? format(new Date(fechaInicioEstreno), 'yyyy-MM-dd') : ''}
                  value={fechaInicioEstreno ? format(new Date(fechaInicioEstreno), 'yyyy-MM-dd') : ''}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>

              {/*
                <div className="mb-3">
                  <label htmlFor="fechaInicioPreventa" className="form-label">
                    Fecha Inicio Preventa
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaInicioPreventa"
                    value={fechaInicioPreventa}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
              */}

            </div>

            <div className='d-flex flex-wrap gap-3 justify-content-center'>

              <div className="mb-3 w-100">
                <label htmlFor="sinopsis" className="form-label">
                  Sinopsis
                </label>
                <textarea
                  className="form-control"
                  placeholder="Sinopsis"
                  name="sinopsis"
                  value={sinopsis}
                  onChange={(e) => onInputChange(e)}
                  required
                ></textarea>
              </div>
            </div>




            <div className='d-flex gap-2 justify-content-center'>

              <button type="submit" className="btn btn-outline-primary">
                Agregar película
              </button>
              {/*
                <Link className="btn btn-outline-danger mx-2" to={`/intranet/peliculas`}>
                Cancelar
                </Link>
              */}
            </div>
          </form>
        </div>
        :
        <div className="d-flex justify-content-center">
          <Loading ></Loading>
        </div>
      }
    </div>

  );
}
