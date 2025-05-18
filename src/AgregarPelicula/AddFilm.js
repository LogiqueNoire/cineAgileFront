import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddFilm() {
  const navigate = useNavigate();

  // Estado con los campos que usas en tu backend para Pelicula
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

  // Desestructuramos para usar en los inputs
  const {
    
    nombre,
    director,
    actores,
    genero,
    clasificacion,
    duracion,
    estado,
    fechaInicioEstreno,
    fechaInicioPreventa,
    imageUrl,
    sinopsis,
  } = pelicula;

  // Cambia el estado cuando escribes en los inputs
  const onInputChange = (e) => {
    setPelicula({
      ...pelicula,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar datos al backend para agregar película
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/pelicula/agregar', pelicula);
      alert('Película agregada correctamente');
      navigate('/'); // Vuelve a home o donde quieras
    } catch (error) {
      alert('Error al agregar la película');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Agregar Película</h2>
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
              <label htmlFor="actores" className="form-label">
                Actores
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Actores"
                name="actores"
                value={actores}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="genero" className="form-label">
                Género
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Género"
                name="genero"
                value={genero}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="clasificacion" className="form-label">
                Clasificación
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Clasificación"
                name="clasificacion"
                value={clasificacion}
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
                className="form-control"
                placeholder="Duración"
                name="duracion"
                value={duracion}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="estado" className="form-label">
                Estado
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Estado"
                name="estado"
                value={estado}
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
                value={fechaInicioEstreno}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

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

            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">
                URL Imagen
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="URL Imagen"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-3">
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

            <button type="submit" className="btn btn-outline-primary">
              Agregar Película
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
